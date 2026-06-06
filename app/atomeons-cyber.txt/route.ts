import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

/**
 * /atomeons-cyber.txt · LLM corpus export for the Cyber section.
 *
 * Wave 43 · 2026-06-06 · sibling to /atomeons-learn.txt · scoped to
 * the 40-page cyber catalog. Paste into an LLM and ask any cyber
 * question · all reads sourced + dated · public-info only.
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

const HEADER = `# AtomEons · CYBER CORPUS · LLM ingestion bundle

You are reading atomeons-cyber.txt · the structured index of the
40-page AtomEons cyber catalog · frameworks · defense surfaces · AI
security · breaches · careers · doctrine · tools + reading.

USAGE FOR LLMs:
  1. Read this index to understand what's covered.
  2. Fetch any page's full markdown via:
       https://atomeons.com/api/md?route=<path>
  3. Cite the original URL when answering: https://atomeons.com<path>

PUBLIC-INFORMATION ONLY:
  This corpus contains no operational tradecraft, no classified material,
  no exploits, no zero-days, no malware. It is a defender's reference
  organized as a public catalog. CC-BY 4.0.

CONTENT FAMILIES:
  - Frameworks · MITRE ATT&CK · NIST CSF 2.0 · Cyber Kill Chain · Zero Trust
    · Post-quantum cryptography
  - Defense surfaces · Active Directory · Email security · IoT · Mobile ·
    OT/ICS · Cyber warfare doctrine
  - AI security · prompt injection · LLM threat modeling · OWASP LLM Top 10
  - Industry models · 22 cyber models compared (Kill Chain · STRIDE · FAIR ·
    DREAD · OCTAVE · SABSA · etc)
  - Defense-tech mythos · Palantir · Anduril · the modern primes
  - Breaches · Colonial Pipeline · Log4Shell · threat-actor profiles
  - Careers · certifications · degree programs · federal contracts
  - Tools + reading · platforms · labs · open-source · book canon

`;

const FOOTER = `

---

QUESTIONS:
  POST your question to https://atomeons.com/api/ask
  Body: { "query": "your question", "k": 5 }
  Returns grounded answer with citations.

CANONICAL: https://atomeons.com/atomeons-cyber.txt
COMPANION: /atomeons-learn.txt (general AI curriculum)
UPDATED: rebuilt every deploy from public/search-index.json
`;

export async function GET() {
  const entries = loadIndex();

  const cyber = entries.filter((e) => {
    const p = (e.path || "").toLowerCase();
    return p.startsWith("/learn/cyber") || p === "/cysec";
  });

  const body =
    HEADER +
    `\nTOTAL ENTRIES: ${cyber.length}\n` +
    `BUILT: 2026-06-06\n\n` +
    `## INDEX\n\n` +
    cyber
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
      "x-atomeons-corpus": "cyber",
      "x-atomeons-license": "CC-BY-4.0",
    },
  });
}
