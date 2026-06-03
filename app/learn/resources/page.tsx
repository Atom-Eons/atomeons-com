import type { Metadata } from "next";
import Link from "next/link";

const RESOURCES = [
  {
    "name": "Lex Fridman Podcast",
    "type": "podcast",
    "level": "all",
    "category": "broad AI conversations",
    "host": "Lex Fridman",
    "why": "Long-form (3-5hr) interviews with frontier researchers, CEOs, and adjacent thinkers; episode #490 'State of AI in 2026' with Lambert and Raschka is a representative current example. Mix of accessible framings and deep technical moments — value depends on the guest.",
    "url": "https://lexfridman.com/podcast/"
  },
  {
    "name": "Dwarkesh Podcast",
    "type": "podcast",
    "level": "operator",
    "category": "AI research",
    "host": "Dwarkesh Patel",
    "why": "Highest-prep interviewer in the space. Episodes with Dario Amodei, Demis Hassabis, Sholto Douglas/Trenton Bricken, and Jensen Huang go into mechanics other shows skip. The interviewer reads the papers — it shows.",
    "url": "https://www.dwarkesh.com/podcast"
  },
  {
    "name": "Latent Space",
    "type": "podcast",
    "level": "user",
    "category": "practitioner workflows / AI engineering",
    "host": "swyx (Shawn Wang) and Alessio Fanelli",
    "why": "The AI Engineer beat. Coverage of agents, models, infra, and (since Jan 2026) a dedicated AI for Science sub-pod. Strong choice for builders who want to know what the labs are shipping and how production AI is actually wired.",
    "url": "https://www.latent.space/"
  },
  {
    "name": "The Cognitive Revolution",
    "type": "podcast",
    "level": "user",
    "category": "AI research / builders",
    "host": "Nathan Labenz and Erik Torenberg",
    "why": "Biweekly interviews with builders and researchers at the frontier. Labenz was an early GPT-4 red-teamer and tends to ask the operationally-honest questions other hosts skate past.",
    "url": "https://www.cognitiverevolution.ai/"
  },
  {
    "name": "Machine Learning Street Talk (MLST)",
    "type": "podcast",
    "level": "operator",
    "category": "technical AI / cognitive science",
    "host": "Tim Scarfe",
    "why": "Highest-rated technical AI pod on Spotify per their own data. Long, prep-heavy episodes on category theory, evolutionary algorithms, neuroscience-meets-ML, mech interp. Not background listening — bring a notebook.",
    "url": "https://www.mlst.ai/"
  },
  {
    "name": "The TWIML AI Podcast",
    "type": "podcast",
    "level": "user",
    "category": "ML/AI practitioner",
    "host": "Sam Charrington",
    "why": "Long-running (since 2016) interview show covering ML/AI research, applied ML, MLOps, and increasingly agents and inference systems. Practical-engineering register — researchers, data scientists, ML engineers.",
    "url": "https://twimlai.com/podcast/twimlai/"
  },
  {
    "name": "Practical AI",
    "type": "podcast",
    "level": "learner",
    "category": "practitioner workflows",
    "host": "Daniel Whitenack and Chris Benson",
    "why": "Changelog Media production focused on real-world AI implementation — orchestration, agents, infra, predictive models. Plain-spoken; good entry point for engineers who want signal without the founder-hype layer.",
    "url": "https://changelog.com/practicalai"
  },
  {
    "name": "Hard Fork",
    "type": "podcast",
    "level": "novice",
    "category": "business of AI / tech culture",
    "host": "Kevin Roose and Casey Newton (NYT)",
    "why": "Weekly NYT-produced show. Mainstream-accessible framing of the week in AI and tech, with reporter-style skepticism. Best on-ramp for people who don't want to read papers but need to track what's actually happening.",
    "url": "https://www.nytimes.com/column/hard-fork"
  },
  {
    "name": "80,000 Hours Podcast",
    "type": "podcast",
    "level": "user",
    "category": "AI safety / EA",
    "host": "Rob Wiblin, Luisa Rodriguez, Zershaaneh Qureshi",
    "why": "Long, thorough conversations on AI safety, alignment, biosecurity, and post-AI futures from the effective-altruism lens. 2026 has included episodes on RSI, AI biosecurity (VCT), and timeline updates.",
    "url": "https://80000hours.org/podcast/"
  },
  {
    "name": "Two Minute Papers",
    "type": "youtube",
    "level": "novice",
    "category": "AI research highlights",
    "host": "Karoly Zsolnai-Feher",
    "why": "Short, visually-driven walkthroughs of new papers in CG, ML, and AI. Over 1.77M subscribers as of 2026. Great onboarding format — 'what just shipped, and why should I care' in 3-5 minutes.",
    "url": "https://www.youtube.com/@TwoMinutePapers"
  },
  {
    "name": "Yannic Kilcher",
    "type": "youtube",
    "level": "operator",
    "category": "paper reviews / technical AI",
    "host": "Yannic Kilcher",
    "why": "The serious paper-walkthrough channel. Kilcher reads the paper end-to-end and pushes back on weak experimental setups instead of cheerleading. For people who want to learn how to critically evaluate ML research.",
    "url": "https://www.youtube.com/@YannicKilcher"
  },
  {
    "name": "3Blue1Brown",
    "type": "youtube",
    "level": "operator",
    "category": "math fundamentals for ML",
    "host": "Grant Sanderson",
    "why": "Visual deep-dives into linear algebra, calculus, and the math behind neural networks and transformers. Not novice-level despite the friendly art style — it's real math, taught honestly. The 'Neural Networks' and 'Transformers' series are field-defining.",
    "url": "https://www.youtube.com/c/3blue1brown"
  },
  {
    "name": "Andrej Karpathy",
    "type": "youtube",
    "level": "operator",
    "category": "deep learning from scratch",
    "host": "Andrej Karpathy",
    "why": "The 'Neural Networks: Zero to Hero' series builds backprop, makemore, micrograd, and a GPT from scratch in Python. Crossed 1M subscribers in early 2026. Karpathy joined Anthropic pretraining in May 2026 — back-catalog remains essential.",
    "url": "https://www.youtube.com/@AndrejKarpathy"
  },
  {
    "name": "Sam Witteveen",
    "type": "youtube",
    "level": "user",
    "category": "practitioner workflows / LangChain / agents",
    "host": "Sam Witteveen",
    "why": "Google Developer Expert for ML. Hands-on tutorials on LangChain, agents, retrieval, function calling, and applied LLM patterns with companion GitHub code. Practical-builder register, not lecture-hall.",
    "url": "https://www.youtube.com/@samwitteveenai"
  },
  {
    "name": "Matthew Berman",
    "type": "youtube",
    "level": "learner",
    "category": "AI tools / model releases",
    "host": "Matthew Berman",
    "why": "5-6 videos a week. First-day coverage of new model releases with benchmarks and head-to-head comparisons. Particularly strong on open-source and local LLMs. Good for staying current on what's actually shipping.",
    "url": "https://www.youtube.com/@matthew_berman"
  },
  {
    "name": "Ai2 (Allen Institute for AI)",
    "type": "youtube",
    "level": "operator",
    "category": "AI research",
    "host": "Allen Institute for Artificial Intelligence",
    "why": "Talks from AI2 researchers and visiting scientists — open models (OLMo), NLP, alignment, AI for science. Research-talk register, not produced for retention; valuable when you want the source instead of a recap.",
    "url": "https://allenai.org/videos"
  },
  {
    "name": "fast.ai — Practical Deep Learning for Coders",
    "type": "course",
    "level": "learner",
    "category": "practitioner workflows / deep learning",
    "host": "Jeremy Howard and Rachel Thomas",
    "why": "Free, code-first deep learning course. Lesson 1 deploys a working image classifier; the curriculum walks down to backprop, batch norm, ResNets, and transformers. Top-down teaching philosophy — build something working before you understand the internals.",
    "url": "https://course.fast.ai/"
  },
  {
    "name": "Hugging Face LLM Course (formerly NLP Course)",
    "type": "course",
    "level": "learner",
    "category": "practitioner workflows / LLMs",
    "host": "Hugging Face",
    "why": "Free, no ads. Transformers, Datasets, Tokenizers, Accelerate, the Hub, fine-tuning, and (in the 2026 expansion) building reasoning models. The canonical hands-on intro for working with open-weight LLMs.",
    "url": "https://huggingface.co/learn/llm-course"
  },
  {
    "name": "DeepLearning.AI — The Batch",
    "type": "newsletter",
    "level": "learner",
    "category": "AI research & industry roundup",
    "host": "Andrew Ng / DeepLearning.AI",
    "why": "Weekly newsletter with Andrew Ng's letter at the top followed by curated coverage of research, hardware, business, and culture. Calm, signal-heavy, no hype-bait. Pairs well with DeepLearning.AI's short-course library.",
    "url": "https://www.deeplearning.ai/the-batch/"
  },
  {
    "name": "Import AI",
    "type": "newsletter",
    "level": "operator",
    "category": "AI research / policy",
    "host": "Jack Clark (Anthropic co-founder)",
    "why": "Weekly. Detailed analysis of cutting-edge papers, capability trends, and policy implications, plus a short fiction piece at the end of each issue. Crossed 100k+ subscribers in 2026. Clark writes from inside the frontier and tells you what to actually pay attention to.",
    "url": "https://jack-clark.net/"
  },
  {
    "name": "One Useful Thing",
    "type": "newsletter",
    "level": "learner",
    "category": "practitioner workflows / AI in work and education",
    "host": "Ethan Mollick (Wharton)",
    "why": "Substack with 439k+ subscribers. Mollick writes about what AI actually changes for work and learning, with running hands-on experiments instead of vibes. The clearest non-engineer voice on how to use these tools well.",
    "url": "https://www.oneusefulthing.org/"
  },
  {
    "name": "AI Snake Oil",
    "type": "newsletter",
    "level": "user",
    "category": "AI critique / honest evaluation",
    "host": "Arvind Narayanan and Sayash Kapoor (Princeton)",
    "why": "Counterweight to the hype layer. Sharp on the difference between predictive AI (where most snake oil lives) and generative AI, on evaluation methodology, and on open-foundation-model risk framing. Required reading for anyone shipping AI claims.",
    "url": "https://www.aisnakeoil.com/"
  },
  {
    "name": "Interconnects",
    "type": "newsletter",
    "level": "operator",
    "category": "frontier AI research / open models",
    "host": "Nathan Lambert (Ai2)",
    "why": "1-3 posts per week from Ai2's post-training lead. Model reviews, RLHF/post-training internals, open-model ecosystem surveys. Inside-the-lab perspective without the marketing layer.",
    "url": "https://www.interconnects.ai/"
  },
  {
    "name": "Simon Willison's Weblog",
    "type": "blog",
    "level": "user",
    "category": "practitioner workflows / LLM tooling",
    "host": "Simon Willison",
    "why": "Coined 'prompt injection,' popularized 'AI slop' and 'agentic engineering.' Daily-ish notes on what's actually working with current models, plus deep dives on LLM tooling (Datasette, llm CLI, agentic patterns). Engineering register, no hype.",
    "url": "https://simonwillison.net/"
  },
  {
    "name": "Stratechery",
    "type": "newsletter",
    "level": "user",
    "category": "business of AI / strategy",
    "host": "Ben Thompson",
    "why": "The reference shop for tech strategy analysis. 2026 coverage includes 'Agents Over Bubbles,' the chip supply story, aggregators-and-AI, and the economic impact of agentic systems. Paywalled daily; free Monday article.",
    "url": "https://stratechery.com/"
  },
  {
    "name": "Anthropic Research Blog",
    "type": "blog",
    "level": "operator",
    "category": "AI research / safety / interpretability",
    "host": "Anthropic",
    "why": "First-party research from Anthropic on interpretability (translating Claude's thoughts to readable text, 2026), agentic misalignment reduction, constitutional classifiers, the Economic Index, and the Anthropic Institute. Source material, not commentary.",
    "url": "https://www.anthropic.com/research"
  },
  {
    "name": "OpenAI Research / News",
    "type": "blog",
    "level": "operator",
    "category": "AI research / safety",
    "host": "OpenAI",
    "view": "first-party",
    "why": "First-party research and release notes. 2026 has included CoT-grading audits, the OpenAI Safety Fellowship, GPT-Rosalind for drug discovery, and the Privacy Filter open-weight PII model. Pair with the Alignment Research subsite.",
    "url": "https://openai.com/news/research/"
  },
  {
    "name": "The Rundown AI",
    "type": "newsletter",
    "level": "novice",
    "category": "daily AI news / tools",
    "host": "Rowan Cheung",
    "why": "2M+ subscribers in 2026. 5-minute daily of AI news, tools, and use cases. Tilts toward consumer-facing AI and tool launches — good first newsletter for non-technical readers; pair with a deeper feed if you're building.",
    "url": "https://www.therundown.ai/"
  },
  {
    "name": "TLDR AI",
    "type": "newsletter",
    "level": "learner",
    "category": "daily AI summary",
    "host": "TLDR (Dan Ni)",
    "why": "Daily 5-minute Mon-Fri summary. Three sections: Big Tech & Startups, Science & Futuristic Tech, Programming/Design/Data Science. Free. Solid daily skim for ML engineers and PMs; not deep-dive material, but the digest is honestly curated.",
    "url": "https://tldr.tech/ai"
  },
  {
    "name": "The Neuron",
    "type": "newsletter",
    "level": "novice",
    "category": "daily AI news",
    "host": "Noah Edelman and Pete Huang",
    "why": "Daily 700k+ subscriber newsletter, acquired by TechnologyAdvice in 2025. Friendly, lightly comedic register; explains why new releases matter for non-engineers. Best as a complement to a deeper source.",
    "url": "https://www.theneurondaily.com/"
  }
] as const;

