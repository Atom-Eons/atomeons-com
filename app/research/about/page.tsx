import Link from "next/link";
import Image from "next/image";
import { AeMark } from "../../_components/AeMark";

export const metadata = {
  title: "About — Æ Research",
  description:
    "ÆoNs Research Laboratory / AtomEons Systems Laboratory. One independent researcher in Marco Island, FL, building unified field theories of cancer, economics, AI alignment, and astrophysics — and the cockpit that ships them.",
  alternates: { canonical: "https://atomeons.com/research/about" },
  openGraph: {
    title: "About — ÆoNs Research Laboratory",
    description:
      "One operator. One lab. One unifying field. Independent AI + frontier-science research from Marco Island, FL.",
    type: "article",
    images: [
      "/research/lessons-from-sci-fi/stills/metropolis-maschinenmensch.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — ÆoNs Research Laboratory",
    description:
      "One operator. One lab. One unifying field. Marco Island, FL.",
    images: [
      "/research/lessons-from-sci-fi/stills/metropolis-maschinenmensch.png",
    ],
  },
};

const PILLARS = [
  {
    n: "01",
    title: "One organism, many lenses",
    body: "Cancer, financial crises, AI misalignment, and the astrophysical pair-instability gap all look like the same topological defect once you pick the right field. The lab's first job is to find that field.",
  },
  {
    n: "02",
    title: "Truth over theater",
    body: "Receipts on every claim. Falsifiable predictions on every paper. If a hypothesis can't be killed, it isn't science — it's branding. We publish the conditions under which we'd retract.",
  },
  {
    n: "03",
    title: "Built through the cockpit",
    body: "Every paper, every product, every line of code in this lab passes through ORANGEBOX — the cockpit we sell. The lab eats its own work. The work survives the lab.",
  },
  {
    n: "04",
    title: "Solo, independent, fully open",
    body: "No university chair. No grant funding. No co-author obligations from any institution. The papers carry one human name, two or three AI collaborators (CRediT-tagged), and CC-BY 4.0 licensing.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Æ Research", item: "https://atomeons.com/research/about" },
    { "@type": "ListItem", position: 3, name: "About", item: "https://atomeons.com/research/about" },
  ],
};

