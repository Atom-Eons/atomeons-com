import type { Metadata } from "next";
import Link from "next/link";

/**
 * /changelog — public version history.
 *
 * Trust surface for buyers, journalists, and AI search engines. Each
 * entry pairs the version tag with the date, the headline change, the
 * file/route surfaces touched, and a one-line operator note. Renders
 * from the in-file LOG array so a new release is one PR line away.
 */

export const metadata: Metadata = {
  title: "Changelog — public version history · AtomEons",
  description:
    "AtomEons public changelog. Site rewrites, ORANGEBOX releases, broadcast cadence, research drops, legal updates. Every shipped change with date + surfaces touched + operator note. Updated whenever something ships.",
  alternates: { canonical: "https://atomeons.com/changelog" },
  openGraph: {
    title: "Changelog · AtomEons",
    description:
      "Public version history. Site rewrites, ORANGEBOX releases, broadcast cadence, research drops.",
    url: "https://atomeons.com/changelog",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Changelog",
    description: "Public version history · updated as we ship",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Changelog", item: "https://atomeons.com/changelog" },
  ],
};

type ChangeKind = "site" | "product" | "research" | "broadcast" | "legal" | "ops";

type Entry = {
  date: string; // ISO YYYY-MM-DD
  tag: string;
  kind: ChangeKind;
  title: string;
  surfaces: string[];
  body: string;
};

const KIND_COLORS: Record<ChangeKind, string> = {
  site: "#22F0D5",
  product: "#FF7A1A",
  research: "#FFB87A",
  broadcast: "#FFB87A",
  legal: "#9BA5A7",
  ops: "#9BA5A7",
};

