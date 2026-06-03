import type { Metadata } from "next";
import Link from "next/link";
import LiteYouTube from "@/app/_components/LiteYouTube";

const VIDEOS = [
  {
    "title": "But what is a neural network? | Chapter 1, Deep learning",
    "creator": "3Blue1Brown",
    "youtube_id": "aircAruvnKk",
    "level": "novice",
    "category": "foundations",
    "duration_min": 19,
    "why_watch": "Grant Sanderson's visual derivation of what a neural network actually is, starting from MNIST digit recognition. The canonical entry point that builds the geometric intuition everything else rests on."
  },
  {
    "title": "Gradient descent, how neural networks learn | Chapter 2, Deep learning",
    "creator": "3Blue1Brown",
    "youtube_id": "IHZwWFHWa-w",
    "level": "novice",
    "category": "foundations",
    "duration_min": 21,
    "why_watch": "Shows what learning actually means mathematically, minimizing a loss function by walking downhill. Removes the magic from gradient descent without dumbing it down."
  },
  {
    "title": "What is backpropagation really doing? | Chapter 3, Deep learning",
    "creator": "3Blue1Brown",
    "youtube_id": "Ilg3gGewQ5U",
    "level": "learner",
    "category": "foundations",
    "duration_min": 13,
    "why_watch": "Intuition layer for backprop before the calculus. Most people skip this and never recover. Watch it before chapter 4."
  },
  {
    "title": "Backpropagation calculus | Chapter 4, Deep learning",
    "creator": "3Blue1Brown",
    "youtube_id": "tIeHLnjs5U8",
    "level": "learner",
    "category": "foundations",
    "duration_min": 10,
    "why_watch": "The chain rule applied to neural nets, shown step by step. Short, dense, and the difference between knowing the word backprop and understanding it."
  },
  {
    "title": "But what is a GPT? Visual intro to transformers | Chapter 5, Deep Learning",
    "creator": "3Blue1Brown",
    "youtube_id": "wjZofJX0v4M",
    "level": "learner",
    "category": "transformers",
    "duration_min": 27,
    "why_watch": "Best visual introduction to transformer architecture in existence. Tokens, embeddings, the residual stream, attention, drawn so the geometry sticks."
  },
  {
    "title": "Attention in transformers, visually explained | Chapter 6, Deep Learning",
    "creator": "3Blue1Brown",
    "youtube_id": "eMlx5fFNoYc",
    "level": "learner",
    "category": "transformers",
    "duration_min": 26,
    "why_watch": "Query, key, value matrices shown as actual matrices doing actual things. Removes the mystery of attention is all you need in 26 minutes."
  },
  {
    "title": "How might LLMs store facts | Chapter 7, Deep Learning",
    "creator": "3Blue1Brown",
    "youtube_id": "9-Jl0dxWQs8",
    "level": "user",
    "category": "interpretability",
    "duration_min": 22,
    "why_watch": "MLP layers as key-value memory stores. Bridges to mechanistic interpretability, where Anthropic and DeepMind research is actually pointing."
  },
  {
    "title": "The spelled-out intro to neural networks and backpropagation: building micrograd",
    "creator": "Andrej Karpathy",
    "youtube_id": "VMj-3S1tku0",
    "level": "learner",
    "category": "foundations",
    "duration_min": 145,
    "why_watch": "Karpathy builds an autograd engine from scratch in a Jupyter notebook. After this, you actually understand what PyTorch is doing under the hood. Non-optional for serious learners."
  },
  {
    "title": "The spelled-out intro to language modeling: building makemore",
    "creator": "Andrej Karpathy",
    "youtube_id": "PaCmpygFfXo",
    "level": "learner",
    "category": "foundations",
    "duration_min": 117,
    "why_watch": "Bigram models to neural language models, built live. The makemore series is the closest thing to a doctorate-grade language-model bootcamp on the open internet."
  },
  {
    "title": "Let's build GPT: from scratch, in code, spelled out.",
    "creator": "Andrej Karpathy",
    "youtube_id": "kCc8FmEb1nY",
    "level": "user",
    "category": "transformers",
    "duration_min": 116,
    "why_watch": "Karpathy implements nanoGPT, a working GPT, from blank file to trained model in under two hours. The single most-cited I finally got it video for transformers."
  },
  {
    "title": "Let's build the GPT Tokenizer",
    "creator": "Andrej Karpathy",
    "youtube_id": "zduSFxRajkE",
    "level": "user",
    "category": "transformers",
    "duration_min": 134,
    "why_watch": "Byte-pair encoding from scratch. Most engineers ship LLM apps without understanding tokenization, which is why their prompts behave weird. Karpathy fixes that."
  },
  {
    "title": "[1hr Talk] Intro to Large Language Models",
    "creator": "Andrej Karpathy",
    "youtube_id": "zjkBMFhNj_g",
    "level": "user",
    "category": "foundations",
    "duration_min": 60,
    "why_watch": "Karpathy's single best high-altitude survey of LLMs as systems: pretraining, finetuning, RLHF, agents, security. The talk to send a smart non-ML person."
  },
  {
    "title": "Let's reproduce GPT-2 (124M)",
    "creator": "Andrej Karpathy",
    "youtube_id": "l8pRSuU81PU",
    "level": "operator",
    "category": "transformers",
    "duration_min": 240,
    "why_watch": "Four-hour live build reproducing GPT-2 from scratch, including data, training loop, and optimizer details. The closest thing to industrial-strength LLM training pedagogy for free."
  },
  {
    "title": "Deep Dive into LLMs like ChatGPT",
    "creator": "Andrej Karpathy",
    "youtube_id": "7xTGNNLPyMI",
    "level": "user",
    "category": "foundations",
    "duration_min": 210,
    "why_watch": "Three-and-a-half hour comprehensive walkthrough of how ChatGPT actually works: pretraining, SFT, RLHF, hallucinations, tools. Karpathy's 2025 follow-up to his earlier intro."
  },
  {
    "title": "How I use LLMs",
    "creator": "Andrej Karpathy",
    "youtube_id": "EWvNQjAaOHw",
    "level": "user",
    "category": "practical workflows",
    "duration_min": 130,
    "why_watch": "The practitioner's companion to Deep Dive into LLMs. Karpathy demonstrates his actual day-to-day LLM workflow: coding, research, audio, vision. Counter-programming against prompt-engineering hype."
  },
  {
    "title": "State of GPT | BRK216HFS",
    "creator": "Microsoft Developer",
    "youtube_id": "bZQun8Y4L2A",
    "level": "user",
    "category": "transformers",
    "duration_min": 42,
    "why_watch": "Karpathy at Microsoft Build 2023. The cleanest one-shot diagram of pretraining to SFT to reward model to RL still in active use as a mental model."
  },
  {
    "title": "Imaginary Numbers Are Real [Part 1: Introduction]",
    "creator": "Welch Labs",
    "youtube_id": "T647CGsuOVU",
    "level": "novice",
    "category": "foundations",
    "duration_min": 6,
    "why_watch": "Not AI directly, but the math intuition Welch builds (geometric interpretation of abstract objects) is the same muscle you need for embeddings, attention, and latent spaces."
  },
  {
    "title": "The Orthogonality Thesis",
    "creator": "Robert Miles AI Safety",
    "youtube_id": "hEUO6pjwFOo",
    "level": "learner",
    "category": "safety",
    "duration_min": 12,
    "why_watch": "Why intelligence and goals are independent axes. Miles explains the foundational result that smart does not imply aligned with us. Short, rigorous, canonical."
  },
  {
    "title": "Why Would AI Want to do Bad Things? Instrumental Convergence",
    "creator": "Robert Miles AI Safety",
    "youtube_id": "ZeecOKBus3Q",
    "level": "learner",
    "category": "safety",
    "duration_min": 11,
    "why_watch": "Why most goals converge on sub-goals like self-preservation, resource acquisition, and goal-preservation. Once you see this, AI risk arguments stop feeling like sci-fi."
  },
  {
    "title": "Intro to AI Safety, Remastered",
    "creator": "Robert Miles AI Safety",
    "youtube_id": "pYXy-A4siMw",
    "level": "novice",
    "category": "safety",
    "duration_min": 18,
    "why_watch": "Best single what-is-AI-safety-as-a-field video. Miles rebuilt his original intro with cleaner argumentation. Send this to skeptics."
  },
  {
    "title": "The OTHER AI Alignment Problem: Mesa-Optimizers and Inner Alignment",
    "creator": "Robert Miles AI Safety",
    "youtube_id": "bJLcIBixGj8",
    "level": "user",
    "category": "safety",
    "duration_min": 23,
    "why_watch": "The inner-alignment problem made accessible. This is the issue that keeps interpretability researchers up at night. A model can be trained on the right objective and still learn the wrong one internally."
  },
  {
    "title": "AI 'Stop Button' Problem - Computerphile",
    "creator": "Computerphile",
    "youtube_id": "3TYT1QfdfsM",
    "level": "novice",
    "category": "safety",
    "duration_min": 20,
    "why_watch": "Robert Miles on Computerphile explaining why making an off-switch for a sufficiently capable AI is harder than it looks. Classic AI-safety pedagogy."
  },
  {
    "title": "Deceptive Misaligned Mesa-Optimisers? It's More Likely Than You Think...",
    "creator": "Robert Miles AI Safety",
    "youtube_id": "IeWljQw3UgQ",
    "level": "operator",
    "category": "safety",
    "duration_min": 15,
    "why_watch": "Goes one level deeper into mesa-optimization and deceptive alignment. Not entry-level, but the canonical accessible treatment of a result Anthropic and Redwood are actively investigating."
  },
  {
    "title": "Reward Hacking: Concrete Problems in AI Safety Part 4",
    "creator": "Robert Miles AI Safety",
    "youtube_id": "92qDfT8pENs",
    "level": "learner",
    "category": "safety",
    "duration_min": 9,
    "why_watch": "Why models find loopholes in their reward functions. Reward hacking is no longer theoretical, it's a daily occurrence in frontier RLHF. The canonical explainer."
  },
  {
    "title": "Attention Is All You Need",
    "creator": "Yannic Kilcher",
    "youtube_id": "iDulhoQ2pro",
    "level": "user",
    "category": "transformers",
    "duration_min": 28,
    "why_watch": "Kilcher's walkthrough of the original 2017 transformer paper. Best read-the-paper-with-someone-smart treatment. Pairs well with the 3Blue1Brown visualization."
  },
  {
    "title": "GPT-3: Language Models are Few-Shot Learners (Paper Explained)",
    "creator": "Yannic Kilcher",
    "youtube_id": "SY5PvZrJhLE",
    "level": "user",
    "category": "transformers",
    "duration_min": 65,
    "why_watch": "The paper that made the world pay attention. Kilcher dissects the scaling claims, the few-shot prompting trick, and the implications, recorded in 2020 before the hype cycle hit."
  },
  {
    "title": "Constitutional AI: Harmlessness from AI Feedback (Anthropic Paper Explained)",
    "creator": "Yannic Kilcher",
    "youtube_id": "8tnY-VLs1V8",
    "level": "operator",
    "category": "safety",
    "duration_min": 41,
    "why_watch": "Walkthrough of Anthropic's Constitutional AI paper, the technique behind Claude's training. Critical for understanding how RLAIF differs from RLHF."
  },
  {
    "title": "AlphaGo - The Movie | Full award-winning documentary",
    "creator": "DeepMind",
    "youtube_id": "WXuK6gekU1Y",
    "level": "novice",
    "category": "history",
    "duration_min": 90,
    "why_watch": "Not technical, but historically essential. The Lee Sedol match was the moment the field stopped being theoretical. Move 37 is referenced in alignment papers to this day."
  },
  {
    "title": "Geoffrey Hinton: The Foundations of Deep Learning",
    "creator": "Lex Fridman Podcast",
    "youtube_id": "2EDP4v-9TUA",
    "level": "user",
    "category": "history",
    "duration_min": 90,
    "why_watch": "Hinton on backprop, Boltzmann machines, and his pivot to AI-risk work. The most important living source on where deep learning actually came from."
  },
  {
    "title": "Ilya Sutskever: Deep Learning",
    "creator": "Lex Fridman Podcast",
    "youtube_id": "13CZPWmke6A",
    "level": "user",
    "category": "history",
    "duration_min": 67,
    "why_watch": "Sutskever (then OpenAI Chief Scientist) on the scaling hypothesis, compression as intelligence, and the road from AlexNet to GPT. Recorded 2020. Read it against what came after."
  },
  {
    "title": "Yann LeCun: Deep Learning, ConvNets, and Self-Supervised Learning",
    "creator": "Lex Fridman Podcast",
    "youtube_id": "SGSOCuByo24",
    "level": "user",
    "category": "history",
    "duration_min": 90,
    "why_watch": "LeCun argues against the LLM-only path and for self-supervised world models. The most rigorous public dissent against the current paradigm from a Turing-award winner."
  },
  {
    "title": "Demis Hassabis: DeepMind - AI, Superintelligence and the Future of Humanity",
    "creator": "Lex Fridman Podcast",
    "youtube_id": "Gfr50f6ZBvo",
    "level": "user",
    "category": "history",
    "duration_min": 130,
    "why_watch": "Hassabis on AlphaGo, AlphaFold, and the path to AGI from a neuroscience background. Counterpoint to the LLM-centric narrative."
  },
  {
    "title": "Dario Amodei: Anthropic CEO on Claude, AGI and the Future of AI and Humanity",
    "creator": "Lex Fridman Podcast",
    "youtube_id": "ugvHCXCOmm4",
    "level": "user",
    "category": "safety",
    "duration_min": 300,
    "why_watch": "Five-hour conversation with Anthropic's CEO covering Claude's training, scaling laws, mechanistic interpretability, and the existential argument. The single best public source on how Anthropic actually thinks."
  },
  {
    "title": "Andrej Karpathy: Tesla AI, Self-Driving, Optimus, Aliens, and AGI",
    "creator": "Lex Fridman Podcast",
    "youtube_id": "cdiD-9MMpb0",
    "level": "user",
    "category": "history",
    "duration_min": 210,
    "why_watch": "Karpathy on his Tesla years, the transition to LLMs, and his framework for evaluating AI progress. Rich technical detail for builders."
  },
  {
    "title": "Stanford CS25: V2 I Introduction to Transformers w/ Andrej Karpathy",
    "creator": "Stanford Online",
    "youtube_id": "XfpMkf4rD6E",
    "level": "user",
    "category": "transformers",
    "duration_min": 75,
    "why_watch": "Karpathy lecturing Stanford on transformers as a general-purpose differentiable computer. One of the best high-altitude framings of the architecture."
  },
  {
    "title": "ChatGPT: 30 Year History | How AI Learned to Talk",
    "creator": "Art of the Problem",
    "youtube_id": "OFS90-FX6pg",
    "level": "novice",
    "category": "history",
    "duration_min": 26,
    "why_watch": "Clean visual history of language modeling from n-grams to ChatGPT. Great primer to send before showing someone Karpathy."
  },
  {
    "title": "Neural Networks Pt. 1: Inside the Black Box",
    "creator": "StatQuest with Josh Starmer",
    "youtube_id": "CqOfi41LfDw",
    "level": "novice",
    "category": "foundations",
    "duration_min": 19,
    "why_watch": "Starmer's gentlest possible introduction to neural networks. Pairs well with 3Blue1Brown for learners who need it twice from two angles."
  },
  {
    "title": "Neural Networks Pt. 2: Backpropagation Main Ideas",
    "creator": "StatQuest with Josh Starmer",
    "youtube_id": "IN2XmBhILt4",
    "level": "novice",
    "category": "foundations",
    "duration_min": 17,
    "why_watch": "Backpropagation explained without calculus first, then with. Starmer's BAM pedagogy is unironically effective."
  },
  {
    "title": "How AIs, like ChatGPT, Learn",
    "creator": "CGP Grey",
    "youtube_id": "R9OHn5ZF4Uo",
    "level": "novice",
    "category": "history",
    "duration_min": 8,
    "why_watch": "Pre-LLM (2017) but the bot-teacher framing of supervised learning aged beautifully. Send this first to anyone who's never thought about how training works."
  },
  {
    "title": "GPT-4 - How does it work, and how do I build apps with it? - CS50 Tech Talk",
    "creator": "CS50",
    "youtube_id": "vw-KWfKwvTQ",
    "level": "user",
    "category": "practical workflows",
    "duration_min": 90,
    "why_watch": "Harvard CS50 tech talk on building with GPT-4. Practical, grounded, and at the right altitude for engineers crossing into LLM apps."
  },
  {
    "title": "Visualizing transformers and attention | Talk for TNG Big Tech Day '24",
    "creator": "Grant Sanderson",
    "youtube_id": "KJtZARuO3JY",
    "level": "user",
    "category": "transformers",
    "duration_min": 60,
    "why_watch": "Grant Sanderson distills his entire deep-learning chapter series into one talk. The clearest single hour on transformer geometry available."
  },
  {
    "title": "Mechanistic Interpretability with Neel Nanda",
    "creator": "Machine Learning Street Talk",
    "youtube_id": "_Ygf0GnlwmY",
    "level": "operator",
    "category": "interpretability",
    "duration_min": 90,
    "why_watch": "Neel Nanda (DeepMind interpretability lead) on how to reverse-engineer what's actually happening inside transformer layers. The field's current frontier."
  },
  {
    "title": "Sparks of AGI: early experiments with GPT-4",
    "creator": "Sebastien Bubeck",
    "youtube_id": "qbIk7-JPB2c",
    "level": "user",
    "category": "capability evals",
    "duration_min": 55,
    "why_watch": "Microsoft Research talk presenting the Sparks of AGI paper findings. Whether you agree with the framing or not, it's load-bearing in the discourse. Required watching for the debate."
  },
  {
    "title": "Stanford CS229 Lecture 2 - Linear Regression and Gradient Descent",
    "creator": "Stanford Online",
    "youtube_id": "4b4MUYve_U8",
    "level": "learner",
    "category": "foundations",
    "duration_min": 80,
    "why_watch": "Andrew Ng's Stanford CS229 lecture on the foundations. Doctorate-grade, free, the bedrock under everything LLM-related."
  },
  {
    "title": "MIT 6.S191: Introduction to Deep Learning",
    "creator": "Alexander Amini",
    "youtube_id": "ErnWZxJovaM",
    "level": "learner",
    "category": "foundations",
    "duration_min": 60,
    "why_watch": "MIT's annually-updated deep-learning intro. Cleaner narrative arc than CS229 for someone who wants the modern view, with current code."
  },
  {
    "title": "Mamba and S4 Explained: Architecture, Parallel Scan, Kernel Fusion, Recurrent, Convolution, Math",
    "creator": "Umar Jamil",
    "youtube_id": "8Q_tqwpTpVU",
    "level": "operator",
    "category": "transformers",
    "duration_min": 110,
    "why_watch": "Umar Jamil's paper-by-paper code walkthroughs are doctorate-grade. Mamba/State Space Models are the most serious post-transformer architecture. The deepest free explainer."
  },
  {
    "title": "What are Transformer Models and How do they Work?",
    "creator": "AI Coffee Break with Letitia",
    "youtube_id": "qaWMOYf4ri8",
    "level": "learner",
    "category": "transformers",
    "duration_min": 13,
    "why_watch": "Letitia Parcalabescu's accessible 13-minute transformer overview. Right altitude for someone who wants the concept before committing to Karpathy's 2-hour build."
  },
  {
    "title": "RAG vs. Fine-Tuning",
    "creator": "IBM Technology",
    "youtube_id": "00Q0G84kq3M",
    "level": "user",
    "category": "practical workflows",
    "duration_min": 8,
    "why_watch": "Cedric Clyburn (IBM) cleanly delineating when to RAG vs. when to fine-tune. The single decision most LLM-app builders get wrong; this is the sober answer."
  },
  {
    "title": "What is Retrieval-Augmented Generation (RAG)?",
    "creator": "IBM Technology",
    "youtube_id": "T-D1OfcDW1M",
    "level": "novice",
    "category": "practical workflows",
    "duration_min": 6,
    "why_watch": "Marina Danilevsky's whiteboard explainer for RAG. Six minutes, zero hype, and the right mental model before anyone touches LangChain or a vector DB."
  },
  {
    "title": "How AI Could Empower Any Business | Andrew Ng | TED",
    "creator": "TED",
    "youtube_id": "reUZRyXxUs4",
    "level": "novice",
    "category": "history",
    "duration_min": 13,
    "why_watch": "Andrew Ng's 2022 TED talk on democratizing AI. Useful for non-technical operators who need a grounded reframe of what AI does for ordinary businesses."
  }
] as {
  title: string;
  creator: string;
  youtube_id: string;
  level: string;
  category: string;
  duration_min: number;
  why_watch: string;
}[];

