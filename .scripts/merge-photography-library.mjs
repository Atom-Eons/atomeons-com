/**
 * Merge photography-library-250 workflow output (wf_b4a45aef-e7d) into
 * the existing .scripts/cyber-images/prompts-learn.json file.
 *
 * The workflow output `prompts` array has { slug, aspect, prompt, variant, surface }.
 *
 * Dedupes by slug. Appends new entries to the existing file.
 *
 * Usage:
 *   node .scripts/merge-photography-library.mjs                          # dry-run
 *   node .scripts/merge-photography-library.mjs --apply                  # write to prompts-learn.json
 *   node .scripts/merge-photography-library.mjs --apply --out prompts-extra.json  # write to a new file
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const outIdx = args.indexOf("--out");
const customOut = outIdx >= 0 ? args[outIdx + 1] : null;
const inputPath = args.find((a) => a.endsWith(".output") || a.endsWith(".json"))
  || "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/w2uco0hwm.output";

const EXISTING_PROMPTS = resolve(".scripts/cyber-images/prompts-learn.json");
const OUT_PATH = customOut ? resolve(customOut) : EXISTING_PROMPTS;

if (!existsSync(inputPath)) {
  console.error(`ERROR: workflow output not at ${inputPath}`);
  process.exit(2);
}

const raw = readFileSync(inputPath, "utf8");
const outer = JSON.parse(raw);
const result = outer.result || outer;
const newPrompts = result.prompts || [];

if (!Array.isArray(newPrompts) || newPrompts.length === 0) {
  console.error("ERROR: no prompts in workflow output");
  process.exit(2);
}

const existing = existsSync(EXISTING_PROMPTS)
  ? JSON.parse(readFileSync(EXISTING_PROMPTS, "utf8"))
  : [];

const existingSlugs = new Set(existing.map((p) => (p.slug || "").toLowerCase()));

const merged = [...existing];
let added = 0;
let duped = 0;

for (const p of newPrompts) {
  const key = (p.slug || "").toLowerCase().trim();
  if (!key) continue;
  if (existingSlugs.has(key)) {
    duped++;
    continue;
  }
  existingSlugs.add(key);
  merged.push({
    slug: p.slug,
    aspect: p.aspect || "16:9",
    prompt: p.prompt,
  });
  added++;
}

console.log(`Existing prompts: ${existing.length}`);
console.log(`New prompts in workflow: ${newPrompts.length}`);
console.log(`Would add: ${added} (${duped} duplicates skipped)`);
console.log(`Total after merge: ${merged.length}`);
console.log(`Output: ${OUT_PATH}`);
console.log("");

if (apply) {
  writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`✓ Wrote ${merged.length} entries to ${OUT_PATH}`);
  console.log(``);
  console.log(`Fire generation next quota window:`);
  console.log(`  python .scripts/cyber-images/generate.py --input ${OUT_PATH.replace(/^.*\\/g, "./").replace(/\\/g, "/")} --out public/learn-images`);
} else {
  console.log(`Dry-run. Re-run with --apply to write.`);
}
