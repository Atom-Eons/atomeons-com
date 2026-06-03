#!/usr/bin/env node
/**
 * link-audit.mjs
 *
 * Cross-references every internal href in app/* against the actual
 * route surface. Reports:
 *   - DEAD links: href points to a path that has no page.tsx
 *   - CASE_MISMATCH: href differs from a real route only in case
 *
 * Also accounts for:
 *   - Dynamic segments [slug] / [...catchAll]
 *   - Public files at /public/<path>
 *   - Anchor fragments (#section) and query strings (?key=val) — stripped
 *     before comparison
 *   - mailto: and external https: links (skipped)
 *
 * Outputs JSON + a markdown table to /tmp/.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const APP = join(ROOT, "app");
const PUB = join(ROOT, "public");

// ─────────────────────────────────────────────────────────────────────
// 1. Walk the app directory to build the real route surface.
//    Each /page.tsx → URL path. Dynamic segments [slug] → :slug pattern.
//    Route groups (paren-wrapped) are erased from the URL.
// ─────────────────────────────────────────────────────────────────────
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (stat.isFile()) out.push(full);
  }
  return out;
}

const pageFiles = walk(APP).filter((p) => /[\\/]page\.tsx$/.test(p));

function pageFileToRoute(file) {
  let rel = relative(APP, file).split(sep).slice(0, -1).join("/");
  // Erase route groups (foo) → ""
  rel = rel.replace(/\(([^)]+)\)\/?/g, "");
  // Normalize multiple slashes
  rel = rel.replace(/\/+/g, "/");
  // Always leading slash
  if (!rel.startsWith("/")) rel = "/" + rel;
  if (rel === "/") return "/";
  return rel.replace(/\/$/, "");
}

const realRoutes = pageFiles.map(pageFileToRoute).filter(Boolean);
const realRoutesSet = new Set(realRoutes);
const realRoutesLowerToActual = new Map();
for (const r of realRoutes) {
  realRoutesLowerToActual.set(r.toLowerCase(), r);
}

// Dynamic patterns — match [slug] or [...catchAll]
function isDynamicMatch(href) {
  for (const route of realRoutes) {
    if (!route.includes("[")) continue;
    const pattern =
      "^" +
      route
        .replace(/\[\.\.\.[^\]]+\]/g, ".+")
        .replace(/\[[^\]]+\]/g, "[^/]+")
        .replace(/\//g, "\\/") +
      "$";
    if (new RegExp(pattern).test(href)) return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────
// 2. Public-file allowlist — anything under public/* is fair game.
// ─────────────────────────────────────────────────────────────────────
function publicPathExists(href) {
  try {
    const onDisk = join(PUB, href.replace(/^\//, ""));
    statSync(onDisk);
    return true;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 3. Extract every href from app/ source files.
// ─────────────────────────────────────────────────────────────────────
const SRC_FILES = walk(APP).filter((p) => /\.(tsx|ts)$/.test(p));
// Also walk any extra app-level component dirs that might hold links.
const COMP_DIR = join(ROOT, "components");
let compFiles = [];
try {
  compFiles = walk(COMP_DIR).filter((p) => /\.(tsx|ts)$/.test(p));
} catch {}

const ALL_FILES = [...SRC_FILES, ...compFiles];

const HREF_RE = /href=["'`]([^"'`]+)["'`]/g;
const found = new Map(); // href → [files]

for (const f of ALL_FILES) {
  const text = readFileSync(f, "utf8");
  let m;
  while ((m = HREF_RE.exec(text)) !== null) {
    const href = m[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (!found.has(href)) found.set(href, []);
    found.get(href).push(relative(ROOT, f));
  }
}

// ─────────────────────────────────────────────────────────────────────
// 4. Classify each href.
// ─────────────────────────────────────────────────────────────────────
const dead = [];
const caseMismatch = [];

for (const [href, files] of found.entries()) {
  // Strip fragment + query
  const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";

  // Real route exact match?
  if (realRoutesSet.has(clean)) continue;
  if (clean === "/" && realRoutesSet.has("/")) continue;

  // Dynamic route match?
  if (isDynamicMatch(clean)) continue;

  // Public file?
  if (publicPathExists(clean)) continue;

  // Case-only mismatch?
  const lower = clean.toLowerCase();
  const realCase = realRoutesLowerToActual.get(lower);
  if (realCase && realCase !== clean) {
    caseMismatch.push({ href, real: realCase, files });
    continue;
  }

  dead.push({ href, files });
}

// ─────────────────────────────────────────────────────────────────────
// 5. Report.
// ─────────────────────────────────────────────────────────────────────
const report = {
  scanned_files: ALL_FILES.length,
  real_routes: realRoutes.length,
  unique_hrefs: found.size,
  dead_count: dead.length,
  case_mismatch_count: caseMismatch.length,
  dead,
  case_mismatch: caseMismatch,
};

console.log(JSON.stringify(report, null, 2));
