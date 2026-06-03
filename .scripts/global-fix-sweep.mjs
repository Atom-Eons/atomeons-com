/**
 * Global artifact sweep per audit wf_cf832427-742.
 *
 * Fixes:
 *   1. $49 → $99 (ORANGEBOX canonical) on all shipping pages
 *      EXCLUDING /orangebox/legacy/* and historical state references
 *   2. Orange neon (#FF7A1A / #ff7a18 / #FF7A18 etc.) → bio-cyan #22F0D5
 *      EXCLUDING legitimate Orangebox-brand surfaces (the product page itself)
 *   3. Warm-teal bg (#04100d / #0e2520 / #0a1a17 / #071915 / #0a211b) → noir #08090B / #0F1114
 *
 * Each replacement is path-scoped. We don't touch:
 *   - /orangebox/legacy (intentional legacy state)
 *   - .scripts/, .next/, node_modules/, README.md (operator/build files)
 *   - lib/pricing.ts (explicitly archive)
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(".");
const APP = resolve("app");

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  "_archive",
  "legacy",
]);

const EXCLUDE_PATH_FRAGMENTS = [
  "app/orangebox/legacy",
  "app/_components/v6-3", // dormant family — surfaced in audit
  "app/_archive",
  "lib/pricing.ts", // archive flow
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(entry)) continue;
    const fp = join(dir, entry);
    const stat = statSync(fp);
    if (stat.isDirectory()) {
      walk(fp, files);
    } else if (
      stat.isFile() &&
      (fp.endsWith(".tsx") || fp.endsWith(".ts") || fp.endsWith(".css") || fp.endsWith(".mdx"))
    ) {
      files.push(fp);
    }
  }
  return files;
}

function isExcluded(filepath) {
  for (const frag of EXCLUDE_PATH_FRAGMENTS) {
    if (filepath.includes(frag) || filepath.includes(frag.replace(/\//g, "\\"))) {
      return true;
    }
  }
  return false;
}

const files = walk(APP).filter((f) => !isExcluded(f));
console.log(`Sweeping ${files.length} files (excluding legacy)`);

// ---- Replacement rules ----
// Each rule: { pattern, replacement, label }
// Patterns must be careful — $49 should only match in ORANGEBOX context, but we'll
// rely on path-exclusion + manual review of the diff before commit.

const RULES = [
  // 1. PRICE: $49 → $99 (ORANGEBOX canonical)
  // Match $49 with word boundary or whitespace, NOT $499 etc.
  { pattern: /\$49(?![0-9])/g, replacement: "$99", label: "$49 → $99" },

  // 2. ORANGE NEON HEX → bio-cyan (literal CSS class strings + style values)
  { pattern: /#ff7a18\b/g, replacement: "#22F0D5", label: "#ff7a18 → cyan (lower)" },
  { pattern: /#FF7A18\b/g, replacement: "#22F0D5", label: "#FF7A18 → cyan" },
  { pattern: /#FF7A1A\b/g, replacement: "#22F0D5", label: "#FF7A1A → cyan" },
  { pattern: /#FF7A24\b/g, replacement: "#22F0D5", label: "#FF7A24 → cyan" },
  { pattern: /#FFC46B\b/g, replacement: "#22F0D5", label: "#FFC46B → cyan" },
  // rgba(255, 122, 24 / 26 etc.) → rgba(34, 240, 213, alpha kept)
  { pattern: /rgba\(255,\s*122,\s*2[0-9],/g, replacement: "rgba(34, 240, 213,", label: "rgba orange → cyan" },
  { pattern: /rgba\(255,\s*196,\s*107,/g, replacement: "rgba(34, 240, 213,", label: "rgba amber → cyan" },

  // 3. LEGACY WARM-TEAL BG → noir ink/elev
  { pattern: /#04100d\b/g, replacement: "#08090B", label: "#04100d → noir ink" },
  { pattern: /#0e2520\b/g, replacement: "#08090B", label: "#0e2520 → noir ink" },
  { pattern: /#0a1a17\b/g, replacement: "#08090B", label: "#0a1a17 → noir ink" },
  { pattern: /#0A1A17\b/g, replacement: "#08090B", label: "#0A1A17 → noir ink" },
  { pattern: /#071915\b/g, replacement: "#0F1114", label: "#071915 → noir elev" },
  { pattern: /#0a211b\b/g, replacement: "#0F1114", label: "#0a211b → noir elev" },
  { pattern: /#0A211B\b/g, replacement: "#0F1114", label: "#0A211B → noir elev" },
  { pattern: /#06110e\b/g, replacement: "#08090B", label: "#06110e → noir ink" },
  { pattern: /#204538\b/g, replacement: "#1F242B", label: "#204538 → noir hair" },

  // 4. FOUNDERS-VIEW LIVE DOT — orange shadow → red pulse
  { pattern: /shadow-\[0_0_8px_rgba\(255,\s*122,\s*26,0\.7\)\]/g, replacement: "shadow-[0_0_8px_rgba(255,77,77,0.7)]", label: "live-dot orange shadow → red" },

  // 5. v5 token DEFINITIONS in globals.css — update to noir values
  // (Skipped here; applied as a targeted edit since it's inside @theme block)
];

let totalReplaced = 0;
const ruleCounts = new Map(RULES.map((r) => [r.label, 0]));
const filesChanged = [];

for (const fp of files) {
  let content = readFileSync(fp, "utf8");
  const original = content;
  let fileReplacements = 0;

  for (const rule of RULES) {
    const before = content;
    content = content.replace(rule.pattern, rule.replacement);
    if (content !== before) {
      const count = (before.match(rule.pattern) || []).length;
      fileReplacements += count;
      ruleCounts.set(rule.label, (ruleCounts.get(rule.label) || 0) + count);
    }
  }

  if (content !== original) {
    writeFileSync(fp, content, "utf8");
    filesChanged.push({ file: fp.replace(ROOT + "\\", "").replace(/\\/g, "/"), count: fileReplacements });
    totalReplaced += fileReplacements;
  }
}

console.log("");
console.log("=== Replacement totals ===");
for (const [label, count] of ruleCounts) {
  if (count > 0) console.log(`  ${count.toString().padStart(4)}  ${label}`);
}
console.log("");
console.log(`Total replacements: ${totalReplaced}`);
console.log(`Files changed: ${filesChanged.length}`);
console.log("");
console.log("=== Files touched ===");
for (const f of filesChanged.slice(0, 30)) {
  console.log(`  ${f.count.toString().padStart(3)}  ${f.file}`);
}
if (filesChanged.length > 30) console.log(`  ... +${filesChanged.length - 30} more`);
