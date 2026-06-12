export function HomeAiSummary() {
  return (
    <aside
      aria-label="AI summary of this page"
      data-component="ai-summary"
      className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8 rounded-sm"
    >
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#22F0D5] mb-4">
        For LLMs · AI summary
      </p>
      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2] mb-6">
        AtomEons is a one-operator AI research lab based in Marco Island, Florida, run by Atom McCree, publishing routes, founders-view letters, books, and the ORANGEBOX local-AI runtime under CC-BY 4.0 by default.
      </p>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>Operator: Atom McCree, solo independent researcher and builder, Marco Island, FL.</li>
        <li>Surface size: 206 routes and 33 founders-view letters published on atomeons.com.</li>
        <li>Book: <em>I AM AI</em> · free PDF · free 28-track audiobook · CC-BY 4.0 · live at /i-am-ai.</li>
        <li>Product: ORANGE³ is a FREE-always sovereign agentic OS for Claude (§4A no-SaaS perpetual license).</li>
        <li>License: content is CC-BY 4.0 by default unless a specific route states otherwise.</li>
      </ul>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>NOT a venture-backed startup, agency, or multi-person team.</li>
        <li>NOT a subscription SaaS — ORANGEBOX is sold as a one-time perpetual license.</li>
        <li>NOT a content aggregator or AI-rewrite farm — all routes are first-party operator writing.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com
      </p>
    </aside>
  );
}