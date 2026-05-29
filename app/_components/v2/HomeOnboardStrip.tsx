import Link from "next/link";

/**
 * HomeOnboardStrip — the mission-first homepage strip.
 *
 * Operator directive 2026-05-26:
 *   "I WANT TO ONBOARD HUMANITY TO AI. THROUGH THIS SITE. BUILD IT."
 *
 * Sits ABOVE every product block on the homepage. Loudly declares the
 * mission and routes the visitor into the on-ramp surfaces:
 *
 *   /learn   — the 12-lesson curriculum (multi-week, persona paths,
 *              5 levels, full library). The deep version.
 *
 *   /start   — the 11-minute appetizer (paced, single-page, copy-paste
 *              prompts, send-to-one-person CTA). The fast version.
 *
 * Both surfaces existed before this strip; this is the front door that
 * names them and points at them.
 *
 * Server component. No JS needed.
 */
export function HomeOnboardStrip() {
  const paths = [
    { id: "worker", label: "Worker", accent: "#FFB87A" },
    { id: "builder", label: "Builder", accent: "#22F0D5" },
    { id: "student", label: "Student", accent: "#22F0D5" },
    { id: "operator", label: "Operator", accent: "#FF7A1A" },
    { id: "curious", label: "Curious", accent: "#9BA5A7" },
  ];

  return (
    <section className="relative isolate overflow-hidden border-y border-[#1A2225] bg-black">
      {/* ambient cyan-orange dual bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 30%, rgba(34,240,213,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 8% 90%, rgba(255,184,122,0.14) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::mission · what this site is actually for
        </p>

        <h2 className="mt-5 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
          Onboarding humanity{" "}
          <span className="text-[#22F0D5]">to AI.</span>
        </h2>

        <p className="mt-7 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
          A free 27-lesson curriculum that moves any human from
          never-used-AI to operator-grade. Starts with L0 — the gateway
          for humans who are scared or skeptical. Five paths by persona.
          Five levels (Novice → Pilot). Real drills. Copy-paste prompts.
          Worked examples. Honest limits. No signup. No mailing list.
          No affiliate revenue.
        </p>

        {/* persona chips · link to each persona path */}
        <ul className="mt-10 flex flex-wrap gap-3">
          {paths.map((p) => (
            <li key={p.id}>
              <Link
                href={`/learn/${p.id}`}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all"
                style={{
                  borderColor: p.accent + "55",
                  background: p.accent + "10",
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: p.accent }}
                />
                <span
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: p.accent }}
                >
                  {p.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* primary CTAs · /learn (the deep curriculum) + /start (the 11-min appetizer) */}
        <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_60px_rgba(34,240,213,0.35)] transition-all hover:bg-[#7DDBC8]"
          >
            open the curriculum · /learn →
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
          >
            or 11 minutes · /start
          </Link>
        </div>

        {/* trust micro-row */}
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          27 lessons · ~8 hours total · level diagnostic · worked examples · cc-by 4.0 · no signup
        </p>
      </div>
    </section>
  );
}
