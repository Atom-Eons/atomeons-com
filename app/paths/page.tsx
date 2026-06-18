import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paths · AI Pilot · Cyber Pro · AtomEons",
  description:
    "Two guided learning tracks · AI Pilot (how to fly with an AI copilot) · Cyber Pro (how to think like a defender). Free. CC-BY 4.0. Receipts at every gate.",
  alternates: { canonical: "https://atomeons.com/paths" },
  openGraph: {
    title: "Paths · AI Pilot · Cyber Pro",
    description: "Two guided tracks · free · CC-BY 4.0.",
    url: "https://atomeons.com/paths",
    type: "website",
  },
};

const PATHS = [
  {
    href: "/paths/ai-pilot",
    label: "AI Pilot",
    desc: "How to fly with an AI copilot · pick a model · prompt with intent · check work · ship.",
    cohort: "for anyone who wants to use AI well without becoming an ML engineer",
    accent: "#22F0D5",
  },
  {
    href: "/paths/cyber-pro",
    label: "Cyber Pro",
    desc: "How to think like a defender · the mental model first · then the tools · then the practice.",
    cohort: "for the operator who wants the cyber lens before the cyber career",
    accent: "#FF7733",
  },
];

export default function Paths() {
  return (
    <main className="min-h-screen bg-[#08090B] text-[#E7EBED]">
      <section className="mx-auto max-w-[1100px] px-6 py-20 md:px-8 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § paths · two tracks · free · CC-BY 4.0
        </p>
        <h1 className="mt-4 font-mono text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.95] tracking-tight">
          Pick a track.
        </h1>
        <p className="mt-6 max-w-[640px] text-[18px] leading-[1.5] text-[#9CA3AF]">
          Two guided learning paths the lab runs. Both free. Both CC-BY 4.0.
          Both designed so an 88-year-old and a 14-year-old can finish them
          and feel changed by it.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group block border border-[#1F242B] bg-[#0B0C0F] p-8 transition-colors hover:border-[#22F0D5]"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.32em]"
                style={{ color: p.accent }}
              >
                {p.cohort}
              </p>
              <h2 className="mt-3 font-mono text-[36px] font-light leading-[1] text-[#F4F4F2]">
                {p.label}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.55] text-[#9CA3AF]">
                {p.desc}
              </p>
              <p
                className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: p.accent }}
              >
                open {p.label.toLowerCase()} →
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-16 max-w-[640px] font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7779]">
          Atom McCree · AtomEons Systems Laboratory · Marco Island, FL · 2026
        </p>
      </section>
    </main>
  );
}
