import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AlphaGo — How DeepMind Cracked Go and Ended a 2,500-Year-Old Frontier · Research / Decoded · AtomEons",
  description: "DeepMind built a Go-playing program that combined deep neural networks trained on human games with reinforcement learning self-play and Monte Carlo tree search, and in March 2016 it beat 18-time world champion Lee Sedol 4-1 in Seoul — twenty years earlier than expert forecasters predicted.",
  alternates: { canonical: "https://atomeons.com/research/decoded/alphago" },
  openGraph: {
    title: "AlphaGo — How DeepMind Cracked Go and Ended a 2,500-Year-Old Frontier",
    description: "DeepMind built a Go-playing program that combined deep neural networks trained on human games with reinforcement learning self-play and Monte Carlo tree search, and in March 2016 it beat 18-time world champion Lee Sedol 4-1 in Seoul — twenty years earlier than expert forecasters predicted.",
    url: "https://atomeons.com/research/decoded/alphago",
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
          <span className="text-[#1A2225]">/</span> {`AlphaGo — How DeepMind Cracked Go and Ended a 2,500-Year-Old Frontier`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`David Silver, Aja Huang, Chris J. Maddison, Arthur Guez, Laurent Sifre, George van den Driessche, Julian Schrittwieser, Ioannis Antonoglou, Veda Panneershelvam, Marc Lanctot, Sander Dieleman, Dominik Grewe, John Nham, Nal Kalchbrenner, Ilya Sutskever, Timothy Lillicrap, Madeleine Leach, Koray Kavukcuoglu, Thore Graepel, Demis Hassabis — Google DeepMind — January 2016 · Nature 529, 484–489 (28 January 2016); doi:10.1038/nature16961`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`AlphaGo — How DeepMind Cracked Go and Ended a 2,500-Year-Old Frontier`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`DeepMind built a Go-playing program that combined deep neural networks trained on human games with reinforcement learning self-play and Monte Carlo tree search, and in March 2016 it beat 18-time world champion Lee Sedol 4-1 in Seoul — twenty years earlier than expert forecasters predicted.`}
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
              {`2. What the scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`They combined three ingredients that nobody had stacked together at this scale before.

**Ingredient one — policy networks.** They trained a deep convolutional neural network on 30 million board positions from games played by strong human amateurs on the KGS Go server. The network learned to predict, given a board, what move a strong human would play next. This was supervised learning — show the network millions of examples, let it pattern-match. It hit roughly 57% prediction accuracy. That alone, with no search, was already strong enough to beat earlier Go programs.

**Ingredient two — self-play reinforcement learning.** They took the human-trained policy network and had it play millions of games against earlier versions of itself, using the win/loss outcome as the training signal. Moves that led to wins got reinforced; moves that led to losses got down-weighted. After self-play, the policy network beat its own human-trained predecessor 80% of the time.

**Ingredient three — value networks and Monte Carlo tree search.** A separate "value network" learned to look at a position and estimate the probability of winning from there — replacing the slow random rollouts that earlier Go programs depended on. At match time, AlphaGo ran Monte Carlo tree search: it expanded a tree of possible future moves, used the policy network to pick which branches were worth exploring, and used the value network plus fast rollouts to estimate how good each leaf position was. The system ran on a distributed cluster — the version that played Lee Sedol used roughly 1,202 CPUs and 176 GPUs.

The crucial move in game 2 against Lee Sedol — move 37, the famous shoulder-hit on the fifth line — was calculated by AlphaGo to be a move a human professional would play with probability roughly 1 in 10,000. Lee Sedol left the room for fifteen minutes to recover. Commentators called it "not a human move." It won the game.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`3. What scientists know but rarely say out loud`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- AlphaGo lost game 4 to Lee Sedol. After Lee's "divine move" 78, AlphaGo's evaluation collapsed and it played increasingly broken moves. The system was not robust under out-of-distribution pressure — a known weakness of value-network-based evaluation that the team has since acknowledged.
- The human-game supervised pretraining was not strictly necessary, as AlphaZero later proved by reaching superhuman Go from scratch with no human data. But in 2016, without that pretraining, the project would not have hit Nature in time.
- Compute was load-bearing. The single-machine version of AlphaGo was strong but not Lee-Sedol-strong. The distributed version with thousands of cores was what won. Replicating AlphaGo in 2016 required Google-scale infrastructure.
- The match was a research demonstration, not a sterile experiment. The team tuned, patched, and reasoned about specific weaknesses between games. This is normal for a high-stakes engineering project. It is not how a controlled benchmark works.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`4. What the paper does NOT claim`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- It does not claim general intelligence. AlphaGo plays 19×19 Go on a board with fixed rules and a clean win/loss signal. It cannot do anything else.
- It does not claim the system reasons in human-readable steps. The networks output move probabilities and position values. The "why" is opaque.
- It does not claim machines have surpassed humans at strategic thinking. It claims a specific architecture mastered a specific game.
- It does not claim self-play alone is enough. The 2016 version used human games as a starting point. The "from scratch" claim belongs to AlphaZero (Silver et al. 2017), not this paper.
- It does not claim the result generalizes to incomplete-information games like poker, or to games with continuous action spaces, or to anything outside fully observable two-player zero-sum board games.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`5. Read the original`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- Silver et al., *Mastering the game of Go with deep neural networks and tree search*, Nature 529, 484–489 (January 2016). [nature.com/articles/nature16961](https://www.nature.com/articles/nature16961)
- DeepMind official AlphaGo page — match archives, game records, technical context. [deepmind.google/research/projects/alphago](https://deepmind.google/research/projects/alphago/)
- *AlphaGo* documentary (2017, dir. Greg Kohs) — the inside-the-room footage from the Seoul match. Available on YouTube and major streaming platforms.
- Silver et al., *Mastering the game of Go without human knowledge*, Nature 550, 354–359 (October 2017) — the AlphaGo Zero follow-up that removed human game data. [nature.com/articles/nature24270](https://www.nature.com/articles/nature24270)
- Lee Sedol's retirement statement (November 2019) citing AI as an opponent that "cannot be defeated" — primary source on the human impact of the match.`}
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
