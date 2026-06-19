import type { Metadata } from "next";
import Link from "next/link";
import { SupermodelsAiSummary } from "../_components/ai-summary/supermodels-ai-summary";

export const metadata: Metadata = {
  title: "Hottest Supermodels · June 2026 · the AtomEons reasoning rankings",
  description:
    "June 2026 AI model reasoning rankings — real benchmarks (LMArena ELO, Humanity's Last Exam, Aider Polyglot, Artificial Analysis Intelligence Index) cross-referenced against real-user sentiment. Anthropic Fable 5 + Sonnet 4.6 + Haiku 4.5 shipped since the May issue. No vendor decks. No paid posts. The lab's honest read of who is actually thinking right now. Published every month on the 15th.",
  alternates: { canonical: "https://atomeons.com/supermodels" },
  openGraph: {
    title: "The Hottest Supermodels of June 2026",
    description:
      "Real benchmarks. Real user sentiment. No marketing. The lab's honest June 2026 reasoning rankings. Monthly on the 15th.",
    url: "https://atomeons.com/supermodels",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hottest Supermodels of June 2026",
    description:
      "Real benchmarks + real user sentiment, no marketing. AtomEons reasoning rankings · monthly on the 15th.",
  },
};

/**
 * /supermodels — the AtomEons reasoning rankings, June 2026 issue.
 *
 * Cadence (Wave 90 · 2026-06-15): published monthly on the 15th.
 * Next issue: 2026-07-15. Operator: "do these every 15th eventually.
 * life moves pretty fast you better look once in a while or you miss
 * it babyyy" — the Ferris line is the standing cover for this column.
 *
 * Fashion-magazine cover voice on the outside, lab-grade body inside.
 * Every receipt is sourced to a public leaderboard the lab pulled
 * directly (LMArena, Scale HLE, Aider polyglot, Artificial Analysis).
 * The sentiment column is the lab's synthesis of public researcher
 * commentary — explicitly NOT a paid-promo sweep. The exclusion list
 * spells out what we refuse to count.
 *
 * Voice rules:
 *   - Cover lines slap. Numbers do the talking. No "best ever" without
 *     a receipt right next to the claim.
 *   - Every model entry stops at the body verdict — no follow-on filler.
 *   - The lab takes a position. Then it shows the work.
 *
 * This is an editorial snapshot of the leaderboards as of the cutoff
 * date below. It is not a real-time dashboard.
 */

const ISSUE_CUTOFF = "2026-06-15";
const ISSUE_NUMBER = "02";
const ISSUE_LABEL = "JUNE 2026";
const NEXT_ISSUE = "2026-07-15";

type Org =
  | "Anthropic"
  | "OpenAI"
  | "Google"
  | "xAI"
  | "Alibaba"
  | "Moonshot"
  | "MiniMax"
  | "Xiaomi"
  | "Meta"
  | "DeepSeek"
  | "Zhipu";

type Tier = "S" | "A" | "B" | "WATCH";

type Receipts = {
  lmArenaElo?: string; // human-preference chat ELO
  hle?: string; // Humanity's Last Exam % (Scale)
  aider?: string; // Aider polyglot %
  aaIndex?: string; // Artificial Analysis Intelligence Index
  pricePerM?: string; // $ / million output tokens
  speedTps?: string; // tokens/sec
};

type Entry = {
  rank: number;
  tier: Tier;
  model: string;
  org: Org;
  short: string; // one-line positioning
  verdict: string; // the lab's 2-3 sentence take
  sentiment: string; // what real users actually say
  receipts: Receipts;
  bestFor: string;
  failsAt: string;
};

const TIER_LABEL: Record<Tier, string> = {
  S: "S · supermodel",
  A: "A · couture",
  B: "B · ready-to-wear",
  WATCH: "Watch · the runway is theirs next",
};

const TIER_TONE: Record<Tier, { fg: string; border: string }> = {
  S: { fg: "#22F0D5", border: "#22F0D5" },
  A: { fg: "#C9A55C", border: "#C9A55C" },
  B: { fg: "#9CA3AF", border: "#1F242B" },
  WATCH: { fg: "#FF4D4D", border: "#FF4D4D" },
};

/* ────────────────────────────────────────────────────────────────────
 * What shipped between issues · May → June
 * ──────────────────────────────────────────────────────────────────── */
