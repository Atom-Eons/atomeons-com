import type { Metadata } from "next";
import Link from "next/link";
import {
  TASKS,
  tasksByCategory,
  CATEGORY_META,
  AI_LAUNCH_URL,
  type TaskCategory,
} from "../_data/tasks";
import { LearnCopyPrompt } from "../learn/LearnCopyPrompt";
import { LabHero } from "../_components/v2/LabHero";
import { LabSection } from "../_components/v2/LabSection";
import { ScrollProgress } from "../_components/v2/ScrollProgress";

/**
 * /tools — JOB-driven task router.
 *
 * Different angle from /prompt-kit (which groups by curriculum level).
 * /tools asks the user "what do you need to do RIGHT NOW?" and gives
 * them the exact prompt for that job, the recommended AI to use, the
 * routing reasoning, and a one-click launch to the AI.
 *
 * Categories: writing · decoding · planning · deciding · learning
 *
 * Each task card:
 *   - Title (the JOB as a verb phrase)
 *   - One-line description (when to use)
 *   - <details>-collapsed prompt + AI launch chips
 *   - Optional cross-link to the /learn lesson teaching the pattern
 *
 * CC-BY 4.0. Every prompt is quotable, adaptable, no signup.
 */

const TOTAL_TASKS = TASKS.length;

export const metadata: Metadata = {
  title: `Tools · ${TOTAL_TASKS} AI tasks · what do you need to do right now? · AtomEons`,
  description: `Job-driven AI prompt library. ${TOTAL_TASKS} concrete tasks — reply to a tough email, decode a medical report, plan a trip, stress-test a decision, quiz me on a subject — each with the exact copy-paste prompt and the recommended AI (Claude / ChatGPT / Gemini / Perplexity) with one-sentence routing reasoning. No signup. CC-BY 4.0.`,
  keywords: [
    "AI tools",
    "AI tasks",
    "AI prompts for specific jobs",
    "what AI for what task",
    "Claude vs ChatGPT vs Gemini",
    "reply to email AI",
    "decode medical report AI",
    "plan trip AI",
    "AI tutor",
    "AI quiz me",
    "copy paste AI prompts",
    "AI for specific job",
  ],
  alternates: { canonical: "https://atomeons.com/tools" },
  openGraph: {
    title: `Tools · ${TOTAL_TASKS} AI tasks · AtomEons`,
    description: `Job-driven AI prompt library. Pick the task. Get the prompt. Launch the AI. ${TOTAL_TASKS} tasks · CC-BY 4.0 · no signup.`,
    url: "https://atomeons.com/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Tools",
    description: `${TOTAL_TASKS} AI tasks · the exact prompt + the right AI for each · no signup · CC-BY 4.0`,
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
      name: "Tools",
      item: "https://atomeons.com/tools",
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AtomEons /tools — job-driven AI task library",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: TASKS.length,
  itemListElement: TASKS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    description: t.oneLiner,
    url: `https://atomeons.com/tools#${t.id}`,
  })),
};

const CATEGORY_ORDER: TaskCategory[] = [
  "writing",
  "decoding",
  "planning",
  "deciding",
  "learning",
];

