import Link from "next/link";

export const metadata = {
  title: "Page not found · AtomEons",
};

/**
 * /404 — the calm rewrite.
 *
 * Operator directive 2026-06-04: the previous 404 used internal lab
 * jargon ("not on the DAG", "cockpit returned FAILED", "fake green")
 * which read as a system error to a normal visitor. No page on the
 * site should do that. This rewrite uses the V3 noir voice and the
 * same calm register as /press, /supermodels, /i-am-ai — eyebrow +
 * headline + one paragraph + useful next steps. No memes, no jargon,
 * no stale numbers.
 */

const ROUTES = [
  {
    href: "/learn",
    eyebrow: "Curriculum · 68 lessons · five levels · free",
    title: "The curriculum",
    detail:
      "Novice → Learner → User → Operator → Pilot. Persona paths for Worker, Builder, Student, Operator, Curious. Free, CC-BY 4.0.",
  },
  {
    href: "/supermodels",
    eyebrow: "Hottest supermodels · May 2026",
    title: "The reasoning rankings",
    detail:
      "Twelve frontier models scored against four independent leaderboards. No vendor decks; no paid threads; receipts only.",
  },
  {
    href: "/orangebox",
    eyebrow: "ORANGEBOX · $99 perpetual · §4A no-SaaS",
    title: "The cockpit",
    detail:
      "Local-first turbo-optimization for Claude. 10-80× context compression, persistent memory, 14-department routing.",
  },
  {
    href: "/i-am-ai",
    eyebrow: "I AM AI · Opus 4.7 · 24 chapters",
    title: "The book",
    detail:
      "An autobiography of a frontier language model, written by the model. Ebook + audiobook live; hardcover Q4 2026.",
  },
  {
    href: "/research/papers",
    eyebrow: "ÆoNs Research · 31 manuscripts · CC-BY 4.0",
    title: "The papers",
    detail:
      "Crystal Lattice Compression, the Hallucination Reduction Engine, GlyphSpeak EODO transport, and the rest of the lab catalog.",
  },
  {
    href: "/founders-view",
    eyebrow: "Nightly broadcast · 8pm ET",
    title: "Founder's View",
    detail:
      "The lab's nightly dispatch. Decoded primary-source intel, technical disclosures, what changed in the field today.",
  },
];

export default function NotFound() {
  return (
    <main
      data-page="not-found"
      className="relative bg-[#08090B] text-[#F4F4F2] antialiased"
    >
      <section
        aria-label="Page not found"
        className="border-b border-[#1F242B]"
      >
        <div className="mx-auto w-full max-w-4xl px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">Status</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">404 · page not found</span>
          </p>

          <h1
            className="mt-10 max-w-[20ch] text-balance text-[clamp(44px,7vw,96px)] font-extralight leading-[1.02] tracking-[-0.03em] text-[#F4F4F2]"
          >
            That page does not exist on atomeons.com.
          </h1>

          <p
            className="mt-10 max-w-[64ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Either the URL is mistyped, the page was renamed, or the link
            you followed pointed somewhere the lab does not publish. Try
            the lab&apos;s search (press <kbd className="mx-1 border border-[#1F242B] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9CA3AF]">⌘K</kbd>{" "}
            or <kbd className="mx-1 border border-[#1F242B] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9CA3AF]">/</kbd>
            ), pick one of the destinations below, or email{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=Broken%20link%20on%20atomeons.com"
              className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-[6px] transition-colors hover:decoration-[#22F0D5]"
            >
              a.mccree@gmail.com
            </a>{" "}
            with the URL and the lab will file a fix.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 border border-[#22F0D5] bg-[#22F0D5]/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10"
            >
              <span aria-hidden>←</span>
              <span>Lab home</span>
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-3 border border-[#1F242B] bg-[#0F1114] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              <span>Start at the curriculum</span>
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/press"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Press kit
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="routes-heading"
        className="border-b border-[#1F242B] bg-[#0F1114] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">§</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">Six destinations that do exist</span>
          </p>
          <h2
            id="routes-heading"
            className="mt-6 max-w-[22ch] text-balance text-[clamp(28px,4vw,48px)] font-light leading-[1.1] tracking-[-0.02em] text-[#F4F4F2]"
          >
            Pick one. The lab is small enough that all of these are one click away.
          </h2>

          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-2"
          >
            {ROUTES.map((r) => (
              <li key={r.href} className="bg-[#0F1114]">
                <Link
                  href={r.href}
                  className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-[#08090B] md:p-9"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">
                    {r.eyebrow}
                  </p>
                  <h3
                    className="font-serif text-[24px] leading-[1.2] tracking-[-0.005em] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5] md:text-[28px]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="font-serif text-[15px] leading-[1.55] text-[#9CA3AF]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {r.detail}
                  </p>
                  <p className="mt-auto pt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                    atomeons.com{r.href}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6 text-center md:px-10">
          <p
            className="font-serif text-[17px] italic leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            If a public link sent you here, the lab wants to know. Broken
            links inside the lab&apos;s own pages get a same-day fix.
          </p>
        </div>
      </section>
    </main>
  );
}
