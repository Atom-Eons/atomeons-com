/**
 * TheLanes — the 11 cockpit lanes that a buyer can point at.
 *
 * Per orange-judge: LOAD-BEARING. The first concrete picture of what
 * the operator is buying. Without this, the page is a manifesto, not
 * a product.
 *
 * Per mirrors: 11 lane names already live in v5/LanesGrid.tsx + llms.txt.
 * Safe to expand here. Do NOT enumerate model-routing per lane, do NOT
 * surface authority structure of any lane that touches multi-model
 * (Trilane is concept-only — "three models, you vote" is the ceiling).
 *
 * Per misfits: NASA Mission Control console grammar — eleven columns,
 * each a runway light. Hover lifts the column, dims the others.
 */

type Lane = {
  num: string;
  name: string;
  hint: string;
  body: string;
  accent: "cyan" | "orange";
};

const LANES: Lane[] = [
  {
    num: "01",
    name: "Cockpit",
    hint: "Mission graph + health HUD",
    body: "The command center. Mission graph, budget tracker, party-line ticker. The lane the cockpit boots into.",
    accent: "cyan",
  },
  {
    num: "02",
    name: "IDE",
    hint: "Editor wired to your tree",
    body: "Editor surface connected to whatever file tree you point it at. Read, write, search — the cockpit knows the project's shape.",
    accent: "orange",
  },
  {
    num: "03",
    name: "Terminal",
    hint: "Sandboxed shell, receipt-logged",
    body: "Shell passthrough with a receipt on every command. What you ran, what it returned, what it cost. On disk.",
    accent: "cyan",
  },
  {
    num: "04",
    name: "Trilane",
    hint: "Three models, you vote",
    body: "Claude, GPT, Gemini — same prompt to all three. The cockpit shows the deltas. The operator picks the call.",
    accent: "orange",
  },
  {
    num: "05",
    name: "Voice",
    hint: "Whisper.cpp, on-device",
    body: "Local Whisper.cpp transcription. Audio never leaves the machine. Sub-800ms voice-to-canvas target.",
    accent: "cyan",
  },
  {
    num: "06",
    name: "𝕏 Feed",
    hint: "Hermes live signal",
    body: "Watch the platform without leaving the cockpit. Hermes ingests, filters, surfaces what matters.",
    accent: "orange",
  },
  {
    num: "07",
    name: "Vault",
    hint: "AES-256-GCM, local-only",
    body: "Credential store. Keys never leave the machine. OAuth PKCE handled. Per-service scopes, never globally granted.",
    accent: "cyan",
  },
  {
    num: "08",
    name: "Receipts",
    hint: "JSONL audit on disk",
    body: "Every action. Department, tool, tokens, cents, status. The audit trail lives on your filesystem.",
    accent: "orange",
  },
  {
    num: "09",
    name: "Privacy",
    hint: "Air-gap on demand",
    body: "One toggle disables all outbound traffic. Local models, vault, mission graph, voice — all keep working.",
    accent: "cyan",
  },
  {
    num: "10",
    name: "Skils",
    hint: "Operator skill library",
    body: "Loaded, validated, searchable. Skils dispatch through one MCP endpoint. The cockpit is extensible by file, not by API.",
    accent: "orange",
  },
  {
    num: "11",
    name: "Settings",
    hint: "Master configuration",
    body: "Budget caps, model preferences, vault unlock, Night Watch schedule, gate configuration. The single place the cockpit lets you steer.",
    accent: "cyan",
  },
];

export function TheLanes() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::THE LANES · COCKPIT ARCHITECTURE
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Eleven lanes.
            <br />
            <span className="text-[#FF7A1A]">One binary.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            The cockpit is not a chat window with tabs — it is eleven
            purpose-built work surfaces inside a single native executable.
            Each lane owns one job. Each writes its own receipts. The
            operator switches between them with a keystroke.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#1A2225] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LANES.map((l) => {
            const accentHex = l.accent === "cyan" ? "#22F0D5" : "#FF7A1A";
            return (
              <div
                key={l.num}
                className="group relative flex flex-col gap-2 bg-[#0A0F11] p-6 transition-colors hover:bg-[#101A1C]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-30 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: accentHex }}
                />
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-[#F2F4F5]">
                    {l.name}
                  </h3>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: accentHex, opacity: 0.7 }}
                  >
                    {l.num}
                  </span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                  {l.hint}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#9BA5A7]">
                  {l.body}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 font-mono text-base uppercase tracking-[0.18em] text-[#FF7A1A]">
          ELEVEN LANES. ONE INSTALL. NOTHING PHONES HOME WITHOUT YOUR SAY.
        </p>
      </div>
    </section>
  );
}
