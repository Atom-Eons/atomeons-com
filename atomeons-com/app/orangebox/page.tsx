import Link from "next/link";
import { Hero } from "../_components/v5/Hero";
import { CockpitVisualization } from "../_components/v5/CockpitVisualization";
import { SwapLanes } from "../_components/v5/SwapLanes";
import { ReceiptsLive } from "../_components/v5/ReceiptsLive";
import { WhatsInBox } from "../_components/v5/WhatsInBox";
import { ComparisonGrid } from "../_components/v5/ComparisonGrid";
import { Compatibility } from "../_components/v5/Compatibility";
import { Qualification } from "../_components/v5/Qualification";
import { TrustGrid } from "../_components/v5/TrustGrid";
import { ClosingManifesto } from "../_components/v5/ClosingManifesto";

export const metadata = {
  title: "ORANGEBOX Command v1.5.0 — the AI cockpit for Claude Code",
  description:
    "Make Claude Code work better. ORANGEBOX v1.5.0 — Faster · Smarter · Cached. 15 departments, 60+ MCP tools, mission-graph DAG, party-line, receipts. $49 once, forever. Local-first, no telemetry, no subscription.",
  alternates: { canonical: "https://atomeons.com/orangebox" },
  keywords: [
    "Claude Code",
    "Claude Code MCP",
    "Claude Code project manager",
    "tool to run projects with Claude Code",
    "make Claude Code work better",
    "AI operations cockpit",
    "AI project cockpit",
    "Claude Code companion",
    "Anthropic Claude Code tool",
    "MCP cockpit",
    "private AI cockpit",
    "local-first AI tool",
    "ORANGEBOX",
    "ORANGEBOX Command",
    "AtomEons",
  ],
  openGraph: {
    title: "ORANGEBOX Command v1.5.0 — the AI cockpit for Claude Code",
    description:
      "The private AI operations cockpit. Make Claude Code work better. Faster · Smarter · Cached. 15 departments · 60+ MCP tools · mission-graph DAG · party-line · receipts. $49 once, forever.",
    url: "https://atomeons.com/orangebox",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX Command v1.5.0 — the AI cockpit for Claude Code",
    description:
      "Make Claude Code work better. $49 once, forever. Local-first. No subscription, ever.",
  },
};

export default function OrangeBox() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb (kept minimal, top-of-page) */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> ORANGEBOX Command v1.5.0
        </p>
      </div>

      <Hero />
      <WhatsInBox />
      <CockpitVisualization />
      <SwapLanes />
      <ReceiptsLive />
      <ComparisonGrid />
      <Compatibility />
      <Qualification />
      <TrustGrid />
      <ClosingManifesto />

      {/* SoftwareApplication + Offer + BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "@id": "https://atomeons.com/orangebox#software",
                name: "ORANGEBOX Command",
                alternateName: [
                  "ORANGEBOX",
                  "ORANGEBOX OS",
                  "AtomEons ORANGEBOX",
                ],
                applicationCategory: [
                  "DeveloperApplication",
                  "BusinessApplication",
                  "ProductivityApplication",
                ],
                operatingSystem: "Windows 10, Windows 11",
                softwareVersion: "1.5.0",
                releaseNotes:
                  "v1.5.0 — Faster · Smarter · Cached. Prompt-caching aware router, sub-second swap-lane runtime, smarter receipt rollups per-dept and per-tool. Plus continued Codexa Local + Audit Roll-up from v1.4.",
                url: "https://atomeons.com/orangebox",
                downloadUrl:
                  "https://github.com/AtomEons/orangebox-os/releases/tag/v1.5.0",
                description:
                  "ORANGEBOX Command v1.5.0 — the private AI operations cockpit for one operator. Pairs with Claude Code via 60+ MCP tools. Mission-graph DAG, 15 departments, 27 guardrails, party-line, receipts. Local-first. No telemetry.",
                offers: {
                  "@type": "Offer",
                  price: "49",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://atomeons.com/orangebox",
                  priceValidUntil: "2030-12-31",
                },
                publisher: {
                  "@type": "Organization",
                  name: "AtomEons Systems Laboratory",
                  url: "https://atomeons.com",
                  founder: { "@type": "Person", name: "Atom McCree" },
                  email: "a.mccree@gmail.com",
                  location: {
                    "@type": "Place",
                    name: "Marco Island, FL, USA",
                  },
                },
                aggregateRating: undefined,
                featureList: [
                  "Pairs with Claude Code via 60+ MCP server tools",
                  "Mission-graph DAG runner with project spine",
                  "15 named departments (AE0–AE14) for routing",
                  "Triad model lanes (STRATEGY · ENGINEERING · EXPERIENCE)",
                  "27 Constitutional Guardrails",
                  "9-stage Gate Chain",
                  "Prompt-caching aware router — NEW v1.5",
                  "Sub-second swap-lane runtime — NEW v1.5",
                  "Smarter receipt rollups — NEW v1.5",
                  "Codexa Local mode (no second computer needed)",
                  "Codexa Remote mode (advanced — second machine on LAN)",
                  "Party-line shared status bus (JSONL)",
                  "Receipt + proof artifact rails",
                  "4-layer memory model with knowledge engine",
                  "ÆoNs Skill Suite V1.4 (15 skills, 230/230 tests)",
                  "Local-first (zero telemetry, no phone-home)",
                  "Full source code included",
                ],
                keywords:
                  "Claude Code, MCP, AI cockpit, project cockpit, mission graph, DAG, party-line, receipts, local-first, no subscription, $49 once, ORANGEBOX, AtomEons",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "AtomEons",
                    item: "https://atomeons.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "ORANGEBOX Command v1.5.0",
                    item: "https://atomeons.com/orangebox",
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
