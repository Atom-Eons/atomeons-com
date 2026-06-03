/**
 * LaneGrid — 11 lanes from v5 handoff + Agent lane (NEW v6.1.0).
 * Server component.
 * Source of truth: docs/SITE_HANDOFF_v5.md JSON lanes array +
 * docs/RELEASE_NOTES_v6.1.0.md for Agent lane addition.
 *
 * Decision: Agent Mode is added as lane #12 here with a NEW v6.1.0 chip
 * AND orange border. It also has its own full-section hero (AgentModeHero)
 * above this grid — the two are complementary. The lane grid is the
 * at-a-glance inventory; AgentModeHero is the deep feature showcase.
 */

interface Lane {
  id: string;
  name: string;
  glyph: string;
  shortcut: string;
  tagline: string;
  isNew?: true;
  replaces?: string;
}

const LANES: Lane[] = [
  {
    id: "cockpit",
    name: "Cockpit",
    glyph: "⌖",
    shortcut: "Ctrl+1",
    tagline: "Home, DAG, party-line, Now panel.",
  },
  {
    id: "ide",
    name: "IDE",
    glyph: "{ }",
    shortcut: "Ctrl+2",
    tagline: "Monaco + tab autocomplete + multi-file Composer.",
    replaces: "Cursor",
  },
  {
    id: "terminal",
    name: "Terminal",
    glyph: "›_",
    shortcut: "Ctrl+3",
    tagline: "Real shell + Ctrl+K agent overlay + streamed receipts.",
    replaces: "Claude Code",
  },
  {
    id: "trilane",
    name: "Trilane",
    glyph: "△",
    shortcut: "Ctrl+4",
    tagline: "Three models, you vote.",
  },
  {
    id: "voice",
    name: "Voice",
    glyph: "◉",
    shortcut: "Ctrl+5",
    tagline: "Local Whisper. Speak intent, get code.",
  },
  {
    id: "xfeed",
    name: "𝕏 Feed",
    glyph: "𝕏",
    shortcut: "Ctrl+Shift+X",
    tagline: "Live X via Hermes. No incumbent has this.",
  },
  {
    id: "vault",
    name: "Vault",
    glyph: "⬡",
    shortcut: "Ctrl+6",
    tagline: "Compounding lattice. Smarter every session.",
  },
  {
    id: "receipts",
    name: "Receipts",
    glyph: "▤",
    shortcut: "Ctrl+7",
    tagline: "Proof of work. Shareable as artifact.",
  },
  {
    id: "privacy",
    name: "Privacy",
    glyph: "◆",
    shortcut: "Ctrl+8",
    tagline: "Every API call audited. Air-gap on demand.",
  },
  {
    id: "skils",
    name: "Skils",
    glyph: "✦",
    shortcut: "Ctrl+9",
    tagline: "Skil.Ski marketplace via one MCP endpoint.",
  },
  {
    id: "settings",
    name: "Settings",
    glyph: "⚙",
    shortcut: "Ctrl+0",
    tagline: "Cockpit pin · keys · privacy · language · a11y.",
  },
  // v6.1.0 new lane — not in v5 handoff JSON; added here per spec
  {
    id: "agent",
    name: "Agent",
    glyph: "Æ›",
    shortcut: "Ctrl+A",
    tagline: "Multi-turn tool-using loop. 9 real tools.",
    isNew: true,
  },
];

export function LaneGrid() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::eleven lanes · one binary
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          What&apos;s in the box.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
          Hit the shortcut to jump lanes. 11 lanes from v5, plus Agent Mode
          shipping in v6.1.0. Everything runs inside one 4.98 MB Rust binary.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] sm:grid-cols-2 lg:grid-cols-4">
          {LANES.map((l) => (
            <div
              key={l.id}
              className={`group relative bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C] ${
                l.isNew ? "ring-1 ring-inset ring-[#22F0D5]/30" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className={`font-mono text-3xl leading-none ${
                    l.isNew ? "text-[#22F0D5]" : "text-[#22F0D5]"
                  }`}
                >
                  {l.glyph}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                  {l.shortcut}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-baseline gap-2">
                <h3 className="text-lg font-medium text-[#F2F4F5]">
                  {l.name}
                </h3>
                {l.isNew && (
                  <span className="rounded border border-[#22F0D5]/60 bg-[#22F0D5]/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[#22F0D5]">
                    NEW v6.1.0
                  </span>
                )}
                {l.replaces && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                    replaces {l.replaces}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {l.tagline}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#6B7779]">
          One binary. One panel. No Electron. No web app.{" "}
          <span className="font-mono text-[#F2F4F5]">4.98 MB</span> Rust egui
          binary, 35 MB portable zip, SHA-256{" "}
          <span className="font-mono text-[#9BA5A7]">4b1c857b…</span>
        </p>
      </div>
    </section>
  );
}
