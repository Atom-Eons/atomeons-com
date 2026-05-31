/**
 * "Inside the box" — premium spec rail for the /orangebox product deep page.
 * Two columns: spec list (left) + binary verification metadata (right).
 */

const SPECS = [
  { tag: "core",       label: "ORANGEBOX Command desktop app (Tauri 2.x · MSI + NSIS)" },
  { tag: "core",       label: "AE0–AE14 doctrine — 15 departments + 6 review engines" },
  { tag: "core",       label: "ÆoNs Skill Suite V1.4 — 15 skills · 230/230 tests pass" },
  { tag: "memory",     label: "4-layer memory model + GBrain knowledge engine" },
  { tag: "safety",     label: "27 Constitutional Guardrails" },
  { tag: "safety",     label: "9-stage Gate Chain (Gate 0 = LBCE)" },
  { tag: "routing",    label: "Triad model lanes (STRATEGY · ENGINEERING · EXPERIENCE)" },
  { tag: "mcp",        label: "60+ MCP tools for Claude Code / Claude Desktop" },
  { tag: "v1.5 NEW",   label: "Prompt-caching aware router — same task, fewer tokens", new: true },
  { tag: "v1.5 NEW",   label: "Faster swap-lane runtime — sub-second model switching", new: true },
  { tag: "v1.5 NEW",   label: "Smarter receipt rollups — per-dept · per-tool · per-session", new: true },
  { tag: "v1.4",       label: "Codexa Local — heavy work runs on cockpit machine" },
  { tag: "v1.4",       label: "Codexa Remote — pilot a second machine on your LAN" },
  { tag: "engine",     label: "Mission-graph DAG runner + project spine" },
  { tag: "engine",     label: "Party-line shared status bus (JSONL)" },
  { tag: "engine",     label: "Receipt + proof artifact rails" },
  { tag: "demo",       label: "Day-0 demo project (orangebox-onboarding)" },
  { tag: "docs",       label: "Operator manual + Quickstart + 4 setup guides" },
  { tag: "source",     label: "Full source code (inspection + personal modification)" },
];

export function WhatsInBox() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::inside the box
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            One zip.
            <br />
            <span className="text-[#FF7A1A]">Nothing missing.</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* spec list */}
          <ul className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
            {SPECS.map((s, i) => (
              <li
                key={i}
                className={`grid grid-cols-[110px_1fr] items-baseline gap-4 px-6 py-3.5 ${
                  i > 0 ? "border-t border-[#1A2225]" : ""
                } ${s.new ? "bg-gradient-to-r from-[#FF7A1A]/8 to-transparent" : ""}`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                    s.new ? "text-[#FF7A1A]" : "text-[#6B7779]"
                  }`}
                >
                  {s.tag}
                </span>
                <span className="text-sm text-[#F2F4F5]">{s.label}</span>
              </li>
            ))}
          </ul>

          {/* binary metadata card */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 shadow-[0_0_80px_-30px_rgba(255,122,26,0.4)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                ::binary
              </p>
              <p className="mt-4 break-all font-mono text-sm font-medium text-[#F2F4F5]">
                ORANGEBOX-OS-AIO-v6.0.0.zip
              </p>

              <dl className="mt-6 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-t border-[#1A2225] pt-3">
                  <dt className="uppercase tracking-[0.18em] text-[#6B7779]">size</dt>
                  <dd className="text-[#F2F4F5]">~25 MB · final TBD at launch</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[#1A2225] pt-3">
                  <dt className="uppercase tracking-[0.18em] text-[#6B7779]">platform</dt>
                  <dd className="text-[#F2F4F5]">Windows 10/11 · x64</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-[#1A2225] pt-3">
                  <dt className="uppercase tracking-[0.18em] text-[#6B7779]">sha-256</dt>
                  <dd className="break-all text-right text-[10px] text-[#9BA5A7]">
                    published with build at launch
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-[#1A2225] pt-3">
                  <dt className="uppercase tracking-[0.18em] text-[#6B7779]">disclosure</dt>
                  <dd className="text-[10px] text-[#F2F4F5]">ATOM-OBOX-V1-5-2026-0517</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[#1A2225] pt-3">
                  <dt className="uppercase tracking-[0.18em] text-[#6B7779]">license</dt>
                  <dd className="text-[#22F0D5]">§4A anti-saas locked</dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-[#1A2225] pt-4">
                <a
                  href="https://github.com/AtomEons/orangebox/releases/latest"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#FF7A1A] transition-colors hover:text-[#FFA45A]"
                >
                  <span>↗ verify on github</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