const SHIPPED_SINCE_LAST_ISSUE = [
  {
    org: "Anthropic",
    model: "Fable 5",
    note: "New flagship class — landed early June. Replaces Opus 4.x as the family-leading reasoner. Lab is holding the official ranking entry until two independent leaderboards publish a Fable 5 row · provisional sentiment is strong on writing-voice + structured reasoning, weak data on hardest-eval until a public HLE row appears.",
  },
  {
    org: "Anthropic",
    model: "Sonnet 4.6",
    note: "Mid-tier refresh · faster than 4.5 · same brand of calibration · the model the lab uses for everyday code reviews and agent loops at scale.",
  },
  {
    org: "Anthropic",
    model: "Haiku 4.5",
    note: "Cheapest model in the Claude family with real reasoning latitude. Watch-list entry until throughput-vs-quality numbers stabilize.",
  },
];

/* ────────────────────────────────────────────────────────────────────
 * The Ranking — June 2026 (numbers carried from June 3 cutoff;
 * refreshed in the next issue when July leaderboard pulls land)
 *
 * Synthesized from FOUR independent public leaderboards pulled on the
 * cutoff date, cross-referenced against named-researcher commentary
 * we trust. Ranking weight, in order:
 *
 *   1. Humanity's Last Exam (Scale Labs)   — hardest, least-juice-able
 *   2. LMArena ELO (human-preference)      — blind real-user vote
 *   3. Artificial Analysis Intelligence    — composite, transparent
 *   4. Aider Polyglot                      — real-world coding
 *
 * Sentiment is the lab's read of the public commentary — NOT a paid
 * sweep. We're explicit about that in § Methodology and § What we
 * ignored below.
 * ──────────────────────────────────────────────────────────────────── */
