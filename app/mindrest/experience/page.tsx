import type { Metadata } from "next";
import { EntrainmentExperience } from "../../_components/V3/EntrainmentExperience";

export const metadata: Metadata = {
  title: "Mindrest · Ocean Entrainment Session",
  description:
    "Binaural-beat audio + synthesized ocean swell + breathing mandala · 5 brain-state modes (alpha · theta · beta · delta · meditation) · safety-gated · text-only fallback · auto-stops at 20 minutes. Wear headphones for the binaural effect. Public information · not medical advice.",
  alternates: { canonical: "https://atomeons.com/mindrest/experience" },
  openGraph: {
    title: "Mindrest · the ocean entrainment session",
    description:
      "Tune your brainwaves to the ocean. Free in-browser audiovisual entrainment with 5 modes including pure meditation.",
    url: "https://atomeons.com/mindrest/experience",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function MindrestExperiencePage() {
  return <EntrainmentExperience />;
}
