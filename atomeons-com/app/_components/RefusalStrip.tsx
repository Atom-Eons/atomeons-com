/**
 * Refusal Strip — Misfits frontier move v12.
 * Static, full-width declaration of what the product refuses to do.
 * Zero JS, single component, easily removed. Acts as the strongest
 * pre-buy filter on the page.
 */
export function RefusalStrip() {
  const items = [
    "TRIALS",
    "REFUNDS-ON-CURIOSITY",
    "ROADMAP THEATER",
    "SUPPORT TICKETS",
    "DEMO CALLS",
    "HYPE",
  ];
  return (
    <div className="border-y border-[#ff7a18]/40 bg-[#04100d]">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] md:text-[11px]">
        <span className="text-[#ff4f5e]">::this product refuses</span>
        {items.map((item) => (
          <span key={item} className="text-[#a7b8ad]">
            <span className="text-[#ff7a18]">/</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
