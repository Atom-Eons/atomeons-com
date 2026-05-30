import type { Metadata } from "next";
import Link from "next/link";
import { AuroraHero } from "./AuroraHero";
import { GlossaryCard } from "./GlossaryCard";
import { CopyLinkButton } from "./CopyLinkButton";
import { GLOSSARY } from "../_data/glossary";

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

      {/* ─── TLDR · the whole page in three lines ─────────────────── */}
      <section className="border-t border-[#1A2225] bg-[#22F0D5]/05">
        <div className="mx-auto w-full max-w-3xl px-6 py-8 md:py-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::TL;DR · the whole page in three lines
          </p>
          <ul className="mt-4 space-y-3 text-base leading-[1.55] text-[#F2F4F5] md:text-lg">
            <li className="flex gap-3">
              <span className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#22F0D5]">
                WHO
              </span>
              <span>
                For adults who&apos;ve used ChatGPT a few times and want to
                actually start using AI without feeling behind or stupid.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#22F0D5]">
                WHAT
              </span>
              <span>
                Eleven minutes covering six real use cases with copy-paste
                prompts, six honest limits, and a 20-term glossary.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FFB87A]">
                START
              </span>
              <span>
                Pick one tool tonight, use it daily for 30 days, then come
                back. Tonight&apos;s homework is at the bottom of the page.
              </span>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#tonight"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_30px_rgba(34,240,213,0.45)] transition-all hover:bg-[#7DDBC8]"
            >
              jump to tonight&apos;s homework ↓
            </a>
            <a
              href="#this-week"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              or browse the six use cases first →
            </a>
          </div>
        </div>
      </section>

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
                body: "The v6.3 cockpit. AE See-Suite + AE Operations. $49 once, forever. Two 30-day refund paths.",
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

      {/* ─── §6½ · COMMON WORRIES (novice anxieties, answered plain) ── */}
      <section
        id="worries"
        className="border-t border-[#1A2225] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A45]">
            common worries · 3 min read
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            The questions you&apos;re afraid to ask out loud.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            Every novice walks in with the same six worries. The lab will
            not lie to you about any of them.
          </p>

          <dl className="mt-12 space-y-4">
            {WORRIES.map((w) => (
              <details
                key={w.q}
                className="group rounded-2xl border border-[#1A2225] bg-[#0F151A] p-6 open:border-[#22F0D5]/40 open:bg-[#11181E]"
              >
                <summary className="flex cursor-pointer items-baseline justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-[#F2F4F5] md:text-lg">
                    {w.q}
                  </h3>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
                  {w.a.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </dl>
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

      {/* ─── §8 · SEND IT TO ONE PERSON ─────────────────────────── */}
      <section
        id="send"
        className="border-t border-[#1A2225] bg-gradient-to-b from-[#0B1014] via-[#0E1418] to-[#0B1014] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            the entire ask
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            Send this to <span className="text-[#22F0D5]">one</span> person.
          </h2>
          <p className="mt-6 text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
            Someone in your phone right now has used ChatGPT under ten times
            and feels like an idiot about it. They are not an idiot. They
            were not handed the door. Send this page and walk away. The lab
            has the rest.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="sms:?&body=If%20you%27ve%20used%20ChatGPT%20less%20than%2010%20times%20this%20is%20worth%2011%20minutes.%20No%20jargon.%20No%20upsell.%20https%3A%2F%2Fatomeons.com%2Fstart"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              text it →
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=If%20you%27ve%20used%20ChatGPT%20under%2010%20times%2C%20this%20is%20worth%2011%20minutes.%20No%20jargon.%20No%20upsell.%20%40AtomMccree%20built%20it.&url=https%3A%2F%2Fatomeons.com%2Fstart"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0F151A] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              tweet it →
            </a>
            <a
              href="mailto:?subject=AI%20without%20the%20jargon%20%E2%80%94%2011%20minutes&body=I%20found%20this%20page%20and%20thought%20of%20you.%20No%20jargon%2C%20no%20upsell.%2011%20minutes%20from%20confused%20to%20confident.%0A%0Ahttps%3A%2F%2Fatomeons.com%2Fstart"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0F151A] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              email it →
            </a>
            <CopyLinkButton />
          </div>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
            ::no tracking · no shortener · no marketing pixel · just the link
          </p>
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

// GLOSSARY now lives at /_data/glossary.ts so the /glossary route can
// render it as a standalone surface and AI search engines can ingest
// it via JSON-LD. /start imports it from there above.

const WORRIES = [
  {
    q: "Will AI take my job?",
    a: [
      "Probably it will change your job. Possibly it will eliminate it. The honest answer depends on what your job is.",
      "Jobs that are mostly typing — drafting routine emails, writing first-draft reports, summarizing meetings, copy-pasting between systems — are getting absorbed first. Jobs that require physical presence, in-person judgment, hands on equipment, or genuine relationship work are safer for now.",
      "The single best move you can make this month is to become the person who uses AI INSIDE your current job before the company replaces the job with someone who already does. Section 4 of this page tells you exactly how.",
    ],
  },
  {
    q: "Is it safe to use? Where does my data go?",
    a: [
      "By default, what you type goes to the company that runs the AI (OpenAI, Anthropic, Google) and may be reviewed by their staff and possibly used to train future models. For most personal use — recipes, travel plans, emails to your brother — this is fine.",
      "What NOT to paste: real passwords, full credit-card numbers, social security numbers, medical IDs, anything from someone else's confidential work that you weren't authorized to share. Treat the chat box like a public coffee-shop notepad.",
      "If you need real privacy, look for tools that say things like 'on-device,' 'local-only,' or 'zero data retention.' Apple Intelligence runs on your phone. Ollama runs models on your own laptop. The lab's own ORANGEBOX cockpit defaults to local-only mode.",
    ],
  },
  {
    q: "Do I have to pay? What does free actually get me?",
    a: [
      "No, you do not have to pay. The free tiers of ChatGPT, Claude, and Gemini are genuinely useful and would have looked like miracles three years ago.",
      "What free gets you: solid chat, ability to attach photos and short PDFs, decent web search on the Gemini side, voice mode on ChatGPT and Claude apps. Limits: slower response, smaller context window, sometimes a queue at peak hours.",
      "Pay only after you have used a tool five days a week for two weeks and felt the free limit close in on you. Then $20/mo for whichever one you actually used is a deal. Do not pay for all three.",
    ],
  },
  {
    q: "Will I look stupid using it?",
    a: [
      "The person who is going to feel stupid in twelve months is the person who refused to try. The person typing 'how do I use this' tonight will be the colleague everyone forwards questions to by spring.",
      "The interface is a chat box. There is no syntax. There is no certification. You ask a question in plain English. If the answer is wrong or unclear, you say so and ask again. That's the whole skill.",
      "If you feel stuck, paste this prompt verbatim: 'I have never used AI before. Pretend I am 12 years old and walk me through what I should ask you to do today.' Watch what happens.",
    ],
  },
  {
    q: "Will it lie to me?",
    a: [
      "Yes. Confidently. This is called a hallucination and it is the single most important thing to understand on this page.",
      "AI will sometimes invent a study, a court case, a quote, a person, a URL — and present it with the same confidence as a real fact. It is not lying on purpose. It is pattern-completing, and the pattern of a real citation looks the same as the pattern of a fake one.",
      "Rule of thumb: if it cites something you are about to USE — a legal case, a medical claim, a statistic in a presentation, a study you will quote in a board meeting — verify it yourself with a real source. For low-stakes brainstorming (vacation ideas, dinner recipes, hobby projects) the cost of a wrong detail is small and you can skip the check.",
    ],
  },
  {
    q: "What if I get dependent on it?",
    a: [
      "Reasonable concern. The lab's posture: AI is a power tool. A chainsaw makes you faster than an axe. It does not make you a worse forester. Same idea.",
      "Two healthy habits. First, do the hard thinking BEFORE you open the chat box. Decide what you actually want, in your own words, and then use the AI to draft and refine. The opposite — typing 'help me think' into a blank box and watching what comes out — is where dependency starts.",
      "Second, kids and writing. If you are a parent or teacher, the rule is: do the assignment yourself first, then ask the AI to critique it. Never let the AI write the first draft of something a child is supposed to be learning to write themselves. The skill you build is the skill you keep.",
    ],
  },
] as const;
