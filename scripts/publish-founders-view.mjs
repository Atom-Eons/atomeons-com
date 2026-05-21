#!/usr/bin/env node
/**
 * publish-founders-view.mjs
 *
 * Parse a CAMPAIGN/NN-FOUNDERS-VIEW-*.md draft and insert it into the
 * `founders_view_posts` Supabase table with status='published'. The
 * /founders-view page hits Supabase via ISR (5-min revalidate) so the
 * letter is live within five minutes of the script returning success.
 *
 * Usage:
 *   node scripts/publish-founders-view.mjs <path-to-draft.md>
 *
 * Required env (loaded from .env.local or shell):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * The draft format the script expects (loose markdown):
 *   ## TITLE
 *   **THE HEADLINE.**
 *
 *   ## DEK
 *   <single paragraph dek>
 *
 *   ## BODY
 *   <body markdown — everything until the next H2>
 *
 *   ## PUBLISH NOTES (operator)
 *   - Slug: `proposed-slug`
 *   - ...
 *
 * The script extracts TITLE, DEK, BODY by section, and reads the slug
 * from PUBLISH NOTES. published_at defaults to now() unless --at=ISO
 * is supplied. status defaults to 'published' unless --draft is set.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

// --------------------------------------------------------------------
// args
// --------------------------------------------------------------------
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error(
    "usage: node scripts/publish-founders-view.mjs <draft.md> [--at=ISO] [--draft] [--dry]",
  );
  process.exit(1);
}
const filePath = args.find((a) => !a.startsWith("--"));
const atFlag = args.find((a) => a.startsWith("--at="));
const draftFlag = args.includes("--draft");
const dryFlag = args.includes("--dry");

if (!filePath || !fs.existsSync(filePath)) {
  console.error(`no such file: ${filePath}`);
  process.exit(1);
}

// --------------------------------------------------------------------
// env
// --------------------------------------------------------------------
// Best-effort .env.local loader (no extra dep)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, "utf8");
  for (const line of envText.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) {
      let v = m[2].trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      process.env[m[1]] = v;
    }
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!dryFlag && (!SUPABASE_URL || !SUPABASE_KEY)) {
  console.error(
    "env missing: need NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or pass --dry to print only).",
  );
  process.exit(1);
}

// --------------------------------------------------------------------
// parse the markdown draft
// --------------------------------------------------------------------
const raw = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

/**
 * Split the draft on `\n## ` boundaries. Each `parts[i>=1]` starts with
 * the heading name on its first line, then the section body.
 *
 * This is deliberately simple — the previous implementation used a
 * non-greedy regex with the `m` flag, which on 2026-05-21 truncated
 * letter 29's body to 14 words because `$` under multiline mode
 * matched end-of-LINE rather than end-of-input. Splitting on the
 * heading boundary avoids the regex pitfall entirely.
 */
const _parts = raw.split(/\n##\s+/);

function getSection(name) {
  for (let i = 1; i < _parts.length; i++) {
    const head = _parts[i].split("\n", 1)[0].trim();
    // prefix match so "PUBLISH NOTES" matches "PUBLISH NOTES (operator)" etc.
    if (head.toUpperCase().startsWith(name.toUpperCase())) {
      const sectionBody = _parts[i].split("\n").slice(1).join("\n").trim();
      // strip trailing `---` separator common in the draft format
      return sectionBody.replace(/\n+---\s*$/, "").trim();
    }
  }
  return null;
}

const rawTitle = getSection("TITLE");
const dek = getSection("DEK");
const body = getSection("BODY");
const publishNotes = getSection("PUBLISH NOTES");

if (!rawTitle || !body) {
  console.error(
    "draft is missing required sections. Need at least ## TITLE and ## BODY.",
  );
  process.exit(1);
}

// strip markdown bold/emphasis from title
const title = rawTitle
  .replace(/^\*\*|\*\*$/g, "")
  .replace(/\*\*/g, "")
  .replace(/^[*_]+|[*_]+$/g, "")
  .trim();

// slug — pull from PUBLISH NOTES `- Slug: \`...\``, else derive from filename
let slug = null;
if (publishNotes) {
  const slugMatch = publishNotes.match(/Slug:\s*[`'"]([^`'"]+)[`'"]/);
  if (slugMatch) slug = slugMatch[1].trim();
}
if (!slug) {
  slug = path
    .basename(filePath, ".md")
    .toLowerCase()
    .replace(/^\d+-/, "")
    .replace(/founders-view-/i, "");
}

// published_at
let publishedAt = new Date().toISOString();
if (atFlag) {
  publishedAt = new Date(atFlag.slice(5)).toISOString();
} else if (publishNotes) {
  // try to find a "published_at:" hint elsewhere in the draft header lines
  const atGuess = raw.match(/published[_ ]at:\s*([0-9T:\-+Z]{16,})/i);
  if (atGuess) publishedAt = new Date(atGuess[1]).toISOString();
}

const wordCount = body
  .replace(/[#*_>`\-]/g, " ")
  .split(/\s+/)
  .filter(Boolean).length;

const row = {
  slug,
  title,
  dek: dek || null,
  body_md: body,
  voice_tags: ["broadcast", "founders-view", "manual"],
  theme: null,
  word_count: wordCount,
  model_used: "manual-draft-from-campaign-folder",
  generation_ms: null,
  status: draftFlag ? "draft" : "published",
  published_at: publishedAt,
};

// --------------------------------------------------------------------
// dry print
// --------------------------------------------------------------------
console.log("───────────────────────────────────────────");
console.log("about to upsert into founders_view_posts:");
console.log("  slug         :", row.slug);
console.log("  title        :", row.title.slice(0, 80));
console.log("  dek          :", (row.dek || "").slice(0, 80));
console.log("  word_count   :", row.word_count);
console.log("  status       :", row.status);
console.log("  published_at :", row.published_at);
console.log("  body_md      :", row.body_md.length, "chars");
console.log("───────────────────────────────────────────");

if (dryFlag) {
  console.log("--dry: skipping insert.");
  process.exit(0);
}

// --------------------------------------------------------------------
// insert
// --------------------------------------------------------------------
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const { data, error } = await supabase
  .from("founders_view_posts")
  .upsert(row, { onConflict: "slug" })
  .select()
  .single();

if (error) {
  console.error("supabase error:", error.message);
  process.exit(1);
}

console.log("✓ published.");
console.log("  id           :", data.id);
console.log("  live url     : https://atomeons.com/founders-view");
console.log("  ISR window   : up to 5 minutes for the index to refresh");