export default function ResearchAbout() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/papers" className="hover:text-[#22F0D5]">
            Æ Research
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> About
        </p>
      </div>

      {/* HERO — lead image vignette (Metropolis Maschinenmensch, US PD).
            Anchors the page visually to the research wing's flagship
            asset set without over-using HAL (homepage already leads
            with that frame). */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/research/lessons-from-sci-fi/stills/metropolis-maschinenmensch.png"
            alt=""
            width={1376}
            height={864}
            priority
            sizes="100vw"
            className="h-full w-full object-cover opacity-[0.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            <AeMark size={22} glow />
            ::ÆoNs Research Laboratory · since 2026
          </p>
          <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
            One operator. <span className="text-[#22F0D5]">One lab.</span>{" "}
            <span className="text-[#22F0D5]">One unifying field.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            ÆoNs Research is the publishing arm of AtomEons Systems Laboratory —
            a solo independent research lab run by Atom McCree out of Marco
            Island, Florida. The thesis: cancer, financial systemic risk, AI
            alignment failure, and the pair-instability mass gap are
            mathematically the same kind of failure in self-modifying dynamical
            systems. The diagnostic across all four domains is the spectral
            entropy of the flow-weighted graph Laplacian. The invariant is the
            topological winding number. The substrate is a sinusoidal Light
            Code.
          </p>

          {/* Sub-lane chips to the rest of the research wing */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/research/papers"
              className="rounded-full border border-[#22F0D5]/40 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] transition-colors hover:border-[#22F0D5] hover:bg-[#22F0D5]/15"
            >
              12 papers →
            </Link>
            <Link
              href="/research/lessons-from-sci-fi"
              className="rounded-full border border-[#1A2225] bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7] transition-colors hover:border-[#22F0D5]/60 hover:text-[#22F0D5]"
            >
              Lessons From Sci-Fi · gallery →
            </Link>
            <Link
              href="/research/lessons-from-sci-fi/monograph"
              className="rounded-full border border-[#1A2225] bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7] transition-colors hover:border-[#22F0D5]/60 hover:text-[#22F0D5]"
            >
              the 38-page monograph →
            </Link>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::lab pillars
        </p>
        <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          What the lab insists on.
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {PILLARS.map((p) => (
            <div
              key={p.n}
              className="bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
                  {p.n}
                </span>
                <h3 className="text-base font-medium text-[#F2F4F5]">
                  {p.title}
                </h3>
              </div>
              <p className="mt-3 pl-10 text-sm leading-relaxed text-[#9BA5A7]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OPERATOR CARD */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-[#1A2225] bg-gradient-to-br from-[#0A0F11] via-[#0A0F11] to-[#101A1C] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::lab operator
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-[auto_1fr]">
            <div className="inline-flex h-32 w-32 items-center justify-center rounded-2xl border border-[#22F0D5]/40 bg-black shadow-[0_0_40px_-10px_rgba(34,240,213,0.5)]">
              <AeMark size={84} glow />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#F2F4F5]">
                Atom McCree
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
                founder · ÆoNs Research / AtomEons Systems Laboratory · Marco Island, FL
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#9BA5A7] md:text-base">
                Independent researcher. Writes the papers, ships the cockpit
                they were drafted in, and answers his own email. No team. No
                co-founders. No deck. No roadmap theater. The work shipped
                this year unifies four scientific domains under one set of
                equations and runs through ORANGEBOX Command v6.3 — the
                $99 cockpit at{" "}
                <Link
                  href="/orangebox"
                  className="text-[#22F0D5] hover:text-[#FFA45A]"
                >
                  /orangebox
                </Link>
                .
              </p>
              <div className="mt-5 grid gap-3 text-xs md:grid-cols-3">
                <div className="rounded-lg border border-[#1A2225] bg-[#0A0F11] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    ::author identifier
                  </p>
                  <p className="mt-1 text-[#F2F4F5]">Atom McCree</p>
                  <p className="font-mono text-[#6B7779]">
                    AtomEons Systems Laboratory
                  </p>
                </div>
                <div className="rounded-lg border border-[#1A2225] bg-[#0A0F11] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    ::location
                  </p>
                  <p className="mt-1 text-[#F2F4F5]">Marco Island, FL, USA</p>
                  <p className="font-mono text-[#6B7779]">independent · no chair</p>
                </div>
                <div className="rounded-lg border border-[#1A2225] bg-[#0A0F11] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    ::license
                  </p>
                  <p className="mt-1 text-[#F2F4F5]">CC-BY 4.0</p>
                  <p className="font-mono text-[#6B7779]">
                    quote with attribution
                  </p>
                </div>
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[#22F0D5]">
                <a
                  href="mailto:a.mccree@gmail.com"
                  className="hover:text-[#FFA45A]"
                >
                  a.mccree@gmail.com
                </a>
                {"  "}·{"  "}
                <a
                  href="https://x.com/AtomMccree"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-[#FFA45A]"
                >
                  @AtomMccree
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LAB INVENTORY — what's actually shipped, with citation guidance.
            Makes the research wing feel research-grade rather than blog-
            grade, and gives any AI search engine indexing this page an
            explicit "here is the work" call-out. */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::lab inventory · what&apos;s shipped
        </p>
        <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          The output. The citation guidance.
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            {
              tag: "manuscripts",
              count: "12",
              title: "ÆoNs Research papers",
              body: "Twelve manuscripts published April 2026 under CC-BY 4.0. Each paper carries an academic abstract and a plain-language summary side-by-side.",
              href: "/research/papers",
              cite: 'McCree, A. (2026). "[Paper title]." ÆoNs Research, AtomEons Systems Laboratory. CC-BY 4.0. https://atomeons.com/research/papers/[slug]',
            },
            {
              tag: "monograph",
              count: "38pp",
              title: "Lessons From Sci-Fi",
              body: "A century of imagined machines, taxonomized. 7 epochs, 200+ screen texts, 5-dimensional taxonomy. Companion gallery with 10 cinema-clip embeds.",
              href: "/research/lessons-from-sci-fi/monograph",
              cite: 'McCree, A. (2026). "Lessons From Sci-Fi: Novel Features and Use Cases of AI in Film and Television." ÆoNs Research. CC-BY 4.0. https://atomeons.com/research/lessons-from-sci-fi/monograph',
            },
            {
              tag: "intel",
              count: "1,851ln",
              title: "X Algorithm Alpha",
              body: "Operational deconstruction of the May 15 2026 xAI open-sourced For-You algorithm. 31 sections, every claim cited to file+line in xai-org/x-algorithm.",
              href: "/intel/x-algorithm",
              cite: 'McCree, A. (2026). "X Algorithm Alpha — operator extensions." AtomEons /intel. CC-BY 4.0. https://atomeons.com/intel/x-algorithm',
            },
            {
              tag: "broadcast",
              count: "nightly",
              title: "The Founder's View",
              body: "Daily 8pm ET letter from the lab. Fictional broadcast framing; events cited are real. Archive at /founders-view, RSS at /founders-view/rss.xml.",
              href: "/founders-view",
              cite: 'McCree, A. (2026). "[Letter title]." The Founder\'s View, AtomEons Systems Laboratory. CC-BY 4.0. https://atomeons.com/founders-view/[slug]',
            },
          ].map((item) => (
            <Link
              key={item.tag}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                  ::{item.tag}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  {item.count}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">
                {item.body}
              </p>
              <p className="mt-4 rounded-lg border border-[#1A2225] bg-[#040608] p-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#6B7779]">
                ::cite as
                <br />
                <span className="font-sans text-[10px] normal-case tracking-normal text-[#9BA5A7]">
                  {item.cite}
                </span>
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#22F0D5]/30 bg-[#0E1418] p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::open contribution
          </p>
          <p className="mt-4 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
            The lab is deliberately one-operator. Not hiring. Not adding
            co-authors. The reproducibility surface is the github repo at{" "}
            <a
              href="https://github.com/AtomEons/atomeons-com"
              target="_blank"
              rel="noopener"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              github.com/AtomEons/atomeons-com
            </a>{" "}
            (the site is public source). Useful contributions: factual
            corrections, accessibility fixes, mobile bug reports,
            translations of any CC-BY paper into a non-English language.
            Send a PR or email{" "}
            <a
              href="mailto:a.mccree@gmail.com"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              a.mccree@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/research/papers"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
              ::read the papers
            </p>
            <p className="mt-3 text-xl font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              12 manuscripts · April 2026 →
            </p>
            <p className="mt-2 text-sm text-[#9BA5A7]">
              Bioelectric oncology, gut-brain mislabeling, solar information
              transfer, topological field theory, light-code DNA version
              control.
            </p>
          </Link>
          <Link
            href="/founders-view"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
              ::nightly broadcast
            </p>
            <p className="mt-3 text-xl font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              The Founder&apos;s View → 8pm ET daily
            </p>
            <p className="mt-2 text-sm text-[#9BA5A7]">
              No-punches-pulled letter from the lab. Equal opportunity
              indignation. Subscribe by bookmark.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
