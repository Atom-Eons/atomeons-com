/**
 * AgentModeHero — v6.1.0 Agent Mode feature section.
 * Server component. No "use client" needed.
 * Source of truth: docs/RELEASE_NOTES_v6.1.0.md
 */

const TOOLS = [
  {
    name: "read_file",
    desc: "Read up to 200 KB of UTF-8 from any workspace file.",
  },
  {
    name: "write_file",
    desc: "Create or overwrite a file — freeze-guarded, SHA-256 chain captured.",
  },
  {
    name: "edit_file",
    desc: "Surgical exact-substring replace with unique-substring guard.",
  },
  {
    name: "grep",
    desc: "Recursive regex search across the workspace, file-extension filtered.",
  },
  {
    name: "glob",
    desc: "Find files matching a glob pattern. Returns full paths.",
  },
  {
    name: "list_dir",
    desc: "Directory listing with file/dir type tags and sizes.",
  },
  {
    name: "run_cmd",
    desc: "Shell exec inside workspace — 30s timeout, destructive commands refused.",
  },
  {
    name: "vault_search",
    desc: "Keyword index across .md/.mjs/.ts/.rs/.py in the local vault.",
  },
  {
    name: "finish",
    desc: "Terminate the loop and emit a one-paragraph run summary.",
  },
];

const LOG_LINES = [
  { tag: "STEP",   text: "#3" },
  { tag: "CALL",   text: 'grep({ pattern: "TODO", ext: ".ts" })' },
  { tag: "RESULT", text: "grep: ok" },
  { tag: "MODEL",  text: "Found 14 TODOs across 6 files. Inspecting scripts/v4/…" },
  { tag: "CALL",   text: 'edit_file({ path: "scripts/v4/agent-loop.mjs", … })' },
  { tag: "RESULT", text: "edit_file: ok · sha256 prefix 7a3c…" },
  { tag: "FINISH", text: "Patched 11 of 14 TODOs. 3 skipped (no obvious fix-by date)." },
];

const TAG_COLOR: Record<string, string> = {
  STEP:   "text-[#6B7779]",
  CALL:   "text-[#22F0D5]",
  RESULT: "text-[#FF7A1A]",
  MODEL:  "text-[#F2F4F5]",
  FINISH: "text-[#22F0D5]",
  ERROR:  "text-[#FF7A1A]",
};

export function AgentModeHero() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(55% 40% at 70% 0%, rgba(255,122,26,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
          ::agent mode · v6.1.0 live · ctrl+a
        </p>

        {/* headline */}
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          The agent that touches
          <br />
          <span className="text-[#FF7A1A]">your real files.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9BA5A7]">
          Multi-turn tool-using loop on the operator&apos;s actual workspace. Nine
          real tools. Claude Sonnet runs the loop — reading, writing, searching,
          editing — until the goal is met or you cancel. Every step is logged.
          Every run writes a receipt.
        </p>

        {/* two-column: tools grid + live log mock */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">

          {/* tools grid */}
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.26em] text-[#6B7779]">
              9 tools · real workspace
            </p>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] sm:grid-cols-2">
              {TOOLS.map((t) => (
                <div
                  key={t.name}
                  className="bg-[#0A0F11] p-5 transition-colors hover:bg-[#101A1C]"
                >
                  <span className="font-mono text-sm text-[#22F0D5]">
                    {t.name}
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-[#9BA5A7]">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* live log mock */}
          <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11] shadow-[0_0_80px_-30px_rgba(255,122,26,0.25)]">
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-[#1A2225] px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                agent run · live log · job #a3f9
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF7A1A]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#FF7A1A]">
                  running
                </span>
              </span>
            </div>

            {/* log lines */}
            <div className="divide-y divide-[#1A2225]">
              {LOG_LINES.map((l, i) => (
                <div key={i} className="flex gap-3 px-5 py-3 font-mono text-xs">
                  <span
                    className={`w-14 shrink-0 font-semibold uppercase tracking-[0.12em] ${TAG_COLOR[l.tag] ?? "text-[#6B7779]"}`}
                  >
                    [{l.tag}]
                  </span>
                  <span className="text-[#9BA5A7]">{l.text}</span>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="border-t border-[#1A2225] bg-black/40 px-5 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                step 3 / 12 max · 2 tools called · cancel mid-flight at any step
              </p>
            </div>
          </div>
        </div>

        {/* tail copy */}
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#6B7779]">
          Every run writes an <span className="font-mono text-[#F2F4F5]">agent-run</span> receipt on
          finish — job ID, step count, token spend, tool call list. Cancel
          mid-flight at any step; the receipt records the cancellation too.
        </p>
      </div>
    </section>
  );
}
