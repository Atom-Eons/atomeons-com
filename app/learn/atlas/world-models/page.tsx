import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "World Models · Atlas · AtomEons",
  description: "World models try to give AI an internal physics — the ability to predict what happens next in the actual world, not just the next token.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/world-models" },
  openGraph: {
    title: "World Models",
    description: "Why the post-LLM bet is on machines that simulate reality, not just text",
    url: "https://atomeons.com/learn/atlas/world-models",
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
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> {`World Models`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            {`Why the post-LLM bet is on machines that simulate reality, not just text`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`World Models`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`World models try to give AI an internal physics — the ability to predict what happens next in the actual world, not just the next token.`}
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
              {`LeCun and JEPA`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Yann LeCun, Meta's chief AI scientist and a Turing Award winner, has been the loudest critic of pure-LLM scaling. His Open Review essays and his 2022 position paper "A Path Towards Autonomous Machine Intelligence" laid out the framework: text-only autoregressive models are a dead end for general intelligence because they are trained to imitate human language, not to model the world.

His proposed alternative is JEPA — Joint Embedding Predictive Architecture. Instead of predicting the next pixel or the next token, JEPA predicts the next latent representation. You take a video, mask out part of it, and train the model to predict an abstract summary of what's missing, not the literal pixels. This sidesteps the problem that dooms generative video models: predicting exact pixels forces the model to hallucinate detail that doesn't matter. Predicting a compact embedding lets it focus on what does.

Meta's V-JEPA and I-JEPA papers (2023, 2024) showed this works on video and images. They learn representations that transfer well to downstream tasks without ever generating a pixel. LeCun's claim is that this is the right inductive bias for building agents that understand cause and effect in the physical world.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Predictive coding — the older idea underneath`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`JEPA isn't out of nowhere. It's a modern instantiation of predictive coding, a neuroscience theory from the 1990s associated with Rajesh Rao, Dana Ballard, and later Karl Friston. The brain is constantly predicting its sensory input, and only the prediction errors propagate upward. Most of what your visual cortex does is suppress signals it already expected.

This framing — intelligence as compression by prediction — has been quietly load-bearing across AI for thirty years. Hinton's Helmholtz machines, Schmidhuber's papers on curiosity and compression, Friston's free energy principle, and now LeCun's JEPA all rhyme. The shared intuition: a system that can predict its sensorimotor stream has learned the structure of its environment, and that structure is what we call understanding.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Robotics — where world models actually have to work`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Talk is cheap. Robots don't get to hallucinate. This is why the most aggressive world-model work is happening at robotics labs.

Tesla Optimus, Figure AI, and 1X Technologies are all building humanoid robots that need to plan multi-step actions in cluttered physical environments. The dominant approach has shifted from hand-engineered control to learned policies, and the bottleneck is data. You can't pretrain on the entire internet for embodied tasks. So these labs are doing two things: building massive teleoperation pipelines to collect demonstration data, and training world models that let robots plan in imagination instead of in the real world.

The pattern: a robot equipped with a good world model can try a thousand candidate actions inside its own head, score them, and execute only the best one. This is essentially what AlphaGo did with Monte Carlo Tree Search, except the model of the world is learned rather than given. Tesla has publicly described training a "world simulator" on Optimus video. Figure's Helix architecture combines a vision-language reasoning module with a fast motor controller, with implicit world-model structure in between. 1X has shown autonomous home navigation that clearly involves predictive forward models.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Genie — DeepMind's generative world model line`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`DeepMind has taken the world-model bet in a different direction. Genie (2024) and Genie 2 (late 2024) and Genie 3 (2025) are generative interactive environments. You give the model an image — a single frame, sometimes a hand-drawn sketch — and it generates a playable world from it. You can press arrow keys, walk around, interact with objects, and the model produces consistent, controllable video in real time.

This is striking for two reasons. First, the model has clearly learned implicit physics: objects fall, water flows, doors block movement. Second, it's a foundation model for environments — instead of training agents in hand-built simulators, you can generate the simulator itself from a prompt. Genie 3 in particular pushed coherence over minutes rather than seconds, which is the regime where this stops being a demo and starts being useful for agent training.

OpenAI's Sora, Google's Veo, and Runway's Gen-3 are sometimes pitched as world models, but most researchers distinguish them: those are video generators optimized for visual quality, not necessarily for action-conditioned consistency. The world-model crown is whoever can let you steer the future of the video and have physics hold up.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`05`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Why text-only LLMs hit a ceiling`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The provocation underneath all of this: GPT-4, Claude, Gemini are extraordinary at text and increasingly at images, but they have never been embodied. They know about gravity from billions of words written about gravity. They don't know it the way a toddler who dropped a spoon knows it.

This shows up in concrete failures. LLMs are weirdly bad at spatial reasoning, at counting objects in cluttered scenes, at predicting how an unfamiliar tool will behave, at any task where the right answer requires running a mental simulation rather than retrieving a pattern. They confabulate confidently about physical scenarios because they've never been corrected by reality.

The world-model bet is that closing this gap requires training paradigms where the model is grounded — either through video at massive scale, through robot data, through interactive environments like Genie, or through some combination. Pure next-token prediction on text has, in this view, an asymptote.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`06`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The post-LLM bet`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Not everyone buys it. The scaling camp argues that LLMs will continue to improve, that multimodal training is folding in vision and video naturally, and that world models are an elaborate name for "video prediction with extra steps." They point to GPT-4's emergent physical reasoning and to the fact that text contains more world structure than skeptics credit.

The world-model camp, led by LeCun but increasingly populated by robotics labs and DeepMind, argues that the next leap won't come from bigger text models. It will come from systems that learn the structure of the world the way animals do — through prediction, through action, through being wrong about reality and adjusting.

Both bets are being made simultaneously with enormous capital. The next few years will tell us which one was right, or whether — as is usually the case in AI — both turn out to be partially correct and the real architecture is something neither side has named yet.`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← atlas index
          </Link>
        </div>
      </section>
    </main>
  );
}
