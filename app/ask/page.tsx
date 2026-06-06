import type { Metadata } from "next";
import Link from "next/link";
import { AskPaletteOpener } from "./AskPaletteOpener";

export const metadata: Metadata = {
  title: "Ask the lab · semantic Q&A · AtomEons",
  description:
    "Natural-language search over the lab's 310 routes. Type a question; Gemini drafts an answer from the closest passages and cites every route it used. Now unified with the ⌘K nav search.",
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
 * /ask — unified into the SearchPalette · 2026-06-05.
 *
 * Landing here auto-opens the unified search palette. There is no
 * separate AskBar UI anymore. The ⌘K search and the ask-the-lab Q&A
 * are ONE surface · search results render below, ask answer + sources
 * render above (when the query is question-shaped or ⌘↵ is pressed).
 *
 * This page renders chrome that explains the surface, with the
 * AskPaletteOpener client component triggering the palette on mount.
 */

export default function AskPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-[#F4F4F2]">
      <AskPaletteOpener />

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            § ask the lab · semantic Q&amp;A
          </p>
          <h1
            className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] text-[#F4F4F2] md:text-[64px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Type any question. The lab answers.
          </h1>
          <p
            className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            The ask surface is now unified with the ⌘K nav search. One
            input, two modes:
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">↵</span>
              <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                <span className="font-medium">Enter</span> · open the top fuzzy-search result · sub-50ms keyword retrieval over 247 routes
              </p>
            </li>
            <li className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">⌘↵</span>
              <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                <span className="font-medium">Cmd-Enter</span> · ask the lab · gemini-2.5-flash drafts a 2-5 sentence answer grounded only on lab content, with every source cited inline
              </p>
            </li>
          </ul>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
            the palette is opening for you now · close with esc · reopen any time with ⌘K
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ try these</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "what is prompt injection",
              "compare orangebox vs cursor",
              "what is mechanistic interpretability",
              "how does ORANGEBOX compress context",
              "what is the §4A no-SaaS covenant",
              "where is the I AM AI book sold",
            ].map((q) => (
              <a
                key={q}
                href={`/ask?q=${encodeURIComponent(q)}`}
                className="border border-[#1F242B] bg-[#0F1114] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
              >
                {q}
              </a>
            ))}
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              { href: "/api", label: "Developer API · POST /api/ask" },
              { href: "/constellation", label: "The graph view of all routes" },
              { href: "/datasets", label: "Open datasets · CC-BY 4.0" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
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
