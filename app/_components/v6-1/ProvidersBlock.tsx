/**
 * ProvidersBlock — all providers, locked to none.
 * Server component.
 * Source of truth: docs/SITE_HANDOFF_v5.md providers_supported array +
 * docs/RELEASE_NOTES_v6.1.0.md (Groq added in v6 moat surface).
 */

interface Provider {
  name: string;
  sub: string;
  note?: string;
}

const PROVIDERS: Provider[] = [
  {
    name: "Anthropic",
    sub: "Opus · Sonnet · Haiku",
    note: "Alpha wired",
  },
  {
    name: "OpenAI",
    sub: "GPT-5",
  },
  {
    name: "Google",
    sub: "Gemini",
  },
  {
    name: "Groq",
    sub: "LPU inference",
    note: "Sub-second",
  },
  {
    name: "Ollama",
    sub: "Local models",
    note: "No egress",
  },
  {
    name: "OpenRouter",
    sub: "200+ models",
  },
  {
    name: "Hermes",
    sub: "MIT · free",
    note: "𝕏 feed",
  },
  {
    name: "Whisper.cpp",
    sub: "Local voice",
    note: "Audio stays local",
  },
];

export function ProvidersBlock() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(60% 35% at 50% 50%, rgba(34, 240, 213,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::providers · locked to none
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          Every major model.
          <br />
          <span className="text-[#22F0D5]">One cockpit.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9BA5A7]">
          BYO keys. Zero token markup. The smart model router picks the right
          tier for each task — Haiku for autocomplete, Sonnet for agent runs,
          local Ollama when you&apos;re air-gapped.
        </p>

        {/* provider chip row */}
        <div className="mt-12 flex flex-wrap gap-3">
          {PROVIDERS.map((p) => (
            <div
              key={p.name}
              className="flex flex-col gap-1 rounded-xl border border-[#1A2225] bg-[#0A0F11] px-5 py-4 transition-colors hover:border-[#22F0D5]/30 hover:bg-[#101A1C]"
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-[#F2F4F5]">
                  {p.name}
                </span>
                {p.note && (
                  <span className="rounded border border-[#22F0D5]/30 bg-[#22F0D5]/8 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[#22F0D5]">
                    {p.note}
                  </span>
                )}
              </div>
              <span className="font-mono text-xs text-[#6B7779]">{p.sub}</span>
            </div>
          ))}
        </div>

        {/* tail */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 font-mono text-xs text-[#22F0D5]">·</span>
            <p className="text-sm leading-relaxed text-[#9BA5A7]">
              Zero token markup. BYO keys. Your spend goes directly to the
              provider — no middleman, no markup, no surprises.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 font-mono text-xs text-[#22F0D5]">·</span>
            <p className="text-sm leading-relaxed text-[#9BA5A7]">
              Local Whisper.cpp for voice. Audio never leaves your machine.
              The cockpit is locked to no provider.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 font-mono text-xs text-[#22F0D5]">·</span>
            <p className="text-sm leading-relaxed text-[#9BA5A7]">
              Three models, you vote. Trilane surfaces conflicts — the operator
              is always the final authority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
