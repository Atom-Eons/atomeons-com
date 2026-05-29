import Link from "next/link";

/**
 * LearnSpineTLDR — three-line compression of the curriculum.
 *
 * Sits right below the hero on /learn. Same shape as LessonTLDR on
 * individual lessons. WHO it's for · WHAT it is · WHERE to start.
 * The primary action is the diagnostic — fastest path from "I don't
 * know where to start" to "here are the three lessons for me."
 *
 * Server component. Pure presentation.
 */
export function LearnSpineTLDR({
  totalLessons,
  totalHours,
}: {
  totalLessons: number;
  totalHours: number;
}) {
  return (
    <section className="border-b border-[#1A2225] bg-[#22F0D5]/05">
      <div className="mx-auto w-full max-w-4xl px-6 py-8 md:py-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::TL;DR · the whole curriculum in three lines
        </p>
        <ul className="mt-4 space-y-3 text-base leading-[1.55] text-[#F2F4F5] md:text-lg">
          <li className="flex gap-3">
            <span className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#22F0D5]">
              WHO
            </span>
            <span>
              Any human — scared, skeptical, curious, or already working — who
              wants to use AI without the cartel hype.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#22F0D5]">
              WHAT
            </span>
            <span>
              {totalLessons} lessons across five levels. L0 is the gateway. Each
              lesson is a concept + a real drill + the trap to avoid. ~
              {totalHours} hours total.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FFB87A]">
              START
            </span>
            <span>
              Take the 2-minute diagnostic. It maps you to a level and
              recommends three lessons. Or pick a persona path below.
            </span>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/learn/where-am-i"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_30px_rgba(34,240,213,0.45)] transition-all hover:bg-[#7DDBC8]"
          >
            take the 2-min diagnostic →
          </Link>
          <Link
            href="/learn/lesson/scared-or-skeptical"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A] transition-all hover:border-[#FFB87A] hover:bg-[#FFB87A]/20"
          >
            or start at L0 · the gateway →
          </Link>
          <a
            href="#paths"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
          >
            or just browse the paths ↓
          </a>
        </div>
      </div>
    </section>
  );
}
