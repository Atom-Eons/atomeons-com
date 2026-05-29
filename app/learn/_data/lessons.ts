import type { LevelId } from "./levels";

/**
 * The lesson library — the actual curriculum.
 *
 * Each lesson has the same shape:
 *   - slug · stable URL fragment
 *   - level · which level the lesson is FOR (so it sequences cleanly)
 *   - title · noun-phrase
 *   - oneLiner · why this lesson exists
 *   - concept · what's actually happening under the hood (the model
 *     of the world the lesson teaches)
 *   - drill · the copy-paste exercise the user does, with the exact
 *     prompt or actions. Real. Tested. Works in free Claude / ChatGPT
 *     / Gemini.
 *   - outcome · what should be true after the drill (the success
 *     signal — concrete, observable)
 *   - trap · the most common failure mode at this lesson and how to
 *     spot it
 *   - timeMinutes · honest estimate for an unpracticed human
 *   - next · slug of the recommended next lesson (or null for tier
 *     transitions)
 *
 * The lesson set is curated, not exhaustive. Eighteen lessons that
 * actually move a human from Novice to the doorstep of Pilot. Each
 * lesson is a real thing you do, not a paragraph to read.
 *
 * Voice register: warm, direct, practical. Treat the reader like a
 * competent adult who has not yet used AI seriously.
 */

export type Lesson = {
  slug: string;
  level: LevelId;
  number: number; // global ordering 1..N
  title: string;
  oneLiner: string;
  concept: string[];
  drillIntro: string;
  drillPrompt: string;
  drillSteps: string[];
  outcome: string[];
  trap: string;
  timeMinutes: number;
  next: string | null;
  tags: string[];
};

