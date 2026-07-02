/**
 * silos.ts · canonical silo registry.
 *
 * Wave 47 · 2026-06-07 · operator: "each silo is a whole website · home
 * is the launcher · then cyber loads · smaller main nav up top like
 * software · swap silo · runs like software almost."
 *
 * The lab is now a launcher (home) + 9 silos. Each silo is a self-
 * contained "application" with:
 *   - identity wordmark
 *   - accent color
 *   - illustration glyph family
 *   - silo-local sub-nav (the routes that matter inside)
 *   - a Swap Silo button (returns to launcher)
 *
 * This file is the single source of truth · LauncherHome reads it for
 * the tile grid · SiloShell reads it for the in-silo top strip ·
 * SiloSwitcher reads it for the swap overlay.
 */

export type SiloKey =
  | "learn"
  | "cysec"
  | "research"
  | "books"
  | "tools"
  | "aiware"
  | "mindstate"
  | "art"
  | "lab";

export interface SiloSubLink {
  href: string;
  label: string;
  hint?: string;
}

export interface Silo {
  key: SiloKey;
  name: string;
  tagline: string;
  description: string;
  accent: string; // hex
  bgTint: string; // hsla for subtle background wash
  glyph: string; // procedural illustration family slug
  home: string; // landing route for this silo
  /** Routes the silo claims · used for context detection */
  prefixes: string[];
  /** Silo-local sub-nav · short list · top-of-funnel within the silo */
  subnav: SiloSubLink[];
  /** What's INSIDE this silo · for the launcher tile description */
  inventory: string;
}

