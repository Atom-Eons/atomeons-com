export type Discovery = {
  slug: "aeyes" | "atomsmasher" | "aememory";
  name: string;
  displayName: string;
  category: string;
  status: string;
  oneLine: string;
  proposition: string;
  description: string;
  principles: { label: string; value: string }[];
  evidence: string[];
  limits: string[];
  accent: string;
};

export const DISCOVERIES: Discovery[] = [
  {
    slug: "aeyes",
    name: "AEyes",
    displayName: "AEyes / Photonic Eyes",
    category: "Machine perception",
    status: "Research prototype",
    oneLine: "What if a machine could recognize an object from its visual signature instead of asking a giant model to guess?",
    proposition:
      "AEyes is an experimental visual identity system built from photon, retinal, geometric, and pattern measurements.",
    description:
      "The work explores a different path to machine vision: deterministic sensory measurements, compact signatures, explicit matching, and receipt-backed verdicts. It has a real physical front end and working recognition experiments. It is not yet human-grade vision.",
    principles: [
      { label: "Input", value: "Images transformed into photon and retinal-inspired measurements" },
      { label: "Method", value: "Deterministic features, signatures, geometry, and matching" },
      { label: "Output", value: "An identity verdict with an inspectable evidence trail" },
      { label: "Ambition", value: "Useful visual intelligence without a large generative model in the loop" },
    ],
    evidence: [
      "Implemented photon capture, retinal transform, physical photoreceptor, pattern engine, and graph modules.",
      "A July 2026 evaluation recorded 80% raw accuracy across a small 15-fixture set and 63% on the stricter rubric.",
      "The physical vision stage uses deterministic codec and retinal extractors with a Naka–Rushton response.",
    ],
    limits: [
      "The current prototype is not human-grade and does not claim to be.",
      "Earlier 95.1% figures measured near-duplicate index recall, not general object recognition.",
      "Hard negatives, shape, geometry, context, and end-to-end physical vision still need deeper validation.",
    ],
    accent: "#2558dc",
  },
  {
    slug: "atomsmasher",
    name: "AtomSmasher",
    displayName: "AtomSmasher Compression",
    category: "Intelligence infrastructure",
    status: "Experimental implementation",
    oneLine: "Intelligence gets more useful when the truth survives compression.",
    proposition:
      "AtomSmasher is an experimental compression compiler for turning sprawling project context into compact, operational intelligence.",
    description:
      "It treats compression as a systems problem, not a summary button. Text, project truth, decisions, actions, and receipts are translated into a smaller intermediate representation designed to preserve what an operator or agent needs next.",
    principles: [
      { label: "Input", value: "Documents, project state, decisions, actions, and receipts" },
      { label: "Method", value: "A compression compiler and compact intermediate representation" },
      { label: "Output", value: "Smaller operational context with traceable source truth" },
      { label: "Ambition", value: "Make capable AI systems cheaper, faster, and harder to confuse" },
    ],
    evidence: [
      "A versioned compression compiler and twelve advanced modules exist in the Orange5 source tree.",
      "The implementation includes focused AtomSmasher test and smoke commands.",
      "Operational theory, synthesis, and receipt doctrine are documented alongside the system.",
    ],
    limits: [
      "The system is experimental and its advantages are workload-dependent.",
      "It does not claim universal or lossless compression of intelligence.",
      "Public benchmarks and independent replication remain future work.",
    ],
    accent: "#f36b21",
  },
  {
    slug: "aememory",
    name: "AEMemory",
    displayName: "AEMemory",
    category: "Persistent intelligence",
    status: "Architecture in development",
    oneLine: "An AI should not become a stranger every time the window closes.",
    proposition:
      "AEMemory is a durable memory architecture for AI systems that separates immediate working state from long-lived operational truth.",
    description:
      "The design combines a dual-memory model, explicit memory tools, and a state-space approach intended to reduce dependence on an ever-growing prompt or KV cache. It is the memory spine being developed for the Orange family.",
    principles: [
      { label: "Input", value: "Conversations, work state, decisions, evidence, and durable facts" },
      { label: "Method", value: "Dual memory with explicit read, write, retrieval, and compression paths" },
      { label: "Output", value: "Continuity that can be inspected, corrected, and carried forward" },
      { label: "Ambition", value: "AI systems that remember the work without drowning in the transcript" },
    ],
    evidence: [
      "A canonical memory implementation and doctrine exist inside Orange5.",
      "The architecture specifies dual memory, explicit memory tools, and a state-space memory path.",
      "The system is integrated into the broader Orange5 operating theory.",
    ],
    limits: [
      "The steady-state daemon is not yet fully wired in the current Docker runtime.",
      "The public site presents an active architecture and implementation, not a finished standalone product.",
      "Long-horizon reliability and retrieval quality still require sustained evaluation.",
    ],
    accent: "#6d4ccf",
  },
];

export function getDiscovery(slug: string) {
  return DISCOVERIES.find((discovery) => discovery.slug === slug);
}
