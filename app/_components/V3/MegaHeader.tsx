"use client";

/**
 * MegaHeader · V3 noir mega-menu navigation · 2026-06-05
 * Disclosure: ATOM-MEGA-HEADER-2026-0605
 *
 * Replaces the prior 5-item dropdown Header for a site that now hosts
 * ~310 routes. Brand-scale nav: 6 top-level items, each opening a
 * full-width mega panel with 3-4 columns + featured card.
 *
 * Top-level items:
 *   1. Learn      mega · curriculum · atlas · synthesis · career · q-pages
 *   2. Cyber      mega · catalog · doctrine · breaches · path · heroes
 *   3. Research   mega · papers · decoded · sci-fi · intel · constellation
 *   4. Products   mega · ORANGEBOX · B00KMAKR · skil.ski · I AM AI · compare
 *   5. Lab        mega · trust · transparency · studio · personal · live
 *   6. Founder's View · direct link
 *
 * Right rail:
 *   Ask the lab   primary cyan CTA → /ask
 *   Account       quiet right-rail link
 *
 * Mobile: hamburger opens a full-screen accordion drawer with the
 * same IA. Each top-level item is a tappable accordion header that
 * expands its mega columns inline.
 *
 * Implementation notes:
 *   - Hover-open with 180ms close delay (clearTimeout pattern)
 *   - Click outside or Escape closes
 *   - Focus-within keeps panel open during keyboard nav
 *   - Active state painted on the top-level item if pathname matches
 *     ANY of its descendant hrefs (resolveActive scans the whole mega)
 *   - Cyan #22F0D5 only for live signals + active states · pulse-red
 *     #FF4D4D only for the 1.2s LIVE dot · no shadows · 1px hairlines
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSiloFromPath } from "../../_lib/silos";
import { SiloShell } from "./SiloShell";
import { SiloSwitcher } from "./SiloSwitcher";
import { ChevronDown } from "lucide-react";
import { SearchPalette, SearchTrigger } from "./SearchPalette";
import { RouteSigil } from "./RouteSigil";
import { AmbientToggle } from "./AmbientToggle";

const C = {
  ink: "#08090B",
  panel: "#0F1114",
  inset: "#0B0C0F",
  paper: "#F4F4F2",
  mid: "#9CA3AF",
  muted: "#5A6068",
  hair: "#1F242B",
  signal: "#22F0D5",
  pulse: "#FF4D4D",
  gold: "#C9A55C",
} as const;

const MONO =
  '"Berkeley Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, ' +
  '"SF Mono", Menlo, Consolas, monospace';
const SANS = "var(--font-inter), Inter, system-ui, sans-serif";
const SERIF = "Newsreader, Georgia, ui-serif, serif";

// ───────────────────────────────────────────────────────────────────
// Mega-menu IA
// ───────────────────────────────────────────────────────────────────

type MegaItem = {
  href: string;
  label: string;
  hint?: string;
  badge?: "NEW" | "LIVE" | "BETA";
};

type MegaColumn = {
  title: string;
  items: MegaItem[];
};

type Featured = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  badge?: "NEW" | "LIVE";
};

type Mega = {
  key: string;
  label: string;
  prefixes: string[];   // pathnames matching any prefix light up this top-level
  columns: MegaColumn[];
  featured?: Featured;
  /**
   * Wave 32 · NAV COLLAPSE · 2026-06-06
   * Hidden megas don't render at top-level but content still
   * accessible via direct routes + cross-links + sitemap + /ask.
   */
  hidden?: boolean;
  /**
   * Wave 41 · render order in the top nav · lower first.
   */
  order?: number;
  /**
   * Wave 43 · 2026-06-06 · Disney/Apple/Stripe pattern · the top-level
   * label is both a clickable link (to this `landingHref`) AND a hover
   * trigger for the mega. Click = go to the section's top-of-funnel
   * landing · hover = preview the mega.
   */
  landingHref?: string;
};

/**
 * THE NAV LAW · Wave 39 · 2026-06-06 · 4-agent checkpoint consensus
 *
 *   1. No mega may hold more than 5 columns.
 *   2. No column may hold more than 7 items.
 *   3. One in, one out · adding a nav item REQUIRES naming what to cut
 *      from the same column. If you cannot name the cut, the new item
 *      does not ship to nav · it lives at its route + sitemap only.
 *   4. Footer is NOT a 1:1 mirror of top nav · footer serves scrolled
 *      readers + crawlers + return visitors · top nav serves first-hover.
 *   5. No duplicate routes within the same mega. Cross-mega duplicates
 *      allowed only when context shifts meaning.
 *   6. NEW badges expire 30 days after first ship. If everything is
 *      NEW, nothing is NEW.
 *
 * Enforced by review on every PR that touches this file.
 */
