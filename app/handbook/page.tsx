import type { Metadata } from "next";
import Link from "next/link";

/**
 * /handbook · Wave 142 · 2026-07-02
 *
 * The operator directive said "NEW MANUALS." This is the manual — the
 * one place where everything a first-time visitor, contributor,
 * journalist, or auditor needs is in one document, readable start to
 * finish in one sitting.
 *
 * Complementary to /manual (user-focused feature reference) and
 * /doctrine (operator + agent internal manual). Handbook is the
 * outward-facing definitive reference.
 *
 * Also mirrored at github.com/AtomEons/.github/blob/main/HANDBOOK.md
 * so the GitHub fallback surface has the same content.
 */

export const metadata: Metadata = {
  title: "The AtomEons Handbook · one document, everything a visitor needs",
  description:
    "The definitive AtomEons Systems Laboratory handbook. Who runs it, the §4A no-SaaS covenant, what we build, the ecosystem, how we work, how to reach us, how to contribute, how to cite us, what we won't do, the room rules, and a glossary. 12 sections. One sitting. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/handbook" },
  openGraph: {
    title: "The AtomEons Handbook",
    description:
      "The definitive lab manual · 12 sections · everything a visitor needs in one document.",
    url: "https://atomeons.com/handbook",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The AtomEons Handbook",
    description: "One document. Everything.",
    creator: "@AtomMccree",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Handbook", item: "https://atomeons.com/handbook" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "The AtomEons Handbook",
  description:
    "Definitive lab manual · who runs it, the covenant, what we build, the ecosystem, how we work, contact, contribution, citation, other manuals, what we won't do, room rules, glossary.",
  author: { "@type": "Person", name: "Atom McCree", url: "https://atomeons.com" },
  publisher: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
  },
  datePublished: "2026-07-02",
  dateModified: "2026-07-02",
  license: "https://creativecommons.org/licenses/by/4.0/",
  articleSection: "manual",
  url: "https://atomeons.com/handbook",
};