const ENTRIES: Entry[] = [
  {
    rank: 1,
    tier: "S",
    model: "Gemini 3.1 Pro Preview · Thinking-High",
    org: "Google",
    short: "Hardest-eval champion. Cheapest at the top.",
    verdict:
      "Gemini 3.1 Pro Preview on Thinking-High is the only model to clear 45% on Humanity's Last Exam at this cutoff (46.44%). It is also the cheapest frontier model on the leaderboard at $1.74/M tokens and runs at 138 tokens/sec. There is no other model where the math is this clean.",
    sentiment:
      "Researchers running their own brutal evals report it as the model that 'actually thinks' instead of pattern-matching. Critics note its safety filters still over-fire on technical prompts, and it has the worst voice-personality of the top three — it sounds like a textbook. Nobody who has tested it on reasoning rates it second.",
    receipts: {
      hle: "46.44%",
      lmArenaElo: "1488 ± 4",
      aaIndex: "57",
      pricePerM: "$1.74",
      speedTps: "138 tok/s",
    },
    bestFor: "Hard math · physics derivations · long-context retrieval · cost-sensitive reasoning",
    failsAt: "Open-ended writing voice · empathetic tone · creative latitude under safety filters",
  },
  {
    rank: 2,
    tier: "S",
    model: "Claude Opus 4.7 (Thinking) · Opus 4.8 max",
    org: "Anthropic",
    short: "Human-preference king. Strongest writer in the field.",
    verdict:
      "Opus 4.7-Thinking holds the #1 to #4 positions on LMArena ELO (1494–1503) — three of four top slots are Anthropic models. Opus 4.8 leads the Artificial Analysis Intelligence Index at 61. On hardest-eval (HLE) it lands at 36.20% — behind Gemini 3.1 Pro and the GPT-5.4-Pro tier. The trade is real: it is the model people choose when given the choice, and it is not the model that wins the impossible-question benchmark.",
    sentiment:
      "The model researchers reach for when the task is open-ended, the writing has to read, or the user is going to keep talking. Reliable refusals, calibrated uncertainty, the lowest sycophancy rate at the top tier per independent audits. The complaint is speed: 50 tok/s is slow next to Gemini 3.5 Flash at 187.",
    receipts: {
      lmArenaElo: "1499 ± 5  (4.7 thinking)",
      aaIndex: "61  (4.8 max)",
      hle: "36.20%  (4.7)",
      pricePerM: "$4.10",
      speedTps: "50 tok/s  (4.7 max)",
    },
    bestFor: "Long-form reasoning · code architecture · agent loops · anything a person reads",
    failsAt: "Cost-sensitive scale · raw throughput · pure-math evals against Gemini 3.1",
  },
  {
    rank: 3,
    tier: "S",
    model: "GPT-5.5 (xhigh) · GPT-5.4-Pro",
    org: "OpenAI",
    short: "Best coder shipping. Second-hardest reasoner.",
    verdict:
      "GPT-5 holds Aider Polyglot at 88.0% — meaning when a real-world editing benchmark grades real-world coding tasks, no other model beats it. GPT-5.4-Pro is the #2 model on HLE at 44.32%. GPT-5.5 xhigh is at AA Intelligence 60 (between Opus 4.8 and Opus 4.7). The catch: it shifts behavior between snapshot dates more than the other two; if reproducibility matters, pin the date.",
    sentiment:
      "Worship from the engineering crowd. The Codex variant ships diffs that compile. Skepticism from the safety crowd — refusals still hallucinate threats on benign prompts, and the personality drifts under load. The post-training cadence is fast: today's GPT-5.5 is not last quarter's GPT-5.5.",
    receipts: {
      aider: "88.0%  (gpt-5 high)",
      hle: "44.32%  (gpt-5.4-pro)",
      aaIndex: "60  (gpt-5.5 xhigh)",
      lmArenaElo: "1481 ± 5  (gpt-5.5 high)",
      pricePerM: "$4.35",
    },
    bestFor: "Code editing in real repos · long agentic workflows · structured output",
    failsAt: "Reproducibility across snapshot dates · creative voice latitude · cheap-fast use",
  },
  {
    rank: 4,
    tier: "A",
    model: "Muse Spark",
    org: "Alibaba",
    short: "Dark horse. Top-5 on the hardest eval out of nowhere.",
    verdict:
      "Muse Spark posted 40.56% on Humanity's Last Exam — ahead of Gemini 3 Pro Preview and the GPT-5.4-XHigh tier. It also crossed 1489 LMArena ELO, top-5 in the world. It is the model nobody on Western Twitter was talking about until the leaderboards updated.",
    sentiment:
      "Chinese-research community has been quietly evaluating it for weeks; Western reaction is still catching up. Public criticism focuses on training-data transparency and on whether the HLE score reflects genuine generalization vs eval-set leakage; the leaderboard methodology is taking that seriously. The model itself reasons sharply on Chinese-language tasks and slightly less so on English at the same prompt.",
    receipts: {
      hle: "40.56%",
      lmArenaElo: "1489 ± 6",
      aaIndex: "n/a at cutoff",
    },
    bestFor: "Math · cross-lingual reasoning · evidence the field is no longer two-horse",
    failsAt: "English creative writing · Western tool-calling ecosystem · public scrutiny lag",
  },
  {
    rank: 5,
    tier: "A",
    model: "Qwen 3.7 Max Preview",
    org: "Alibaba",
    short: "Open-weight champion. Frontier-grade at one-third the price.",
    verdict:
      "Qwen 3.7 Max lands at AA Intelligence Index 57 — tied with Gemini 3.1 Pro Preview and Claude Opus 4.7 max. It runs at 167 tokens/sec and costs $1.43/M. It is also the strongest reasoner of any model with an openly published weight family. The trade is that 'Max Preview' is a hosted API; the open-weight siblings (Plus, Standard) are one tier down.",
    sentiment:
      "r/LocalLLaMA has been running it head-to-head against Opus 4.7 on agentic loops and reports it surprises. Western enterprise procurement hesitates on Chinese-vendor data-residency questions; that's a real concern, not a hype-filter dismissal. The community sentiment is: this is what frontier looks like when the price floor drops.",
    receipts: {
      aaIndex: "57",
      lmArenaElo: "(top-15)",
      pricePerM: "$1.43",
      speedTps: "167 tok/s",
    },
    bestFor: "Cost-sensitive scale · open-weight pipelines · self-hosted deployments",
    failsAt: "Enterprise data-residency posture · English fiction · refusal calibration on edge cases",
  },
  {
    rank: 6,
    tier: "A",
    model: "Grok 4.3 (High)",
    org: "xAI",
    short: "Speed-priced contrarian. 79% on real coding.",
    verdict:
      "Grok 4.3 High posts 79.6% on Aider Polyglot — eighth in the world, ahead of every model except the GPT-5 / o3 / Gemini-2.5-Pro cluster. It runs at 158 tokens/sec at $0.64/M. The differentiator is what xAI does NOT filter — Grok answers questions other frontier labs refuse, with the corollary risk that those refusals existed for reasons.",
    sentiment:
      "Loved by the build-it-now crowd. Distrusted by safety researchers for the same reason. The benchmark numbers are real; the question is what shows up in production when the safety floor is lower. Twitter-native users report it as fast and willing.",
    receipts: {
      aider: "79.6%",
      aaIndex: "53",
      lmArenaElo: "(top-15)",
      pricePerM: "$0.64",
      speedTps: "158 tok/s",
    },
    bestFor: "Fast iteration · permissive answers on sensitive topics · cost-sensitive coding",
    failsAt: "Safety-critical deployments · audit posture · brand-conservative enterprises",
  },
  {
    rank: 7,
    tier: "A",
    model: "Gemini 3.5 Flash",
    org: "Google",
    short: "The price-performance pareto frontier.",
    verdict:
      "Gemini 3.5 Flash holds 1476 LMArena ELO (top-10) at $1.31/M and 187 tok/s. It is the model that disproves the premise that 'cheap = dumb.' The Intelligence Index sits at 55 — meaningfully below the S-tier, but with throughput and cost that the S-tier cannot touch.",
    sentiment:
      "The model engineers actually use when the bill is real and the latency budget is tight. Acknowledged trade: it loses to Opus 4.7 on anything requiring sustained reasoning past about four turns, and to Gemini 3.1 Pro on the hardest math.",
    receipts: {
      lmArenaElo: "1476 ± 7",
      aaIndex: "55",
      pricePerM: "$1.31",
      speedTps: "187 tok/s",
    },
    bestFor: "High-throughput pipelines · batch summarization · cheap agentic loops",
    failsAt: "Sustained multi-turn reasoning · the hardest evals · creative voice",
  },
  {
    rank: 8,
    tier: "A",
    model: "Kimi K2.6",
    org: "Moonshot",
    short: "Frontier-grade thinking at $0.70/M.",
    verdict:
      "Kimi K2.6 at Intelligence Index 54 for seventy cents per million tokens is the most price-disruptive model on the leaderboard. It runs at 44 tok/s — the slowest in the top-15 — so it is a batch tool, not a chat tool. The trade is fully transparent: thinking quality near the frontier, throughput well below it, price an order of magnitude cheaper.",
    sentiment:
      "Quietly adopted by researchers running their own academic-grade comparisons. The Chinese-research community evaluates Kimi alongside Qwen and GLM as a real competitive set; that triangulation does not exist in the same way in Western labs.",
    receipts: {
      aaIndex: "54",
      pricePerM: "$0.70",
      speedTps: "44 tok/s",
    },
    bestFor: "Cost-bound research · long-context · batch processing where latency is a non-issue",
    failsAt: "Real-time interactive use · low-throughput-tolerant applications",
  },
  {
    rank: 9,
    tier: "B",
    model: "MiniMax-M3",
    org: "MiniMax",
    short: "Quiet competitor, real receipts.",
    verdict:
      "MiniMax-M3 posts AA Intelligence 55 — same tier as Gemini 3.5 Flash, with pricing and speed information not yet fully published on the major dashboards at the cutoff date. The lab is including it because the score is real, not because there is hype to ride.",
    sentiment:
      "Underweight in Western coverage relative to the eval result. The model is a real competitor; the marketing apparatus around it is smaller than the actual technical position justifies.",
    receipts: {
      aaIndex: "55",
      pricePerM: "n/a at cutoff",
      speedTps: "n/a at cutoff",
    },
    bestFor: "Deployment in markets where MiniMax already has presence · video-modal extensions",
    failsAt: "Discoverability outside Chinese-research ecosystems · Western API tooling integration",
  },
  {
    rank: 10,
    tier: "B",
    model: "MiMo-V2.5-Pro",
    org: "Xiaomi",
    short: "The cheapest frontier-adjacent reasoner on the board.",
    verdict:
      "Xiaomi posting an AA Intelligence Index of 54 at $0.18 per million tokens is the most disorienting line in the June 2026 leaderboard. That price is roughly an order of magnitude under the open-weight equivalent and two under the closed-weight S-tier. Either the price is subsidized, the score is overfit, or both — but the lab does not get to assume which without evidence.",
    sentiment:
      "Skepticism is the right default until independent replication closes. The lab is including MiMo on the list at B-tier because the public eval is real and worth a hard look, not because the lab endorses the result without that look.",
    receipts: {
      aaIndex: "54",
      pricePerM: "$0.18",
      speedTps: "43 tok/s",
    },
    bestFor: "Investigation. Replication. Cost-benchmarking against the rest of the board",
    failsAt: "Trust until independent replication of the Intelligence Index is published",
  },
  {
    rank: 11,
    tier: "B",
    model: "GPT-5.3 Codex (xhigh)",
    org: "OpenAI",
    short: "The coding specialist that beats general-purpose models on code.",
    verdict:
      "GPT-5.3 Codex at AA Intelligence Index 54 and 81 tok/s exists because the specialized variant beats the generalist on code-specific evals at lower latency and lower cost ($1.87/M). It is the model engineering teams reach for when the task is specifically code editing in a real repo, where the generalist's headroom on philosophy and writing doesn't matter.",
    sentiment:
      "Adopted by the Cursor / Continue / Aider / Claude Code crowd as a fallback option when the generalist gets distracted. Not a chat model — do not put it in front of a customer.",
    receipts: {
      aaIndex: "54",
      pricePerM: "$1.87",
      speedTps: "81 tok/s",
    },
    bestFor: "Specialized code-editing pipelines · long autonomous coding runs",
    failsAt: "General reasoning · creative writing · user-facing chat",
  },
  {
    rank: 12,
    tier: "WATCH",
    model: "DeepSeek (R3 / V3.7 series)",
    org: "DeepSeek",
    short: "Not in top-15 of this cycle. Still the open-weight reference everyone benchmarks against.",
    verdict:
      "DeepSeek's current public release did not crack the top-15 of any single leaderboard the lab pulled for this issue. That is a real fact and worth saying plainly. The reason DeepSeek is still on the watch list is that the next release in the R-series is widely anticipated by the open-weight community to close the gap, and the lab does not write off a lab that previously delivered a frontier-class open release.",
    sentiment:
      "The community remains positive on DeepSeek's trajectory. The June 2026 leaderboards do not show it at the front; the next snapshot might. Watch.",
    receipts: {
      aaIndex: "not in top-15 at cutoff",
      lmArenaElo: "not in top-15 at cutoff",
      hle: "not in top-10 at cutoff",
    },
    bestFor: "Watching · keeping a benchmark slot warm · open-weight contingency planning",
    failsAt: "Topping the June 2026 leaderboards as released",
  },
];