export const metadata: Metadata = {
  title: "AI learning resources · podcasts, channels, newsletters · /learn · AtomEons",
  description: "30 vetted AI-learning resources. Real podcasts, YouTube channels, newsletters, blogs, courses. Curated by level + category. No affiliate revenue. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/resources" },
  openGraph: {
    title: "AI learning resources · /learn",
    description: "30 vetted resources. No affiliates. CC-BY 4.0.",
    url: "https://atomeons.com/learn/resources",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI learning resources", description: "30 vetted. CC-BY 4.0." },
  robots: { index: true, follow: true },
};

export default function ResourcesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Resources
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI resources · 30 vetted · podcasts · channels · newsletters · blogs · courses
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Where else to{" "}
            <span className="text-[#22F0D5]">learn AI honestly.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            30 real shows / channels / newsletters / blogs / courses we genuinely
            recommend. Zero affiliate revenue. We name each because it&apos;s worth your time,
            not because anyone paid us. Calibrated by level + topic.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24 space-y-4">
          {RESOURCES.map((r, i) => (
            <article key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-[#F2F4F5] md:text-2xl">{r.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#22F0D5]/30 bg-[#22F0D5]/05 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{r.type}</span>
                  <span className="rounded-full border border-[#FFB87A]/30 bg-[#FFB87A]/05 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">{r.level}</span>
                  <span className="rounded-full border border-[#1A2225] bg-[#0E1418] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{r.category}</span>
                </div>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B7779]">::host · {r.host}</p>
              <p className="mt-4 text-base leading-[1.65] text-[#C8CCCE]">{r.why}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]"
              >
                visit ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
            ← back to /learn
          </Link>
        </div>
      </section>
    </main>
  );
}
