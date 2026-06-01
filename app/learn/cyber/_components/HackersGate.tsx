"use client";

/**
 * HackersGate — soft front-door overlay for /learn/cyber.
 *
 * Operator directive 2026-06-01: "make them watch hackers movie to start
 * the course. put it as a front door. the password is hack the planet"
 * Also: "i want it all read by ai seo and google search till gemini kills
 * google seach" — i.e. the overlay MUST NOT block crawlers.
 *
 * SEO discipline:
 *   - This component is purely a client-side visual overlay.
 *   - The page underneath renders fully in server HTML — bots get every
 *     word without ever evaluating this component.
 *   - localStorage caches the pass so humans see it exactly once.
 *
 * UX discipline:
 *   - Password is "hack the planet" (case-insensitive, trim).
 *   - Skip link is visible for anyone who needs it.
 *   - Trailer link points to MGM's official YouTube channel (legal, free).
 */

import { useEffect, useState } from "react";

const STORAGE_KEY = "ae:cyber:gate:passed";
const PASSWORD_NORMALIZED = "hack the planet";

function normalize(v: string): string {
  return v.toLowerCase().trim().replace(/\s+/g, " ");
}

export default function HackersGate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    try {
      const passed = localStorage.getItem(STORAGE_KEY) === "1";
      if (!passed) setOpen(true);
    } catch {
      setOpen(true);
    }
    setArmed(true);
  }, []);

  function pass() {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
    setOpen(false);
  }

  function tryPassword(e: React.FormEvent) {
    e.preventDefault();
    if (normalize(value) === PASSWORD_NORMALIZED) {
      pass();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  // Never render anything until armed (avoid hydration flicker).
  if (!armed || !open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cyber-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 py-8 backdrop-blur-md"
    >
      <div
        className={`w-full max-w-2xl rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-7 shadow-[0_0_80px_-20px_#22F0D5] md:p-10 ${shake ? "animate-pulse" : ""}`}
        style={shake ? { animation: "shake 0.5s" } : undefined}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::cyber · front door · est. 1995
        </p>
        <h2 id="cyber-gate-title" className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight text-[#F2F4F5] md:text-4xl">
          Before you walk in,{" "}
          <span className="text-[#22F0D5]">watch the movie.</span>
        </h2>
        <p className="mt-5 text-[15px] leading-[1.65] text-[#C8CCCE]">
          <strong className="text-[#F2F4F5]">Hackers (1995)</strong>. Iain Softley, dir. Jonny
          Lee Miller, Angelina Jolie, Matthew Lillard, Jesse Bradford. The film that gave the
          subculture its visual language and its rallying cry. Watch it once before you start
          this track. Required reading was never a book.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="https://www.youtube.com/results?search_query=hackers+1995+trailer+MGM"
            target="_blank"
            rel="noopener"
            className="rounded-xl border border-[#22F0D5]/30 bg-[#22F0D5]/10 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
          >
            ▶ watch trailer · MGM
          </a>
          <a
            href="https://www.justwatch.com/us/movie/hackers"
            target="_blank"
            rel="noopener"
            className="rounded-xl border border-[#1A2225] bg-[#0F1518] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
          >
            where to stream · JustWatch
          </a>
        </div>

        <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
          ::then say the rallying cry to pass the gate
        </p>
        <form onSubmit={tryPassword} className="mt-3 flex flex-wrap gap-2">
          <input
            type="text"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="say it"
            aria-label="Pass phrase"
            className="flex-1 min-w-[200px] rounded-lg border border-[#22F0D5]/30 bg-black px-4 py-3 font-mono text-base text-[#F2F4F5] placeholder:text-[#3A4448] focus:border-[#22F0D5] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg border border-[#22F0D5] bg-[#22F0D5] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black hover:bg-[#22F0D5]/80"
          >
            enter →
          </button>
        </form>
        {shake && (
          <p className="mt-3 font-mono text-[11px] text-[#FFB87A]">
            ::access denied · say it like you mean it
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#1A2225] pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::hint · two words · ends in &ldquo;planet&rdquo;
          </p>
          <button
            type="button"
            onClick={pass}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] underline decoration-[#6B7779]/30 underline-offset-4 hover:text-[#22F0D5]"
          >
            skip the ritual →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
