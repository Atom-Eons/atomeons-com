import type { Metadata } from "next";
import Link from "next/link";
import { AutoGlyph } from "../_components/V3/Illustrations";

/**
 * /aiware · top-of-funnel landing for the AI Ware product line.
 *
 * Wave 43 · 2026-06-06 · operator: "products call aiware and put in
 * top nav." This is the landing visitors hit when they click "AI Ware"
 * in the top nav. The mega still works for power users · this is the
 * top-of-funnel destination per the Disney/Apple pattern.
 */

export const metadata: Metadata = {
  title: "AI Ware · the AtomEons product line",
  description:
    "Three shipped products · all built solo · all open or §4A perpetual · all available now. Orange³ v6 (4.46 MB native cockpit for Claude). AI Bookmaker (AI publishing). skil.ski (skill registry · Verify v1). Compare. Pricing. Use cases.",
  alternates: { canonical: "https://atomeons.com/aiware" },
  openGraph: {
    title: "AI Ware · AtomEons product line",
    description:
      "Three shipped products built by one operator · Orange³ · AI Bookmaker · skil.ski.",
    url: "https://atomeons.com/aiware",
    type: "article",
  },
};

const PRODUCTS = [
  {
    name: "Orange³ v6",
    tagline: "Native cockpit for Claude · 4.46 MB · §4A no-SaaS perpetual",
    href: "/orangebox",
    body: "Local-first Windows desktop. Turbo-optimize Claude with 27 constitutional guardrails, 14-department named-role routing, tamper-evident JSON receipts. BYO API keys. Zero markup on tokens. Zero telemetry. Source included. License §4A legally bans the vendor from switching to subscription.",
    accent: "#FF9F3F",
    bullets: ["Free always · §4A perpetual", "30-day Material Failure Guarantee", "70-200× smaller than Cursor/Windsurf"],
  },
  {
    name: "AI Bookmaker",
    tagline: "AI publishing cockpit · the studio that shipped I AM AI",
    href: "/b00kmakor",
    body: "Mac + Windows desktop tool for AI-augmented book publishing. End-to-end · manuscript intake · editorial · cover · audiobook · KDP metadata · disclosure ledger. Used by the lab to publish I AM AI in 75 days from blank page to live on Kindle.",
    accent: "#22F0D5",
    bullets: ["v3.2.0 · dynamic-world pricing", "Audiobook generation · synthetic Opus voice (Eleven Labs voice clone)", "Publication-ready KDP metadata"],
  },
  {
    name: "skil.ski",
    tagline: "Skill registry · Verify v1 · the standard-setter",
    href: "/skilski",
    body: "High-ticket curated skill marketplace. Standalone Verify v1 SKU ($499) ships a 40-point rubric plus runnable auto-scorer plus five industry pain dossiers plus a 1000-skill case study. The skill-validation product that sets the standard others measure against.",
    accent: "#9D7FFF",
    bullets: ["Verify v1 · $499 standalone", "40-point rubric + auto-scorer", "5 industry pain dossiers included"],
  },
];

export default function AIWarePage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              AI WARE · PRODUCT LINE · 2026
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(48px,9vw,108px)] font-light leading-[0.92]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              AI Ware.
            </h1>
            <p
              className="mt-4 text-[clamp(20px,2.4vw,28px)] font-light italic leading-[1.35] text-[#9CA3AF]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Three products. One operator. All shipped.
            </p>
            <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
              The AtomEons product line. Native software where everyone
              else ships Electron. Source-included where everyone else
              hides their stack. §4A perpetual where everyone else
              switches to subscription mid-license.
            </p>
          </div>
          <div className="hidden md:block" style={{ opacity: 0.6 }} aria-hidden>
            <AutoGlyph slug="/aiware" size={180} />
          </div>
        </div>
      </header>

      {/* Products · three big cards */}
      <section className="mt-16 space-y-8">
        {PRODUCTS.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="block border p-8 transition hover:border-[#22F0D5]"
            style={{ borderColor: "#1F242B" }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                className="text-[36px] font-light leading-tight text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {p.name}
              </h2>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.32em]"
                style={{ color: p.accent }}
              >
                Open page →
              </p>
            </div>
            <p
              className="mt-3 text-[20px] font-light italic"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: p.accent }}
            >
              {p.tagline}
            </p>
            <p className="mt-4 max-w-[80ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
              {p.body}
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {p.bullets.map((b) => (
                <li
                  key={b}
                  className="border border-[#1F242B] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Buying considerations
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/compare" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">/compare</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">Product comparison matrix · honest vs alternatives.</p>
          </Link>
          <Link href="/pricing" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">/pricing</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">All current pricing · ladder mechanic explained.</p>
          </Link>
          <Link href="/use-cases" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">/use-cases</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">Who buys this and why · operator-reported.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /aiware · the AtomEons product line · 3 shipped products · CC-BY 4.0
        </p>
      </footer>
    </main>
  );
}
