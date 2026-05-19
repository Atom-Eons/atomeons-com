import type { Metadata } from "next";
import Link from "next/link";
import { HeroPreview } from "../_components/v6-3/HeroPreview";
import { PrincipleBlock } from "../_components/v6-3/PrincipleBlock";
import { NewBehaviors } from "../_components/v6-3/NewBehaviors";
import { WhatStillStands } from "../_components/v6-3/WhatStillStands";
import { ExistingBuyerNote } from "../_components/v6-3/ExistingBuyerNote";
import { ClosingManifesto } from "../_components/v5/ClosingManifesto";

/**
 * /orangebox — v6.3 "Silent Canvas" PREVIEW page.
 *
 * SALES PAUSED while the lab ships v6.3. The previous v6.0 product
 * funnel (Hero, LanesGrid, MoatsTable, SkusTable, ComparisonGrid, etc.)
 * lives on disk under app/_components/v5/ and is currently unused.
 * It will return (or be retired) when v6.3 ships.
 *
 * IP boundary holds across this page (mirrors round 2 audit):
 *   PUBLISH:  Silent Canvas name, v6.3 framing, 6 named behaviors
 *             (Solidify, Z-Axis Rewind, Pulse Ring, Living Canvas,
 *              Freeze All, Multi-Canvas Tabs), 4 publishable principles,
 *             license §4A forward-buyers lock, local-first + BYO keys.
 *   NEVER:    Relevance Controller spec, 7 state sources, 5-schema
 *             validator, AE1–AE14 roster, trust gradient tiers, phase
 *             map day counts, cost math, trilane structure, internal
 *             model assignments.
 *
 * Existing buyers still have full /api/download access via the HMAC
 * token in their original purchase email or via /account.
 */

export const metadata: Metadata = {
  title: "ORANGEBOX v6.3 — Silent Canvas | AtomEons",
  description:
    "ORANGEBOX v6.3 'Silent Canvas' is in build. The cockpit stopped talking. The canvas started. Sales paused while the lab ships. v6.0 buyers get v6.3 free — license §4A. Notify-me list open.",
  alternates: { canonical: "https://atomeons.com/orangebox" },
  openGraph: {
    title: "ORANGEBOX v6.3 — Silent Canvas",
    description:
      "The cockpit stopped talking. The canvas started. v6.3 in build · sales paused · v6.0 buyers locked free under §4A.",
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

      {/* 2 — Four publishable principles (positive doctrine, no mechanism) */}
      <div data-cockpit-section="principles">
        <PrincipleBlock />
      </div>

      {/* 3 — Six new behaviors shipping in alpha.7 / v6.3 GA */}
      <div data-cockpit-section="new behaviors">
        <NewBehaviors />
      </div>

      {/* 4 — What doesn't change between v6.0 and v6.3 */}
      <div data-cockpit-section="what stands">
        <WhatStillStands />
      </div>

      {/* 5 — Explicit message to existing v6.0 buyers (§4A) */}
      <div data-cockpit-section="existing buyers">
        <ExistingBuyerNote />
      </div>

      {/* 6 — Closing manifesto — voice still fits the preview */}
      <ClosingManifesto />

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
                  "v6.3 'Silent Canvas' — the cockpit stops narrating; the canvas shows the work. Six new behaviors: Solidify (one-command production ship), Z-Axis Rewind (visual time-travel), Pulse Ring (2.5s action feedback), Living Canvas (idle pulse + usage heatmap), Freeze All (Ctrl+. global kill), Multi-Canvas Tabs (parallel projects, one cockpit). v6.0 buyers receive v6.3 free under license §4A forward-buyers lock.",
                url: "https://atomeons.com/orangebox",
                description:
                  "ORANGEBOX v6.3 Silent Canvas — preview page. The cockpit stops narrating; the canvas shows the work. Local-first, native binary, BYO keys, zero markup. v6.0 buyers receive v6.3 free under license §4A.",
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
                    name: "ORANGEBOX v6.3 Silent Canvas preview",
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
