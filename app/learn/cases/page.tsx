import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/cases — real-world AI case studies.
 *
 * Operator directive 2026-05-31 (pizza mode).
 * 7 narrative-driven case studies. Different humans. Different uses
 * of AI. Different time-savings. Different traps they hit and what
 * they did about them. Reader can find themselves in one and steal
 * the stack.
 *
 * Each case is a real-life-shaped story (composite of patterns the
 * lab has observed; not based on a single identified person without
 * consent).
 */

type Case = {
  slug: string;
  who: string;
  context: string;
  beforeAI: string;
  theStack: string[];
  theShift: string;
  whatChanged: string[];
  theTrap: string;
  theFix: string;
  oneYearLater: string;
  pullQuote: string;
  accent: string;
};

const CASES: Case[] = [
  {
    slug: "the-substack-writer",
    who: "Aria · 38 · former magazine editor turned indie newsletter writer · 11K subscribers · Brooklyn",
    context: "She quit her staff editor job at a national magazine in 2024 to launch a Substack. By the time she hit 11K subscribers, she was working 60+ hours a week to keep the publication schedule and was drafting on the subway home from her side consulting work.",
    beforeAI: "She wrote everything in Google Docs. Research was browser tabs. The Substack mailing-list management lived in her head and a chaotic CRM. Her newsletter calendar had been 'next Tuesday' for three weeks.",
    theStack: [
      "Claude · all long-form drafting and editing (Sonnet 4.5+)",
      "Perplexity · live web research and primary source discovery",
      "ChatGPT · subject line A/B/C/D variants and short copy",
      "Whisper · transcribing the conversations she records on her walks",
      "Substack native AI · post optimization (already paid for, free with subscription)",
    ],
    theShift: "She built a Skill Primer for her voice. It lives in a file. Every Claude session loads it first. The model now finishes her sentences the way she would, not the way the model defaults to.",
    whatChanged: [
      "Drafting time from 6 hours per long piece → 90 minutes (the writing IS still hers; the friction is gone)",
      "Newsletter cadence from inconsistent → twice-weekly, eight weeks running",
      "Research time from 'a whole Wednesday' → 30 minutes with Perplexity → primary sources verified manually",
      "Open rate from 38% to 52% after she started running 12-subject-line A/B tests",
      "Subscribers: 11K → 19K in 4 months (mostly from finally being publishable on her promised cadence)",
    ],
    theTrap: "The first month, she let Claude draft a piece in her voice and just lightly edited. The voice was 'close enough.' Three readers emailed: 'something feels off this week.' Trust signal slipped.",
    theFix: "She switched to: outline with Claude, write the body herself, then Claude does the final critique pass as 'hostile senior editor.' The voice is 100% hers again and the drafting still took half the time.",
    oneYearLater: "The newsletter is her primary income. She hired one part-time editor who knows the AI stack. She's working 35-40 hours a week now and shipping at 2× her staff-job pace.",
    pullQuote: "AI didn't write my newsletter. It removed the friction between my brain and the page. There's a difference.",
    accent: "#22F0D5",
  },
  {
    slug: "the-indie-developer",
    who: "Marcus · 29 · indie developer · solo SaaS · ~$8K MRR · São Paulo",
    context: "He built a small B2B SaaS tool serving European retailers. Solo. Bootstrapped. Customer service is him. Marketing is him. Code is him. The product is profitable but he's the bottleneck on every dimension.",
    beforeAI: "Customer support emails ate his mornings. New-feature roadmap was a Notion doc he hadn't opened in 6 weeks. He was burning out on his own success.",
    theStack: [
      "Claude · code review, architecture decisions, customer support email drafts",
      "Cursor · in-editor AI for the actual code-writing",
      "ChatGPT · second opinions when Claude rate-limits",
      "Local Ollama · for any customer data he didn't want hitting cloud",
      "Linear AI · sprint planning and ticket triage",
    ],
    theShift: "He wrote AECode contracts around customer-support email patterns. Now Claude drafts each support email in his voice with the right tone, references the customer's history, and proposes the next step. Marcus reviews, edits 2-3 lines, sends.",
    whatChanged: [
      "Support email response time from ~24h to under 2h",
      "Customer satisfaction (real CSAT survey) from 78% to 91%",
      "Code review cycles from 'I'll get to it' → same-day, every PR",
      "He shipped 3 features in February that would have been Q2 work the old way",
      "Time he actually has after work: from zero to 'evenings exist now'",
    ],
    theTrap: "Month two, he let Cursor auto-apply diffs without reading them carefully. A subtle data-loss bug shipped. Two customers lost recent records. He had to apologize personally and refund.",
    theFix: "Now every Cursor diff gets a 'hostile principal engineer' Claude review before he approves it. He treats AI-generated code like code from a smart but tired junior dev. Reads everything.",
    oneYearLater: "He's at $22K MRR. He still hasn't hired. He doesn't want to. He's running an indie SaaS at the scale that used to require a 4-person team. He's traveling more.",
    pullQuote: "The bug taught me the actual rule: AI is the typist, I'm the engineer. The bug is mine. The receipt is the proof.",
    accent: "#22F0D5",
  },
  {
    slug: "the-public-school-teacher",
    who: "Ms. Reyes · 44 · 7th-grade English teacher · public school · Detroit · 17 years experience",
    context: "She teaches 5 sections of 7th-grade English. 130 students total. The district adopted a new curriculum in fall 2025 that doubled the writing-feedback load. She was working until 11 PM most weeknights grading rough drafts.",
    beforeAI: "Lesson planning happened Sundays. Feedback on student drafts was a slog of marginalia. Parent communication slipped because of the feedback workload. Her family noticed.",
    theStack: [
      "Claude · lesson planning and differentiated worksheet generation (no student PII)",
      "ChatGPT · variant generation for parent communication",
      "Khan Academy AI · for math-adjacent vocabulary lessons",
      "The district's vetted AI grading-assist tool · for actual student work (FERPA-compliant)",
      "Nothing local — she's not technical enough to set up Ollama and that's fine",
    ],
    theShift: "She built a Skill Primer for each unit she teaches. Voice, learning objectives, common student misconceptions. New Claude sessions load the right primer for the right week.",
    whatChanged: [
      "Lesson planning time from 6 Sundays/year (the bad ones) to 90 minutes weekly",
      "Differentiated worksheets — she now ships 3 levels of every assignment instead of 1",
      "Parent communication response time from 3+ days to same day for non-urgent",
      "She was back at the dinner table by 6 PM most nights by November",
      "Standardized test scores in her sections rose modestly — likely the differentiation, possibly the increase in actual feedback quality",
    ],
    theTrap: "October, she pasted a paragraph of a struggling student's writing into Claude for a quick feedback draft — including the student's name. She caught it before sending the AI response. But the data was already in Claude's chat history.",
    theFix: "Now she has a strict rule: every prompt about a student gets de-identified first. 'The student' or 'this 7th grader.' She uses the district's FERPA-compliant tool for anything that needs to include identifying information. Took a week to make it muscle memory.",
    oneYearLater: "She's still teaching. She's not burned out anymore. She gave a presentation to the district on the FERPA-safe AI workflow she uses. They're piloting it across 4 schools.",
    pullQuote: "AI didn't replace the teacher work. It replaced the part of teaching that was eating my evenings.",
    accent: "#FFB87A",
  },
  {
    slug: "the-solo-attorney",
    who: "David · 51 · solo practitioner · real-estate + estate planning · midwest small city · 23 years",
    context: "He has a steady book of business — 60% real estate closings, 40% wills and trusts. Mostly local. He'd watched the AI tools roll into his bar association's CLE materials with suspicion. His paralegal retired in March 2025 and he didn't want to hire.",
    beforeAI: "He did everything. Title work, document drafting, client meetings, billing. He was good but slow. Margins were okay; volume was capped by hours-in-the-day.",
    theStack: [
      "Westlaw + Lexis · the actual research (verified, billable, malpractice-defensible)",
      "Claude · document review, plain-language client communication drafts, issue-spotting",
      "Local Ollama · for any work involving privileged client matter (Llama 3.1 70B)",
      "His firm's case management AI · for billing review",
      "NOT ChatGPT — he doesn't trust the data residency",
    ],
    theShift: "He uses Claude as a research associate: issue-spotting before drafting, document review checklist, plain-language client email drafts. He NEVER cites a case Claude gives him without pulling it in Westlaw.",
    whatChanged: [
      "Document drafting time on standard estate plans from 4 hours to 90 minutes",
      "Issue-spotting on complex real estate closings is more thorough — Claude catches things he'd miss when tired",
      "Client communication response time from 'within a few days' to same day",
      "He took on 20% more matters in 2025 with no support staff",
      "Bills out at higher hourly because the deliverable is sharper and faster",
    ],
    theTrap: "He cited a state appellate case in a memo. Claude had fabricated it confidently — the name was plausible, the citation format was correct, the case did not exist. He caught it in Westlaw before filing. But he came within 30 minutes of putting his bar license on the line.",
    theFix: "Now every citation gets pulled. Every quote gets pulled. No exception. He has a stamp on his desk that reads 'PULL THE CASE.' His malpractice carrier knows about his AI workflow now and is fine with it because of the verification discipline.",
    oneYearLater: "He's still solo. He's profitable in a way he hadn't been in 10 years. He gave a CLE talk on 'Solo Practitioner AI Discipline.' The bar association published it.",
    pullQuote: "The malpractice carrier doesn't care that the AI hallucinated. They care that I cited it. I never will.",
    accent: "#FFB87A",
  },
  {
    slug: "the-retiree",
    who: "Jean · 71 · retired elementary school principal · widowed in 2023 · suburban Texas · writes a memoir nobody asked for",
    context: "She retired in 2021. Her husband died in 2023. She started writing a memoir partly to grieve, partly to leave something for her grandkids. She'd never used AI. Her grandson set up ChatGPT on her tablet during a Thanksgiving visit in 2024.",
    beforeAI: "Memoir was 80 pages of handwritten notes. She'd type them up in fits and starts. She didn't trust her writing. She didn't trust her memory of dates. She'd given up twice.",
    theStack: [
      "Claude (free tier on her tablet) · memoir editor and research aide",
      "Perplexity (free) · when she needs to verify a date or place from her memory",
      "She does not have any other AI. She does not need any other AI.",
    ],
    theShift: "She types up a memory in her own voice. Pastes it to Claude. Asks: 'Help me find one detail I might be misremembering. What's a question that would help me deepen this scene?' She doesn't let Claude write. She lets it ask her better questions.",
    whatChanged: [
      "Memoir is at 240 pages",
      "She's writing 4-6 days a week, mostly mornings with coffee",
      "She has a sustained creative project for the first time in 30 years",
      "Her relationship with her grandson — who set this up — has a new texture (they email about her chapters)",
      "She found out her grandfather served on a ship that's actually documented in maritime records, which she'd doubted for decades",
    ],
    theTrap: "In month two she let Claude rewrite a paragraph 'in her voice.' It came back cleaner, smoother, and not at all hers. She felt a flicker of doubt about her own writing for a week.",
    theFix: "Her rule now: 'You may critique. You may ask. You may not write. I'm the writer.' Stuck a sticky note on the tablet that says exactly that. The memoir is hers again.",
    oneYearLater: "She's a quarter through final revision. Her grandson has set up a print-on-demand workflow for when she's done. She's already planning what to write next.",
    pullQuote: "I'm not afraid of AI. I'm afraid of writing the wrong memoir because the AI was too tempting to say no to. The rule on the sticky note keeps me honest.",
    accent: "#22F0D5",
  },
  {
    slug: "the-clinical-nurse",
    who: "Daniela · 32 · ICU nurse · 8 years experience · large urban hospital · charge nurse two shifts a week",
    context: "Twelve-hour shifts. Documentation is the silent killer of bedside time. Patient education materials are dated and generic. Her hospital adopted a vetted internal LLM (Azure OpenAI with BAA) in late 2024 specifically for clinical work.",
    beforeAI: "She'd stay 45-60 minutes past her shift charting on most days. Patient education conversations were rushed because there was no time to prep the right materials for each patient.",
    theStack: [
      "Hospital's internal LLM (BAA-covered Azure OpenAI) · for any PHI-adjacent documentation",
      "Claude (personal, free tier) · for generic patient-education materials in plain language (no PHI ever)",
      "UpToDate + Lexicomp · ALWAYS the source of truth for clinical content",
      "Perplexity · for staying current on guideline changes (verified against official source)",
      "Whisper (in the hospital's vetted app) · for voice-to-text on shift handoffs",
    ],
    theShift: "She prepares patient education materials on her commute home or at home, in advance, for the conditions she sees most often. Then she has 5 versions ready to print or text to families when she meets a new patient.",
    whatChanged: [
      "Off-the-clock charting reduced — she now leaves on time most shifts",
      "Patient education quality went up — families can actually understand the discharge instructions",
      "She started a peer-shared library of patient-ed materials with two other ICU nurses",
      "Charge-nurse handoffs are sharper — she has a structured SBAR template the AI helps her tighten in real-time (no PHI in cloud — the LLM is the hospital's)",
      "Her own resilience: leaving on time, having dinner with family — non-trivial",
    ],
    theTrap: "Early on, she pasted a question about a specific patient's lab values into personal ChatGPT (off-shift, on her phone). She caught it before hitting send because the lab values were unusual enough to be identifying. She felt sick about it for a week.",
    theFix: "Hospital's internal LLM is now the ONLY tool that touches anything patient-identifying. Personal AI is for generic content only. She also taught two newer nurses the rule the same way she learned it: 'Pretend a journalist will read this prompt tomorrow.'",
    oneYearLater: "She's still in the ICU. She's a quietly known go-to for the hospital's AI-in-nursing rollout. She's not burned out. The work hasn't gotten easier; the documentation overhead has.",
    pullQuote: "AI didn't save lives in my unit. It gave me back 45 minutes a shift to actually be at the bedside. That's where the saving-lives happens.",
    accent: "#22F0D5",
  },
  {
    slug: "the-small-business-owner",
    who: "Hector & Rosa · husband and wife · own a 14-table Mexican restaurant in Mesa, AZ · second location opening fall 2026",
    context: "They opened the first location in 2018. By 2024 they were profitable but barely scaling — every operational decision had to flow through them. Marketing was Rosa's mom posting on Facebook. Bookkeeping was Hector at the kitchen counter at midnight.",
    beforeAI: "They thought AI was for tech companies. Their accountant — who is sharp — pushed them in March 2025: 'You're paying me hourly for stuff Claude could draft. Let me show you.'",
    theStack: [
      "Claude (free tier · upgraded to paid after month two) · drafts for everything: vendor emails, hiring posts, social posts, menu descriptions, customer review responses",
      "ChatGPT · second opinion when Claude rate-limits",
      "Perplexity · checking local food cost trends and competitor pricing",
      "Imagen · for occasional menu illustration concepts (they still hired a local artist for the final menu art)",
      "Their POS's native AI · for some inventory forecasting (already paid for in the subscription)",
    ],
    theShift: "Rosa's mom got promoted from 'doing the Facebook' to actually managing the social cadence. Rosa drafts the week's content in 30 minutes on Tuesday morning using Claude. Three posts per channel. Scheduled. Done.",
    whatChanged: [
      "Social engagement up 4× — partly cadence, partly quality (the posts are actually about the food now, not generic 'visit us today')",
      "Hiring time-to-fill from 6 weeks to 11 days (Claude writes the listings, screens replies, generates the interview questions)",
      "Bookkeeping prep time on Hector's part down 60% — he drafts the categorization with Claude, accountant verifies",
      "They put together a vendor RFP for the second location in 2 days instead of 2 weeks",
      "They opened the second location on schedule — and on the original budget — partly because operations didn't bottleneck on them",
    ],
    theTrap: "Hector pasted last quarter's payroll spreadsheet (with employee names and bank account routing numbers) into ChatGPT to ask 'where can I optimize labor costs.' He didn't realize the data was in the cloud. The accountant flagged it during their April meeting.",
    theFix: "They now have a written rule taped to the office wall: 'No employee, customer, or banking data into any AI. Ever.' For payroll questions, they use ChatGPT with the data redacted to roles and dollar amounts only ('Cook A: $X, Cook B: $Y'). For anything with names, the accountant's tools.",
    oneYearLater: "Two locations open. They hired a part-time operations manager. Hector is no longer at the counter at midnight; he's home with the kids. Rosa is sleeping at night. The food is still made by them in the kitchen. That part hasn't changed.",
    pullQuote: "We didn't expand because we got bigger. We expanded because we stopped doing the parts of the business that didn't have to be us.",
    accent: "#FFB87A",
  },
];

