import type { Metadata } from "next";
import Link from "next/link";
import { OrangeBoxV63Buy } from "../_components/OrangeBoxV63Buy";
import { CountdownTimer } from "./CountdownTimer";

/**
 * /orangebox — public launch page.
 *
 * Rebuilt 2026-05-30 around the new three-product separation and the
 * free-for-one-week → $99 launch posture:
 *
 *   1. AE Operations — the systems layer (routing, departments, MCP
 *      tools, gates, recovery, installer).
 *   2. ORANGEBOX (cockpit) — the command surface (mission routes,
 *      party-line, receipts, artifacts, canvas).
 *   3. Delta — the visual-intelligence IDE replacement (Cursor / VS
 *      Code category, but built around the operator's project graph
 *      instead of a flat file tree).
 *
 * Page voice: plain language for the first half, technical depth for
 * the second half. Operator directive — "walk em in slow, then get
 * technical for the hackers/pros." Non-tech readers should be able to
 * understand WHAT the system is before any acronym appears.
 *
 * Pricing posture:
 *   - Free for one week from launch (countdown live via env var
 *     NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT)
 *   - After countdown: $99 once, forever
 *   - Public messaging: price may change at random — lock in now
 *
 * Public checkout flow unchanged — OrangeBoxV63Buy + email inquire
 * fallback until binary is uploaded.
 */

