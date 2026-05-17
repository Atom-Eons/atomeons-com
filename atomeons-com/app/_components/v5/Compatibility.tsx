export function Compatibility() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::compatibility
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Will this run on your machine?
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {/* required */}
          <div className="bg-[#0A0F11] p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              required
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "Windows 10 or Windows 11 (x64)",
                "Node.js 20+ (free download · linked in installer)",
                "4 GB RAM minimum (8 GB recommended)",
                "200 MB free disk space",
                "One-time internet for Node.js download",
              ].map((req) => (
                <li
                  key={req}
                  className="flex items-baseline gap-3 text-sm text-[#F2F4F5]"
                >
                  <span className="font-mono text-[#22F0D5]">▲</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* optional */}
          <div className="bg-[#0A0F11] p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              optional · advanced
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#9BA5A7]">
              <li>
                <span className="text-[#F2F4F5]">A Claude or GPT API key</span> —
                routes work to a frontier model. Cockpit boots and UI works
                without it; routed actions report FAILED honestly.
              </li>
              <li>
                <span className="text-[#F2F4F5]">Ollama</span> with quantized
                local models (free) for the triad lanes.
              </li>
              <li>
                <span className="text-[#F2F4F5]">Codexa Remote</span> — second
                machine on your LAN. v1.4+ default is Local — single machine
                works.
              </li>
              <li>
                <span className="text-[#F2F4F5]">n8n</span> for cross-app
                automation hooks.
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-sm text-[#6B7779]">
          <span className="text-[#F2F4F5]">macOS / Linux</span> on the v1.6
          roadmap. <span className="text-[#F2F4F5]">ARM64</span> not yet.{" "}
          <span className="text-[#F2F4F5]">Win 7/8</span> not supported.
        </p>

        <details className="mt-6 max-w-3xl rounded-lg border border-[#1A2225] bg-[#0A0F11] p-5 text-sm text-[#9BA5A7]">
          <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779] transition-colors hover:text-[#22F0D5]">
            ::install &amp; delivery notes (read after purchase)
          </summary>
          <div className="mt-4 space-y-3 leading-relaxed">
            <p>
              <span className="text-[#FF7A1A]">SmartScreen.</span> Installer is
              unsigned (code-signing on v1.6 roadmap). Windows SmartScreen will
              warn "unknown publisher" — click{" "}
              <strong className="text-[#F2F4F5]">More info</strong> →{" "}
              <strong className="text-[#F2F4F5]">Run anyway</strong>. Normal for
              indie software.
            </p>
            <p>
              <span className="text-[#FF7A1A]">Download.</span> Your link
              appears on the success page after payment. Save it before you
              close the tab. Email delivery is a backup, not a guarantee.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
