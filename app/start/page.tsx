import type { Metadata } from "next";
import Link from "next/link";
import { AuroraHero } from "./AuroraHero";
import { GlossaryCard } from "./GlossaryCard";

/**
 * /start — AI literacy on-ramp for novice readers.
 *
 * Audience: a real adult who has used ChatGPT under ten times, probably
 * for fun or curiosity, and does not yet have a working mental model of
 * what AI is, what it can do for them this week, or where to begin.
 *
 * This page is the answer to: "I keep hearing about AI. What is it,
 * actually, and how do I start using it without feeling like an idiot?"
 *
 * Voice register: WARMER than the rest of the site. Less laboratory,
 * more "your one friend who actually explains things." Still honest.
 * No hype. No talking down. No "isn't this incredible?" hand-waving.
 *
 * Palette: lighter than /orangebox or /founders-view. Deep slate base
 * (#0B1014) with aurora-gradient motion in the hero, not the pure black
 * of the operator/press surfaces.
 */
export const metadata: Metadata = {
  title: "Start here · AtomEons — What is AI, really?",
  description:
    "No jargon. No hype. 11 minutes from confused to confident. Built for someone who has used ChatGPT under 10 times.",
  alternates: { canonical: "https://atomeons.com/start" },
  openGraph: {
    title: "Start here · AtomEons",
    description:
      "AI in plain language. 11 minutes from confused to confident.",
    url: "https://atomeons.com/start",
    siteName: "AtomEons",
    type: "article",
  },
};