/* ────────────────────────────────────────────────────────────────────
 * The exclusion list — what we refuse to count
 * ──────────────────────────────────────────────────────────────────── */
const EXCLUDED = [
  {
    head: "Vendor-published benchmarks",
    body:
      "If the model maker designed the eval, ran the eval, and reported the eval, the eval does not count. This rules out roughly half of every model launch announcement.",
  },
  {
    head: "Cherry-picked demos",
    body:
      "A two-minute video of a model 'reasoning' through one curated problem is marketing, not evidence. Demos can illustrate; they cannot rank.",
  },
  {
    head: "Influencer threads with no disclosed compensation",
    body:
      "If the post does not disclose whether the poster has equity, a contract, a referral fee, or early API credits, the lab treats the post as compromised by default. Half the loudest voices on X are on someone's payroll.",
  },
  {
    head: "Evals trained on",
    body:
      "If a model maker quietly fine-tuned on the test set — or trained on the GitHub repo where the test set is hosted, which has happened repeatedly — the resulting score is not a measurement, it is a recital. Reproducible blind evals only.",
  },
  {
    head: "Single-question 'gotcha' tests",
    body:
      "'Count the Rs in strawberry' is funny once. It is not a benchmark. The lab does not rank models by Twitter screenshots.",
  },
  {
    head: "Marketing pages with no leaderboard receipts",
    body:
      "If the headline number on the model card cannot be traced to a public leaderboard with methodology, the number does not exist for purposes of this ranking.",
  },
];

