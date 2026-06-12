import type { Metadata } from "next";
import Link from "next/link";
import { QUESTIONS } from "../_data/q-questions";

export const metadata: Metadata = {
  title: "AI search answers · twenty AtomEons Q-pages",
  description:
    "Twenty AI-search-optimized 'What is X' pages — direct answers to common Gemini, Perplexity, ChatGPT, and Google AI Overview queries about AI, cyber, and frontier-tech topics. Real citations, structured for AI ingestion, free.",
  alternates: { canonical: "https://atomeons.com/q" },
  openGraph: {
    title: "AI search answers · AtomEons Q-pages",
    description:
      "Twenty 'What is X' pages with the short answer up top and structured factual longform below.",
    url: "https://atomeons.com/q",
    type: "website",
  },
};

/**
 * /q — the AI-search surface
 *
 * Twenty long-form "What is X" pages, each answering one common query
 * an AI search engine would receive. Each page is structured with:
 *
 *   - Short answer (the AI Overview snippet)
 *   - Longer authoritative explanation
 *   - Key facts with real citations
 *   - Related questions
 *   - Sources
 *
 * The /q surface is optimized for ingestion by Gemini, Perplexity,
 * ChatGPT Browse, and Google AI Overview.
 */

export default function QIndexPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2] antialiased">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">§ Q</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">AI-search answers</span>
          </p>
          <h1 className="mt-10 max-w-[22ch] text-balance text-[clamp(44px,7vw,96px)] font-extralight leading-[1.02] tracking-[-0.03em] text-[#F4F4F2]">
            Twenty common questions, answered for AI search.
          </h1>
          <p
            className="mt-10 max-w-[68ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Each page below is a direct answer to a common Gemini, Perplexity,
            ChatGPT, or Google AI Overview query. Short answer up top (the
            snippet a model will lift). Long-form authoritative explanation
            underneath, with real citations and named sources.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <ul role="list" className="grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-2 lg:grid-cols-3">
            {QUESTIONS.map((q, i) => (
              <li key={q.slug} className="bg-[#0F1114]">
                <Link
                  href={`/q/${q.slug}`}
                  className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-[#08090B] md:p-9"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                    <span className="text-[#1F242B]">Q/{String(i + 1).padStart(2, "0")}</span>
                  </p>
                  <h2
                    className="font-serif text-[22px] leading-[1.2] tracking-[-0.005em] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5] md:text-[26px]"
                    style={{ fontFamily: "Newsreader, Garamond, Georgia, serif" }}
                  >
                    {q.question}
                  </h2>
                  <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                    /q/{q.slug}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p
            className="font-serif text-[17px] italic leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            All twenty pages are CC-BY 4.0. Each cites real papers, RFCs,
            CVEs, NIST docs, MITRE techniques, or vendor whitepapers —
            verifiable, not invented. New questions added regularly.
          </p>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              <span aria-hidden>←</span>
              <span>Back to /learn</span>
            </Link>
            <Link
              href="/learn/atlas"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Atlas
            </Link>
            <Link
              href="/learn/cyber"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Cyber
            </Link>
            <Link
              href="/research/decoded"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Decoded papers
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
