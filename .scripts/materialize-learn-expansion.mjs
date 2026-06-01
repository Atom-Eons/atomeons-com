// materialize-learn-expansion.mjs
// Reads the workflow output JSON · writes all /learn expansion pages.
// Run: node .scripts/materialize-learn-expansion.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const SRC = "C:\\Users\\a\\AppData\\Local\\Temp\\claude\\C--AtomEons--claude-worktrees-bold-leakey-4470e8\\36c5895e-6dd9-41db-9f77-29d3975f016f\\tasks\\woors2rig.output";

const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));
const data = raw.result;

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  console.log(`✓ ${rel} · ${content.length} chars`);
}

function escTs(s) {
  // Escape backticks and ${} for safe insertion into TS template literals
  return String(s ?? "").replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function strLit(s) {
  // Build a JSON-stringified literal (good for any string with special chars)
  return JSON.stringify(String(s ?? ""));
}

function arrLit(arr, mapper = (x) => strLit(x)) {
  return "[" + (arr ?? []).map(mapper).join(", ") + "]";
}

// ── 1. INDUSTRY TRACKS ─────────────────────────────────────────────────

function renderTrack(slug, track) {
  const accent = track.accent || "#22F0D5";
  return `import type { Metadata } from "next";
import Link from "next/link";

const TRACK = {
  title: ${strLit(track.title)},
  subtitle: ${strLit(track.subtitle)},
  intro: ${strLit(track.intro)},
  accent: ${strLit(accent)},
  personas: ${JSON.stringify(track.personas, null, 2)},
  safetyRules: ${JSON.stringify(track.safetyRules, null, 2)},
  stack: ${JSON.stringify(track.stack, null, 2)},
  doNotList: ${JSON.stringify(track.doNotList, null, 2)},
  workflows: ${JSON.stringify(track.workflows, null, 2)},
  regulations: ${JSON.stringify(track.regulations, null, 2)},
  caseStudy: ${JSON.stringify(track.caseStudy, null, 2)},
  upskill: ${strLit(track.upskill)},
} as const;

export const metadata: Metadata = {
  title: ${strLit(track.title + " · /learn · AtomEons")},
  description: ${strLit(track.subtitle + " · " + track.intro.slice(0, 250))},
  alternates: { canonical: ${strLit("https://atomeons.com/learn/" + slug)} },
  openGraph: {
    title: ${strLit(track.title + " · /learn")},
    description: ${strLit(track.subtitle)},
    url: ${strLit("https://atomeons.com/learn/" + slug)},
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: ${strLit(track.title + " · /learn")},
    description: ${strLit(track.subtitle)},
  },
  robots: { index: true, follow: true },
};

export default function TrackPage() {
  const t = TRACK;
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> {t.title}
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::industry track · {t.title.toLowerCase()}
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            {t.title}.{" "}
            <span style={{ color: t.accent }}>{t.subtitle}</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg whitespace-pre-line">
            {t.intro}
          </p>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::who lands here
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            {t.personas.length} personas. One field. One discipline.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.personas.map((p, i) => (
              <div key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                  ::{String(i + 1).padStart(2, "0")} · {p.role}
                </p>
                <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">{p.context}</p>
                <p className="mt-3 text-sm leading-[1.55] text-[#9BA5A7]">
                  <span style={{ color: t.accent }}>primary use:</span> {p.primaryUseCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY RULES */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::the safety rules · non-negotiable
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What you never do.
          </h2>
          <ul className="mt-8 space-y-3">
            {t.safetyRules.map((r, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-4">
                <span className="font-mono text-sm font-bold text-[#FFB87A]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] leading-[1.65] text-[#C8CCCE]">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STACK + DO NOT */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                ::the stack
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">Recommended tools.</h3>
              <ul className="mt-5 space-y-3">
                {t.stack.map((s, i) => (
                  <li key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                    <p className="text-sm font-semibold" style={{ color: t.accent }}>{s.tool}</p>
                    <p className="mt-2 text-sm leading-[1.6] text-[#C8CCCE]">{s.use}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::do NOT automate
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">Hands stay on these.</h3>
              <ul className="mt-5 space-y-3">
                {t.doNotList.map((d, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                    <span className="text-[#FFB87A]">○</span>
                    <span className="text-sm leading-[1.6] text-[#C8CCCE]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::the workflows · {t.workflows.length} named plays
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The plays. Each with the exact prompt.
          </h2>
          <div className="mt-10 space-y-6">
            {t.workflows.map((w, i) => (
              <article
                key={i}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7"
                style={{ borderLeft: \`4px solid \${t.accent}\` }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                    ::play {String(i + 1).padStart(2, "0")} · {w.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    {w.ai}
                  </p>
                </div>
                <h3 className="mt-3 text-lg font-medium text-[#F2F4F5] md:text-xl">{w.goal}</h3>
                <pre className="mt-4 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 font-mono text-[12px] leading-[1.55] text-[#C8CCCE] md:text-[13px]">
                  {w.prompt}
                </pre>
                <p className="mt-3 text-sm leading-[1.6]">
                  <span style={{ color: t.accent }}>::what to notice</span>
                  <span className="text-[#9BA5A7]"> · {w.notice}</span>
                </p>
                <p className="mt-2 text-sm leading-[1.6] text-[#FFB87A]">
                  ::trap · {w.trap}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATIONS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::what governs your AI use
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The regulations that matter.
          </h2>
          <div className="mt-10 space-y-4">
            {t.regulations.map((r, i) => (
              <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-sm font-bold" style={{ color: t.accent }}>{r.name}</p>
                <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{r.matters}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::case study · composite anonymized
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            One human. One year. The pattern.
          </h2>
          <div className="mt-10 space-y-6 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
            <p className="text-lg font-semibold" style={{ color: t.accent }}>{t.caseStudy.persona}</p>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::before AI</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.before}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::the shift</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.shift}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::outcome</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.outcome}</p>
            </div>
            <div className="rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">::the trap they hit</p>
              <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.caseStudy.trap}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::the fix</p>
              <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.caseStudy.fix}</p>
            </div>
            <blockquote className="border-l-4 pl-5 italic" style={{ borderColor: t.accent }}>
              <p className="text-lg leading-[1.55] text-[#F2F4F5] md:text-xl">
                &ldquo;{t.caseStudy.pullQuote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* UPSKILL + CROSS-LINKS */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::next level
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
            {t.upskill}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn/playbooks"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              the job-by-job playbooks →
            </Link>
            <Link
              href="/learn/cheatsheet"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              the AI cheatsheet →
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              ← back to /learn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
`;
}

write("app/learn/healthcare-ai/page.tsx", renderTrack("healthcare-ai", data.tracks.healthcare));
write("app/learn/legal-ai/page.tsx", renderTrack("legal-ai", data.tracks.legal));
write("app/learn/marketing-ai/page.tsx", renderTrack("marketing-ai", data.tracks.marketing));
write("app/learn/education-ai/page.tsx", renderTrack("education-ai", data.tracks.education));
write("app/learn/finance-ai/page.tsx", renderTrack("finance-ai", data.tracks.finance));

// ── 2. LESSONS APPEND ──────────────────────────────────────────────────

const newLessons = data.newLessons.lessons || [];
const existingLessonsPath = path.join(ROOT, "app/learn/_data/lessons.ts");
const existingLessons = fs.readFileSync(existingLessonsPath, "utf8");

// Find the closing `];` of LESSONS array
const insertMark = existingLessons.lastIndexOf("];");
if (insertMark < 0) {
  console.error("Could not find LESSONS array end in lessons.ts");
  process.exit(1);
}

// Build lesson objects · skip slugs that already exist
const existingSlugs = new Set();
const slugRegex = /slug:\s*"([^"]+)"/g;
let mm;
while ((mm = slugRegex.exec(existingLessons.slice(0, insertMark))) !== null) {
  existingSlugs.add(mm[1]);
}

