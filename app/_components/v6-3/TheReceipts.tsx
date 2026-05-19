/**
 * TheReceipts — the audit trail as the core promise.
 *
 * Every meaningful action emits a JSONL receipt. The receipts live on
 * disk, not on a vendor server. The receipts are the proof that the work
 * was real. The receipts are the bill, the audit, and the portfolio in
 * one file.
 *
 * This section shows the actual JSONL schema (already published in v6.0
 * doctrine, no IP leak) and frames receipts as the structural counter to
 * vendor opacity.
 */

const SAMPLE_LINES = [
  {
    ts: "01:03:14",
    dept: "design",
    tool: "edit",
    tokens: 1204,
    cents: 2,
    status: "ok",
  },
  {
    ts: "01:03:18",
    dept: "data",
    tool: "test",
    tokens: 542,
    cents: 1,
    status: "ok",
  },
  {
    ts: "01:03:24",
    dept: "review",
    tool: "audit",
    tokens: 3120,
    cents: 5,
    status: "flag",
  },
  {
    ts: "01:03:31",
    dept: "design",
    tool: "edit",
    tokens: 880,
    cents: 1,
    status: "ok",
  },
  {
    ts: "01:03:36",
    dept: "brain",
    tool: "route",
    tokens: 210,
    cents: 0,
    status: "ok",
  },
  {
    ts: "01:03:42",
    dept: "bench",
    tool: "verify",
    tokens: 1740,
    cents: 3,
    status: "ok",
  },
];

export function TheReceipts() {
  return (
    <section className="relative bg-[#0A0F11] py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* left: doctrine */}
          <div className="lg:sticky lg:top-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
              ::THE AUDIT TRAIL
            </p>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
              Every action.
              <br />
              <span className="text-[#FF7A1A]">Receipt-backed.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#9BA5A7]">
              No fake green. Every meaningful action writes a JSONL receipt:
              department, tool, tokens, cost in cents, status. The audit
              trail lives on your filesystem, not on a vendor server.
            </p>
            <ul className="mt-8 space-y-2 font-mono text-sm text-[#F2F4F5]">
              <li>· per-call cost · in cents · per MCP tool</li>
              <li>· per-department rollups · nightly</li>
              <li>· per-session export · jsonl</li>
              <li>· per-project receipt index · grep-friendly</li>
              <li>· month-end surprise = 0</li>
            </ul>
            <p className="mt-8 max-w-md font-mono text-sm uppercase tracking-[0.14em] text-[#FF7A1A]">
              receipts are the bill, the audit, and the portfolio. one file.
            </p>
          </div>

          {/* right: schema sample */}
          <div className="relative overflow-hidden rounded-2xl border border-[#1A2225] bg-black shadow-[0_0_120px_-40px_rgba(255,122,26,0.3)]">
            <div className="flex items-center justify-between border-b border-[#1A2225] px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7779]">
                /receipts · session.jsonl · schema sample
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                writes to %APPDATA%
              </span>
            </div>

            <div className="relative overflow-x-auto">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent sm:hidden"
              />
              <div className="grid min-w-[470px] grid-cols-[80px_72px_80px_80px_60px_60px] gap-3 border-b border-[#1A2225] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                <span>ts</span>
                <span>dept</span>
                <span>tool</span>
                <span className="text-right">tokens</span>
                <span className="text-right">cents</span>
                <span>status</span>
              </div>
              <div className="divide-y divide-[#1A2225]">
                {SAMPLE_LINES.map((r, idx) => (
                  <div
                    key={`${r.ts}-${idx}`}
                    className="grid min-w-[470px] grid-cols-[80px_72px_80px_80px_60px_60px] items-center gap-3 px-5 py-2.5 font-mono text-xs"
                  >
                    <span className="text-[#6B7779]">{r.ts}</span>
                    <span className="text-[#22F0D5]">{r.dept}</span>
                    <span className="text-[#F2F4F5]">{r.tool}</span>
                    <span className="text-right tabular-nums text-[#F2F4F5]">
                      {r.tokens}
                    </span>
                    <span className="text-right tabular-nums text-[#FF7A1A]">
                      {r.cents}
                    </span>
                    <span
                      className={
                        r.status === "ok"
                          ? "text-[#22F0D5]"
                          : "text-[#FF7A1A]"
                      }
                    >
                      {r.status === "ok" ? "▲ ok" : "■ flag"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#1A2225] bg-black/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              <span>session total · 18m</span>
              <span className="text-center">
                <span className="text-[#F2F4F5]">12,486</span> tok
              </span>
              <span className="text-right">
                <span className="text-[#FF7A1A]">$0.17</span> spend
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
