import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/scaling-laws — how big models get + why it matters.
 *
 * Foundational atlas surface. The Kaplan/Hoffmann/Chinchilla scaling-law
 * lineage, the compute-optimal training story, the implications for
 * 2026 frontier-model economics.
 */

export const metadata: Metadata = {
  title: "Scaling laws · how big models get + why it matters · /learn/atlas/scaling-laws · AtomEons",
  description:
    "Kaplan et al. (2020). Hoffmann/Chinchilla (2022). The compute-optimal training discovery. The flops-parameters-tokens relationship. Why 2024-2026 frontier models look the way they do. Public sources only.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/scaling-laws" },
  openGraph: {
    title: "Scaling laws · the atlas",
    description: "Kaplan, Chinchilla, compute-optimal training. Why frontier models look the way they do.",
    url: "https://atomeons.com/learn/atlas/scaling-laws",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const MILESTONES = [
  {
    year: "2020-01",
    name: "Kaplan et al. · Scaling Laws for Neural Language Models",
    body: "OpenAI paper that established empirical power-law relationships between model size (parameters), dataset size (tokens), and compute used (FLOPs). Showed that loss decreases as a power law in each variable when the others are not bottlenecks. Underlying claim: scale is the dominant lever for language modeling improvement. Established the field's core question: how to allocate a fixed compute budget across N (params), D (tokens), and C (FLOPs).",
    contribution: "Showed scaling is power-law. Established N × D × FLOPs as the fundamental variables. Underestimated optimal D substantially (this got corrected by Chinchilla).",
  },
  {
    year: "2022-03",
    name: "Hoffmann et al. · Training Compute-Optimal Large Language Models (Chinchilla)",
    body: "DeepMind paper that re-ran Kaplan's analysis with a wider sweep and identified that prior models (GPT-3, Gopher) had been substantially undertrained on data relative to parameter count. Trained a 70B parameter model (Chinchilla) on 1.4T tokens and matched the much-larger 280B Gopher's performance. Established the now-canonical rule: ~20 tokens of training data per parameter is approximately compute-optimal under fixed FLOPs budget.",
    contribution: "Reset the field. Every frontier lab post-2022 trained much larger D/N ratios. Established the '20 tokens per parameter' rule of thumb. Largely retired the 'big model + few tokens' approach that dominated 2020-2021.",
  },
  {
    year: "2022+",
    name: "Inference-aware revisions to Chinchilla optimality",
    body: "Researchers (Touvron et al. with Llama, then many others) noted that Chinchilla's compute optimality assumes training is the only cost. In production, inference compute often dominates total system cost. This means it's often economically optimal to train SMALLER models on MORE tokens (past the Chinchilla 20-tokens-per-param point), trading worse training-compute efficiency for better inference economics. Llama 2 trained 7B and 13B models on 2T tokens (~150-300 tokens/param). Llama 3 8B trained on 15T tokens (~1900 tokens/param). This is sometimes called 'overtraining' — but it's the right call when inference is most of the cost.",
    contribution: "Established that compute-optimal under training is not the same as economically-optimal under deployment. Reshaped the smaller-but-overtrained model strategy that defines 2023-2026 frontier-open-weight releases.",
  },
  {
    year: "2024-2025",
    name: "Inference-time scaling laws (o1, o3, Deepseek-R1)",
    body: "OpenAI's o1 (Sep 2024) demonstrated that scaling compute used at inference time (long chain-of-thought reasoning) improves performance on reasoning benchmarks (AIME, GPQA) in a power-law manner — separate from train-time scaling. DeepSeek-R1 (Jan 2025) showed this pattern works on a public open-weights model. The field now has TWO scaling axes: pretraining compute (the Kaplan-Chinchilla axis) and inference compute (the o1 axis).",
    contribution: "Opened a second scaling dimension. Frontier labs in 2025-2026 invest heavily in both. Has major implications for inference-cost-per-task economics.",
  },
];

const IMPLICATIONS = [
  {
    title: "Why GPT-5 / Claude 5 / Gemini 3 won't be 10× bigger",
    body: "The 2020 trajectory implied frontier models in 2024-2026 would be 10-100× larger than GPT-3 (175B). They're not — Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro are widely estimated at similar or smaller parameter counts than GPT-4 (which itself was estimated mid-2024 leaks at ~1.8T total / ~280B active in MoE). The compute went into MORE TOKENS, not more parameters. Chinchilla + inference economics drove the change.",
  },
  {
    title: "Why open-weight models keep being smaller but performing better",
    body: "Llama 3.1 70B beats GPT-3 175B on most benchmarks while being 60% smaller. This isn't magic — it's because Llama 3 was trained on 15T tokens (~50× more data than GPT-3's 300B). The marginal value of more parameters fell faster than the marginal value of more data. Open-weight scene has aggressively exploited this.",
  },
  {
    title: "Why training a 'frontier' model is now $100M-$1B+",
    body: "Even though models aren't 10× larger by parameter count, they ARE 10× more compute by FLOPs because of the longer training runs on more tokens. GPT-4 training cost estimated at ~$100M by Sam Altman public statements. Llama 3.1 405B training reportedly used 30M GPU-hours on H100s. Gemini Ultra training estimated at $190M+ by SemiAnalysis. The barrier to frontier is substantially compute, not labor — and that has structural implications for who can train frontier models.",
  },
  {
    title: "What 'compute-optimal' means in 2026",
    body: "There's no longer one answer. Train-compute-optimal (Chinchilla) wants ~20 tokens per parameter. Inference-economically-optimal (Llama 3 pattern) wants 100-2000+ tokens per parameter. Test-time-compute-optimal (o1 pattern) wants long inference traces on a smaller-or-equal-sized model. The right answer depends on whether you're paying for training once or inference forever.",
  },
  {
    title: "Why scaling laws don't predict capability jumps",
    body: "Scaling laws describe how loss decreases smoothly with compute. They do NOT predict at what compute level a model will suddenly gain a capability (like in-context learning, multi-step reasoning, programming proficiency). The relationship between loss and capability is non-linear and discontinuous in places. 'Emergent capabilities' (Wei et al. 2022) is the term for this, though that paper itself has been challenged on whether emergence is real or measurement-artifact.",
  },
];

const FURTHER_READING = [
  { title: "Scaling Laws for Neural Language Models", authors: "Kaplan, McCandlish, Henighan, et al. (OpenAI)", url: "https://arxiv.org/abs/2001.08361", year: "2020" },
  { title: "Training Compute-Optimal Large Language Models", authors: "Hoffmann, Borgeaud, Mensch, et al. (DeepMind)", url: "https://arxiv.org/abs/2203.15556", year: "2022" },
  { title: "Emergent Abilities of Large Language Models", authors: "Wei, Tay, Bommasani, et al.", url: "https://arxiv.org/abs/2206.07682", year: "2022" },
  { title: "Are Emergent Abilities of Large Language Models a Mirage?", authors: "Schaeffer, Miranda, Koyejo (Stanford)", url: "https://arxiv.org/abs/2304.15004", year: "2023" },
  { title: "Llama 3 technical report (includes overtrained-pattern discussion)", authors: "Meta AI", url: "https://arxiv.org/abs/2407.21783", year: "2024" },
  { title: "DeepSeek-R1 (inference-time scaling proven on open weights)", authors: "DeepSeek-AI", url: "https://arxiv.org/abs/2501.12948", year: "2025" },
  { title: "Chinchilla's Wild Implications (Henighan blog)", authors: "Tom Henighan", url: "https://www.lesswrong.com/posts/6Fpvch8RR29qLEWNH/chinchilla-s-wild-implications", year: "2022" },
];

export default function AtlasScalingLawsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="atlas-training" alt="Vast top-down architectural shot of an empty server room — where training actually happens." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> Scaling laws
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Scaling laws · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            How big models get,{" "}
            <span style={{ color: ACCENT }}>and why it matters.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Six years of scaling-law research, in plain English. The Kaplan → Chinchilla → inference-aware → o1-style-test-time arc. The page that finally lets you ask: how big should this model be, on how many tokens, for how much compute, and why does the answer change depending on whether you&apos;re paying for training once or inference forever.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Four milestones
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The arc, in four papers.
          </h2>
          <div className="mt-10 space-y-10">
            {MILESTONES.map((m, i) => (
              <article key={m.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")} · {m.year}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                    {m.name}
                  </h3>
                </div>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{m.body}</p>
                <p className="mt-4 max-w-[62ch] rounded-lg border border-[#22F0D5]/20 bg-[#0e2520]/30 p-4 text-[14px] leading-[1.65] text-[#C8CCCE]">
                  <span className="font-medium text-[#22F0D5]">Contribution: </span>{m.contribution}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            What this means for 2026
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five implications.
          </h2>
          <div className="mt-10 space-y-10">
            {IMPLICATIONS.map((imp) => (
              <article key={imp.title}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                  {imp.title}
                </h3>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{imp.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#9BA5A7]">Sources</h2>
          <ol className="mt-6 divide-y divide-[#1A2225]/60">
            {FURTHER_READING.map((r, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                <span className="font-mono text-[11px] tracking-[0.08em] tabular-nums pt-0.5" style={{ color: ACCENT }}>
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <div>
                  <p className="text-[15px] leading-[1.6] text-[#C8CCCE]">{r.title}</p>
                  <p className="mt-1 text-[12px] text-[#9BA5A7]">{r.authors} · {r.year}</p>
                  <a href={r.url} target="_blank" rel="noopener" className="mt-1 inline-block break-all font-mono text-[11px] text-[#9BA5A7] hover:text-[#22F0D5]">
                    {r.url} ↗
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/training" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              How training actually works →
            </Link>
            <Link href="/learn/atlas/moe" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Mixture of experts →
            </Link>
            <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← atlas index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
