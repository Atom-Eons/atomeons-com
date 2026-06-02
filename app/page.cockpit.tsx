import { AtomEonsImmersiveHero } from "./_components/AtomEonsImmersiveHero";
import { HomeCurriculumWall } from "./_components/HomeCurriculumWall";
import { HeroPillarSequence } from "./_components/v2/HeroPillarSequence";
import { HomeOnboardStrip } from "./_components/v2/HomeOnboardStrip";
import { HomeLaunchTiles } from "./_components/HomeLaunchTiles";
import { OrganismRail } from "./_components/v2/OrganismRail";
import { LatestFromLab } from "./_components/LatestFromLab";
import { ResearchSnapshot } from "./_components/v2/ResearchSnapshot";
import { OrangeBoxBlock } from "./_components/v2/OrangeBoxBlock";
import { SkilSkiBlock } from "./_components/v2/SkilSkiBlock";
import { FoundersViewLiveTeaser } from "./_components/v2/FoundersViewLiveTeaser";
import { IntelDrop } from "./_components/v2/IntelDrop";
import { FounderCard } from "./_components/v2/FounderCard";
import { LabFooterCTA } from "./_components/v2/LabFooterCTA";

/**
 * AtomEons.com homepage — four-pillar architecture.
 *
 * The brand spine is the LAB. ORANGEBOX is ONE product, not the doctrine.
 * The four pillars (operator-locked, 2026-05-20):
 *
 *   1. USE AI                  → ORANGEBOX + skil.ski + Hermes (the cockpit
 *                                we ship to put AI into real work)
 *   2. MAKE MONEY              → reframe of the same product stack as the
 *                                operator's commerce + sales tools
 *   3. KNOW THE REAL INFO      → /intel surface + Founder's View broadcast
 *   4. RESEARCH FOR BREAKTHROUGH → ÆoNs Research, twelve papers, CC-BY 4.0
 *
 * Voice: marketing-grade (peer of anthropic.com / openai.com / x.ai /
 * microsoft.com). The ruthless broadcast voice stays in /founders-view —
 * it does NOT bleed into homepage copy. Operator's directive 2026-05-20:
 * "I have perspectives. Don't merge them. I will tell you when to lean
 *  into that part."
 *
 * What the homepage promises in 5 seconds: AtomEons is an independent
 * AI systems laboratory in Marco Island. It deploys AI into real work,
 * builds commerce tools for operators, publishes alpha intel decoded
 * from primary sources, and ships frontier scientific manuscripts.
 *
 * Pricing canon (2026-05-23): ORANGEBOX v6.3 is $49 once, forever.
 * License §4A legally bans switching to subscription. Two 30-day
 * refund paths (Material Failure Guarantee + Workflow-Fit Refund).
 * The $1 + 7-day-free framing is retired; v6.1.0 archived at
 * /orangebox/legacy.
 *
 * IP boundary: marketing-grade publishables only. NEVER surface in
 * homepage copy: Trilane authority hierarchy, Smart router 10×3 matrix,
 * vault tier names, Relevance Controller, AE# model assignments, MD5
 * cache construction, trust gradient thresholds, phase map day counts.
 *
 * Section data-cockpit-section attrs are kept for future analytics /
 * scroll-position telemetry. The LabTicker (mounted in layout.tsx)
 * carries the lab-status signal site-wide; CockpitFrame is retired.
 */

export const revalidate = 300;

export default function Home() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* 1 — IMMERSIVE HERO (2026-06-02 redesign pass). Photo mosaic of 12
              of our 67 Nano Banana Pro press-photos, slow-rotating, with
              massive variable-weight typography overlaid. Single primary
              CTA + single ghost link. Stat strip at the bottom. The new
              "first 5 seconds" of atomeons.com. */}
      <div data-cockpit-section="hero">
        <AtomEonsImmersiveHero />
      </div>

      {/* 1.1 — HeroPillarSequence retained below the fold as the brand
              spine moment (operator-locked 2026-05-20: four pillars). */}
      <div data-cockpit-section="brand-spine">
        <HeroPillarSequence />
      </div>

      {/* 1.5 — LAUNCH-WEEK DOWNLOAD TILES (operator directive 2026-05-30).
              Both shipped products with direct-blob download buttons +
              countdown. Mass-traffic-ready: Orangebox link is a direct
              Vercel Blob URL (no API gate, no JS handshake), B00KMAKR
              link points at the static /b00kmakor/download picker page. */}
      <HomeLaunchTiles />

      {/* 1a — Mission strip. Operator directive 2026-05-26:
              "I WANT TO ONBOARD HUMANITY TO AI. THROUGH THIS SITE.
               YOU FIGURE IT OUT. BUILD IT. PIZZA MODE."
              This is the first message any visiting human sees after
              the brand spine. Persona chips + /onboard CTA. Lives
              above StartHereStrip because /onboard is the bigger
              humanity-scale on-ramp; /start is the calmer 11-min
              walk-through for humans who want pacing instead of
              picking a persona. */}
      <HomeOnboardStrip />

      {/* 2 — Four arms (the four products + research): compact card rail
              that lets the visitor see the whole lab without scrolling
              past four full sections. Acts as a table of contents for
              the pillars below. */}
      <div data-cockpit-section="four arms">
        <OrganismRail />
      </div>

      {/* 2.1 — CURRICULUM WALL (2026-06-02). Bento grid of 18 cards (6 large
              + 12 small) surfacing the depth of /learn — 200+ pages with
              real press-photo imagery. Proof-by-mass that AtomEons is a
              real learning surface, not a marketing site. */}
      <div data-cockpit-section="curriculum">
        <HomeCurriculumWall />
      </div>

      {/* 3 — USE AI · the cockpit pillar. ORANGEBOX surfaced here as
              "the cockpit we ship" — one product among several arms,
              never the spine. */}
      <div data-cockpit-section="use ai">
        <OrangeBoxBlock />
      </div>

      {/* 4 — MAKE MONEY · operator commerce pillar. Skil.Ski + the
              ORANGEBOX sales surface together. The pillar is a framing,
              not a separate route. */}
      <div data-cockpit-section="make money">
        <SkilSkiBlock />
      </div>

      {/* 5 — KNOW THE REAL INFO · intel surface. Decoded primary
              sources, alpha drops, not aggregated headlines. */}
      <div data-cockpit-section="real info">
        <IntelDrop />
      </div>

      {/* 6 — KNOW THE REAL INFO · the nightly broadcast. Editorial
              satire, real events. Published 8pm ET. Voice separation
              starts here — the broadcast lives at /founders-view.
              Live teaser surfaces the most recent letter (5-min ISR)
              above the evergreen broadcast pitch. */}
      <div data-cockpit-section="broadcast">
        <FoundersViewLiveTeaser />
      </div>

      {/* 7 — RESEARCH FOR BREAKTHROUGH · ÆoNs Research surface.
              Twelve manuscripts, CC-BY 4.0, dual-format. The lab's
              credibility anchor. */}
      <div data-cockpit-section="research">
        <ResearchSnapshot />
      </div>

      {/* 8 — From the lab · live latest letter from Supabase. Keeps
              the homepage feeling current without a blog. */}
      <div data-cockpit-section="from the lab">
        <LatestFromLab />
      </div>

      {/* 9 — The operator. One person. Marco Island. Trust anchor. */}
      <div data-cockpit-section="operator">
        <FounderCard />
      </div>

      {/* 10 — Final CTA rail · three exits (cockpit · intel · papers).
              No buy-now spam. */}
      <div data-cockpit-section="next move">
        <LabFooterCTA />
      </div>
    </main>
  );
}