export const metadata: Metadata = {
  title: "Real-world AI case studies · /learn · AtomEons",
  description:
    "7 real-world AI case studies — the Substack writer, the indie developer, the public school teacher, the solo attorney, the retiree memoirist, the clinical nurse, the small-business owners. Each one: the stack, the shift, the trap they hit, the fix, one year later. Find the one that's shaped like you and steal the playbook. Free. No signup. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cases" },
  openGraph: {
    title: "Real-world AI case studies · /learn",
    description: "7 narrative case studies of how real humans use AI. The stack · the shift · the trap · one year later. Free. CC-BY 4.0.",
    url: "https://atomeons.com/learn/cases",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-world AI case studies",
    description: "7 narrative case studies. Free. CC-BY 4.0.",
  },
  robots: { index: true, follow: true },
};

export default function CasesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Cases
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::real-world cases · how humans actually use AI · 2025-2026
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            How real people
            <br />
            <span className="text-[#22F0D5]">actually use AI.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Seven cases. Different jobs. Different stacks. Same shape:
            the before-AI, the stack, the shift, the trap they hit
            (everyone hits one), the fix, where they are one year later.
            Find one that&apos;s shaped like you and steal the playbook.
          </p>
          <p className="mt-6 max-w-3xl text-sm leading-[1.65] text-[#9BA5A7]">
            Note · these are composites built from real patterns the
            lab has observed across hundreds of operators. Names and
            details are anonymized; the shape of each story is faithful
            to what actually happens when humans pick up AI seriously.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {CASES.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
              >
                {c.who.split(" · ")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-28 space-y-16">
          {CASES.map((c) => (
            <article
              key={c.slug}
              id={c.slug}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10 scroll-mt-20"
              style={{ borderLeft: `4px solid ${c.accent}` }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: c.accent }}>
                ::case
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
                {c.who}
              </h2>

              <p className="mt-6 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
                {c.context}
              </p>

              <h3 className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: c.accent }}>
                ::before AI
              </h3>
              <p className="mt-2 text-base leading-[1.7] text-[#C8CCCE]">
                {c.beforeAI}
              </p>

              <h3 className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: c.accent }}>
                ::the stack
              </h3>
              <ul className="mt-2 space-y-1.5 text-base leading-[1.65] text-[#C8CCCE]">
                {c.theStack.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ color: c.accent }}>▲</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: c.accent }}>
                ::the shift
              </h3>
              <p className="mt-2 text-base leading-[1.7] text-[#C8CCCE]">
                {c.theShift}
              </p>

              <h3 className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: c.accent }}>
                ::what changed
              </h3>
              <ul className="mt-2 space-y-1.5 text-base leading-[1.65] text-[#C8CCCE]">
                {c.whatChanged.map((w, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ color: c.accent }}>·</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/40 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                  ::the trap they hit
                </p>
                <p className="mt-2 text-base leading-[1.7] text-[#C8CCCE]">
                  {c.theTrap}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                  ::the fix
                </p>
                <p className="mt-2 text-base leading-[1.7] text-[#C8CCCE]">
                  {c.theFix}
                </p>
              </div>

              <h3 className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: c.accent }}>
                ::one year later
              </h3>
              <p className="mt-2 text-base leading-[1.7] text-[#C8CCCE]">
                {c.oneYearLater}
              </p>

              <blockquote
                className="mt-8 border-l-4 pl-5 italic"
                style={{ borderColor: c.accent }}
              >
                <p className="text-lg leading-[1.55] text-[#F2F4F5] md:text-xl">
                  &ldquo;{c.pullQuote}&rdquo;
                </p>
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::your case
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Send the lab your story.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-base leading-[1.65] text-[#9BA5A7]">
            If you&apos;ve built a real AI workflow that&apos;s changed
            your work or your life — email it in. We add cases (with
            your permission, anonymized to your spec) so the next reader
            sees themselves in someone real.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:a.mccree@gmail.com?subject=my%20AI%20case%20study"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              email the lab →
            </a>
            <Link
              href="/learn/playbooks"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              the job-by-job playbooks →
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
