import Link from "next/link";
import { AeMark } from "../../_components/AeMark";

export const metadata = {
  title:
    "X Algorithm Alpha — 31-section breakdown of the May 15 2026 xAI leak",
  description:
    "Operational intelligence from the xAI x-algorithm source code (published 2026-05-15). 31 sections covering the 22 scoring signals, min-traction gate, Author Diversity Decay, 4 shadowban types, 80-hour age cap, and the operator playbook the leak now makes auditable.",
  alternates: {
    canonical: "https://atomeons.com/intel/x-algorithm",
  },
};

/**
 * /intel/x-algorithm — alpha skill page.
 *
 * Surfaces the 15-insight executive summary + operator-class tactical
 * extensions + links to the full 1851-line analysis document at
 * /intel/x-algorithm-insights-2026-05-15.md (downloadable, CC-BY 4.0).
 *
 * Lab voice: this is NOT an ÆoNs Research paper. It's intelligence
 * sourced from the xAI public repo + analyzed by an independent AI
 * builder + extended by AtomEons with operator-specific tactics.
 */

const FIFTEEN = [
  {
    n: "01",
    body: "The algorithm predicts 22 viewer actions and combines their probabilities with weights. You don't optimize for 'engagement' — you optimize P(like), P(reply), P(retweet), P(dwell), P(quote), P(follow_author) and avoid P(not_interested), P(block), P(mute), P(report), P(not_dwelled).",
  },
  {
    n: "02",
    body: "The worst thing you can do is NOT generating few likes — it's generating blocks, mutes, reports, and most importantly the user not staying on the post (not_dwelled). Negative signals SUBTRACT from the score; they don't just fail to add.",
  },
  {
    n: "03",
    body: "Your post must cross a 'min-traction gate' in the first ~30 minutes to enter the Grok pipeline. No early engagement → never hits Banger Initial Screen → never gets the quality multimodal embedding → permanently invisible out-of-network.",
  },
  {
    n: "04",
    body: "The model knows post AGE explicitly as a feature with 1-hour buckets and caps at 80 hours. Anything older than 3 days lands in 'overflow' — no miracles. Post in your audience's prime time, not yours.",
  },
  {
    n: "05",
    body: "Spamming from the same account penalizes brutally. Author Diversity Decay applies decay^position + floor — your second post in a feed weighs half, the third ~28%, the fourth ~16%. Space them out.",
  },
  {
    n: "06",
    body: "Video matters — but only above MinVideoDurationMs (industry convention ~7-10s). Below the threshold the VQV weight is ZEROED. Also: Grok transcribes the audio via ASR. Mute videos leave half the semantic embedding empty.",
  },
  {
    n: "07",
    body: "Out-of-network (OON) gets a multiplier < 1. To reach non-followers, your post must be MUCH better than an equivalent in-network one. Exception: new users get a higher OON multiplier — they're discoverable to you.",
  },
  {
    n: "08",
    body: "Some users have allow_for_you_recommendations=false. You NEVER reach them out-of-network, period. Only follows work for that segment.",
  },
  {
    n: "09",
    body: "DedupConversationFilter keeps only ONE tweet per thread in the feed (the highest-scored one). Megathreads to fill the feed don't work — you compete with yourself.",
  },
  {
    n: "10",
    body: "Grok-VLM scores every ORIGINAL post (not replies, not retweets) with a quality_score (≥0.4 = 'banger'), a slop_score (AI-slop detector), and a has_minor_score. The discovery system rewards original posts.",
  },
  {
    n: "11",
    body: "Replies to small accounts get scanned for spam by Grok. Replies to large accounts go through Reply Ranking (0-3 score deciding the order in the conversation). Generic 'first!' replies score low; substantive replies climb.",
  },
  {
    n: "12",
    body: "Viewer country, language, IP, demographics are injected as query features. The POST only carries language_code, NOT author country. There's no hardcoded EU→US penalty filter — but the model learns country↔engagement correlations from data.",
  },
  {
    n: "13",
    body: "Private (is_protected) accounts don't generate embeddings → no out-of-network retrieval. Going public unlocks the model's signals.",
  },
  {
    n: "14",
    body: "The model only remembers your last ~128 actions in the published mini version. Production uses more, but the architecture is the same: bounded recent-behavior window.",
  },
  {
    n: "15",
    body: "50% of requests are 'shadow traffic' that silently activates experimental features (inferred gender, Grok topics, mutual facepiles, etc.). Even when the flags appear 'off', half your audience always experiences them.",
  },
];

