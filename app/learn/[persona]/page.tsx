import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PATHS, getPath, pathLessons, type PathId } from "../_data/paths";
import { getLevel } from "../_data/levels";

/**
 * /learn/[persona] — the path page for one persona.
 *
 * Renders the ordered lesson sequence for that persona, with the why,
 * the fit / not-for, the lesson list with weekly chunking, and the
 * graduation framing.
 */

const PATH_IDS: PathId[] = ["worker", "builder", "student", "operator", "curious"];

export async function generateStaticParams() {
  return PATH_IDS.map((id) => ({ persona: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ persona: string }>;
}): Promise<Metadata> {
  const { persona } = await params;
  const path = getPath(persona as PathId);
  if (!path) return { title: "Path not found · AtomEons" };
  return {
    title: `${path.label} · /learn · AtomEons`,
    description: `${path.oneLine} · ${path.lessons.length} lessons · ~${Math.round(path.totalMinutes / 60)}h · ${path.weeks} weeks · free, CC-BY 4.0.`,
    alternates: { canonical: `https://atomeons.com/learn/${persona}` },
    openGraph: {
      title: path.label,
      description: path.oneLine,
      url: `https://atomeons.com/learn/${persona}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: path.label,
      description: path.oneLine,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PersonaPathPage({
  params,
}: {
  params: Promise<{ persona: string }>;
}) {
  const { persona } = await params;
  const path = getPath(persona as PathId);
  if (!path) notFound();

  const lessons = pathLessons(persona as PathId);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AtomEons",
        item: "https://atomeons.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: "https://atomeons.com/learn",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: path.label,
        item: `https://atomeons.com/learn/${persona}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${path.label} — the ordered lessons`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: lessons.length,
    itemListElement: lessons.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.title,
      url: `https://atomeons.com/learn/lesson/${l.slug}`,
    })),
  };

  // Group lessons into weekly chunks (~3-4 lessons / week at honest pace)
  const lessonsPerWeek = Math.max(1, Math.ceil(lessons.length / path.weeks));
  const weeks: { weekNumber: number; lessons: typeof lessons }[] = [];
  for (let i = 0; i < lessons.length; i += lessonsPerWeek) {
    weeks.push({
      weekNumber: weeks.length + 1,
      lessons: lessons.slice(i, i + lessonsPerWeek),
    });
  }

  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">
            Learn
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> {path.id}
        </p>
      </div>

      {/* HERO */}
      <section
        className="border-b border-[#1A2225]"
        style={{ borderTop: `4px solid ${path.accent}` }}
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: path.accent }}
          >
            ::path · {path.id} · free · cc-by 4.0
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            {path.label}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            {path.oneLine}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
            <span
              className="rounded-full border px-3 py-1.5"
              style={{
                borderColor: path.accent + "55",
                background: path.accent + "12",
                color: path.accent,
              }}
            >
              {lessons.length} lessons
            </span>
            <span
              className="rounded-full border px-3 py-1.5"
              style={{
                borderColor: path.accent + "55",
                background: path.accent + "12",
                color: path.accent,
              }}
            >
              ~{Math.round(path.totalMinutes / 60)}h total
            </span>
            <span
              className="rounded-full border px-3 py-1.5"
              style={{
                borderColor: path.accent + "55",
                background: path.accent + "12",
                color: path.accent,
              }}
            >
              {path.weeks} weeks · honest pace
            </span>
          </div>
        </div>
      </section>

      {/* FIT / NOT FOR */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="rounded-2xl border p-6 md:p-7"
              style={{
                borderColor: path.accent + "55",
                background: path.accent + "0A",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: path.accent }}
              >
                ::fit for
              </p>
              <ul className="mt-4 space-y-2.5">
                {path.fitFor.map((f) => (
                  <li key={f} className="flex gap-3 text-base leading-[1.65] text-[#F2F4F5]">
                    <span style={{ color: path.accent }}>·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#FFB87A]/55 bg-[#FFB87A]/05 p-6 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::NOT for
              </p>
              <ul className="mt-4 space-y-2.5">
                {path.notFor.map((f) => (
                  <li key={f} className="flex gap-3 text-base leading-[1.65] text-[#F2F4F5]">
                    <span className="text-[#FFB87A]">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WEEKLY PLAN */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: path.accent }}
          >
            ::the ordered path · do them in order
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Week by week.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#9BA5A7] md:text-lg">
            Roughly {lessonsPerWeek} lesson{lessonsPerWeek === 1 ? "" : "s"} per
            week is the honest pace for an adult with a job. Faster
            possible. Slower also fine. The order matters more than the
            speed.
          </p>

          <div className="mt-12 space-y-8">
            {weeks.map((wk) => (
              <div key={wk.weekNumber}>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.32em]"
                  style={{ color: path.accent }}
                >
                  ::week {String(wk.weekNumber).padStart(2, "0")}
                </p>
                <div className="mt-4 space-y-3">
                  {wk.lessons.map((l) => {
                    const lvl = getLevel(l.level);
                    return (
                      <Link
                        key={l.slug}
                        href={`/learn/lesson/${l.slug}`}
                        className="group flex flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40 md:p-6"
                        style={{ borderLeftWidth: "3px", borderLeftColor: lvl.accent }}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.28em]"
                            style={{ color: lvl.accent }}
                          >
                            L{l.number} · {lvl.name}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                            ~{l.timeMinutes} min
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-xl">
                          {l.title}
                        </h3>
                        <p className="text-sm leading-[1.6] text-[#9BA5A7]">
                          {l.oneLiner}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAIL CTA */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::part of the AtomEons /learn curriculum · 5 paths · cc-by 4.0
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href={`/learn/lesson/${path.lessons[0]}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] transition-all"
              style={{
                background: path.accent,
                color: "#0B1014",
              }}
            >
              start lesson 1 →
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              back to /learn
            </Link>
            <Link
              href="/learn/library"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              full lesson library
            </Link>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            other paths:{" "}
            {PATHS.filter((p) => p.id !== path.id).map((p, i, arr) => (
              <span key={p.id}>
                <Link
                  href={`/learn/${p.id}`}
                  className="hover:text-[#22F0D5]"
                >
                  {p.id}
                </Link>
                {i < arr.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>
    </main>
  );
}
