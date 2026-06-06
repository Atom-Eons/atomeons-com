import type { Metadata } from "next";
import Link from "next/link";
import { AskBar } from "../_components/V3/AskBar";

export const metadata: Metadata = {
  title: "Ask the lab · semantic Q&A · AtomEons",
  description:
    "Natural-language search over the lab's 256 routes. Type a question; Gemini drafts an answer from the closest passages and cites every route it used.",
  alternates: { canonical: "https://atomeons.com/ask" },
  openGraph: {
    title: "Ask the lab",
    description:
      "Type a question. The lab's content gets retrieved and Gemini synthesizes a cited answer.",
    url: "https://atomeons.com/ask",
    type: "website",
  },
};

/**
 * /ask — dedicated semantic Q&A page.
 *
 * The AskBar component does the work; this page wraps it in lab chrome
 * and gives the operator a stable URL to link to (in nav, in /now, in
 * AI-SEO crawl bait, etc).
 */

export default function AskPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-[#F4F4F2]">
      {/* Header band */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            § Æ06 · runtime — semantic Q&A
          </p>
          <h1
            className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] text-[#F4F4F2] md:text-[64px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Ask the lab a question.
          </h1>
          <p
            className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            The site indexes itself across {""}
            <span className="text-[#F4F4F2]">256 routes</span>: research
            decoded papers, deep-dives, cyber pages, lab journals, every
            piece of public copy. Type any question and Gemini drafts an
            answer from the closest passages, with the routes cited
            inline so you can verify.
          </p>
          <p className="mt-4 max-w-2xl font-mono text-[12px] uppercase tracking-[0.18em] text-[#5A6068]">
            retrieval = fuzzy + vector · generator = gemini-2.5-flash · grounded only on lab content
          </p>
        </div>
      </section>

      {/* AskBar */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <AskBar />
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § how it works
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Retrieve",
                body:
                  "Your question is matched against every page on the site — title, headings, keywords, body. The top 5 routes are pulled as candidate context.",
              },
              {
                step: "02",
                title: "Ground",
                body:
                  "Those passages — and ONLY those passages — go into a Gemini Flash request with a strict instruction: answer from the source, cite the route, no hallucination.",
              },
              {
                step: "03",
                title: "Cite",
                body:
                  "Gemini returns a 2–5 sentence answer with inline citations. Every source is rendered below the answer with a deep link, so you can read the full context yourself.",
              },
            ].map((s) => (
              <div key={s.step} className="border-l-2 border-[#1F242B] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                  {s.step}
                </p>
                <h3
                  className="mt-3 font-serif text-[26px] font-light leading-[1.15] text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-3 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guardrails */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § what this does NOT do
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "Does not invent.",
                b: "If the lab's pages do not contain an answer, the response says so. No fabricated facts, no inferred personas. The retrieval window is the answer window.",
              },
              {
                t: "Does not store your query.",
                b: "Requests are forwarded to Gemini and discarded. No logs, no profile, no analytics tied to your question.",
              },
              {
                t: "Does not represent the operator.",
                b: "Atom McCree does not speak through this surface. It paraphrases lab-published copy only. For direct contact, use /press or atom@atomeons.com.",
              },
              {
                t: "Does not advise.",
                b: "Outputs are informational. Not investment, not legal, not medical, not safety-critical guidance.",
              },
            ].map((row) => (
              <div key={row.t} className="border border-[#1F242B] bg-[#0F1114] p-5">
                <p
                  className="font-serif text-[17px] font-medium text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {row.t}
                </p>
                <p
                  className="mt-2 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {row.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next moves */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § elsewhere on the lab
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { href: "/", label: "Home" },
              { href: "/now", label: "Now · ship log" },
              { href: "/research", label: "Research · papers" },
              { href: "/learn", label: "Learn · atlas + cyber + vertical" },
              { href: "/press", label: "Press · publisher kit" },
              { href: "/i-am-ai", label: "I AM AI · the book" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p
                  className="mt-2 font-serif text-[18px] font-medium text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {l.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
