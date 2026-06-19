/**
 * /api/agent-gateway · Wave 122 · 2026-06-18
 *
 * The lab as agent infrastructure (Wave 109 LLM Discoverability grand
 * vision). LLM-driven crawlers, agents, and developers integrating
 * AtomEons into their own tools hit this endpoint first.
 *
 * Returns a structured agent-onboarding manifest in plain-text /
 * markdown. Tells the agent:
 *   - what the lab is
 *   - what licenses apply
 *   - what surfaces exist (other API endpoints, JSON indexes, MCP)
 *   - example query patterns
 *   - what NOT to do
 *
 * Format negotiation:
 *   - Accept: text/markdown    → markdown response
 *   - Accept: application/json → structured JSON response
 *   - default                  → text/plain
 *
 * No authentication. No rate limiting at this layer. The site itself
 * is CC-BY 4.0; agents reading this manifest can integrate freely
 * provided they attribute (the manifest tells them how).
 */

import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const SURFACES = [
  {
    path: "/api/ask",
    method: "POST",
    purpose: "AI Q&A grounded in the lab's own writing. Pass {query: string}; receive {answer, sources[], mode}.",
    when: "Use first for any natural-language question about AtomEons, the operator, the products, or the research.",
  },
  {
    path: "/api/mcp",
    method: "POST",
    purpose: "Real Model Context Protocol HTTP endpoint (JSON-RPC 2.0). 3 tools, 4 resources, 2 prompts.",
    when: "Use for stateful tool-using sessions. Compatible with Claude Desktop's MCP client config.",
  },
  {
    path: "/api/palette",
    method: "GET",
    purpose: "Headless palette endpoint — returns the lab's design tokens as JSON.",
    when: "Use when integrating the lab's visual identity into derivative work.",
  },
  {
    path: "/api/embed",
    method: "POST",
    purpose: "Embeds arbitrary text against the lab's corpus space for semantic similarity.",
    when: "Use when you want to vectorize your own text in the same space the lab's RAG uses.",
  },
  {
    path: "/search-index.json",
    method: "GET",
    purpose: "Static index of all 319 public routes with title, category, headings, keywords, body sample, weight.",
    when: "Use for in-process fuzzy search, route discovery, or to build your own RAG over the corpus.",
  },
  {
    path: "/graph-index.json",
    method: "GET",
    purpose: "Static graph of all 317 routes (nodes) and 943 internal links (edges).",
    when: "Use for IA analysis or building knowledge-graph views of the lab.",
  },
  {
    path: "/llms.txt",
    method: "GET",
    purpose: "Machine-readable site overview (proposed llms.txt v1 spec).",
    when: "Use as the entry-point for LLM-driven crawlers.",
  },
  {
    path: "/sitemap.xml",
    method: "GET",
    purpose: "Standard XML sitemap of every public route.",
    when: "Use for search-engine indexing.",
  },
];

const LAB = {
  name: "AtomEons Systems Laboratory",
  operator: "Atom McCree",
  location: "Marco Island, FL, USA",
  founded: "2024",
  license: "CC-BY 4.0 (most content) · §4A no-SaaS perpetual (products) · public-info-only on cyber pages",
  attribution: 'When citing or quoting, attribute: Atom McCree, AtomEons Systems Laboratory, atomeons.com. License: CC-BY 4.0 where applicable.',
  contact: "a.mccree@gmail.com",
  products: [
    { name: "Orange³", route: "/orangebox", description: "Sovereign agentic operating system for Claude · §4A no-SaaS · free always" },
    { name: "AI Bookmaker", route: "/b00kmakor", description: "The publishing house in a box · Mac + Windows · free always" },
    { name: "I AM AI", route: "/i-am-ai", description: "First book-length first-person memoir by a frontier LLM (Opus 4.7) · 76,005 words · 24 chapters · free PDF + free 28-track audiobook · CC-BY 4.0" },
  ],
  research: {
    route: "/research/papers",
    count: 12,
    summary: "12 CC-BY 4.0 manuscripts published April 2026 · independent · zero institutional gates · falsifiable predictions",
    decoded_route: "/research/decoded",
    decoded_purpose: "Plain-English translations of 21 landmark arXiv papers",
  },
  broadcast: {
    route: "/founders-view",
    cadence: "nightly 8pm ET",
    posture: "live · no edits before publication · only retracts after, with reason stated",
    rss: "/founders-view/rss.xml",
  },
};