const ATOMEONS_EXTENSIONS = [
  {
    n: "E1",
    title: "Receipts are the only honest answer to the algorithm",
    body: "Every claim in the leaked code becomes auditable for the first time. The min-traction gate, the Author Diversity Decay, the 4 shadowban types — these are now provable, not speculative. ORANGEBOX's receipts doctrine applies the same logic to your own work: every action writes a timestamped JSON line with department, tool, tokens, cents, SHA-256 of inputs and outputs. The algorithm finally has its receipts; your work should too.",
  },
  {
    n: "E2",
    title: "The 5-letter rule for an indie launch week",
    body: "Author Diversity Decay punishes bursts. Five great posts spaced 4-6 hours apart will out-perform 50 posts in a day. For a launch week: ONE banger per day, posted in the audience's prime time, with a first-30-minute activation plan. Treat each post as a separate min-traction-gate event.",
  },
  {
    n: "E3",
    title: "Originals carry the launch, replies inherit the reach",
    body: "Banger Initial Screen runs only on originals. Replies and retweets cannot become OON discoverable. For the v6 launch: 7 originals (one per day) carry the press push. Substantive replies under those originals + on large adjacent accounts work the Reply Ranking score (0-3) for parasitic visibility — but the discovery moat is built only on the originals.",
  },
  {
    n: "E4",
    title: "Dwell + reply + follow_author > likes",
    body: "There are 5 different dwell signals (dwell_score, cont_dwell_time, cont_click_dwell_time, click_dwell_time, quoted_vqv_score) and only 1 favorite_score. Aggregate dwell signals weigh more than the isolated like. The hook is the H1 of every post — first line decides not_dwelled. Body retains. Reply hook closes. Profile-click + follow_author trigger the heaviest long-tail weights.",
  },
  {
    n: "E5",
    title: "The 4 shadowban types are mechanically distinct",
    body: "Hard drop (Action::Drop via VFFilter — content-based labels). Soft (DO_NOT_AMPLIFY + the 14 MediumRisk labels — strip adjacent ads, structural downrank). Operational (BotMaker rule applies a safety label manually). Implicit (Phoenix author_hashes embed your account's negative history). Plus the structural one: failing the min-traction gate. ORANGEBOX's anti-saas posture survives all five because we ship CC-BY 4.0 + own-machine + no algorithm reliance.",
  },
  {
    n: "E6",
    title: "The cocktail that bypasses the OON ceiling",
    body: "Combine: post in audience prime time + cross min-traction gate via warm-network DM in first 5 minutes + original + ≥10s video with audio + Substantive English text + topic-tag for TopicOonWeightFactor + first-line hook that holds dwell + closing reply hook. Each ingredient is documented in the code. Each contributes a multiplicative bump. Skipping any one ingredient costs more than skipping all the others combined.",
  },
];

const ACTIONABLE_CHEATSHEET = [
  ["Originals only", "Banger Screen excludes replies + retweets"],
  ["Public account only", "is_protected blocks all OON discovery"],
  ["First-30-minute activation", "min-traction gate is binary"],
  ["1 post per 4-6 hours max", "Author Diversity Decay is exponential"],
  ["Audience prime time", "AgeFilter is mathematical"],
  ["10+ second video with audio", "VQV weight + ASR transcript"],
  ["Substantive replies on big accounts", "Reply Ranking 0-3"],
  ["English for US audience", "Post language matches viewer language"],
  ["No 7-PToS-category content", "MediumRisk = no ads + downrank"],
  ["Quote healthy posts (not toxic)", "BrandSafetyVerdict inherits the worst"],
  ["Hook → body → reply hook", "Maximize dwell + reply"],
  ["Don't repost identical text", "PreviouslySeen + PreviouslyServed filters"],
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Intel", item: "https://atomeons.com/intel/x-algorithm" },
    { "@type": "ListItem", position: 3, name: "X Algorithm", item: "https://atomeons.com/intel/x-algorithm" },
  ],
};

