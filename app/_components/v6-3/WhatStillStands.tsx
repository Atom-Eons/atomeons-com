/**
 * WhatStillStands — what doesn't change between v6.0 and v6.3.
 *
 * Buyers and onlookers both need to know: the rewrite isn't a reset.
 * The doctrine survives. The license clause survives. The price
 * commitment survives. The architecture below the canvas survives.
 *
 * Pure server component. No data fetch. Static commitment surface.
 */

const INVARIANTS: { head: string; body: string; tag: string }[] = [
  {
    head: "Local-first. Zero telemetry.",
    body: "Project state lives in %APPDATA%. The cockpit physically cannot transmit your data. v6.3 does not change this.",
    tag: "license §3",
  },
  {
    head: "BYO keys. Zero markup.",
    body: "Your Anthropic, OpenAI, Google, Groq, OpenRouter, Ollama keys go straight to the model. No proxy. No skim. No token rebill.",
    tag: "license §6",
  },
  {
    head: "§4A · The forward-buyers lock.",
    body: "ORANGEBOX will never move to monthly billing. If AtomEons ever attempts it, every existing buyer keeps their license free in perpetuity. The clause ships in the binary.",
    tag: "license §4A",
  },
  {
    head: "Source included. Inspect freely.",
    body: "Full source tree alongside the binaries. Inspect. Modify for personal use. No black box. No remote attestation gate.",
    tag: "license §5",
  },
  {
    head: "Native binary. One file.",
    body: "Rust + egui. No webview. No Chromium. Double-click. Two-second launch. v6.3 stays native.",
    tag: "spec",
  },
  {
    head: "Receipts on disk.",
    body: "Every meaningful action writes a JSONL receipt: department, tool, tokens, cost in cents, status. The audit trail lives on your filesystem, not on a vendor server.",
    tag: "doctrine",
  },
];

export function WhatStillStands() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::what doesn&apos;t change
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            v6.3 is a rewrite of the canvas.
            <br />
            <span className="text-[#6B7779]">The doctrine survives.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2 lg:grid-cols-3">
          {INVARIANTS.map((it) => (
            <div
              key={it.head}
              className="group relative bg-[#0A0F11] p-8 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-medium text-[#F2F4F5]">
                  {it.head}
                </h3>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]/70">
                  {it.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
