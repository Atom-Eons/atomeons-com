import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /vendor-pack/bundle.txt — concatenated text bundle of every key
 * procurement / security / trust document. One download for a CISO
 * to hand to procurement.
 *
 * Concatenates a curated set of public documents in human-readable
 * text form, with clear section delimiters.
 */

const SOURCES = [
  { label: "MANIFESTO · 14-clause operating doctrine", url: "https://atomeons.com/manifesto", fsPath: null },
  { label: "TRUST POSTURE · WILL-NOT + WILL lists", url: "https://atomeons.com/trust", fsPath: null },
  { label: "FINANCIAL TRANSPARENCY · monthly cost ledger", url: "https://atomeons.com/transparency", fsPath: null },
  { label: "SECURITY DISCLOSURE · RFC 9116", url: "https://atomeons.com/.well-known/security.txt", fsPath: "public/.well-known/security.txt" },
  { label: "AI TRAINING-DATA POLICY · Spawning ai.txt", url: "https://atomeons.com/.well-known/ai.txt", fsPath: "public/.well-known/ai.txt" },
  { label: "AGENT METADATA · self-describing", url: "https://atomeons.com/.well-known/agent.json", fsPath: "public/.well-known/agent.json" },
  { label: "MCP MANIFEST · Model Context Protocol", url: "https://atomeons.com/.well-known/mcp.json", fsPath: "public/.well-known/mcp.json" },
  { label: "AI PLUGIN MANIFEST · legacy", url: "https://atomeons.com/.well-known/ai-plugin.json", fsPath: "public/.well-known/ai-plugin.json" },
  { label: "LLMS.TXT · lab overview", url: "https://atomeons.com/llms.txt", fsPath: "public/llms.txt" },
];

const HEADER = `==============================================================================
ATOMEONS SYSTEMS LABORATORY · VENDOR PACK
==============================================================================

This file is the procurement / security / legal review bundle for
atomeons.com. Concatenation of the public documents your team typically
requests.

Vendor identity     · AtomEons Systems Laboratory
Operator            · Atom McCree
Location            · Marco Island, FL, USA
Contact             · atom@atomeons.com
Security            · atom@atomeons.com (RFC 9116 · /.well-known/security.txt)
Founded             · 2024
Generated           · 2026-06-05
License posture     · §4A no-SaaS · perpetual (see Terms)
SaaS architecture   · none (local-first by design)
Subprocessors       · see /integrations · 20 services categorized

Document index:
${SOURCES.map((s, i) => `  ${String(i + 1).padStart(2, "0")} · ${s.label}\n     ${s.url}`).join("\n")}

For documents that live as React pages (no fs-path readable here),
the human-readable rendering is at the URL given. For documents that
are static files, the content is embedded below.

==============================================================================

`;

const FOOTER = `

==============================================================================
END OF BUNDLE · AtomEons Systems Laboratory · 2026-06-05
==============================================================================

For follow-up questions:
  atom@atomeons.com (5-business-day reply guarantee)

For custom MSAs / NDAs / escalated security review:
  Same email, named in subject line.

License covering this document:
  CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
  Attribution preserved on re-use is the only ask.
`;

export async function GET() {
  const parts: string[] = [HEADER];

  for (const s of SOURCES) {
    parts.push(`\n\n──────────────────────────────────────────────────────────────────────────────\n${s.label}\nSource · ${s.url}\n──────────────────────────────────────────────────────────────────────────────\n\n`);

    if (s.fsPath) {
      try {
        const p = path.join(process.cwd(), s.fsPath);
        const content = fs.readFileSync(p, "utf8");
        parts.push(content);
      } catch {
        parts.push(`[document not embeddable · fetch from ${s.url}]`);
      }
    } else {
      parts.push(`[content lives as a rendered React page · open the URL above for the full text]\n`);
      parts.push(`This page's content is the canonical rendering. For an offline copy in markdown form, call:\n  curl 'https://atomeons.com/api/md?route=${s.url.replace("https://atomeons.com", "")}'\n`);
    }
  }

  parts.push(FOOTER);

  return new NextResponse(parts.join(""), {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "content-disposition": 'attachment; filename="atomeons-vendor-pack.txt"',
      "cache-control": "public, max-age=900, s-maxage=900",
    },
  });
}
