import Link from "next/link";
import { AeMark } from "../../_components/AeMark";
import { PAPERS } from "../../_data/research-papers";

export const metadata = {
  title: "Research Papers — Æ Research",
  description:
    "Twelve ÆoNs Research manuscripts published April 2026 under CC-BY 4.0. Topics span bioelectric oncology, the gut-brain mislabel hypothesis, solar information transfer, the topological field theory of self-modifying systems, light code DNA version control, the universal defect framework, Coherence ToE, GlyphSpeak compression, and the Spiral-of-Thought architecture. Each paper carries an academic abstract and a plain-language summary side-by-side for non-scientists.",
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

export default function ResearchPapersPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
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

      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::ÆoNs Research · 12 manuscripts · april 2026
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          Read the papers.
          <br />
          <span className="text-[#FF7A1A]">
            We&apos;ll explain them like you&apos;re six.
          </span>
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          Every paper carries two summaries. The{" "}
          <span className="text-[#F2F4F5]">academic</span> one matches the
          paper&apos;s own abstract — falsifiable, peer-ready, formal. The{" "}
          <span className="text-[#22F0D5]">kid / grandma</span> one strips
          the jargon and tells you what the paper is saying in two
          sentences. Click any card for both.
        </p>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
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

        <div className="grid gap-6 md:grid-cols-2">
          {summarized.map((p) => (
            <Link
              key={p.slug}
              href={`/research/papers/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
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
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
          ::indexed · summary in progress · {indexed.length} of {PAPERS.length}
        </p>
        <h2 className="mb-10 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-4xl">
          Read on Drive while we draft the lay summaries.
        </h2>

        <div className="grid gap-3 md:grid-cols-2">
          {indexed.map((p) => (
            <Link
              key={p.slug}
              href={`/research/papers/${p.slug}`}
              className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
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
