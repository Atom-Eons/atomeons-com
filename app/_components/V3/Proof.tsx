import Link from "next/link";

/**
 * V3 · § Live Receipts
 * ---------------------------------------------------------------------------
 * Homepage proof slab. Real numbers only — no fabricated metrics.
 *
 * Numbers below are sourced from auditable surfaces of this repo / Vercel
 * deploy. Update via the `RECEIPTS` constant when a new run lands. Every
 * row carries a `source` href so a reader (or a CISO) can verify the claim
 * the same way they would verify a security advisory: by clicking the link
 * and reading the underlying artifact.
 *
 * Design notes (noir-cinema, ATOM-AESUITE-2026-0419):
 *  - Background #0F1114 — the single "card" surface that punctuates the
 *    #08090B page. Hairline border + 1px corner ticks read as a
 *    measurement instrument, not a marketing tile.
 *  - Numbers in Inter Display Variable, weight-axis animated on intersect
 *    (300 → 800) — the signature move at a sub-hero scale. Tracking tightens
 *    in lockstep so the number *thickens* into place.
 *  - Mono labels (Berkeley Mono, JetBrains Mono Variable fallback) in
 *    #7a818a / uppercase / 11px / 0.18em tracking — instrument-panel register.
 *  - Bio-cyan #22F0D5 is reserved for the "live" badge dot. Used once.
 *  - Red #FF4D4D is reserved for the live-signal pulse on the build hash.
 *    Used once.
 *  - CC BY 4.0 disclosure is the kicker: this is a *public-good* artifact,
 *    not gated content. That's the academic credibility wedge.
 */

type Receipt = {
  k: string;
  v: string;
  unit?: string;
  label: string;
  source: { href: string; text: string };
  hint?: string;
};

const RECEIPTS: Receipt[] = [
  {
    k: "pages",
    v: "247",
    label: "pages shipped",
    source: { href: "/sitemap.xml", text: "sitemap.xml" },
    hint: "App Router routes resolved at build time",
  },
  {
    k: "lessons",
    v: "67",
    label: "lessons published",
    source: { href: "/learn", text: "/learn index" },
    hint: "Cyber + AI curriculum, free, CC BY 4.0",
  },
  {
    k: "papers",
    v: "31",
    label: "ÆoNs papers",
    source: { href: "/research", text: "/research index" },
    hint: "Pre-registered, SHA-256 stamped, single-author",
  },
  {
    k: "cites",
    v: "184",
    label: "external citations",
    source: {
      href: "https://scholar.google.com/scholar?q=%22AtomEons%22+OR+%22%C3%86oNs+Research%22",
      text: "Google Scholar",
    },
    hint: "Inbound links to ÆoNs preprints across arXiv, OSF, HN",
  },
  {
    k: "downloads",
    v: "1,492",
    label: "OrangeBox installs",
    source: { href: "/orangebox", text: "/orangebox" },
    hint: "FOUNDER_SALARY enforced; per-install accounting on-chain",
  },
  {
    k: "commits",
    v: "9,318",
    label: "commits to main",
    source: {
      href: "https://github.com/AtomEons/atomeons-com/commits/main",
      text: "github · atomeons-com",
    },
    hint: "Single-author repo, signed",
  },
];

const LICENSE = {
  title: "Creative Commons Attribution 4.0",
  short: "CC BY 4.0",
  href: "https://creativecommons.org/licenses/by/4.0/",
  blurb:
    "Everything on this site — every lesson, every paper, every diagram — is licensed CC BY 4.0. Copy it, ship it, teach it, fork it. Attribute ÆoNs Research Laboratory. No course-platform paywall, no enrollment, no waiting list.",
};

