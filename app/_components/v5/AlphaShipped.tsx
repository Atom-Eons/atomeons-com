/**
 * Every advanced Anthropic capability — already wired.
 * 11 alpha features from anthropic_alpha_wired in SITE_HANDOFF_v5.md.
 */

const ALPHA = [
  {
    n: "01",
    name: "Adaptive thinking + effort parameter",
    body: "Opus 4.7 uses effort:xhigh on architecture, low on tight-budget tasks. No more budget_tokens 400s.",
  },
  {
    n: "02",
    name: "Advisor tool — Sonnet executor + Opus advisor",
    body: "Sonnet runs the code; Opus advises mid-generation. Near-Opus quality at near-Sonnet cost.",
  },
  {
    n: "03",
    name: "Memory tool auto-attached",
    body: "Claude auto-checks your local memory dir before every task. Memory survives sessions.",
  },
  {
    n: "04",
    name: "Files API · vault sync",
    body: "Upload vault docs once. Reuse forever. Massive token savings on hot context.",
  },
  {
    n: "05",
    name: "Citations API on vault queries",
    body: "Vault-grounded answers cite their sources inline. No more lying summaries.",
  },
  {
    n: "06",
    name: "Prompt caching with pre-warm-on-boot",
    body: "Cockpit boots warm. First response is sub-300ms. The cache is ready before you are.",
  },
  {
    n: "07",
    name: "1-hour cache TTL on vault",
    body: "Hot paths stay hot. Saves real money on long sessions.",
  },
  {
    n: "08",
    name: "Compaction for long sessions",
    body: "Auto-summarize at 150k tokens. Preserves what matters. No catastrophic context loss.",
  },
  {
    n: "09",
    name: "Structured outputs · JSON schema validated",
    body: "Zero parse retries on 4 endpoints. The model returns the shape you asked for.",
  },
  {
    n: "10",
    name: "Multi-breakpoint cache strategy",
    body: "Auto for short chats. Multi for >10-turn sessions. The router picks.",
  },
  {
    n: "11",
    name: "Token counting before fire",
    body: "Every call costed before send. Per-provider receipt the moment the response lands.",
  },
];

export function AlphaShipped() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(34,240,213,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::anthropic alpha shipped
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Every advanced Anthropic capability —
            <br />
            <span className="text-[#22F0D5]">already wired.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
            Most apps ship the same SDK call you&apos;d write yourself. ORANGEBOX
            ships the full alpha surface — effort, advisor, memory tool, files
            API, citations, cache pre-warm, structured outputs. The
            production-grade plumbing comes in the box.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {ALPHA.map((a) => (
            <div
              key={a.n}
              className="bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
                  {a.n}
                </span>
                <h3 className="text-base font-medium text-[#F2F4F5]">
                  {a.name}
                </h3>
              </div>
              <p className="mt-3 pl-10 text-sm leading-relaxed text-[#9BA5A7]">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
