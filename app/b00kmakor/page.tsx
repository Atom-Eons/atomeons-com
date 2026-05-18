import Link from "next/link";

export const metadata = {
  title: "B00KMakor — the AI publishing company for writers",
  description:
    "B00KMakor is a full AI book publishing company in one app. Writes books. Markets books. Ships books. Runs on ORANGEBOX intelligence. Coming soon for writers.",
  alternates: { canonical: "https://atomeons.com/b00kmakor" },
  robots: { index: true, follow: true },
};

const PILLARS = [
  {
    tag: "::write",
    head: "Writes the book.",
    body: "Mission-graph chapters. Continuity that survives every context reset. Style memory. Voice consistency. The book that actually exports.",
    color: "#22F0D5",
  },
  {
    tag: "::ship",
    head: "Ships the book.",
    body: "KDP-ready manuscripts. EPUB + print interior + cover variants. Metadata, ISBNs, categories, ASIN strategy. Distribution-day pipelines.",
    color: "#FF7A1A",
  },
  {
    tag: "::sell",
    head: "Markets the book.",
    body: "Launch sequences, social plans, podcast pitch lists, ads creative, ARC outreach, review captures, ranking pushes. The whole marketing arm.",
    color: "#22F0D5",
  },
];

const FOR_WHOM = [
  "Indie authors tired of half-finished drafts.",
  "Substack writers ready to compile.",
  "Non-fiction founders publishing once.",
  "Series writers maintaining canon across 8 books.",
  "Ghostwriters running multiple clients.",
  "Writing teams coordinating chapters across humans.",
];

const PIPELINE = [
  ["mission graph", "every chapter is a node. blockers visible. progress receipt-backed."],
  ["voice memory", "style fingerprint survives every session. you sound like you, not the model."],
  ["continuity audit", "characters · timeline · facts. flagged the moment they drift."],
  ["KDP packager", "manuscript → trim · margins · gutter · headers · TOC. one click."],
  ["cover lab", "MJ + Runway generation, A/B variants, comp analysis."],
  ["launch campaign", "120-day publishing calendar with daily action queue."],
  ["receipts", "every word, every action, every dollar logged. own your audit trail."],
];

