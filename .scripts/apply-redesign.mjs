/**
 * Apply trillion-dollar-redesign workflow output (wf_98b94f09-3c1) to the site.
 *
 * Workflow produces 12 implementation packs each with { componentName, filePath, code, notes }.
 * This script writes each `code` to its `filePath` after dry-run preview.
 *
 * For safety:
 *   - Dry-run by default (shows what would be written)
 *   - --apply actually writes
 *   - --component <name> applies only one
 *   - --backup creates a .bak file before overwriting existing files
 *   - Refuses to write to files outside the project root
 *
 * Usage:
 *   node .scripts/apply-redesign.mjs                                  # dry-run all
 *   node .scripts/apply-redesign.mjs --apply --backup                 # apply + backup
 *   node .scripts/apply-redesign.mjs --apply --component Header       # only Header
 *
 * After applying, inspect the brief.imageDirection.specificImagesToGenerate
 * array and add those prompts to the photography library for the next image batch.
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const backup = args.includes("--backup");
const compIdx = args.indexOf("--component");
const onlyComponent = compIdx >= 0 ? args[compIdx + 1] : null;
const inputPath = args.find((a) => a.endsWith(".output") || a.endsWith(".json"))
  || "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/w9mj23fez.output";

const PROJECT_ROOT = resolve(".");

if (!existsSync(inputPath)) {
  console.error(`ERROR: workflow output not at ${inputPath}`);
  process.exit(2);
}

const raw = readFileSync(inputPath, "utf8");
const outer = JSON.parse(raw);
const result = outer.result || outer;
const impls = result.implementations || [];
const winner = result.winner;
const brief = result.brief;

if (!Array.isArray(impls) || impls.length === 0) {
  console.error("ERROR: no implementations in workflow output.");
  process.exit(2);
}

console.log(`Mode: ${apply ? "APPLY" : "DRY-RUN"}`);
console.log(`Winner direction: ${winner?.winnerDirectionName || "(unknown)"}`);
console.log(`Implementation packs: ${impls.length}`);
if (onlyComponent) console.log(`Filter: only ${onlyComponent}`);
console.log("");

if (brief?.executiveSummary) {
  console.log(`EXECUTIVE SUMMARY:`);
  console.log(brief.executiveSummary);
  console.log("");
}

let written = 0;
let skipped = 0;
let blocked = 0;

for (const impl of impls) {
  if (!impl.componentName || !impl.code || !impl.filePath) {
    console.log(`  SKIP — missing required fields`);
    skipped++;
    continue;
  }
  if (onlyComponent && impl.componentName !== onlyComponent) continue;

  let dest = impl.filePath.trim().replace(/^\/+/, "").replace(/\\/g, "/");
  const filePath = resolve(dest);

  // Safety: refuse to write outside project root
  if (!filePath.startsWith(PROJECT_ROOT)) {
    console.log(`  BLOCK ${impl.componentName} — destination outside project root: ${filePath}`);
    blocked++;
    continue;
  }

  const exists = existsSync(filePath);
  console.log(`  ${exists ? "exists" : "new   "} ${impl.componentName.padEnd(24)} ${dest}`);

  if (apply) {
    if (exists && backup) {
      copyFileSync(filePath, filePath + ".bak");
    }
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, impl.code, "utf8");
    written++;
  }
}

console.log("");
console.log(`Done. ${apply ? `${written} written` : "dry-run only"}, ${skipped} skipped, ${blocked} blocked.`);

if (!apply) {
  console.log(`\nRe-run with --apply --backup to write changes.`);
} else if (brief?.imageDirection?.specificImagesToGenerate?.length) {
  console.log(`\nThe brief recommends generating ${brief.imageDirection.specificImagesToGenerate.length} additional hero images.`);
  console.log(`To add these to the photography library:`);
  console.log(`  node .scripts/append-redesign-prompts.mjs --apply  # (write helper if needed)`);
}
