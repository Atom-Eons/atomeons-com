import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS, totalCurriculumMinutes } from "../_data/lessons";
import { LEVELS, getLevel } from "../_data/levels";

/**
 * /learn/library — the full lesson directory.
 *
 * Grouped by level. Every lesson with title, oneLiner, time estimate,
 * tags. The flat reference page for AI search engines + humans who
 * want to pick any lesson out of order.
 */

const TOTAL_MIN = totalCurriculumMinutes();

export const metadata: Metadata = {
  title: "Lesson library · /learn · AtomEons",
  description: `The full ${LESSONS.length}-lesson AtomEons AI literacy curriculum. Grouped by level (Novice · Learner · User · Operator · Pilot). Every lesson has a concept, a copy-paste drill, an outcome, and a trap. Free, CC-BY 4.0. ~${Math.round(TOTAL_MIN / 60)} hours total.`,
  alternates: { canonical: "https://atomeons.com/learn/library" },
  openGraph: {
    title: "Lesson library · /learn · AtomEons",
    description: `${LESSONS.length} lessons across 5 levels. Free. CC-BY 4.0. ~${Math.round(TOTAL_MIN / 60)}h total.`,
    url: "https://atomeons.com/learn/library",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons /learn library",
    description: `${LESSONS.length} lessons. 5 levels. Free. CC-BY 4.0.`,
  },
  robots: { index: true, follow: true },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AtomEons /learn lesson library",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: LESSONS.length,
  itemListElement: LESSONS.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: l.title,
    url: `https://atomeons.com/learn/lesson/${l.slug}`,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AtomEons",
      item: "https://atomeons.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Learn",
      item: "https://atomeons.com/learn",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Library",
      item: "https://atomeons.com/learn/library",
    },
  ],
};

export default function LessonLibraryPage() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">
            Learn
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Library
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::lesson library · {LESSONS.length} lessons · 5 levels · free · cc-by 4.0
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-6xl">
            The full library.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Every lesson, grouped by level. Pick any one. They&apos;re
            self-contained — designed to be useful even if you skip the
            path order.
          </p>
        </div>
      </section>

      {LEVELS.map((lvl) => {
        const ls = LESSONS.filter((l) => l.level === lvl.id);
        if (ls.length === 0) return null;
        return (
          <section
            key={lvl.id}
            className="border-b border-[#1A2225]"
            style={{ borderTop: `2px solid ${lvl.accent}55` }}
          >
            <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-3xl font-bold tabular-nums"
                  style={{ color: lvl.accent }}
                >
                  L{lvl.number}
                </span>
                <h2
                  className="text-3xl font-semibold tracking-tight md:text-4xl"
                  style={{ color: lvl.accent }}
                >
                  {lvl.name}
                </h2>
              </div>
              <p className="mt-3 max-w-2xl text-base leading-[1.65] text-[#9BA5A7] md:text-lg">
                {lvl.oneLiner}
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {ls.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/learn/lesson/${l.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40 md:p-6"
                    style={{ borderLeftWidth: "3px", borderLeftColor: lvl.accent }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.28em]"
                        style={{ color: lvl.accent }}
                      >
                        L{l.number}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                        ~{l.timeMinutes} min
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-xl">
                      {l.title}
                    </h3>
                    <p className="text-sm leading-[1.6] text-[#9BA5A7]">
                      {l.oneLiner}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {l.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[#1A2225] bg-[#0E1418] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::part of /learn · the AtomEons AI literacy curriculum
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              ← back to /learn (the curriculum spine)
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
