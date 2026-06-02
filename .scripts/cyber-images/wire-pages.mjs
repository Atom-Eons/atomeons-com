/**
 * Wire CyberHeroImage into all 12 cyber pages.
 *
 * For each page:
 *   1. Add `import { CyberHeroImage } from "..."` after the last existing import
 *      (skip if already present).
 *   2. Insert `<CyberHeroImage slug="..." alt="..." />` immediately after the
 *      opening `<main ...>` tag (skip if already present).
 *
 * Idempotent — re-run any time safely.
 */

import { readFileSync, writeFileSync } from "node:fs";

const ROOT = "C:/AtomEons/github/atomeons-com";

// Slug + page path + alt-text pairs.
const PAGES = [
  { slug: "cyber-index", path: "app/learn/cyber/page.tsx", alt: "Cinematic press-photo of a dimly lit cybersecurity operations center seen from above, single bio-cyan glow against pure black." },
  { slug: "modern", path: "app/learn/cyber/modern/page.tsx", alt: "Top-down photograph of a single small black drone loitering above fog at dawn, distant industrial silhouettes below." },
  { slug: "llm-warfare", path: "app/learn/cyber/llm-warfare/page.tsx", alt: "Macro close-up of a black machined-aluminum server module with a single bio-cyan status LED against pure black." },
  { slug: "platforms", path: "app/learn/cyber/platforms/page.tsx", alt: "Architectural shot of a dark glass-and-steel control-room wall with faint cyan reflected highlights." },
  { slug: "path", path: "app/learn/cyber/path/page.tsx", alt: "Long exposure of a single thin cyan light-trail rising along a black slate staircase that recedes into fog." },
  { slug: "labs", path: "app/learn/cyber/labs/page.tsx", alt: "Overhead photograph of a dark workbench with a black keyboard, closed laptop, and coiled cable arranged on dark concrete." },
  { slug: "hackerone", path: "app/learn/cyber/hackerone/page.tsx", alt: "Still-life of a sealed manila envelope on dark slate with a thin cyan ribbon of light crossing the frame." },
  { slug: "legal", path: "app/learn/cyber/legal/page.tsx", alt: "Symmetrical photograph of a dark brutalist courthouse facade at dusk, faint cyan reflection in tall windows." },
  { slug: "serve", path: "app/learn/cyber/serve/page.tsx", alt: "Silhouette of a dark concrete federal-style building at blue hour, single small bio-cyan-tinted window light." },
  { slug: "certs", path: "app/learn/cyber/certs/page.tsx", alt: "Macro still-life of a small stack of black hardcover books edge-on with a thin cyan bookmark protruding." },
  { slug: "ai-security", path: "app/learn/cyber/ai-security/page.tsx", alt: "Layered translucent dark panels backlit by a single bio-cyan glow source, suggesting a defensive barrier." },
  { slug: "cyberwar", path: "app/learn/cyber/cyberwar/page.tsx", alt: "Black undersea fiber-optic cable rising from dark water with droplets catching a thin cyan rim light." },
];

const IMPORT_LINE = 'import { CyberHeroImage } from "../_components/CyberHeroImage";';
const INDEX_IMPORT_LINE = 'import { CyberHeroImage } from "./_components/CyberHeroImage";';

let added = 0;
let skipped = 0;

for (const p of PAGES) {
  const filePath = `${ROOT}/${p.path}`;
  let content = readFileSync(filePath, "utf8");

  const importLine = p.slug === "cyber-index" ? INDEX_IMPORT_LINE : IMPORT_LINE;

  // 1. Add import if missing.
  if (!content.includes("CyberHeroImage")) {
    // Find the last `import ... from "..."` line.
    const importMatches = [...content.matchAll(/^import [^;]+;$/gm)];
    if (importMatches.length === 0) {
      console.log(`  SKIP ${p.path} — no imports found`);
      skipped++;
      continue;
    }
    const lastImport = importMatches[importMatches.length - 1];
    const insertAt = lastImport.index + lastImport[0].length;
    content =
      content.slice(0, insertAt) +
      "\n" + importLine +
      content.slice(insertAt);
  }

  // 2. Insert <CyberHeroImage> after opening <main> tag if missing.
  if (!content.includes("<CyberHeroImage")) {
    const mainOpen = content.match(/(<main[^>]*>)/);
    if (!mainOpen) {
      console.log(`  SKIP ${p.path} — no <main> tag found`);
      skipped++;
      continue;
    }
    const insertAt = mainOpen.index + mainOpen[0].length;
    const heroLine = `\n      <CyberHeroImage slug="${p.slug}" alt={${JSON.stringify(p.alt)}} />`;
    content =
      content.slice(0, insertAt) +
      heroLine +
      content.slice(insertAt);
  }

  writeFileSync(filePath, content, "utf8");
  console.log(`  ok    ${p.path}  (slug=${p.slug})`);
  added++;
}

console.log("");
console.log(`done. ${added} wired, ${skipped} skipped.`);