export default function ToolsPage() {
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
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Tools
        </p>
      </div>

      <LabHero
        eyebrow={`::tools · ${TOTAL_TASKS} ai tasks · pick the job · get the prompt · launch the ai · cc-by 4.0`}
        title="What do you need"
        titleAccent="to do right now?"
        subtitle={
          <p>
            {TOTAL_TASKS} concrete tasks. Each one carries the exact
            copy-paste prompt, the recommended AI for the job (Claude,
            ChatGPT, Gemini, or Perplexity) with one-sentence routing
            reasoning, and a one-click launch. Click the task that
            matches what you came here to do.
          </p>
        }
        primaryCta={{ label: "browse all tasks ↓", href: "#tasks" }}
        secondaryCta={{ label: "or the curriculum · /learn →", href: "/learn" }}
        tone="cyan"
      >
        {/* category jump chips */}
        <div className="flex flex-wrap gap-3">
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const count = tasksByCategory(cat).length;
            return (
              <a
                key={cat}
                href={`#category-${cat}`}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all"
                style={{
                  borderColor: meta.accent + "40",
                  background: meta.accent + "08",
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: meta.accent }}
                />
                <span
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: meta.accent }}
                >
                  {meta.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                  · {count}
                </span>
              </a>
            );
          })}
        </div>
      </LabHero>

      <div id="tasks" />

      {CATEGORY_ORDER.map((cat, ci) => {
        const tasks = tasksByCategory(cat);
        if (tasks.length === 0) return null;
        const meta = CATEGORY_META[cat];
        return (
          <LabSection
            key={cat}
            id={`category-${cat}`}
            eyebrow={`::${meta.label.toLowerCase()} · ${tasks.length} task${tasks.length === 1 ? "" : "s"}`}
            title={meta.label}
            subtitle={<p>{meta.oneLiner}</p>}
            variant={ci % 2 === 0 ? "default" : "tint"}
            maxWidth="5xl"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {tasks.map((task) => {
                const ai = AI_LAUNCH_URL[task.recommendedAI];
                return (
                  <article
                    key={task.id}
                    id={task.id}
                    className="scroll-mt-24 rounded-3xl bg-gradient-to-br from-[#0A0F11] to-[#0E1418] p-7 md:p-8 transition-all hover:shadow-[0_0_60px_rgba(34,240,213,0.08)]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl font-semibold tracking-tight text-[#F2F4F5] md:text-2xl">
                        {task.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                        ~{task.timeMinutes} min
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7] md:text-[15px]">
                      {task.oneLiner}
                    </p>

                    <details className="group mt-5 rounded-2xl border border-[#1A2225] bg-[#0A0F11] open:border-[#22F0D5]/40">
                      <summary
                        className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-medium text-[#F2F4F5] hover:text-[#22F0D5]"
                        style={{ borderRadius: "1rem" }}
                      >
                        <span>show prompt + launch the AI →</span>
                        <span
                          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-transform group-open:rotate-180"
                          aria-hidden
                        >
                          ▼
                        </span>
                      </summary>
                      <div className="border-t border-[#1A2225] p-4 md:p-5">
                        {/* recommended AI */}
                        <div className="rounded-xl border border-[#22F0D5]/30 bg-[#22F0D5]/05 p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                            ::recommended AI for this task
                          </p>
                          <div className="mt-2 flex flex-wrap items-baseline gap-3">
                            <p className="text-xl font-semibold text-[#F2F4F5]">
                              {ai.label}
                            </p>
                            <a
                              href={ai.url}
                              target="_blank"
                              rel="noopener"
                              className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:text-[#7DDBC8]"
                            >
                              open {ai.label.toLowerCase()} →
                            </a>
                          </div>
                          <p className="mt-2 text-sm leading-[1.55] text-[#C8CCCE]">
                            {task.whyThisAI}
                          </p>
                        </div>

                        {/* prompt */}
                        <div className="mt-4">
                          <LearnCopyPrompt
                            prompt={task.prompt}
                            label={task.id}
                            accent={meta.accent}
                          />
                        </div>

                        {/* lesson cross-link */}
                        {task.lessonSlug && (
                          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                            ::the underlying pattern is taught in{" "}
                            <Link
                              href={`/learn/lesson/${task.lessonSlug}`}
                              className="text-[#22F0D5] hover:text-[#7DDBC8]"
                            >
                              the /learn lesson on this →
                            </Link>
                          </p>
                        )}
                      </div>
                    </details>
                  </article>
                );
              })}
            </div>
          </LabSection>
        );
      })}

      <LabSection
        variant="raised"
        eyebrow="::missing a task you do often?"
        title="Don't see your job?"
        subtitle={
          <p>
            Send the task and we&apos;ll add a prompt + tool
            recommendation. One human, ~2-hour reply in ET waking
            hours. The tool library grows from real jobs people do.
          </p>
        }
        align="center"
        maxWidth="4xl"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:a.mccree@gmail.com?subject=Add%20a%20task%20to%20%2Ftools&body=The%20task%20I%20do%20often%20but%20don't%20see%20on%20%2Ftools%3A%20%5Btask%5D%0A%0AWhy%20it%20matters%3A%20%5Bcontext%5D"
            className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_60px_rgba(34,240,213,0.30)] transition-all hover:bg-[#7DDBC8]"
          >
            send the task →
          </a>
          <Link
            href="/prompt-kit"
            className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/30 bg-transparent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/10"
          >
            curriculum drill prompts · /prompt-kit →
          </Link>
        </div>
      </LabSection>
    </main>
  );
}