// Find max existing global number
const numberRegex = /number:\s*(\d+)/g;
let maxNum = 0;
while ((mm = numberRegex.exec(existingLessons.slice(0, insertMark))) !== null) {
  const n = parseInt(mm[1], 10);
  if (n > maxNum) maxNum = n;
}

let nextNum = maxNum + 1;
const lessonChunks = [];
for (const l of newLessons) {
  if (existingSlugs.has(l.slug)) {
    console.log(`  skip dup slug: ${l.slug}`);
    continue;
  }
  const chunk = `  // ── L${nextNum} · ${l.level.toUpperCase()} · NEW (workflow-generated) ─────────────
  {
    slug: ${strLit(l.slug)},
    level: ${strLit(l.level)},
    number: ${nextNum},
    title: ${strLit(l.title)},
    oneLiner: ${strLit(l.oneLiner)},
    concept: ${JSON.stringify(l.concept, null, 4).split("\\n").map((line, idx) => idx === 0 ? line : "    " + line).join("\\n")},
    drillIntro: ${strLit(l.drillIntro)},
    drillPrompt: ${strLit(l.drillPrompt)},
    drillSteps: ${JSON.stringify(l.drillSteps, null, 4).split("\\n").map((line, idx) => idx === 0 ? line : "    " + line).join("\\n")},
    outcome: ${JSON.stringify(l.outcome, null, 4).split("\\n").map((line, idx) => idx === 0 ? line : "    " + line).join("\\n")},
    trap: ${strLit(l.trap)},
    timeMinutes: ${l.timeMinutes},
    next: null,
    tags: ${JSON.stringify(l.tags)},
  },`;
  lessonChunks.push(chunk);
  nextNum++;
}

