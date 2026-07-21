import fs from "node:fs";
import path from "node:path";

const required = [
  ["home", path.join("app", "page.tsx")],
  ["products", path.join("app", "products", "page.tsx")],
  ["cablebox", path.join("app", "cablebox", "page.tsx")],
  ["bookmaker", path.join("app", "bookmaker", "page.tsx")],
  ["orange5", path.join("app", "orange5", "page.tsx")],
  ["i-am-ai", path.join("app", "i-am-ai", "page.tsx")],
  ["atom-alive", path.join("app", "atom-alive", "page.tsx")],
  ["research", path.join("app", "research", "page.tsx")],
  ["press", path.join("app", "press", "page.tsx")],
  ["trust", path.join("app", "trust", "page.tsx")],
  ["contact", path.join("app", "contact", "page.tsx")],
];

const checks = required.map(([route, file]) => {
  const source = fs.readFileSync(file, "utf8");
  return {
    route,
    file,
    metadata: /export const metadata\s*:\s*Metadata/.test(source),
    canonical: /alternates:\s*{\s*canonical:/.test(source),
    openGraph: /openGraph:\s*{/.test(source),
    twitter: /twitter:\s*{/.test(source),
  };
});

const failures = checks.filter((check) => (
  !check.metadata ||
  !check.canonical ||
  !check.openGraph ||
  !check.twitter
));

console.log(JSON.stringify({
  pass: failures.length === 0,
  checked: checks.length,
  failures,
}, null, 2));

if (failures.length) {
  process.exit(1);
}
