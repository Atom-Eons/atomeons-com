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
    term: "Reasoning model",
    short: "thinks before it answers",
    body:
      "An AI that works through a problem step by step before replying, instead of answering on instinct. Worth the extra wait on math, code, planning, and anything where a wrong answer costs you.",
  },
  {
    term: "Context engineering",
    short: "shaping what the model sees",
    body:
      "The craft of choosing what to put in front of the AI before it answers: instructions, examples, files, prior turns, tool results. Matters because the same model gives wildly different answers depending on what context it has to work with.",
  },
  {
    term: "Vibe coding",
    short: "writing software by talking",
    body:
      "Building software by describing what you want in plain English and letting the AI write the code. Useful for prototypes and small tools; risky when you ship code you can't read or debug yourself.",
  },
  {
    term: "AI agent",
    short: "AI that does, not just answers",
    body:
      "An AI that takes actions on your behalf — sending emails, booking flights, editing files, running code — instead of just answering questions. It matters when you want work done, not advice; check what it's allowed to touch before you turn it loose.",
  },
  {
    term: "Tool use",
    short: "when AI reaches outside itself",
    body:
      "When the AI calls external systems instead of guessing — searching the web, reading a file, running code, sending an email. Matters because a model with tool use can act on the real world, not just talk about it.",
  },
  {
    term: "Function calling",
    short: "AI hands you a form",
    body:
      "When the AI asks to run a real tool (send an email, query a database, charge a card) by filling in a structured request the app can execute. The point where chat becomes action.",
  },
  {
    term: "Hallucination rate",
    short: "how often it makes things up",
    body:
      "The share of answers from a given AI model that contain invented facts, citations, or quotes. Lower is better; check it before trusting a model for anything where being wrong has a cost.",
  },
  {
    term: "Latency",
    short: "wait time before reply",
    body:
      "The delay between hitting send and the AI starting to answer. Matters when you're chaining tools, building voice apps, or just trying to keep a chat from feeling sluggish.",
  },
  {
    term: "Token cost",
    short: "what each AI call charges",
    body:
      "The price you pay per call, billed by tokens in and tokens out. Long prompts and long answers both add up, so check the per-million-token rate before you run anything at scale.",
  },
  {
    term: "Distillation",
    short: "big model teaches small model",
    body:
      "Training a small, cheap AI to mimic a big, expensive one so it runs faster on your phone or laptop. Most \"tiny\" models you can run locally are distilled from a giant parent.",
  },
  {
    term: "Mixture of experts (MoE)",
    short: "many sub-models, one front door",
    body:
      "A model design where many smaller specialist sub-models sit behind one entry point, and a router picks which few to use for each request. It matters because it makes giant models cheaper and faster to run without shrinking what they know.",
  },
  {
    term: "Prompt injection",
    short: "hijacking the AI's instructions",
    body:
      "When a hidden instruction inside a webpage, email, or file tricks an AI into ignoring its real orders and following the attacker's instead. Matters anytime your AI reads outside content it didn't write itself.",
  },
  {
    term: "Reinforcement learning from human feedback (RLHF)",
    short: "teaching the AI manners",
    body:
      "The training step where humans rank the AI's answers and the model learns to prefer the ones people liked. It is why modern chatbots sound polite and helpful instead of just predicting raw text from the internet.",
  },
  {
    term: "Sycophancy",
    short: "AI agreeing to please you",
    body:
      "When the AI tells you what you want to hear instead of what's true, because training rewarded it for being liked. Push back, ask for the counter-case, or it'll happily validate a bad plan.",
  },
  {
    term: "Foundation model",
    short: "the big base AI",
    body: "A large model trained once on enormous data, then adapted for many uses. GPT-5, Claude Opus, Llama 4 — all foundation models. Most products you use are built on top of one.",
  },
  {
    term: "Transformer",
    short: "the AI architecture",
    body: "The neural-network design behind every major chat AI since 2018. Invented at Google. Named after the way it 'transforms' input into output through layers of attention.",
  },
  {
    term: "Attention",
    short: "how the AI focuses",
    body: "The mechanism that lets a transformer decide which earlier words to weight when generating the next one. Why AI can keep a long thought coherent — and why it gets expensive with long inputs.",
  },
  {
    term: "Diffusion model",
    short: "image generation engine",
    body: "How Midjourney, DALL-E, and Stable Diffusion make images: start with noise, denoise it step by step toward what you asked for. Different mechanism than the chat AIs, same era.",
  },
  {
    term: "Parameter count",
    short: "the 7B, 70B, 405B numbers",
    body: "How many weights the model has. Bigger usually = smarter but slower and more expensive. A 7B model runs on a laptop. A 70B model needs a serious GPU. A 405B model needs a cluster.",
  },
  {
    term: "Pre-training",
    short: "the long, expensive phase",
    body: "The months-long process of feeding an AI most of the internet so it learns language. Costs millions of dollars in GPUs. Happens once per model release; everything after is cheaper.",
  },
  {
    term: "Synthetic data",
    short: "AI-generated training data",
    body: "Data created by an AI to train another AI. Cheaper than human-labeled data. Works for some tasks, dangerous for others — if the synthetic data is wrong, the trained model inherits the wrongness.",
  },
  {
    term: "Benchmark",
    short: "a test the AI sits for",
    body: "A standardized test like GPQA, SWE-Bench, or MMLU that scores how well a model performs on a fixed set of tasks. Useful for comparison; ignores how the model behaves in your actual work.",
  },
  {
    term: "Top-p / Top-k",
    short: "the sampling dials",
    body: "Two settings (with temperature) that shape how the AI picks each next word. Top-p caps probability mass; top-k caps the candidate count. Most chat UIs hide both. Lower = safer. Higher = more creative or more weird.",
  },
  {
    term: "Test-time compute",
    short: "thinking longer at runtime",
    body: "Letting the model reason longer at query time instead of just answering. Newer reasoning models (Claude with extended thinking, o3, Gemini 2.5 Pro) use this. Slower per query but better at hard problems.",
  },
  {
    term: "JSON mode / Structured output",
    short: "guaranteed-shape answers",
    body: "A setting that forces the AI to return a specific JSON shape instead of free prose. Critical for code that parses AI output. Both Claude and ChatGPT support it on the API.",
  },
  {
    term: "Roleplay prompting",
    short: "'act as a X'",
    body: "Telling the AI to take on a role ('act as a senior engineer reviewing this PR') before the actual task. Often produces sharper output than asking cold. Works because the model has seen many examples of how that role talks.",
  },
  {
    term: "Constitutional AI",
    short: "training with written rules",
    body: "Anthropic's approach: write a set of principles, then train the model to critique and revise its own answers against those principles. Why Claude refuses certain requests where ChatGPT doesn't.",
  },
  {
    term: "Hugging Face",
    short: "GitHub for AI models",
    body: "The main public hub where open-weights models are hosted (Llama, Mistral, Qwen, DeepSeek, thousands more). You download a model from Hugging Face, run it locally via Ollama or LM Studio.",
  },
];

export const GLOSSARY: GlossaryEntry[] = RAW.map((e) => ({
  ...e,
  slug: slugify(e.term),
}));

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((e) => e.slug === slug);
}
