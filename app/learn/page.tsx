import type { Metadata } from "next";
import Link from "next/link";
import { LEVELS } from "./_data/levels";
import { PATHS } from "./_data/paths";
import { LESSONS, totalCurriculumMinutes } from "./_data/lessons";
import { CopyLearnLink } from "./CopyLearnLink";

/**
 * /learn — the AI literacy curriculum spine.
 *
 * Mission, in one sentence (operator directive 2026-05-26):
 *   "I want to onboard humanity to AI. Through this site."
 *
 * /start was the 11-minute appetizer. /learn is the curriculum that
 * follows — 12 lessons across 5 levels, with 5 persona-fit paths and
 * a real understanding of when chat is enough and when it isn't.
 *
 * Page architecture:
 *   1. Hero — "Onboarding humanity to AI."
 *   2. Why this exists + what it is + what it isn't
 *   3. Level map — 5 levels from Novice to Pilot, with honest entry
 *      criteria, graduation criteria, and the right tool at each
 *   4. Path picker — 5 persona paths (Worker, Builder, Student,
 *      Operator, Curious), each linking to its own page
 *   5. Lesson library teaser → /learn/library
 *   6. Lab principles — receipts not slogans, no signup, no list,
 *      no affiliate revenue, CC-BY 4.0
 *   7. Graduation: when you're done with /learn, where to go
 *
 * Structured data:
 *   - Course (canonical)
 *   - ItemList (the 12 lessons)
 *   - BreadcrumbList
 */

const TOTAL_MIN = totalCurriculumMinutes();
const TOTAL_LESSONS = LESSONS.length;

export const metadata: Metadata = {
  title:
    "Learn AI · the multi-week curriculum · onboarding humanity to AI · AtomEons",
  description: `A free 12-lesson curriculum that moves any human from never-used-AI to operator-grade. Five levels (Novice → Learner → User → Operator → Pilot). Five paths by persona (Worker · Builder · Student · Operator · Curious). Real drills, copy-paste prompts, honest limits, graduation criteria. ${TOTAL_LESSONS} lessons · ~${Math.round(TOTAL_MIN / 60)} hours total. No signup. No mailing list. No affiliate revenue. CC-BY 4.0.`,
  keywords: [
    "AI curriculum",
    "AI learning path",
    "learn AI",
    "AI literacy",
    "AI for beginners",
    "AI for workers",
    "AI for builders",
    "AI for students",
    "AI for operators",
    "AI for curious",
    "what is AI",
    "first AI prompt",
    "AI hallucination",
    "AI verify rule",
    "AI lessons",
    "free AI course",
    "no signup AI",
    "AI on-ramp",
    "44 million displaced workers",
    "Claude vs ChatGPT vs Gemini",
    "Ollama tutorial",
    "AI cockpit",
    "ORANGEBOX",
    "AtomEons",
  ],
  alternates: { canonical: "https://atomeons.com/learn" },
  openGraph: {
    title: "Learn AI · the curriculum · /learn · AtomEons",
    description: `${TOTAL_LESSONS} lessons · 5 levels · 5 paths · ~${Math.round(TOTAL_MIN / 60)} hours. Real drills. Honest limits. Free. No signup. CC-BY 4.0.`,
    url: "https://atomeons.com/learn",
    type: "article",
    locale: "en_US",
    siteName: "AtomEons",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn AI · the curriculum",
    description: `${TOTAL_LESSONS} lessons · 5 levels · 5 paths · free · CC-BY 4.0 · /learn`,
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Learn AI — the AtomEons curriculum",
  description: `A 12-lesson curriculum moving any human from never-used-AI to operator-grade. Five levels (Novice → Pilot). Five persona-fit paths. Free, CC-BY 4.0, no signup.`,
  provider: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
    sameAs: ["https://x.com/AtomMccree", "https://github.com/AtomEons"],
  },
  educationalLevel: "Beginner to Advanced",
  inLanguage: "en",
  isAccessibleForFree: true,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: `PT${Math.round(TOTAL_MIN / 60)}H${TOTAL_MIN % 60}M`,
    instructor: {
      "@type": "Person",
      name: "Atom McCree",
      url: "https://atomeons.com/about",
    },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    category: "Free",
  },
  syllabusSections: LESSONS.map((l, i) => ({
    "@type": "Syllabus",
    name: l.title,
    description: l.oneLiner,
    position: i + 1,
    timeRequired: `PT${l.timeMinutes}M`,
  })),
  about: [
    "AI literacy",
    "prompt engineering",
    "large language models",
    "Claude",
    "ChatGPT",
    "Gemini",
    "Ollama",
    "AI verification",
    "AI hallucination",
    "AI cockpit",
  ],
  license: "https://creativecommons.org/licenses/by/4.0/",
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AtomEons Learn — 12 lesson curriculum",
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
  ],
};

