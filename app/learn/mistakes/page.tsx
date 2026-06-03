import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/mistakes — top AI mistakes catalog.
 *
 * Operator directive 2026-05-31 (pizza mode).
 * 30 named AI mistakes with: the mistake, the symptom, the fix.
 * Calibrated to 2026, not 2023.
 */

type Mistake = {
  n: string;
  category: "prompt" | "trust" | "safety" | "skill" | "economy";
  title: string;
  symptom: string;
  fix: string;
};

const MISTAKES: Mistake[] = [
  // PROMPT
  { n: "01", category: "prompt", title: "Asking 'help me with X' instead of stating the task", symptom: "Vague, generic output that you have to re-prompt three times to make useful.", fix: "Use the 7-part prompt: Role · Context · Input · Task · Shape · Audience · Voice. State each one explicitly." },
  { n: "02", category: "prompt", title: "Letting the AI write before it plans", symptom: "First draft is wrong-shaped. You waste tokens correcting structure when you should have caught it at outline.", fix: "'Don't write yet. Outline first. I'll approve, then you write.' This single move saves more time than any other prompt habit." },
  { n: "03", category: "prompt", title: "Asking for 'a few options'", symptom: "Three variants of the same idea. The 'options' are all the same shape.", fix: "Ask for 12 variants across 4 explicit registers. The constraint forces real range." },
  { n: "04", category: "prompt", title: "Accepting the AI's first idea", symptom: "Average-quality output that you ship because it's there.", fix: "Pass 2 and 3 are where the unlock happens. 'Now give me a contrarian version' and 'now the version that would surprise the smartest person in the room.'" },
  { n: "05", category: "prompt", title: "Not giving the AI a role", symptom: "Generic, defensive, on-the-fence answers.", fix: "'You are a senior X who has done this 100 times.' Roles unlock specificity." },
  { n: "06", category: "prompt", title: "Skipping the audience", symptom: "Output is the wrong register for who reads it.", fix: "State the audience explicitly. 'A skeptical board.' 'A 12-year-old who has never seen this.' 'A grad student in this specific field.'" },
  { n: "07", category: "prompt", title: "No 'be direct' instruction", symptom: "Diplomatic, hedged, soft output. AI defaults to flattery.", fix: "'Be direct. Skip the diplomatic version. Tell me what would embarrass me at [peer audience].'" },
  { n: "08", category: "prompt", title: "Pasting the whole codebase / book / dataset", symptom: "AI focuses on irrelevant parts. Token cost balloons. Reasoning quality drops.", fix: "Paste only what's needed for the specific task. If you need long-context analysis, use the model built for it (Claude 200K, Gemini 1M)." },
  { n: "09", category: "prompt", title: "Not asking 'what am I missing'", symptom: "You walk away with the answer to the question you knew to ask. You miss the question you didn't.", fix: "Always end with 'what should I have asked that I didn't?' or 'what's the question this conversation is dodging?'" },

  // TRUST
  { n: "10", category: "trust", title: "Trusting a citation without pulling the source", symptom: "AI hallucinates a paper that doesn't exist, or paraphrases an existing paper incorrectly.", fix: "Pull every citation manually. Google Scholar. PubMed. Westlaw. Whatever the authority is for your domain. AI is the researcher; the source is the truth." },
  { n: "11", category: "trust", title: "Believing AI math without verification", symptom: "Arithmetic errors in numeric output that pass the eye test. Decisions made on bad math.", fix: "Verify in Wolfram, Python, or a textbook. Every number that matters. AI is bad at math; this is real, not a 2023 leftover." },
  { n: "12", category: "trust", title: "Treating AI as a doctor / lawyer / financial advisor", symptom: "Acting on advice that's structurally wrong because it was tuned to be helpful, not licensed.", fix: "AI is the patient-advocate friend, not the doctor. Use it to prep questions for the real professional. The professional gets the call." },
  { n: "13", category: "trust", title: "Auto-publishing AI-generated content", symptom: "Voice dies. Audience notices. Trust never recovers.", fix: "AI is the draft. You ship the draft after a human pass. Always. Especially in voice-driven channels (newsletters, social, YouTube)." },
  { n: "14", category: "trust", title: "Not noticing the AI is sycophantic", symptom: "Every idea you bring gets validated. You stop being challenged.", fix: "Force the steelman. 'Now argue against this from the perspective of someone who would lose money if it works.'" },
  { n: "15", category: "trust", title: "Mistaking confident tone for correctness", symptom: "AI's most-wrong outputs are often its most-confident.", fix: "Confidence is a stylistic feature of the output, not evidence of accuracy. Always verify when the cost of being wrong is real." },

  // SAFETY
  { n: "16", category: "safety", title: "Pasting PII / PHI / financial data into cloud AI", symptom: "Patient data, customer SSNs, internal financials sitting on a vendor's servers you can't audit.", fix: "Use local Ollama for sensitive work. Or your facility's vetted BAA-covered internal LLM. NEVER ChatGPT.com / Claude.ai for protected data." },
  { n: "17", category: "safety", title: "Pasting passwords, API keys, recovery codes", symptom: "Credentials leak. Even 'private' chats are subject to subpoena, breach, vendor employee access.", fix: "Treat every cloud AI conversation as if a stranger might read it tomorrow. Because they might." },
  { n: "18", category: "safety", title: "Auto-clicking 'Run' on AI-suggested terminal commands", symptom: "Rm -rf, force-push, prod-DB-truncate. The model didn't mean to. You ran it anyway.", fix: "Read every command. Especially the destructive ones. Especially when you're tired. The AI doesn't carry the consequences." },
  { n: "19", category: "safety", title: "Letting kids use cloud AI without supervision", symptom: "Inappropriate content surfaced. Personal info shared. AI-companionship-for-isolation patterns.", fix: "Age-appropriate conversation about what AI is and isn't. Adult co-using for under ~14. Talk about what to never share." },
  { n: "20", category: "safety", title: "Treating AI as a therapist", symptom: "AI gives you scripts and frameworks. Real distress doesn't move. Sometimes worsens.", fix: "Real therapy is real human contact, calibration, accountability. AI is the journal between sessions, not the therapist." },

  // SKILL
  { n: "21", category: "skill", title: "Reading about AI instead of using it", symptom: "Lots of opinions. Zero actual prompts run. The skill never compounds.", fix: "Type into the chat box. Six times. Today. The skill is in the repetition, not the reading." },
  { n: "22", category: "skill", title: "One-shotting tasks that should be multi-turn", symptom: "Result is close-but-wrong. You give up instead of iterating.", fix: "Most real work is 3-5 turns. Start with outline. Then draft. Then critique. Then rewrite. Then ship." },
  { n: "23", category: "skill", title: "Not building a Skill Primer library", symptom: "Every new AI session starts from scratch. You re-teach the AI your context every time.", fix: "Save your best prompts as reusable files. Load them at the start of every session. Over weeks, this is the single highest-leverage skill." },
  { n: "24", category: "skill", title: "Sticking with one model for everything", symptom: "You miss what other models are good at. You hit one model's blind spots repeatedly.", fix: "Different models for different tasks. Use the decision tree. Cross-check important work in two models." },
  { n: "25", category: "skill", title: "Not learning the keyboard shortcuts", symptom: "You're slower than the AI is fast. The friction kills the habit.", fix: "Set up the AI in your text editor / OS / phone with shortcut keys. The friction-to-prompt should be under 2 seconds." },

  // ECONOMY
  { n: "26", category: "economy", title: "Subscription stacking", symptom: "ChatGPT + Claude + Cursor + Perplexity = $80+/month. You use 2 of them seriously.", fix: "Pick one paid subscription (probably Claude OR ChatGPT). Use the free tier of everything else. BYOK API for power-users only." },
  { n: "27", category: "economy", title: "Paying for AI features your platform gives you free", symptom: "Notion AI, Google Gemini-in-Workspace, GitHub Copilot... paying for what your existing tools already include.", fix: "Audit your subscriptions. Many give you AI for free now. Pay only for what you'd notice missing." },
  { n: "28", category: "economy", title: "Burning tokens on a free model when local would do", symptom: "Daily-cap hit. Frustration. You start paying for something you didn't need to.", fix: "Local Ollama (free, your hardware) handles 80% of daily-use cases. Reserve cloud calls for the work that genuinely needs frontier quality." },
  { n: "29", category: "economy", title: "Treating AI as a substitute for hiring", symptom: "You stop hiring because 'AI can do it.' Then the work hits a quality ceiling you can't break through.", fix: "AI is leverage, not replacement. The human who works WITH AI is the strongest configuration. Don't fire the human; arm them." },
  { n: "30", category: "economy", title: "Outsourcing strategy to AI", symptom: "Your roadmap, your pricing, your positioning, all come from AI conversations. You become a feed-forward network with no taste.", fix: "AI is the thinking-partner, not the strategy oracle. The decisions that distinguish your business are the ones you make. AI critiques, you decide." },
];

