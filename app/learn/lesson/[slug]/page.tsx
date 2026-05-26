import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, getLesson, lessonsByLevel } from "../../_data/lessons";
import { getLevel } from "../../_data/levels";
import { LearnCopyPrompt } from "../../LearnCopyPrompt";

/**
 * /learn/lesson/[slug] — individual lesson page.
 *
 * Each lesson is a small artifact:
 *   - hero: level chip · title · oneLiner
 *   - concept: a few paragraphs framing the model of the world
 *   - drill: copy-paste prompt + steps · this is where it becomes real
 *   - outcome: success signals (concrete, observable)
 *   - trap: most common failure mode
 *   - next: link to the recommended next lesson
 *   - sibling lessons at same level
 *
 * JSON-LD: LearningResource (so AI search engines can quote any lesson).
 */

export async function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson not found · AtomEons" };
  const level = getLevel(lesson.level);
  return {
    title: `${lesson.title} · /learn · AtomEons`,
    description: `${lesson.oneLiner} · ${level.name} level · ~${lesson.timeMinutes} min · free, CC-BY 4.0.`,
    alternates: { canonical: `https://atomeons.com/learn/lesson/${slug}` },
    openGraph: {
      title: lesson.title,
      description: lesson.oneLiner,
      url: `https://atomeons.com/learn/lesson/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.oneLiner,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const level = getLevel(lesson.level);
  const siblings = lessonsByLevel(lesson.level).filter(
    (l) => l.slug !== lesson.slug,
  );
  const nextLesson = lesson.next ? getLesson(lesson.next) : null;

  const learningResourceJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.oneLiner,
    educationalLevel: level.name,
    timeRequired: `PT${lesson.timeMinutes}M`,
    teaches: lesson.tags,
    inLanguage: "en",
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    author: {
      "@type": "Organization",
      name: "AtomEons Systems Laboratory",
      url: "https://atomeons.com",
    },
    learningResourceType: "Lesson",
    url: `https://atomeons.com/learn/lesson/${lesson.slug}`,
    position: lesson.number,
    isPartOf: {
      "@type": "Course",
      name: "Learn AI — the AtomEons curriculum",
      url: "https://atomeons.com/learn",
    },
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
        name: `L${lesson.number} · ${lesson.title}`,
        item: `https://atomeons.com/learn/lesson/${lesson.slug}`,
      },
    ],
  };

  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(learningResourceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">
            Learn
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> L{lesson.number}
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-baseline gap-3">
            <span
              className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{
                borderColor: level.accent + "55",
                background: level.accent + "12",
                color: level.accent,
              }}
            >
              L{lesson.number} · {level.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
              ~{lesson.timeMinutes} min · free · cc-by 4.0
            </span>
          </div>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-6xl">
            {lesson.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            {lesson.oneLiner}
          </p>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: level.accent }}
          >
            ::concept · what&apos;s actually happening
          </p>
          <div className="mt-6 space-y-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            {lesson.concept.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* DRILL */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: level.accent }}
          >
            ::drill · do the thing
          </p>
          <p className="mt-4 text-base leading-[1.7] text-[#F2F4F5] md:text-lg">
            {lesson.drillIntro}
          </p>

          <div className="mt-8">
            <LearnCopyPrompt
              prompt={lesson.drillPrompt}
              label={`L${lesson.number} drill`}
              accent={level.accent}
            />
          </div>

          <div className="mt-8">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: level.accent }}
            >
              ::steps
            </p>
            <ol className="mt-4 space-y-2.5">
              {lesson.drillSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-lg border border-[#1A2225] bg-[#0E1418] p-4"
                >
                  <span
                    className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em]"
                    style={{ color: level.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-[1.65] text-[#C8CCCE] md:text-[15px]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: level.accent }}
          >
            ::outcome · what should be true
          </p>
          <ul className="mt-6 space-y-3">
            {lesson.outcome.map((o, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border p-5"
                style={{
                  borderColor: level.accent + "55",
                  background: level.accent + "0E",
                }}
              >
                <span
                  className="mt-1 shrink-0 font-mono text-base font-bold"
                  style={{ color: level.accent }}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-base leading-[1.65] text-[#F2F4F5] md:text-lg">
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TRAP */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::trap · the most common failure
          </p>
          <div className="mt-6 rounded-2xl border border-[#FFB87A]/40 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-6 md:p-7">
            <p className="text-base leading-[1.75] text-[#F2F4F5] md:text-lg">
              {lesson.trap}
            </p>
          </div>
        </div>
      </section>

      {/* NEXT */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          {nextLesson ? (
            <Link
              href={`/learn/lesson/${nextLesson.slug}`}
              className="group block rounded-2xl border border-[#22F0D5]/40 bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5] md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                ::next lesson →
              </p>
              <h3 className="mt-4 text-balance text-2xl font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">
                L{nextLesson.number} · {nextLesson.title}
              </h3>
              <p className="mt-3 text-base leading-[1.65] text-[#9BA5A7]">
                {nextLesson.oneLiner}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                ~{nextLesson.timeMinutes} min · open →
              </p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-[#FFB87A]/40 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
                ::end of the curriculum
              </p>
              <h3 className="mt-4 text-balance text-2xl font-semibold text-[#F2F4F5] md:text-3xl">
                You&apos;re at Pilot level. There&apos;s no Level 6.
              </h3>
              <p className="mt-3 text-base leading-[1.65] text-[#C8CCCE]">
                The next move is doing the work, not another lesson. If
                you want operator-grade infrastructure, that&apos;s{" "}
                <Link
                  href="/orangebox"
                  className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
                >
                  /orangebox
                </Link>
                . If you want the lab&apos;s working journal,{" "}
                <Link
                  href="/founders-view"
                  className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
                >
                  /founders-view
                </Link>
                . If you want to collaborate on the curriculum itself,
                the source is public on{" "}
                <a
                  href="https://github.com/AtomEons/atomeons-com"
                  target="_blank"
                  rel="noopener"
                  className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SIBLING LESSONS */}
      {siblings.length > 0 ? (
        <section className="border-b border-[#1A2225]">
          <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: level.accent }}
            >
              ::other lessons at {level.name} level
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/learn/lesson/${s.slug}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: level.accent }}
                    >
                      L{s.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                      ~{s.timeMinutes} min
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-lg">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-[1.55] text-[#9BA5A7]">
                    {s.oneLiner}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* TAIL CTA */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-3xl px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::part of the AtomEons /learn curriculum · {LESSONS.length}{" "}
            lessons · 5 levels · cc-by 4.0
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              ← back to /learn
            </Link>
            <Link
              href="/learn/library"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              full lesson library →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
