/**
 * /home-v3 · the V3 cinematic home, preserved.
 *
 * The V3 cinematic homepage (app/page.v3.tsx) is a complete, designed,
 * magnificent layout — full-bleed cyberwar photograph, Variable-Weight
 * Reveal headline, Live Signal Panel, Three Doors, Live Receipts,
 * Current Research, Curriculum, Founder Note, Final CTA.
 *
 * Lived in repo since Wave 30b. Briefly promoted to / in Wave 114
 * (2026-06-18) then reverted Wave 130 (same day) per operator
 * correction. Now lives at /home-v3 so it can be linked, shared,
 * iterated on, without overriding the launcher-as-home doctrine.
 */

import type { Metadata } from "next";
import HomePageV3 from "../page.v3";

export const metadata: Metadata = {
  title: "Home V3 · cinematic home preview · AtomEons",
  description:
    "Cinematic V3 home preview: full-bleed photograph, Variable-Weight Reveal headline, Live Signal Panel, 8 sections from Hero through Final CTA. Preserved as an alternate home; the canonical home is the launcher at /.",
  alternates: { canonical: "https://atomeons.com/home-v3" },
};

export default function HomeV3Preview() {
  return <HomePageV3 />;
}
