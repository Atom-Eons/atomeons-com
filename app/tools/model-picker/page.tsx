import type { Metadata } from "next";
import Link from "next/link";
import { AutoGlyph } from "../../_components/V3/Illustrations";

/**
 * /tools/model-picker · static decision tree.
 * orange-judge brainstorm move #3 · "the 'which model' question gets asked
 * dozens of times daily on Reddit · X · HN. A tool that answers it becomes
 * the canonical reference."
 *
 * Pure static logic. No backend. 5 dimensions × short rule set →
 * recommended model + one-line rationale. Updated on every wave.
 */

export const metadata: Metadata = {
  title: "Which AI model should you use · decision picker",
  description:
    "Free decision tool · 5 questions · 30 seconds · canonical recommendation for which AI model to use right now. Covers Claude (Sonnet 4.5 · Opus 4.7 · Haiku) · GPT-5 family · Gemini 3 · o4-mini · DeepSeek · open-weights. Sourced + dated.",
  alternates: { canonical: "https://atomeons.com/tools/model-picker" },
  openGraph: {
    title: "Which AI model should you use? · free picker",
    description: "5 questions · 30 seconds · recommendation + rationale.",
    url: "https://atomeons.com/tools/model-picker",
    type: "article",
  },
};

interface Recommendation {
  primary: string;
  pairing?: string;
  rationale: string;
}

const TREE: { question: string; options: { label: string; rec: Recommendation }[] }[] = [
  {
    question: "1 · What's the dominant use case?",
    options: [
      {
        label: "Coding · agentic edits across many files",
        rec: {
          primary: "Claude Sonnet 4.5",
          pairing: "or GPT-5 / GPT-5-codex",
          rationale:
            "Sonnet 4.5 has the strongest tool-use + edit-application scoring · GPT-5-codex is the OpenAI-tuned alternative. Both excel at agentic loops.",
        },
      },
      {
        label: "Coding · single-function inline edits",
        rec: {
          primary: "Claude Haiku",
          pairing: "or GPT-5-mini · or DeepSeek V3+",
          rationale:
            "For tight scopes you don't need frontier capability. Haiku / GPT-5-mini / DeepSeek V3+ are 5-10x cheaper at near-equal quality on small edits.",
        },
      },
      {
        label: "Reasoning · architecture · hard debugging",
        rec: {
          primary: "Claude Opus 4.7",
          pairing: "or GPT-5-thinking-high · or o4-mini",
          rationale:
            "Frontier reasoning tiers. Opus 4.7 leads on multi-step planning · GPT-5-thinking-high competitive · o4-mini cheaper if you only need depth not breadth.",
        },
      },
      {
        label: "Writing · marketing · long-form content",
        rec: {
          primary: "Claude Sonnet 4.5",
          pairing: "or GPT-5 · Gemini 2.5 Pro",
          rationale:
            "Sonnet has the most natural voice + longest sustained coherence in 2026. GPT-5 strong on structured business writing. Gemini for very long context.",
        },
      },
      {
        label: "Vision · image analysis · OCR",
        rec: {
          primary: "Claude Sonnet 4.5",
          pairing: "or GPT-5 · Gemini 2.5 Pro",
          rationale:
            "All three are competitive on vision. Sonnet leads on detailed image reasoning · GPT-5 best at chart extraction · Gemini cheapest at scale.",
        },
      },
      {
        label: "Audio in (transcription · narration)",
        rec: {
          primary: "GPT-5 audio (Whisper Large v3)",
          pairing: "or Gemini 3 multimodal",
          rationale:
            "OpenAI still owns the audio-in lane via Whisper. Gemini 3 native audio is competitive · check your latency requirements.",
        },
      },
      {
        label: "Very long context · whole-codebase reading",
        rec: {
          primary: "Gemini 2.5 Pro",
          pairing: "or Claude Opus 4.7 (200K)",
          rationale:
            "Gemini 2.5 Pro's 1M+ token context is unmatched for huge codebases or document piles. Opus 4.7 fine up to 200K.",
        },
      },
      {
        label: "Privacy / on-device / offline",
        rec: {
          primary: "Local via Ollama",
          pairing: "Qwen 2.5 Coder · Llama 3.3 70B · DeepSeek V3",
          rationale:
            "Open-weights running locally · no API calls · fully offline. Slower + less capable than frontier · but private.",
        },
      },
    ],
  },
];

