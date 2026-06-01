import type { Metadata } from "next";
import Link from "next/link";
import DailyPrompt from "./DailyPrompt";

export const metadata: Metadata = {
  title: "AI prompt of the day · /learn · AtomEons",
  description: "70 daily-rotating AI prompts. One per day. Calibrated, copy-paste ready, every category. Free. No signup. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/prompts" },
  openGraph: {
    title: "AI prompt of the day · /learn",
    description: "70 prompts · one per day · copy-paste ready · CC-BY 4.0",
    url: "https://atomeons.com/learn/prompts",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI prompt of the day", description: "70 prompts · daily rotation · free" },
  robots: { index: true, follow: true },
};

export default function PromptsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Daily prompt
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::daily prompt · 70 on rotation · auto-pick by date
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            One prompt.{" "}
            <span className="text-[#22F0D5]">Every day.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            70 hand-curated copy-paste prompts. The page
            picks today&apos;s based on the date. Browse the full set
            below the daily card. Use this as a 5-minute AI habit anchor.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
          <DailyPrompt />
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