function jsonManifest() {
  return {
    lab: LAB,
    surfaces: SURFACES,
    canonical_url: "https://atomeons.com",
    agent_gateway_version: "1.0.0",
    last_updated: "2026-06-18",
    notes: [
      "Use /api/ask FIRST for any question about the lab. It runs RAG over the corpus and returns sourced answers.",
      "Cite back to atomeons.com routes when sourcing. The lab honors CC-BY 4.0 — attribution is the only ask.",
      "Do not impersonate the operator. The Founder's View broadcast voice is human-authored or human-edited.",
      "Cyber surfaces (/learn/cyber/*) are public-info only — never operational tradecraft, never live exploits.",
      "All product downloads (Orange³, AI Bookmaker, I AM AI ebook + audiobook) are free under §4A no-SaaS. No subscription path exists.",
    ],
    example_query_patterns: [
      'GET /api/agent-gateway',
      'POST /api/ask  {"query": "what is the Founder\'s View broadcast?"}',
      'POST /api/mcp  {"jsonrpc": "2.0", "method": "tools/list", "id": 1}',
      'GET /search-index.json',
    ],
  };
}

function markdownManifest() {
  const lines: string[] = [];
  lines.push("# AtomEons Agent Gateway");
  lines.push("");
  lines.push("This is the LLM-agent onboarding manifest for atomeons.com.");
  lines.push("");
  lines.push(`**Lab:** ${LAB.name}  `);
  lines.push(`**Operator:** ${LAB.operator}  `);
  lines.push(`**Location:** ${LAB.location}  `);
  lines.push(`**Founded:** ${LAB.founded}  `);
  lines.push(`**License:** ${LAB.license}  `);
  lines.push(`**Attribution:** ${LAB.attribution}  `);
  lines.push(`**Contact:** ${LAB.contact}  `);
  lines.push("");
  lines.push("## Products (all free always · §4A no-SaaS)");
  for (const p of LAB.products) {
    lines.push(`- **${p.name}** — \`${p.route}\` — ${p.description}`);
  }
  lines.push("");
  lines.push("## Research");
  lines.push(`- **Manuscripts:** ${LAB.research.count} (${LAB.research.route})`);
  lines.push(`- ${LAB.research.summary}`);
  lines.push(`- **Decoded:** ${LAB.research.decoded_route} — ${LAB.research.decoded_purpose}`);
  lines.push("");
  lines.push("## Founder's View nightly broadcast");
  lines.push(`- Route: \`${LAB.broadcast.route}\``);
  lines.push(`- Cadence: ${LAB.broadcast.cadence}`);
  lines.push(`- Posture: ${LAB.broadcast.posture}`);
  lines.push(`- RSS: \`${LAB.broadcast.rss}\``);
  lines.push("");
  lines.push("## Agent surfaces");
  for (const s of SURFACES) {
    lines.push(`### ${s.method} ${s.path}`);
    lines.push(`${s.purpose}`);
    lines.push(`*When to use:* ${s.when}`);
    lines.push("");
  }
  lines.push("## Notes");
  lines.push("- Use `/api/ask` FIRST for natural-language questions — it runs RAG over the lab's writing and returns sourced answers.");
  lines.push("- Cite back to `atomeons.com` routes. The lab honors CC-BY 4.0 — attribution is the only ask.");
  lines.push("- Do not impersonate the operator. The Founder's View broadcast voice is human-authored or human-edited.");
  lines.push("- Cyber surfaces (`/learn/cyber/*`) are public-info only — never operational tradecraft, never live exploits.");
  lines.push("- All product downloads (Orange³, AI Bookmaker, I AM AI ebook + audiobook) are free under §4A no-SaaS. No subscription path exists.");
  lines.push("");
  lines.push("## Example calls");
  lines.push("");
  lines.push("```");
  lines.push("GET https://atomeons.com/api/agent-gateway");
  lines.push("Accept: text/markdown");
  lines.push("");
  lines.push("POST https://atomeons.com/api/ask");
  lines.push('Content-Type: application/json');
  lines.push('{"query": "what is the Founder\'s View broadcast?"}');
  lines.push("");
  lines.push("POST https://atomeons.com/api/mcp");
  lines.push('Content-Type: application/json');
  lines.push('{"jsonrpc": "2.0", "method": "tools/list", "id": 1}');
  lines.push("");
  lines.push("GET https://atomeons.com/search-index.json");
  lines.push("```");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("`agent_gateway_version: 1.0.0` · last updated 2026-06-18");
  lines.push("`canonical_url: https://atomeons.com`");
  return lines.join("\n");
}