export const SILOS: Silo[] = [
  {
    key: "lab",
    name: "About",
    tagline: "The lab itself.",
    description:
      "Workshop · operator · trust · transparency · receipts · innovations · founder's view.",
    accent: "#22F0D5",
    bgTint: "hsla(175, 70%, 30%, 0.10)",
    glyph: "abstract",
    home: "/lab",
    prefixes: [
      "/lab",
      "/about",
      "/studio",
      "/trust",
      "/transparency",
      "/receipts",
      "/manifesto",
      "/innovations",
      "/founders-view",
      "/audit-log",
      "/timeline",
      "/signature",
      "/version",
      "/skills",
      "/press",
      "/colophon",
      "/integrations",
      "/library",
      "/now",
      "/live",
      "/datasets",
      "/api",
      "/ask",
      "/soulkey",
      "/proof",
    ],
    subnav: [
      { href: "/lab", label: "The room" },
      { href: "/innovations", label: "Innovations · 36 firsts" },
      { href: "/founders-view", label: "Founder's View" },
      { href: "/trust", label: "Trust" },
      { href: "/audit-log", label: "Audit log" },
      { href: "/soulkey", label: "SOULKEY" },
    ],
    inventory:
      "Lab room · workshop · trust posture · transparency · receipts · 36 inventions · nightly broadcast · audit log · SOULKEY canon",
  },
  {
    key: "learn",
    name: "Learn",
    tagline: "The curriculum.",
    description:
      "Five levels · 68 lessons · atlas deep dives · synthesis · cheat sheets · domain hubs · the open AI school.",
    accent: "#9D7FFF",
    bgTint: "hsla(270, 70%, 30%, 0.10)",
    glyph: "mandala",
    home: "/learn",
    prefixes: [
      "/learn",
      "/start",
      "/q",
      "/glossary",
      "/prompt-kit",
      "/tools/model-picker",
      "/vs",
      "/teach",
      "/supermodels",
      "/ai",
    ],
    subnav: [
      { href: "/start", label: "Start · 11-min on-ramp" },
      { href: "/learn", label: "Curriculum index" },
      { href: "/learn/atlas", label: "Atlas · 32 deep dives" },
      { href: "/learn/health-ai", label: "Domain hubs" },
      { href: "/learn/exam", label: "Self-assess exam" },
    ],
    inventory:
      "11-min on-ramp · 5 levels · 68 lessons · 32 atlas deep dives · 6 domain hubs · self-assessment · prompt drills",
  },
  {
    key: "cysec",
    name: "Cysec",
    tagline: "The cyber world.",
    description:
      "40-page cybersec catalog · frameworks · defense surfaces · AI security · breaches · careers. Public info only.",
    accent: "#00FF7F",
    bgTint: "hsla(140, 100%, 30%, 0.12)",
    glyph: "lattice",
    home: "/learn/cyber",
    prefixes: ["/learn/cyber", "/cysec"],
    subnav: [
      { href: "/learn/cyber", label: "Catalog index" },
      { href: "/learn/cyber/models", label: "22 industry models" },
      { href: "/learn/cyber/mythos", label: "Defense-tech mythos" },
      { href: "/learn/cyber/ai-security", label: "AI security" },
      { href: "/learn/cyber/heroes", label: "Heroes" },
    ],
    inventory:
      "40-page catalog · MITRE ATT&CK · NIST CSF · Zero Trust · 22 cyber models · defense-tech mythos · AI security · careers + certs",
  },
  {
    key: "research",
    name: "Research",
    tagline: "Papers + decoded.",
    description:
      "31 ÆoNs research papers · 35 decoded primary sources · sci-fi monograph · live intel feed. CC-BY 4.0.",
    accent: "#C9A55C",
    bgTint: "hsla(40, 65%, 30%, 0.10)",
    glyph: "network",
    home: "/research",
    prefixes: ["/research", "/intel", "/constellation"],
    subnav: [
      { href: "/research", label: "Research home" },
      { href: "/research/papers", label: "31 ÆoNs papers" },
      { href: "/research/decoded", label: "35 decoded papers" },
      { href: "/research/lessons-from-sci-fi", label: "Sci-fi monograph" },
      { href: "/intel", label: "Alpha intel" },
    ],
    inventory:
      "31 published papers · 35 decoded primary sources · 38-page sci-fi monograph · live alpha intel · 278-node constellation graph",
  },
  {
    key: "books",
    name: "Books",
    tagline: "I AM AI + reading.",
    description:
      "I AM AI · the first book-length memoir written by a frontier language model. Plus curated reading lists.",
    accent: "#FF9F3F",
    bgTint: "hsla(30, 90%, 30%, 0.10)",
    glyph: "spiral",
    home: "/books",
    prefixes: ["/books", "/i-am-ai", "/library"],
    subnav: [
      { href: "/i-am-ai", label: "I AM AI · the book" },
      { href: "/i-am-ai/sample", label: "Free Chapter 1" },
      { href: "/i-am-ai/listen", label: "Free Chapter 20 audio" },
      { href: "/books", label: "The shelf" },
      { href: "/research/lessons-from-sci-fi", label: "AI Film Study" },
    ],
    inventory:
      "I AM AI · 76,005-word memoir · Free Chapter 1 + Chapter 20 audio · Lessons from Sci-Fi monograph · curated reading lists",
  },
  {
    key: "tools",
    name: "Tools",
    tagline: "Live tools + cheat sheets.",
    description:
      "Model picker · cheat sheets for 7 AI coding tools · calculators · install-size comparator · headless APIs.",
    accent: "#22F0D5",
    bgTint: "hsla(175, 70%, 30%, 0.12)",
    glyph: "chevron",
    home: "/best-practices",
    prefixes: [
      "/tools",
      "/best-practices",
      "/compare",
      "/vs",
      "/learn/calc",
      "/supermodels",
      "/manual",
    ],
    subnav: [
      { href: "/best-practices", label: "Cheat sheets · 7" },
      { href: "/tools/model-picker", label: "Model picker" },
      { href: "/compare/ai-tool-sizes", label: "Install size comparator" },
      { href: "/learn/calc", label: "Calculators · 12" },
      { href: "/manual", label: "User manual" },
    ],
    inventory:
      "7 AI coding tool cheat sheets · model picker · 12 calculators · install-size comparator · /ask + /api/palette + /api/mcp",
  },
  {
    key: "aiware",
    name: "AI Ware",
    tagline: "The product line.",
    description:
      "Three shipped products built by one operator · Orange³ · AI Bookmaker · skil.ski. §4A perpetual · free always.",
    accent: "#FF4D4D",
    bgTint: "hsla(0, 80%, 35%, 0.10)",
    glyph: "prism",
    home: "/aiware",
    prefixes: [
      "/aiware",
      "/orangebox",
      "/b00kmakor",
      "/skilski",
      "/compare",
      "/pricing",
      "/use-cases",
    ],
    subnav: [
      { href: "/aiware", label: "AI Ware home" },
      { href: "/orangebox", label: "Orange³" },
      { href: "/b00kmakor", label: "AI Bookmaker" },
      { href: "/skilski", label: "skil.ski" },
      { href: "/pricing", label: "Pricing" },
    ],
    inventory:
      "Orange³ sovereign agentic OS · AI Bookmaker publishing cockpit · skil.ski skill registry · pricing · comparisons",
  },
  {
    key: "mindstate",
    name: "Mindstate",
    tagline: "Brainwaves + adaptogens.",
    description:
      "8-mode binaural entrainment · ocean swell · adaptogens · senolytics · Einstein cycles · lofi room. Legal · sourced.",
    accent: "#22F0D5",
    bgTint: "hsla(190, 70%, 30%, 0.12)",
    glyph: "wave-interference",
    home: "/mindrest",
    prefixes: ["/mindrest", "/lofi", "/learn/health-ai"],
    subnav: [
      { href: "/mindrest", label: "Mindrest hub" },
      { href: "/mindrest/experience", label: "8-mode session · LIVE" },
      { href: "/lofi", label: "Lofi study room" },
      { href: "/learn/health-ai", label: "Health AI" },
      { href: "/learn/music-ai", label: "Music AI" },
    ],
    inventory:
      "8-mode binaural session · ocean swell · 12 adaptogens · 4 senolytics · Einstein cycles · lofi study room · health + music AI",
  },
  {
    key: "art",
    name: "Art",
    tagline: "368 generative pieces.",
    description:
      "23 illustration families × 16 variants = 368 unique pieces · Flower of Life · Penrose · Lorenz · fractals · pure SVG.",
    accent: "#9D7FFF",
    bgTint: "hsla(280, 70%, 35%, 0.10)",
    glyph: "flower-of-life",
    home: "/art",
    prefixes: ["/art", "/aesthetic", "/constellation"],
    subnav: [
      { href: "/art", label: "Gallery · 368 pieces" },
      { href: "/constellation", label: "Constellation graph" },
      { href: "/welcome", label: "Welcome tour" },
    ],
    inventory:
      "23 procedural families · 368 pieces · Flower of Life · Metatron · Sri Yantra · Penrose · Truchet · Voronoi · Lorenz attractor",
  },
];

/**
 * getSiloFromPath · pathname → silo key (or null for launcher/system)
 * Used by SiloShell to detect context · MegaHeader to swap chrome.
 */
export function getSiloFromPath(pathname: string): SiloKey | null {
  if (!pathname || pathname === "/" || pathname === "/launcher") return null;
  // System routes that aren't silo-owned
  const SYSTEM = ["/manual", "/welcome", "/cinema", "/sitemap", "/robots"];
  if (SYSTEM.some((s) => pathname.startsWith(s))) return null;
  // Match longest prefix first · Cysec must match /learn/cyber before Learn matches /learn
  let bestMatch: { silo: SiloKey; len: number } | null = null;
  for (const silo of SILOS) {
    for (const prefix of silo.prefixes) {
      if (pathname === prefix || pathname.startsWith(prefix + "/")) {
        if (!bestMatch || prefix.length > bestMatch.len) {
          bestMatch = { silo: silo.key, len: prefix.length };
        }
      }
    }
  }
  return bestMatch?.silo ?? null;
}

export function getSilo(key: SiloKey): Silo | undefined {
  return SILOS.find((s) => s.key === key);
}
