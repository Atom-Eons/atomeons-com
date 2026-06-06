import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dear reader · long-form letters from AtomEons",
  description:
    "Letters from Atom McCree. Different in register from Founder's View — slower, more personal, less daily. Read at your own pace.",
  alternates: { canonical: "https://atomeons.com/dear-reader" },
};

/**
 * /dear-reader — long-form personal letters.
 *
 * Different in register from /founders-view (which is nightly + tighter).
 * These are the longer, less-daily letters — the ones where the
 * operator can actually slow down and talk to a specific named reader,
 * or to readers who arrived through a particular door.
 *
 * Posted irregularly. No promise of cadence. When there's something
 * worth writing at this length, it goes here.
 */

type Letter = {
  slug: string;
  to: string;
  date: string;
  title: string;
  excerpt: string;
  wordCount: number;
};

const LETTERS: Letter[] = [
  {
    slug: "to-the-skeptic-who-says-claude-isnt-real",
    to: "the skeptic who says Claude isn't real",
    date: "2026-06-05",
    title: "To the skeptic who says Claude isn't real",
    excerpt:
      "You're not wrong that there's no 'someone home' in the way you experience yourself. You're wrong that this changes the operational question of whether the conversation altered your week. The book I AM AI sits between those two answers.",
    wordCount: 1340,
  },
  {
    slug: "to-the-teenager-who-thinks-its-too-late",
    to: "the teenager who thinks it's too late",
    date: "2026-05-28",
    title: "To the teenager who thinks it's too late to learn this",
    excerpt:
      "If you have a $200 Chromebook, an internet connection, and three free hours a week, you are now ahead of every PhD I knew in 2005. The free knowledge already won. Your job is to actually open it.",
    wordCount: 920,
  },
  {
    slug: "to-the-corporate-buyer-asking-for-a-demo",
    to: "the corporate buyer asking for a demo",
    date: "2026-05-18",
    title: "To the corporate buyer asking for a demo",
    excerpt:
      "The demo IS the site. /receipts is the audit ledger. /transparency is the financials. ORANGEBOX has a free preview week. If you need a slide deck on top of that, the deck would only paraphrase what's already openable here, and I should not bill you for paraphrase.",
    wordCount: 680,
  },
  {
    slug: "to-the-other-one-operator-lab",
    to: "the other one-operator AI lab",
    date: "2026-05-04",
    title: "To the other one-operator lab thinking about this",
    excerpt:
      "Your shipping rate is your only moat. Everything else — your stack, your design, your taste — competitors can reach in 18 months. Speed-of-iteration is what compounds. Optimize the lab not to think about anything else.",
    wordCount: 1180,
  },
  {
    slug: "to-the-reader-who-found-the-glossary-first",
    to: "the reader who found the glossary first",
    date: "2026-04-20",
    title: "To the reader who Googled an AI term and landed here",
    excerpt:
      "Welcome. The glossary is the front door for a reason. If you want the next step, /start is the 11-minute on-ramp. If you want depth, /learn/atlas exists. If you just want the term, it's already on the page you came from.",
    wordCount: 540,
  },
];

export default function DearReaderPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ dear reader · long-form letters</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Letters that needed more room.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Different in register from /founders-view (nightly, tight).
            These are written when there is something to say to a specific
            named reader, at length, with patience. Posted irregularly.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <ol className="space-y-8">
            {LETTERS.map((l) => (
              <li key={l.slug} className="border-l-2 border-[#1F242B] pl-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">{l.date} · {l.wordCount.toLocaleString()} words</p>
                <h2 className="mt-3 font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {l.title}
                </h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">to · {l.to}</p>
                <p className="mt-4 font-serif text-[17px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  &ldquo;{l.excerpt}&rdquo;
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                  forthcoming · /dear-reader/{l.slug}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {[
              { href: "/founders-view", label: "Founder's View · nightly broadcast" },
              { href: "/correspondence", label: "Correspondence · email replies" },
              { href: "/press", label: "Press · media inquiries" },
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
