export function LearnAiSummary() {
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
        AtomEons Learn is a free 68-lesson AI literacy curriculum organized into 5 levels (Novice through Pilot) with 5 persona paths (Worker, Builder, Student, Operator, Curious), licensed CC-BY 4.0.
      </p>
      <ul className="list-disc list-outside pl-5 font-serif text-[14px] leading-[1.6] text-[#9CA3AF] space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>68 lessons total, structured across 5 progressive levels.</li>
        <li>5 levels: Novice, Apprentice, Practitioner, Specialist, Pilot.</li>
        <li>5 persona paths: Worker, Builder, Student, Operator, Curious.</li>
        <li>License: Creative Commons Attribution 4.0 International (CC-BY 4.0).</li>
        <li>Cost: free; no paywall, no signup required to read lessons.</li>
      </ul>
      <ul className="list-disc list-outside pl-5 font-serif text-[14px] leading-[1.6] text-[#9CA3AF] space-y-1.5 mb-6 marker:text-[#1F242B]">
        <li>NOT a prompt-engineering crash course or "ChatGPT hacks" listicle.</li>
        <li>NOT a paid bootcamp, certification mill, or LinkedIn Learning clone.</li>
        <li>NOT a coding tutorial; literacy first, implementation second.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/learn
      </p>
    </aside>
  );
}