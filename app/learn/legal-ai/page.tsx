import type { Metadata } from "next";
import Link from "next/link";

const TRACK = {
  title: "Legal AI",
  subtitle: "The research associate that never sleeps · and never appears in court",
  intro: "The legal profession has a peculiar relationship with AI right now. Half the bar is sprinting toward it. The other half is reading sanctions orders out loud at CLE events. Both reactions miss the point.\n\nGenerative AI is, structurally, a junior research associate with a photographic memory, no bar card, no malpractice insurance, and a documented tendency to make up case citations when it gets cornered. That description is not a critique of the technology. It is a job description. Use it that way and it earns its keep. Treat it as a lawyer and you will eventually stand in front of a judge explaining why Mata v. Avianca did not, in fact, deter you.\n\nThe discipline this track teaches is older than ChatGPT. It is the discipline every good lawyer already has — verify the citation, protect the privilege, never delegate judgment, document your reasoning. AI does not change those duties. It raises the volume on them, because the cost of skipping a Westlaw pull dropped to zero and the cost of getting caught skipping it went up.\n\nThis track is for solos who cannot afford a lost malpractice carrier, partners who cannot afford a sanctioned associate, in-house counsel who cannot afford a privilege waiver, paralegals who want to be indispensable, and clerks who want to read a hundred briefs in the time it used to take to read ten. It assumes you already know the law. It teaches you how to put a fast, fallible research assistant to work without it costing you your license.\n\nABA Formal Opinion 512 is the floor, not the ceiling. The ceiling is the discipline you build on top of it.",
  accent: "#FFB87A",
  personas: [
  {
    "role": "Solo practitioner",
    "context": "One lawyer, maybe a paralegal, doing 60% of the work a 50-person firm would do per matter. No associate to delegate research to. No partner to second-check a brief at 11pm.",
    "primaryUseCase": "First-pass issue spotting, brief outlining, deposition prep summaries, client letter drafts — all locally verified against Westlaw before anything ships."
  },
  {
    "role": "Small-firm partner",
    "context": "5-25 lawyer firm. Supervising 2-4 associates. Wants leverage without supervising AI usage by feel. Needs an AI policy that does not require an IT department.",
    "primaryUseCase": "Supervising associate use of AI under Model Rule 5.3, drafting firm AI policy, doing partner-level second reads on AI-assisted associate work product."
  },
  {
    "role": "In-house counsel",
    "context": "Sole or small legal team inside a non-legal company. Drowning in contracts, MSAs, NDAs, vendor reviews. Privilege concerns are paramount because everything touches client confidences.",
    "primaryUseCase": "Contract clause-checking at scale, regulatory monitoring summaries, internal policy drafting, exec memos that require legal framing — privileged work routed to local-only AI."
  },
  {
    "role": "Paralegal",
    "context": "Senior paralegals are increasingly the AI operators in firms. They run the workflows the lawyers signed off on. They are also where unauthorized practice of law risk lives if the supervision lapses.",
    "primaryUseCase": "Document organization, deposition summary first drafts, exhibit indexing, citation pulling, client correspondence drafts for attorney review — never independent legal advice output."
  },
  {
    "role": "Judicial clerk",
    "context": "Federal or state. Reading dozens of briefs a week, writing bench memos, doing rapid case-law sweeps for the judge. Strict confidentiality rules around chambers work.",
    "primaryUseCase": "Bench memo first drafts from privately reviewed briefs, case-law pattern surveys, statutory interpretation pre-reads — all on local Ollama because nothing chambers-related can touch a cloud."
  },
  {
    "role": "Litigation associate (year 2-4)",
    "context": "Doing the discovery, the brief writing, the deposition prep. Billable hour pressure. Partner expectations. Wants AI leverage without ending up on a sanctions order.",
    "primaryUseCase": "Long-document review (Claude 200K context wins here), deposition exhibit synthesis, brief draft refinement, citation verification workflow before submission."
  },
  {
    "role": "Compliance officer",
    "context": "Regulated industry (financial services, healthcare, energy). Lives in the SEC/HIPAA/FERC/state-AG matrix. Needs to track rule changes and translate them into operational guidance.",
    "primaryUseCase": "Regulatory delta summaries, internal policy updates triggered by rule changes, training material drafts, compliance memo first drafts."
  },
  {
    "role": "Contract attorney / doc reviewer",
    "context": "Project-based work. Often remote. Reviewing millions of documents in MDL or large commercial litigation. AI is already restructuring this role and the question is whether you ride the wave or get washed.",
    "primaryUseCase": "Privilege log first passes, responsiveness coding sanity checks, hot-doc surfacing on long-form discovery, summary memos for senior reviewers."
  }
],
  safetyRules: [
  "NEVER paste client names, matter numbers, deal code names, party identifiers, or any matter-identifying facts into cloud AI (ChatGPT web, Claude.ai web, Gemini web, Copilot) for privileged work. Use local Ollama or a vendor with a signed BAA-equivalent confidentiality agreement and zero-retention terms.",
  "NEVER submit a brief, motion, or filing containing AI-generated citations without pulling every single case in Westlaw or Lexis and reading the actual opinion. Hallucinated citations are real and they get lawyers sanctioned. This is non-negotiable.",
  "NEVER use AI output as the final legal analysis. AI is the research associate. You are the lawyer. The judgment, the strategy, the ethical call, the client communication — those are yours under Model Rule 1.1.",
  "NEVER paste sealed court documents, grand jury material, in camera filings, or anything under a protective order into a cloud AI. The seal and the protective order do not care that the AI promises not to train on your data.",
  "NEVER let a paralegal or non-lawyer assistant produce final-form legal advice with AI assistance and ship it to a client. Model Rule 5.3 supervision applies to AI-assisted work product the same as any other delegated work.",
  "NEVER use AI to summarize a privileged communication and then share that summary with a third party (opposing counsel, expert, vendor) without first confirming the summary does not waive privilege. Summaries can waive too.",
  "NEVER trust a citation, statute reference, regulatory cite, or rule number from AI output without independent verification. The hallucination rate on legal citations is non-trivial and the failure mode is sanctions.",
  "NEVER use AI to draft a substantive client communication that ships without a lawyer reading it word-for-word first. The signature on the letter is yours. The malpractice exposure is yours.",
  "NEVER assume the AI knows current law. Models have training cutoffs. Statutes get amended. Cases get overruled. Always confirm the law as of today through a real legal research database before relying on AI output.",
  "NEVER skip the disclosure of AI use when a court rule, judge's standing order, or client engagement letter requires it. Several federal districts now require AI-use disclosure on filings. Check the local rules every time."
],
  stack: [
  {
    "tool": "Claude (200K context, Pro or Team plan)",
    "use": "Long-document review · brief outlining · contract analysis · the workhorse for any task where you need to feed in 100+ pages of source material and get coherent synthesis back. Use Team plan for zero-retention terms."
  },
  {
    "tool": "Ollama (local, llama3.1 or qwen2.5)",
    "use": "Anything privileged. Runs on your laptop. Nothing leaves your machine. Slower and less capable than cloud frontier models, but the privilege protection is absolute."
  },
  {
    "tool": "Westlaw or Lexis (full subscription)",
    "use": "The non-negotiable verification layer. Every AI-generated citation gets pulled and read here before it touches a filing. Not optional. Not someday. Every time."
  },
  {
    "tool": "Casetext / Lexis+ AI / Westlaw Precision AI",
    "use": "Legal-specific AI built on top of verified case databases. The citations these tools surface are real. Use as the first-pass research tool when the matter requires a citation trail you can stand behind."
  },
  {
    "tool": "ChatGPT Team or Enterprise (with zero-retention)",
    "use": "Acceptable for non-privileged work like CLE study, generic legal research, drafting practice. Confirm zero-retention terms are signed before any client-adjacent use."
  },
  {
    "tool": "NotebookLM (Google)",
    "use": "Document Q&A with citation grounding back to source. Useful for case-file deep reading where you want every answer pinned to a page in the underlying file. Privacy terms still require care for privileged material."
  },
  {
    "tool": "Clio / MyCase / PracticePanther",
    "use": "Practice management. Some now have native AI features. Use the AI features only where vendor terms explicitly protect privilege and confidentiality."
  },
  {
    "tool": "Otter.ai or Fireflies (with caution)",
    "use": "Deposition or client meeting transcription. Privilege-critical: confirm vendor terms protect the recording and transcript, and disclose recording per state two-party consent rules."
  }
],
  doNotList: [
  "Never let AI write the final version of any document that goes to a court, opposing counsel, or a client. The signature is yours, the malpractice is yours, the words must be yours.",
  "Never use AI to make a strategic decision in a matter (settle vs. try, file vs. demand, plead the Fifth vs. cooperate). Strategy is judgment and judgment is the lawyer's job.",
  "Never let AI handle the actual client relationship — the empathy, the bad-news call, the strategic counsel session. Those are why clients hire humans.",
  "Never use AI to assess credibility of a witness, a client, or an adversary. Credibility is a human read on a human in front of you, and AI cannot do it.",
  "Never delegate the ethics call to AI. Whether to withdraw, whether to report misconduct, whether a conflict can be waived — those are bar-licensed decisions.",
  "Never use AI for the final privilege determination on a document. The first pass, yes. The final call, no. Privilege errors are unfixable.",
  "Never let AI-generated content go to a client without a lawyer's eyes on every word. The lawyer signs the letter. The lawyer takes the call when it goes wrong."
],
  workflows: [
  {
    "name": "Issue spotting before drafting",
    "goal": "Surface the full universe of legal issues in a fact pattern before you commit to a research path. Catches the issue you almost missed.",
    "ai": "Claude (200K context) for the analysis · Westlaw/Lexis for every citation that comes back.",
    "prompt": "You are a senior litigation associate doing pre-research issue spotting for a [JURISDICTION] matter. Below are the facts of a hypothetical matter, with all identifying information redacted. Do not assume facts not stated. Do not invent case citations — if you do not know a specific case, say so and describe the doctrine generically. Identify: (1) every plausible cause of action or defense raised by these facts, (2) for each, the elements that would need to be proven, (3) the threshold legal issues that would need to be researched (statute of limitations, choice of law, jurisdiction, standing, ripeness), (4) the practical issues a litigator would want to investigate before filing, (5) the issues that look weak on first read but might have angles worth a second pass. Flag anything where you are uncertain or where the analysis depends on jurisdiction-specific law. Facts: [REDACTED FACT PATTERN]",
    "notice": "Watch for issues you had not considered. The AI will surface obvious ones quickly — pay attention to the third- and fourth-tier issues it raises. Those are where the leverage is. Also watch for any specific case citations in the output and treat every single one as suspect until verified.",
    "trap": "The trap is treating the output as exhaustive. AI issue spotting is a starter list, not a final list. Your own analysis still has to run separately. If you adopt the AI's framing wholesale you inherit its blind spots."
  },
  {
    "name": "Long-document review with Claude 200K",
    "goal": "Read 200+ pages of source material (deposition transcript, contract, expert report, regulatory filing) and produce a structured synthesis with page-cited quotes.",
    "ai": "Claude (200K context, Team plan with zero-retention) · Westlaw/Lexis for any legal authority that appears.",
    "prompt": "I am attaching a [DOCUMENT TYPE — deposition transcript / contract / expert report / regulatory filing] of approximately [PAGE COUNT] pages. The matter is [GENERIC DESCRIPTION WITHOUT CLIENT-IDENTIFYING DETAIL]. I need you to produce: (1) a 1-page executive summary of the document, (2) a topic-by-topic breakdown with page citations for every claim, (3) the 10 most important passages quoted verbatim with page references, (4) inconsistencies or contradictions within the document, (5) gaps — what should be in this document but is not, (6) follow-up questions or topics for further investigation. Every fact assertion must include a page cite. If a fact appears only once at a single page, note that. Do not paraphrase in a way that loses precision. Document begins below. [PASTE DOCUMENT]",
    "notice": "The 200K context window is the killer feature here — you can drop in a full deposition transcript and get usable synthesis in 90 seconds. Watch the page cites carefully and spot-check 5-10 of them against the source. The quality of citation precision is the quality of the output.",
    "trap": "The trap is trusting the page cites without spot-checking. Claude is good but not perfect on page-pinning. Spot-check at least 10% of the citations. If any are wrong, audit harder. Also: never paste anything under a protective order without scrubbing the protective-order-triggering details first."
  },
  {
    "name": "Client communication draft (lawyer reviews every word)",
    "goal": "Produce a first-draft client letter that explains a complex legal situation in plain language without losing precision.",
    "ai": "Claude or ChatGPT (non-privileged version of the facts only) · final draft reviewed and revised by the responsible lawyer.",
    "prompt": "I need to write a client letter explaining [GENERIC LEGAL SITUATION — e.g., 'the implications of a recent regulatory change on a small business operating in this space']. The client is [CLIENT SOPHISTICATION LEVEL — e.g., 'a small-business owner with no legal background']. The letter should: (1) state the legal situation plainly in the first paragraph, (2) explain what changed and when, (3) explain what it means for the client's specific posture, (4) list the options the client has and the tradeoffs, (5) recommend a course of action with reasoning, (6) close with next steps and how the client can reach me. Tone: warm but precise. No legalese unless necessary, and define any legalese on first use. Do not invent facts about the client's situation — use only the generic facts I provide. Generic facts: [REDACTED FACTS]",
    "notice": "AI is genuinely good at the plain-language translation layer that good client letters require. Use it as a first draft. Every sentence still gets your eyes on it before it ships. Strip any AI flourishes that sound generic — 'I hope this letter finds you well' is a tell.",
    "trap": "The trap is letting the draft ship without lawyer review of every sentence. The signature on the letter is yours. If AI mis-states the law in a sentence and the client relies on it, you own that. Also: never paste the actual client facts. Work in generic terms and add the client-specific framing in your own revision pass."
  },
  {
    "name": "Brief outlining with citation discipline",
    "goal": "Generate a structured brief outline with argument sequence, then verify every single authority before any of it gets written into a draft.",
    "ai": "Casetext / Lexis+ AI / Westlaw Precision AI (legal-grounded) preferred over general AI for any task involving case citations.",
    "prompt": "I am writing a [TYPE OF BRIEF — e.g., motion to dismiss, summary judgment opposition, appellate brief] in [JURISDICTION — e.g., Eastern District of New York / California Court of Appeals]. The core legal question is [LEGAL QUESTION STATED ABSTRACTLY, NO CLIENT FACTS]. Produce a brief outline with: (1) the preliminary statement framing, (2) the argument section structure with numbered headings, (3) for each argument, the key cases or statutes that need to be addressed, (4) the most likely counter-arguments and where in the brief to preempt them, (5) the standard of review and where it should be stated. For every case you cite, give a one-line description of the holding. I will verify every citation in Westlaw before any of this becomes a draft. If you are not certain a case exists, say 'doctrine reference — verify' instead of inventing a citation.",
    "notice": "Watch the citation list. Pull every case in Westlaw. Read the actual opinion, not just the headnote. If even one citation in the AI's output is hallucinated, increase your skepticism of the rest of the output proportionally. A 1-in-20 hallucination rate compounds across a brief.",
    "trap": "The trap is the speed feels intoxicating. You have an outline with a dozen citations in five minutes. The discipline is to slow down at the verification step. Every cite. No exceptions. Not 'most of them.' Every one. This is the rule that separates lawyers who use AI safely from lawyers who become sanctions case studies."
  },
  {
    "name": "Contract clause-checking",
    "goal": "Run a contract through a structured clause-by-clause review against a reference standard, surfacing risks, missing provisions, and unfavorable terms.",
    "ai": "Claude (200K context, Team plan with zero-retention) for non-privileged contract review · local Ollama for anything privileged or attorney work-product.",
    "prompt": "I am reviewing a [CONTRACT TYPE — e.g., SaaS MSA, commercial lease, employment agreement] from the [CLIENT SIDE — e.g., customer side, tenant side, employee side]. Please review the attached contract clause-by-clause and produce: (1) a clause inventory listing every defined section, (2) for each clause, an assessment of whether the language is standard / favorable / unfavorable / unusual from my client's posture, (3) the 10 highest-risk clauses with specific concerns, (4) standard clauses that are missing from this contract that should be present, (5) defined terms that are used inconsistently or ambiguously, (6) the cross-references that point to non-existent sections, (7) any clause that references external documents, schedules, or exhibits that should be reviewed alongside this one. Do not invent legal authority — if a clause raises a doctrine like unconscionability or public policy, name the doctrine without inventing case citations. Contract begins below. [PASTE CONTRACT]",
    "notice": "The cross-reference check and missing-clause check are where AI earns its keep. A human reviewer will catch the obvious things. AI is uniquely good at the 'this section references Section 12.4(b) but there is no Section 12.4(b)' catch, and at the 'industry standard would have a most-favored-nations clause and this contract has none' surfacing.",
    "trap": "The trap is treating the output as the review. It is the first pass. The negotiation strategy, the deal-killer call, the redline priorities — those are the lawyer's work and they require knowing the client, the deal, the counterparty, and the relationship context that AI does not have."
  },
  {
    "name": "Practice-management retro",
    "goal": "Review last month's matters, time entries, and outcomes to surface patterns — where time is leaking, which matter types are profitable, where automation could help.",
    "ai": "ChatGPT or Claude on anonymized billing and matter data · local Ollama if any matter-identifying detail is involved.",
    "prompt": "I am running a monthly practice retro on a [SOLO / SMALL-FIRM] practice in [PRACTICE AREA]. Below is anonymized data: matter types, hours billed per matter type, realization rates per matter type, average matter duration, write-off rates, and a list of administrative tasks that consumed significant time. Help me identify: (1) which matter types are underwater on realization and why that might be, (2) which matter types are profitable and worth doubling down on, (3) administrative tasks that are candidates for automation or delegation, (4) capacity bottlenecks — which weeks were over-scheduled and which were under-scheduled, (5) the three highest-leverage operational changes I could make in the next quarter. Data: [PASTE ANONYMIZED PRACTICE DATA]",
    "notice": "This is one of the lowest-risk highest-leverage uses of AI in practice. Practice ops is not legal advice. The output is for your own decision-making, not for clients. Treat it as a thinking partner on the business of the practice, not the practice itself.",
    "trap": "The trap is anonymization that is not actually anonymization. 'My client in the helicopter manufacturing matter' is not anonymized even if you removed the client name. Strip the matter to its abstract type before pasting. Also: AI cannot tell you whether to fire a client. That is your call."
  },
  {
    "name": "Citation verification gauntlet (the discipline)",
    "goal": "Run every AI-generated citation through Westlaw or Lexis before any AI-assisted brief, motion, or memo gets filed. The non-negotiable safety rail.",
    "ai": "Westlaw or Lexis (verification layer — not the AI itself) · combined with structured discipline.",
    "prompt": "I have an AI-assisted draft of a [BRIEF / MEMO / MOTION]. Below is a list of every case citation, statute citation, regulation citation, and rule citation that appears in the draft. For each, I am going to: (1) pull the citation in Westlaw, (2) confirm the case exists and the cite is correct, (3) read the actual opinion (not just the headnote), (4) confirm the proposition in my draft is supported by the actual holding, (5) confirm the case has not been overruled, distinguished into oblivion, or limited to its facts. I am attaching the citation list. Help me organize the verification: (a) note which citations are doing the heaviest lifting in the brief, (b) flag any citation that looks unusual or that I should be particularly skeptical of, (c) suggest the Shepardize/KeyCite checks that should be run on the most important citations. I will then physically pull every cite. Citation list: [PASTE LIST]",
    "notice": "This is the workflow that prevents the Mata v. Avianca scenario. It is boring. It is slow. It is the difference between a lawyer who uses AI and a lawyer who gets sanctioned. Build it into your process as a non-skippable step. No exceptions for tight deadlines.",
    "trap": "The trap is the time pressure. The brief is due tomorrow. The AI gave you a beautiful draft with 30 citations. The temptation is to spot-check half of them and trust the rest. Do not. Every cite. Every time. If you cannot verify every cite in the time available, cut the cites you cannot verify or push the deadline. There is no middle ground that is safe."
  },
  {
    "name": "Privilege-protected drafting on local Ollama",
    "goal": "Use AI on matter-identifying privileged work without ever sending the privileged content to a cloud service.",
    "ai": "Ollama (local) with llama3.1:70b or qwen2.5:32b running on your own machine.",
    "prompt": "[Run locally via Ollama on your laptop. Nothing leaves your machine. Same prompt structure as the cloud-based workflows above, but you can include actual client names, matter details, and privileged content because it never touches a third-party server.] I am the attorney of record on [SPECIFIC MATTER, REAL DETAILS]. The privileged communication I need to analyze is: [PASTE ACTUAL PRIVILEGED CONTENT]. Help me identify: [TASK]. Treat all content as attorney-client privileged work product covered by Model Rule 1.6.",
    "notice": "Local model quality is meaningfully below frontier cloud models. You will get less polished output. The trade is privilege protection that is absolute, not contractual. For high-stakes privileged work, this is the only acceptable AI workflow until you have a vendor with a signed agreement that meets your bar's confidentiality requirements.",
    "trap": "The trap is the temptation to 'just use ChatGPT this once' because the local model is slower or less capable. Privilege does not survive that decision. Build the local-Ollama workflow now, before a tight deadline tests your discipline. The slower model is the only safe model for privileged work right now."
  }
],
  regulations: [
  {
    "name": "ABA Model Rule 1.1 (Competence)",
    "matters": "Competence now includes understanding the benefits and risks of relevant technology. Using AI without understanding hallucination, training cutoffs, and verification needs is a Rule 1.1 problem."
  },
  {
    "name": "ABA Model Rule 1.6 (Confidentiality)",
    "matters": "Sending client confidences to a cloud AI without confidentiality protections is a Rule 1.6 violation. Vendor terms, retention policies, and training-data clauses must be reviewed before any privileged use."
  },
  {
    "name": "ABA Model Rule 5.3 (Supervision of Non-Lawyer Assistants)",
    "matters": "AI is a non-lawyer assistant. Lawyers must supervise its work product the same way they supervise a paralegal or contract attorney. No 'the AI did it' defense."
  },
  {
    "name": "ABA Formal Opinion 512 (July 2024) — Generative AI Tools",
    "matters": "The authoritative national-level ABA opinion on lawyer use of generative AI. Covers competence, confidentiality, communication with clients about AI use, candor to the tribunal, supervision, and fees. Required reading."
  },
  {
    "name": "Model Rule 3.3 (Candor Toward the Tribunal)",
    "matters": "Submitting hallucinated citations to a court — even unknowingly — implicates the candor duty. The discipline of citation verification is a Rule 3.3 obligation, not a best practice."
  },
  {
    "name": "State bar AI ethics opinions (CA, NY, FL, TX, and growing)",
    "matters": "Multiple state bars have issued AI-specific ethics opinions. California Bar Practical Guidance (Nov 2023), New York State Bar Task Force Report, Florida Bar Opinion 24-1, and others. Check your jurisdiction's most recent guidance before adopting any AI workflow."
  },
  {
    "name": "Federal district court standing orders on AI",
    "matters": "Several federal districts (N.D. Tex., E.D. Pa., and others) have standing orders requiring disclosure of AI use in filings and certifying that AI-generated content has been verified. Check the judge's standing order on every matter."
  },
  {
    "name": "Model Rule 1.5 (Fees)",
    "matters": "If AI substantially reduces the time required for a task, billing the pre-AI hours is a Rule 1.5 'reasonable fee' problem. Fee structures should be honest about AI-assisted efficiency."
  }
],
  caseStudy: {
  "persona": "Solo immigration and family law attorney, 11 years in practice, Marco Island area, two-person office with one paralegal, average matter load of 40 active files.",
  "before": "Was working 65-hour weeks to keep up with caseload. Doing all the brief writing, all the client letters, all the deposition prep personally. Considering hiring a contract associate but the math did not work on the practice's margins. Quietly skeptical of AI after reading the Mata v. Avianca sanctions order and watching colleagues stumble.",
  "shift": "Started in late 2024 with one workflow only — the long-document review on Claude 200K, used on deposition transcripts and immigration agency records. The 200-page agency file that used to take 4 hours to read and summarize started taking 25 minutes plus a 15-minute spot-check of the page citations. Added the issue-spotting workflow next, then the client letter draft workflow with strict lawyer-review-every-word discipline.",
  "outcome": "By month four, average matter time dropped 35% without quality degradation. Client letters became more readable because the plain-language translation pass was forcing simpler explanations. Caught two issues in agency records that had been missed on the first human read because the AI synthesis surfaced an inconsistency on page 187 that nobody noticed by hand. Realization rate went up because billable hours were now spent on judgment work, not page-turning. Practice took on 30% more matters without adding a hire. Most important outcome was the one that did not happen — never submitted a hallucinated citation, because the citation verification gauntlet was built into the workflow from day one.",
  "trap": "Almost shipped a motion in month two with three citations from Casetext that looked perfect, did not verify them because the deadline was tight and Casetext is legal-grounded. One of the three had a wrong reporter cite that would have been embarrassing in front of the judge. Caught it because the paralegal had been trained to spot-check every cite regardless of source.",
  "fix": "Made citation verification a separate ledger step with its own checklist. No exceptions. Even for legal-grounded AI tools like Casetext and Lexis+ AI. The paralegal pulls every cite in Westlaw, reads the opinion, marks the citation list as verified, and only then does the brief get a final read. Adds 30 minutes to the workflow and has prevented at least four citation errors in two years.",
  "pullQuote": "The AI is faster than I am at reading. It is not better than I am at thinking. The trick is letting it do the reading and refusing to let it do the thinking."
},
  upskill: "A practitioner graduates from atomeons.com/learn to ORANGEBOX-grade operating by building the citation-verification gauntlet into muscle memory, standing up a local Ollama workflow for privileged matters before any deadline tests it, and treating the AI-assisted brief outline as the start of legal reasoning rather than the end. The lawyers who get this right end up running a leveraged practice with a research associate that scales without supervision overhead. The lawyers who skip the discipline end up reading their case names off a sanctions order. The ORANGEBOX track exists to make the discipline structural rather than aspirational — workflows, receipts, and verification gates that travel with you from matter to matter.",
} as const;

export const metadata: Metadata = {
  title: "Legal AI · /learn · AtomEons",
  description: "The research associate that never sleeps · and never appears in court · The legal profession has a peculiar relationship with AI right now. Half the bar is sprinting toward it. The other half is reading sanctions orders out loud at CLE events. Both reactions miss the point.\n\nGenerative AI is, structurally, a junior resea",
  alternates: { canonical: "https://atomeons.com/learn/legal-ai" },
  openGraph: {
    title: "Legal AI · /learn",
    description: "The research associate that never sleeps · and never appears in court",
    url: "https://atomeons.com/learn/legal-ai",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal AI · /learn",
    description: "The research associate that never sleeps · and never appears in court",
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
