import Link from "next/link";
import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";

/**
 * FoundersViewLiveTeaser — server component for the homepage.
 *
 * Surfaces the most recent published Founder's View letter as a live
 * pulse on `/`. Reuses the same Supabase ISR window the index uses
 * (5-min revalidate) so a new 8pm letter shows up on the homepage
 * within five minutes of cron-publish, no rebuild needed.
 *
 * Failure-soft: on Supabase error or empty table, renders a
 * coming-soon card linking to /founders-view rather than blanking the
 * homepage section.
 */

export const revalidate = 300; // 5 min

async function loadLatest(): Promise<FoundersViewPost | null> {
  try {
    const sb = publicSupabase();
    const { data, error } = await sb
      .from("founders_view_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) return null;
    return (data as FoundersViewPost) ?? null;
  } catch {
    return null;
  }
}

function readTimeMinutes(words?: number | null): number | null {
  if (!words || words < 1) return null;
  return Math.max(1, Math.round(words / 220));
}

export async function FoundersViewLiveTeaser() {
  const post = await loadLatest();

  if (!post) {
    return (
      <section className="border-y border-[#1A2225] bg-[#0e1418]/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::the founder&apos;s view · nightly 8pm et
          </p>
          <p className="mt-4 max-w-3xl text-base leading-[1.6] text-[#C8CCCE] md:text-lg">
            The lab&apos;s daily broadcast lives at{" "}
            <Link
              href="/founders-view"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /founders-view
            </Link>
            . Sealed. Slipped under your door. No punches pulled.
          </p>
        </div>
      </section>
    );
  }

  const human = new Date(post.published_at).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const minutes = readTimeMinutes(post.word_count);

  return (
    <section className="border-y border-[#1A2225] bg-[#0e1418]/40">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::tonight on the founder&apos;s view · 8pm et nightly
          </p>
          <Link
            href="/founders-view"
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#FFB87A]"
          >
            see the full archive →
          </Link>
        </div>

        <Link
          href={`/founders-view/${post.slug}`}
          className="group mt-6 block rounded-3xl border border-[#FF7A1A]/30 bg-gradient-to-br from-[#1B100A] via-[#0E0B0A] to-[#0A0F11] p-7 transition-all hover:border-[#FF7A1A]/70 md:p-10"
        >
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A1A]/40 bg-[#FF7A1A]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
              <span className="size-1.5 animate-pulse rounded-full bg-[#FF7A1A] shadow-[0_0_8px_rgba(255,122,26,0.7)]" />
              most recent · live
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
              {human}
            </span>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight text-[#F2F4F5] group-hover:text-[#FF7A1A] md:text-5xl">
            {post.title}
          </h2>
          {post.dek ? (
            <p className="mt-5 max-w-3xl text-base leading-[1.6] text-[#C8CCCE] md:text-lg">
              {post.dek}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap items-baseline gap-4">
            {post.word_count ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                {post.word_count.toLocaleString()} words
                {minutes ? ` · ~${minutes}-min read` : ""}
              </span>
            ) : null}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] group-hover:text-[#FFB87A]">
              read the letter →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
