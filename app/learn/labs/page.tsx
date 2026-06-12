import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Labs · hands-on AI exercises · AtomEons",
  description:
    "Hands-on AI labs. Browser-runnable exercises and copy-paste prompt drills mapped to each level (Novice → Pilot). Real artifacts, not theory.",
  alternates: { canonical: "https://atomeons.com/learn/labs" },
};

type Lab = {
  slug: string;
  title: string;
  level: "Novice" | "Learner" | "User" | "Operator" | "Pilot";
  time: string;
  description: string;
  hosted: "in-browser" | "copy-paste drill" | "external tool" | "your editor";
  status: "live" | "queued";
};

const LABS: Lab[] = [
  {
    slug: "first-prompt",
    title: "Your first deliberate prompt",
    level: "Novice",
    time: "8 min",
    description: "Write the same request three ways (telegraphic, conversational, role-played). Compare what each version produces. Calibrate to which style fits which task.",
    hosted: "copy-paste drill",
    status: "live",
  },
  {
    slug: "context-window-walk",
    title: "Walk the context window",
    level: "Learner",
    time: "12 min",
    description: "Paste a long document into Claude. Find where the model 'forgets' the start. Map your model's effective context vs nominal.",
    hosted: "copy-paste drill",
    status: "live",
  },
  {
    slug: "system-vs-user",
    title: "System prompt vs user prompt",
    level: "Learner",
    time: "10 min",
    description: "Build the same task with system instructions vs user instructions. See which the model treats as more authoritative.",
    hosted: "copy-paste drill",
    status: "live",
  },
  {
    slug: "json-shape-discipline",
    title: "JSON shape discipline",
    level: "User",
    time: "15 min",
    description: "Force a model to return structured JSON. Discover when it complies, when it improvises, and how to constrain it cleanly.",
    hosted: "copy-paste drill",
    status: "live",
  },
  {
    slug: "few-shot-budget",
    title: "Few-shot budget",
    level: "User",
    time: "20 min",
    description: "Test the same task with 0, 1, 3, 5, 10 examples. Find the inflection point where adding more stops helping.",
    hosted: "copy-paste drill",
    status: "live",
  },
  {
    slug: "rag-with-ask",
    title: "RAG using /api/ask",
    level: "Operator",
    time: "25 min",
    description: "Hit atomeons.com/api/ask with three questions. Inspect the sources returned. Compare to what a vanilla model says without retrieval.",
    hosted: "in-browser",
    status: "live",
  },
  {
    slug: "embed-and-cluster",
    title: "Embed and cluster",
    level: "Operator",
    time: "30 min",
    description: "Use /api/embed to vectorize 20 short texts. Compute cosine sim in 10 lines of Python. See semantic similarity in action.",
    hosted: "your editor",
    status: "live",
  },
  {
    slug: "prompt-injection-defense",
    title: "Prompt injection · attacker and defender",
    level: "Operator",
    time: "30 min",
    description: "Write three prompt injection attacks and three defenses. Test each combination. Map where prompts protect and where they don't.",
    hosted: "copy-paste drill",
    status: "live",
  },
  {
    slug: "chain-three-tools",
    title: "Chain three tools",
    level: "Pilot",
    time: "45 min",
    description: "Use MCP / Claude Desktop to chain filesystem read → web fetch → file write in one operator-approved sequence. Audit the receipts.",
    hosted: "your editor",
    status: "queued",
  },
  {
    slug: "build-an-eval",
    title: "Build a real eval",
    level: "Pilot",
    time: "60 min",
    description: "Pick a model task. Write 20 ground-truth examples. Score five models against them. Publish the eval as JSON.",
    hosted: "your editor",
    status: "queued",
  },
  {
    slug: "compress-context",
    title: "Compress your own context",
    level: "Pilot",
    time: "45 min",
    description: "Take a 50K-token conversation. Manually compress to <10K while preserving all decisions. Compare against ORANGEBOX's Crystal Lattice Compression.",
    hosted: "your editor",
    status: "queued",
  },
  {
    slug: "fine-tune-tiny",
    title: "Fine-tune a tiny model on your laptop",
    level: "Pilot",
    time: "90 min",
    description: "LoRA-fine-tune a 7B parameter model on a 100-row dataset using Apple Silicon or a single GPU. Compare base vs tuned outputs.",
    hosted: "your editor",
    status: "queued",
  },
];

const LEVEL_COLOR: Record<Lab["level"], string> = {
  Novice: "#9CA3AF",
  Learner: "#22F0D5",
  User: "#22F0D5",
  Operator: "#C9A55C",
  Pilot: "#FF4D4D",
};

export default function LabsPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ labs · hands-on exercises</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Stop reading. Start doing.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Twelve hands-on labs across the five levels. Most run as copy-
            paste drills against Claude or ChatGPT. Some hit live lab
            endpoints (/api/ask, /api/embed). All produce a real
            artifact you keep.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <ol className="space-y-5">
            {LABS.map((l, i) => (
              <li key={l.slug} className="border border-[#1F242B] bg-[#0F1114] p-5 md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <p className="font-mono text-[11px] tabular-nums text-[#7a818a]">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="font-serif text-[22px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.title}</h2>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: LEVEL_COLOR[l.level] }}>{l.level}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{l.time}</p>
                    {l.status === "queued" ? (
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">QUEUED</p>
                    ) : null}
                  </div>
                </div>
                <p className="mt-3 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.description}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">runs · {l.hosted}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {[
              { href: "/learn", label: "Back to curriculum" },
              { href: "/learn/projects", label: "Build-along projects" },
              { href: "/learn/exam", label: "Self-assessment" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
