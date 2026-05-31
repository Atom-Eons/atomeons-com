import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/playbooks — job-by-job AI playbooks.
 *
 * The highest-leverage page on /learn. A visitor lands and finds the
 * exact AI playbook for the job they actually have. Each playbook is
 * comprehensive: the daily routine, the weekly routine, the specific
 * prompts, which AI to use for each task, what to never automate,
 * the trap, and what time it saves.
 *
 * Operator directive 2026-05-31 (pizza mode): "expand learn to be
 * industry best on internet learning for ai. all ideas in there that
 * make it useful."
 */

type Play = {
  goal: string;
  ai: string; // recommended model · plain-language
  prompt: string;
  notice: string;
  trap?: string;
};

type Playbook = {
  slug: string;
  job: string;
  who: string;
  oneLine: string;
  dailyHook: string; // the one play they do every morning
  saves: string; // hours per week typical
  stack: string[]; // tools we recommend they keep configured
  doNot: string[]; // things to never automate
  daily: Play[]; // 4-6 daily plays
  weekly: Play[]; // 3-4 weekly plays
  upskill: string; // single sentence: how to level up from this playbook
  accent: string;
};

const PLAYBOOKS: Playbook[] = [
  {
    slug: "writer",
    job: "Writer",
    who: "Freelance journalist · author · ghostwriter · newsletter operator",
    oneLine:
      "Use AI to amplify your voice, not replace it. The voice is the asset. The AI is the editor, the researcher, the second pair of eyes.",
    dailyHook:
      "Paste yesterday's draft into Claude. Ask: 'What's the weakest paragraph? Why? Suggest a sharper rewrite that keeps my voice.' Five minutes. Every morning.",
    saves: "8-14 hours / week",
    stack: ["Claude (writing partner)", "ChatGPT (research second-opinion)", "Perplexity (live web grounding)", "Grammarly or Hemingway (final pass)"],
    doNot: [
      "Generate finished articles from scratch with AI — the voice dies.",
      "Cite sources the AI gives you without manually verifying every link.",
      "Paste subscriber data, NDA material, or unannounced source identities into any cloud AI.",
    ],
    daily: [
      {
        goal: "Audit yesterday's writing",
        ai: "Claude · Sonnet 4.5+",
        prompt:
          "Here's a draft I wrote yesterday: [paste]. Read it once. Then tell me: (1) the weakest paragraph and why, (2) the strongest sentence and why, (3) one concrete rewrite of the weakest paragraph that keeps my voice. Do not be diplomatic.",
        notice: "AI defaults to flattery. Add 'do not be diplomatic' or 'tell me what would embarrass me at a journalism awards night.' Forces real critique.",
        trap: "Don't accept the rewrite verbatim. Use it as a target to write toward in your voice.",
      },
      {
        goal: "Research a story angle",
        ai: "Perplexity (web) · Claude (synthesis)",
        prompt:
          "I'm writing about [TOPIC]. Find the three most important primary sources from the last 18 months — academic papers, court filings, regulatory documents, leaked memos — that a serious journalist would cite. For each, give me: source name, date, the one claim that matters, the page or section where it appears, and the URL.",
        notice: "Perplexity grounds against the live web. Claude is better at follow-up synthesis. Use Perplexity for first-pass discovery, then paste the sources into Claude for analysis.",
      },
      {
        goal: "Headline + dek lab",
        ai: "Claude or ChatGPT",
        prompt:
          "Here's my draft: [paste]. Give me 12 headline options across these registers — 3 plain-spoken, 3 sharp/contrarian, 3 quietly intriguing, 3 SEO-prioritized. For each, also write the 25-word dek. Mark which one you'd ship and why.",
        notice: "Twelve options force range. Three registers force taste. The 'mark which you'd ship' line forces a defensible opinion you can react against.",
      },
      {
        goal: "Continuity check across a series",
        ai: "Claude (long-context)",
        prompt:
          "Here are my last 4 published pieces in this column: [paste all 4]. Audit them for: characters/sources I mentioned that I haven't followed up on, claims I made that need updating, voice drift (am I sounding like myself?), and one unanswered question the reader is probably asking that I haven't addressed.",
        notice: "Long context is Claude's strength. ChatGPT will skim. Use Claude when you need true cross-document analysis.",
      },
    ],
    weekly: [
      {
        goal: "Pitch list for editors",
        ai: "Claude",
        prompt:
          "I cover [BEAT]. Generate 15 story pitch one-liners for editors at [PUBLICATION 1, 2, 3]. For each pitch: the angle, why it matters this week specifically, my unique access or insight, the rough word count and form (feature / Q&A / first-person / investigation). Score each 1-10 on how strong an editor would find it.",
        notice: "The score forces tier-ranking. The 'this week specifically' grounds the pitch in news cycle.",
      },
      {
        goal: "Voice fingerprint check",
        ai: "Claude (long-context)",
        prompt:
          "Here are 8 paragraphs of my writing from over the years: [paste]. Reverse-engineer my voice fingerprint. Identify the sentence-length pattern, the rhetorical moves I rely on, the words I overuse, the words I never use, the cadence. Then tell me where in this paragraph from this week [paste] my voice slips and reads like AI.",
        notice: "Doing this once gives you a reusable rubric. Save the output to your skills/ folder.",
      },
    ],
    upskill:
      "When you're routinely shipping 3+ pieces per week with AI in the loop and the voice still survives, you're ready to graduate to the Operator level — start putting reusable Skill Primers on disk so a new Claude session learns your beat in 30 seconds.",
    accent: "#22F0D5",
  },
  {
    slug: "software-engineer",
    job: "Software Engineer",
    who: "Senior IC · staff engineer · solo founder · indie dev",
    oneLine:
      "AI is a junior pair-programmer that types fast and has read every Stack Overflow answer. You are the senior. You review every change. You own every bug.",
    dailyHook:
      "Before writing any new code, paste the target file + the task into Claude. Ask: 'Plan first. Don't code yet. What are the 3 cleanest implementations? What does each break? Which would you pick and why?'",
    saves: "10-20 hours / week",
    stack: ["Claude Sonnet (architecture + reviews)", "Cursor or Codex (in-editor edits)", "ChatGPT (alternate model when Claude rate-limits)", "Local Ollama (offline, sensitive code)"],
    doNot: [
      "Auto-approve diffs without reading them. The model writes the change — you own the bug.",
      "Paste production secrets, API tokens, or customer data into any cloud AI.",
      "Trust AI-generated security advice for crypto/auth without independent expert review.",
    ],
    daily: [
      {
        goal: "Architecture pass before code",
        ai: "Claude Sonnet 4.5+",
        prompt:
          "Here's the file I need to modify: [paste]. Here's the task: [task]. Don't write code yet. Give me 3 implementation approaches. For each: (1) the one-line summary, (2) what it breaks or trades off, (3) lines-of-code estimate, (4) the test you'd write to catch regressions. Then pick one and tell me why.",
        notice: "The 'don't code yet' constraint forces real planning. Most failures come from the AI rushing to code.",
      },
      {
        goal: "Diff review before you push",
        ai: "Claude",
        prompt:
          "Here's my diff: [paste git diff]. Review it like a hostile principal engineer. Look for: (1) edge cases I missed, (2) error paths I didn't handle, (3) data flow that could leak, (4) tests I should have written, (5) where I'm assuming behavior I haven't verified. Be specific. Cite line numbers.",
        notice: "Always run this before push. The 'hostile principal engineer' framing kills the AI's default flattery.",
      },
      {
        goal: "Bug repro from a stack trace",
        ai: "Claude",
        prompt:
          "Here's the stack trace: [paste]. Here's the relevant file: [paste]. Here's what the user did to trigger it: [steps]. Don't fix it yet. Walk me through the exact sequence of calls that produced this trace. Identify the most likely root cause. Then list 3 candidate fixes and the trade-offs.",
        notice: "Stack-trace → root-cause → candidate fixes. Skipping straight to 'fix it' gives you the symptom-patch, not the cause.",
      },
      {
        goal: "Test for a new behavior",
        ai: "Claude or Codex",
        prompt:
          "Here's the function I just wrote: [paste]. Write me the test suite: happy path, the three most likely edge cases, the most likely security edge case, the most likely concurrency edge case. Use [test framework]. Include both the test cases and the assertions.",
        notice: "Always ask for the security edge and the concurrency edge by name. The AI will skip them otherwise.",
      },
    ],
    weekly: [
      {
        goal: "Refactor opportunity scan",
        ai: "Claude (long context)",
        prompt:
          "Here's my codebase structure: [paste tree]. Here are 3 files I touched most this week: [paste files]. Identify 5 refactor opportunities worth doing this sprint — duplication, dead code, abstraction that paid off, abstraction that should be deleted. For each, the rough cost and the rough payoff.",
        notice: "Weekly cadence catches drift before it compounds.",
      },
      {
        goal: "Postmortem after a bug ships",
        ai: "Claude",
        prompt:
          "Here's a bug we shipped: [description]. Here's the root cause: [from your diff or your review]. Walk me through: (1) the test we should have had that would have caught it, (2) the lint rule that would have prevented it, (3) the code review checklist item that would have flagged it. Give me a one-paragraph postmortem suitable for a team channel.",
        notice: "Three layers of prevention (test / lint / review) means the bug class doesn't ship twice.",
      },
    ],
    upskill:
      "When you're shipping clean diffs daily and you've stopped reading AI-suggested code line-by-line because your skim-detection is accurate, graduate to Pilot — write AECode contracts that wrap every change and let the AI propose-test-promote autonomously with you reviewing only the receipts.",
    accent: "#22F0D5",
  },
  {
    slug: "founder",
    job: "Solo Founder",
    who: "Indie SaaS · solo agency · pre-revenue startup · post-PMF lab of one",
    oneLine:
      "AI is the cofounder you don't have to give equity to. You're still the operator — every meaningful decision still belongs to you.",
    dailyHook:
      "Open Claude. Paste yesterday's todos + your calendar + your inbox subject lines. Ask: 'What did I drop yesterday that compounds if I don't fix it today? What's the lowest-effort highest-leverage action I can take in the next 60 minutes?' Then do that action.",
    saves: "15-25 hours / week",
    stack: ["Claude (cofounder / strategy)", "ChatGPT (broad task aid)", "Perplexity (live market research)", "Ollama (private competitive intel)"],
    doNot: [
      "Outsource the founder's voice — pitches, founder letters, customer-facing posts must be in your hand.",
      "Paste subscriber lists, payment data, or customer support transcripts into cloud AI without redaction.",
      "Let AI write your contracts. It hallucinates clauses and you bear the legal cost.",
    ],
    daily: [
      {
        goal: "Daily focus + drop-set audit",
        ai: "Claude",
        prompt:
          "I'm a solo founder. Yesterday I did: [paste yesterday's accomplishments]. My calendar today: [paste]. My inbox subject lines: [paste]. Tell me: (1) what I dropped that compounds, (2) the 60-minute highest-leverage action available right now, (3) what to say NO to today without guilt, (4) one thing to delete from my calendar this week.",
        notice: "The 'NO without guilt' is the killer prompt. Most founders die from too-much, not too-little.",
      },
      {
        goal: "Customer email draft",
        ai: "Claude",
        prompt:
          "I'm responding to a customer who said: [paste their message]. Context they don't know: [paste]. My voice is direct, warm, no-nonsense. Write the response in 3 versions: (1) the empathetic-first version, (2) the solution-first version, (3) the boundaries version. Mark which you'd send and why.",
        notice: "Three versions = options. One version = the AI's bias dominates. Always ask for three.",
      },
      {
        goal: "Investor / advisor update",
        ai: "Claude",
        prompt:
          "I'm sending a monthly update to my advisors. Here's what happened this month: [paste]. Here are my metrics: [paste]. Here's what I'm worried about: [paste]. Draft the update in my voice. Lead with the hardest truth. End with one specific ask. Keep it under 400 words.",
        notice: "'Lead with the hardest truth' kills the usual update fluff and makes the email worth reading.",
      },
      {
        goal: "Daily revenue / pipeline pulse",
        ai: "Claude (with CSV)",
        prompt:
          "Here's my last 7 days of revenue / signups / cancels: [paste CSV]. What's the trend? What's noise? What's the one number I should be watching this week that I'm not? If I had to bet on one action this week to move the trend, what would it be?",
        notice: "Trend / noise / blind spot / bet. Four-part frame for any metric review.",
      },
    ],
    weekly: [
      {
        goal: "Competitive intel",
        ai: "Perplexity + Claude",
        prompt:
          "[Perplexity] Find the top 3 product updates / pricing changes / strategic moves from my 4 main competitors [list] in the last 7 days. [Then Claude] Here are the moves: [paste Perplexity output]. Tell me: (1) which moves matter to me, (2) which are theater, (3) what one move I should consider this month to stay ahead.",
        notice: "Perplexity for facts, Claude for synthesis. Two-model workflow.",
      },
      {
        goal: "Roadmap revisit",
        ai: "Claude",
        prompt:
          "Here's my current roadmap: [paste]. Here's what I've learned from customers this week: [paste]. Tell me: which items on the roadmap are now wrong? Which order should change? Which item, if I shipped it next, would teach me the most? Defend each call.",
        notice: "Roadmaps die from inertia. Weekly revisit forces honesty.",
      },
    ],
    upskill:
      "When you've stopped doing AI prompts and started writing reusable Skill Primers that any new AI session can load in 30s, you're operating. Stack the primers in a folder, version them, and a new model rotation (Sonnet 5, GPT-6) doesn't blow up your workflow.",
    accent: "#FF7A1A",
  },
  {
    slug: "teacher",
    job: "Teacher",
    who: "K-12 · community college · adult ed · homeschool · corporate training",
    oneLine:
      "AI is the curriculum designer who never sleeps. You still know the students. You still grade. The AI fills in the work in between.",
    dailyHook:
      "Before tomorrow's class, paste your lesson plan + the curriculum standard you're hitting + a sentence about your class's energy level. Ask: 'What's the warm-up question that pulls them in within 90 seconds? Generate 3 options.'",
    saves: "6-10 hours / week",
    stack: ["Claude (lesson planning)", "ChatGPT (worksheet generation)", "Gemini (image-prompt content)", "Ollama (privacy-sensitive student feedback)"],
    doNot: [
      "Paste student names, IDs, grades, IEPs, or any FERPA-protected information into cloud AI.",
      "Outsource grading to AI without spot-checking — bias creeps in faster than you think.",
      "Hand a student an AI-generated rubric without reviewing every item for your context.",
    ],
    daily: [
      {
        goal: "Tomorrow's lesson plan",
        ai: "Claude",
        prompt:
          "I teach [subject] to [grade]. Tomorrow's standard: [standard]. Today's class energy was [low / chaotic / focused / curious]. Generate a 45-minute lesson plan: 5-min warm-up, 15-min direct instruction, 20-min guided practice, 5-min exit ticket. Give me 3 different angles for the same standard so I can pick.",
        notice: "The energy variable is the secret ingredient. The same standard needs different framing for a tired Friday vs. a sharp Tuesday.",
      },
      {
        goal: "Differentiated worksheet",
        ai: "ChatGPT or Claude",
        prompt:
          "Here's the concept: [topic]. My class has 3 levels — strong, on-grade, behind. Generate a single worksheet with 12 problems, but mark each problem 1 / 2 / 3 by level. Same skill, different scaffold. Include an answer key with one-sentence explanations for the trickiest problems.",
        notice: "One worksheet, three levels, marked. That's the whole inclusion strategy in one prompt.",
      },
      {
        goal: "Parent communication draft",
        ai: "Claude",
        prompt:
          "I need to email a parent about [situation — DO NOT include student name or identifying info, use 'the student']. Tone: direct but warm. End with a clear next step. Keep it under 200 words. Generate 2 versions: (1) the kid is having a hard time, (2) the parent is going to push back.",
        notice: "Always redact identifying details. Cloud AI is not FERPA-compliant. Use Ollama (local) if the message must include specifics.",
      },
      {
        goal: "Quick formative check",
        ai: "Claude or ChatGPT",
        prompt:
          "I taught [concept] today. Generate 5 exit-ticket questions — 1 easy (rephrasing), 2 on-grade (application), 1 stretch (transfer), 1 misconception probe (a wrong answer that sounds right). Include answer key + what a wrong answer to each question would TELL me about the student's misunderstanding.",
        notice: "The 'misconception probe' is the diagnostic gold. Most exit tickets miss this.",
      },
    ],
    weekly: [
      {
        goal: "Unit retro",
        ai: "Claude",
        prompt:
          "I just finished [unit]. The class data: [average score, range, common mistakes]. The unit standards: [list]. Tell me: (1) which standards landed and which didn't, (2) what I'd change next year, (3) the one re-teach lesson I should slot before moving on, (4) the formative check question that would have caught the misconception earlier.",
        notice: "Retro every unit. The pattern across retros is what becomes your teaching wisdom.",
      },
      {
        goal: "Family-engagement micro-message",
        ai: "Claude",
        prompt:
          "Generate a 60-word weekly newsletter blurb for families. Topic: what we covered this week + one specific question they can ask at the dinner table that surfaces what their kid actually learned. Tone: warm, specific, no jargon.",
        notice: "'A question to ask at the dinner table' is 10× more useful to families than 'what we covered.' Reframe accordingly.",
      },
    ],
    upskill:
      "When you've built a folder of reusable lesson-frame Skill Primers, you've crossed into Operator. New AI sessions, new model versions, new years — the primers carry forward and you spend less time prompting and more time teaching.",
    accent: "#FFB87A",
  },
  {
    slug: "marketer",
    job: "Marketer",
    who: "B2B SaaS marketing · indie growth · in-house comms · agency strategist",
    oneLine:
      "AI doesn't replace strategy. It replaces the 'I'll just churn through this' drudgery between strategy and ship.",
    dailyHook:
      "Open Claude. Paste this week's campaign goal + yesterday's metrics. Ask: 'What's the one creative experiment we should try next that would teach us the most? What would the failure case look like? What would we measure?'",
    saves: "12-18 hours / week",
    stack: ["Claude (long-form + strategy)", "ChatGPT (variant production)", "Perplexity (competitor + trend signal)", "Midjourney or Imagen (creative)"],
    doNot: [
      "Auto-publish AI-generated social posts without a human-quality pass. The brand voice dies in volume.",
      "Use AI-generated 'data' or 'studies' in marketing claims unless you can independently verify every number.",
      "Paste customer PII or segment lists into cloud AI without redaction.",
    ],
    daily: [
      {
        goal: "Subject-line A/B/C/D lab",
        ai: "Claude",
        prompt:
          "I'm sending an email about [topic] to [audience description]. The body is: [paste]. Generate 12 subject-line variants across 4 registers: 3 plain-spoken, 3 sharp/contrarian, 3 curiosity-gap, 3 specific-promise. For each, predict the open-rate winner type for this audience and explain your reasoning. Tell me your pick of 3 to ship.",
        notice: "Always ask for predictions + reasoning. You'll start spotting which registers your audience actually rewards.",
      },
      {
        goal: "Ad creative variants",
        ai: "Claude + Imagen",
        prompt:
          "[Claude] Here's the offer: [paste]. Here's the audience: [paste persona]. Generate 8 ad headline + body-copy pairs across 4 hooks (problem-aware, solution-aware, brand-aware, social-proof). Mark which 3 to test first. [Then Imagen] Generate 4 thumbnail concepts that fit the top headline.",
        notice: "Two-model workflow: language model for copy, image model for thumbnails. Claude doesn't generate images natively; don't waste tokens trying.",
      },
      {
        goal: "Funnel-stage retro",
        ai: "Claude",
        prompt:
          "Here's last week's funnel: visits → signups → trial → paid. [paste numbers]. Where did we leak? Was the leak above or below the previous baseline? What's the one experiment that would move the worst stage by 10%? What's the read of the leak data IF we're in a noisy week with a holiday or news cycle?",
        notice: "Always include the 'noise check.' A bad funnel week with a holiday in it is signal-poor.",
      },
      {
        goal: "Brand-voice consistency check",
        ai: "Claude",
        prompt:
          "Here are 5 of our most successful posts: [paste]. Here's a draft I'm about to ship: [paste]. Does the draft sound like the same brand? Where does it drift? Give me a tighter rewrite in the brand voice.",
        notice: "Run this weekly across all channels (email, LinkedIn, X). Voice drift is the silent killer of brand equity.",
      },
    ],
    weekly: [
      {
        goal: "Trend signal scan",
        ai: "Perplexity",
        prompt:
          "What are the top 5 trending topics in [my industry / my target persona's world] this week? For each, give me: the volume signal (search trend, social volume, press mentions), the angle that would let our brand voice show up, the risk of jumping on it, the timing window.",
        notice: "Risk + timing window are the parts most marketers skip. They're where trend-jacking goes wrong.",
      },
      {
        goal: "Competitor pricing watch",
        ai: "Perplexity + Claude",
        prompt:
          "[Perplexity] Pull current pricing for [competitors]. [Claude] Compare our pricing to theirs in a 3-column table. Flag: where we're more expensive (and is the value gap real?), where we're cheaper (and is that signaling cheap-not-better?), where we have unique pricing structure that's confusing buyers.",
        notice: "Update the table monthly. Pricing pages move quietly and the buyer always notices before the marketer does.",
      },
    ],
    upskill:
      "When your brand voice fingerprint lives in a reusable Skill Primer that every Claude session loads automatically, and your weekly competitor table is auto-pulled by Perplexity into a structured doc you no longer manually write, you've graduated to Operator. The next step is putting AECode contracts around campaign-launch workflows so AI proposes, you approve, AI promotes.",
    accent: "#22F0D5",
  },
  {
    slug: "lawyer",
    job: "Lawyer",
    who: "Solo practitioner · small firm partner · in-house counsel · paralegal",
    oneLine:
      "AI is a research associate. You verify every cite. You don't outsource judgment. The malpractice carrier doesn't care that the AI hallucinated.",
    dailyHook:
      "Before drafting any document, open Claude and paste the matter facts + the document type. Ask: 'What are the 5 issues a senior partner would expect this document to address? For each, the most common drafting mistake.'",
    saves: "8-15 hours / week",
    stack: ["Claude (long-document analysis)", "ChatGPT (Q&A)", "Westlaw / Lexis (verification — NEVER skip)", "Ollama (privileged content)"],
    doNot: [
      "Cite a case the AI gave you without pulling and reading the case yourself. Hallucinated citations are a sanctions-level mistake.",
      "Paste client-identifying matter information into any cloud AI without checked privilege exposure.",
      "Use AI-generated contract clauses in jurisdictions you don't practice in without local-counsel review.",
    ],
    daily: [
      {
        goal: "Issue spot before drafting",
        ai: "Claude",
        prompt:
          "I'm drafting [document type] for a matter involving [redacted facts]. Don't draft yet. List the 5-7 issues a senior partner would expect this document to address. For each: (1) the issue in one sentence, (2) the most common drafting mistake at this issue, (3) the clause language pattern that protects against the mistake.",
        notice: "Never let the AI draft first. Issue-spot first, then draft. Otherwise you're correcting AI's instinct for the average matter.",
      },
      {
        goal: "Long-document review",
        ai: "Claude (200K context)",
        prompt:
          "Here's the agreement: [paste]. Read it once. Then identify: (1) the 5 most one-sided terms in favor of [counterparty], (2) the 3 ambiguities a litigator could exploit, (3) the standard clauses I'd expect to see that are missing, (4) any clause that conflicts with [jurisdiction] statutory limits.",
        notice: "Long context is Claude's killer feature for legal work. Don't paste 200-page agreements into ChatGPT.",
      },
      {
        goal: "Case-law starting point",
        ai: "Claude THEN Westlaw / Lexis",
        prompt:
          "[Claude] I'm researching [issue] in [jurisdiction]. What are the 5 most-likely-cited cases a practitioner would surface? For each, give me: (1) the case name and citation, (2) the holding in one sentence, (3) why it matters here. — [Then verify EVERY citation in Westlaw/Lexis before relying on it.]",
        notice: "Claude will hallucinate citations confidently. Always verify. Treat the AI output as a research-direction memo, not a research product.",
      },
      {
        goal: "Client communication draft",
        ai: "Claude",
        prompt:
          "I need to explain [legal concept] to a client who isn't legally trained. Their context: [redacted summary]. Generate the email in 3 versions: (1) the plain-language version, (2) the analogous-to-everyday-life version, (3) the strict-formal version. Mark which I should send to a sophisticated business client vs. a first-time founder.",
        notice: "The 'analogous' version is what wins long-term client trust. Use it freely.",
      },
    ],
    weekly: [
      {
        goal: "Practice-management retro",
        ai: "Claude",
        prompt:
          "Here are my matters this week: [redacted list with time]. Tell me: (1) which matter ate more hours than the typical, (2) where I should have delegated and didn't, (3) the matter type that's becoming my unprofitable cohort, (4) the matter type I should turn down going forward to protect my margin.",
        notice: "Most solos die from underpriced matter cohorts. Weekly retro catches the pattern before the quarter ends.",
      },
      {
        goal: "Statute / reg update scan",
        ai: "Perplexity",
        prompt:
          "What statutes, regulations, or significant case decisions in [jurisdiction] affecting [practice area] have been published or decided in the last 14 days? For each, the 2-sentence summary and the link to the official source.",
        notice: "Stay current. Pair with a manual scan of bar-association alerts; AI signal is the second source, not the first.",
      },
    ],
    upskill:
      "When your firm has a reusable Skill Primer for each practice area (contract review · pleading drafting · client onboarding · billing review), every new AI session loads the firm's standards automatically. That's Operator territory. The Pilot step is the receipts rail — every AI-assisted draft writes a JSON receipt with model + prompt + hash that survives any malpractice audit.",
    accent: "#FFB87A",
  },
  {
    slug: "realtor",
    job: "Realtor",
    who: "Residential agent · commercial broker · property manager · investment advisor",
    oneLine:
      "AI handles the comp research, the listing description, the follow-up sequence. Your job is the relationship, the negotiation, the door-walks. AI doesn't show houses.",
    dailyHook:
      "Open Claude. Paste this morning's MLS hot sheet for your market. Ask: 'Which 3 listings represent unusual pricing — high or low? What's the likely reason? Which is the deal-shaped one if any?'",
    saves: "10-15 hours / week",
    stack: ["Claude (comps + listings)", "ChatGPT (listing copy variants)", "Perplexity (neighborhood and economic signals)", "Imagen (staging concepts)"],
    doNot: [
      "Paste seller's bottom-line number, buyer's pre-approval letter, or any client financial info into cloud AI.",
      "Use AI-generated neighborhood / school district language without verifying — fair-housing exposure is real.",
      "Auto-send AI-generated follow-up texts that sound like a robot. Your reputation is the asset.",
    ],
    daily: [
      {
        goal: "Comp analysis",
        ai: "Claude",
        prompt:
          "Here are the last 6 months of comps in [neighborhood]: [paste from MLS]. Subject property: [details]. Tell me: (1) the right list price range and why, (2) the most comparable 3 sold comps and what makes them comparable, (3) the days-on-market reality check, (4) the one comp that would be misleading to cite and why.",
        notice: "The 'misleading comp' line forces honesty. A bad comp baked into a listing presentation will hurt you all year.",
      },
      {
        goal: "Listing description (multiple versions)",
        ai: "Claude or ChatGPT",
        prompt:
          "Here's the property: [bullet-point facts, room sizes, key features]. Generate 3 listing description versions: (1) the warm-buyer-imagine-themselves-here version, (2) the architecture-detail-rich version, (3) the lifestyle-positioning version. Each under 250 words. Mark which one fits this property best.",
        notice: "Three versions = options. The one that 'feels right' usually is. Trust your gut over the AI's pick.",
      },
      {
        goal: "Buyer follow-up sequence",
        ai: "Claude",
        prompt:
          "Buyer: [persona]. Last interaction: [paste notes]. Generate a 4-touch follow-up sequence: (1) immediate same-day note, (2) 3-day check-in, (3) 7-day market update, (4) 14-day re-engagement. Each in my voice (warm, direct, no spam-feel). Each under 60 words.",
        notice: "Sequence > one-shot. Use this template and you'll never forget a buyer.",
      },
      {
        goal: "Negotiation memo before counter",
        ai: "Claude",
        prompt:
          "Here's the situation: subject property listed at [X], offer at [Y], buyer wants [terms], seller wants [terms]. List the BATNA for each side, the 3 most likely counter scenarios, the move that would unstick the deal, and the one mistake an inexperienced agent would make here.",
        notice: "BATNA framing is the difference between negotiating and reacting.",
      },
    ],
    weekly: [
      {
        goal: "Market commentary for clients",
        ai: "Perplexity + Claude",
        prompt:
          "[Perplexity] What are the top 3 macro signals affecting [my market] this week — interest rates, jobs data, local employer news, school news, infrastructure? [Then Claude] Translate that into a 200-word client email that lands as informed without being preachy.",
        notice: "Clients don't want a market report. They want one operator's read on what to do next.",
      },
      {
        goal: "Pipeline review",
        ai: "Claude",
        prompt:
          "Here's my pipeline: [paste — stages, dollar values, last touch]. Tell me: (1) the deal most likely to close this week, (2) the deal most likely to stall if I don't touch it, (3) the deal I should drop because it's eating my time, (4) the next 3 touches I should make today.",
        notice: "Most agents die from too-many-stagnant-deals. Weekly drop-list is the discipline.",
      },
    ],
    upskill:
      "When you have a reusable Skill Primer for each transaction stage (cold call · showing prep · offer response · close-day) and you no longer write any client-facing copy from scratch, you've graduated to Operator. The Pilot step is the receipts rail — every AI-assisted client communication writes a receipt with model + prompt + content hash so you have a clean record for the broker's compliance file.",
    accent: "#22F0D5",
  },
  {
    slug: "student",
    job: "Student",
    who: "High school · undergrad · grad school · adult learner · self-taught",
    oneLine:
      "AI is a tutor that's awake at 2 AM and has read the textbook. Use it to deepen understanding. Don't use it to skip the thinking.",
    dailyHook:
      "Before reading any assigned chapter, ask Claude: 'I'm about to read [chapter]. Generate 5 questions a strong reader would have answers to after finishing. I'll come back to score myself.'",
    saves: "6-12 hours / week",
    stack: ["Claude (deep tutor)", "ChatGPT (broad Q&A)", "Khan Academy + Wolfram (math verify)", "Perplexity (live web grounding for research papers)"],
    doNot: [
      "Submit AI-generated work as your own. The point of school is the thinking, not the deliverable.",
      "Trust AI math without independently verifying with Wolfram or a textbook.",
      "Cite a paper or quote the AI gave you without finding the original source.",
    ],
    daily: [
      {
        goal: "Active-reading prep",
        ai: "Claude",
        prompt:
          "I'm about to read [chapter / paper / lecture notes — paste the table of contents or the abstract]. Generate 5 specific questions a strong reader would have answers to after finishing. Include 1 question that should change my mind if the chapter is doing its job.",
        notice: "The 'change my mind' question is the test of whether you actually engaged or just skimmed.",
      },
      {
        goal: "Concept deep-dive",
        ai: "Claude",
        prompt:
          "I'm studying [concept]. Explain it: (1) like I'm 12 — analogy + everyday example, (2) like I'm a grad student — formal definition + edge case, (3) like a textbook problem — solve a worked example. Then quiz me with 3 questions of escalating difficulty.",
        notice: "Three levels of explanation surface where YOUR understanding actually breaks down. The level you can't follow is your study target.",
      },
      {
        goal: "Essay outline",
        ai: "Claude",
        prompt:
          "I'm writing an essay on [thesis]. Generate an outline: introduction with the strongest version of my argument, 4 body paragraphs each with a topic sentence + the strongest evidence + the most-likely counter, conclusion. For each paragraph, suggest 2 sources I should verify exist in [your library / Google Scholar / JSTOR].",
        notice: "Outline only. Don't have the AI write the body. The thinking happens in the writing.",
      },
      {
        goal: "Self-quiz before exam",
        ai: "Claude",
        prompt:
          "I have an exam on [topics]. Generate 10 practice questions across difficulty levels: 3 recall, 4 application, 2 synthesis, 1 stretch. Give me the answer key but withhold it until I commit my answers. I'll paste my answers back and you'll grade.",
        notice: "Withholding the answer key is the discipline. Otherwise the AI just shows you the answers and you 'learn' nothing.",
      },
    ],
    weekly: [
      {
        goal: "Class retro",
        ai: "Claude",
        prompt:
          "Here are the notes from this week's classes: [paste]. What concept showed up across multiple classes? Where did my notes get thin? What's the one concept I should re-study before next week's lectures build on it?",
        notice: "Compound concepts are where grades quietly slip. Weekly retro catches them.",
      },
      {
        goal: "Skill consolidation",
        ai: "Claude",
        prompt:
          "I learned these skills this week: [paste]. Generate one cross-cutting practice problem that uses all of them at once. Mark which step uses which skill so I can self-check.",
        notice: "Integration > isolation. One mixed problem teaches more than five single-skill problems.",
      },
    ],
    upskill:
      "When you have a reusable Skill Primer for each subject area you're studying, and you've stopped Googling 'how to study X' because your primers carry your study method forward, you've crossed into Operator territory. The Pilot step is owning your own learning architecture — annotated notes that link concepts across courses, with the AI just helping you find the threads.",
    accent: "#22F0D5",
  },
  {
    slug: "parent",
    job: "Parent",
    who: "New parent · single parent · parent of teens · parent of kids with special needs · homeschool family",
    oneLine:
      "AI is the parent friend who remembers everything you ever told her, has time at 11 PM, and never judges. It is not the parent. You are.",
    dailyHook:
      "When your kid asks the question you don't have time to answer, take 90 seconds and ask Claude with them: 'My [age] kid asked [question]. Explain it like they're [age]. Then suggest one related question they might ask next.'",
    saves: "5-8 hours / week (mostly emotional bandwidth)",
    stack: ["Claude (the calm answerer)", "ChatGPT (the playful explainer)", "Perplexity (when 'is X actually safe' matters)", "YouTube (when video helps more than words)"],
    doNot: [
      "Outsource the hard conversations to AI. Death, divorce, identity, mental health — those are yours.",
      "Let kids unsupervised in cloud AI without an age-appropriate conversation about what AI is and what to never share.",
      "Use AI to medicate-by-substitute when the real issue is you need help, sleep, support. AI is a tool. It's not the help.",
    ],
    daily: [
      {
        goal: "Kid's question of the day",
        ai: "Claude or ChatGPT",
        prompt:
          "My [age]-year-old asked: '[paste their question verbatim].' Explain it: (1) at their age level using everyday language, (2) one analogy that helps it stick, (3) one related question they might ask next so I can stay ahead of the curiosity wave.",
        notice: "The 'related question' is the magic. Kids' curiosity is a chain. AI tells you what link comes next.",
      },
      {
        goal: "Tomorrow's lunch / dinner plan",
        ai: "ChatGPT or Claude",
        prompt:
          "I have these ingredients: [paste]. My kid will eat [list]. My kid won't eat [list]. I have [time] to cook. Give me 3 dinner ideas tonight + tomorrow's school lunch. Each under 30 minutes. Include any pantry swaps that don't break the dish.",
        notice: "The 'won't eat' list saves more time than the 'will eat' list. Lead with constraints.",
      },
      {
        goal: "Bedtime calming script",
        ai: "Claude",
        prompt:
          "My [age]-year-old is having trouble [getting to sleep / processing a hard day / settling after a tantrum]. Write me a 3-minute script — warm, present, no screens, no bribes — that I can read or improvise from. Generate 3 options across tones: cozy / playful / mindful.",
        notice: "Three tones lets you match the kid AND your own energy that night. Pick whichever you have the bandwidth for.",
      },
      {
        goal: "Hard question prep",
        ai: "Claude",
        prompt:
          "My kid is going to ask me about [topic — death, divorce, body, identity, race, money, scary news]. I want to be ready. Give me: (1) 3 age-appropriate framings I can use, (2) the 2 mistakes parents commonly make on this topic, (3) the question they might ask as a follow-up so I'm not surprised.",
        notice: "Practice the conversation before you have it. AI lets you rehearse without burning the kid's real moment.",
      },
    ],
    weekly: [
      {
        goal: "Family meeting agenda",
        ai: "Claude",
        prompt:
          "We have a weekly family meeting. This week's context: [what happened, what's coming, any conflict]. Generate a 20-minute agenda: warm-up (one thing each loved this week), main topic, kid agenda items, one decision to make as a family, closing.",
        notice: "The 'kid agenda items' slot trains kids that they have legitimate voice in family decisions. It's a long game.",
      },
      {
        goal: "Activity / learning plan",
        ai: "Claude",
        prompt:
          "My [age]-year-old is into [current obsession]. Generate 7 days of 30-min activities that ride the obsession into related skills (motor / literacy / numeracy / curiosity). Each day: the activity, the skill, the prep (5 min or less), the question to ask after.",
        notice: "Ride the obsession. Trying to redirect curiosity kills it. AI is great at mapping their interest into adjacent skills.",
      },
    ],
    upskill:
      "When you've built a folder of family Skill Primers (one per kid for their developmental stage, one per recurring scenario — bedtime, transitions, big feelings), every new AI session loads your family's context automatically. The next step isn't more AI. It's protecting time off-screen, which is what all of this was supposed to free up.",
    accent: "#FFB87A",
  },
  {
    slug: "designer",
    job: "Designer",
    who: "Product designer · brand · UX · UI · indie design studio",
    oneLine:
      "AI generates 100 variations in the time you used to do 5. The taste is still yours. The decision is still yours. AI is the variation engine, not the eye.",
    dailyHook:
      "Before opening Figma, paste your brief into Claude. Ask: 'What are 3 design strategies for this brief that would each lead somewhere different? What does each NOT solve?'",
    saves: "8-14 hours / week",
    stack: ["Claude (strategy + critique)", "Midjourney or Imagen (visual exploration)", "Figma + AI plugins (in-app variants)", "ChatGPT (microcopy variants)"],
    doNot: [
      "Ship AI-generated images in client work without verifying licensing and getting client sign-off on AI usage.",
      "Use AI-generated faces or stock-photo-style imagery for hero shots — the uncanny shows up at scale.",
      "Outsource brand voice to AI. The voice is the differentiator; AI averages it away.",
    ],
    daily: [
      {
        goal: "Strategy → direction options",
        ai: "Claude",
        prompt:
          "Here's the brief: [paste]. Don't generate visuals yet. Give me 3 design strategies: (1) the safe-credible direction, (2) the bold-distinctive direction, (3) the contrarian-defensible direction. For each: the one-sentence summary, what it solves, what it does not solve, the risk.",
        notice: "Three strategies = three real options, not three flavors of the same thing. The 'what it does not solve' line forces honest tradeoff.",
      },
      {
        goal: "Microcopy A/B/C",
        ai: "Claude or ChatGPT",
        prompt:
          "Here's the surface: [screenshot or description]. The action: [what we want the user to do]. Generate 5 microcopy variants for the CTA + 5 for the supporting line. Across registers: minimal, helpful, confident, playful, urgent. Tell me which pair you'd ship and why.",
        notice: "Always ask for register variants, not just synonyms. Register is what most microcopy drafts miss.",
      },
      {
        goal: "Visual exploration",
        ai: "Midjourney or Imagen",
        prompt:
          "[detailed prompt for the visual exploration tool] · style: [reference], composition: [details], lighting: [details], aspect ratio: [ratio]. Generate 8 variations. Mark which 3 you'd refine.",
        notice: "Image AI is variant-fast, taste-blind. Use it to explore, not to commit. The composition you'd never have drawn yourself is sometimes the answer; sometimes it's the trap.",
      },
      {
        goal: "Heuristic critique",
        ai: "Claude (vision)",
        prompt:
          "Here's the design: [paste screenshot]. Critique it against Nielsen's 10 heuristics + the 3 most-likely accessibility issues. Be specific. Cite the element you're talking about. Skip the diplomatic version.",
        notice: "Vision-capable Claude is the right tool. Don't try this in a text-only chat.",
      },
    ],
    weekly: [
      {
        goal: "Portfolio update",
        ai: "Claude",
        prompt:
          "I shipped these projects this week: [paste]. Write the portfolio case-study draft for the strongest one: the problem, the constraint, my approach, the design decision that matters most, the outcome. Voice: confident, specific, no jargon. Under 400 words.",
        notice: "Weekly case-study updates compound. By year-end you have a portfolio that walks-the-talk.",
      },
      {
        goal: "Design-system audit",
        ai: "Claude",
        prompt:
          "Here are 5 screens we shipped this week: [paste]. Identify: (1) where we drifted from the design system, (2) where the system is being violated because it's wrong (and should be updated), (3) where we made one-off choices that should become a system token.",
        notice: "Drift is normal. Catch it weekly and the system stays alive instead of becoming a museum.",
      },
    ],
    upskill:
      "When you've built reusable Skill Primers for each client's brand (voice, palette, type system, microcopy rules) and your AI sessions load the right brand automatically, you've graduated. The Pilot step is the receipts rail — every AI-assisted design decision writes a receipt with model + prompt + reference so client work is auditable forever.",
    accent: "#22F0D5",
  },
  {
    slug: "researcher",
    job: "Academic Researcher",
    who: "PhD candidate · postdoc · faculty · independent scholar",
    oneLine:
      "AI is the research associate who can read 50 papers overnight. You still own the question, the hypothesis, and the interpretation. AI never gets credit on a paper.",
    dailyHook:
      "When you read a paper, paste the abstract + your 3 questions into Claude. Ask: 'Are my questions the ones a senior reviewer would ask? What am I missing?'",
    saves: "10-20 hours / week",
    stack: ["Claude (long-context literature work)", "Perplexity (cross-citation discovery)", "ChatGPT (varied second opinion)", "Wolfram + R/Python (verification)"],
    doNot: [
      "Cite a paper or claim the AI fabricated. Always pull the actual source. AI hallucinates citations confidently.",
      "Outsource statistical analysis to AI without running it yourself with code you understand.",
      "Submit AI-generated literature reviews. The point is YOUR synthesis.",
    ],
    daily: [
      {
        goal: "Paper triage",
        ai: "Claude",
        prompt:
          "Here are 5 paper abstracts: [paste]. My research question: [your question]. Rank them: which to read first, which to skim, which to skip and why. For each 'read first,' the one question I should be ready to answer after reading.",
        notice: "Daily triage saves a week of reading the wrong papers.",
      },
      {
        goal: "Method critique",
        ai: "Claude",
        prompt:
          "Here's the methods section: [paste]. Critique it: (1) the 3 biggest threats to internal validity, (2) the assumption that should be defended but isn't, (3) the missing control I'd flag as a reviewer, (4) one alternative analysis that would strengthen or weaken the claim.",
        notice: "The 'alternative analysis' line catches the 'this could go either way' papers. Most methods sections only defend one analysis.",
      },
      {
        goal: "Literature gap scan",
        ai: "Perplexity",
        prompt:
          "Find the most-cited papers on [topic] from the last 36 months. For each: the citation, the central claim, the methodological approach, the most-cited critique. Identify the 3 most likely open questions a new PhD project could legitimately attack.",
        notice: "Pair with manual database scan; AI signal is suggestive, not definitive.",
      },
      {
        goal: "Reframe a finding for non-specialists",
        ai: "Claude",
        prompt:
          "Here's a finding from my work: [technical statement]. Write 3 versions: (1) for an undergraduate intro course, (2) for a journalist with a science beat, (3) for the public Twitter audience. Each accurate, each calibrated to the audience.",
        notice: "Three audiences = three drafts you can use across the year (lectures, press, social).",
      },
    ],
    weekly: [
      {
        goal: "Outline a section / paper",
        ai: "Claude (long context)",
        prompt:
          "Here are my notes + relevant papers: [paste]. My thesis: [statement]. Generate a section outline: claim · evidence · counter-evidence · disposition. For each paragraph, the 2 most-likely citations I should verify.",
        notice: "Outline only. Never let AI write the body. The thinking happens in your writing.",
      },
      {
        goal: "Grant / fellowship prep",
        ai: "Claude",
        prompt:
          "Here's the call for proposals: [paste]. Here's my research direction: [statement]. Draft the 1-page summary in 3 versions: (1) leading with novelty, (2) leading with feasibility, (3) leading with impact. Tell me which fits this funder.",
        notice: "Funder fit > intrinsic quality at the proposal stage. Different funders reward different leads.",
      },
    ],
    upskill:
      "When you have a reusable Skill Primer per research project — the literature, the hypothesis, the methods, the open questions — every new AI session loads your project state in 30 seconds. The Pilot step is the receipts rail. Every AI-assisted research action writes a receipt with model + prompt + reference, so when a reviewer asks 'how did you arrive at this synthesis' you have the proof on disk.",
    accent: "#FFB87A",
  },
  {
    slug: "manager",
    job: "Engineering / Product Manager",
    who: "Eng manager · product manager · TPM · director · VP",
    oneLine:
      "AI doesn't replace the human work of management — feedback, trust, hard conversations. It replaces the meeting prep, the doc drudgery, the 'I need to say this clearly' loop.",
    dailyHook:
      "Before any 1:1, paste your last 4 weeks of notes on the report. Ask Claude: 'What's the pattern I'm seeing? What's the conversation I've been avoiding? What's one specific thing to bring up today?'",
    saves: "10-15 hours / week",
    stack: ["Claude (the manager's mirror)", "ChatGPT (broad task)", "Notion or Linear AI (in-tool summaries)", "Perplexity (industry / competitor signal)"],
    doNot: [
      "Paste reports' performance feedback or sensitive HR matters into cloud AI. Use Ollama or your company's vetted internal LLM.",
      "Let AI write the feedback. Use it to draft, but ship in your voice with your specific examples.",
      "Skip the hard conversation because AI gave you a script. The script is prep, not substitute.",
    ],
    daily: [
      {
        goal: "1:1 prep",
        ai: "Claude (or internal LLM if data-sensitive)",
        prompt:
          "Here's my last month of notes on [report] (redacted): [paste]. Their recent work: [summary]. Tell me: (1) the pattern I haven't called out yet, (2) the conversation I've been avoiding and why I should have it, (3) one specific thing to bring up today, (4) one thing to ask them about their day-to-day that I haven't asked.",
        notice: "The 'avoiding' question is where good management happens. AI is excellent at surfacing the obvious thing you keep ducking.",
      },
      {
        goal: "Decision memo",
        ai: "Claude",
        prompt:
          "I need to make a decision on [topic]. Here are the options: [paste]. Generate a decision memo: the call, the reasoning, the dissenting view, the metric we'd measure to know we made the right call, the rollback condition. Under 300 words.",
        notice: "The 'rollback condition' line is what turns a decision into a learning loop.",
      },
      {
        goal: "Status update for leadership",
        ai: "Claude",
        prompt:
          "Here's what my team did this week: [paste]. The metric movement: [paste]. The blockers: [paste]. Draft the 4-bullet update to [exec]: progress / metrics / risk / ask. Tone: confident, honest about what isn't working, specific about what would unstick it.",
        notice: "Status updates that lead with the ask get attention. Status updates that bury it die in the doc.",
      },
      {
        goal: "Sprint retro prep",
        ai: "Claude",
        prompt:
          "Here's the sprint data: [tickets shipped, slipped, added mid-sprint]. The team's notes: [paste]. Generate the retro discussion prompts: (1) what worked that we should keep, (2) what didn't that we should stop, (3) the one process change to try next sprint, (4) the underlying pattern across sprints that we haven't named yet.",
        notice: "The 'underlying pattern across sprints' is where retros become useful. Otherwise they're sprint-local.",
      },
    ],
    weekly: [
      {
        goal: "Team health pulse",
        ai: "Claude",
        prompt:
          "Here's my team's signals this week: 1:1 notes (redacted), velocity, on-call load, PTO requests, the chat tone. Tell me: what's the health pattern, where am I asking too much, who needs a check-in I haven't scheduled, what's the team-level conversation I should have at next standup.",
        notice: "Weekly pulse beats annual engagement survey. Patterns surface in the daily signal, not the once-a-year question.",
      },
      {
        goal: "Org-design check",
        ai: "Claude",
        prompt:
          "Here's the team structure: [paste]. The current set of in-flight projects: [paste]. The 6-month strategy: [paste]. Where does the structure fit the strategy? Where is it misaligned? What's one team-design move I should consider this quarter?",
        notice: "Org design drifts behind strategy. Quarterly check keeps the structure honest.",
      },
    ],
    upskill:
      "When you have Skill Primers for each report (their work style, their goals, their growth area, their context) AND each project (the spec, the metric, the risk register), every AI session loads the full state automatically. The Pilot step is the receipts rail — every decision memo, every feedback draft, every 1:1 prep writes a receipt so your management trail is auditable and your handoffs (promotion, transition, replacement) take 1 hour, not 1 week.",
    accent: "#22F0D5",
  },
  {
    slug: "salesperson",
    job: "Salesperson",
    who: "Account executive · BDR · channel partner · founder-led sales · enterprise rep",
    oneLine:
      "AI handles the research, the email draft, the call recap. Your job is the trust, the closing question, and the moment you know to shut up.",
    dailyHook:
      "Before any prospect call, paste the company's last 3 press releases + the prospect's LinkedIn into Claude. Ask: 'What's the one question that would make them lean forward? Why?'",
    saves: "12-20 hours / week",
    stack: ["Claude (deep account research)", "Perplexity (real-time signal)", "ChatGPT (variant production)", "Gong or company tool (call analysis)"],
    doNot: [
      "Paste customer CRM data or pricing details into cloud AI unless you've cleared the data-residency posture with your security team.",
      "Send AI-generated cold emails verbatim — buyers smell AI faster every quarter.",
      "Skip the discovery questions because AI gave you a 'good answer.' The discovery IS the close.",
    ],
    daily: [
      {
        goal: "Account research before a call",
        ai: "Perplexity + Claude",
        prompt:
          "[Perplexity] Pull the last 6 months of news, funding, leadership moves, product launches, and competitor pressure for [company]. [Claude] Synthesize: their likely top 3 priorities this quarter, the 2 most-likely buying triggers in our space, the 1 question that would land in a first call.",
        notice: "Two-model workflow. Perplexity for facts, Claude for synthesis.",
      },
      {
        goal: "Personalized outreach",
        ai: "Claude",
        prompt:
          "I'm reaching out to [name, title, company]. Their recent signal: [paste — post, news, hiring page]. Our offer: [paste in 2 sentences]. Draft 3 outreach versions: (1) the warm relevance-first, (2) the hard pain-first, (3) the contrarian provocation. Under 80 words each. Mark which fits.",
        notice: "Three registers = three real options. The buyer's signal determines which one.",
      },
      {
        goal: "Call recap + next step",
        ai: "Claude",
        prompt:
          "Here are my call notes (redacted client names): [paste]. Generate: (1) the recap email to the prospect, leading with what they care about, (2) the internal-CRM note on stage, blockers, next step, (3) the proposed next-step time-window with the specific value they'd get from accepting.",
        notice: "Always send the recap within 60 min. The 'value of accepting' line is the close before the close.",
      },
      {
        goal: "Objection prep",
        ai: "Claude",
        prompt:
          "I'm about to propose [solution] to [persona]. Generate the 5 most-likely objections, ranked by frequency. For each: the surface objection, the underlying concern, the question that surfaces what's really blocking, the 60-word response.",
        notice: "Underlying concern > surface objection. Always. AI is great at the translation.",
      },
    ],
    weekly: [
      {
        goal: "Pipeline review",
        ai: "Claude",
        prompt:
          "Here's my pipeline: [paste — stages, ARR, last touch, decision criteria]. Tell me: (1) the deal most likely to close this week, (2) the deal that needs an executive escalation, (3) the deal stuck because of [specific friction], (4) the deal I should drop because it's eating my time.",
        notice: "Weekly drop-list is the discipline. Most reps die from too-many-stagnant deals.",
      },
      {
        goal: "Win/loss recap",
        ai: "Claude",
        prompt:
          "Here's a deal we won this month: [details]. Here's one we lost: [details]. Identify: the pattern in why we won, the pattern in why we lost, the question we asked in the won deal that we didn't in the lost, the disco step we'd add to the playbook.",
        notice: "Win/loss every month catches the pattern in real time. Quarterly is too late.",
      },
    ],
    upskill:
      "When you have a Skill Primer per account (their org, their priorities, their decision unit, their language) and every Claude session loads the right account context automatically, you've graduated. The Pilot step is the receipts rail — every prospect email, every call recap, every proposal writes a receipt with model + prompt + content hash. Your forecast is audit-grade. Your handoff to CSM is one click.",
    accent: "#22F0D5",
  },
  {
    slug: "creator",
    job: "Creator",
    who: "YouTuber · podcaster · streamer · TikTok creator · Substack writer · Twitch / OF creator",
    oneLine:
      "AI does the editing, the captions, the title A/B/C, the show notes. The taste, the timing, and the on-camera moment are still yours.",
    dailyHook:
      "Before publishing any piece, paste your draft (title + thumbnail concept + first 30s script) into Claude. Ask: 'What would make me skip past this in a feed? What would make me stop?'",
    saves: "10-15 hours / week",
    stack: ["Claude (titles, scripts, show notes)", "ChatGPT (variants)", "ElevenLabs or Whisper (voice / transcription)", "Descript (edit assist)"],
    doNot: [
      "Auto-publish AI-written video / audio scripts. The personality dies in the cadence.",
      "Use AI thumbnails on a face-driven channel — the uncanny valley costs you the click.",
      "Pretend AI-generated content is yours. Audiences sniff it out and the trust never comes back.",
    ],
    daily: [
      {
        goal: "Title + thumbnail lab",
        ai: "Claude",
        prompt:
          "I'm publishing a video / post about [topic]. The 30-second hook: [paste script]. Generate 12 title variants across 4 hooks: curiosity-gap, specific-promise, contrarian, story-led. For each, predict the click-rate winner type for my audience and reasoning. Tell me your top 3 to test.",
        notice: "Title is 80% of the click. A/B/C/D before you publish, not after.",
      },
      {
        goal: "Hook test",
        ai: "Claude",
        prompt:
          "Here's my first 30 seconds: [paste script]. Critique like a feed scroller: where does this lose me, what would make me stop, what's the line that should be the FIRST line, what's a hook variation that would test against this.",
        notice: "Feed-scroller framing kills creator-friendly diplomacy. You get the brutal truth.",
      },
      {
        goal: "Show notes / description",
        ai: "Claude",
        prompt:
          "Here's the transcript: [paste]. Generate: (1) the 200-word description optimized for discovery, (2) the chapter timestamps, (3) the 5 most-quotable lines for social cuts, (4) the 3 follow-up questions for community engagement.",
        notice: "The 'quotable lines for social' is where one upload becomes a week of distribution.",
      },
      {
        goal: "Captions + cuts",
        ai: "Descript or ChatGPT",
        prompt:
          "Here's the transcript: [paste]. Generate 5 short-form cuts (60s each) optimized for [platform]. For each: the in-point, the out-point, the title for the short, the caption text. Lead with the hook.",
        notice: "One long-form upload = five short-forms = a week of distribution. AI does the cutting work in minutes.",
      },
    ],
    weekly: [
      {
        goal: "Performance retro",
        ai: "Claude",
        prompt:
          "Here are my last 5 uploads: [titles, views, watch-time, click-through rate]. Tell me: (1) the title pattern that worked, (2) the title pattern that didn't, (3) the topic the audience over-indexed on, (4) the experiment to run next.",
        notice: "Weekly retro on 5-upload windows catches signal before the trend dies.",
      },
      {
        goal: "Content calendar fill",
        ai: "Claude + Perplexity",
        prompt:
          "[Perplexity] What's trending in my niche [topic] this week — search trends, news, community questions? [Claude] Generate 7 video / post ideas across the next 14 days, each tied to one trend signal. For each: the title, the hook, the format, the call-to-action.",
        notice: "Always pair AI-generated calendar ideas with at least one off-trend original idea. Pure trend-chasing dies fast.",
      },
    ],
    upskill:
      "When you have a Skill Primer that captures your voice, your hooks, your visual style, your taboo topics, and every AI session loads it in 30s, you've graduated. The Pilot step is the receipts rail — every script draft, every title test, every thumbnail variant writes a receipt. Your back-catalog becomes a searchable library of YOUR creative system, and any new platform launch (Bluesky, TikTok-replacement, Threads) becomes a 1-hour port instead of a 1-month rebuild.",
    accent: "#FFB87A",
  },
  {
    slug: "consultant",
    job: "Consultant",
    who: "Independent consultant · firm associate · solo strategist · agency partner",
    oneLine:
      "AI is the analyst army you don't have to hire. You still own the framing, the relationship, and the moment the client needs to hear hard news. AI doesn't get billed.",
    dailyHook:
      "Before any client call, paste the client's last 3 emails + the agenda + your top objective into Claude. Ask: 'What's the unspoken question they're trying to ask? What's the move that would unstick them?'",
    saves: "12-20 hours / week",
    stack: ["Claude (deep analysis + synthesis)", "Perplexity (market + competitor signal)", "ChatGPT (variant production)", "Ollama (NDA-sensitive work)"],
    doNot: [
      "Paste client-identifying matter or financials into cloud AI without checked data-residency and NDA exposure. Use Ollama (local) for the sensitive layer.",
      "Bill AI hours as analyst hours. Either you're operating at a leveraged rate or you're not.",
      "Send AI-drafted strategy decks verbatim. The 30% you'd disagree with is the value-add.",
    ],
    daily: [
      {
        goal: "Pre-call insight",
        ai: "Claude",
        prompt:
          "I have a call with [client]. The agenda: [paste]. The last 3 emails: [paste]. My objective today: [paste]. Tell me: (1) the unspoken question they're trying to ask, (2) the move that would unstick the engagement, (3) the one question I should ask to surface the real blocker, (4) the talking-point I should NOT lead with.",
        notice: "The 'should NOT lead with' is the killer. AI is good at flagging the move that would derail the conversation.",
      },
      {
        goal: "Synthesis from raw interview / data",
        ai: "Claude (long context)",
        prompt:
          "Here are 5 interview transcripts: [paste]. The research question: [paste]. Synthesize: (1) the 5 themes that recur, (2) the 2 dissenting views worth weighting, (3) the surprise insight nobody articulated cleanly but is implied across 3+ interviews, (4) the open question that needs more discovery.",
        notice: "Long context is Claude's edge for qualitative work. Don't try this in ChatGPT.",
      },
      {
        goal: "Deck draft",
        ai: "Claude",
        prompt:
          "Here's the recommendation: [statement]. Outline a 12-slide deck: (1) the problem we're solving, (2) the data, (3) the options considered, (4) the recommendation, (5) the implications, (6) the risks, (7) the timeline, (8) the resourcing, (9) the metric we'd measure, (10) the next-step decision needed, (11) the appendix preview, (12) the close. For each slide, the headline + the 1 chart or 1 bullet that matters.",
        notice: "Outline only. Build the slides. AI-built slides look like AI-built slides.",
      },
      {
        goal: "Hard message rehearsal",
        ai: "Claude",
        prompt:
          "I need to tell [client] [hard truth]. Their context: [paste]. My read of their likely reaction: [your prediction]. Generate 3 versions of the conversation: (1) lead with care, (2) lead with data, (3) lead with the question. For each, the 30-second opener, the likely counter, my response.",
        notice: "Rehearsal is the deliverable. AI lets you practice the conversation before you have it.",
      },
    ],
    weekly: [
      {
        goal: "Engagement health",
        ai: "Claude",
        prompt:
          "Here's the engagement: [scope, timeline, current state, client signals, fees]. Tell me: (1) the client's confidence pattern this week, (2) where we're off-scope and need to renegotiate, (3) where the client is silently disagreeing and won't say so, (4) the move to keep this engagement healthy through the next milestone.",
        notice: "Silent disagreement is what kills consulting engagements. Weekly check catches it.",
      },
      {
        goal: "Practice growth signal",
        ai: "Claude + Perplexity",
        prompt:
          "[Perplexity] What are the top 3 signals in [my industry] this week that would create new consulting demand? [Claude] Translate into 3 outreach openers I could use this week with target clients who'd be affected.",
        notice: "Practice growth comes from signal-jacking — being the consultant who already has the answer when the question lands in the executive's inbox.",
      },
    ],
    upskill:
      "When you have a Skill Primer per engagement (the brief, the org, the dynamics, the deliverable) and every Claude session loads the engagement state automatically, you've graduated. The Pilot step is the receipts rail. Every analysis, every deck draft, every client recap writes a receipt with model + prompt + content hash. Your IP is on disk. Your handoff to associates is one click. Your client deliverable trail is forensically clean.",
    accent: "#FFB87A",
  },
  {
    slug: "nurse",
    job: "Nurse / Healthcare Worker",
    who: "RN · LPN · NP · medical assistant · home health · hospice · school nurse",
    oneLine:
      "AI handles the documentation, the handoff prep, the patient-education content. Clinical judgment never leaves your hands. AI is never the diagnosis.",
    dailyHook:
      "Between patients (or at home, away from PHI), use Claude to draft patient-education content in plain language. Ask: 'Explain [condition] to a 6th-grade reading level. Include the 3 things they should call us about.'",
    saves: "5-10 hours / week (mostly admin + documentation)",
    stack: ["Claude or ChatGPT (patient-ed drafts, plain-language)", "Ollama (local, for any PHI-adjacent work)", "Perplexity (medication and reg verification, then verify in UpToDate)", "Your EHR's vetted AI (when available)"],
    doNot: [
      "Paste patient PHI (names, DOB, MRN, diagnoses, addresses) into cloud AI. Use Ollama (local) or your facility's vetted internal LLM only.",
      "Use AI-generated dosing, medication interaction, or differential diagnosis content without verifying in UpToDate / Lexicomp / facility protocol.",
      "Substitute AI for clinical judgment. Ever. The malpractice carrier doesn't care that the AI said so.",
    ],
    daily: [
      {
        goal: "Patient-education content",
        ai: "Claude (no PHI)",
        prompt:
          "Write a patient handout on [condition / medication / procedure] at a 6th-grade reading level. Include: (1) what it is in everyday language, (2) what to expect, (3) the 3 things they should call us about, (4) when to go to the ER. Under 250 words. No medical jargon.",
        notice: "Verify every claim against your facility's reference. AI is the draft; clinical sign-off is the deliverable.",
      },
      {
        goal: "Handoff / SBAR prep",
        ai: "Claude (redacted)",
        prompt:
          "Here's the patient summary (de-identified): age range, diagnoses, current concerns, vitals trends, interventions, response, what I'm worried about, recommended next steps. Tighten this into a 60-second SBAR. Make sure recommended next step is specific and actionable.",
        notice: "Always de-identify before pasting. Better: use Ollama for this entirely.",
      },
      {
        goal: "Pre-conference prep",
        ai: "Claude",
        prompt:
          "I have an interdisciplinary care meeting on [topic — de-identified]. The team members: [roles]. Generate: (1) my 90-second update, (2) the question I should bring to the team, (3) the concern I haven't been able to articulate cleanly, (4) the family perspective I should remember to surface.",
        notice: "Family perspective is what most clinical conferences forget. AI is good at flagging the missing voice.",
      },
      {
        goal: "Plain-language medication review",
        ai: "Claude (no PHI) — and verify",
        prompt:
          "Write a plain-language explanation of [medication class] for a patient: what it does, the 3 most common side effects, the 2 dangerous interactions to watch for, when to call us. Under 200 words. 6th-grade reading level.",
        notice: "Always verify against Lexicomp or UpToDate. AI is the draft. The clinician is the source.",
      },
    ],
    weekly: [
      {
        goal: "Practice update",
        ai: "Perplexity",
        prompt:
          "What new guidelines, FDA actions, or significant studies in [my specialty] have been published in the last 14 days? For each: the source, the 2-sentence summary, the practice implication, the official link to verify.",
        notice: "Always verify against official source. AI is the alert, not the truth.",
      },
      {
        goal: "Documentation pattern scan",
        ai: "Claude",
        prompt:
          "Here are 5 of my recent notes (de-identified): [paste]. Audit: (1) where I'm being vague that an auditor would flag, (2) where I'm being too detailed and exposing the chart to risk, (3) the documentation patterns that don't reflect the actual care I delivered, (4) the one habit-change that would tighten everything.",
        notice: "Documentation drift is silent. Weekly scan catches it before an audit does.",
      },
    ],
    upskill:
      "When you have a reusable Skill Primer per condition or care pathway (the patient-ed language, the SBAR pattern, the handoff template), every AI session loads the right context. The Pilot step is your facility's receipts rail — every AI-assisted documentation draft writes a receipt with model + prompt + reviewer sign-off, so your charts are forensically clean and your facility's compliance team trusts the workflow.",
    accent: "#22F0D5",
  },
  {
    slug: "retiree",
    job: "Retiree / Lifelong Learner",
    who: "Just-retired · semi-retired · senior with time · curious anyone outside the workforce",
    oneLine:
      "AI is a patient teacher who never gets bored of your questions. Use it to read more, write more, organize more — without spending a dollar on subscriptions.",
    dailyHook:
      "Pour your morning coffee. Open Claude on your phone or laptop. Ask one question — about the news, a memoir you're writing, a recipe, a grandchild's school project. Two minutes. Every day.",
    saves: "Doesn't save hours — gives you good hours back",
    stack: ["Claude (the patient explainer)", "ChatGPT (variant of the same)", "Perplexity (when you want to verify a news claim)", "Free everything — you do not need paid AI for this level"],
    doNot: [
      "Give AI your Social Security number, banking info, Medicare ID, or any account password. Ever.",
      "Trust AI medical, legal, or financial advice without checking with a real human professional.",
      "Pay for AI subscriptions you don't need. The free tier of Claude, ChatGPT, and Gemini is excellent.",
    ],
    daily: [
      {
        goal: "Today's news, simplified",
        ai: "Claude",
        prompt:
          "Explain today's biggest news story in plain language — no jargon, no political spin, no acronyms unexplained. Three short paragraphs: what happened, why it matters, what to watch next.",
        notice: "Run this daily and you'll be better informed than half the people you went to high school with.",
      },
      {
        goal: "The 'what was that word?' game",
        ai: "Claude",
        prompt:
          "Explain '[word or phrase you heard]' in plain language. Use an example I can picture. Then tell me where it originally came from and how it's changed.",
        notice: "Bonus: you'll remember the word. AI gives you context, not just a definition.",
      },
      {
        goal: "Recipe rescue",
        ai: "ChatGPT or Claude",
        prompt:
          "I have these ingredients on hand: [paste]. I'd like to make something like [cuisine / dish]. Give me 3 recipe options with substitutions noted, prep time, and which one is the easiest. Imperial measurements.",
        notice: "AI is great at 'what can I make with what's in the fridge.' Use this daily and stop buying takeout.",
      },
      {
        goal: "Family letter / email draft",
        ai: "Claude",
        prompt:
          "I want to write to [grandchild / friend / sibling] about [topic]. They're [age / context]. Keep it warm, specific to them, under 200 words. End with a question they'd actually answer.",
        notice: "The 'end with a question' is the secret to keeping the correspondence alive.",
      },
    ],
    weekly: [
      {
        goal: "Hobby project assist",
        ai: "Claude",
        prompt:
          "I'm working on [woodworking project / quilt / garden plan / coin collection / family history / memoir]. Here's where I'm stuck: [paste]. Walk me through 3 ways to think about this, then suggest the one you'd try first.",
        notice: "AI is your hobby tutor. Free. Available at midnight. Doesn't sigh.",
      },
      {
        goal: "Health-question prep",
        ai: "Claude",
        prompt:
          "I have an appointment with my [doctor / specialist] next week. Here's what I want to ask about: [paste]. Generate the 5 questions I should bring — calibrated, specific, the questions a strong patient asks. Don't give me medical advice; give me the questions.",
        notice: "AI is the patient-advocate friend. NOT the doctor. Always bring the questions to the human professional.",
      },
    ],
    upskill:
      "When you're using AI for an hour a day on your own projects without thinking about it, you've quietly become more digitally fluent than 90% of people your age. The 'next level' isn't more AI — it's teaching one friend how to use it. Start with the simplest prompt you use daily. Share it. Walk them through it. That's the real graduation.",
    accent: "#22F0D5",
  },
  {
    slug: "small-business-owner",
    job: "Small Business Owner",
    who: "Restaurant · retail · landscaping · plumbing · cleaning service · trade · franchise · brick-and-mortar",
    oneLine:
      "AI is the back-office team you've never been able to afford. The customer-facing work, the trust, the local relationships — those stay yours.",
    dailyHook:
      "First coffee of the day. Open Claude. Paste yesterday's revenue + today's schedule + any one issue from yesterday. Ask: 'What's the one move that would make today better than yesterday?'",
    saves: "8-15 hours / week",
    stack: ["Claude (admin, drafts, planning)", "ChatGPT (variants, simple Q&A)", "Perplexity (local market signals, competitor moves)", "Free tier of everything — do not pay for AI you don't need"],
    doNot: [
      "Paste customer credit card info, employee SSN, or any business banking info into cloud AI.",
      "Auto-publish AI-generated marketing copy without giving it a once-over for local voice and accuracy.",
      "Use AI to write contracts or employment agreements. Use a local lawyer for those, period.",
    ],
    daily: [
      {
        goal: "Customer review response",
        ai: "Claude",
        prompt:
          "A customer left this review: [paste]. Their rating: [stars]. Draft 3 responses: (1) the warm-thanks-and-acknowledge version, (2) the address-the-specific-complaint version, (3) the take-it-offline-with-care version. Each in my voice (warm, direct, local-business, no corporate-speak). Under 80 words.",
        notice: "Three versions = three options for tone. The one you ship depends on the review. AI is fast at all three.",
      },
      {
        goal: "Tomorrow's social post",
        ai: "Claude or ChatGPT",
        prompt:
          "I run a [business type] in [city]. Today's hook: [season / event / news / promotion]. Generate 3 social post variants for [platform]: (1) helpful-tip version, (2) behind-the-scenes version, (3) offer-driven version. Each under 150 words. Include a clear call-to-action.",
        notice: "Three a week is plenty for a local business. AI lets you batch a week of posts in 30 minutes.",
      },
      {
        goal: "Email blast / newsletter",
        ai: "Claude",
        prompt:
          "I'm sending an email to my customer list this week. Topic: [paste]. My voice: [direct / warm / no-fluff]. Draft the email: subject line, one-paragraph hook, the offer or content, the call-to-action. Under 200 words.",
        notice: "Weekly cadence beats monthly. AI removes the 'I don't have time' excuse.",
      },
      {
        goal: "Employee schedule / shift planning",
        ai: "Claude",
        prompt:
          "Here's next week's demand forecast: [paste]. Here are my employees with availability: [paste]. Build the schedule that minimizes overtime, hits coverage at peak hours, gives [person] their requested day off, and leaves me time for [tasks].",
        notice: "AI is fast at schedule puzzles. Faster than scratching it out at midnight.",
      },
    ],
    weekly: [
      {
        goal: "Numbers review",
        ai: "Claude",
        prompt:
          "Here's last week's numbers: revenue, costs, foot traffic, online orders, refunds, complaints, employee hours. Tell me: (1) the trend that's quietly compounding, (2) the cost line that's growing faster than revenue, (3) the one experiment that could move the needle this week, (4) the metric I should be tracking that I'm not.",
        notice: "Weekly review beats monthly. Compounding problems show up in weekly data first.",
      },
      {
        goal: "Local-market scan",
        ai: "Perplexity",
        prompt:
          "What's happening in [city / neighborhood] this week that affects a [business type]: events, weather, news, competitor moves, school calendar, local employer news? For each: the 1-sentence summary and the action I should take this week.",
        notice: "Local signal > national signal for a small business. Perplexity grounds against the live web.",
      },
    ],
    upskill:
      "When you have a Skill Primer for your business (the voice, the offerings, the seasonal calendar, the customer types) and every AI session loads it in 30s, you've graduated. The Pilot step is the receipts rail — every customer email, every social post, every employee schedule writes a receipt. Your handoff to a manager, your sale of the business, your franchise expansion — all of them become 10× easier because the operations are on disk in your voice, not in your head.",
    accent: "#FFB87A",
  },
];