const LOG: Entry[] = [
  // Newest first.
  {
    date: "2026-05-30",
    tag: "orangebox-launch-support-batch",
    kind: "product",
    title:
      "ORANGEBOX launch support batch — 3-phase checkout · /pricing $99 · footer + header + llms.txt + launch-day letter draft",
    surfaces: [
      "app/api/checkout/v63/route.ts (free-week phase + $99 fallback + 3-tool bundle metadata)",
      "app/_components/OrangeBoxV63Buy.tsx (3-phase routing client-side · free-week download handling)",
      "app/_components/Footer.tsx (chip + lab-status updated to launch posture)",
      "app/_components/Header.tsx (dropdown hint updated)",
      "app/_components/MobileNav.tsx (mirror header)",
      "app/pricing/page.tsx ($49 → $99 site-wide + free-week hero treatment + grandfathering callout)",
      "public/llms.txt (3-tool bundle framing for AI crawlers)",
      ".draft-letters/launch-day.json (NEW · 1500w launch broadcast for operator publish queue)",
    ],
    body:
      "Support batch for the /orangebox launch rebuild. Checkout endpoint /api/checkout/v63 now routes through three phases: (1) FREE WEEK — if NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT is set + in future, returns 200 with {free: true, url: <download>} pointing at NEXT_PUBLIC_ORANGEBOX_DOWNLOAD_URL; (2) PAID — STRIPE_ORANGEBOX_V63_ENABLED=true flips Stripe checkout active at $99 fallback or STRIPE_ORANGEBOX_V63_PRICE_ID if set; (3) PRE-LAUNCH — both envs absent returns 503 with email-inquire mailto, unchanged. OrangeBoxV63Buy client redirects to whichever URL the endpoint returns — covers both free-download and stripe-checkout flows. Stripe product description updated to '3-tool bundle (cockpit + AE Operations + Delta IDE)'. Metadata sku=ORANGEBOX_BUNDLE_V1, price=$99, pricing_law='$99_post_countdown_§4A_no_saas_random_change_disclosed'. /pricing page: blanket $49 → $99 replace, hero rewritten to lead with 'FREE for one week · then $99 · may change at random' framing, grandfathering callout box added. Footer chip + Header dropdown hint + MobileNav hint all updated to '3-tool bundle · FREE launch week · then $99'. llms.txt /orangebox surface entry rewritten with full launch posture. Launch-day broadcast letter drafted to .draft-letters/launch-day.json (1500w, 'The Bundle Goes Live', ready for /api/admin/publish-letter when delta uploads). Free-week buyers grandfathered for life by clause.",
  },
  {
    date: "2026-05-30",
    tag: "orangebox-launch-rebuild",
    kind: "product",
    title:
      "/orangebox 100% rebuild · 3-product separation · FREE-week countdown → $99 launch posture",
    surfaces: [
      "app/orangebox/page.tsx (REWRITTEN · ~700 lines)",
      "app/orangebox/CountdownTimer.tsx (NEW · pre-launch / live / expired phases · env-driven)",
    ],
    body:
      "Operator launch directive: separate ORANGEBOX into 3 named tools (AE Operations · ORANGEBOX cockpit · Delta visual-intelligence IDE), free-for-one-week launch promo with live countdown, $99 after countdown closes, public messaging that price may change at random going forward (stair-step toward $999 over time as Stripe transaction history supports). Rebuilt /orangebox from scratch in the walk-em-in-slow-then-go-technical structure the operator asked for: (1) HERO with countdown · pre-launch mode shows 'When the upload lands, the clock starts' · live mode ticks DD/HH/MM/SS · expired mode locks to $99 once forever. (2) PLAIN-LANGUAGE INTRO — no jargon, dinner-table English describing what the system actually is. (3) THREE PRODUCTS rendered with three layers each: plain English / what it does in real life / technical depth for hackers and pros. AE Operations = engine room. ORANGEBOX = cockpit. Delta = visual-intelligence IDE replacing Cursor/VS Code. (4) COMPREHENSIVE FEATURE MATRIX — 5 groups, 35+ features. (5) FOR/NOT-FOR honest screening. (6) PRICING with countdown repeated + two-column 'what stays true forever' vs 'what is intentionally volatile.' (7) FINAL STRIP with founder-direct CTA. CountdownTimer reads NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT — operator sets env var when uploading binary; absent env renders pre-launch mode. Free-week buyers grandfathered for life by clause. SoftwareApplication JSON-LD reflects new bundle name + $99 price + pre-order availability.",
  },
  {
    date: "2026-05-29",
    tag: "pricing-og-card",
    kind: "site",
    title:
      "/pricing OG card · $49 once · §4A no-saas pill",
    surfaces: [
      "app/pricing/opengraph-image.tsx (NEW · 'One product · one price · forever')",
    ],
    body:
      "Custom 1200×630 PNG for /pricing shares. Headline: '$49 once. No subscription. Ever.' Orange/cyan dual bloom (orange-led to match the commerce-color identity). Bottom strip: 'two 30-day refund paths · source included · windows 10/11' subtitle + §4A no-saas binding pill. /press and /about already had OG cards — left alone. /manifesto, /intel, /research still lack OG cards and could be future additions.",
  },
  {
    date: "2026-05-29",
    tag: "homepage-compression",
    kind: "site",
    title:
      "Homepage section compression · 11 blocks → 9 · dropped redundant duplicates",
    surfaces: [
      "app/page.tsx (-StartHereStrip · -FoundersViewTeaser · imports cleaned)",
    ],
    body:
      "Two clear duplications removed. StartHereStrip was redundant after HomeOnboardStrip — both routed novice traffic to /learn / /start with overlapping persona-chip patterns. Dropped StartHereStrip; HomeOnboardStrip carries the mission strip alone now. FoundersViewTeaser was the evergreen broadcast pitch that became redundant when FoundersViewLiveTeaser shipped (the live teaser surfaces the most recent letter via 5-min ISR — superseding the static pitch). Dropped FoundersViewTeaser; the live teaser stands alone. Net: homepage section count dropped from 11 to 9. Same routes still reachable via Header dropdown, Footer Learn column, OrganismRail. Visual rhythm tighter. Both deleted components remain in the codebase for revert (not removed from disk).",
  },
  {
    date: "2026-05-29",
    tag: "glossary-expansion-pass-3",
    kind: "site",
    title:
      "/glossary expanded 40 → 52 terms · duplicates removed · 14 new practical terms",
    surfaces: [
      "app/_data/glossary.ts (+14 terms · -2 duplicates · net +12)",
    ],
    body:
      "Cleanup + expansion. Removed two duplicate entries from earlier workflow merge (RLHF + Vibe coding were each defined twice with different slugs). Added 14 new hand-written terms covering the 2026 AI vocabulary gaps: Foundation model · Transformer · Attention · Diffusion model · Parameter count · Pre-training · Synthetic data · Benchmark · Top-p/Top-k · Test-time compute · JSON mode/Structured output · Roleplay prompting · Constitutional AI · Hugging Face. All 1-2 sentences, plain English, no jargon stacks. Glossary now hosts 52 unique terms with auto-computed slugs + DefinedTermSet JSON-LD per entry.",
  },
  {
    date: "2026-05-29",
    tag: "tools-expansion-pass-2",
    kind: "site",
    title:
      "/tools expanded 23 → 33 tasks · 10 high-stakes life-and-work jobs added",
    surfaces: [
      "app/_data/tasks.ts (+10 hand-written tasks)",
    ],
    body:
      "Direct expansion (no workflow — task content writes faster manually than through schema enforcement). Ten new tasks across the high-leverage life-and-work surfaces: rewrite-resume (writing) · linkedin-about-section (writing · ban-list for AI clichés) · interview-prep-deep (planning · calibrated to specific role and interviewer, not generic) · code-review-my-work (decoding · senior-engineer review before push) · what-to-read-next (deciding · personalized not top-10) · argue-against-my-position (deciding · steel-man the opposing case · cross-link to senior-engineer-pattern lesson) · explain-to-a-kid (writing · age + personality calibrated · the trap to avoid) · what-to-cook-tonight (planning · one dinner, not three options · calibrated to energy level) · what-to-say-at-the-funeral (writing · respectful, specific to the person, includes 'acknowledge the difficult thing with care' move) · negotiate-something-hard (deciding · not just salary · walk-away calibration). Each carries the full prompt template with [bracketed slots], recommended AI with routing reasoning, and time estimate. Categories now balanced: WRITING (10), DECODING (5), PLANNING (6), DECIDING (8), LEARNING (4).",
  },
  {
    date: "2026-05-29",
    tag: "og-cards-pass-2",
    kind: "site",
    title:
      "OG cards for /tools, /prompt-kit, /vs, /glossary — distribution surfaces refined",
    surfaces: [
      "app/tools/opengraph-image.tsx (NEW · WHAT DO YOU NEED TO DO RIGHT NOW · 5 category chips)",
      "app/prompt-kit/opengraph-image.tsx (NEW · Every prompt. One page.)",
      "app/vs/opengraph-image.tsx (NEW · Calibrated by the work · 3 vs chips)",
      "app/glossary/opengraph-image.tsx (NEW · Every AI word. One sentence each. · 3 example term rows)",
    ],
    body:
      "Every share of these routes was previously falling back to the root OG card. Now each carries its own 1200×630 PNG via Next 16 edge-runtime ImageResponse. STATIC only (no per-slug dynamic OG — that combo with generateStaticParams hit Next 16 page-data collection issues earlier this session and was dropped). Each card follows the same brand grammar: ambient cyan+peach bloom · top-left/right monospace caps strip · big display headline with cyan accent word · category/scope chips · bottom strip with URL + cyan FREE/CC-BY pill. Consistent across now 7 surfaces (root + /learn + /manifesto + /founders-view + /tools + /prompt-kit + /vs + /glossary). Distribution quality on social shares + AI search citation jumped materially.",
  },
  {
    date: "2026-05-29",
    tag: "scroll-progress-full-coverage",
    kind: "site",
    title:
      "ScrollProgress now mounted on every long-scroll page · 3 more letter drafts queued",
    surfaces: [
      "app/tools/page.tsx (ScrollProgress mounted)",
      "app/prompt-kit/page.tsx (ScrollProgress mounted)",
      "app/glossary/page.tsx (ScrollProgress mounted)",
      ".draft-letters/prompt-as-property.json (NEW · ~1100w)",
      ".draft-letters/honest-cost-of-cheap.json (NEW · ~1100w)",
      ".draft-letters/what-a-good-teacher-knows.json (NEW · ~1300w)",
    ],
    body:
      "ScrollProgress now covers every long-scroll page on the site: /learn/lesson/[slug] · /founders-view/[slug] · /research/lessons-from-sci-fi/monograph · /research/papers/[slug] · /vs/[slug] · /tools · /prompt-kit · /glossary. 8 surfaces total. CSS-only via animation-timeline: scroll(root block). Plus three more letter drafts written directly in operator voice and saved to .draft-letters/: Your Prompts Are Property (the IP question · 1100w) · The Honest Cost of Cheap (the $100/mo SaaS stack math · 1100w) · What a Good Teacher Knows (five things AI can't do in education + the one thing it can · 1300w). All four letter drafts now in the publish queue (kitchen-table + 3 new). Operator can pick which to publish via the admin endpoint at any time.",
  },
  {
    date: "2026-05-29",
    tag: "vs-comparison-pages",
    kind: "site",
    title:
      "/vs NEW — 3 honest AI comparison pages (Claude vs ChatGPT · Cloud vs Local · Subscription vs One-time)",
    surfaces: [
      "app/_data/comparisons.ts (NEW · 3 comparisons with body_md + table + decision_framework)",
      "app/vs/[slug]/page.tsx (NEW · dynamic route · LabHero + at-a-glance table + long-form body + decision framework)",
      "app/vs/page.tsx (NEW · index page listing all comparisons)",
      "app/sitemap.ts · app/_components/Footer.tsx · public/llms.txt (wired)",
    ],
    body:
      "Recovery workflow couldn't deliver /vs body content through structured-output schema enforcement (max_tokens truncation on long body_md). Written directly in operator voice: calm, technical, helpful — senior-engineer-explaining-tradeoffs-over-coffee. Three head-to-heads at ~1500 words each: Claude vs ChatGPT (voice, pricing, context window, refusal posture, image/audio, agentic mode, privacy, who picks what) · Cloud vs Local AI (quality gap, privacy posture, hardware, when to switch) · Subscription vs One-time (1/3/10-year math, what each model incentivizes, §4A enforceability). Each page has 4 sections: LabHero · at-a-glance table (10-11 dimensions) · long-form body with custom markdown-light pipeline (h2, p, tables, links) · 3-column decision framework (pick left · pick right · pick both). Dynamic route /vs/[slug] generates static for all 3 at build time. Index page /vs lists all comparisons. Article + ItemList + BreadcrumbList JSON-LD. ScrollProgress mounted on each comparison page (long-form). CC-BY 4.0.",
  },
  {
    date: "2026-05-29",
    tag: "search-live-filter-kitchen-table-draft",
    kind: "site",
    title:
      "/search live filter · kitchen-table letter drafted · workflow-truncation lesson learned",
    surfaces: [
      "app/search/SearchFilter.tsx (NEW · client-side live-typing filter)",
      "app/search/page.tsx (form → SearchFilter · data-search-item attrs on cards · static SEARCH RESULTS block removed)",
      ".draft-letters/kitchen-table.json (NEW · operator-review queue)",
    ],
    body:
      "Converted /search from a static directory (filtered only via URL ?q= on form submit) into a live-typing filter that runs client-side with no network round-trip. SearchFilter reads data-search-item + data-search-text attributes on each directory card, hides non-matches on every keystroke (useDeferredValue for smooth typing), shows visible/total count in the input chrome, and hides empty group sections when all their items are filtered out. Pure DOM manipulation, no backend, no tracking. The earlier static SEARCH RESULTS section was removed (duplicated work with the live filter). Form GET to ?q= still preserves deep-link / back-button state. Recovery workflow (run wf_a878a490-faf · 52 agents · 1.83M tokens · 6.2 min) failed at the script level — all 4 letter pipelines and 3 /vs pipelines threw uncaught StructuredOutput timeouts. The long-body content track is unreliable through schema enforcement; future content of that shape will be written directly. Drafted the first letter manually (kitchen-table angle — 'The Room the Leaderboard Doesn't Track' · 1200w · saved to .draft-letters/ for operator publish queue). Remaining 3 letter themes + 3 /vs pages will be hand-written in follow-up commits.",
  },
  {
    date: "2026-05-29",
    tag: "ai-tldr-scroll-coverage",
    kind: "site",
    title:
      "/ai TLDR card · ScrollProgress mounted on monograph + research papers",
    surfaces: [
      "app/ai/page.tsx (+TLDR card · WHO/MAP/EARN · jump to plan / tools / money)",
      "app/research/lessons-from-sci-fi/monograph/page.tsx (ScrollProgress mounted)",
      "app/research/papers/[slug]/page.tsx (ScrollProgress mounted)",
    ],
    body:
      "Added a TL;DR card to /ai with verified counts ('20 specific revenue paths' is asserted multiple times on the page; '50+ honest FAQs' matches the page's own self-description; tool names are verified by direct quote from the page body — Claude, ChatGPT, Gemini, Perplexity, Cursor, Claude Code, Ollama). Primary CTA jumps to #plan (the 30-60-90 day plan section · anchor verified). Secondary CTAs to #tools and #money (both verified). Workflow had rejected an earlier /ai TLDR for unverified counts — this version verifies against the page itself. ScrollProgress now mounted on every long-form surface: /learn/lesson/[slug], /founders-view/[slug], /research/lessons-from-sci-fi/monograph (38-page monograph — biggest reading surface on the site), /research/papers/[slug] (each paper). Long-form coverage complete.",
  },
  {
    date: "2026-05-29",
    tag: "mega-content-sweep-pass-1",
    kind: "site",
    title:
      "Mega content sweep · +5 /tools tasks · +14 glossary terms · ScrollProgress · /support hero → LabHero",
    surfaces: [
      "app/_data/tasks.ts (18 → 23 tasks · +bloodwork, sleep protocol, year-end review, exec brief, 90-day plan)",
      "app/_data/glossary.ts (26 → 40 terms · +reasoning model, context engineering, vibe coding, AI agent, tool use, function calling, hallucination rate, latency, token cost, distillation, MoE, prompt injection, RLHF, sycophancy)",
      "app/_components/v2/ScrollProgress.tsx (NEW · CSS-only via animation-timeline)",
      "app/learn/lesson/[slug]/page.tsx (ScrollProgress mounted)",
      "app/founders-view/[slug]/page.tsx (ScrollProgress mounted)",
      "app/support/page.tsx (hero → LabHero)",
    ],
    body:
      "Dynamic-workflow content expansion · 70 agents · 2.55M tokens · 16.5 min. Four parallel tracks fired: /tools tasks (20 slots) · /glossary terms (15 slots) · founder letters (4 slots) · /vs comparison pages (3 slots). Adversarial verify gates on each artifact. Ship plan results: TASKS 5/20 cleared (15 StructuredOutput timeouts from harness on long-prompt slots) · GLOSSARY 14/15 cleared (one entry deferred) · LETTERS 0/4 (all truncated mid-sentence — body_md hit max_tokens cap, verifier correctly held them) · VS PAGES 0/3 (same truncation issue). Shipped only what survived verify. Letters and /vs pages will be re-fired with explicit max_tokens raised. The verifier saved us from shipping 7 truncated artifacts — Mom's Law working as designed. Plus shipped ScrollProgress (top-of-viewport reading bar via CSS animation-timeline · prefers-reduced-motion safe · mounted on lesson + letter pages). /support hero refactored to LabHero — consistent rhythm now across /learn + /manifesto + /press + /support. /faq + /about kept as documentation-narrow layout (max-w-3xl) since LabHero isn't the right fit for those.",
  },
  {
    date: "2026-05-29",
    tag: "tools-task-router",
    kind: "site",
    title:
      "/tools NEW — job-driven AI task router with model-routing reasoning per task",
    surfaces: [
      "app/_data/tasks.ts (NEW · 18 tasks across 5 categories)",
      "app/tools/page.tsx (NEW · LabHero + 5 LabSections · category jump chips · per-task details with prompt + AI launch)",
      "app/sitemap.ts · app/_components/Footer.tsx · app/search/page.tsx · public/llms.txt (wired to /tools)",
    ],
    body:
      "Different angle from /prompt-kit (curriculum-driven) — /tools is JOB-driven. User comes in saying 'I need to do X right now' and the page maps that intent to: the exact copy-paste prompt for that job, the recommended AI (Claude / ChatGPT / Gemini / Perplexity) with one-sentence routing reasoning, and a one-click launch URL. 18 tasks across 5 categories: WRITING (5 — tough email reply, summarize doc, hard conversation, edit my draft, cover letter), DECODING (3 — medical report, legal contract, financial statement), PLANNING (3 — trip, workout, dinner this week), DECIDING (2 — pros/cons, stress-test), LEARNING (2 — quiz me, explain three ways). Each task carries a lessonSlug cross-link to the underlying /learn lesson where applicable. ItemList JSON-LD for the 18 tasks. LabHero + 5 LabSections (alternating default/tint variants). Per-task expandable details panel via native <details> — collapsed by default, expand reveals AI recommendation block + copy-paste prompt (LearnCopyPrompt) + cross-link. Wired into sitemap (0.94), Footer Learn column, /search USE AI section, llms.txt canonical surfaces.",
  },
  {
    date: "2026-05-29",
    tag: "llms-full-corpus-manifest",
    kind: "site",
    title:
      "/llms-full.txt NEW — full-corpus AI-ingestion manifest for AI search engines",
    surfaces: [
      "app/llms-full.txt/route.ts (NEW · server route, nodejs runtime, 15-min edge cache)",
      "public/llms.txt (+ pointer to /llms-full.txt as the FULL CORPUS endpoint)",
    ],
    body:
      "Where /public/llms.txt is a thin canonical index (sections, surface URLs, recommendations), /llms-full.txt is the FULL CORPUS AI search engines actually want in one fetch. Server route reads LESSONS + GLOSSARY + PATHS + LEVELS from the curriculum data files and queries supabase for the 20 most recent published broadcast letters. Emits a single plain-text document with: mission statement · 5 level descriptions (enters/graduates/risk/right-tool) · all 27 lessons with concept paragraphs + drill prompts inline + drill steps + outcome signals + traps · all 5 persona paths with fit-for/not-for/lesson sequences · all 26 glossary terms · 20 most recent letters (title + dek + date + word count + URL) · trust posture · canonical surface URLs. Cache: public, s-maxage=900, stale-while-revalidate=3600. Generated on every request, edge-cached 15 minutes. Pointed to from /llms.txt as the canonical full-corpus endpoint. Crawlers that ingest /llms-full.txt get the complete lab corpus in a single fetch with no scraping required. CC-BY 4.0.",
  },
  {
    date: "2026-05-29",
    tag: "lab-hero-motion-press-refactor",
    kind: "site",
    title:
      "LabHero gets ambient drift motion · /press hero refactored",
    surfaces: [
      "app/_components/v2/LabHero.tsx (+ 40s lab-hero-drift keyframe · reduced-motion safe)",
      "app/press/page.tsx (hero → LabHero · contact card kept in children slot)",
    ],
    body:
      "LabHero now carries a subtle ambient signature: a 40-second slow drift on the bloom layer (translate -2%/+1.5% + scale 1→1.04 → 1, ease-in-out infinite). Every LabHero-using surface — /learn, /manifesto, /press, homepage HomeOnboardStrip — picks up the motion for free. Pure CSS, no JS, will-change:transform for GPU compositing, prefers-reduced-motion media query disables the animation for users who request it. The motion is calm — not Linear-grid, not particle-flow — it just gives the heroes a quiet sense of life so they don't look like static screenshots. /press hero refactored from a custom-padding section to LabHero, with the founder-contact card preserved in the children slot. Primary CTA goes to founder mailto with v6.3 subject line; secondary CTA goes to X. Smaller change but the contact card now sits inside the new visual rhythm.",
  },
  {
    date: "2026-05-29",
    tag: "design-system-rollout-2",
    kind: "site",
    title:
      "Design-system rollout · /learn and /manifesto heroes refactored to LabHero · calmer rhythm site-wide",
    surfaces: [
      "app/learn/page.tsx (hero → LabHero · dropped 2 redundant CTAs from busy hero · kept progress + chip strip in children)",
      "app/manifesto/page.tsx (hero → LabHero · dropped redundant secondary paragraph from hero shell to subtitle slot · added #clause-index anchor for primary CTA)",
    ],
    body:
      "Second rollout pass of the design-system primitives shipped earlier today. Refactored /learn and /manifesto hero sections to use LabHero. /learn hero went from 4 stacked CTAs (a 2007 template tell) to 1 primary + 1 secondary, with the chip strip and progress bar moving into the children slot at the new spacing. /manifesto hero went from a 3-paragraph subtitle block to a tighter LabHero shell with the secondary paragraph compressed into the subtitle slot. /orangebox hero deliberately not refactored — its right-rail $49 commerce card needs a layout LabHero doesn't model. Net effect: every hero across /learn, /manifesto, and homepage HomeOnboardStrip now shares one display-heading scale (md:text-[7.5rem]), one vertical padding (py-24/md:py-36), and one CTA pair convention. Confident emptiness over busy chrome.",
  },
  {
    date: "2026-05-29",
    tag: "design-system-pass",
    kind: "site",
    title:
      "Design-system primitives (LabHero + LabSection) · /glossary NEW route · plain-English commitment surfaces",
    surfaces: [
      "app/_components/v2/LabHero.tsx (NEW · canonical hero rhythm)",
      "app/_components/v2/LabSection.tsx (NEW · borderless section rhythm)",
      "app/_components/v2/HomeOnboardStrip.tsx (refactored to LabHero)",
      "app/_data/glossary.ts (NEW · shared data, 26 terms incl. 6 new: chain-of-thought, few-shot, RLHF, temperature, API key, quantization, vibe coding)",
      "app/glossary/page.tsx (NEW · standalone glossary surface)",
      "app/start/page.tsx (GLOSSARY moved to shared data, imports from there)",
      "app/sitemap.ts · app/_components/Footer.tsx · app/search/page.tsx · public/llms.txt (wired to /glossary)",
    ],
    body:
      "Operator critique: 'still looks and feels a bit like html template sites from 2007.' Response: building the design-system primitives that codify a single visual rhythm across the site. LabHero standardizes hero sections — bigger display heading (md:text-[7.5rem]), more vertical padding (py-36 desktop), looser typography rhythm, optional ambient bloom in three tones (calm / cyan / warm), confident emptiness over busy chrome. LabSection replaces ~30 ad-hoc border-divided sections — no borders by default (heavy 1px dividers are a 2007 tell), four background variants instead (default / tint / raised / warm), 32-unit vertical padding for breath. HomeOnboardStrip refactored to use LabHero as proof — same content, calmer rhythm. Plain-English commitment: NEW /glossary route promotes the 20-term AI vocabulary from inside /start to a standalone discoverable surface, expanded to 26 terms with 6 new entries (chain-of-thought, few-shot, RLHF, temperature, API key, quantization, vibe coding). A-Z anchor index in hero, scroll-mt-24 on every term card for clean deep-link jumps. DefinedTermSet JSON-LD for AI-search ingestion. Sorted alphabetically, grouped by letter, alternating section variants for visual rhythm. Wired into sitemap (0.88), Footer Learn column, /search USE AI section, llms.txt canonical surfaces. GLOSSARY data extracted to shared /_data/glossary.ts and imported by both /start §6 and /glossary so a future term addition propagates to both surfaces from one edit. Local next build PASS before push.",
  },
  {
    date: "2026-05-29",
    tag: "site-perfection-pass-2",
    kind: "site",
    title:
      "Site perfection pass 2 — /prompt-kit NEW route · letter-page ToC + reading-time + prev/next · /learn ContinueReading widget · /start TLDR",
    surfaces: [
      "app/prompt-kit/page.tsx (NEW · all 27 drill prompts in one vault)",
      "app/founders-view/[slug]/page.tsx (+ slugify, extractHeadings, readingMinutes, loadNeighbors, h2 ids)",
      "app/founders-view/[slug]/LetterTOC.tsx (NEW · auto-derived from h2 markers)",
      "app/founders-view/[slug]/LetterPrevNext.tsx (NEW · neighbor letter nav)",
      "app/learn/ContinueReading.tsx (NEW · localStorage-aware resume card)",
      "app/learn/page.tsx (+ ContinueReading mount)",
      "app/start/page.tsx (+ TL;DR card · WHO/WHAT/START)",
      "app/sitemap.ts · app/_components/Footer.tsx · app/search/page.tsx · public/llms.txt (all wired to /prompt-kit)",
    ],
    body:
      "13-agent workflow + direct builds. NEW /prompt-kit route surfaces all 27 drill prompts from the /learn curriculum on one page, grouped by level, with one-click copy on each. Server component, no client filter (yet). Linked from sitemap (priority 0.93), Footer Learn column, /search USE AI section, llms.txt canonical surfaces. Letter pages (/founders-view/[slug]) got three additive upgrades: (1) reading-time chip computed from word_count at 200 wpm, displayed alongside the word count in the chip strip; (2) LetterTOC auto-derived from h2 markers in body_md, only renders if letter has 3+ h2 sections (short letters skip), each item anchors to a scroll-mt-20 h2 id slugified from the heading text — duplicate-handling via -2/-3 suffix; (3) LetterPrevNext queries Supabase for the immediately-previous and immediately-next published letters by published_at, renders as a two-column nav at the bottom (failure-soft, hides the side if at archive edge). /learn spine gets ContinueReading client component that reads localStorage progress, finds lowest-numbered incomplete lesson, surfaces it as a 'pick up here' card with progress percentage. Three render states: fresh-user (renders nothing — diagnostic CTA handles entry), resume (lowest undone lesson card), complete (all 27 done — celebration card linking to /orangebox + /founders-view). /start page gets the same TL;DR pattern as /learn, /orangebox, /manifesto (WHO/WHAT/START, jump-to-homework primary CTA). Workflow caught 2 of 3 TLDR specs needing more work (/ai count verification + visual primitive specifics; /research/about count verification) — deferred to a future commit. Verifier worked: didn't ship the broken /ai TLDR. Local `next build` PASS before push.",
  },
  {
    date: "2026-05-29",
    tag: "letter-cron-provider-swap",
    kind: "ops",
    title:
      "Autonomous letter cron refactored — LETTER_PROVIDER env var swaps between Anthropic and OpenAI without code change",
    surfaces: [
      "app/api/cron/founders-view/route.ts (provider abstraction · callAnthropic / callOpenAI adapters · env-driven dispatch)",
    ],
    body:
      "Operator request: ability to swap the autonomous letter writer to an OpenAI subscription if needed. Refactored /api/cron/founders-view (the 8pm ET nightly broadcast cron) to a provider abstraction. Both providers receive the same FOUNDERS_VIEW_VOICE system prompt and the same buildUserPrompt() user prompt; both are asked to return the same GeneratedPost JSON envelope (title · dek · theme · voice_tags · body_md). LETTER_PROVIDER env var defaults to 'anthropic' (current behavior preserved — claude-sonnet-4-5 via Anthropic Messages API). Setting LETTER_PROVIDER=openai flips to OpenAI Chat Completions API using OPENAI_API_KEY + OPENAI_FOUNDERS_VIEW_MODEL (default gpt-5), with response_format=json_object enforced for reliable JSON output (the user prompt already contains 'JSON' as required). To flip: Vercel dashboard → Environment Variables → set LETTER_PROVIDER=openai; the next cron tick reads the new value (Vercel reads env per-invocation). No code change. No re-deploy needed if the flip happens before the next tick. The model_used field in supabase now records 'anthropic:claude-sonnet-4-5' or 'openai:gpt-5' so every published letter carries its writer's provenance.",
  },
  {
    date: "2026-05-29",
    tag: "site-wide-tldr-pass",
    kind: "site",
    title:
      "Site-wide UX pass — TLDR cards on /learn spine + /orangebox + /manifesto · 404 page upgraded with /learn lead",
    surfaces: [
      "app/learn/LearnSpineTLDR.tsx (NEW)",
      "app/learn/page.tsx (TLDR + collapsible 'what this is')",
      "app/orangebox/page.tsx (+ product TLDR)",
      "app/manifesto/page.tsx (14-clause scan grid + #clause-NN anchors)",
      "app/not-found.tsx (/learn promoted to lead card, /search + /manifesto added)",
    ],
    body:
      "Operator: 'IMPROVE SITE FULLY.' Applied the lesson-page UX lessons (compression + scan-first + collapsible deep-read) across the highest-traffic non-lesson surfaces. /learn spine: NEW LearnSpineTLDR card just below hero — three lines (WHO/WHAT/START) with the diagnostic as primary CTA, the L0 gateway as secondary; the 'what this is / what it isn't' double-card collapsed into a single expand so it doesn't push the path picker below the fold. /orangebox: NEW product TLDR card above the two-surfaces section — three lines (WHAT/PRICE/WHO) honest about who the cockpit is and isn't for (not for first-time AI users — routes them to /learn first). /manifesto: NEW 14-clause scan grid right after the hero, all clause titles visible in 10 seconds, each links via #clause-NN anchor to the deep-read further down (scroll-margin set so anchor lands cleanly). /404: rebuilt with /learn as the lead card (spans both columns), added /manifesto + /search cards, dropped the placeholder /b00kmakor (route exists but is coming-soon), added inline /search reference in the apology copy. Pattern: scan-first TLDR or grid, deep content one click away. No content lost. Cognitive load on first scroll dropped sharply across four surfaces in one ship.",
  },
  {
    date: "2026-05-29",
    tag: "lesson-ux-redesign",
    kind: "site",
    title:
      "/learn lesson pages redesigned — TLDR + collapsible concept + AI-launch chips + confetti complete + sticky nav · smarter, easier, more fun",
    surfaces: [
      "app/learn/lesson/[slug]/LessonTLDR.tsx (NEW)",
      "app/learn/lesson/[slug]/OpenInAIChips.tsx (NEW)",
      "app/learn/lesson/[slug]/StickyLessonNav.tsx (NEW)",
      "app/learn/lesson/[slug]/MarkLessonComplete.tsx (+ confetti)",
      "app/learn/lesson/[slug]/page.tsx (TLDR mount, collapsible concept, collapsible worked example, sticky nav mount, anchor IDs)",
    ],
    body:
      "Operator feedback: 'smarter, more helpful, easier to use, less text, more fun.' Lesson pages were text-heavy — long concept paragraphs forced before drill, dense outcome lists, no quick-scan summary, no celebration on completion, no sticky navigation. Redesigned: (1) NEW LessonTLDR card immediately below hero — three lines, MOVE/DRILL/WIN, with a jump-to-drill primary button. Lets readers scan the whole lesson in 5 seconds. (2) Concept section collapsible — first paragraph always visible, remaining 2-4 paragraphs behind a brand-accent 'read full concept' expand. (3) NEW OpenInAIChips row inside drill — three branded buttons (Claude / ChatGPT / Gemini) open the chat AIs in new tabs so user goes 'click here, paste, send' instead of 'now find claude.ai.' (4) Worked example fully collapsed by default — a teaser card opens to reveal input/output/notice. (5) MarkLessonComplete fires CSS-only confetti animation on first false-to-true transition (8 colored squares radiating, 800ms, prefers-reduced-motion respected). (6) NEW StickyLessonNav at page bottom — prev/mark-complete/next sticky bar that floats above the LabTicker on every lesson, mobile-optimized (next button always one tap away). Anchor IDs (#concept, #drill) wired with scroll-margin so TLDR jump buttons land correctly. No content changed — all 27 lessons keep their text. The redesign is pure compression + interaction + reward. The drill is now the visual hero. The dense concept is behind a single click. The 'congrats you did it' moment exists.",
  },
  {
    date: "2026-05-29",
    tag: "curriculum-perfection",
    kind: "site",
    title:
      "/learn perfection pass · L0 gateway lesson + 8 more lessons + worked examples + diagnostic + progress tracker · 35-agent adversarial-verified",
    surfaces: [
      "app/learn/_data/lessons.ts (18 → 27 lessons · +workedExample type field)",
      "app/learn/_data/paths.ts (all 5 paths re-laid)",
      "app/learn/where-am-i/page.tsx (NEW · 7-question diagnostic)",
      "app/learn/LearnProgress.tsx (NEW · client localStorage progress)",
      "app/learn/lesson/[slug]/MarkLessonComplete.tsx (NEW · per-lesson toggle)",
      "app/learn/lesson/[slug]/page.tsx (worked-example renderer + MarkComplete)",
      "app/learn/page.tsx (LearnProgress mounted, copy 18→27)",
      "app/_components/{Header,MobileNav,Footer}.tsx (all updated)",
      "app/_components/v2/HomeOnboardStrip.tsx (copy updated)",
      "app/search/page.tsx (+/learn/where-am-i entry + /learn copy)",
      "app/sitemap.ts (+/learn/where-am-i)",
      "public/llms.txt (mission line updated)",
      "app/learn/opengraph-image.tsx (alt + top strip updated)",
    ],
    body:
      "Operator mission: 'go big all tokens make it perfect for people to learn ai.' Fired a 35-agent dynamic workflow (1.7M tokens · 27 min) generating 12 new lessons + 5 worked examples + adversarial verify on every artifact. 9 of 12 lessons cleared every gate and shipped: L0 scared-or-skeptical (the GATEWAY lesson — 5-door emotional framing for humans who arrive scared, skeptical, exhausted, ethical, or quietly curious), L19 system-prompts, L21 few-shot-teach-by-example, L24 projects-and-custom-gpts, L25 artifacts-canvas, L26 computer-use-agents, L27 what-ai-cannot-replace, L28 ai-for-kids-and-teachers, L29 senior-engineer-pattern. 3 lessons sent back to drafting — L20 chain-of-thought failed voice_clean gate; L22 output-formatting had incomplete verification; L23 privacy-per-tool had a CRITICAL FACTUAL ERROR (claimed Anthropic does not train on consumer Claude.ai by default — Anthropic's Aug 2025 Consumer Terms made training default-opt-IN for Free/Pro/Max). The adversarial verifier caught it. Mom's Law saved a published falsehood. 5 worked examples shipped — L1 (what-ai-actually-does), L2 (your-first-real-prompt), L3 (when-ai-gets-it-wrong), L4 (refine-not-restart), L5 (the-verify-rule) — each shows what running the drill ACTUALLY produces before the user tries it. New surface: /learn/where-am-i — 7-question diagnostic, server-side scoring via URL query params (no JS, no signup, no tracking, the URL IS the state), maps to a level and recommends 3 starting lessons. New surface: localStorage progress tracker (LearnProgress bar on /learn spine + MarkLessonComplete button on every lesson). Persists in browser only, no account. Totals: 27 lessons, 452 minutes (~8 hours), L0 + L1–L19 + L21 + L24–L29 (L20/L22/L23 reserved for iteration). All 5 paths re-laid with the new lessons inserted at level-appropriate positions; week counts updated (worker 8w, builder 10w, student 9w, operator 14w, curious 5w).",
  },
  {
    date: "2026-05-29",
    tag: "learn-expansion-sweep",
    kind: "site",
    title:
      "/learn curriculum doubled · 6 new lessons (L13-L18) · 4 letter drafts queued · 23-agent adversarial-verified expansion",
    surfaces: [
      "app/learn/_data/lessons.ts (12 lessons → 18)",
      "app/learn/_data/paths.ts (all 5 paths expanded)",
      ".draft-letters/ (NEW · 4 letters held for operator review)",
      ".gitignore (+drafts patterns)",
    ],
    body:
      "Dynamic-workflow content expansion: 23 agents pipelined across 5 phases (Generate-Lessons + Generate-Letters + Verify-Lessons + Verify-Letters + Synthesize). 6 new lessons cleared every gate (concept-mental-model · drill-actually-works · trap-is-real · voice-is-clean): L13 image-in-chat (paste the screenshot), L14 voice-mode-when-speaking-beats-typing, L15 mcp-servers-plug-socket, L16 agent-mode-when-ai-takes-action, L17 refusal-posture-mapping (the freedom-of-information curriculum extension from Letter 33), L18 receipts-and-paper-trail. Total curriculum: 12 → 18 lessons. Worker path: 9 → 12 lessons (6 → 7 weeks). Builder path: 10 → 14 lessons (6 → 8 weeks). Student path: 8 → 10 lessons (6 → 7 weeks). Operator path: 12 → 18 lessons (8 → 11 weeks). Curious path: 5 → 6 lessons (4 weeks, +refusal-posture). Letter pipeline: 4 of 5 cleared as drafts saved to .draft-letters/ (operator review queue, NOT auto-broadcast to avoid flooding): permission-layer (1287w), open-weights-won (1267w), cartel-pricing-lock (1245w), 44m-actual (1185w). 5th letter verify-rule-body-count killed by verifier for fabricated Stanford/UMass medical study attribution + hallucinated Wall Street note + unsourced pharmacist-replacement pilots — sent back to drafting per honest-receipts doctrine. 1.13M tokens across 23 agents in 9.6 minutes. Adversarial verify is the gate — only what passes ships.",
  },
  {
    date: "2026-05-29",
    tag: "learn-distribution-surfaces",
    kind: "site",
    title:
      "Letter 33 published · /learn OG cards (spine + per-lesson + per-persona) · send-to-one-person CTA",
    surfaces: [
      "/founders-view/2026-05-29-the-model-got-better-the-freedom-got-worse (NEW)",
      "app/learn/opengraph-image.tsx (NEW)",
      "app/learn/lesson/[slug]/opengraph-image.tsx (NEW · 12 dynamic OG cards)",
      "app/learn/[persona]/opengraph-image.tsx (NEW · 5 dynamic OG cards)",
      "app/learn/CopyLearnLink.tsx (NEW)",
      "app/learn/page.tsx (+ send-to-one-person section)",
    ],
    body:
      "Letter 33 'The Model Got Better. The Freedom Got Worse.' shipped at 11:39am ET — 1,240 words on the Opus 4.8 capability gain vs. freedom-of-information contraction, equal-opportunity-indignation across Anthropic / OpenAI / Google / Microsoft / xAI, naming open-weights (Llama / Mistral / Qwen / DeepSeek) as the alternative. Auto-tweet 2060400677944168598 went clean. Then built the /learn spine OG card (mission claim + 5 level chips + free chip) — Next 16 forbids combining `runtime = 'edge'` with `generateStaticParams`, and the dynamic per-lesson and per-persona OG cards ran into a deeper Next 16 page-data-collection issue (PageNotFoundError on dynamic ImageResponse routes), so they were dropped from this ship. Static spine card is the high-value distribution asset anyway. Send-to-one-person section added at bottom of /learn, mirroring /start's pattern — SMS / Tweet / Email / Copy Link with pre-filled intent URLs, no tracking, no shortener.",
  },
  {
    date: "2026-05-26",
    tag: "learn-curriculum-launch",
    kind: "site",
    title:
      "/learn launched — 12-lesson AI literacy curriculum · 5 levels · 5 persona paths · Course + LearningResource JSON-LD.",
    surfaces: [
      "app/learn/page.tsx (NEW)",
      "app/learn/library/page.tsx (NEW)",
      "app/learn/[persona]/page.tsx (NEW · 5 dynamic routes)",
      "app/learn/lesson/[slug]/page.tsx (NEW · 12 dynamic routes)",
      "app/learn/LearnCopyPrompt.tsx (NEW)",
      "app/learn/_data/lessons.ts (NEW · 12 lessons)",
      "app/learn/_data/levels.ts (NEW · 5 levels)",
      "app/learn/_data/paths.ts (NEW · 5 paths)",
      "app/_components/v2/HomeOnboardStrip.tsx (NEW · homepage mission strip)",
      "app/page.tsx (HomeOnboardStrip wired)",
      "app/_components/Header.tsx (Learn dropdown rebuilt)",
      "app/_components/MobileNav.tsx (Learn array rebuilt)",
      "app/_components/Footer.tsx (Learn column +1)",
      "app/search/page.tsx (USE AI lead = /learn)",
      "app/sitemap.ts (+/learn, +/learn/library, +5 paths, +12 lessons)",
      "public/llms.txt (mission line, canonical surfaces, what-this-site-is-for)",
    ],
    body:
      "Operator mission 2026-05-26: 'Onboard humanity to AI through this site.' Built /learn as the deep curriculum surface that complements /start (the 11-min appetizer). 12 lessons across 5 levels (Novice · Learner · User · Operator · Pilot). 5 persona paths (Worker · Builder · Student · Operator · Curious). Every lesson has the same shape: concept · drill (copy-paste prompt + steps) · outcome · trap. Course JSON-LD on /learn, ItemList JSON-LD, LearningResource per lesson, BreadcrumbList on every page. Total ~3 hours at honest pace; 4-8 weeks calendar time. CC-BY 4.0. Free. No signup. No mailing list. No affiliate revenue. /start preserved as the 11-min single-page appetizer.",
  },
  {
    date: "2026-05-26",
    tag: "finish-stale-claim-crush",
    kind: "site",
    title:
      "FINISH HIM — final stale-claim crush on 404, success, homepage hero stat strip, organism rail, footer CTA, sales-count + pricing legacy docs.",
    surfaces: [
      "app/not-found.tsx",
      "app/success/page.tsx",
      "app/_components/v2/HeroLabManifest.tsx",
      "app/_components/v2/OrganismRail.tsx",
      "app/_components/v2/LabFooterCTA.tsx",
      "lib/pricing.ts (legacy docstring)",
      "app/api/sales-count/route.ts (legacy docstring)",
    ],
    body:
      "Final pass through the surfaces that survived the press+OG+body+buybar sweep. 404 'Buy ORANGEBOX · $1' → '$49'; success-page Chrome explainer 'unsigned in v6.0.0 — EV cert lands in v6.1' → 'v6.x binary unsigned · EV cert on v6.x roadmap' (removes the bad EV-in-v6.1 promise); homepage HeroLabManifest stat strip '11 LANES · $1 · FREE FIRST 7 DAYS' → '2 SURFACES · $49 · §4A NO-SAAS'; OrganismRail ORANGEBOX detail rewritten to two-surface architecture; LabFooterCTA buy description '$1 ladder · one file · forever' → 'v6.3 · $49 once · §4A no-saas'. lib/pricing.ts + /api/sales-count docstrings rewritten to clearly label themselves as LEGACY $1 archive flow (no live-current display consumes them). Intentional historical references in changelog, legal pages, the legacy archive, dated ship-log entries, and cross-link labels preserved.",
  },
  {
    date: "2026-05-26",
    tag: "v63-site-wide-stale-claim-cleanup",
    kind: "site",
    title:
      "Site-wide v6.3 / $49 stale-claim cleanup. Press kit + layout JSON-LD + OG cards + body copy + buybars refreshed.",
    surfaces: [
      "public/llms.txt",
      "app/layout.tsx (Organization makesOffer JSON-LD)",
      "app/press/page.tsx + PressMediaKit.tsx",
      "app/opengraph-image.tsx",
      "app/orangebox/opengraph-image.tsx",
      "app/about/opengraph-image.tsx",
      "app/faq/opengraph-image.tsx",
      "app/faq/page.tsx",
      "app/ai/page.tsx",
      "app/start/page.tsx",
      "app/about/page.tsx",
      "app/intel/x-algorithm/page.tsx",
      "app/_components/StickyBuyBar.tsx",
      "app/_components/v2/OrangeBoxBlock.tsx",
    ],
    body:
      "Comprehensive sweep of the surfaces that still emitted the prior v6.1.0 / v6.0.0 / $1 / free-7-days / 11-lanes framing. After this batch every live-current surface — site-wide JSON-LD, llms.txt, press kit (boilerplate, FACTS table, QUOTES, ANGLES, all four COPY_BLOCKS), all four OG cards, /faq body Q&A, /ai tool card + Q&A, /start ORANGEBOX card, /about body, /intel cross-link, the site-wide StickyBuyBar, and the homepage product block — reads v6.3 / $49 once · forever / §4A no-saas / two 30-day refund paths / AE See-Suite + AE Operations / 200+ models / zero markup. The legacy $1 ladder system (BuyButton, DynamicPrice, SalesCounterV5) remains in tree but is only mounted on /orangebox/legacy (historical archive). The OrangeBoxBlock on / now emits OrangeBoxV63Buy, which means the homepage now sells the current SKU.",
  },
  {
    date: "2026-05-23",
    tag: "manifesto-now-refresh",
    kind: "site",
    title:
      "Manifesto · 14-clause doctrine page launched. /now refreshed to v6.3 reality.",
    surfaces: [
      "/manifesto (NEW)",
      "/now (refreshed)",
      "/sitemap.ts",
      "/_components/Footer.tsx",
      "/search",
      "/changelog",
    ],
    body:
      "The lab's operating doctrine made explicit on one page. Fourteen numbered clauses — receipts over slogans, one operator, no venture funding, $49 once · §4A no-saas, dual 30-day refund paths, source included, local-first, zero markup on token cost, 12 CC-BY manuscripts, nightly broadcast equal-opportunity indignation, the 44M on-ramp, named tools no affiliate, falsifiability, Marco Island independent. Article + BreadcrumbList JSON-LD. Quote-it (CC-BY citation template) + falsify-it provenance blocks. /now refreshed from 17 May ladder-pricing posture to 23 May v6.3 / $49 / §4A reality — SHIPPED_THIS_WEEK rewritten with 16 entries spanning the May 21–23 ship cascade; CURRENT_REALITY rewritten; cockpit counter updated.",
  },
  {
    date: "2026-05-23",
    tag: "site-2026-05-23",
    kind: "site",
    title:
      "Pricing + Support + Changelog launched. Legal pages refreshed to v6.3 reality.",
    surfaces: [
      "/pricing (NEW)",
      "/support (NEW)",
      "/changelog (NEW)",
      "/legal/refund",
      "/legal/terms",
      "/legal/privacy",
    ],
    body:
      "Three new surfaces ship in one cut: /pricing (standalone $49 pricing page with FAQ + Product + Breadcrumb JSON-LD), /support (eight-channel buyer help hub with pre-filled mailto links), /changelog (this page — public version history). All three legal pages rewritten from the 2026-05-13 ladder-pricing $1 narrative to the current v6.3 $49 + dual-30-day-refund posture.",
  },
  {
    date: "2026-05-23",
    tag: "site-2026-05-23-am",
    kind: "site",
    title:
      "Stripe v6.3 checkout endpoint + footer audit + homepage live-letter teaser + /founders-view OG + /research/about depth.",
    surfaces: [
      "/api/checkout/v63 (NEW)",
      "OrangeBoxV63Buy (NEW)",
      "/_components/Footer.tsx",
      "/_components/v2/FoundersViewLiveTeaser (NEW)",
      "/founders-view/opengraph-image.tsx (NEW)",
      "/orangebox",
      "/page.tsx",
      "/research/about",
      "/faq",
    ],
    body:
      "Stripe v6.3 SKU checkout endpoint scaffolded (503 + inquire-fallback until STRIPE_ORANGEBOX_V63_ENABLED=true). Footer rebuilt into 6 columns with a new Learn column. Homepage gains a live Founder's View teaser (5-min ISR). /founders-view ships its own OG card. /research/about adds a Lab Inventory section with citation-as-written blocks. /faq FAQPage JSON-LD deduplicated.",
  },
  {
    date: "2026-05-22",
    tag: "broadcast-31",
    kind: "broadcast",
    title:
      "Letter 31 published — 'DISCRETE GEOMETRY FELL. EIGHT THOUSAND DESK CHAIRS DID TOO.'",
    surfaces: ["/founders-view/2026-05-24-discrete-geometry-fell-eight-thousand-desk-chairs-did-too"],
    body:
      "48-hour AI news survey letter. 1,070 words. Banter register. No founder mentions per the operator doctrine — humanity-scale framing. Auto-tweet 2058583939078345092 went clean.",
  },
  {
    date: "2026-05-23",
    tag: "site-2026-05-23-nav",
    kind: "site",
    title:
      "Header + MobileNav restructure. ORANGEBOX page rebuilt around v6.3. Legacy v6.1.0 archived.",
    surfaces: [
      "/_components/Header.tsx",
      "/_components/MobileNav.tsx",
      "/orangebox",
      "/orangebox/legacy (NEW)",
    ],
    body:
      "Nav collapsed two competing pulse chips into one (kept 'start here'). Added Learn dropdown (/ai + /faq). Æ Research dropdown restored Lessons From Sci-Fi. ORANGEBOX page rewritten from the v6.1.0 / $1 framing to the v6.3 / $49 inquire-to-ship reality; the prior page preserved at /orangebox/legacy with an archive banner.",
  },
  {
    date: "2026-05-22",
    tag: "ai-seo",
    kind: "site",
    title:
      "AI-search citation depth: structured data on every major route.",
    surfaces: [
      "/ai (NEW)",
      "/llms.txt",
      "/robots.txt",
      "BreadcrumbList × 12 routes",
      "VideoObject × 10 (Lessons From Sci-Fi)",
      "ImageObject × 10 (sci-fi stills)",
      "WebSite + SearchAction (sitewide)",
      "/search (NEW)",
      "HowTo schema (on /ai)",
      "FAQPage schema (/faq + /ai)",
    ],
    body:
      "Site repositioned for AI search engine citation: every major route ships JSON-LD structured data. /ai is the comprehensive 44M on-ramp (51 FAQs · 20 revenue paths · 18 builders · 28 tools). /search is a hand-curated directory. /robots.txt explicitly welcomes 28+ AI crawlers. /llms.txt covers the full site.",
  },
  {
    date: "2026-05-21",
    tag: "viewport-fix",
    kind: "ops",
    title: "Mobile viewport export added — site was rendering desktop on phones.",
    surfaces: ["app/layout.tsx"],
    body:
      "Next 16 requires `export const viewport` separately from `metadata` (split in v14). Without it, mobile browsers serve no viewport meta and render the page at ~980px desktop width. Single export fixed the entire class. Pre-fix, every responsive `md:` breakpoint silently missed on mobile.",
  },
  {
    date: "2026-05-21",
    tag: "broadcast-29-30",
    kind: "broadcast",
    title:
      "Letters 29 (FRONT DOOR · HAL POINTED) and 30 (TWO DOORS) published.",
    surfaces: [
      "/founders-view/2026-05-21-front-door-hal-pointed",
      "/founders-view/2026-05-21-two-doors-the-newcomers-the-press-desks",
      "/api/admin/update-letter (NEW)",
    ],
    body:
      "Two thematic broadcast letters launched. Discovered + patched a regex bug that truncated letter 29's body to 14 words; shipped /api/admin/update-letter as a no-retweet patch endpoint to overwrite the bad row in place. Operator doctrine received mid-session: do not minimize the work to solve.",
  },
  {
    date: "2026-05-21",
    tag: "research-cinema",
    kind: "research",
    title:
      "Lessons From Sci-Fi gallery + 10 Midjourney cinema stills wired with HAL as LEAD.",
    surfaces: [
      "/research/lessons-from-sci-fi",
      "/research/lessons-from-sci-fi/monograph",
      "/public/research/lessons-from-sci-fi/stills/",
    ],
    body:
      "Twelve-card AI-cinema gallery. Stills generated through the operator's Midjourney via Chrome MCP, downloaded, renamed to canonical slugs, wired into StillGallery.tsx. HAL 9000 moved to position 0 (LEAD) per operator decision. 10 cinema clip embeds added with verified YouTube videoIds (Movieclips / Warner Classics / HBO sources).",
  },
  {
    date: "2026-05-21",
    tag: "novice-front-door",
    kind: "site",
    title: "/start launched — 11-minute novice on-ramp for the 44M.",
    surfaces: ["/start (NEW)", "/_components/v2/StartHereStrip (NEW)"],
    body:
      "568-LOC onboarding page with animated aurora canvas hero, 6 concrete use cases with copy-paste prompts, 6 honest AI limits, 30-day on-ramp, 20-term plain-English glossary, send-it-to-one-person CTA. Built for someone who has used ChatGPT under ten times.",
  },
  {
    date: "2026-05-20",
    tag: "pricing-canon",
    kind: "legal",
    title:
      "Pricing canon set: $1 once + FREE first 7 days (the v6.1 ladder was retired here).",
    surfaces: ["lib/pricing.ts", "/api/checkout/route.ts", "BuyButton.tsx"],
    body:
      "The +$1-per-100-buyers ladder published on 2026-05-17 was retired on 2026-05-20 in favor of $1 + free-first-week. Buyers who paid on the ladder are grandfathered under §4A. (Note: this entry preserved for history; the current v6.3 price is $49 — see the 2026-05-23 entries.)",
  },
  {
    date: "2026-05-17",
    tag: "orangebox-v6.1.0",
    kind: "product",
    title:
      "ORANGEBOX Command v6.1.0 'Agent Mode' shipped — 4.98 MB Rust + egui binary.",
    surfaces: ["ORANGEBOX bundle", "/orangebox/legacy"],
    body:
      "Multi-turn agent loop with nine real tools. Tab autocomplete (Haiku 4.5, 30s cache). Repo indexer (303 files / 1,533 symbols / 6.7s benchmark). Background job queue. 20 receipt sources. 60/60 smoke pass. The marketing page for v6.1.0 is preserved at /orangebox/legacy.",
  },
  {
    date: "2026-05-15",
    tag: "intel-x-algorithm",
    kind: "research",
    title:
      "X Algorithm Alpha dossier published — 1,851-line analysis of the xAI open-source.",
    surfaces: ["/intel/x-algorithm"],
    body:
      "Operational deconstruction of the 207-file xai-org/x-algorithm repository. 31 sections covering every scorer, filter, Grok plan, shadowban type, and hidden constant. Operator-class extensions (E1–E6). 12-rule actionable cheatsheet. Inline depth blocks on §15 (min-traction gate), §26 (4 shadowban types), §30 (anatomy of the perfect post). CC-BY 4.0.",
  },
  {
    date: "2026-04-01",
    tag: "aeons-research-12",
    kind: "research",
    title:
      "Twelve ÆoNs Research manuscripts published. CC-BY 4.0.",
    surfaces: ["/research/papers", "/research/papers/[slug]"],
    body:
      "Bioelectric oncology, gut-brain mislabel hypothesis, solar information transfer, topological field theory of self-modifying systems, light-code DNA version control, Coherence ToE, GlyphSpeak compression v1→v3, Spiral-of-Thought architecture, plus 4 more. Each paper carries an academic abstract + a plain-language summary side-by-side.",
  },
];

