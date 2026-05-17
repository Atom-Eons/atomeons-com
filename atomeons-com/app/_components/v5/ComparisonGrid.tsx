"use client";

const ROWS: { label: string; cost: string; what: string; highlight?: boolean }[] = [
  {
    label: "Hire a part-time PM (10h/wk @ $100/h)",
    cost: "~$52,000",
    what: "Human time · doctrine is theirs · leaves with the operator",
  },
  {
    label: "Notion + Linear + Slack + Loom + Cal",
    cost: "~$2,400",
    what: "Surface theater · no mission graph · no receipt law",
  },
  {
    label: "Claude Pro + ChatGPT Plus + Cursor + Gemini Adv",
    cost: "~$3,120",
    what: "Per-month tax · chat with no project memory · no swap-lane",
  },
  {
    label: "Custom AI cockpit (consulting build)",
    cost: "$40K–$120K",
    what: "6–9 months · doctrine is yours to invent · zero source you keep",
  },
  {
    label: "ORANGEBOX Command v1.5.0",
    cost: "$49 once",
    what: "Cockpit + 15 depts + 60+ MCP tools + 27 guardrails + source included",
    highlight: true,
  },
];

export function ComparisonGrid() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::price ladder
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            One price.
            <br />
            <span className="text-[#6B7779]">
              Compare it to the alternatives.
            </span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {/* header */}
          <div className="grid grid-cols-[1.4fr_140px_2fr] gap-4 border-b border-[#1A2225] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] md:px-8">
            <span>alternative</span>
            <span className="text-right">cost</span>
            <span>what you actually get</span>
          </div>

          {ROWS.map((r) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1.4fr_140px_2fr] items-center gap-4 px-6 py-5 transition-colors md:px-8 ${
                r.highlight
                  ? "bg-gradient-to-r from-[#FF7A1A]/10 via-[#22F0D5]/5 to-transparent"
                  : "border-t border-[#1A2225] hover:bg-[#101A1C]/50"
              }`}
            >
              <span
                className={`text-sm md:text-base ${
                  r.highlight
                    ? "font-medium text-[#FF7A1A]"
                    : "text-[#F2F4F5]"
                }`}
              >
                {r.label}
              </span>
              <span
                className={`text-right font-mono ${
                  r.highlight
                    ? "text-base font-semibold text-[#22F0D5]"
                    : "text-sm text-[#9BA5A7]"
                }`}
              >
                {r.cost}
              </span>
              <span
                className={`text-sm ${
                  r.highlight ? "text-[#F2F4F5]" : "text-[#9BA5A7]"
                }`}
              >
                {r.what}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-[#6B7779]">
          One project where you don't re-discover what "done" meant three weeks
          ago pays for ORANGEBOX. Once.
        </p>
      </div>
    </section>
  );
}
