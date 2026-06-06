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
import { ChevronDown } from "lucide-react";
import { SearchPalette, SearchTrigger } from "./SearchPalette";
import { RouteSigil } from "./RouteSigil";

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
};

const MEGAS: Mega[] = [
  {
    key: "learn",
    label: "Learn",
    prefixes: ["/learn", "/start", "/q", "/glossary", "/prompt-kit", "/tools", "/vs", "/teach", "/supermodels", "/ai"],
    columns: [
      // Row 1
      {
        title: "Start here",
        items: [
          { href: "/start", label: "Start · 11-min on-ramp", hint: "For under-10 ChatGPT users" },
          { href: "/learn", label: "The curriculum index", hint: "Five levels · five paths" },
          { href: "/learn/library", label: "Lesson library", hint: "Every lesson, grouped by level" },
          { href: "/learn/decision-tree", label: "Decision tree", hint: "Pick your next lesson" },
          { href: "/ai", label: "AI gateway · 51 FAQs" },
        ],
      },
      {
        title: "The 5 levels",
        items: [
          { href: "/learn/lesson/scared-or-skeptical", label: "01 · Novice" },
          { href: "/learn/lesson/what-ai-actually-does", label: "02 · Learner" },
          { href: "/learn/lesson/your-first-real-prompt", label: "03 · User" },
          { href: "/learn", label: "04 · Operator" },
          { href: "/learn", label: "05 · Pilot" },
          { href: "/learn/exam", label: "Self-assess · find your level", badge: "NEW" },
        ],
      },
      {
        title: "Persona paths",
        items: [
          { href: "/learn/worker", label: "Worker · AI at the job" },
          { href: "/learn/builder", label: "Builder · ship features" },
          { href: "/learn/student", label: "Student · academic AI" },
          { href: "/learn/operator", label: "Operator · run AI in prod" },
          { href: "/learn/curious", label: "Curious · just exploring" },
          { href: "/learn/playbooks", label: "18 playbooks by job" },
        ],
      },
      {
        title: "Atlas · 32 deep dives",
        items: [
          { href: "/learn/atlas", label: "Atlas index" },
          { href: "/learn/atlas/mech-interp", label: "Mechanistic interpretability" },
          { href: "/learn/atlas/agent-harnesses", label: "Agent harnesses" },
          { href: "/learn/atlas/rag-architectures", label: "RAG architectures" },
          { href: "/learn/atlas/long-context-engineering", label: "Long-context engineering" },
          { href: "/learn/atlas/scaling-laws", label: "Scaling laws" },
          { href: "/learn/atlas/synthetic-data", label: "Synthetic data" },
          { href: "/learn/atlas/state-space-models", label: "State-space models · Mamba" },
        ],
      },
      // Row 2
      {
        title: "Synthesis · MED",
        items: [
          { href: "/learn/synthesis", label: "All MED pages" },
          { href: "/learn/synthesis/context-windows-minimum-effective-dose", label: "Context windows · MED" },
          { href: "/learn/synthesis/tokens-and-api-costs-minimum-effective-dose", label: "Tokens + API costs · MED" },
          { href: "/learn/synthesis/prompt-engineering-the-eighty-twenty", label: "Prompt engineering · 80/20" },
          { href: "/q", label: "Q-pages · 20 'what is X'" },
          { href: "/glossary", label: "Glossary · plain English" },
          { href: "/prompt-kit", label: "Prompt kit · 27 drills" },
        ],
      },
      {
        title: "Hands-on",
        items: [
          { href: "/learn/labs", label: "Labs · 12 exercises", hint: "Browser-runnable", badge: "NEW" },
          { href: "/learn/projects", label: "Projects · 7 build-alongs", badge: "NEW" },
          { href: "/learn/exam", label: "Self-assessment · 25 Q", badge: "NEW" },
          { href: "/teach", label: "Teach · methodology", badge: "NEW" },
          { href: "/learn/cases", label: "Case studies" },
          { href: "/learn/failures", label: "Failure modes · named" },
          { href: "/learn/mistakes", label: "Common mistakes" },
        ],
      },
      {
        title: "Career + verticals",
        items: [
          { href: "/learn/career", label: "Career index" },
          { href: "/learn/career/pathways", label: "Pathways" },
          { href: "/learn/career/salaries", label: "Salaries" },
          { href: "/learn/career/resume", label: "AI-ready resume" },
          { href: "/learn/career/interviews", label: "Interviews" },
          { href: "/learn/vertical/healthcare", label: "Healthcare AI" },
          { href: "/learn/vertical/finance", label: "Finance AI" },
          { href: "/learn/vertical/defense", label: "Defense AI" },
        ],
      },
      {
        title: "Tools + compare",
        items: [
          { href: "/learn/calc", label: "Calculators · 12 tools" },
          { href: "/learn/calc/tools/cost-calculator", label: "Cost calculator" },
          { href: "/learn/calc/tools/token-counter", label: "Token counter" },
          { href: "/learn/calc/tools/model-comparator", label: "Model comparator" },
          { href: "/tools", label: "AI task router · 23 jobs" },
          { href: "/vs", label: "AI tool comparisons" },
          { href: "/supermodels", label: "Supermodels leaderboard" },
          { href: "/learn/leaderboard", label: "Frontier leaderboard" },
        ],
      },
    ],
    featured: {
      href: "/ask",
      eyebrow: "§ NEW · live",
      title: "Ask the lab",
      description:
        "Type any question. gemini-2.5-flash drafts a 2-5 sentence answer grounded only on lab content, with every source cited inline. Now unified with the ⌘K nav search.",
      badge: "LIVE",
    },
  },
  {
    key: "cyber",
    label: "Cyber",
    prefixes: ["/learn/cyber"],
    columns: [
      {
        title: "Start here",
        items: [
          { href: "/learn/cyber", label: "Cyber index", hint: "40-page public-info catalog" },
          { href: "/learn/cyber/path", label: "Path · zero to operator" },
          { href: "/learn/cyber/start", label: "Start · day-zero brief" },
          { href: "/learn/cyber/certs", label: "Certifications guide" },
          { href: "/learn/cyber/books", label: "Cyber book canon" },
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
        ],
      },
      {
        title: "Defense + attack",
        items: [
          { href: "/learn/cyber/active-directory-defense", label: "Active Directory defense" },
          { href: "/learn/cyber/email-security-stack", label: "Email security stack" },
          { href: "/learn/cyber/llm-warfare", label: "LLM-era cyber warfare" },
          { href: "/learn/cyber/iot-embedded", label: "IoT + embedded security" },
          { href: "/learn/cyber/ot-ics", label: "OT / ICS security" },
        ],
      },
      {
        title: "Case studies + careers",
        items: [
          { href: "/learn/cyber/breaches", label: "Breaches index" },
          { href: "/learn/cyber/colonial-pipeline-2021", label: "Colonial Pipeline 2021" },
          { href: "/learn/cyber/log4shell-2021", label: "Log4Shell 2021" },
          { href: "/learn/cyber/threat-actors", label: "Threat actor profiles" },
          { href: "/learn/cyber/heroes", label: "Cyber heroes" },
          { href: "/learn/cyber/employers", label: "Where to work" },
          { href: "/learn/cyber/hackerone", label: "HackerOne + bug bounty" },
        ],
      },
    ],
    featured: {
      href: "/learn/cyber/ai-security",
      eyebrow: "§ flagship",
      title: "AI security",
      description:
        "The cross-section of AI and cyber · prompt injection · jailbreaks · adversarial inputs · supply-chain attacks against models.",
    },
  },
  {
    key: "research",
    label: "Research",
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
    label: "Products",
    prefixes: ["/orangebox", "/b00kmakor", "/skilski", "/compare", "/pricing", "/vendor-pack", "/use-cases"],
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
          { href: "/vendor-pack", label: "Vendor pack · CISO bundle", badge: "NEW" },
          { href: "/pricing", label: "Pricing" },
          { href: "/support", label: "Support · 8-channel hub" },
          { href: "/legal/refund", label: "Refund policy" },
        ],
      },
    ],
    featured: {
      href: "/vendor-pack",
      eyebrow: "§ NEW · for procurement",
      title: "Vendor pack",
      description:
        "CISO-ready bundle of every license, security, trust, and integration document. Single .txt download at /vendor-pack/bundle.txt.",
      badge: "NEW",
    },
  },
  {
    key: "books",
    label: "Books",
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
          { href: "/watching", label: "Watching · films + TV", badge: "NEW" },
          { href: "/listening", label: "Listening · studio music", badge: "NEW" },
        ],
      },
      {
        title: "More writing",
        items: [
          { href: "/founders-view", label: "Founder's View · nightly", badge: "LIVE" },
          { href: "/dear-reader", label: "Dear reader · long letters", badge: "NEW" },
          { href: "/correspondence", label: "Correspondence · email", badge: "NEW" },
          { href: "/press", label: "Press · media kit" },
          { href: "/influences", label: "Influences · 30 named", badge: "NEW" },
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
    label: "Lab",
    prefixes: [
      "/lab", "/studio", "/aesthetic", "/colophon", "/integrations", "/timeline",
      "/trust", "/transparency", "/receipts", "/manifesto", "/vendor-pack",
      "/library", "/listening", "/watching", "/influences", "/signature",
      "/now", "/live", "/correspondence", "/dear-reader",
      "/api", "/ask", "/datasets",
    ],
    columns: [
      {
        title: "The room",
        items: [
          { href: "/lab", label: "Lab · workspace", badge: "NEW" },
          { href: "/studio", label: "Studio · the atelier", badge: "NEW" },
          { href: "/aesthetic", label: "Aesthetic · visual language", badge: "NEW" },
          { href: "/colophon", label: "Colophon · stack", badge: "NEW" },
          { href: "/integrations", label: "Integrations · service map", badge: "NEW" },
          { href: "/timeline", label: "Timeline · ship log", badge: "NEW" },
          { href: "/signature", label: "Signature · the mark", badge: "NEW" },
        ],
      },
      {
        title: "Trust",
        items: [
          { href: "/trust", label: "Trust posture", badge: "NEW" },
          { href: "/transparency", label: "Financial transparency", badge: "NEW" },
          { href: "/receipts", label: "Receipts ledger" },
          { href: "/manifesto", label: "Manifesto · 14 clauses" },
          { href: "/vendor-pack", label: "Vendor pack · CISO bundle", badge: "NEW" },
          { href: "/.well-known/security.txt", label: "security.txt" },
        ],
      },
      {
        title: "Personal",
        items: [
          { href: "/about", label: "About the operator" },
          { href: "/library", label: "Library · books", badge: "NEW" },
          { href: "/listening", label: "Listening · music", badge: "NEW" },
          { href: "/watching", label: "Watching · films + TV", badge: "NEW" },
          { href: "/influences", label: "Influences · named", badge: "NEW" },
          { href: "/dear-reader", label: "Dear reader · letters", badge: "NEW" },
          { href: "/correspondence", label: "Correspondence", badge: "NEW" },
        ],
      },
      {
        title: "Live + data + dev",
        items: [
          { href: "/now", label: "/now · ship log", badge: "LIVE" },
          { href: "/live", label: "/live · real-time dashboard", badge: "LIVE" },
          { href: "/ask", label: "Ask the lab", badge: "LIVE" },
          { href: "/api", label: "Developer API", badge: "NEW" },
          { href: "/datasets", label: "Open datasets", badge: "NEW" },
          { href: "/constellation", label: "Constellation · graph", badge: "NEW" },
          { href: "/press", label: "Press · media kit" },
        ],
      },
    ],
    featured: {
      href: "/vendor-pack",
      eyebrow: "§ NEW · for procurement",
      title: "Vendor pack",
      description:
        "CISO-ready bundle of every license, security, trust, and integration document. Single .txt download · /vendor-pack/bundle.txt.",
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

  return (
    <>
      <SearchPalette />
      <header
        className="fixed left-0 right-0 top-0 z-40 w-full"
        style={{
          backgroundColor: `${C.panel}F2`,
          backdropFilter: "saturate(140%) blur(16px)",
          WebkitBackdropFilter: "saturate(140%) blur(16px)",
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
          <nav aria-label="Primary" className="hidden lg:flex items-stretch gap-1">
            {MEGAS.map((m) => {
              const active = isActiveMega(pathname, m);
              const isOpen = openKey === m.key;
              return (
                <div
                  key={m.key}
                  className="relative flex items-stretch"
                  onMouseEnter={() => openMega(m.key)}
                  onFocus={() => openMega(m.key)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenKey(isOpen ? null : m.key)}
                    className="group inline-flex items-center gap-1.5 px-3 py-2 outline-none transition-colors focus-visible:opacity-80"
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

            <Link
              href="/founders-view"
              className="inline-flex items-center px-3 py-2 outline-none transition-colors focus-visible:opacity-80"
              style={{
                color: pathname.startsWith("/founders-view") ? C.paper : C.mid,
                fontFamily: SANS, fontSize: 14,
                fontVariationSettings: "'wght' 520",
              }}
            >
              <span className="relative">
                Founder&apos;s View
                {pathname.startsWith("/founders-view") ? (
                  <span aria-hidden className="absolute left-0 right-0 -bottom-[22px] h-px" style={{ background: C.signal }} />
                ) : null}
              </span>
            </Link>
          </nav>

          {/* ─── Right rail ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <SearchTrigger />
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
        {MEGAS.map((m) => {
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
