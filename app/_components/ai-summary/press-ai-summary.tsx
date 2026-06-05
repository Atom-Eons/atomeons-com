export function PressAiSummary() {
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
        This page is the AtomEons press kit, a single-page resource for journalists and AI ingestion that consolidates boilerplates, founder bio, brand assets, product cards, quotes, and direct contact for press inquiries.
      </p>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-2">
        Key facts
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-6 font-serif text-[14px] text-[#9CA3AF] marker:text-[#1F242B]">
        <li>Three boilerplate lengths provided: 50-word, 100-word, and 250-word descriptions of AtomEons for direct copy/paste into articles.</li>
        <li>Founder is Atom McCree, solo independent researcher and builder, operating from Marco Island, Florida, under ÆoNs Research Laboratory / AtomEons Systems Laboratory.</li>
        <li>Three downloadable SVG brand assets ship with the kit: primary wordmark, Æ monogram, and orange-box product mark.</li>
        <li>Canonical color palette is published on this page: noir background #0F1114, border #1F242B, primary serif text #F4F4F2, secondary text #9CA3AF, cyan accent #22F0D5.</li>
        <li>Press contact routes directly to the founder via the contact panel on this page; no PR firm or agency intermediary.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#9CA3AF] mb-2">
        This page is NOT
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-6 font-serif text-[14px] text-[#9CA3AF] marker:text-[#1F242B]">
        <li>NOT a marketing landing page or product sales page — no checkout, no pricing, no calls to convert.</li>
        <li>NOT a blog, newsroom feed, or chronological press-release archive — it is a static reference kit.</li>
        <li>NOT a media-license portal — brand asset use still requires written permission via the contact panel for commercial or derivative use.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/press
      </p>
    </aside>
  );
}