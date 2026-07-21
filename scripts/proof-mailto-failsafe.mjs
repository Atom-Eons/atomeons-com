import fs from "node:fs";
import path from "node:path";

const roots = ["app"];
const extensions = new Set([".tsx", ".ts"]);
const delivery = "a.mccree@gmail.com";
const hrefPattern = /mailto:([^"'`\s}]+)/g;
const links = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }

    if (!extensions.has(path.extname(entry.name))) continue;

    const text = fs.readFileSync(filePath, "utf8");
    for (const match of text.matchAll(hrefPattern)) {
      const href = `mailto:${match[1]}`;
      links.push({ file: filePath, href });
    }
  }
}

roots.forEach((root) => fs.existsSync(root) && walk(root));

const failures = links.filter(({ href }) => {
  if (href.includes("${")) return false;

  const decoded = decodeURIComponent(href);
  const targetsDelivery = decoded.toLowerCase().startsWith(`mailto:${delivery}`);
  const hasSubject = decoded.includes("subject=");

  if (!targetsDelivery || !hasSubject) return true;

  const brandedRoute = /\[[a-z]+@atomeons\.com\]/i.test(decoded) || decoded.includes("AtomEons route:");
  const directFallback = decoded.includes("Direct destination:") || decoded.includes("direct]");

  return brandedRoute && !directFallback;
});

console.log(JSON.stringify({
  pass: failures.length === 0,
  checked: links.length,
  failures,
}, null, 2));

if (failures.length) {
  process.exit(1);
}
