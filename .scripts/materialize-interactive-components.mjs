/**
 * Materialize interactive-components-15 workflow output (wf_c0d657b9-ccb).
 * Each component arrives as { componentName, filePath, code, notes }.
 * Writes each code string to the suggested file path under app/learn/cyber/_components/
 * (or app/_components/ if path indicates that).
 *
 * Usage: node .scripts/materialize-interactive-components.mjs <workflow-output-json-path>
 *
 * Idempotent. Skips components whose file already exists unless --force.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const argInput = process.argv[2];
const force = process.argv.includes("--force");
const DEFAULT_OUTPUT = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/wikeav5tu.output";

const inputPath = argInput || DEFAULT_OUTPUT;
if (!existsSync(inputPath)) {
  console.error(`ERROR: input not found at ${inputPath}`);
  process.exit(2);
}

const raw = readFileSync(inputPath, "utf8");
const outer = JSON.parse(raw);
const result = outer.result || outer;
const shippable = result.shippable || [];

if (!Array.isArray(shippable) || shippable.length === 0) {
  console.error("ERROR: no shippable components in workflow output.");
  process.exit(2);
}

console.log(`Materializing ${shippable.length} interactive components`);

let written = 0;
let skipped = 0;

for (const c of shippable) {
  if (!c.componentName || !c.code) {
    console.log(`  SKIP — missing componentName or code`);
    continue;
  }

  // Normalize file path. Default to app/learn/cyber/_components/{Name}.tsx.
  let suggested = (c.filePath || "").trim().replace(/^\/+/, "");
  if (!suggested) {
    suggested = `app/learn/cyber/_components/${c.componentName}.tsx`;
  }
  // Convert windows backslashes
  suggested = suggested.replace(/\\/g, "/");

  const filePath = resolve(suggested);

  if (existsSync(filePath) && !force) {
    console.log(`  SKIP ${suggested} — file exists (use --force to overwrite)`);
    skipped++;
    continue;
  }

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, c.code, "utf8");
  console.log(`  ok    ${suggested}  (${c.componentName})`);
  written++;
}

console.log("");
console.log(`✓ Wrote ${written} components, ${skipped} skipped.`);
if (shippable.length) {
  console.log(`\nManifest from workflow:`);
  const manifest = result.manifest?.shipManifest || [];
  for (const m of manifest) {
    console.log(`  ${m.componentName}`);
    console.log(`    file:      ${m.filePath}`);
    console.log(`    placement: ${m.suggestedPlacement || "(no placement suggested)"}`);
  }
}
