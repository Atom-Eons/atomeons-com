import type { Lesson } from "../../_data/lessons";
import type { Level } from "../../_data/levels";

/**
 * LessonTLDR — one-glance compression of the lesson.
 *
 * Sits below the hero, above the dense concept block. Three lines:
 *   · the move (a punchy restatement of the lesson's title)
 *   · the drill (one phrase distilling the exercise)
 *   · the win (one outcome signal, picked from the lesson's outcome array)
 *
 * Server component. Pure presentation. Lets a user scan the whole
 * lesson in 5 seconds and decide whether to dive in.
 */
export function LessonTLDR({
  lesson,
  level,
}: {
  lesson: Lesson;
  level: Level;
}) {
  // Pick the first outcome as the headline win — it's usually the
  // most concrete success signal.
  const win = lesson.outcome[0] ?? "You will finish the drill and feel the shift.";

  return (
    <section
      className="border-b border-[#1A2225]"
      style={{ background: level.accent + "08" }}
    >
      <div className="mx-auto w-full max-w-3xl px-6 py-8 md:py-10">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: level.accent }}
        >
          ::TL;DR · the whole lesson in three lines
        </p>
        <ul className="mt-4 space-y-3 text-base leading-[1.55] text-[#F2F4F5] md:text-lg">
          <li className="flex gap-3">
            <span
              className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: level.accent }}
            >
              MOVE
            </span>
            <span>{lesson.oneLiner}</span>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: level.accent }}
            >
              DRILL
            </span>
            <span>{lesson.drillIntro}</span>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-1 shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "#FFB87A" }}
            >
              WIN
            </span>
            <span>{win}</span>
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
          <a
            href="#drill"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] transition-all"
            style={{
              background: level.accent,
              color: "#0B1014",
              boxShadow: `0 0 30px ${level.accent}55`,
            }}
          >
            jump to drill ↓
          </a>
          <a
            href="#concept"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
          >
            or read the full concept first →
          </a>
        </div>
      </div>
    </section>
  );
}
