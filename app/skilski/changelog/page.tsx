import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "skil.ski · changelog · version history",
  description:
    "Every skil.ski release. The skill registry's evolution from internal Oski tooling to public MCP marketplace.",
  alternates: { canonical: "https://atomeons.com/skilski/changelog" },
};

type Release = {
  version: string;
  date: string;
  status: "shipped" | "skipped" | "withdrawn" | "live";
  highlights: string[];
};

const RELEASES: Release[] = [
  {
    version: "v1.0.0 · public launch",
    date: "2026-06-05",
    status: "live",
    highlights: [
      "Public marketplace · 2,127 verified skills across 13 sectors",
      "One MCP endpoint serves Claude · GPT · Gemini · Cursor · Codex",
      "Save = bookmark · Add to Lodge = make active on MCP",
      "Operator-Verified flagships + free community Oskis",
      "Loops mailing list 'skilski' live with 7 consumer events wired",
      "Zero-rake launch year · marketplace commission = 0% until 2027",
    ],
  },
  {
    version: "v0.9.0-rc",
    date: "2026-05-22",
    status: "shipped",
    highlights: [
      "Two-L brand domain (skill.ski) → DNS dead at registrar",
      "All hardcoded URLs renamed to skil.ski (one-L) → Vercel-hosted",
      "Operator pending DNS update to point skill.ski at Vercel",
      "Marketplace surface gated to operator-internal access",
    ],
  },
  {
    version: "v0.8.x",
    date: "2026-04-30",
    status: "shipped",
    highlights: [
      "721-skill SKILL.md skillmaker pipeline shipped",
      "/ae-researcher + Write loop tooling internalized",
      "36 of 721 high-$ skills completed (~5%)",
      "Validation rubric · 40-point Skilski Verify v1 spec landed",
    ],
  },
  {
    version: "v0.7.x",
    date: "2026-03-15",
    status: "shipped",
    highlights: [
      "skilski (singular) Loops mailing list created",
      "lib/loops.ts wiring complete",
      "Consumer event taxonomy finalized · 7 events",
    ],
  },
  {
    version: "v0.5.0",
    date: "2026-02-08",
    status: "shipped",
    highlights: [
      "First skill registry prototype",
      "Internal Oski tooling extracted from ORANGEBOX-adjacent doctrine",
      "Brand name decided · skil.ski (not skill.ski)",
    ],
  },
];

const STATUS_COLOR: Record<Release["status"], string> = {
  live: "#22F0D5",
  shipped: "#22F0D5",
  skipped: "#7a818a",
  withdrawn: "#FF4D4D",
};

const STATUS_LABEL: Record<Release["status"], string> = {
  live: "LIVE",
  shipped: "SHIPPED",
  skipped: "SKIPPED",
  withdrawn: "WITHDRAWN",
};

export default function SkilskiChangelogPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ skil.ski · changelog</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            From internal Oski to public registry.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Most recent first. v1.0.0 is the public marketplace launch.
            Earlier versions were operator-internal scaffolding.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <ol className="space-y-10">
            {RELEASES.map((r) => (
              <li key={r.version} className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#1F242B] pb-4">
                  <div className="flex items-baseline gap-4">
                    <h2 className="font-mono text-[20px] font-medium text-[#22F0D5]">{r.version}</h2>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: STATUS_COLOR[r.status] }}>{STATUS_LABEL[r.status]}</p>
                  </div>
                  <p className="font-mono text-[12px] tabular-nums text-[#9CA3AF]">{r.date}</p>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {r.highlights.map((h, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">·</span>
                      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{h}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {[
              { href: "/skilski", label: "Back to skil.ski" },
              { href: "/skilski/roadmap", label: "Roadmap + anti-roadmap" },
              { href: "/skilski/competitors", label: "Competitor comparison" },
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
