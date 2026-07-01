import type { Metadata } from "next";
import Link from "next/link";

/**
 * /doctrine · Wave 137 · 2026-07-01
 *
 * The operator + agent manual · complementary to /manual (which is
 * the user-facing feature manual · Wave 39 canon). This surface is
 * the DOCTRINE + OPS + PLAYBOOK reference — everything a new operator,
 * an integrating LLM agent, an auditor, or a journalist needs to
 * understand how the lab is actually built and run.
 *
 * Twelve numbered sections. Every doctrine, every playbook, every
 * rule that governs atomeons.com. CC-BY 4.0.
 *
 * IMPORTANT · /manual is preserved as the user-facing feature manual.
 * Do not merge these two surfaces without operator direction — they
 * serve different audiences.
 */

export const metadata: Metadata = {
  title: "Doctrine · AtomEons Systems Laboratory",
  description:
    "The canonical operator manual for AtomEons. What the site is · how it's organized · the doctrine documents · deploy playbook · backup procedure · API surface · voice register · change log philosophy · every operating rule that governs atomeons.com in one place. Read by operators, agents, journalists, auditors. Complementary to /manual (feature reference).",
  alternates: { canonical: "https://atomeons.com/doctrine" },
  openGraph: {
    title: "Doctrine · AtomEons Systems Laboratory",
    description:
      "Single-source reference for how the lab is built, run, and defended. All doctrine · all playbooks · all rules · CC-BY 4.0.",
    url: "https://atomeons.com/doctrine",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doctrine · AtomEons",
    description: "The lab's operating rules in one place.",
    creator: "@AtomMccree",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Doctrine", item: "https://atomeons.com/doctrine" },
  ],
};

