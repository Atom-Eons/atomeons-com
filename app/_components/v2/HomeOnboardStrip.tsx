import Link from "next/link";
import { LabHero } from "./LabHero";

/**
 * HomeOnboardStrip — the mission-first homepage strip.
 *
 * Operator directive 2026-05-26:
 *   "I WANT TO ONBOARD HUMANITY TO AI. THROUGH THIS SITE. BUILD IT."
 *
 * Refactored 2026-05-29 to use the LabHero design-system primitive
 * — same content as the prior in-line implementation but with the
 * new visual rhythm (bigger display heading, more vertical breath,
 * fewer competing chrome elements). Confident emptiness over
 * busy-template feel.
 *
 * Server component. No JS.
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
    <LabHero
      eyebrow="::mission · what this site is actually for"
      title="Onboarding humanity"
      titleAccent="to AI."
      subtitle={
        <p>
          A free 27-lesson curriculum that moves any human from
          never-used-AI to operator-grade. Five paths by persona. Five
          levels. Real drills, copy-paste prompts, worked examples,
          honest limits. No signup. No mailing list. No affiliate
          revenue.
        </p>
      }
      primaryCta={{
        label: "open the curriculum · /learn →",
        href: "/learn",
      }}
      secondaryCta={{
        label: "or 11 minutes · /start",
        href: "/start",
      }}
      tone="cyan"
    >
      {/* persona chips · link to each persona path */}
      <div className="flex flex-col gap-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
          ::or pick your path
        </p>
        <ul className="flex flex-wrap gap-3">
          {paths.map((p) => (
            <li key={p.id}>
              <Link
                href={`/learn/${p.id}`}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 transition-all"
                style={{
                  borderColor: p.accent + "40",
                  background: p.accent + "08",
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
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          27 lessons · level diagnostic · worked examples · cc-by 4.0 · no signup
        </p>
      </div>
    </LabHero>
  );
}
