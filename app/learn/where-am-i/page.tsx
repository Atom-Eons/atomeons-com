import type { Metadata } from "next";
import Link from "next/link";
import { LEVELS, getLevel, type LevelId } from "../_data/levels";
import { LESSONS, getLesson } from "../_data/lessons";

/**
 * /learn/where-am-i — the level diagnostic.
 *
 * Seven yes-or-no-ish multiple-choice questions. Each answer carries a
 * point value. Sum scores into a level (Novice → Pilot). Server reads
 * the answers from the URL query params (?q1=A&q2=B&…), computes the
 * level, and recommends three concrete starting lessons.
 *
 * No JS. No signup. No tracking. No marketing pixel. Just a form that
 * submits via GET, which means the URL itself is the answer state —
 * shareable, bookmarkable, history-friendly.
 *
 * Mobile-first. Accessible. Works without JavaScript enabled.
 */

export const metadata: Metadata = {
  title: "Where am I? · level diagnostic · /learn · AtomEons",
  description:
    "Seven quick questions. Map yourself to a level (Novice → Learner → User → Operator → Pilot). Three lesson recommendations to start with. No signup. No tracking.",
  alternates: { canonical: "https://atomeons.com/learn/where-am-i" },
  openGraph: {
    title: "Where am I in the AI curriculum? — 7-question level diagnostic",
    description:
      "Five levels. Seven questions. Three recommended starting lessons. Free. No signup.",
    url: "https://atomeons.com/learn/where-am-i",
    type: "website",
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
      name: "Learn",
      item: "https://atomeons.com/learn",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Where am I",
      item: "https://atomeons.com/learn/where-am-i",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// QUESTIONS
// ─────────────────────────────────────────────────────────────────────

type AnswerLetter = "A" | "B" | "C" | "D";

type Question = {
  id: string; // q1, q2, …
  prompt: string;
  options: { letter: AnswerLetter; label: string; points: number }[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "How many times have you typed into Claude, ChatGPT, or Gemini?",
    options: [
      { letter: "A", label: "Zero. I have not started.", points: 0 },
      { letter: "B", label: "1–5 times. Just curious so far.", points: 1 },
      { letter: "C", label: "6–30. Tried it for a few real tasks.", points: 3 },
      { letter: "D", label: "31 or more. It is in my week.", points: 5 },
    ],
  },
  {
    id: "q2",
    prompt: "Have you used AI for a work task that someone (a boss, a customer, a client) actually saw or paid for?",
    options: [
      { letter: "A", label: "Not yet.", points: 0 },
      { letter: "B", label: "I tried it once for a real task.", points: 1 },
      { letter: "C", label: "Yes — occasionally, when it fits.", points: 3 },
      { letter: "D", label: "Yes — daily or several times a week.", points: 5 },
    ],
  },
  {
    id: "q3",
    prompt: "Have you ever caught an AI confidently making something up — a fake citation, a wrong fact, a hallucinated stat?",
    options: [
      { letter: "A", label: "I would not know how to tell.", points: 0 },
      { letter: "B", label: "Not yet — but I trust what it says.", points: 1 },
      { letter: "C", label: "Yes, once. I now check important answers.", points: 3 },
      { letter: "D", label: "Yes, multiple times. I have a verify rule.", points: 5 },
    ],
  },
  {
    id: "q4",
    prompt: "Do you have a prompt you reuse?",
    options: [
      { letter: "A", label: "What is a prompt?", points: 0 },
      { letter: "B", label: "No — I type fresh every time.", points: 1 },
      { letter: "C", label: "One, maybe two, that I copy back.", points: 3 },
      { letter: "D", label: "Several saved in Notes / Projects / Custom GPTs.", points: 5 },
    ],
  },
  {
    id: "q5",
    prompt: "Have you paid for an AI subscription (Claude Pro, ChatGPT Plus, Gemini Advanced, etc.)?",
    options: [
      { letter: "A", label: "Never plan to.", points: 1 },
      { letter: "B", label: "Not yet — using free tiers.", points: 2 },
      { letter: "C", label: "One subscription, for the AI I use most.", points: 3 },
      { letter: "D", label: "Multiple — I route between them.", points: 4 },
    ],
  },
  {
    id: "q6",
    prompt: "Are you running multiple projects through AI right now?",
    options: [
      { letter: "A", label: "No, just chat.", points: 0 },
      { letter: "B", label: "One project I keep going back to.", points: 2 },
      { letter: "C", label: "Multiple — scattered across chats.", points: 4 },
      { letter: "D", label: "Multiple — organized cockpit / system.", points: 6 },
    ],
  },
  {
    id: "q7",
    prompt: "Do you know what MCP (Model Context Protocol) is?",
    options: [
      { letter: "A", label: "Never heard of it.", points: 0 },
      { letter: "B", label: "I have seen the term.", points: 1 },
      { letter: "C", label: "I have used an MCP server.", points: 3 },
      { letter: "D", label: "I have built or connected one.", points: 5 },
    ],
  },
];

// Max possible: 5+5+5+5+4+6+5 = 35
// Min possible: 0+0+0+0+1+0+0 = 1
// Bands:
//   Novice    1–6     (about 0–17% of max)
//   Learner   7–14    (18–40%)
//   User     15–22    (41–62%)
//   Operator 23–29    (63–82%)
//   Pilot    30–35    (83–100%)

function scoreToLevel(score: number): LevelId {
  if (score <= 6) return "novice";
  if (score <= 14) return "learner";
  if (score <= 22) return "user";
  if (score <= 29) return "operator";
  return "pilot";
}

// Three recommended starting lessons per level — pick the lessons that
// most concretely fit a human entering at this level.
const STARTING_LESSONS: Record<LevelId, string[]> = {
  novice: ["what-ai-actually-does", "your-first-real-prompt", "when-ai-gets-it-wrong"],
  learner: ["refine-not-restart", "the-verify-rule", "your-saved-prompt-library"],
  user: ["multi-turn-conversations", "documents-in-chat", "first-paid-tier"],
  operator: ["local-ai-ollama", "model-routing", "mcp-servers-plug-socket"],
  pilot: ["outgrow-the-chatbox", "agent-mode-when-ai-takes-action", "receipts-and-paper-trail"],
};

// Per-level encouragement copy — short, calibrated, warm.
const RESULT_COPY: Record<LevelId, { headline: string; body: string }> = {
  novice: {
    headline: "You are a Novice. Day zero, or close to it.",
    body: "This is the luckiest place to start. You have not built bad habits yet. The first three lessons below will turn AI from a vague news item into a tool you have actually used. Twenty-five minutes of total time.",
  },
  learner: {
    headline: "You are a Learner. You have used AI — now you build the habit.",
    body: "You have the shape. Now you build the muscle. The next three lessons turn one-off prompts into a working library and a calibrated trust posture. Most humans never make it past this level — the ones who do, do it by doing reps, not by reading more.",
  },
  user: {
    headline: "You are a User. AI is in your week.",
    body: "You operate AI for real tasks. The next three lessons teach you to compound — multi-turn discovery, document-based work, and a deliberate decision about which paid tier (if any) actually fits your work. This is where you stop being curious and start being effective.",
  },
  operator: {
    headline: "You are an Operator. You run real work through AI daily.",
    body: "You are past the chat box as a hobby and into AI as infrastructure. The next three lessons build the operator toolkit — local-only models, multi-model routing, and the MCP layer that connects AI to your actual tools. After these, you are at the doorstep of Pilot.",
  },
  pilot: {
    headline: "You are a Pilot. The chat box is a tool inside your system, not the system.",
    body: "You operate multiple projects through AI from a cockpit. There is no Level 6. The remaining lessons are about the system around the AI — outgrowing chat, running agentic flows safely, and keeping receipts on what AI did for you. The next move is the work, not the lesson.",
  },
};

// ─────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────

export default async function WhereAmIPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const answers: Record<string, AnswerLetter | null> = {};
  let answered = 0;
  for (const q of QUESTIONS) {
    const raw = params[q.id];
    const letter = (Array.isArray(raw) ? raw[0] : raw)?.toUpperCase();
    if (letter === "A" || letter === "B" || letter === "C" || letter === "D") {
      answers[q.id] = letter;
      answered++;
    } else {
      answers[q.id] = null;
    }
  }

  const showResult = answered === QUESTIONS.length;

  let level: LevelId | null = null;
  let score = 0;
  if (showResult) {
    for (const q of QUESTIONS) {
      const letter = answers[q.id];
      const opt = q.options.find((o) => o.letter === letter);
      if (opt) score += opt.points;
    }
    level = scoreToLevel(score);
  }

  return (
    <main className="relative z-10 text-[#F2F4F5]">
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
          <span className="text-[#1A2225]">/</span> Where am I
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::level diagnostic · 7 questions · ~2 minutes · no signup
          </p>
          <h1 className="mt-5 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-6xl">
            Where am I in the curriculum?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Seven yes-or-no-ish questions. We map your answers to a
            level (Novice → Pilot) and recommend three lessons to
            start with. Nothing is stored. The URL is the answer
            state — bookmark it if you want.
          </p>
        </div>
      </section>

      {showResult && level ? (
        <ResultPanel level={level} score={score} answers={answers} />
      ) : (
        <QuestionForm answers={answers} answered={answered} />
      )}

      {/* FOOTER LINKS */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::no tracking · no signup · the URL is the state
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              ← back to /learn
            </Link>
            <Link
              href="/learn/library"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              full library →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// QUESTION FORM (when not all answered)
// ─────────────────────────────────────────────────────────────────────

function QuestionForm({
  answers,
  answered,
}: {
  answers: Record<string, AnswerLetter | null>;
  answered: number;
}) {
  return (
    <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
        {answered > 0 && (
          <div className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
              ::progress · {answered} of {QUESTIONS.length} answered
            </p>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#1A2225]">
              <div
                className="h-full bg-[#22F0D5]"
                style={{ width: `${(answered / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <form method="GET" action="/learn/where-am-i" className="space-y-10">
          {QUESTIONS.map((q, qi) => {
            const current = answers[q.id];
            return (
              <fieldset
                key={q.id}
                className={`rounded-2xl border bg-[#0A0F11] p-6 md:p-7 ${
                  current ? "border-[#22F0D5]/40" : "border-[#1A2225]"
                }`}
              >
                <legend className="px-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                    ::Q{qi + 1} of {QUESTIONS.length}
                  </p>
                </legend>
                <p className="mt-2 text-lg font-medium leading-[1.4] text-[#F2F4F5] md:text-xl">
                  {q.prompt}
                </p>
                <div className="mt-5 space-y-2.5">
                  {q.options.map((opt) => {
                    const id = `${q.id}-${opt.letter}`;
                    const selected = current === opt.letter;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                          selected
                            ? "border-[#22F0D5] bg-[#22F0D5]/15"
                            : "border-[#1A2225] bg-[#0E1418] hover:border-[#22F0D5]/40"
                        }`}
                      >
                        <input
                          type="radio"
                          id={id}
                          name={q.id}
                          value={opt.letter}
                          defaultChecked={selected}
                          className="mt-1 size-4 accent-[#22F0D5]"
                          required
                        />
                        <span className="flex-1">
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
                              selected ? "text-[#22F0D5]" : "text-[#6B7779]"
                            }`}
                          >
                            {opt.letter}
                          </span>
                          <span
                            className={`mt-1 block text-base leading-[1.5] ${
                              selected ? "text-[#F2F4F5]" : "text-[#C8CCCE]"
                            }`}
                          >
                            {opt.label}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_60px_rgba(34,240,213,0.35)] transition-all hover:bg-[#7DDBC8]"
            >
              get my level →
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              answers go in the url · nothing is stored
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RESULT PANEL (when all answered)
// ─────────────────────────────────────────────────────────────────────

function ResultPanel({
  level,
  score,
  answers,
}: {
  level: LevelId;
  score: number;
  answers: Record<string, AnswerLetter | null>;
}) {
  const lvl = getLevel(level);
  const startingSlugs = STARTING_LESSONS[level];
  const startingLessons = startingSlugs
    .map((s) => getLesson(s))
    .filter((l): l is NonNullable<ReturnType<typeof getLesson>> => Boolean(l));
  const copy = RESULT_COPY[level];

  const retakeParams = new URLSearchParams();
  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (a) retakeParams.set(q.id, a);
  }

  return (
    <>
      {/* LEVEL VERDICT */}
      <section
        className="border-b border-[#1A2225]"
        style={{ borderTop: `4px solid ${lvl.accent}` }}
      >
        <div className="mx-auto w-full max-w-3xl px-6 py-20 md:py-24">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: lvl.accent }}
          >
            ::your level · score {score} of 35
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            {copy.headline}
          </h2>
          <p className="mt-6 text-lg leading-[1.65] text-[#C8CCCE] md:text-xl">
            {copy.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {LEVELS.map((L) => {
              const isYou = L.id === level;
              return (
                <span
                  key={L.id}
                  className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{
                    borderColor: isYou ? L.accent : "#1A2225",
                    background: isYou ? L.accent + "15" : "#0A0F11",
                    color: isYou ? L.accent : "#6B7779",
                  }}
                >
                  {isYou ? "● " : "  "}L{L.number} {L.name}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECOMMENDED LESSONS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
        <div className="mx-auto w-full max-w-3xl px-6 py-20 md:py-24">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: lvl.accent }}
          >
            ::start with these three
          </p>
          <h3 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            The right three lessons for where you are.
          </h3>
          <p className="mt-5 text-base leading-[1.65] text-[#9BA5A7] md:text-lg">
            One at a time. Twenty-ish minutes each. Do not skip the
            drill — the drill is the lesson.
          </p>

          <ol className="mt-10 space-y-4">
            {startingLessons.map((l, i) => (
              <li key={l.slug}>
                <Link
                  href={`/learn/lesson/${l.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40 md:p-7"
                  style={{ borderLeftWidth: "3px", borderLeftColor: lvl.accent }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: lvl.accent }}
                    >
                      Step {i + 1} · L{l.number} · {l.level}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                      ~{l.timeMinutes} min
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-2xl">
                    {l.title}
                  </h4>
                  <p className="text-sm leading-[1.6] text-[#9BA5A7] md:text-base">
                    {l.oneLiner}
                  </p>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href={`/learn/lesson/${startingSlugs[0]}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_60px_rgba(34,240,213,0.35)] transition-all hover:bg-[#7DDBC8]"
            >
              start with step 1 →
            </Link>
            <Link
              href={`/learn/where-am-i?${retakeParams.toString()}&retake=1#top`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              retake the quiz →
            </Link>
            <Link
              href="/learn/library"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              browse the full library →
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT THIS LEVEL ACTUALLY MEANS */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: lvl.accent }}
          >
            ::what L{lvl.number} {lvl.name} actually means
          </p>
          <div className="mt-6 space-y-4 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            <p>
              <span className="font-semibold text-[#F2F4F5]">Where you are:</span>{" "}
              {lvl.enters}
            </p>
            <p>
              <span className="font-semibold text-[#F2F4F5]">What graduates you:</span>{" "}
              {lvl.graduates}
            </p>
            <p>
              <span className="font-semibold text-[#FFB87A]">The risk at this level:</span>{" "}
              {lvl.riskAtThisLevel}
            </p>
            <p>
              <span className="font-semibold text-[#22F0D5]">The right tool here:</span>{" "}
              {lvl.rightTool}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