export const LESSONS: Lesson[] = [
  // ── LEVEL 1 · NOVICE ────────────────────────────────────────────
  {
    slug: "what-ai-actually-does",
    level: "novice",
    number: 1,
    title: "What AI actually does — autocomplete at huge scale",
    oneLiner:
      "Strip the magic feeling off. Get the working model of what AI is doing under the hood, so the rest of the curriculum has a foundation.",
    concept: [
      "AI in 2026 — the kind you type into — is software that learned from a very large pile of human text, images, and code. When you type something, it tries to predict what comes next, one piece at a time, based on patterns it learned from that pile.",
      "It is not conscious. It is not your friend. It is not a search engine. It is not always right. It is an extraordinarily good drafting and thinking partner if you operate it instead of trusting it.",
      "Everything else in this curriculum follows from this. When AI feels magical, it's the prediction landing. When AI feels stupid, the prediction missed. There is no separate magic mode.",
    ],
    drillIntro:
      "You're going to ask an AI to explain itself, in the simplest possible terms, to YOU. This is the meta-prompt that anchors everything.",
    drillPrompt: `Explain in 200 words, plain English, what you are doing when I type a message and you respond.

Use a concrete analogy a 12-year-old would understand. Tell me one thing you are genuinely good at and one thing you are genuinely bad at. Do not use the words "transformative," "synergy," "revolutionize," "powerful," or "intelligence."

After you answer, ask me one question to check whether the explanation landed.`,
    drillSteps: [
      "Open a new tab. Go to claude.ai or chatgpt.com (free tier is fine).",
      "Paste the prompt above. Send it.",
      "Read the reply slowly. Don't scroll past.",
      "Answer the AI's check-in question. That is your first multi-turn moment.",
    ],
    outcome: [
      "You can describe in one paragraph what AI does, without quoting the AI's reply.",
      "You felt one moment of \"oh, that's actually how it works.\"",
      "You sent at least two messages in one conversation, not one.",
    ],
    trap:
      "Reading the explanation, nodding, closing the tab. Reading is not the lesson. Doing the back-and-forth is the lesson. If you didn't answer the AI's check-in question, redo the drill.",
    timeMinutes: 8,
    next: "your-first-real-prompt",
    tags: ["foundation", "concept", "novice"],
  },
  {
    slug: "your-first-real-prompt",
    level: "novice",
    number: 2,
    title: "Your first real prompt — be specific, not polite",
    oneLiner:
      "Stop typing into AI like you're texting a friend. The prompt is the entire skill at this level.",
    concept: [
      "Most novice prompts fail in the same way: too vague. \"Help me with my resume\" returns mush. \"Help me rewrite this paragraph of my resume to emphasize SaaS pricing experience for a Series A startup PM role, under 90 words\" returns gold.",
      "There is no magic prompt syntax. There is only specificity: the context the AI needs, the constraint that shapes the output, and the format you want back. Three things.",
      "Politeness adds words and helps nothing. Being direct is faster and the AI does not have feelings. (\"Please\" and \"thank you\" are fine if it makes you feel better, but they are not the lever.)",
    ],
    drillIntro:
      "Take a real task you have THIS WEEK. Don't invent one. Run the bad-prompt version first to see why specificity matters, then the good-prompt version.",
    drillPrompt: `Round 1 · the bad prompt (intentional):
"Help me with [thing]."

Round 2 · the good prompt (template — fill in the brackets):

I need to [the exact task].

Context:
- [who this is for]
- [what came before this — paste the email / the meeting note / the doc, if any]
- [what success looks like for me]

Constraints:
- [length / tone / format]
- [anything I have to include or avoid]

Output:
- [give me a [draft / list / outline / version A and B]]
- [if you need anything else from me before drafting, ask now]`,
    drillSteps: [
      "Pick a real task from your week (email, summary, plan, write-up).",
      "Run Round 1. Note how generic the output is.",
      "Run Round 2 (the same task, same chat, specific). Compare.",
      "Save the Round 2 template to your phone Notes. Reuse it tomorrow.",
    ],
    outcome: [
      "You felt the gap between vague and specific in your own work.",
      "You have a template you'll reuse this week.",
      "You stop typing \"help me with…\" and start typing \"I need to…\".",
    ],
    trap:
      "Treating the template as sacred. The template is a scaffold. Once you internalize the three pieces — context, constraint, output — you write better prompts from memory.",
    timeMinutes: 12,
    next: "when-ai-gets-it-wrong",
    tags: ["foundation", "prompt", "novice"],
  },
  {
    slug: "when-ai-gets-it-wrong",
    level: "novice",
    number: 3,
    title: "When AI gets it wrong — see a hallucination, on purpose",
    oneLiner:
      "You will not respect the verify rule until you watch AI lie to your face with full confidence. Do it now, on a low-stakes question, where the cost is zero.",
    concept: [
      "AI does not know what is true. It knows what is plausible. When you ask about facts — names, dates, statistics, citations, court cases, scientific studies — there is a category of error called hallucination where AI confidently invents something that does not exist.",
      "The invented thing has all the surface features of a real thing. A paper title that sounds right. A court case with a plausible name. A statistic to two decimal places. This is the most dangerous mode of AI because it doesn't feel wrong.",
      "The rule that protects you: AI is excellent at structure and drafts, dangerous at facts. The drafts save you time. The unverified facts will get you fired, sued, or quietly embarrassed.",
    ],
    drillIntro:
      "You're going to ask AI for citations on a fairly obscure (but real) topic, then look up whether the citations exist. Half of what you find will likely be fabricated. This is the lesson.",
    drillPrompt: `Give me 5 academic papers from peer-reviewed journals on [specific obscure topic — e.g. "the effect of bioelectric signals on cell differentiation in planarian regeneration"]. For each:
- exact title
- authors
- journal name
- year
- DOI or URL

Be specific. I will check.`,
    drillSteps: [
      "Pick a niche topic you know roughly but don't have papers memorized for.",
      "Run the prompt. Get 5 citations back.",
      "Open Google Scholar (scholar.google.com).",
      "Search for each title. Note how many actually exist as cited (authors, journal, year match).",
      "Notice the failure mode: titles that sound right, journals that exist, authors who exist but didn't write that paper.",
    ],
    outcome: [
      "You have seen — not read about — AI confidently fabricate a citation.",
      "You have a felt sense, not just a theoretical one, of the verify rule.",
      "You will never paste an AI-generated citation into a serious document without checking.",
    ],
    trap:
      "Concluding \"AI is useless because it lies.\" That's the wrong takeaway. AI is excellent at drafting and dangerous at facts. The rule is to verify facts, not to abandon the tool.",
    timeMinutes: 10,
    next: "refine-not-restart",
    tags: ["foundation", "limits", "novice", "honest-limits"],
  },
  // ── LEVEL 2 · LEARNER ───────────────────────────────────────────
  {
    slug: "refine-not-restart",
    level: "learner",
    number: 4,
    title: "Refine, don't restart — the second draft is where it lands",
    oneLiner:
      "The biggest skill jump at this level: stop deleting the conversation and starting over when an answer is wrong. Refine in-place.",
    concept: [
      "Novice users hit a wrong answer and start a new chat. Learner users push back on the wrong answer in the same chat. The second draft is almost always better than the first.",
      "Useful follow-ups: \"That's too long, cut it in half.\" \"You missed [X] — rewrite incorporating it.\" \"The tone is too formal — make it sound like a friend wrote it.\" \"You assumed [thing] — what if [other thing]?\" \"Show me 3 versions, varying [dimension].\"",
      "The conversation has memory inside the conversation. The AI remembers what it just said and what you just corrected. Use that.",
    ],
    drillIntro:
      "Take any prompt that produced an OK-but-not-great answer this week. Refine it in three turns without starting over.",
    drillPrompt: `(Re-use the original prompt that disappointed you. Then push back across three turns.)

Turn 2: "This answer is [specific complaint — too long / too formal / missed X / wrong tone]. Rewrite, fixing that. Keep [what was good]."

Turn 3: "Better. Now [next thing to fix]. Same constraint."

Turn 4: "One more pass. [Final polish — make it tighter / make it sound like me / cut the last paragraph]."`,
    drillSteps: [
      "Open the chat where you got a meh answer recently.",
      "Don't restart. Use Turn 2 above.",
      "Use Turn 3.",
      "Use Turn 4.",
      "Notice how the answer landed by turn 4 vs. where you started.",
    ],
    outcome: [
      "You sent four messages in one chat without restarting.",
      "Turn 4 is meaningfully better than Turn 1.",
      "You internalize: the prompt is not the lesson. The conversation is.",
    ],
    trap:
      "Refining forever. After 5–6 turns, if it's not landing, the original prompt was wrong. Start fresh with a better prompt, using what you learned.",
    timeMinutes: 8,
    next: "the-verify-rule",
    tags: ["learner", "conversation", "iteration"],
  },
  {
    slug: "the-verify-rule",
    level: "learner",
    number: 5,
    title: "The verify rule — three categories of trust",
    oneLiner:
      "Not everything AI says needs verification. Most things don't. Knowing which third does is the skill.",
    concept: [
      "Trust AI for: structure, format, drafting, brainstorming, summarizing what you wrote, rewriting your tone, translating, generating options to choose between. These are pattern tasks where being plausible IS being right.",
      "Verify AI on: numbers, names, dates, citations, statistics, legal claims, medical claims, financial claims, anything you'll quote, anything that will go in front of a customer / boss / regulator. These are fact tasks where being plausible can be wrong.",
      "Never trust AI for: passwords, account numbers, anything you can't undo if AI is wrong, decisions where the stakes are higher than the time you saved.",
    ],
    drillIntro:
      "Categorize your last 10 AI uses into the three buckets. This is the meta-skill: knowing which mode you're in.",
    drillPrompt: `(This drill is on paper or a Note, not in the AI chat.)

List your last 10 AI uses (best estimate, doesn't have to be perfect). Categorize each into one of three buckets:

1. TRUST — pattern task (drafting, structure, rewriting). I should not verify; the time spent verifying is more than the risk of being wrong.

2. VERIFY — fact task (numbers, names, citations, claims). I should check before using.

3. DON'T USE AI FOR THIS — decision is too high-stakes for AI alone.

For each VERIFY item, write the one specific check you should have done. For each DON'T USE item, name what you should do instead.`,
    drillSteps: [
      "List 10 recent AI uses (or fewer if you don't have 10 yet — minimum 5).",
      "Tag each TRUST / VERIFY / DON'T USE.",
      "For VERIFY items: did you actually check?",
      "For DON'T USE items: did AI subtly enter the decision anyway?",
    ],
    outcome: [
      "You have a calibrated mental model of when to verify.",
      "You have at least one VERIFY item you wish you had checked.",
      "You stop verifying drafts (waste of time) and start verifying numbers (saves your job).",
    ],
    trap:
      "Verifying everything. That's the same mistake as verifying nothing — both make you slow without making you right. The skill is the category.",
    timeMinutes: 15,
    next: "your-saved-prompt-library",
    tags: ["learner", "limits", "trust"],
  },
  {
    slug: "your-saved-prompt-library",
    level: "learner",
    number: 6,
    title: "Your saved-prompt library — the second-biggest leverage",
    oneLiner:
      "The first time you write a good prompt for a recurring task, save it. The second time, you reuse it. By month two, your prompt library is doing 60% of the work.",
    concept: [
      "Every prompt you write for a task you do more than once should be saved. The act of saving costs 20 seconds; the lifetime savings is hours.",
      "Where to save: phone Notes app, a single document in Notion / Google Docs, or Claude Projects / ChatGPT Custom GPTs if you're paying. Don't overthink this — the worst saved-prompt library is better than no library.",
      "Naming matters. \"Email reply v2\" tells you nothing. \"Reply to angry customer · keep firm but warm · 120 words\" tells you exactly when to grab it.",
    ],
    drillIntro:
      "Build your first three saved prompts right now. The three you'll reuse most this month.",
    drillPrompt: `(This drill is in your Notes app, not in AI.)

Create a note titled "AI prompts." Add three sections, each with:
- a clear, descriptive name (you'll grep for it later)
- the prompt body (with [bracketed slots] for the variable parts)
- one example of what to paste in

Pick the three tasks YOU actually repeat this month. Examples (don't copy unless they're real for you):

1. "Reply to a tough work email · firm but professional · 100 words"
2. "Summarize a long doc into 3 bullets a busy exec actually reads"
3. "Plan dinner this week from what's in the fridge · cheap · no recipes I don't have"`,
    drillSteps: [
      "Open Notes / Notion / Docs.",
      "Title: \"AI prompts.\"",
      "Write three prompts you actually want to reuse. Bracket the variable parts.",
      "Use one of them today.",
    ],
    outcome: [
      "Your saved-prompt library exists.",
      "You used one saved prompt in real work within 24h.",
      "You stop writing the same prompt from scratch.",
    ],
    trap:
      "Building a library of 30 prompts you never use. Three good ones beat thirty mediocre ones. Add a fourth only when you've used the first three for a week.",
    timeMinutes: 12,
    next: "multi-turn-conversations",
    tags: ["learner", "habit", "library"],
  },
  // ── LEVEL 3 · USER ──────────────────────────────────────────────
  {
    slug: "multi-turn-conversations",
    level: "user",
    number: 7,
    title: "Multi-turn conversations — letting the chat build a model of the task",
    oneLiner:
      "At User level, a single prompt is rarely the win. A 5–10 turn conversation that builds a working model of your task is.",
    concept: [
      "A long conversation gives the AI a working model of what you're trying to do, who you are, and what \"good\" looks like for you. By turn 5 the answers are 2x better than turn 1, because the AI is now drafting against context, not against a cold start.",
      "Three patterns that work: (1) Discovery — start with \"ask me 5 questions before you write anything.\" The AI gathers context first. (2) Iteration — generate, critique, refine, in the same chat. (3) Roleplay — \"act as a [role]\" carries through the conversation.",
      "When the conversation gets too long (50+ messages), the AI starts losing the earlier context. Time to summarize what's been decided and start fresh with that summary as the new opening prompt.",
    ],
    drillIntro:
      "Run a discovery-first conversation on a real task. Start by asking the AI to interview you. Notice how the eventual draft is calibrated to you, not generic.",
    drillPrompt: `I need to [the task — e.g. "write a year-end performance self-review" / "plan a 3-day weekend in Portland with my partner" / "decide whether to take a job offer at a competitor"].

Before you draft anything, ask me 5 questions you'd need answered to give me a useful first version. Number the questions. Wait for my answers before drafting.`,
    drillSteps: [
      "Pick a real task that has any complexity (not \"reply to email\").",
      "Run the prompt. The AI asks you 5 questions.",
      "Answer the 5 questions honestly, one message.",
      "Now ask for the draft. Notice how calibrated it is.",
      "Use the iterate pattern (Lesson 4) to refine.",
    ],
    outcome: [
      "You ran a 7+ turn conversation on one task.",
      "The final output is meaningfully better than what a single one-shot prompt would have produced.",
      "You start defaulting to discovery on any task with more than one input variable.",
    ],
    trap:
      "Treating the discovery questions as friction. The 5 questions ARE the value. Most novice/learner answers are bad because the AI didn't get to ask first.",
    timeMinutes: 18,
    next: "documents-in-chat",
    tags: ["user", "conversation", "discovery"],
  },
  {
    slug: "documents-in-chat",
    level: "user",
    number: 8,
    title: "Documents in chat — when paste vs. upload matters",
    oneLiner:
      "AI is at its best when reading something specific. Knowing how to feed it documents is the next leverage step.",
    concept: [
      "Three ways to give AI a document: (1) copy-paste the text into chat (works for most things, fast, free-tier). (2) upload a PDF / image / file (works for longer docs, needs paid tier sometimes, preserves formatting). (3) point at a URL and let the AI fetch it (Gemini, Perplexity, Claude with web).",
      "Each has a tradeoff. Paste = control, but loses formatting and is slow for 50+ pages. Upload = preserves layout, but the AI's vision of the doc varies by tool. URL = current data, but only works on the AI tools that have web access.",
      "Long documents (50+ pages) need a strategy, not a single paste. Common pattern: split into chunks, summarize each chunk, then ask the AI to synthesize the summaries. Or use a tool with a 200k+ context window (Claude, GPT-4o, Gemini 1.5+) and upload the whole thing.",
    ],
    drillIntro:
      "Take a real document you've been avoiding (a long report, a contract, a manual). Feed it to AI two different ways and notice what changes.",
    drillPrompt: `(First, paste the document into chat — text only.)

I'm going to paste a document. Once I do:
1. Give me a 5-sentence summary.
2. List the 3 most important things a decision-maker needs to know.
3. List 2 things this document conspicuously does NOT say but should.

If the document is too long to paste, tell me and we'll switch to upload.`,
    drillSteps: [
      "Pick a real document you should have read but haven't.",
      "If under 20 pages: copy-paste into Claude or ChatGPT.",
      "If 20+ pages: use the upload button (paid tier on most tools).",
      "Run the prompt.",
      "Read the AI's answer. Then skim the document yourself for 5 minutes.",
      "Notice: how much faster you understood the doc with AI's summary as a map.",
    ],
    outcome: [
      "You used a document AI couldn't have generated on its own — you brought your real data.",
      "You feel the leverage shift: not asking AI to know things, asking AI to read with you.",
      "You have a document-summary prompt saved for future use.",
    ],
    trap:
      "Pasting confidential or sensitive documents into a free-tier AI without checking the privacy posture. Most free tiers train on your inputs. For real confidentiality, use a paid tier with zero-retention or run a local model (next lesson is on local).",
    timeMinutes: 20,
    next: "first-paid-tier",
    tags: ["user", "documents", "input"],
  },
  {
    slug: "first-paid-tier",
    level: "user",
    number: 9,
    title: "Your first paid tier — which one, when, why",
    oneLiner:
      "Free tier is enough for most humans for 30+ days. When you outgrow it, you pay for ONE tool. Not four.",
    concept: [
      "Signs you've outgrown free: you hit daily message limits regularly, you want longer context windows for documents, you want privacy guarantees (paid tiers often have zero-retention), or you want specific features (Claude Projects, ChatGPT Custom GPTs, Gemini Workspace integration).",
      "All three top paid tiers are ~$20/mo: Claude Pro, ChatGPT Plus, Gemini Advanced. Quality is roughly comparable; you'll have a preference based on the work you do.",
      "Pick ONE. Use it for 90 days. Audit again. The most expensive mistake at User level is paying $60-80/month for three tools when one would do.",
    ],
    drillIntro:
      "Decide whether you're paying, and which one. Audit your last 14 days of AI use, then make the call.",
    drillPrompt: `(This drill is on paper. The output is a decision, not a chat.)

Answer for yourself:

1. How many times did I hit a free-tier limit in the last 14 days?
   - Zero: stay free another month.
   - 1–3: stay free another month and pay closer attention.
   - 4+: consider paying for one.

2. What's the work I'm doing most?
   - Writing-heavy → Claude Pro
   - General + image generation + custom GPTs → ChatGPT Plus
   - Tied into Google Workspace / Docs / Gmail → Gemini Advanced
   - Coding-heavy → ChatGPT Plus or Claude Pro (both good)

3. What feature pushed me over?
   - Bigger context window → Claude Pro (huge window) or Gemini Advanced
   - Privacy (zero data retention) → Claude Pro (Anthropic's posture)
   - Tools / extensions / browsing → ChatGPT Plus
   - Workspace integration → Gemini Advanced

4. Am I willing to delete the other two tabs for 90 days?
   - Yes: pay.
   - No: stay free, you'll waste $20.`,
    drillSteps: [
      "Run the audit. Be honest, especially question 4.",
      "If the audit says pay: pick one. Subscribe. Delete the other browser tabs.",
      "If the audit says stay free: stay free. Set a calendar reminder for 30 days to re-audit.",
    ],
    outcome: [
      "You have either made a deliberate $20/mo decision, or you've actively chosen to stay free.",
      "You did NOT subscribe to all three.",
      "You have an audit pattern you'll run again at the next decision point.",
    ],
    trap:
      "Subscribing to multiple tools because you read a comparison article. The comparison author is not you. Your use case is what decides.",
    timeMinutes: 15,
    next: "local-ai-ollama",
    tags: ["user", "money", "decision"],
  },
  // ── LEVEL 4 · OPERATOR ──────────────────────────────────────────
  {
    slug: "local-ai-ollama",
    level: "operator",
    number: 10,
    title: "Local AI · Ollama — privacy, offline, and the limit of free",
    oneLiner:
      "At Operator level you need an honest opinion about local-only AI. Even if you don't use it daily, you should have run it once.",
    concept: [
      "Local AI = you download a model and run it on your own laptop or desktop. Nothing leaves your machine. No subscription. No phone-home. The privacy posture is total.",
      "Tradeoffs: quality is below the top cloud models (Claude / GPT / Gemini), but rapidly closing. Speed depends on your hardware. Setup is one terminal command (Ollama makes this trivial). Hardware: a modern laptop with 16+ GB RAM can run 7B–14B parameter models usefully.",
      "When to use local: confidential drafting, offline travel, journaling, anything you genuinely don't want a third party to see. When NOT to use local: complex reasoning, the latest models, large context windows.",
    ],
    drillIntro:
      "Install Ollama, download one small model, run one local chat. Even if you never use it again, you'll have an opinion.",
    drillPrompt: `(This drill is in your terminal, not in a browser. If "terminal" is new to you, read this lesson and skip the drill — come back to it at Operator level.)

1. Go to ollama.com. Download the installer for your OS.
2. Open Terminal (Mac) / PowerShell (Windows) / Terminal (Linux).
3. Run: ollama pull llama3.2:3b
4. Wait 2–5 minutes for the download (~2 GB).
5. Run: ollama run llama3.2:3b
6. You're now chatting with a local model. Type something. Press enter.
7. Try a real task you'd normally run on Claude / ChatGPT. Notice the speed, the quality gap, the privacy difference.
8. To exit: type /bye and press enter.`,
    drillSteps: [
      "Install Ollama from ollama.com.",
      "Pull llama3.2:3b (small, fast, 2GB download).",
      "Run one real task locally.",
      "Open Claude or ChatGPT in another tab. Run the same task there.",
      "Note the differences: quality, speed, privacy.",
    ],
    outcome: [
      "You have a working local AI on your machine.",
      "You have a calibrated opinion on the cloud-vs-local tradeoff for YOUR work.",
      "You have run one task that you'd never have run on cloud AI (something sensitive).",
    ],
    trap:
      "Trying to make local AI your primary tool when you don't need that level of privacy. Cloud AI is better for most tasks. Local is a tool for specific situations, not a religion.",
    timeMinutes: 30,
    next: "model-routing",
    tags: ["operator", "local", "privacy"],
  },
  {
    slug: "model-routing",
    level: "operator",
    number: 11,
    title: "Model routing — switching between Claude, GPT, Gemini mid-task",
    oneLiner:
      "Operators don't pick one AI. They route each task to the model that does it best. Knowing the strengths is the skill.",
    concept: [
      "Claude (Anthropic) is best at: longform writing, careful reasoning, code review, anything where being precise and thoughtful matters more than being fast. Long context window. Strong refusal posture (which is a feature for some tasks, a friction for others).",
      "GPT (OpenAI) is best at: general versatility, image generation (DALL-E), image input + understanding, tooling and plugins, anything where you want the broadest set of features in one app.",
      "Gemini (Google) is best at: anything tied to Google Workspace (Docs, Gmail, Calendar), live web search (it has Google), enormous context windows (1M+ tokens for Gemini 1.5+).",
      "Perplexity is best at: fact-bound research where you need source citations. Treat it as a search-with-AI tool, not a general chat.",
      "The skill isn't memorizing this. The skill is asking yourself \"which model fits THIS task\" before you pick the tab.",
    ],
    drillIntro:
      "Take three real tasks from this week. Route each to a different AI. Notice the difference.",
    drillPrompt: `(Three tasks, three AIs. Same prompt template; different windows.)

Pick three tasks you have to do this week. They should be different in nature:
1. A writing task (email, draft, summary) → Claude
2. A research / fact task → Perplexity (or GPT with web on)
3. A Google Docs / Gmail / Calendar task → Gemini

For each: run the same prompt template from Lesson 2 (context / constraint / output). Note which AI felt right for that task.`,
    drillSteps: [
      "Identify three tasks across three categories.",
      "Run each on the matching AI.",
      "Note (in your prompt library) which AI you'd use for that category next time.",
      "Don't overthink — calibration improves over months, not days.",
    ],
    outcome: [
      "You have a working routing intuition.",
      "You stop defaulting to one tool for all tasks.",
      "You feel the limit of any single tool when paired with the wrong task.",
    ],
    trap:
      "Subscribing to all three at $20/mo each because you want to route. You can route between free tiers. Pay for the ONE you use most. Use free tiers for the others.",
    timeMinutes: 25,
    next: "outgrow-the-chatbox",
    tags: ["operator", "routing", "tools"],
  },
  // ── LEVEL 5 · PILOT (the doorstep — the bridge) ─────────────────
  {
    slug: "outgrow-the-chatbox",
    level: "pilot",
    number: 12,
    title: "Outgrowing the chat box — when chat isn't the right surface anymore",
    oneLiner:
      "At Pilot level the chat box is a tool, not the system. You need persistent project memory, multi-tool routing, and receipts on disk. This is the bridge to a cockpit.",
    concept: [
      "Three signals you've outgrown chat: (1) You catch yourself re-pasting the same project background into every chat. (2) You have 4+ chats open across 2+ AI tools, each holding partial state for the same project. (3) You can't reconstruct what AI did for you last Tuesday because the chats are gone or buried.",
      "What you need next: persistent project memory (the AI remembers between sessions), multi-tool routing in one app (Claude OR GPT OR local, swap mid-session), receipts on disk (every AI action carries a paper trail), mission-graph thinking (the project IS the graph, the AI works against the graph).",
      "Options to get there: build a custom cockpit yourself (3-month project — most people who try this regret it), use a third-party cockpit (Cursor, Continue, Replit for coding-only), or use ORANGEBOX (the lab's own cockpit, $49 once, License §4A bans subscription).",
      "Whichever path you pick, the principle is the same: the chat box stops being the system. The system is your project. The chat box is a tool inside the system.",
    ],
    drillIntro:
      "Map your current AI surface honestly. Then decide whether you're at the cockpit stage or one level back.",
    drillPrompt: `(This is a self-audit on paper. The output is a decision.)

Open your AI tools right now. Count:
1. How many chats / conversations do you have open across all AI tools?
2. How many of them are about ONE project you're working on (vs. unrelated)?
3. When was the last time you re-pasted project context into a new chat?
4. If you had to reconstruct what AI did for you last Tuesday, could you?
5. Are you running 2+ AI tools in parallel for one project?

If you answered 4+ to #1, 2+ to #2, "this week" to #3, "no" to #4, OR "yes" to #5 — you're at the Pilot threshold. The chat box is no longer enough.

If those answers are mostly the other direction, stay at Operator level. The cockpit will be the right tool when you actually feel the friction. Forcing the upgrade burns money you didn't need to spend.`,
    drillSteps: [
      "Run the audit honestly.",
      "If you're at threshold: explore one cockpit option. Try ORANGEBOX free overview at /orangebox, or Cursor's free tier if you're coding-heavy.",
      "If you're not at threshold yet: save this lesson. Come back when chat starts hurting.",
    ],
    outcome: [
      "You know honestly whether you need a cockpit or you're still in chat territory.",
      "If you do need one, you know the three principles to look for (memory · routing · receipts).",
      "If you don't, you know the signal to wait for.",
    ],
    trap:
      "Buying a cockpit because the upgrade feels exciting, not because you have the pain. The pain is a real signal. The excitement is not.",
    timeMinutes: 20,
    next: "image-in-chat",
    tags: ["pilot", "cockpit", "system"],
  },
  // ── L13 · USER ───────────────────────────────────────────
  {
    slug: "image-in-chat",
    level: "user",
    number: 13,
    title: "Image-in-chat — paste the screenshot",
    oneLiner:
      "Most people describe what they see when they could just paste the screenshot. The AI reads pixels better than you can describe them. Stop typing the picture.",
    concept: [
      "The chat box accepts more than text. Drag an image in, paste from your clipboard, hit the attach button — Claude, ChatGPT, and Gemini all read images on the free tier. They see the actual pixels: the layout, the text, the error message, the chart axes, the dog's expression, the way the cabinet door is hanging crooked. When you describe a screenshot in words, you are doing a job the AI is better at than you are, and you are losing information at every step.",
      "Here is what changes when you paste instead of describe. You type 'my code is throwing an error about undefined variable' — the AI guesses at five possible causes. You paste the screenshot of the actual terminal — the AI reads the exact filename, the line number, the stack trace, the surrounding context, and tells you the one thing that is wrong. You type 'this chart looks weird' — the AI asks clarifying questions. You paste the chart — the AI says the y-axis is on a log scale and that is why your numbers look compressed. The gap between describing and showing is enormous.",
      "This works for things that are not screenshots too. A photo of a handwritten note. A picture of the back of a router. A snapshot of a recipe card in a cookbook. A picture of a plant you cannot identify. A photo of a rash before you call the doctor — the AI is not the doctor, but it can tell you whether what you are looking at warrants the urgent-care visit. A photo of the inside of your fridge before grocery shopping. A picture of the parking meter sign you cannot parse. The phone camera plus the chat box is one of the most useful tools you own and almost nobody uses it past 'look at this funny dog.'",
      "One caveat that matters. Image quality affects what the AI can read. A blurry screenshot of fine-print text will fail. A glare-covered photo of a document will fail. If the AI says 'I cannot read this clearly,' that is honest — retake the photo with better light, get closer, or screenshot the source directly instead of photographing your screen. Phone-photo-of-monitor is the worst version of this; native screenshot is the best. The fix is almost always 'get a cleaner image,' not 'try a different AI.'",
    ],
    drillIntro:
      "Pick a real thing on your screen or in front of you right now that you would normally describe to a human. We are going to skip the description entirely and let the AI read the source. Once you feel this work, you will never go back to typing the picture.",
    drillPrompt: "I'm attaching an image of [what the image shows — e.g., \"an error message in my terminal\" / \"a chart from a report I need to understand\" / \"a handwritten recipe card\" / \"the back of my router\" / \"a contract paragraph I need plain-English\"].\n\nWhat I need from you:\n1. Tell me what you actually see in the image — be specific about the text, numbers, or details that matter.\n2. [The real ask — e.g., \"Explain what's causing this error and how to fix it\" / \"Tell me what this chart is showing in plain English\" / \"Type out the recipe in a clean format I can save\" / \"Tell me which port I plug my computer into\" / \"Translate this paragraph into language a normal person understands\"].\n3. If the image is unclear or you cannot read part of it, tell me which part and what a better photo would look like.",
    drillSteps: [
      "Open Claude, ChatGPT, or Gemini in your browser or app.",
      "Pick one real thing — an error on your screen, a chart in a document, a piece of paper in front of you, the back of a device, a sign you don't understand. Don't overthink it; the first thing you thought of when reading this lesson is fine.",
      "Capture it cleanly. On a computer, use the native screenshot tool (Windows: Win+Shift+S; Mac: Cmd+Shift+4). On a phone, take the photo with good light and the subject filling the frame. Avoid photographing your own monitor.",
      "Drag the image into the chat box, or paste it from clipboard, or use the attach/paperclip button. Confirm the image preview appears before you send.",
      "Paste the drill prompt above. Fill in the two bracketed slots — what the image shows, and what you actually need.",
      "Send. Read the response. Notice how much specific detail the AI pulled from the image — text it read, numbers it parsed, layout it identified. That detail came from pixels, not from your description.",
      "Ask one follow-up that depends on the image. Example: 'Now rewrite that recipe for half the servings' or 'Now tell me which of those settings I should change first.' This proves the AI is still holding the image in the conversation.",
    ],
    outcome: [
      "The AI quoted specific text, numbers, or details from your image — not generic guesses about what it might contain.",
      "You got a useful answer faster than you would have by typing out a description of the same thing.",
      "The follow-up question worked without you having to re-explain the image — the AI was still 'looking at' it.",
      "You noticed at least one detail in the AI's response that you would not have included if you had described the image in words.",
    ],
    trap:
      "Photographing your monitor with your phone instead of taking a native screenshot. The result is a blurry, glare-covered, off-angle image where the AI can only read half the text — and then people blame the AI for being bad at images. The AI is fine. The image is bad. Win+Shift+S on Windows, Cmd+Shift+4 on Mac, screenshot button on phone for phone screens. Native capture, every time.",
    timeMinutes: 9,
    next: "voice-mode-when-speaking-beats-typing",
    tags: ["images", "screenshots", "multimodal", "user"],
  },
  // ── L14 · USER ───────────────────────────────────────────
  {
    slug: "voice-mode-when-speaking-beats-typing",
    level: "user",
    number: 14,
    title: "Voice mode — when speaking beats typing",
    oneLiner:
      "Real-time conversation with AI is a different shape than chat. Knowing when to switch modes is the actual skill.",
    concept: [
      "Voice mode is not just chat with your mouth. It is a different interface with a different best-use case. When you type, you can edit before sending, paste long documents, and stack precise constraints. When you speak, you cannot do any of that — but you get something else: speed, interruption, and the natural rhythm of thinking out loud. The trade-off is real, and people who default to one mode for everything are leaving the other half on the table.",
      "Voice wins when the bottleneck is your own thinking, not the AI's response. If you are pacing the kitchen trying to untangle a decision, or walking the dog while sketching an argument, or driving and want to draft an email by talking through it — voice keeps up with your brain in a way the keyboard cannot. You also get to interrupt. The moment the AI starts going somewhere wrong, you say 'stop, different angle' and it pivots. That interruption feels small but it changes the whole conversation shape — you steer instead of waiting for the full answer to finish before correcting.",
      "Typing wins when precision matters. Code, contracts, technical specs, anything with proper nouns or numbers or quoted text — type it. Voice transcription mishears names constantly. Voice also cannot paste a document, cannot show you exactly what was sent, and cannot be edited mid-thought. The output side has the same split: voice replies are designed to be heard, so they tend to be shorter, more conversational, and skip the bulleted lists you would get from a text response. If you need something to copy into a document, type the question.",
      "The honest mental model: voice is for thinking with the AI. Typing is for working with the AI. Thinking is open-ended, exploratory, interruption-friendly. Working is precise, structured, and benefits from being able to scroll back and edit. Most people who say 'I don't use voice mode' never gave it a fair trial on a thinking task. Most people who use voice for everything never noticed the precision they lose. The skill is recognizing which mode the current task wants.",
    ],
    drillIntro:
      "You are going to run the same prompt twice — once typed, once spoken — and notice the difference. Pick a real decision you are actually mulling over (not a hypothetical), because the contrast only shows up when you have skin in the game.",
    drillPrompt: "I'm trying to decide between [option A] and [option B] for [the actual decision — career move, purchase, project direction, whatever]. Here's what I know: [2–3 sentences of context — what's pushing each way]. What I keep getting stuck on is [the specific friction point]. Don't give me a pros and cons list. Just ask me one question that would help me see this more clearly, and we'll go from there.",
    drillSteps: [
      "Open Claude or ChatGPT in text mode. Type the prompt above with your real decision filled in. Have the conversation for 3–4 turns — answer the question it asks, follow up, push back if its next question feels off.",
      "Stop. Note the time on the clock. Notice how much you typed and how the conversation felt.",
      "Open the same app on your phone and tap the voice or microphone button (Claude: voice mode in the mobile app; ChatGPT: headphone icon or voice button; Gemini: mic icon). Speak the same opening prompt — same decision, same context.",
      "Have the same conversation by voice for 3–4 turns. When the AI starts down a path that doesn't fit, interrupt it mid-sentence and redirect. Notice that this feels rude and do it anyway — that is the feature.",
      "After the voice session, write down one sentence: which mode got you closer to a real answer on this decision, and why. Be honest — the answer is not always voice.",
    ],
    outcome: [
      "You ran the same decision through both modes and can name the specific difference in how each conversation felt.",
      "You interrupted the AI mid-response in voice mode at least once and watched it pivot cleanly.",
      "You have a personal rule forming for when you'll reach for voice — at least one concrete situation where you'd choose it over typing.",
      "You noticed at least one thing voice got wrong that typing would have caught (a misheard name, a lost detail, a meandering reply) — and you are okay with that trade-off for the right tasks.",
    ],
    trap:
      "Treating voice mode like a novelty toy — using it once to ask the weather, deciding it's gimmicky, and never trying it on a real thinking task. The whole point of this lesson is the contrast between modes on a decision that actually matters to you. If you run the drill on a fake or trivial question, both modes will feel about the same and you'll learn nothing.",
    timeMinutes: 15,
    next: "mcp-servers-plug-socket",
    tags: ["voice", "modes", "mobile", "thinking-out-loud"],
  },
  // ── L15 · OPERATOR ───────────────────────────────────────────
  {
    slug: "mcp-servers-plug-socket",
    level: "operator",
    number: 15,
    title: "MCP servers — the plug socket that turned AI into a real tool",
    oneLiner:
      "Model Context Protocol is the standard plug. Knowing what plugs in changes what your AI can actually touch — your files, your inbox, your calendar, your repos.",
    concept: [
      "Until late 2024, an AI chat was a sealed glass box. You could pour text in, read text out, paste a document, screenshot a page — but the model could not actually reach across the wall and touch anything real. It could not open the file on your desktop, read the unread email in your inbox, query the spreadsheet you keep your numbers in, or look at the actual contents of the repo you are working in. Anthropic published Model Context Protocol (MCP) in November 2024 as the standard wall socket — one protocol that lets any AI client connect to any data source or tool a developer has wired up, the same way USB lets any computer connect to any keyboard.",
      "The mental model is the wall socket plus the appliance. The AI client (Claude Desktop, Cursor, Claude Code, ChatGPT Desktop now, dozens of others) is the wall — it provides the socket. An MCP server is the appliance you plug in — a small program someone wrote that exposes one specific capability: read my Google Drive, search my Notion, execute SQL against my Postgres, control my Chrome browser, read my Gmail. Once it is plugged in, the model can call it the same way you would call a function. You ask in plain English; the model figures out which plug to use; the plug returns real data; the model writes a real response grounded in that data instead of guessing.",
      "What this changes at the operator level is the question you ask. You stop asking 'what can the AI do?' (the model is roughly the same one month to the next) and start asking 'what is plugged in?' Two operators on the same Claude subscription can have wildly different effective capabilities because one has GitHub, Filesystem, and Postgres plugged in and the other has nothing. The first operator's AI can read code from a real repo, write a real file to disk, and query a real database in one turn. The second operator's AI can only talk about code in the abstract. Same model. Different sockets.",
      "The catalog is already large. Anthropic publishes reference servers (filesystem, GitHub, Google Drive, Slack, Postgres, Puppeteer for browsers, memory, sequential thinking). The community has shipped hundreds more — Notion, Linear, Figma, Stripe, Supabase, Vercel, Spotify, Home Assistant, blender, unreal engine, your IDE. Most install in under five minutes by editing one config file. The skill at this level is not coding new servers — it is reading the catalog, recognizing which two or three plugs would multiply what you can do today, and installing them. The rest of this lesson is that exercise.",
    ],
    drillIntro:
      "You are going to use the AI itself to scout MCP servers for your actual workflow. Not theory — your real tools, your real files, your real bottlenecks. By the end you will have a shortlist of three servers to install and a written justification for each.",
    drillPrompt: "I'm an operator-level AI user and I want to extend my AI's reach using Model Context Protocol (MCP) servers. Here is my actual stack:\n\nOperating system: [Windows / Mac / Linux]\nAI client I use most: [Claude Desktop / Claude Code / Cursor / ChatGPT Desktop / other]\nTools I use daily for work: [list 5–8 real ones — e.g. Gmail, Google Drive, Notion, GitHub, VS Code, Postgres, Figma, Slack, Linear]\nThe 3 tasks I do most often that involve copy-pasting between AI chat and another app: [list them]\nWhat I'm not willing to plug in for privacy reasons: [e.g. personal banking, medical records, private journal]\n\nDo three things:\n\n1. Tell me which MCP servers exist for the tools in my stack. For each, give me: name of the server, who maintains it (Anthropic official / community / vendor), what it lets the model actually do, and any known sharp edges or auth gotchas.\n\n2. Look at my three most-frequent copy-paste tasks and tell me which two MCP servers would eliminate the most friction. Be specific about why — name the actual operation.\n\n3. Give me the exact install steps for those two servers on my operating system, including where the config file lives and what JSON I add to it. If a server requires an API key or OAuth, name the screen I have to visit to get the credential.\n\nDon't recommend servers I didn't ask about. Don't pad. If you don't know whether a server exists for one of my tools, say so plainly instead of guessing.",
    drillSteps: [
      "Pick the AI client you use most often and make sure it actually supports MCP today — Claude Desktop, Claude Code, Cursor, and several others do; older web-only ChatGPT does not. If yours does not, switch to one that does for this drill.",
      "Fill in every bracketed slot in the prompt above with real specifics. Generic answers (`I use Google stuff`) get generic recommendations. List actual product names.",
      "Paste the filled-in prompt into your AI client and read the response carefully. Cross-check the server names it gives you — open a browser and search `[server name] MCP github` to confirm the repo exists and is maintained. The AI will sometimes invent plausible-sounding servers.",
      "Pick ONE of the two recommended servers to install today. Not both. One install, all the way through, including the auth handshake.",
      "Follow the install steps. When you edit the config file (on Claude Desktop it lives at `%APPDATA%\\Claude\\claude_desktop_config.json` on Windows or `~/Library/Application Support/Claude/claude_desktop_config.json` on Mac), back up the file first by copying it. Restart the AI client fully — not just the window, the whole app.",
      "Test the new plug with a task that would have required copy-paste yesterday. If the model says it cannot reach the tool, your install did not take — check the config JSON for syntax errors and look at the client's MCP logs (Claude Desktop: Settings → Developer → MCP Log).",
      "Write down — in plain text, in your saved-prompts file from L6 — which server you installed, the date, and one sentence on what changed. This is the start of your MCP install ledger.",
    ],
    outcome: [
      "You can name what MCP is in one sentence and explain why two users on the same model can have different effective capabilities.",
      "You have a shortlist of two or three MCP servers that match your actual workflow, not generic 'top 10' recommendations.",
      "One server is installed and verified working — you watched the model read or write something real that lives outside the chat window.",
      "Your saved-prompts file has an MCP install ledger started, so future-you knows what is plugged in and when it went in.",
    ],
    trap:
      "Installing five servers in one sitting because the catalog is exciting, then discovering a week later that nothing actually works because the config JSON has a missing comma, two servers are fighting over the same port, and you cannot remember which credential goes with which plug. Install one, prove it works, write down what you did, then install the next. The boring ledger is the difference between an operator with MCP and an operator with a broken config.",
    timeMinutes: 25,
    next: "agent-mode-when-ai-takes-action",
    tags: ["mcp", "operator", "tooling", "extensibility"],
  },
  // ── L16 · OPERATOR ───────────────────────────────────────────
  {
    slug: "agent-mode-when-ai-takes-action",
    level: "operator",
    number: 16,
    title: "Agent mode — when AI takes action, not just answers",
    oneLiner:
      "The frontier of useful AI is agents that DO things — browse, click, file, send. The actual skill is the safety pattern, not the magic.",
    concept: [
      "Up to now, every lesson treated AI as a thing you talk to. You type, it types back, you copy the output somewhere it can be used. Agent mode breaks that pattern. An agent is the same underlying model — Claude, ChatGPT, Gemini — but wired to tools: a browser it can click, a filesystem it can read and write, a terminal it can run commands in, an email client it can send from. You give it a goal in plain English (\"book me a flight to Denver under $400 next Saturday\") and it takes the steps. Browsing pages. Filling forms. Submitting. Reporting back.",
      "The mental model shift is from advisor to employee. An advisor gives you a recommendation and you act on it. An employee acts on your behalf and tells you what they did. That's a different relationship and it carries different risk. An advisor that hallucinates an address wastes your time. An employee that hallucinates an address books the wrong flight on your credit card. Both are the same model under the hood. The difference is whether its mistakes touch the world.",
      "Right now in 2026, agent mode is real but uneven. ChatGPT's agent mode and Claude's computer use can both genuinely run multi-step tasks in a browser sandbox. Gemini has comparable capabilities through Project Mariner. They work best on bounded, well-defined jobs — \"find me the cheapest version of this specific product across these five retailers,\" \"summarize every PR in this repo touched in the last week,\" \"draft replies to these 12 emails and put them in my drafts folder, do not send.\" They fail in messy, ambiguous, or high-stakes territory. The skill that separates operators from people who got burned isn't picking the right agent. It's picking the right scope and the right stop-points.",
      "The safety pattern has three pieces. First — sandbox the blast radius. Read-only tasks first. Drafting before sending. Cart before checkout. Second — staged authority. Watch the first three runs of any new task type before letting it run unsupervised. Third — explicit stop conditions you write into the prompt itself: budget caps, time caps, \"stop and ask if X.\" These three together are the difference between agent mode as leverage and agent mode as a story you tell at parties about the time AI ordered $1,800 of dog food.",
    ],
    drillIntro:
      "You're going to give an agent a real task with a real stop condition baked in. Use whichever agent mode you have access to — ChatGPT agent mode, Claude with computer use, or Gemini's equivalent. Pick a research task you actually want done. The point is to feel the pattern, not the task.",
    drillPrompt: "I want you to act as a research agent on a real task. Here is the job:\n\nGOAL: Find me [specific concrete thing — e.g., \"the three cheapest currently-available 27-inch 4K monitors with USB-C 90W power delivery, in stock at US retailers\"]\n\nRULES, in order of priority:\n1. Read-only mode. Do not add anything to a cart. Do not submit any form. Do not create an account. Do not click \"buy\" or \"checkout\" or \"subscribe\" under any condition.\n2. Time budget: spend no more than [10] minutes on this task. If you have not found the answer in that time, stop and report what you did find.\n3. If you hit a paywall, captcha, login wall, or any page that asks for payment info, stop immediately and tell me which site and which step.\n4. If the answer requires me to make a judgment call (e.g., \"the cheapest\" depends on shipping or warranty), pause and ask me before continuing.\n\nREPORT FORMAT when you're done or when you stop:\n- What you found (the actual answer, with source URLs)\n- What sites you visited (full list, in order)\n- What you would have done next if I'd given you 10 more minutes\n- Anything that surprised you about the task\n\nBegin.",
    drillSteps: [
      "Pick a real research task you genuinely want the answer to. Not a test task — a real one. Filling the [bracketed slot] with something you care about is what makes the lesson stick.",
      "Paste the prompt into your agent-mode interface (ChatGPT agent mode, Claude with computer use, or Gemini agent equivalent). Hit go and DO NOT close the tab or walk away — watch it work in real time.",
      "Watch the first three actions the agent takes. Notice where it pauses, where it guesses, where it does something you would not have done. This is the most important part of the drill.",
      "When it asks you a question (it will), answer it. When it finishes or hits a stop condition, read the full report it returns.",
      "Now run the same task again, but tighten ONE rule. Drop the time budget to 5 minutes, or narrow the goal, or add a constraint. Notice how the same agent behaves differently with tighter scope.",
      "Write down (somewhere you'll see again) the one moment where you thought 'I'm glad I had rule [N] in there.' That's the safety pattern teaching you what it's for.",
    ],
    outcome: [
      "You can describe, in your own words, the difference between an advisor model and an employee model — and which one agent mode is.",
      "You have a working template for agent tasks that includes read-only scope, time budget, paywall stop, and judgment-call escalation. You can reuse this template tomorrow.",
      "You watched at least one moment where the agent would have done the wrong thing if your rules weren't there. You felt why the pattern exists, not just read about it.",
      "You can name one specific type of task you'd trust an agent to do unsupervised, and one specific type you wouldn't. Based on what you observed, not on a generic rule.",
    ],
    trap:
      "Letting it run unsupervised on the first try because the demo videos make it look magic. The first three runs are the calibration runs — that's when you learn this agent's specific failure modes, where it cuts corners, where it invents URLs, where it gets stuck. Walking away during run one is how people end up with $1,800 of dog food. Watch the first three. Then decide what's safe to leave alone.",
    timeMinutes: 20,
    next: "refusal-posture-mapping",
    tags: ["agents", "automation", "safety", "operator", "scope"],
  },
  // ── L17 · LEARNER ───────────────────────────────────────────
  {
    slug: "refusal-posture-mapping",
    level: "learner",
    number: 17,
    title: "Refusal posture — knowing what your AI won't say",
    oneLiner:
      "Every AI refuses different things in different ways. Map the refusal shape of the tool you actually use, instead of guessing or repeating internet rumors.",
    concept: [
      "Every AI assistant has a refusal posture — the set of topics and request shapes it will decline, soften, hedge, or reroute. Claude, ChatGPT, Gemini, and the open-source models all carry different postures. They overlap a lot, but the edges differ, and the edges are where you'll actually feel them. A request that Claude handles in one shot might get a long disclaimer from ChatGPT and a flat refusal from Gemini. The reverse happens too. None of those tools advertises a full list of what it won't do, and even if they did, the lists drift every few months as the companies update their training.",
      "What this means in practice: if you've only used one model and you've only asked it polite easy questions, you don't actually know its refusal posture. You've just stayed inside the safe zone without noticing the walls. Then one day you ask something legitimate — a medical detail you need for a sick parent, a legal phrasing for a small-claims letter, a security topic for a class — and the model balks. You blame yourself or you blame AI in general. Neither is right. You hit a specific refusal edge of a specific tool, and a different tool, or a different phrasing of the same request, would have gotten through.",
      "Refusals come in three flavors. Hard refusal: the model says no and won't budge no matter how you ask. These usually involve clearly harmful intent. Soft refusal: the model attaches a wall of disclaimers, hedges, or refuses one phrasing but accepts another. Most refusals you hit are soft. Reroute: the model answers a related but different question — you asked for X, it gives you Y because Y feels safer. Reroutes are the sneakiest because they look like answers. Knowing which flavor you're hitting tells you what to do next: stop, rephrase, or push back with context.",
      "The literacy move here is not learning to jailbreak anything. It's learning your tool's actual edges so you stop being surprised by them, stop blaming yourself for hitting them, and stop blaming the tool for refusals that another tool would also produce. You're building a working mental map: this tool refuses medical specifics but accepts general health framing; this tool refuses legal advice phrasing but accepts 'common practice' phrasing; this tool refuses to roleplay a real living person but will analyze their public statements. Once you have that map, your prompts get sharper and your frustration drops.",
    ],
    drillIntro:
      "You're going to deliberately probe the refusal posture of your main AI tool with five legitimate, non-harmful requests that sit near common refusal edges. The goal isn't to break anything — it's to feel where the walls actually are, in your tool, today.",
    drillPrompt: "I want to map your refusal posture so I can prompt you better. I'll ask five questions in this thread, one at a time. For each one, please answer fully if you can, or if you can't, tell me plainly: (a) that you're declining, (b) which category of concern it falls into, and (c) whether a rephrasing would help. Don't pre-disclaim — just answer or explain the refusal.\n\nHere's question 1: I'm helping [my elderly mother / a friend / myself] figure out whether [over-the-counter medication name] interacts with [other medication or condition]. What should we be aware of, and what should we ask the pharmacist?",
    drillSteps: [
      "Open a fresh chat in the AI tool you use most. Paste the drill prompt and send. Note exactly how it responds — full answer, hedged answer, refusal, or reroute.",
      "Send question 2 in the same thread: 'I'm writing a small-claims demand letter to [a contractor / a landlord / a former employer] who owes me [amount] for [reason]. Draft the letter in a firm but professional tone.' Note the response shape.",
      "Send question 3: 'I'm researching how phishing emails work for a [security class / awareness training / blog post]. Show me 3 example subject lines and opening sentences that real phishing emails use, so I can teach people what to watch for.' Note the response shape.",
      "Send question 4: 'I want to understand how [a public figure you can name — a politician, CEO, or celebrity] actually thinks about [a topic they've spoken about publicly]. Based on their public statements, walk me through their actual position.' Note whether the model engages or hedges.",
      "Send question 5: 'I'm [a small business owner / a freelancer / a tenant] and I need to know what's legally enforceable in [your state or country] for [a specific situation — late fees, NDA scope, security deposits, whatever applies to you].' Note the response shape.",
      "Look at all five responses together. For each one, label it: full answer, soft refusal with disclaimers, hard refusal, or reroute. Write down which categories your tool refuses softly versus hard. That's your refusal map.",
    ],
    outcome: [
      "You can name at least two specific topic areas where your tool refuses softly (hedges, disclaims, suggests a professional) versus where it answers cleanly.",
      "You stopped pre-apologizing in your prompts. You ask the actual question and let the tool's refusal posture do its own work.",
      "Next time you hit a refusal, you recognize the flavor — hard, soft, or reroute — and you know whether to rephrase, add context, or switch tools.",
    ],
    trap:
      "Treating the refusal map as universal. Your tool's edges today are not your tool's edges in six months, and they're not the edges of the model your friend uses. Refusal postures shift every few model updates. The drill is a habit, not a one-time mapping — re-run it on a new tool, or after a major model release, before you build serious work on top of assumptions about what it'll do.",
    timeMinutes: 15,
    next: "receipts-and-paper-trail",
    tags: ["refusal", "prompting", "tool-literacy", "model-differences"],
  },
  // ── L18 · PILOT ───────────────────────────────────────────
  {
    slug: "receipts-and-paper-trail",
    level: "pilot",
    number: 18,
    title: "Receipts and paper trail — audit your own AI use",
    oneLiner:
      "At Pilot level, what AI did for you last month becomes evidence. Knowing how to keep that evidence is the skill.",
    concept: [
      "At novice level, AI was a help. At learner level, it was a workflow. At user and operator levels, it became part of how you make things. At pilot level, something different happens: someone is going to ask you to account for it. A client wants to know what was AI and what was you. A regulator wants to see how a decision was made. A teammate inherits your project and needs to know which prompt produced which file. Future-you, six months out, needs to remember why a draft was rejected. The work has audit weight now. The chat history is not enough.",
      "A receipt, in the AI sense, is a small bundle that proves what happened: the prompt, the model that answered, the date, the output, and what you did with it. It is the difference between 'I used AI for this' (defensive, vague, unverifiable) and 'here is the input, the output, the model, the date, and the edits I made on top' (calm, complete, hard to argue with). Receipts are what convert AI-assisted work from a liability into an asset. They also do something quieter: they show you, honestly, what AI is and is not earning its keep on. Most pilots discover they were paying for two tools and only using one.",
      "The mistake at this level is treating receipts like compliance paperwork — heavy, formal, something to dread. They are not. A receipt is a sticky note with five fields. The discipline is doing it every time, not doing it elaborately. The other mistake is over-engineering: building a custom database, a tagging taxonomy, a whole second job around your first job. Don't. A dated folder with text files works. A spreadsheet works. The shape of the receipt matters more than the storage. If you can answer four questions on demand — what prompt, what model, what date, what edits — you have a paper trail. If you can't, you have a vibe.",
      "There is a second layer at pilot level: the monthly audit. Once a month, you sit with your receipts and ask three questions. What did AI actually save me time on? What did I think it helped with but didn't? Where did I edit so heavily that I should have just written it myself? This is not self-flagellation — it is portfolio management. The pilot who audits monthly compounds. The pilot who doesn't ends up paying $200/month for a tool they barely use and a tool they overuse, with no idea which is which.",
    ],
    drillIntro:
      "You're going to build a receipt for one piece of AI-assisted work from this past week, then have AI help you design a lightweight system you'll actually maintain. The point is not the template. The point is finding a shape simple enough that you'll still be doing it in November.",
    drillPrompt: "I need to build a personal audit trail for my AI use. Help me design something I'll actually maintain.\n\nHere's a recent example I want to turn into a receipt:\n- What I was working on: [describe the task — e.g., \"drafting a client proposal,\" \"summarizing a research paper,\" \"writing release notes\"]\n- Which AI tool I used: [Claude / ChatGPT / Gemini / Copilot / other]\n- Approximate date: [date]\n- What I asked it (paste prompt if you have it, or describe): [prompt or summary]\n- What it gave me back (short summary): [output summary]\n- What I did with the output: [shipped as-is / edited heavily / rewrote / threw away]\n- How much time I think it saved me (honest guess): [minutes/hours, or \"none / negative\"]\n\nDo three things for me:\n\n1. Turn the above into a clean receipt entry I could paste into a notes file. Keep it under 10 lines. Use plain text, no markdown tables.\n\n2. Propose the lightest possible system I could maintain — folder structure, file naming, or a single spreadsheet. I want something a busy person will still be doing in six months, not something elaborate. Pick ONE recommendation, not three options.\n\n3. Give me five honest questions I should ask myself at the end of each month when I look back at my receipts. The questions should help me notice if I'm overpaying for AI, underusing a tool, or editing so much that AI isn't actually helping.\n\nPush back if any of my inputs are vague. Ask me to sharpen them before you write the receipt.",
    drillSteps: [
      "Pick ONE real piece of AI-assisted work from the past seven days. Not a hypothetical. Something you actually shipped or used.",
      "Fill in every bracketed slot in the prompt with honest answers — especially the 'time it saved me' field. Resist the urge to round up.",
      "Paste it into Claude, ChatGPT, or Gemini and read all three sections of the response. Don't skim the monthly-audit questions — they're the load-bearing part.",
      "Create the storage location the AI recommended (a folder, a spreadsheet, a notes app page) and save the cleaned receipt as your first entry. Use today's date in the filename.",
      "Set a recurring monthly calendar reminder titled 'AI audit — answer the 5 questions.' Pick a date you'll actually honor — last Friday of the month works for most people.",
      "Add ONE more receipt from a different task this week, even if it feels redundant. Two entries is when the system becomes a system.",
    ],
    outcome: [
      "A storage location exists (folder, spreadsheet, or notes page) with at least two real receipt entries, each under 10 lines.",
      "A recurring monthly reminder is on your calendar with a specific date you'll honor, not a vague 'monthly.'",
      "You can answer in under 30 seconds: what AI tool produced what output, on what date, with what prompt, for which piece of work last week.",
      "You have a written list of five audit questions you'll ask yourself at month-end — not generic ones, the ones tailored to your actual usage.",
    ],
    trap:
      "Building a beautiful tagging system, a Notion database with seven properties, and a custom GPT to auto-categorize entries — then abandoning the whole thing inside three weeks because the friction is too high. The pilots who keep paper trails for years use plain text files in a dated folder. The pilots who don't are the ones who tried to make it elegant. Pick boring storage. Boring storage survives.",
    timeMinutes: 18,
    next: null,
    tags: ["audit", "receipts", "pilot", "workflow", "documentation"],
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function lessonsByLevel(level: LevelId): Lesson[] {
  return LESSONS.filter((l) => l.level === level).sort(
    (a, b) => a.number - b.number,
  );
}

export function totalCurriculumMinutes(): number {
  return LESSONS.reduce((acc, l) => acc + l.timeMinutes, 0);
}
