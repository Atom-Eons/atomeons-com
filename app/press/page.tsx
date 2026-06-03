import Link from "next/link";
import { PressMediaKit } from "./PressMediaKit";
import { LabHero } from "../_components/v2/LabHero";

export const metadata = {
  title: "Press kit — AtomEons Systems Laboratory",
  description:
    "AtomEons press kit · launch night 2026-05-30. Two AI applications shipped tonight built by AI, for AI operators, in 75 days using earlier versions of themselves: ORANGEBOX v1.0.0-beta (Windows desktop AI cockpit · 9 LLM providers · 14-department architecture · AECode contracts · tamper-evident JSON receipts · $99 perpetual after free week · §4A no-saas) and B00KMAKR v3.2.0 (Mac + Windows AI publishing cockpit · 142 feature surfaces · mission graph · voice fingerprint persistence · KDP packager · dynamic-world-pricing). Eleven novel features never seen together inside one app before tonight. Plus ÆoNs Research (12 manuscripts), The Founder's View (nightly 8pm ET), 14-clause Manifesto, Dynamic World Pricing doctrine paper. Solo lab. Marco Island, FL. Founder Atom McCree. Boilerplate, bio, hero asset, copy blocks for HN/PH/Dev.to/cold email, direct founder contact.",
  keywords: [
    "AtomEons press kit",
    "Atom McCree press",
    "indie AI lab press",
    "one-operator AI lab",
    "AI startup press kit",
    "ORANGEBOX press",
    "ÆoNs Research press",
    "AI lab Marco Island",
    "44M AI displacement",
    "AI on-ramp media kit",
    "Founder's View broadcast",
    "indie AI economics",
    "post-SaaS pricing",
    "license §4A no-subscription",
    "CC-BY 4.0 AI research",
  ],
  alternates: { canonical: "https://atomeons.com/press" },
  openGraph: {
    title: "AtomEons Press Kit — instant journalist pack",
    description:
      "One-sentence pitch · one-paragraph boilerplate · founder bio · hero asset · downloadable media pack · honest coverage feed · 2-hour reply SLA. Solo independent AI lab. Marco Island, FL.",
    url: "https://atomeons.com/press",
    type: "website",
    locale: "en_US",
    siteName: "AtomEons",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Press Kit",
    description:
      "Instant media kit. Boilerplate, bio, assets, contact. Solo indie AI lab. Marco Island, FL. 2-hour reply SLA in waking ET hours.",
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Atom McCree", url: "https://atomeons.com/about" }],
};

// ──────────────────────────────────────────────────────────────────
// THE LAB IN 2026 — total-effort framing.
// Each row is a SHIPPED surface, not a roadmap. Press leads here
// before any single-product story.
// ──────────────────────────────────────────────────────────────────

const LAB_SURFACES = [
  {
    pillar: "RESEARCH",
    name: "ÆoNs Research",
    blurb:
      "12 peer-ready manuscripts (April 2026). CC-BY 4.0. Bioelectric oncology, gut–brain mislabel, solar information transfer, topological field theory, light-code DNA version control. Each paper carries an academic abstract AND a kid/grandma plain-language summary.",
    href: "/research/papers",
    accent: "#22F0D5",
  },
  {
    pillar: "RESEARCH",
    name: "Lessons From Sci-Fi · The Monograph",
    blurb:
      "38-page comprehensive analytical survey of AI in film & television, 1927 → 2024. 13 chapters · 7 epochs · 5-dimension taxonomy · 6 alignment failure modes · 200+ screen texts indexed. Embedded scene clips at every inflection point. Prepared for Atom · Compiled by Claude (Anthropic) · April 2026.",
    href: "/research/lessons-from-sci-fi/monograph",
    accent: "#22F0D5",
  },
  {
    pillar: "USE AI",
    name: "ORANGEBOX v1.0.0-beta",
    blurb:
      "Local-first Windows desktop AI cockpit. Shipped 2026-05-30. Multi-LLM routing across Claude / GPT / Gemini / OpenRouter / Groq / Cohere / Mistral / Perplexity / local Ollama (9+ providers, BYO keys, zero markup). 14-department architecture (AE0-AE14). AECode contracts on every AI change. Tamper-evident JSON receipts on every meaningful action. AtomSmasher Crystal Lattice Compression (10-80× context). Built in 75 days using earlier versions of itself. $99 perpetual after FREE launch week (ends 2026-06-06). License §4A legally bans subscription. Signed installer (Sectigo timestamp). Sources at github.com/AtomEons/orangebox.",
    href: "/orangebox",
    accent: "#22F0D5",
  },
  {
    pillar: "USE AI",
    name: "B00KMAKR v3.2.0",
    blurb:
      "AI publishing cockpit. Shipped 2026-05-30. Mac + Windows. 142 feature surfaces — mission graph for chapters, voice fingerprint persistence, continuity audit across timeline/characters/facts, KDP packager, cover lab, 120-day launch calendar with daily action queue. Universal HTML app + native Tauri builds (.dmg + .msi/.exe). Apple/Microsoft-grade embedded-font PDF manuals (book-red Mac · blue Windows). SHA-256 receipts on every artifact. FREE launch week, then dynamic-world-pricing ($99 Tier 1 anchor · USA Advantage Clause $9.90 · Strategic Tier Lift CN $99). §4A no-saas. Public repo at github.com/AtomEons/BookMaker.",
    href: "/b00kmakor",
    accent: "#FFB87A",
  },
  {
    pillar: "USE AI",
    name: "Dynamic World Pricing · the doctrine",
    blurb:
      "A published seven-doctrine synthesis for fair-by-country software pricing. World Bank income tiers + free-floor doctrine + USA Advantage Pricing Clause (US at 10% of Tier 1) + Strategic Tier Lift (China at Tier 1 despite WB Tier 2 classification) + public mechanism + product registry + §4A compatibility + honest VPN posture. Reusable across every lab product. CC-BY 4.0 paper at /dynamic-world-pricing.",
    href: "/dynamic-world-pricing",
    accent: "#22F0D5",
  },
  {
    pillar: "DOCTRINE",
    name: "The 14-Clause Manifesto",
    blurb:
      "The lab's full operating doctrine, made explicit. Fourteen numbered clauses spanning commerce, research, operator structure, and broadcast posture. Each clause is falsifiable — readers are invited to challenge with evidence. Receipts over slogans. One operator. No venture funding. $99 once · §4A no-saas. Zero markup on token cost. Named tools, no affiliate revenue. CC-BY 4.0 with citation template.",
    href: "/manifesto",
    accent: "#FFB87A",
  },
  {
    pillar: "MAKE MONEY",
    name: "skil.ski",
    blurb:
      "Skill marketplace delivered via MCP. Verified-skill SKU. The standard-setter rubric for what a real, productionizable AI skill looks like. Built by an indie lab, sold to enterprise.",
    href: "/skilski",
    accent: "#F2F4F5",
  },
  {
    pillar: "KNOW THE TRUTH",
    name: "/intel — X Algorithm Alpha",
    blurb:
      "Decoded primary-source drops, not aggregated headlines. The May 15 2026 xAI leak with operator-grade extensions. The lab reads the actual code that ships and writes back what it means.",
    href: "/intel/x-algorithm",
    accent: "#F2F4F5",
  },
  {
    pillar: "KNOW THE TRUTH",
    name: "The Founder's View",
    blurb:
      "Nightly broadcast at 8pm ET. No-punches-pulled letter from the lab on real events. Editorial satire. Equal-opportunity indignation. Subscribe by bookmark.",
    href: "/founders-view",
    accent: "#22F0D5",
  },
];

const FACTS = [
  ["Lab", "AtomEons Systems Laboratory · Independent AI research · one operator"],
  ["Shipped tonight", "ORANGEBOX v1.0.0-beta (Windows) + B00KMAKR v3.2.0 (Mac + Windows)"],
  ["Launch date", "2026-05-30"],
  ["Compression headline", "ORANGEBOX built in 75 days. With itself. The .exe was produced by earlier versions of the cockpit."],
  ["ORANGEBOX tagline", "Local-first AI cockpit. Multi-LLM. BYO keys. Zero markup. 9+ providers. 14-department architecture."],
  ["B00KMAKR tagline", "AI publishing cockpit. Mac + Windows. 142 feature surfaces. Apple/Microsoft-grade polish. SHA-256 verified."],
  ["Pricing — ORANGEBOX", "FREE first week (ends 2026-06-06 4 PM EDT) · $99 perpetual thereafter · §4A bans subscription"],
  ["Pricing — B00KMAKR", "FREE first week · then dynamic-world-pricing: $99 Tier 1 anchor · US $9.90 (USA Advantage Clause) · CN $99 (Strategic Tier Lift) · IN $9.90 · SO $1.98"],
  ["Refund", "30-day Material Failure Guarantee on both products · full refund · no support-queue gauntlet"],
  ["License", "Perpetual · §4A no-SaaS covenant · once · forever · grandfather-for-life clause for free-week buyers"],
  ["Platform · ORANGEBOX", "Windows 10/11 x64 · macOS/Linux on roadmap"],
  ["Platform · B00KMAKR", "Mac + Windows (Universal HTML app + native Tauri builds: .dmg + .msi/.exe)"],
  ["Telemetry", "ZERO. No phone-home. No analytics. No remote-update channel. No license-server check."],
  ["Code signing", "Sectigo timestamp · self-Authenticode for beta · Microsoft-issued Authenticode (Azure Trusted Signing) in a future release"],
  ["SHA-256 receipts", "Every shipped artifact carries a published SHA-256. Buyers verify with shasum / Get-FileHash before install."],
  ["Public repos", "github.com/AtomEons/orangebox · github.com/AtomEons/BookMaker"],
  ["Founder", "Atom McCree, AtomEons Systems Laboratory"],
  ["Location", "Marco Island, FL, USA"],
  ["Manifesto", "https://atomeons.com/manifesto · 14 clauses · falsifiable"],
  ["Pricing doctrine paper", "https://atomeons.com/dynamic-world-pricing · CC-BY 4.0 · 7-doctrine synthesis"],
  ["URLs", "atomeons.com/orangebox · atomeons.com/b00kmakor · atomeons.com/press"],
];

const QUOTES = [
  {
    line: "An app from the future. The first AI application built by AI, for AI operators, using AI to make AI useful — with one human in the loop reading every receipt before approving every promotion.",
    by: "Atom McCree, founder · launch night",
  },
  {
    line: "Built in 75 days. With itself. The compression ratio against solo-founder pace is approximately ten-to-one. Against commissioning a custom internal cockpit through a consulting firm, the ratio is closer to a thousand-to-one in dollars.",
    by: "ORANGEBOX v1.0.0-beta · launch note",
  },
  {
    line: "Eleven features have not lived inside a single application before tonight. AECode contracts. Tamper-evident JSON receipts. Crystal Lattice Compression. Restore Primers. Voice fingerprint persistence. Mission graph DAG. The fourteen-department architecture. Cost-aware multi-LLM routing. License §4A. Dynamic World Pricing with two named geopolitical clauses. The grandfather-for-life launch clause.",
    by: "Launch dossier · 2026-05-30",
  },
  {
    line: "The model does not run your project. You do. The cockpit keeps both true.",
    by: "Atom McCree, founder",
  },
  {
    line: "Receipts, not promises. Every meaningful action writes a tamper-evident JSON receipt to the operator's local audit trail. Three months later, the question 'what did the AI do at 2:47 PM on Tuesday' becomes a one-line grep — not a six-tab investigation.",
    by: "ORANGEBOX doctrine",
  },
  {
    line: "License §4A is not marketing copy. It is contract text. The lab is legally bound to never move the product to a subscription model. Existing buyers stay perpetual forever — by clause, not by promise.",
    by: "Manifesto clause 04",
  },
  {
    line: "USA Advantage Pricing Clause: US buyers pay 10% of the Tier 1 anchor. Mission-aligned with the 44-million-displaced-worker frame. Strategic Tier Lift: China at the Tier 1 anchor regardless of World Bank classification. Both clauses published verbatim, reasoned in public, revocable through documented changelog entries. No opaque per-country numbers anywhere.",
    by: "Dynamic World Pricing paper · /dynamic-world-pricing",
  },
  {
    line: "Falsify any clause with evidence and the lab updates the manifesto in public, with attribution.",
    by: "Manifesto clause 13",
  },
];

const ANGLES = [
  {
    head: "The first AI app built by AI — for AI operators",
    body: "ORANGEBOX v1.0.0-beta is, by the receipts on disk, an application whose architecture, contracts, documentation, manuals, pricing doctrine, and 142-surface enumeration were each routed through AI agents acting on behalf of one human operator — and the resulting application is itself an instrument for AI to operate. The thing that built the application is the application. Compression ratio against solo-founder pace: approximately 10×. Against custom-internal-cockpit consulting: approximately 1000× in dollars.",
    beat: "AI agents · self-construction · post-IDE programming · meta-tooling",
  },
  {
    head: "Eleven novel features never seen together inside one app before tonight",
    body: "AECode contracts (machine-grammar for AI work · intent → contract → patch → gauntlet → receipt). Tamper-evident JSON receipts on every meaningful AI action. AtomSmasher Crystal Lattice Compression (10-80× context compression). Restore Primers (a new AI session learns the cockpit in <30s). Voice fingerprint persistence across sessions. Mission graph DAG that survives context resets. 14-department named-role architecture (AE0-AE14). Cost-aware multi-LLM routing across 9 providers. License §4A as binding contract text, not marketing copy. Dynamic World Pricing with two NAMED geopolitical clauses (USA Advantage + Strategic Tier Lift). Grandfather-for-life free-week clause, legally enforceable. The list runs end-to-end inside one app for the first time tonight.",
    beat: "AI tooling · agentic systems · IDE-of-the-future · novel UX",
  },
  {
    head: "Dynamic World Pricing — the first published doctrine for fair-by-country software pricing",
    body: "Most software with regional pricing hides the mechanism behind a tooltip. AtomEons publishes the full mechanism: World Bank income tier mapping, two named country-level doctrines (USA Advantage Pricing Clause sets US at 10% of Tier 1; Strategic Tier Lift moves China to Tier 1 despite Tier 2 classification), the Stripe-minimum free-floor safeguard, the IP-geolocation method, the §4A no-saas compatibility statement. Curl the API yourself: /api/price/orangebox?cc=IN. CC-BY 4.0 paper at /dynamic-world-pricing.",
    beat: "pricing innovation · global software economics · indie business",
  },
  {
    head: "B00KMAKR — the writer's cockpit with 142 feature surfaces, Mac + Windows, shipped the same night as ORANGEBOX",
    body: "A solo founder shipped two complete products in the same launch wave. B00KMAKR is the publishing house on the writer's computer: mission graph for chapters, voice fingerprint persistence, continuity audit, KDP packager, cover lab, 120-day launch calendar. Apple/Microsoft-grade polish on both platforms (book-red Mac manual + blue Windows manual · embedded fonts · SHA-256 verified). The cockpit shares the routing layer with ORANGEBOX — 14 departments, AECode contracts, receipts, the whole stack.",
    beat: "creator tools · writing software · indie publishing · KDP",
  },
  {
    head: "Local-first AI when the industry went cloud-only",
    body: "Both products run entirely on the buyer's machine. No telemetry. No phone-home. No analytics. No remote-update channel. No license-server check. Verify yourself: open Activity Monitor / Resource Monitor, filter by the application name, watch the absence of outbound traffic. Drop the machine onto an airgapped network — the cockpit fully loads and operates on local Ollama. The 'no phone-home' claim is testable, not branded.",
    beat: "privacy · data sovereignty · EU/GDPR · zero-trust",
  },
  {
    head: "Anti-SaaS as binding contract — License §4A",
    body: "License §4A is not a marketing claim. It is contract text that legally binds AtomEons to never move the product to a subscription. Free-week buyers are grandfathered for life by separate clause — even when the price changes for new buyers, even when the company is sold, even when the lab ceases operations. The application keeps working with no online activation, no kill-switch, no license-server check. The covenant survives the lab.",
    beat: "indie founders · SaaS economics · contract law · post-subscription",
  },
  {
    head: "The Florida operator shipping two products the same night Anthropic raised at $900B pre-money",
    body: "While the largest AI labs raised mega-rounds, a solo founder in Marco Island shipped two complete production-grade desktop AI applications in one launch wave — both signed, both with PDF manuals embedding their own fonts, both with SHA-256 receipts publicly verifiable, both with public GitHub repos, both with a published pricing doctrine, all in 75 days of solo work routed through AI. Smallest possible AI lab vs largest possible AI lab, same week.",
    beat: "geography of tech · alternative AI ecosystem · garage-to-launch · solo founder",
  },
  {
    head: "Receipts over slogans — proof that travels with the buyer",
    body: "Every meaningful action in either product writes a tamper-evident JSON receipt to the operator's local audit trail. Receipts include the model used, the prompt that produced the result, a SHA-256 stamp, the gauntlet result, and the approval signature. Three months after a contested change, the question 'what did the AI do' is a one-line grep against the receipt rail — not a six-tab investigation through vendor logs the operator does not own.",
    beat: "audit · compliance · AI accountability · forensics",
  },
];

const COPY_BLOCKS = [
  {
    title: "Hacker News — Show HN",
    body: `Show HN: ORANGEBOX v1.0.0-beta + B00KMAKR v3.2.0 — the first AI apps built by AI, for AI operators (free this week)

I'm Atom — solo founder out of Marco Island, FL. Tonight I shipped two desktop AI applications in one launch wave, built in 75 days using earlier versions of themselves. The compression ratio against solo-founder pace is approximately 10×. Against a consulting firm building a custom internal cockpit, closer to 1000× in dollars.

ORANGEBOX v1.0.0-beta — Windows desktop AI cockpit. 9-provider multi-LLM router (Claude / GPT / Gemini / OpenRouter / Groq / Cohere / Mistral / Perplexity / local Ollama, BYO keys, zero markup). 14-department named-role architecture (AE0-AE14). AECode contracts on every AI change (intent → contract → patch → gauntlet → receipt). Tamper-evident JSON receipts on every meaningful action. AtomSmasher Crystal Lattice Compression (10-80× context compression).

B00KMAKR v3.2.0 — AI publishing cockpit. Mac + Windows. 142 feature surfaces. Universal HTML app + native Tauri builds. Mission graph for chapters, voice fingerprint persistence, continuity audit across timeline/characters/facts, KDP packager, cover lab, 120-day launch calendar with daily action queue. Embedded-font PDF manuals (book-red Mac, blue Windows so you can tell at a glance).

Eleven features have not lived inside a single application before tonight: AECode contracts · tamper-evident JSON receipts · Crystal Lattice Compression · Restore Primers (new AI session learns the cockpit in <30s) · voice fingerprint persistence · mission graph DAG · 14-department architecture · cost-aware LLM routing · License §4A as binding contract text · Dynamic World Pricing with two named country-level clauses (USA Advantage + Strategic Tier Lift) · grandfather-for-life free-week clause.

Pricing — both products free this week (countdown ends 2026-06-06 4 PM EDT). After: $99 perpetual for ORANGEBOX; $99 Tier 1 with dynamic-world-pricing for B00KMAKR (US $9.90 under USA Advantage Clause, CN $99 under Strategic Tier Lift). License §4A legally bans subscription on both products.

No telemetry. No phone-home. No analytics. Source included alongside each binary. SHA-256 verified, Sectigo-timestamped. Public repos at github.com/AtomEons/orangebox and github.com/AtomEons/BookMaker. Pricing mechanism public at atomeons.com/dynamic-world-pricing.

https://atomeons.com/orangebox · https://atomeons.com/b00kmakor

Happy to AMA on the AI-builds-AI architecture, the dynamic-world-pricing doctrine, the AECode contract system, or how a one-operator lab shipped two production-grade desktop applications in 75 days while the cartel argued about RLHF.`,
  },
  {
    title: "Product Hunt — launch description",
    body: `An app from the future. The first AI applications built by AI, for AI operators, using AI to make AI useful.

Tonight ORANGEBOX v1.0.0-beta and B00KMAKR v3.2.0 shipped — both built in 75 days using earlier versions of themselves. Eleven novel features that have not lived inside a single application before tonight.

ORANGEBOX is the local-first desktop AI cockpit for builders: multi-LLM routing across 9 providers (Claude / GPT / Gemini / Ollama / OpenRouter / Groq / Cohere / Mistral / Perplexity), tamper-evident JSON receipts on every action, 14-department named-role architecture, AECode contracts on every AI change, AtomSmasher Crystal Lattice Compression (10-80× context).

B00KMAKR is the writer's publishing cockpit: Mac + Windows, 142 feature surfaces, mission graph for chapters, voice fingerprint persistence, continuity audit, KDP packager, cover lab, 120-day launch calendar.

Free this week (ends June 6). After: $99 perpetual for ORANGEBOX, dynamic-world-pricing for B00KMAKR (your country's tier rate). License §4A legally bans subscription. Public repos at github.com/AtomEons.`,
  },
  {
    title: "DEV.to — build-in-public article opening",
    body: `# I shipped two AI apps in one launch wave by having the AI build itself — here's the architecture

In 75 days a solo operator out of Marco Island shipped ORANGEBOX v1.0.0-beta (Windows AI cockpit) and B00KMAKR v3.2.0 (Mac + Windows publishing cockpit). Both went live the same night. Both were built by AI agents acting on behalf of one human operator, under structured contracts, with every meaningful action writing a tamper-evident receipt to disk.

This is not "I used Claude as a pair programmer." This is the architecture that flips that around — the application is itself an instrument for AI to operate, and the thing that built the application is the application.

The pattern has five new pieces:

**1. AECode contracts.** A machine-grammar wrapper around every AI-assisted change. The contract specifies intent, mission, target plan, gauntlet, receipt expectation. The AI cannot promote a change until the contract is satisfied. The contract is replay-able from a single file on disk three months later.

**2. Tamper-evident JSON receipts.** Not application logs. Structured receipts with SHA-256 stamps, written to the operator's local audit trail. Every meaningful AI action produces one. "What did the AI do at 2:47 PM on Tuesday" becomes a one-line grep.

**3. AtomSmasher Crystal Lattice Compression.** 10-80× context compression on typical codebases. The model sees an order of magnitude more code per token. Preserves intent, code shape, dependency graph.

**4. Restore Primers.** Reusable workflow files that teach a fresh AI session — any vendor — how to operate inside the cockpit in under 30 seconds. The session opens, the primer loads, the AI orients to the project state and gets to work. No re-onboarding penalty between vendors.

**5. The 14-department named-role architecture (AE0-AE14).** AI work routes through named departments with charter constraints. Every action has a known author. Every promotion has a known reviewer. The dispatcher logs the route in the receipt.

What this enables in practice: ORANGEBOX's v1.0.0-beta installer was produced by earlier versions of itself. The receipts from those builds are in the install. B00KMAKR's 142 feature surfaces were enumerated, counted, and verified by an AI agent running against the bundle that buyers download tonight.

[continues with deep architecture, AECode contract examples, receipt schema, the dispatcher design, and the manifesto]

Public repos: github.com/AtomEons/orangebox · github.com/AtomEons/BookMaker
Product pages: atomeons.com/orangebox · atomeons.com/b00kmakor
Pricing doctrine paper: atomeons.com/dynamic-world-pricing (CC-BY 4.0)`,
  },
  {
    title: "Cold email template (universal)",
    body: `SUBJECT: [SUBJECT-ANGLE per target]

Hi [NAME],

While [RECENT NEWS THEY COVERED], I shipped two AI applications tonight — both built by AI, for AI operators, in 75 days using earlier versions of themselves.

ORANGEBOX v1.0.0-beta — Windows desktop AI cockpit. 9-provider multi-LLM router (Claude/GPT/Gemini/Ollama/OpenRouter/Groq/Cohere/Mistral/Perplexity). AECode contracts on every AI change. Tamper-evident JSON receipts. 14-department architecture. Free this week, then $99 perpetual (§4A legally bans subscription).

B00KMAKR v3.2.0 — AI publishing cockpit. Mac + Windows. 142 feature surfaces. Mission graph for chapters. Voice fingerprint persistence. KDP packager. Free this week, then dynamic-world-pricing (your country's tier rate via the USA Advantage Clause + Strategic Tier Lift doctrines).

Eleven novel features have not lived inside a single application before tonight. The full list is on the press page.

The story angle: a solo Florida operator shipped two production-grade desktop AI apps in one launch wave while the cartel debated RLHF — and the apps were built by AI under structured contracts, with one human in the loop reading every receipt before approving every promotion. The leverage that gives one human is the leverage that flattens the difference between a fifty-person Series A and a one-operator lab.

Full press kit: https://atomeons.com/press
Product pages: https://atomeons.com/orangebox · https://atomeons.com/b00kmakor
Pricing doctrine: https://atomeons.com/dynamic-world-pricing
Founders Letter: https://atomeons.com/founders-view/2026-05-31-an-app-from-the-future

Founder-direct on this email or @AtomMccree.

— Atom McCree
AtomEons Systems Laboratory · Marco Island, FL`,
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Press", item: "https://atomeons.com/press" },
  ],
};

export default function Press() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> press kit · EPK
        </p>
      </div>

      {/* HERO — LabHero primitive */}
      <LabHero
        eyebrow="::electronic press kit · the lab in 2026"
        title="For journalists,"
        titleAccent="covering the lab."
        subtitle={
          <p>
            AtomEons Systems Laboratory is one solo independent AI lab
            in Marco Island, Florida — running across four pillars:
            ÆoNs Research, the ORANGEBOX cockpit, skil.ski, and the
            /intel + Founder&apos;s View broadcast surfaces. Press
            release, quotes, story angles, downloadable assets,
            copy-pastable post bodies, and direct founder contact
            below. No gatekeeping. No PR layer.
          </p>
        }
        primaryCta={{
          label: "founder contact →",
          href: "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20v6.3%20press%20enquiry",
        }}
        secondaryCta={{
          label: "@AtomMccree on X →",
          href: "https://x.com/AtomMccree",
        }}
        tone="cyan"
      >
        {/* direct contact strip — calmer than the prior card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0A1A1C] to-[#0A0F11] p-7 shadow-[0_0_80px_-30px_rgba(34,240,213,0.4)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::direct founder contact · sla ~2h waking hours ET
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20v6.3%20press%20enquiry"
              className="inline-flex items-center gap-2 text-base text-[#F2F4F5] hover:text-[#22F0D5]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                email
              </span>
              a.mccree@gmail.com
            </a>
            <a
              href="https://x.com/AtomMccree"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-base text-[#F2F4F5] hover:text-[#22F0D5]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                X / DM
              </span>
              @AtomMccree
            </a>
            <span className="inline-flex items-center gap-2 text-base text-[#F2F4F5]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                location
              </span>
              Marco Island, FL, USA
            </span>
          </div>
          <p className="mt-5 border-t border-[#1A2225] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
            embargo: none · launch is public the moment you publish
          </p>
        </div>
      </LabHero>

      {/* MEDIA KIT — copy-pasteable boilerplate, pitch, bio, hero image,
            downloadable assets row, honest coverage feed, interview
            protocol cards. Operator directive 2026-05-21: "press page
            go real grade all." */}
      <PressMediaKit />

      {/* TOTAL EFFORT — the lab in 2026 across all four pillars.
            Press leads here before any single-product story. */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the total effort · what the lab has shipped
        </h2>
        <p className="mb-10 max-w-3xl text-sm text-[#6B7779] md:text-base">
          Seven live surfaces across five pillars. All shipped by one
          operator. Marco Island, FL. April–May 2026.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {LAB_SURFACES.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: s.accent }}
              >
                {s.pillar}
              </p>
              <h3 className="mt-2 text-lg font-medium text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-xl">
                {s.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {s.blurb}
              </p>
              <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                {s.href} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HEADLINE STORY */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the story in one paragraph
        </p>
        <p className="text-balance text-3xl font-medium leading-[1.2] tracking-[-0.01em] text-[#F2F4F5] md:text-4xl">
          While Anthropic raised{" "}
          <span className="text-[#22F0D5]">$30B</span>, a solo founder in
          a Florida garage shipped the opposite play —{" "}
          <span className="text-[#22F0D5]">ORANGEBOX Command v6.3</span>,
          a <span className="text-[#22F0D5]">$99-once</span> desktop AI
          cockpit with two surfaces (
          <span className="text-[#22F0D5]">AE See-Suite</span> +{" "}
          <span className="text-[#22F0D5]">AE Operations</span>), a
          license clause that{" "}
          <span className="text-[#22F0D5]">legally bans</span> switching
          to subscription, two 30-day refund paths, and a published{" "}
          <span className="text-[#FFB87A]">14-clause manifesto</span>{" "}
          that invites the public to{" "}
          <span className="text-[#FFB87A]">falsify any clause with
          evidence</span>.
        </p>
      </section>

      {/* QUICK FACTS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::quick facts
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {FACTS.map(([k, v], i) => (
            <div
              key={k}
              className={`grid grid-cols-[160px_1fr] items-baseline gap-6 px-6 py-3.5 md:grid-cols-[200px_1fr] md:px-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7779]">
                {k}
              </span>
              <span className="text-sm text-[#F2F4F5] md:text-base">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PULL QUOTES */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::pull quotes · use freely
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/40"
            >
              <blockquote className="text-balance text-lg leading-relaxed text-[#F2F4F5] md:text-xl">
                "{q.line}"
              </blockquote>
              <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#22F0D5]">
                — {q.by}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STORY ANGLES */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::story angles · pick the one that fits your beat
        </h2>
        <p className="mb-10 text-sm text-[#6B7779]">
          Same cockpit. Different story. Pick the one that fits your beat.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {ANGLES.map((a) => (
            <div
              key={a.head}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#22F0D5]">
                {a.beat}
              </p>
              <h3 className="mt-3 text-xl font-medium text-[#22F0D5]">
                {a.head}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* COPY BLOCKS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::copy-paste blocks
        </h2>
        <p className="mb-10 text-sm text-[#6B7779]">
          Cleared for repost. Lift verbatim or remix.
        </p>
        <div className="space-y-6">
          {COPY_BLOCKS.map((cb, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-7 py-5 text-base text-[#F2F4F5] marker:hidden">
                <span>{cb.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5] group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="border-t border-[#1A2225] px-7 py-5">
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#9BA5A7]">
                  {cb.body}
                </pre>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ASSETS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::downloadable assets
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="/opengraph-image"
            target="_blank"
            rel="noopener"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#22F0D5]">
              ::hero card · 1200×630 PNG
            </p>
            <p className="mt-3 text-base text-[#F2F4F5]">
              Open Graph hero image (home)
            </p>
            <p className="mt-1 text-xs text-[#6B7779]">
              right-click → save image as…
            </p>
          </a>
          <a
            href="/orangebox/opengraph-image"
            target="_blank"
            rel="noopener"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#22F0D5]">
              ::product card · 1200×630 PNG
            </p>
            <p className="mt-3 text-base text-[#F2F4F5]">
              Faster · Smarter · Cached card
            </p>
            <p className="mt-1 text-xs text-[#6B7779]">
              right-click → save image as…
            </p>
          </a>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::transparency · for fact-checkers
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
            AtomEons publishes a public working journal at{" "}
            <Link
              href="/founders-view"
              className="text-[#22F0D5] hover:underline"
            >
              The Founder&apos;s View
            </Link>
            . Every refund, every shipped bug, every wrong call gets logged.
            Live sales counter on the home page reads from Stripe. No vanity
            metrics. The build-in-public arc is documented from "0 sales after
            14h" through whatever post-launch reality turns out to be.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          ::questions, custom angle, exclusive embargo?
        </p>
        <p className="mt-4 text-2xl text-[#F2F4F5]">
          DM me on X{" "}
          <a
            href="https://x.com/AtomMccree"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] hover:underline"
          >
            @AtomMccree
          </a>{" "}
          or email{" "}
          <a
            href="mailto:a.mccree@gmail.com"
            className="text-[#22F0D5] hover:underline"
          >
            a.mccree@gmail.com
          </a>
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
          founder-direct · no PR layer · 2h response sla
        </p>
      </section>
    </main>
  );
}