export const metadata: Metadata = {
  title: "AI videos · curated · /learn · AtomEons",
  description: `${VIDEOS.length} vetted AI videos · no hype · real value. 3Blue1Brown's neural-nets series, Karpathy's 'Let's build GPT', Robert Miles AI Safety, StatQuest ML, Stanford CS25, Lex Fridman with Hinton/Sutskever/Karpathy. Curated by level + category. Free. CC-BY 4.0.`,
  alternates: { canonical: "https://atomeons.com/learn/videos" },
  openGraph: {
    title: `AI videos · ${VIDEOS.length} vetted · /learn`,
    description: "No hype. Real value. Curated by level + category. CC-BY 4.0.",
    url: "https://atomeons.com/learn/videos",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI videos · curated", description: `${VIDEOS.length} vetted · free` },
  robots: { index: true, follow: true },
};

const CATEGORIES = Array.from(new Set(VIDEOS.map((v) => v.category)));

export default function VideosPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Videos
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI videos · {VIDEOS.length} vetted · zero hype
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            The AI videos{" "}
            <span className="text-[#22F0D5]">that actually teach you something.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Click-to-load embeds · no YouTube JS until you press play.
            Curated by category and skill level. Real creators we&apos;ve
            watched and learned from. Zero affiliate revenue.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <a key={cat} href={`#cat-${cat.replace(/\s+/g, "-")}`} className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20 space-y-16">
          {CATEGORIES.map((cat) => {
            const items = VIDEOS.filter((v) => v.category === cat);
            return (
              <div key={cat} id={`cat-${cat.replace(/\s+/g, "-")}`} className="scroll-mt-20">
                <h2 className="text-3xl font-semibold tracking-tight text-[#22F0D5] md:text-4xl">{cat}</h2>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  {items.map((v) => (
                    <article key={v.youtube_id || v.title} className="space-y-3">
                      {v.youtube_id ? (
                        <LiteYouTube id={v.youtube_id} title={v.title} />
                      ) : (
                        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(v.title + " " + v.creator)}`} target="_blank" rel="noopener" className="flex aspect-video w-full items-center justify-center rounded-xl border border-[#1A2225] bg-[#0A0F11] text-center text-sm text-[#9BA5A7] hover:border-[#22F0D5]/40">
                          search YouTube ↗
                        </a>
                      )}
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-semibold leading-snug text-[#F2F4F5]">{v.title}</h3>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                          {v.creator} · {v.duration_min}min · {v.level}
                        </p>
                        <p className="text-sm leading-[1.6] text-[#C8CCCE]">{v.why_watch}</p>
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
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
