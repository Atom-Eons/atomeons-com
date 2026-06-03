/**
 * Operator-to-buyer statements rail.
 *
 * v12: rewrote from "live system status" claims (which were hardcoded
 * strings reading as live telemetry) to plain operator statements that
 * are true of the product flow. Marquee scrolls slow; pure CSS.
 */
const STATEMENTS: string[] = [
  "no refund on curiosity — prereqs ship before the buy button",
  "the manual is inside the box · you figure it out",
  "stripe checkout · payment verified before download token mints",
  "the cockpit was built through the cockpit it replaces",
  "no team · no roadmap · no support · one operator",
  "instrument panel · not a chatbox · not a dashboard",
];

export function ProofRail() {
  const items = [...STATEMENTS, ...STATEMENTS]; // duplicated for seamless loop
  return (
    <div
      className="proof-rail relative overflow-hidden border-y border-[#1F242B] bg-[#08090B]"
      role="status"
      aria-label="ORANGEBOX operator statements"
    >
      <div className="proof-rail-track flex gap-12 whitespace-nowrap py-2">
        {items.map((p, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]"
          >
            <span
              aria-hidden
              className={`inline-block h-1 w-1 rounded-full ${
                i % 2 === 0 ? "bg-[#75ff92]" : "bg-[#ffc46b]"
              }`}
            />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
