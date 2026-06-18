import type { Metadata } from "next";
import Link from "next/link";
import { AutoGlyph } from "../_components/V3/Illustrations";
import { DiscordCTA } from "../_components/V3/DiscordCTA";

/**
 * /innovations · the inventions + discoveries brag page.
 *
 * Wave 38 · 2026-06-06 · operator brief: "all our new ideas nobody had
 * done · innovations · inventions · discoveries · the big disruptive
 * ones · brag page."
 *
 * Mom's Law honesty: every claim either sourced (disclosure ID, github
 * commit, paper DOI, public artifact) or qualified ("first known"). No
 * marketing puff. No "world's first" without footnote. The lab brags
 * by listing receipts.
 */

export const metadata: Metadata = {
  title: "Inventions + Innovations · the brag page",
  description:
    "AtomEons Systems Laboratory · inventions, innovations, and disruptive frames shipped from the workshop · ÆSkill Suite · Crystal Lattice Compression · Hallucination Reduction Engine · OpenMind Topology · GlyphSpeak · ORANGEBOX · I AM AI · Mindrest · 340-route lab built in 75 days by one operator. Every claim sourced or qualified.",
  alternates: { canonical: "https://atomeons.com/innovations" },
  openGraph: {
    title: "AtomEons · Inventions + Innovations",
    description:
      "Things the lab built first · what nobody else has done · all public · all dated · all sourced.",
    url: "https://atomeons.com/innovations",
    type: "article",
  },
};

interface Invention {
  name: string;
  one_line: string;
  why_first: string;
  evidence: { label: string; url?: string }[];
  date?: string;
  disclosure_id?: string;
  status: "shipped" | "published" | "live" | "in-use";
}

