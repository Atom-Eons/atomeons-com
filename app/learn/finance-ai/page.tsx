import type { Metadata } from "next";
import Link from "next/link";

const TRACK = {
  title: "Finance AI",
  subtitle: "Audit-trail-grade AI for the people who sign the numbers.",
  intro: "Finance is the one field where \"the AI said so\" is not a defense. You sign the 10-Q. You sign the audit workpaper. You sign the tax return under penalties of perjury. The PCAOB, SEC, IRS, and your own board do not care which model drafted the variance commentary. They care whether the number is right and whether you can show your work.\n\nThat makes finance simultaneously the highest-leverage and the highest-liability AI use case in the enterprise. A controller who runs AI well closes the month two days faster, ships a board deck that actually reads cleanly, and catches contract risk before it goes to legal. A controller who runs AI badly pastes a customer's payroll register into a public chatbot, accepts an AI-confabulated depreciation calculation, or lets a model write footnotes that misstate the accounting policy. One of those gets you promoted. The other gets you fired and possibly disciplined.\n\nThis track teaches the second-order discipline: AI as a drafting and reasoning partner, never as a calculator and never as a system of record. Every number gets recomputed in Excel, Python, or Wolfram before it leaves your desk. Every piece of customer or SOC2-scoped data stays inside a local Ollama instance or your firm's vetted internal LLM — never in a consumer chat window. Every output is an artifact you are willing to defend to an auditor, a regulator, and your own future self.\n\nThis is not \"AI will replace accountants.\" It is \"AI gives accountants four hours back every day, on the condition that they verify everything that touches a decision.\" If you can hold that line, the leverage is enormous. If you can't, stay manual.",
  accent: "#FF7A1A",
  personas: [
  {
    "role": "FP&A Analyst (Corporate)",
    "context": "Monthly close, variance commentary, board reporting, three-statement modeling. Volume problem more than complexity problem.",
    "primaryUseCase": "Variance commentary first drafts, board-deck narrative synthesis, sanity-check formulas before they go to the CFO."
  },
  {
    "role": "Controller / Assistant Controller",
    "context": "Owns the close calendar, internal controls, journal entry review, audit prep. Personally on the hook for SOX 404 attestation.",
    "primaryUseCase": "Audit-prep documentation, accounting memo drafting, technical research on ASC topics, reviewer-mode read of staff JEs."
  },
  {
    "role": "Internal Auditor",
    "context": "Risk-based audit plans, walkthroughs, control testing, IT general controls. Reports to audit committee.",
    "primaryUseCase": "Drafting walkthrough narratives, summarizing policy documents, generating sample test procedures, building risk matrices."
  },
  {
    "role": "External Audit Senior / Manager (CPA firm)",
    "context": "Engagement management, workpaper review, technical accounting research, client communications. Independence-restricted.",
    "primaryUseCase": "Drafting accounting research memos, summarizing client policies, building expectation models for analytical procedures."
  },
  {
    "role": "Tax Practitioner (Circular 230)",
    "context": "Return prep, tax research, planning memos, IRS correspondence. Personal preparer liability and licensure exposure.",
    "primaryUseCase": "First-pass research on Code sections, summarizing PLRs and revenue rulings, drafting client memos that you then verify cite-by-cite."
  },
  {
    "role": "Registered Investment Advisor (RIA)",
    "context": "Client portfolios, financial plans, IPS documents, regulatory marketing compliance under SEC Marketing Rule and FINRA.",
    "primaryUseCase": "Drafting plan narratives, summarizing fund prospectuses for IPS construction, NEVER for client-specific advice or marketing copy without compliance review."
  },
  {
    "role": "Treasury Analyst",
    "context": "Cash forecasting, FX exposure, bank covenant compliance, investment policy execution. Liquidity is the job.",
    "primaryUseCase": "Cash flow forecast scaffolding, covenant calculation review, FX commentary drafting, bank relationship memo prep."
  },
  {
    "role": "CFO / VP Finance (small-mid cap)",
    "context": "Board communication, capital allocation, banker relationships, equity story. Time is the constraint.",
    "primaryUseCase": "Board narrative synthesis, banker prep documents, strategic memo first drafts, M&A diligence triage."
  }
],
  safetyRules: [
  "NEVER paste customer account numbers, SSNs, EINs, bank routing numbers, or payroll registers into any cloud-hosted AI chat. Mask or anonymize before any prompt. Better: run locally via Ollama on a controlled workstation.",
  "NEVER paste data from SOC2-scoped systems (Workday, NetSuite, Oracle Fusion, ADP, Concur, Stripe Connect) into consumer AI without explicit written vendor authorization in your firm's AI policy. Your SOC2 scope just got contaminated.",
  "NEVER trust AI arithmetic. Every number that goes into a decision, a filing, a memo, a board deck, or a tax return must be independently recomputed in Excel, Python, R, or Wolfram Alpha. Treat the AI's math as a hypothesis to be tested, not a result.",
  "NEVER let AI write technical accounting conclusions (revenue recognition, lease classification, goodwill impairment, business combination memos) without verifying every ASC citation against the actual Codification. Models hallucinate paragraph numbers constantly.",
  "NEVER use cloud AI to draft client-specific investment advice, marketing material, or testimonials if you are SEC- or FINRA-registered. The Marketing Rule applies even if a machine wrote it. Compliance officer reviews everything that touches a client deliverable.",
  "NEVER paste signed audit workpapers, board minutes, executive comp data, M&A target data, or material non-public information into any AI you do not control end-to-end. This is insider trading risk and Reg FD risk, not just data hygiene.",
  "NEVER tell an AI you are the auditor of record and ask for an opinion. The PCAOB requires the auditor to form the opinion. Use AI for research and drafting only — the opinion is a human professional judgment that does not delegate.",
  "NEVER use AI-generated tax positions on a return without independent Code, Reg, and case verification. IRS Circular 230 makes the preparer personally liable for unreasonable positions. 'AI said it was deductible' is not reasonable cause.",
  "NEVER let AI draft the response to an SEC comment letter, an IRS notice, a state regulator inquiry, or a subpoena without your firm's legal counsel reviewing line by line. These responses bind the entity.",
  "ALWAYS keep a written audit trail of which AI tool, which version, which prompt, and which output was used in any work product. Internal auditors and external auditors are starting to ask. SOX 404 control documentation is starting to require it."
],
  stack: [
  {
    "tool": "Ollama (local) + Llama 3.3 70B or Mistral Large",
    "use": "The default for any prompt containing customer data, employee data, payroll, SOC2-scoped exports, or material non-public information. Runs on your workstation. Nothing leaves the machine."
  },
  {
    "tool": "Claude (Anthropic) — enterprise/Team tier with zero data retention",
    "use": "Drafting accounting memos, board narratives, variance commentary on anonymized data. Strong reasoning on long documents. Best long-context summarization in the category."
  },
  {
    "tool": "ChatGPT Enterprise / Team",
    "use": "General drafting, regulatory research summarization, technical accounting first passes. Enterprise tier required for data-handling reasons; consumer ChatGPT is not acceptable for any client or company data."
  },
  {
    "tool": "Microsoft Copilot for Excel + Copilot for Microsoft 365",
    "use": "In-Excel formula drafting, pivot analysis, financial model checking. Inherits your existing tenant data governance, which is the point. Verify formulas before trusting outputs."
  },
  {
    "tool": "Wolfram Alpha + Python (pandas, numpy)",
    "use": "The verification rail. Every AI-suggested calculation gets recomputed here before it ships. This is non-negotiable and is the single biggest discipline gap between finance professionals who get fired for AI mistakes and those who don't."
  },
  {
    "tool": "Hebbia, Rogo, or AlphaSense (enterprise finance AI)",
    "use": "Purpose-built for finance research, SEC filings analysis, deal diligence. Better than general-purpose AI for filing-heavy work because the corpus is curated. Expensive but auditable."
  },
  {
    "tool": "Tabnine or Cursor (for finance-adjacent code)",
    "use": "Writing the Python or VBA that runs your verification scripts. Finance is increasingly code-adjacent; you want AI helping you write the verification harness, not skip it."
  },
  {
    "tool": "Internal LLM via Azure OpenAI or AWS Bedrock",
    "use": "If your firm has built an internal LLM gateway with logging, retention controls, and DLP, this is the right rail for everything except the most sensitive PII. Confirm your firm's policy before assuming this is approved."
  }
],
  doNotList: [
  "NEVER form a professional opinion (audit, tax, fairness, valuation) and credit AI in the conclusion. The opinion is yours. The signature is yours. The license is yours.",
  "NEVER let AI draft GAAP or IFRS technical accounting conclusions for filing without verifying every ASC, IFRS, or PCAOB citation against the source standard. Hallucinated paragraph numbers are routine.",
  "NEVER use AI as the system of record for any balance, transaction, or schedule. The ERP is the system of record. AI is a drafting layer above it, never below it.",
  "NEVER let AI generate cash flow forecasts or budget numbers that get loaded into a financial system without a human-built reconciliation back to underlying drivers. Black-box AI numbers do not get to vote on the company's plan.",
  "NEVER let AI write client-facing investment recommendations, performance commentary, or marketing for a registered advisor without compliance review. The SEC Marketing Rule treats AI output as advertising.",
  "NEVER paste a return, a W-2, a 1099, a K-1, or any taxpayer-identifying information into a consumer AI tool. Circular 230 and IRS Section 7216 both apply and both have teeth.",
  "NEVER let AI substitute for your professional skepticism in an audit. The PCAOB's standard is 'professional skepticism throughout the engagement' — a model that always tries to be agreeable is the opposite of skeptical."
],
  workflows: [
  {
    "name": "Variance Commentary First Draft",
    "goal": "Turn a numeric variance table into board-ready narrative commentary in minutes, not hours, while keeping every number recomputed and every claim traceable.",
    "ai": "Claude (enterprise tier) or local Ollama if the data is sensitive. Use anonymized account names if cloud.",
    "prompt": "You are an FP&A analyst drafting board commentary. I will give you a variance table showing actual vs. budget for the current month and YTD across [REVENUE / COGS / OPEX categories]. For each variance greater than [$THRESHOLD] or [%THRESHOLD], draft 2-3 sentences of commentary that: (1) states the variance in dollars and percent, (2) proposes the most likely driver based on the account name and the direction of the variance, (3) flags any variance you cannot explain from the data alone so I can investigate. DO NOT speculate beyond what the data supports. DO NOT round or alter the numbers I gave you. End with a list of 'questions to ask operations' for any variance you flagged. Here is the data: [PASTE ANONYMIZED VARIANCE TABLE]. Output as a markdown table: Account | Variance $ | Variance % | Proposed Driver | Confidence (H/M/L) | Investigate?",
    "notice": "How often the AI proposes a plausible-sounding driver that does not match what actually happened. The 'Confidence' column is your tell. Anything Medium or Low gets a human investigation before it appears in the deck.",
    "trap": "AI loves to confidently explain variances using generic finance vocabulary ('higher marketing spend driving revenue growth') that is technically possible but factually wrong. Never ship variance commentary without a human verifying the proposed driver against actual operational data."
  },
  {
    "name": "Board Deck Narrative Synthesis",
    "goal": "Synthesize 40+ pages of monthly close materials into a 3-page executive summary that the CEO and board can read in five minutes.",
    "ai": "Claude with long-context window. Anthropic's long-context performance is materially better for this specific task than alternatives as of 2026.",
    "prompt": "You are preparing the CFO's three-page narrative for the board. I will paste the full monthly close package: variance commentary, KPI dashboard, cash flow summary, operational updates, and risk register. Produce a three-page narrative with these sections: (1) Headline — the one number and one trend the board must understand this month, in two sentences. (2) What Worked — three specific wins with the actual numbers. (3) What Didn't — three specific misses with the actual numbers and what we're doing about each. (4) Cash & Liquidity — current cash position, 13-week forecast, covenant headroom. (5) Forward Look — top three risks and top three opportunities for the next 90 days. Use only numbers and facts present in the materials I gave you. Where you are uncertain, write [VERIFY] inline. Do NOT invent metrics. Do NOT smooth bad news. Tone: direct, audit-trail-grade, no hype. Length: 1,200 words maximum. Source materials: [PASTE]",
    "notice": "Where the AI smooths bad news. Models are trained to be agreeable; that is the opposite of what a board narrative needs. Every [VERIFY] tag is a number you personally re-source from the close package.",
    "trap": "Models will compress and lose the negative. A 7% revenue miss in one line item gets buried under 'overall performance in line with plan.' Read the AI draft against the worst line in the original materials. If the worst line is missing from the narrative, the narrative is wrong."
  },
  {
    "name": "Accounting Memo Drafting (ASC Research)",
    "goal": "Draft a technical accounting memo on a specific transaction or policy question with proper ASC citation structure, ready for controller review.",
    "ai": "Claude or ChatGPT Enterprise. NEVER use AI as the authoritative source for the citation itself — verify against the actual Codification.",
    "prompt": "Act as a senior technical accounting manager drafting a memo for the controller's file. Topic: [TRANSACTION OR POLICY QUESTION]. Facts: [PASTE FACT PATTERN — anonymize counterparty if material non-public]. Required structure: (1) Background and facts (1 paragraph). (2) Question presented (1 sentence). (3) Applicable guidance — list the specific ASC topics and subtopics you believe apply, with paragraph references. Mark each citation [VERIFY AGAINST CODIFICATION]. (4) Analysis — apply the guidance to the facts. (5) Conclusion — state the accounting treatment. (6) Journal entry illustration. (7) Disclosure considerations. Be conservative. If two interpretations exist, present both. If guidance is genuinely ambiguous, say so and recommend consultation with the audit firm. Do NOT invent ASC paragraph numbers — if you are not certain of the exact paragraph, write 'See ASC [Topic] generally' and let the reviewer pinpoint.",
    "notice": "Every single ASC citation. Models hallucinate paragraph numbers routinely. The memo is unusable until a human verifies each citation against the FASB Codification (or IFRS Standards) and corrects any that are wrong.",
    "trap": "The biggest finance-AI scandal of 2025 was a Big 4 firm shipping a client memo with hallucinated ASC 606 paragraph references. The firm rebuilt the memo, ate the fees, and added a mandatory verification step. Do not be that controller."
  },
  {
    "name": "Vendor Contract Clause Check",
    "goal": "Pre-screen a vendor or customer contract for finance-relevant clauses (revenue recognition triggers, payment terms, auto-renewal, indemnification caps, termination) before sending to legal.",
    "ai": "Claude — best at long-document reasoning. Acceptable to use cloud for vendor contracts that do not contain customer PII. Use local Ollama for anything sensitive.",
    "prompt": "You are a senior finance reviewer scanning a contract for finance-impact clauses. Read the attached agreement and produce a structured summary covering: (1) Contract term, auto-renewal, and termination rights — quote the exact language. (2) Payment terms, late fees, and any variable consideration. (3) Performance obligations and acceptance criteria (relevant to ASC 606 revenue recognition). (4) Refund, credit, or service-level penalty provisions. (5) Indemnification caps and limitations of liability. (6) Change-of-control or assignment provisions. (7) Any 'most favored nation,' exclusivity, or non-compete clauses. (8) Any clauses that look unusual, asymmetric, or expensive. For each finding, quote the exact contract language and cite the section number. Do NOT paraphrase the legal language — quote it verbatim so the controller and legal can verify. End with a 'Top 5 issues to escalate' list. Contract: [PASTE]",
    "notice": "How well the AI quotes verbatim vs. paraphrasing. Paraphrased contract language is useless to legal. Insist on direct quotes with section references so verification is mechanical.",
    "trap": "AI will confidently summarize a clause in a way that subtly misstates the obligation. The risk is not that you'll miss something — it's that you'll trust the summary and never read the actual clause. Always read the quoted text yourself before the contract goes to signing."
  },
  {
    "name": "Cash Flow Forecast Driver Review",
    "goal": "Pressure-test a 13-week cash forecast by having AI propose the questions a treasurer or CFO would ask, before the actual treasurer or CFO asks them.",
    "ai": "Claude or ChatGPT Enterprise. Use anonymized aggregate cash data; never paste individual customer payment timing.",
    "prompt": "Act as a skeptical CFO reviewing a 13-week cash forecast prepared by a treasury analyst. I will give you the forecast assumptions: receipts by category, disbursements by category, opening balance, and any known one-time items. Your job is to: (1) Identify any assumption that seems aggressive or unsupported. (2) Identify any disbursement category that looks low based on historical patterns I provide. (3) Propose three downside scenarios — payroll timing shifts, a top-3 customer pays 15 days late, an unexpected tax payment. (4) Calculate the minimum cash balance under each scenario and flag any week where we breach our minimum operating cash threshold of [$X]. (5) List the five questions you would ask the analyst before approving the forecast. Do NOT do the math yourself — show the formula and let me recompute in Excel. Forecast and history: [PASTE]",
    "notice": "The skepticism quality. A good prompt produces questions like 'why did Q3 historical disbursements jump 18% and is that reflected in the forecast?' A bad prompt produces generic CFO-speak. Tune the prompt with more historical context if the questions are too vague.",
    "trap": "Never let the AI do the actual cash math. Always recompute the minimum balance and the scenario impacts in Excel or Python. AI arithmetic on 90 cells of forecast data is unreliable enough that treasury professionals have signed off on impossible cash positions because they trusted the AI summary."
  },
  {
    "name": "Audit Prep Documentation Pattern (PBC List)",
    "goal": "Build the documentation package an external auditor needs for a specific area (revenue, leases, inventory, comp) so the prepared-by-client list comes back faster and cleaner.",
    "ai": "Local Ollama strongly preferred — audit prep documents often contain customer-level detail. Cloud only if every data element is genuinely anonymized.",
    "prompt": "Act as a senior accountant preparing audit documentation for [AUDIT AREA: e.g., revenue recognition under ASC 606]. The auditor will request: process narratives, walkthrough documentation, controls testing evidence, journal entry sampling support, reconciliations, and significant estimates documentation. Produce a checklist of every document I should prepare in advance, organized by: (1) Standard PBC items the auditor will definitely request. (2) Likely follow-up items based on common audit findings in this area. (3) Areas where the auditor will likely focus given recent PCAOB inspection findings or AICPA hot topics. For each item, specify: document name, owner, source system, expected format, and any cross-references. End with a 'top three risk areas' summary the controller should personally review before the auditor's first meeting. Be specific to [INDUSTRY] and [COMPANY SIZE / FILING STATUS].",
    "notice": "Whether the AI knows current PCAOB inspection focus areas. As of 2026 these include revenue cutoff, internal controls over journal entries, and going-concern evaluation. If the output ignores these, the prompt needs the year and the audit firm tier as additional context.",
    "trap": "Do not let the checklist replace your professional judgment about your own company's risk areas. The AI's 'standard PBC list' is a starting point. The actual audit risk is in the line items that are unique to your business — those won't be on any standard list."
  },
  {
    "name": "SEC Filing / Regulatory Document Review (Draft Review Only)",
    "goal": "Pre-screen an SEC filing draft, proxy, 10-K MD&A, or regulatory response for internal inconsistencies, unsupported claims, missing disclosures, and tone problems before the final round of review.",
    "ai": "Claude with long-context. Cloud is acceptable for already-public-equivalent drafts. NEVER paste pre-release MNPI for unfiled documents into a non-enterprise AI.",
    "prompt": "Act as a senior SEC reporting specialist reviewing a draft [10-K / 10-Q / proxy / S-1] before it goes to the audit committee. Your job is to flag — not fix — issues. Produce a structured review covering: (1) Internal consistency — any number, percentage, or trend that appears in two places and does not match. Cite the page and section of each occurrence. (2) Unsupported claims — any forward-looking statement, market position claim, or competitive assertion that does not have a clear basis in the filing's data. (3) Missing standard disclosures — anything required by Reg S-K or Reg S-X that appears absent or thin. (4) MD&A tone — anything that reads like marketing rather than analysis. (5) Risk factor staleness — anything that looks copy-pasted from prior years and may not reflect current risk. (6) Cross-reference integrity — any reference to an exhibit, schedule, or section that may be broken. DO NOT propose actual language fixes — that is for the controller and outside counsel. Just flag. Draft: [PASTE]",
    "notice": "False positives. AI tends to over-flag in regulatory filings because it doesn't know the prior-year baseline. Triage findings against the prior filing before escalating to the audit committee.",
    "trap": "AI cannot make a materiality judgment for you. Every flagged item still goes through your firm's materiality framework before becoming a real change. Do not let the AI's volume of findings drive the disclosure decision."
  },
  {
    "name": "Tax Research First Pass (Circular 230 Constraint)",
    "goal": "Build a first-draft tax research memo on a Code section, regulation, or recent guidance — knowing that every citation and every conclusion will be independently verified by the licensed preparer.",
    "ai": "Claude or ChatGPT Enterprise. Use anonymized fact patterns. NEVER paste actual taxpayer-identifying information.",
    "prompt": "Act as a tax research associate preparing a memo for a licensed CPA/EA who will independently verify every citation. Question: [TAX QUESTION]. Anonymized facts: [PASTE]. Produce a research memo with: (1) Question presented. (2) Brief facts. (3) Applicable Code sections, Treasury Regulations, and recent guidance — give the citation in the format §XXX(x)(x), Reg. §X.XXXX-X, Rev. Rul. XXXX-XX. Mark every citation [VERIFY]. (4) Analysis applying the authority to the facts. (5) Conclusion. (6) Alternative positions and their relative authority. (7) Practical considerations including penalty exposure under §6662 if the position is challenged. Be conservative. Flag any position that would require disclosure on Form 8275. Do NOT cite cases or rulings unless you are confident they exist — if uncertain, say 'There may be relevant case law in [AREA]; researcher should verify in CCH/RIA/Bloomberg Tax.'",
    "notice": "How many citations turn out to exist when you check them in the actual tax research database. The fail rate is non-trivial. Treat the memo as a starting outline that gets rebuilt against verified authority before any client work product is delivered.",
    "trap": "IRS Circular 230 §10.34 requires the preparer to have a reasonable basis for every position. 'I asked an AI' is not a reasonable basis. Every Code citation, Reg citation, and case citation in the final memo must be independently verified in a paid tax research service. The preparer signs the return, not the model."
  }
],
  regulations: [
  {
    "name": "SOX (Sarbanes-Oxley §302 and §404)",
    "matters": "Requires CEO/CFO to personally certify the financial statements and internal controls. AI used in close, reporting, or controls becomes part of the control environment and must be documented, tested, and reviewed."
  },
  {
    "name": "PCAOB Auditing Standards (AS 1015, AS 2401, AS 2110)",
    "matters": "Requires professional skepticism, fraud risk assessment, and human judgment that does not delegate to AI. Auditors using AI must still personally evaluate evidence and form the opinion."
  },
  {
    "name": "SEC Marketing Rule (Rule 206(4)-1 under the Advisers Act)",
    "matters": "Applies to RIAs. AI-generated marketing, testimonials, performance commentary, and client-facing material are treated as advertising and must comply. Compliance officer review required."
  },
  {
    "name": "FINRA Rules 2210 and 3110",
    "matters": "Communications with the public must be fair and balanced; firms must supervise. AI-drafted communications for FINRA-regulated reps require principal review before distribution."
  },
  {
    "name": "IRS Circular 230 and Section 7216",
    "matters": "Tax practitioners are personally liable for unreasonable positions and for unauthorized disclosure of return information. Pasting taxpayer data into an AI without authorization is a Section 7216 violation."
  },
  {
    "name": "Gramm-Leach-Bliley Act (GLBA) — Safeguards Rule",
    "matters": "Financial institutions must protect customer financial information. Pasting customer account data into a third-party AI without contractual data protection violates GLBA's Safeguards Rule."
  },
  {
    "name": "SOC 2 Type II (Trust Services Criteria)",
    "matters": "If your company holds a SOC 2 report, your vendor management and confidentiality controls extend to AI tools. Using an unvetted AI with in-scope data is a SOC 2 control failure."
  },
  {
    "name": "State CPA AI Ethics Opinions (AICPA + state boards, 2024-2026)",
    "matters": "Most state boards have issued or are issuing ethics opinions on AI use by CPAs. Common themes: confidentiality, supervision, professional competence, and clear client disclosure when AI materially contributes to work product."
  }
],
  caseStudy: {
  "persona": "Senior FP&A analyst at a $400M public industrial company. Eight years experience, CPA, owns monthly close commentary and quarterly board materials. Composite of three analysts in our reader base.",
  "before": "Monthly close was a 10-day grind. Variance commentary on 60+ GL accounts took her three full days, mostly retyping the same patterns ('unfavorable variance driven by higher than expected...') across line items. Board deck narrative ate another two days of cycling drafts with the CFO. She was working 65-hour weeks during close week and was visibly burning out. Her CFO was talking about hiring a second analyst.",
  "shift": "She didn't start with AI replacing her work. She started with AI as a drafting layer above a strict verification rail. Every number still got recomputed in Excel. Every ASC citation still got verified in the Codification. Every variance driver still got confirmed against operational data before it went into commentary. The AI did the typing; she did the thinking and the verification.",
  "outcome": "Close commentary dropped from three days to six hours. Board deck narrative dropped from two days to four hours. Her output approximately quadrupled. Accuracy went UP, not down — because she now had time to read every number twice instead of racing the clock. She did NOT get a second analyst hired; she got promoted to FP&A Manager and her CFO redirected the headcount to a Treasury analyst. The CFO's quote at her review: 'You're now the gold standard for how we use these tools across the company.'",
  "trap": "The mistake she almost made in month two: she let the AI calculate a working-capital variance percentage and dropped it into the board deck without recomputing. The number was off by 40 basis points because the AI had confused the prior-period base. Her controller caught it in review. She added a hard rule: every number in any board-facing artifact gets recomputed in Excel or Python before it leaves her desk. Zero exceptions, zero shortcuts, even when she's tired.",
  "fix": "She built a verification harness. One Excel workbook with linked source data, one Python notebook for any cross-period calculation, one checklist she runs through before any deliverable goes out. The AI drafts; the harness verifies. Five-minute discipline that has caught roughly one material AI math error per month since she built it. Every catch reinforces the rule.",
  "pullQuote": "AI didn't make me faster. The verification rail did. AI just gave me back the hours I was wasting on typing instead of thinking."
},
  upskill: "A finance professional graduates from atomeons.com/learn to ORANGEBOX-grade operating when AI stops being a tool they sometimes use and starts being a piece of infrastructure they always govern. That means a written personal AI policy (which model for which task, what data goes where, what gets verified how), a documented verification harness (Excel + Python + Wolfram patterns for the calculations you do most), and a habit of treating every AI output as a hypothesis until you have personally re-derived the critical numbers. At ORANGEBOX grade, you are not asking 'can AI do this?' — you are asking 'what is the audit trail for this AI-assisted output, and would I sign it if my license depended on it?' For finance, that question always has to have an answer, because eventually it always does.",
} as const;

