/**
 * /tools task data.
 *
 * Job-driven prompt library — different angle from /prompt-kit (which
 * groups by curriculum level). Tasks here are organized by what the
 * user is trying to DO right now:
 *
 *   - "Reply to a tough email"
 *   - "Decode a medical report"
 *   - "Plan a trip on a budget"
 *
 * Each task carries:
 *   - id · stable URL slug
 *   - category · WRITING / DECODING / PLANNING / DECIDING / LEARNING
 *   - title · the JOB phrased as a verb
 *   - oneLiner · when to use this task
 *   - prompt · copy-paste-ready with [bracketed slots]
 *   - recommendedAI · Claude / ChatGPT / Gemini / Perplexity
 *   - whyThisAI · one sentence on the routing logic
 *   - lessonSlug · optional cross-link to the /learn lesson teaching
 *     the underlying pattern
 *
 * Voice: plain English. The user is in a hurry. Each card should be
 * scannable in 5 seconds.
 *
 * License: CC-BY 4.0. Quote any. Adapt any.
 */

export type TaskCategory =
  | "writing"
  | "decoding"
  | "planning"
  | "deciding"
  | "learning";

export type RecommendedAI = "claude" | "chatgpt" | "gemini" | "perplexity";

export type Task = {
  id: string;
  category: TaskCategory;
  title: string;
  oneLiner: string;
  prompt: string;
  recommendedAI: RecommendedAI;
  whyThisAI: string;
  lessonSlug?: string;
  timeMinutes: number;
};