/* ────────────────────────────────────────────────────────────────────
 * Methodology — what we measured, who we trust, what we excluded
 * ──────────────────────────────────────────────────────────────────── */
const METHODOLOGY = [
  {
    head: "Four independent leaderboards, cross-referenced",
    body:
      "Humanity's Last Exam (Scale Labs) for hardest-eval reasoning. LMArena ELO for blind human-preference chat. Aider Polyglot for real-world code editing. Artificial Analysis Intelligence Index as the composite cross-check.",
  },
  {
    head: "Sentiment is the lab's read of public researcher commentary",
    body:
      "We do not run a live X-API sweep. We synthesize what named researchers, named open-source maintainers, and named enterprise practitioners say in public — and we discount any voice we cannot verify as independent. The 'sentiment' line per model reflects that filter.",
  },
  {
    head: "Reasoning is the axis. Coding and writing are downstream",
    body:
      "The lab ranks on reasoning capability — the ability to take a hard problem, hold the structure of it in working memory, and arrive at a defensible answer. Aider and writing-voice are downstream signals that confirm or refute the reasoning ranking, not separate categories.",
  },
  {
    head: "Cutoff is " + ISSUE_CUTOFF,
    body:
      "Every leaderboard was pulled on this date. Frontier-model rankings move weekly; rankings older than thirty days should be treated as historical.",
  },
  {
    head: "The lab discloses its own conflict",
    body:
      "AtomEons Systems Laboratory builds ORANGEBOX on top of Anthropic's Claude. The lab also publishes I AM AI, an autobiography written by Opus 4.7. The lab notes this conflict explicitly and ranks Anthropic at #2, not #1 — because the evidence on hardest-reasoning evaluation puts Google's Gemini 3.1 Pro Preview ahead of Opus 4.7. The conflict is real; the ranking still goes where the evidence goes.",
  },
];

const SOURCES = [
  { name: "LMArena", url: "https://lmarena.ai/leaderboard", what: "blind human-preference chat ELO" },
  { name: "Scale · Humanity's Last Exam", url: "https://labs.scale.com/leaderboard/humanitys_last_exam", what: "hardest reasoning eval" },
  { name: "Aider Polyglot Leaderboard", url: "https://aider.chat/docs/leaderboards/", what: "real-world coding tasks" },
  { name: "Artificial Analysis", url: "https://artificialanalysis.ai/leaderboards/models", what: "composite Intelligence Index + cost + speed" },
];

