import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/decision-tree — which AI for which task.
 *
 * Operator directive 2026-05-31 (pizza mode): make /learn industry-best.
 *
 * This page answers the single most-asked question in AI: "should I
 * use Claude / ChatGPT / Gemini / Ollama for THIS specific task?"
 *
 * Structure: a flowchart-style decision matrix + a per-task lookup
 * with the right model AND the right prompt-shape for each.
 */

type Branch = {
  question: string;
  options: { answer: string; goto: string }[];
};

type Leaf = {
  id: string;
  task: string;
  pick: string;
  why: string;
  alt: string;
  promptShape: string;
  trap: string;
};

const LEAVES: Leaf[] = [
  {
    id: "write-long",
    task: "Long-form writing (article, blog, memo, essay, report)",
    pick: "Claude · Sonnet 4.5+",
    why: "Claude's writing voice is the most consistent across length. Long-context window holds the whole draft in working memory. Tends to ask better clarifying questions before drafting.",
    alt: "ChatGPT 5+ for shorter pieces. Gemini 2.5 Pro for research-heavy long form.",
    promptShape: "1. Paste your context + the audience + the constraint. 2. Ask for the outline first, NOT the draft. 3. Approve the outline. 4. Write the draft section by section, asking 'critique this section like a hostile editor' between sections.",
    trap: "Asking Claude to 'just write the whole thing' is how voice dies. Iterate.",
  },
  {
    id: "write-short",
    task: "Short copy (subject lines, headlines, taglines, microcopy, ad copy)",
    pick: "ChatGPT 5+ OR Claude · either works",
    why: "Both produce high-variant output fast. Ask for 12 variants across 4 registers and pick the one that fits.",
    alt: "Gemini if you want fresh angle that's slightly out-of-distribution from Claude / GPT.",
    promptShape: "Always ask for 12 variants across 4 explicit registers (e.g., plain / sharp / curious / specific). Then ask for the model's pick + reasoning. Then YOU pick.",
    trap: "Asking for 'a few options' = 3 variants of the same idea. 'Across N registers' forces real range.",
  },
  {
    id: "code-architecture",
    task: "Software architecture, system design, code review, refactoring",
    pick: "Claude · Sonnet 4.5+",
    why: "Best at long-context code reasoning. Most-likely to ask 'have you considered X edge case' instead of jumping to code. Strongest at structured critique.",
    alt: "Cursor or Codex if you need it inside your editor with file-level autonomy.",
    promptShape: "Plan FIRST. Paste target file + task. Ask: 'don't code yet. Give me 3 implementation approaches, what each breaks, the test you'd write, pick one.'",
    trap: "Letting the model code first. The plan is 80% of the win.",
  },
  {
    id: "code-quick",
    task: "Quick scripts, glue code, throwaway automation, regex, shell",
    pick: "ChatGPT 5+ · Claude works too",
    why: "Faster turnaround on small, well-scoped tasks. No need for the long-context overhead.",
    alt: "Local Ollama (DeepSeek Coder, Qwen Coder) for offline work.",
    promptShape: "Be specific about input shape + output shape + edge cases. 'Take a CSV with these columns, output JSON with this shape, handle empty values like X.'",
    trap: "Vague specs = wrong code. The 30 seconds spent specifying saves 30 minutes of re-prompting.",
  },
  {
    id: "research-academic",
    task: "Academic research, paper analysis, citation hunting",
    pick: "Claude (long context) + manual verification",
    why: "Best at multi-paper synthesis. Long context holds 20+ abstracts at once. Strong at flagging methodological issues.",
    alt: "Perplexity for initial discovery (it has real web access; Claude doesn't).",
    promptShape: "Paste abstracts/papers. Ask for synthesis, gap analysis, method critique. ALWAYS verify any citation Claude gives you against the actual paper — it hallucinates citations confidently.",
    trap: "Trusting a citation without pulling the source. Sanctions-level mistake for legal work, reputation-killer in academic work.",
  },
  {
    id: "research-current",
    task: "Current events, breaking news, real-time market signals",
    pick: "Perplexity · or ChatGPT 5+ with web search",
    why: "Perplexity grounds against the live web by default. Claude does not (it has a knowledge cutoff). ChatGPT 5+ has web search but it's slower and sometimes misses.",
    alt: "Manual search + Claude for synthesis once you have the sources.",
    promptShape: "Ask Perplexity for primary sources + dates + links. Then paste those into Claude for analysis.",
    trap: "Asking Claude 'what happened this week?' — it doesn't know. Treat Claude as analyst, Perplexity as researcher.",
  },
  {
    id: "data-analysis",
    task: "Spreadsheet analysis, CSV/Excel data, trend extraction",
    pick: "Claude (with file upload) OR ChatGPT · Advanced Data Analysis",
    why: "Claude's analytical reasoning is strong. ChatGPT's Code Interpreter actually runs Python on your data, which beats hand-waving.",
    alt: "Wolfram Alpha for math-heavy verification. Your spreadsheet's native AI for in-app work.",
    promptShape: "Always state: the data shape, the question, what you'd consider a noteworthy finding, what you'd treat as noise.",
    trap: "Letting the AI 'analyze the data' without specifying what counts as a signal. You'll get patterns that aren't real.",
  },
  {
    id: "image-gen",
    task: "Image generation, illustration, design exploration",
    pick: "Midjourney · or Google Imagen · or DALL-E (ChatGPT 5)",
    why: "Midjourney for highest visual quality. Imagen for natural-language prompt fluency. DALL-E for in-chat workflow.",
    alt: "Stable Diffusion (local) for unlimited generations and uncensored exploration.",
    promptShape: "Subject + style + composition + lighting + mood + aspect ratio. The more specific, the more controllable.",
    trap: "Using AI images on a face-driven brand. The uncanny shows up at scale and hurts the click.",
  },
  {
    id: "voice-transcription",
    task: "Audio transcription, voice cloning, voice generation",
    pick: "Whisper (OpenAI) for transcription · ElevenLabs for voice generation",
    why: "Whisper is the open-source standard for transcription accuracy. ElevenLabs is the highest-quality voice cloning.",
    alt: "Descript wraps both with an editor UI if you don't want CLI work.",
    promptShape: "For voice cloning: 1-2 minutes of clean source audio works. The 'studio' models cost more but sound noticeably better.",
    trap: "Cloning someone's voice without explicit consent. Don't. The downstream is legal and ethical exposure.",
  },
  {
    id: "private-sensitive",
    task: "Anything with NDA, PHI, PII, financial data, customer info, source code under privilege",
    pick: "Local Ollama · Llama 3.1 70B or Qwen 2.5 72B",
    why: "Runs entirely on your machine. Zero data leaves. Same model family, slightly behind frontier in quality. Worth it for the data sovereignty.",
    alt: "Your facility's vetted internal LLM (corporate Claude / Azure OpenAI / Google Vertex) if BAA / DPA in place.",
    promptShape: "Same as Claude / GPT — these models follow instructions well. Quality is 80-90% of frontier for most tasks.",
    trap: "Pasting PHI into ChatGPT.com because 'it'll be fine.' It won't be — not legally, not ethically, not when the audit happens.",
  },
  {
    id: "multimodal",
    task: "Anything with images + text (screenshot analysis, design feedback, photo Q&A)",
    pick: "Claude (vision) · or Gemini 2.5 Pro",
    why: "Claude's vision is sharp at structured analysis (UX heuristics, code from screenshot). Gemini's vision is sharp at natural-photo Q&A.",
    alt: "GPT-5 Vision works fine; ChatGPT's interface is the smoothest for multi-turn vision conversations.",
    promptShape: "Paste image + ask specific question. 'What's wrong with this design's hierarchy?' beats 'review this design.'",
    trap: "Asking AI to read a screenshot of a long document. OCR-friendly source (paste the text) gives much better results.",
  },
  {
    id: "math-proof",
    task: "Math, proofs, formal verification, symbolic computation",
    pick: "Wolfram Alpha + Claude · two-tool workflow",
    why: "AI is bad at math. Always verify symbolic / numeric work in Wolfram or Python. Use Claude for reasoning structure and Wolfram for the actual computation.",
    alt: "Lean / Coq if you're doing formal proofs. AI won't replace them.",
    promptShape: "Use Claude to structure the proof. Use Wolfram to verify each step. Don't combine.",
    trap: "Trusting AI math. Even high-tier models make arithmetic errors that pass the eye test.",
  },
  {
    id: "agent-multi-step",
    task: "Multi-step agentic work (research → analyze → draft → publish)",
    pick: "Claude (Sonnet 4.5+) with tool use",
    why: "Currently the most reliable for multi-step planning + tool use without losing the thread. Long context holds the whole task state.",
    alt: "GPT-5 with function calling is close. Use whichever has the better SDK ergonomics for your stack.",
    promptShape: "State the goal, the constraints, the tools available, the success criteria, the failure-handle. Ask for the plan first, approve, then execute.",
    trap: "Letting the agent loop without a budget. Cap iterations and tokens. Watch the receipts.",
  },
  {
    id: "translation",
    task: "Translation, localization, cross-language QA",
    pick: "DeepL for accuracy · Claude for nuance + voice",
    why: "DeepL is the highest-accuracy machine translation for European languages. Claude is better at preserving voice / register / cultural nuance.",
    alt: "GPT for less-common language pairs. Always have a native speaker review for shipped content.",
    promptShape: "Paste source + target language + the audience + the voice / register you want. 'Translate this for a 14-year-old French reader, casual register' beats 'translate to French.'",
    trap: "Auto-publishing AI-translated content. Native-speaker review is mandatory for anything customer-facing.",
  },
  {
    id: "summary-long",
    task: "Summarizing long documents, books, papers, transcripts",
    pick: "Claude (200K context)",
    why: "Long context is Claude's killer feature. Can hold an entire book and answer specific questions across it.",
    alt: "Gemini 2.5 Pro (1M context) for extreme-length material (codebases, full year of transcripts).",
    promptShape: "State what you want to extract, not 'summarize.' 'Pull the 5 strongest arguments + their counter-arguments + the page numbers' is far better than 'TL;DR.'",
    trap: "Summarize-then-decide is the wrong order. Extract-with-intent gives you usable output.",
  },
  {
    id: "brainstorm",
    task: "Brainstorming, ideation, divergent thinking",
    pick: "Any model · range > model choice here",
    why: "All frontier models brainstorm well. The variable that matters is how you prompt: ask for explicit range + a wildcard + a contrarian.",
    alt: "Use a different model for a second pass — different models converge on different defaults.",
    promptShape: "Ask for 12 ideas across 4 different angles + 1 wildcard + 1 contrarian. Then pick the one that's furthest from where YOU were already going.",
    trap: "Accepting the first 'good idea' the AI gives you. The third pass is usually the unlock.",
  },
  {
    id: "personal-coach",
    task: "Personal coaching, life-decision sounding-board, therapy-adjacent reflection",
    pick: "Claude · most appropriate trained behavior here",
    why: "Claude's tuning leans toward asking clarifying questions and not over-prescribing. Useful for thinking-out-loud.",
    alt: "ChatGPT works similarly. Avoid models tuned for entertainment / persona play for this use.",
    promptShape: "State the situation, what you've already considered, what's stopping you. Ask: 'What am I not asking myself that I should be?' or 'What's the strongest argument for the option I'm not picking?'",
    trap: "AI is not therapy. For depression, anxiety, suicidal thoughts — go to a real human professional. AI is the journal, not the therapist.",
  },
  {
    id: "everything",
    task: "I don't know what to use",
    pick: "Start with Claude. Free tier. Daily limits are generous.",
    why: "It's the strongest all-around model right now. Honest answers, decent voice, long context, sharp critique.",
    alt: "When Claude rate-limits, hop to ChatGPT. When you need real-time web, Perplexity. When you can't share the data, Ollama.",
    promptShape: "Ask Claude what model you should use for your specific task. It'll give you a straight answer.",
    trap: "Subscription stacking. You do not need to pay for 4 models. Free Claude + free ChatGPT + free Perplexity + free Ollama covers 95% of work for 95% of users.",
  },
];

