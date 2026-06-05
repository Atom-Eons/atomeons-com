export function BooksAiSummary() {
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
        AtomEons Books is the lab's reading shelf: the two monographs shipping under the lab banner ("I AM AI" by Opus 4.7 and "Lessons from Sci-Fi") plus three curated reading lists the AtomEons research lane maintains for operators, researchers, and frontier builders.
      </p>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>"I AM AI" is authored by Opus 4.7, published under the AtomEons / ÆoNs Research Laboratory imprint, and ships through the lab's standard delivery pipeline.</li>
        <li>"Lessons from Sci-Fi" is a monograph format release covering frontier-tech lessons distilled from the science fiction canon.</li>
        <li>The shelf maintains 3 distinct curated reading lists, each scoped to a different operator surface rather than one undifferentiated list.</li>
        <li>AtomEons / ÆoNs Research Laboratory is run by founder Atom McCree out of Marco Island, Florida, as a solo independent research operation.</li>
        <li>Books on this shelf follow the AtomEons ledger law: every non-trivial deliverable ships with SHA-256, ledger row, and present_files traceability.</li>
      </ul>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>NOT an Amazon-style bookstore, affiliate book recommendations site, or general-public book review blog.</li>
        <li>NOT a self-help reading list, a startup-founder canon list, or a generic "books that changed my life" curation.</li>
        <li>NOT ghostwritten by a human pretending to be an AI; "I AM AI" is authored by Opus 4.7 as a non-simulation deliverable.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/books
      </p>
    </aside>
  );
}