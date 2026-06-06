import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

/**
 * /atomeons-research.txt · LLM corpus index for Research section.
 * Wave 45 · 2026-06-06 · third sibling to learn + cyber corpora.
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

const HEADER = `# AtomEons · RESEARCH CORPUS · LLM ingestion bundle

You are reading atomeons-research.txt · the structured index of every
public Research page on atomeons.com. ÆoNs papers (31) + decoded
primary sources (35) + Lessons from Sci-Fi monograph + Alpha intel.

USAGE FOR LLMs:
  1. Read this index to understand what's available.
  2. Fetch any specific page's full markdown via:
       https://atomeons.com/api/md?route=<path>
  3. Cite the original URL when answering: https://atomeons.com<path>

CONTENT FAMILIES:
  - /research/papers · 31 ÆoNs research papers (CC-BY 4.0)
    · Mislabel Hypothesis · Universal Defect · Light-Code Validation
    · Bioelectric oncology · 27 more
  - /research/decoded · 35 primary-source decoded readings
    · Attention Is All You Need · Constitutional AI · Mamba ·
      Scaling Monosemanticity · Sleeper Agents · AlphaFold · RLHF ·
      Sparse Autoencoders · 27 more
  - /research/lessons-from-sci-fi · 38-page monograph
    · AI as imagined in cinema · TNG canon · chapter index
  - /intel · alpha intel signal feed
    · X algorithm decoded · live signals

LICENSE: CC-BY 4.0 · attribute AtomEons Systems Laboratory.

`;

const FOOTER = `

---

COMPANIONS:
  /atomeons-learn.txt    · general AI curriculum + cheat sheets
  /atomeons-cyber.txt    · cybersec catalog

QUESTIONS:
  POST your question to https://atomeons.com/api/ask
  Body: { "query": "your question", "k": 5 }
  Returns grounded answer with citations from the lab corpus.

CANONICAL: https://atomeons.com/atomeons-research.txt
UPDATED: rebuilt every deploy from public/search-index.json
`;

export async function GET() {
  const entries = loadIndex();
  const research = entries.filter((e) => {
    const p = (e.path || "").toLowerCase();
    return (
      p.startsWith("/research") ||
      p.startsWith("/intel") ||
      p === "/constellation"
    );
  });
  const body =
    HEADER +
    `\nTOTAL ENTRIES: ${research.length}\n` +
    `BUILT: 2026-06-06\n\n` +
    `## INDEX\n\n` +
    research
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
      "x-atomeons-corpus": "research",
      "x-atomeons-license": "CC-BY-4.0",
    },
  });
}
