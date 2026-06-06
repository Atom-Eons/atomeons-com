import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "skil.ski · roadmap + anti-roadmap",
  description:
    "Where skil.ski is going. Near-term ship plan, longer-horizon ambitions, and an explicit anti-roadmap of features that will never ship.",
  alternates: { canonical: "https://atomeons.com/skilski/roadmap" },
};

const NEAR_TERM = [
  { item: "Complete the 721-skill skillmaker pipeline", when: "Q3 2026", why: "36 of 721 high-$ skills are SKILL.md-complete today. Operator runs /ae-researcher + Write loop daily; the queue clears at ~10 skills/day." },
  { item: "Skilski Verify v1 SKU", when: "Q3 2026", why: "$499 standalone product · 40-point rubric + auto-scorer + 5 industry pain dossiers + 1000-skill case study + 2 example PASS skills. The standard-setter SKU." },
  { item: "ORANGEBOX → skil.ski one-click bridge", when: "Q3 2026", why: "Already speced. Wire ORANGEBOX so any skil.ski skill can be Added to Lodge with a single click." },
  { item: "Public verification queue dashboard", when: "Q4 2026", why: "Show the world how many skills are pending Skilski Verify review, which got PASS, which got FAIL with reasons." },
  { item: "Per-skill changelog + version pins", when: "Q4 2026", why: "Skills evolve. Buyers need to pin to a known-good version for compliance." },
];

const LONG_TERM = [
  "Multi-language skill metadata (Spanish, French, Portuguese, Japanese)",
  "Skill bundles (collections of skills for a vertical, sold as one SKU)",
  "Sector-specific Verify rubrics (legal-skill, medical-skill, financial-skill add stricter gates)",
  "Federated skil.ski deployments — operators self-host private skill registries with optional public sync",
];

const ANTI_ROADMAP = [
  { item: "Becoming Yet Another AI Marketplace", why: "We are the SKILL registry, not the AI agent or assistant marketplace. We do not host agents, only the skill modules they consume via MCP." },
  { item: "Skill subscriptions / 'unlimited access' tiers", why: "Buyers buy a specific skill at a specific version. The §4A no-SaaS doctrine applies — you own the version you bought, in perpetuity." },
  { item: "Hosting skill runtime / agent infrastructure", why: "skil.ski distributes manifests + signed metadata. It does NOT run agents. Operators run agents on their own infrastructure." },
  { item: "Closed-source verification rubric", why: "The Skilski Verify rubric is public · 40 points · published at /skilski/verify-rubric (forthcoming). Buyers can audit any skill against it themselves." },
  { item: "Bundling skill recommendations with paid placement", why: "Featured skills are featured by quality score, NOT pay-to-play. No vendor can buy placement on skil.ski." },
  { item: "User data resale", why: "Skill downloads + bookmarks are operator-private. Aggregated counts may be published; individual user behavior never is." },
  { item: "AI-content slop skills", why: "Every public skill passes Skilski Verify (or carries an explicit UNVERIFIED badge). The 40-point rubric blocks templated AI-content-farm skills from ranking." },
];

export default function SkilskiRoadmapPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ skil.ski · roadmap + anti-roadmap</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The registry, not the marketplace-of-everything.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What ships. What does not ship. The anti-roadmap is what
            keeps skil.ski from turning into Yet Another AI Marketplace.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ next 90 days</p>
          <ol className="mt-8 space-y-5">
            {NEAR_TERM.map((n, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-serif text-[20px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{n.item}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">{n.when}</p>
                </div>
                <p className="mt-2 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{n.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ longer horizon · less commitment</p>
          <ul className="mt-8 space-y-3">
            {LONG_TERM.map((l, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">~</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ what skil.ski will NEVER do</p>
          <ol className="mt-10 space-y-5">
            {ANTI_ROADMAP.map((a, i) => (
              <li key={i} className="border-l-2 border-[#FF4D4D] pl-5">
                <p className="font-serif text-[19px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {String(i + 1).padStart(2, "0")} · {a.item}
                </p>
                <p className="mt-2 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{a.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { href: "/skilski", label: "Back to skil.ski" },
              { href: "/skilski/changelog", label: "Version history" },
              { href: "/skilski/competitors", label: "Competitor comparison" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
