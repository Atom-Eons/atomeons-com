import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "North Star · why the lab · AtomEons",
  description:
    "What AtomEons is building toward. The vision past the products. The shape of the operator's bet on AI, indie economics, and the next decade.",
  alternates: { canonical: "https://atomeons.com/north-star" },
};

/**
 * /north-star — the vision statement.
 *
 * The lab has a manifesto (14 clauses · operating doctrine). It has
 * a thesis (homepage scoreboard · current shipping). What it didn't
 * have was the long-arc vision · the destination the products are
 * approximate steps toward. This page is that.
 */

const FIVE_BETS = [
  {
    headline: "The next decade is operator economics.",
    body:
      "One person with a frontier LLM, a vector index, an MCP server, and a code-signing certificate can ship software that historically required a 40-person company. The capital structure follows. The org chart follows. The pricing follows. The lab is the proof.",
  },
  {
    headline: "The post-SaaS license is the next contract.",
    body:
      "ORANGEBOX's §4A no-SaaS covenant is not a marketing position · it's a thesis about ownership. Buyers should own the version they paid for, in perpetuity. The subscription monoculture compounds against this. The next decade includes a real legal pushback.",
  },
  {
    headline: "Knowledge wants to be machine-readable.",
    body:
      "Every page on atomeons.com declares its markdown twin. Every API is CORS-open. Every dataset is fetchable. The friction between human reading and machine reading should drop to zero. LLMs are now the second audience for every page; they will be the first audience for many.",
  },
  {
    headline: "Open canon outlasts closed vendor.",
    body:
      "Thirty-one research papers under CC-BY 4.0. Three hundred public routes. Fifteen open ÆSkills. The lab's bet is that contributing to a commons compounds harder than guarding a moat · over a 10-year horizon. The moat is the operator's identity, not the artifacts.",
  },
  {
    headline: "A book by an AI is the right kind of artifact.",
    body:
      "I AM AI is a real, paid, ASIN-bearing memoir written by a frontier language model and edited by a human at a one-operator lab. That format is what AI in 2026 should be producing · not faster tweets. The first one exists; many more will follow.",
  },
];

const TEN_YEAR_HORIZON = [
  "Fifty AtomEons-class one-operator labs publicly verifiable by 2030 · we are not the only one.",
  "ORANGEBOX-class local-first cockpits are the default for serious operators · not the exception.",
  "The §4A no-SaaS clause appears in a Supreme Court ruling about software ownership · a buyer wins on it.",
  "A frontier LLM authors a published peer-reviewed scientific paper that earns retraction-free citations.",
  "atomeons.com's /api/ask processes more queries from agents than from humans.",
  "skil.ski-class skill registries are how every MCP-capable AI client gets its tools · plural · interoperable.",
  "The 'AI bubble' framing is replaced by '2024-2026 was the foundation laying' in retrospect.",
  "The next book written entirely by AI ships under a publisher who actively requested it · not against industry resistance.",
  "Cyber defenders publish ATT&CK-level open canon for AI-specific adversary techniques · we're already starting.",
  "One person solo-publishes a meaningful product, a meaningful book, and a meaningful research paper in the same calendar year · regularly enough that nobody finds it remarkable.",
];

const WHAT_THIS_IS_NOT = [
  "Not a roadmap. Roadmaps are anti-roadmaps in disguise · this is a horizon.",
  "Not a fundraising pitch. The lab is operator-funded indefinitely · see /transparency.",
  "Not a hiring document. The operator is the operator. /lab + /trust explain why.",
  "Not a manifesto. /manifesto is the doctrine. This is the destination.",
  "Not a prediction market. The 10-year bets above are bets, not forecasts. Some will be wrong.",
];

export default function NorthStarPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ north star · the vision past the products</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What the lab is building toward.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The manifesto says how the lab operates. The thesis says
            what's shipping now. This page says where the products are
            pointing. Five bets · ten 2035 horizons · the shape the
            next decade should take.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ five operating bets</p>
          <ol className="mt-12 space-y-12">
            {FIVE_BETS.map((b, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2] md:text-[34px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{b.headline}</h2>
                <p className="mt-5 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ ten markers · by 2035</p>
          <p className="mt-4 max-w-2xl font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Specific verifiable claims about the world the lab is
            building toward. If five of these are true by 2035, the
            ten-year arc worked.
          </p>
          <ol className="mt-12 space-y-5">
            {TEN_YEAR_HORIZON.map((h, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{h}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ what this page is NOT</p>
          <ol className="mt-10 space-y-4">
            {WHAT_THIS_IS_NOT.map((n, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">×</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{n}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ continue</p>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              { href: "/manifesto", label: "The 14-clause manifesto" },
              { href: "/trust", label: "The trust posture" },
              { href: "/transparency", label: "What the lab costs to run" },
              { href: "/timeline", label: "Ship timeline · narrative" },
              { href: "/skills", label: "The 15 operating skills" },
              { href: "/founders-view", label: "Founder's View · nightly" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