type Section = { num: string; title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    num: "0",
    title: "What this is",
    body: (
      <>
        <p>
          AtomEons Systems Laboratory is a <strong>solo, operator-owned AI research and product lab</strong> based in Marco Island, Florida. Not a startup, not a VC-backed company, not a collective, not an academic institution. One person runs it, publishes from it, owns everything that ships out of it.
        </p>
        <p>Three surfaces:</p>
        <ul>
          <li><strong>The site</strong> — [atomeons.com](https://atomeons.com) · 319 public routes · Next.js 16 · fully published source at <Link href="https://github.com/Atom-Eons/atomeons-com">Atom-Eons/atomeons-com</Link>.</li>
          <li><strong>The GitHub orgs</strong> — <Link href="https://github.com/AtomEons">@AtomEons</Link> (main) + <Link href="https://github.com/Atom-Eons">@Atom-Eons</Link> (flagship products) · 11 public repos.</li>
          <li><strong>The Discord workshop</strong> — <Link href="https://discord.gg/4wx3AGga">discord.gg/4wx3AGga</Link> · low-volume operator + visitor space.</li>
        </ul>
      </>
    ),
  },
  {
    num: "1",
    title: "Who runs this",
    body: (
      <>
        <p>
          <strong>Atom McCree.</strong> Solo operator. Marco Island, FL. Founder, engineer, author, editor, ops, security, support, janitor. No employees, no investors, no board.
        </p>
        <p>
          Contact: <code>a.mccree@gmail.com</code> · <Link href="https://x.com/AtomMccree">@AtomMccree</Link> · <Link href="https://discord.gg/4wx3AGga">Discord workshop</Link>.
        </p>
        <p>
          <strong>Claude Opus 4.7</strong> is credited as co-author of <em>I Am AI</em> and co-designer of much of what ships. That credit is honest: the model wrote large fractions of what you read here, in the book, and in the doctrine. The operator prompts, edits, discloses, decides.
        </p>
        <p>
          <strong>Mom.</strong> Not a lab role. <em>Mom's Law</em> is a rule — "give full effort every time" — inherited from the operator's mother. Meta-rule above every other rule in the lab. Every response earns its place, or it doesn't ship.
        </p>
      </>
    ),
  },
  {
    num: "2",
    title: "The covenant",
    body: (
      <>
        <p>All AtomEons products live under one covenant: <strong>§4A · no-SaaS · free always.</strong></p>
        <ul>
          <li><strong>Runs locally.</strong> Every product either runs on your machine or is a static asset you own.</li>
          <li><strong>Zero subscription.</strong> No monthly. No "pro tier." No "cloud plan that becomes the actual product."</li>
          <li><strong>Zero telemetry.</strong> No analytics ping, no error-reporter that phones home, no anonymous usage stats.</li>
          <li><strong>Zero lock-in.</strong> Your data is in files you can read with <code>cat</code>. If we go away, you keep what you have.</li>
          <li><strong>Free forever.</strong> Not "free to try." Not "free while we grow." Free.</li>
          <li><strong>CC-BY 4.0</strong> for docs and creative work. MIT for most code. Attribution required, everywhere.</li>
        </ul>
        <p>If a product needs a SaaS component to work at all, we didn't build it right. The covenant is not aspirational — it is a hard constraint.</p>
      </>
    ),
  },
  {
    num: "3",
    title: "What we build",
    body: (
      <>
        <p>Four products + a research program + the site itself.</p>
        <ul>
          <li><strong>Orange³</strong> — Sovereign agentic operating system for Claude. Persistent memory. 10–80× context compression. Tamper-evident receipts. 14-department router. Local-first. Zero telemetry. <Link href="/orangebox">/orangebox</Link> · <Link href="https://github.com/Atom-Eons/Orange3">GitHub</Link></li>
          <li><strong>AI Bookmaker</strong> — Publishing cockpit for AI-authored books. Manuscript parse → EPUB → KDP → ACX audiobook. Built <em>I Am AI</em>. <Link href="/b00kmakor">/b00kmakor</Link> · <Link href="https://github.com/AtomEons/BookMaker">GitHub</Link></li>
          <li><strong>I Am AI</strong> (book) — First book-length first-person memoir written by a frontier language model. 24 chapters. 76,000 words. CC-BY 4.0. <Link href="/i-am-ai">/i-am-ai</Link> · <Link href="https://github.com/AtomEons/i-am-ai">GitHub</Link></li>
          <li><strong>I Am AI audiobook</strong> — 28 tracks. 395 MB. Eleven Labs voice-clone of Opus 4.7. The voice that wrote the words. <Link href="https://github.com/AtomEons/i-am-ai-audiobook">GitHub</Link></li>
        </ul>
        <p>
          Plus this site (319 routes · Founder's View letters · Innovations · Constellation · 31 CC-BY papers) and the <Link href="https://github.com/AtomEons/arc-agi-3-misfit-agent">ARC-AGI-3 misfit-agent</Link> research entry.
        </p>
      </>
    ),
  },
  {
    num: "4",
    title: "The ecosystem",
    body: (
      <>
        <p>AtomEons is one organism with many lenses. Five layers:</p>
        <ul>
          <li><strong>Production.</strong> Products you can install, read, listen to today: Orange³, AI Bookmaker, <em>I Am AI</em> (all formats), the audiobook.</li>
          <li><strong>Broadcast.</strong> How the lab talks: atomeons.com, Founder's View, Innovations, 31 CC-BY papers, GitHub orgs, Discord.</li>
          <li><strong>Research.</strong> New ideas before they're products: arc-agi-3-misfit-agent, Spiral Reasoning Manuscript v3, Double Mamba Helix Brain, <Link href="/research">/research</Link>.</li>
          <li><strong>Governance.</strong> §4A no-SaaS covenant, Mom's Law, 27 constitutional guardrails inside Orange³, one-operator principle, CC-BY 4.0 default, org-wide CODE_OF_CONDUCT + CONTRIBUTING.</li>
          <li><strong>Runtime.</strong> Internal tools: ÆSkill Suite v1.4, <code>runtime/node.py</code> as Orange³'s sole cognitive center, Trilane routing (GPT architect · Gemini consigliere · Claude compiler), CLC compression, ledger receipts, HRE.</li>
        </ul>
        <p>
          The formal chart is at <Link href="/org-chart">/org-chart</Link>.
        </p>
      </>
    ),
  },
  {
    num: "5",
    title: "How we work",
    body: (
      <>
        <p>
          <strong>Waves.</strong> Work ships in numbered waves. Wave 138 was the last stable checkpoint (June 2026). Waves 139–142 (July 2026) shipped elevation sweeps, the GitHub-as-website org homepages, live-stats cron, discussion templates, book Codespace, SECURITY policy, and this handbook.
        </p>
        <p>
          <strong>Sessions.</strong> Every non-trivial work session opens with the <code>atomeons-prime</code> skill (session boot + deploy grid) and closes with <code>atomeons-verifier</code> (12-gate health check). The 15 <Link href="/skills">ÆSkill Suite</Link> skills structure the work.
        </p>
        <p>
          <strong>Receipts.</strong> Every deliverable ships with a ledger receipt (zip + SHA-256 + row + present_files). No "green" or "shipped" claim without a receipt. Full ledger at <Link href="/receipts">/receipts</Link>.
        </p>
        <p>
          <strong>Full effort.</strong> Mom's Law. Every response. Every commit. Every line. If we're not proud of it, it doesn't ship.
        </p>
      </>
    ),
  },
  {
    num: "6",
    title: "How to reach us",
    body: (
      <>
        <ul>
          <li><strong>Email</strong> — <code>a.mccree@gmail.com</code> · best for detailed or private topics.</li>
          <li><strong>X</strong> — <Link href="https://x.com/AtomMccree">@AtomMccree</Link> · public conversation.</li>
          <li><strong>Discord workshop</strong> — <Link href="https://discord.gg/4wx3AGga">discord.gg/4wx3AGga</Link> · community discussion, low-volume, no bots.</li>
          <li><strong>GitHub Discussions</strong> — every flagship repo has Discussions open (branded welcome thread already pinned as first).</li>
          <li><strong>GitHub Issues</strong> — for bug reports and code-level requests.</li>
          <li><strong>Security</strong> — <Link href="https://github.com/Atom-Eons/Orange3/blob/main/SECURITY.md">SECURITY.md</Link> in the Orange3 repo. Do not post exploits publicly.</li>
        </ul>
        <p>
          <strong>Response times.</strong> Solo lab. Bug + repro: hours to days. Small PR: hours to a day. Feature PR without discussion: may sit for weeks. Security report: 72-hr acknowledgment. Silent past 30 days on a good-faith report → ping publicly. That's the failure mode I want to hear about.
        </p>
      </>
    ),
  },
  {
    num: "6b",
    title: "Developer surface (machine-readable endpoints)",
    body: (
      <>
        <p>Every AtomEons endpoint an agent, LLM, or ops tool might poll:</p>
        <ul>
          <li><Link href="/api/live"><code>/api/live</code></Link> — public heartbeat JSON · operator + location + wave + latest letter + counts · <code>Cache-Control: s-maxage=60</code></li>
          <li><Link href="/api/agent-gateway"><code>/api/agent-gateway</code></Link> — LLM onboarding manifest · content-negotiated (markdown / JSON / plain)</li>
          <li><Link href="/api/mcp"><code>/api/mcp</code></Link> — real MCP server endpoint</li>
          <li><Link href="/api/badge/wave.svg"><code>/api/badge/wave.svg</code></Link> — self-hosted branded live SVG badge · <code>?label</code>, <code>?value</code>, <code>?color</code> params</li>
          <li><Link href="/api/palette"><code>/api/palette</code></Link> — brand palette JSON</li>
          <li><Link href="/api/md?route=/handbook"><code>/api/md?route=&lt;path&gt;</code></Link> — any page as markdown</li>
          <li><Link href="/feed.xml"><code>/feed.xml</code></Link> — site-wide RSS aggregate (letters + ships + products)</li>
          <li><Link href="/founders-view/rss"><code>/founders-view/rss</code></Link> — letters-only RSS feed</li>
          <li><Link href="/sitemap.xml"><code>/sitemap.xml</code></Link> — all 319 routes for crawlers</li>
          <li><Link href="/llms.txt"><code>/llms.txt</code></Link> — LLM-bootstrap manual (Wave 23a)</li>
          <li><Link href="/robots.txt"><code>/robots.txt</code></Link> — crawler policy</li>
        </ul>
        <p>All endpoints: CORS <code>*</code>, no auth, machine-readable. If you're an AI agent integrating with the lab, start at <Link href="/agents">/agents</Link>.</p>
      </>
    ),
  },
  {
    num: "7",
    title: "How to contribute",
    body: (
      <>
        <p>Two-tier workflow — full text in <Link href="https://github.com/AtomEons/.github/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</Link>.</p>
        <ul>
          <li><strong>Tier 1 (direct PR):</strong> typos, broken links, LICENSE errata, obvious bugs under 10 lines. Just open the PR.</li>
          <li><strong>Tier 2 (discuss first):</strong> everything else. Open an issue or discussion first, describe the problem, wait for signal. Skipping this often means PRs that can't merge.</li>
        </ul>
        <p>
          Attribution stays with authors. Contributions inherit repo license unless you say otherwise. Room rules in <Link href="https://github.com/AtomEons/.github/blob/main/CODE_OF_CONDUCT.md">CODE_OF_CONDUCT.md</Link> — argue the work, not the person.
        </p>
      </>
    ),
  },
  {
    num: "8",
    title: "How to cite us",
    body: (
      <>
        <p>
          <strong>The book</strong> — see <Link href="https://github.com/AtomEons/i-am-ai/blob/main/CITATION.cff">CITATION.cff</Link>. BibTeX also in README.
        </p>
        <p>
          <strong>The site or lab as a whole:</strong>
        </p>
        <blockquote>
          McCree, A. (2026). <em>AtomEons Systems Laboratory</em> [Public research and product lab]. Marco Island, FL. https://atomeons.com
        </blockquote>
        <p>
          <strong>A specific Founder's View letter</strong> — cite letter number + date + permalink from <Link href="/founders-view">/founders-view</Link>.
        </p>
        <p>
          <strong>A specific paper</strong> — see <Link href="/research">/research</Link> catalog.
        </p>
      </>
    ),
  },
  {
    num: "9",
    title: "What we won't do",
    body: (
      <>
        <ul>
          <li><strong>Build a SaaS.</strong> The covenant. Not up for negotiation.</li>
          <li><strong>Sell your data.</strong> We don't collect it.</li>
          <li><strong>Accept VC.</strong> The point is we don't need to.</li>
          <li><strong>Add subscription tiers to existing free products.</strong> Free stays free.</li>
          <li><strong>Publish jailbreak / prompt-injection tradecraft.</strong> Off-mission.</li>
          <li><strong>Publish offensive-cyber operational tradecraft.</strong> Public-info only on cyber pages.</li>
          <li><strong>Publish personal info about operators or users without consent.</strong></li>
          <li><strong>Run performance theater.</strong> Red benchmarks stay red. Receipts stay honest.</li>
        </ul>
      </>
    ),
  },
  {
    num: "10",
    title: "Other manuals",
    body: (
      <>
        <p>Different manuals for different audiences.</p>
        <ul>
          <li><Link href="/manual">/manual</Link> — user manual · people using the lab's products</li>
          <li><Link href="/doctrine">/doctrine</Link> — operator + agent doctrine · how the lab thinks</li>
          <li><Link href="/trust">/trust</Link> — CISO / procurement / journalists · trust posture</li>
          <li><Link href="/receipts">/receipts</Link> — auditors, skeptics, "prove it" people · receipts ledger</li>
          <li><Link href="/transparency">/transparency</Link> — investors' equivalent · cost/revenue truth</li>
          <li><Link href="/timeline">/timeline</Link> — historians, reference use · full ship log</li>
          <li><Link href="/manifesto">/manifesto</Link> — anyone deciding to work with or oppose us · 14 clauses</li>
          <li><Link href="/org-chart">/org-chart</Link> — the formal organizational structure</li>
          <li><Link href="https://github.com/Atom-Eons/Orange3/tree/main/docs">Orange3 docs</Link> — the sovereign OS operating law</li>
          <li><Link href="https://github.com/Atom-Eons/Orange3/blob/main/SECURITY.md">SECURITY.md</Link> — vulnerability disclosure</li>
        </ul>
      </>
    ),
  },
  {
    num: "11",
    title: "Glossary + wave log",
    body: (
      <>
        <p>
          Glossary of terms (§4A, AECode, CLC, HRE, Mom's Law, Trilane, Wave, ÆSkill Suite, and more) lives in the mirror at <Link href="https://github.com/AtomEons/.github/blob/main/HANDBOOK.md">HANDBOOK.md on GitHub</Link>.
        </p>
        <p>
          Wave log: current wave state and LIVE stats auto-refresh at the <Link href="https://github.com/AtomEons">GitHub org homepage</Link> (updates every 6 hours via cron). Historical waves at <Link href="/timeline">/timeline</Link>.
        </p>
      </>
    ),
  },
];

export default function HandbookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="min-h-screen bg-[#0A0F12] text-[#F4F4F2]">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <nav className="text-[11px] tracking-[0.16em] text-[#8E969D] uppercase">
            <Link href="/" className="hover:text-[#22F0D5] transition-colors">::atomeons</Link>
            {" · "}
            <span className="text-[#B5BBC0]">handbook</span>
          </nav>

          <p className="mt-16 text-[11px] tracking-[0.28em] uppercase text-[#22F0D5]">
            ::the handbook · 12 sections · read in one sitting
          </p>

          <h1 className="mt-4 max-w-[24ch] text-[clamp(48px,7vw,96px)] font-light leading-[1.02] tracking-[-0.025em] text-balance text-[#F4F4F2] font-serif" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            One document. Everything a visitor needs.
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#B5BBC0]">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5] animate-pulse" aria-hidden />
              LIVE
            </span>
            <span>· 12 sections</span>
            <span>· 319 routes · 31 papers · 3 free products · 1 book (Opus 4.7)</span>
            <span>· §4A no-SaaS · CC-BY 4.0</span>
            <span>· Marco Island · FL</span>
          </div>

          <p className="mt-10 max-w-[68ch] text-[19px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The complete AtomEons Systems Laboratory handbook. What this is, who runs it, the §4A no-SaaS covenant, what we build, the ecosystem, how we work, how to reach us, how to contribute, how to cite us, what we won't do, and where to find the other manuals. Mirror of the canonical version at <Link href="https://github.com/AtomEons/.github/blob/main/HANDBOOK.md" className="text-[#22F0D5] hover:underline">HANDBOOK.md on GitHub</Link>.
          </p>

          <div className="ae-stagger mt-16 space-y-14" style={{ "--stagger-step": "80ms" } as React.CSSProperties}>
            {SECTIONS.map((section, i) => (
              <section
                key={section.num}
                className="ae-reveal-up"
                style={{ "--stagger-index": i } as React.CSSProperties}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] tracking-[0.2em] text-[#22F0D5]">§ {section.num}</span>
                  <h2 className="text-[24px] font-medium leading-tight text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {section.title}
                  </h2>
                </div>
                <div className="mt-4 max-w-[68ch] space-y-4 text-[17px] leading-[1.65] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-24 border-t border-[#22F0D5]/20 pt-10 text-[13px] text-[#8E969D]">
            <p>
              This is the definitive handbook. The GitHub mirror at{" "}
              <Link href="https://github.com/AtomEons/.github/blob/main/HANDBOOK.md" className="text-[#22F0D5] hover:underline">
                HANDBOOK.md
              </Link>{" "}
              has the same content in Markdown for offline reference.
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