export default function XAlgorithmIntel() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <span className="text-[#22F0D5]">intel</span>{" "}
          <span className="text-[#1A2225]">/</span> X Algorithm
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::alpha intel · received 2026-05-18 · source xai-org/x-algorithm
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          The X algorithm
          <br />
          <span className="text-[#22F0D5]">finally has receipts.</span>
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          On May 15, 2026, xAI published the X For-You algorithm source code
          at{" "}
          <a
            href="https://github.com/xai-org/x-algorithm"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            github.com/xai-org/x-algorithm
          </a>
          . An independent AI builder spent the weekend reading the 207-file
          repo and produced a 1,851-line operational analysis covering 31
          sections — every scorer, every filter, every Grok plan, every
          shadowban type, every hidden constant.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          This page is AtomEons surfacing it as public intelligence with the
          operator class's extensions — what the indie founder, the
          one-person lab, the underpaid creator should do with what is now
          structurally provable.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/intel/x-algorithm-insights-2026-05-15.md"
            download="INSIGHTS_X_algorithm_2026-05-15.md"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#22F0D5] bg-[#22F0D5] px-6 py-3 text-base font-bold uppercase tracking-wide text-black shadow-[0_0_30px_rgba(34,240,213,0.45)] transition-colors hover:bg-[#5FF7E1]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            ↓ Download full analysis (.md · 1851 lines · CC-BY 4.0)
          </a>
          <a
            href="https://github.com/xai-org/x-algorithm"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-lg border border-[#1A2225] bg-[#0A0F11] px-6 py-3 text-base font-semibold text-[#F2F4F5] hover:border-[#22F0D5]/50"
          >
            ↗ Open xai-org/x-algorithm
          </a>
        </div>
      </section>

      {/* THE 15 KEY INSIGHTS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::TL;DR · 15 insights every creator needs
        </p>
        <h2 className="mb-10 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          What the leak proves.
        </h2>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {FIFTEEN.map((item, i) => (
            <div
              key={item.n}
              className={`flex flex-col gap-2 px-5 py-5 md:grid md:grid-cols-[60px_1fr] md:items-baseline md:gap-6 md:px-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
                {item.n}
              </span>
              <p className="text-sm leading-relaxed text-[#F2F4F5] md:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ATOMEONS EXTENSIONS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={18} glow />
          ::lab extensions · what the operator class does next
        </p>
        <h2 className="mb-10 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          Use it. Improve it. Ship it.
        </h2>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {ATOMEONS_EXTENSIONS.map((e) => (
            <div
              key={e.n}
              className="bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
                  {e.n}
                </span>
                <h3 className="text-base font-medium text-[#F2F4F5] md:text-lg">
                  {e.title}
                </h3>
              </div>
              <p className="mt-3 pl-10 text-sm leading-relaxed text-[#9BA5A7]">
                {e.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CHEATSHEET */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::actionable cheatsheet · 12 rules
        </p>
        <h2 className="mb-10 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          Print this. Pin it next to your screen.
        </h2>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {ACTIONABLE_CHEATSHEET.map(([rule, why], i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_1fr] items-baseline gap-4 px-5 py-3 md:grid-cols-[280px_1fr] md:gap-8 md:px-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span className="text-sm font-medium text-[#22F0D5] md:text-base">
                {rule}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779] md:text-xs">
                {why}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DEEP DIVES */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::deep dives · in the full analysis
        </p>
        <h2 className="mb-10 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          31 sections. Every claim cites the file + line.
        </h2>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            "§ 2 — The 22 signals the model predicts",
            "§ 3 — Author Diversity Decay (decay^position + floor)",
            "§ 4 — Out-of-network multiplier",
            "§ 5 — Filters that eliminate you",
            "§ 6 — Grok tribunal (Banger Initial Screen + Reply Ranking + 7 PToS)",
            "§ 7 — Brand safety: 3 tiers + temporal cliff",
            "§ 9 — Video: when it helps + when it doesn't",
            "§ 11 — 80+ topics the algorithm recognizes",
            "§ 15 — The min-traction gate (the most important bottleneck)",
            "§ 16 — Post age as model feature · 80h cap",
            "§ 17 — The 'For You privacy switch'",
            "§ 18 — 50% shadow traffic",
            "§ 19 — The model only remembers ~128 actions",
            "§ 21 — Hard limits cheatsheet",
            "§ 22 — 15 hidden tricks",
            "§ 25 — Verification of the viral 'kneecap groups' tweet",
            "§ 26 — The 4 shadowban types (with code support)",
            "§ 27 — Does posting from Europe to US hurt? (verdict + 3 indirect effects)",
            "§ 28 — Embedding poisoning + 30-min gate",
            "§ 29 — Links, hashtags, mentions: direct vs indirect effects",
            "§ 30 — Anatomy of the perfect post",
            "§ 31 — Quoting your own vs others' posts",
          ].map((line) => (
            <div
              key={line}
              className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4 text-sm text-[#9BA5A7]"
            >
              {line}
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm text-[#6B7779]">
          The full document is dense, technical, and cites every claim to its
          source file + line in the xai-org/x-algorithm repo. Operator
          recommendation: read sections 15, 26, and 30 first. They contain
          the highest-leverage operational claims. The next three blocks
          surface those in-page.
        </p>
      </section>

      {/* DEEP DIVE — §15 MIN-TRACTION GATE */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::deep dive · § 15
        </p>
        <h2 className="mb-6 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          The min-traction gate.
        </h2>
        <p className="text-balance text-base leading-relaxed text-[#C8CCCE] md:text-lg">
          The single most important thing in the entire algorithm is a
          threshold check that runs <em className="not-italic text-[#FFB87A]">before</em>{" "}
          any of the fancy machine-learning scorers ever see your post. If a
          post does not clear it, the ranking pipeline never runs. The post
          is invisible by construction, not by hostility.
        </p>
        <div className="mt-8 space-y-5 text-sm leading-[1.75] text-[#9BA5A7] md:text-base">
          <p>
            The leak makes it provable that X&apos;s For-You feed is a
            two-stage system. Stage one is candidate generation — a coarse
            filter that picks ~1,500 tweets out of the ~500M that exist in
            the eligible window. Stage two is the heavy ML ranking — the
            22-signal HeavyRanker, the Banger filter, the Grok Reply Ranking
            tribunal, the brand-safety classifier. Most operators talk about
            stage two because that&apos;s where the drama lives. But
            <strong className="font-semibold text-[#F2F4F5]"> stage one is where most posts die</strong>,
            and stage one is gated by a minimum-traction signal in the first
            window after publication.
          </p>
          <p>
            Concretely: the candidate generator wants signal that <em className="not-italic">other humans</em>{" "}
            already validated the post. Likes, replies, reposts, dwell time,
            profile-clicks-from-this-post — these are the inputs. If none of
            those move within a critical early window, the post does not
            graduate to the ranker. It is not shadowbanned. It is not flagged
            for brand safety. It is simply never considered.
          </p>
          <p>
            This is why &quot;the algorithm killed my reach&quot; is almost
            always wrong. What killed the reach is that the first ~20 followers
            who saw the post in their reverse-chronological feed didn&apos;t
            react fast enough to push the post into the candidate set for the
            next concentric ring. The algorithm did not punish you. The
            algorithm <em className="not-italic">never met you</em>.
          </p>
          <p>
            <strong className="font-semibold text-[#22F0D5]">If you do nothing else with this page:</strong>{" "}
            stop optimizing for the heavy ranker (length, hooks, hashtags,
            emoji density). Optimize instead for the first 30 minutes after
            publish. Tell three friends in advance. Pin the post in your bio
            for the day. Reply to your own post once with a substantive thread
            extension. The gate doesn&apos;t care whether the engagement is
            organic or coordinated — it just needs a pulse before it gives
            you a heartbeat monitor.
          </p>
        </div>
      </section>

      {/* DEEP DIVE — §26 SHADOWBAN TYPES */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::deep dive · § 26
        </p>
        <h2 className="mb-6 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          The four shadowban types — with code support.
        </h2>
        <p className="text-balance text-base leading-relaxed text-[#C8CCCE] md:text-lg">
          &quot;Shadowban&quot; was a vague accusation for a decade. The leak
          makes it precise. There are four distinct mechanisms in the source,
          they live in different files, and the operator&apos;s remediation
          for each is different.
        </p>
        <div className="mt-8 grid gap-4">
          {[
            {
              n: "1",
              label: "search ban",
              gist: "Account does not surface in search results for its handle, display name, or topic tags. Profile page still works if you have the direct URL.",
              fix: "Read your last 30 days of replies. If any look reportable (slurs, harassment, mass-spam patterns), delete and wait ~14 days. Real false-positive cases require an appeal — automated and slow.",
            },
            {
              n: "2",
              label: "ghost ban",
              gist: "Your replies appear visible to you but are hidden from the parent post's thread for non-followers. Looks normal from your seat. Devastating from theirs.",
              fix: "Open your tweet from a logged-out browser. If a recent reply is there, you're fine on that thread. If it's missing, you're ghost-banned on that conversation. Causes are usually rate-limit excess or repeated similar replies.",
            },
            {
              n: "3",
              label: "reply ban (conversation-level)",
              gist: "Specific authors block your replies from ranking on their tweets. Author-level setting, not platform-level. Often the cheapest defensive move a large account takes against a critic.",
              fix: "There is no fix you control. Quote-tweet instead of replying. The leaked code shows quotes route through a different pipeline that the parent author can't suppress.",
            },
            {
              n: "4",
              label: "for-you suppression",
              gist: "Your posts appear in the timelines of followers (chronological + heavy-engager) but are throttled or excluded from For-You candidate generation. The most-suspected and least-talked-about type.",
              fix: "Check brand-safety tier in your profile signals. Repeated link-only posts, NSFW history flags, repeated mass-mention behavior, and ad-domain pings all weigh here. Clean the back-catalog before you appeal — appeals look at history, not the instant.",
            },
          ].map((t) => (
            <div
              key={t.n}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
                  type {t.n}
                </span>
                <h3 className="text-lg font-semibold text-[#F2F4F5] md:text-xl">
                  {t.label}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
                {t.gist}
              </p>
              <div className="mt-4 rounded-lg border border-[#1A2225] bg-[#040608] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                  ::remediation
                </p>
                <p className="mt-2 text-sm leading-[1.65] text-[#9BA5A7]">
                  {t.fix}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-[1.7] text-[#6B7779]">
          All four types are independent. An account can be in zero, one, two,
          or all four states simultaneously. Most &quot;my reach dropped&quot;
          stories are type 4 (For-You suppression). It is also the type least
          visible from inside the account.
        </p>
      </section>

      {/* DEEP DIVE — §30 ANATOMY OF THE PERFECT POST */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::deep dive · § 30
        </p>
        <h2 className="mb-6 text-3xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          Anatomy of the perfect post.
        </h2>
        <p className="text-balance text-base leading-relaxed text-[#C8CCCE] md:text-lg">
          Not the perfect viral post. The perfect post FOR THE RANKER — the
          one that hits the most positive signals and the fewest negative
          ones across the 22-signal HeavyRanker. The leak makes this
          enumerable.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {[
            { k: "length", v: "Long enough for the dwell-time signal to fire. ~280-character ceiling pre-Premium; ~25,000 with Premium. Anything under ~25 words rarely accumulates dwell because there's nothing to read." },
            { k: "media", v: "Native image or native video out-performs link previews by a wide margin. The ranker can extract visual-quality features from native media and assigns higher engagement priors to posts with them. External links lose. Video that loops without sound auto-plays in the feed and accrues impressions even without click — bias toward muted-readable composition." },
            { k: "first sentence", v: "First sentence is the hook for the reader AND the input to the topic classifier. Lead with a concrete claim, not a question. Questions look like low-information posts to the classifier and get demoted in candidate selection." },
            { k: "thread structure", v: "First post takes the heaviest scoring weight. Self-reply within ~5 minutes provides a positive signal that the post is a thread (creator-engaged content). Beyond ~3 self-replies the dwell budget per follower exhausts and additional replies hurt rather than help." },
            { k: "hashtags", v: "0–2 is fine. 3+ is read as spam-pattern by the ranker — it correlates with bot-promoted content in the training data. Hashtags do NOT help discoverability on X the way they do on Instagram. They are a topic-classifier hint, not a discovery vector." },
            { k: "mentions", v: "0–1 is fine. 2+ specific @mentions of accounts unrelated to the post topic is read as engagement-bait and demoted. Quoting another account's post is the better move when you want to surface another voice." },
            { k: "links", v: "External links cost candidate-set probability. The platform wants users to stay in the platform. Workaround: post the link as a reply to your own thread, NOT in the OP. The reply still carries the URL but doesn't trigger the OP penalty." },
            { k: "timing", v: "Post when YOUR followers are active. The first 30 minutes is the min-traction gate (see § 15). For US-business hour audiences: ~9am ET, ~12pm ET, ~6pm ET are the historical windows. For international, post against the cadence of the largest concentration of your followers' timezone, not yours." },
            { k: "reply ratio", v: "Reply count under like count looks healthy. Reply count over like count flags as controversy — sometimes positive (the post is generating debate) but often negative for the brand-safety tier classification. If a post starts ratioed early, mute the conversation rather than feeding it." },
          ].map((row, i) => (
            <div
              key={row.k}
              className={`grid grid-cols-[100px_1fr] items-start gap-4 px-5 py-4 md:grid-cols-[160px_1fr] md:gap-8 md:px-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5] md:text-sm">
                {row.k}
              </span>
              <span className="text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
                {row.v}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#22F0D5]/30 bg-[#0E1418] p-6">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::operator caveat
          </p>
          <p className="mt-3 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
            None of this beats <em className="not-italic text-[#F2F4F5]">having something true to say</em>.
            The algorithm rewards the surface features above, but the
            multiplicative term that beats every one of them is a real
            human reaction. Optimize for the post first, then for the
            ranker. Reverse the order and you get a feed of well-formatted
            nothing.
          </p>
        </div>
      </section>

      {/* WHAT THIS DOC IS NOT */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::honest limits
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.015em] text-[#F2F4F5] md:text-3xl">
            What this page is not.
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
            <li>
              <strong className="font-semibold text-[#FFB87A]">Not the source code.</strong>{" "}
              That lives at{" "}
              <a
                href="https://github.com/xai-org/x-algorithm"
                target="_blank"
                rel="noopener"
                className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
              >
                github.com/xai-org/x-algorithm
              </a>
              . The lab is not redistributing xAI&apos;s Apache-2.0 work; this
              page summarizes structure and surfaces operator-class extensions.
            </li>
            <li>
              <strong className="font-semibold text-[#FFB87A]">Not the numerical weights.</strong>{" "}
              The leak shipped the architecture — file structure, scorer
              wiring, candidate pipeline, feature list. It did not ship the
              learned parameters, the Grok system prompts, or the Phoenix
              production weights. Anyone telling you the exact like-threshold
              for For-You candidacy is guessing.
            </li>
            <li>
              <strong className="font-semibold text-[#FFB87A]">Not legal advice.</strong>{" "}
              Sections that touch shadowban appeal flow, brand-safety
              classification, or platform-level account actions describe what
              the code does. They do not describe what your account&apos;s
              actual standing is, and they do not constitute grounds for any
              specific platform-relations move. If you are a high-stakes
              account, talk to a platform-policy lawyer.
            </li>
            <li>
              <strong className="font-semibold text-[#FFB87A]">Not stable.</strong>{" "}
              xAI ships changes weekly. The May 15 commit is a snapshot. The
              lab will revise this surface as the public repository updates.
            </li>
          </ul>
        </div>
      </section>

      {/* PROVENANCE + LICENSE */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-[#1A2225] bg-gradient-to-br from-[#0A0F11] via-[#0A0F11] to-[#101A1C] p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::provenance + license
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            Source code: published 2026-05-15 by xAI at{" "}
            <code className="font-mono text-sm text-[#22F0D5]">
              github.com/xai-org/x-algorithm
            </code>{" "}
            (Apache 2.0). Analysis: produced by an independent AI builder
            over the weekend of 2026-05-16 to 2026-05-17, two review passes
            over the full 207-file repository. AtomEons received it 2026-05-18
            and republished here with the operator-class extensions (E1–E6)
            and the actionable cheatsheet — CC-BY 4.0.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#6B7779]">
            What is missing from the open source (and therefore from this
            document): the numerical weights, the Grok classifier prompts,
            the BotMaker rule definitions, the Phoenix production model
            weights, the 25+ external xai_* crates. What IS in the document
            is the algorithm&apos;s structure — every filter, every scorer,
            every Grok plan, every feature the model receives. Every claim
            cites the file + line.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/founders-view"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::tonight&apos;s letter
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              The Founder&apos;s View covers it tonight at 8pm ET →
            </p>
          </Link>
          <Link
            href="/research/papers"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::lab research
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              12 ÆoNs Research papers · receipts doctrine →
            </p>
          </Link>
          <Link
            href="/orangebox"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::built through the cockpit
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              ORANGEBOX v6.3 · $99 once · §4A no-saas · receipts on every action →
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
