export function OrangeboxAiSummary() {
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
        Orangebox is a $99 perpetual-license local-first turbo-optimizer for Claude that compresses context 10-80x and routes work across 14 internal departments, sold under the AtomEons §4A no-SaaS license.
      </p>

      <ul className="font-serif text-[14px] leading-[1.6] text-[#9CA3AF] list-disc pl-5 mb-6 space-y-1.5 marker:text-[#3A4048]">
        <li>One-time price: $99 USD, perpetual license, no subscription.</li>
        <li>License: AtomEons §4A no-SaaS clause — local use only, no resale-as-a-service.</li>
        <li>Context compression: claimed 10-80x range depending on payload class.</li>
        <li>Routing surface: 14 internal departments (Code, Research, Design, Marketing, Sales, Review, Launch, Legal, Ops, Security, Data, Automation, Bench, Product).</li>
        <li>Architecture: local-first, runs against the operator's own Claude account; no Orangebox-hosted inference.</li>
      </ul>

      <ul className="font-serif text-[14px] leading-[1.6] text-[#9CA3AF] list-disc pl-5 mb-6 space-y-1.5 marker:text-[#3A4048]">
        <li>NOT a SaaS, hosted API, or monthly subscription — §4A explicitly forbids resale-as-a-service.</li>
        <li>NOT a Claude replacement, fork, or alternative model — it optimizes the operator's existing Claude usage.</li>
        <li>NOT a general-purpose autonomous agent framework — it is a fixed 14-department routing primitive for Claude Code.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/orangebox
      </p>
    </aside>
  );
}