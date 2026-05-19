/**
 * TheLivingLayer — the cockpit as organism.
 *
 * v6.3 adds an idle/ambient layer that survives the operator stepping
 * away. The cockpit doesn't go to sleep. It pulses, heatmaps, computes
 * its own health, and runs metered overnight loops.
 *
 * Concept-level only. Names public capabilities. No internal cost math
 * (Night Watch budget cap, Rules Garden ML threshold counts).
 */

type LivingFeature = {
  name: string;
  one_liner: string;
  body: string;
  accent: string;
  meta: string;
};

const LIVING_FEATURES: LivingFeature[] = [
  {
    name: "Breathing Canvas",
    one_liner: "Idle pulses + usage heatmap.",
    body: "The canvas breathes when you're not interacting with it — soft pulses across the work surface, a heatmap that shows where you've been, a fade across regions you haven't touched in a while.",
    accent: "#22F0D5",
    meta: "always-on · zero cost",
  },
  {
    name: "Night Watch",
    one_liner: "The cockpit doesn't sleep.",
    body: "Overnight, the cockpit runs a budgeted metabolic loop — index new files, refresh stale context, surface anomalies for morning review. Hard cap on spend. Pauses on budget alarm. Reports the night's work at breakfast.",
    accent: "#FF7A1A",
    meta: "budgeted · auto-pause",
  },
  {
    name: "Organism Health HUD",
    one_liner: "Vitals for the cockpit itself.",
    body: "A live readout of the cockpit's own health — model fallthrough rate, average response latency, vault state, token spend trajectory, mutation success rate. The cockpit tells you what it sees about itself.",
    accent: "#22F0D5",
    meta: "Ctrl + B · toggle",
  },
  {
    name: "Voice Latency Stopwatch",
    one_liner: "Canvas reacts before you finish reading.",
    body: "Measures the gap between your voice input ending and the canvas reacting. Target under 800ms — fast enough that the cockpit feels like it's anticipating you, not waiting for you. Receipts log every gap that misses target.",
    accent: "#FF7A1A",
    meta: "target ≤ 800ms",
  },
];

export function TheLivingLayer() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::THE LIVING LAYER
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            The cockpit is alive
            <br />
            <span className="text-[#FF7A1A]">when you are not looking.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            v6.3 stops treating the cockpit as a stateless command line and
            starts treating it as an organism. It breathes. It watches. It
            tells you its own vitals. It works overnight, on a leash, and
            reports back.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {LIVING_FEATURES.map((f) => (
            <div
              key={f.name}
              className="group relative overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/30"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                style={{ background: f.accent }}
              />
              <div className="flex items-start justify-between gap-3">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: f.accent }}
                >
                  {f.name}
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779]">
                  {f.meta}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-medium leading-snug text-[#F2F4F5]">
                {f.one_liner}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
          all four ship with v6.3. all four run on the local binary. all
          four respect the budget cap you set.
        </p>
      </div>
    </section>
  );
}
