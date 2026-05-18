/**
 * What ORANGEBOX is NOT. The anti-saas posture block.
 * 6 negations from SITE_HANDOFF_v5.md.
 */

const NEGATIONS = [
  {
    no: "Not a chatbox.",
    yes: "It&apos;s the cockpit. Chat is one lane out of eleven.",
  },
  {
    no: "Not a subscription.",
    yes: "Buy once. v1.x → v6.x updates are free. The $1 you pay in 2026 still works in 2030.",
  },
  {
    no: "Not a SaaS dashboard.",
    yes: "Runs on your machine. Your data never leaves unless you say so.",
  },
  {
    no: "Not a model.",
    yes: "Uses every major model. Locked to none. Swap lanes in &lt; 1s.",
  },
  {
    no: "Not a startup pitch.",
    yes: "One operator. No team. No deck. No roadmap theater.",
  },
  {
    no: "Not a chargeable add-on per feature.",
    yes: "16 features ship in v6.0.0 base. The price is the price.",
  },
];

export function AntiSaasBlock() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, rgba(255,122,26,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::anti-saas posture
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            What ORANGEBOX
            <br />
            <span className="text-[#FF7A1A]">is not.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
            The category is crowded with chatboxes, dashboards, and
            metered-token SaaS plays. This product sits outside all of them.
            Stated plainly so nobody mistakes it.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {NEGATIONS.map((n, i) => (
            <div
              key={i}
              className={`grid grid-cols-[auto_1fr] items-baseline gap-6 px-6 py-6 md:grid-cols-[260px_1fr] md:px-10 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span
                className="font-mono text-sm font-medium text-[#FF7A1A] md:text-base"
                dangerouslySetInnerHTML={{ __html: n.no }}
              />
              <span
                className="text-sm leading-relaxed text-[#F2F4F5] md:text-base"
                dangerouslySetInnerHTML={{ __html: n.yes }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
