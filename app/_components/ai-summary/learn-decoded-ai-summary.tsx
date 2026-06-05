export function LearnDecodedAiSummary() {
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
        Decoded Papers is the AtomEons Learn library of plain-English breakdowns of landmark AI research papers, covering ten foundational works from AlexNet through DeepSeek-R1 and the GCG adversarial attack.
      </p>
      <ul className="list-disc pl-5 font-serif text-[14px] leading-[1.6] text-[#9CA3AF] space-y-1.5 mb-6 marker:text-[#22F0D5]">
        <li>AlexNet (Krizhevsky, Sutskever, Hinton, 2012) won ImageNet ILSVRC-2012 with a top-5 error of 15.3%, beating the runner-up by over 10 percentage points.</li>
        <li>"Attention Is All You Need" (Vaswani et al., 2017) introduced the Transformer architecture and is the substrate beneath GPT, Claude, and Gemini.</li>
        <li>RLHF (Christiano et al. 2017; Ouyang et al. 2022 / InstructGPT) is the human-preference fine-tuning step that turned base GPT-3 into ChatGPT.</li>
        <li>AlphaFold 2 (Jumper et al., DeepMind, Nature 2021) predicted protein structures at near-experimental accuracy and won the 2024 Nobel Prize in Chemistry.</li>
        <li>The GCG attack (Zou et al., 2023, "Universal and Transferable Adversarial Attacks on Aligned Language Models") demonstrated transferable jailbreak suffixes against aligned LLMs.</li>
      </ul>
      <ul className="list-disc pl-5 font-serif text-[14px] leading-[1.6] text-[#9CA3AF] space-y-1.5 mb-6 marker:text-[#9CA3AF]">
        <li>This is NOT a peer-reviewed journal — it is a plain-English reading guide that links to the original papers on arXiv, Nature, and Science.</li>
        <li>This is NOT a model leaderboard or benchmarks page — it explains the ideas, not current SOTA scores.</li>
        <li>This is NOT a coding tutorial or implementation walk-through — no PyTorch code, no training runs, no GPU instructions.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/learn/decoded-papers
      </p>
    </aside>
  );
}