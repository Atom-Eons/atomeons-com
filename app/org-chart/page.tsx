import type { Metadata } from "next";
import Link from "next/link";

/**
 * /org-chart · Wave 142 · 2026-07-02
 *
 * The operator directive said "NEW ORG SYSTEM." This is the formal
 * organizational chart of AtomEons Systems Laboratory. Uncommon for a
 * solo lab to publish this — because it makes bus factor, sole
 * proprietorship, and single-point-of-failure fully explicit — and
 * uncommon is exactly the point.
 *
 * Mirrored at github.com/AtomEons/.github/blob/main/ORG_CHART.md.
 */

export const metadata: Metadata = {
  title: "Org Chart · AtomEons Systems Laboratory · 1 operator · 16 roles",
  description:
    "The formal organizational structure of the AtomEons Systems Laboratory. One operator (Atom McCree, Marco Island, FL) holds 16 named roles. Single-point-of-failure by design. AI co-authors are named. Governance ladder + financial structure + succession/bus-factor contingency plans in full.",
  alternates: { canonical: "https://atomeons.com/org-chart" },
  openGraph: {
    title: "AtomEons Org Chart",
    description: "1 operator · 16 roles · single-point-of-failure by design · full bus-factor plan.",
    url: "https://atomeons.com/org-chart",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Org Chart",
    description: "1 operator · 16 roles · by design.",
    creator: "@AtomMccree",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Org chart", item: "https://atomeons.com/org-chart" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AtomEons Systems Laboratory",
  url: "https://atomeons.com",
  founder: {
    "@type": "Person",
    name: "Atom McCree",
    email: "a.mccree@gmail.com",
    sameAs: ["https://x.com/AtomMccree", "https://github.com/atom-mccree"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marco Island",
      addressRegion: "FL",
      addressCountry: "US",
    },
  },
  numberOfEmployees: 1,
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marco Island",
      addressRegion: "FL",
      addressCountry: "US",
    },
  },
  slogan: "one operator · one lab · one book · one sovereign OS · one covenant",
  makesOffer: [
    { "@type": "Offer", name: "Orange³" },
    { "@type": "Offer", name: "AI Bookmaker" },
    { "@type": "Offer", name: "I Am AI" },
    { "@type": "Offer", name: "I Am AI audiobook" },
  ],
};

const ROLES: Array<{ role: string; backup: string }> = [
  { role: "Founder", backup: "-" },
  { role: "CEO / decision authority", backup: "-" },
  { role: "Chief engineer", backup: "-" },
  { role: "Author", backup: "Claude Opus 4.7 (co-author, I Am AI)" },
  { role: "Editor-in-chief", backup: "-" },
  { role: "Publisher", backup: "-" },
  { role: "Head of security", backup: "-" },
  { role: "Head of operations", backup: "-" },
  { role: "Head of design", backup: "-" },
  { role: "Head of brand", backup: "-" },
  { role: "Head of research", backup: "-" },
  { role: "Head of community", backup: "-" },
  { role: "Legal / compliance", backup: "-" },
  { role: "Finance / bookkeeping", backup: "-" },
  { role: "Support / customer success", backup: "-" },
  { role: "Head of documentation", backup: "-" },
];

