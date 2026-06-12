import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "B00KMAKR · roadmap + anti-roadmap",
  description:
    "B00KMAKR's near-term ship plan and explicit anti-roadmap. What we will build, what we will not build, why each line is on this page.",
  alternates: { canonical: "https://atomeons.com/b00kmakor/roadmap" },
};

const NEAR_TERM = [
  { item: "Native Linux build", when: "Q4 2026", why: "Operators on Linux ask for it; the architecture supports it; it's a port, not a rewrite." },
  { item: "Multi-narrator audiobook mixer", when: "v3.3.x", why: "Tools to assign chapters to different TTS voices and balance mix-levels before ACX upload." },
  { item: "IngramSpark / Lulu metadata exporters", when: "v3.3.x", why: "Operators publishing wide need parallel metadata pipelines, not just KDP." },
  { item: "Plain-text proof-pass workflow", when: "v3.3.x", why: "Operator-side proof reading flow that doesn't require Word or Google Docs." },
  { item: "Bilingual / multi-language EPUB export", when: "Q1 2027", why: "Spanish + French + Portuguese audiobook+ebook pipelines for the lab's existing /learn/cheatsheet languages." },
];

const LONG_TERM = [
  "Hardware-accelerated EPUB validation (currently CPU-only)",
  "Built-in podcast pipeline as a sibling to the audiobook one",
  "Hardcover-only premium SKU on direct-sale (not Amazon)",
];

const ANTI_ROADMAP = [
  { item: "AI-written content", why: "B00KMAKR is an authoring INSTRUMENT, not a content generator. The operator writes the book. We help ship it. The ai_disclosure_ledger logs every AI step the book passed through, but the prose stays the operator's." },
  { item: "Subscription pricing", why: "License §4A no-SaaS covenant — same as ORANGEBOX. Buyers own the version they bought, in perpetuity." },
  { item: "Cloud-hosted version", why: "Manuscripts are operator-private. A cloud version would invert that. Run B00KMAKR locally; your draft never leaves your machine." },
  { item: "Locked-in distribution (Amazon-only)", why: "B00KMAKR exports to KDP, IngramSpark, Lulu, Apple Books, Kobo, and Google Play Books. Locking buyers to one storefront would harm them." },
  { item: "Lock-in DRM on output formats", why: "EPUBs B00KMAKR produces are vanilla EPUB3, no proprietary DRM. Operators take the output anywhere." },
  { item: "AI-generated cover art (built-in)", why: "Different art problem; different tools (Midjourney, Ideogram, Recraft, real designers). The cover renderer takes YOUR artwork and prepares it for print + ebook specs." },
];

export default function B00kmakrRoadmapPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ B00KMAKR · roadmap + anti-roadmap</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            An instrument, not a content factory.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What's queued for the next quarters. And the anti-roadmap —
            the lines we'll never cross, the features we'll never build.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ next 90 days</p>
          <ol className="mt-8 space-y-5">
            {NEAR_TERM.map((n, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-serif text-[20px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{n.item}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">{n.when}</p>
                </div>
                <p className="mt-2 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{n.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ longer horizon · less commitment</p>
          <ul className="mt-8 space-y-3">
            {LONG_TERM.map((l, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">~</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ what B00KMAKR will NEVER do</p>
          <ol className="mt-10 space-y-5">
            {ANTI_ROADMAP.map((a, i) => (
              <li key={i} className="border-l-2 border-[#FF4D4D] pl-5">
                <p className="font-serif text-[19px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {String(i + 1).padStart(2, "0")} · {a.item}
                </p>
                <p className="mt-2 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{a.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { href: "/b00kmakor", label: "Back to B00KMAKR" },
              { href: "/b00kmakor/changelog", label: "Version history" },
              { href: "/b00kmakor/competitors", label: "Competitor comparison" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
