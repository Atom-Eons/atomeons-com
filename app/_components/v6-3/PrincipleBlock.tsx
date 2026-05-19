/**
 * PrincipleBlock — the publishable doctrine for v6.3.
 *
 * Per mirrors IP audit: surfaces the PRINCIPLE (operator-facing). Does
 * NOT surface the MECHANISM (relevance projection, schema validator,
 * dept-LLM router, trust gradients — those stay in receipts only).
 *
 * The four lines below are reworked positive versions of the internal
 * "nevers" — each safe to publish because each describes the user-visible
 * commitment, not the architecture that enforces it.
 */

const PRINCIPLES: { eyebrow: string; line: string }[] = [
  {
    eyebrow: "::PRINCIPLE 01",
    line: "The model does not own the source of truth. Your project does.",
  },
  {
    eyebrow: "::PRINCIPLE 02",
    line: "The canvas shows the work. It does not narrate it.",
  },
  {
    eyebrow: "::PRINCIPLE 03",
    line: "Memory is not a substitute for state. State is on your disk.",
  },
  {
    eyebrow: "::PRINCIPLE 04",
    line: "When the model needs more, it asks. It does not guess.",
  },
];

export function PrincipleBlock() {
  return (
    <section className="relative bg-[#0A0F11] py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::what the rewrite is for
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Four lines.{" "}
            <span className="text-[#6B7779]">Run the build.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div
              key={p.eyebrow}
              className="group relative bg-[#0A0F11] p-8 transition-colors hover:bg-[#101A1C]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">
                {p.eyebrow}
              </p>
              <p className="mt-3 text-xl font-medium leading-snug text-[#F2F4F5] md:text-2xl">
                {p.line}
              </p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#22F0D5] to-transparent opacity-0 transition-opacity group-hover:opacity-40"
              />
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl font-mono text-sm uppercase tracking-[0.14em] text-[#FF7A1A]">
          Less broadcast. More organism. The cockpit quieter than the thing
          it builds.
        </p>
      </div>
    </section>
  );
}