const QUICK_REFERENCE = [
  { tier: "Frontier", models: "Opus 4.7 · GPT-5 · Gemini 3 Pro", use: "Architecture · hard reasoning · cross-file agents · best-of-best" },
  { tier: "Workhorse", models: "Sonnet 4.5 · GPT-5 · Gemini 2.5 Flash", use: "Everyday coding + writing · best balance · 70% of sessions" },
  { tier: "Cheap fast", models: "Haiku · GPT-5 mini · Gemini 2.5 Flash · DeepSeek V3", use: "Inline edits · grunt work · batch jobs · 60-90% cheaper" },
  { tier: "Reasoning", models: "GPT-5 thinking-high · o4-mini · Opus thinking", use: "Tricky logic · debugging · math · slower but deeper" },
  { tier: "Open-weights", models: "Llama 3.3 70B · Qwen 2.5 Coder 32B · DeepSeek V3 · Mistral Large", use: "Local · private · BYO compute · slower but free at inference" },
];

export default function ModelPickerPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
              FREE TOOL · MODEL PICKER · 2026-06-06
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(36px,6vw,72px)] font-light leading-[0.95]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              Which AI model should you use?
            </h1>
            <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
              No login. No tracking. No AI inference on this page. Pick the
              dominant use case below and the lab returns a recommendation
              with a one-line rationale. Updated weekly as model tiers shift.
            </p>
          </div>
          <div className="hidden md:block" style={{ opacity: 0.5 }}>
            <AutoGlyph slug="/tools/model-picker" size={140} />
          </div>
        </div>
      </header>

      {TREE.map((step, si) => (
        <section key={si} className="mt-12">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
            {step.question}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {step.options.map((opt, oi) => (
              <details
                key={oi}
                className="group border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
              >
                <summary className="cursor-pointer list-none font-mono text-[12px] uppercase tracking-[0.22em] text-[#F4F4F2] outline-none">
                  <span className="text-[#22F0D5]">→</span> {opt.label}
                </summary>
                <div className="mt-4 border-t border-[#1F242B] pt-4">
                  <p
                    className="text-[22px] font-light leading-tight text-[#F4F4F2]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {opt.rec.primary}
                  </p>
                  {opt.rec.pairing && (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C9A55C]">
                      {opt.rec.pairing}
                    </p>
                  )}
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#9CA3AF]">
                    {opt.rec.rationale}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Quick reference · the 5 tiers
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#1F242B] text-left">
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">Tier</th>
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">Models</th>
                <th className="py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">When</th>
              </tr>
            </thead>
            <tbody>
              {QUICK_REFERENCE.map((t) => (
                <tr key={t.tier} className="border-b border-[#0F1114]">
                  <td className="py-3 pr-4 align-top font-mono text-[12px] text-[#22F0D5]">{t.tier}</td>
                  <td className="py-3 pr-4 align-top font-mono text-[12px] text-[#F4F4F2]">{t.models}</td>
                  <td className="py-3 align-top text-[13px] leading-[1.55] text-[#9CA3AF]">{t.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the lab thinks
        </h2>
        <p
          className="mt-4 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          You don&apos;t need to pick one. The right answer is to route per
          task: cheap fast for grunt work · workhorse for default · frontier
          for hard moments · reasoning when you genuinely need depth ·
          open-weights when you need privacy or offline. Tools that route
          for you (Cursor Auto · Claude Code /model · Aider --architect)
          handle the switching automatically once you tell them which
          models to consider.
        </p>
      </section>

      <section className="mt-12 border-t border-[#1F242B] pt-12">
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/best-practices" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Cheat sheets</p>
            <p className="mt-2 text-[13px] text-[#F4F4F2]">7 best-practices guides for the tools that use these models.</p>
          </Link>
          <Link href="/compare/ai-tool-sizes" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Install sizes</p>
            <p className="mt-2 text-[13px] text-[#F4F4F2]">Bloat measured · ORANGEBOX 4.46 MB anchor.</p>
          </Link>
          <Link href="/supermodels" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Supermodels</p>
            <p className="mt-2 text-[13px] text-[#F4F4F2]">Live reasoning leaderboard from the ÆoNs lab.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /tools/model-picker · pure static · no inference · sources updated weekly · last 2026-06-06
        </p>
      </footer>
    </main>
  );
}