export const metadata: Metadata = {
  title:
    "ORANGEBOX · AE Operations · Delta IDE — FREE for one week, then $99 · AtomEons",
  description:
    "Three tools, one operator-grade system. AE Operations runs the infrastructure. ORANGEBOX is the command cockpit. Delta is the visual-intelligence IDE that replaces Cursor and VS Code for AI-first builders. FREE for one week after launch. Then $99 once, forever. License §4A bans subscription. Price may change at random after the free week — lock in now.",
  keywords: [
    "ORANGEBOX",
    "ORANGEBOX Command",
    "AE Operations",
    "Delta IDE",
    "visual intelligence IDE",
    "Cursor replacement",
    "VS Code AI replacement",
    "AI operations cockpit",
    "AI cockpit",
    "MCP cockpit",
    "Claude Code cockpit",
    "AI builder",
    "local-first AI",
    "no subscription AI",
    "License §4A",
    "free launch week",
    "AtomEons",
  ],
  alternates: { canonical: "https://atomeons.com/orangebox" },
  openGraph: {
    title: "ORANGEBOX + AE Operations + Delta — FREE for one week",
    description:
      "Three-tool bundle. The cockpit. The systems layer. The visual-intelligence IDE. FREE for one week from launch · then $99 · price may change at random.",
    url: "https://atomeons.com/orangebox",
    siteName: "AtomEons",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX launch — FREE for one week",
    description:
      "AE Operations · ORANGEBOX cockpit · Delta IDE. Free for one week, then $99 · may change at random.",
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
};

// ─────────────────────────────────────────────────────────────────────
// THE THREE PRODUCTS — plain-language framing + technical depth
// ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: "ae-operations",
    name: "AE Operations",
    tagline: "The systems layer.",
    plain:
      "Think of it as the engine room of your AI work. You never look at it directly, but everything else stops working without it.",
    plainScenario:
      "You sit down to keep working on the same project you were on yesterday. AE Operations remembers where you left off — what was decided, what was tried, what failed, which AI model handled which part. You don't have to re-explain anything. You don't have to dig through old chat tabs. The system carried the thread.",
    technicalDepth:
      "Mission-route compiler turning operator intent into a structured DAG (objective · macro-actions · department assignments · model lane · proof gates · rollback policy · receipt id). AE0–AE14 department routing with capability/permission/effort/evidence binding. 60+ MCP tools wired through a router. Multi-model lanes (Claude · GPT · Gemini · Groq LPUs · Ollama · OpenRouter — 200+ models). Constitutional Guardrails (27 rules) enforced at every gate. Local-first state, JSONL receipts on disk, party-line bus, recovery sequencer. Zero telemetry.",
    glyphs: ["⚙ install", "◆ lanes", "▣ diagnostics", "↺ recovery", "✓ guardrails"],
    accent: "#FFB87A",
  },
  {
    id: "orangebox-cockpit",
    name: "ORANGEBOX",
    tagline: "The cockpit you actually look at.",
    plain:
      "The dashboard. The part of the system you see, click, and watch while AI does work. It shows you what's happening, lets you approve when it matters, and keeps every decision so you can prove what happened later.",
    plainScenario:
      "You give the cockpit a project: 'rewrite this client proposal, then draft three follow-up emails, then schedule them.' The cockpit shows each piece getting done in its own panel, with a green check when it's right and a red flag where you need to look. When the client asks 'when did you send that?' the receipt is right there.",
    technicalDepth:
      "AE See-Suite command surface. Mission routes rendered as visual graphs (not chat scroll). Party-line panel for structured worker messages, not loose transcript dumps. Silent Canvas pushes structural state into the UI rather than burying it in logs. Receipt timeline + artifact viewer + visual proof panel per route. Configurable per-route refusal posture (the operator decides what the cockpit will refuse, not Anthropic's training board). Constitutional Guardrails visible at every protected action. Built on Tauri 2 + Next 16; runs as a native desktop app on Windows 10/11 today, macOS + Linux on the v6.x roadmap.",
    glyphs: ["⌖ route", "◉ party-line", "▤ receipts", "✦ canvas", "✋ approve"],
    accent: "#FF7A1A",
  },
  {
    id: "delta-ide",
    name: "Delta",
    tagline: "The visual-intelligence IDE.",
    plain:
      "This is what replaces Cursor or VS Code if you write code with AI in the loop. Instead of showing you 'just files,' it shows you what your project actually IS — every connection, every decision, every place AI changed something — so you stay in control even when AI is moving fast.",
    plainScenario:
      "You ask AI to refactor a piece of your code. In a traditional IDE you scroll through diffs and hope you catch the breakage. In Delta the project graph rearranges visually: the function that just got moved is highlighted, the three callers that depend on it are pulsing, the test file that's now stale is flagged red. You see the BLAST RADIUS before you approve.",
    technicalDepth:
      "Visual-intelligence IDE built for AI-in-the-loop development. Project graph (modules · types · symbols · imports · tests · receipts) rendered as a live spatial map, not a flat tree. Every AI change is a node in the graph with provenance: which model · which prompt · which receipt id. Stale-test detection runs against the project graph instead of file mtimes. Blast-radius visualization on every proposed change. Native LSP integration. Built on the same Tauri + AE Operations spine as the cockpit, so a project edited in Delta carries the same receipts the cockpit shows. Replaces the Cursor / VS Code lane for operators whose code work is mostly AI-orchestrated review-and-approve rather than line-by-line typing.",
    glyphs: ["▦ project graph", "⟁ blast radius", "⌖ receipts", "✦ visual diff", "✓ stale-detect"],
    accent: "#22F0D5",
  },
];

// ─────────────────────────────────────────────────────────────────────
// COMPREHENSIVE FEATURE MATRIX
// ─────────────────────────────────────────────────────────────────────