export const metadata: Metadata = {
  title: "AI Playbooks · by job · /learn · AtomEons",
  description: `${PLAYBOOKS.length} job-by-job AI playbooks — the exact daily and weekly plays for writer, software engineer, founder, teacher, marketer, lawyer, realtor, student, parent, designer, researcher, manager, salesperson, creator, consultant, nurse, retiree, small-business owner. Real prompts. Real time-savings. Honest limits. Free. No signup. CC-BY 4.0.`,
  keywords: [
    "AI for writers",
    "AI for software engineers",
    "AI for founders",
    "AI for teachers",
    "AI for marketers",
    "AI for lawyers",
    "AI for realtors",
    "AI for students",
    "AI for parents",
    "AI for designers",
    "AI for researchers",
    "AI for managers",
    "AI for salespeople",
    "AI for creators",
    "AI for consultants",
    "AI for nurses",
    "AI for retirees",
    "AI for small business",
    "AI playbook",
    "AI daily routine",
    "Claude prompts for work",
    "AI by profession",
  ],
  alternates: { canonical: "https://atomeons.com/learn/playbooks" },
  openGraph: {
    title: "AI Playbooks · by job · /learn",
    description: `${PLAYBOOKS.length} job-by-job AI playbooks. Daily plays. Weekly plays. Real prompts. Honest limits. CC-BY 4.0.`,
    url: "https://atomeons.com/learn/playbooks",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Playbooks · by job",
    description: `${PLAYBOOKS.length} daily-AI playbooks calibrated to your job. Free. CC-BY 4.0.`,
  },
  robots: { index: true, follow: true },
};

