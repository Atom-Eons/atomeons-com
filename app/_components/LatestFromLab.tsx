import Link from "next/link";
import { AeMark } from "./AeMark";
import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";
import { PAPERS } from "../_data/research-papers";

/**
 * Surface the latest Founder's View letter + a featured ÆoNs paper on
 * the home page so visitors discover the research / publishing arms
 * without needing to find them in the dropdowns.
 *
 * Server component — loads the latest published letter from Supabase on
 * render, and picks today's "feature paper" deterministically from the
 * summarized set (rotates daily by day-of-year mod count).
 */

async function loadLatestLetter(): Promise<FoundersViewPost | null> {
  try {
    const sb = publicSupabase();
    const { data } = await sb
      .from("founders_view_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .single();
    return (data as FoundersViewPost) ?? null;
  } catch {
    return null;
  }
}

function pickFeaturePaper() {
  const summarized = PAPERS.filter((p) => p.status === "summarized");
  if (summarized.length === 0) return PAPERS[0];
  const day = Math.floor(Date.now() / 86_400_000);
  return summarized[day % summarized.length];
}

export async function LatestFromLab() {
  const [letter, paper] = await Promise.all([
    loadLatestLetter(),
    Promise.resolve(pickFeaturePaper()),
  ]);

  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::latest from the lab
        </p>
        <h2 className="text-balance text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          Tonight&apos;s letter.{" "}
          <span className="text-[#FF7A1A]">Today&apos;s paper.</span>
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Latest Founder's View letter */}
          <Link
            href={letter ? `/founders-view/${letter.slug}` : "/founders-view"}
            className="group flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#FF7A1A]/50 md:p-9"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              ::nightly broadcast · sealed and slipped under your door
            </p>
            {letter ? (
              <>
                <h3 className="mt-4 text-2xl font-medium leading-tight text-[#F2F4F5] group-hover:text-[#FF7A1A] md:text-3xl">
                  {letter.title}
                </h3>
                {letter.dek ? (
                  <p className="mt-3 text-base leading-relaxed text-[#9BA5A7]">
                    {letter.dek}
                  </p>
                ) : null}
                <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                  {letter.theme ? (
                    <span className="rounded border border-[#22F0D5]/40 bg-black px-2 py-0.5 text-[#22F0D5]">
                      {letter.theme}
                    </span>
                  ) : null}
                  {letter.word_count ? (
                    <span>{letter.word_count} words</span>
                  ) : null}
                  <span className="ml-auto text-[#FF7A1A]">
                    read the letter →
                  </span>
                </p>
              </>
            ) : (
              <>
                <h3 className="mt-4 text-2xl font-medium text-[#F2F4F5]">
                  Tonight at 8pm Eastern.
                </h3>
                <p className="mt-3 text-base text-[#9BA5A7]">
                  The first letter publishes at 00:00 UTC. Bookmark the
                  archive. No email list. No algorithm.
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF7A1A]">
                  open the archive →
                </p>
              </>
            )}
          </Link>

          {/* Feature paper */}
          <Link
            href={`/research/papers/${paper.slug}`}
            className="group flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/50 md:p-9"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::featured paper · ÆoNs research · cc-by 4.0
            </p>
            <h3 className="mt-4 text-2xl font-medium leading-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">
              {paper.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[#9BA5A7]">
              <span className="font-medium text-[#22F0D5]">::kid:</span>{" "}
              {paper.kid_summary}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              {paper.keywords.slice(0, 3).map((k) => (
                <span
                  key={k}
                  className="rounded border border-[#1A2225] bg-black px-2 py-0.5"
                >
                  {k}
                </span>
              ))}
              <span className="ml-auto text-[#22F0D5]">read the paper →</span>
            </p>
          </Link>
        </div>

        <p className="mt-10 max-w-3xl text-sm text-[#6B7779]">
          ÆoNs Research publishes everything CC-BY 4.0 with academic + plain-
          language summaries side by side. The Founder&apos;s View publishes at
          8pm Eastern, autonomously, sealed.{" "}
          <Link
            href="/research/about"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            about the lab →
          </Link>
        </p>
      </div>
    </section>
  );
}
