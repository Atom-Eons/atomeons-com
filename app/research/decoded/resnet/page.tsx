import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deep Residual Learning for Image Recognition · Research / Decoded · AtomEons",
  description: "Stacking more layers had been making neural networks WORSE, not better — He's team fixed it with a one-line architectural trick (skip connections) that let them train a 152-layer network and win the 2015 ImageNet competition.",
  alternates: { canonical: "https://atomeons.com/research/decoded/resnet" },
  openGraph: {
    title: "Deep Residual Learning for Image Recognition",
    description: "Stacking more layers had been making neural networks WORSE, not better — He's team fixed it with a one-line architectural trick (skip connections) that let them train a 152-layer network and win the 2015 ImageNet competition.",
    url: "https://atomeons.com/research/decoded/resnet",
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
          <span className="text-[#1A2225]">/</span> {`Deep Residual Learning for Image Recognition`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun (Microsoft Research Asia), 2015 · arXiv:1512.03385`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Deep Residual Learning for Image Recognition`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Stacking more layers had been making neural networks WORSE, not better — He's team fixed it with a one-line architectural trick (skip connections) that let them train a 152-layer network and win the 2015 ImageNet competition.`}
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
              {`The setup. Image recognition networks in 2014-2015 (VGG, GoogLeNet) had been getting deeper, and accuracy had been climbing — until it stopped. Researchers observed that a 56-layer plain network had HIGHER training error than a 20-layer plain network on CIFAR-10. This is strange. A deeper network should be able to at least copy the shallower one and then learn extra stuff on top. Empirically, it could not. The optimizer got stuck.

The trick. Instead of asking each block of layers to learn a function H(x) that maps input x to a desired output, He et al. asked each block to learn F(x) = H(x) - x — the RESIDUAL, or the difference. Then they added the original input x back at the end: output = F(x) + x. This is implemented as a "shortcut connection" or "skip connection" that bypasses two or three weight layers and lands directly on the output of that block.

Why this matters. If the ideal thing for a block to do is "leave the input alone," a plain network has to learn to approximate the identity function through nonlinear layers — surprisingly hard. A residual block just has to learn F(x) = 0, which is trivial (push the weights toward zero). Skip connections also give gradients a clean highway back to early layers during backpropagation, defeating the vanishing-gradient problem at depth.

The result. They trained networks at 18, 34, 50, 101, and 152 layers on ImageNet. The 152-layer ResNet was 8x deeper than VGG but had fewer parameters and lower error. It won the 2015 ImageNet Large Scale Visual Recognition Challenge (ILSVRC) with a 3.57% top-5 error rate, beating human-level performance on that benchmark for the first time. They also trained a 1,001-layer version on CIFAR-10 just to show it could be done.

The architecture detail that ended up everywhere. The "bottleneck" block — 1x1 convolution to shrink channels, 3x3 convolution to compute, 1x1 to expand back, then add the skip — became the default building block for nearly every successor architecture.`}
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
              {`The original paper framed residual learning as a solution to a "degradation problem" and offered the residual-is-easier-to-learn intuition. Subsequent research showed the story is messier and more interesting.

A 2016 paper by Veit, Wilber, and Belongie ("Residual Networks Behave Like Ensembles of Relatively Shallow Networks") argued that ResNets are not really "deep" in the traditional sense. They effectively behave like an ensemble of many shallow paths. You can delete individual layers from a trained ResNet and accuracy barely changes — that is not what a truly sequential deep network would do.

There is also ongoing debate about whether the skip connection works mainly because (a) it eases the optimization landscape, (b) it preserves identity by default so the network can choose how much computation to add, (c) it makes gradients well-behaved during backprop, or (d) some combination. The honest answer is that no one has a fully closed-form theoretical explanation of why ResNets work as well as they do at the depths they work at. Practitioners ship them anyway because the empirical results are overwhelming.

Batch normalization, introduced just before this paper, was also doing a lot of work to stabilize training. Pure residual connections without batch norm are noticeably harder to train. The two ideas became inseparable in practice.`}
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
              {`- It does not claim that "deeper is always better." Returns diminish past a certain depth on a given dataset; the 1,001-layer CIFAR network was a demonstration, not a recommendation.
- It does not claim residual connections are biologically inspired or related to how the brain works.
- It does not claim to have solved general image understanding. Top-5 ImageNet classification is a constrained benchmark with 1,000 categories of curated photos.
- It does not claim the architecture is optimal. Many variants — ResNeXt, Wide ResNets, DenseNet, Pre-Activation ResNet — improved on it within two years.
- It does not claim to explain WHY residual learning is easier to optimize in any rigorous theoretical sense. The justification is empirical and intuitive.
- It does not claim that beating human-level top-5 error on ImageNet means computers "see" or "understand" images the way humans do. Adversarial examples published around the same time made it very clear this is not the case.`}
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
              {`1. **He, K., Zhang, X., Ren, S., & Sun, J. (2015).** *Deep Residual Learning for Image Recognition.* arXiv:1512.03385. https://arxiv.org/abs/1512.03385 — the paper itself, ~12 pages, very readable.

2. **He, K., Zhang, X., Ren, S., & Sun, J. (2016).** *Identity Mappings in Deep Residual Networks.* arXiv:1603.05027. https://arxiv.org/abs/1603.05027 — the follow-up that refines pre-activation residual blocks; standard reference for "why exactly the skip path should be clean."

3. **Veit, A., Wilber, M., & Belongie, S. (2016).** *Residual Networks Behave Like Ensembles of Relatively Shallow Networks.* arXiv:1605.06431. https://arxiv.org/abs/1605.06431 — the paper arguing ResNets are really shallow ensembles in disguise. Important counterpoint to the official story.

4. **Russakovsky, O., et al. (2015).** *ImageNet Large Scale Visual Recognition Challenge.* International Journal of Computer Vision, 115(3), 211-252. https://arxiv.org/abs/1409.0575 — the benchmark ResNet won.

5. **Ioffe, S., & Szegedy, C. (2015).** *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift.* arXiv:1502.03167. https://arxiv.org/abs/1502.03167 — the other half of what made very deep networks trainable.`}
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