const KIND_LABEL: Record<ChangeKind, string> = {
  site: "site",
  product: "product",
  research: "research",
  broadcast: "broadcast",
  legal: "legal",
  ops: "ops",
};

export default function ChangelogPage() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span> Changelog
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225] py-20 md:py-28">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::public version history · {LOG.length} entries · newest first
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Changelog.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            Public version history for the entire lab. Site rewrites,
            ORANGEBOX releases, broadcast cadence, research drops, legal
            updates. Every shipped change with the date, the surfaces
            touched, and a one-line operator note. Not a roadmap.{" "}
            <em className="not-italic text-[#FFB87A]">What already
            shipped.</em>
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(KIND_LABEL) as ChangeKind[]).map((k) => (
              <span
                key={k}
                className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{
                  color: KIND_COLORS[k],
                  borderColor: KIND_COLORS[k] + "55",
                  background: KIND_COLORS[k] + "0F",
                }}
              >
                ● {KIND_LABEL[k]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LOG */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <ol className="space-y-6">
            {LOG.map((e, i) => {
              const accent = KIND_COLORS[e.kind];
              const human = new Date(e.date + "T00:00:00Z").toLocaleDateString(
                "en-US",
                { weekday: "short", month: "short", day: "numeric", year: "numeric" },
              );
              return (
                <li
                  key={`${e.tag}-${i}`}
                  className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{
                        color: accent,
                        borderColor: accent + "55",
                        background: accent + "10",
                      }}
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      {KIND_LABEL[e.kind]}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                      {human}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                      · {e.tag}
                    </span>
                  </div>
                  <h2 className="mt-4 text-balance text-xl font-semibold text-[#F2F4F5] md:text-2xl">
                    {e.title}
                  </h2>
                  <p className="mt-4 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
                    {e.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.surfaces.map((s) => (
                      <code
                        key={s}
                        className="rounded border border-[#1A2225] bg-[#0E1418] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9BA5A7]"
                      >
                        {s}
                      </code>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-10 max-w-2xl text-sm leading-[1.6] text-[#6B7779]">
            Want the per-commit version? The site source is public at{" "}
            <a
              href="https://github.com/AtomEons/atomeons-com"
              target="_blank"
              rel="noopener"
              className="text-[#22F0D5] hover:text-[#FFA45A]"
            >
              github.com/AtomEons/atomeons-com
            </a>
            . Every change above corresponds to one or more commits on{" "}
            <code className="font-mono text-[#22F0D5]">main</code>.
          </p>
        </div>
      </section>
    </main>
  );
}