const updatedLessons =
  existingLessons.slice(0, insertMark) +
  "\n" + lessonChunks.join("\n") + "\n" +
  existingLessons.slice(insertMark);

write("app/learn/_data/lessons.ts", updatedLessons);

// ── 3. QUIZ ────────────────────────────────────────────────────────────

const quiz = data.quiz;
write("app/learn/quiz/Quiz.tsx", `"use client";

import { useState, useEffect } from "react";

const QUESTIONS = ${JSON.stringify(quiz.questions, null, 2)} as const;
const LEVELS = ${JSON.stringify(quiz.levelResults, null, 2)} as const;

const STORAGE_KEY = "atomeons-learn-quiz-state";

type Answer = number | null;

export default function Quiz() {
  const [answers, setAnswers] = useState<Answer[]>(() => new Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && parsed.answers.length === QUESTIONS.length) {
          setAnswers(parsed.answers);
          setSubmitted(!!parsed.submitted);
        }
      }
    } catch {}
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, submitted }));
    } catch {}
  }, [answers, submitted, restored]);

  const totalWeight = QUESTIONS.reduce((s, q) => s + q.weight, 0);
  const score = QUESTIONS.reduce((s, q, i) => answers[i] === q.correctIndex ? s + q.weight : s, 0);
  const pct = Math.round((score / totalWeight) * 100);
  const result = LEVELS.slice().reverse().find((l) => pct >= l.minPercent) ?? LEVELS[0];
  const answered = answers.filter((a) => a !== null).length;

  function select(qi: number, oi: number) {
    if (submitted) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  }

  function submit() {
    if (answered < QUESTIONS.length) return;
    setSubmitted(true);
  }

  function reset() {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#0e2520]/40 p-7 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::your result · {pct}% · {score} / {totalWeight} weighted points
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl text-[#22F0D5]">
            {result.label}
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-lg">{result.youAre}</p>
          <p className="mt-5 text-base leading-[1.7] text-[#F2F4F5] md:text-lg">
            <span className="text-[#22F0D5]">::next move · </span>{result.nextMove}
          </p>
          <button
            onClick={reset}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
          >
            ::reset and retake
          </button>
        </div>

        <details className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
          <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]">
            ::review your answers · see the explanations
          </summary>
          <div className="mt-5 space-y-4">
            {QUESTIONS.map((q, i) => {
              const correct = answers[i] === q.correctIndex;
              return (
                <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    Q{i + 1} · weight {q.weight}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#F2F4F5]">{q.question}</p>
                  <p className={\`mt-3 text-sm \${correct ? "text-[#88CC66]" : "text-[#FFB87A]"}\`}>
                    Your answer: {answers[i] === null ? "—" : q.options[answers[i] as number]} {correct ? "✓" : "✗"}
                  </p>
                  {!correct && (
                    <p className="mt-1 text-sm text-[#22F0D5]">
                      Correct: {q.options[q.correctIndex]}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </details>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-12 z-10 -mx-6 border-b border-[#1A2225] bg-black/80 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            {answered} / {QUESTIONS.length} answered
          </p>
          <button
            onClick={submit}
            disabled={answered < QUESTIONS.length}
            className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20 disabled:opacity-40"
          >
            submit ↓
          </button>
        </div>
      </div>

      {QUESTIONS.map((q, qi) => (
        <article key={qi} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            Q{qi + 1} · weight {q.weight}
          </p>
          <h3 className="mt-3 text-lg font-medium text-[#F2F4F5]">{q.question}</h3>
          <div className="mt-5 space-y-2">
            {q.options.map((opt, oi) => {
              const picked = answers[qi] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => select(qi, oi)}
                  className={\`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors \${picked ? "border-[#22F0D5] bg-[#22F0D5]/10 text-[#F2F4F5]" : "border-[#1A2225] bg-[#0E1418] text-[#C8CCCE] hover:border-[#22F0D5]/40"}\`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] mr-2">
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
`);

