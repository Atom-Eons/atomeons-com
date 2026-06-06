import type { Metadata } from "next";
import { WelcomeTrailer } from "../_components/V3/WelcomeTrailer";

/**
 * /welcome · the first-time-visitor trainer.
 *
 * Wave 37 · 2026-06-06 · Apple-grade scroll-driven introduction.
 *
 * Reads /welcome-clip.mp4 from public if it exists (operator-generated
 * via Veo or any tool · scripts/generate-welcome-clip.mjs scaffolds the
 * Veo call). If absent, the CSS-choreographed scroll trailer is the
 * experience · and it's not a fallback · it's the default.
 *
 * Operator deleted the original /welcome in Wave 33 because it was
 * redundant. This is a different page: a real trainer, not a duplicate
 * landing. The /welcome → / redirect in proxy.ts has been removed.
 *
 * — Wave 37
 */

export const metadata: Metadata = {
  title: "Welcome · take ninety seconds inside the lab",
  description:
    "First-time visitor guide to AtomEons Systems Laboratory. Six scrolls · one idea per scene · learn what the lab makes, who it's for, and how to navigate. Apple-grade introduction · no signup · no video buffering.",
  alternates: { canonical: "https://atomeons.com/welcome" },
  openGraph: {
    title: "Welcome to AtomEons · the ninety-second introduction",
    description:
      "Six scrolls. One idea per scene. Three doors at the end. Take the tour.",
    url: "https://atomeons.com/welcome",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function WelcomePage() {
  return <WelcomeTrailer videoSrc="/welcome-clip.mp4" />;
}
