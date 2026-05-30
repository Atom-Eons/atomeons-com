/**
 * The plain-English AI glossary.
 *
 * Originally lived inline in /start/page.tsx as the 20-term GLOSSARY
 * constant. Promoted to a shared data file so /glossary can render it
 * as a standalone discoverable surface, AI search engines can ingest
 * it via the JSON-LD on /glossary, and future surfaces can pull terms
 * by slug.
 *
 * Voice: plain English. One-line definition that doesn't talk down.
 * No "transformative," "synergy," "revolutionary." A 14-year-old should
 * understand every entry. A 60-year-old should not feel condescended to.
 *
 * License: CC-BY 4.0. Quote any term. Translate any. Adapt any.
 */

export type GlossaryEntry = {
  term: string;
  short: string; // one phrase / 1-5 words
  body: string; // one sentence definition
  slug: string; // url-safe id (for anchor links)
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const RAW: Omit<GlossaryEntry, "slug">[] = [
  {
    term: "LLM",
    short: "Large Language Model",
    body: "The engine behind ChatGPT, Claude, and Gemini. A program trained to predict the next word from everything it ever read.",
  },
  {
    term: "Prompt",
    short: "what you type",
    body: "The instruction you give the AI. Better prompts = better answers. There is no magic syntax — just be specific.",
  },
  {
    term: "Hallucination",
    short: "confident fiction",
    body: "When the AI invents a fact, citation, or quote that sounds correct but isn't. Verify anything that could matter.",
  },
  {
    term: "Token",
    short: "roughly a word-piece",
    body: "How AI bills you and how it measures memory. ~750 words ≈ 1,000 tokens. Names and code take more tokens than plain English.",
  },
  {
    term: "Context window",
    short: "how much it can hold",
    body: "How much text the AI can read at once. A short conversation: 4K tokens. A whole book: 200K+. Bigger window = more it can keep straight.",
  },
  {
    term: "Agent",
    short: "AI that takes action",
    body: "AI that doesn't just answer — it does things. Books a flight. Sends an email. Runs a script. Always keep a human approval step.",
  },
  {
    term: "MCP",
    short: "Model Context Protocol",
    body: "The plug socket that lets AI safely use external tools — your calendar, your files, your email. Open standard, growing fast.",
  },
  {
    term: "RAG",
    short: "Retrieval-Augmented Generation",
    body: "AI reads from a specific knowledge base (your docs, a wiki, a database) before answering. Better than guessing for fact-heavy work.",
  },
  {
    term: "Fine-tuning",
    short: "training on your data",
    body: "Teaching a model your specific style, tone, or domain by feeding it examples. Expensive. Usually unnecessary for individuals.",
  },
  {
    term: "Multimodal",
    short: "more than text",
    body: "AI that handles images, audio, and video — not just text. Modern Claude, GPT-4, and Gemini are all multimodal.",
  },
  {
    term: "Embedding",
    short: "words → numbers",
    body: "Turning text into a list of numbers so the AI can do math on meaning. Powers search, recommendation, and clustering.",
  },
  {
    term: "Inference",
    short: "when AI runs",
    body: "The act of using the model to produce an output. As opposed to training, which is the months-long process of making the model.",
  },
  {
    term: "Open-source",
    short: "code anyone can see",
    body: "Models like Llama, Mistral, and Qwen. You can download and run them. Privacy win. Setup curve.",
  },
  {
    term: "Closed-source",
    short: "proprietary",
    body: "Models like GPT-4, Claude, and Gemini. Hosted by the company. Best quality today. You can't see the weights.",
  },
  {
    term: "On-device",
    short: "runs on your phone",
    body: "AI that runs without the internet. Smaller, faster, private. Apple Intelligence and on-device Gemini are examples.",
  },
  {
    term: "GPU",
    short: "the AI chip",
    body: "Graphics Processing Unit. The chip that makes AI fast. NVIDIA makes most of them. Why their stock went vertical.",
  },
  {
    term: "Model",
    short: "the AI itself",
    body: "The actual brain. GPT-4, Claude Sonnet, Llama 3, Gemini 2.5 — each is a distinct model with its own personality and price.",
  },
  {
    term: "System prompt",
    short: "hidden instructions",
    body: "The instructions the company set behind the scenes — be helpful, be safe, sound like this. Shapes everything you see.",
  },
  {
    term: "Jailbreak",
    short: "breaking the rules",
    body: "Trying to get the AI to ignore its safety rules with clever prompts. Companies patch these constantly. Don't do it on real systems.",
  },
  {
    term: "AGI",
    short: "Artificial General Intelligence",
    body: "Hypothetical AI as smart as a human across every domain. Doesn't exist yet. Debated whether it ever will. Hype magnet.",
  },
  {
    term: "Chain-of-thought",
    short: "show your work",
    body: "Asking the AI to reason step-by-step before answering. Three words ('think step by step') often catches errors a one-shot prompt would miss.",
  },
  {
    term: "Few-shot",
    short: "teach by example",
    body: "Giving the AI 2-5 worked examples of what you want, then asking for output #6 on your real input. Examples beat instructions for pattern tasks.",
  },
  {
    term: "RLHF",
    short: "Reinforcement Learning from Human Feedback",
    body: "How most chat AIs are tuned after training — humans rate which responses are better, the model learns to prefer those. Why ChatGPT feels polite.",
  },
  {
    term: "Temperature",
    short: "creativity dial",
    body: "A setting (0 to 1+) that controls how random the AI's answer is. Low = predictable, factual. High = creative, weird. Most chat AIs hide this from you.",
  },
  {
    term: "API key",
    short: "your password to the AI",
    body: "A long secret string that lets your code use the AI directly without going through the website. Treat it like a credit card — leaked keys can rack up bills.",
  },
  {
    term: "Quantization",
    short: "smaller, faster, slightly worse",
    body: "Compressing a model so it runs on smaller hardware. A quantized model loses some quality but might run on your laptop instead of needing a cloud GPU.",
  },
  {
    term: "Vibe coding",
    short: "building by description",
    body: "Telling an AI what you want and letting it write the code. Coined by Karpathy in 2025. Real, but the AI's mistakes become your mistakes — verify before shipping.",
  },
];

export const GLOSSARY: GlossaryEntry[] = RAW.map((e) => ({
  ...e,
  slug: slugify(e.term),
}));

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((e) => e.slug === slug);
}
