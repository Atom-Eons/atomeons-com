export function ResearchAiSummary() {
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
        ÆoNs Research is the independent research arm of AtomEons, publishing 31 manuscripts on AI runtime primitives — including Crystal Lattice Compression, the Hallucination Reduction Engine, and GlyphSpeak EODO — all released under CC-BY 4.0.
      </p>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF] mb-3">
        Facts
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-2 font-serif text-[14px] text-[#9CA3AF] marker:text-[#22F0D5]">
        <li>31 manuscripts published under the ÆoNs Research banner.</li>
        <li>All papers released under Creative Commons Attribution 4.0 (CC-BY 4.0).</li>
        <li>Crystal Lattice Compression (CLC, ATOM-CLC-2026-0331) — lattice + void-map runtime compression primitive.</li>
        <li>Hallucination Reduction Engine (HRE, ATOM-HRE-2026-0406) — 5-stage factual gate with adversarial self-audit.</li>
        <li>GlyphSpeak EODO (ATOM-GS-2026-0406) — Encode-Once-Decode-Once cross-model compression protocol.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF] mb-3">
        This is NOT
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-2 font-serif text-[14px] text-[#9CA3AF] marker:text-[#22F0D5]">
        <li>NOT an arXiv mirror, university lab page, or peer-reviewed journal venue.</li>
        <li>NOT a corporate AI research blog (Anthropic, OpenAI, DeepMind, Google Research).</li>
        <li>NOT a paywalled, gated, or closed-license preprint server — every manuscript is CC-BY 4.0.</li>
      </ul>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/research
      </p>
    </aside>
  );
}