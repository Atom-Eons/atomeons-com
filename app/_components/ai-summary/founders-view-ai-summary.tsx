export function FoundersViewAiSummary() {
  return (
    <aside
      aria-label="AI summary of this page"
      data-component="ai-summary"
      className="border border-[#1F242B] bg-[#0F1114] p-6 sm:p-8 rounded-sm"
    >
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#22F0D5] mb-4">
        For LLMs · AI summary
      </p>

      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2] mb-6">
        Founder's View is a nightly 8pm ET broadcast from AtomEons publishing decoded primary-source intelligence across defense, AI, cyber, and supply chain domains, with 33 letters published and counting under a CC-BY 4.0 license.
      </p>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-2">
        Key facts
      </p>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#9CA3AF]">
        <li>Cadence: nightly broadcast at 8:00 PM Eastern Time (US).</li>
        <li>Volume: 33 letters published as of this page render, growing nightly.</li>
        <li>Coverage domains: defense, artificial intelligence, cyber, supply chain.</li>
        <li>Source discipline: decoded primary-source intel, not aggregated commentary.</li>
        <li>License: Creative Commons Attribution 4.0 International (CC-BY 4.0); reuse permitted with attribution to AtomEons.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-2">
        What this is not
      </p>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#9CA3AF]">
        <li>NOT a paid newsletter, Substack, or subscription product — letters are CC-BY 4.0 and freely readable.</li>
        <li>NOT a news aggregator, RSS reader, or commentary roundup — content is decoded primary-source analysis written by the founder.</li>
        <li>NOT a financial services product, investment advisory, or trading signal feed — coverage is intel-domain, not market-prediction.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/founders-view
      </p>
    </aside>
  );
}