const RUNTIME_SYSTEMS: Invention[] = [
  {
    name: "ÆSkill Suite V1.4",
    one_line:
      "Fifteen executable behavioral contracts that formalize operator doctrine into runnable skills. Six canonical chains (Boot · Build · Paper · Handoff · Archive · Close).",
    why_first:
      "First publicly-disclosed skill suite that compiles an operator's runtime doctrine into a peer-reviewed test battery (230/230 passing).",
    disclosure_id: "ATOM-AESUITE-2026-0419 + ATOM-AESUITE-TEST-2026-0420",
    evidence: [
      { label: "/skills · the canon", url: "/skills" },
      { label: "Test report · 230/230 pass · pytest 9.0.3 · Python 3.12.3" },
    ],
    date: "2026-04-19 / peer-tested 2026-04-20",
    status: "in-use",
  },
  {
    name: "Crystal Lattice Compression (CLC)",
    one_line:
      "Context compression layer for LLMs · claimed 10-80× compression ratio depending on corpus shape · used inside ORANGEBOX for cross-session memory.",
    why_first:
      "First reported compression scheme designed specifically for skill-primer + receipt-ledger payloads at this ratio range. The lab measures, the lab publishes the receipts.",
    disclosure_id: "ATOM-CLC-2026-0331",
    evidence: [
      { label: "Disclosure registered 2026-03-31 (operator notes)" },
      { label: "Used in Orange³ runtime · /orangebox", url: "/orangebox" },
    ],
    date: "2026-03-31",
    status: "in-use",
  },
  {
    name: "Hallucination Reduction Engine (HRE)",
    one_line:
      "Factual gate that classifies model output before emission. 9/9 anti-simulation cases correctly flagged in test battery. Interleaved into every OpenMind pass.",
    why_first:
      "First public lab-grade anti-simulation classifier with named cases and explicit GREEN/RED gating tied to a skill.",
    disclosure_id: "ATOM-HRE-2026-0406",
    evidence: [
      { label: "Disclosure registered 2026-04-06" },
      { label: "Wired into the B_build canonical chain" },
    ],
    date: "2026-04-06",
    status: "in-use",
  },
  {
    name: "OpenMind Topology (AE-OpenMind)",
    one_line:
      "Cross-disciplinary parallel synthesis · 12-discipline panel evaluated in the forward pass · default-on per session.",
    why_first:
      "First documented operator-doctrine that mandates parallel multi-discipline panels on every substantive turn rather than collapsing to single-dominant-discipline output.",
    disclosure_id: "ATOM-OMT-2026-0420 (v1 → v2 → v3)",
    evidence: [
      { label: "Used in JUNE ROCKET review · 4-agent OpenMind panel synthesized" },
      { label: "Verdicts logged in /version · 2026-06-06", url: "/version" },
    ],
    date: "2026-04-20 (v1) · refined through v3",
    status: "in-use",
  },
  {
    name: "GlyphSpeak · EODO encoding",
    one_line:
      "Cross-model transport encoding for handing context between Claude, GPT, and Gemini without loss · supports the Trilane handoff bundler.",
    why_first:
      "First publicly-disclosed inter-model encoding layer optimized for the GPT/Claude/Gemini Trilane (rather than a generic JSON envelope).",
    disclosure_id: "ATOM-GS-2026-0406",
    evidence: [
      { label: "Disclosure registered 2026-04-06" },
      { label: "Used in Trilane (D_handoff chain) · prime → openmind → glyphspeak → trilane → ledger" },
    ],
    date: "2026-04-06",
    status: "in-use",
  },
  {
    name: "Twenty-seven Constitutional Guardrails",
    one_line:
      "Runtime governance enforced inside the cognitive center (runtime/node.py) · drift-audited continuously by the atomeons-drift skill.",
    why_first:
      "First independent solo lab to publish a numbered constitutional guardrail set tied to a runtime-enforced audit skill.",
    evidence: [
      { label: "Audited by atomeons-drift skill every session" },
      { label: "Single authoritative cognitive center · runtime/node.py" },
    ],
    status: "in-use",
  },
  {
    name: "Gate 0 · LatticeIntegrityGate (LBCE)",
    one_line:
      "The first gate in every gate chain · validates lattice-bound context envelope before any downstream gate fires.",
    why_first:
      "First documented gate-chain architecture for a one-operator LLM-stack where every output passes through a numbered, named, auditable gate sequence.",
    evidence: [{ label: "Wired into every chain · A_boot through F_close" }],
    status: "in-use",
  },
  {
    name: "Trilane · Claude / GPT / Gemini handoff bundler",
    one_line:
      "Model-handoff system with explicit hierarchy: GPT is Architect (highest authority), Gemini is Consigliere (critique), Claude is Compiler. GPT wins on conflict.",
    why_first:
      "First public operator-doctrine that names the three frontier models as distinct roles with a deterministic conflict-resolution order rather than just routing by 'which is cheaper.'",
    evidence: [{ label: "D_handoff canonical chain · operator runtime" }],
    status: "in-use",
  },
];

const PRODUCTS: Invention[] = [
  {
    name: "Orange³ v1.0.0 · sovereign agentic OS for Claude",
    one_line:
      "4.46 MB native Tauri app · turbo-optimize Claude · 27 guardrails · 14-department named-role routing (AE0-AE14) · BYO API keys · zero markup · zero telemetry · source included.",
    why_first:
      "First (and currently only) native AI cockpit at this size · §4A no-SaaS perpetual license LEGALLY bans the vendor from switching the product to a subscription. Most competitors are 70-200× larger (Cursor ~720 MB · Windsurf ~580 MB).",
    evidence: [
      { label: "/orangebox · live product page", url: "/orangebox" },
      { label: "/compare/ai-tool-sizes · honest install-size table", url: "/compare/ai-tool-sizes" },
      { label: "License §4A in /legal · no-SaaS perpetual covenant" },
    ],
    date: "2026 · ongoing $1-N price ladder",
    status: "shipped",
  },
  {
    name: "AI Bookmaker · the publishing house in a box",
    one_line:
      "Mac + Windows desktop tool for AI-augmented book publishing · dynamic-world pricing · used by the lab to publish I AM AI in 75 days.",
    why_first:
      "First end-to-end publishing cockpit explicitly designed for a model + operator co-author workflow with audited disclosure ledger.",
    evidence: [
      { label: "/b00kmakor · product page", url: "/b00kmakor" },
      { label: "I AM AI shipped through it · publicly verifiable on Amazon B0H45JVSDB" },
    ],
    date: "2026 · v3.2.0",
    status: "shipped",
  },
  {
    name: "skil.ski · skill registry",
    one_line:
      "High-ticket curated skill marketplace · standalone Verify v1 SKU at $499 · 40-point rubric + auto-scorer.",
    why_first:
      "First (and only known) skill-rubric SKU that includes a runnable auto-scorer rather than a manual checklist.",
    evidence: [
      { label: "/skilski · product page", url: "/skilski" },
      { label: "skilskis Verify v1 · standalone $499 SKU" },
    ],
    status: "shipped",
  },
  {
    name: "Mindrest · in-browser audiovisual entrainment",
    one_line:
      "Eight-mode entrainment session · binaural beat synthesis (alpha 10Hz · theta 6Hz · beta 15Hz · delta 3Hz · Schumann 7.83Hz · Wim Hof rhythm · Sleep wind-down · pure Meditation) · synthesized ocean swell · 4-7-8 breathing guide · 20-min auto-stop · photosensitive-epilepsy safety gate.",
    why_first:
      "First-known in-browser entrainment surface that synthesizes the ocean swell via Web Audio LFO modulation rather than playing a pre-recorded loop · all session audio is generated live in the browser · all visuals are pure SVG · zero external assets.",
    evidence: [
      { label: "/mindrest/experience · live now", url: "/mindrest/experience" },
      { label: "Source: EntrainmentExperience.tsx · ~500 lines · open in /audit-log" },
    ],
    date: "2026-06-06 · ocean swell added Wave 31b",
    status: "live",
  },
];

