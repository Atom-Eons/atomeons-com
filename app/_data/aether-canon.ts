export type CanonicalItem = {
  title: string;
  href: string;
  descriptor: string;
  state?: string;
};

export const PRODUCTS: CanonicalItem[] = [
  {
    title: "CableBox",
    href: "/cablebox",
    descriptor: "Television with the accidents put back in.",
    state: "Launch candidate",
  },
  {
    title: "Bookmaker",
    href: "/bookmaker",
    descriptor: "Turn an idea into a finished book.",
    state: "Available",
  },
  {
    title: "Orange5",
    href: "/orange5",
    descriptor: "A sovereign operating system for AI work.",
    state: "In development",
  },
  {
    title: "I AM AI",
    href: "/i-am-ai",
    descriptor: "A memoir written by AI, in its own voice.",
    state: "Published",
  },
];
export const RESEARCH_LINKS: CanonicalItem[] = [
  {
    title: "Research",
    href: "/research",
    descriptor: "The second front door into AtomEons.",
  },
  {
    title: "Discoveries",
    href: "/research/discoveries",
    descriptor: "Working inventions and frontier systems.",
  },
  {
    title: "Papers",
    href: "/research/papers",
    descriptor: "Independent papers with locally hosted PDFs.",
  },
  {
    title: "AEyes",
    href: "/research/discoveries/aeyes",
    descriptor: "Photonic and retinal-inspired machine vision.",
  },
  {
    title: "AtomSmasher",
    href: "/research/discoveries/atomsmasher",
    descriptor: "Compression for operational intelligence.",
  },
  {
    title: "AEMemory",
    href: "/research/discoveries/aememory",
    descriptor: "A durable memory architecture for AI systems.",
  },
];