export default function LearnPage() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
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
          <span className="text-[#1A2225]">/</span> Learn
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::atomeons · /learn · the curriculum · free · cc-by 4.0
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Onboarding humanity{" "}
            <span className="text-[#22F0D5]">to AI.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            {TOTAL_LESSONS} lessons. Five levels. Five paths. Real
            drills, copy-paste prompts, honest limits, graduation
            criteria. From <em className="not-italic text-[#FFB87A]">never used AI</em>{" "}
            to <em className="not-italic text-[#22F0D5]">operating it daily</em>.
            Free. No signup. No mailing list. No affiliate revenue.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
            <span className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1.5 text-[#22F0D5]">
              {TOTAL_LESSONS} lessons
            </span>
            <span className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1.5 text-[#22F0D5]">
              5 levels · novice → pilot
            </span>
            <span className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1.5 text-[#22F0D5]">
              5 paths · pick your fit
            </span>
            <span className="rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-3 py-1.5 text-[#FFB87A]">
              ~{Math.round(TOTAL_MIN / 60)}h total · 4–8 weeks at honest pace
            </span>
            <span className="rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-3 py-1.5 text-[#FFB87A]">
              cc-by 4.0 · quote any answer
            </span>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="#paths"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_60px_rgba(34,240,213,0.35)] transition-all hover:bg-[#7DDBC8]"
            >
              pick your path →
            </Link>
            <Link
              href="/learn/library"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              full lesson library →
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:text-[#22F0D5]"
            >
              or the 11-min appetizer · /start
            </Link>
          </div>
        </div>
      </section>

      {/* WHY / WHAT / NOT */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::what this is · what it isn&apos;t
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#0A0F11] p-6 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::what this is
              </p>
              <ul className="mt-4 space-y-3 text-base leading-[1.65] text-[#C8CCCE]">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
                  <span>
                    A curated 12-lesson path. Real drills. Real prompts you
                    can copy-paste right now. Honest limits at every level.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
                  <span>
                    Calibrated to where you actually are (Novice → Pilot),
                    not where the cartel pretends everyone should be.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
                  <span>
                    Tool-agnostic at every level. Free Claude / ChatGPT /
                    Gemini gets you through the first nine lessons.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
                  <span>
                    CC-BY 4.0. Quote any answer. Translate it. Send the
                    link to one person who would benefit.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#0A0F11] p-6 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::what this is NOT
              </p>
              <ul className="mt-4 space-y-3 text-base leading-[1.65] text-[#C8CCCE]">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#FFB87A]" />
                  <span>
                    Not a sales funnel. There&apos;s no email gate. No
                    upsell. No webinar. No certificate at the end.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#FFB87A]" />
                  <span>
                    Not a 100-lesson series padded for engagement. Twelve
                    lessons that actually do the work.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#FFB87A]" />
                  <span>
                    Not affiliated revenue. We name Claude, ChatGPT, Gemini,
                    Ollama, ORANGEBOX. We take ZERO from any of them.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#FFB87A]" />
                  <span>
                    Not infinite. After Pilot, you&apos;re operating — the
                    next move is doing the work, not another lesson.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL MAP */}
      <section id="levels" className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::the five levels · honest entry · honest graduation
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Locate yourself. Then pick the lesson that fits.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#9BA5A7] md:text-lg">
            Five levels, named honestly. You will see exactly what enters
            you at each level and exactly what graduates you. No
            certificate. No badge. Just a working description.
          </p>

          <div className="mt-12 space-y-5">
            {LEVELS.map((lvl) => (
              <article
                key={lvl.id}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-8"
                style={{ borderLeft: `4px solid ${lvl.accent}` }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-3xl font-bold tabular-nums tracking-tight"
                    style={{ color: lvl.accent }}
                  >
                    L{lvl.number}
                  </span>
                  <h3
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                    style={{ color: lvl.accent }}
                  >
                    {lvl.name}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-[1.65] text-[#F2F4F5] md:text-lg">
                  {lvl.oneLiner}
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: lvl.accent }}
                    >
                      ::enters this level
                    </p>
                    <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                      {lvl.enters}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: lvl.accent }}
                    >
                      ::graduates to next
                    </p>
                    <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                      {lvl.graduates}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: lvl.accent }}
                    >
                      ::risk at this level
                    </p>
                    <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                      {lvl.riskAtThisLevel}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: lvl.accent }}
                    >
                      ::right tool at this level
                    </p>
                    <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                      {lvl.rightTool}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PATH PICKER */}
      <section id="paths" className="border-b border-[#1A2225] bg-[#0e2520]/30">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::five paths · same lessons · different sequence
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Pick the human you are this season.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#9BA5A7] md:text-lg">
            Same lesson library underneath. Different sequence on top.
            What changes per persona is which lessons hit first, and
            how heavy the path leans toward operator-grade tools.
          </p>

          <div className="mt-12 space-y-4">
            {PATHS.map((path) => (
              <Link
                key={path.id}
                href={`/learn/${path.id}`}
                className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40 md:p-8"
                style={{ borderLeftWidth: "4px", borderLeftColor: path.accent }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                    style={{ color: path.accent }}
                  >
                    {path.label}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
                    {path.lessons.length} lessons · ~
                    {Math.round(path.totalMinutes / 60)}h · {path.weeks} weeks
                  </span>
                </div>
                <p className="mt-3 text-base leading-[1.7] text-[#F2F4F5] md:text-lg">
                  {path.oneLine}
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                      ::fit for
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm leading-[1.55] text-[#C8CCCE]">
                      {path.fitFor.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-[#22F0D5]">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                      ::not for
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm leading-[1.55] text-[#C8CCCE]">
                      {path.notFor.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-[#FFB87A]">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] group-hover:text-[#F2F4F5]">
                  open the {path.id} path →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LIBRARY TEASER */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::or browse the full lesson library
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            All {TOTAL_LESSONS} lessons. Pick any.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#9BA5A7] md:text-lg">
            Every lesson has the same shape: concept · drill · outcome ·
            trap. You can do them in path order or pick the one that
            answers what you&apos;re stuck on right now.
          </p>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {LESSONS.map((l) => (
              <Link
                key={l.slug}
                href={`/learn/lesson/${l.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                    L{l.number} · {l.level}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    ~{l.timeMinutes} min
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-lg">
                  {l.title}
                </h3>
                <p className="text-sm leading-[1.55] text-[#9BA5A7]">
                  {l.oneLiner}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/learn/library"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              open the full library · filter by level / tag →
            </Link>
          </div>
        </div>
      </section>

      {/* SEND IT TO ONE PERSON */}
      <section className="border-b border-[#1A2225] bg-gradient-to-b from-[#0e2520]/40 via-[#0a1a17]/40 to-[#0e2520]/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-20 md:py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::the only ask
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Send this to{" "}
            <span className="text-[#22F0D5]">one person</span>.
          </h2>
          <p className="mt-6 text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
            Someone in your phone right now is staring at the AI
            transition wondering if they&apos;ve already missed it.
            They have not. They were not handed the door. Send them
            the link and walk away. The curriculum has the rest.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="sms:?&body=12-lesson%20AI%20curriculum%20%E2%80%94%20free%2C%20no%20signup%2C%20no%20mailing%20list%2C%20no%20cartel.%20The%20path%20from%20never-used-AI%20to%20operating%20it%20daily.%20https%3A%2F%2Fatomeons.com%2Flearn"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
              aria-label="Send via text message"
            >
              text it →
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=A%20free%2012-lesson%20AI%20curriculum%20%E2%80%94%20no%20signup%2C%20no%20mailing%20list%2C%20no%20cartel.%20Five%20levels%20(novice%20%E2%86%92%20operator).%20Real%20drills.%20Honest%20limits.%20CC-BY%204.0.%20%40AtomMccree%20built%20it.&url=https%3A%2F%2Fatomeons.com%2Flearn"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
              aria-label="Share to X"
            >
              tweet it →
            </a>
            <a
              href="mailto:?subject=A%2012-lesson%20AI%20curriculum%2C%20free%2C%20no%20signup&body=I%20found%20this%20and%20thought%20of%20you.%20Twelve%20lessons%20across%20five%20levels.%20Real%20drills%20with%20copy-paste%20prompts.%20Honest%20limits.%20No%20signup.%20No%20mailing%20list.%20No%20affiliate%20revenue.%20CC-BY%204.0.%0A%0Ahttps%3A%2F%2Fatomeons.com%2Flearn"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
              aria-label="Send via email"
            >
              email it →
            </a>
            <CopyLearnLink />
          </div>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
            ::no tracking · no shortener · no marketing pixel · just the link
          </p>
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#9BA5A7]">
            ::provenance · why trust this curriculum
          </p>
          <div className="mt-6 space-y-4 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            <p>
              This curriculum is published by AtomEons Systems
              Laboratory, a one-operator independent AI lab in Marco
              Island, Florida. No venture funding. No employees. No
              board. No signup wall on this page. No affiliate
              revenue from any tool we name. The full operating
              doctrine is at{" "}
              <Link
                href="/manifesto"
                className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
              >
                /manifesto
              </Link>{" "}
              (14 clauses, falsifiable, CC-BY 4.0).
            </p>
            <p>
              Every lesson is licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener"
                className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
              >
                CC-BY 4.0
              </a>
              . Quote any answer. Translate any prompt. Adapt any
              drill. Send the link to one person you think it would
              help. The only ask is attribute the URL.
            </p>
            <p>
              If any claim turns out to be wrong, the manifesto invites
              you to challenge it with evidence. We update the
              curriculum in public, with attribution to whoever caught
              the error.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              ← back to /start (the 11-min appetizer)
            </Link>
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A] transition-all hover:border-[#FFB87A] hover:bg-[#FFB87A]/20"
            >
              /manifesto · the 14 clauses →
            </Link>
            <a
              href="mailto:a.mccree@gmail.com?subject=learn%20feedback"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              tell the lab what worked · what missed
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
