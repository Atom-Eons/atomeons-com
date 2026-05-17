const BUY_IF = [
  ["You're a solo founder running multi-disciplinary work alone", "Multiple models, multiple machines, real artifacts moving daily."],
  ["You're a PM or tech lead who needs a private cockpit", "Not another SaaS dashboard. Not another seat to license."],
  ["You're a researcher or lab lead who wants receipt-backed work", "Every meaningful action gets a receipt. Default-on."],
  ["You're an indie consultant billing high-leverage hours", "Stop losing the thread between client sessions."],
  ["You believe receipts > vibes", "No fake green. Every claim has a path."],
];

const DONT_IF = [
  ["You want a generic chat-app clone", "ChatGPT and Claude already do that. This is different shape."],
  ["You want a SaaS dashboard with cloud sync", "Local-first by design. Your data does not leave your machine."],
  ["You want managed support or onboarding", "30 days direct founder support. After that, the manual is the support."],
  ["You expect a magic AI button", "This is a cockpit. The operator commands. The model executes."],
  ["You're on macOS / Linux / ARM64 today", "Windows 10/11 x64 only. Other platforms on v1.6 roadmap."],
  ["You're evaluating for a buying committee", "$49 one-time. Nothing to evaluate at scale."],
];

export function Qualification() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::qualification
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Built for one operator.
            <br />
            <span className="text-[#6B7779]">Not for everyone.</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* buy if */}
          <div className="rounded-2xl border border-[#22F0D5]/40 bg-gradient-to-b from-[#0A1A1C] to-[#0A0F11] p-8 shadow-[0_0_80px_-40px_rgba(34,240,213,0.4)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::buy this if
            </p>
            <ul className="mt-6 space-y-1">
              {BUY_IF.map(([head, body]) => (
                <li key={head} className="rounded transition-colors hover:bg-black/40">
                  <details className="group">
                    <summary className="cursor-pointer list-none px-2 py-2.5 text-sm text-[#F2F4F5] marker:hidden">
                      <span className="mr-2 font-mono text-[#22F0D5]">▲</span>
                      {head}
                    </summary>
                    <p className="px-7 pb-3 text-xs leading-relaxed text-[#9BA5A7]">
                      {body}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

          {/* dont if */}
          <div className="rounded-2xl border border-[#FF7A1A]/30 bg-gradient-to-b from-[#1C0F08] to-[#0A0F11] p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              ::do not buy this if
            </p>
            <ul className="mt-6 space-y-1">
              {DONT_IF.map(([head, body]) => (
                <li key={head} className="rounded transition-colors hover:bg-black/40">
                  <details className="group">
                    <summary className="cursor-pointer list-none px-2 py-2.5 text-sm text-[#F2F4F5] marker:hidden">
                      <span className="mr-2 font-mono text-[#FF7A1A]">■</span>
                      {head}
                    </summary>
                    <p className="px-7 pb-3 text-xs leading-relaxed text-[#9BA5A7]">
                      {body}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
