import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Bookmaker · changelog · version history",
  description:
    "Every AI Bookmaker release in time order. Mac + Windows native builds, manuscript→EPUB pipeline, audiobook generation, cover renderer, KDP metadata generator.",
  alternates: { canonical: "https://atomeons.com/b00kmakor/changelog" },
};

type Release = {
  version: string;
  date: string;
  status: "shipped" | "skipped" | "withdrawn";
  highlights: string[];
  notes?: string;
};

const RELEASES: Release[] = [
  {
    version: "v3.2.0",
    date: "2026-06-03",
    status: "shipped",
    highlights: [
      "Mac + Windows native authoring instrument · concurrent ship",
      "Dynamic pricing tiers ($99 default) · FREE during launch week",
      "Full manuscript → EPUB pipeline with validate_epub gate",
      "Audiobook generation via Microsoft Andrew Neural Voice + ElevenLabs (BYO key)",
      "Cover renderer (cream linen + red foil presets · paperback + hardcover dims)",
      "KDP metadata generator · BSR estimator · royalty calculator",
      "Paperback cover dims + spine width + KU page estimate utilities",
      "ai_disclosure_ledger · every AI step the book passed through is logged",
      "License §4A no-SaaS covenant locked in installer EULA",
    ],
  },
  {
    version: "v3.1.0",
    date: "2026-05-15",
    status: "shipped",
    highlights: [
      "Operator-internal RC · validated by shipping I AM AI through the pipeline end-to-end",
      "76,005-word manuscript → Kindle ASIN B0H45JVSDB in one continuous pass",
      "27-track audiobook generation tested against ACX 5-10hr tier",
      "Cover render verified against KDP/IngramSpark templates",
    ],
  },
  {
    version: "v3.0.0",
    date: "2026-04-22",
    status: "shipped",
    highlights: [
      "Native Mac + Windows ports replace earlier Electron prototype",
      "60+ MB → 35 MB binary by dropping the Electron runtime",
      "Operator desktop install · no cloud dependency",
    ],
  },
  {
    version: "v2.x",
    date: "2026-02-08",
    status: "withdrawn",
    highlights: [
      "Electron prototype · withdrawn from public consideration",
      "Lessons learned: native is the right path for an authoring instrument",
    ],
    notes: "Not shipped publicly — operator-internal only.",
  },
  {
    version: "v1.0.0",
    date: "2025-12-20",
    status: "shipped",
    highlights: [
      "First public release · pipeline-only (no GUI)",
      "MCP-tool-style API for manuscript parsing + EPUB export",
      "Operator-only distribution; not advertised externally",
    ],
  },
];

const STATUS_COLOR: Record<Release["status"], string> = {
  shipped: "#22F0D5",
  skipped: "#7a818a",
  withdrawn: "#FF4D4D",
};

const STATUS_LABEL: Record<Release["status"], string> = {
  shipped: "SHIPPED",
  skipped: "SKIPPED",
  withdrawn: "WITHDRAWN",
};

export default function B00kmakrChangelogPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ AI Bookmaker · changelog</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            From prototype to publishing instrument.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Most recent first. v2.x was withdrawn (Electron prototype);
            v3 is the native Mac + Windows release. I AM AI was the
            first book published end-to-end through the pipeline.
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
                    <h2 className="font-mono text-[24px] font-medium text-[#22F0D5]">{r.version}</h2>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: STATUS_COLOR[r.status] }}>
                      {STATUS_LABEL[r.status]}
                    </p>
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
                {r.notes ? (
                  <p className="mt-5 border-t border-[#1F242B] pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                    note · {r.notes}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {[
              { href: "/b00kmakor", label: "Back to AI Bookmaker" },
              { href: "/b00kmakor/roadmap", label: "Roadmap + anti-roadmap" },
              { href: "/b00kmakor/competitors", label: "Competitor comparison" },
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
