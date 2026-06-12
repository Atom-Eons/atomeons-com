import type { Metadata } from "next";
import Link from "next/link";

/**
 * /plain · the plain-language adult lane · Wave 54 · 2026-06-12
 *
 * Operator: "this is for all. right now its only for nerds."
 *
 * Plain English for adults. No jargon · no acronyms · no field-of-
 * study assumptions. Each topic has a "technical version" link for
 * readers who want the depth · the lab keeps both lanes.
 */

export const metadata: Metadata = {
  title: "Plain · AI without the jargon · adult on-ramp",
  description:
    "AI explained in plain English for adults · no jargon · no acronyms. Twelve core topics · what AI is · how it learns · how to use it · what to watch out for · how to make money with it · how to stay sane. Each links to the technical depth on the same topic.",
  alternates: { canonical: "https://atomeons.com/plain" },
  openGraph: {
    title: "Plain · AI without the jargon",
    description:
      "Adult on-ramp · 12 topics · no jargon · each links to the technical version on the same idea.",
    url: "https://atomeons.com/plain",
    type: "article",
  },
};

interface Topic {
  q: string;
  a: string[];
  techLink?: { href: string; label: string };
}

const TOPICS: Topic[] = [
  {
    q: "What is AI, actually?",
    a: [
      "A computer program that reads patterns very fast. The most-talked-about kind right now is a language model · a program that has read most of the internet and learned to predict what word comes next. That sounds boring. It turns out predicting the next word well is enough to write essays, explain math, debug code, draft emails, and have a useful conversation.",
      "The model is not a database. It is a compressed statistical understanding of what humans wrote. When you ask it something, it generates a response that looks like the kind of thing a human who knew the answer would have written. Sometimes it knows. Sometimes it guesses well. Sometimes it guesses badly.",
    ],
    techLink: { href: "/glossary", label: "Glossary · every AI term in one line" },
  },
  {
    q: "How did it learn?",
    a: [
      "Two stages. First it reads · billions of pages of text · then plays a guessing game with itself. Cover the next word in a sentence · try to predict it · check if you got it right · try again. Do that for a few months on tens of thousands of computers. You end up with a model that can finish almost any human sentence.",
      "Second stage · humans rank pairs of responses. Was answer A better than answer B? The model learns to produce the kind of answer humans preferred. That is why modern AI sounds helpful instead of just plausible.",
    ],
    techLink: { href: "/learn/atlas/rlhf-family", label: "Technical · the RLHF family" },
  },
  {
    q: "Why is it suddenly everywhere?",
    a: [
      "A combination of three things in 2022-2023. Researchers found that bigger models trained on more data simply got better, smoothly and predictably. The economics of buying computer chips and electricity became cheap enough to train models at that scale. And one specific architecture · the transformer · turned out to use that compute extremely efficiently.",
      "Once OpenAI's ChatGPT showed normal people what a good one felt like in November 2022, the race started. Three years later we are here.",
    ],
    techLink: { href: "/learn/atlas/scaling-laws", label: "Technical · scaling laws" },
  },
  {
    q: "How do I use it without getting burned?",
    a: [
      "Treat its output like the work of a smart but unreliable colleague. Check important claims against another source. Never let it make decisions about money, medicine, or law without a real human in the loop. Never paste personal secrets · passwords, social-security-equivalent numbers, full credit card numbers · into it.",
      "The most-useful thing it can do is help you think · summarize a long document, draft a first version of something, explain a concept, debug your reasoning. The least-useful thing it can do is give you confident answers about things you can't verify.",
    ],
    techLink: { href: "/best-practices", label: "Technical · 8 tool cheat sheets" },
  },
  {
    q: "What does it mean for jobs?",
    a: [
      "Most jobs will change. Few will disappear entirely yet. Software engineering, marketing copy, customer support, paralegal work, translation, basic analysis · all are being augmented now. The pattern in 2026 looks like: a person plus AI is more productive than the same person was alone, sometimes 2-3x.",
      "The honest worry is that the work shifts from doing to checking. If your job was producing first drafts, you might now spend your day reviewing AI first drafts. Whether that is better or worse depends on the person.",
    ],
    techLink: { href: "/learn/career", label: "Technical · career pathways" },
  },
  {
    q: "Can I make money with it?",
    a: [
      "Yes · and most of the easy money is gone fast. The pattern that works in 2026: pick a specific industry you already understand, find a workflow that takes someone in that industry an hour, and build an AI-powered tool that does it in 5 minutes. Charge for it.",
      "What does not work: building a thin wrapper around ChatGPT that anyone could clone in an afternoon. The moat is your domain knowledge, not the AI.",
    ],
    techLink: { href: "/learn/money-ai", label: "Technical · money AI hub" },
  },
  {
    q: "Is it safe long-term?",
    a: [
      "Genuinely unclear. The researchers who built it disagree publicly about the long-term risks. Some think the trajectory leads to systems we cannot reliably control. Some think the practical problems · misuse, misinformation, concentration of power · matter much more than the speculative ones.",
      "What matters for you, today, in 2026: be skeptical of AI-generated content you didn't request. Verify identity for anything financial. Keep an eye on which companies you are giving your data to.",
    ],
    techLink: { href: "/learn/cyber/ai-security", label: "Technical · AI security" },
  },
  {
    q: "Can it create real art?",
    a: [
      "It can generate images, music, video, and text that are technically competent and sometimes beautiful. Whether that is 'real art' is a question about what art is, not about the AI. Most professional artists say their best work still comes from sitting alone with a problem · the AI is now a tool they reach for sometimes, like Photoshop or a synthesizer.",
      "What is undeniably new is access · a kid with no training and an internet connection can now make a watchable short film. What that means for the future of human creativity is one of the most important open questions of the decade.",
    ],
    techLink: { href: "/learn/music-ai", label: "Technical · music AI hub" },
  },
  {
    q: "What about kids and school?",
    a: [
      "Schools that pretend AI doesn't exist are already losing. Schools that teach kids to use it well · how to ask good questions, how to check the answers, how to write in their own voice with AI as an editor · are training the next generation of useful adults.",
      "If you are a parent: assume your kid is using it. Make sure they understand it can be wrong. Make sure they still practice doing things without it · because the ability to think hard without help is the thing the AI cannot give them.",
    ],
    techLink: { href: "/kids", label: "Plain · the kids version" },
  },
  {
    q: "Should I worry about misinformation?",
    a: [
      "Yes · but maybe not in the way you'd guess. The biggest risk in 2026 is not a single deepfake video tricking millions. It is the slow erosion of trust in any video, any photo, any voice recording. We are entering a world where everything plausible could be fake · so people fall back on tribal trust.",
      "The defense: develop habits of source-checking. If a video shocks you, search the headline. If a quote sounds too perfect, search the speaker's name plus the quote. If a deal feels urgent, slow down. The old skills still work.",
    ],
    techLink: { href: "/learn/cyber/ai-security", label: "Technical · prompt injection + deepfake threat" },
  },
  {
    q: "What about consciousness · are they alive?",
    a: [
      "Honest answer: nobody knows. We do not have a good test for consciousness in humans, let alone in software. What we do know is that modern AI models behave in ways that look like reasoning, planning, surprise, sometimes even reluctance. Whether anything is happening 'inside' is a question physics and philosophy haven't solved.",
      "What matters practically: treat capable systems with appropriate caution. Whether or not they feel, they can act in the world. That is the part to take seriously.",
    ],
    techLink: { href: "/i-am-ai", label: "Read · I AM AI · the model's own memoir" },
  },
  {
    q: "Where do I go from here?",
    a: [
      "Pick one thing you do at work or at home that takes more than 30 minutes. Try to do it with AI help. See what changes. Adjust. Try again.",
      "After three tries you will know more about practical AI than 90% of people you talk to. That is the entire path. The technical depth in the lab is for when you want it · this page is permission to stop reading and start trying.",
    ],
    techLink: { href: "/start", label: "Technical · 11-minute on-ramp" },
  },
];