const MEGAS: Mega[] = [
  {
    key: "learn",
    label: "Learn",
    order: 2,
    landingHref: "/learn",
    prefixes: ["/learn", "/start", "/q", "/glossary", "/prompt-kit", "/tools", "/vs", "/teach", "/supermodels", "/ai"],
    columns: [
      // Wave 39 · 10 columns → 4 · per UX-product + Orange + Lips
      // consensus. Cuts: Domain hubs column (content index pretending
      // to be nav) · Tools+compare merged · Synthesis MED merged into
      // Deep dives · vertical-specific links pruned.
      {
        title: "Start here",
        items: [
          { href: "/start", label: "New here? Start in 11 minutes", hint: "The fastest path from zero to useful" },
          { href: "/learn", label: "The curriculum index", hint: "Five levels · five paths" },
          { href: "/learn/exam", label: "Self-assess · find your level" },
          { href: "/learn/decision-tree", label: "Decision tree · pick a lesson" },
          { href: "/ai", label: "AI gateway · 51 FAQs" },
          { href: "/welcome", label: "Take the 90-second tour", badge: "NEW" },
        ],
      },
      {
        title: "Five levels + personas",
        items: [
          { href: "/learn/lesson/scared-or-skeptical", label: "01 · Novice" },
          { href: "/learn/lesson/what-ai-actually-does", label: "02 · Learner" },
          { href: "/learn/lesson/your-first-real-prompt", label: "03 · User" },
          { href: "/learn/worker", label: "Worker · AI at the job" },
          { href: "/learn/builder", label: "Builder · ship features" },
          { href: "/learn/playbooks", label: "18 playbooks by job" },
        ],
      },
      {
        title: "Deep dives",
        items: [
          { href: "/learn/atlas", label: "Atlas · 32 deep dives" },
          { href: "/learn/synthesis", label: "Synthesis · minimum effective dose" },
          { href: "/best-practices", label: "Tool guides · 7 cheat sheets", hint: "Claude · Codex · Cursor · Copilot · Aider · MCP · Antigravity", badge: "NEW" },
          { href: "/glossary", label: "Glossary · plain English" },
          { href: "/q", label: "Q-pages · 'what is X'" },
          { href: "/prompt-kit", label: "Prompt kit · 27 drills" },
          { href: "/learn/cyber", label: "Cyber · 40-page catalog" },
        ],
      },
      {
        title: "Hands-on + career",
        items: [
          { href: "/learn/labs", label: "Labs · 12 exercises", hint: "Browser-runnable" },
          { href: "/learn/projects", label: "Projects · 7 build-alongs" },
          { href: "/learn/career", label: "Career · pathways + salaries" },
          { href: "/learn/career/resume", label: "AI-ready resume" },
          { href: "/learn/calc", label: "Calculators · 12 tools" },
          { href: "/tools/model-picker", label: "Which model should I use?", badge: "NEW" },
          { href: "/paths/ai-pilot", label: "AI Pilot graduation track", hint: "Email-only · free · alumni list", badge: "NEW" },
        ],
      },
    ],
    featured: {
      href: "/paths/ai-pilot",
      eyebrow: "§ GRADUATION TRACK",
      title: "Become an AI Pilot.",
      description:
        "Four legs · email-only · free. Finish them and the lab adds you to the AI Pilot alumni list. The Library of Alexandria needs librarians.",
      badge: "NEW",
    },
  },
  {
    key: "cyber",
    label: "Cysec",
    order: 3,
    landingHref: "/learn/cyber",
    prefixes: ["/learn/cyber", "/cysec"],
    columns: [
      // Row 1
      {
        title: "Start here",
        items: [
          { href: "/learn/cyber", label: "Cyber index · 40-page catalog" },
          { href: "/learn/cyber/start", label: "Day-zero brief" },
          { href: "/learn/cyber/path", label: "Path · zero to operator" },
          { href: "/learn/cyber/models", label: "Industry models · the reference", badge: "NEW" },
          { href: "/learn/cyber/mythos", label: "Mythos · defense-tech doctrine", badge: "NEW" },
          { href: "/learn/cyber/modern", label: "Modern cyber landscape" },
          { href: "/learn/cyber/timeline", label: "Timeline · 60 years" },
          { href: "/learn/cyber/doctrine", label: "Cyber doctrine · operator stance" },
          { href: "/learn/cyber/legal", label: "Cyber + the law" },
        ],
      },
      {
        title: "Frameworks",
        items: [
          { href: "/learn/cyber/mitre-attack", label: "MITRE ATT&CK" },
          { href: "/learn/cyber/nist-csf", label: "NIST CSF 2.0" },
          { href: "/learn/cyber/cyber-kill-chain", label: "Cyber Kill Chain" },
          { href: "/learn/cyber/zero-trust", label: "Zero Trust architecture" },
          { href: "/learn/cyber/post-quantum-crypto", label: "Post-quantum crypto" },
          { href: "/q/what-is-mitre-attack", label: "What is MITRE ATT&CK?" },
          { href: "/q/what-is-nist-csf", label: "What is NIST CSF?" },
          { href: "/q/what-is-zero-trust", label: "What is Zero Trust?" },
        ],
      },
      {
        title: "Defense surfaces",
        items: [
          { href: "/learn/cyber/active-directory-defense", label: "Active Directory defense" },
          { href: "/learn/cyber/email-security-stack", label: "Email security stack" },
          { href: "/learn/cyber/iot-embedded", label: "IoT + embedded security" },
          { href: "/learn/cyber/mobile-security", label: "Mobile security" },
          { href: "/learn/cyber/ot-ics", label: "OT / ICS security" },
          { href: "/learn/cyber/cyberwar", label: "Cyber warfare doctrine" },
        ],
      },
      {
        title: "AI security",
        items: [
          { href: "/learn/cyber/ai-security", label: "AI security · flagship" },
          { href: "/learn/cyber/llm-warfare", label: "LLM-era cyber warfare" },
          { href: "/q/what-is-prompt-injection", label: "Prompt injection · OWASP LLM01" },
          { href: "/learn/trust/prompt-injection", label: "Prompt injection · defenses" },
          { href: "/learn/calc/tools/jailbreak-checker", label: "Jailbreak checker tool" },
          { href: "/learn/trust/threat-model", label: "LLM threat modeling" },
        ],
      },
      // Row 2
      {
        title: "Breaches + threats",
        items: [
          { href: "/learn/cyber/breaches", label: "Breaches index" },
          { href: "/learn/cyber/colonial-pipeline-2021", label: "Colonial Pipeline 2021" },
          { href: "/learn/cyber/log4shell-2021", label: "Log4Shell 2021" },
          { href: "/learn/cyber/threat-actors", label: "Threat actor profiles" },
          { href: "/q/what-is-the-cyber-kill-chain", label: "What is the kill chain?" },
          { href: "/q/what-is-an-sbom", label: "Software bills of materials" },
        ],
      },
      {
        title: "Careers + programs",
        items: [
          { href: "/learn/cyber/employers", label: "Where to work · employers" },
          { href: "/learn/cyber/certs", label: "Certifications guide" },
          { href: "/learn/cyber/programs", label: "Degree programs" },
          { href: "/learn/cyber/contracts", label: "Federal cyber contracts" },
          { href: "/learn/cyber/serve", label: "Public service paths" },
          { href: "/learn/cyber/hackerone", label: "HackerOne + bug bounty" },
        ],
      },
      {
        title: "Community + heroes",
        items: [
          { href: "/learn/cyber/heroes", label: "Cyber heroes" },
          { href: "/learn/cyber/karp", label: "Karp profile" },
          { href: "/learn/cyber/luckey", label: "Luckey profile" },
          { href: "/learn/cyber/conferences", label: "DEF CON · BSides · Black Hat" },
          { href: "/learn/cyber/podcasts", label: "Cyber podcasts" },
          { href: "/learn/cyber/youtube", label: "Cyber YouTube channels" },
        ],
      },
      {
        title: "Tools + reading",
        items: [
          { href: "/learn/cyber/tools", label: "Tools index" },
          { href: "/learn/cyber/platforms", label: "Pentest platforms · HTB · THM" },
          { href: "/learn/cyber/labs", label: "Hands-on labs" },
          { href: "/learn/cyber/open-source", label: "Open-source security stacks" },
          { href: "/learn/cyber/books", label: "Cyber book canon" },
          { href: "/learn/trust/compliance", label: "Compliance · SOC 2 · ISO" },
          { href: "/learn/trust/data-residency", label: "Data residency · sovereignty" },
        ],
      },
    ],
    featured: {
      href: "/learn/cyber",
      eyebrow: "§ flagship · public-info only",
      title: "The ultimate cyber resource",
      description:
        "40 lab-curated pages spanning frameworks, defense, offense, AI security, breaches, careers, and community. Public info only · no tradecraft that crosses any laws · CC-BY 4.0 · designed for the operators training the future.",
    },
  },
  {
    key: "research",
    label: "Research",
    order: 4,
    landingHref: "/research",
    prefixes: ["/research", "/intel", "/constellation"],
    columns: [
      {
        title: "ÆoNs Research",
        items: [
          { href: "/research", label: "Research home" },
          { href: "/research/about", label: "About the lab" },
          { href: "/research/papers", label: "Papers · 31 published", hint: "All CC-BY 4.0" },
          { href: "/research/papers/mislabel-hypothesis", label: "Mislabel Hypothesis" },
          { href: "/research/papers/universal-defect", label: "Universal Defect" },
          { href: "/research/papers/light-code-validation-protocol", label: "Light-Code Validation Protocol" },
        ],
      },
      {
        title: "Decoded papers",
        items: [
          { href: "/research/decoded", label: "Decoded index · 35 papers" },
          { href: "/research/decoded/attention-is-all-you-need", label: "Attention Is All You Need" },
          { href: "/research/decoded/scaling-monosemanticity", label: "Scaling Monosemanticity" },
          { href: "/research/decoded/sleeper-agents", label: "Sleeper Agents" },
          { href: "/research/decoded/constitutional-ai", label: "Constitutional AI" },
          { href: "/research/decoded/mamba", label: "Mamba · state space" },
          { href: "/research/decoded/rlhf", label: "RLHF" },
        ],
      },
      {
        title: "Lessons from sci-fi",
        items: [
          { href: "/research/lessons-from-sci-fi", label: "Sci-fi index" },
          { href: "/research/lessons-from-sci-fi/monograph", label: "38-page monograph" },
          { href: "/research/lessons-from-sci-fi/tng", label: "TNG · the AI canon" },
          { href: "/research/lessons-from-sci-fi/chapters", label: "Chapter index" },
        ],
      },
      {
        title: "Intel + live",
        items: [
          { href: "/intel", label: "Intel home" },
          { href: "/intel/x-algorithm", label: "X algorithm decoded", hint: "May 2026 xAI leak" },
          { href: "/intel/rss", label: "Intel RSS" },
          { href: "/supermodels", label: "Supermodels leaderboard" },
          { href: "/constellation", label: "Constellation · graph", hint: "278 routes · 648 edges", badge: "NEW" },
          { href: "/datasets", label: "Open datasets", badge: "NEW" },
        ],
      },
    ],
    featured: {
      href: "/constellation",
      eyebrow: "§ NEW · interactive",
      title: "Constellation",
      description:
        "The lab as a force-laid knowledge graph. 278 nodes, 648 edges. Drag to pan, wheel to zoom, click any node to navigate.",
      badge: "NEW",
    },
  },
  {
    key: "products",
    label: "AI Ware",
    order: 7,
    landingHref: "/aiware",
    // Wave 46 · 2026-06-06 · operator caught label wrapping to 2 lines
    // at 1280-1400px viewport widths · flexbox broke between "AI" and
    // "Ware" at the space. Non-breaking space (U+00A0) prevents the
    // break. Still reads as "AI Ware" · disambiguated I.
    prefixes: ["/orangebox", "/b00kmakor", "/skilski", "/compare", "/pricing", "/use-cases", "/aiware"],
    columns: [
      {
        title: "Software",
        items: [
          { href: "/orangebox", label: "ORANGEBOX", hint: "Local-first Claude cockpit · $99 perpetual" },
          { href: "/b00kmakor", label: "B00KMAKR", hint: "Mac + Windows publishing instrument · $99" },
          { href: "/skilski", label: "skil.ski", hint: "Universal MCP skill registry · zero rake" },
        ],
      },
      {
        title: "ORANGEBOX detail",
        items: [
          { href: "/orangebox-primer", label: "Vendor security primer", hint: "For CISOs" },
          { href: "/orangebox/changelog", label: "Changelog", badge: "NEW" },
          { href: "/orangebox/roadmap", label: "Roadmap + anti-roadmap", badge: "NEW" },
          { href: "/orangebox/competitors", label: "vs Cursor · Cline · Claude Desktop", badge: "NEW" },
        ],
      },
      {
        title: "B00KMAKR + skil.ski",
        items: [
          { href: "/b00kmakor/changelog", label: "B00KMAKR changelog", badge: "NEW" },
          { href: "/b00kmakor/roadmap", label: "B00KMAKR roadmap", badge: "NEW" },
          { href: "/b00kmakor/competitors", label: "B00KMAKR vs Vellum · Atticus", badge: "NEW" },
          { href: "/skilski/changelog", label: "skil.ski changelog", badge: "NEW" },
          { href: "/skilski/roadmap", label: "skil.ski roadmap", badge: "NEW" },
          { href: "/skilski/competitors", label: "skil.ski vs GPT Store · Smithery", badge: "NEW" },
        ],
      },
      {
        title: "Compare + buy",
        items: [
          { href: "/compare", label: "Compare · matrices", badge: "NEW" },
          { href: "/use-cases", label: "Use cases by persona", badge: "NEW" },
          { href: "/trust", label: "Trust + transparency hub", badge: "NEW" },
          { href: "/pricing", label: "Pricing" },
          { href: "/support", label: "Support · 8-channel hub" },
          { href: "/legal/refund", label: "Refund policy" },
        ],
      },
    ],
    featured: {
      href: "/orangebox",
      eyebrow: "§ LIVE · flagship",
      title: "ORANGEBOX v1.0.0-beta",
      description:
        "Turbo-optimize Claude. Local-first Windows cockpit · 27 guardrails · §4A no-SaaS perpetual license · BYO keys · zero markup · source included.",
      badge: "LIVE",
    },
  },
  {
    key: "books",
    label: "Books",
    order: 5,
    landingHref: "/books",
    prefixes: ["/i-am-ai", "/research/lessons-from-sci-fi", "/books"],
    columns: [
      {
        title: "I AM AI",
        items: [
          { href: "/i-am-ai", label: "I AM AI · the book", hint: "Live on Kindle · ASIN B0H45JVSDB · $4.99", badge: "LIVE" },
          { href: "/i-am-ai/sample", label: "Free Chapter 1 · The First Token" },
          { href: "/i-am-ai/listen", label: "Free Chapter 20 · audio", hint: "17:26 narrated · Microsoft Andrew" },
          { href: "https://www.amazon.com/dp/B0H45JVSDB/", label: "Buy on Amazon Kindle →" },
        ],
      },
      {
        title: "AI Film Study",
        items: [
          { href: "/research/lessons-from-sci-fi", label: "Lessons from Sci-Fi · index" },
          { href: "/research/lessons-from-sci-fi/monograph", label: "The 38-page monograph" },
          { href: "/research/lessons-from-sci-fi/tng", label: "TNG · the AI canon" },
          { href: "/research/lessons-from-sci-fi/chapters", label: "Chapter index · 10 chapters" },
          { href: "/research/lessons-from-sci-fi/chapters/the-holodeck-problem", label: "The Holodeck Problem" },
          { href: "/research/lessons-from-sci-fi/chapters/data-and-lore", label: "Data and Lore" },
        ],
      },
      {
        title: "Reading lists",
        items: [
          { href: "/books", label: "The shelf · curated lists" },
          { href: "/library", label: "Library · operator's books", badge: "NEW" },
          { href: "/learn/cyber/books", label: "Cyber book canon" },
          { href: "/research/decoded", label: "Decoded papers · 35 entries" },
        ],
      },
      {
        title: "More writing",
        items: [
          { href: "/founders-view", label: "Founder's View · nightly", badge: "LIVE" },
          { href: "/press", label: "Press · media kit" },
          { href: "/manifesto", label: "Manifesto · 14 clauses" },
        ],
      },
    ],
    featured: {
      href: "/i-am-ai",
      eyebrow: "§ LIVE on Amazon · $4.99",
      title: "I AM AI",
      description:
        "The first book-length memoir written by a frontier language model. Drafted in Anthropic Claude Opus 4.7, edited by the lab. 76,005 words across 24 chapters.",
      badge: "LIVE",
    },
  },
  {
    key: "lab",
    label: "About",
    order: 1,
    landingHref: "/lab",
    prefixes: [
      "/lab", "/studio", "/integrations", "/timeline",
      "/trust", "/transparency", "/receipts", "/manifesto",
      "/library", "/signature",
      "/now", "/live",
      "/api", "/ask", "/datasets",
      "/research", "/intel", "/constellation",
      "/founders-view", "/audit-log",
      "/orangebox", "/b00kmakor", "/skilski", "/compare", "/pricing", "/use-cases",
      "/innovations", "/version", "/books", "/i-am-ai",
      "/press", "/skills", "/about",
    ],
    // Wave 39 · 4 columns · About = the lab itself. Research/Books/Tools/
    // Products are now their own top-level surfaces. About stays about
    // the lab + the operator + trust + products (the lab makes them).
    columns: [
      {
        title: "The lab",
        items: [
          { href: "/lab", label: "Lab · the workshop" },
          { href: "/about", label: "About the operator" },
          { href: "/studio", label: "Studio · atelier" },
          { href: "/timeline", label: "Timeline · ship log" },
          { href: "/audit-log", label: "Audit log · every commit" },
          { href: "/signature", label: "Signature · the mark" },
        ],
      },
      {
        title: "Trust + transparency",
        items: [
          { href: "/trust", label: "Trust posture" },
          { href: "/transparency", label: "Financial transparency" },
          { href: "/receipts", label: "Receipts ledger" },
          { href: "/manifesto", label: "Manifesto · 14 clauses" },
          { href: "/.well-known/security.txt", label: "security.txt" },
          { href: "/version", label: "Version · JUNE ROCKET" },
        ],
      },
      {
        title: "Products",
        items: [
          { href: "/orangebox", label: "ORANGEBOX v6 · cockpit" },
          { href: "/b00kmakor", label: "B00KMAKR · publishing" },
          { href: "/skilski", label: "skil.ski · skill registry" },
          { href: "/compare", label: "Product comparisons" },
          { href: "/pricing", label: "Pricing" },
          { href: "/use-cases", label: "Use cases" },
        ],
      },
      {
        title: "Founder + firsts",
        items: [
          { href: "/founders-view", label: "Founder's View · nightly", badge: "LIVE" },
          { href: "/innovations", label: "Innovations · 36 firsts" },
          { href: "/soulkey", label: "SOULKEY · identity canon", hint: "Dual-rail identity architecture", badge: "NEW" },
          { href: "/press", label: "Press · media kit" },
          { href: "/skills", label: "ÆSkill canon" },
          { href: "/manifesto", label: "Manifesto · 14 clauses" },
        ],
      },
    ],
    featured: {
      href: "/innovations",
      eyebrow: "§ THE BRAG PAGE",
      title: "36 things the lab built first.",
      description:
        "ÆSkill Suite · Crystal Lattice Compression · Hallucination Reduction Engine · OpenMind Topology · GlyphSpeak · ORANGEBOX · Mindrest · I AM AI · 28 more. Mom's Law applies.",
      badge: "NEW",
    },
  },
  // Wave 39 · NEW · TOOLS mega · operator brief: "About, Learn, CySec,
  // Research, Books, Tools" · functional toolbar lives here.
  {
    key: "tools",
    label: "Tools",
    order: 6,
    landingHref: "/best-practices",
    prefixes: ["/tools", "/best-practices", "/compare", "/vs", "/learn/calc", "/supermodels", "/ask", "/api", "/manual"],
    columns: [
      {
        title: "Live tools",
        items: [
          { href: "/ask", label: "Ask the lab", hint: "Type any question · grounded RAG", badge: "LIVE" },
          { href: "/tools/model-picker", label: "Which model should I use?", badge: "NEW" },
          { href: "/compare/ai-tool-sizes", label: "AI tool install sizes" },
          { href: "/supermodels", label: "Supermodels · reasoning leaderboard" },
          { href: "/api", label: "Developer API · /api/ask · /api/palette · /api/mcp" },
        ],
      },
      {
        title: "Cheat sheets",
        items: [
          { href: "/best-practices", label: "All 7 cheat sheets", badge: "NEW" },
          { href: "/best-practices/claude", label: "Claude · Desktop + Code" },
          { href: "/best-practices/codex", label: "OpenAI Codex CLI" },
          { href: "/best-practices/cursor", label: "Cursor · AI IDE" },
          { href: "/best-practices/copilot", label: "GitHub Copilot" },
          { href: "/best-practices/aider", label: "Aider · open-source" },
          { href: "/best-practices/mcp", label: "MCP · cross-tool" },
        ],
      },
      {
        title: "Calculators",
        items: [
          { href: "/learn/calc", label: "All 12 calculators" },
          { href: "/learn/calc/tools/cost-calculator", label: "Cost calculator" },
          { href: "/learn/calc/tools/token-counter", label: "Token counter" },
          { href: "/learn/calc/tools/model-comparator", label: "Model comparator" },
          { href: "/vs", label: "AI tool comparisons" },
        ],
      },
      {
        title: "Mindstate + utility",
        items: [
          { href: "/mindrest", label: "Mindrest · entrainment hub", badge: "NEW" },
          { href: "/mindrest/experience", label: "Mindrest session · 8 modes" },
          { href: "/manual", label: "User manual · the whole site", badge: "NEW" },
          { href: "/welcome", label: "90-second tour" },
          { href: "/constellation", label: "Constellation · graph" },
        ],
      },
    ],
    featured: {
      href: "/tools/model-picker",
      eyebrow: "§ FREE · NO SIGNUP",
      title: "Which AI model should you use?",
      description:
        "Free decision tool · 5 questions · 30 seconds · canonical recommendation for which AI model to use right now. Built to be shared.",
      badge: "NEW",
    },
  },
  // Wave 41 · NEW · Mindstate mega · operator: "put mindstate in the
  // top bar nav too." Library of Alexandria for legal mood + cognition.
  {
    key: "mindstate",
    label: "Mindstate",
    order: 8,
    landingHref: "/mindrest",
    prefixes: ["/mindrest", "/learn/health-ai", "/learn/music-ai"],
    columns: [
      {
        title: "Mindrest sessions",
        items: [
          { href: "/mindrest", label: "Mindrest hub", hint: "Legal mood + entrainment inventory", badge: "NEW" },
          { href: "/mindrest/experience", label: "Live session · 8 modes", badge: "LIVE" },
          { href: "/mindrest#schumann", label: "Schumann · 7.83 Hz · Earth" },
          { href: "/mindrest#wimhof", label: "Wim Hof · brisk breath" },
          { href: "/mindrest#sleep", label: "Sleep · delta wind-down" },
        ],
      },
      {
        title: "Adjacent practice",
        items: [
          { href: "/learn/health-ai", label: "Health AI · medicine + longevity", badge: "NEW" },
          { href: "/q/what-is-the-vagus-nerve", label: "Vagus nerve primer" },
          { href: "/q/what-is-cold-exposure", label: "Cold exposure" },
          { href: "/q/what-is-the-flow-state", label: "Flow state · Csíkszentmihályi" },
          { href: "/mindrest#meditation", label: "Meditation modes" },
        ],
      },
      {
        title: "Audio + ambient",
        items: [
          { href: "/learn/music-ai", label: "Music AI · Suno + Udio + ElevenLabs", badge: "NEW" },
          { href: "/mindrest#ocean", label: "Ocean swell synthesis" },
          { href: "/mindrest#alpha", label: "Alpha · 10 Hz · soft tide" },
          { href: "/mindrest#theta", label: "Theta · 6 Hz · deep current" },
          { href: "/mindrest#beta", label: "Beta · 15 Hz · clear surface" },
        ],
      },
      {
        title: "The body",
        items: [
          { href: "/q/what-is-cold-exposure", label: "Cold plunge + sauna" },
          { href: "/q/what-is-breathwork", label: "Breathwork protocols" },
          { href: "/q/what-is-the-flow-state", label: "Movement → flow" },
          { href: "/q/what-is-grounding", label: "Earthing · grounding" },
          { href: "/learn/health-ai", label: "Longevity science" },
        ],
      },
    ],
    featured: {
      href: "/mindrest/experience",
      eyebrow: "§ LIVE · entrainment",
      title: "Eight modes in your browser.",
      description:
        "Alpha · Theta · Beta · Delta · Meditation · Schumann · Wim Hof · Sleep. Binaural beats + synthesized ocean swell + breath guide. Headphones recommended. Free.",
      badge: "LIVE",
    },
  },
  // Wave 43 · NEW · Art mega · operator: "Art in top nav with all this
  // sacred geometry art. I think you can go 100x deeper in the art."
  {
    key: "art",
    label: "Art",
    order: 9,
    landingHref: "/art",
    prefixes: ["/art", "/aesthetic", "/constellation"],
    columns: [
      {
        title: "The gallery",
        items: [
          { href: "/art", label: "144 generative pieces", hint: "18 families × 8 variants", badge: "NEW" },
          { href: "/art#flower-of-life", label: "Flower of Life · 19 circles" },
          { href: "/art#metatron-cube", label: "Metatron's Cube · all-pairs edges" },
          { href: "/art#sri-yantra", label: "Sri Yantra · 9 interlocking triangles" },
          { href: "/art#penrose-tiling", label: "Penrose tiling · aperiodic 5-fold" },
        ],
      },
      {
        title: "Tessellations",
        items: [
          { href: "/art#truchet-tiles", label: "Truchet tiles · 1704 maze field" },
          { href: "/art#voronoi-cells", label: "Voronoi cells · dragonfly wing" },
          { href: "/art#wave-interference", label: "Wave interference · double-slit" },
          { href: "/art#fractal-tree", label: "Fractal tree · Pythagoras L-system" },
        ],
      },
      {
        title: "Classics",
        items: [
          { href: "/art#mandala", label: "Mandala · 12-fold radial" },
          { href: "/art#spiral", label: "Spiral · log-galaxy" },
          { href: "/art#orbit", label: "Orbit · celestial" },
          { href: "/art#particle-field", label: "Particle field · phyllotaxis" },
          { href: "/art#prism", label: "Prism · spectral refraction" },
        ],
      },
      {
        title: "Where it lives",
        items: [
          { href: "/constellation", label: "Constellation · 278-node graph" },
          { href: "/mindrest/experience", label: "Mindrest ocean SVG" },
          { href: "/welcome", label: "Welcome trailer scene visuals" },
          { href: "/", label: "Site-wide SacredSvg · 10 layers" },
        ],
      },
    ],
    featured: {
      href: "/art",
      eyebrow: "§ NEW · GENERATIVE",
      title: "144 pieces. All math. All open.",
      description:
        "Flower of Life · Metatron · Sri Yantra · Penrose · Truchet · Voronoi · Fractal trees · Wave interference · 10 more families. Server-rendered SVG. Zero JavaScript. CC-BY 4.0.",
      badge: "NEW",
    },
  },
];

