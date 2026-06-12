import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects · build-along AI projects · AtomEons",
  description:
    "Build-along AI projects. Each one ships a real artifact you can deploy, demo, or sell. Mapped to the 5-level ladder and to specific operator goals.",
  alternates: { canonical: "https://atomeons.com/learn/projects" },
};

type Project = {
  slug: string;
  title: string;
  level: "Learner" | "User" | "Operator" | "Pilot";
  scope: string;
  stack: string[];
  description: string;
  ships: string;
};

const PROJECTS: Project[] = [
  {
    slug: "personal-rag",
    title: "Personal-RAG over your own notes",
    level: "User",
    scope: "Weekend (8-12 hours)",
    stack: ["Python", "OpenAI/Gemini/Anthropic API (BYO)", "Chroma or pgvector", "FastAPI optional"],
    description: "Index your Obsidian / Notion / markdown directory. Build a /ask endpoint over your own writing. Query it from the terminal or via a tiny web UI.",
    ships: "A working personal-RAG service running locally on your machine + a script to refresh the index.",
  },
  {
    slug: "decision-helper",
    title: "Domain-specific decision helper",
    level: "User",
    scope: "Weekend (8-12 hours)",
    stack: ["Claude or ChatGPT API", "Decision-tree prompt template", "Output JSON schema"],
    description: "Pick a domain (which loan? which apartment? which JD? which credit card?). Build a structured prompt that takes 5-10 inputs and returns a ranked recommendation with reasoning.",
    ships: "A CLI / web page you can demo to a friend. Real outputs they trust.",
  },
  {
    slug: "transcript-pipeline",
    title: "Meeting/podcast transcript → key-decisions extractor",
    level: "User",
    scope: "Weekend (8-12 hours)",
    stack: ["Whisper (local) or AssemblyAI", "LLM summarizer", "Markdown output"],
    description: "Drop in an .mp3. Get back a structured markdown with named speakers, key decisions, action items, and the original quotes that anchor each decision.",
    ships: "A Bash script (or web tool) that takes audio in, returns publishable notes out.",
  },
  {
    slug: "code-review-bot",
    title: "Code-review bot for your own repo",
    level: "Operator",
    scope: "Week (16-24 hours)",
    stack: ["GitHub Actions", "Claude API", "Operator-tunable rubric", "PR comment formatter"],
    description: "Triggered on PR open. Calls Claude with the diff + a tunable rubric (security · readability · test-coverage). Posts a comment with the findings. Operator can revise the rubric without touching code.",
    ships: "A GitHub Action you can drop into any repo. Real reviews on every PR.",
  },
  {
    slug: "fine-tuned-classifier",
    title: "Fine-tuned tiny classifier",
    level: "Pilot",
    scope: "Week (16-24 hours)",
    stack: ["Python", "Hugging Face transformers", "PEFT / LoRA", "Apple Silicon or single GPU"],
    description: "Pick a binary or multi-class task. Collect 500 ground-truth examples. LoRA-fine-tune a 7B base. Compare to base + to GPT-4o-mini few-shot. Publish the eval and the LoRA weights.",
    ships: "A fine-tuned model running locally, an eval harness, and a write-up worth blogging.",
  },
  {
    slug: "agent-pipeline",
    title: "Agentic multi-step workflow",
    level: "Pilot",
    scope: "Week (20-30 hours)",
    stack: ["Claude Code OR Claude Desktop + MCP servers", "Tool-use schemas", "Receipt logging"],
    description: "Build a real agent that does multi-step work: research a topic, write a draft, fact-check it, suggest edits, output final markdown. Receipt every step.",
    ships: "An agent harness you can show off, and a receipts file proving every step was deterministic.",
  },
  {
    slug: "eval-harness",
    title: "Public eval harness for one model task",
    level: "Pilot",
    scope: "Week (20-30 hours)",
    stack: ["Python", "Pydantic eval schemas", "5 LLM providers", "Markdown report"],
    description: "Pick one specific task that matters (legal-clause-extraction, code-bug-detection, recipe-summarization). Collect 100+ ground-truth examples. Run 5 frontier LLMs against them. Publish the eval, the harness, and the leaderboard.",
    ships: "A reproducible eval that earns attention. Real numbers, not vibes.",
  },
];

const LEVEL_COLOR: Record<Project["level"], string> = {
  Learner: "#22F0D5",
  User: "#22F0D5",
  Operator: "#C9A55C",
  Pilot: "#FF4D4D",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ projects · build-along artifacts</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Ship the artifact, learn the lesson.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Seven projects across the upper four levels. Each one ships a
            real artifact you can deploy, demo, or sell. Scoped to one
            weekend or one week, not one quarter.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <ol className="space-y-8">
            {PROJECTS.map((p, i) => (
              <li key={p.slug} className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#1F242B] pb-4">
                  <div className="flex items-baseline gap-4">
                    <p className="font-mono text-[11px] tabular-nums text-[#7a818a]">PROJ-{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="font-serif text-[24px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.title}</h2>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: LEVEL_COLOR[p.level] }}>{p.level}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{p.scope}</p>
                  </div>
                </div>
                <p className="mt-4 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <p key={s} className="border border-[#1F242B] bg-[#08090B] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">{s}</p>
                  ))}
                </div>
                <p className="mt-5 border-t border-[#1F242B] pt-4 font-serif text-[14px] italic leading-[1.55] text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  ships → {p.ships}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {[
              { href: "/learn", label: "Back to curriculum" },
              { href: "/learn/labs", label: "Hands-on labs" },
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
