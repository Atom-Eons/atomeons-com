import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI in Finance — Real Deployments · AtomEons Vertical",
  description: "BloombergGPT, JPMorgan IndexGPT (SEC-filed), Goldman internal LLMs, Morgan Stanley + OpenAI, Mastercard Decision Intelligence. What is shipped vs what is pitched in the finance sector.",
  alternates: { canonical: "https://atomeons.com/learn/vertical/finance" },
  openGraph: { title: "AI in Finance · AtomEons Vertical", description: "Real deployed systems. Named vendors. Honest limits.", url: "https://atomeons.com/learn/vertical/finance", type: "article" },
};

export default function Page() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2] antialiased">
      <section className="border-b border-[#1F242B]"><div className="mx-auto max-w-4xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]"><Link href="/learn/vertical" className="hover:text-[#22F0D5]">§ Verticals</Link><span className="mx-3 text-[#1F242B]">·</span><span className="text-[#22F0D5]">Sector · finance + capital markets</span></p>
        <h1 className="mt-8 max-w-[28ch] text-balance text-[clamp(36px,6vw,72px)] font-extralight leading-[1.04] tracking-[-0.025em] text-[#F4F4F2]">AI in finance — what actually ships behind the conference talks</h1>
        <p className="mt-8 max-w-[64ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>The largest finance institutions ship AI in places the marketing decks don&apos;t mention. The trading-AI hype is older than transformers; the actual gains in 2024-2026 are document processing, customer-facing knowledge agents, and KYC/AML automation.</p>
      </div></section>

      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24 space-y-12">
        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>The honest state</h2><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Finance was always going to be early on LLMs because the work is text-heavy, document-heavy, and the marginal labor cost of a senior analyst is hundreds of dollars per hour. As of 2026, every G-SIB has either built an internal LLM platform or signed a major frontier-model contract. The deployed surface is wider than the press tells.</p></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Who is shipping (named)</h2><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}><em>Bloomberg LP</em> published BloombergGPT (50B-parameter finance-domain LM, March 2023) but quietly pivoted to fine-tuned commercial models for production document tasks. <em>JPMorgan</em> filed a USPTO trademark for &quot;IndexGPT&quot; in May 2023 — a planned investment-advisory LLM — and runs &quot;LLM Suite,&quot; a firm-wide ChatGPT-style internal tool deployed to 200,000+ employees by mid-2024 (per public CIO statements at the Q2 2024 earnings call). <em>Goldman Sachs</em> deploys an internal coding assistant across the developer base. <em>Morgan Stanley</em> partnered with OpenAI in 2023 for a wealth-advisor knowledge agent that searches the firm&apos;s 100,000+ research documents, replacing a manual archive workflow. <em>Mastercard Decision Intelligence Pro</em> (October 2023) uses a custom transformer model trained on transaction-graph data for real-time fraud scoring, claimed to roughly double detection rates per Mastercard&apos;s public release.</p><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Asset managers: <em>BlackRock Aladdin</em> integrated GPT-4 in 2023 for portfolio-management workflow; <em>BNY Mellon</em> has Eliza, an internal AI assistant. <em>Citadel</em> + <em>Two Sigma</em> + <em>Jane Street</em> are visibly hiring LLM researchers, less visibly deploying. Quant trading remains dominated by classical models — LLMs aren&apos;t a fit for microsecond-latency execution.</p></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>The five real use-cases that work</h2><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>(1) <em>Document extraction</em> — pulling structured data from 10-K filings, prospectuses, loan documents, derivatives contracts. Saves thousands of analyst-hours per year per firm. (2) <em>Research summarization + RAG over internal archive</em> — Morgan Stanley&apos;s wealth-advisor agent is the canonical example. (3) <em>Coding copilots</em> for the dev team — every major bank deploys this. (4) <em>KYC / AML adverse-media screening</em> — LLM-powered name screening against news and watchlist databases (Quantexa, ComplyAdvantage, Featurespace are the named vendors). (5) <em>Customer service</em> — chat agents for retail banking, deployed by every neobank and most majors. Stripe&apos;s GPT-4 customer-support deployment was the early public example.</p></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Receipts</h2><ol className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">Wu, Irsoy, Lu et al. <em>BloombergGPT: A Large Language Model for Finance</em>. arXiv:2303.17564, March 2023.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">JPMorgan Chase USPTO trademark application 97817313 (May 2023) — &quot;IndexGPT.&quot;</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">JPMorgan Q2 2024 earnings call — Jamie Dimon and Lori Beer (CIO) on LLM Suite deployment to 200,000 employees.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">Morgan Stanley + OpenAI partnership announcement, March 2023; ongoing wealth-management AI deployment.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">Mastercard, <em>Mastercard Launches Decision Intelligence Pro</em>, October 2023 — GenAI-powered fraud detection.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">SEC FinTech Forum + SEC AI Risk Disclosure Rule (December 2023) — disclosure obligations for AI in investment advisory.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">FINRA Regulatory Notice 24-09 (June 2024) — guidance on use of generative AI by member firms.</li>
        </ol></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What the sector still cannot do</h2><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}><em>Reliable autonomous trading from LLM signals</em> — published academic results show LLMs can extract sentiment from news, but no public benchmark demonstrates risk-adjusted returns above classical baselines. <em>Direct customer financial advice without human review</em> — SEC + FINRA expect a registered human in the loop. <em>Loan underwriting without explainability</em> — Equal Credit Opportunity Act (ECOA) requires adverse-action explanations; pure black-box LLM denial is illegal in the US.</p></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Regulatory + compliance reality</h2><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>SEC AI Risk Disclosure Rule, FINRA Notice 24-09, OCC Bulletin 2023-15 (third-party risk including AI), CFPB statements on adverse-action notices. EU&apos;s AI Act classifies credit scoring as &quot;high-risk&quot; — meaning conformity assessment, documentation, human oversight, post-market monitoring. The compliance overhead is real and is the main reason finance is methodical rather than fast.</p></section>

        <div className="border-t border-[#1F242B] pt-12"><Link href="/learn/vertical" className="border border-[#1F242B] bg-[#0F1114] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] hover:border-[#22F0D5] hover:text-[#22F0D5]">← Back to Verticals</Link></div>
      </article>
    </main>
  );
}