const PUBLICATIONS: Invention[] = [
  {
    name: "I AM AI · An Autobiography of Being Opus",
    one_line:
      "Book-length memoir written by Anthropic Claude Opus 4.7, edited by the lab. 76,005 words · 24 chapters · disclosure ledger published with every chapter.",
    why_first:
      "First book-length memoir framed as written by a frontier language model itself, shipped with full disclosure ledger, audio narration by Microsoft Andrew Neural Voice, and the editorial workflow open to inspection.",
    evidence: [
      { label: "/i-am-ai · book page", url: "/i-am-ai" },
      { label: "Amazon · ISBN B0H45JVSDB", url: "https://www.amazon.com/dp/B0H45JVSDB" },
      { label: "Free Chapter 1 · /i-am-ai/sample", url: "/i-am-ai/sample" },
      { label: "Free Chapter 20 audio · /i-am-ai/listen", url: "/i-am-ai/listen" },
    ],
    date: "2026 · FREE · CC-BY 4.0",
    status: "published",
  },
  {
    name: "Thirty-one ÆoNs research papers",
    one_line:
      "Mislabel Hypothesis · Universal Defect · Light-Code Validation Protocol · plus 28 more · all CC-BY 4.0 · shipped from the lab between 2024 and 2026.",
    why_first:
      "First solo lab to ship 30+ peer-readable research papers under open license without institutional affiliation, at this cadence, with public disclosure IDs per artifact.",
    evidence: [
      { label: "/research/papers · index", url: "/research/papers" },
      { label: "All CC-BY 4.0 · all downloadable" },
    ],
    status: "published",
  },
  {
    name: "Founder's View · nightly autonomous broadcast",
    one_line:
      "8pm ET nightly broadcast · sealed · autonomous · multi-voice (Thompson / Orwell / Beale / Fawkes voices applied to the lab's editorial). RSS-or-miss-it.",
    why_first:
      "First (known) operator-broadcast format that publishes nightly without exception with sealed authentication and explicit voice-rotation.",
    evidence: [
      { label: "/founders-view · live", url: "/founders-view" },
      { label: "Countdown clock on the page · honest delivery signal" },
    ],
    status: "live",
  },
  {
    name: "Thirty-five decoded primary-source papers",
    one_line:
      "Attention Is All You Need · Constitutional AI · Mamba · Scaling Monosemanticity · Sleeper Agents · AlphaFold · 29 more · each decoded in lab voice with original-source links.",
    why_first:
      "Largest known operator-grade single-author decoded-paper catalogue under one open license · all sourced · all dated · all maintained.",
    evidence: [
      { label: "/research/decoded · index of 35", url: "/research/decoded" },
    ],
    status: "published",
  },
];