export const TASKS: Task[] = [
  // ── WRITING ──────────────────────────────────────────────────────
  {
    id: "tough-email-reply",
    category: "writing",
    title: "Reply to a tough work email",
    oneLiner:
      "An email landed that you don't want to write a reply to. Get a firm, professional draft in 90 seconds.",
    prompt: `Below is an email I received and need to reply to. Help me reply firmly but professionally.

The email:
"""
[paste the full email here]
"""

What I actually want to say (plain language, doesn't have to be polished):
[your point in plain language — e.g. "I cannot meet the deadline they proposed and I want to push back without sounding defensive"]

Constraints:
- Under 100 words
- Firm but not aggressive
- No corporate jargon
- Don't apologize unless I did something wrong

Give me the reply, then tell me one line I should personalize before sending.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude has the cleanest professional-email voice on the free tier. ChatGPT works too but tends toward longer drafts.",
    lessonSlug: "your-first-real-prompt",
    timeMinutes: 5,
  },
  {
    id: "summarize-long-doc",
    category: "decoding",
    title: "Summarize a long document",
    oneLiner:
      "A 30+ page PDF, report, or article you need to understand fast. Get the one-page version + 3 executive bullets.",
    prompt: `I'm pasting a long document. Once I do:

1. Give me a 5-sentence summary.
2. List the 3 most important things a decision-maker needs to know.
3. List 2 things this document conspicuously does NOT say but should.
4. Flag any specific number, citation, or claim I should verify before I quote it.

If the document is too long to paste, tell me how to split it and we'll go chunk by chunk.

Document:
"""
[paste the document here, or upload as a file]
"""`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude's 200k+ context window handles long documents in one paste. Free tier of Gemini also works for very long docs.",
    lessonSlug: "documents-in-chat",
    timeMinutes: 8,
  },
  {
    id: "difficult-conversation",
    category: "writing",
    title: "Draft a difficult conversation",
    oneLiner:
      "You need to have a hard talk with someone. Get a script you can adapt — plus what they'll likely say back.",
    prompt: `I need to have a hard conversation with [the person — e.g. "my boss" / "a longtime client" / "my partner"] about [the topic — e.g. "needing to step back from a project" / "a payment that's overdue" / "a decision they made I disagree with"].

Background you should know:
[2-3 sentences of context — the relationship, the stakes, what's already been said]

Help me draft:
1. The opening 3 sentences. Direct but not cold.
2. The two most likely responses they'll give, and how I should reply to each.
3. The one sentence I should NOT say (the trap).

I want to come out of this conversation having said what I needed to say, and still have the relationship intact.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude's character training around delicate-conversation work is the strongest on the free tier.",
    timeMinutes: 7,
  },
  {
    id: "edit-my-draft",
    category: "writing",
    title: "Edit my draft for tone",
    oneLiner:
      "You wrote something — an email, a post, a paragraph — and the tone is off. Get an edit that keeps your voice.",
    prompt: `Here is something I wrote:
"""
[paste your draft]
"""

What I want it to sound like:
[describe the tone — e.g. "more confident, less apologetic" / "warmer, less corporate" / "more direct, less wordy"]

What I want it to KEEP:
[anything that matters — e.g. "the specific examples I included" / "the part about my deadline"]

Edit it. Then show me the 3 specific changes you made and why, so I can decide whether to accept each.`,
    recommendedAI: "claude",
    whyThisAI:
      "Editing for tone is Claude's strongest single skill — careful, not overzealous, preserves voice better than alternatives.",
    lessonSlug: "refine-not-restart",
    timeMinutes: 5,
  },
  {
    id: "cover-letter",
    category: "writing",
    title: "Write a cover letter for a specific job",
    oneLiner:
      "Applying for a real job. Get a cover letter that's calibrated to the posting, not a template.",
    prompt: `I'm applying for this job:
"""
[paste the full job posting]
"""

Here's my background:
"""
[paste your resume OR bullet points: years experience · key skills · 2-3 specific accomplishments with numbers if possible]
"""

Write a cover letter that:
- Is under 250 words
- Names the company and role specifically (not generic)
- Pulls out 3 specific things from the posting and ties them to specific things from my background
- Avoids "I am a passionate", "I am excited", and "leverage"
- Ends with a concrete next-step ask

Then list the 3 lines I should personalize before sending so it doesn't feel AI-written.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude resists AI-cliché phrasing more than ChatGPT and produces shorter, more specific drafts.",
    timeMinutes: 8,
  },

  // ── DECODING ─────────────────────────────────────────────────────
  {
    id: "medical-report",
    category: "decoding",
    title: "Decode a medical report",
    oneLiner:
      "A medical report or lab result you don't fully understand. Get a plain-English read + the questions to ask your doctor.",
    prompt: `Here is a medical report (lab result, imaging report, or visit summary):
"""
[paste the report — strip your name, DOB, MRN, and any other identifiers first]
"""

Help me understand it:
1. Explain what each section means in plain English.
2. Identify which numbers or findings are within normal range vs. flagged as concerning.
3. List 5 questions I should ask my doctor at the next visit.
4. Flag anything where I should NOT delay asking (i.e., call this week, not next month).

Important: you are not my doctor. You can help me understand what I'm reading and prepare questions, but every concerning finding needs verification with my actual provider.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude's medical-context safety protocol is well-tuned — it explains without overstepping and consistently recommends professional follow-up.",
    timeMinutes: 8,
  },
  {
    id: "legal-contract",
    category: "decoding",
    title: "Decode a legal contract paragraph",
    oneLiner:
      "A contract, lease, or terms-of-service paragraph you can't parse. Get the plain-English version + what to push back on.",
    prompt: `Below is a contract paragraph (or short section) I'm being asked to sign. Help me understand it.

The paragraph:
"""
[paste the paragraph]
"""

Context:
[1-2 sentences — what's the contract about? lease? employment? service agreement?]

Explain:
1. What this paragraph actually says in plain English.
2. What rights I'm giving up or gaining.
3. The 1-2 phrases here that would be worth negotiating to change before signing.
4. The hidden cost or risk most non-lawyers miss in language like this.

Important: you are not a lawyer. For anything where the stakes are high, I should still have an actual attorney review.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude tends to be more cautious + comprehensive with legal text than ChatGPT, and consistently flags the need for actual legal counsel.",
    timeMinutes: 7,
  },
  {
    id: "financial-statement",
    category: "decoding",
    title: "Decode a financial statement or invoice",
    oneLiner:
      "A bill, statement, or financial document with confusing line items. Get a plain-English read + the questions to ask.",
    prompt: `Below is a financial document (bill, bank statement, invoice, retirement account statement, or similar):
"""
[paste the document — strip any account numbers / SSNs first]
"""

Help me understand it:
1. Identify each line item and explain what it actually is.
2. Flag any fees that look unusual or worth challenging.
3. Tell me what 3 questions I should ask whoever sent this (the bank, the vendor, the issuer).
4. If there's a number that looks too high or too low compared to typical, name it.

Treat me as financially literate but not a professional accountant.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude is direct about flagging suspicious charges or unusual fees — useful for catching errors before paying.",
    timeMinutes: 6,
  },

  // ── PLANNING ─────────────────────────────────────────────────────
  {
    id: "trip-plan",
    category: "planning",
    title: "Plan a 7-day trip on a budget",
    oneLiner:
      "You know the destination and the budget. Get a day-by-day plan with cost estimates and where to book.",
    prompt: `Plan a 7-day trip with these constraints:

Destination: [city / region]
Number of travelers: [N]
Total budget (all-in, USD): [$amount]
Trip vibe: [adjectives — e.g. "food-heavy, low-key, walking-friendly, one nice meal"]
Constraints: [anything that matters — dietary, mobility, weather window, language]
Going from: [your home city — for flight cost estimates]

Day-by-day plan with:
- Realistic time blocks (morning / afternoon / evening)
- Cost estimate per activity
- Where to actually book it (named platform/site, not generic "online")
- One thing to skip that most tourists waste a day on
- One reservation I need to make at least 2 weeks ahead

Then at the bottom: 3 things that would make this trip fail and how to avoid each.`,
    recommendedAI: "chatgpt",
    whyThisAI:
      "ChatGPT's web-browse tool can pull current flight + hotel prices. Claude does the planning well but is less current on prices.",
    timeMinutes: 10,
  },
  {
    id: "workout-plan",
    category: "planning",
    title: "Build a workout plan around your body",
    oneLiner:
      "Get a 4-week training plan calibrated to your goal, injuries, schedule, and what equipment you actually have.",
    prompt: `Build me a 4-week workout plan.

My goal: [specific outcome — e.g. "run a 5K under 25 min by August" / "deadlift 1.5x bodyweight" / "lose 8 lb without crashing" / "rehab my left shoulder back to overhead pressing"]

Current fitness baseline:
[1-2 sentences — what you can do today]

Injuries / limits:
[list anything that hurts now, or hurt in the past 12 months]

Equipment access:
[gym membership / home gym contents / bodyweight only / outdoor running access]

Training days per week available: [N]
Time per session: [N minutes]
Other constraints:
[work travel, kids, sleep schedule, anything that limits consistency]

Plan should:
- Have 4 weeks of progression (not just "do this for 4 weeks")
- Name specific exercises, sets, reps, rest periods
- Flag the 1-2 exercises I should swap if my [injury site] is acting up that day
- Tell me what success looks like at end of week 4

I will tell you what hurt after the first week so you can adjust.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude is more conservative about loading and is quicker to flag injury risk than ChatGPT, which matters for long-term consistency.",
    timeMinutes: 10,
  },
  {
    id: "dinner-this-week",
    category: "planning",
    title: "Plan dinner this week from what's in your fridge",
    oneLiner:
      "Take a picture of your fridge / pantry, get a cheap week of dinners with what you have plus a small shopping list.",
    prompt: `(If you can attach a photo of your fridge and pantry: paste it in. Otherwise list contents below.)

Contents I currently have:
[list everything — vegetables that need to be used soon, proteins, pantry staples, fresh items, leftovers]

For this week I need:
- [N] dinners
- Cooking time per night: [N minutes max]
- People to feed: [N adults / N kids if any]
- Dietary constraints: [anything — vegetarian, no gluten, kid-safe spice level, etc.]

Plan 5 dinners that:
- Use what I have first (especially anything I named as going bad soon)
- Need a SHORT shopping list at the end (5 items or fewer) — list it explicitly
- Have a "lazy night" option that's under 15 min active time
- Make leftovers I'll actually want to eat for lunch the next day

Then: one trick I'm probably not using with these ingredients.`,
    recommendedAI: "chatgpt",
    whyThisAI:
      "ChatGPT's vision works smoothly with fridge photos. Claude also has vision but free-tier limits are tighter.",
    lessonSlug: "image-in-chat",
    timeMinutes: 8,
  },

  // ── DECIDING ─────────────────────────────────────────────────────
  {
    id: "pros-cons",
    category: "deciding",
    title: "Real pros and cons (not the polite kind)",
    oneLiner:
      "A decision you've been turning over. Get a sharp pros/cons list that names the things you're avoiding looking at.",
    prompt: `I'm deciding whether to [the decision — be specific].

Background (be honest):
- Why I'm tempted to do it: [your real reasons, including the ones that sound dumb]
- Why I'm hesitating: [list everything, including emotional reasons]
- What I'd be giving up if I do it: [opportunity costs]
- What I'd be giving up if I don't: [other opportunity costs]
- Timeline pressure: [is there a deadline forcing this, or am I making one up?]

I want you to push back, not validate. Specifically:
1. Give me the strongest 3-bullet argument FOR.
2. Give me the strongest 3-bullet argument AGAINST.
3. Name the thing I'm consistently avoiding looking at.
4. Tell me the question I would need to answer honestly before this decision becomes easy.
5. End with: "Based on what you told me, the harder choice is X, and here's why it's probably the right one."

Be direct. I don't need to feel good. I need to decide.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude pushes back more directly than ChatGPT on decision questions — which is what you actually want here.",
    lessonSlug: "senior-engineer-pattern",
    timeMinutes: 12,
  },
  {
    id: "stress-test-plan",
    category: "deciding",
    title: "Stress-test my plan",
    oneLiner:
      "You have a plan you think is solid. Run it through what could go wrong before reality does.",
    prompt: `Here is the plan I'm about to act on:
"""
[describe the plan in 3-8 sentences — what you're going to do, why, by when, and how you'll know it worked]
"""

Stress-test it as if you were a senior person who has watched this kind of plan fail before:

1. Name the 3 most likely ways this plan goes sideways.
2. Name the 1 fatal failure mode I haven't accounted for.
3. Name the assumption I'm making that has the highest chance of being wrong.
4. What's the smallest, cheapest test I could run THIS WEEK to falsify the riskiest assumption before I commit fully?
5. Steelman the version of me, 6 months from now, who looks back and says "I should have seen that coming." What were they looking at?

Don't be polite. Don't lead with positives. I already see the positives — that's why I have the plan. Show me what I'm missing.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude's adversarial-mode responses (when explicitly asked) are sharper than ChatGPT's, which tend toward balanced/diplomatic.",
    lessonSlug: "senior-engineer-pattern",
    timeMinutes: 10,
  },

  // ── LEARNING ─────────────────────────────────────────────────────
  {
    id: "quiz-me",
    category: "learning",
    title: "Quiz me on something I'm learning",
    oneLiner:
      "You're studying a subject. Get a tutor that drills you on weak spots instead of just explaining.",
    prompt: `I am learning [subject — be specific, e.g. "intermediate Spanish — preterite vs imperfect" / "AWS S3 bucket policies" / "the Krebs cycle for a high-school bio exam Friday"].

Current level: [be honest — what can you do today]
Available time: [N minutes per day, M days per week]
Specific weakness: [what you keep getting wrong, OR "I don't know yet"]

Be my tutor:
1. Ask me 5 questions to figure out what I actually know vs. think I know.
2. Pick the area where I'm weakest based on my answers.
3. Drill me there with 8-10 progressively harder questions, one at a time, waiting for my answer between each.
4. When I get one wrong, don't just give the answer — give a hint first, then the answer after my second try.
5. At the end, tell me which 2 concepts I should review before next session.

Be a tutor, not a textbook. Push me. Don't be polite about my mistakes — be precise about them.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude's pedagogy is more patient and direct about mistakes than ChatGPT. Better for actually learning.",
    lessonSlug: "multi-turn-conversations",
    timeMinutes: 20,
  },
  {
    id: "explain-three-ways",
    category: "learning",
    title: "Explain a concept three different ways",
    oneLiner:
      "You read or heard something and didn't quite get it. Get three different framings of the same concept.",
    prompt: `Explain [the concept — e.g. "what a vector embedding actually is" / "why bonds go down when interest rates go up" / "the difference between TCP and UDP"] in three different ways:

1. The 12-year-old version (analogy a kid would get)
2. The expert version (precise, with the actual mechanism)
3. The metaphor version (a non-technical comparison from a different domain)

Then:
- Tell me which of the three is most likely to be wrong in some subtle way and which subtlety it hides.
- Give me one question I should ask next to deepen my understanding.

Don't pad. Don't repeat. Three distinct angles.`,
    recommendedAI: "claude",
    whyThisAI:
      "Claude varies its explanations more than ChatGPT, which tends to give three similar restatements.",
    lessonSlug: "refine-not-restart",
    timeMinutes: 8,
  },
  {
    id: "interpret-bloodwork",
    category: "decoding",
    title: "Understand a bloodwork panel",
    oneLiner:
      "You got lab results back. Twenty numbers, reference ranges, no doctor follow-up for two weeks. You want a plain-English read of what each marker means and which ones actually matter for you.",
    prompt: "I'm going to paste a bloodwork panel below. Please do the following in this order:\n\n1. Translate each marker into plain English (one sentence per marker — what it measures, why a doctor checks it).\n2. Flag every value that is outside the reference range, and every value that is INSIDE the range but close to an edge (within ~10% of the boundary).\n3. Group the flagged markers by what body system they touch (e.g., kidney, liver, thyroid, lipids, blood sugar, inflammation, blood cells).\n4. Tell me the 3 markers I should actually focus on first, and why those three over the others.\n5. For each of those 3, give me: what could push this number in this direction, what lifestyle/diet factors are commonly involved, and what a reasonable follow-up question for my doctor would be.\n6. Explicitly call out anything that looks urgent vs. anything that is \"monitor but not alarming.\"\n\nImportant: be specific to my numbers, not generic. Do not give medical advice or a diagnosis — give me a comprehension layer so I can have a smarter conversation with my doctor.\n\nMy context:\n- Age: [age]\n- Sex: [sex]\n- Known conditions / medications: [list, or \"none\"]\n- Why this panel was ordered: [routine checkup / specific symptom / follow-up]\n- What I want to understand most: [e.g., \"is my cholesterol picture real,\" \"why my doctor mentioned my liver,\" etc.]\n\nHere is the panel (marker, value, units, reference range):\n[paste your results here]",
    recommendedAI: "claude",
    whyThisAI:
      "Claude is careful with health information — it explains without overstepping into diagnosis, handles structured medical data well, and writes clearer plain-English translations than the alternatives for this kind of decoding job.",
    timeMinutes: 8,
  },
  {
    id: "build-sleep-protocol",
    category: "planning",
    title: "Build a better sleep protocol",
    oneLiner:
      "Sleep is broken. Get a 4-week protocol calibrated to your shift, kids, partner, and the science.",
    prompt: "Act as a sleep coach trained in CBT-I, circadian biology, and shift-work physiology. Build me a 4-week sleep protocol that fits my actual life, not a textbook.\n\nMY SITUATION\n- Work shift / hours: [e.g. 9-5 desk, 7pm-3am bartender, rotating 12s, on-call medical]\n- Wake time required: [time + how rigid]\n- Kids/dependents who wake me: [ages, frequency, who else can cover]\n- Partner schedule conflict: [their wake/sleep times, snoring, light/temp preferences]\n- Current sleep: [hours/night, how often I wake, how I feel at 3pm]\n- What I've already tried that didn't work: [melatonin, magnesium, no-screens, etc.]\n- Hard constraints I cannot change: [job, caregiving, medication, pet, etc.]\n- One thing I'm willing to change starting tomorrow: [caffeine cutoff, room temp, bedroom layout, etc.]\n\nDELIVER\n1. Diagnosis — what's actually broken in my sleep architecture (sleep pressure, circadian timing, arousal, sleep efficiency, or sleep environment) given my situation. Name the mechanism, not just the symptom.\n2. Week-by-week protocol (W1, W2, W3, W4) — each week names 2-3 changes max, in order of leverage. No more than that per week.\n3. For each change: the science in one sentence (cite the principle, not a vague \"studies show\"), the exact behavior, and what to do when life breaks the plan.\n4. Partner/kids accommodations — what I negotiate vs. what I work around.\n5. A daily 60-second log I can run on my phone (5 fields max) so I know if the protocol is working by end of W2.\n6. A specific kill-criteria — what result by which date means escalate to a sleep doctor instead of self-managing.\n\nCONSTRAINTS\n- No supplements unless directly indicated by my situation; if recommended, name the dose, timing, and the one trial that supports it.\n- No \"sleep hygiene\" platitudes. Assume I've heard the screens/caffeine/dark-room basics.\n- If my situation has a known disorder pattern (shift-work disorder, postpartum, sleep apnea risk, insomnia comorbid with anxiety), say so plainly and route accordingly.\n- Plain English. No jargon without a 1-line gloss.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude handles multi-constraint life planning with medical nuance better than the others — it'll hold the partner/kids/shift variables together without flattening to generic sleep-hygiene advice, and it knows when to route to a clinician.",
    timeMinutes: 8,
  },
  {
    id: "year-end-review",
    category: "writing",
    title: "Write a year-end performance review",
    oneLiner:
      "Self-review or one for someone you manage. Get specific, accomplishment-rich text without the corporate fog.",
    prompt: "You are helping me write a year-end performance review. Output should be specific, concrete, and free of corporate filler (\"synergy,\" \"leveraged,\" \"drove transformation\"). Use plain language a normal human would say out loud.\n\nREVIEW TYPE: [self-review OR review of someone I manage — pick one]\n\nPERSON: [name and job title — if self-review, your own]\n\nREVIEW PERIOD: [e.g. Jan 2026 - Dec 2026]\n\nTOP 5 ACCOMPLISHMENTS THIS YEAR (rough notes are fine, I'll add detail):\n1. [thing done — what changed because of it]\n2. [thing done — what changed because of it]\n3. [thing done — what changed because of it]\n4. [thing done — what changed because of it]\n5. [thing done — what changed because of it]\n\nAREAS WHERE I/THEY STRUGGLED OR FELL SHORT:\n[2-3 honest items — missed deadlines, skill gaps, conflicts, projects that flopped]\n\nGOALS FOR NEXT YEAR:\n[2-3 things to focus on or grow into]\n\nCOMPANY/TEAM CONTEXT (optional):\n[anything that shaped the year — reorg, layoffs, new product, hiring freeze, etc.]\n\nWRITE THE REVIEW WITH:\n- Concrete numbers, projects, and dates where I gave them\n- Each accomplishment tied to actual business outcome (revenue, time saved, customer impact, team capability)\n- Struggles framed as growth areas with a real plan, not vague \"needs to improve communication\"\n- 400-600 words total, written in the voice the form expects (third person if managing someone, first person if self-review)\n- No filler verbs. No \"passionate.\" No \"rockstar.\" No \"10x.\" No \"wear many hats.\"\n\nBefore writing, ask me up to 3 clarifying questions if any accomplishment is too vague to write a specific sentence about. Then write the full review.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude writes performance reviews in actual human language without the LinkedIn-essay drift ChatGPT slides into. It also pushes back when an accomplishment is too vague to make concrete, instead of papering over with generic praise.",
    timeMinutes: 10,
  },
  {
    id: "explain-to-execs",
    category: "writing",
    title: "Explain something technical to executives",
    oneLiner:
      "Need to brief leadership on something they won't understand. Get 3 versions: 30 seconds, 3 minutes, 30 minutes.",
    prompt: "You are helping me brief executives on a technical topic they don't have background in. Generate three versions of the same explanation, calibrated to three different time budgets.\n\nTOPIC: [paste the technical concept, system, decision, or incident here — be specific, include the actual jargon you'd normally use]\n\nAUDIENCE: [who specifically — CEO, CFO, board, VP of Sales, etc. Include what they care about: revenue, risk, headcount, timeline, customer impact]\n\nWHY THEY NEED TO KNOW: [decision they need to make, question they asked, problem they need to understand, or update you owe them]\n\nWHAT I WANT THEM TO DO AFTER: [approve a budget, pick an option, just be aware, ask sharper questions, etc.]\n\nProduce three versions, in this exact structure:\n\nVERSION 1 — 30 SECONDS (elevator / hallway)\n- 3 sentences max\n- One sentence: what it is in plain English (no jargon, no acronyms)\n- One sentence: why it matters to the business\n- One sentence: what's being asked of them or what changes\n- Test: an executive reading this in a doorway gets the point and knows the next move\n\nVERSION 2 — 3 MINUTES (standing meeting / Slack post / start of agenda item)\n- 4-6 short paragraphs or 5-8 bullets\n- Open with the bottom line (decision, status, or impact) BEFORE the explanation\n- Use 1 plain-English analogy if it actually clarifies — skip it if forced\n- Surface the 2-3 numbers or facts that matter (cost, risk, timeline, customer count)\n- Name the 1-2 tradeoffs they should know about\n- End with the specific ask or next step\n\nVERSION 3 — 30 MINUTES (deep brief / strategy doc / board read-ahead)\n- Structured doc with these sections:\n  1. TL;DR (3 lines — same as Version 1)\n  2. Context (what changed, why this is on their plate now)\n  3. The technical reality (still in plain English — assume smart non-experts, define every term the first time)\n  4. Business impact (revenue, cost, risk, time, people, customer experience)\n  5. Options on the table (2-4 paths, each with pros/cons/cost/risk)\n  6. Recommendation and why\n  7. What we need from leadership (decisions, approvals, air cover, money, hires)\n  8. Open questions and known unknowns\n  9. Appendix pointer (link the deeper technical docs here for the one exec who will dig)\n\nRULES FOR ALL THREE VERSIONS:\n- Zero unexplained acronyms or jargon. If you must use a term, define it on first use in fewer than 8 words.\n- No filler (\"it's important to note that,\" \"as you know,\" \"obviously\"). Cut it.\n- No hype words: transformative, revolutionary, game-changing, leverage, synergy, robust, seamless. Use real words.\n- Numbers beat adjectives. \"Cuts processing time from 4 hours to 8 minutes\" beats \"significantly faster.\"\n- If you don't know a number, write \"[NEED: actual figure]\" so I can fill it in.\n- Tone: confident, direct, respectful of their time. Not pleading, not impressed with itself, not hedging.\n\nAfter generating the three versions, flag any spot where my source material was thin or contradictory, so I can fix it before sending.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude is strongest at calibrating tone and depth across multiple length budgets in one pass, and at stripping jargon while keeping precision. Less likely than ChatGPT to insert hype filler or over-flatter the audience.",
    timeMinutes: 8,
  },
  {
    id: "first-90-days-plan",
    category: "planning",
    title: "Build a first-90-days plan for a new role",
    oneLiner:
      "Started a new job or got promoted. Get a 30-60-90 plan calibrated to the actual role and the org's politics.",
    prompt: "You are helping me build a first-90-days plan for a new role. I want a plan calibrated to my actual job, my team, and the political reality of the org — not a generic template.\n\nHere is my situation:\n- Role title: [exact title, e.g. \"Senior PM, Growth\"]\n- Company / industry: [company name + what they do in one line]\n- Team size and who I manage or report to: [e.g. \"team of 6, report to VP Product, no direct reports yet\"]\n- Why this role exists (replacement, new headcount, turnaround, etc.): [context]\n- What I was told success looks like in the interview: [quote what the hiring manager actually said]\n- What I think the real unstated goal is: [your honest read]\n- Known politics, factions, or sensitivities: [e.g. \"previous person was fired\", \"two teams fighting over scope\", \"CEO favorite\", \"skeptical eng lead\"]\n- My background and what I'm strongest at: [3 lines]\n- My weakest area for this specific role: [1 line, be honest]\n- Start date: [date]\n\nGive me back:\n\n1. The diagnosis. In 5-8 bullets, what is actually going on in this role and team. Separate what is stated from what is likely true. Name the political risk.\n\n2. The 30-60-90 plan. For each phase, give me:\n   - Theme (one phrase)\n   - Top 3 outcomes I should be visibly accountable for\n   - What I should NOT touch yet and why\n   - Stakeholders to win in this phase, by name or function\n   - One \"early-win\" candidate that is low-risk and visible\n   - One trap that gets new hires fired in this exact situation\n\n3. The first-week schedule. Day-by-day for days 1-5 — what meetings to ask for, what questions to ask in each, and what to write down.\n\n4. The listening tour. A list of 8-12 specific people to meet in the first 30 days (by role if I haven't named them), what each conversation is for, and 3 questions per person calibrated to what that person actually controls.\n\n5. Red flags to watch for. 5 signals in the first 30 days that mean the role is worse than advertised, with what to do if I see them.\n\n6. What I should NOT say out loud in the first 30 days, even if I believe it.\n\nBe direct. No corporate-coach hedging. If my unstated goal looks unrealistic, say so and tell me what to renegotiate before day 60.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude handles the political-read part better than ChatGPT — it will actually separate stated from unstated goals and name the trap instead of giving a generic 30-60-90 template. Long-context, structured output, willing to be direct.",
    timeMinutes: 15,
  },

  // ── PASS 2 EXPANSION (hand-written, 2026-05-29) ──────────────────

  {
    id: "rewrite-resume",
    category: "writing",
    title: "Rewrite a resume for a specific job",
    oneLiner:
      "You have a resume and a target role. Get an honest rewrite that emphasizes what matches, cuts what doesn't, and flags the gap between your background and the posting.",
    prompt: "Help me rewrite my resume for a specific job. I'll paste both.\n\nMY CURRENT RESUME:\n[paste your full resume here]\n\nTHE TARGET JOB POSTING:\n[paste the posting]\n\nGive me back:\n1. The 3 things in the posting I'm strongest on — for each, name the exact resume bullet that proves it (and tighten the bullet if it's weak).\n2. The 3 things in the posting I'm weakest on — name them honestly.\n3. A rewritten resume that leads with the strongest 3, reorders sections accordingly, and rewrites the summary in 3 sentences calibrated to this specific role.\n4. Two bullets I should add (or invent honestly from real work) that would close the biggest gap.\n5. The one section that should be SHORTER than it currently is.\n\nNo corporate jargon. No 'passionate about'. No 'leverage'. If a bullet sounds AI-written, flag it.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude resists resume-cliché phrasing better than ChatGPT and is more willing to name what's weak in the resume rather than paper over it.",
    timeMinutes: 12,
  },
  {
    id: "linkedin-about-section",
    category: "writing",
    title: "Write a LinkedIn About section that doesn't sound like every other one",
    oneLiner:
      "Your LinkedIn About section is supposed to be the 30-second version of your professional story. Get one that's specific to you instead of template-shaped.",
    prompt: "I need to write a LinkedIn About section. Most of them are interchangeable. Mine should not be.\n\nABOUT ME:\n- Current role and what I actually do day-to-day: [1-2 sentences]\n- 3 specific accomplishments I'm proud of (with real numbers if possible): [list]\n- The one industry/skill I'm uniquely positioned at the intersection of: [1 sentence]\n- The kind of work I want to do MORE of: [1 sentence]\n- The audience for the section (recruiters / customers / peers / investors): [pick one or two]\n- The voice I want to come across (warm / direct / playful / technical / sharp): [pick]\n\nWrite me 3 different versions, each ~120 words, each leading with a different hook (specific accomplishment / unusual intersection / direct ask). For each, tell me what kind of reader it lands best with.\n\nBan the phrases: 'passionate about', 'driven by', 'I leverage', 'storytelling', 'I am a' (anything that starts that way).",
    recommendedAI: "claude",
    whyThisAI:
      "Claude writes warmer professional copy and is better at varying hooks across drafts. ChatGPT tends to produce three drafts that all sound similar.",
    timeMinutes: 10,
  },
  {
    id: "interview-prep-deep",
    category: "planning",
    title: "Prep for a specific interview (not generic interview tips)",
    oneLiner:
      "You have an interview Thursday. Get a calibrated prep — likely questions for this exact role, your strongest stories ranked, the question you're going to get wrong if you don't prepare for it.",
    prompt: "I have an interview for a specific role. Help me prep — calibrated to THIS role at THIS company, not generic interview tips.\n\nSITUATION:\n- Role: [exact title]\n- Company: [name + what they do in one line]\n- Interview type: [phone screen / hiring manager / panel / executive / case]\n- Interviewer (if known): [name + role + how long they've been there]\n- The job posting: [paste]\n- My resume: [paste]\n- What I think they care about most: [your best guess]\n- What I'm worried they'll ask: [the question you don't want]\n- My deal-breaker for the role: [a thing that, if true, kills the job for me]\n\nGive me:\n1. The 8 questions most likely to be asked in this specific interview (not generic — calibrated to the role + company + interviewer if known).\n2. For each question, the structure of a strong answer (STAR or otherwise) and which of my background bullets to use.\n3. The 2 questions I'm most likely to get wrong, and what to say if they're asked.\n4. 4 questions I should ask THEM, in order of importance, that show I've done real homework.\n5. The one thing I should NOT bring up unless they bring it up first.\n6. A 90-second self-intro tuned to this specific role.\n\nBe direct. If my deal-breaker is going to come up, tell me how to surface it without burning the interview.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude is better at calibrating prep to a specific role rather than generating generic interview tips. It will name the question you'll get wrong instead of softening it.",
    timeMinutes: 20,
  },
  {
    id: "code-review-my-work",
    category: "decoding",
    title: "Code-review my own work before I push",
    oneLiner:
      "You wrote code that works. Get a senior-engineer review that catches the things you'd be embarrassed for a teammate to find.",
    prompt: "Review my code before I push it. Act as a senior engineer who has watched too many bugs ship from teammates who didn't ask for review.\n\nWHAT I'M PUSHING:\n[paste the diff or the changed files]\n\nCONTEXT:\n- What this change is supposed to do (one paragraph): [explanation]\n- Where it gets called from / who depends on it: [callers]\n- Language and framework: [e.g. TypeScript + Next.js + Prisma]\n- Tests I added: [list or 'none']\n- Things I'm worried about: [your honest worry, e.g. 'edge case with empty inputs', 'auth boundary', 'race condition with the queue']\n\nReview FOR:\n1. Bugs — anything that would break in production. Include edge cases (empty inputs, null, large input, concurrent access, errors from upstream).\n2. Security — anything that could be exploited (injection, auth bypass, privilege escalation, secrets in logs).\n3. Performance — obvious inefficiencies (N+1 queries, missing indexes, unbounded loops, memory leaks).\n4. Readability — anything I'd want to refactor before someone else has to maintain this.\n5. Tests — what's missing from my test coverage, ranked by importance.\n\nFor each finding, give me: severity (must-fix / should-fix / nice-to-have), what's wrong, and a one-line suggested fix.\n\nDo not say 'looks good overall' unless it actually does. If it has a real bug, lead with that.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude's code review is more direct and less prone to false positives than ChatGPT's, and it handles long diffs in one paste thanks to the large context window.",
    lessonSlug: "the-verify-rule",
    timeMinutes: 12,
  },
  {
    id: "what-to-read-next",
    category: "deciding",
    title: "What should I read next?",
    oneLiner:
      "Get a personalized reading list calibrated to what you've already read, what's been on your mind, and how much time you actually have — not a top-10 best-of list.",
    prompt: "Recommend my next 5 books to read. Calibrated to me, not a top-10 list.\n\nABOUT MY READING:\n- 5 books I've read in the last 2 years and what I thought of each (one line each): [list]\n- A book I LOVED and have re-read: [name + why]\n- A book everyone says is great that I bounced off of: [name + why I bounced]\n- What's been on my mind lately (a topic, a question, a tension): [1-2 sentences]\n- How much time I actually have: [N pages per week or N minutes per day]\n- My honest reading speed: [fast / medium / slow on dense non-fiction]\n- Books I've been told to read that I've avoided and why: [list]\n\nRecommend 5 books. For each, give me:\n1. Why this book for me specifically — tie it to something in my history above.\n2. How long it'll take at my pace.\n3. The one chapter or section that's the heart, in case I bail.\n4. What it'll change in how I think (or won't, if it's just a great read).\n5. Whether to read it now or wait for a specific moment.\n\nNo generic recommendations. If I would have already discovered the obvious choice, give me the non-obvious one.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude's literary recommendations track personal context better than ChatGPT's, which leans toward popular consensus.",
    timeMinutes: 10,
  },
  {
    id: "argue-against-my-position",
    category: "deciding",
    title: "Argue against my position (steel-man the other side)",
    oneLiner:
      "You hold a position you're not sure about. Get the strongest possible version of the opposing case — so you can either update your view or know you're holding it for the right reasons.",
    prompt: "I hold a position. Argue against it as forcefully and intelligently as you can. I want the steel-man, not the straw-man.\n\nMY POSITION:\n[state your position in 1-3 sentences]\n\nWHY I HOLD IT:\n[your reasons, however many you have]\n\nWHAT I'M UNSURE ABOUT:\n[any doubts you already have]\n\nGive me:\n1. The strongest 3-bullet argument against my position. Not the dumb one — the smart one. Cite specifics, not just principles.\n2. The most likely place my reasoning has a hole, with the question that exposes it.\n3. The category of evidence that, if it appeared, should make me update.\n4. The honest read on whether my position is more about identity than analysis. If yes, name the identity.\n5. The position someone smarter than me but on the opposite side would hold — not just inverted, calibrated.\n\nDo not soften. Do not balance. I have the for-my-side arguments already. I need the against-my-side arguments as well as you can make them.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude steel-mans opposing views more thoroughly than ChatGPT, which tends toward false balance. The 'don't soften' instruction lands.",
    lessonSlug: "senior-engineer-pattern",
    timeMinutes: 12,
  },
  {
    id: "explain-to-a-kid",
    category: "writing",
    title: "Explain something to a child",
    oneLiner:
      "You need to explain a hard topic to a kid — death, divorce, money trouble, a complicated science concept, a hard news event. Get an age-calibrated explanation that doesn't dodge.",
    prompt: "Help me explain something to a child. I want to be honest without being scary, and clear without being patronizing.\n\nTHE CONVERSATION:\n- Topic to explain: [the topic — e.g. 'why grandpa is moving to assisted living' / 'why we can't afford the trip this year' / 'what war is' / 'why the bee is dying' / 'what death means']\n- Child's age: [age]\n- Child's personality: [thoughtful / anxious / matter-of-fact / silly / very-curious / etc. — be specific]\n- What they already know: [what they've been told so far OR what they're picking up from overhearing]\n- What I want them to walk away understanding: [the core point in plain language]\n- What I want them NOT to walk away worried about: [the trap]\n\nGive me:\n1. The opening — the exact 2-3 sentences to start the conversation, calibrated to the child's age + personality.\n2. The version of the truth at their level — accurate, not sugar-coated, not over-detailed.\n3. The 3 questions they're most likely to ask, and how to answer each one honestly.\n4. The thing I should NOT say, even if they ask, and what to say instead.\n5. How to know if they're processing or shutting down, and what to do for each.\n6. The follow-up — what to do in the days after to keep the door open without forcing more conversation.\n\nDo not write a script for a younger kid than mine. Calibrate to the age.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude's developmental-sensitivity in parenting conversations is the most reliable on the free tier. ChatGPT tends to age-mismatch.",
    timeMinutes: 12,
  },
  {
    id: "what-to-cook-tonight",
    category: "planning",
    title: "What should I cook tonight?",
    oneLiner:
      "You don't want to think about dinner. Tell the AI what's in your fridge, who's eating, and how much energy you have. Get one specific dinner.",
    prompt: "Tell me what to cook tonight. Just one thing. Calibrated.\n\nWHAT I HAVE:\n- Proteins in the fridge / freezer: [list — be specific about freezer state]\n- Vegetables that are using up: [list]\n- Pantry staples I always have: [grains, oils, spices, condiments]\n- Anything that needs to be eaten THIS WEEK or it spoils: [list]\n\nWHO'S EATING:\n- Number of people, plus ages of any kids: [N adults + N kids ages]\n- Anyone who needs special handling (allergies, picky, vegetarian): [list]\n\nMY STATE TONIGHT:\n- Energy level (1-5): [1 = barely standing, 5 = actively excited to cook]\n- Time I have before we need to eat: [N minutes]\n- Cleanup tolerance (1-5): [1 = one pan only please, 5 = full kitchen ok]\n- Did I have something heavy at lunch?: [yes/no]\n\nGive me ONE dinner. Not three options to choose from. The right one for tonight. Include:\n- What I'm making in one phrase.\n- Active cooking time vs total time.\n- The order of operations (don't make me figure it out).\n- The one ingredient I'm going to forget to use first that I have to start now.\n- One shortcut if my energy is below 3.\n- What to do with the leftovers (or 'no leftovers, eat it all').\n\nIf my fridge contents don't actually support a real dinner, say so and tell me what to grab on the way home.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude commits to one answer instead of paralyzing you with three options. ChatGPT tends toward 'here are 5 ideas'.",
    timeMinutes: 6,
  },
  {
    id: "what-to-say-at-the-funeral",
    category: "writing",
    title: "Help me write something to say at a funeral or memorial",
    oneLiner:
      "Someone has died. You've been asked to speak. You don't know what to say. Get a draft that sounds like you, about the specific person, not template-shaped.",
    prompt: "I need to write something to say at a funeral or memorial. Help me. I want it to sound like me, not like a generic eulogy template.\n\nABOUT THE PERSON WHO DIED:\n- Their name and relationship to me: [name + how I knew them]\n- How they died (if I'm willing to share): [context if it helps tone — illness / sudden / age]\n- Three specific things I loved or admired about them: [be specific, with stories if you have them]\n- One thing about them that was difficult or complicated and that the room knows is true: [optional but powerful — name the real thing if you want it acknowledged]\n- A specific moment between us that captures who they were: [the moment]\n- What I want the room to walk away remembering about them: [one phrase]\n\nABOUT ME (so the writing sounds like me):\n- My speaking style normally: [warm / direct / dry / funny / formal]\n- How comfortable I am with humor at funerals: [comfortable / uncomfortable / depends on the line]\n- How long the speech should be: [target N minutes]\n\nGive me a draft that:\n1. Opens with the specific moment, not 'we are gathered here today.'\n2. Names the difficult thing if I asked it to (acknowledged with care, not avoided).\n3. Ends with the phrase I want the room to remember, said in my voice.\n4. Is the length I asked for, not longer.\n\nThen give me the one line I should rehearse out loud so I can get through it without breaking.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude's handling of grief writing is the most respectful and the least template-shaped on the free tier. The 'acknowledge the difficult thing with care' move lands here in a way it does not on ChatGPT.",
    timeMinutes: 15,
  },
  {
    id: "negotiate-something-hard",
    category: "deciding",
    title: "Prep for a hard negotiation (not just salary)",
    oneLiner:
      "Salary, contract terms, rent, divorce settlement, business buyout. Get a calibrated prep — your walk-away, their probable walk-away, the moves that backfire.",
    prompt: "I have a hard negotiation coming up. Help me prep. This is not generic 'negotiation tips' — calibrated to my specific situation.\n\nSITUATION:\n- What I'm negotiating: [exactly what — e.g. 'severance package' / 'commercial lease renewal' / 'final divorce financial terms' / 'business buyout from co-founder']\n- The other side and our relationship: [adversarial / longstanding / new / mixed]\n- My current best alternative if no deal (BATNA): [be honest, even if it's bad]\n- Their likely best alternative if no deal: [your honest read]\n- The specific terms on the table right now: [the offer or the starting points]\n- My honest walk-away point: [the number / terms below which I'd rather have no deal]\n- What I think their walk-away point is: [your guess]\n- Time pressure on me: [high / medium / low]\n- Time pressure on them: [high / medium / low]\n- My biggest negotiation weakness: [emotional / detail / patience / saying no / etc.]\n\nGive me:\n1. The opening move I should make (price + framing + delivery). One specific move, not three options.\n2. The 3 most likely responses they'll give, and what to say to each.\n3. The concession of mine they want most, and what I should get in exchange.\n4. The trap that most people in my position fall into in this specific kind of negotiation.\n5. The line I should NOT say even if it's true.\n6. The signal that means 'walk away, this deal isn't happening'.\n7. The signal that means 'we have a deal, stop negotiating'.\n\nBe specific and direct. No 'know your worth' platitudes. If my walk-away point is unrealistic, tell me.",
    recommendedAI: "claude",
    whyThisAI:
      "Claude handles multi-party negotiation strategy with more honesty about your weak points than ChatGPT, which tends to validate. The 'tell me if my walk-away is unrealistic' instruction lands.",
    timeMinutes: 15,
  },
];

export function tasksByCategory(category: TaskCategory): Task[] {
  return TASKS.filter((t) => t.category === category);
}

export function getTask(id: string): Task | undefined {
  return TASKS.find((t) => t.id === id);
}

export const CATEGORY_META: Record<
  TaskCategory,
  { label: string; oneLiner: string; accent: string }
> = {
  writing: {
    label: "Writing",
    oneLiner: "Email, drafts, hard conversations, cover letters.",
    accent: "#22F0D5",
  },
  decoding: {
    label: "Decoding",
    oneLiner: "Long docs, medical reports, contracts, financial statements.",
    accent: "#FFB87A",
  },
  planning: {
    label: "Planning",
    oneLiner: "Trips, workouts, weekly meals, project timelines.",
    accent: "#22F0D5",
  },
  deciding: {
    label: "Deciding",
    oneLiner: "Real pros/cons, stress-tests, the question you've been avoiding.",
    accent: "#FF7A1A",
  },
  learning: {
    label: "Learning",
    oneLiner: "Quiz drills, multiple explanations, real tutoring.",
    accent: "#22F0D5",
  },
};

export const AI_LAUNCH_URL: Record<RecommendedAI, { label: string; url: string }> = {
  claude: { label: "Claude", url: "https://claude.ai" },
  chatgpt: { label: "ChatGPT", url: "https://chatgpt.com" },
  gemini: { label: "Gemini", url: "https://gemini.google.com" },
  perplexity: { label: "Perplexity", url: "https://perplexity.ai" },
};
