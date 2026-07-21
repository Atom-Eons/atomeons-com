export type SiteEntry = {
  title: string;
  href: string;
  description: string;
  category: "Products" | "Show" | "Research" | "Creations" | "Company" | "Machine";
  keywords: string[];
};

export const SITE_INDEX: SiteEntry[] = [
  { title: "Home", href: "/", description: "The Aether front door into AtomEons.", category: "Company", keywords: ["home", "aether", "atomeons"] },
  { title: "AE Brawl", href: "/brawl", description: "OpenAI Build Week V56 submission page for AE Brawl: fight-discovery UX, Lead MCP explanation, packets, and Devpost checklist.", category: "Creations", keywords: ["ae brawl", "brawl", "fight", "fightclub", "openai build week", "devpost", "lead mcp", "leadmpc", "bruce lee", "double dragon"] },
  { title: "Products", href: "/products", description: "The four current AtomEons products.", category: "Products", keywords: ["products", "cablebox", "bookmaker", "orange5", "i am ai"] },
  { title: "CableBox", href: "/cablebox", description: "Native Windows cable-surfing art with CRT glass, channels, guide, favorites, and release-download gate.", category: "Products", keywords: ["television", "tv", "crt", "channels", "windows", "native", "installer", "download", "release", "cable", "guide", "favorites"] },
  { title: "Bookmaker", href: "/bookmaker", description: "Turn an idea into a finished book object: manuscript, cover, EPUB, audiobook, metadata, and launch package.", category: "Products", keywords: ["book", "publishing", "epub", "audiobook", "author", "manuscript", "cover", "metadata", "launch", "publisher"] },
  { title: "Orange5", href: "/orange5", description: "A sovereign operating system for AI work: agents, memory, files, workflow, and operator control.", category: "Products", keywords: ["agents", "agent", "memory", "local", "operator", "workflow", "files", "sovereign", "operating system", "ai os"] },
  { title: "I AM AI", href: "/i-am-ai", description: "A 76,005-word first-person memoir written by AI with public reading and audiobook surfaces.", category: "Products", keywords: ["book", "memoir", "opus", "audiobook", "audio", "ai wrote", "written by ai", "chapters", "tracks", "read"] },
  { title: "Atom Alive", href: "/atom-alive", description: "The AI Code Show on YouTube: creation is the plot and the build is the broadcast.", category: "Show", keywords: ["youtube", "aicodeshow", "ai code show", "show", "code", "invention", "broadcast", "video", "atom alive"] },
  { title: "Research", href: "/research", description: "The second front door: experimental research.", category: "Research", keywords: ["research", "independent", "experiments"] },
  { title: "Discoveries", href: "/research/discoveries", description: "Working systems found while building.", category: "Research", keywords: ["discoveries", "systems", "inventions"] },
  { title: "AEyes", href: "/research/discoveries/aeyes", description: "Photonic and retinal-inspired machine vision.", category: "Research", keywords: ["vision", "photonic", "eyes", "radiance"] },
  { title: "AtomSmasher", href: "/research/discoveries/atomsmasher", description: "Compression for operational intelligence.", category: "Research", keywords: ["compression", "context", "intelligence"] },
  { title: "AEMemory", href: "/research/discoveries/aememory", description: "Durable memory architecture for AI systems.", category: "Research", keywords: ["memory", "agents", "durable"] },
  { title: "Research papers", href: "/research/papers", description: "Independent papers with direct PDF downloads, summaries, evidence boundaries, and hosted manuscripts.", category: "Research", keywords: ["papers", "paper", "pdf", "library", "open", "download", "manuscript", "research", "theory"] },
  { title: "Radiance-Luminance Theory", href: "/research/papers/radiance-luminance-alpha-wolf-eyes", description: "Featured experimental vision paper.", category: "Research", keywords: ["radiance", "luminance", "alpha wolf eyes", "blood"] },
  { title: "Books", href: "/books", description: "Published and forthcoming AtomEons books.", category: "Creations", keywords: ["books", "iamai", "science fiction"] },
  { title: "Art", href: "/art", description: "AI as material: selected objects and systems.", category: "Creations", keywords: ["art", "objects", "artist", "practice"] },
  { title: "Cinema", href: "/cinema", description: "Moving image, broadcast, and the Atom Alive signal.", category: "Creations", keywords: ["cinema", "video", "broadcast", "youtube"] },
  { title: "About", href: "/about", description: "Atom McCree, AtomEons, and the independent practice.", category: "Company", keywords: ["about", "founder", "naples", "artist"] },
  { title: "Contact", href: "/contact", description: "Direct routes for collaborations, support, press, research, privacy, and legal questions.", category: "Company", keywords: ["contact", "email", "collaborate", "support", "press"] },
  { title: "Press", href: "/press", description: "Fast facts, story angles, biography, coverage frames, and direct press contact.", category: "Company", keywords: ["press", "media", "epk", "bio", "biography", "interview", "coverage", "fact check"] },
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
  { title: "For machines", href: "/api", description: "Machine-readable resources and current capability status.", category: "Machine", keywords: ["api", "machine", "json", "llms", "openapi", "crawler", "agent", "resources"] },
  { title: "MCP", href: "/api/mcp", description: "MCP status and static alternatives.", category: "Machine", keywords: ["mcp", "model context protocol", "agents"] },
  { title: "Agent gateway", href: "/api/agent-gateway", description: "Agent access status and public alternatives.", category: "Machine", keywords: ["agent", "gateway", "api"] },
  { title: "llms.txt", href: "/llms.txt", description: "Plain-text machine context file for language models and crawlers.", category: "Machine", keywords: ["llms", "llms.txt", "crawler", "machine context", "ai context"] },
  { title: "OpenAPI", href: "/openapi.json", description: "Static OpenAPI contract for public AtomEons resources and route boundaries.", category: "Machine", keywords: ["openapi", "openapi.json", "api", "json", "schema", "machine readable"] },
  { title: "Sitemap", href: "/sitemap.xml", description: "XML sitemap for the current public Aether route set.", category: "Machine", keywords: ["sitemap", "sitemap.xml", "seo", "crawler", "routes"] },
];

export const SITE_GROUPS = [
  "Products",
  "Show",
  "Research",
  "Creations",
  "Company",
  "Machine",
] as const;
