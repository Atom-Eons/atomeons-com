"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * /who-are-you · the 5-question entry router · Wave 55 · 2026-06-12
 *
 * Operator: "thought paths for each possible brain IQ user." Five short
 * questions · 30 seconds · the lab sends the visitor to the right
 * cognitive entry point. Pure client logic · no backend · no tracking.
 */

type Familiarity = "none" | "tried" | "daily" | "building";
type Intent = "curious" | "learning" | "building" | "hiring" | "skeptical";
type TimeBudget = "5min" | "30min" | "session";
type Format = "read" | "watch" | "listen" | "try" | "chat";

interface Answers {
  familiarity?: Familiarity;
  intent?: Intent;
  time?: TimeBudget;
  format?: Format;
}

interface Recommendation {
  href: string;
  label: string;
  why: string;
}

function recommend(a: Answers): Recommendation {
  // Format-first routing
  if (a.format === "chat") {
    return {
      href: "/ask",
      label: "Talk to the lab AI",
      why: "You want to chat · the lab has a free grounded assistant ready right now.",
    };
  }
  if (a.format === "try") {
    return {
      href: "/mindrest/experience",
      label: "Mindrest entrainment · live in-browser",
      why: "You want to TRY something · here's a free 8-mode session you can run right now.",
    };
  }
  // Familiarity-driven routing
  if (a.familiarity === "none") {
    if (a.time === "5min") {
      return {
        href: "/kids",
        label: "Kids · AI in plain words",
        why: "Brand new + 5 minutes · the shortest honest answer to 'what is this thing'",
      };
    }
    return {
      href: "/plain",
      label: "Plain · AI without the jargon",
      why: "Brand new + you have time · the adult plain-language lane · 12 honest answers.",
    };
  }
  if (a.familiarity === "tried") {
    return {
      href: "/start",
      label: "Start · 11-minute on-ramp",
      why: "You've tried AI · time to learn how to use it well · 11 minutes.",
    };
  }
  if (a.familiarity === "daily") {
    if (a.intent === "building") {
      return {
        href: "/best-practices",
        label: "Cheat sheets · 8 AI coding tools",
        why: "Daily user + building · the technical cheat sheet hub.",
      };
    }
    return {
      href: "/learn/atlas",
      label: "Atlas · 32 deep dives",
      why: "Daily user · time to go deeper · 32 atlas pages cover the field.",
    };
  }
  if (a.familiarity === "building") {
    if (a.intent === "hiring") {
      return {
        href: "/learn/career",
        label: "Career · pathways + salaries",
        why: "You're hiring · the career section has real benchmarks.",
      };
    }
    if (a.intent === "skeptical") {
      return {
        href: "/innovations",
        label: "Innovations · 44 firsts catalogued",
        why: "Skeptical · receipts · sourced + dated · the brag page with proof.",
      };
    }
    return {
      href: "/paths/ai-pilot",
      label: "AI Pilot graduation track",
      why: "You build · take the alumni-list-grade graduation track.",
    };
  }
  // Intent-only fallback
  if (a.intent === "curious") {
    return {
      href: "/plain",
      label: "Plain · AI without the jargon",
      why: "Curious · plain language · 12 honest answers · 15 minutes.",
    };
  }
  if (a.intent === "skeptical") {
    return {
      href: "/innovations",
      label: "Innovations · sourced firsts",
      why: "Skeptical · here are the receipts.",
    };
  }
  if (a.intent === "building") {
    return {
      href: "/best-practices",
      label: "Cheat sheets · 8 AI tools",
      why: "Builder · the canonical playbooks.",
    };
  }
  if (a.intent === "hiring") {
    return {
      href: "/learn/career",
      label: "Career section",
      why: "Hiring · pathways + salaries.",
    };
  }
  // Default
  return {
    href: "/",
    label: "The launcher · pick a silo",
    why: "9 worlds · pick one that looks interesting.",
  };
}

