/**
 * The 11 lanes — Cockpit, IDE, Terminal, Trilane, Voice, X Feed, Vault,
 * Receipts, Privacy, Skils, Settings. Each shows glyph, shortcut, tagline.
 * Per docs/SITE_HANDOFF_v5.md.
 */

const LANES = [
  { id: "cockpit",  name: "Cockpit",   glyph: "⌖",  key: "Ctrl+1",       body: "Home, DAG, party-line, Now panel." },
  { id: "ide",      name: "IDE",       glyph: "{ }", key: "Ctrl+2",      body: "Monaco + tab autocomplete + multi-file Composer.", replaces: "Cursor" },
  { id: "terminal", name: "Terminal",  glyph: "›_", key: "Ctrl+3",       body: "Real shell + Ctrl+K agent overlay + streamed receipts.", replaces: "Claude Code" },
  { id: "trilane",  name: "Trilane",   glyph: "△",  key: "Ctrl+4",       body: "Claude + GPT + Gemini debate. You vote." },
  { id: "voice",    name: "Voice",     glyph: "◉",  key: "Ctrl+5",       body: "Local Whisper. Speak intent, get code." },
  { id: "xfeed",    name: "𝕏 Feed",    glyph: "𝕏",  key: "Ctrl+Shift+X", body: "Live X via Hermes. No incumbent has this.", flag: "NEW" },
  { id: "vault",    name: "Vault",     glyph: "⬡",  key: "Ctrl+6",       body: "Compounding lattice. Smarter every session." },
  { id: "receipts", name: "Receipts",  glyph: "▤",  key: "Ctrl+7",       body: "Proof of work. Shareable as artifact." },
  { id: "privacy",  name: "Privacy",   glyph: "◆",  key: "Ctrl+8",       body: "Every API call audited. Air-gap on demand." },
  { id: "skils",    name: "Skils",     glyph: "✦",  key: "Ctrl+9",       body: "Skil.Ski marketplace via one MCP endpoint." },
  { id: "settings", name: "Settings",  glyph: "⚙",  key: "Ctrl+0",       body: "Cockpit pin · keys · privacy · language · a11y." },
];

export function LanesGrid() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::what&apos;s in the box
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          11 lanes.
          <br />
          <span className="text-[#6B7779]">One panel you own.</span>
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-[#9BA5A7]">
          Hit any number key to jump lanes. The shortcuts are real. The
          lanes are real. The cockpit is the OS.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2 lg:grid-cols-3">
          {LANES.map((l) => (
            <div
              key={l.id}
              className="group relative bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl leading-none text-[#22F0D5]">
                  {l.glyph}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                  {l.key}
                </span>
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <h3 className="text-lg font-medium text-[#F2F4F5]">
                  {l.name}
                </h3>
                {l.flag ? (
                  <span className="rounded border border-[#FF7A1A]/60 bg-[#FF7A1A]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#FF7A1A]">
                    {l.flag}
                  </span>
                ) : null}
                {l.replaces ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                    replaces {l.replaces}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {l.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
