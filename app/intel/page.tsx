import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ÆoNs Intel — alpha drops | AtomEons",
  description:
    "Decoded systems, open receipts. The lab's intelligence work.",
  alternates: {
    canonical: "https://atomeons.com/intel",
  },
};

/**
 * /intel — ÆoNs Intel index.
 *
 * Server component. All drops live in the typed INTEL_DROPS array below.
 * Add a new entry here when a new drop ships; the "All drops" list and
 * the "Featured drop" card both derive from the same source.
 *
 * Featured = first entry (most recent).
 */

type IntelDrop = {
  slug: string;
  date: string;             // display string, e.g. "May 15, 2026"
  tag: string;              // short mono tag, e.g. "ALPHA DROP · MAY 15"
  title: string;
  teaser: [string, string]; // exactly 2 paragraphs
  href: string;
};

const INTEL_DROPS: IntelDrop[] = [
  {
    slug: "x-algorithm",
    date: "May 15, 2026",
    tag: "ALPHA DROP · MAY 15",
    title: "The X Algorithm — Open-Sourced",
    teaser: [
      "X released the recommendation algorithm. The lab decoded the receipts. Ranking weights, engagement multipliers, suppression signals — all in the open.",
      "15 key insights, 6 operator-class extensions, a 12-rule cheatsheet, and the full 1,851-line analysis doc. Every claim cites file + line in the xai-org/x-algorithm repo.",
    ],
    href: "/intel/x-algorithm",
  },
];

const FEATURED = INTEL_DROPS[0];

export default function IntelIndexPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <span className="text-[#22F0D5]">Æ Intel</span>
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::ÆOS INTEL · ALPHA DROPS
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          The lab watches the systems.
          <br />
          <span className="text-[#FF7A1A]">Receipts published.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          Independent analysis of public systems — algorithms, codebases,
          published data — decoded into operator-class intelligence.
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          Every drop cites its source. Every claim is falsifiable. No
          commentary without evidence.
        </p>
      </section>

      {/* FEATURED DROP */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
          ::featured drop
        </p>

        <Link
          href={FEATURED.href}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1A2225] bg-[#000]/60 p-8 transition-colors hover:bg-[#0D1518] md:flex-row md:items-start md:gap-10"
        >
          {/* top accent line */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,240,213,0.5), transparent)",
            }}
          />

          {/* tag + date */}
          <div className="mb-5 shrink-0 md:mb-0 md:w-40 md:pt-0.5">
            <span className="inline-block rounded border border-[#22F0D5]/30 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              {FEATURED.tag}
            </span>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779]">
              {FEATURED.date}
            </p>
          </div>

          {/* copy */}
          <div className="flex-1">
            <h2 className="mb-4 text-xl font-medium text-[#F2F4F5] md:text-2xl">
              {FEATURED.title}
            </h2>
            <p className="mb-3 max-w-2xl text-sm leading-relaxed text-[#9BA5A7] md:text-base">
              {FEATURED.teaser[0]}
            </p>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#9BA5A7] md:text-base">
              {FEATURED.teaser[1]}
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors group-hover:text-[#F2F4F5]">
              Read the intel{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      </section>

      {/* ALL DROPS LIST */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
          ::all drops
        </p>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {INTEL_DROPS.map((drop, i) => (
            <Link
              key={drop.slug}
              href={drop.href}
              className={`group flex flex-col gap-1 px-6 py-5 transition-colors hover:bg-[#0D1518] md:flex-row md:items-baseline md:gap-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779] md:w-32">
                {drop.date}
              </span>
              <span className="flex-1 text-sm font-medium text-[#F2F4F5] transition-colors group-hover:text-[#22F0D5] md:text-base">
                {drop.title}
              </span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779] transition-colors group-hover:text-[#22F0D5]">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::how new drops surface
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7779]">
            Subscribe by{" "}
            <Link
              href="/intel/rss.xml"
              className="text-[#6B7779] underline underline-offset-4 transition-colors hover:text-[#F2F4F5]"
            >
              RSS
            </Link>
            {", "}
            follow{" "}
            <a
              href="https://x.com/AtomMccree"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7779] underline underline-offset-4 transition-colors hover:text-[#F2F4F5]"
            >
              @AtomMccree
            </a>
            {", "}
            or read the nightly Founder&apos;s View at{" "}
            <Link
              href="/founders-view"
              className="text-[#6B7779] underline underline-offset-4 transition-colors hover:text-[#F2F4F5]"
            >
              8pm ET
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
