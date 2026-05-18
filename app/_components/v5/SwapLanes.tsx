"use client";

import { useEffect, useState } from "react";

/**
 * Triad lane visualization — the cockpit-on-top-of-multiple-models pitch.
 * Animated swap: claude → gpt → gemini → ollama → loop.
 * Each lane shows the provider, model name, "active" state, mock latency.
 */

const LANES = [
  { id: "claude",  name: "Claude Sonnet 4.7",  color: "#D08D5C", latency: 240 },
  { id: "gpt",     name: "GPT-5.5",            color: "#22F0D5", latency: 180 },
  { id: "gemini",  name: "Gemini 3 Pro",       color: "#9C8CF4", latency: 220 },
  { id: "ollama",  name: "Local · qwen3-72b",  color: "#75ff92", latency: 95  },
];

export function SwapLanes() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % LANES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          {/* left: copy */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
              ::triad routing
            </p>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
              One cockpit.
              <br />
              <span className="text-[#22F0D5]">All the models.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#9BA5A7]">
              When Claude rate-limits you, the cockpit swaps to GPT. When GPT
              refuses, it swaps to Gemini. When the bill gets ugly, it swaps to
              local Ollama.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#F2F4F5]">
              Mission graph survives every swap. Receipts survive every swap.
              You never start over.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7779]">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
              swap-lane runtime · live
            </div>
          </div>

          {/* right: animated lanes */}
          <div className="relative rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 shadow-[0_0_120px_-40px_rgba(34,240,213,0.4)]">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              ::active_lane
            </p>
            <ul className="space-y-3">
              {LANES.map((lane, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={lane.id}
                    className={`group relative flex items-center justify-between rounded-lg border px-5 py-4 transition-all duration-500 ${
                      isActive
                        ? "border-[#22F0D5]/70 bg-[#101A1C]"
                        : "border-[#1A2225] bg-[#0A0F11]"
                    }`}
                    style={{
                      boxShadow: isActive
                        ? "0 0 30px rgba(34,240,213,0.25)"
                        : "none",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-block size-2 rounded-full transition-all"
                        style={{
                          backgroundColor: isActive ? lane.color : "#1A2225",
                          boxShadow: isActive
                            ? `0 0 16px ${lane.color}`
                            : "none",
                        }}
                      />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7779]">
                          lane.{lane.id}
                        </p>
                        <p className="text-sm text-[#F2F4F5]">{lane.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                        latency
                      </p>
                      <p className="font-mono text-sm tabular-nums text-[#F2F4F5]">
                        {lane.latency}ms
                      </p>
                    </div>
                    {isActive ? (
                      <span className="absolute -left-px top-1/2 h-8 w-px -translate-y-1/2 bg-[#22F0D5] shadow-[0_0_12px_#22F0D5]" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 border-t border-[#1A2225] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              cockpit.swap_lane({LANES[active].id}) → mission_graph.survive(true)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
