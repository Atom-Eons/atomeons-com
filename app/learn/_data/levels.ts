/**
 * Five levels of AI literacy. The spine of /learn.
 *
 * The levels exist so a visiting human can locate themselves honestly
 * ("I'm a LEARNER right now") and see exactly what graduates them to
 * the next level. No certificate. No badge. Just a working description
 * of what changes.
 *
 * The cockpit-bridge level (PILOT) is where ORANGEBOX becomes useful.
 * Below that, free chat AI is the right tool. We name this honestly
 * so we don't push the cockpit to a learner who would be burning the
 * money.
 */

export type LevelId = "novice" | "learner" | "user" | "operator" | "pilot";

export type Level = {
  id: LevelId;
  number: number;
  name: string;
  oneLiner: string;
  enters: string; // what a human in this level looks like
  graduates: string; // what graduates them to the next level
  riskAtThisLevel: string; // the most common failure mode
  rightTool: string; // what to actually use at this level
  accent: string;
};

export const LEVELS: Level[] = [
  {
    id: "novice",
    number: 1,
    name: "Novice",
    oneLiner: "Day zero. Has not typed into an AI chat in any serious way.",
    enters:
      "You have either used AI under three times, or you've used it for fun but never for real work. You probably have a vague sense AI is important and a stronger sense you should have started already.",
    graduates:
      "You have run six copy-paste prompts in a free chat AI (Claude, ChatGPT, or Gemini) and seen one of them produce something genuinely useful to you. You can describe what AI is in one paragraph without using the word 'transformative.'",
    riskAtThisLevel:
      "Reading about AI more than using it. The threshold for becoming a Learner is not understanding — it is volume. Type into the chat box six times and you're done with this level.",
    rightTool:
      "Claude (claude.ai) OR ChatGPT (chatgpt.com) OR Gemini (gemini.google.com). Free tier. Pick ONE. Do not open all three.",
    accent: "#9BA5A7",
  },
  {
    id: "learner",
    number: 2,
    name: "Learner",
    oneLiner: "Has used AI 6–30 times. Sees the shape of the conversation.",
    enters:
      "You have run a handful of prompts. You've felt the moment a draft lands and saved you 20 minutes. You've also felt the moment AI confidently made something up. You know it's a tool, not magic. You're still figuring out which tasks fit it.",
    graduates:
      "You have used AI for one real task at work or in your life every weekday for two weeks. You have a single prompt you reuse. You have caught AI lying about a fact once and verified before sending.",
    riskAtThisLevel:
      "Tab-jumping between three AIs and never developing a working relationship with any of them. Pick the one you used most this week. Stay there for 30 days.",
    rightTool:
      "The same one chat AI you picked at Novice. Free tier is still enough.",
    accent: "#22F0D5",
  },
  {
    id: "user",
    number: 3,
    name: "User",
    oneLiner:
      "AI is part of your weekly rhythm. You have prompts you reuse and a working sense of when AI helps and when it doesn't.",
    enters:
      "You use AI 5–15 times a week for real things — emails, summaries, plans, drafts, research, coding help. You have 2–4 prompts you reuse without re-typing. You know one task AI gets wrong and you have a sanity-check for it. You have explained AI to one other human without sounding like an article.",
    graduates:
      "You have run a multi-turn conversation where each turn built on the prior one. You have given AI a document and gotten back something more useful than the document. You have hit the free-tier limit on a productive day and felt the limit close in.",
    riskAtThisLevel:
      "Paying for four AI tools at $20/mo each because you read a comparison article. Pay for one. The one you actually used most. Audit again in 90 days.",
    rightTool:
      "Pay for ONE of: Claude Pro, ChatGPT Plus, Gemini Advanced. ~$20/mo. The one that matches your work. Add Perplexity (free tier) for fact-bound searches.",
    accent: "#22F0D5",
  },
  {
    id: "operator",
    number: 4,
    name: "Operator",
    oneLiner:
      "You run real work through AI daily. Multiple tools, multiple models, saved prompt library, honest mental model of the limits.",
    enters:
      "AI is in your daily working set. You have a saved library of 10+ prompts. You know when to switch from Claude to GPT to Gemini and back. You have used AI to draft something a real human paid for or a real boss read. You have a list of two things AI cannot do for your work and you keep doing them yourself.",
    graduates:
      "You are running more than one project through AI at the same time, and the context-switching between projects is starting to cost you. You catch yourself re-pasting the same project background into chat. You have explored at least one local model (Ollama) and have an opinion. You are starting to feel the limit of the chat box itself, not the AI inside it.",
    riskAtThisLevel:
      "Building a custom cockpit yourself instead of using one. Many Operators code their own scratch cockpit and burn three months. The cockpit is a tool, not the lesson.",
    rightTool:
      "The chat AI you pay for + a second one as backup + Perplexity. Start exploring Claude Code (CLI) or Cursor if you're technical. Try Ollama with one local model so you have an opinion about offline.",
    accent: "#FF7A1A",
  },
  {
    id: "pilot",
    number: 5,
    name: "Pilot",
    oneLiner:
      "Runs multiple projects through AI from one cockpit. Mission graphs. Receipts. Multi-model routing. The chat box is a tool inside a system, not the system itself.",
    enters:
      "You have outgrown the chat box. You need: project memory that survives context resets, swap-lane routing between models, a paper-trail of receipts on disk, and a way to pair one operator (you) with many simultaneous AI agents on real work. You can describe one workflow you'd run through a cockpit instead of chat.",
    graduates:
      "There is no Level 6 in this curriculum. At Pilot you are operating, not learning. The next move is not another lesson — it is doing the work, shipping it, and feeding the result back into the lab. (At this level, /research and /founders-view become collaborators, not destinations.)",
    riskAtThisLevel:
      "Forgetting that the Pilot tools are leverage on judgment, not substitute for judgment. The 35 years of experience the Operator brought IS the moat. The cockpit just multiplies it.",
    rightTool:
      "ORANGEBOX Command v6.3 (atomeons.com/orangebox) — the lab's own cockpit, $49 once, License §4A bans subscription. Or any equivalent cockpit you build for yourself. The principle is what matters: receipts, mission graph, multi-model routing.",
    accent: "#FFB87A",
  },
];

export function getLevel(id: LevelId): Level {
  const found = LEVELS.find((l) => l.id === id);
  if (!found) throw new Error(`Unknown level id: ${id}`);
  return found;
}
