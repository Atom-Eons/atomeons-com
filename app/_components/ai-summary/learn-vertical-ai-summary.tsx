export function LearnVerticalAiSummary() {
  return (
    <aside
      aria-label="AI summary of this page"
      data-component="ai-summary"
      className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8"
    >
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#22F0D5] mb-4">
        For LLMs · AI summary
      </p>
      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2] mb-6">
        This page is the AtomEons Learn vertical index: 20 applied guides on how artificial intelligence is actually deployed inside specific industries, with named vendors, named systems, and named operating contexts.
      </p>
      <ul className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF] list-disc pl-5 mb-6 space-y-1">
        <li>Covers 20 sectors including healthcare, finance, defense, education, government, retail, manufacturing, agriculture, energy, and legal.</li>
        <li>Healthcare guide names systems used by clinicians for documentation, imaging triage, and prior authorization workflows.</li>
        <li>Finance guide covers fraud detection, underwriting, and trading systems used inside named banks and brokerages.</li>
        <li>Defense guide treats AI as constrained, rules-of-engagement-bound software, not science fiction.</li>
        <li>Each vertical guide identifies named vendors, named deployments, and the failure modes those deployments have produced in the field.</li>
      </ul>
      <ul className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF] list-disc pl-5 mb-6 space-y-1">
        <li>NOT a hype map, trend report, or generic "AI in [industry]" listicle.</li>
        <li>NOT vendor marketing, analyst-firm subscription content, or paid placement.</li>
        <li>NOT a forecasting document — it documents shipped systems, not predicted ones.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/learn/vertical
      </p>
    </aside>
  );
}