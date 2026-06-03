/**
 * IncumbentTable — honest comparison table vs Cursor, Codex, Claude Code.
 * Server component.
 * Source of truth: docs/RELEASE_NOTES_v6.1.0.md lines 119–134.
 * Pricing canon: $1 once forever / FIRST 7 DAYS FREE.
 */

interface CompRow {
  feature: string;
  ob: string;       // OrangeBox v6.1.0
  cursor: string;
  codex: string;
  cc: string;       // Claude Code
}

const ROWS: CompRow[] = [
  {
    feature: "Tool-using agent loop",
    ob:     "✓ local + audited",
    cursor: "✗ Composer is one-shot",
    codex:  "✓ cloud only",
    cc:     "✓ terminal only",
  },
  {
    feature: "Tab autocomplete",
    ob:     "✓ Haiku, 30s cache",
    cursor: "✓ proprietary",
    codex:  "✗",
    cc:     "✗",
  },
  {
    feature: "Repo index",
    ob:     "✓ in-memory, fast",
    cursor: "✓ vector cloud",
    codex:  "✗",
    cc:     "partial",
  },
  {
    feature: "Background tasks",
    ob:     "✓ in-process queue",
    cursor: "partial",
    codex:  "✓",
    cc:     "✓ via worktrees",
  },
  {
    feature: "Receipts on every action",
    ob:     "✓ 20 source taxonomy",
    cursor: "✗",
    codex:  "partial",
    cc:     "✗",
  },
  {
    feature: "Native binary",
    ob:     "✓ Rust egui · 4.98 MB",
    cursor: "Electron",
    codex:  "web",
    cc:     "terminal",
  },
  {
    feature: "Sovereignty / no telemetry",
    ob:     "✓ default-off",
    cursor: "✗",
    codex:  "✗",
    cc:     "partial",
  },
  {
    feature: "Multi-model vote",
    ob:     "✓ Trilane / Quadlane",
    cursor: "✗",
    codex:  "✗",
    cc:     "✗",
  },
  {
    feature: "Æ Alpha curated X feed",
    ob:     "✓ unique",
    cursor: "✗",
    codex:  "✗",
    cc:     "✗",
  },
  {
    feature: "Vault inline citations",
    ob:     "✓ [1] markers + sources",
    cursor: "✗",
    codex:  "✗",
    cc:     "partial",
  },
  {
    feature: "Composer SHA-256 chain",
    ob:     "✓ full diff audit",
    cursor: "✗",
    codex:  "✗",
    cc:     "✗",
  },
];

const COST_ROW = {
  feature: "Cost — full feature set",
  ob:     "$1 once · free first 7 days",
  cursor: "$20/mo",
  codex:  "$20/mo (preview)",
  cc:     "$20/mo (Pro)",
};

function cellColor(val: string): string {
  if (val.startsWith("✓")) return "text-[#22F0D5]";
  if (val === "✗")          return "text-[#6B7779]";
  if (val === "partial")    return "text-[#22F0D5]";
  return "text-[#9BA5A7]";
}

export function IncumbentTable() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::honest comparison · what nobody else has
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          Local + receipts + multi-model.
          <br />
          <span className="text-[#22F0D5]">Nothing else has all three.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
          Cursor, Codex, and Claude Code are real products. So is this comparison.
        </p>

        {/* table — horizontal scroll on mobile */}
        <div className="relative mt-12">
          {/* edge fade on mobile */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent sm:hidden"
          />

          <div className="overflow-x-auto rounded-2xl border border-[#1A2225]">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              {/* thead */}
              <thead>
                <tr className="border-b border-[#1A2225] bg-[#0A0F11]">
                  <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    feature
                  </th>
                  <th className="border-l border-[#22F0D5]/30 bg-[#22F0D5]/5 px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    orangebox v6.1.0
                  </th>
                  <th className="border-l border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    cursor
                  </th>
                  <th className="border-l border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    codex
                  </th>
                  <th className="border-l border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    claude code
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1A2225] bg-[#0A0F11]">
                {ROWS.map((r) => (
                  <tr
                    key={r.feature}
                    className="transition-colors hover:bg-[#101A1C]"
                  >
                    <td className="px-5 py-3.5 text-[#F2F4F5]">{r.feature}</td>
                    <td className={`border-l border-[#22F0D5]/20 bg-[#22F0D5]/5 px-5 py-3.5 font-mono text-xs ${cellColor(r.ob)}`}>
                      {r.ob}
                    </td>
                    <td className={`border-l border-[#1A2225] px-5 py-3.5 font-mono text-xs ${cellColor(r.cursor)}`}>
                      {r.cursor}
                    </td>
                    <td className={`border-l border-[#1A2225] px-5 py-3.5 font-mono text-xs ${cellColor(r.codex)}`}>
                      {r.codex}
                    </td>
                    <td className={`border-l border-[#1A2225] px-5 py-3.5 font-mono text-xs ${cellColor(r.cc)}`}>
                      {r.cc}
                    </td>
                  </tr>
                ))}

                {/* cost row */}
                <tr className="border-t-2 border-[#1A2225] bg-[#101A1C]">
                  <td className="px-5 py-3.5 font-medium text-[#F2F4F5]">
                    {COST_ROW.feature}
                  </td>
                  <td className="border-l border-[#22F0D5]/20 bg-[#22F0D5]/10 px-5 py-3.5 font-mono text-xs font-semibold text-[#22F0D5]">
                    {COST_ROW.ob}
                  </td>
                  <td className="border-l border-[#1A2225] px-5 py-3.5 font-mono text-xs text-[#6B7779]">
                    {COST_ROW.cursor}
                  </td>
                  <td className="border-l border-[#1A2225] px-5 py-3.5 font-mono text-xs text-[#6B7779]">
                    {COST_ROW.codex}
                  </td>
                  <td className="border-l border-[#1A2225] px-5 py-3.5 font-mono text-xs text-[#6B7779]">
                    {COST_ROW.cc}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#6B7779]">
          The honest moat:{" "}
          <span className="text-[#F2F4F5]">sovereignty + receipts + multi-model.</span>{" "}
          Nothing else has all three. $0 + provider tokens once you own the
          cockpit. No per-month fee. No token markup.
        </p>
      </div>
    </section>
  );
}
