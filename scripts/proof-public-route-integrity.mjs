import fs from "node:fs";
import path from "node:path";

const siteIndexPath = path.join("app", "_data", "site-index.ts");
const assetsRoot = path.join("dist", "assets");
const source = fs.readFileSync(siteIndexPath, "utf8");
const hrefs = [...source.matchAll(/href:\s*"([^"]+)"/g)].map((match) => match[1]);

function candidatesForHref(href) {
  if (href === "/") return [path.join(assetsRoot, "index.html")];

  const clean = href.replace(/^\/+/, "");
  const extension = path.extname(clean);

  if (extension) {
    return [path.join(assetsRoot, clean)];
  }

  return [
    path.join(assetsRoot, `${clean}.html`),
    path.join(assetsRoot, clean, "index.html"),
  ];
}

const checks = hrefs.map((href) => {
  const candidates = candidatesForHref(href);
  const actual = candidates.find((candidate) => fs.existsSync(candidate)) ?? null;

  return {
    href,
    pass: Boolean(actual),
    actual,
    candidates,
  };
});

const failures = checks.filter((check) => !check.pass);

console.log(JSON.stringify({
  pass: failures.length === 0,
  checked: checks.length,
  failures,
}, null, 2));

if (failures.length) {
  process.exit(1);
}