const CATEGORIES = {
  prompt: { color: "#22F0D5", label: "Prompt mistakes" },
  trust: { color: "#FFB87A", label: "Trust mistakes" },
  safety: { color: "#22F0D5", label: "Safety mistakes" },
  skill: { color: "#22F0D5", label: "Skill mistakes" },
  economy: { color: "#FFB87A", label: "Economy mistakes" },
} as const;

export const metadata: Metadata = {
  title: "30 AI mistakes · top common errors · /learn · AtomEons",
  description:
    "30 catalogued AI mistakes — the prompt mistakes, the trust mistakes, the safety mistakes, the skill mistakes, the economy mistakes. For each: the mistake, the symptom you'll notice, the fix. Calibrated to 2026 AI tools (Claude, ChatGPT, Gemini, Perplexity, Ollama). Free. No signup. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/mistakes" },
  openGraph: {
    title: "30 AI mistakes · the catalog",
    description: "Top 30 mistakes humans make with AI. The mistake · the symptom · the fix. Free. CC-BY 4.0.",
    url: "https://atomeons.com/learn/mistakes",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "30 AI mistakes · the catalog",
    description: "Top 30 AI mistakes. Free. CC-BY 4.0.",
  },
  robots: { index: true, follow: true },
};

export default function MistakesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Mistakes
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::30 AI mistakes · the catalog · honest list
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            What to NOT do
            <br />
            <span className="text-[#FFB87A]">when you use AI.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Five categories. 30 mistakes. For each: the mistake, the
            symptom you&apos;ll notice if you&apos;re making it, the fix.
            Calibrated to 2026 — the models are better, but the human
            mistakes are mostly the same.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28 space-y-12">
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((cat) => {
            const meta = CATEGORIES[cat];
            const list = MISTAKES.filter((m) => m.category === cat);
            return (
              <div key={cat}>
                <h2
                  className="text-3xl font-semibold tracking-tight md:text-4xl"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </h2>
                <div className="mt-6 space-y-4">
                  {list.map((m) => (
                    <article
                      key={m.n}
                      className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className="font-mono text-2xl font-bold tabular-nums"
                          style={{ color: meta.color }}
                        >
                          {m.n}
                        </span>
                        <h3 className="text-xl font-medium leading-snug text-[#F2F4F5] md:text-2xl">
                          {m.title}
                        </h3>
                      </div>
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: meta.color }}>
                            ::symptom
                          </p>
                          <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">
                            {m.symptom}
                          </p>
                        </div>
                        <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                            ::fix
                          </p>
                          <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">
                            {m.fix}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::keep going
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Now build the habits the other way.
          </h2>
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
