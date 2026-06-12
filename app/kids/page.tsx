import type { Metadata } from "next";
import Link from "next/link";

/**
 * /kids · the ELI5 + ELI10 lab on-ramp · Wave 53 · 2026-06-12
 *
 * Operator: "this is for all. right now its only for nerds. fuck
 * that. for all."
 *
 * Plain English. Big type. Short paragraphs. No jargon. No acronyms.
 * Ages 5-15 friendly · adults can read it too without feeling talked
 * down to. The entry point for anyone who's never touched AI before.
 */

export const metadata: Metadata = {
  title: "Kids · AI in plain words · for everyone new to it",
  description:
    "AI for kids and curious adults · plain English · no jargon · what AI is · how it learns · can it think · what you can build · is it safe · what to do first. The simplest possible on-ramp to the lab.",
  alternates: { canonical: "https://atomeons.com/kids" },
  openGraph: {
    title: "Kids · AI in plain words",
    description:
      "What AI is in plain English · for kids and curious adults · 7-minute read · no jargon.",
    url: "https://atomeons.com/kids",
    type: "article",
  },
};

const SECTIONS = [
  {
    n: "1",
    q: "What is AI?",
    a: [
      "AI stands for artificial intelligence. The name sounds fancy. It just means a computer that can read patterns very fast.",
      "Imagine a parrot that read every book ever written. It would know how to finish almost any sentence you started. That's the trick AI does · just with more than parrots could hold.",
      "It is not magic. It is math · really really good math that runs on really big computers.",
    ],
  },
  {
    n: "2",
    q: "How does it learn?",
    a: [
      "It read most of the internet and a lot of books. Then it played a quiz game with itself.",
      "Cover up the last word of a sentence. Guess the word. Check if you got it right. Try again. Do that a billion times.",
      "After a billion guesses · it gets really good at guessing what comes next. That is how it learned to talk.",
    ],
  },
  {
    n: "3",
    q: "Can it actually think?",
    a: [
      "Sort of. It can reason about a problem step by step · sometimes very well.",
      "But it might not know what thinking feels like the way you do. We honestly do not know yet.",
      "The smart people who built it are still figuring out what it actually is. That is a real thing scientists are arguing about right now.",
    ],
  },
  {
    n: "4",
    q: "What can you build with it?",
    a: [
      "Stories · long ones · short ones · in any voice.",
      "Games · little games · big games · with characters that talk back.",
      "Code · for websites · for apps · for art that draws itself.",
      "Songs · pictures · cartoons · poems · math homework helpers · cooking recipes · plans for almost anything.",
      "You can talk to one right now. The lab has one ready. It is free. It is at /ask.",
    ],
  },
  {
    n: "5",
    q: "Is it safe?",
    a: [
      "Mostly yes · if you check its work.",
      "Sometimes it makes up things that sound right but are not. People call this hallucinating. Do not trust it for medical advice or money decisions or law without checking.",
      "Do not give it your real password. Do not type secrets into it. Treat it like a very smart friend who might be wrong sometimes.",
      "And kids · always tell a grown-up if it ever says anything that scares you or feels wrong.",
    ],
  },
  {
    n: "6",
    q: "What should you do first?",
    a: [
      "Talk to one. The lab has a free one at /ask. Ask it weird questions.",
      "Try to make it get something wrong. When you find a mistake you understand why · you are learning.",
      "Then read one short page · maybe a glossary entry · or the 11-minute starter. Then talk to it again.",
      "Practice talking to it · the way you practice talking to people. That is the skill.",
    ],
  },
  {
    n: "7",
    q: "What if I want to go deeper?",
    a: [
      "The lab has stuff for every level. The hard-tech stuff is real and waiting. So is the careful stuff. So is everything in between.",
      "When you are ready · pick one silo from the launcher and explore. That is what they are for.",
      "And remember · everyone here started by not knowing. Including the people who run the lab. So keep going.",
    ],
  },
];

const NEXT = [
  { href: "/ask", label: "Talk to the lab AI", desc: "Free · in your browser · type any question." },
  { href: "/plain", label: "Plain mode for adults", desc: "Same simple words · more depth · no jargon." },
  { href: "/start", label: "11-minute starter", desc: "The next-step lesson · still plain · adds a little more." },
  { href: "/glossary", label: "Glossary", desc: "Every AI word explained in one line." },
  { href: "/", label: "Back to the launcher", desc: "Pick any silo · 9 worlds to explore." },
];

export default function KidsPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          KIDS · PLAIN ENGLISH · NO JARGON · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(56px,10vw,108px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          What is this AI thing?
        </h1>
        <p
          className="mt-5 max-w-[60ch] text-[clamp(20px,2.3vw,26px)] font-light leading-[1.4] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          For kids · for grown-ups who never touched it · for anyone who
          wants the real answer without the fancy words. 7-minute read.
        </p>
      </header>

      {SECTIONS.map((s) => (
        <section key={s.n} className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § Question {s.n}
          </p>
          <h2
            className="mt-3 text-[clamp(32px,5vw,56px)] font-light leading-[1.05] text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
          >
            {s.q}
          </h2>
          <div className="mt-6 space-y-5">
            {s.a.map((p, i) => (
              <p
                key={i}
                className="text-[clamp(18px,2vw,22px)] leading-[1.6] text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § One last thing
        </h2>
        <p
          className="mt-5 text-[clamp(20px,2.3vw,26px)] leading-[1.5] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          You are not behind. Nobody has been doing this for very long.
          The grown-ups making the news are mostly figuring it out as
          they go. You are not late · you are early.
        </p>
      </section>

      <section className="mt-16 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where to go next
        </h2>
        <ul className="mt-6 space-y-3">
          {NEXT.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
              >
                <p
                  className="text-[22px] font-light leading-tight text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {n.label} →
                </p>
                <p className="mt-1 text-[14px] leading-[1.55] text-[#9CA3AF]">
                  {n.desc}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /kids · plain English · CC-BY 4.0 · safe to share · safe to read aloud · 2026-06-12
        </p>
      </footer>
    </main>
  );
}
