/**
 * Master materializer for workflow markdown outputs → TSX route pages.
 *
 * Handles all the in-flight workflow batches:
 *   - atlas-expansion (wwhgixpjh) → app/learn/atlas/{slug}/page.tsx
 *   - useful-non-ai-papers (w8lfjei7e) → app/research/decoded/{slug}/page.tsx
 *   - arxiv-decoded-v2 (wbk0qepev) → app/research/decoded/{slug}/page.tsx
 *   - cyber-retry-8 (wfvuv6nyl) → app/learn/cyber/{slug}/page.tsx
 *
 * Each agent returns markdown with structured headers:
 *   # SLUG / # TITLE / # SUBTITLE / # LEDE / # AUTHORS / # ARXIV / # ONESENTENCE
 *   followed by ## section bodies.
 *
 * The script parses, normalizes, and writes a clean TSX file per page.
 * Idempotent — skips slugs whose page.tsx already exists.
 *
 * Usage:
 *   node .scripts/materialize-batch.mjs
 *
 * Optional flags:
 *   --force   overwrite existing pages
 *   --dry     show what would be written, write nothing
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dry = args.includes("--dry");

const TASKS = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks";

const BATCHES = [
  {
    name: "atlas-expansion",
    taskId: "wwhgixpjh",
    field: "pages",
    routeDir: "app/learn/atlas",
    crumbSection: "Atlas",
    crumbHref: "/learn/atlas",
    canonicalBase: "https://atomeons.com/learn/atlas",
  },
  {
    name: "useful-non-ai-papers",
    taskId: "w8lfjei7e",
    field: "pages",
    routeDir: "app/research/decoded",
    crumbSection: "Research / Decoded",
    crumbHref: "/research/decoded",
    canonicalBase: "https://atomeons.com/research/decoded",
  },
  {
    name: "arxiv-decoded-v2",
    taskId: "wbk0qepev",
    field: "pages",
    routeDir: "app/research/decoded",
    crumbSection: "Research / Decoded",
    crumbHref: "/research/decoded",
    canonicalBase: "https://atomeons.com/research/decoded",
  },
  {
    name: "cyber-retry-8",
    taskId: "wfvuv6nyl",
    field: "pages",
    routeDir: "app/learn/cyber",
    crumbSection: "Cyber",
    crumbHref: "/learn/cyber",
    canonicalBase: "https://atomeons.com/learn/cyber",
  },
];

function safeRead(p) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function parseMarkdownHeader(text, key) {
  const re = new RegExp("^#\\s*" + key + "\\s*:\\s*(.+)$", "m");
  return text.match(re)?.[1]?.trim() ?? "";
}

function parseSections(text) {
  // Body starts after the last single-# header line. Everything after
  // is the markdown sections (## ...).
  const lines = text.split("\n");
  let bodyStart = 0;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^#\s/.test(lines[i])) {
      bodyStart = i + 1;
      break;
    }
  }
  const body = lines.slice(bodyStart).join("\n").trim();
  // Split on ## headers
  const parts = body.split(/\n##\s+/);
  if (parts.length === 0) return [];
  // First chunk has no leading ## (intro prose before any subhead) — skip if empty
  const sections = [];
  // Handle leading prose (no ##) as 'intro'
  const first = parts[0].trim();
  if (first && !first.startsWith("## ")) {
    // It's intro prose, may have ## start trimmed. Skip — captured already in LEDE field.
  }
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    const nl = p.indexOf("\n");
    if (nl < 0) {
      sections.push({ heading: p.trim(), content: "" });
      continue;
    }
    sections.push({
      heading: p.slice(0, nl).trim(),
      content: p.slice(nl + 1).trim(),
    });
  }
  return sections;
}

function escapeJsxBackticks(s) {
  return String(s).replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function buildTsx(page, batch) {
  const title = page.title || "Untitled";
  const subtitle = page.subtitle || page.onesentence || "";
  const lede = page.lede || page.onesentence || "";
  const authors = page.authors || "";
  const arxiv = page.arxiv || "";
  const sections = page.sections || [];

  const canonical = `${batch.canonicalBase}/${page.slug}`;

  return `import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: ${JSON.stringify(title + " · " + batch.crumbSection + " · AtomEons")},
  description: ${JSON.stringify(lede || subtitle || title)},
  alternates: { canonical: ${JSON.stringify(canonical)} },
  openGraph: {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(subtitle || lede)},
    url: ${JSON.stringify(canonical)},
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href=${JSON.stringify(batch.crumbHref)} className="hover:text-[#22F0D5]">${batch.crumbSection}</Link>{" "}
          <span className="text-[#1A2225]">/</span> {\`${escapeJsxBackticks(title)}\`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
${
  authors || arxiv
    ? `          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {\`${escapeJsxBackticks([authors, arxiv].filter(Boolean).join(" · "))}\`}
          </p>`
    : `          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            {\`${escapeJsxBackticks(subtitle || "Decoded")}\`}
          </p>`
}
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {\`${escapeJsxBackticks(title)}\`}
          </h1>
${
  lede
    ? `          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {\`${escapeJsxBackticks(lede)}\`}
          </p>`
    : ""
}
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
${sections
  .map(
    (s, i) => `          <article key={${i}}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {\`${escapeJsxBackticks(String(i + 1).padStart(2, "0"))}\`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {\`${escapeJsxBackticks(s.heading)}\`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {\`${escapeJsxBackticks(s.content)}\`}
            </div>
          </article>`,
  )
  .join("\n\n")}
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href=${JSON.stringify(batch.crumbHref)} className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← ${batch.crumbSection.toLowerCase()} index
          </Link>
        </div>
      </section>
    </main>
  );
}
`;
}

function processAgentText(text) {
  if (typeof text !== "string") return null;
  if (text.startsWith("API Error") || text.startsWith("Error:")) return null;
  const slug = parseMarkdownHeader(text, "SLUG");
  if (!slug) return null;
  return {
    slug,
    title: parseMarkdownHeader(text, "TITLE"),
    subtitle: parseMarkdownHeader(text, "SUBTITLE"),
    lede: parseMarkdownHeader(text, "LEDE"),
    authors: parseMarkdownHeader(text, "AUTHORS"),
    arxiv: parseMarkdownHeader(text, "ARXIV"),
    onesentence: parseMarkdownHeader(text, "ONESENTENCE"),
    sections: parseSections(text),
  };
}

let totalWritten = 0;
let totalSkipped = 0;
let totalFailed = 0;
const writtenSlugs = [];

for (const batch of BATCHES) {
  const taskPath = `${TASKS}/${batch.taskId}.output`;
  const outer = safeRead(taskPath);
  if (!outer) {
    console.log(`SKIP ${batch.name} — task file missing: ${taskPath}`);
    continue;
  }
  const items = outer.result?.[batch.field] || [];
  console.log(`\n=== ${batch.name} (${items.length} items) ===`);
  for (const item of items) {
    const page = processAgentText(item);
    if (!page) {
      totalFailed++;
      continue;
    }
    const filePath = resolve(batch.routeDir, page.slug, "page.tsx");
    if (existsSync(filePath) && !force) {
      console.log(`  skip ${page.slug} — exists`);
      totalSkipped++;
      continue;
    }
    if (dry) {
      console.log(`  dry ${page.slug} → ${filePath}`);
      continue;
    }
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, buildTsx(page, batch), "utf8");
    writtenSlugs.push({ batch: batch.name, slug: page.slug, dir: batch.routeDir });
    console.log(`  ok ${page.slug} → ${batch.routeDir}/${page.slug}/page.tsx`);
    totalWritten++;
  }
}

console.log(`\n=== TOTAL ===`);
console.log(`  wrote   ${totalWritten}`);
console.log(`  skipped ${totalSkipped}`);
console.log(`  failed  ${totalFailed}`);

if (writtenSlugs.length > 0) {
  console.log(`\nSitemap entries to add:`);
  for (const w of writtenSlugs) {
    const base = w.dir.replace(/^app\//, "/");
    console.log(`  { url: \`\${BASE}${base}/${w.slug}\`, lastModified: now, changeFrequency: "monthly", priority: 0.91 },`);
  }
}
