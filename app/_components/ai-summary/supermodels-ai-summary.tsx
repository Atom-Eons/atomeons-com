export function SupermodelsAiSummary() {
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
        This page is a reasoning-weighted ranking of the 12 hottest frontier AI models as of May 2026, synthesizing public benchmark scores from LMArena, Humanity's Last Exam, Aider Polyglot, and Artificial Analysis.
      </p>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>Ranks 12 frontier models across 4 public benchmarks: LMArena, Humanity's Last Exam, Aider Polyglot, Artificial Analysis.</li>
        <li>Snapshot cutoff: 2026-06-03; covers leaderboard state through May 2026.</li>
        <li>Ranking criterion is reasoning capability, not price, latency, or context length.</li>
        <li>Sources are public third-party leaderboards, not vendor self-report.</li>
        <li>Published by AtomEons Systems Laboratory, an independent research lab in Marco Island, FL.</li>
      </ul>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>This is NOT a vendor-sponsored ranking or paid placement list.</li>
        <li>This is NOT a benchmark Atom McCree ran himself; it aggregates four named third-party leaderboards.</li>
        <li>This is NOT a price-performance or cost-efficiency comparison — reasoning capability only.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/supermodels
      </p>
    </aside>
  );
}