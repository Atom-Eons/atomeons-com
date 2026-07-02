import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /random · Wave 143f · 2026-07-02
 *
 * Random-page redirect for site-wide discovery. Reads the pre-built
 * search-index.json (319 routes), filters out API + admin + build-
 * artifacts, picks one uniformly at random, and 307-redirects there.
 *
 * Novel-ish for a lab site: some blogs have a random-post button, but
 * pointing at the WHOLE catalog (papers, letters, products, manuals,
 * doctrine, everything) turns a curious click into a real exploration.
 *
 * URL parameters:
 *   ?in=<prefix>  restrict pool to routes starting with <prefix>
 *                 (e.g. /random?in=/founders-view → only letters)
 *
 * If the search-index isn't found, degrades to a fixed set of
 * hand-picked entry points.
 */

const FALLBACK_POOL = [
  "/",
  "/handbook",
  "/org-chart",
  "/doctrine",
  "/manifesto",
  "/founders-view",
  "/innovations",
  "/constellation",
  "/research",
  "/i-am-ai",
  "/orangebox",
  "/skills",
];

const EXCLUDE_PREFIXES = [
  "/api/",
  "/admin/",
  "/_next/",
  "/opengraph-image",
  "/twitter-image",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest",
];

function pickPoolFromIndex(index: unknown, prefix: string | null): string[] {
  if (!Array.isArray(index)) return FALLBACK_POOL;
  const urls: string[] = [];
  for (const entry of index) {
    if (typeof entry !== "object" || entry === null) continue;
    const maybe = (entry as Record<string, unknown>).url;
    if (typeof maybe !== "string") continue;
    if (!maybe.startsWith("/")) continue;
    if (EXCLUDE_PREFIXES.some((p) => maybe.startsWith(p))) continue;
    if (prefix && !maybe.startsWith(prefix)) continue;
    urls.push(maybe);
  }
  return urls.length ? urls : FALLBACK_POOL;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const prefix = url.searchParams.get("in");

  let pool: string[] = FALLBACK_POOL;
  try {
    const p = path.join(process.cwd(), "public", "search-index.json");
    const raw = await fs.readFile(p, "utf-8");
    const parsed = JSON.parse(raw);
    pool = pickPoolFromIndex(parsed, prefix);
  } catch {
    // fallback pool it is
  }

  // Uniform pick without Math.random inside a workflow context — use
  // crypto so we don't tie ourselves to the runtime.random guard.
  const idx = Math.floor(
    (crypto.getRandomValues(new Uint32Array(1))[0] / 0x1_0000_0000) * pool.length,
  );
  const target = pool[Math.min(idx, pool.length - 1)];

  return Response.redirect(new URL(target, url.origin).toString(), 307);
}