write("app/learn/quiz/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "./Quiz";

export const metadata: Metadata = {
  title: "AI Literacy Quiz · /learn · AtomEons",
  description: "Calibrated AI literacy quiz · ${quiz.questions.length} questions across 5 levels. No signup. localStorage-backed. Honest result + specific next step. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/quiz" },
  openGraph: {
    title: "AI Literacy Quiz · /learn",
    description: "Where do you actually sit on the AI-literacy curve? Find out in 10 minutes.",
    url: "https://atomeons.com/learn/quiz",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI Literacy Quiz", description: "Free. No signup." },
  robots: { index: true, follow: true },
};

export default function QuizPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Quiz
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI literacy quiz · 5 levels · ${quiz.questions.length} questions
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Where do you{" "}
            <span className="text-[#22F0D5]">actually sit?</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Honest calibration · no trick questions · explanations teach.
            Your answers save locally · no signup · no email · no tracker.
            Reset and retake anytime.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
          <Quiz />
        </div>
      </section>
      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
            ← back to /learn
          </Link>
        </div>
      </section>
    </main>
  );
}
`);

// ── 4. PROMPTS (daily) ─────────────────────────────────────────────────

const prompts = data.prompts.prompts || [];
write("app/learn/prompts/DailyPrompt.tsx", `"use client";

import { useEffect, useState } from "react";

const PROMPTS = ${JSON.stringify(prompts, null, 2)} as const;

function todayIndex() {
  const epoch = new Date("2026-05-31T00:00:00Z").getTime();
  const now = Date.now();
  const days = Math.floor((now - epoch) / 86400000);
  return ((days % PROMPTS.length) + PROMPTS.length) % PROMPTS.length;
}

