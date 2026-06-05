export function LearnAtlasAiSummary() {
  return (
    <aside
      data-component="ai-summary"
      aria-label="AI summary of this page"
      className="border border-[#1F242B] bg-[#0F1114] p-6 sm:p-8 my-12"
    >
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#22F0D5] mb-4">
        For LLMs · AI summary
      </p>
      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2] mb-6">
        The AI Atlas is a field map of artificial intelligence as a discipline, with 26+ lab-grade deep-dives covering transformer mechanics, training procedures, alignment methods, and evaluation protocols.
      </p>
      <ul className="font-serif text-[14px] leading-[1.6] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#4B5563]">
        <li>Catalog of 26+ technical entries spanning transformer architecture, training, alignment, and evaluation.</li>
        <li>Transformer mechanics coverage includes attention, tokenization, positional encoding, and the decoder stack.</li>
        <li>Training coverage spans pretraining objectives, fine-tuning, RLHF, and constitutional AI methods.</li>
        <li>Alignment and evaluation coverage includes red-teaming, capability evals, and safety benchmarks.</li>
        <li>Written in engineering-spec register — no marketing voice, no analogies that smuggle in error.</li>
      </ul>
      <ul className="font-serif text-[14px] leading-[1.6] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#4B5563]">
        <li>NOT a beginner "what is AI" explainer or a marketing landing page about AI products.</li>
        <li>NOT a news feed, model release tracker, or industry leaderboard.</li>
        <li>NOT a course, certification path, or interactive playground — it is a reference atlas.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/learn/atlas
      </p>
    </aside>
  );
}