const FEATURE_GROUPS = [
  {
    label: "Operator surface",
    items: [
      "Mission routes — structured project objects (objective · macro-actions · departments · lane · gates · rollback · receipt id)",
      "Party-line bus — structured worker messages, no loose transcript dumps",
      "Silent Canvas — structural state lives in the UI, not in chat scroll",
      "Receipt timeline per route — every protected action proves what happened",
      "Artifact viewer — files, diffs, screenshots, proof attached to the route they came from",
      "Visual proof panel — before/after for the operator-approved changes",
      "Configurable refusal posture — you set what the cockpit will and won't do",
    ],
  },
  {
    label: "AI orchestration",
    items: [
      "Multi-model routing — Claude (Anthropic) · GPT (OpenAI) · Gemini (Google) · Groq LPUs · Ollama (local) · OpenRouter (200+ models)",
      "Per-task model selection — assign the right AI to the right job",
      "AE0–AE14 department routing — work flows through specialized lanes by domain",
      "60+ MCP tools wired through a single router — extensible, open-protocol",
      "27 Constitutional Guardrails — enforced at every gate, visible at every protected action",
      "Adversarial review engines — verify before commit, catch fabrications",
      "Mission-graph DAG — survives context resets, model switches, restarts",
    ],
  },
  {
    label: "Visual-intelligence IDE (Delta)",
    items: [
      "Project graph — modules, types, symbols, imports, tests rendered as a live spatial map",
      "Blast-radius visualization — see what an AI-proposed change actually touches",
      "Stale-test detection against the graph, not file mtimes",
      "Per-change provenance — every AI edit carries model · prompt · receipt id",
      "Native LSP integration — language servers wired into the visual layer",
      "Receipts inline — the cockpit's receipts available in the editor",
      "Hand-edit and AI-edit lanes side-by-side, same receipts pipeline",
    ],
  },
  {
    label: "Installation & systems",
    items: [
      "Basic Install — one computer, one operator, default",
      "Optional AI Box — second-machine heavy-work handoff, never required",
      "Ethereal AI Link — direct network setup module (approved + reviewable)",
      "First-run wizard — one question (Do you have an AI computer to set up?)",
      "Diagnostics panel — package health, lane reachability, model availability",
      "Recovery sequencer — when something breaks, the system tells you what and how",
      "Windows 10/11 x64 today · macOS + Linux on the v6.x roadmap",
    ],
  },
  {
    label: "Privacy & ownership",
    items: [
      "Zero telemetry — no phone-home, no analytics, no cohort-tracking",
      "Local-first state — your data lives on your machine",
      "Source included in the bundle — inspect freely, modify for personal or single-business use",
      "JSONL receipts on disk — not on a vendor's server",
      "Your BYO API keys — no AtomEons rate-limiter, no markup on token cost",
      "License §4A — legally bans switching to subscription (locked, see /legal/terms)",
      "If AtomEons ever attempts subscription switch, every existing buyer keeps their license free in perpetuity",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────
// HONEST FOR / NOT FOR
// ─────────────────────────────────────────────────────────────────────

const FOR_OPERATORS = [
  "solo founders running multi-disciplinary work alone",
  "tech leads who need a private command suite with receipts",
  "researchers and lab operators who need durable proof",
  "consultants whose client work needs an audit trail",
  "indie builders tired of losing context to chat scroll, browser memory, tool drift",
  "developers ready to leave Cursor / VS Code for an AI-graph-native IDE",
];

const NOT_FOR_PEOPLE_WHO = [
  "only want a generic chat app — Claude, ChatGPT, Gemini do that better",
  "require cloud-native multi-tenant SaaS on day one — this is local-first by construction",
  "want 'magic AI' status without operator control — the cockpit puts you in the approval loop",
  "lead with 'does it have an iOS app' — desktop-first, Tauri-based, native binary",
  "want a 'subscription that gets better forever' — License §4A is the opposite contract",
];

// ─────────────────────────────────────────────────────────────────────
// PRODUCT LAW — the six-line operator doctrine
// ─────────────────────────────────────────────────────────────────────

const PRODUCT_LAW = [
  "AE See-Suite commands.",
  "AE Operations configures.",
  "Workers execute.",
  "Receipts prove.",
  "Review engines challenge.",
  "The operator approves protected actions.",
];

// ─────────────────────────────────────────────────────────────────────
// JSON-LD
// ─────────────────────────────────────────────────────────────────────

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ORANGEBOX Command + AE Operations + Delta",
  alternateName: ["ORANGEBOX", "AE Operations", "Delta IDE"],
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "AI Operations Cockpit",
  operatingSystem: "Windows 10, Windows 11",
  description:
    "Three-tool bundle: ORANGEBOX cockpit, AE Operations systems layer, Delta visual-intelligence IDE. FREE for one week post-launch, then $99 once, forever. License §4A bans subscription.",
  offers: {
    "@type": "Offer",
    price: "99.00",
    priceCurrency: "USD",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/PreOrder",
    seller: {
      "@type": "Organization",
      name: "AtomEons Systems Laboratory",
      url: "https://atomeons.com",
    },
  },
  author: {
    "@type": "Person",
    name: "Atom McCree",
    url: "https://atomeons.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "ORANGEBOX", item: "https://atomeons.com/orangebox" },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────

export default function OrangeBox() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> ORANGEBOX · public launch
        </p>
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-[#1A2225] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 60% 20%, rgba(255,138,61,0.18) 0%, transparent 60%), radial-gradient(50% 45% at 15% 90%, rgba(34,240,213,0.14) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A1A]/40 bg-[#FF7A1A]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF7A1A] shadow-[0_0_8px_rgba(255,122,26,0.7)]" />
              public launch · three-tool bundle · marco island fl
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              free week · then $99 · price may change at random
            </span>
          </div>

          <h1 className="mt-7 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.025em] md:text-7xl lg:text-[7.5rem] lg:leading-[0.94]">
            One operator,
            <br />
            <span className="text-[#FF7A1A]">three tools,</span>
            <br />
            one system.
          </h1>
          <p className="mt-9 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            ORANGEBOX is the cockpit you look at. AE Operations is the
            engine room you don&apos;t. Delta is the visual-intelligence
            IDE that replaces Cursor and VS Code for builders who work
            with AI in the loop. Three tools, one bundle, one operator,
            one system that remembers what happened.
          </p>

          {/* COUNTDOWN — the marquee element */}
          <div className="mt-12">
            <CountdownTimer postCountdownPrice="$99" />
          </div>

          {/* primary CTA strip */}
          <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1fr]">
            <OrangeBoxV63Buy
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A1A] px-7 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_0_60px_rgba(255,122,26,0.40)] transition-all hover:bg-[#FFA45A] disabled:opacity-60"
              label="download / inquire →"
            />
            <a
              href="#walkthrough"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-7 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/15"
            >
              walk me through it ↓
            </a>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::a.mccree@gmail.com · ~2h reply in ET waking hours · embargo: none
          </p>
        </div>
      </section>

      {/* PLAIN-LANGUAGE INTRO — the walk-in */}
      <section
        id="walkthrough"
        className="scroll-mt-24 border-b border-[#1A2225] py-20 md:py-28 bg-[#0e2520]/30"
      >
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::what this actually is · before any acronym
          </p>
          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            In real language, no jargon.
          </h2>
          <div className="mt-10 space-y-6 text-base leading-[1.75] text-[#C8CCCE] md:text-[18px]">
            <p>
              If you have ever worked with AI on a real project for
              more than a week, you know the failure mode. You start
              fresh each session. The AI forgets context. You have to
              re-explain what was decided yesterday. Tabs scatter
              across the browser. Receipts of what AI did for you live
              nowhere. When something breaks, you have no map to
              follow back.
            </p>
            <p>
              This system is the answer to that. <strong>One workspace</strong>{" "}
              that holds onto your project across sessions. The AI
              models are tools INSIDE that workspace. The workspace
              owns the memory, the receipts, the decisions, the
              approval gates. The AI does the heavy lifting; the
              workspace makes sure none of it gets lost.
            </p>
            <p>
              It comes as three connected tools because operators do
              three different kinds of work. The <strong className="text-[#FFB87A]">Operations</strong> layer
              is the engine room — quiet, working in the background,
              keeping everything connected. The <strong className="text-[#FF7A1A]">ORANGEBOX</strong> cockpit
              is the dashboard you actually look at — the place where
              you give the system work, approve protected actions,
              and watch progress with proof. The <strong className="text-[#22F0D5]">Delta</strong> IDE is
              for builders who write code with AI; it shows your project
              as a living graph, so when AI changes something you can
              see the blast radius before you say yes.
            </p>
            <p>
              All three pieces run on YOUR computer. Your data stays on
              your computer. Your API keys, your conversations, your
              files — yours. The system takes zero markup on what you
              pay your AI providers. You buy the system once. The
              license legally forbids us from switching to a
              subscription model — that&apos;s clause §4A, and it&apos;s
              binding.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-[#22F0D5]/30 bg-[#22F0D5]/05 p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              ::the operator law · six lines
            </p>
            <ul className="mt-4 space-y-2 text-base leading-[1.55] text-[#F2F4F5] md:text-lg">
              {PRODUCT_LAW.map((l, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs font-bold tabular-nums text-[#22F0D5]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* THE THREE PRODUCTS · plain → technical per product */}
      <section
        id="products"
        className="scroll-mt-24 border-b border-[#1A2225] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::the three products · one bundle
          </p>
          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Three tools.{" "}
            <span className="text-[#FF7A1A]">One install.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.6] text-[#9BA5A7] md:text-lg">
            Each one stands alone. They sing together. Read each in
            plain English first, then the technical depth if you want
            it.
          </p>

          <div className="mt-16 space-y-16">
            {PRODUCTS.map((p, idx) => (
              <article
                key={p.id}
                id={p.id}
                className="scroll-mt-24 grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12"
              >
                <header>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.32em]"
                    style={{ color: p.accent }}
                  >
                    ::tool {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-3 text-balance text-3xl font-semibold leading-[1.04] tracking-tight md:text-5xl"
                    style={{ color: p.accent }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="mt-3 text-lg font-medium leading-[1.4] text-[#F2F4F5] md:text-xl"
                  >
                    {p.tagline}
                  </p>
                  <ul className="mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    {p.glyphs.map((g) => (
                      <li key={g} className="flex items-center gap-2">
                        <span
                          className="size-1.5 rounded-full"
                          style={{ background: p.accent }}
                        />
                        {g}
                      </li>
                    ))}
                  </ul>
                </header>

                <div className="space-y-7">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                      ::plain english · for everyone
                    </p>
                    <p className="mt-3 text-base leading-[1.75] text-[#F2F4F5] md:text-lg">
                      {p.plain}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: p.accent }}
                    >
                      ::what it does in real life
                    </p>
                    <p className="mt-3 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
                      {p.plainScenario}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                      ::for the hackers and pros · technical depth
                    </p>
                    <p className="mt-3 text-sm leading-[1.7] text-[#9BA5A7] md:text-base">
                      {p.technicalDepth}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FEATURE MATRIX */}
      <section
        id="features"
        className="scroll-mt-24 border-b border-[#1A2225] bg-[#0e2520]/20 py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::every feature · grouped by surface
          </p>
          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            The whole matrix.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.6] text-[#9BA5A7] md:text-lg">
            Everything the bundle ships with on day one. No checklist
            theater — every line below is something the system does
            today.
          </p>

          <div className="mt-12 space-y-10">
            {FEATURE_GROUPS.map((g, gi) => (
              <div key={g.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
                  ::{String(gi + 1).padStart(2, "0")} · {g.label}
                </p>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {g.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4 text-sm leading-[1.55] text-[#C8CCCE] md:text-[15px]"
                    >
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR / NOT FOR */}
      <section className="border-b border-[#1A2225] py-20 md:py-28">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::who picks this · honest screening
          </p>
          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            For who. <span className="text-[#9BA5A7]">Not for who.</span>
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#22F0D5]/05 p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::for
              </p>
              <ul className="mt-5 space-y-3 text-base leading-[1.6] text-[#F2F4F5]">
                {FOR_OPERATORS.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-[#22F0D5]">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#FFB87A]/05 p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::NOT for
              </p>
              <ul className="mt-5 space-y-3 text-base leading-[1.6] text-[#F2F4F5]">
                {NOT_FOR_PEOPLE_WHO.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-[#FFB87A]">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING + COUNTDOWN (again) + DISCLOSURE */}
      <section
        id="pricing"
        className="scroll-mt-24 border-b border-[#1A2225] py-20 md:py-28 bg-gradient-to-b from-[#0e2520]/30 via-[#1C0F08]/40 to-[#0e2520]/30"
      >
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::pricing · launch terms
          </p>
          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            FREE for a week.{" "}
            <span className="text-[#22F0D5]">Then $99.</span>{" "}
            <span className="text-[#FFB87A]">May change at random.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
            The first week of public availability the entire bundle is
            free — full source, full features, no signup, no email
            capture. After the countdown the price is{" "}
            <strong className="text-[#22F0D5]">$99 once, forever</strong>.
            Public messaging from that point: price may change at
            random. If we raise it (or lower it) it happens with no
            warning. Lock in now or accept the volatility.
          </p>

          <div className="mt-10">
            <CountdownTimer postCountdownPrice="$99" />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A1A1C] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::what stays true forever
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-[#C8CCCE] md:text-[15px]">
                <li className="flex gap-3">
                  <span className="text-[#22F0D5]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">License §4A:</strong>{" "}
                    legally bans switching to subscription. If we ever try,
                    every existing buyer keeps their license free in
                    perpetuity.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#22F0D5]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">Free-week buyers are grandfathered:</strong>{" "}
                    if you downloaded during the free window, your license
                    is valid forever even if the price goes to $999.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#22F0D5]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">30-day Material Failure Guarantee:</strong>{" "}
                    if the bundle fails to install or launch on Windows 10/11
                    + Node 20+, full refund. No questions, no fault-finding.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#22F0D5]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">Source included:</strong>{" "}
                    in the bundle. Inspect freely. Modify for personal or
                    single-business use.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#1C0F08] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::what is intentionally volatile
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-[#C8CCCE] md:text-[15px]">
                <li className="flex gap-3">
                  <span className="text-[#FFB87A]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">The price.</strong>{" "}
                    After the free week, $99 is the floor for now. It
                    may rise to $199, $299, $999 — or drop briefly for a
                    surprise sale. No advance notice.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFB87A]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">The release cadence.</strong>{" "}
                    New features ship when ready, not on a calendar.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFB87A]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">Future modules.</strong>{" "}
                    Additional optional modules (specialized agent
                    packs, MCP bundles, niche workflows) may be sold
                    separately. Core bundle stays one-time-license.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFB87A]">·</span>
                  <span>
                    <strong className="text-[#F2F4F5]">Who we sell to.</strong>{" "}
                    We reserve the right to decline an order — no obligation
                    to sell to any specific buyer or use case.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Final pricing CTA */}
          <div className="mt-12 grid gap-4 md:grid-cols-[1fr_1fr]">
            <OrangeBoxV63Buy
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A1A] px-7 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_0_60px_rgba(255,122,26,0.40)] transition-all hover:bg-[#FFA45A] disabled:opacity-60"
              label="get the bundle →"
            />
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20launch%20bundle%20inquiry"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-7 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/15"
            >
              email the founder →
            </a>
          </div>
        </div>
      </section>

      {/* FINAL STRIP */}
      <section className="bg-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::one operator · marco island fl · independent · no investors
          </p>
          <h3 className="mt-6 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Built by one person.{" "}
            <span className="text-[#FF7A1A]">For people who run things.</span>
          </h3>
          <p className="mt-5 text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            No VC. No board. No telemetry. No subscription ever. No
            mailing list capture. Email the founder directly to ask
            anything before you buy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20question%20before%20I%20buy"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              a.mccree@gmail.com
            </a>
            <Link
              href="/legal/terms"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              license §4A · /legal/terms
            </Link>
            <Link
              href="/orangebox/legacy"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] hover:text-[#22F0D5]"
            >
              v6.1.0 legacy archive
            </Link>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::~2 hour reply in ET waking hours · no PR layer
          </p>
        </div>
      </section>
    </main>
  );
}