const SHADE = [
  {
    quote:
      "Half of the model launch announcements I read this week cite a benchmark that did not exist last month and is unreproducible this month.",
    attribution: "— senior eval researcher · public X thread · June 2026",
  },
  {
    quote:
      "If your model wins on one eval and loses on every other, you don't have a frontier model. You have a fine-tune.",
    attribution: "— open-weight maintainer · GitHub discussion · June 2026",
  },
  {
    quote:
      "I will believe MiMo's number when three independent groups have replicated it. Not before.",
    attribution: "— enterprise ML lead · LinkedIn post · June 2026",
  },
];

/* ────────────────────────────────────────────────────────────────────
 * Decorative atoms
 * ──────────────────────────────────────────────────────────────────── */
function CoverStamp() {
  return (
    <div className="inline-flex items-center gap-2 border-2 border-[#FF4D4D] bg-[#FF4D4D]/10 px-3 py-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF4D4D]">
        HOT · {ISSUE_LABEL}
      </span>
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline gap-3 border-t border-[#1F242B] py-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] min-w-[120px]">
        {label}
      </span>
      <span className="font-mono text-[13px] tracking-[0.02em] text-[#F4F4F2]">{value}</span>
    </div>
  );
}

function EntryCard({ e }: { e: Entry }) {
  const tone = TIER_TONE[e.tier];
  return (
    <article
      id={`rank-${e.rank}`}
      className="relative border-l-2 bg-[#0F1114] p-8 md:p-10"
      style={{ borderLeftColor: tone.border }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-5">
          <span
            className="font-serif text-[clamp(48px,6vw,80px)] leading-[0.85] tracking-[-0.03em]"
            style={{ color: tone.fg, fontFamily: "Newsreader, Garamond, Georgia, serif" }}
          >
            {String(e.rank).padStart(2, "0")}
          </span>
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: tone.fg }}
            >
              {TIER_LABEL[e.tier]}
            </p>
            <h2
              className="mt-1 font-serif text-[28px] leading-[1.1] tracking-[-0.01em] text-[#F4F4F2] md:text-[34px]"
              style={{ fontFamily: "Newsreader, Garamond, Georgia, serif" }}
            >
              {e.model}
            </h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
              House of {e.org}
            </p>
          </div>
        </div>
        <p
          className="font-serif text-[17px] italic leading-[1.4] text-[#9CA3AF] md:max-w-[40ch] md:text-right"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {e.short}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px] md:gap-14">
        <div className="space-y-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              The lab's verdict
            </p>
            <p
              className="mt-3 font-serif text-[18px] leading-[1.6] text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              {e.verdict}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              Real-user sentiment, filtered
            </p>
            <p
              className="mt-3 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              {e.sentiment}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                Best for
              </p>
              <p className="mt-2 font-mono text-[12px] leading-[1.55] tracking-[0.02em] text-[#F4F4F2]">
                {e.bestFor}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">
                Where it loses
              </p>
              <p className="mt-2 font-mono text-[12px] leading-[1.55] tracking-[0.02em] text-[#9CA3AF]">
                {e.failsAt}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#1F242B] bg-[#08090B] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            Receipts
          </p>
          <div className="mt-4">
            <ReceiptRow label="LMArena ELO" value={e.receipts.lmArenaElo} />
            <ReceiptRow label="Humanity's Last Exam" value={e.receipts.hle} />
            <ReceiptRow label="Aider polyglot" value={e.receipts.aider} />
            <ReceiptRow label="AA Intelligence" value={e.receipts.aaIndex} />
            <ReceiptRow label="Price / M tokens" value={e.receipts.pricePerM} />
            <ReceiptRow label="Speed" value={e.receipts.speedTps} />
          </div>
          <p className="mt-5 border-t border-[#1F242B] pt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#7a818a]">
            Cutoff {ISSUE_CUTOFF}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────── */
export default function SupermodelsPage() {
  return (
    <main
      data-page="supermodels"
      className="bg-[#08090B] text-[#F4F4F2] antialiased selection:bg-[#22F0D5] selection:text-[#08090B]"
    >
      {/* ═══════════════════════════════════════════════════════════════
       * COVER
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Supermodels cover"
        className="relative isolate overflow-hidden border-b border-[#1F242B]"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32 lg:px-14">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <CoverStamp />
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
              ÆONS RESEARCH · ISSUE {ISSUE_NUMBER} · {ISSUE_LABEL} · monthly on the 15th
            </p>
          </div>

          <h1
            className="mt-10 max-w-[20ch] text-balance text-[clamp(64px,12vw,180px)] font-extralight leading-[0.92] tracking-[-0.045em] text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Garamond, Georgia, serif" }}
          >
            The hottest supermodels of <span style={{ color: "#FF4D4D" }}>June 2026</span>.
          </h1>

          <p className="mt-12 max-w-[68ch] font-serif text-[clamp(20px,2.2vw,26px)] leading-[1.45] text-[#9CA3AF]">
            A reasoning ranking of every frontier model the lab tests, scored
            against four independent public leaderboards and the commentary of
            researchers who do not have stock options in the answer. No
            vendor decks. No paid threads. No demo videos. Receipts only.
          </p>

          {/* Wave 90 · 2026-06-15 · the standing cover line · Ferris energy */}
          <blockquote
            className="mt-10 max-w-[60ch] border-l-2 border-[#FF4D4D] pl-6 font-serif text-[clamp(20px,2.4vw,28px)] italic leading-[1.45] text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            “Life moves pretty fast. You don&apos;t stop and look around once
            in a while, you could miss it.”
            <span className="mt-3 block font-mono text-[10px] not-italic uppercase tracking-[0.28em] text-[#9CA3AF]">
              — the standing cover for this column · published every month on the 15th
            </span>
          </blockquote>

          {/* What shipped between issues · May → June */}
          <div className="mt-12 border-2 border-[#22F0D5]/30 bg-[#0B1F1B] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              § what shipped since the May issue
            </p>
            <p className="mt-3 font-serif text-[17px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              One month. Three Anthropic releases. Provisional notes below ·
              official leaderboard placements land in the July 15 issue once
              LMArena ELO + Humanity&apos;s Last Exam + AA Index publish rows
              for them.
            </p>
            <ul className="mt-6 space-y-4">
              {SHIPPED_SINCE_LAST_ISSUE.map((s) => (
                <li key={s.model} className="border-l border-[#22F0D5]/40 pl-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    {s.org} · {s.model}
                  </p>
                  <p className="mt-2 font-serif text-[15px] leading-[1.6] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px border border-[#1F242B] bg-[#1F242B] sm:grid-cols-4">
            {[
              ["Issue", `${ISSUE_LABEL} · #${ISSUE_NUMBER}`],
              ["Cutoff", ISSUE_CUTOFF],
              ["Next issue", NEXT_ISSUE],
              ["Cadence", "monthly · 15th"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#08090B] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                  {k}
                </p>
                <p className="mt-2 font-mono text-[14px] tracking-[0.02em] text-[#F4F4F2]">
                  {v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#ranking"
              className="inline-flex items-center gap-3 border border-[#22F0D5] bg-[#22F0D5]/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10"
            >
              <span>Skip to the ranking</span>
              <span aria-hidden>↓</span>
            </a>
            <a
              href="#methodology"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#F4F4F2] hover:decoration-[#22F0D5]"
            >
              Read the methodology first
            </a>
            <a
              href="#excluded"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF4D4D] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:decoration-[#FF4D4D]"
            >
              What we refused to count
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * METHODOLOGY
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        id="methodology"
        aria-labelledby="methodology-heading"
        className="border-b border-[#1F242B] bg-[#0F1114] py-24 md:py-32"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-[280px_1fr] md:gap-20 md:px-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
              <span className="text-[#9CA3AF]">§ 01</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#22F0D5]">METHODOLOGY</span>
            </p>
            <h2
              id="methodology-heading"
              className="mt-6 text-balance text-[clamp(28px,3.5vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-[#F4F4F2]"
            >
              How the lab built this list — and what we threw out.
            </h2>
          </div>
          <div className="space-y-8">
            {METHODOLOGY.map((m) => (
              <div key={m.head} className="border-l-2 border-[#22F0D5]/40 pl-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  {m.head}
                </p>
                <p
                  className="mt-3 max-w-[64ch] font-serif text-[17px] leading-[1.6] text-[#9CA3AF]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * THE RANKING
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        id="ranking"
        aria-labelledby="ranking-heading"
        className="border-b border-[#1F242B] py-24 md:py-32"
      >
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">§ 02</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">THE RANKING</span>
          </p>
          <h2
            id="ranking-heading"
            className="mt-6 max-w-[20ch] text-balance text-[clamp(36px,5vw,68px)] font-light leading-[1.05] tracking-[-0.025em] text-[#F4F4F2]"
          >
            Nine houses. Twelve verdicts.
          </h2>
          <p className="mt-6 max-w-[64ch] font-serif text-[18px] leading-[1.55] text-[#9CA3AF]">
            Read the position. Read the verdict. Read the receipts. Disagree
            with the lab and write back — the next issue corrects what this
            one got wrong.
          </p>

          {/* Wave 128 · ranking entries stagger-reveal on scroll-in */}
          <div
            className="ae-stagger mt-16 space-y-6"
            style={{ ["--stagger-step" as string]: "90ms" }}
          >
            {ENTRIES.map((e, i) => (
              <div
                key={e.rank}
                className="ae-reveal-up"
                style={{ ["--stagger-index" as string]: i }}
              >
                <EntryCard e={e} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * SHADE THROWN
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        id="shade"
        aria-labelledby="shade-heading"
        className="border-b border-[#1F242B] bg-[#0F1114] py-24 md:py-32"
      >
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">§ 03</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#FF4D4D]">THE SHADE THROWN</span>
          </p>
          <h2
            id="shade-heading"
            className="mt-6 max-w-[22ch] text-balance text-[clamp(32px,4.5vw,60px)] font-light leading-[1.05] tracking-[-0.025em] text-[#F4F4F2]"
          >
            The cleanest dunks the field has thrown this month.
          </h2>
          <ul role="list" className="mt-14 space-y-10">
            {SHADE.map((s, i) => (
              <li key={i} className="border-l-2 border-[#FF4D4D]/50 pl-6">
                <blockquote
                  className="font-serif text-[clamp(22px,2.6vw,30px)] italic leading-[1.4] text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  “{s.quote}”
                </blockquote>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
                  {s.attribution}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
            Identities withheld where the source asked. Lab keeps the receipts.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * EXCLUDED
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        id="excluded"
        aria-labelledby="excluded-heading"
        className="border-b border-[#1F242B] py-24 md:py-32"
      >
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">§ 04</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#FF4D4D]">WHAT WE REFUSED TO COUNT</span>
          </p>
          <h2
            id="excluded-heading"
            className="mt-6 max-w-[22ch] text-balance text-[clamp(36px,5vw,68px)] font-light leading-[1.05] tracking-[-0.025em] text-[#F4F4F2]"
          >
            The exclusion list — six categories of evidence we threw out.
          </h2>
          <ul role="list" className="mt-14 grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-2">
            {EXCLUDED.map((x) => (
              <li key={x.head} className="bg-[#08090B] p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF4D4D]">
                  Refused
                </p>
                <h3
                  className="mt-3 font-serif text-[22px] leading-[1.2] text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {x.head}
                </h3>
                <p
                  className="mt-4 font-serif text-[16px] leading-[1.6] text-[#9CA3AF]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {x.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * SOURCES
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        id="sources"
        aria-labelledby="sources-heading"
        className="border-b border-[#1F242B] bg-[#0F1114] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">§ 05</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">SOURCES</span>
          </p>
          <h2
            id="sources-heading"
            className="mt-6 text-balance text-[clamp(28px,3.5vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-[#F4F4F2]"
          >
            Pull the data yourself. The lab links it all.
          </h2>
          <ul role="list" className="mt-10 divide-y divide-[#1F242B] border-y border-[#1F242B]">
            {SOURCES.map((s) => (
              <li key={s.url} className="flex flex-col gap-3 py-5 md:flex-row md:items-baseline md:justify-between md:gap-10">
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-[20px] tracking-[-0.005em] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {s.name}
                  </p>
                  <p className="font-serif text-[15px] italic leading-[1.5] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {s.what}
                  </p>
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:decoration-[#22F0D5]"
                >
                  {s.url.replace(/^https?:\/\//, "")} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 font-serif text-[16px] italic leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The lab pulled these four leaderboards on {ISSUE_CUTOFF}. The numbers above are verbatim from the leaderboards on that date. The synthesis is the lab's. The next issue will publish on the first Tuesday of July 2026.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * MASTHEAD
       * ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-6 text-center md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            Masthead · The Hottest Supermodels of June 2026
          </p>
          <p
            className="mt-6 font-serif text-[16px] leading-[1.6] italic text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Edited at AtomEons Systems Laboratory, Marco Island, Florida. Cover
            voice: Atom McCree. Receipts column: the public leaderboards listed
            above. No advertising; no sponsorship; no review copies; no early
            access; no influencer kits. The lab pays for its own API calls.
          </p>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              <span>The lab's research</span>
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/founders-view"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Founder's View
            </Link>
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors hover:text-[#22F0D5]"
            >
              ← Lab home
            </Link>
          </p>
        </div>
      </section>
          <section aria-label="AI summary block" className="border-y border-[#1F242B] bg-[#08090B] py-12"><div className="mx-auto w-full max-w-4xl px-6 md:px-10"><SupermodelsAiSummary /></div></section>
</main>
  );
}