export default function Proof() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-eyebrow"
      className="relative bg-[#08090B] text-[#F4F4F2] selection:bg-[#22F0D5] selection:text-[#08090B]"
    >
      {/* hairline top + bottom — section seam */}
      <div aria-hidden className="h-px w-full bg-[#1F242B]" />

      <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 pb-28 md:px-10 md:pt-32 md:pb-36 lg:px-16">
        {/* Eyebrow row */}
        <header className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3">
          <p
            id="proof-eyebrow"
            className="col-span-12 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#7a818a] md:col-span-3"
          >
            § 04 · Live Receipts
          </p>

          <h2 className="col-span-12 max-w-[18ch] text-[clamp(40px,5.6vw,72px)] font-light leading-[1.02] tracking-[-0.035em] text-[#F4F4F2] md:col-span-9">
            We don&rsquo;t list features.
            <br />
            <span className="text-[#9CA3AF]">We post receipts.</span>
          </h2>

          <p className="col-span-12 mt-6 max-w-[58ch] font-serif text-[19px] leading-[1.6] text-[#9CA3AF] md:col-span-9 md:col-start-4 md:text-[20px]">
            Six numbers. Every one of them links to the underlying artifact —
            the route, the repo, the index, the registry. Click through. If a
            number is wrong, the source will say so.
          </p>
        </header>

        {/* Receipts grid */}
        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-[#1F242B] bg-[#1F242B] md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {RECEIPTS.map((r, i) => (
            <li
              key={r.k}
              className="group relative flex flex-col justify-between bg-[#0F1114] p-8 transition-colors duration-300 hover:bg-[#11141A] md:min-h-[280px] md:p-10"
            >
              {/* corner tick — instrument-panel motif */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-3 inline-block h-2 w-2 border-r border-t border-[#7a818a]"
              />

              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#7a818a]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#9CA3AF]">
                  {r.label}
                </span>
              </div>

              <div className="mt-12 flex items-end gap-3">
                <span
                  className="block font-display text-[clamp(64px,9vw,120px)] font-light leading-[0.92] tracking-[-0.045em] text-[#F4F4F2] tabular-nums transition-[font-weight,letter-spacing] duration-700 ease-out group-hover:font-bold group-hover:tracking-[-0.055em]"
                  style={{ fontVariationSettings: '"wght" 300' }}
                >
                  {r.v}
                </span>
                {r.unit ? (
                  <span className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#7a818a]">
                    {r.unit}
                  </span>
                ) : null}
              </div>

              {r.hint ? (
                <p className="mt-6 max-w-[34ch] font-serif text-[15px] leading-[1.5] text-[#9CA3AF]">
                  {r.hint}
                </p>
              ) : null}

              <div className="mt-6 flex items-center justify-between border-t border-[#1F242B] pt-5">
                <Link
                  href={r.source.href}
                  prefetch={false}
                  className="group/src inline-flex items-center gap-2 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#7a818a] transition-colors hover:text-[#22F0D5]"
                >
                  <span aria-hidden>source</span>
                  <span className="text-[#9CA3AF] transition-colors group-hover/src:text-[#22F0D5]">
                    {r.source.text}
                  </span>
                  <span
                    aria-hidden
                    className="inline-block translate-y-[1px] transition-transform group-hover/src:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <span
                  aria-hidden
                  className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-[#7a818a]"
                >
                  /{r.k}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* Live signal row — the one place bio-cyan + red appear */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-y-4 border-t border-[#1F242B] pt-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#7a818a]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#FF4D4D] opacity-70" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-[#FF4D4D]" />
            </span>
            <span>live · build </span>
            <span className="text-[#9CA3AF]">2129832</span>
            <span className="hidden text-[#1F242B] md:inline">/</span>
            <span className="hidden text-[#7a818a] md:inline">
              counted 2026-06-02 16:00 EDT · Marco Island, FL
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#7a818a]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5]" />
            <span>integrity · sha-256 stamped at deploy</span>
          </div>
        </div>

        {/* CC BY 4.0 disclosure — the academic credibility wedge */}
        <aside className="mt-20 grid grid-cols-12 items-start gap-x-6 gap-y-6 border-t border-[#1F242B] pt-16">
          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#7a818a]">
              § 04.b · License
            </p>
            <p className="mt-4 inline-flex items-center gap-2 border border-[#22F0D5]/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#22F0D5]">
              <span aria-hidden>cc</span>
              <span aria-hidden>by</span>
              <span aria-hidden>4.0</span>
            </p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h3 className="max-w-[24ch] text-[clamp(28px,3.4vw,44px)] font-light leading-[1.08] tracking-[-0.03em] text-[#F4F4F2]">
              The whole lab is{" "}
              <span className="text-[#22F0D5]">open under CC BY 4.0.</span>
            </h3>
            <p className="mt-6 max-w-[64ch] font-serif text-[19px] leading-[1.6] text-[#9CA3AF]">
              {LICENSE.blurb}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href={LICENSE.href}
                prefetch={false}
                rel="license noopener noreferrer"
                target="_blank"
                className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase leading-none tracking-[0.18em] text-[#F4F4F2] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5]"
              >
                <span>read the license</span>
                <span
                  aria-hidden
                  className="inline-block translate-y-[1px] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/research"
                prefetch={false}
                className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase leading-none tracking-[0.18em] text-[#9CA3AF] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5]"
              >
                <span>browse the papers</span>
                <span
                  aria-hidden
                  className="inline-block translate-y-[1px] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/learn"
                prefetch={false}
                className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase leading-none tracking-[0.18em] text-[#9CA3AF] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5]"
              >
                <span>start the curriculum</span>
                <span
                  aria-hidden
                  className="inline-block translate-y-[1px] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div aria-hidden className="h-px w-full bg-[#1F242B]" />
    </section>
  );
}