export default function WhoAreYouPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const set = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value as never }));
    setStep((s) => s + 1);
  };

  const rec = step >= 4 ? recommend(answers) : null;

  return (
    <main className="mx-auto max-w-[760px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          WHO ARE YOU · 5 QUESTIONS · 30 SECONDS · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Where should we send you?
        </h1>
        <p
          className="mt-5 max-w-[60ch] text-[clamp(18px,2vw,22px)] font-light leading-[1.4] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The lab is for all · which means the entry point should be too.
          Five questions · 30 seconds · we route you to the right page.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.32em] text-[#7a818a]">
          No login · no tracking · pure local logic
        </p>
      </header>

      {/* Q1 · Familiarity */}
      {step >= 0 && (
        <Question
          n={1}
          q="How familiar are you with AI right now?"
          options={[
            { label: "Brand new · never tried it", value: "none" },
            { label: "Tried it a few times", value: "tried" },
            { label: "I use it daily", value: "daily" },
            { label: "I'm building with it", value: "building" },
          ]}
          selected={answers.familiarity}
          onPick={(v) => set("familiarity", v)}
        />
      )}

      {/* Q2 · Intent */}
      {step >= 1 && (
        <Question
          n={2}
          q="What brings you here today?"
          options={[
            { label: "Just curious · want to understand what this is", value: "curious" },
            { label: "Learning · want to actually get good at it", value: "learning" },
            { label: "Building · I make things with AI", value: "building" },
            { label: "Hiring · I'm evaluating AI talent or tools", value: "hiring" },
            { label: "Skeptical · I want proof, not hype", value: "skeptical" },
          ]}
          selected={answers.intent}
          onPick={(v) => set("intent", v)}
        />
      )}

      {/* Q3 · Time */}
      {step >= 2 && (
        <Question
          n={3}
          q="How much time do you have right now?"
          options={[
            { label: "5 minutes", value: "5min" },
            { label: "30 minutes", value: "30min" },
            { label: "A real session · 1 hour or more", value: "session" },
          ]}
          selected={answers.time}
          onPick={(v) => set("time", v)}
        />
      )}

      {/* Q4 · Format */}
      {step >= 3 && (
        <Question
          n={4}
          q="What format works best for you?"
          options={[
            { label: "I want to read", value: "read" },
            { label: "I want to chat with the AI", value: "chat" },
            { label: "I want to try something hands-on", value: "try" },
            { label: "I want to watch a tour", value: "watch" },
            { label: "I want to listen", value: "listen" },
          ]}
          selected={answers.format}
          onPick={(v) => set("format", v)}
        />
      )}

      {/* Result */}
      {rec && (
        <section className="mt-16 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § Recommendation · where to start
          </p>
          <h2
            className="mt-3 text-[clamp(36px,5vw,56px)] font-light leading-[1.05]"
            style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
          >
            {rec.label}
          </h2>
          <p
            className="mt-4 text-[18px] leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            {rec.why}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={rec.href}
              className="inline-flex items-center gap-2 border-2 border-[#22F0D5] bg-[#22F0D5]/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition hover:bg-[#22F0D5]/20"
            >
              Take me there →
            </Link>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setStep(0);
              }}
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:border-[#9CA3AF]"
            >
              Start over
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:border-[#9CA3AF]"
            >
              Or skip · go to launcher
            </Link>
          </div>
        </section>
      )}

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /who-are-you · 5-question entry router · pure client logic · no tracking · 2026-06-12
        </p>
      </footer>
    </main>
  );
}

function Question({
  n,
  q,
  options,
  selected,
  onPick,
}: {
  n: number;
  q: string;
  options: { label: string; value: string }[];
  selected?: string;
  onPick: (value: string) => void;
}) {
  return (
    <section className="mt-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
        § Question {n} of 4
      </p>
      <h2
        className="mt-3 text-[clamp(26px,3.5vw,40px)] font-light leading-[1.1]"
        style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
      >
        {q}
      </h2>
      <div className="mt-6 grid gap-2">
        {options.map((o) => {
          const isSelected = selected === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onPick(o.value)}
              className="block w-full text-left border p-4 transition hover:border-[#22F0D5]"
              style={{
                borderColor: isSelected ? "#22F0D5" : "#1F242B",
                background: isSelected ? "rgba(34,240,213,0.06)" : "transparent",
              }}
            >
              <p
                className="text-[18px] font-light leading-tight"
                style={{
                  fontFamily: "Newsreader, Georgia, serif",
                  color: isSelected ? "#22F0D5" : "#F4F4F2",
                }}
              >
                {o.label}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
