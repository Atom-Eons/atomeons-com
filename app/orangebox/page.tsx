import type { Metadata } from "next";
import Link from "next/link";
import { HeroPreview } from "../_components/v6-3/HeroPreview";
import { TheThesis } from "../_components/v6-3/TheThesis";
import { PrincipleBlock } from "../_components/v6-3/PrincipleBlock";
import { NewBehaviors } from "../_components/v6-3/NewBehaviors";
import { TheLanes } from "../_components/v6-3/TheLanes";
import { TheMCPFabric } from "../_components/v6-3/TheMCPFabric";
import { TheLivingLayer } from "../_components/v6-3/TheLivingLayer";
import { TheBinary } from "../_components/v6-3/TheBinary";
import { TheConnections } from "../_components/v6-3/TheConnections";
import { TheCrews } from "../_components/v6-3/TheCrews";
import { TheGovernance } from "../_components/v6-3/TheGovernance";
import { TheReceipts } from "../_components/v6-3/TheReceipts";
import { WhatStillStands } from "../_components/v6-3/WhatStillStands";
import { ExistingBuyerNote } from "../_components/v6-3/ExistingBuyerNote";
import { NotifyMeAnchor } from "../_components/v6-3/NotifyMeAnchor";

/**
 * /orangebox — v6.3 "Silent Canvas" full showcase.
 *
 * SALES PAUSED. The page leads with the CONCEPTS — paradigm shift,
 * principles, behaviors, organism layer, substrate, crews, receipts —
 * because the operator's instruction is to sell the rewrite by its
 * ideas, not by its version number. Every section is concept-first.
 *
 * Existing v6.0 buyers continue to receive v6.3 free under license §4A.
 * The v6.0 funnel components in app/_components/v5/ remain on disk.
 *
 * IP boundary (mirrors round 2 audit) holds across all 12 sections:
 *   PUBLISH:  Silent Canvas, v6.3 framing, 6 named behaviors, 6
 *             publishable principles, license §4A, BYO + local-first,
 *             department NAMES (already public in llms.txt), trust
 *             gradient CONCEPT (no thresholds), Hermes substrate,
 *             Subscription-First Transport, Connector Fabric, n8n,
 *             receipts JSONL schema (already public in v6.0 doctrine),
 *             living layer feature NAMES (Breathing Canvas, Night Watch,
 *             Organism Health HUD, Voice Latency Stopwatch).
 *   NEVER:    Relevance Controller spec, 7 state sources, 5-schema
 *             validator breakdown, AE# enumeration with model
 *             assignments, trust gradient THRESHOLDS (30/100 numbers),
 *             phase map day counts, cost math, trilane structure,
 *             17th HSMP mutation kind, internal model assignments.
 */

export const metadata: Metadata = {
  title: "ORANGEBOX v6.3 — Silent Canvas | AtomEons",
  description:
    "ORANGEBOX v6.3 'Silent Canvas' — the cockpit stopped talking, the canvas started. Six new behaviors, four substrate layers, fourteen departments, every action receipt-backed. Sales paused while the lab ships. v6.0 buyers get v6.3 free under license §4A. Notify-me list open.",
  alternates: { canonical: "https://atomeons.com/orangebox" },
  openGraph: {
    title: "ORANGEBOX v6.3 — Silent Canvas",
    description:
      "The cockpit stopped talking. The canvas started. Six new behaviors, four substrate layers, fourteen departments. v6.3 in build · sales paused · v6.0 buyers locked free under §4A.",
    url: "https://atomeons.com/orangebox",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX v6.3 — Silent Canvas",
    description:
      "The cockpit stopped talking. The canvas started. v6.3 in build · sales paused · v6.0 buyers locked free.",
  },
};

