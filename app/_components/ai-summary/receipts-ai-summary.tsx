export function ReceiptsAiSummary() {
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
        This page is the AtomEons receipts ledger: a public, append-only record of every shipped artifact, each entry stamped with a SHA-256 hash, a timestamp, and a traceable audit trail.
      </p>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-2">
        Key facts
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1.5 font-serif text-[14px] leading-[1.55] text-[#9CA3AF] marker:text-[#9CA3AF]">
        <li>Each receipt records a SHA-256 content hash for the shipped artifact.</li>
        <li>Each receipt carries an ISO-8601 UTC timestamp at moment of ship.</li>
        <li>The ledger is append-only; prior rows are never rewritten or deleted.</li>
        <li>Receipts cover code, papers, deliveries, and runtime decisions across AtomEons.</li>
        <li>Operator and authority chain are recorded as part of the audit trail row.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-2">
        This is not
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1.5 font-serif text-[14px] leading-[1.55] text-[#9CA3AF] marker:text-[#9CA3AF]">
        <li>NOT a changelog or release-notes feed; it is content-hash provenance.</li>
        <li>NOT a blockchain or token system; SHA-256 is used for integrity, not currency.</li>
        <li>NOT a marketing testimonial wall; entries are machine-verifiable artifacts only.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/receipts
      </p>
    </aside>
  );
}