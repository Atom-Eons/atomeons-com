const ITEMS = [
  {
    head: "Local-first",
    body: "No telemetry, no analytics, no phone-home. Project state lives in %APPDATA%. The cockpit physically cannot transmit your data.",
    tag: "license §3",
  },
  {
    head: "Source included",
    body: "Full source tree alongside the binaries. Inspect freely. Modify for personal use. No black box.",
    tag: "license §5",
  },
  {
    head: "Material-failure refund",
    body: "Full refund within 30 days if it doesn't install/launch on clean Windows 10/11 + Node 20+.",
    tag: "license §8",
  },
  {
    head: "Workflow-fit refund",
    body: "Within 30 days, full refund if it doesn't fit your workflow. No questions.",
    tag: "license §8A",
  },
  {
    head: "Anti-SaaS clause",
    body: "ORANGEBOX will never move to monthly billing. If we ever try, every existing buyer keeps their license free in perpetuity.",
    tag: "license §4A",
  },
  {
    head: "Built by one operator",
    body: "Atom McCree, AtomEons Systems Laboratory, Marco Island, FL. Two months of internal use before anyone else touched it.",
    tag: "manifest",
  },
];

export function TrustGrid() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::trust signals
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Receipts, not promises.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <div
              key={it.head}
              className="group relative bg-[#0A0F11] p-8 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-medium text-[#F2F4F5]">
                  {it.head}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]/70">
                  {it.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {it.body}
              </p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#22F0D5] to-transparent opacity-0 transition-opacity group-hover:opacity-40"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
