import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "./Quiz";

export const metadata: Metadata = {
  title: "AI Literacy Quiz · /learn · AtomEons",
  description: "Calibrated AI literacy quiz · 30 questions across 5 levels. No signup. localStorage-backed. Honest result + specific next step. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/quiz" },
  openGraph: {
    title: "AI Literacy Quiz · /learn",
    description: "Where do you actually sit on the AI-literacy curve? Find out in 10 minutes.",
    url: "https://atomeons.com/learn/quiz",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI Literacy Quiz", description: "Free. No signup." },
  robots: { index: true, follow: true },
};

export default function QuizPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Quiz
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI literacy quiz · 5 levels · 30 questions
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Where do you{" "}
            <span className="text-[#22F0D5]">actually sit?</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Honest calibration · no trick questions · explanations teach.
            Your answers save locally · no signup · no email · no tracker.
            Reset and retake anytime.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
          <Quiz />
        </div>
      </section>
      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
            ← back to /learn
          </Link>
        </div>
      </section>
    </main>
  );
}
