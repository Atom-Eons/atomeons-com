import fs from "node:fs";
import path from "node:path";

const assetsRoot = path.join("dist", "assets");
const siteIndexSource = fs.readFileSync(path.join("app", "_data", "site-index.ts"), "utf8");
const siteIndexHrefs = [...siteIndexSource.matchAll(/href:\s*"([^"]+)"/g)].map((match) => match[1]);
const openapi = JSON.parse(fs.readFileSync(path.join("public", "openapi.json"), "utf8"));
const openapiPaths = Object.keys(openapi.paths ?? {});
const sitemapPath = path.join(assetsRoot, "sitemap.xml");
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";

function routeUrl(route) {
  return `https://atomeons.com${route === "/" ? "" : route}`;
}

const missingFromOpenapi = siteIndexHrefs.filter((href) => !openapiPaths.includes(href));
const missingFromSitemap = siteIndexHrefs.filter((href) => !sitemap.includes(routeUrl(href)));
const missingMachineFiles = ["/openapi.json", "/llms.txt", "/sitemap.xml"].filter((href) => {
  const file = href.replace(/^\//, "");
  return !fs.existsSync(path.join(assetsRoot, file));
});

const result = {
  pass: missingFromOpenapi.length === 0 && missingFromSitemap.length === 0 && missingMachineFiles.length === 0,
  siteIndexCount: siteIndexHrefs.length,
  openapiPathCount: openapiPaths.length,
  missingFromOpenapi,
  missingFromSitemap,
  missingMachineFiles,
};

console.log(JSON.stringify(result, null, 2));

if (!result.pass) {
  process.exit(1);
}
