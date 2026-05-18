"use client";

import { useEffect, useState } from "react";

/**
 * Streaming-receipts visualization. The receipt format is real (JSONL line
 * from poster.mjs queue). Lines stream in like a real cockpit log.
 */

const SEED = [
  { ts: "01:03:14", dept: "AE3",  tool: "edit",     tokens: 1204, cents: 2,  status: "ok" },
  { ts: "01:03:18", dept: "AE12", tool: "test",     tokens: 542,  cents: 1,  status: "ok" },
  { ts: "01:03:24", dept: "AE7",  tool: "review",   tokens: 3120, cents: 5,  status: "flag" },
  { ts: "01:03:31", dept: "AE3",  tool: "edit",     tokens: 880,  cents: 1,  status: "ok" },
  { ts: "01:03:36", dept: "AE0",  tool: "route",    tokens: 210,  cents: 0,  status: "ok" },
  { ts: "01:03:42", dept: "AE14", tool: "verify",   tokens: 1740, cents: 3,  status: "ok" },
  { ts: "01:03:48", dept: "AE3",  tool: "edit",     tokens: 990,  cents: 1,  status: "ok" },
  { ts: "01:03:55", dept: "AE12", tool: "bench",    tokens: 2210, cents: 4,  status: "ok" },
];

export function ReceiptsLive() {
  const [visible, setVisible] = useState<typeof SEED>([]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setVisible((prev) => {
        const next = [SEED[i % SEED.length], ...prev].slice(0, 8);
        return next;
      });
      i++;
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* left: copy */}
          <div className="lg:sticky lg:top-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
              ::receipts
            </p>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
              Every action.
              <br />
              <span className="text-[#FF7A1A]">Receipt-backed.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#9BA5A7]">
              No fake green. Every meaningful action writes a JSONL receipt:
              department, tool, tokens, cost in cents, status. The audit trail
              lives on your disk, not on a vendor server.
            </p>
            <ul className="mt-8 space-y-2 font-mono text-sm text-[#F2F4F5]">
              <li>· per-call cost · in cents · per MCP tool</li>
              <li>· per-department rollups · nightly</li>
              <li>· per-session export · jsonl</li>
              <li>· month-end surprise = 0</li>
            </ul>
          </div>

          {/* right: streaming log — fixed-pixel 6-column grid (~410px wide).
              Wrap in overflow-x-auto so narrow phones (<420px) get a
              horizontal scroll on the table itself rather than breaking
              the whole page layout. */}
          <div className="relative overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11] shadow-[0_0_120px_-40px_rgba(255,122,26,0.3)]">
            {/* header */}
            <div className="flex items-center justify-between border-b border-[#1A2225] px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7779]">
                /receipts · session.jsonl
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]/80">
                <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
                live
              </span>
            </div>

            <div className="relative overflow-x-auto">
              {/* right-edge fade hints at horizontal scroll on narrow viewports */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0A0F11] to-transparent sm:hidden"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute right-2 top-2 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-[#22F0D5]/70 sm:hidden"
              >
                ← swipe
              </div>
            {/* column headers */}
            <div className="grid min-w-[470px] grid-cols-[80px_60px_80px_80px_60px_50px] gap-3 border-b border-[#1A2225] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              <span>ts</span>
              <span>dept</span>
              <span>tool</span>
              <span className="text-right">tokens</span>
              <span className="text-right">cents</span>
              <span>status</span>
            </div>

            {/* rows */}
            <div className="min-h-[360px] divide-y divide-[#1A2225]">
              {visible.map((r, idx) => (
                <div
                  key={`${r.ts}-${idx}`}
                  className="grid min-w-[470px] grid-cols-[80px_60px_80px_80px_60px_50px] items-center gap-3 px-5 py-2.5 font-mono text-xs"
                  style={{
                    opacity: 1 - idx * 0.08,
                    animation:
                      idx === 0 ? "v5slidein 0.5s ease-out" : undefined,
                  }}
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

            {/* footer rollup */}
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
