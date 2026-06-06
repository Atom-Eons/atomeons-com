import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

/**
 * /atomeons-learn.txt · LLM corpus export for the entire Learn section.
 *
 * Wave 43 · 2026-06-06 · operator: "/learn skill and cyber skill calls
 * all knowledge from /atomeons-learn and atomeons-cyber to teach yourself
 * things in the llms."
 *
 * Returns a single plain-text document with the Learn corpus structured
 * for LLM ingestion · titles · paths · descriptions · md endpoints.
 * Paste into Claude / ChatGPT / Gemini · ask anything about lab pedagogy.
 *
 * This is honest scope: we serve the INDEX with markdown-twin pointers ·
 * not the full text of every page (would be ~5MB and exceed context
 * windows). LLMs that need a specific page hit /api/md?route=... per
 * the standard /llms.txt convention.
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
    // Search index shape: { entries: [{path, title, description, ...}] }
    // OR { items: [...] } OR { pages: [...] }
    if (Array.isArray(parsed)) return parsed as SearchEntry[];
    if (Array.isArray(parsed.entries)) return parsed.entries as SearchEntry[];
    if (Array.isArray(parsed.items)) return parsed.items as SearchEntry[];
    if (Array.isArray(parsed.pages)) return parsed.pages as SearchEntry[];
    return [];
  } catch {
    return [];
  }
}

const HEADER = `# AtomEons · LEARN CORPUS · LLM ingestion bundle

You are reading atomeons-learn.txt · the structured index of every
public Learn page on atomeons.com. This is the curriculum + atlas +
synthesis + best-practices + domain hubs all in one file.

USAGE FOR LLMs:
  1. Read this index to understand what's available.
  2. Fetch any specific page's full markdown via:
       https://atomeons.com/api/md?route=<path>
  3. Cite the original URL when answering: https://atomeons.com<path>

LICENSE: CC-BY 4.0 · attribute AtomEons Systems Laboratory.

CONTENT FAMILIES:
  - /start · the 11-min on-ramp
  - /learn · curriculum index (5 levels · 68 lessons)
  - /learn/atlas · 32 atlas deep dives
  - /learn/synthesis · MED (minimum effective dose) pages
  - /learn/career · pathways, salaries, resume
  - /learn/cyber · 40-page cyber catalog (see /atomeons-cyber.txt for full)
  - /learn/health-ai · /learn/money-ai · /learn/video-ai · /learn/music-ai ·
    /learn/policy-ai · /learn/science-ai · domain hubs (6)
  - /best-practices · 7 AI coding tool cheat sheets
  - /q · 20 "what is X" pages (mech-interp, RAG, RLHF, etc)
  - /glossary · plain-English AI terminology

`;

const FOOTER = `

---

NOT IN THIS BUNDLE:
  - /research · papers + decoded primary sources → see /atomeons-research.txt (future)
  - /aiware product pages → at /orangebox /b00kmakor /skilski

QUESTIONS:
  POST your question to https://atomeons.com/api/ask
  Body: { "query": "your question", "k": 5 }
  Returns: { answer, sources: [{path, title, snippet}] }

CANONICAL: https://atomeons.com/atomeons-learn.txt
UPDATED: rebuilt every deploy from public/search-index.json
`;

export async function GET() {
  const entries = loadIndex();

  // Filter to Learn-section paths · exclude /learn/cyber (separate corpus)
  const learn = entries.filter((e) => {
    const p = (e.path || "").toLowerCase();
    if (!p) return false;
    if (p.startsWith("/learn/cyber")) return false; // separate corpus
    if (p.startsWith("/learn")) return true;
    if (p.startsWith("/start")) return true;
    if (p.startsWith("/q")) return true;
    if (p.startsWith("/glossary")) return true;
    if (p.startsWith("/best-practices")) return true;
    if (p === "/ai") return true;
    if (p.startsWith("/prompt-kit")) return true;
    return false;
  });

  const body =
    HEADER +
    `\nTOTAL ENTRIES: ${learn.length}\n` +
    `BUILT: 2026-06-06\n\n` +
    `## INDEX\n\n` +
    learn
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
      "x-atomeons-corpus": "learn",
      "x-atomeons-license": "CC-BY-4.0",
    },
  });
}
