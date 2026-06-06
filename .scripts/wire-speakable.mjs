#!/usr/bin/env node
/**
 * wire-speakable.mjs · idempotent patcher
 *
 * For every page.tsx under app/q/<slug>/, adds:
 *   1. import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd"
 *   2. .speakable-answer CSS class on the first paragraph that
 *      renders shortAnswer / SHORT_ANSWER / short_answer
 *   3. <SpeakableJsonLd /> JSX immediately after the last existing
 *      <script type="application/ld+json"> tag
 *
 * Safe to re-run — each step is guarded by a "does it already exist"
 * check. Doesn't touch the file if all three patches are present.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com/app/q";

const dirs = readdirSync(ROOT)
  .filter((d) => d.startsWith("what-"))
  .filter((d) => statSync(join(ROOT, d)).isDirectory());

let touched = 0;
let skipped = 0;

for (const d of dirs) {
  const file = join(ROOT, d, "page.tsx");
  let src = readFileSync(file, "utf8");
  const origLen = src.length;

  // Skip if already wired
  if (src.includes("SpeakableJsonLd")) {
    skipped++;
    continue;
  }

  // 1. Add import after the first `import type { Metadata }` line
  if (!/SpeakableJsonLd/.test(src)) {
    src = src.replace(
      /(import type \{ Metadata \} from "next";)/,
      `$1\nimport { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";`,
    );
  }

  // 2. Add .speakable-answer class to the short-answer paragraph
  //    Pattern variants seen in the /q pages:
  //      <p className="text-lg leading-relaxed text-[#d8d8d8]">{shortAnswer}</p>
  //      <p className="text-lg leading-relaxed text-[#e8e8e8]">{SHORT_ANSWER}</p>
  //      <p className="text-lg leading-relaxed text-[#cdcdcd]">{SHORT}</p>
  //    Strategy: find the first <p ... text-lg leading-relaxed text-[#...]"> and inject `speakable-answer ` at the start of className
  src = src.replace(
    /<p className="(text-lg leading-relaxed text-\[#[0-9a-fA-F]{3,6}\])"/,
    (m, classes) => {
      if (classes.includes("speakable-answer")) return m;
      return `<p className="speakable-answer ${classes}"`;
    },
  );

  // 3. Inject <SpeakableJsonLd /> after the last `dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }}` script
  //    We anchor on the closing `/>` of the last such <script /> tag.
  //    Find every </script> or self-closing /> for application/ld+json scripts.
  const scriptRegex =
    /<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{ __html: JSON\.stringify\([^)]+\) \}\}\s*\/>/g;
  const matches = [...src.matchAll(scriptRegex)];
  if (matches.length > 0) {
    // Try to extract slug + a short description from QUESTION or SHORT_ANSWER literal
    const slugMatch = file.match(/q\/(what-is-[^/]+)\/page\.tsx/);
    const slug = slugMatch ? slugMatch[1] : "what";
    const url = `https://atomeons.com/q/${slug}`;
    const niceName = slug
      .replace(/^what-is-/, "")
      .replace(/-/g, " ")
      .replace(/^./, (c) => c.toUpperCase());

    const inject = `\n      <SpeakableJsonLd\n` +
      `        url=\"${url}\"\n` +
      `        name=\"What is ${niceName}?\"\n` +
      `        description=\"Voice-readable short answer plus technical context.\"\n` +
      `        cssSelectors={[\".speakable-answer\"]}\n` +
      `      />`;
    const last = matches[matches.length - 1];
    const idx = last.index + last[0].length;
    src = src.slice(0, idx) + inject + src.slice(idx);
  }

  if (src.length !== origLen) {
    writeFileSync(file, src, "utf8");
    touched++;
    console.log(`  patched · ${d}`);
  } else {
    skipped++;
  }
}

console.log(`\nDone · touched=${touched} · skipped=${skipped}`);
