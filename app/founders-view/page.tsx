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

/**
 * Build CollectionPage + Blog JSON-LD so AI search engines and Google
 * read this index as a real publication, not just a list page. Each
 * listed letter becomes a BlogPosting entity referenced under
 * `blogPost`, giving crawlers an explicit citation graph.
 */
function buildIndexJsonLd(posts: FoundersViewPost[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://atomeons.com/founders-view#blog",
        name: "The Founder's View",
        alternateName: ["Founder's View", "AtomEons nightly broadcast"],
        url: "https://atomeons.com/founders-view",
        description:
          "Daily 8pm ET letter from AtomEons Systems Laboratory. Fictional broadcast framing; events cited are real and from the day's news. No punches pulled. Equal opportunity indignation.",
        inLanguage: "en-US",
        publisher: {
          "@type": "Organization",
          name: "AtomEons Systems Laboratory",
          url: "https://atomeons.com",
        },
        author: {
          "@type": "Person",
          name: "Atom McCree",
          url: "https://atomeons.com/about",
          sameAs: ["https://x.com/AtomMccree"],
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        blogPost: posts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.dek ?? undefined,
          datePublished: p.published_at,
          url: `https://atomeons.com/founders-view/${p.slug}`,
          wordCount: p.word_count ?? undefined,
          author: {
            "@type": "Person",
            name: "Atom McCree",
            url: "https://atomeons.com/about",
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
          { "@type": "ListItem", position: 2, name: "The Founder's View", item: "https://atomeons.com/founders-view" },
        ],
      },
    ],
  };
}

function readTimeMinutes(words?: number | null): number | null {
  if (!words || words < 1) return null;
  // 220 wpm — slightly above average for editorial prose
  return Math.max(1, Math.round(words / 220));
}

export default async function FoundersViewIndex() {
  const { posts, error } = await loadPosts();
  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* JSON-LD — Blog + BlogPosting entities for AI search citation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildIndexJsonLd(posts)),
        }}
      />

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
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::nightly broadcast · 8pm ET · live · no edits before · retracts with reason
        </p>
        {/* Wave 112 Barnum · former "The Founder's View" → claim of power.
            The lab's posture: independent broadcast, no advertisers to
            appease, no subscription revenue to protect. */}
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.025em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          What the lab thinks, right now.
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-[#8E969D]">
          the founder&apos;s view · nightly · 8pm et
        </p>
        <p className="mt-8 max-w-3xl text-lg leading-[1.6] text-[#B5BBC0]">
          A nightly letter from the operator. Published live the moment
          it&apos;s written — no edits before publication, only retracts
          after, with the reason stated. No punches pulled. Equal
          opportunity indignation. Aims at everything that earns it.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9BA5A7]">
          Editorial framing and pointed dialogue are fiction. Events
          cited are real and from the day&apos;s news.
        </p>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#8E969D]">
          No email list. No algorithm. No advertiser to please. You come
          here at 8pm, or you miss it, or you subscribe by{" "}
          <a
            href="/founders-view/rss.xml"
            className="text-[#22F0D5] underline underline-offset-2 hover:text-[#FFA45A]"
            target="_blank"
            rel="noopener"
          >
            RSS
          </a>
          .
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <FoundersViewCountdown />
          </div>
          {/* RSS subscribe block — promoted out of the inline paragraph
              now that it's the primary subscribe path. */}
          <a
            href="/founders-view/rss.xml"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 rounded-xl border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
          >
            <span className="text-base">📡</span>
            subscribe by rss · no email · no algorithm
          </a>
        </div>
      </section>

      {/* FEATURED LETTER — surfaces the most recent letter as a hero
          card so the index doesn't lead with utility-grade list rows.
          Falls through silently when there are no posts yet. */}
      {featured && !error ? (
        <section className="mx-auto w-full max-w-5xl px-6 pb-10">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::most recent · live now
          </p>
          <Link
            href={`/founders-view/${featured.slug}`}
            className="group block rounded-3xl border border-[#22F0D5]/35 bg-gradient-to-br from-[#1B100A] via-[#0E0B0A] to-[#0A0F11] p-7 transition-all hover:border-[#22F0D5]/70 md:p-10"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_rgba(34, 240, 213,0.7)]" />
                tonight&apos;s broadcast
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                {new Date(featured.published_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-5xl">
              {featured.title}
            </h2>
            {featured.dek ? (
              <p className="mt-5 max-w-3xl text-base leading-[1.6] text-[#C8CCCE] md:text-lg">
                {featured.dek}
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap items-baseline gap-4">
              {featured.word_count ? (
                <>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    {featured.word_count.toLocaleString()} words
                  </span>
                  {readTimeMinutes(featured.word_count) ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                      · ~{readTimeMinutes(featured.word_count)}-min read
                    </span>
                  ) : null}
                </>
              ) : null}
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] group-hover:text-[#FFB87A]">
                read the letter →
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      {/* LETTERS LIST */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        {featured && rest.length > 0 ? (
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::archive · {rest.length} earlier letter{rest.length === 1 ? "" : "s"}
          </p>
        ) : null}
        {error ? (
          <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#1C0F08]/40 p-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
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
        ) : rest.length === 0 ? (
          // featured letter shown above; no earlier letters yet
          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              ::archive · empty until tomorrow night
            </p>
            <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">
              The next letter goes out at 8pm Eastern. Bookmark
              this page, or grab the RSS feed above and forget
              about it — the lab takes care of the cadence.
            </p>
          </div>
        ) : (
          <ol className="space-y-5">
            {rest.map((p, i) => {
              const date = new Date(p.published_at);
              const human = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              // posts.length - 1 - i because we already showed posts[0] as
              // the featured card; this list starts at posts[1].
              const number = posts.length - 1 - i;
              return (
                <li key={p.id}>
                  <Link
                    href={`/founders-view/${p.slug}`}
                    className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40 md:p-8"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                      ::letter №{number} · {human}
                    </p>
                    <h2 className="mt-3 text-2xl font-medium leading-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">
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