export default function OrangeBoxPreview() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> ORANGEBOX · v6.3 Silent
          Canvas · preview
        </p>
      </div>

      {/* 1 — Hero preview (coming-soon + notify-me CTA) */}
      <div data-cockpit-section="silent canvas">
        <HeroPreview />
      </div>

      {/* 2 — The thesis (what actually changes — concept first, mechanism never) */}
      <div data-cockpit-section="thesis">
        <TheThesis />
      </div>

      {/* 3 — Six publishable principles (positive doctrine) */}
      <div data-cockpit-section="principles">
        <PrincipleBlock />
      </div>

      {/* 4 — Six new behaviors (Solidify, Z-Axis Rewind, Pulse Ring,
              Living Canvas, Freeze All, Multi-Canvas Tabs) */}
      <div data-cockpit-section="behaviors">
        <NewBehaviors />
      </div>

      {/* 5 — Eleven cockpit lanes (concrete product surface). Per
              orange-judge: load-bearing. First concrete picture of what
              the operator is buying after the behavior abstractions. */}
      <div data-cockpit-section="lanes">
        <TheLanes />
      </div>

      {/* 6 — MCP fabric. The integration story. 60+ tools, categorized,
              wired at install. Lands right after the lanes that use them. */}
      <div data-cockpit-section="mcp fabric">
        <TheMCPFabric />
      </div>

      {/* 7 — The living layer (Breathing Canvas, Night Watch, Health HUD,
              Voice Latency Stopwatch) */}
      <div data-cockpit-section="living layer">
        <TheLivingLayer />
      </div>

      {/* 8 — The native binary. Per orange-judge: load-bearing kill of
              the "is this a webview app?" objection. Per engine-platform:
              Rust + egui ONLY (no Tauri 2.x claim, no 4.46 MB number
              until verified by v6.3 build receipt). */}
      <div data-cockpit-section="binary">
        <TheBinary />
      </div>

      {/* 9 — The substrate (Hermes, Subscription-First Transport,
              Connector Fabric, embedded n8n) */}
      <div data-cockpit-section="substrate">
        <TheConnections />
      </div>

      {/* 10 — Departmental crews + trust gradient + human final stop */}
      <div data-cockpit-section="departments">
        <TheCrews />
      </div>

      {/* 11 — Governance layer. Per orange-judge: load-bearing safety
              case for any serious buyer. 27 guardrails + 9-gate chain
              (Gate 0 = LBCE, all public) + Human Final Stop. */}
      <div data-cockpit-section="governance">
        <TheGovernance />
      </div>

      {/* 12 — Receipts doctrine + JSONL schema sample */}
      <div data-cockpit-section="receipts">
        <TheReceipts />
      </div>

      {/* 13 — What doesn't change between v6.0 and v6.3 */}
      <div data-cockpit-section="invariants">
        <WhatStillStands />
      </div>

      {/* 14 — Existing v6.0 buyer §4A free-upgrade message */}
      <div data-cockpit-section="existing buyers">
        <ExistingBuyerNote />
      </div>

      {/* 15 — Dedicated mid-page notify-me anchor (also page close) */}
      <div data-cockpit-section="notify me">
        <NotifyMeAnchor />
      </div>

      {/* JSON-LD — Software preview state */}
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
                  "Silent Canvas",
                ],
                applicationCategory: [
                  "DeveloperApplication",
                  "BusinessApplication",
                  "ProductivityApplication",
                ],
                operatingSystem: "Windows 10, Windows 11",
                softwareVersion: "6.3.0-alpha (in build)",
                releaseNotes:
                  "v6.3 'Silent Canvas' — the cockpit stops narrating; the canvas shows the work. Six new behaviors: Solidify (one-command production ship), Z-Axis Rewind (visual time-travel), Pulse Ring (2.5s action feedback), Living Canvas (idle pulse + usage heatmap), Freeze All (Ctrl+. global kill), Multi-Canvas Tabs (parallel projects, one cockpit). Plus the living layer (Breathing Canvas, Night Watch, Organism Health HUD, Voice Latency Stopwatch), four substrate layers (Hermes multi-channel delivery, Subscription-First Transport, Connector Fabric, embedded n8n), fourteen departmental crews with trust-gradient promotion, and receipt-backed audit on every action. v6.0 buyers receive v6.3 free under license §4A forward-buyers lock.",
                url: "https://atomeons.com/orangebox",
                description:
                  "ORANGEBOX v6.3 Silent Canvas — full showcase. The cockpit stops narrating; the canvas shows the work. Local-first, native binary, BYO keys, zero markup. v6.0 buyers receive v6.3 free under license §4A.",
                offers: {
                  "@type": "Offer",
                  availability: "https://schema.org/PreOrder",
                  price: "1",
                  priceCurrency: "USD",
                  url: "https://atomeons.com/orangebox",
                  priceValidUntil: "2030-12-31",
                },
                author: {
                  "@type": "Person",
                  name: "Atom McCree",
                  url: "https://atomeons.com/about",
                },
                publisher: {
                  "@type": "Organization",
                  name: "AtomEons Systems Laboratory",
                  url: "https://atomeons.com",
                },
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
                    name: "ORANGEBOX v6.3 Silent Canvas",
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
