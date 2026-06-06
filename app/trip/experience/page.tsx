import type { Metadata } from "next";
import { EntrainmentExperience } from "../../_components/V3/EntrainmentExperience";

export const metadata: Metadata = {
  title: "Audiovisual Entrainment · Experience",
  description:
    "Binaural-beat audio + breathing mandala · 4 brain-state modes (alpha · theta · beta · delta) · safety-gated · text-only fallback · auto-stops at 20 minutes. Public information · not medical advice. Wear headphones for the binaural effect.",
  alternates: { canonical: "https://atomeons.com/trip/experience" },
  robots: { index: true, follow: true },
};

export default function TripExperiencePage() {
  return <EntrainmentExperience />;
}
