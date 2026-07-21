import fs from "node:fs";
import path from "node:path";

const assetsRoot = path.join("dist", "assets");
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }

    if (entry.name.endsWith(".html")) {
      htmlFiles.push(filePath);
    }
  }
}

walk(assetsRoot);

const failures = [];
const warnings = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = file
    .replace(assetsRoot, "")
    .replaceAll("\\", "/")
    .replace(/\/index\.html$/, "/")
    .replace(/\.html$/, "");

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim() ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]?.trim() ?? "";
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const emptyLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>\s*<\/a>/gi)].map((match) => match[1]);
  const imagesMissingAlt = [...html.matchAll(/<img\b([^>]*)>/gi)]
    .filter((match) => !/\salt=/.test(match[1]))
    .map((match) => match[0].slice(0, 180));

  if (!title) failures.push({ route, file, issue: "missing title" });
  if (!description) failures.push({ route, file, issue: "missing meta description" });
  if (!canonical && !route.includes("/books/I-AM-AI-Opus-4.7")) {
    failures.push({ route, file, issue: "missing canonical" });
  }
  if (h1Count !== 1 && !route.includes("/books/I-AM-AI-Opus-4.7")) {
    failures.push({ route, file, issue: "expected exactly one h1", h1Count });
  }
  if (emptyLinks.length) failures.push({ route, file, issue: "empty anchor text", emptyLinks });
  if (imagesMissingAlt.length) failures.push({ route, file, issue: "image missing alt", imagesMissingAlt });

  if (description.length > 180) warnings.push({ route, issue: "long meta description", length: description.length });
  if (title.length > 75) warnings.push({ route, issue: "long title", length: title.length });
}

console.log(JSON.stringify({
  pass: failures.length === 0,
  checked: htmlFiles.length,
  failures,
  warnings,
}, null, 2));

if (failures.length) {
  process.exit(1);
}
