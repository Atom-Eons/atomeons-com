import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AlexNet · decoded · AtomEons",
  description:
    "Krizhevsky, Sutskever, Hinton 2012 — the paper that started the modern deep learning era. ImageNet classification with deep convolutional neural networks. Plain English.",
  alternates: { canonical: "https://atomeons.com/research/decoded/alexnet" },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research" className="hover:text-[#22F0D5]">Research</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/decoded" className="hover:text-[#22F0D5]">Decoded</Link>{" "}
          <span className="text-[#1A2225]">/</span> AlexNet
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2012 · NIPS Conference Paper · Krizhevsky, Sutskever, Hinton · University of Toronto
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The paper that{" "}
            <span style={{ color: ACCENT }}>started everything.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            Three Toronto researchers used graphics-card chips and a deep neural network to crush every competitor at image recognition by such a margin that the entire computer vision field abandoned its prior methods within twelve months.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              01 · Why this matters to your life
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Modern AI exists because of this paper. Not as hyperbole — literally. Before 2012, &ldquo;neural networks&rdquo; was a fringe academic interest most computer scientists dismissed as a failed 1980s idea. After this paper, neural networks were the only thing serious researchers worked on.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Every face-unlock on your phone, every photo-sort in Google Photos, every Tesla&apos;s autopilot vision stack, every modern AI image model — all of it traces directly back to AlexNet&apos;s ImageNet win in September 2012. Geoff Hinton, the senior author, won the 2018 Turing Award (the &ldquo;Nobel Prize of computing&rdquo;) largely for this work. He won the actual 2024 Nobel Prize in Physics for closely related foundational work. Ilya Sutskever went on to co-found OpenAI. Alex Krizhevsky has been mostly quiet since.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              They entered the ImageNet competition — a benchmark where AIs had to look at photographs and label what was in them (cats, dogs, cars, jellyfish, 1000 categories). The previous year&apos;s best result was around 26% top-5 error. Everyone was using hand-engineered feature extractors plus simple classifiers. Hard ceiling, slow progress.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The Toronto team did three things differently. First, they used a deep convolutional neural network — eight layers, with the early layers detecting edges + textures and later layers combining those into shapes + objects. Second, they trained it on consumer-grade Nvidia GTX 580 graphics cards, which were fast enough to make training tractable on the 1.2-million-image dataset. Third, they used a few engineering tricks (ReLU activations, dropout regularization, GPU parallelism) that the field then adopted universally.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The result was 15.3% top-5 error — about a 10-point improvement over the previous best. In a field that had been improving by single digits per year, this was a single-step generational leap. The 2013 competition had basically everyone using neural networks. The 2014 competition was won by an even deeper one. The field never went back.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              AlexNet&apos;s breakthrough was not the architecture. CNNs had been around since Yann LeCun&apos;s work in the late 1980s. The breakthrough was that Krizhevsky figured out how to actually train one at meaningful scale on GPU hardware. The engineering — not the theory — was the unlock.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The unstated cultural impact: AlexNet established &ldquo;scale up the compute and the model gets dramatically better&rdquo; as the empirical pattern that would later motivate the Scaling Laws paper of 2020. Hinton himself has said publicly multiple times that the lesson of AlexNet was not about CNNs specifically — it was about the value of throwing more compute at neural networks until they work.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The other thing scientists know: this paper is the proof point that whole research fields can be wrong, in unison, for decades. The neural network skeptics of 1990-2010 were not stupid. They had reasonable arguments based on the limits of contemporary hardware. They were just empirically wrong about what scale-up would unlock — and the entire computer vision community was on the wrong side of that bet for twenty years.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              AlexNet does not claim to understand images. It claims to classify them. The model has no concept of what a cat is — it has learned a mathematical function that takes pixel values in and produces a probability over 1000 labels out. The leap from &ldquo;reliably labels images&rdquo; to &ldquo;sees and understands&rdquo; was made by a generation of follow-up papers, and arguably it is still not complete in 2026.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              AlexNet also does not generalize beyond its training distribution well. If you show it an object it has never seen before — or even a familiar object in unusual lighting — it can fail in ways a human child never would. Robust generalization is still one of the open problems in computer vision. AlexNet was the start, not the destination.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">NIPS 2012 paper</a> — the original PDF. ~9 pages.</li>
              <li>· <a href="https://image-net.org" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">image-net.org</a> — the dataset the paper used. Still operating in 2026.</li>
              <li>· Stanford CS231n lectures (Karpathy, Li) — the canonical CNN teaching material. Free on YouTube.</li>
              <li>· Then read <Link href="/research/decoded/attention-is-all-you-need" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">Attention Is All You Need</Link> — five years after AlexNet, the transformer paper kicked off the language version of the same revolution.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← decoded index
          </Link>
        </div>
      </section>
    </main>
  );
}