export default function StartPage() {
  return (
    <main className="bg-[#0B1014] text-[#F2F4F5]">
      <AuroraHero />

      {/* ─── §1 · WHAT IS AI ──────────────────────────────────────── */}
      <section id="what-is-it" className="border-t border-[#1A2225] py-20 md:py-28">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            chapter 1 · 3 min read
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            What is AI, in one paragraph that doesn&apos;t lie to you.
          </h2>
          <div className="mt-8 space-y-6 text-base leading-[1.75] text-[#C8CCCE] md:text-lg">
            <p>
              Imagine a calculator. Now imagine a calculator that doesn&apos;t
              just do math. It writes emails. Reads thirty-page contracts.
              Looks at photos and tells you what&apos;s in them. Answers
              questions about almost anything. That&apos;s AI.
            </p>
            <p>
              The version of AI that just exploded into your life is called
              a <em className="text-[#FFB87A] not-italic font-medium">large language model</em>.
              It is, mechanically, a very expensive autocomplete. Trained
              on most of the public internet. It guesses the next word, then
              the next, then the next, until it has written you an essay,
              a recipe, a workout plan, or a hard breakup email.
            </p>
            <p>
              It feels like magic because the guesses are extraordinarily
              good. It is not actually magic. It&apos;s pattern-matching at
              enormous scale, running on chips that draw the power of a small
              town. You should respect it, use it, and never quite trust it.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                label: "When you ask Siri for directions",
                body: "AI. (A small one.)",
              },
              {
                label: "When Netflix says you'll like a show",
                body: "AI. (A recommendation one.)",
              },
              {
                label: "When ChatGPT writes you a poem",
                body: "AI. (A big language one.)",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-2xl border border-[#1A2225] bg-[#0F151A] p-5 transition-colors hover:border-[#22F0D5]/40 hover:bg-[#11181E]"
              >
                <p className="text-sm font-medium text-[#F2F4F5]">
                  {row.label}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  {row.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── §2 · WHAT IT CAN DO FOR YOU ─────────────────────────── */}
      <section
        id="this-week"
        className="border-t border-[#1A2225] bg-gradient-to-b from-[#0B1014] via-[#0E141A] to-[#0B1014] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            chapter 2 · 4 min read
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            Six things you can actually do <span className="text-[#FFB87A]">this week</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            No coding. No prompt-engineering tricks. Just open ChatGPT (free),
            Claude (free), or Gemini (free) and try one of these tonight.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="group relative overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0F151A] p-6 transition-all hover:border-[#22F0D5]/40 hover:-translate-y-0.5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
                  {u.label}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#F2F4F5]">
                  {u.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.65] text-[#9BA5A7]">
                  {u.body}
                </p>
                <div className="mt-5 rounded-lg border border-[#1A2225] bg-[#0A0E12] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    try this prompt
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] leading-[1.5] text-[#C8CCCE]">
                    “{u.prompt}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── §3 · WHAT IT CAN'T DO ───────────────────────────────── */}
      <section
        id="cant-do"
        className="border-t border-[#1A2225] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A45]">
            chapter 3 · 2 min read
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            What it <span className="text-[#FF7A45]">cannot</span> do.
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            The hype is loud. The receipts are different. These limits are
            real today and they matter for every decision you make using AI.
          </p>

          <ul className="mt-12 space-y-5">
            {LIMITS.map((l) => (
              <li
                key={l.title}
                className="rounded-2xl border border-[#1A2225] bg-[#0F151A] p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-[#F2F4F5]">
                    {l.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A45]">
                    {l.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-[1.7] text-[#9BA5A7] md:text-base">
                  {l.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── §4 · HOW TO START ───────────────────────────────────── */}
      <section
        id="how-to-start"
        className="border-t border-[#1A2225] bg-gradient-to-b from-[#0B1014] via-[#0E141A] to-[#0B1014] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            chapter 4 · 1 min read
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            The 30-day on-ramp.
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            Forget courses. Forget YouTube rabbit-holes. Three steps. Thirty
            days. You will be ahead of 80% of the workforce.
          </p>

          <ol className="mt-12 space-y-6">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-2xl border border-[#1A2225] bg-[#0F151A] p-6 pl-20 md:p-8 md:pl-24"
              >
                <span className="absolute left-6 top-6 flex size-10 items-center justify-center rounded-full border border-[#22F0D5]/40 bg-[#0A0F11] font-mono text-sm font-bold text-[#22F0D5] md:left-7 md:top-7">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-[#F2F4F5] md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#9BA5A7] md:text-base">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── §5 · WHAT ATOMEONS DOES ─────────────────────────────── */}
      <section
        id="what-we-do"
        className="border-t border-[#1A2225] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            and us · who is AtomEons
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            We build the cockpit. We test the tools.
            <br className="hidden md:block" />
            <span className="text-[#22F0D5]">We separate signal from theater.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            AtomEons is an independent laboratory. One operator, hundreds
            of AI agents, building the surface that gives a human the right
            authority over the right machine at the right moment.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Try the cockpit",
                title: "Æ ORANGEBOX",
                body: "The agent-mode environment. $1 forever, free first 7 days.",
                href: "/orangebox",
                accent: "#FFB87A",
              },
              {
                label: "Read what we found",
                title: "Æ Research",
                body: "12 manuscripts. Lessons from sci-fi. The X-algorithm leak.",
                href: "/research/about",
                accent: "#22F0D5",
              },
              {
                label: "Read the journal",
                title: "Founder's View",
                body: "The unfiltered working notes. Daily-ish broadcasts.",
                href: "/founders-view",
                accent: "#F2F4F5",
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group rounded-2xl border border-[#1A2225] bg-[#0F151A] p-6 transition-all hover:border-[#22F0D5]/40 hover:-translate-y-0.5"
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: c.accent }}
                >
                  {c.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#F2F4F5]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-[#9BA5A7]">
                  {c.body}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  open →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── §6 · GLOSSARY ───────────────────────────────────────── */}
      <section
        id="glossary"
        className="border-t border-[#1A2225] bg-gradient-to-b from-[#0B1014] via-[#0E141A] to-[#0B1014] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            glossary · 20 terms · 1 min each
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            Plain-English dictionary.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            Every word that made you nod and pretend at a dinner party. Now
            defined in one sentence each, with no shame and no jargon-stack.
          </p>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {GLOSSARY.map((g) => (
              <GlossaryCard key={g.term} term={g.term} short={g.short} body={g.body} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── §7 · TONIGHT'S HOMEWORK ─────────────────────────────── */}
      <section
        id="tonight"
        className="border-t border-[#1A2225] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-2xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            tonight · 5 minutes
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            Your homework.
          </h2>
          <p className="mt-6 text-lg leading-[1.7] text-[#C8CCCE] md:text-xl">
            Open <Link href="https://claude.ai" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">claude.ai</Link>.
            Paste a confusing email from work. Ask: <em className="text-[#FFB87A] not-italic">&ldquo;Help me reply
            firmly and politely. Keep it under 100 words.&rdquo;</em>
          </p>
          <p className="mt-4 text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            That&apos;s it. Five minutes. You will feel the shift the moment
            the answer lands. Do this every workday for two weeks and the rest
            of the site will feel different when you come back.
          </p>

          <div className="mt-12 flex flex-col items-center gap-3">
            <Link
              href="/orangebox"
              className="group inline-flex items-center gap-3 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5] transition-all hover:bg-[#22F0D5]/20 hover:border-[#22F0D5]"
            >
              when you&apos;re ready · the cockpit is here
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/founders-view"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#6B7779] transition-colors hover:text-[#22F0D5]"
            >
              or read the working journal first ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    label: "the inbox win",
    title: "Reply to a tough email",
    body: "Paste the email. Say what you actually want to say in plain words. Ask the AI to make it firm and professional. Edit one line and send.",
    prompt:
      "Here is an email I received. Help me reply firmly but politely. I want to say [your point]. Keep it under 100 words.",
  },
  {
    label: "the brief",
    title: "Summarize a 30-page document",
    body: "Drop the PDF. Ask for the one-page version. Then ask for the three bullets your boss actually needs. Then ask what's missing.",
    prompt:
      "Summarize this document in 1 page. Then give me 3 bullets I could send a busy executive. Then tell me what important context might be missing.",
  },
  {
    label: "the trip",
    title: "Plan a 7-day trip on a budget",
    body: "Tell it the city, the budget, the people, and what kind of vacation. It will draft a day-by-day plan you can edit. Ask it for the costs.",
    prompt:
      "Plan a 7-day trip to [city] for [N people] with a $[budget] budget. We like [vibe]. Give me day-by-day with cost estimates and where to book.",
  },
  {
    label: "the hard talk",
    title: "Draft a difficult conversation",
    body: "Tell it the context, the relationship, and what you actually want to communicate. Ask for a script. Then ask what the other side might say.",
    prompt:
      "I need to have a hard conversation with [person] about [topic]. Help me draft the opening 3 sentences, then predict what they'll say back.",
  },
  {
    label: "the receipt",
    title: "Decode a confusing medical report",
    body: "Paste the report. Ask for a plain-English version. Ask which numbers are normal vs concerning. Ask what to ask your doctor next visit.",
    prompt:
      "Here is a medical report. Explain it in plain English. Which numbers are normal vs concerning? What questions should I ask my doctor next visit?",
  },
  {
    label: "the routine",
    title: "Build a workout plan around your body",
    body: "Tell it your goal, your injury history, your schedule, and the equipment you have. Ask for 4 weeks. It will adjust when you tell it what hurt.",
    prompt:
      "Build me a 4-week workout plan. My goal: [goal]. Injuries: [list]. I have access to [equipment]. I can train [N] days/week, [time] each.",
  },
] as const;

const LIMITS = [
  {
    tag: "trust",
    title: "It can confidently make things up.",
    body: "Called a 'hallucination.' If it cites a study, a case, a person, or a quote — verify before you use it. Especially for legal, medical, or financial claims.",
  },
  {
    tag: "memory",
    title: "It mostly does not remember you.",
    body: "Each new conversation usually starts blank. Some products (Claude Projects, ChatGPT Memory) keep limited notes — read what your tool actually stores.",
  },
  {
    tag: "time",
    title: "It does not reliably know what happened yesterday.",
    body: "Training data has a cutoff date. For current news, weather, prices, or schedules, treat its answers as outdated unless it shows a real source it just fetched.",
  },
  {
    tag: "action",
    title: "It cannot move things in the real world by itself.",
    body: "Today: it writes, reads, analyzes. Agents are coming that can take action (book, send, buy) — but you should always be the one with the final yes/no.",
  },
  {
    tag: "judgment",
    title: "It will not catch its own mistakes unless you push.",
    body: "Default mode is helpful and agreeable. Ask: 'What's wrong with this answer? What did you assume? What's the strongest counter-argument?' Then watch it improve.",
  },
  {
    tag: "secrets",
    title: "Don't paste real passwords, SSNs, or full credit card numbers.",
    body: "Treat the chat box like a public coffee shop. Names, addresses, even most work documents are fine. Hard credentials, never.",
  },
] as const;

const STEPS = [
  {
    title: "Pick one tool. Stick with it for 30 days.",
    body: "Pick Claude (warmer, safer), ChatGPT (most features), or Gemini (best at search). One tool. Don't tab-jump. You're building muscle memory, not comparison-shopping.",
  },
  {
    title: "Use it once a day for one concrete task.",
    body: "Rewriting an email. Summarizing a news article. Planning dinner. The goal is reps. After two weeks you stop typing like a stranger and start prompting like a colleague.",
  },
  {
    title: "After 30 days, come back here.",
    body: "Read this page again with fresh eyes. The glossary will look obvious. The cockpit will look usable. You will be ready for /orangebox, /research, and the working journal.",
  },
] as const;

const GLOSSARY = [
  {
    term: "LLM",
    short: "Large Language Model",
    body: "The engine behind ChatGPT, Claude, and Gemini. A program trained to predict the next word from everything it ever read.",
  },
  {
    term: "Prompt",
    short: "what you type",
    body: "The instruction you give the AI. Better prompts = better answers. There is no magic syntax — just be specific.",
  },
  {
    term: "Hallucination",
    short: "confident fiction",
    body: "When the AI invents a fact, citation, or quote that sounds correct but isn't. Verify anything that could matter.",
  },
  {
    term: "Token",
    short: "roughly a word-piece",
    body: "How AI bills you and how it measures memory. ~750 words ≈ 1,000 tokens. Names and code take more tokens than plain English.",
  },
  {
    term: "Context window",
    short: "how much it can hold",
    body: "How much text the AI can read at once. A short conversation: 4K tokens. A whole book: 200K+. Bigger window = more it can keep straight.",
  },
  {
    term: "Agent",
    short: "AI that takes action",
    body: "AI that doesn't just answer — it does things. Books a flight. Sends an email. Runs a script. Always keep a human approval step.",
  },
  {
    term: "MCP",
    short: "Model Context Protocol",
    body: "The plug socket that lets AI safely use external tools — your calendar, your files, your email. Open standard, growing fast.",
  },
  {
    term: "RAG",
    short: "Retrieval-Augmented Generation",
    body: "AI reads from a specific knowledge base (your docs, a wiki, a database) before answering. Better than guessing for fact-heavy work.",
  },
  {
    term: "Fine-tuning",
    short: "training on your data",
    body: "Teaching a model your specific style, tone, or domain by feeding it examples. Expensive. Usually unnecessary for individuals.",
  },
  {
    term: "Multimodal",
    short: "more than text",
    body: "AI that handles images, audio, and video — not just text. Modern Claude, GPT-4, and Gemini are all multimodal.",
  },
  {
    term: "Embedding",
    short: "words → numbers",
    body: "Turning text into a list of numbers so the AI can do math on meaning. Powers search, recommendation, and clustering.",
  },
  {
    term: "Inference",
    short: "when AI runs",
    body: "The act of using the model to produce an output. As opposed to training, which is the months-long process of making the model.",
  },
  {
    term: "Open-source",
    short: "code anyone can see",
    body: "Models like Llama, Mistral, and Qwen. You can download and run them. Privacy win. Setup curve.",
  },
  {
    term: "Closed-source",
    short: "proprietary",
    body: "Models like GPT-4, Claude, and Gemini. Hosted by the company. Best quality today. You can't see the weights.",
  },
  {
    term: "On-device",
    short: "runs on your phone",
    body: "AI that runs without the internet. Smaller, faster, private. Apple Intelligence and on-device Gemini are examples.",
  },
  {
    term: "GPU",
    short: "the AI chip",
    body: "Graphics Processing Unit. The chip that makes AI fast. NVIDIA makes most of them. Why their stock went vertical.",
  },
  {
    term: "Model",
    short: "the AI itself",
    body: "The actual brain. GPT-4, Claude Sonnet, Llama 3, Gemini 2.5 — each is a distinct model with its own personality and price.",
  },
  {
    term: "System prompt",
    short: "hidden instructions",
    body: "The instructions the company set behind the scenes — be helpful, be safe, sound like this. Shapes everything you see.",
  },
  {
    term: "Jailbreak",
    short: "breaking the rules",
    body: "Trying to get the AI to ignore its safety rules with clever prompts. Companies patch these constantly. Don't do it on real systems.",
  },
  {
    term: "AGI",
    short: "Artificial General Intelligence",
    body: "Hypothetical AI as smart as a human across every domain. Doesn't exist yet. Debated whether it ever will. Hype magnet.",
  },
] as const;
