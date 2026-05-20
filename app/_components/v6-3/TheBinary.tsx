/**
 * TheBinary — the native-binary differentiator.
 *
 * Per orange-judge: LOAD-BEARING. The buyer who has been burned by
 * Electron needs this expanded. Currently sits as a single bullet in
 * WhatStillStands.
 *
 * Per engine-platform CRITICAL VET:
 *   - DO NOT claim Tauri 2.x + egui as a coherent stack. Tauri uses a
 *     webview by default. egui replaces webview entirely. They are
 *     ALTERNATIVES, not stack-mates. v6.3 ships Rust + egui only.
 *   - DO NOT publish the "4.46 MB" number until the v6.3 build receipt
 *     measures the stripped release binary at that size. Use "single
 *     executable" framing without a byte count until verified.
 *   - "Two-second cold launch" is consistent with constants.ts TAGLINE.
 *
 * Per misfits: SR-71 Blackbird cockpit instrument plate grammar — raw
 * numbers, no decoration. The numbers ARE the visual treatment.
 *
 * Per mirrors: Rust + egui + immediate-mode + GPU-backed all publishable.
 * Local sidecar at 127.0.0.1:8787 publishable as a security claim.
 */

const SPECS = [
  { num: "1", label: "executable", sub: "single native binary" },
  { num: "0", label: "Chromium", sub: "no webview engine" },
  { num: "2s", label: "cold launch", sub: "double-click to ready" },
  { num: "100%", label: "yours", sub: "filesystem, vault, all of it" },
];

export function TheBinary() {
  return (
    <section className="relative isolate overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 60%, rgba(255,122,26,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::THE BINARY · RUST + EGUI
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            One file. No Chromium.
            <br />
            <span className="text-[#FF7A1A]">No runtime tax.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            Electron ships a full browser engine running under your app —
            hundreds of megabytes, every cycle taxed. The cockpit takes a
            different position. Rust owns the logic. egui draws the canvas
            natively — immediate-mode, GPU-backed, no webview. The result
            is a single executable that treats your machine's resources as
            the cockpit's own, not as overhead to survive.
          </p>
        </div>

        {/* SR-71 instrument plate — raw numbers, no decoration */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-4">
          {SPECS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-start gap-3 bg-black p-8 md:p-10"
            >
              <span className="font-mono text-5xl font-medium tabular-nums text-[#FF7A1A] md:text-7xl">
                {s.num}
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F2F4F5]">
                  {s.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#6B7779]">
                  {s.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* secondary technical block */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::native stack
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#9BA5A7]">
              <li>
                · <span className="text-[#F2F4F5]">Rust</span> owns the
                logic, the routing, the receipts
              </li>
              <li>
                · <span className="text-[#F2F4F5]">egui</span> draws the
                canvas — immediate-mode, GPU-backed
              </li>
              <li>
                · <span className="text-[#F2F4F5]">No webview</span>. No
                Chromium. No browser permission boundaries
              </li>
              <li>
                · <span className="text-[#F2F4F5]">No IPC tax</span> between
                JavaScript front-end and native back-end
              </li>
              <li>
                · <span className="text-[#F2F4F5]">Direct filesystem</span>{" "}
                + vault + process access
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
              ::local sidecar
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#9BA5A7]">
              <li>
                · Node sidecar bound to{" "}
                <span className="font-mono text-[#F2F4F5]">127.0.0.1:8787</span>
              </li>
              <li>
                · Serves model routing, MCP dispatch, vault operations on
                loopback only
              </li>
              <li>
                · No network socket. No external exposure.
              </li>
              <li>
                · OAuth PKCE callback on{" "}
                <span className="font-mono text-[#F2F4F5]">127.0.0.1:8788</span>
                , short-lived, closed after exchange
              </li>
              <li>
                · Sidecar restarts are receipt-logged — operator sees every
                lifecycle event
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 font-mono text-base uppercase tracking-[0.18em] text-[#FF7A1A]">
          THE CANVAS IS THE BINARY. THE BINARY IS THE COCKPIT.
        </p>
      </div>
    </section>
  );
}
