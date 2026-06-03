/**
 * The 9 compound moats. Heading: "Things Claude Code, Cursor, and Codex
 * can't copy." Per SITE_HANDOFF_v5.md.
 */

const MOATS = [
  {
    n: "01",
    name: "Local-first by default",
    vs: "Cursor + Codex monetize cloud indexing — they can't go local without breaking the business model.",
  },
  {
    n: "02",
    name: "Multi-model first-class",
    vs: "Anthropic won't ship Claude + GPT + Gemini debate inside Claude Code. Ever.",
  },
  {
    n: "03",
    name: "BYO keys · zero token markup",
    vs: "Subscription tools mark up tokens or die. We surface every provider charge.",
  },
  {
    n: "04",
    name: "Operator OS doctrine",
    vs: "They are sold as tools. We are sold as the chair the operator sits in.",
  },
  {
    n: "05",
    name: "Receipts on every action",
    vs: "Nobody ships proof. Once buyers expect receipts, vapor output looks naked.",
  },
  {
    n: "06",
    name: "Department doctrine — AE0–AE14 + 15 ÆoNs skills",
    vs: "Roleplay subagents aren't the same thing as separation of powers.",
  },
  {
    n: "07",
    name: "Compounding lattice memory",
    vs: "Stateless sessions. The longer you use ORANGEBOX, the smarter it gets.",
  },
  {
    n: "08",
    name: "Multi-machine worker rail (Codexa)",
    vs: "Single-machine tools. Laptop pilots workstation pilots cloud — nobody has this.",
  },
  {
    n: "09",
    name: "Native 𝕏 feed via Hermes",
    vs: "Claude Code / Cursor / Codex have zero real-time X access. Hermes does the heavy lifting inside the cockpit.",
  },
];

export function MoatsTable() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::compound moats
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            9 things Claude Code, Cursor, and Codex
            <br />
            <span className="text-[#22F0D5]">structurally can&apos;t copy.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
            Single features get copied in a sprint. Compound doctrine takes a
            business-model rewrite. These are the rewrites the incumbents
            won&apos;t do.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {MOATS.map((m, i) => (
            <div
              key={m.n}
              className={`flex flex-col gap-2 px-5 py-6 md:grid md:grid-cols-[60px_1fr_1.4fr] md:items-baseline md:gap-6 md:px-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <div className="flex items-baseline gap-3 md:contents">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
                  {m.n}
                </span>
                <h3 className="text-base font-medium text-[#F2F4F5] md:text-lg">
                  {m.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#9BA5A7] md:text-base">
                {m.vs}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