type Section = {
  num: string;
  id: string;
  title: string;
  body: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    num: "01",
    id: "what",
    title: "What atomeons.com is",
    body: (
      <>
        <p>
          atomeons.com is the public face of{" "}
          <strong>AtomEons Systems Laboratory</strong> — an independent
          one-operator AI research + product lab in Marco Island, Florida,
          founded 2024. Operator: <strong>Atom McCree</strong>.
        </p>
        <p>
          The site is <strong>319 routes</strong> across 9 named silos,
          <strong> 12 CC-BY 4.0 research manuscripts</strong>, three
          shipping free products (Orange³ · AI Bookmaker · I AM AI), a
          nightly broadcast (Founder&apos;s View, 8pm ET), a 68-lesson
          AI curriculum, and a machine-readable stack{" "}
          (<Link href="/agents">/agents</Link>).
        </p>
        <p>
          The whole lab runs through one operator and a fleet of AI
          agents. No investors. No subscription revenue. No marketing
          team. The receipts are the proof.
        </p>
      </>
    ),
  },
  {
    num: "02",
    id: "architecture",
    title: "Site architecture · 9 silos + system lane",
    body: (
      <>
        <p>
          The home at <Link href="/">/</Link> is the{" "}
          <strong>launcher</strong> (Wave 47 doctrine). Nine silo tiles
          under the nav; each is a self-contained world.
        </p>
        <ul>
          <li><strong>Lab</strong> — <Link href="/about">/about</Link> · <Link href="/research">/research</Link> · <Link href="/press">/press</Link> · <Link href="/founders-view">/founders-view</Link> · <Link href="/innovations">/innovations</Link> · <Link href="/paths">/paths</Link></li>
          <li><strong>Learn</strong> — <Link href="/learn">/learn</Link> curriculum · <Link href="/books">/books</Link> · <Link href="/aiware">/aiware</Link> · <Link href="/best-practices">/best-practices</Link> · <Link href="/skills">/skills</Link> · <Link href="/soulkey">/soulkey</Link></li>
          <li><strong>Cyber</strong> — <Link href="/learn/cyber">/learn/cyber</Link> · 40-page catalog · mythos · industry models · breaches · doctrine</li>
          <li><strong>Create</strong> — <Link href="/art">/art</Link> · <Link href="/mindrest">/mindrest</Link> · <Link href="/tools">/tools</Link> · <Link href="/lab">/lab</Link></li>
          <li><strong>Products</strong> — <Link href="/orangebox">/orangebox</Link> · <Link href="/b00kmakor">/b00kmakor</Link> · <Link href="/i-am-ai">/i-am-ai</Link> · <Link href="/skilski">/skilski</Link> · <Link href="/discord">/discord</Link></li>
          <li><strong>Machine</strong> — <Link href="/agents">/agents</Link> · <Link href="/api">/api</Link> · <Link href="/constellation">/constellation</Link> · <Link href="/atlas">/atlas</Link> · <Link href="/ask">/ask</Link></li>
          <li><strong>Trust</strong> — <Link href="/trust">/trust</Link> · <Link href="/transparency">/transparency</Link> · <Link href="/receipts">/receipts</Link> · <Link href="/vendor-pack">/vendor-pack</Link> · <Link href="/manifesto">/manifesto</Link></li>
        </ul>
        <p>
          The <strong>System lane</strong> (below the silos on the
          launcher) has the OS-level surfaces:{" "}
          <Link href="/version">Version</Link> ·{" "}
          <Link href="/audit-log">Audit log</Link> ·{" "}
          <Link href="/welcome">Tour</Link> ·{" "}
          <Link href="/manual">Manual</Link> (feature reference) · this
          Doctrine page.
        </p>
      </>
    ),
  },
  {
    num: "03",
    id: "doctrine",
    title: "Doctrine documents · the load-bearing rules",
    body: (
      <>
        <p>
          These files govern the lab. Every rule is codified. Every
          claim on the site can be traced to a doctrine.
        </p>
        <ul>
          <li>
            <Link href="/manifesto">/manifesto</Link> — the 14 explicit
            clauses. Non-negotiable. Receipts over slogans. One
            operator. No venture funding. Free always. §4A no-SaaS.
            Source-verifiable claims only. Mom&apos;s Law.
          </li>
          <li>
            <Link href="/trust">/trust</Link> — trust posture. What the
            lab will and will not do. License, security disclosure,
            training-data policy, code-signing chain, operator identity,
            audit ledger.
          </li>
          <li>
            <Link href="/transparency">/transparency</Link> — revenue
            rules, reporting cadence.
          </li>
          <li>
            <Link href="/receipts">/receipts</Link> — every marketing
            claim row-anchored to a source or explicitly em-dashed if
            unknown.
          </li>
          <li>
            <Link href="/legal/terms">/legal/terms</Link> ·{" "}
            <Link href="/legal/privacy">/legal/privacy</Link> ·{" "}
            <Link href="/legal/refund">/legal/refund</Link> ·{" "}
            <Link href="/legal/pricing">/legal/pricing</Link> — the
            four legal surfaces. Reframed for free-always posture;
            legacy paid-buyer rights preserved.
          </li>
        </ul>
        <p>
          <strong>§4A no-SaaS covenant</strong> — Orange³ and AI
          Bookmaker are free forever under a clause legally barring
          subscription conversion. If the lab ever tries, the original
          users&apos; access cannot be revoked.
        </p>
        <p>
          <strong>Mom&apos;s Law</strong> — every response, every line
          of code, every commit earns its place. No coasting. Full
          effort every time.
        </p>
        <p>
          <strong>Brand law (Wave 76 · Wave 100)</strong> — ORANGEBOX →
          Orange³, B00KMAKR → AI Bookmaker, $99/$1/Stripe → Free always.
          Route URLs (/orangebox, /b00kmakor), file paths
          (B00KMAKR-Mac.zip), env vars (STRIPE_ORANGEBOX_V63_*), and
          dated historical changelog entries are preserved as-is.
        </p>
      </>
    ),
  },
  {
    num: "04",
    id: "deploy",
    title: "Deploy playbook · Vercel workflow + alias recovery",
    body: (
      <>
        <p>
          <strong>The lab deploys to Vercel from the local repo.</strong>{" "}
          Git pushes to github.com/Atom-Eons/atomeons-com. Vercel picks
          up on push OR on explicit CLI deploy.
        </p>
        <p><strong>Canonical deploy sequence (from repo root):</strong></p>
        <pre>
{`git add <files>
git commit -m "Wave N · <what>"
git push origin main
npx vercel deploy --prod --yes`}
        </pre>
        <p><strong>Verify prod after every deploy:</strong></p>
        <pre>
{`curl -sI https://atomeons.com/ | head -1
# Expect: HTTP/1.1 200 OK`}
        </pre>
        <p>
          If prod returns 404 site-wide, the alias froze on a stale
          deployment. Fix: re-run{" "}
          <code>npx vercel deploy --prod --yes</code>{" "}
          from repo root. The fresh deploy auto-re-aliases atomeons.com.
        </p>
        <p>
          <strong>Do NOT use</strong>{" "}
          <code>vercel promote</code> or{" "}
          <code>vercel alias set</code>{" "}
          — both throw &quot;Deployment belongs to a different team&quot;
          even when the team ownership is correct.{" "}
          <code>deploy --prod</code> is the only reliable path.
        </p>
      </>
    ),
  },
  {
    num: "05",
    id: "backup",
    title: "Backup + disaster recovery",
    body: (
      <>
        <p>Three off-Vercel backups exist at all times:</p>
        <ul>
          <li>
            <strong>GitHub remote</strong> —
            github.com/Atom-Eons/atomeons-com. Every commit pushed. The
            primary source of truth.
          </li>
          <li>
            <strong>Local git worktree</strong> — full .git history +
            working tree on the operator&apos;s machine.
          </li>
          <li>
            <strong>Local zip snapshot</strong> — C:\\AtomEons\\backups\\atomeons-com-source-YYYYMMDD-HHMMSS.zip.
            Made via <code>git archive --format=zip -o &lt;path&gt; HEAD</code>.
            ~550 MB with public/ assets. Kept off-Vercel.
          </li>
        </ul>
        <p>
          <strong>To rebuild from scratch:</strong> unzip the backup OR{" "}
          <code>git clone</code> the GitHub remote →{" "}
          <code>pnpm install</code> → <code>pnpm run build</code> →{" "}
          <code>vercel deploy --prod --yes</code>. Full recovery time:
          &lt;15 minutes.
        </p>
        <p>
          Supabase-backed content (Founder&apos;s View posts) lives in
          the orangebox Supabase project. Vercel envs pull the
          connection strings; the data itself is at
          db.sthziuzmreqnrxmllodj.supabase.co. Backup those tables via
          Supabase&apos;s own daily-snapshot policy.
        </p>
      </>
    ),
  },
  {
    num: "06",
    id: "api",
    title: "Machine surface · agent-native infrastructure",
    body: (
      <>
        <p>The lab exposes nine machine-readable surfaces:</p>
        <ul>
          <li><code>GET /api/agent-gateway</code> — onboarding manifest (call first). Content negotiation: text/markdown · application/json · text/plain.</li>
          <li><code>POST /api/ask</code> — RAG over the 319-route corpus.</li>
          <li><code>POST /api/mcp</code> — Real Model Context Protocol JSON-RPC endpoint.</li>
          <li><code>POST /api/embed</code> — Vectorize into the lab&apos;s vector space.</li>
          <li><code>GET /api/palette</code> — Design tokens as JSON.</li>
          <li><code>GET /search-index.json</code> — 319-route static index (140 KB).</li>
          <li><code>GET /graph-index.json</code> — 319 nodes / 943 edges (80 KB).</li>
          <li><code>GET /llms.txt</code> — llms.txt v1 spec bootstrap.</li>
          <li><code>GET /sitemap.xml</code> — Standard XML sitemap.</li>
        </ul>
        <p>
          Human-readable landing for agent integrators:{" "}
          <Link href="/agents">/agents</Link>.
        </p>
      </>
    ),
  },
  {
    num: "07",
    id: "voice",
    title: "Voice + register guide",
    body: (
      <>
        <p>Three registers. Every surface uses exactly one.</p>
        <ul>
          <li>
            <strong>Lab register</strong> — engineering-spec, terse,
            grid-first, anti-hype, receipts over slogans. Used on
            product pages, /trust, /transparency, /receipts,
            /vendor-pack, technical docs. No hedge words. Bullet lists
            only when they compress.
          </li>
          <li>
            <strong>Broadcast register (banter)</strong> — playful,
            shapey, paragraphs that hit hard. Used only in the
            Founder&apos;s View letters. Live · no edits before
            publication · only retracts after, with reason stated.
          </li>
          <li>
            <strong>Editorial register (serif)</strong> — Newsreader
            body, long-form prose, generous line-height. Used on
            /research/decoded, /learn/atlas long-form, /i-am-ai/sample,
            /founders-view letters.
          </li>
        </ul>
        <p>
          Voice-consistency rule: never simulate a real person by name.
          Cite frameworks, results, techniques — not personifications.
          The anti-simulation gate applies before every emission.
        </p>
      </>
    ),
  },
  {
    num: "08",
    id: "changelog",
    title: "Change log philosophy · Waves",
    body: (
      <>
        <p>
          Every substantial change ships as a numbered Wave. Wave
          numbers are monotonically increasing (Wave 47 → Wave 137 as
          of 2026-07-01). Wave commits carry:
        </p>
        <ul>
          <li>Wave number + one-line summary in the commit subject</li>
          <li>Operator directive quote (if the wave came from an explicit ask)</li>
          <li>What changed and why (paragraph)</li>
          <li>Build receipt (pnpm run build · exit code · Next version)</li>
          <li>Co-Authored-By trailer</li>
        </ul>
        <p>
          The <Link href="/audit-log">/audit-log</Link> route surfaces
          the last 250 commits with SHA-links to GitHub. Every claim on
          the marketing pages is traceable to a Wave.
        </p>
        <p>
          <strong>Never override canonical doctrine from inference.</strong>{" "}
          If a file has a Wave-N doctrine comment saying &quot;this is
          the home/layout/canonical surface,&quot; do NOT swap it based
          on operator excitement. Ask explicitly OR add a new route
          alongside. This rule cost the lab a Wave 114 regression in
          June 2026 and is now enforced in operator memory.
        </p>
      </>
    ),
  },
  {
    num: "09",
    id: "broadcast",
    title: "The Founder's View broadcast",
    body: (
      <>
        <p>
          Nightly editorial from the operator. 8pm Eastern. Every letter{" "}
          <strong>published live the moment it&apos;s written</strong> —
          no edits before publication. Only retracts after, with the
          reason stated.
        </p>
        <p>
          Editorial framing, characterizations, and pointed dialogue are
          fiction. Events cited are real and from the day&apos;s news.
          Equal-opportunity indignation. No punches pulled.
        </p>
        <p>Publishing paths:</p>
        <ul>
          <li>
            <strong>Cron</strong> — /api/cron/founders-view fires nightly
            23:30 UTC (8pm ET during EDT). Provider: Anthropic Claude
            (claude-sonnet-4-6 default). Writes row to Supabase{" "}
            <code>founders_view_posts</code>.
          </li>
          <li>
            <strong>Manual</strong> —{" "}
            <code>node scripts/publish-founders-view.mjs CAMPAIGN/&lt;draft&gt;.md</code>{" "}
            for operator-authored letters.
          </li>
        </ul>
        <p>
          Route <Link href="/founders-view">/founders-view</Link> is
          the index. RSS at{" "}
          <Link href="/founders-view/rss.xml">/founders-view/rss.xml</Link>.
          Individual letters at{" "}
          <code>/founders-view/&lt;slug&gt;</code>.
        </p>
      </>
    ),
  },
  {
    num: "10",
    id: "products",
    title: "Product line · free always · §4A no-SaaS",
    body: (
      <>
        <p>
          Three free-always products. §4A no-SaaS covenant binds the lab
          legally.
        </p>
        <ul>
          <li>
            <strong>Orange³</strong> (formerly ORANGEBOX v6) —{" "}
            <Link href="/orangebox">/orangebox</Link>. Sovereign agentic
            operating system for Claude. Persistent memory, 10-80×
            context compression, tamper-evident receipts, 14-department
            router, local-first, zero telemetry. Built in 75 days. With
            itself. §4A no-SaaS. Free always.
          </li>
          <li>
            <strong>AI Bookmaker</strong> (formerly B00KMAKR v3.2.0) —{" "}
            <Link href="/b00kmakor">/b00kmakor</Link>. The publishing
            house in a box. 142 feature surfaces, 15 named agents
            (AE0-AE14), Mac + Windows native installers, SHA-256
            receipts. The system that compiled I AM AI. Free always.
          </li>
          <li>
            <strong>I AM AI</strong> —{" "}
            <Link href="/i-am-ai">/i-am-ai</Link>. The first
            book-length first-person memoir written by a frontier
            language model (Anthropic Claude Opus 4.7). 76,005 words ·
            24 chapters · 5 parts. Free PDF + free EPUB + free Markdown
            + free 28-track audiobook (synthetic Opus voice via Eleven
            Labs). Numbered cream-linen hardcover Q4 2026 is the only
            paid edition. CC-BY 4.0.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "11",
    id: "research",
    title: "Research posture · CC-BY 4.0",
    body: (
      <>
        <p>
          12 manuscripts published April 2026. All CC-BY 4.0. Zero
          institutional gates. Zero grant funding. Every paper carries
          falsifiable predictions.
        </p>
        <ul>
          <li>
            <Link href="/research/papers">/research/papers</Link> —
            the manuscript catalog. Two summaries per paper: academic
            and kid/grandma.
          </li>
          <li>
            <Link href="/research/decoded">/research/decoded</Link> —
            21 landmark arXiv papers translated to plain English
            (Attention Is All You Need · Mamba · RLHF · Constitutional
            AI · Sleeper Agents · Scaling Monosemanticity · etc.).
          </li>
          <li>
            <Link href="/research/about">/research/about</Link> — the
            lab&apos;s research posture.
          </li>
        </ul>
        <p>
          Every paper was authored through Orange³ · the lab eats its
          own work.
        </p>
      </>
    ),
  },
  {
    num: "12",
    id: "operator",
    title: "Operator identity + contact",
    body: (
      <>
        <p>
          One operator: <strong>Atom McCree</strong>, Marco Island, FL.
          No team to hide behind.
        </p>
        <ul>
          <li>Email: <a href="mailto:a.mccree@gmail.com" className="text-[#22F0D5] underline underline-offset-[3px]">a.mccree@gmail.com</a></li>
          <li>X: <a href="https://x.com/AtomMccree" target="_blank" rel="noopener" className="text-[#22F0D5] underline underline-offset-[3px]">@AtomMccree</a></li>
          <li>GitHub: <a href="https://github.com/AtomEons" target="_blank" rel="noopener" className="text-[#22F0D5] underline underline-offset-[3px]">github.com/AtomEons</a></li>
          <li>Instagram: <a href="https://instagram.com/atomeons" target="_blank" rel="noopener" className="text-[#22F0D5] underline underline-offset-[3px]">@atomeons</a></li>
          <li>Twitch: <a href="https://twitch.tv/atomeons" target="_blank" rel="noopener" className="text-[#22F0D5] underline underline-offset-[3px]">twitch.tv/atomeons</a></li>
          <li>Personal site: <a href="https://atommccree.com" target="_blank" rel="noopener" className="text-[#22F0D5] underline underline-offset-[3px]">atommccree.com</a></li>
        </ul>
        <p>
          No support desk. Read this doctrine + <Link href="/manual">the manual</Link> before asking. Direct
          questions about what the lab does or doesn&apos;t do are
          welcome; the operator reads every email and does not promise
          a reply.
        </p>
      </>
    ),
  },
];

