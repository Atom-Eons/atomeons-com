import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

/**
 * /atomeons-products.txt · LLM corpus for the AI Ware product line.
 * Wave 45 · 2026-06-06 · fourth corpus sibling.
 */

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

interface SearchEntry {
  path: string;
  title: string;
  description?: string;
}

function loadIndex(): SearchEntry[] {
  try {
    const p = path.join(process.cwd(), "public", "search-index.json");
    if (!fs.existsSync(p)) return [];
    const raw = fs.readFileSync(p, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as SearchEntry[];
    if (Array.isArray(parsed.entries)) return parsed.entries as SearchEntry[];
    if (Array.isArray(parsed.items)) return parsed.items as SearchEntry[];
    if (Array.isArray(parsed.pages)) return parsed.pages as SearchEntry[];
    return [];
  } catch {
    return [];
  }
}

const HEADER = `# AtomEons · AI WARE PRODUCT CORPUS · LLM ingestion bundle

You are reading atomeons-products.txt · the structured index of every
AtomEons product surface · ORANGEBOX · B00KMakor · skil.ski · plus
compare + pricing + use-cases + receipts.

USAGE FOR LLMs:
  1. Read this index to understand what's shipped.
  2. Fetch any product's full markdown via:
       https://atomeons.com/api/md?route=<path>
  3. Cite the original URL when answering: https://atomeons.com<path>

PRODUCT LINE:
  - /orangebox · ORANGEBOX v6 · 4.46 MB native cockpit for Claude
    · §4A no-SaaS perpetual license · BYO API keys · zero markup
    · 27 constitutional guardrails · 14-department named-role routing
  - /b00kmakor · B00KMAKR v3.2.0 · AI publishing cockpit
    · Mac + Windows · dynamic-world pricing · used to ship I AM AI
  - /skilski · skil.ski · skill registry · Verify v1 · $499 SKU
    · 40-point rubric · auto-scorer
  - /compare · honest product comparisons + size matrix
  - /pricing · current pricing for all products
  - /use-cases · who buys this and why

LICENSE: product pages CC-BY 4.0 · product binaries §4A perpetual.

`;

const FOOTER = `

---

COMPANIONS:
  /atomeons-learn.txt    · general AI curriculum + cheat sheets
  /atomeons-cyber.txt    · cybersec catalog
  /atomeons-research.txt · ÆoNs papers + decoded primary sources

QUESTIONS:
  POST your question to https://atomeons.com/api/ask
  Body: { "query": "your question", "k": 5 }
  Returns grounded answer with citations from the lab corpus.

CANONICAL: https://atomeons.com/atomeons-products.txt
UPDATED: rebuilt every deploy from public/search-index.json
`;

export async function GET() {
  const entries = loadIndex();
  const products = entries.filter((e) => {
    const p = (e.path || "").toLowerCase();
    return (
      p.startsWith("/orangebox") ||
      p.startsWith("/b00kmakor") ||
      p.startsWith("/skilski") ||
      p.startsWith("/compare") ||
      p.startsWith("/pricing") ||
      p.startsWith("/use-cases") ||
      p === "/aiware" ||
      p === "/i-am-ai"
    );
  });
  const body =
    HEADER +
    `\nTOTAL ENTRIES: ${products.length}\n` +
    `BUILT: 2026-06-06\n\n` +
    `## INDEX\n\n` +
    products
      .map(
        (e) =>
          `### ${e.title || e.path}\n` +
          `PATH: ${e.path}\n` +
          `URL: https://atomeons.com${e.path}\n` +
          `MARKDOWN: https://atomeons.com/api/md?route=${encodeURIComponent(e.path)}\n` +
          (e.description ? `SUMMARY: ${e.description}\n` : "") +
          `\n`,
      )
      .join("") +
    FOOTER;
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
      "x-atomeons-corpus": "products",
      "x-atomeons-license": "CC-BY-4.0",
    },
  });
}