export default function PlaybooksPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AtomEons AI Playbooks · by job",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: PLAYBOOKS.length,
            itemListElement: PLAYBOOKS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `AI Playbook for ${p.job}`,
              url: `https://atomeons.com/learn/playbooks#${p.slug}`,
            })),
          }),
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Playbooks
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI playbooks · by job · {PLAYBOOKS.length} total
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            The exact AI plays
            <br />
            <span className="text-[#22F0D5]">for the job you actually have.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Find your job below. Each playbook gives you the daily
            5-minute hook, the 4 daily plays, the 2 weekly plays, the
            exact copy-paste prompts, which AI to use, and what to
            never automate. Real time-savings calibrated to real work.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {PLAYBOOKS.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
              >
                {p.job}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Playbooks */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28 space-y-20">
          {PLAYBOOKS.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10 scroll-mt-20"
              style={{ borderLeft: `4px solid ${p.accent}` }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  className="text-3xl font-semibold tracking-tight md:text-4xl"
                  style={{ color: p.accent }}
                >
                  AI Playbook · {p.job}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                  saves: {p.saves}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#9BA5A7] md:text-base">
                For: {p.who}
              </p>
              <p className="mt-5 max-w-3xl text-base leading-[1.65] text-[#F2F4F5] md:text-lg">
                {p.oneLine}
              </p>

              {/* DAILY HOOK */}
              <div
                className="mt-8 rounded-xl border p-5 md:p-6"
                style={{ borderColor: `${p.accent}55`, background: `${p.accent}08` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: p.accent }}>
                  ::the daily hook · 2-5 minutes · do this first thing
                </p>
                <p className="mt-3 text-[15px] leading-[1.65] text-[#F2F4F5] md:text-base">
                  {p.dailyHook}
                </p>
              </div>

              {/* STACK + DO-NOT */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                    ::the stack
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-[1.55] text-[#C8CCCE]">
                    {p.stack.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-[#22F0D5]">▲</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                    ::do NOT automate
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-[1.55] text-[#C8CCCE]">
                    {p.doNot.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-[#FFB87A]">○</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DAILY PLAYS */}
              <h3 className="mt-10 text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: p.accent }}>
                Daily plays
              </h3>
              <div className="mt-5 space-y-5">
                {p.daily.map((play, i) => (
                  <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5 md:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: p.accent }}>
                        ::play 0{i + 1} · {play.goal}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                        {play.ai}
                      </p>
                    </div>
                    <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 font-mono text-[12px] leading-[1.5] text-[#C8CCCE] md:text-[13px]">
                      {play.prompt}
                    </pre>
                    <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">
                      <span className="text-[#22F0D5]">::what to notice</span> · {play.notice}
                    </p>
                    {play.trap && (
                      <p className="mt-2 text-sm leading-[1.6] text-[#FFB87A]">
                        ::trap · {play.trap}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* WEEKLY PLAYS */}
              <h3 className="mt-10 text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: p.accent }}>
                Weekly plays
              </h3>
              <div className="mt-5 space-y-5">
                {p.weekly.map((play, i) => (
                  <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5 md:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: p.accent }}>
                        ::weekly play 0{i + 1} · {play.goal}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                        {play.ai}
                      </p>
                    </div>
                    <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 font-mono text-[12px] leading-[1.5] text-[#C8CCCE] md:text-[13px]">
                      {play.prompt}
                    </pre>
                    <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">
                      <span className="text-[#22F0D5]">::what to notice</span> · {play.notice}
                    </p>
                  </div>
                ))}
              </div>

              {/* UPSKILL PATH */}
              <div
                className="mt-10 rounded-xl border p-5 md:p-6"
                style={{ borderColor: `${p.accent}55`, background: `${p.accent}06` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: p.accent }}>
                  ::next level · how this playbook graduates
                </p>
                <p className="mt-3 text-[15px] leading-[1.65] text-[#C8CCCE] md:text-base">
                  {p.upskill}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* footer / cross-links */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::your job not listed
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Email and I&apos;ll write yours.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-base leading-[1.65] text-[#9BA5A7]">
            These playbooks are open-source CC-BY 4.0. New ones get
            added when a real human writes in and walks the lab through
            their actual job. Send the description, get back a custom
            playbook the same week.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:a.mccree@gmail.com?subject=playbook%20for%20my%20job"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              email the lab →
            </a>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              ← back to /learn
            </Link>
            <Link
              href="/learn/cheatsheet"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              the AI cheatsheet →
            </Link>
            <Link
              href="/learn/mistakes"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              common AI mistakes →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
