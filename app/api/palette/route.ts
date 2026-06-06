import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * /api/palette — headless machine-to-machine twin of the ⌘K palette.
 *
 * Per operator brief 2026-06-06: visiting agents can't press Cmd-K.
 * The palette's full surface (fuzzy + ask) is exposed here under one
 * URL so agents can hit the same UX without UI hooks.
 *
 * Two modes via ?mode= query (or auto-detect from query shape):
 *
 *   GET /api/palette?q=orangebox            → fuzzy (default)
 *   GET /api/palette?q=...&mode=fuzzy       → fuzzy explicit
 *   GET /api/palette?q=what+is+RAG&mode=ask → ask the lab (proxies /api/ask)
 *
 * Auto-detect: if ?mode is omitted AND query looks question-shaped
 * (starts with what/how/why/etc OR ends with ? OR is 6+ words), we
 * use ask mode. Otherwise fuzzy.
 *
 * Returns a uniform envelope:
 *   {
 *     ok: true,
 *     mode: "fuzzy" | "ask",
 *     query: string,
 *     // fuzzy mode:
 *     results?: Array<{ route, title, description, score, snippet }>,
 *     // ask mode:
 *     answer?: string,
 *     sources?: Array<{ route, title, section, similarity }>,
 *     // both:
 *     index_count: number,
 *     index_built: string
 *   }
 *
 * CORS open. Same engine as the human palette. The point is agents
 * never have to guess endpoints · this is THE one.
 */

const INTERROGATIVES = new Set([
  "what","how","why","when","where","who","which","whose","whom",
  "can","could","is","are","was","were","will","would","should","do","does","did",
]);

function looksLikeQuestion(q: string): boolean {
  const t = q.trim().toLowerCase();
  if (!t) return false;
  if (t.endsWith("?")) return true;
  const first = t.split(/\s+/)[0];
  if (INTERROGATIVES.has(first)) return true;
  if (t.split(/\s+/).length >= 6) return true;
  return false;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? url.searchParams.get("query") ?? "";
  const modeParam = url.searchParams.get("mode") ?? "";
  const k = url.searchParams.get("k");

  if (!q.trim()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing ?q= parameter",
        usage: "/api/palette?q=<query>&mode=<fuzzy|ask>",
        modes: {
          fuzzy: "Sub-50ms keyword search · returns ranked routes · no LLM call",
          ask: "Semantic synthesis · gemini-2.5-flash · returns answer + cited sources",
        },
        auto_mode: "If mode omitted, question-shaped queries auto-route to ask · keyword queries auto-route to fuzzy",
      },
      { status: 400, headers: { "access-control-allow-origin": "*" } },
    );
  }

  // Resolve mode
  let mode: "fuzzy" | "ask";
  if (modeParam === "ask") mode = "ask";
  else if (modeParam === "fuzzy") mode = "fuzzy";
  else mode = looksLikeQuestion(q) ? "ask" : "fuzzy";

  const origin = url.origin;

  try {
    if (mode === "ask") {
      // Proxy to /api/ask
      const askRes = await fetch(`${origin}/api/ask`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: q.trim(), k: k ? Math.min(Math.max(parseInt(k, 10) || 5, 1), 10) : 5 }),
      });
      const j = (await askRes.json()) as Record<string, unknown>;
      return NextResponse.json(
        {
          ok: askRes.ok,
          mode,
          ...j,
        },
        {
          status: askRes.status,
          headers: {
            "access-control-allow-origin": "*",
            "cache-control": "no-store",
          },
        },
      );
    } else {
      // Proxy to /api/search
      const params = new URLSearchParams();
      params.set("q", q.trim());
      if (k) params.set("k", k);
      const searchRes = await fetch(`${origin}/api/search?${params.toString()}`);
      const j = (await searchRes.json()) as Record<string, unknown>;
      return NextResponse.json(
        {
          ok: searchRes.ok,
          mode,
          ...j,
        },
        {
          status: searchRes.status,
          headers: {
            "access-control-allow-origin": "*",
            "cache-control": "public, max-age=60, s-maxage=60",
          },
        },
      );
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json(
      { ok: false, mode, query: q.trim(), error: msg.slice(0, 400) },
      { status: 500, headers: { "access-control-allow-origin": "*" } },
    );
  }
}

export async function POST(req: Request) {
  // Allow POST too for clients that prefer JSON body
  let body: { query?: string; q?: string; mode?: string; k?: number };
  try {
    body = (await req.json()) as { query?: string; q?: string; mode?: string; k?: number };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400, headers: { "access-control-allow-origin": "*" } });
  }
  const q = body.query ?? body.q ?? "";
  const mode = body.mode ?? "";
  const k = body.k !== undefined ? String(body.k) : null;

  // Construct a GET URL and reuse the GET handler
  const url = new URL(req.url);
  const params = new URLSearchParams();
  params.set("q", q);
  if (mode) params.set("mode", mode);
  if (k) params.set("k", k);
  url.search = params.toString();
  return GET(new Request(url.toString(), { headers: req.headers }));
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "Content-Type",
      "access-control-max-age": "86400",
    },
  });
}