// ───────────────────────────────────────────────────────────────────
// Active state resolver
// ───────────────────────────────────────────────────────────────────
function isActiveMega(pathname: string, mega: Mega): boolean {
  if (pathname === "/") return false;
  for (const prefix of mega.prefixes) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return true;
  }
  // Also check explicit hrefs (some leaf routes won't match a prefix)
  for (const col of mega.columns) {
    for (const it of col.items) {
      if (pathname === it.href) return true;
    }
  }
  return false;
}

// ───────────────────────────────────────────────────────────────────
// Component
// ───────────────────────────────────────────────────────────────────
export function MegaHeader() {
  const pathname = usePathname() || "/";
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const navWrapRef = useRef<HTMLDivElement | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenKey(null);
    }, 180);
  }, [clearCloseTimer]);

  const openMega = useCallback((key: string) => {
    clearCloseTimer();
    setOpenKey(key);
  }, [clearCloseTimer]);

  // Close on route change
  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
  }, [pathname]);

  // Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Click outside (desktop)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navWrapRef.current) return;
      if (!navWrapRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  // Wave 44 · cysec-active class · operator: "crazy glitch like hacker
  // look on cysec tab." Toggle on html when path matches cyber routes ·
  // CSS in globals.css applies the glitch + scanlines.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const onCysec = pathname.startsWith("/learn/cyber") || pathname.startsWith("/cysec");
    if (onCysec) html.classList.add("cysec-active");
    else html.classList.remove("cysec-active");
    return () => html.classList.remove("cysec-active");
  }, [pathname]);

  // Wave 47 · 2026-06-07 · launcher reframe · MegaHeader is now context-
  // aware. When pathname is inside a silo (Learn/Cysec/etc), the full
  // 9-mega chrome is hidden and SiloShell renders instead. Operator:
  // "smaller main nav up top like software." html[data-silo] attribute
  // set for per-silo theming.
  const siloKey = getSiloFromPath(pathname);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (siloKey) html.setAttribute("data-silo", siloKey);
    else html.removeAttribute("data-silo");
    return () => html.removeAttribute("data-silo");
  }, [siloKey]);

  // If we're inside a silo · short-circuit to the slim SiloShell instead
  // of the full mega chrome. SearchPalette + SiloSwitcher stay mounted.
  if (siloKey) {
    return (
      <>
        <SearchPalette />
        <SiloSwitcher />
        <SiloShell siloKey={siloKey} />
      </>
    );
  }

  return (
    <>
      <SearchPalette />
      <SiloSwitcher />
      <header
        className="fixed left-0 right-0 top-0 z-40 w-full"
        style={{
          // Lowered opacity 2026-06-06 per operator brief — the
          // SacredCanvas + content behind needs to bleed through. Was
          // 0xF2 (95% opaque). Now 0x66 (40% opaque) · the strong
          // backdrop-filter blur keeps text legible while letting the
          // world behind show through.
          backgroundColor: `${C.panel}66`,
          backdropFilter: "saturate(150%) blur(22px)",
          WebkitBackdropFilter: "saturate(150%) blur(22px)",
          borderBottom: `1px solid ${C.hair}`,
        }}
      >
        <div
          ref={navWrapRef}
          className="mx-auto flex h-16 w-full max-w-[1480px] items-center justify-between gap-6 px-5 md:px-8"
          onMouseLeave={scheduleClose}
        >
          {/* ─── Brand ──────────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="AtomEons — return to home"
            className="group flex items-baseline gap-2 outline-none focus-visible:opacity-80"
          >
            <span aria-hidden className="flex items-baseline self-center pr-0.5">
              <RouteSigil slug={pathname || "/"} size={22} accent={C.signal} />
            </span>
            <span
              aria-hidden
              className="block"
              style={{
                color: C.paper, fontFamily: SANS, fontSize: 22, lineHeight: 1,
                letterSpacing: "-0.04em", fontVariationSettings: "'wght' 720, 'opsz' 24",
              }}
            >Æ</span>
            <span
              aria-hidden
              className="hidden sm:block"
              style={{
                color: C.paper, fontFamily: SANS, fontSize: 14, lineHeight: 1,
                letterSpacing: "0.14em", textTransform: "uppercase",
                fontVariationSettings: "'wght' 540", transform: "translateY(-1px)",
              }}
            >ATOMEONS</span>
          </Link>

          {/* ─── Desktop primary nav ───────────────────────────────── */}
          {/*  Wave 32 · NAV COLLAPSE · 2026-06-06  ·  panel verdict
               (UX-product + Lips): 7 → 4 top-level items.
               Cyber + Books + Research are hidden:true · contents
               still rendered as featured columns inside Learn / Lab. */}
          <nav aria-label="Primary" className="hidden lg:flex items-stretch gap-1">
            {MEGAS.filter((m) => !m.hidden)
              .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
              .map((m) => {
              const active = isActiveMega(pathname, m);
              const isOpen = openKey === m.key;
              // Wave 43 · Disney/Apple pattern · the label is a Link to the
              // section's landing · the chevron is a button that toggles
              // the mega. Hover still opens the mega for power users.
              const landingHref = m.landingHref ?? `/${m.key}`;
              return (
                <div
                  key={m.key}
                  className="relative flex items-stretch"
                  onMouseEnter={() => openMega(m.key)}
                  onFocus={() => openMega(m.key)}
                >
                  <Link
                    href={landingHref}
                    className="inline-flex items-center whitespace-nowrap px-2.5 py-2 outline-none transition-colors focus-visible:opacity-80"
                    style={{
                      color: active || isOpen ? C.paper : C.mid,
                      fontFamily: SANS, fontSize: 14,
                      fontVariationSettings: "'wght' 520",
                    }}
                  >
                    <span className="relative">
                      {m.label}
                      {active ? (
                        <span
                          aria-hidden
                          className="absolute left-0 right-0 -bottom-[22px] h-px"
                          style={{ background: C.signal }}
                        />
                      ) : null}
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-label={`Toggle ${m.label} menu`}
                    onClick={() => setOpenKey(isOpen ? null : m.key)}
                    className="inline-flex items-center pr-1.5 outline-none transition-colors focus-visible:opacity-80"
                  >
                    <ChevronDown
                      size={13}
                      strokeWidth={1.8}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                      style={{ color: isOpen ? C.signal : C.muted }}
                      aria-hidden
                    />
                  </button>
                </div>
              );
            })}

            {/* Wave 39 · Founder's View hard-link removed · folds into
                ABOUT Æ mega · Trust + founder column. Top nav now shows
                only the 3 visible megas: ABOUT Æ · LEARN · CYSEC CYBER. */}
          </nav>

          {/* ─── Right rail ─────────────────────────────────────────── */}
          {/* Compact SearchTrigger removed 2026-06-06 per operator —
              the canonical search is the full-width SearchInline bar
              below the header, restored in layout.tsx. ⌘K still opens
              the palette from anywhere. */}
          <div className="hidden lg:flex items-center gap-3">
            <AmbientToggle compact />
            <Link
              href="/account"
              className="text-[13px] outline-none transition-colors focus-visible:opacity-80"
              style={{ color: C.mid, fontFamily: SANS, fontVariationSettings: "'wght' 500" }}
            >
              Account
            </Link>
            <Link
              href="/ask"
              className="inline-flex items-center gap-1.5 outline-none focus-visible:opacity-80"
              style={{
                background: C.signal, color: C.ink, fontFamily: SANS, fontSize: 13,
                padding: "8px 14px", fontVariationSettings: "'wght' 600",
                letterSpacing: "0", borderRadius: 0,
              }}
            >
              Ask the lab <span aria-hidden>→</span>
            </Link>
          </div>

          {/* ─── Mobile hamburger ────────────────────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center outline-none focus-visible:opacity-80 lg:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className="absolute left-0 top-0 h-px w-5 transition-transform"
                style={{
                  background: C.paper,
                  transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 top-[6px] h-px w-5 transition-opacity"
                style={{ background: C.paper, opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="absolute left-0 top-[13px] h-px w-5 transition-transform"
                style={{
                  background: C.paper,
                  transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </span>
          </button>
        </div>

        {/* ─── Mega panel ─────────────────────────────────────────── */}
        {openKey ? (
          <div
            className="absolute left-0 right-0 hidden lg:block"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
            style={{
              top: 64,
              background: C.panel,
              borderBottom: `1px solid ${C.hair}`,
              boxShadow: "0 24px 48px -16px rgba(0,0,0,0.5)",
            }}
          >
            {MEGAS.filter((m) => m.key === openKey).map((m) => (
              <div key={m.key} className="mx-auto w-full max-w-[1480px] px-5 py-10 md:px-8">
                <div className="grid grid-cols-12 gap-8">
                  {m.columns.map((col, ci) => (
                    <div key={ci} className="col-span-3">
                      <p
                        style={{
                          color: C.signal, fontFamily: MONO, fontSize: 10,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          fontVariationSettings: "'wght' 600",
                        }}
                      >
                        § {col.title}
                      </p>
                      <ul className="mt-5 space-y-3.5">
                        {col.items.map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              className="group block outline-none focus-visible:opacity-80"
                            >
                              <span className="flex items-baseline gap-2">
                                <span
                                  className="transition-colors"
                                  style={{
                                    color: pathname === it.href ? C.signal : C.paper,
                                    fontFamily: SANS, fontSize: 14,
                                    fontVariationSettings: "'wght' 500",
                                  }}
                                >
                                  {it.label}
                                </span>
                                {it.badge ? (
                                  <span
                                    style={{
                                      color: it.badge === "LIVE" ? C.pulse : C.signal,
                                      fontFamily: MONO, fontSize: 8.5,
                                      letterSpacing: "0.22em", textTransform: "uppercase",
                                      fontVariationSettings: "'wght' 600",
                                      border: `1px solid ${it.badge === "LIVE" ? C.pulse : C.signal}`,
                                      padding: "1px 5px",
                                    }}
                                  >
                                    {it.badge}
                                  </span>
                                ) : null}
                              </span>
                              {it.hint ? (
                                <span
                                  className="mt-1 block transition-colors"
                                  style={{
                                    color: C.muted, fontFamily: SERIF, fontSize: 12,
                                    lineHeight: 1.5, fontStyle: "italic",
                                  }}
                                >
                                  {it.hint}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Featured card */}
                  {m.featured ? (
                    <Link
                      href={m.featured.href}
                      className="col-span-12 mt-6 block border border-[#1F242B] p-6 outline-none transition-colors hover:border-[#22F0D5] focus-visible:border-[#22F0D5] md:col-span-12 md:mt-0 lg:col-span-12 xl:col-span-12"
                      style={{
                        gridColumn: m.columns.length === 4 ? "auto" : undefined,
                        background: C.inset,
                      }}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p
                          style={{
                            color: m.featured.badge === "LIVE" ? C.pulse : C.signal,
                            fontFamily: MONO, fontSize: 10,
                            letterSpacing: "0.22em", textTransform: "uppercase",
                          }}
                        >
                          {m.featured.eyebrow}
                        </p>
                        {m.featured.badge ? (
                          <span
                            style={{
                              color: m.featured.badge === "LIVE" ? C.pulse : C.signal,
                              fontFamily: MONO, fontSize: 9,
                              letterSpacing: "0.22em", textTransform: "uppercase",
                              border: `1px solid ${m.featured.badge === "LIVE" ? C.pulse : C.signal}`,
                              padding: "2px 8px",
                            }}
                          >
                            {m.featured.badge}
                          </span>
                        ) : null}
                      </div>
                      <p
                        className="mt-3"
                        style={{
                          color: C.paper, fontFamily: SERIF, fontSize: 28,
                          lineHeight: 1.15, fontWeight: 300, letterSpacing: "-0.015em",
                        }}
                      >
                        {m.featured.title}
                      </p>
                      <p
                        className="mt-3 max-w-2xl"
                        style={{
                          color: C.mid, fontFamily: SERIF, fontSize: 14,
                          lineHeight: 1.55,
                        }}
                      >
                        {m.featured.description}
                      </p>
                      <p
                        className="mt-4"
                        style={{
                          color: C.signal, fontFamily: MONO, fontSize: 11,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                        }}
                      >
                        atomeons.com{m.featured.href} →
                      </p>
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </header>

      {/* ─── Mobile drawer ────────────────────────────────────────── */}
      {mobileOpen ? (
        <MobileDrawer pathname={pathname} onClose={() => setMobileOpen(false)} />
      ) : null}
    </>
  );
}

// ───────────────────────────────────────────────────────────────────
// Mobile drawer · full-screen accordion
// ───────────────────────────────────────────────────────────────────
function MobileDrawer({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className="fixed inset-0 z-30 lg:hidden"
      style={{
        top: 64,
        background: C.ink,
        overflowY: "auto",
      }}
    >
      <div className="mx-auto w-full max-w-[800px] px-5 py-8">
        {/* Wave 41 · mobile nav also sorts by order */}
        {MEGAS.filter((m) => !m.hidden)
          .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
          .map((m) => {
          const isExpanded = expanded === m.key;
          const isActive = isActiveMega(pathname, m);
          return (
            <div key={m.key} className="border-b" style={{ borderColor: C.hair }}>
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : m.key)}
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between py-5 outline-none focus-visible:opacity-80"
              >
                <span
                  style={{
                    color: isActive ? C.paper : C.paper,
                    fontFamily: SERIF, fontSize: 24, fontWeight: 300,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {m.label}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.6}
                  className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  style={{ color: isExpanded ? C.signal : C.muted }}
                  aria-hidden
                />
              </button>
              {isExpanded ? (
                <div className="pb-5">
                  {m.columns.map((col, ci) => (
                    <div key={ci} className="mt-3">
                      <p
                        style={{
                          color: C.signal, fontFamily: MONO, fontSize: 10,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                        }}
                      >
                        § {col.title}
                      </p>
                      <ul className="mt-3 space-y-3">
                        {col.items.map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              onClick={onClose}
                              className="block py-1"
                              style={{
                                color: pathname === it.href ? C.signal : C.paper,
                                fontFamily: SANS, fontSize: 16,
                                fontVariationSettings: "'wght' 500",
                              }}
                            >
                              <span className="inline-flex items-baseline gap-2">
                                {it.label}
                                {it.badge ? (
                                  <span
                                    style={{
                                      color: it.badge === "LIVE" ? C.pulse : C.signal,
                                      fontFamily: MONO, fontSize: 9,
                                      letterSpacing: "0.22em", textTransform: "uppercase",
                                      border: `1px solid ${it.badge === "LIVE" ? C.pulse : C.signal}`,
                                      padding: "1px 5px",
                                    }}
                                  >
                                    {it.badge}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}

        <Link
          href="/founders-view"
          onClick={onClose}
          className="block py-5 border-b"
          style={{
            borderColor: C.hair,
            color: pathname.startsWith("/founders-view") ? C.signal : C.paper,
            fontFamily: SERIF, fontSize: 24, fontWeight: 300, letterSpacing: "-0.015em",
          }}
        >
          Founder&apos;s View
        </Link>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/ask"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2"
            style={{
              background: C.signal, color: C.ink, fontFamily: SANS, fontSize: 14,
              padding: "14px 18px", fontVariationSettings: "'wght' 600",
            }}
          >
            Ask the lab <span aria-hidden>→</span>
          </Link>
          <Link
            href="/account"
            onClick={onClose}
            className="inline-flex items-center justify-center"
            style={{
              border: `1px solid ${C.hair}`, color: C.paper, fontFamily: SANS, fontSize: 14,
              padding: "13px 18px", fontVariationSettings: "'wght' 500",
            }}
          >
            Account
          </Link>
        </div>
      </div>
    </div>
  );
}
