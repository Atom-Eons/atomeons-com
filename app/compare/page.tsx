import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare · ATOMEONS products vs alternatives · honest matrices",
  description:
    "Side-by-side comparisons of ORANGEBOX, B00KMAKR, and skil.ski against named alternatives. Each row names where the competitor wins. No LARP, no marketing inflation.",
  alternates: { canonical: "https://atomeons.com/compare" },
};

const COMPARES = [
  { href: "/orangebox/competitors", title: "ORANGEBOX vs alternatives", description: "Cursor · Cline · Claude Desktop · Continue · Aider · DIY MCP. Six head-to-heads with honest WIN / LOSE per row." },
  { href: "/b00kmakor/competitors", title: "B00KMAKR vs alternatives", description: "Vellum · Atticus · Scrivener · Reedsy · Adobe InDesign. Five head-to-heads scoped to indie publishing workflows." },
  { href: "/skilski/competitors", title: "skil.ski vs alternatives", description: "Anthropic Skills · OpenAI GPT Store · ChatGPT Plugins · Smithery · PulseMCP. Five head-to-heads in the MCP/skill marketplace space." },
];

const PRINCIPLES = [
  "Every comparison page names where the competitor BEATS the lab product outright.",
  "Buyers who feel marketed-at don't buy. Buyers who feel the comparison is honest do.",
  "No paid placement on the lab's own comparison pages.",
  "No 'category-killer' / 'best-in-class' / 'AI revolutionary' marketing tags.",
  "Pricing is named with the actual number, not a range or a 'starting at.'",
  "If the competitor is free or cheaper, we say so on the FIRST row.",
];

export default function ComparePage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ compare · honest matrices</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Where we win. Where we lose.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Three head-to-head matrices covering ORANGEBOX, B00KMAKR,
            and skil.ski against the named alternatives buyers are
            actually considering. Honest comparisons mean naming the
            row where the competitor beats the lab.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ the three matrices</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {COMPARES.map((c) => (
              <Link key={c.href} href={c.href} className="group border border-[#1F242B] bg-[#0F1114] p-6 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{c.href}
                </p>
                <h2 className="mt-3 font-serif text-[22px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.title}</h2>
                <p className="mt-3 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ comparison-page authoring rules</p>
          <ol className="mt-8 space-y-3">
            {PRINCIPLES.map((p, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ also see</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { href: "/vs", label: "AI tool comparisons" },
              { href: "/supermodels", label: "Model leaderboard (May 2026)" },
              { href: "/use-cases", label: "Use cases by persona" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
