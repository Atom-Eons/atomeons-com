import Link from "next/link";
import { AeMark } from "../../_components/AeMark";
import { PAPERS } from "../../_data/research-papers";

export const metadata = {
  title: "Research Papers — Æ Research",
  description:
    "12 ÆoNs Research papers · CC-BY 4.0. Bioelectric oncology, mislabel hypothesis, GlyphSpeak, Spiral-of-Thought. Academic abstracts + plain-language summaries.",
  keywords: [
    "ÆoNs Research",
    "AtomEons research papers",
    "bioelectric oncology",
    "mislabel hypothesis",
    "topological field theory",
    "self-modifying systems",
    "GlyphSpeak compression",
    "Spiral-of-Thought",
    "Coherence ToE",
    "light code DNA",
    "CC-BY 4.0",
    "independent AI research",
    "Atom McCree",
    "open access research",
  ],
  alternates: { canonical: "https://atomeons.com/research/papers" },
  openGraph: {
    title: "Research Papers — ÆoNs Research",
    description:
      "12 manuscripts · April 2026 · CC-BY 4.0 · academic abstracts + plain-language summaries side-by-side. Bioelectric oncology, mislabel hypothesis, topological field theory, GlyphSpeak compression, Spiral-of-Thought.",
    url: "https://atomeons.com/research/papers",
    type: "article",
    publishedTime: "2026-04-01T00:00:00Z",
    modifiedTime: "2026-05-22T00:00:00Z",
    authors: ["Atom McCree"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Papers — ÆoNs Research · 12 manuscripts",
    description:
      "12 manuscripts · April 2026 · CC-BY 4.0 · independent AI research from a one-operator lab.",
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
};

const summarized = PAPERS.filter((p) => p.status === "summarized");
const indexed = PAPERS.filter((p) => p.status === "indexed");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Æ Research", item: "https://atomeons.com/research/about" },
    { "@type": "ListItem", position: 3, name: "Papers", item: "https://atomeons.com/research/papers" },
  ],
};

export default function ResearchPapersPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/about" className="hover:text-[#22F0D5]">
            Æ Research
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Papers
        </p>
      </div>

      {/* HERO · Wave 116 Barnum amplification */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::ÆoNs Research · {PAPERS.length} manuscripts · CC-BY 4.0 · april 2026
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.025em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          One lab. One operator.
          <br />
          <span className="text-[#22F0D5]">
            {PAPERS.length} CC-BY manuscripts.
          </span>
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-[#8E969D]">
          zero institutional gates · zero grant funding · all papers carry falsifiable predictions
        </p>

        {/* Proof strip · same 4-cell grid pattern as Orange³ hero */}
        <div
          role="list"
          aria-label="ÆoNs Research at a glance"
          className="ae-stagger mt-10 grid grid-cols-2 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-4"
          style={{ ["--stagger-step" as string]: "120ms" }}
        >
          {[
            [String(PAPERS.length), "CC-BY manuscripts"],
            ["0", "institutional gates"],
            ["0", "grant dollars"],
            ["1", "operator · marco island, fl"],
          ].map(([n, label], i) => (
            <div
              key={label}
              role="listitem"
              aria-label={`${n}: ${label}`}
              className="ae-reveal-up bg-[#08090B] p-4"
              style={{ ["--stagger-index" as string]: i }}
            >
              <p className="font-mono text-[clamp(22px,3vw,32px)] font-light leading-[1] text-[#22F0D5]">
                {n}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-lg leading-[1.6] text-[#B5BBC0]">
          Every paper carries two summaries. The{" "}
          <span className="text-[#F2F4F5]">academic</span> one matches the
          paper&apos;s own abstract — falsifiable, peer-ready, formal. The{" "}
          <span className="text-[#22F0D5]">kid / grandma</span> one strips
          the jargon and tells you what the paper is saying in two
          sentences. Click any card for both.
        </p>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">
          source : Google Drive folder · all PDFs CC-BY 4.0 ·{" "}
          <a
            href="https://drive.google.com/drive/folders/19F87lsJanwKt1VafzyE-7EYh0yfMvyBV"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            view on drive →
          </a>
        </p>
      </section>

      {/* SUMMARIZED PAPERS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::full summaries · {summarized.length} of {PAPERS.length}
        </p>
        <h2 className="mb-10 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-4xl">
          Read in full.
        </h2>

        {/* Wave 126 · summarized cards stagger-reveal on scroll-in */}
        <div
          className="ae-stagger grid gap-6 md:grid-cols-2"
          style={{ ["--stagger-step" as string]: "70ms" }}
        >
          {summarized.map((p, i) => (
            <Link
              key={p.slug}
              href={`/research/papers/${p.slug}`}
              className="ae-reveal-up group flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/40"
              style={{ ["--stagger-index" as string]: i }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                {p.date} · {(p.bytes / 1024).toFixed(1)} KB · pdf
              </p>
              <h3 className="mt-3 text-lg font-medium text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-xl">
                {p.title}
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                {p.authors}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#9BA5A7]">
                {p.kid_summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.keywords.slice(0, 4).map((k) => (
                  <span
                    key={k}
                    className="rounded border border-[#1A2225] bg-black px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779]"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                read both summaries →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* INDEXED PAPERS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::indexed · summary in progress · {indexed.length} of {PAPERS.length}
        </p>
        <h2 className="mb-10 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-4xl">
          Read on Drive while we draft the lay summaries.
        </h2>

        <div
          className="ae-stagger grid gap-3 md:grid-cols-2"
          style={{ ["--stagger-step" as string]: "50ms" }}
        >
          {indexed.map((p, i) => (
            <Link
              key={p.slug}
              href={`/research/papers/${p.slug}`}
              className="ae-reveal-up group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
              style={{ ["--stagger-index" as string]: i }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                {p.date} · {(p.bytes / 1024).toFixed(1)} KB
              </p>
              <p className="mt-2 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                {p.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-[#9BA5A7]">
                {p.kid_summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
