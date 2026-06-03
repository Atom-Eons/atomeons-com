import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Generative Adversarial Networks · Research / Decoded · AtomEons",
  description: "Two neural networks compete — one tries to forge realistic data, the other tries to spot the forgery — and the forger gets so good that its fakes become indistinguishable from real samples.",
  alternates: { canonical: "https://atomeons.com/research/decoded/gans" },
  openGraph: {
    title: "Generative Adversarial Networks",
    description: "Two neural networks compete — one tries to forge realistic data, the other tries to spot the forgery — and the forger gets so good that its fakes become indistinguishable from real samples.",
    url: "https://atomeons.com/research/decoded/gans",
    type: "article",
  },
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
          <Link href="/research/decoded" className="hover:text-[#22F0D5]">Research / Decoded</Link>{" "}
          <span className="text-[#1A2225]">/</span> {`Generative Adversarial Networks`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville, Yoshua Bengio — Université de Montréal — June 2014 · arXiv:1406.2661`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Generative Adversarial Networks`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Two neural networks compete — one tries to forge realistic data, the other tries to spot the forgery — and the forger gets so good that its fakes become indistinguishable from real samples.`}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          <article key={0}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`01`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`What scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Goodfellow set up a game between two neural networks.

**The Generator (G)** is given random noise — basically a vector of random numbers — and has to turn it into something that looks like a real image (or real data of any kind). It starts out producing pure garbage.

**The Discriminator (D)** is given either a real image from the training set or a fake one from G. Its job is to output a probability — how likely is this real?

Both networks train at the same time. D gets better at spotting fakes. G gets better at fooling D. The mathematical setup is a minimax game: G is trying to minimize the same loss function D is trying to maximize. In theory, the equilibrium point — where neither side can improve — is reached when G's output distribution exactly matches the real data distribution and D is reduced to guessing 50/50.

Goodfellow proved this convergence point exists mathematically. He then trained the system on MNIST handwritten digits, the Toronto Face Database, and CIFAR-10. The samples were recognizable as digits and faces but blurry and limited. The contribution was the *framework*, not the picture quality.

Crucially, the training procedure alternates: a few steps of training D, then a step of training G, then back to D. The generator never sees the real data directly. It only learns from D's gradient — the signal "here is which direction makes me more fooled."

The whole training loop fits on roughly one page of pseudocode. That economy is part of why the idea spread so fast.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`What scientists know but rarely say`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`GANs are notoriously hard to train. The original paper is honest about this in a quiet way, but the difficulty became a research-community open secret for years afterward.

**Mode collapse.** The generator often finds one or two outputs that fool the discriminator and just produces those over and over. Train a GAN on a face dataset and you might get one slightly-varying face instead of a diverse population. Fixing this took years of follow-up papers (Wasserstein GAN, spectral normalization, gradient penalty).

**No likelihood, no evaluation metric.** Unlike most statistical models, GANs do not give you a probability of "how likely is this sample." You cannot ask the model "how good are you?" in a principled way. The field invented metrics like Fréchet Inception Distance years later, and they are all proxies.

**Training is unstable by default.** The minimax objective creates oscillations. The discriminator wins → no gradient for the generator. The generator wins → discriminator becomes useless. Many published "GAN improvements" were really just engineering tricks to keep training from diverging.

**Diffusion models won.** Since roughly 2021–2022, denoising diffusion has eaten GANs' lunch on image generation quality. Most state-of-the-art image generators today (Stable Diffusion, DALL-E 3, Midjourney) are not GANs. GANs are still used — they are fast at inference time, which matters for real-time applications — but they are no longer the frontier for raw quality. This paper is now ancestral, not current state-of-the-art.

**The 2014 results were not photorealistic.** The famous "this person does not exist" faces came from StyleGAN2 in 2019, after five years of architectural work, regularization improvements, and large-scale curated face datasets. The original GAN paper showed a *proof of concept*, not a product.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`What the paper does NOT claim`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The paper does not claim GANs produce photorealistic anything. The 2014 samples are deliberately small and acknowledged as preliminary.

It does not claim convergence is achievable in practice. The proof of equilibrium assumes ideal conditions (infinite capacity networks, perfect optimization). Real-world training does not reliably hit equilibrium — the paper notes this explicitly.

It does not claim GANs are the best generative model. It compares to existing methods (variational autoencoders, deep Boltzmann machines, noise-contrastive estimation) and positions GANs as a new option with different tradeoffs — not a winner.

It does not claim anything about deepfakes, face generation, art, copyright, or misuse. The word "deepfake" did not exist yet. The paper is a clean technical contribution that the world later wrapped in a moral panic.

It does not invent adversarial training broadly. Adversarial examples (Szegedy 2013, Goodfellow's own work) and game-theoretic learning are older. This paper invents the specific *generator vs. discriminator* setup for generative modeling.

It does not claim the discriminator's gradient is the only way to train G — the paper proposes a practical heuristic variant (maximize log D(G(z)) instead of minimize log(1 - D(G(z)))) because the original objective has weak gradient when G is bad, and openly notes this is a practical hack rather than the pure theoretical formulation.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Read the original`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`1. Goodfellow et al. 2014, "Generative Adversarial Nets" — the paper itself: https://arxiv.org/abs/1406.2661
2. Radford, Metz, Chintala 2015, "Unsupervised Representation Learning with Deep Convolutional GANs" (DCGAN) — the first GAN that produced clearly recognizable faces and bedrooms: https://arxiv.org/abs/1511.06434
3. Karras et al. 2019, "A Style-Based Generator Architecture for GANs" (StyleGAN) — the architecture behind thispersondoesnotexist.com: https://arxiv.org/abs/1812.04948
4. Arjovsky, Chintala, Bottou 2017, "Wasserstein GAN" — the most-cited fix for training instability: https://arxiv.org/abs/1701.07875
5. Goodfellow's NeurIPS 2016 tutorial, "Generative Adversarial Networks" — author's own retrospective with practical training advice: https://arxiv.org/abs/1701.00160`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← research / decoded index
          </Link>
        </div>
      </section>
    </main>
  );
}
