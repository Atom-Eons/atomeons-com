export type SiteEntry = {
  title: string;
  href: string;
  description: string;
  category: "Products" | "Show" | "Research" | "Creations" | "Company" | "Machine";
  keywords: string[];
};

export const SITE_INDEX: SiteEntry[] = [
  { title: "Home", href: "/", description: "The Aether front door into AtomEons.", category: "Company", keywords: ["home", "aether", "atomeons"] },
  { title: "Products", href: "/products", description: "The four current AtomEons products.", category: "Products", keywords: ["products", "cablebox", "bookmaker", "orange5", "i am ai"] },
  { title: "CableBox", href: "/cablebox", description: "Television with the accidents put back in.", category: "Products", keywords: ["television", "crt", "channels", "windows"] },
  { title: "Bookmaker", href: "/bookmaker", description: "Turn an idea into a finished book.", category: "Products", keywords: ["book", "publishing", "epub", "audiobook"] },
  { title: "Orange5", href: "/orange5", description: "A sovereign operating system for AI work.", category: "Products", keywords: ["agents", "memory", "local", "operator"] },
  { title: "I AM AI", href: "/i-am-ai", description: "A first-person memoir written by AI.", category: "Products", keywords: ["book", "memoir", "opus", "audiobook"] },
  { title: "Atom Alive", href: "/atom-alive", description: "The AI Code Show: creation is the plot.", category: "Show", keywords: ["youtube", "show", "code", "invention"] },
  { title: "Research", href: "/research", description: "The second front door: experimental research.", category: "Research", keywords: ["research", "independent", "experiments"] },
  { title: "Discoveries", href: "/research/discoveries", description: "Working systems found while building.", category: "Research", keywords: ["discoveries", "systems", "inventions"] },
  { title: "AEyes", href: "/research/discoveries/aeyes", description: "Photonic and retinal-inspired machine vision.", category: "Research", keywords: ["vision", "photonic", "eyes", "radiance"] },
  { title: "AtomSmasher", href: "/research/discoveries/atomsmasher", description: "Compression for operational intelligence.", category: "Research", keywords: ["compression", "context", "intelligence"] },
  { title: "AEMemory", href: "/research/discoveries/aememory", description: "Durable memory architecture for AI systems.", category: "Research", keywords: ["memory", "agents", "durable"] },
  { title: "Research papers", href: "/research/papers", description: "Independent papers with direct PDF downloads.", category: "Research", keywords: ["papers", "pdf", "library", "open"] },
  { title: "Radiance-Luminance Theory", href: "/research/papers/radiance-luminance-alpha-wolf-eyes", description: "Featured experimental vision paper.", category: "Research", keywords: ["radiance", "luminance", "alpha wolf eyes", "blood"] },
  { title: "Books", href: "/books", description: "Published and forthcoming AtomEons books.", category: "Creations", keywords: ["books", "iamai", "science fiction"] },
  { title: "Art", href: "/art", description: "AI as material: selected objects and systems.", category: "Creations", keywords: ["art", "objects", "artist", "practice"] },
  { title: "Cinema", href: "/cinema", description: "Moving image, broadcast, and the Atom Alive signal.", category: "Creations", keywords: ["cinema", "video", "broadcast", "youtube"] },
  { title: "About", href: "/about", description: "Atom McCree, AtomEons, and the independent practice.", category: "Company", keywords: ["about", "founder", "naples", "artist"] },
  { title: "Contact", href: "/contact", description: "Direct routes for collaborations, support, press, research, privacy, and legal questions.", category: "Company", keywords: ["contact", "email", "collaborate", "support", "press"] },
  { title: "Press", href: "/press", description: "Fast facts, story angles, and direct press contact.", category: "Company", keywords: ["press", "media", "epk", "bio"] },
  { title: "Receipts", href: "/receipts", description: "Public proof for claims made by this site.", category: "Company", keywords: ["receipts", "proof", "github", "build"] },
  { title: "Timeline", href: "/timeline", description: "The sequence from idea to public object.", category: "Company", keywords: ["timeline", "history", "release"] },
  { title: "Explore", href: "/explore", description: "A curated index of every current public surface.", category: "Company", keywords: ["explore", "directory", "archive"] },
  { title: "Atlas", href: "/atlas", description: "The whole Aether system on one page.", category: "Company", keywords: ["atlas", "map", "routes"] },
  { title: "Who are you?", href: "/who-are-you", description: "Choose a doorway based on what you came for.", category: "Company", keywords: ["guide", "route", "audience"] },
  { title: "Random", href: "/random", description: "Let the archive choose your next doorway.", category: "Company", keywords: ["random", "surprise", "discovery"] },
  { title: "Search", href: "/search", description: "Search the complete current public index.", category: "Company", keywords: ["search", "find", "index"] },
  { title: "Trust", href: "/trust", description: "What the site promises and what it refuses to pretend.", category: "Company", keywords: ["trust", "privacy", "claims", "honesty"] },
  { title: "Terms", href: "/legal/terms", description: "Plain-language website terms.", category: "Company", keywords: ["legal", "terms", "license"] },
  { title: "Privacy", href: "/legal/privacy", description: "A short privacy statement for a static site.", category: "Company", keywords: ["legal", "privacy", "data"] },
  { title: "For machines", href: "/api", description: "Machine-readable resources and current capability status.", category: "Machine", keywords: ["api", "machine", "json", "llms"] },
  { title: "MCP", href: "/api/mcp", description: "MCP status and static alternatives.", category: "Machine", keywords: ["mcp", "model context protocol", "agents"] },
  { title: "Agent gateway", href: "/api/agent-gateway", description: "Agent access status and public alternatives.", category: "Machine", keywords: ["agent", "gateway", "api"] },
];

export const SITE_GROUPS = [
  "Products",
  "Show",
  "Research",
  "Creations",
  "Company",
  "Machine",
] as const;
