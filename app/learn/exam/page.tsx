import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exam · self-assessment · find your AI literacy level",
  description:
    "Self-paced AI literacy self-assessment. 25 questions across the 5 levels (Novice → Pilot). No credentials issued, no email gate. Find your honest level and the next lesson to graduate it.",
  alternates: { canonical: "https://atomeons.com/learn/exam" },
};

/**
 * /learn/exam — self-assessment surface.
 *
 * Operator-stated rule: AtomEons does not award certificates. The exam
 * is a self-paced rubric. Honest self-scoring against the 5-level
 * ladder helps the learner pick the right next lesson without
 * institutional gating.
 */

type Question = {
  q: string;
  level: "Novice" | "Learner" | "User" | "Operator" | "Pilot";
};

const QUESTIONS: Question[] = [
  // Novice (5)
  { q: "Can you describe in plain English what a large language model is, without using the word 'AI'?", level: "Novice" },
  { q: "Do you understand that an LLM does not retrieve information from a database — it generates text based on training?", level: "Novice" },
  { q: "Can you explain why two identical prompts can return different answers?", level: "Novice" },
  { q: "Do you know the difference between a 'free' LLM (ChatGPT free tier) and a 'paid' LLM (ChatGPT Plus or Claude Pro)?", level: "Novice" },
  { q: "Have you successfully gotten an LLM to do something useful for you that wasn't 'hello, please respond'?", level: "Novice" },

  // Learner (5)
  { q: "Can you explain what a 'context window' is and roughly how big it is for the model you most use?", level: "Learner" },
  { q: "Do you know what a 'system prompt' is and how it differs from your user prompt?", level: "Learner" },
  { q: "Have you used a 'few-shot' approach where you include examples in your prompt before the actual ask?", level: "Learner" },
  { q: "Can you explain why an LLM hallucinates and at least one strategy to reduce that?", level: "Learner" },
  { q: "Have you compared the same task on at least 2 different LLMs (e.g. Claude vs ChatGPT) and noted the differences?", level: "Learner" },

  // User (5)
  { q: "Have you used an LLM via API (not just chat UI) and received structured output back?", level: "User" },
  { q: "Can you forcibly constrain a model to return strict JSON, and recover when it doesn't?", level: "User" },
  { q: "Have you used retrieval-augmented generation (RAG) on your own data — even via a paid tool?", level: "User" },
  { q: "Do you know what 'temperature' and 'top_p' parameters do and roughly when to vary them?", level: "User" },
  { q: "Can you explain the difference between a 'completion' model and a 'chat' model in 30 seconds?", level: "User" },

  // Operator (5)
  { q: "Have you built (not just used) a multi-step LLM workflow with branching logic?", level: "Operator" },
  { q: "Do you know what an embedding is, and have you computed cosine similarity between two of them?", level: "Operator" },
  { q: "Have you set up Claude Desktop or similar with at least one MCP server?", level: "Operator" },
  { q: "Have you intentionally tested a prompt injection attack against a model you control, and shipped a defense?", level: "Operator" },
  { q: "Have you measured the COST per query of a real-world LLM workflow and tracked it over time?", level: "Operator" },

  // Pilot (5)
  { q: "Have you fine-tuned (or LoRA-tuned) a model on a domain-specific dataset and shipped the result?", level: "Pilot" },
  { q: "Have you built a public eval harness that compares 3+ frontier models on a task you defined?", level: "Pilot" },
  { q: "Can you explain (in plain English) what attention does in a transformer, with diagrams?", level: "Pilot" },
  { q: "Have you read a primary-source AI paper (arXiv, Anthropic, OpenAI blog) and could you defend its findings in conversation?", level: "Pilot" },
  { q: "Have you shipped an AI-augmented product to paying users and dealt with the operational consequences (outages, edge cases, user complaints)?", level: "Pilot" },
];

const LEVEL_INFO: Record<Question["level"], { color: string; what: string; nextLesson: string }> = {
  Novice: { color: "#9CA3AF", what: "Brand new to AI. Curious. Has tried ChatGPT once or twice.", nextLesson: "/start · 11-minute on-ramp" },
  Learner: { color: "#22F0D5", what: "Can use AI casually. Has not yet built anything with it.", nextLesson: "/learn/[persona]/worker" },
  User: { color: "#22F0D5", what: "Builds with AI weekly. Knows the basics but not the depth.", nextLesson: "/learn/synthesis · minimum-effective-dose pages" },
  Operator: { color: "#C9A55C", what: "Ships AI features. Operates AI in production. Reads papers occasionally.", nextLesson: "/learn/atlas · deep technical dives" },
  Pilot: { color: "#FF4D4D", what: "Frontier capability. Builds the next layer of AI tools, doesn't just use them.", nextLesson: "/research/decoded · primary-source paper canon" },
};

export default function ExamPage() {
  const byLevel: Record<Question["level"], Question[]> = { Novice: [], Learner: [], User: [], Operator: [], Pilot: [] };
  QUESTIONS.forEach((q) => byLevel[q.level].push(q));

  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ exam · self-assessment</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Find your honest level.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            25 questions across the 5 levels. Count the questions you can
            answer YES to. The highest level where you score 4/5 or
            better is your honest current level. The lesson that
            graduates you to the next level is named at the bottom of
            each section.
          </p>
          <div className="mt-8 border-l-2 border-[#FF4D4D] bg-[#0B0C0F] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ no credentials issued</p>
            <p className="mt-3 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              AtomEons does not award certificates or badges. This is a self-paced
              rubric for finding your honest skill level. The integrity of
              your score depends on whether you actually do what you claim
              you do.
            </p>
          </div>
        </div>
      </section>

      {(Object.keys(byLevel) as Question["level"][]).map((level) => {
        const info = LEVEL_INFO[level];
        return (
          <section key={level} className="border-b border-[#1F242B]">
            <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: info.color }}>§ {level.toUpperCase()} · level rubric</p>
              <p className="mt-4 font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{info.what}</p>

              <ol className="mt-8 space-y-3">
                {byLevel[level].map((q, i) => (
                  <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">Q{String(i + 1)}</span>
                    <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{q.q}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-t border-[#1F242B] pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">if 4/5 ✓ — your level is at least {level}</p>
                <Link href={info.nextLesson.split(" ·")[0]} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">
                  next → {info.nextLesson}
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ continue</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { href: "/learn", label: "Back to curriculum" },
              { href: "/learn/labs", label: "Hands-on labs" },
              { href: "/learn/projects", label: "Build-along projects" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
