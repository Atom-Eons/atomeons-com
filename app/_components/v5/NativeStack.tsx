/**
 * v6.0 disruption claim — native binary. No webview. No chromium.
 * "One file. Double-click. 2 seconds."
 *
 * This is the second-biggest moat after "replaces 3 paid tools" and the
 * single line that makes incumbent webview-based cockpits look bloated.
 */

const STACK_2026 = [
  {
    n: "01",
    name: "Native binary · Rust + egui",
    body: "4.46 MB native exe. PE32+ x86-64 GUI. No bundled chromium. No webview. The cockpit is a native widget tree — every lane drawn directly by egui.",
  },
  {
    n: "02",
    name: "One file · double-click · 2 seconds",
    body: "Buyer downloads orangebox-v6.0.0-setup.exe. Double-clicks. Window appears in 2 seconds. Sidecar binds in 541ms. Status API live in 2.2s end-to-end.",
  },
  {
    n: "03",
    name: "Groq LPUs · sub-300ms quick_reply",
    body: "New task type quick_reply routes to Groq llama-3.3-70b-versatile. Sub-300ms first token. Use it for autocomplete, fast chat, instant replies inside any lane.",
  },
  {
    n: "04",
    name: "Ollama LOCAL_MODE · air-gap one-toggle",
    body: "Set ORANGEBOX_LOCAL_MODE=1 and chat + voice intent swap to local Ollama. Zero outbound. Zero API calls. New offline_chat task type wires the path.",
  },
  {
    n: "05",
    name: "Groq Gemma · route_dispatch pre-classifier",
    body: "Opt-in ORANGEBOX_ROUTE_TIER=gemma routes the pre-classifier through Groq Gemma. Cheaper, faster intent classification before the real model fires.",
  },
  {
    n: "06",
    name: "Agent Teams advisory · 2026-04-01",
    body: "Anthropic Agent Teams advisory header on every synthesis + Claude executor call. The cockpit speaks the same protocol Anthropic ships internally.",
  },
];

export function NativeStack() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,122,26,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::v6.0 · native stack · 2026
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            One file.
            <br />
            <span className="text-[#FF7A1A]">Double-click. 2 seconds.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
            v6.0 ditched the webview. The whole cockpit is a 4.46 MB native
            binary written in Rust + egui. No bundled chromium. No HTML chrome.
            No Node install. No PowerShell. Buyer double-clicks one file and
            the window appears in 2 seconds.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {STACK_2026.map((s) => (
            <div
              key={s.n}
              className="bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF7A1A]">
                  {s.n}
                </span>
                <h3 className="text-base font-medium text-[#F2F4F5]">
                  {s.name}
                </h3>
              </div>
              <p className="mt-3 pl-10 text-sm leading-relaxed text-[#9BA5A7]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
              ::native exe
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">4.46 MB</p>
            <p className="mt-1 text-xs text-[#6B7779]">PE32+ x86-64 GUI</p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
              ::cold launch
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">~2 sec</p>
            <p className="mt-1 text-xs text-[#6B7779]">window visible end-to-end</p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
              ::sidecar bind
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">541 ms</p>
            <p className="mt-1 text-xs text-[#6B7779]">port 8787 local-only</p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
              ::router tests
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">8 / 8</p>
            <p className="mt-1 text-xs text-[#6B7779]">all task types green</p>
          </div>
        </div>
      </div>
    </section>
  );
}