export default function B00KMakor() {
  return (
    <main className="relative isolate flex min-h-screen flex-col bg-black text-[#F2F4F5]">
      {/* radial glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(255,122,26,0.18) 0%, transparent 60%), radial-gradient(45% 40% at 80% 80%, rgba(34,240,213,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(75% 60% at 50% 40%, black 30%, transparent 90%)",
        }}
      />

      {/* breadcrumb */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> b00kmakor · coming soon
        </p>
      </div>

      {/* HERO */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-20 pb-24 text-center">
        <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_12px_#22F0D5]" />
          ::building · early access for writers
        </p>

        <h1 className="text-balance text-6xl font-medium leading-[0.95] tracking-[-0.03em] md:text-9xl">
          B<span className="text-[#FF7A1A]">0</span>
          <span className="text-[#FF7A1A]">0</span>K
          <span className="text-[#22F0D5]">Makor</span>
        </h1>

        <p className="mx-auto mt-10 max-w-3xl text-balance text-2xl leading-[1.25] tracking-tight text-[#F2F4F5] md:text-4xl">
          The AI publishing company for writers.
          <br />
          <span className="text-[#6B7779]">
            Writes the book. Markets the book. Ships the book.
          </span>
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          A full book publishing house in one app. Runs on{" "}
          <Link
            href="/orangebox"
            className="text-[#22F0D5] hover:underline"
          >
            ORANGEBOX intelligence
          </Link>
          . Mission-graph chapters, continuity audits, KDP-ready manuscripts,
          and a 120-day launch campaign — all under one operator.
        </p>

        {/* CTAs */}
        <div className="mt-14 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="mailto:a.mccree@gmail.com?subject=B00KMakor%20early%20access%20%E2%80%94%20writer&body=I%20want%20on%20the%20B00KMakor%20early%20access%20list.%0A%0AName%3A%20%5Boptional%5D%0AWhat%20I%27m%20writing%3A%20%5Bnovel%20%2F%20non-fiction%20%2F%20series%20%2F%20short-form%5D%0AStage%3A%20%5Bidea%20%2F%20drafting%20%2F%20editing%20%2F%20ready-to-publish%5D%0AGenre%2Fniche%3A%20%5Boptional%5D%0AHow%20i%20found%20it%3A%20%5Boptional%5D%0A%0A%E2%80%94"
            className="inline-flex items-center gap-2 rounded-lg border border-[#FF7A1A] bg-[#FF7A1A] px-7 py-3.5 text-base font-semibold text-black shadow-[0_0_40px_rgba(255,122,26,0.4)] transition-colors hover:bg-[#FFA45A]"
          >
            request early access →
          </a>
          <a
            href="https://x.com/AtomMccree"
            target="_blank"
            rel="noopener"
            className="font-mono text-sm uppercase tracking-[0.18em] text-[#22F0D5] hover:underline"
          >
            ::dm @atommccree
          </a>
        </div>

        {/* status rail */}
        <div className="mt-16 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl border border-[#1A2225] bg-black/60 px-6 py-3 backdrop-blur-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::status
          </span>
          <span className="font-mono text-xs text-[#F2F4F5]">
            internal alpha · invite-only
          </span>
          <span className="text-[#1A2225]">·</span>
          <span className="font-mono text-xs text-[#22F0D5]">
            built on ORANGEBOX
          </span>
          <span className="text-[#1A2225]">·</span>
          <span className="font-mono text-xs text-[#FF7A1A]">
            launch · TBA
          </span>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::three pillars · one operator
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          The whole publishing house,
          <br />
          <span className="text-[#6B7779]">in one cockpit.</span>
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.head}
              className="group relative bg-[#0A0F11] p-8 transition-colors hover:bg-[#101A1C]"
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: p.color }}
              >
                {p.tag}
              </p>
              <h3 className="mt-4 text-2xl font-medium text-[#F2F4F5]">
                {p.head}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#9BA5A7]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::for writers
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          Built for the writers
          <br />
          <span className="text-[#FF7A1A]">tired of writing notes about a book.</span>
        </h2>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {FOR_WHOM.map((row, i) => (
            <div
              key={i}
              className="flex items-baseline gap-4 rounded-lg border border-[#1A2225] bg-[#0A0F11] px-5 py-4 transition-colors hover:border-[#22F0D5]/40"
            >
              <span className="font-mono text-[#22F0D5]">▲</span>
              <span className="text-base text-[#F2F4F5]">{row}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::what's inside
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          Seven moving parts.
          <br />
          <span className="text-[#6B7779]">One mission graph.</span>
        </h2>
        <ol className="mt-10 overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {PIPELINE.map(([head, body], i) => (
            <li
              key={head}
              className={`grid grid-cols-[180px_1fr] items-baseline gap-6 px-6 py-4 md:px-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                {head}
              </span>
              <span className="text-sm text-[#F2F4F5] md:text-base">{body}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm text-[#6B7779]">
          The pipeline is real. The product is in alpha. We're inviting a
          small group of writers to break it with us first.
        </p>
      </section>

      {/* WHY IT EXISTS */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <div className="rounded-2xl border border-[#FF7A1A]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-10 md:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
            ::why b00kmakor exists
          </p>
          <p className="mt-6 text-balance text-2xl leading-[1.35] tracking-tight text-[#F2F4F5] md:text-3xl">
            "I spent a month writing a book inside Claude that never exported.
            Then I built the cockpit that{" "}
            <span className="text-[#22F0D5]">makes the book actually ship</span>.
            B00KMakor is that cockpit, packaged for every writer who's done
            the same thing."
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
            — Atom McCree · founder · AtomEons Systems Laboratory
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-32 pt-12 text-center">
        <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          Want the alpha?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#9BA5A7]">
          Tell us what you're writing. We're picking the first 25 writers by
          fit, not by order. No mailing list, no funnel — direct email to the
          founder.
        </p>
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="mailto:a.mccree@gmail.com?subject=B00KMakor%20early%20access%20%E2%80%94%20writer&body=I%20want%20on%20the%20B00KMakor%20early%20access%20list.%0A%0AName%3A%20%5Boptional%5D%0AWhat%20I%27m%20writing%3A%20%5Bnovel%20%2F%20non-fiction%20%2F%20series%20%2F%20short-form%5D%0AStage%3A%20%5Bidea%20%2F%20drafting%20%2F%20editing%20%2F%20ready-to-publish%5D%0AGenre%2Fniche%3A%20%5Boptional%5D%0AHow%20i%20found%20it%3A%20%5Boptional%5D%0A%0A%E2%80%94"
            className="inline-flex items-center gap-2 rounded-lg border border-[#FF7A1A] bg-[#FF7A1A] px-7 py-3.5 text-base font-semibold text-black shadow-[0_0_40px_rgba(255,122,26,0.4)] transition-colors hover:bg-[#FFA45A]"
          >
            request early access →
          </a>
          <Link
            href="/orangebox"
            className="font-mono text-sm uppercase tracking-[0.18em] text-[#22F0D5] hover:underline"
          >
            ::see orangebox (the engine inside)
          </Link>
        </div>
      </section>

      {/* footer */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#1A2225] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] sm:flex-row sm:items-center">
          <span>2026 · AtomEons Systems Laboratory · Marco Island, FL</span>
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            ← back to atomeons
          </Link>
        </div>
      </div>
    </main>
  );
}
