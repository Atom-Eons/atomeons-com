import fs from "node:fs";
import path from "node:path";

const htmlPath = path.join("dist", "assets", "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

if (!match) {
  console.log(JSON.stringify({ pass: false, reason: "missing application/ld+json script" }, null, 2));
  process.exit(1);
}

const data = JSON.parse(match[1]);
const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [];

const required = [
  ["https://atomeons.com/#website", "WebSite"],
  ["https://atomeons.com/#organization", "Organization"],
  ["https://atomeons.com/#atom-mccree", "Person"],
  ["https://atomeons.com/#products", "ItemList"],
  ["https://atomeons.com/cablebox#software", "SoftwareApplication"],
  ["https://atomeons.com/bookmaker#software", "SoftwareApplication"],
  ["https://atomeons.com/orange5#software", "SoftwareApplication"],
  ["https://atomeons.com/i-am-ai#book", "Book"],
  ["https://atomeons.com/atom-alive#show", "CreativeWorkSeries"],
  ["https://atomeons.com/research#collection", "CollectionPage"],
];

const nodes = new Map(graph.map((node) => [node["@id"], node]));
const failures = required
  .map(([id, type]) => {
    const node = nodes.get(id);
    return {
      id,
      expectedType: type,
      actualType: node?.["@type"] ?? null,
      pass: node?.["@type"] === type,
    };
  })
  .filter((item) => !item.pass);

const website = nodes.get("https://atomeons.com/#website");
const products = nodes.get("https://atomeons.com/#products");
const checks = {
  searchAction: website?.potentialAction?.["@type"] === "SearchAction",
  productListCount: Array.isArray(products?.itemListElement) && products.itemListElement.length === 4,
  cableboxPreorder: nodes.get("https://atomeons.com/cablebox#software")?.offers?.availability === "https://schema.org/PreOrder",
  iamAiAuthor: nodes.get("https://atomeons.com/i-am-ai#book")?.author?.name === "AI",
};

const result = {
  pass: failures.length === 0 && Object.values(checks).every(Boolean),
  graphCount: graph.length,
  checks,
  failures,
};

console.log(JSON.stringify(result, null, 2));

if (!result.pass) {
  process.exit(1);
}
