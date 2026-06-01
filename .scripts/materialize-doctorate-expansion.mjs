import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const SRC = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/wn2rccbpi.output";
const data = JSON.parse(fs.readFileSync(SRC, "utf8")).result;

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  console.log(`✓ ${rel} · ${content.length} chars`);
}

const lit = (s) => JSON.stringify(String(s ?? ""));

// ── 1. SCI-FI CHAPTERS ────────────────────────────────────────────────

const chapters = data.content.scifiChapters.chapters;

// Index page · chapters listing
write("app/research/lessons-from-sci-fi/chapters/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";

const CHAPTERS = ${JSON.stringify(chapters.map((c) => ({
  slug: c.slug,
  title: c.title,
  subtitle: c.subtitle,
  screenAnchors: c.screenAnchors,
})), null, 2)} as const;

export const metadata: Metadata = {
  title: "Sci-Fi Monograph · Chapters · AtomEons",
  description: \`\${CHAPTERS.length} chapters expanding the AtomEons sci-fi-and-AI monograph. The Holodeck Problem, Data vs Lore, post-2024 sci-fi survey, AI in literary fiction, the off-switch problem dramatized, AI animation tradition, the consent question. CC-BY 4.0.\`,
  alternates: { canonical: "https://atomeons.com/research/lessons-from-sci-fi/chapters" },
};

export default function ChaptersIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/lessons-from-sci-fi" className="hover:text-[#22F0D5]">Lessons From Sci-Fi</Link>{" "}
          <span className="text-[#1A2225]">/</span> Chapters
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::lessons from sci-fi · monograph · chapters · CC-BY 4.0
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            {CHAPTERS.length} chapters.{" "}
            <span className="text-[#22F0D5]">One argument across them.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            The 38-page monograph stays as the single-file canonical
            version. These per-chapter pages are the same material
            broken into readable units · each one a complete argument
            on a specific sci-fi/AI thread.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-3">
          {CHAPTERS.map((c, i) => (
            <Link
              key={c.slug}
              href={\`/research/lessons-from-sci-fi/chapters/\${c.slug}\`}
              className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
              style={{ borderLeftWidth: "4px", borderLeftColor: "#22F0D5" }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                  ::chapter {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">
                {c.title}
              </h2>
              <p className="mt-2 text-base leading-[1.55] text-[#9BA5A7]">{c.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.screenAnchors.slice(0, 5).map((a) => (
                  <span key={a} className="rounded-full border border-[#1A2225] bg-[#0E1418] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    {a}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/research/lessons-from-sci-fi" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
              ← back to overview
            </Link>
            <Link href="/research/lessons-from-sci-fi/tng" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#FFB87A] hover:text-[#F2F4F5]">
              · TNG cross-walk →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
`);

// Dynamic [slug] route for chapter pages
write("app/research/lessons-from-sci-fi/chapters/[slug]/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const CHAPTERS = ${JSON.stringify(chapters, null, 2)} as const;

export async function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CHAPTERS.find((x) => x.slug === slug);
  if (!c) return { title: "Chapter not found · AtomEons" };
  return {
    title: \`\${c.title} · Lessons From Sci-Fi · AtomEons\`,
    description: c.subtitle + " · " + c.intro.slice(0, 200),
    alternates: { canonical: \`https://atomeons.com/research/lessons-from-sci-fi/chapters/\${c.slug}\` },
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CHAPTERS.find((x) => x.slug === slug);
  if (!c) notFound();

  const idx = CHAPTERS.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/lessons-from-sci-fi" className="hover:text-[#22F0D5]">Lessons From Sci-Fi</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/lessons-from-sci-fi/chapters" className="hover:text-[#22F0D5]">Chapters</Link>{" "}
          <span className="text-[#1A2225]">/</span> {c.title}
        </p>
      </div>

      <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::chapter {String(idx + 1).padStart(2, "0")} of {CHAPTERS.length}
        </p>
        <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-5xl">
          {c.title}
        </h1>
        <p className="mt-3 text-balance text-xl leading-[1.3] text-[#FFB87A] md:text-2xl">
          {c.subtitle}
        </p>

        <div className="prose-invert mt-12 max-w-none">
          <p className="text-lg leading-[1.75] text-[#C8CCCE] md:text-xl whitespace-pre-line">
            {c.intro}
          </p>
        </div>

        {c.sections.map((s, i) => (
          <section key={i} className="mt-14">
            <h2 className="text-balance text-2xl font-medium tracking-tight md:text-3xl text-[#F2F4F5]">
              {s.heading}
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
              {s.body}
            </p>
          </section>
        ))}

        {c.keyTakeaways && c.keyTakeaways.length > 0 && (
          <section className="mt-16 rounded-2xl border border-[#22F0D5]/30 bg-[#0e2520]/30 p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::key takeaways</p>
            <ul className="mt-5 space-y-3">
              {c.keyTakeaways.map((t, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#C8CCCE]">
                  <span className="text-[#22F0D5]">▲</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {c.screenAnchors && c.screenAnchors.length > 0 && (
          <section className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#9BA5A7]">::cited works</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.screenAnchors.map((a) => (
                <span key={a} className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9BA5A7]">
                  {a}
                </span>
              ))}
            </div>
          </section>
        )}

        <nav className="mt-16 grid gap-3 border-t border-[#1A2225] pt-8 md:grid-cols-2">
          {prev ? (
            <Link
              href={\`/research/lessons-from-sci-fi/chapters/\${prev.slug}\`}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">← previous chapter</p>
              <p className="mt-2 text-base font-medium text-[#F2F4F5]">{prev.title}</p>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={\`/research/lessons-from-sci-fi/chapters/\${next.slug}\`}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 text-right transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">next chapter →</p>
              <p className="mt-2 text-base font-medium text-[#F2F4F5]">{next.title}</p>
            </Link>
          ) : <div />}
        </nav>
      </article>
    </main>
  );
}
`);

// ── 2. TNG CROSSWALK ──────────────────────────────────────────────────

const tng = data.strategy.tngCrosswalk;
write("app/research/lessons-from-sci-fi/tng/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";

const FRAMING = ${lit(tng.framing)};
const EPISODES = ${JSON.stringify(tng.episodes, null, 2)} as const;

export const metadata: Metadata = {
  title: "Star Trek: TNG → AI Ethics Cross-Walk · AtomEons",
  description: \`\${EPISODES.length} TNG episodes mapped to modern AI safety, ethics, and capability concepts. The Measure of a Man, I Borg, Ship in a Bottle, The Quality of Life, The Offspring. The anthology that previewed every AI dilemma we have today. CC-BY 4.0.\`,
  alternates: { canonical: "https://atomeons.com/research/lessons-from-sci-fi/tng" },
  openGraph: {
    title: "Star Trek: TNG → AI Ethics Cross-Walk",
    description: \`\${EPISODES.length} episodes mapped to modern AI concepts. CC-BY 4.0.\`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "TNG → AI Ethics Cross-Walk", description: \`\${EPISODES.length} episodes mapped\` },
  robots: { index: true, follow: true },
};

export default function TNGPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/lessons-from-sci-fi" className="hover:text-[#22F0D5]">Lessons From Sci-Fi</Link>{" "}
          <span className="text-[#1A2225]">/</span> TNG cross-walk
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::Star Trek · The Next Generation · {EPISODES.length} episodes mapped
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            TNG dramatized{" "}
            <span className="text-[#FFB87A]">every AI dilemma we have today.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg whitespace-pre-line">
            {FRAMING}
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-5">
          {EPISODES.map((e, i) => (
            <article key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7" style={{ borderLeft: "4px solid #FFB87A" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">::{e.season_episode}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{e.ai_concept}</p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{e.episode}</h2>
              <p className="mt-4 text-base leading-[1.7] text-[#C8CCCE]">{e.synopsis}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">::modern parallel</p>
                  <p className="mt-2 text-sm leading-[1.6] text-[#C8CCCE]">{e.modern_parallel}</p>
                </div>
                <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::lesson</p>
                  <p className="mt-2 text-sm leading-[1.6] text-[#C8CCCE]">{e.lesson}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/research/lessons-from-sci-fi" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to overview</Link>
          {" · "}
          <Link href="/research/lessons-from-sci-fi/chapters" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">all chapters →</Link>
        </div>
      </section>
    </main>
  );
}
`);

// ── 3. AI VIDEOS PAGE · with click-to-load LiteYouTube ────────────────

const videos = data.content.videos.videos;

// LiteYouTube client component · click-to-load · zero perf cost until clicked
write("app/_components/LiteYouTube.tsx", `"use client";

import { useState } from "react";

/**
 * LiteYouTube · click-to-load YouTube embed.
 * Renders a static thumbnail until the user clicks · then mounts the iframe.
 * Zero YouTube JS on initial page load · Vercel-cost-safe · respects
 * the operator's no-third-party-tracking posture (no preloading).
 */
export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={\`https://www.youtube-nocookie.com/embed/\${id}?autoplay=1&rel=0\`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-[#0A0F11]"
      aria-label={\`Play video: \${title}\`}
    >
      <img
        src={\`https://i.ytimg.com/vi/\${id}/hqdefault.jpg\`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-black/75 transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#FF7A1A]"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
    </button>
  );
}
`);

write("app/learn/videos/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import LiteYouTube from "@/app/_components/LiteYouTube";

const VIDEOS = ${JSON.stringify(videos, null, 2)} as const;

export const metadata: Metadata = {
  title: "AI videos · curated · /learn · AtomEons",
  description: \`\${VIDEOS.length} vetted AI videos · no hype · real value. 3Blue1Brown's neural-nets series, Karpathy's 'Let's build GPT', Robert Miles AI Safety, StatQuest ML, Stanford CS25, Lex Fridman with Hinton/Sutskever/Karpathy. Curated by level + category. Free. CC-BY 4.0.\`,
  alternates: { canonical: "https://atomeons.com/learn/videos" },
  openGraph: {
    title: \`AI videos · \${VIDEOS.length} vetted · /learn\`,
    description: "No hype. Real value. Curated by level + category. CC-BY 4.0.",
    url: "https://atomeons.com/learn/videos",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI videos · curated", description: \`\${VIDEOS.length} vetted · free\` },
  robots: { index: true, follow: true },
};

const CATEGORIES = Array.from(new Set(VIDEOS.map((v) => v.category)));

export default function VideosPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Videos
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI videos · {VIDEOS.length} vetted · zero hype
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            The AI videos{" "}
            <span className="text-[#22F0D5]">that actually teach you something.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Click-to-load embeds · no YouTube JS until you press play.
            Curated by category and skill level. Real creators we&apos;ve
            watched and learned from. Zero affiliate revenue.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <a key={cat} href={\`#cat-\${cat.replace(/\\s+/g, "-")}\`} className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20 space-y-16">
          {CATEGORIES.map((cat) => {
            const items = VIDEOS.filter((v) => v.category === cat);
            return (
              <div key={cat} id={\`cat-\${cat.replace(/\\s+/g, "-")}\`} className="scroll-mt-20">
                <h2 className="text-3xl font-semibold tracking-tight text-[#22F0D5] md:text-4xl">{cat}</h2>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  {items.map((v) => (
                    <article key={v.youtube_id || v.title} className="space-y-3">
                      {v.youtube_id ? (
                        <LiteYouTube id={v.youtube_id} title={v.title} />
                      ) : (
                        <a href={\`https://www.youtube.com/results?search_query=\${encodeURIComponent(v.title + " " + v.creator)}\`} target="_blank" rel="noopener" className="flex aspect-video w-full items-center justify-center rounded-xl border border-[#1A2225] bg-[#0A0F11] text-center text-sm text-[#9BA5A7] hover:border-[#22F0D5]/40">
                          search YouTube ↗
                        </a>
                      )}
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-semibold leading-snug text-[#F2F4F5]">{v.title}</h3>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                          {v.creator} · {v.duration_min}min · {v.level}
                        </p>
                        <p className="text-sm leading-[1.6] text-[#C8CCCE]">{v.why_watch}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
`);

// ── 4. FERRISS SYNTHESIS PAGES · /learn/synthesis index + [slug] ───────

const syntheses = data.content.ferrissSyntheses.syntheses;

write("app/learn/synthesis/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";

const SYNTHESES = ${JSON.stringify(syntheses.map((s) => ({
  slug: s.slug,
  topic: s.topic,
  minimumEffectiveDose: s.minimumEffectiveDose.slice(0, 220),
})), null, 2)} as const;

export const metadata: Metadata = {
  title: "AI · Tim-Ferriss-style synthesis · /learn · AtomEons",
  description: \`\${SYNTHESES.length} ruthless minimum-effective-dose distillations of core AI concepts. DiSSS framework · fear-setting · 80/20 cut · tribe of mentors. The 5-minute version of each AI topic you'd otherwise spend a weekend on. CC-BY 4.0.\`,
  alternates: { canonical: "https://atomeons.com/learn/synthesis" },
};

export default function SynthesisIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Synthesis
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::Tim-Ferriss-style AI synthesis · {SYNTHESES.length} distillations
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            The 5-minute version{" "}
            <span className="text-[#22F0D5]">of each AI topic.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Minimum Effective Dose. Fear-setting. DiSSS framework. 80/20
            cut. Tribe of Mentors. Each topic distilled to the smallest
            unit that still moves the operator forward. Ruthless on
            purpose.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 space-y-3">
          {SYNTHESES.map((s, i) => (
            <Link key={s.slug} href={\`/learn/synthesis/\${s.slug}\`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40" style={{ borderLeftWidth: "4px", borderLeftColor: "#22F0D5" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">{s.topic}</h2>
              <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">{s.minimumEffectiveDose}…</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
`);

write("app/learn/synthesis/[slug]/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SYNTHESES = ${JSON.stringify(syntheses, null, 2)} as const;

export async function generateStaticParams() {
  return SYNTHESES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SYNTHESES.find((x) => x.slug === slug);
  if (!s) return { title: "Not found · AtomEons" };
  return {
    title: \`\${s.topic} · synthesis · /learn · AtomEons\`,
    description: s.minimumEffectiveDose.slice(0, 200),
    alternates: { canonical: \`https://atomeons.com/learn/synthesis/\${s.slug}\` },
  };
}

export default async function SynthesisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SYNTHESES.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/synthesis" className="hover:text-[#22F0D5]">Synthesis</Link>{" "}
          <span className="text-[#1A2225]">/</span> {s.topic}
        </p>
      </div>
      <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20 space-y-10">
        <header>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::synthesis · Tim-Ferriss method</p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-5xl">{s.topic}</h1>
        </header>

        <section className="rounded-2xl border border-[#22F0D5]/40 bg-[#0e2520]/30 p-7 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::minimum effective dose</p>
          <p className="mt-4 text-[17px] leading-[1.75] text-[#C8CCCE] md:text-[18px] whitespace-pre-line">{s.minimumEffectiveDose}</p>
        </section>

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::DiSSS · deconstruction questions</p>
          <ol className="mt-4 space-y-2">
            {s.dissectedFrameworks.map((q, i) => (
              <li key={i} className="flex gap-3 text-base leading-[1.65] text-[#C8CCCE]">
                <span className="font-mono text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-6 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">::fear-setting</p>
          <p className="mt-3 text-base leading-[1.7] text-[#C8CCCE]">{s.fearSetting}</p>
        </section>

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::80 / 20 cut</p>
          <p className="mt-3 text-base leading-[1.7] text-[#C8CCCE]">{s.eightyTwentyCut}</p>
        </section>

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::tribe of mentors · paraphrased stances</p>
          <div className="mt-4 space-y-3">
            {s.tribeOfMentors.map((m, i) => (
              <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="text-sm font-semibold text-[#22F0D5]">{m.expert}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{m.credential}</p>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">{m.quote_paraphrase}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#22F0D5]/40 bg-[#0e2520]/30 p-6 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::real-world test · this week</p>
          <p className="mt-3 text-base leading-[1.7] text-[#C8CCCE]">{s.realWorldTest}</p>
        </section>

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::action items · ranked</p>
          <ol className="mt-4 space-y-2">
            {s.actionItems.map((a, i) => (
              <li key={i} className="flex gap-3 text-base leading-[1.65] text-[#C8CCCE]">
                <span className="font-mono text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </section>

        <nav className="border-t border-[#1A2225] pt-6">
          <Link href="/learn/synthesis" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← all syntheses</Link>
        </nav>
      </article>
    </main>
  );
}
`);

// ── 5. DOCTORATE-PATH PAGES · /learn/deep/[topic] ─────────────────────

const doctoratePages = data.content.doctoratePages.pages;

write("app/learn/deep/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";

const PAGES = ${JSON.stringify(doctoratePages.map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
})), null, 2)} as const;

export const metadata: Metadata = {
  title: "Deep · self-directed AI doctorate path · /learn · AtomEons",
  description: \`\${PAGES.length} doctorate-grade deep-dive pages. Math prerequisites, foundational ML, transformers from scratch, RLHF & alignment, mechanistic interpretability, multimodal models, agents, AI safety, capability evals, frontier research patterns. CC-BY 4.0.\`,
  alternates: { canonical: "https://atomeons.com/learn/deep" },
};

export default function DeepIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Deep
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::doctorate-grade · self-directed · {PAGES.length} deep-dives
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            A way to keep{" "}
            <span className="text-[#22F0D5]">learning more here.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            A self-directed PhD-grade AI track that lives on this site
            forever. Real papers. Real textbooks. Real exercises with
            observable milestones. Free.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 space-y-3">
          {PAGES.map((p, i) => (
            <Link key={p.slug} href={\`/learn/deep/\${p.slug}\`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40" style={{ borderLeftWidth: "4px", borderLeftColor: "#22F0D5" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::deep {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">{p.title}</h2>
              <p className="mt-2 text-base text-[#9BA5A7]">{p.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
`);

write("app/learn/deep/[topic]/page.tsx", `import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const PAGES = ${JSON.stringify(doctoratePages, null, 2)} as const;

export async function generateStaticParams() {
  return PAGES.map((p) => ({ topic: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const p = PAGES.find((x) => x.slug === topic);
  if (!p) return { title: "Not found" };
  return {
    title: \`\${p.title} · deep · /learn · AtomEons\`,
    description: p.intro.slice(0, 200),
    alternates: { canonical: \`https://atomeons.com/learn/deep/\${p.slug}\` },
  };
}

export default async function DeepTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const p = PAGES.find((x) => x.slug === topic);
  if (!p) notFound();

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/deep" className="hover:text-[#22F0D5]">Deep</Link>{" "}
          <span className="text-[#1A2225]">/</span> {p.title}
        </p>
      </div>
      <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20 space-y-12">
        <header>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::deep-dive</p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-5xl">{p.title}</h1>
          <p className="mt-3 text-xl leading-[1.3] text-[#FFB87A] md:text-2xl">{p.subtitle}</p>
        </header>

        <section>
          <p className="text-lg leading-[1.8] text-[#C8CCCE] md:text-[18px] whitespace-pre-line">{p.intro}</p>
        </section>

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::reading path · in order</p>
          <ol className="mt-5 space-y-4">
            {p.readingPath.map((r, i) => (
              <li key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::{String(i + 1).padStart(2, "0")} · {r.type}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">~{r.estimatedHours}h</p>
                </div>
                <p className="mt-3 text-base font-medium text-[#F2F4F5]">{r.resource}</p>
                <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{r.why}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-7 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">::exercises · build · derive · reproduce</p>
          <ol className="mt-5 space-y-3">
            {p.exercises.map((e, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#C8CCCE]">
                <span className="font-mono text-[#FFB87A]">{String(i + 1).padStart(2, "0")}</span>
                <span>{e}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-[#22F0D5]/40 bg-[#0e2520]/30 p-7 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::milestones · observable</p>
          <ul className="mt-5 space-y-3">
            {p.milestones.map((m, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#C8CCCE]">
                <span className="text-[#22F0D5]">▲</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav className="border-t border-[#1A2225] pt-6 text-center">
          <Link href="/learn/deep" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← all deep-dives</Link>
        </nav>
      </article>
    </main>
  );
}
`);

// ── DONE ─────────────────────────────────────────────────────────────

console.log("\n✓ materialization complete");
console.log(`  · /research/lessons-from-sci-fi/chapters (index) + [slug] (${chapters.length} chapters)`);
console.log(`  · /research/lessons-from-sci-fi/tng (${tng.episodes.length} TNG episodes)`);
console.log(`  · /learn/videos (${videos.length} videos · LiteYouTube click-to-load)`);
console.log(`  · /learn/synthesis (index) + [slug] (${syntheses.length} Ferriss distillations)`);
console.log(`  · /learn/deep (index) + [topic] (${doctoratePages.length} deep-dive pages)`);
