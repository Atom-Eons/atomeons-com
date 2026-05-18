import { HeroLabManifest } from "./_components/v2/HeroLabManifest";
import { OrganismRail } from "./_components/v2/OrganismRail";
import { LatestFromLab } from "./_components/LatestFromLab";
import { ResearchSnapshot } from "./_components/v2/ResearchSnapshot";
import { OrangeBoxBlock } from "./_components/v2/OrangeBoxBlock";
import { SkilSkiBlock } from "./_components/v2/SkilSkiBlock";
import { FoundersViewTeaser } from "./_components/v2/FoundersViewTeaser";
import { IntelDrop } from "./_components/v2/IntelDrop";
import { FounderCard } from "./_components/v2/FounderCard";
import { DoctrineStrip } from "./_components/v5/DoctrineStrip";
import { LabFooterCTA } from "./_components/v2/LabFooterCTA";

/**
 * AtomEons.com homepage — lab-first architecture.
 *
 * The OLD homepage (v5 stack) is a 16-section ORANGEBOX product funnel.
 * That funnel still lives at /orangebox — the v5/ components remain on
 * disk and are imported there. Do NOT delete app/_components/v5/.
 *
 * THIS homepage represents the whole lab:
 *   1. Lab identity (who AtomEons is, the operator, Marco Island)
 *   2. The four arms (Research, OrangeBox, skil.ski, B00KMakor)
 *   3. Live lab output (latest letter + latest paper)
 *   4. Research surface elevation
 *   5. Product (ORANGEBOX, condensed — full pitch lives at /orangebox)
 *   6. skil.ski registry
 *   7. The Founder's View broadcast
 *   8. Intel surface (X Algorithm drop)
 *   9. The operator (Atom McCree)
 *  10. Doctrine strip
 *  11. Closing CTA grid
 *
 * Designed per the architect spec + mirrors + orange-judge + lips +
 * ux-product-reviewer + misfits-rebels review panel — 2026-05-18.
 *
 * Revalidate every 5 minutes to pick up new Founder's View letters via
 * the LatestFromLab Supabase-backed server component.
 */

export const revalidate = 300;

export default function Home() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <HeroLabManifest />
      <OrganismRail />
      <LatestFromLab />
      <ResearchSnapshot />
      <OrangeBoxBlock />
      <SkilSkiBlock />
      <FoundersViewTeaser />
      <IntelDrop />
      <FounderCard />
      <DoctrineStrip />
      <LabFooterCTA />
    </main>
  );
}
