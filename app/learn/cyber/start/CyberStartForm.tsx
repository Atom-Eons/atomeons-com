"use client";

import { useState } from "react";

/**
 * Email capture form for /learn/cyber/start.
 *
 * Posts to /api/cyber/subscribe (Supabase service-role insert into
 * cyber_subscribers). Rate-limited 5/min/IP at the API layer.
 *
 * UX:
 *  - Single email input + persona select (optional)
 *  - Submit → loading → success / duplicate / error states
 *  - Duplicate is positive ("already on the list") not an error
 *  - On success, swap form for the confirmation card
 */

const PERSONAS = [
  { value: "", label: "Skip this question" },
  { value: "student", label: "Student (HS / undergrad / grad)" },
  { value: "self-taught", label: "Self-taught operator" },
  { value: "career-switcher", label: "Career switcher" },
  { value: "vet", label: "Military veteran" },
  { value: "professional", label: "Working professional" },
];

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "duplicate" }
  | { kind: "error"; message: string };

export function CyberStartForm() {
  const [email, setEmail] = useState("");
  const [persona, setPersona] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "loading") return;
    setState({ kind: "loading" });
    try {
      const r = await fetch("/api/cyber/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, persona, source: "cyber-start" }),
      });
      const j = (await r.json()) as {
        ok: boolean;
        duplicate?: boolean;
        error?: string;
      };
      if (j.ok) {
        setState({ kind: "ok" });
        return;
      }
      if (j.duplicate) {
        setState({ kind: "duplicate" });
        return;
      }
      setState({ kind: "error", message: j.error ?? "Subscribe failed." });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error.",
      });
    }
  }

  if (state.kind === "ok") {
    return (
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
          You&apos;re on the list
        </p>
        <h3 className="mt-5 text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
          First letter lands within 24 hours.
        </h3>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.65] text-[#C8CCCE]">
          We&apos;ll send the path overview first, then the labs map, then the federal + private career guide, the certifications roadmap, the legal framework, and the realtime intel feed. Six letters, weekly.
        </p>
      </div>
    );
  }

  if (state.kind === "duplicate") {
    return (
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7]">
          Already on the list
        </p>
        <h3 className="mt-5 text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
          You&apos;ve got the series queued.
        </h3>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.65] text-[#C8CCCE]">
          Your email is already in our list. If you didn&apos;t get the first letter, check spam (or reply to any past email from us — it goes to a real inbox).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="cyber-email" className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
          Email
        </label>
        <input
          id="cyber-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state.kind === "loading"}
          className="mt-2 w-full rounded-lg border border-[#1A2225] bg-black px-4 py-3 text-base text-[#F2F4F5] placeholder:text-[#3A4448] focus:border-[#22F0D5] focus:outline-none disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="cyber-persona" className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
          Who you are (optional, helps us send the right thing)
        </label>
        <select
          id="cyber-persona"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          disabled={state.kind === "loading"}
          className="mt-2 w-full rounded-lg border border-[#1A2225] bg-black px-4 py-3 text-base text-[#F2F4F5] focus:border-[#22F0D5] focus:outline-none disabled:opacity-60"
        >
          {PERSONAS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={state.kind === "loading" || !email}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-6 py-3.5 text-base font-semibold text-black transition-colors hover:bg-[#1AD4BD] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.kind === "loading" ? "Subscribing..." : "Start the track →"}
      </button>

      {state.kind === "error" && (
        <p className="text-sm text-[#FFB87A]" role="alert">
          {state.message}
        </p>
      )}

      <p className="text-xs leading-[1.55] text-[#6B7779]">
        Your email goes to AtomEons only. No selling, no sharing, no affiliate funnels. Every email has an unsubscribe link. Privacy at{" "}
        <a href="/legal/privacy" className="text-[#9BA5A7] underline decoration-[#1A2225] underline-offset-4 hover:text-[#22F0D5] hover:decoration-[#22F0D5]">
          /legal/privacy
        </a>.
      </p>
    </form>
  );
}
