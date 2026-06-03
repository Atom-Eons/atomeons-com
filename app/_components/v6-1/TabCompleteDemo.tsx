/**
 * TabCompleteDemo — IDE tab autocomplete feature section.
 * Server component.
 * Source of truth: docs/RELEASE_NOTES_v6.1.0.md
 */

// Real code lines shown in the IDE mock
const CODE_LINES = [
  { n: 1,  text: "async function indexWorkspace(root: string) {" },
  { n: 2,  text: "  const files = await glob('**/*', { cwd: root });" },
  { n: 3,  text: "  return files.filter(f => !SKIP.some(s => f.includes(s)));" },
];

// Ghost suggestion — 4th line, not yet accepted
const GHOST_LINE = "  return buildIndex(files, { symbols: true });";

const KEYS = [
  { key: "Ctrl+Space", action: "Request completion based on current buffer" },
  { key: "Tab",        action: "Accept ghost text — appends to buffer" },
  { key: "Esc",        action: "Reject and dismiss ghost text" },
];

export function TabCompleteDemo() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F11] py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(50% 50% at 30% 100%, rgba(34,240,213,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">

          {/* left: IDE mock */}
          <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-black shadow-[0_0_80px_-30px_rgba(34,240,213,0.18)]">
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-[#1A2225] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#22F0D5]/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22F0D5]/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22F0D5]/15" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                repo-indexer.ts · ide lane · ctrl+2
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22F0D5]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#22F0D5]">
                  suggestion ready
                </span>
              </span>
            </div>

            {/* code area */}
            <div className="overflow-x-auto">
              <pre className="min-w-[420px] p-5 font-mono text-sm leading-relaxed">
                {/* real lines */}
                {CODE_LINES.map((l) => (
                  <div key={l.n} className="flex gap-4">
                    <span className="w-5 shrink-0 select-none text-right text-[#1A2225]">
                      {l.n}
                    </span>
                    <span className="text-[#F2F4F5]">{l.text}</span>
                  </div>
                ))}

                {/* ghost line */}
                <div className="relative flex gap-4">
                  <span className="w-5 shrink-0 select-none text-right text-[#1A2225]">
                    4
                  </span>
                  <span
                    className="text-[#22F0D5]/50 italic"
                    title="Ghost text — press Tab to accept, Esc to reject"
                  >
                    {GHOST_LINE}
                  </span>
                  {/* cursor blink */}
                  <span
                    aria-hidden
                    className="absolute left-8 top-0 h-full w-px animate-pulse bg-[#22F0D5]"
                    style={{ marginLeft: "1ch" }}
                  />
                </div>
              </pre>
            </div>

            {/* ghost preview strip */}
            <div className="border-t border-[#1A2225] bg-[#0A0F11] px-5 py-3">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                  ghost:
                </span>
                <span className="font-mono text-xs text-[#22F0D5]/70 italic">
                  {GHOST_LINE}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4">
                {KEYS.map((k) => (
                  <span key={k.key} className="flex items-center gap-1.5">
                    <kbd className="rounded border border-[#1A2225] bg-[#101A1C] px-2 py-0.5 font-mono text-[10px] text-[#F2F4F5]">
                      {k.key}
                    </kbd>
                    <span className="font-mono text-[10px] text-[#6B7779]">
                      {k.action}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* right: copy */}
          <div className="lg:sticky lg:top-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
              ::tab complete · cursor-killer
            </p>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
              Ghost text.
              <br />
              <span className="text-[#22F0D5]">Haiku-fast. Local cache.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#9BA5A7]">
              Real inline ghost-text completion in the IDE lane. Claude Haiku 4.5
              — the right tier for autocomplete: fast, cheap, precise. First
              suggestion is immediate; repeated requests cost nothing.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-2xl font-semibold tabular-nums text-[#22F0D5]">
                  &lt;100ms
                </p>
                <p className="mt-1 text-xs text-[#6B7779]">when cached</p>
              </div>
              <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-2xl font-semibold tabular-nums text-[#F2F4F5]">
                  30s
                </p>
                <p className="mt-1 text-xs text-[#6B7779]">cache TTL</p>
              </div>
              <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-2xl font-semibold tabular-nums text-[#22F0D5]">
                  $0
                </p>
                <p className="mt-1 text-xs text-[#6B7779]">on cache hit</p>
              </div>
            </div>

            <p className="mt-10 text-sm leading-relaxed text-[#6B7779]">
              Receipts on every completion. Audited in the privacy lane. The
              cache is keyed on your context — repeated edits in the same file
              re-use the same suggestion at zero token cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
