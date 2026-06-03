/**
 * Extract cyber drip emails + founder's view broadcast letters from
 * completed workflow output. Writes per-file markdown into:
 *   .scripts/cyber-emails/week-<N>.md   (paste into Loops drip)
 *   .scripts/founders-view-letters/<slug>.md   (operator's letter archive)
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const TASKS_DIR = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks";

function safe(p) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

// ---- cyber emails ----
const EMAILS_PATH = `${TASKS_DIR}/wu6a0uykf.output`;
const emailsOuter = safe(EMAILS_PATH);
const emails = emailsOuter?.result?.emails || [];
const EMAILS_OUT = resolve(".scripts/cyber-emails");
mkdirSync(EMAILS_OUT, { recursive: true });

let emailCount = 0;
const seriesLines = [
  "# AtomEons cyber career-track · 6-letter drip series",
  "",
  "Each block below is a Loops.so drip step. Paste into Loops dashboard →",
  "Loops → New Loop → trigger on `cyberSubscribed` event. The /api/cyber/subscribe",
  "route fires that event automatically when a subscriber signs up at",
  "/learn/cyber/start.",
  "",
  "---",
  "",
];

for (const e of emails) {
  if (typeof e !== "string" || e.startsWith("API Error")) continue;
  const weekMatch = e.match(/^#\s*WEEK:\s*(\d+)/m);
  const week = weekMatch ? weekMatch[1] : String(emailCount + 1);
  writeFileSync(resolve(EMAILS_OUT, `week-${week}.md`), e.trim() + "\n", "utf8");
  seriesLines.push("", e.trim(), "", "---", "");
  emailCount++;
}
writeFileSync(resolve(EMAILS_OUT, "_series.md"), seriesLines.join("\n"), "utf8");
console.log(`cyber emails: ${emailCount} written to ${EMAILS_OUT}`);

// ---- founder's view letters ----
const LETTERS_PATH = `${TASKS_DIR}/w668wd2o6.output`;
const lettersOuter = safe(LETTERS_PATH);
const letters = lettersOuter?.result?.letters || [];
const LETTERS_OUT = resolve(".scripts/founders-view-letters");
mkdirSync(LETTERS_OUT, { recursive: true });

let letterCount = 0;
for (const l of letters) {
  if (typeof l !== "string" || l.startsWith("API Error")) continue;
  const slugMatch = l.match(/^#\s*SLUG:\s*(\S+)/m);
  const slug = slugMatch ? slugMatch[1] : `letter-${letterCount + 1}`;
  writeFileSync(resolve(LETTERS_OUT, `${slug}.md`), l.trim() + "\n", "utf8");
  letterCount++;
}
console.log(`founders-view letters: ${letterCount} written to ${LETTERS_OUT}`);

console.log("");
console.log("Both batches archived as Markdown source. Next steps:");
console.log("  - Cyber drip: paste each week-N.md body into Loops dashboard");
console.log("  - Founder letters: integrate into Supabase founders_view table or import via /api/admin/publish-letter");
