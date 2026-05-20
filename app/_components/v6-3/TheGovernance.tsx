/**
 * TheGovernance — 27 guardrails + 9-stage gate chain + Human Final Stop.
 *
 * Per orange-judge: LOAD-BEARING. The safety case. Purchase gate for
 * any serious buyer. Currently fragmented across TheCrews (two cards
 * mention trust gradient + Human Final Stop) — promote to its own
 * section with more architecture.
 *
 * Per mirrors: counts and names are public (llms.txt). Gate 0 = LBCE
 * is already public. DO NOT publish the guardrail text itself, the
 * gate-chain evaluation logic, or trust-threshold numbers (30/100).
 *
 * Per misfits: NASA Launch Commit Criteria checklist board grammar —
 * three stacked layers (guardrails grid + 9-gate row + Human Final Stop
 * full-width). Each layer earns its slot.
 *
 * Per engine-platform: Gate 0 = LBCE (Lattice Boundary Conditions
 * Enforcement / Lattice Integrity Gate — same gate, both names exist
 * in public docs). 9 stages confirmed across llms.txt and the public
 * v5 WhatsInBox + WhatStillStands lineage.
 */

const GATE_STAGES = [
  { n: "0", label: "LBCE", body: "Lattice integrity check before any write" },
  { n: "1", label: "SCOPE", body: "Authorization + scope boundary" },
  { n: "2", label: "RECEIPTS", body: "Pre-write receipt availability" },
  { n: "3", label: "TESTS", body: "Test surface verification" },
  { n: "4", label: "DRIFT", body: "Invariant + 27-guardrail drift audit" },
  { n: "5", label: "SECURITY", body: "Permission + secret-handling sweep" },
  { n: "6", label: "FACTUAL", body: "Hallucination + claim verification" },
  { n: "7", label: "BENCH", body: "Performance + cost-budget check" },
  { n: "8", label: "STOP", body: "Human Final Stop — operator confirms" },
];

export function TheGovernance() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::THE GOVERNANCE LAYER · INTEGRITY STACK
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            27 guardrails. Nine gates.
            <br />
            <span className="text-[#FF7A1A]">One human stop.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            Three-layer integrity stack — constitutional guardrails, a
            9-stage gate chain, and Human Final Stop — enforced at runtime,
            not at documentation time.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {/* Layer 1 — 27 constitutional guardrails */}
          <div className="border-b border-[#1A2225] p-8 md:p-10">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                ::LAYER 1 · 27 CONSTITUTIONAL GUARDRAILS
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                hard-coded · runtime-enforced
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9BA5A7]">
              Twenty-seven hard constraints baked into the runtime. Not a
              policy page, not a terms document. They govern what the cockpit
              will and will not do, what departments can mutate, what
              requires operator confirmation, and what is permanently blocked.
              They cannot be disabled by configuration.
            </p>
            <div className="mt-6 grid grid-cols-9 gap-1.5 sm:gap-2">
              {Array.from({ length: 27 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded border border-[#1A2225] bg-black font-mono text-[10px] text-[#6B7779] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>

          {/* Layer 2 — 9-stage gate chain */}
          <div className="border-b border-[#1A2225] p-8 md:p-10">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                ::LAYER 2 · 9-STAGE GATE CHAIN
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                pre-mutation · sequential
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9BA5A7]">
              Every consequential action passes through nine stages before
              mutation is allowed. Gate 0 is the Lattice Integrity Check —
              every chain starts there. The chain runs sequentially; failure
              at any stage halts the mutation and writes a receipt with the
              reason.
            </p>
            <div className="mt-6 overflow-x-auto">
              <div className="flex min-w-[820px] items-stretch gap-2">
                {GATE_STAGES.map((g, i) => (
                  <div key={g.n} className="flex flex-1 items-stretch gap-2">
                    <div
                      className="flex flex-1 flex-col gap-1 rounded-lg border border-[#1A2225] bg-black px-3 py-3 transition-colors hover:border-[#22F0D5]/40"
                      style={{
                        borderColor:
                          g.n === "8" ? "rgba(255,122,26,0.4)" : undefined,
                      }}
                    >
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.22em]"
                        style={{
                          color: g.n === "8" ? "#FF7A1A" : "#22F0D5",
                          opacity: 0.7,
                        }}
                      >
                        gate {g.n}
                      </span>
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#F2F4F5]">
                        {g.label}
                      </span>
                      <span className="text-[10px] leading-snug text-[#6B7779]">
                        {g.body}
                      </span>
                    </div>
                    {i < GATE_STAGES.length - 1 ? (
                      <span className="flex items-center text-[#6B7779]">
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layer 3 — Human Final Stop */}
          <div className="bg-gradient-to-r from-[#1A0F08]/40 to-transparent p-8 md:p-10">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
                ::LAYER 3 · HUMAN FINAL STOP
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                always-reachable · non-bypassable
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
              The operator always wins.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9BA5A7]">
              No department, no crew, no autonomous lane, no overnight loop
              can promote itself past Human Final Stop. Every restricted
              operation routes to a confirmation. Every promotion to higher
              trust requires an operator gesture. The cockpit is yours. The
              departments work for you, not instead of you.
            </p>
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.18em] text-[#FF7A1A]">
              CTRL+. KILLS EVERYTHING. INSTANTLY.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
