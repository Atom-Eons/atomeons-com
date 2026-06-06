import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/search — fuzzy search over the lab's 247 indexed routes.
 *
 * Sibling to /api/ask · returns matching routes WITHOUT calling Gemini
 * for synthesis. Use this when you want the raw matches (e.g. site
 * search palette, agent that does its own synthesis, etc).
 *
 * GET /api/search?q=prompt+injection&k=10
 *
 * Response shape:
 *   {
 *     ok: true,
 *     query: string,
 *     count: number,
 *     results: [
 *       { route, title, description, score, snippet, headings }
 *     ]
 *   }
 *
 * Scoring matches /api/ask's Layer A — fields weighted as
 * title (×4), keywords (×3), headings (×2), description / body /
 * category / route-slug (×1), with a multi-token phrase bonus.
 */

type Record = {
  r: string; t: string; d: string;
  h: string[]; b: string; k: string[];
  c: string; w: number;
};

type Index = {
  v: number; built: string; count: number;
  records: Record[];
};

let CACHE: Index | null = null;
function loadIndex(): Index {
  if (CACHE) return CACHE;
  const p = path.join(process.cwd(), "public", "search-index.json");
  CACHE = JSON.parse(fs.readFileSync(p, "utf8")) as Index;
  return CACHE;
}

const STOP = new Set([
  "the","a","an","and","or","but","if","then","of","to","for","in","on","at","by",
  "is","are","was","were","be","been","being","have","has","had","do","does","did",
  "what","which","who","whom","how","why","where","when","this","that","these","those",
  "i","you","he","she","it","we","they","me","him","her","us","them","my","your","its",
  "as","with","from","about","into","over","under","than","then","so","just","not",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

function scoreRecord(query: string, r: Record): number {
  const qTokens = tokenize(query).filter((t) => !STOP.has(t));
  if (qTokens.length === 0) return 0;
  const fields = {
    t: tokenize(r.t).join(" "),
    h: tokenize((r.h || []).join(" ")).join(" "),
    k: tokenize((r.k || []).join(" ")).join(" "),
    d: tokenize(r.d || "").join(" "),
    b: tokenize(r.b || "").join(" "),
    c: tokenize(r.c || "").join(" "),
    rt: tokenize(r.r.replace(/[-/]/g, " ")).join(" "),
  };
  let score = 0;
  for (const tok of qTokens) {
    if (fields.t.includes(tok)) score += 4;
    if (fields.k.includes(tok)) score += 3;
    if (fields.h.includes(tok)) score += 2;
    if (fields.d.includes(tok)) score += 1;
    if (fields.b.includes(tok)) score += 1;
    if (fields.c.includes(tok)) score += 1;
    if (fields.rt.includes(tok)) score += 1;
  }
  if (qTokens.length >= 2) {
    const phrase = qTokens.join(" ");
    const haystack = `${fields.t} ${fields.h} ${fields.d} ${fields.b}`;
    if (haystack.includes(phrase)) score += 6;
  }
  return score;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? url.searchParams.get("query") ?? "";
  const kParam = parseInt(url.searchParams.get("k") ?? "10", 10);
  const k = Math.min(Math.max(isNaN(kParam) ? 10 : kParam, 1), 50);

  if (!q.trim()) {
    return NextResponse.json(
      { error: "Missing ?q= parameter" },
      { status: 400 },
    );
  }
  if (q.length > 600) {
    return NextResponse.json(
      { error: "query too long (max 600 chars)" },
      { status: 400 },
    );
  }

  const idx = loadIndex();
  const scored = idx.records
    .map((r) => ({ ...r, _score: scoreRecord(q, r) }))
    .filter((r) => r._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, k);

  const results = scored.map((r) => ({
    route: r.r,
    title: r.t,
    description: r.d,
    score: r._score,
    headings: (r.h || []).slice(0, 4),
    snippet: r.b.slice(0, 240),
  }));

  return NextResponse.json(
    {
      ok: true,
      query: q.trim(),
      count: results.length,
      results,
      index_count: idx.count,
      index_built: idx.built,
    },
    {
      headers: {
        "cache-control": "public, max-age=60, s-maxage=60",
        "access-control-allow-origin": "*",
      },
    },
  );
}
