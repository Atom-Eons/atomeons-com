import Link from "next/link";
import { AeMark } from "../_components/AeMark";
import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";
import { PAPERS } from "../_data/research-papers";

export const revalidate = 300;

export const metadata = {
  title: "Now — what AtomEons is doing this week",
  description:
    "Live status of the lab. What's shipping, what just shipped, what broke, what's next. Following the /now page convention (Sivers). One operator, public ledger.",
  alternates: { canonical: "https://atomeons.com/now" },
};

/**
 * /now page — indie-web convention (nownownow.com / Derek Sivers).
 *
 * Surfaces the operational state of the lab in one glance:
 *   - count of letters in the archive
 *   - count of summarized papers
 *   - latest letter title + date
 *   - rolling "what we shipped this week" list (hand-curated below)
 *   - open mistakes count (hand-curated below)
 *   - what's next (hand-curated below)
 *
 * Hand-curated arrays at the bottom are the operator's editorial channel —
 * update them as the week progresses.
 */

async function loadLetterStats() {
  try {
    const sb = publicSupabase();
    const { data, count } = await sb
      .from("founders_view_posts")
      .select("title, slug, published_at, theme", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1);
    return {
      total: count ?? 0,
      latest: (data?.[0] as FoundersViewPost) ?? null,
    };
  } catch {
    return { total: 0, latest: null as FoundersViewPost | null };
  }
}

const SHIPPED_THIS_WEEK: Array<{ date: string; what: string; href?: string }> = [
  {
    date: "2026-05-17",
    what:
      "ORANGEBOX v6.0.0 native binary — 4.46 MB Rust + egui exe. One file, double-click, 2s launch.",
    href: "/orangebox",
  },
  {
    date: "2026-05-17",
    what:
      "Dynamic ladder pricing — starts at $1, +$1 per 100 sales, license §4A binds against subscription switch.",
    href: "/faq",
  },
  {
    date: "2026-05-17",
    what:
      "/research section — 12 papers, all summarized with academic + plain-language side by side.",
    href: "/research/papers",
  },
  {
    date: "2026-05-17",
    what:
      "The Founder's View — autonomous 8pm ET broadcast pipeline (Supabase + Vercel Cron + Anthropic Sonnet).",
    href: "/founders-view",
  },
  {
    date: "2026-05-17",
    what:
      "Per-letter + per-paper Open Graph image generators with brand-locked 1200×630 cards.",
  },
  {
    date: "2026-05-17",
    what:
      "/api/download SHA-256 integrity gate — refuses to ship a mismatched binary to a paying buyer.",
  },
  {
    date: "2026-05-17",
    what:
      "/mistakes ledger — public, dated, statused, named. Every wrong call goes here.",
    href: "/mistakes",
  },
  {
    date: "2026-05-17",
    what:
      "/faq rewritten end-to-end for v6 (19 questions, FAQPage JSON-LD).",
    href: "/faq",
  },
];

const SHIPPING_NEXT: string[] = [
  "Operator uploads orangebox-v6.0.0-setup.exe to Vercel Blob → PRODUCT_BLOB_URL update",
  "EV code-signing certificate (DigiCert / Sectigo) → ships in v6.1, eliminates SmartScreen warning",
  "ANTHROPIC_API_KEY + SUPABASE_SERVICE_ROLE_KEY set in Vercel → autonomous Founder's View letters fire nightly",
  "Mac notarization + ARM64 native build → v6.x roadmap",
  "Skil.Ski marketplace public registry → planned",
  "Mobile companion native app (RN + Expo) → planned",
];

const CURRENT_REALITY: string[] = [
  "ORANGEBOX v6.0.0 site is live and selling at $1.",
  "Five seed letters are in the Founder's View archive.",
  "Twelve research manuscripts are public and summarized.",
  "One mistake remains open (PRODUCT_BLOB_URL still points to v1.4.0 — defended by SHA gate, root fix awaits operator upload).",
  "Lab is solo. Atom McCree. Marco Island, FL. No team, no deck, no series-A.",
];

export default async function NowPage() {
  const { total: letterCount, latest } = await loadLetterStats();
  const summarizedPapers = PAPERS.filter((p) => p.status === "summarized").length;

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> /now
        </p>
      </div>

      <section className="mx-auto w-full max-w-4xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::what i&apos;m doing now · this week · this minute
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          /now
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          This is an{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            indie-web /now page
          </a>{" "}
          — the convention Derek Sivers proposed for solo operators to say
          publicly what they&apos;re working on. Updated whenever
          something changes worth saying. No theater. No roadmap. Just where
          the lab is, right now.
        </p>
        <p className="mt-3 max-w-3xl text-xs text-[#6B7779]">
          Last touch: 17 May 2026 · Marco Island, FL.
        </p>
      </section>

      {/* live-counters strip */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              papers
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">
              {summarizedPapers}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              summarized
            </p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              letters
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">
              {letterCount}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              published
            </p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              cockpit
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">v6.0</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              live · $1 ladder
            </p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              op count
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">1</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              founder · marco isl
            </p>
          </div>
        </div>
      </section>

      {/* CURRENT REALITY */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::current reality
        </p>
        <h2 className="mb-6 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
          What is true today.
        </h2>
        <ul className="space-y-2 text-base text-[#F2F4F5] md:text-lg">
          {CURRENT_REALITY.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[#22F0D5]">▸</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SHIPPED THIS WEEK */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
          ::shipped this week
        </p>
        <h2 className="mb-6 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
          What landed.
        </h2>
        <ol className="space-y-3">
          {SHIPPED_THIS_WEEK.map((item, i) => (
            <li
              key={i}
              className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                {item.date}
              </p>
              <p className="mt-2 text-sm text-[#F2F4F5] md:text-base">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#22F0D5]"
                  >
                    {item.what}
                  </Link>
                ) : (
                  item.what
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* SHIPPING NEXT */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::shipping next
        </p>
        <h2 className="mb-6 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
          What&apos;s in flight.
        </h2>
        <ul className="space-y-3">
          {SHIPPING_NEXT.map((line, i) => (
            <li
              key={i}
              className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4 text-sm leading-relaxed text-[#9BA5A7] md:text-base"
            >
              <span className="text-[#FF7A1A]">→</span> {line}
            </li>
          ))}
        </ul>
      </section>

      {/* LATEST FOOTER */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/founders-view"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#FF7A1A]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              ::tonight&apos;s letter
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#FF7A1A]">
              {latest ? latest.title : "Awaiting first 8pm broadcast →"}
            </p>
          </Link>
          <Link
            href="/research/papers"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::Æ research
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              {summarizedPapers} of {PAPERS.length} papers summarized →
            </p>
          </Link>
          <Link
            href="/mistakes"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::mistakes ledger
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              Public · dated · statused →
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
