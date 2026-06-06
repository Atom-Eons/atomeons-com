import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/md?route=/learn/atlas/agents — markdown export of any indexed
 * route, drawn from public/search-index.json.
 *
 * Why this exists:
 *   Most LLM ingestion pipelines (Perplexity, ChatGPT browsing, Claude
 *   web tools) work better with raw markdown than with rendered HTML.
 *   This endpoint hands back the route's title, description, headings,
 *   keywords, and body excerpt as a clean markdown block — no nav,
 *   no Tailwind, no React hydration noise.
 *
 *   The fuzzy index already contains everything an LLM needs to ground
 *   an answer. This endpoint just reformats it.
 *
 * Usage:
 *   curl 'https://atomeons.com/api/md?route=/orangebox'
 *   curl 'https://atomeons.com/api/md?route=/learn/atlas/mech-interp'
 *
 * If the route is not in the index, returns 404 with a list of close
 * matches by route-slug substring.
 */

type Record = {
  r: string;
  t: string;
  d: string;
  h: string[];
  b: string;
  k: string[];
  c: string;
  w: number;
};

type Index = {
  v: number;
  built: string;
  count: number;
  records: Record[];
};

let CACHE: Index | null = null;
function loadIndex(): Index {
  if (CACHE) return CACHE;
  const p = path.join(process.cwd(), "public", "search-index.json");
  CACHE = JSON.parse(fs.readFileSync(p, "utf8")) as Index;
  return CACHE;
}

function toMarkdown(r: Record): string {
  const lines: string[] = [];
  lines.push(`# ${r.t}`);
  lines.push("");
  lines.push(`**Route:** \`atomeons.com${r.r}\``);
  if (r.c) lines.push(`**Category:** ${r.c}`);
  lines.push(`**License:** CC-BY 4.0 unless otherwise noted on the page.`);
  lines.push("");
  if (r.d) {
    lines.push("## Description");
    lines.push("");
    lines.push(r.d);
    lines.push("");
  }
  if (r.h && r.h.length > 0) {
    lines.push("## Headings");
    lines.push("");
    for (const h of r.h) {
      lines.push(`- ${h}`);
    }
    lines.push("");
  }
  if (r.b) {
    lines.push("## Body");
    lines.push("");
    lines.push(r.b);
    lines.push("");
  }
  if (r.k && r.k.length > 0) {
    lines.push("## Keywords");
    lines.push("");
    lines.push(r.k.join(" · "));
    lines.push("");
  }
  lines.push("---");
  lines.push("");
  lines.push(`*Markdown export from atomeons.com. Full rendered page: https://atomeons.com${r.r}*`);
  lines.push(`*All lab content is CC-BY 4.0. Cite as: AtomEons Systems Laboratory, ${r.t}, atomeons.com${r.r}.*`);
  return lines.join("\n");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const route = url.searchParams.get("route");
  if (!route) {
    return new NextResponse("Missing ?route= parameter", { status: 400, headers: { "content-type": "text/plain" } });
  }
  // Normalize: strip trailing slash unless root
  const norm = route === "/" ? "/" : route.replace(/\/+$/, "");
  const idx = loadIndex();
  const record = idx.records.find((r) => r.r === norm);
  if (record) {
    return new NextResponse(toMarkdown(record), {
      status: 200,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "cache-control": "public, max-age=900, s-maxage=900",
      },
    });
  }
  // 404: suggest close matches
  const suggestions = idx.records
    .filter((r) => r.r.includes(norm.replace(/^\//, "").split("/")[0] || ""))
    .slice(0, 8)
    .map((r) => r.r);
  return new NextResponse(
    `# 404 · Route Not Indexed\n\nThe route \`${norm}\` is not in the public search index for atomeons.com.\n\n## Close matches\n\n${
      suggestions.length > 0
        ? suggestions.map((s) => `- ${s}`).join("\n")
        : "(none)"
    }\n\n## See instead\n\n- https://atomeons.com/sitemap.xml\n- https://atomeons.com/sitemap-ai.xml\n- https://atomeons.com/llms.txt\n`,
    {
      status: 404,
      headers: { "content-type": "text/markdown; charset=utf-8" },
    },
  );
}