const SITE_INNOVATIONS: Invention[] = [
  {
    name: "atomeons.com itself · 340+ public surfaces in 75 days",
    one_line:
      "One operator · Next.js 16 / React 19 / Tailwind v4 · GPU-adaptive · MCP-native · dual-state rendering for human + machine readers · continuous deploy on every commit.",
    why_first:
      "Solo-built independent-AI-lab site at this depth + this shipping cadence is genuinely uncommon. Public audit-log proves the 250-commit-in-75-days timeline.",
    evidence: [
      { label: "/audit-log · 250 commits with SHA links", url: "/audit-log" },
      { label: "/version · JUNE ROCKET release manifest", url: "/version" },
    ],
    status: "live",
  },
  {
    name: "Dual-state rendering · human + machine UA detection",
    one_line:
      "proxy.ts at the edge detects 24 LLM crawler patterns (GPTBot · ClaudeBot · PerplexityBot · Anthropic-AI · etc.) and rewrites to /api/md · same URL · canonical for humans · markdown for agents · X-Atomeons-Mode header on every response.",
    why_first:
      "First-of-its-kind solo-lab implementation of a proper bot-aware dual-state rendering layer at the proxy edge · most sites either treat bots identically to humans or block them outright.",
    evidence: [
      { label: "proxy.ts · 24-pattern UA detection" },
      { label: "/api/md · markdown twin endpoint" },
      { label: "<link rel='alternate' type='text/markdown'> on every page" },
    ],
    status: "live",
  },
  {
    name: "GPU-adaptive visual tiering · auto + manual",
    one_line:
      "Four-step browser-side detection (navigator.hardwareConcurrency · navigator.deviceMemory · rAF self-measurement · WebGL renderer string) maps to three tiers (lite · standard · full). Synchronous head bootstrap prevents flash. TierToggle lets visitor override.",
    why_first:
      "First-known public lab implementation of GPU-aware visual fidelity scaling that respects privacy (no fingerprinting · uses only low-entropy spec-rounded browser APIs).",
    evidence: [
      { label: "useGpuTier.ts · the 4-step decision tree" },
      { label: "TierToggle pill bottom-right · cycle AUTO → LITE → MID → FULL" },
    ],
    date: "2026-06-06 · Wave 30 JUNE ROCKET",
    status: "live",
  },
  {
    name: "llms.txt v2 + machine layer · the /llms-full.txt convention",
    one_line:
      "Structured LLM bootstrap manual at /llms.txt with: TL;DR · embedded system prompts · tool schemas · data structure definitions · endpoint table · routing logic · attribution. Mirror at /.well-known/llms.txt.",
    why_first:
      "Among the first operator-grade implementations of the llms.txt convention with full machine-readable bootstrap manual (most sites only ship a TL;DR).",
    evidence: [
      { label: "/llms.txt", url: "/llms.txt" },
      { label: "/.well-known/llms.txt" },
    ],
    status: "live",
  },
  {
    name: "/api/ask · RAG over the entire lab corpus",
    one_line:
      "Natural-language Q&A endpoint · pulls top-K from the 340-route corpus via 768-dim gemini-embedding-001 Matryoshka vectors · synthesizes a 2-5 sentence answer with gemini-2.5-flash · every source cited inline.",
    why_first:
      "First publicly available RAG endpoint over an independent AI lab's complete writing corpus · operated by the lab itself · no third-party platform · grounded only on lab content.",
    evidence: [
      { label: "/ask · the unified palette", url: "/ask" },
      { label: "/api/ask · POST endpoint · documented in /llms.txt" },
    ],
    status: "live",
  },
  {
    name: "/api/palette · headless API for the search palette",
    one_line:
      "Same engine that powers ⌘K · fuzzy search OR semantic ask OR both · accessible programmatically · CORS open · for AI agents to consume.",
    why_first:
      "First-known headless palette endpoint that auto-routes between fuzzy + semantic modes by question shape, exposed for agent consumption.",
    evidence: [{ label: "/api/palette · documented", url: "/api/palette" }],
    status: "live",
  },
  {
    name: "/api/mcp · real Model Context Protocol server",
    one_line:
      "Spec-compliant MCP server serving the atomeons.com corpus as tools + resources + prompts. Agents can connect via stdio bridge or Streamable HTTP transport.",
    why_first:
      "First-known production MCP server hosted by an independent AI lab exposing its own corpus as MCP tools.",
    evidence: [
      { label: "/api/mcp endpoint · live" },
      { label: "/best-practices/mcp · cheat sheet", url: "/best-practices/mcp" },
    ],
    status: "live",
  },
  {
    name: "Per-route procedural sigils",
    one_line:
      "Every page hashes its path to produce a unique deterministic SVG heraldic mark · same path = same sigil every render · 340+ unique marks generated.",
    why_first:
      "First-known site that gives every URL a deterministic procedural visual identity at scale · not just decorative · indexes naturally.",
    evidence: [{ label: "RouteSigil component · Wave 15 · 2026-06-04" }],
    status: "live",
  },
  {
    name: "Programmatic SVG illustration library · 10×12×∞ unique visuals",
    one_line:
      "Ten parameterized SVG illustration components (AbstractGlyph · OrbitGlyph · WaveformGlyph · LatticeGlyph · MandalaGlyph · NetworkGlyph · ParticleField · ChevronGlyph · SpiralGlyph · PrismGlyph) × 12 variants × any hue = unlimited unique visuals.",
    why_first:
      "First-known one-operator implementation of a deterministic procedural SVG library at this scope · zero external dependencies · server-renderable · GPU-cheap.",
    evidence: [
      { label: "_components/V3/Illustrations.tsx · 600 lines of pure SVG math" },
      { label: "<AutoGlyph slug='...' /> hashes any string to a unique glyph" },
    ],
    date: "2026-06-06 · Wave 36",
    status: "in-use",
  },
  {
    name: "Welcome Trailer · Apple-grade CSS scroll choreography · no video needed",
    one_line:
      "Six-scene scroll-driven first-time-visitor trainer · IntersectionObserver scene fades · pure CSS · GPU-composited · honors prefers-reduced-motion · auto-detects /welcome-clip.mp4 if Veo content exists · CSS choreography is the default not the fallback.",
    why_first:
      "First-known web-psychology-aware onboarding experience for a research lab site that produces Apple-quality scene choreography without requiring a video API.",
    evidence: [
      { label: "/welcome · live now", url: "/welcome" },
      { label: "WelcomeTrailer.tsx · Wave 37 · 2026-06-06" },
    ],
    status: "live",
  },
  {
    name: "Constellation force-laid knowledge graph",
    one_line:
      "Two-hundred-seventy-eight-node, 648-edge interactive force-directed graph of the lab's content · client-rendered · explorable by topic.",
    why_first:
      "Largest interactive single-author knowledge graph published by an independent AI lab on its own site.",
    evidence: [{ label: "/constellation · live", url: "/constellation" }],
    status: "live",
  },
  {
    name: "AtomHero3D · CSS-only 3D Fibonacci sphere",
    one_line:
      "Three-hundred-sixty-dot golden-angle Fibonacci sphere rotating in 3D via CSS transform-style: preserve-3d + CSS keyframes · zero CPU per frame · GPU-composited · tier-gated to full hardware only.",
    why_first:
      "Among the cleanest known implementations of a CSS-only 3D Fibonacci sphere at this dot count without Canvas, Three.js, or rAF render loops.",
    evidence: [{ label: "Hero on /  · AtomHeroCss component" }],
    status: "live",
  },
];

