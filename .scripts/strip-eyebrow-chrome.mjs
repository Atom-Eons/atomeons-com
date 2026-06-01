/**
 * Strip the decorative `::xxx` mono-uppercase eyebrow pattern from
 * second-and-later sections across content pages. Keeps the hero
 * eyebrow but converts inner-section eyebrows to humanist-sans sub-
 * headlines BELOW the H2 (where they actually inform).
 *
 * Per readability-pass plan Step 3 / 4. Mono caps were dominating
 * the page — this strips them down to one signature mark per page.
 *
 * What we match: a font-mono p with text-[10px] uppercase tracking
 *   containing literal `::` prefix followed by descriptive text.
 *
 * Strategy: REPLACE with a humanist-sans sub-headline that comes
 *   AFTER the next <h2>. We can't do that perfectly with regex —
 *   so the simpler move is to DELETE the eyebrow p entirely when
 *   it's adjacent to an h2 (the h2 already opens the section).
 *
 * Files touched: explicit list (not a directory walk) to keep
 * surgical control.
 */

import { readFileSync, writeFileSync } from "node:fs";

const FILES = [
  "app/learn/atlas/page.tsx",
  "app/learn/career/page.tsx",
  "app/learn/trust/page.tsx",
  "app/learn/decode/page.tsx",
  "app/learn/calc/page.tsx",
  "app/learn/cyber/platforms/page.tsx",
  "app/learn/cyber/llm-warfare/page.tsx",
  "app/learn/cyber/labs/page.tsx",
  "app/learn/cyber/legal/page.tsx",
  "app/learn/cyber/serve/page.tsx",
  "app/learn/cyber/certs/page.tsx",
  "app/learn/cyber/ai-security/page.tsx",
  "app/learn/cyber/cyberwar/page.tsx",
  "app/learn/cyber/hackerone/page.tsx",
  "app/learn/cyber/path/page.tsx",
  "app/learn/cyber/modern/page.tsx",
];

const ROOT = "C:/AtomEons/github/atomeons-com";

// Pattern A: mono caps eyebrow paragraph with `::` prefix — multi-line content
// Matches:
//   <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
//     ::something here
//   </p>
// Or with style={{color}} variations.
const EYEBROW_PATTERNS = [
  // Multi-line eyebrow with className text-[#22F0D5]
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\] text-\[#22F0D5\]">\s*\n\s*::[^\n<]+\n\s*<\/p>/g,
  // Multi-line eyebrow with className text-[#FFB87A]
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\] text-\[#FFB87A\]">\s*\n\s*::[^\n<]+\n\s*<\/p>/g,
  // Multi-line eyebrow with style={{ color: ACCENT }}
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\]" style=\{\{ color: ACCENT \}\}>\s*\n\s*::[^\n<]+\n\s*<\/p>/g,
  // Multi-line eyebrow with style={{ color: WARN }}
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\]" style=\{\{ color: WARN \}\}>\s*\n\s*::[^\n<]+\n\s*<\/p>/g,
  // Single-line eyebrow with text-[#22F0D5]
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\] text-\[#22F0D5\]">::[^<]+<\/p>/g,
  // Single-line eyebrow with text-[#FFB87A]
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\] text-\[#FFB87A\]">::[^<]+<\/p>/g,
  // Single-line with style ACCENT
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\]" style=\{\{ color: ACCENT \}\}>::[^<]+<\/p>/g,
  // Single-line with style WARN
  /\s*<p className="font-mono text-\[10px\] uppercase tracking-\[0\.\d+em\]" style=\{\{ color: WARN \}\}>::[^<]+<\/p>/g,
];

let totalFiles = 0;
let totalEdits = 0;

for (const file of FILES) {
  const path = ROOT + "/" + file;
  let content;
  try {
    content = readFileSync(path, "utf8");
  } catch (e) {
    console.log(`  skip ${file} (not found)`);
    continue;
  }

  let editCount = 0;

  // Skip the FIRST hero eyebrow (keep one per page) — find first match position
  // and only strip eyebrows AFTER it.
  // Simpler approach: count occurrences of `::` pattern. If 1, leave it.
  // If 2+, strip all-but-first.
  for (const pattern of EYEBROW_PATTERNS) {
    let matches = [];
    let m;
    pattern.lastIndex = 0;
    while ((m = pattern.exec(content)) !== null) {
      matches.push({ index: m.index, length: m[0].length, text: m[0] });
      // Avoid infinite loops on zero-width matches
      if (m[0].length === 0) pattern.lastIndex++;
    }
    if (matches.length === 0) continue;

    // Strip ALL matches (we'll keep the hero eyebrow which is a custom
    // humanist-sans `text-[12px]` paragraph manually written, not in this pattern)
    // Actually wait — the hero pages I've already manually fixed use
    // text-[12px] font-medium tracking-tight, NOT font-mono text-[10px].
    // So matching font-mono text-[10px] uppercase only catches DECORATIVE
    // eyebrows, not the hero ones I've already restyled.
    // Therefore: strip ALL matches.
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i];
      content =
        content.slice(0, match.index) +
        content.slice(match.index + match.length);
    }
    editCount += matches.length;
  }

  if (editCount > 0) {
    writeFileSync(path, content, "utf8");
    totalFiles++;
    totalEdits += editCount;
    console.log(`  ${editCount}x  ${file}`);
  }
}

console.log("");
console.log(`✓ Stripped ${totalEdits} decorative \`::\` eyebrows across ${totalFiles} files`);
