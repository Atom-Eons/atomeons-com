import Link from "next/link";
import { AeMark } from "../_components/AeMark";
import { FoundersViewCountdown } from "../_components/FoundersViewCountdown";
import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";

// ISR: revalidate every 5 minutes so a newly-cron-published letter shows up
// without a manual redeploy.
export const revalidate = 300;

export const metadata = {
  title: "The Founder's View — ÆoNs Research",
  description:
    "Daily 8pm ET letter from Atom McCree. A fictional broadcast from the lab. No punches pulled. Aims at everything that earns it. Equal opportunity indignation — every letter, no exceptions. Editorial framing and characterizations are fiction; events cited are real and from the day's news.",
  alternates: { canonical: "https://atomeons.com/founders-view" },
};

async function loadPosts(): Promise<{
  posts: FoundersViewPost[];
  error: string | null;
}> {
  try {
    const sb = publicSupabase();
    const { data, error } = await sb
      .from("founders_view_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(60);
    if (error) return { posts: [], error: error.message };
    return { posts: (data ?? []) as FoundersViewPost[], error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return { posts: [], error: msg };
  }
}

export default async function FoundersViewIndex() {
  const { posts, error } = await loadPosts();

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> The Founder&apos;s View
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
          <AeMark size={20} glow />
          ::nightly broadcast · 8pm ET · sealed · slipped under your door
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          The Founder&apos;s View
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          A fictional broadcast from the lab. Every night at 8pm
          Eastern, sealed and slipped under your door. No punches
          pulled. Aims at everything that earns it. Equal opportunity
          indignation — every letter, no exceptions.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9BA5A7]">
          Editorial framing, characterizations, and pointed dialogue are
          fiction. The events cited are real and from the day&apos;s news.
        </p>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#6B7779]">
          Published live the moment it&apos;s written. The lab does not
          edit before publication — only retracts after, with the reason
          stated. Bookmark this page. There is no email list. There is no
          algorithm. You come here, or you miss it — or you subscribe by{" "}
          <a
            href="/founders-view/rss.xml"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
            target="_blank"
            rel="noopener"
          >
            RSS
          </a>
          .
        </p>

        <div className="mt-10 max-w-2xl">
          <FoundersViewCountdown />
        </div>
      </section>

      {/* LETTERS LIST */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        {error ? (
          <div className="rounded-2xl border border-[#FF7A1A]/30 bg-[#1C0F08]/40 p-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF7A1A]">
              ::archive unavailable
            </p>
            <p className="mt-2 text-sm text-[#9BA5A7]">
              Backend reach failed: {error}. Letters will appear here as soon
              as the connection is restored and tonight&apos;s 8pm letter
              fires.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
              ::awaiting first broadcast
            </p>
            <p className="mt-2 text-base text-[#F2F4F5]">
              The first letter drops at 8pm Eastern. Tonight, or tomorrow,
              or whenever the cron next strikes.
            </p>
            <p className="mt-4 text-sm text-[#6B7779]">
              Operator note: this listing reads from the{" "}
              <code className="font-mono text-[#22F0D5]">
                founders_view_posts
              </code>{" "}
              Supabase table. No letters published yet.
            </p>
          </div>
        ) : (
          <ol className="space-y-5">
            {posts.map((p, i) => {
              const date = new Date(p.published_at);
              const human = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              return (
                <li key={p.id}>
                  <Link
                    href={`/founders-view/${p.slug}`}
                    className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#FF7A1A]/40 md:p-8"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
                      ::letter №{posts.length - i} · {human}
                    </p>
                    <h2 className="mt-3 text-2xl font-medium leading-tight text-[#F2F4F5] group-hover:text-[#FF7A1A] md:text-3xl">
                      {p.title}
                    </h2>
                    {p.dek ? (
                      <p className="mt-3 text-base text-[#9BA5A7] md:text-lg">
                        {p.dek}
                      </p>
                    ) : null}
                    <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
                      {p.theme ? (
                        <span className="rounded border border-[#22F0D5]/40 bg-black px-2 py-0.5 font-mono text-[#22F0D5]">
                          {p.theme}
                        </span>
                      ) : null}
                      {p.word_count ? (
                        <span className="ml-auto rounded border border-[#1A2225] bg-black px-2 py-0.5 font-mono text-[#6B7779]">
                          {p.word_count} words
                        </span>
                      ) : null}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </main>
  );
}
