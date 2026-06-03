import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AlphaZero — One Algorithm Learns Chess, Shogi, and Go From Scratch in Hours · Research / Decoded · AtomEons",
  description: "A single learning algorithm, given only the rules of the game and no human games to study, played millions of games against itself and within hours became the strongest known player at chess, shogi, and Go — demonstrating that a machine can reach superhuman skill in complex domains with zero human strategic knowledge as input.",
  alternates: { canonical: "https://atomeons.com/research/decoded/alphazero" },
  openGraph: {
    title: "AlphaZero — One Algorithm Learns Chess, Shogi, and Go From Scratch in Hours",
    description: "A single learning algorithm, given only the rules of the game and no human games to study, played millions of games against itself and within hours became the strongest known player at chess, shogi, and Go — demonstrating that a machine can reach superhuman skill in complex domains with zero human strategic knowledge as input.",
    url: "https://atomeons.com/research/decoded/alphazero",
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
          <span className="text-[#1A2225]">/</span> {`AlphaZero — One Algorithm Learns Chess, Shogi, and Go From Scratch in Hours`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`David Silver, Thomas Hubert, Julian Schrittwieser, Ioannis Antonoglou, Matthew Lai, Arthur Guez, Marc Lanctot, Laurent Sifre, Dharshan Kumaran, Thore Graepel, Timothy Lillicrap, Karen Simonyan, Demis Hassabis — DeepMind, London, December 2017 · arXiv:1712.01815 (preprint Dec 2017) · later published as Silver et al., *Science* 362, 1140-1144 (Dec 2018) under the title "A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play"`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`AlphaZero — One Algorithm Learns Chess, Shogi, and Go From Scratch in Hours`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`A single learning algorithm, given only the rules of the game and no human games to study, played millions of games against itself and within hours became the strongest known player at chess, shogi, and Go — demonstrating that a machine can reach superhuman skill in complex domains with zero human strategic knowledge as input.`}
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
              {`Three ingredients, mixed in a specific way:

**(a) A single neural network with two heads.** They built one deep convolutional residual network that, given a board position, outputs two things at once: a *policy* (a probability distribution over moves — "where would I tend to play here?") and a *value* (a single number from -1 to +1 estimating who is winning).

**(b) Monte Carlo Tree Search guided by that network.** Classical chess engines like Stockfish search millions of positions per second using hand-coded evaluation functions. AlphaZero searches far fewer — about 80,000 positions per second in chess versus Stockfish's roughly 70 million — but each evaluation is the neural network's learned judgment, not a hand-tuned formula. MCTS uses the policy head to decide which branches are worth exploring and the value head to score the leaves.

**(c) Self-play, then learn from the outcomes.** AlphaZero plays itself. The MCTS-guided moves are stronger than the raw network's first-instinct moves, because search corrects mistakes. After each game, the network is updated so its raw outputs move closer to what MCTS chose, and its value predictions move closer to the actual game outcome. Better network → better MCTS → better self-play games → better training data → better network. The loop tightens.

They ran this loop on 5,000 first-generation TPUs to generate the games and 64 second-generation TPUs to train the network. Total wall-clock training time: 9 hours (chess), 12 hours (shogi), 13 days (Go). Then they tested it against the reigning champion programs in 100-game matches: AlphaZero won or drew every match.`}
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
              {`- **The compute is the moat.** "9 hours" sounds democratizing. It is not. Those nine hours used thousands of TPUs in parallel — likely millions of dollars of hardware running flat out. Reproducing AlphaZero on a laptop would take centuries. The Leela Chess Zero project replicated the result with distributed volunteer compute over years, not hours.
- **"From scratch" means "from the rules."** The system was given the rules of chess, the legal moves, win/loss/draw conditions, and a board representation. That is a substantial human prior. It is not the same as discovering chess on its own.
- **It mostly only works in closed, perfect-information, fully-simulatable worlds.** Self-play is brutal in games where the rules are fixed, the state is visible, and you can simulate a billion games. The real world is none of those things. Successors like MuZero (2019, learn the rules too) and AlphaStar (StarCraft, partial information) chipped away at this, but the basic limitation — you need a simulator — defines what self-play can and cannot reach.
- **The playing style is genuinely different.** Stockfish plays like a calculator. AlphaZero plays like something else — sacrificing material for long-term positional pressure, accepting weakened pawn structures for piece activity, generally choosing positions over precision. Grandmasters who studied its games described the play as "alien" but recognizably principled. Magnus Carlsen, Vladimir Kramnik, and Matthew Sadler have all written about AlphaZero's chess as a new aesthetic.
- **AlphaZero is not the same engine as the one in the 2018 Science paper.** The original December 2017 preprint reported some match conditions that critics (notably the Stockfish team) called unfair — Stockfish was running on different hardware, with fixed time per move, no opening book, and an older version. The 2018 *Science* version re-ran with corrected conditions. AlphaZero still won, but by smaller margins. Always cite the 2018 paper for the final numbers.`}
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
              {`- It does not claim AlphaZero learns games "the way humans do." Humans learn from a handful of games and a teacher. AlphaZero played tens of millions of games against itself.
- It does not claim general intelligence or transfer learning. Each game required a separate training run from scratch. The chess network does not know shogi.
- It does not claim Stockfish or Elmo are weak. They are still extraordinary programs. The claim is narrower: a learned approach reached the same skill ceiling without human strategic input.
- It does not claim self-play works in every domain. Closed, deterministic games with clear win/loss signals are the friendly case. The paper is silent on language, vision, robotics, and partial-information games.
- It does not claim the algorithm is novel in every component. The novelty is the *combination* — MCTS + a single policy/value net + self-play with no human data + the same code generalizing across three games. Each piece had precedents; gluing them this way did not.`}
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
              {`1. **AlphaZero preprint (Dec 2017)** — Silver et al., "Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm," arXiv:1712.01815. https://arxiv.org/abs/1712.01815
2. **AlphaZero in Science (Dec 2018)** — Silver et al., "A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play," *Science* 362(6419): 1140-1144. DOI: 10.1126/science.aar6404
3. **AlphaGo Zero predecessor (Oct 2017)** — Silver et al., "Mastering the game of Go without human knowledge," *Nature* 550: 354-359. The direct ancestor; AlphaZero generalized this approach to chess and shogi.
4. **DeepMind blog post + open-sourced game archive** — https://deepmind.google/discover/blog/alphazero-shedding-new-light-on-chess-shogi-and-go/ — includes 210 published AlphaZero vs Stockfish games that grandmasters have annotated extensively.
5. **Game Changer (2019)** — Matthew Sadler & Natasha Regan. A grandmaster + WIM book-length analysis of how AlphaZero actually plays. The best non-technical companion to the paper for understanding why the result mattered to the chess world. New In Chess publishers.`}
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