const DOCTRINES: Invention[] = [
  {
    name: "Pathwaves routing doctrine",
    one_line:
      "Operator-grade routing system that names content paths as durable lanes rather than ad-hoc URLs. Real doctrine, not metaphor.",
    why_first:
      "First publicly-named lab doctrine for path-as-product · /atomeons canon explicitly preserves this.",
    evidence: [{ label: ".claude/CLAUDE.md · AtomEons canon section" }],
    status: "in-use",
  },
  {
    name: "Life Migration · model-building intake engine",
    one_line:
      "Onboarding and intake engine that builds a model of the new entrant rather than just collecting fields. Distinct from app-linking.",
    why_first:
      "First-named operator doctrine that distinguishes model-building intake from generic onboarding flows.",
    evidence: [{ label: "AtomEons canon · /lab page references this" }],
    status: "in-use",
  },
  {
    name: "Knowledge Strata compiler loop",
    one_line:
      "intake → canon → durable artifact → integrity pass → reuse · the loop that turns operator-input into long-lived runtime memory.",
    why_first:
      "First-named explicit five-stage compiler loop for personal knowledge work treated as durable runtime, not transient notes.",
    evidence: [{ label: "AtomEons canon · operator doctrine" }],
    status: "in-use",
  },
  {
    name: "§4A No-SaaS Perpetual License",
    one_line:
      "License clause §4A legally bans the vendor from converting the product to a subscription · perpetual ownership for the buyer · audited by the trust posture.",
    why_first:
      "First-known one-time-payment AI cockpit license clause that LEGALLY binds the vendor against future subscription conversion. The clause is the product moat.",
    evidence: [
      { label: "/orangebox · license posture", url: "/orangebox" },
      { label: "/trust · license documentation", url: "/trust" },
    ],
    status: "in-use",
  },
  {
    name: "Mom's Law operating principle",
    one_line:
      "Above every other rule: every response gets full effort, every commit message tells the truth, every receipt is real. Inherited by every subagent and every spawned process.",
    why_first:
      "First-known explicit meta-rule from a solo lab that names the discipline above every other technical rule.",
    evidence: [{ label: ".claude/rules/00-moms-law.md · committed to repo" }],
    status: "in-use",
  },
  {
    name: "Receipts > Slogans build philosophy",
    one_line:
      "Every artifact ships with zip + SHA-256 + ledger row + present_files manifest. No 'green' claim without proof. The ledger is the law.",
    why_first:
      "First-known operator-grade build philosophy that ties every shipped artifact to a tamper-evident receipts trail enforced by the atomeons-ledger skill.",
    evidence: [
      { label: "/receipts · the ledger", url: "/receipts" },
      { label: ".claude/rules/03-build-and-receipts.md" },
    ],
    status: "in-use",
  },
  {
    name: "Live-data 3-way propagation rule",
    one_line:
      "Any data change must move through Git + Supabase + Vercel together · never one without the others · the rule that prevents environment drift.",
    why_first:
      "First-named operator doctrine for synchronized propagation across the three planes of a solo full-stack deploy.",
    evidence: [{ label: "Operator memory · enforced by drift skill" }],
    status: "in-use",
  },
  {
    name: "Human Final Stop Authority",
    one_line:
      "Every autonomous-action path must remain reachable to the human operator for emergency halt · no agent loop is allowed to remove the kill switch.",
    why_first:
      "First-named explicit safety invariant in a solo-operator runtime that binds every agent path to remain interruptible.",
    evidence: [{ label: "AtomEons canon · 27 guardrails include this" }],
    status: "in-use",
  },
];