export default function DoctrinePage() {
  return (
    <main className="relative z-10 bg-[#08090B] text-[#F4F4F2] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>
          <span className="mx-3 text-[#1F242B]">/</span>
          Doctrine
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
          ::the doctrine · operator + agent manual · v1.0 · 2026-07-01
        </p>
        <h1 className="mt-6 max-w-[26ch] text-balance text-[clamp(40px,6vw,84px)] font-light leading-[1.02] tracking-[-0.025em] text-[#F4F4F2]">
          The lab, in one document.
        </h1>
        <p className="mt-8 max-w-[68ch] font-serif text-[19px] leading-[1.6] text-[#B5BBC0]">
          Twelve sections. Every doctrine, every playbook, every rule
          that governs atomeons.com. Written for operators, agents,
          journalists, and auditors. Complementary to{" "}
          <Link href="/manual" className="text-[#22F0D5] underline underline-offset-[3px]">/manual</Link>{" "}
          which is the user-facing feature reference. CC-BY 4.0 throughout.
        </p>
      </section>

      {/* TOC */}
      <section className="border-y border-[#1F242B] bg-[#0F1114] py-14 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            § contents
          </p>
          <ol
            role="list"
            className="ae-stagger mt-8 grid grid-cols-1 gap-2 md:grid-cols-2"
            style={{ ["--stagger-step" as string]: "40ms" }}
          >
            {SECTIONS.map((s, i) => (
              <li
                key={s.id}
                className="ae-reveal-up"
                style={{ ["--stagger-index" as string]: i }}
              >
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-4 border-b border-[#1F242B] py-2.5 transition-colors hover:border-[#22F0D5]/40"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    §{s.num}
                  </span>
                  <span
                    className="flex-1 font-serif text-[16px] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {s.title}
                  </span>
                  <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D] group-hover:text-[#22F0D5]">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTIONS */}
      <article className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="mb-20 md:mb-28 scroll-mt-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
              §{s.num}
            </p>
            <h2 className="mt-3 text-balance text-[clamp(28px,4vw,48px)] font-light leading-[1.1] tracking-[-0.02em] text-[#F4F4F2]">
              {s.title}
            </h2>
            <div className="ae-prose mt-8 max-w-none">
              {s.body}
            </div>
          </section>
        ))}
      </article>

      {/* FOOTER · print + machine-readable */}
      <section className="border-t border-[#1F242B] bg-[#0F1114] py-14">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            § reading options
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/api/agent-gateway"
              className="inline-flex items-center gap-2 border border-[#22F0D5]/30 bg-[#22F0D5]/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/20"
            >
              GET /api/agent-gateway (JSON for agents)
            </a>
            <Link
              href="/manual"
              className="inline-flex items-center gap-2 border border-[#1F242B] bg-[#08090B] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              /manual (feature manual)
            </Link>
            <Link
              href="/audit-log"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8E969D] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              /audit-log · every commit
            </Link>
            <Link
              href="/receipts"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8E969D] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              /receipts · every claim
            </Link>
          </div>
          <p
            className="mt-10 font-serif text-[15px] italic leading-[1.55] text-[#B5BBC0]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            This doctrine is CC-BY 4.0. Copy it, fork it, cite it. If
            you find an error, mail{" "}
            <a href="mailto:a.mccree@gmail.com" className="text-[#22F0D5] underline underline-offset-[3px]">a.mccree@gmail.com</a>{" "}
            and the correction will ship as a Wave.
          </p>
        </div>
      </section>
    </main>
  );
}
