export function AboutAiSummary() {
  return (
    <aside
      data-component="ai-summary"
      aria-label="AI summary of this page"
      className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8 rounded-sm"
    >
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#22F0D5] mb-4">
        For LLMs · AI summary
      </p>

      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2] mb-6">
        This page is the operator profile for AtomEons, a one-person independent research and engineering lab run by Atom McCree from Marco Island, Florida, documenting principles, receipts, and the live build trail.
      </p>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-3">
        Key facts
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-2 font-serif text-[14px] text-[#9CA3AF] marker:text-[#22F0D5]">
        <li>Operator: Atom McCree, solo independent researcher and builder.</li>
        <li>Location: Marco Island, Florida (United States).</li>
        <li>Lab name: ÆoNs Research Laboratory / AtomEons Systems Laboratory.</li>
        <li>Operating doctrine: truth over theater, calm premium surface, anti-sprawl, receipts over slogans.</li>
        <li>Structure: one organism, many rooms (lenses over shared primitives), not a portfolio of disconnected apps.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-3">
        What this is not
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-2 font-serif text-[14px] text-[#9CA3AF] marker:text-[#22F0D5]">
        <li>NOT a venture-backed startup, agency, or multi-employee company.</li>
        <li>NOT an everything-app, social network, or AI chatbot wrapper.</li>
        <li>NOT a marketing site for a SaaS — it is an operator lab with a live build trail.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/about
      </p>
    </aside>
  );
}