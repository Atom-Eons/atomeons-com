import Link from "next/link";

/**
 * V3 Footer — Noir Cinema
 * --------------------------------------------------------------------------
 * The single inverted surface on a dark site. White-on-black colophon, ~60vh.
 * Editorial four-column index, oversized ÆONS lockup, hairline coordinates row.
 *
 * Direction: noir-cinema (winnerName).
 * Palette: ink #08090B / paper #F4F4F2 / steel #5A6068 / signal #22F0D5 / alert #FF4D4D.
 * Type: Inter Display Variable display, Inter Variable text, JetBrains Mono receipts.
 * Signature move alignment: hairline borders, mono receipts, no decoration, no icons.
 *
 * Surfaces this footer composes against: every page on the site. It is the
 * terminal frame. Calm, anti-hype, sourced. No social icons. No newsletter
 * form. No decoration. The page ends here.
 * --------------------------------------------------------------------------
 */

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  items: FooterLink[];
};

const COLUMNS: FooterColumn[] = [
  {
    heading: "Research",
    items: [
      { label: "Current papers", href: "/research" },
      { label: "ÆoNs Lab notebook", href: "/research/notebook" },
      { label: "Pre-registrations", href: "/research/preregistrations" },
      { label: "Disclosure IDs", href: "/research/disclosures" },
      { label: "Receipts", href: "/research/receipts" },
      { label: "Citations", href: "/research/citations" },
    ],
  },
  {
    heading: "Learn",
    items: [
      { label: "Curriculum", href: "/learn" },
      { label: "Cyber track", href: "/learn/cyber" },
      { label: "AI foundations", href: "/learn/ai" },
      { label: "Frontier seminars", href: "/learn/seminars" },
      { label: "Lesson index", href: "/learn/index" },
      { label: "All free", href: "/learn/free" },
    ],
  },
  {
    heading: "Build",
    items: [
      { label: "OrangeBox", href: "/orangebox" },
      { label: "B00KMakor", href: "/b00kmakor" },
      { label: "Skil.ski", href: "/skil-ski" },
      { label: "AESkill Suite", href: "/build/aeskill-suite" },
      { label: "GlyphSpeak", href: "/build/glyphspeak" },
      { label: "Crystal Lattice", href: "/build/clc" },
    ],
  },
  {
    heading: "Lab",
    items: [
      { label: "Founder note", href: "/about" },
      { label: "Operating doctrine", href: "/doctrine" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
      { label: "Status", href: "/status" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Security", href: "/legal/security" },
  { label: "Acceptable use", href: "/legal/acceptable-use" },
];

const BUILD_HASH =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
      process.env.NEXT_PUBLIC_COMMIT_SHA)) ||
  "00000000";

const SHORT_HASH = BUILD_HASH.slice(0, 7);
const CURRENT_YEAR = new Date().getUTCFullYear();
const BUILT_AT_ISO = new Date().toISOString().replace(".000Z", "Z");

export default function Footer() {
  return (
    <footer
      aria-labelledby="site-footer-heading"
      className="relative isolate w-full bg-[#F4F4F2] text-[#08090B] selection:bg-[#22F0D5] selection:text-[#08090B]"
      style={{ minHeight: "60vh" }}
    >
      {/* Visually hidden landmark heading */}
      <h2 id="site-footer-heading" className="sr-only">
        Site colophon
      </h2>

      {/* Hairline top edge — the inversion boundary */}
      <div aria-hidden className="h-px w-full bg-[#08090B]/10" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pt-20 pb-10 md:px-10 md:pt-28 md:pb-12 lg:px-16">
        {/* ─── Eyebrow row ──────────────────────────────────────────── */}
        <div className="mb-16 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#5A6068] md:mb-24 md:grid-cols-4">
          <span>§ Colophon</span>
          <span className="md:text-center">ÆoNs Research Laboratory</span>
          <span className="md:text-center">Est. MMXXIV</span>
          <span className="md:text-right">25°56′N · 81°43′W</span>
        </div>

        {/* ─── Index grid: lockup + four columns ────────────────────── */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-20">
          {/* Lockup — oversized ÆONS, the signature mass */}
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="AtomEons home"
              className="group inline-block"
            >
              <span
                className="block font-[var(--font-inter)] text-[#08090B] leading-[0.82]"
                style={{
                  fontFamily:
                    "var(--font-inter), 'Inter Display Variable', Inter, system-ui, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(120px, 22vw, 240px)",
                  fontVariationSettings: "'wght' 900, 'opsz' 144",
                  letterSpacing: "-0.045em",
                }}
              >
                ÆONS
              </span>
            </Link>

            <p
              className="mt-10 max-w-md text-[15px] leading-[1.65] text-[#1F242B] md:mt-12 md:text-[17px] md:leading-[1.7]"
              style={{
                fontFamily:
                  "'Newsreader', 'Iowan Old Style', 'Source Serif Pro', Georgia, serif",
                fontFeatureSettings: "'ss01', 'kern'",
              }}
            >
              A research laboratory shipping runtime cognition, frontier
              security tooling, and an AI education better than most
              universities — published, sourced, free.
            </p>

            {/* Live signal mini-panel echoing the hero */}
            <div className="mt-10 inline-flex items-center gap-3 border border-[#08090B]/15 bg-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5A6068]">
              <span
                aria-hidden
                className="relative inline-flex h-1.5 w-1.5"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#FF4D4D] opacity-60" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#FF4D4D]" />
              </span>
              <span className="text-[#08090B]">Lab signal</span>
              <span aria-hidden className="text-[#08090B]/25">·</span>
              <span>Operating</span>
            </div>
          </div>

          {/* Four-column index — sentence-case headers, single accent */}
          <nav
            aria-label="Site index"
            className="md:col-span-7 md:pl-4 lg:pl-12"
          >
            <ul className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-4 md:gap-x-6">
              {COLUMNS.map((col) => (
                <li key={col.heading}>
                  <h3
                    className="mb-5 font-mono text-[11px] uppercase leading-none tracking-[0.2em] text-[#5A6068]"
                  >
                    {col.heading}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          {...(item.external
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className="
                            group/link relative inline-flex items-baseline text-[15px] leading-[1.45]
                            text-[#08090B] transition-colors duration-300 ease-out
                            hover:text-[#22F0D5]
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22F0D5]
                          "
                        >
                          <span
                            aria-hidden
                            className="
                              mr-2 inline-block h-px w-0 bg-[#22F0D5] align-middle transition-[width]
                              duration-300 ease-out group-hover/link:w-3 group-focus-visible/link:w-3
                            "
                          />
                          <span>{item.label}</span>
                          {item.external && (
                            <span
                              aria-hidden
                              className="ml-1 font-mono text-[10px] text-[#9CA3AF] group-hover/link:text-[#22F0D5]"
                            >
                              ↗
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ─── Receipts strip ──────────────────────────────────────── */}
        <div className="mt-20 border-t border-[#08090B]/10 pt-8 md:mt-28">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 font-mono text-[11px] uppercase tracking-[0.16em] text-[#5A6068] md:grid-cols-4">
            <div>
              <dt className="text-[#9CA3AF]">Build</dt>
              <dd className="mt-2 text-[13px] tracking-[0.08em] text-[#08090B]">
                {SHORT_HASH}
              </dd>
            </div>
            <div>
              <dt className="text-[#9CA3AF]">Compiled</dt>
              <dd className="mt-2 text-[13px] tracking-[0.08em] text-[#08090B]">
                {BUILT_AT_ISO}
              </dd>
            </div>
            <div>
              <dt className="text-[#9CA3AF]">Origin</dt>
              <dd className="mt-2 text-[13px] tracking-[0.08em] text-[#08090B]">
                Marco Island, FL
              </dd>
            </div>
            <div>
              <dt className="text-[#9CA3AF]">License</dt>
              <dd className="mt-2 text-[13px] tracking-[0.08em] text-[#08090B]">
                Research-grade
              </dd>
            </div>
          </dl>
        </div>

        {/* ─── Final hairline row ──────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-6 border-t border-[#08090B]/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <p
            className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[#5A6068]"
          >
            © {CURRENT_YEAR} AtomEons Systems Laboratory · All rights observed
          </p>

          <ul
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]"
            aria-label="Legal"
          >
            {LEGAL_LINKS.map((legal, idx) => (
              <li key={legal.href} className="flex items-center gap-x-6">
                <Link
                  href={legal.href}
                  className="
                    text-[#5A6068] transition-colors duration-300 ease-out
                    hover:text-[#22F0D5]
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22F0D5]
                  "
                >
                  {legal.label}
                </Link>
                {idx < LEGAL_LINKS.length - 1 && (
                  <span aria-hidden className="text-[#08090B]/15">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Signature operator line — the unfakeable mark ──────── */}
        <p
          className="mt-12 text-[13px] leading-[1.55] text-[#5A6068] md:mt-16"
          style={{
            fontFamily:
              "'Newsreader', 'Iowan Old Style', 'Source Serif Pro', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          Written, shipped, and signed at 25°56′N 81°43′W. — Atom McCree,
          Marco Island.
        </p>
      </div>
    </footer>
  );
}
