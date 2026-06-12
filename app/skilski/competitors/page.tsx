import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "skil.ski vs Anthropic Skills · OpenAI GPT Store · ElevenLabs · ChatGPT Plugins",
  description:
    "Honest competitor comparison for skil.ski's universal AI skill registry. Where the marketplace wins, where competitors win, and which buyer should pick which surface.",
  alternates: { canonical: "https://atomeons.com/skilski/competitors" },
};

type Comparison = {
  competitor: string;
  url: string;
  category: string;
  pricing: string;
  skilskiWins: string[];
  competitorWins: string[];
  takeaway: string;
};

const COMPARISONS: Comparison[] = [
  {
    competitor: "Anthropic Skills (official)",
    url: "https://www.anthropic.com",
    category: "First-party Claude skills",
    pricing: "Included with Claude plan",
    skilskiWins: [
      "Cross-model · skil.ski skills work on Claude · GPT · Gemini · Cursor · Codex.",
      "Vendor-neutral verification rubric.",
      "Operator-Verified flagships PLUS free community Oskis. Two tiers.",
      "Anti-AI-content-slop rubric · skill quality bar enforced.",
    ],
    competitorWins: [
      "Anthropic-official → tightest Claude integration.",
      "Free with Claude plan.",
      "Anthropic-backed quality assurance.",
      "Tighter integration with future Claude features (skill-aware reasoning, etc).",
    ],
    takeaway:
      "If you only run Claude and only care about official skills, use Anthropic's first-party. If you run multiple LLMs and want community-contributed skills with a vendor-neutral rubric, skil.ski.",
  },
  {
    competitor: "OpenAI GPT Store",
    url: "https://chatgpt.com/gpts",
    category: "OpenAI's custom GPT marketplace",
    pricing: "Included with ChatGPT Plus / Team / Enterprise",
    skilskiWins: [
      "Skills, not whole GPTs · narrower granularity = better composability.",
      "MCP-native · works with any MCP-capable client, not OpenAI-only.",
      "Operator-Verified rubric · GPT Store has minimal quality gating.",
      "No paid-placement · skil.ski features by quality, GPT Store features can be promoted.",
    ],
    competitorWins: [
      "Massive existing inventory (~3M GPTs published).",
      "ChatGPT user awareness is unparalleled.",
      "Discovery via natural ChatGPT conversation.",
      "OpenAI handles the runtime.",
    ],
    takeaway:
      "GPT Store is best for ChatGPT-bound users who want full GPTs. skil.ski is best for operators composing skill modules across multiple LLMs via MCP.",
  },
  {
    competitor: "ChatGPT Plugins (deprecated)",
    url: "https://platform.openai.com/docs/plugins/introduction",
    category: "Legacy ChatGPT plugin marketplace",
    pricing: "Discontinued · replaced by GPT Store",
    skilskiWins: [
      "skil.ski is alive. ChatGPT Plugins are deprecated.",
      "MCP open standard vs OpenAI-proprietary plugin protocol.",
      "Operator-owned skill manifest is portable across providers.",
    ],
    competitorWins: [
      "Historical brand recognition for the term 'plugins'.",
    ],
    takeaway:
      "Not a real comparison — OpenAI sunset plugins in favor of GPT Store. skil.ski's MCP-first design avoids similar vendor lock-in.",
  },
  {
    competitor: "Smithery (smithery.ai)",
    url: "https://smithery.ai",
    category: "MCP server registry",
    pricing: "Free",
    skilskiWins: [
      "Verified-quality rubric · Smithery is unmoderated discovery only.",
      "Operator-Verified flagships layer for compliance-sensitive buyers.",
      "Per-sector taxonomy (13 sectors) vs Smithery's flat list.",
      "Skilski Verify $499 standalone SKU = independent rubric audit.",
    ],
    competitorWins: [
      "FREE.",
      "Larger raw inventory of MCP servers today.",
      "Strong developer mind-share in the MCP community.",
      "Direct server-execution preview (skil.ski distributes manifests, not runtime).",
    ],
    takeaway:
      "Smithery is the unmoderated firehose of MCP servers. skil.ski is the curated catalog with verification. Use Smithery for breadth, skil.ski for compliance / quality.",
  },
  {
    competitor: "PulseMCP",
    url: "https://www.pulsemcp.com",
    category: "MCP server discovery aggregator",
    pricing: "Free",
    skilskiWins: [
      "Operator-Verified rubric vs PulseMCP's discovery-only model.",
      "Sector taxonomy.",
      "Direct ORANGEBOX bridge (forthcoming).",
    ],
    competitorWins: [
      "FREE.",
      "Strong news + intel angle.",
      "Active social media presence.",
      "Better at surfacing new MCP server releases.",
    ],
    takeaway:
      "PulseMCP is the news + discovery surface for MCP. skil.ski is the catalog + verification surface. Complementary, not competitive.",
  },
];

export default function SkilskiCompetitorsPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ skil.ski vs alternatives · honest comparison</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Different shapes for different buyers.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The skill / plugin / MCP discovery space is crowded. skil.ski
            is the cross-LLM verified-quality catalog with a published
            rubric. Other surfaces serve other shapes of buyer.
          </p>
        </div>
      </section>

      {COMPARISONS.map((c) => (
        <section key={c.competitor} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-serif text-[32px] font-light leading-[1.1] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                skil.ski vs <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] hover:underline">{c.competitor}</a>
              </h2>
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{c.category}</p>
                <p className="mt-1 font-mono text-[11px] tabular-nums text-[#9CA3AF]">{c.pricing}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="border-l-2 border-[#22F0D5] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">where skil.ski wins</p>
                <ul className="mt-4 space-y-2">
                  {c.skilskiWins.map((w, i) => (
                    <li key={i} className="font-serif text-[14px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>+ {w}</li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-[#FF4D4D] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">where {c.competitor} wins</p>
                <ul className="mt-4 space-y-2">
                  {c.competitorWins.map((w, i) => (
                    <li key={i} className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>− {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-[#C9A55C] bg-[#0B0C0F] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ takeaway</p>
              <p className="mt-3 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.takeaway}</p>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { href: "/skilski", label: "Back to skil.ski" },
              { href: "/skilski/changelog", label: "Version history" },
              { href: "/skilski/roadmap", label: "Roadmap + anti-roadmap" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
