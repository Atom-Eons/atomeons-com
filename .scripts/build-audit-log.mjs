#!/usr/bin/env node
/**
 * build-audit-log.mjs — pre-build the public commit history for /audit-log.
 *
 * Runs `git log` at build time and writes the last 250 commits to
 * public/audit-log.json. The /audit-log page reads this file at
 * render time so the page works even on build environments that
 * can't shell out to git (some serverless platforms).
 *
 * Idempotent · safe to re-run.
 */
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

// Resolve to the project root from cwd · works on both Windows (where
// the project is at C:/AtomEons/github/atomeons-com) and Linux (Vercel
// build root). package.json sits at the project root; we rely on it.
const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR, { recursive: true });
}
const OUT = join(PUBLIC_DIR, "audit-log.json");

// Vercel ships shallow clones by default · unshallow first if needed.
// "git rev-parse --is-shallow-repository" returns "true" or "false".
try {
  const shallow = execSync(`git rev-parse --is-shallow-repository`, { encoding: "utf8" }).trim();
  if (shallow === "true") {
    console.log("[audit-log] unshallowing repo for full history…");
    execSync(`git fetch --unshallow --quiet 2>&1 || true`, { encoding: "utf8" });
  }
} catch (e) {
  console.warn("[audit-log] unshallow check failed (continuing):", e.message);
}

let raw = "";
try {
  raw = execSync(
    `git log -n 250 --pretty=format:"%H|%cI|%s|%an" --date=iso-strict`,
    { encoding: "utf8" },
  );
} catch (e) {
  console.error("[audit-log] git log failed:", e.message);
  // Write an empty array so the page reads a valid file
  writeFileSync(OUT, "[]");
  console.log("[audit-log] wrote empty file to", OUT);
  process.exit(0);
}

const commits = raw
  .split("\n")
  .filter((l) => l.trim().length > 0)
  .map((l) => {
    const [sha, date, subject, author] = l.split("|");
    return {
      sha: sha ?? "",
      shortSha: (sha ?? "").slice(0, 8),
      date: date ?? "",
      subject: subject ?? "",
      author: author ?? "",
    };
  });

writeFileSync(OUT, JSON.stringify(commits, null, 0));
console.log(`[audit-log] wrote ${commits.length} commits to ${OUT}`);
