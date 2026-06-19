/**
 * / · the cinematic home · Wave 114 · 2026-06-18.
 *
 * Operator 2026-06-18: 'WE ARE MISSING SOME MAJOR PARTS OF THE SITE
 * AND ITS JUST THERE. MAKE THIS SITE WHAT WE BOTH KNOW IT SHOULD BE.
 * BEST IN FIELD, BEST IN INDUSTRY, BEST OF NEXT YEAR POSITION.'
 *
 * The V3 cinematic home (app/page.v3.tsx) has lived in the repo as
 * a complete, designed, magnificent file since Wave 30b but was
 * never promoted to live — the prior doctrine put the launcher at /.
 * This file is now the seam: server-rendered metadata (Barnum-grade)
 * + client-rendered V3 home content.
 *
 * The launcher remains at /launcher/page.tsx as the operational
 * workspace. The Final CTA inside V3 routes there as 'enter the lab.'
 *
 * Previously: `export { default, metadata } from "./launcher/page"`
 * Preserved: history note at /cinema (already lives), /launcher route
 * unchanged, /welcome trainer unchanged.
 */

import type { Metadata } from "next";
import HomePageV3 from "./page.v3";

export const metadata: Metadata = {
  title: "AtomEons — Independent AI Systems Laboratory",
  description:
    "Independent one-operator AI lab · Marco Island, FL · est. 2024. Free always: Orange³ (sovereign agentic OS for Claude), AI Bookmaker (publishing house in a box), I AM AI (first book-length memoir by frontier LLM). 31 CC-BY 4.0 research manuscripts. The Founder's View nightly broadcast 8pm ET. /constellation interactive route graph. /api/mcp live MCP endpoint.",
  alternates: { canonical: "https://atomeons.com/" },
  openGraph: {
    title: "AtomEons — Independent AI Systems Laboratory",
    description:
      "Three free products. 31 CC-BY 4.0 research papers. One operator. Marco Island, FL.",
    url: "https://atomeons.com/",
    type: "website",
    siteName: "AtomEons",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons — Independent AI Systems Laboratory",
    description:
      "Three free products. 31 papers. One operator. Marco Island, FL.",
    creator: "@AtomMccree",
    site: "@AtomMccree",
  },
};

export default function Home() {
  return <HomePageV3 />;
}