export const metadata: Metadata = {
  title: "Which AI for which task · decision tree · /learn · AtomEons",
  description:
    "The honest decision tree for picking the right AI model for the task you have. Claude vs ChatGPT vs Gemini vs Perplexity vs Ollama vs Midjourney vs Whisper vs ElevenLabs vs Wolfram. 18 task categories with the recommended model, the alternative, the prompt shape, and the trap. Free. No signup. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/decision-tree" },
  openGraph: {
    title: "Which AI for which task · decision tree · /learn",
    description: "18 task categories · recommended model · prompt shape · the trap. Honest. Free. CC-BY 4.0.",
    url: "https://atomeons.com/learn/decision-tree",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Which AI for which task",
    description: "Honest decision tree. 18 task categories. Free. CC-BY 4.0.",
  },
  robots: { index: true, follow: true },
};

export default function DecisionTreePage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Decision tree
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::which AI for which task · honest decision tree
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Pick the AI
            <br />
            <span className="text-[#22F0D5]">for the task you actually have.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            {LEAVES.length} task categories. For each: the right model,
            the alternative, the exact prompt shape, the trap. Zero
            affiliate revenue from any of these tools. We name them
            because they work, not because they pay.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {LEAVES.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
              >
                {l.task.split(",")[0].split("(")[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28 space-y-8">
          {LEAVES.map((l, i) => (
            <article
              key={l.id}
              id={l.id}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-8 scroll-mt-20"
              style={{ borderLeft: `4px solid #22F0D5` }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                ::task {String(i + 1).padStart(2, "0")} of {LEAVES.length}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {l.task}
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#22F0D5]/30 bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                    ::pick this
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#F2F4F5]">
                    {l.pick}
                  </p>
                  <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">
                    {l.why}
                  </p>
                </div>
                <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
                    ::or this · the alternative
                  </p>
                  <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">
                    {l.alt}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                  ::prompt shape
                </p>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                  {l.promptShape}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/40 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                  ::the trap
                </p>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                  {l.trap}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::keep going
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Pick the AI. Now grab the playbook.
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