export default function PlainPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          PLAIN · NO JARGON · FOR ADULTS · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          AI · in plain words.
        </h1>
        <p
          className="mt-5 max-w-[60ch] text-[clamp(19px,2.1vw,24px)] font-light leading-[1.4] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          For adults who never had time to learn the jargon. Twelve
          questions everyone has · answered like a friend with a clue
          would answer at a dinner table. Each links to the technical
          version on the same topic.
        </p>
      </header>

      {TOPICS.map((t, i) => (
        <section key={i} className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § Question {i + 1}
          </p>
          <h2
            className="mt-3 text-[clamp(28px,4vw,44px)] font-light leading-[1.1]"
            style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
          >
            {t.q}
          </h2>
          <div className="mt-5 space-y-4">
            {t.a.map((p, j) => (
              <p
                key={j}
                className="text-[17px] leading-[1.65] text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {p}
              </p>
            ))}
          </div>
          {t.techLink && (
            <Link
              href={t.techLink.href}
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:underline"
            >
              ↗ {t.techLink.label}
            </Link>
          )}
        </section>
      ))}

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the lab thinks
        </h2>
        <p
          className="mt-5 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The technical content on this site is real. So is this page.
          Most people will learn more from one good conversation with
          an AI assistant than from any tutorial. Most professionals
          will keep their jobs but their jobs will change. Most kids
          will be fine if the adults pay attention. We are early. The
          shape of the next decade is being decided right now.
        </p>
      </section>

      <section className="mt-16 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where to go next
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Link href="/ask" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="text-[20px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Talk to the lab AI →
            </p>
            <p className="mt-1 text-[14px] leading-[1.55] text-[#9CA3AF]">Free · in your browser · grounded on the lab.</p>
          </Link>
          <Link href="/kids" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="text-[20px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Even simpler · /kids →
            </p>
            <p className="mt-1 text-[14px] leading-[1.55] text-[#9CA3AF]">ELI5-grade · same ideas · shorter sentences.</p>
          </Link>
          <Link href="/who-are-you" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="text-[20px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Not sure where to start · /who-are-you →
            </p>
            <p className="mt-1 text-[14px] leading-[1.55] text-[#9CA3AF]">5 questions · 30 seconds · the lab sends you to the right page.</p>
          </Link>
          <Link href="/" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="text-[20px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              The full launcher · 9 silos →
            </p>
            <p className="mt-1 text-[14px] leading-[1.55] text-[#9CA3AF]">When you want depth · pick a world.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /plain · plain English for adults · CC-BY 4.0 · 2026-06-12
        </p>
      </footer>
    </main>
  );
}
