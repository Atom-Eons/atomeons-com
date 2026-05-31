import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "../../dynamic-world-pricing/PrintButton";

/**
 * /learn/cheatsheet — printable one-page AI reference card.
 *
 * Operator directive 2026-05-31 (pizza mode): industry-best /learn.
 * This is the wall-stickable / desk-pinned / share-with-a-friend artifact.
 * Optimized for browser Print → Save as PDF.
 */

export const metadata: Metadata = {
  title: "AI cheatsheet · printable one-pager · /learn · AtomEons",
  description:
    "One-page AI reference cheatsheet. Print it. Pin it. Share it. Which model for which task · the 7-part prompt structure · the verify rule · the AI lingo decoder · what to never paste. Free. No signup. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cheatsheet" },
  openGraph: {
    title: "AI cheatsheet · printable one-pager",
    description: "One-page AI reference. Print, pin, share. Free. CC-BY 4.0.",
    url: "https://atomeons.com/learn/cheatsheet",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI cheatsheet · printable one-pager",
    description: "One-page AI reference. Free. CC-BY 4.0.",
  },
  robots: { index: true, follow: true },
};

export default function CheatsheetPage() {
  return (
    <main className="cheatsheet-doc relative z-10 bg-black text-[#F2F4F5]">
      {/* Print-optimized CSS */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, .cheatsheet-doc {
            background: white !important;
            color: black !important;
          }
          .cheat-page {
            break-after: page;
            padding: 0 !important;
            background: white !important;
          }
          .cheat-card {
            border: 1px solid #ccc !important;
            background: #fafafa !important;
            color: black !important;
            box-shadow: none !important;
          }
          .cheat-h1, .cheat-h2, .cheat-h3, .cheat-h4, .cheat-p, .cheat-li {
            color: black !important;
          }
          .cheat-accent { color: #007a6c !important; }
          .cheat-warn { color: #b04f00 !important; }
          @page { size: letter; margin: 0.5in; }
        }
      `}</style>

      {/* PRINT BUTTON · screen only */}
      <div className="no-print sticky top-0 z-20 border-b border-[#1A2225] bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
            <span className="text-[#1A2225]">/</span>{" "}
            <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
            <span className="text-[#1A2225]">/</span> Cheatsheet
          </p>
          <PrintButton />
        </div>
      </div>

      {/* CHEATSHEET PAGE 1 */}
      <section className="cheat-page mx-auto w-full max-w-4xl px-6 py-12">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="cheat-h1 text-balance text-3xl font-medium tracking-tight md:text-4xl">
            <span className="cheat-accent text-[#22F0D5]">AI cheatsheet</span> · the one-pager
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            atomeons.com/learn/cheatsheet · CC-BY 4.0
          </p>
        </div>

        {/* WHICH MODEL FOR WHAT */}
        <div className="cheat-card mt-6 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6">
          <p className="cheat-h3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::which model for what · the short answer
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <ul className="cheat-li space-y-2 text-[13px] leading-[1.55]">
              <li><strong className="text-[#22F0D5]">Claude</strong> · long writing · code review · long-doc analysis · honest critique</li>
              <li><strong className="text-[#22F0D5]">ChatGPT</strong> · short tasks · variants · in-chat tools (interpreter, web)</li>
              <li><strong className="text-[#22F0D5]">Gemini</strong> · multimodal · 1M-token context · research-heavy work</li>
              <li><strong className="text-[#22F0D5]">Perplexity</strong> · live web grounding · current events · primary sources</li>
            </ul>
            <ul className="cheat-li space-y-2 text-[13px] leading-[1.55]">
              <li><strong className="text-[#FFB87A]">Ollama (local)</strong> · NDA / PHI / private data · offline · zero cloud exposure</li>
              <li><strong className="text-[#FFB87A]">Midjourney</strong> · highest-quality image generation · paid only</li>
              <li><strong className="text-[#FFB87A]">Whisper</strong> · audio → text transcription · open source, excellent</li>
              <li><strong className="text-[#FFB87A]">Wolfram</strong> · math verification · symbolic computation</li>
            </ul>
          </div>
        </div>

        {/* THE 7-PART PROMPT STRUCTURE */}
        <div className="cheat-card mt-4 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6">
          <p className="cheat-h3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::the 7-part prompt · use this shape for any serious task
          </p>
          <ol className="cheat-li mt-3 space-y-1.5 text-[13px] leading-[1.55] md:text-[14px]">
            <li><strong className="text-[#22F0D5]">1. ROLE</strong> — &ldquo;You are a senior X who has done this 100 times.&rdquo;</li>
            <li><strong className="text-[#22F0D5]">2. CONTEXT</strong> — what the situation is, what you already know, what the constraint is.</li>
            <li><strong className="text-[#22F0D5]">3. INPUT</strong> — paste the actual content (draft, code, data, transcript).</li>
            <li><strong className="text-[#22F0D5]">4. TASK</strong> — the specific thing you want done. Be exact.</li>
            <li><strong className="text-[#22F0D5]">5. SHAPE</strong> — output format: list, table, prose, JSON, length.</li>
            <li><strong className="text-[#22F0D5]">6. AUDIENCE</strong> — who reads the output. &ldquo;A skeptical board.&rdquo; &ldquo;A 12-year-old.&rdquo;</li>
            <li><strong className="text-[#22F0D5]">7. VOICE</strong> — &ldquo;Be direct. Skip the diplomatic version. No corporate-speak.&rdquo;</li>
          </ol>
        </div>

        {/* THE VERIFY RULE */}
        <div className="cheat-card mt-4 rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/40 p-5 md:p-6">
          <p className="cheat-h3 cheat-warn font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
            ::the verify rule · the only rule that matters
          </p>
          <p className="cheat-p mt-3 text-[14px] leading-[1.65] md:text-[15px]">
            <strong className="text-[#FFB87A]">AI hallucinates with confidence.</strong> Always verify:{" "}
            <strong>any</strong> citation · <strong>any</strong> medical, legal, financial advice ·{" "}
            <strong>any</strong> claim about current events · <strong>any</strong> piece of math.
            If the cost of being wrong is real (audit, lawsuit, harm, money), pull the source yourself.
          </p>
        </div>

        {/* NEVER PASTE */}
        <div className="cheat-card mt-4 rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/40 p-5 md:p-6">
          <p className="cheat-h3 cheat-warn font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
            ::never paste into cloud AI
          </p>
          <ul className="cheat-li mt-3 grid gap-1.5 text-[13px] leading-[1.55] md:grid-cols-2 md:text-[14px]">
            <li>○ Social Security numbers, passport, driver license</li>
            <li>○ Bank accounts, credit cards, routing numbers</li>
            <li>○ API keys, passwords, recovery codes, SSH keys</li>
            <li>○ Patient names + diagnoses (PHI / HIPAA)</li>
            <li>○ Client names + matter facts (privileged)</li>
            <li>○ Customer PII, addresses, phone numbers, emails</li>
            <li>○ Trade secrets, unannounced product, source code under NDA</li>
            <li>○ Employee performance / HR / IEP records</li>
          </ul>
          <p className="cheat-p mt-3 text-[12px] leading-[1.5] text-[#9BA5A7] md:text-[13px]">
            For any of the above, use local Ollama or your facility&apos;s vetted internal LLM only.
          </p>
        </div>
      </section>

      {/* CHEATSHEET PAGE 2 */}
      <section className="cheat-page mx-auto w-full max-w-4xl px-6 py-12">
        <h2 className="cheat-h2 text-balance text-2xl font-medium tracking-tight md:text-3xl">
          <span className="cheat-accent text-[#22F0D5]">Cheatsheet</span> · page 2 · prompts + lingo
        </h2>

        {/* THE 10 PROMPTS YOU'LL USE FOREVER */}
        <div className="cheat-card mt-6 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6">
          <p className="cheat-h3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::10 prompts that work forever
          </p>
          <ol className="cheat-li mt-3 space-y-2 text-[13px] leading-[1.6]">
            <li><strong className="text-[#22F0D5]">1.</strong> &ldquo;Give me 3 versions, across [register A / B / C]. Tell me which to ship and why.&rdquo;</li>
            <li><strong className="text-[#22F0D5]">2.</strong> &ldquo;Don&apos;t answer yet. Outline first. I&apos;ll approve, then you write.&rdquo;</li>
            <li><strong className="text-[#22F0D5]">3.</strong> &ldquo;Critique this like a hostile senior. Skip the diplomatic version.&rdquo;</li>
            <li><strong className="text-[#22F0D5]">4.</strong> &ldquo;What am I not asking that I should be?&rdquo;</li>
            <li><strong className="text-[#22F0D5]">5.</strong> &ldquo;Explain it: like I&apos;m 12 / like I&apos;m a grad student / like a textbook worked example.&rdquo;</li>
            <li><strong className="text-[#22F0D5]">6.</strong> &ldquo;What&apos;s the strongest argument for the option I&apos;m NOT picking?&rdquo;</li>
            <li><strong className="text-[#22F0D5]">7.</strong> &ldquo;Where in this would a skeptical reviewer push back?&rdquo;</li>
            <li><strong className="text-[#22F0D5]">8.</strong> &ldquo;Quiz me on this. Withhold the answers until I commit.&rdquo;</li>
            <li><strong className="text-[#22F0D5]">9.</strong> &ldquo;What&apos;s the trap most people fall into with this kind of task?&rdquo;</li>
            <li><strong className="text-[#22F0D5]">10.</strong> &ldquo;Be direct. I want to know what would embarrass me at [my high-bar peer audience].&rdquo;</li>
          </ol>
        </div>

        {/* AI LINGO DECODER */}
        <div className="cheat-card mt-4 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6">
          <p className="cheat-h3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::AI lingo · the words you keep hearing
          </p>
          <div className="cheat-li mt-3 grid gap-x-6 gap-y-2 text-[12px] leading-[1.5] md:grid-cols-2 md:text-[13px]">
            <p><strong className="text-[#22F0D5]">Token</strong> · roughly 0.75 of an English word. Models charge per token.</p>
            <p><strong className="text-[#22F0D5]">Context window</strong> · how much input the model can &ldquo;see&rdquo; at once. 200K+ now common.</p>
            <p><strong className="text-[#22F0D5]">Hallucination</strong> · the model makes up something plausible-sounding but false.</p>
            <p><strong className="text-[#22F0D5]">RAG</strong> · feeding the model documents at query time instead of training on them.</p>
            <p><strong className="text-[#22F0D5]">Embedding</strong> · numeric representation of meaning; used for semantic search.</p>
            <p><strong className="text-[#22F0D5]">Fine-tune</strong> · further-train a base model on your specific data. Often unnecessary.</p>
            <p><strong className="text-[#22F0D5]">Prompt engineering</strong> · the craft of getting good output from a prompt.</p>
            <p><strong className="text-[#22F0D5]">Chain-of-thought</strong> · ask the model to reason step-by-step before answering.</p>
            <p><strong className="text-[#22F0D5]">Agent</strong> · model + tools + a loop. Can take actions, not just respond.</p>
            <p><strong className="text-[#22F0D5]">MCP</strong> · Model Context Protocol. Standard way to give models tool access.</p>
            <p><strong className="text-[#22F0D5]">Temperature</strong> · how random the output is. Lower = more deterministic.</p>
            <p><strong className="text-[#22F0D5]">System prompt</strong> · the instruction-set that runs before any user message.</p>
            <p><strong className="text-[#22F0D5]">BYOK</strong> · Bring Your Own Key. You pay providers directly; no markup.</p>
            <p><strong className="text-[#22F0D5]">Local model</strong> · runs on your computer (Ollama, LM Studio). Zero cloud.</p>
          </div>
        </div>

        {/* COSTS REAL CHECK */}
        <div className="cheat-card mt-4 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6">
          <p className="cheat-h3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::cost reality check (June 2026)
          </p>
          <ul className="cheat-li mt-3 space-y-1.5 text-[13px] leading-[1.55]">
            <li>▲ Free tier of Claude / ChatGPT / Gemini covers ~80% of daily-use cases for one human.</li>
            <li>▲ Paid Claude ($20/mo) and ChatGPT Plus ($20/mo) raise the daily-cap meaningfully. Pick one — you don&apos;t need both.</li>
            <li>▲ Pay-per-token via API: $3-$15 per 1M input tokens. Heavy daily use, BYOK is cheaper than subscription.</li>
            <li>▲ Local Ollama: free forever, ~70% of frontier quality. Worth it for privacy alone.</li>
            <li>▲ Subscription stacking ($260+/mo across 4 tools) is the most-common waste in 2026.</li>
          </ul>
        </div>

        {/* WHEN TO STOP */}
        <div className="cheat-card mt-4 rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/40 p-5 md:p-6">
          <p className="cheat-h3 cheat-warn font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
            ::when to put the AI down
          </p>
          <ul className="cheat-li mt-3 space-y-1.5 text-[13px] leading-[1.55]">
            <li>○ When you&apos;ve been prompting for 20+ minutes on a thing that should take 5. The prompt is wrong, not the model.</li>
            <li>○ When the AI keeps agreeing with you. Switch to a different model OR ask &ldquo;steelman the opposite.&rdquo;</li>
            <li>○ When you&apos;re using AI to avoid a hard human conversation. That&apos;s yours.</li>
            <li>○ When the decision is irreversible (legal · medical · financial · relationship). Pull a human expert.</li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-[#1A2225] pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <p>::AtomEons · /learn/cheatsheet · CC-BY 4.0 · share freely</p>
          <p>atomeons.com</p>
        </div>
      </section>

      {/* SCREEN-ONLY · cross-links */}
      <section className="no-print bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::print it · pin it · share it
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Hit print. Save as PDF. Pin to the wall.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrintButton />
            <Link
              href="/learn/playbooks"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              the job-by-job playbooks →
            </Link>
            <Link
              href="/learn/decision-tree"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              the decision tree →
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              ← back to /learn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
