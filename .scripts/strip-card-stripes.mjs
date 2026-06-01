/**
 * Strip the 4px cyan/orange/dynamic card left-border inline-style across
 * every catalog page. Replaces:
 *   style={{ borderLeft: "4px solid #22F0D5" }}
 *   style={{ borderLeft: `4px solid ${X}` }}
 *   style={{ borderLeftWidth: "4px", borderLeftColor: ... }}
 *   style={{ borderLeftWidth: "3px", borderLeftColor: ... }}
 *
 * Per readability-pass plan Step 9: catalog cards lose their per-card
 * stripe (which became wallpaper at 30+ stacked stripes per viewport).
 * Section-level cyan accent is preserved via section borders + hover state.
 *
 * Preserves: borderLeft inside OpenGraph image components, library page
 * (which uses 3px not 4px and reads as level indicator), opengraph-image.tsx.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com/app";

// Files to SKIP — keep the stripe as legitimate design element
const SKIP_FILES = [
  "app/glossary/opengraph-image.tsx",
  "app/learn/library/page.tsx", // 3px lvl-accent reads as level indicator
];

function walkTsx(dir, out) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      walkTsx(p, out);
    } else if (s.isFile() && (p.endsWith(".tsx") || p.endsWith(".ts"))) {
      out.push(p);
    }
  }
  return out;
}

// Patterns to strip — each entry is [regex, description].
// We match the WHOLE style={{ ... }} prop when it contains borderLeft.
// Capture group sense:
//  - Match `style={{` then anything up to and including borderLeft,
//    then anything until the closing `}}`. Replace with empty string.
const STRIP_PATTERNS = [
  // style={{ borderLeft: "4px solid #..." }}
  /\s+style=\{\{\s*borderLeft:\s*["`]4px solid #[0-9A-Fa-f]{3,6}["`]\s*\}\}/g,
  // style={{ borderLeft: `4px solid ${VAR}` }}
  /\s+style=\{\{\s*borderLeft:\s*`4px solid \$\{[^}]+\}`\s*\}\}/g,
  // style={{ borderLeftWidth: "4px", borderLeftColor: "..." }}
  /\s+style=\{\{\s*borderLeftWidth:\s*["`]4px["`],\s*borderLeftColor:\s*[^}]+\s*\}\}/g,
  // style={{ borderLeftWidth: "3px", borderLeftColor: "..." }} — also strip 3px cyan
  /\s+style=\{\{\s*borderLeftWidth:\s*["`]3px["`],\s*borderLeftColor:\s*["`]#22F0D5["`]\s*\}\}/g,
];

const files = walkTsx(ROOT, []);
let totalEdits = 0;
let filesEdited = 0;

for (const file of files) {
  const relative = file.replace(/\\/g, "/").replace("C:/AtomEons/github/atomeons-com/", "");
  if (SKIP_FILES.includes(relative)) continue;

  let content = readFileSync(file, "utf8");
  let editCount = 0;

  for (const pattern of STRIP_PATTERNS) {
    const before = content;
    content = content.replace(pattern, "");
    const matches = (before.match(pattern) || []).length;
    editCount += matches;
  }

  if (editCount > 0) {
    writeFileSync(file, content, "utf8");
    totalEdits += editCount;
    filesEdited++;
    console.log(`  ${editCount}x  ${relative}`);
  }
}

console.log("");
console.log(`✓ Stripped ${totalEdits} card stripes across ${filesEdited} files`);
