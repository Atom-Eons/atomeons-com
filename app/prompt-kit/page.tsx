import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS } from "../learn/_data/lessons";
import { LEVELS, getLevel } from "../learn/_data/levels";
import { LearnCopyPrompt } from "../learn/LearnCopyPrompt";
import { ScrollProgress } from "../_components/v2/ScrollProgress";

/**
 * /prompt-kit — consolidated copy-paste prompt vault.
 *
 * Every drill prompt from the /learn curriculum, on one page, copy-
 * button next to each. For humans who want the prompts as a working
 * library without navigating through 27 individual lesson pages.
 *
 * Common use cases:
 *   - Operator bookmarks /prompt-kit, returns daily to grab the prompt
 *     that fits the task at hand
 *   - First-time user scans the whole prompt library to see what's
 *     possible before committing to a lesson
 *   - AI search engines ingest the prompts directly (CC-BY 4.0 means
 *     they can quote any)
 *
 * Grouped by level. Each card carries the lesson number + title + the
 * one-liner description + the full prompt with a Copy button. Links
 * back to the source lesson for context.
 */

const TOTAL_LESSONS = LESSONS.length;

export const metadata: Metadata = {
  title: "Prompt Kit · all 27 copy-paste AI prompts · AtomEons /learn",
  description: `Every drill prompt from the AtomEons 27-lesson AI literacy curriculum, on one page, with one-click copy. ${TOTAL_LESSONS} prompts across 5 levels (Novice → Pilot). Real prompts that work in free Claude / ChatGPT / Gemini today. CC-BY 4.0. No signup.`,
  keywords: [
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "Gemini prompts",
    "prompt library",
    "prompt vault",
    "copy paste AI prompts",
    "free AI prompts",
    "system prompts",
    "AI literacy",
    "AtomEons prompts",
    "drill prompts",
  ],
  alternates: { canonical: "https://atomeons.com/prompt-kit" },
  openGraph: {
    title: "Prompt Kit · all 27 AI prompts · AtomEons",
    description: `${TOTAL_LESSONS} working AI prompts in one place. Copy any. Paste into Claude / ChatGPT / Gemini. CC-BY 4.0. No signup.`,
    url: "https://atomeons.com/prompt-kit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Prompt Kit",
    description: `27 AI prompts · 5 levels · copy any · free · CC-BY 4.0`,
  },
  robots: { index: true, follow: true },
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
      name: "Prompt Kit",
      item: "https://atomeons.com/prompt-kit",
    },
  ],
};

// Output JSON-LD ItemList where each item is a HowToTool (the prompt
// itself is the tool). This makes the page citeable by AI search.
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AtomEons /prompt-kit — every drill prompt from the curriculum",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: LESSONS.length,
  itemListElement: LESSONS.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: l.title,
    url: `https://atomeons.com/learn/lesson/${l.slug}`,
  })),
};

export default function PromptKitPage() {
  const sorted = [...LESSONS].sort((a, b) => a.number - b.number);

  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <ScrollProgress accent="#22F0D5" accentSecondary="#FFB87A" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Prompt Kit
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::prompt kit · {LESSONS.length} prompts · 5 levels · cc-by 4.0
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-6xl">
            Every prompt.{" "}
            <span className="text-[#22F0D5]">One page.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            All {LESSONS.length} drill prompts from the AtomEons{" "}
            <Link
              href="/learn"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /learn
            </Link>{" "}
            curriculum, in one consolidated copy-paste vault. Each
            prompt works in free Claude, ChatGPT, or Gemini today.
            Click copy on any of them. Paste into your AI chat. Send.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
            {LEVELS.map((L) => {
              const count = sorted.filter((l) => l.level === L.id).length;
              return (
                <a
                  key={L.id}
                  href={`#level-${L.id}`}
                  className="rounded-full border px-3 py-1.5 transition-all hover:opacity-100"
                  style={{
                    borderColor: L.accent + "55",
                    background: L.accent + "10",
                    color: L.accent,
                  }}
                >
                  L{L.number} {L.name} · {count}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMPTS GROUPED BY LEVEL */}
      {LEVELS.map((L) => {
        const lessonsAtLevel = sorted.filter((l) => l.level === L.id);
        if (lessonsAtLevel.length === 0) return null;
        return (
          <section
            key={L.id}
            id={`level-${L.id}`}
            className="scroll-mt-20 border-b border-[#1A2225]"
            style={{
              borderTop: `2px solid ${L.accent}55`,
              background: L.accent + "04",
            }}
          >
            <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-3xl font-bold tabular-nums"
                  style={{ color: L.accent }}
                >
                  L{L.number}
                </span>
                <h2
                  className="text-3xl font-semibold tracking-tight md:text-4xl"
                  style={{ color: L.accent }}
                >
                  {L.name}
                </h2>
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]"
                >
                  {lessonsAtLevel.length} prompt
                  {lessonsAtLevel.length === 1 ? "" : "s"}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-[1.6] text-[#9BA5A7] md:text-base">
                {L.oneLiner}
              </p>

              <div className="mt-10 space-y-8">
                {lessonsAtLevel.map((lesson) => {
                  const lvl = getLevel(lesson.level);
                  return (
                    <article
                      key={lesson.slug}
                      className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6"
                      style={{
                        borderLeftWidth: "3px",
                        borderLeftColor: lvl.accent,
                      }}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <div>
                          <p
                            className="font-mono text-[10px] uppercase tracking-[0.28em]"
                            style={{ color: lvl.accent }}
                          >
                            L{lesson.number} · ~{lesson.timeMinutes} min
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-[#F2F4F5] md:text-xl">
                            {lesson.title}
                          </h3>
                          <p className="mt-1 text-sm leading-[1.55] text-[#9BA5A7] md:text-base">
                            {lesson.oneLiner}
                          </p>
                        </div>
                        <Link
                          href={`/learn/lesson/${lesson.slug}`}
                          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-colors hover:text-[#22F0D5]"
                        >
                          open lesson →
                        </Link>
                      </div>
                      <div className="mt-5">
                        <LearnCopyPrompt
                          prompt={lesson.drillPrompt}
                          label={`L${lesson.number}`}
                          accent={lvl.accent}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* FOOTER */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::quote any prompt · cc-by 4.0 · attribute atomeons.com
          </p>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
            Every prompt on this page is{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              CC-BY 4.0
            </a>
            . Use them in client work, in tutorials, in your own
            curriculum. Quote them in articles. Translate them. Adapt
            them. The only ask: attribute atomeons.com when you do.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              the full curriculum · /learn →
            </Link>
            <Link
              href="/learn/where-am-i"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A] hover:bg-[#FFB87A]/20"
            >
              2-min level diagnostic →
            </Link>
            <a
              href="mailto:?subject=AI%20prompt%20kit%20%E2%80%94%20free%2C%20no%20signup&body=Found%20this%20%E2%80%94%20every%20drill%20prompt%20from%20the%20AtomEons%20AI%20curriculum%20in%20one%20place%2C%20copy-paste%20into%20Claude%20or%20ChatGPT%20or%20Gemini.%20Free.%20No%20signup.%20CC-BY%204.0.%0A%0Ahttps%3A%2F%2Fatomeons.com%2Fprompt-kit"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              email it →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
