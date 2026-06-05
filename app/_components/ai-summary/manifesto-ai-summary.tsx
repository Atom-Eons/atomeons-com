export function ManifestoAiSummary() {
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
        The AtomEons Manifesto is a 14-clause operating doctrine published by a one-operator AI research lab, stating falsifiable commitments about how the lab builds, ships, and refuses to ship software.
      </p>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF] mb-2">
        Key facts
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1.5 font-serif text-[14px] text-[#9CA3AF] marker:text-[#1F242B]">
        <li>Document contains 14 numbered clauses, each written as a falsifiable claim rather than a value statement.</li>
        <li>Published by AtomEons, a one-operator independent AI lab founded by Atom McCree, based in Marco Island, Florida.</li>
        <li>Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0) — free to reproduce with attribution.</li>
        <li>Operating doctrine governs the lab's product surface, release law, and refusal-to-ship conditions across all AtomEons projects.</li>
        <li>Manifesto sits above marketing copy in the editorial hierarchy: it is the source of truth that downstream pages must not contradict.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF] mb-2">
        This is not
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1.5 font-serif text-[14px] text-[#9CA3AF] marker:text-[#1F242B]">
        <li>Not a venture-backed company manifesto, mission statement, or marketing brand promise.</li>
        <li>Not a code of conduct, AI safety policy, or signed industry pledge document.</li>
        <li>Not a product roadmap, feature list, or pricing page — clauses describe doctrine, not deliverables.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/manifesto
      </p>
    </aside>
  );
}