export const metadata: Metadata = {
  title: "Finance AI · /learn · AtomEons",
  description: "Audit-trail-grade AI for the people who sign the numbers. · Finance is the one field where \"the AI said so\" is not a defense. You sign the 10-Q. You sign the audit workpaper. You sign the tax return under penalties of perjury. The PCAOB, SEC, IRS, and your own board do not care which model drafted the varianc",
  alternates: { canonical: "https://atomeons.com/learn/finance-ai" },
  openGraph: {
    title: "Finance AI · /learn",
    description: "Audit-trail-grade AI for the people who sign the numbers.",
    url: "https://atomeons.com/learn/finance-ai",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance AI · /learn",
    description: "Audit-trail-grade AI for the people who sign the numbers.",
  },
  robots: { index: true, follow: true },
};

export default function TrackPage() {
  const t = TRACK;
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> {t.title}
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::industry track · {t.title.toLowerCase()}
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            {t.title}.{" "}
            <span style={{ color: t.accent }}>{t.subtitle}</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg whitespace-pre-line">
            {t.intro}
          </p>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::who lands here
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            {t.personas.length} personas. One field. One discipline.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.personas.map((p, i) => (
              <div key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                  ::{String(i + 1).padStart(2, "0")} · {p.role}
                </p>
                <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">{p.context}</p>
                <p className="mt-3 text-sm leading-[1.55] text-[#9BA5A7]">
                  <span style={{ color: t.accent }}>primary use:</span> {p.primaryUseCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY RULES */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::the safety rules · non-negotiable
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What you never do.
          </h2>
          <ul className="mt-8 space-y-3">
            {t.safetyRules.map((r, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-4">
                <span className="font-mono text-sm font-bold text-[#FFB87A]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] leading-[1.65] text-[#C8CCCE]">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STACK + DO NOT */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                ::the stack
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">Recommended tools.</h3>
              <ul className="mt-5 space-y-3">
                {t.stack.map((s, i) => (
                  <li key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                    <p className="text-sm font-semibold" style={{ color: t.accent }}>{s.tool}</p>
                    <p className="mt-2 text-sm leading-[1.6] text-[#C8CCCE]">{s.use}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::do NOT automate
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">Hands stay on these.</h3>
              <ul className="mt-5 space-y-3">
                {t.doNotList.map((d, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                    <span className="text-[#FFB87A]">○</span>
                    <span className="text-sm leading-[1.6] text-[#C8CCCE]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::the workflows · {t.workflows.length} named plays
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The plays. Each with the exact prompt.
          </h2>
          <div className="mt-10 space-y-6">
            {t.workflows.map((w, i) => (
              <article
                key={i}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7"
                style={{ borderLeft: `4px solid ${t.accent}` }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                    ::play {String(i + 1).padStart(2, "0")} · {w.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    {w.ai}
                  </p>
                </div>
                <h3 className="mt-3 text-lg font-medium text-[#F2F4F5] md:text-xl">{w.goal}</h3>
                <pre className="mt-4 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 font-mono text-[12px] leading-[1.55] text-[#C8CCCE] md:text-[13px]">
                  {w.prompt}
                </pre>
                <p className="mt-3 text-sm leading-[1.6]">
                  <span style={{ color: t.accent }}>::what to notice</span>
                  <span className="text-[#9BA5A7]"> · {w.notice}</span>
                </p>
                <p className="mt-2 text-sm leading-[1.6] text-[#FFB87A]">
                  ::trap · {w.trap}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATIONS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::what governs your AI use
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The regulations that matter.
          </h2>
          <div className="mt-10 space-y-4">
            {t.regulations.map((r, i) => (
              <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-sm font-bold" style={{ color: t.accent }}>{r.name}</p>
                <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{r.matters}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::case study · composite anonymized
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            One human. One year. The pattern.
          </h2>
          <div className="mt-10 space-y-6 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
            <p className="text-lg font-semibold" style={{ color: t.accent }}>{t.caseStudy.persona}</p>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::before AI</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.before}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::the shift</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.shift}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::outcome</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.outcome}</p>
            </div>
            <div className="rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">::the trap they hit</p>
              <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.caseStudy.trap}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::the fix</p>
              <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.caseStudy.fix}</p>
            </div>
            <blockquote className="border-l-4 pl-5 italic" style={{ borderColor: t.accent }}>
              <p className="text-lg leading-[1.55] text-[#F2F4F5] md:text-xl">
                &ldquo;{t.caseStudy.pullQuote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* UPSKILL + CROSS-LINKS */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::next level
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
            {t.upskill}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn/playbooks"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              the job-by-job playbooks →
            </Link>
            <Link
              href="/learn/cheatsheet"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              the AI cheatsheet →
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              ← back to /learn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