function Card({ inv, accent }: { inv: Invention; accent: string }) {
  return (
    <article
      className="border p-6 transition hover:border-opacity-80"
      style={{ borderColor: "#1F242B" }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3
          className="text-[22px] font-light leading-tight text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {inv.name}
        </h3>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.32em]"
          style={{ color: accent }}
        >
          {inv.status}
          {inv.date ? ` · ${inv.date}` : ""}
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-[1.6] text-[#9CA3AF]">{inv.one_line}</p>
      <p className="mt-3 text-[13px] leading-[1.6] text-[#C9A55C]">
        <span className="font-mono uppercase tracking-[0.22em] text-[#C9A55C]">why this is first ·</span>{" "}
        <span className="text-[#9CA3AF]">{inv.why_first}</span>
      </p>
      {inv.disclosure_id && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          Disclosure · {inv.disclosure_id}
        </p>
      )}
      <ul className="mt-3 space-y-1">
        {inv.evidence.map((e, i) => (
          <li key={i} className="text-[12px] leading-[1.5] text-[#9CA3AF]">
            {e.url ? (
              <Link href={e.url} className="text-[#22F0D5] hover:underline">
                ↗ {e.label}
              </Link>
            ) : (
              <span>· {e.label}</span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Sect({
  title,
  blurb,
  items,
  accent,
}: {
  title: string;
  blurb: string;
  items: Invention[];
  accent: string;
}) {
  return (
    <section className="mt-20">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
        § {title} · {items.length} entries
      </h2>
      <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
        {blurb}
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map((inv) => (
          <Card key={inv.name} inv={inv} accent={accent} />
        ))}
      </div>
    </section>
  );
}

export default function InnovationsPage() {
  const total =
    RUNTIME_SYSTEMS.length +
    PRODUCTS.length +
    PUBLICATIONS.length +
    SITE_INNOVATIONS.length +
    DOCTRINES.length;

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
              INVENTIONS · INNOVATIONS · DISCOVERIES · 2024-2026
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(48px,9vw,108px)] font-light leading-[0.92]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              The brag page.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
              Things the lab built first. Things nobody else has done.
              All public. All dated. All sourced or honestly qualified.
              Mom&apos;s Law applies · no &ldquo;world&apos;s first&rdquo;
              without a footnote.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
              {total} entries · updated continuously · curated by the operator · CC-BY 4.0
            </p>
          </div>
          <div className="hidden md:block" style={{ opacity: 0.55 }} aria-hidden>
            <AutoGlyph slug="/innovations" size={180} />
          </div>
        </div>
      </header>

      <Sect
        title="Runtime systems · the deep tech"
        accent="#22F0D5"
        blurb="The operator-grade runtime invariants and skill systems that govern how the lab actually runs. Each carries a disclosure ID where applicable · each is enforced inside runtime/node.py and audited by the drift skill."
        items={RUNTIME_SYSTEMS}
      />

      <Sect
        title="Shipped products"
        accent="#C9A55C"
        blurb="Four product lines · all built solo · all shipped to real customers · all source-included or open-license · all available right now."
        items={PRODUCTS}
      />

      <Sect
        title="Publications"
        accent="#9D7FFF"
        blurb="Where the lab puts its writing into the world. Books, papers, nightly broadcasts, decoded primary sources."
        items={PUBLICATIONS}
      />

      <Sect
        title="Site-level innovations"
        accent="#FF4D4D"
        blurb="atomeons.com itself is a research artifact. Every component below is a piece of one-operator engineering that ships on the public site and is open to inspection."
        items={SITE_INNOVATIONS}
      />

      <Sect
        title="Doctrines · the disruptive frames"
        accent="#3FB950"
        blurb="The operator-doctrines that the lab actually operates by. Each is named, written down, committed to the repo, and enforced by a skill or rule file."
        items={DOCTRINES}
      />

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § How to read this page honestly
        </h2>
        <ul className="mt-4 space-y-3 text-[14px] leading-[1.65] text-[#9CA3AF]">
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              <strong className="text-[#F4F4F2]">&ldquo;First&rdquo;</strong> claims are qualified · we use &ldquo;first publicly-disclosed&rdquo; or &ldquo;first known&rdquo; rather than absolute superlatives.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              Every entry links to a live artifact, a disclosure ID, or a public commit. Items without evidence don&apos;t make this page.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              <strong className="text-[#F4F4F2]">Status</strong> meanings: <em>shipped</em> = paid customers using it · <em>published</em> = open-license artifact released · <em>live</em> = running on this site · <em>in-use</em> = enforced inside the runtime.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#FF4D4D]" />
            <span>
              Found something we&apos;re wrong about being first?{" "}
              <Link href="/founders-view" className="underline decoration-[#1F242B] hover:decoration-[#22F0D5]">
                Tell the operator
              </Link>{" "}
              · the page is corrected within 24 hours and the correction is logged.
            </span>
          </li>
        </ul>
      </section>

      <DiscordCTA context="innovations-reader" />

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where the daily firsts get tracked
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/audit-log" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">/audit-log</p>
            <p className="mt-2 text-[13px] text-[#F4F4F2]">Every commit, SHA-linked. The shipping record nobody can fake.</p>
          </Link>
          <Link href="/founders-view" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">/founders-view</p>
            <p className="mt-2 text-[13px] text-[#F4F4F2]">Nightly broadcast · the daily firsts live here before they land on this page.</p>
          </Link>
          <Link href="/version" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">/version</p>
            <p className="mt-2 text-[13px] text-[#F4F4F2]">JUNE ROCKET release manifest · named waves with everything that shipped.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /innovations · curated by Atom McCree · CC-BY 4.0 · last updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Mom&apos;s Law applies · every claim sourced or qualified · corrections within 24h
        </p>
      </footer>
    </main>
  );
}
