import worker from "../cloudflare/atomeons-brawl-worker.mjs";

const response = await worker.fetch(new Request("https://atomeons.com/brawl"));
const html = await response.text();

const checks = {
  status: response.status === 200,
  release: response.headers.get("x-atom-eons-release") === "AE-BRAWL-f1d6551",
  fifteenFrames: (html.match(/class="frame"/g) ?? []).length === 15,
  primaryCta: html.includes("Enter AE Brawl"),
  proofCta: html.includes("See how LeadMCP works"),
  manual: html.includes("/brawl/docs/technical-manual.pdf"),
  pdfOnly: !html.includes(".md\"") && !html.includes(".md'"),
  source: html.includes("https://github.com/AtomEons/ae-brawl"),
  sessionId: html.includes("019f71dd-0add-7fc2-bd06-67c95a5df77b"),
  feedback: html.includes("https://atomeons.github.io/ae-brawl/feedback/"),
  canonical: html.includes('rel="canonical" href="https://atomeons.com/brawl"'),
  noForbiddenComparisons: !/Bruce Lee|Double Dragon|Fight Club/i.test(html),
  disclaimer: html.includes("provisional competition name and demonstration"),
};

const failed = Object.entries(checks).filter(([, passed]) => !passed);

console.log(JSON.stringify({ checks, bytes: html.length }, null, 2));

if (failed.length) {
  throw new Error(`AE Brawl Worker checks failed: ${failed.map(([name]) => name).join(", ")}`);
}
