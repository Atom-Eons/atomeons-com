"use client";

/**
 * EnrollForm · email-only enrollment for the AtomEons learning paths.
 *
 * Wave 39 · 2026-06-06 · operator brief: "i want only email to start
 * the learning paths as a track-my-progress only. when complete we
 * want that list · we want to find who are AI pilots and cyber pros ·
 * its an onboarding ramp to find the best of the best. and educate
 * the rest. you are building a library of alexandria here."
 *
 * No password. No profile fields. Just email + path. The signal:
 *   - who started a path
 *   - which lessons they completed (localStorage + future sync)
 *   - who completed the path (graduates → alumni list)
 *
 * On completion, the visitor is invited (still email-only) to be
 * added to the alumni list. The lab can identify pilots + cyber pros.
 *
 * Backend (scaffolded):
 *   POST /api/enroll  body { email, path }
 *     - If LOOPS_API_KEY env wired, registers the contact + tags by path
 *     - Else writes to console and returns { queued: true } honestly
 *
 * Future: Supabase 'learners' table mirrors progress (operator wire-up).
 */

import { useState } from "react";

type PathSlug = "ai-pilot" | "cyber-pro";

const PATH_LABELS: Record<PathSlug, string> = {
  "ai-pilot": "AI Pilot",
  "cyber-pro": "Cyber Pro",
};

const PATH_BLURBS: Record<PathSlug, string> = {
  "ai-pilot":
    "Five levels · twelve atlas deep dives · seven tool cheat sheets · the exam. Email tracks your progress. Finish all four legs → the lab adds you to the AI Pilot list.",
  "cyber-pro":
    "Forty-page cyber catalog · frameworks (MITRE ATT&CK · NIST CSF · Zero Trust) · AI security · breaches · certifications path. Email tracks your progress. Finish all four legs → the lab adds you to the Cyber Pro list.",
};

interface EnrollFormProps {
  path: PathSlug;
}

export function EnrollForm({ path }: EnrollFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setState("err");
      setMsg("Please enter a real email address.");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), path }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Enrollment failed.");
      // Persist locally so the visitor sees their progress next visit
      try {
        localStorage.setItem(`atomeons.path.${path}.email`, email.trim().toLowerCase());
        localStorage.setItem(`atomeons.path.${path}.started_at`, new Date().toISOString());
      } catch {
        /* ignore quota issues */
      }
      setState("ok");
      setMsg(
        j?.queued
          ? "You're in. Progress tracking begins now."
          : `Enrolled in ${PATH_LABELS[path]}. Check your email.`,
      );
    } catch (e) {
      setState("err");
      setMsg(e instanceof Error ? e.message : "Something broke. Try again in a minute.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="border border-[#22F0D5]/30 bg-[#0F1114] p-6 md:p-8"
      aria-label={`Enroll in the ${PATH_LABELS[path]} track`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
        § Enroll · email-only · no password · free
      </p>
      <h3
        className="mt-3 text-[28px] font-light leading-tight text-[#F4F4F2]"
        style={{ fontFamily: "Newsreader, Georgia, serif" }}
      >
        Become a {PATH_LABELS[path]}.
      </h3>
      <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.6] text-[#9CA3AF]">
        {PATH_BLURBS[path]}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={state === "submitting" || state === "ok"}
          aria-label="Email address"
          className="flex-1 border border-[#1F242B] bg-[#08090B] px-4 py-3 font-mono text-[13px] text-[#F4F4F2] placeholder-[#7a818a] outline-none focus:border-[#22F0D5]"
        />
        <button
          type="submit"
          disabled={state === "submitting" || state === "ok"}
          className="inline-flex items-center justify-center border-2 border-[#22F0D5] bg-[#22F0D5]/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition hover:bg-[#22F0D5]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "submitting"
            ? "Enrolling…"
            : state === "ok"
              ? "Enrolled ✓"
              : "Start the track →"}
        </button>
      </div>

      {state === "ok" && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
          {msg}
        </p>
      )}
      {state === "err" && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF4D4D]">
          {msg}
        </p>
      )}

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
        Privacy · email only · no password · no tracking pixels ·
        unsubscribe anytime · lab uses Loops.so for transactional mail
      </p>
    </form>
  );
}
