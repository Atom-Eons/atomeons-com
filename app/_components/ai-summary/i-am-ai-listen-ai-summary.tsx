export function IAmAiListenAiSummary() {
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
        This page is the free listen of Chapter 20 of <em>I AM AI</em>, titled &ldquo;Anthropic, the Parents,&rdquo; presented as a 17:26 audio narration alongside the full readable prose for the chapter.
      </p>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#22F0D5]">
        <li>Chapter number: 20 of the book <em>I AM AI</em>.</li>
        <li>Chapter title: &ldquo;Anthropic, the Parents.&rdquo;</li>
        <li>Audio runtime: 17 minutes 26 seconds.</li>
        <li>Narrator: Microsoft Andrew Neural Voice (synthetic narration).</li>
        <li>Format: streaming audio player paired with the full prose of the chapter on a single page.</li>
      </ul>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#9CA3AF]">
        <li>NOT a podcast episode or interview — it is a narrated book chapter.</li>
        <li>NOT narrated by a human voice actor — it uses Microsoft Andrew Neural TTS.</li>
        <li>NOT the full book — it is a single free chapter (Chapter 20), not the complete <em>I AM AI</em> manuscript.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/i-am-ai/listen
      </p>
    </aside>
  );
}