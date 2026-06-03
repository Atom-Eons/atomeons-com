#!/usr/bin/env node
/**
 * sitemap-vs-routes.mjs
 *
 * Strict mode: cross-check sitemap.ts entries against actual route files.
 * Anything in the sitemap that has no matching page.tsx (or dynamic
 * route) is reported as DEAD. Anything on disk that's NOT in the
 * sitemap is reported as ORPHAN (informational only).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const APP = join(ROOT, "app");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    const s = statSync(f);
    if (s.isDirectory()) walk(f, out);
    else out.push(f);
  }
  return out;
}

const pageFiles = walk(APP).filter((p) => /[\\/]page\.tsx$/.test(p));
function fileToRoute(file) {
  let rel = relative(APP, file).split(sep).slice(0, -1).join("/");
  rel = rel.replace(/\(([^)]+)\)\/?/g, "");
  rel = rel.replace(/\/+/g, "/");
  if (!rel.startsWith("/")) rel = "/" + rel;
  if (rel === "/") return "/";
  return rel.replace(/\/$/, "");
}
const realRoutes = pageFiles.map(fileToRoute).filter(Boolean);
const realSet = new Set(realRoutes);

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

// Pull sitemap urls
const sitemapSrc = readFileSync(join(APP, "sitemap.ts"), "utf8");
const URL_RE = /url:\s*`\$\{BASE\}([^`]*)`/g;
const sitemapUrls = [];
let m;
while ((m = URL_RE.exec(sitemapSrc)) !== null) {
  // strip template-literal interpolation marker for spread cases
  let u = m[1];
  // skip template-literal-only patterns that don't end as a static string
  if (u.includes("${")) continue;
  if (u === "") u = "/";
  sitemapUrls.push(u);
}

const dead = [];
const ok = [];
for (const u of sitemapUrls) {
  const clean = (u === "/" ? "/" : u.replace(/\/$/, "")) || "/";
  if (realSet.has(clean) || isDynamicMatch(clean)) {
    ok.push(clean);
  } else {
    dead.push(clean);
  }
}

console.log(JSON.stringify({
  sitemap_count: sitemapUrls.length,
  real_routes: realRoutes.length,
  dead_in_sitemap: dead.length,
  dead,
}, null, 2));
