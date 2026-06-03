import type { Metadata } from "next";
import Link from "next/link";

/**
 * /research/decoded — arXiv papers translated to plain English.
 *
 * Operator directive 2026-06-03: "turn arxiv reports into plain english for
 * people in atom eons research especially ai papers and useful papers for
 * normal people. like what scientists know but dont share."
 *
 * Editorial bar:
 *  - Every paper page cites the real paper (arxiv ID, authors, year, link)
 *  - Plain-English one-sentence summary at the top
 *  - "What scientists know but don't say" section — the implicit
 *    knowledge that doesn't make it into abstracts
 *  - Honest about hype vs reality + what the paper does NOT claim
 *  - No jargon without translation
 *  - CC-BY 4.0 educational use
 *
 * Sourcing posture: paraphrase, never reproduce >15 words verbatim per
 * AtomEons copyright doctrine. Cite + link to arxiv original. Original
 * authors retain credit; commentary is ours.
 */

export const metadata: Metadata = {
  title: "Decoded · arXiv papers in plain English · /research/decoded · AtomEons",
  description:
    "Real published AI research papers translated to plain English for normal humans. Attention Is All You Need, Scaling Laws, Chain-of-Thought, Constitutional AI, Sparse Autoencoders — what scientists know but don't always say.",
  alternates: { canonical: "https://atomeons.com/research/decoded" },
  openGraph: {
    title: "Decoded · arXiv papers in plain English",
    description: "AI's most important papers, translated for normal people.",
    url: "https://atomeons.com/research/decoded",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const PAPERS = [
  {
    slug: "alexnet",
    title: "ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)",
    authors: "Krizhevsky, Sutskever, Hinton",
    year: "2012",
    arxiv: "NIPS 2012",
    onesentence: "Three Toronto researchers used graphics-card chips and a deep neural network to crush every competitor at image recognition by such a margin that the entire field abandoned its prior methods within twelve months.",
    matters: "The paper that started modern AI. Hinton won the 2024 Nobel Prize partially for this. Sutskever co-founded OpenAI. Without AlexNet, no ChatGPT, no Claude, no Gemini.",
  },
  {
    slug: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    year: "2017",
    arxiv: "1706.03762",
    onesentence: "The 2017 paper that made every modern AI possible by introducing the transformer architecture — a new way for computers to read sentences that doesn't require reading them word-by-word.",
    matters: "ChatGPT, Claude, Gemini, every AI you've heard of in 2026 traces its blood back to this one paper. Eight engineers at Google.",
  },
  {
    slug: "scaling-laws",
    title: "Scaling Laws for Neural Language Models",
    authors: "Kaplan et al. (OpenAI)",
    year: "2020",
    arxiv: "2001.08361",
    onesentence: "The empirical discovery that making AI models bigger keeps making them better in a predictable mathematical way — and that nothing in the data suggests the improvement stops.",
    matters: "This is why the entire AI industry has spent ~$500B in five years buying more GPUs. Without this paper, the scale-up bet would have been speculation. With it, the bet became math.",
  },
  {
    slug: "gpt-3",
    title: "Language Models are Few-Shot Learners (GPT-3)",
    authors: "Brown et al. (OpenAI)",
    year: "2020",
    arxiv: "2005.14165",
    onesentence: "OpenAI trained a 175-billion-parameter language model and discovered that at sufficient scale it could learn new tasks from a handful of examples in the prompt, without any retraining.",
    matters: "The moment AI started 'talking.' Two years later, ChatGPT launched. Five years later, the AI industry has $500B+ in valuation. This paper is the inflection point.",
  },
  {
    slug: "alphafold",
    title: "Highly Accurate Protein Structure Prediction with AlphaFold",
    authors: "Jumper et al. (DeepMind)",
    year: "2021",
    arxiv: "Nature 596",
    onesentence: "DeepMind built an AI that takes a protein's amino acid sequence and predicts its 3D folded structure with near-experimental accuracy — solving a 50-year grand challenge in biology.",
    matters: "Hassabis and Jumper won the 2024 Nobel Prize in Chemistry for this. 200M+ protein structures predicted and freely available. Every modern drug-discovery pipeline starts here.",
  },
  {
    slug: "rlhf",
    title: "Training Language Models to Follow Instructions (InstructGPT / RLHF)",
    authors: "Ouyang et al. (OpenAI)",
    year: "2022",
    arxiv: "2203.02155",
    onesentence: "OpenAI showed that contracted human raters ranking AI outputs could teach the model to follow instructions, write helpfully, and refuse harmful content — turning raw GPT-3 into shippable ChatGPT.",
    matters: "The bridge between research-grade AI and consumer-grade AI. The technique behind ChatGPT, Claude, Gemini, Grok — every aligned model since uses some variant of this.",
  },
  {
    slug: "chain-of-thought",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Wei et al. (Google Brain)",
    year: "2022",
    arxiv: "2201.11903",
    onesentence: "Asking an AI to 'think step by step' before answering makes it dramatically better at math, logic, and complex reasoning — the model already could reason, but you had to ask the right way.",
    matters: "Every modern AI now reasons step-by-step under the hood. This paper turned a clever prompting trick into the foundation of o1, o3, Claude Extended Thinking, Gemini Thinking — the entire 'reasoning models' category.",
  },
  {
    slug: "latent-diffusion",
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    authors: "Rombach et al. (LMU Munich, Runway)",
    year: "2022",
    arxiv: "2112.10752",
    onesentence: "German researchers figured out how to compress the image-generation problem into a 64x smaller mathematical space, making high-quality AI image generation tractable on consumer hardware.",
    matters: "Stable Diffusion, Flux, Nano Banana Pro, DALL-E 3, Imagen — every AI image you've seen since 2022 descends from this architecture. The atomeons.com hero photography included.",
  },
  {
    slug: "constitutional-ai",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Bai et al. (Anthropic)",
    year: "2022",
    arxiv: "2212.08073",
    onesentence: "An AI can be trained to behave well by having a second AI grade its own answers against a written constitution — instead of needing thousands of humans to label every response.",
    matters: "This is the technique behind Claude's safety training. It's also how every AI lab now scales safety without scaling human labelers. Without it, alignment work would still be a human-bottlenecked process.",
  },
  {
    slug: "sparse-autoencoders",
    title: "Sparse Autoencoders Find Highly Interpretable Features in Language Models",
    authors: "Cunningham et al. (Anthropic, EleutherAI)",
    year: "2023",
    arxiv: "2309.08600",
    onesentence: "A mathematical technique for taking a fully-trained AI and revealing the specific concepts it has learned — like an X-ray for the inside of a model.",
    matters: "For years AIs were called 'black boxes' because nobody could see what they thought. This paper started the work that lets us peek inside. Anthropic's interpretability team has since identified millions of distinct concepts inside Claude.",
  },
];

export default function DecodedIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research" className="hover:text-[#22F0D5]">Research</Link>{" "}
          <span className="text-[#1A2225]">/</span> Decoded
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            arXiv decoded · plain English · for normal humans
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The papers that built modern AI,{" "}
            <span style={{ color: ACCENT }}>without the jargon.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Every breakthrough in modern AI lives in a paper most people will never read. Forty pages of math. Three columns of dense LaTeX. Citations to thirty other papers most people haven&apos;t read either. This is where we translate them.
          </p>
          <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Each page gives you the one-sentence summary, why it matters to your life, what the scientists actually know but don&apos;t always say in the abstract, and an honest read on what the paper does and does not claim.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            Every entry cites the real arXiv paper. Original authors retain credit. CC-BY 4.0 for our commentary. No paper reproduced beyond fair-use quote.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-8">
          {PAPERS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/research/decoded/${p.slug}`}
              className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-8 transition-colors hover:border-[#22F0D5]/40"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")} · {p.year}
                </p>
                <p className="font-mono text-[11px] text-[#9BA5A7]">arXiv:{p.arxiv}</p>
              </div>
              <h2 className="mt-4 text-2xl font-medium tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-[#FFB87A]">{p.authors}</p>
              <p className="mt-5 max-w-[64ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
                <span className="text-[#22F0D5]">In one sentence: </span>
                {p.onesentence}
              </p>
              <p className="mt-3 max-w-[64ch] text-[14px] leading-[1.65] text-[#9BA5A7]">
                <span className="text-[#E7EBED]">Why it matters: </span>
                {p.matters}
              </p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                Decode the paper →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            How we read them
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six questions per paper.
          </h2>
          <ol className="mt-10 space-y-5 max-w-[64ch]">
            <li className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>01</span>
              <p className="text-[15px] leading-[1.7] text-[#C8CCCE]"><span className="text-[#F2F4F5]">What is this paper&apos;s one sentence?</span> The actual claim, in plain English.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>02</span>
              <p className="text-[15px] leading-[1.7] text-[#C8CCCE]"><span className="text-[#F2F4F5]">Why does this matter to a normal person?</span> The concrete consequence beyond the lab.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>03</span>
              <p className="text-[15px] leading-[1.7] text-[#C8CCCE]"><span className="text-[#F2F4F5]">What did the scientists actually do?</span> The method, translated. No equations.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>04</span>
              <p className="text-[15px] leading-[1.7] text-[#C8CCCE]"><span className="text-[#F2F4F5]">What do they know but don&apos;t say?</span> The implicit knowledge between the lines.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>05</span>
              <p className="text-[15px] leading-[1.7] text-[#C8CCCE]"><span className="text-[#F2F4F5]">What does this paper NOT claim?</span> Honest read on the hype-vs-reality boundary.</p>
            </li>
            <li className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>06</span>
              <p className="text-[15px] leading-[1.7] text-[#C8CCCE]"><span className="text-[#F2F4F5]">Where do I read the original?</span> Direct arXiv link, plus what to read next.</p>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