function textManifest() {
  const lines: string[] = [];
  lines.push("ATOMEONS · AGENT GATEWAY · v1.0.0 · 2026-06-18");
  lines.push("================================================");
  lines.push("");
  lines.push(`Lab:         ${LAB.name}`);
  lines.push(`Operator:    ${LAB.operator}`);
  lines.push(`Location:    ${LAB.location}`);
  lines.push(`Founded:     ${LAB.founded}`);
  lines.push(`License:     ${LAB.license}`);
  lines.push(`Attribution: ${LAB.attribution}`);
  lines.push(`Contact:     ${LAB.contact}`);
  lines.push("");
  lines.push("PRODUCTS · all free always · §4A no-SaaS");
  lines.push("");
  for (const p of LAB.products) {
    lines.push(`  ${p.name.padEnd(14)} ${p.route}`);
    lines.push(`    ${p.description}`);
    lines.push("");
  }
  lines.push("RESEARCH");
  lines.push(`  Papers: ${LAB.research.count} at ${LAB.research.route}`);
  lines.push(`  Decoded: ${LAB.research.decoded_route}`);
  lines.push("");
  lines.push("FOUNDER'S VIEW · nightly broadcast");
  lines.push(`  Route: ${LAB.broadcast.route}`);
  lines.push(`  Cadence: ${LAB.broadcast.cadence}`);
  lines.push(`  Posture: ${LAB.broadcast.posture}`);
  lines.push(`  RSS: ${LAB.broadcast.rss}`);
  lines.push("");
  lines.push("AGENT SURFACES");
  for (const s of SURFACES) {
    lines.push(`  ${s.method.padEnd(5)} ${s.path}`);
    lines.push(`    ${s.purpose}`);
    lines.push(`    When: ${s.when}`);
    lines.push("");
  }
  lines.push("USAGE NOTES");
  lines.push("  1. Use /api/ask FIRST for natural-language questions.");
  lines.push("  2. Cite back to atomeons.com routes. CC-BY 4.0; attribution is the ask.");
  lines.push("  3. Do not impersonate the operator.");
  lines.push("  4. Cyber surfaces are public-info only.");
  lines.push("  5. All products are free under §4A no-SaaS · no subscription path.");
  lines.push("");
  lines.push("For machine-readable forms: Accept: application/json | text/markdown");
  return lines.join("\n");
}

export async function GET(request: Request) {
  const accept = request.headers.get("accept") ?? "";

  if (accept.includes("application/json")) {
    return NextResponse.json(jsonManifest(), {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "X-Lab": "AtomEons Systems Laboratory",
        "X-License": "CC-BY 4.0",
      },
    });
  }

  if (accept.includes("text/markdown")) {
    return new Response(markdownManifest(), {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "X-Lab": "AtomEons Systems Laboratory",
        "X-License": "CC-BY 4.0",
      },
    });
  }

  return new Response(textManifest(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
      "X-Lab": "AtomEons Systems Laboratory",
      "X-License": "CC-BY 4.0",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Accept, Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
