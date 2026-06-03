import type { Metadata } from "next";
import Link from "next/link";

const SYNTHESES = [
  {
    "slug": "context-windows-minimum-effective-dose",
    "topic": "Context windows",
    "minimumEffectiveDose": "A context window is the model's working memory for one turn — every token of system prompt, conversation history, attached files, tool outputs, and the response itself competes for the same fixed budget. When you hit the"
  },
  {
    "slug": "tokens-and-api-costs-minimum-effective-dose",
    "topic": "Tokens & API costs",
    "minimumEffectiveDose": "Tokens are the unit of payment. They are NOT words, NOT characters — they're subword chunks produced by the model's tokenizer (BPE for GPT/Claude, SentencePiece for Gemini variants). English averages ~4 chars per token, "
  },
  {
    "slug": "prompt-engineering-the-eighty-twenty",
    "topic": "Prompt engineering core (the 80/20)",
    "minimumEffectiveDose": "Strip every 'prompt engineering' course down and what's left is six moves that produce 80% of the gain. (1) Specify the role only when it actually changes behavior — 'you are an expert' is mostly noise on modern models; "
  },
  {
    "slug": "multi-llm-routing-in-practice",
    "topic": "Multi-LLM routing in practice",
    "minimumEffectiveDose": "Multi-LLM routing is the practice of sending different tasks to different models — Claude for long-context and writing, GPT for general reasoning and tools, Gemini for cheap bulk and vision, local models for private and "
  },
  {
    "slug": "local-models-ollama-setup-med",
    "topic": "Local models (Ollama setup MED)",
    "minimumEffectiveDose": "Local models run on your own hardware — no API calls, no per-token bill, no data leaving the machine. Ollama is the easiest entry point: one installer, one command to pull a model, OpenAI-compatible API on localhost:1143"
  },
  {
    "slug": "rag-vs-long-context-when-to-use-which",
    "topic": "RAG vs long-context · when to use which",
    "minimumEffectiveDose": "RAG (Retrieval-Augmented Generation) and long-context are two solutions to the same problem: getting external knowledge into a model's working memory. They have different tradeoffs, and the operator decision is mostly em"
  },
  {
    "slug": "agents-the-trapdoor",
    "topic": "Agents · the trapdoor",
    "minimumEffectiveDose": "An agent is an LLM in a loop with tools. The loop: model proposes an action (call a tool, write a file, hit an API), system executes it, result feeds back into the next prompt, repeat until the model says done or a max-s"
  },
  {
    "slug": "embeddings-semantic-search-med",
    "topic": "Embeddings (semantic search MED)",
    "minimumEffectiveDose": "An embedding is a vector — a list of typically 384 to 3,072 floating-point numbers — that represents the semantic meaning of a piece of text. Two texts about similar concepts have vectors that point in similar directions"
  },
  {
    "slug": "voice-cloning-ethics-and-practical",
    "topic": "Voice cloning ethics + practical",
    "minimumEffectiveDose": "Voice cloning is now a 30-second technology — capture 30 seconds of clean audio of someone's voice, paste it into ElevenLabs, Resemble, Play.ht, or a local model like XTTS or F5-TTS, generate arbitrary speech in that voi"
  },
  {
    "slug": "vision-models-when-they-help-vs-distract",
    "topic": "Vision models (when they help vs distract)",
    "minimumEffectiveDose": "Vision models — Claude with vision, GPT-4o, Gemini multimodal — can accept images as input and reason about their contents. The capability is real: OCR (especially handwritten and structured documents), chart interpretat"
  },
  {
    "slug": "fine-tuning-when-its-worth-it",
    "topic": "Fine-tuning (when it's worth it · almost never for individuals)",
    "minimumEffectiveDose": "Fine-tuning is training a base model on your specific data to bias its outputs toward your domain, style, or task. It's the most over-recommended and under-justified technique in practical AI. The honest reality: for 95%"
  },
  {
    "slug": "ai-safety-for-practitioners",
    "topic": "AI safety for practitioners (the day-to-day)",
    "minimumEffectiveDose": "Day-to-day AI safety is not the existential-risk debate; it's the practical operating discipline that prevents you from causing real harm with the LLM systems you're shipping right now. The MED has seven layers, in prior"
  },
  {
    "slug": "speed-of-iteration-operator-advantage",
    "topic": "Speed of iteration (the operator advantage)",
    "minimumEffectiveDose": "Speed of iteration is the single biggest competitive advantage solo operators and small teams have over large organizations using AI right now. The dynamic: large orgs have approval chains, procurement cycles, security r"
  },
  {
    "slug": "ai-economics-household-level-reality",
    "topic": "AI economics (the household-level reality)",
    "minimumEffectiveDose": "AI economics at the household level — what does a person, family, or solo operator actually spend, save, and earn from AI in a normal month — is genuinely different from the enterprise discourse and rarely discussed hone"
  }
] as const;

export const metadata: Metadata = {
  title: "AI · Tim-Ferriss-style synthesis · /learn · AtomEons",
  description: `${SYNTHESES.length} ruthless minimum-effective-dose distillations of core AI concepts. DiSSS framework · fear-setting · 80/20 cut · tribe of mentors. The 5-minute version of each AI topic you'd otherwise spend a weekend on. CC-BY 4.0.`,
  alternates: { canonical: "https://atomeons.com/learn/synthesis" },
};

export default function SynthesisIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Synthesis
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::Tim-Ferriss-style AI synthesis · {SYNTHESES.length} distillations
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            The 5-minute version{" "}
            <span className="text-[#22F0D5]">of each AI topic.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Minimum Effective Dose. Fear-setting. DiSSS framework. 80/20
            cut. Tribe of Mentors. Each topic distilled to the smallest
            unit that still moves the operator forward. Ruthless on
            purpose.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 space-y-3">
          {SYNTHESES.map((s, i) => (
            <Link key={s.slug} href={`/learn/synthesis/${s.slug}`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">{s.topic}</h2>
              <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">{s.minimumEffectiveDose}…</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
