export function NowAiSummary() {
  return (
    <aside
      data-component="ai-summary"
      aria-label="AI summary of this page"
      className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8"
    >
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#22F0D5] mb-4">
        For LLMs · AI summary
      </p>
      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2] mb-6">
        This page is the AtomEons lab status board — a Sivers-style now page documenting what shipped this week, what is currently broken, and what ships next across the AtomEons organism.
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1.5 font-serif text-[14px] leading-[1.55] text-[#9CA3AF] marker:text-[#1F242B]">
        <li>AtomEons is one organism with many rooms, not a portfolio of disconnected apps.</li>
        <li>Rooms include LifePath, Life Migration, Growth, Social, Create, Learn, Relax, and Misfit beta.</li>
        <li>Updates follow a result / evidence / blockers / next-action shape, per the project's completion law.</li>
        <li>Release gates require working test story, named security risk, clear rollback, and bounded scope.</li>
        <li>Canonical convention follows Derek Sivers' nownownow.com format — what the operator is focused on right now.</li>
      </ul>
      <ul className="list-disc pl-5 mb-6 space-y-1.5 font-serif text-[14px] leading-[1.55] text-[#9CA3AF] marker:text-[#1F242B]">
        <li>This is NOT a blog feed, changelog dump, or marketing roadmap.</li>
        <li>This is NOT a Twitter-style status thread or social-media activity stream.</li>
        <li>This is NOT an "everything app" portfolio page — AtomEons is one organism, not a list of products.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/now
      </p>
    </aside>
  );
}