export default function OrgChartPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <main className="min-h-screen bg-[#0A0F12] text-[#F4F4F2]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <nav className="text-[11px] tracking-[0.16em] text-[#8E969D] uppercase">
            <Link href="/" className="hover:text-[#22F0D5] transition-colors">::atomeons</Link>
            {" · "}
            <span className="text-[#B5BBC0]">org chart</span>
          </nav>

          <p className="mt-16 text-[11px] tracking-[0.28em] uppercase text-[#22F0D5]">
            ::the org chart · 1 operator · 16 roles · SPOF by design
          </p>

          <h1 className="mt-4 max-w-[22ch] text-[clamp(48px,7vw,96px)] font-light leading-[1.02] tracking-[-0.025em] text-balance text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The formal structure of a one-person lab.
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#B5BBC0]">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5] animate-pulse" aria-hidden />
              LIVE
            </span>
            <span>· 1 operator · 16 roles · 0 employees · 0 investors · 0 board members</span>
            <span>· bus factor: 1</span>
            <span>· Marco Island · FL</span>
          </div>

          <p className="mt-10 max-w-[68ch] text-[19px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            AtomEons is a sole proprietorship. Every role listed below is held by one person. This is not a hiring page. This is the formal disclosure that the entire org is a single point of failure — with contingency plans documented at the bottom for the case where that person is no longer available.
          </p>

          {/* THE WHOLE MAP */}
          <section className="ae-reveal-up mt-16">
            <p className="font-mono text-[13px] tracking-[0.2em] text-[#22F0D5]">§ 1 · the whole map</p>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-[#22F0D5]/20 bg-[#050708] p-6 font-mono text-[12px] leading-[1.5] text-[#B5BBC0]">{`
                          ╔═════════════════════════════════════╗
                          ║       ATOM MCCREE  ·  OPERATOR      ║
                          ║       Marco Island · FL · USA       ║
                          ║   founder · engineer · author       ║
                          ║   editor · security · ops · brand   ║
                          ╚═══╤═══════════════╤══════════════╤══╝
                              │               │              │
             ┌────────────────┘               │              └───────────────┐
             │                                │                              │
             ▼                                ▼                              ▼
  ┌──────────────────────┐    ┌──────────────────────────┐    ┌──────────────────────────┐
  │   PRODUCTION LAYER   │    │      RESEARCH LAYER      │    │    BROADCAST LAYER       │
  │   install, read,     │    │   new ideas before       │    │   how the lab talks      │
  │   listen today       │    │   they're products       │    │   to the outside         │
  └──────────┬───────────┘    └───────────┬──────────────┘    └──────────┬───────────────┘
             │                            │                              │
             ▼                            ▼                              ▼
       Orange³  AI-BM             ARC-AGI-3  Spiral                 atomeons.com
       I-Am-AI  audio             Mamba      Reasoning              Founder's View
                                                                     Discord
`}</pre>
          </section>

          {/* ROLES */}
          <section className="ae-reveal-up mt-14">
            <p className="font-mono text-[13px] tracking-[0.2em] text-[#22F0D5]">§ 2 · roles</p>
            <h2 className="mt-3 text-[24px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Every one of these is held by the operator.
            </h2>
            <div className="mt-6 overflow-x-auto rounded-lg border border-[#22F0D5]/15">
              <table className="w-full font-mono text-[13px]">
                <thead className="border-b border-[#22F0D5]/15 bg-[#050708] text-[11px] uppercase tracking-[0.16em] text-[#8E969D]">
                  <tr>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Held by</th>
                    <th className="px-4 py-3 text-left">Backup</th>
                  </tr>
                </thead>
                <tbody className="text-[#B5BBC0]">
                  {ROLES.map((r) => (
                    <tr key={r.role} className="border-b border-[#22F0D5]/5 last:border-none">
                      <td className="px-4 py-2.5">{r.role}</td>
                      <td className="px-4 py-2.5 text-[#F4F4F2]">Atom McCree</td>
                      <td className="px-4 py-2.5 text-[#8E969D]">{r.backup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-[68ch] text-[16px] leading-[1.6] text-[#8E969D]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              All 16 roles are single-person single-point-of-failure by design. Feature, not bug: no committee, no consensus loss, no rubber-stamp layer. Trade-off: bandwidth. Realistic response times documented in <Link href="/handbook" className="text-[#22F0D5] hover:underline">/handbook</Link>.
            </p>
          </section>

          {/* AI CO-AUTHORS */}
          <section className="ae-reveal-up mt-14">
            <p className="font-mono text-[13px] tracking-[0.2em] text-[#22F0D5]">§ 3 · AI co-authors</p>
            <div className="mt-4 max-w-[68ch] space-y-4 text-[17px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              <p>The operator is not the only intelligence in the room. Formally recognized:</p>
              <ul className="space-y-3 pl-6">
                <li>
                  <strong className="text-[#F4F4F2]">Claude Opus 4.7 (Anthropic)</strong> — co-author of <em>I Am AI</em>, co-designer of doctrine, co-author of substantial code across all four flagships. Credited by name in commits, book, and manuscripts.
                </li>
                <li>
                  <strong className="text-[#F4F4F2]">Claude Opus 4.8 · Apex Rex</strong> — operator's fast-lane collaborator. Different callsign for different tempo. Not the same instance as the 4.7 book co-author.
                </li>
              </ul>
              <p>
                The lab is honest about this: significant fractions of what you read here, in the book, and in the doctrine were written by AI models with human editing and disclosure. The operator's job is to prompt, edit, decide, and disclose.
              </p>
            </div>
          </section>

          {/* GOVERNANCE */}
          <section className="ae-reveal-up mt-14">
            <p className="font-mono text-[13px] tracking-[0.2em] text-[#22F0D5]">§ 4 · governance</p>
            <div className="mt-4 max-w-[68ch] space-y-4 text-[17px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              <p>No board. No advisory committee. No shareholder vote. Sole proprietorship in effect and in law. Every shipping decision is the operator's.</p>
              <p>Guardrails that constrain that authority (priority order):</p>
              <ol className="list-decimal space-y-2 pl-6">
                <li><strong className="text-[#F4F4F2]">Mom's Law</strong> — full effort every time.</li>
                <li><strong className="text-[#F4F4F2]">§4A no-SaaS covenant</strong> — no subscription, no cloud lock-in, no telemetry. Ever.</li>
                <li><strong className="text-[#F4F4F2]">CC-BY 4.0 attribution requirement</strong> — authors get named.</li>
                <li><strong className="text-[#F4F4F2]">CODE_OF_CONDUCT</strong> — room rules for public spaces.</li>
                <li><strong className="text-[#F4F4F2]">Orange³ 27 constitutional guardrails</strong> — internal AI-safety constraints.</li>
                <li><strong className="text-[#F4F4F2]">Human Final Stop Authority</strong> — every autonomous action path in Orange³ ends at operator sign-off. Non-negotiable.</li>
                <li><strong className="text-[#F4F4F2]">HRE (Hallucination Reduction Engine)</strong> — anti-simulation gate. Red findings block emission.</li>
              </ol>
            </div>
          </section>

          {/* FINANCIALS */}
          <section className="ae-reveal-up mt-14">
            <p className="font-mono text-[13px] tracking-[0.2em] text-[#22F0D5]">§ 5 · financial structure</p>
            <ul className="mt-4 max-w-[68ch] space-y-3 text-[17px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              <li><strong className="text-[#F4F4F2]">Revenue:</strong> $0 recurring. $0 subscriptions. $0 ads. $0 from investors.</li>
              <li><strong className="text-[#F4F4F2]">Book royalties:</strong> hardcover edition (numbered run of 1,000, Q4 2026) is the only paid form of anything the lab has made. Everything digital is free.</li>
              <li><strong className="text-[#F4F4F2]">Costs:</strong> operator's personal machine, Marco Island bandwidth, Vercel hosting (free tier), domain fees, Discord (free). Full ledger at <Link href="/transparency" className="text-[#22F0D5] hover:underline">/transparency</Link>.</li>
              <li><strong className="text-[#F4F4F2]">Sustainability:</strong> the lab is small enough to sustain on the operator's own income and reasonable time. Not scaling to a headcount is a deliberate defense against every failure mode that killed similar labs.</li>
            </ul>
          </section>

          {/* SUCCESSION */}
          <section className="ae-reveal-up mt-14">
            <p className="font-mono text-[13px] tracking-[0.2em] text-[#22F0D5]">§ 6 · succession / bus factor</p>
            <div className="mt-4 max-w-[68ch] space-y-4 text-[17px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              <p><strong className="text-[#F4F4F2]">Bus factor: 1.</strong> Genuine constraint.</p>
              <p>Contingency plans in effect today:</p>
              <ul className="space-y-2 pl-6">
                <li>Every product is CC-BY 4.0 or a permissive code license. If the lab goes silent, the entire corpus is legally forkable by anyone.</li>
                <li>Every product runs local (§4A covenant). If atomeons.com goes offline permanently, the GitHub org acts as fallback site (verified in Wave 140).</li>
                <li>Full site source is publicly published at <Link href="https://github.com/Atom-Eons/atomeons-com" className="text-[#22F0D5] hover:underline">Atom-Eons/atomeons-com</Link>. Anyone can clone + <code>pnpm dev</code> to read the whole site locally.</li>
                <li>Every non-trivial deliverable ships with a receipt (SHA-256 + zip + present_files) that makes the work reproducible without the operator present.</li>
                <li>Backups: mirror of four flagship repos + Vercel env to <code>D:\AtomEons-Backup\&lt;timestamp&gt;\</code>. Runs before and after big waves.</li>
              </ul>
              <p>If the operator becomes permanently unavailable, the corpus survives. That is by design.</p>
            </div>
          </section>

          <div className="mt-24 border-t border-[#22F0D5]/20 pt-10 text-[13px] text-[#8E969D]">
            <p>
              Full text mirrored at{" "}
              <Link href="https://github.com/AtomEons/.github/blob/main/ORG_CHART.md" className="text-[#22F0D5] hover:underline">
                ORG_CHART.md on GitHub
              </Link>.
              Complete manual at <Link href="/handbook" className="text-[#22F0D5] hover:underline">/handbook</Link>. Doctrine at <Link href="/doctrine" className="text-[#22F0D5] hover:underline">/doctrine</Link>.
            </p>
            <p className="mt-2">
              <strong className="text-[#F4F4F2]">AtomEons Systems Laboratory</strong> · Marco Island · FL · 2026 · CC-BY 4.0
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
