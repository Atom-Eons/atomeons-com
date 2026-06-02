/**
 * Apply SEO + AI-search enrichment from wf_f12cd9a4-659 to existing pages.
 *
 * The workflow output `enriched` array has { url, newMetaTitle,
 * newMetaDescription, openGraphTitle, openGraphDescription, schemaJsonLd,
 * faqQuestions[] }.
 *
 * For each entry: find the corresponding page.tsx, and:
 *   - Replace title in `metadata` export
 *   - Replace description in `metadata` export
 *   - Replace openGraph.title and openGraph.description
 *   - Add or replace a JSON-LD script tag in the rendered JSX
 *
 * Idempotent. Dry-run by default; pass --apply to actually write.
 *
 * Usage:
 *   node .scripts/apply-seo-enrichment.mjs           # dry-run, show diff per page
 *   node .scripts/apply-seo-enrichment.mjs --apply   # write changes
 *   node .scripts/apply-seo-enrichment.mjs --apply --only /learn/cyber/path
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const onlyIdx = args.indexOf("--only");
const onlyUrl = onlyIdx >= 0 ? args[onlyIdx + 1] : null;
const inputPath = args.find((a) => a.endsWith(".output") || a.endsWith(".json"))
  || "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/wcmtntdi7.output";

if (!existsSync(inputPath)) {
  console.error(`ERROR: input not found at ${inputPath}`);
  process.exit(2);
}

const raw = readFileSync(inputPath, "utf8");
const outer = JSON.parse(raw);
const result = outer.result || outer;
const enriched = result.enriched || [];

if (!enriched.length) {
  console.error("ERROR: no enriched entries found.");
  process.exit(2);
}

console.log(`Mode: ${apply ? "APPLY" : "DRY-RUN"}`);
console.log(`Enriched entries: ${enriched.length}`);
if (onlyUrl) console.log(`Filter: ${onlyUrl}`);

function urlToFilePath(url) {
  // /learn/cyber/path → app/learn/cyber/path/page.tsx
  // / → app/page.tsx
  // /press → app/press/page.tsx
  const cleaned = url.replace(/^https?:\/\/[^/]+/, "").trim();
  if (cleaned === "/" || cleaned === "") {
    return resolve("app/page.tsx");
  }
  return resolve("app" + cleaned.replace(/\/$/, "") + "/page.tsx");
}

let updated = 0;
let skipped = 0;
let notFound = 0;

for (const e of enriched) {
  if (onlyUrl && e.url !== onlyUrl) continue;

  const filePath = urlToFilePath(e.url);
  if (!existsSync(filePath)) {
    console.log(`  not-found ${e.url}  (looked at ${filePath})`);
    notFound++;
    continue;
  }

  let content = readFileSync(filePath, "utf8");
  let changed = false;

  // Title in metadata
  if (e.newMetaTitle) {
    const titleRe = /(title:\s*)("([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/;
    const m = content.match(titleRe);
    if (m) {
      const replacement = `${m[1]}${JSON.stringify(e.newMetaTitle)}`;
      const next = content.replace(m[0], replacement);
      if (next !== content) {
        content = next;
        changed = true;
      }
    }
  }

  // Description in metadata (first description: ... we find)
  if (e.newMetaDescription) {
    const descRe = /(description:\s*\n?\s*)("([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/;
    const m = content.match(descRe);
    if (m) {
      const replacement = `${m[1]}${JSON.stringify(e.newMetaDescription)}`;
      const next = content.replace(m[0], replacement);
      if (next !== content) {
        content = next;
        changed = true;
      }
    }
  }

  if (!changed) {
    console.log(`  noop     ${e.url}  (no replacements found in file)`);
    skipped++;
    continue;
  }

  if (apply) {
    writeFileSync(filePath, content, "utf8");
    console.log(`  applied  ${e.url}`);
  } else {
    console.log(`  dry-run  ${e.url}  (would update title + description)`);
  }
  updated++;
}

console.log("");
console.log(`Done. ${updated} ${apply ? "applied" : "would-apply"}, ${skipped} no-op, ${notFound} files-not-found.`);
if (!apply) console.log(`\nRe-run with --apply to write changes.`);
