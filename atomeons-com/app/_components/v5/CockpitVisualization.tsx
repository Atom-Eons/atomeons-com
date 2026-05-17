"use client";

import { useEffect, useState } from "react";

/**
 * Live cockpit visualization for v5.
 * Animated mission-graph + party-line ticker — all CSS / state, no real backend.
 * The numbers are illustrative, the layout is real. This is what the actual
 * cockpit surface looks like in operation.
 */

const RAILS = [
  { id: "VISION_RAIL", target: 94, label: "Vision Rail", hint: "DAG · mission spine" },
  { id: "PARTY_LINE", target: 72, label: "Party Line", hint: "JSONL · status bus" },
  { id: "TRIAD_LANES", target: 87, label: "Triad Lanes", hint: "strategy / eng / xp" },
];

const TICKER = [
  { dept: "AE0", tag: "ROUTER", body: "lane=strategy · model=opus · estimated 12 receipts" },
  { dept: "AE3", tag: "BUILDER", body: "wrote 5 files · 2 tests green · receipt 0x4ab1" },
  { dept: "AE7", tag: "LAKESTRIKE", body: "scope check passed · 1 contradiction flagged" },
  { dept: "AE12", tag: "TEST", body: "230/230 ▲ · CI 12.4s · no flakes" },
  { dept: "AE14", tag: "VERIFY", body: "real-system check · plugin Codexa Local · receipt 0x4ab8" },
  { dept: "AE0", tag: "ROUTER", body: "lane=engineering · context survived reset · 18m run" },
];

export function CockpitVisualization() {
  const [progress, setProgress] = useState(() => RAILS.map(() => 0));
  const [tickIdx, setTickIdx] = useState(0);

  // animate rails to target
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) =>
        prev.map((p, i) => {
          const target = RAILS[i].target;
          if (p >= target) return target;
          return Math.min(target, p + 0.6);
        })
      );
    }, 30);
    return () => clearInterval(id);
  }, []);

  // rotate ticker
  useEffect(() => {
    const id = setInterval(() => setTickIdx((i) => (i + 1) % TICKER.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* section header */}
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::live cockpit
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            One thread. The whole project.
            <br />
            <span className="text-[#6B7779]">No rebuild when the model forgets.</span>
          </h2>
        </div>

        {/* cockpit panel */}
        <div className="relative overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11] shadow-[0_0_120px_-30px_rgba(34,240,213,0.35)]">
          {/* glow corner */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(34,240,213,0.25), transparent 70%)",
            }}
          />

          {/* header bar */}
          <div className="flex items-center justify-between border-b border-[#1A2225] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FF7A1A]" />
                <span className="size-2.5 rounded-full bg-[#22F0D5]" />
                <span className="size-2.5 rounded-full bg-[#6B7779]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
                ORANGEBOX::cockpit · v1.5.0 · session 0x4ab9
              </span>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#22F0D5]/70 md:inline">
              ▲ LOCAL · NO TELEMETRY
            </span>
          </div>

          {/* rails */}
          <div className="grid gap-px bg-[#1A2225] md:grid-cols-3">
            {RAILS.map((rail, i) => (
              <div key={rail.id} className="bg-[#0A0F11] px-6 py-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    {rail.id}
                  </span>
                  <span className="font-mono text-2xl font-medium tabular-nums text-[#F2F4F5]">
                    {progress[i].toFixed(0)}%
                  </span>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded bg-[#1A2225]">
                  <div
                    className="h-full rounded bg-gradient-to-r from-[#FF7A1A] via-[#22F0D5] to-[#22F0D5] transition-all duration-100"
                    style={{
                      width: `${progress[i]}%`,
                      boxShadow: "0 0 12px rgba(34,240,213,0.6)",
                    }}
                  />
                </div>
                <p className="mt-4 text-sm text-[#F2F4F5]">{rail.label}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#6B7779]">
                  {rail.hint}
                </p>
              </div>
            ))}
          </div>

          {/* party-line ticker */}
          <div className="border-t border-[#1A2225] px-6 py-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              ::party_line · streaming
            </p>
            <div className="relative h-7 overflow-hidden">
              {TICKER.map((t, i) => {
                const offset = (i - tickIdx + TICKER.length) % TICKER.length;
                const isActive = offset === 0;
                return (
                  <div
                    key={i}
                    className="absolute inset-x-0 transition-all duration-700"
                    style={{
                      transform: `translateY(${(offset - 0) * 100}%)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <p className="flex items-center gap-3 font-mono text-sm">
                      <span className="rounded border border-[#1A2225] bg-black px-1.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-[#22F0D5]">
                        {t.dept}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF7A1A]">
                        {t.tag}
                      </span>
                      <span className="truncate text-[#F2F4F5]">{t.body}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* footer rail */}
          <div className="grid grid-cols-3 gap-px border-t border-[#1A2225] bg-[#1A2225] md:grid-cols-6">
            {[
              ["receipts", "0x4ab8"],
              ["gates", "9/9"],
              ["tests", "230/230"],
              ["guardrails", "27"],
              ["lanes", "3"],
              ["uptime", "18m"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#0A0F11] px-4 py-3 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6B7779]">
                  {k}
                </p>
                <p className="font-mono text-sm font-medium text-[#F2F4F5]">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* caption */}
        <p className="mt-8 max-w-2xl font-mono text-sm text-[#6B7779]">
          The cockpit is the instrument. The model is the engine. You are the
          pilot. Everything else is theater.
        </p>
      </div>
    </section>
  );
}
