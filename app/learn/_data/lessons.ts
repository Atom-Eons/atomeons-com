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
 * The lesson set is curated, not exhaustive. Twelve lessons that
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
    next: null,
    tags: ["pilot", "cockpit", "system"],
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