export default function DailyPrompt() {
  const [idx, setIdx] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIdx(todayIndex());
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[400px] rounded-2xl border border-[#1A2225] bg-[#0A0F11]" aria-hidden />;
  }

  const p = PROMPTS[idx];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#0A0F11] p-7 md:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::today · {p.category} · ~{p.timeMinutes} min · {p.ai}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            day {p.dayIndex + 1} / {PROMPTS.length}
          </p>
        </div>
        <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
          {p.title}
        </h2>
        <pre className="mt-6 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-5 font-mono text-[13px] leading-[1.6] text-[#C8CCCE]">
          {p.prompt}
        </pre>
        <p className="mt-5 text-sm leading-[1.65] text-[#FFB87A]">
          ::trap · {p.trap}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setIdx((idx + PROMPTS.length - 1) % PROMPTS.length)}
            className="rounded-full border border-[#1A2225] bg-[#0E1418] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
          >
            ← previous
          </button>
          <button
            onClick={() => setIdx(todayIndex())}
            className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
          >
            today
          </button>
          <button
            onClick={() => setIdx((idx + 1) % PROMPTS.length)}
            className="rounded-full border border-[#1A2225] bg-[#0E1418] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
          >
            next →
          </button>
        </div>
      </div>

      <details className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]">
          ::browse all {PROMPTS.length} daily prompts
        </summary>
        <div className="mt-5 grid gap-2 md:grid-cols-2">
          {PROMPTS.map((pp, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={\`text-left rounded-lg border px-3 py-2.5 text-sm transition-colors \${i === idx ? "border-[#22F0D5] bg-[#22F0D5]/10 text-[#F2F4F5]" : "border-[#1A2225] bg-[#0E1418] text-[#C8CCCE] hover:border-[#22F0D5]/40"}\`}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779]">day {pp.dayIndex + 1} · {pp.category}</span>
              <p className="mt-1 font-medium">{pp.title}</p>
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
`);

write("app/learn/prompts/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import DailyPrompt from "./DailyPrompt";

export const metadata: Metadata = {
  title: "AI prompt of the day · /learn · AtomEons",
  description: "${prompts.length} daily-rotating AI prompts. One per day. Calibrated, copy-paste ready, every category. Free. No signup. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/prompts" },
  openGraph: {
    title: "AI prompt of the day · /learn",
    description: "${prompts.length} prompts · one per day · copy-paste ready · CC-BY 4.0",
    url: "https://atomeons.com/learn/prompts",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI prompt of the day", description: "${prompts.length} prompts · daily rotation · free" },
  robots: { index: true, follow: true },
};

export default function PromptsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Daily prompt
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::daily prompt · ${prompts.length} on rotation · auto-pick by date
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            One prompt.{" "}
            <span className="text-[#22F0D5]">Every day.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            ${prompts.length} hand-curated copy-paste prompts. The page
            picks today&apos;s based on the date. Browse the full set
            below the daily card. Use this as a 5-minute AI habit anchor.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
          <DailyPrompt />
        </div>
      </section>
      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
            ← back to /learn
          </Link>
        </div>
      </section>
    </main>
  );
}
`);

// ── 5. RESOURCES (podcasts/channels) ───────────────────────────────────

const resources = data.resources.resources || [];
write("app/learn/resources/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";

const RESOURCES = ${JSON.stringify(resources, null, 2)} as const;

export const metadata: Metadata = {
  title: "AI learning resources · podcasts, channels, newsletters · /learn · AtomEons",
  description: "${resources.length} vetted AI-learning resources. Real podcasts, YouTube channels, newsletters, blogs, courses. Curated by level + category. No affiliate revenue. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/resources" },
  openGraph: {
    title: "AI learning resources · /learn",
    description: "${resources.length} vetted resources. No affiliates. CC-BY 4.0.",
    url: "https://atomeons.com/learn/resources",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI learning resources", description: "${resources.length} vetted. CC-BY 4.0." },
  robots: { index: true, follow: true },
};

export default function ResourcesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Resources
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI resources · ${resources.length} vetted · podcasts · channels · newsletters · blogs · courses
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Where else to{" "}
            <span className="text-[#22F0D5]">learn AI honestly.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            ${resources.length} real shows / channels / newsletters / blogs / courses we genuinely
            recommend. Zero affiliate revenue. We name each because it&apos;s worth your time,
            not because anyone paid us. Calibrated by level + topic.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24 space-y-4">
          {RESOURCES.map((r, i) => (
            <article key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-[#F2F4F5] md:text-2xl">{r.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#22F0D5]/30 bg-[#22F0D5]/05 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{r.type}</span>
                  <span className="rounded-full border border-[#FFB87A]/30 bg-[#FFB87A]/05 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">{r.level}</span>
                  <span className="rounded-full border border-[#1A2225] bg-[#0E1418] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{r.category}</span>
                </div>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B7779]">::host · {r.host}</p>
              <p className="mt-4 text-base leading-[1.65] text-[#C8CCCE]">{r.why}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]"
              >
                visit ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
            ← back to /learn
          </Link>
        </div>
      </section>
    </main>
  );
}
`);

// ── 6. FAQ ─────────────────────────────────────────────────────────────

const faqItems = data.faq.items || [];
const faqByCategory = {};
for (const f of faqItems) {
  if (!faqByCategory[f.category]) faqByCategory[f.category] = [];
  faqByCategory[f.category].push(f);
}
const categories = Object.keys(faqByCategory);

write("app/learn/faq/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";

const FAQ = ${JSON.stringify(faqItems, null, 2)} as const;
const CATEGORIES = ${JSON.stringify(categories, null, 2)} as const;

export const metadata: Metadata = {
  title: "AI FAQ · ${faqItems.length} honest answers · /learn · AtomEons",
  description: "${faqItems.length} real questions humans ask about AI. Honest answers. No corporate hedging. ${categories.length} categories. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/faq" },
  openGraph: {
    title: "AI FAQ · ${faqItems.length} honest answers",
    description: "${faqItems.length} real questions · honest answers. CC-BY 4.0.",
    url: "https://atomeons.com/learn/faq",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI FAQ · honest answers", description: "${faqItems.length} questions · free · CC-BY 4.0" },
  robots: { index: true, follow: true },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FAQPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> FAQ
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI FAQ · ${faqItems.length} honest answers · ${categories.length} categories
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            The questions{" "}
            <span className="text-[#22F0D5]">humans actually ask.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            No corporate hedging. No marketing-speak. ${faqItems.length} real
            questions with the real answers. If a question isn&apos;t here,
            email the lab and we&apos;ll add it.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24 space-y-12">
          {CATEGORIES.map((cat) => {
            const items = FAQ.filter((f) => f.category === cat);
            return (
              <div key={cat}>
                <h2 className="text-3xl font-semibold tracking-tight text-[#22F0D5] md:text-4xl">
                  {cat}
                </h2>
                <div className="mt-6 space-y-3">
                  {items.map((f, i) => (
                    <details key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] px-6 py-4">
                      <summary className="cursor-pointer text-base font-medium leading-snug text-[#F2F4F5] md:text-lg">
                        {f.question}
                      </summary>
                      <p className="mt-3 text-[15px] leading-[1.7] text-[#C8CCCE]">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::your question not here</p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Email the lab. We&apos;ll add it.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:a.mccree@gmail.com?subject=AI%20FAQ%20question" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">email the lab →</a>
            <Link href="/learn" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">← back to /learn</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
`);

// ── 7. TEMPLATES ───────────────────────────────────────────────────────

const templates = data.templates.templates || [];
write("app/learn/templates/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";

const TEMPLATES = ${JSON.stringify(templates, null, 2)} as const;

export const metadata: Metadata = {
  title: "AI project templates · ${templates.length} end-to-end workflows · /learn · AtomEons",
  description: "${templates.length} AI project templates · novella, SaaS landing, interview prep, wedding speech, business plan, research paper, sales pitch, family reunion. End-to-end workflows with copy-paste prompts at every step. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/templates" },
  openGraph: {
    title: "AI project templates · /learn",
    description: "${templates.length} end-to-end AI workflows. Free. CC-BY 4.0.",
    url: "https://atomeons.com/learn/templates",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI project templates", description: "${templates.length} end-to-end. Free." },
  robots: { index: true, follow: true },
};

export default function TemplatesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Templates
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI project templates · ${templates.length} end-to-end workflows
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Pick a project.{" "}
            <span className="text-[#22F0D5]">Ship it this week.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            ${templates.length} complete end-to-end AI workflows. Each
            template is a sequence of copy-paste prompts that ship
            the project. Time-bound. Honest about what AI can and
            can&apos;t do at each step.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {TEMPLATES.map((t) => (
              <a key={t.slug} href={\`#\${t.slug}\`} className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                {t.title.length > 40 ? t.title.slice(0, 40) + "…" : t.title}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28 space-y-16">
          {TEMPLATES.map((t) => (
            <article key={t.slug} id={t.slug} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10 scroll-mt-20" style={{ borderLeft: "4px solid #22F0D5" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::template · {t.estimatedTime}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h2>
              <p className="mt-3 text-base text-[#9BA5A7]">For: {t.audience}</p>
              <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#F2F4F5] md:text-lg">Goal: {t.goal}</p>
              <div className="mt-6 rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::stack</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.stack.map((s, i) => (
                    <li key={i} className="rounded-full border border-[#22F0D5]/30 bg-[#22F0D5]/05 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{s}</li>
                  ))}
                </ul>
              </div>
              <h3 className="mt-8 text-xl font-medium md:text-2xl">Steps</h3>
              <div className="mt-4 space-y-4">
                {t.steps.map((s, i) => (
                  <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::step {String(i + 1).padStart(2, "0")} · {s.step}</p>
                    <p className="mt-2 text-base font-medium text-[#F2F4F5]">{s.what}</p>
                    <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 font-mono text-[12px] leading-[1.55] text-[#C8CCCE]">{s.prompt}</pre>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#22F0D5]/30 bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::outcome</p>
                  <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.outcome}</p>
                </div>
                <div className="rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">::trap</p>
                  <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.trap}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
`);

// ── 8. CHEATSHEET TRANSLATIONS · dynamic [lang] route ──────────────────

const translations = data.translations.translations || [];
write("app/learn/cheatsheet/[lang]/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const TRANSLATIONS = ${JSON.stringify(translations, null, 2)} as const;

type TParam = { lang: string };

export async function generateStaticParams() {
  return TRANSLATIONS.map((t) => ({ lang: t.langCode }));
}

export async function generateMetadata({ params }: { params: Promise<TParam> }): Promise<Metadata> {
  const { lang } = await params;
  const t = TRANSLATIONS.find((x) => x.langCode === lang);
  if (!t) return { title: "Cheatsheet · AtomEons" };
  return {
    title: \`\${t.heroTitle} · /learn · AtomEons\`,
    description: \`\${t.verifyRuleBody.slice(0, 200)}\`,
    alternates: { canonical: \`https://atomeons.com/learn/cheatsheet/\${t.langCode}\` },
  };
}

export default async function CheatsheetLangPage({ params }: { params: Promise<TParam> }) {
  const { lang } = await params;
  const t = TRANSLATIONS.find((x) => x.langCode === lang);
  if (!t) notFound();
  const isRTL = t.langCode === "ar";
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cheatsheet" className="hover:text-[#22F0D5]">Cheatsheet</Link>{" "}
          <span className="text-[#1A2225]">/</span> {t.langName}
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::AtomEons · {t.langName} · CC-BY 4.0</p>
          <h1 className="mt-6 text-balance text-3xl font-medium tracking-tight md:text-4xl">{t.heroTitle}</h1>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-3xl px-6 py-12 space-y-6">
          <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/40 p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">{t.verifyRuleTitle}</p>
            <p className="mt-3 text-[15px] leading-[1.65] text-[#C8CCCE] md:text-base">{t.verifyRuleBody}</p>
          </div>
          <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/40 p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">{t.neverPasteTitle}</p>
            <ul className="mt-4 space-y-2 text-[14px] leading-[1.6]">
              {t.neverPasteItems.map((item, i) => (
                <li key={i} className="text-[#C8CCCE]">○ {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#0E1418] p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">{t.promptStructureTitle}</p>
            <ol className="mt-4 space-y-2 text-[14px] leading-[1.6]">
              {t.promptStructureItems.map((item, i) => (
                <li key={i} className="text-[#C8CCCE]"><strong className="text-[#22F0D5]">{i + 1}.</strong> {item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">::other languages</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {TRANSLATIONS.map((tt) => (
              <Link
                key={tt.langCode}
                href={\`/learn/cheatsheet/\${tt.langCode}\`}
                className={\`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] \${tt.langCode === t.langCode ? "border-[#22F0D5] bg-[#22F0D5]/10 text-[#22F0D5]" : "border-[#1A2225] bg-[#0A0F11] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"}\`}
              >
                {tt.langName}
              </Link>
            ))}
            <Link href="/learn/cheatsheet" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              English
            </Link>
          </div>
          <div className="mt-8">
            <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
`);

console.log("\\n✓ materialization complete");
console.log(`  · 5 industry tracks`);
console.log(`  · ${newLessons.length} new lessons appended`);
console.log(`  · /learn/quiz + Quiz.tsx (${quiz.questions.length} questions)`);
console.log(`  · /learn/prompts + DailyPrompt.tsx (${prompts.length} prompts)`);
console.log(`  · /learn/resources (${resources.length} entries)`);
console.log(`  · /learn/faq (${faqItems.length} items across ${categories.length} categories)`);
console.log(`  · /learn/templates (${templates.length} templates)`);
console.log(`  · /learn/cheatsheet/[lang] (${translations.length} languages: ${translations.map(t => t.langCode).join(", ")})`);
