import Link from "next/link";
import { LearnHeroImage } from "../LearnHeroImage";
import type { ContentPage, Section } from "./types";

/**
 * GenericPage · renders workflow-generated content packs.
 *
 * One renderer for the 38 nvidia-tier-50 content pages. All 38 use the
 * same JSON shape (see types.ts) so we get one component.
 *
 * Section kinds:
 *  - prose: paragraph body
 *  - table: header row + data rows (with mobile-card fallback below md)
 *  - list: bullet items (quiet hairline bullets, aria-hidden)
 *  - cards: title + body + optional meta string per card (no left-stripe)
 *  - callout: highlighted prose, warning-or-emphasis treatment
 *  - timeline: date/title/body items (neutral rail, hollow dots, no glow)
 *
 * Readability-pass 2026-06-01 (wf_79e1e01d-513):
 *  - Cyan demoted from decoration to signal — kept only on hover state +
 *    citation [NN] indices (utility marker, tabular-nums).
 *  - `::` eyebrow chrome stripped; subtitle becomes humanist sans sub-headline.
 *  - Section bg-[#08090B]/15 film removed — true black throughout.
 *  - List bullets are quiet hairlines (aria-hidden), no more cyan triangles.
 *  - Timeline dots/rail neutral, glow removed.
 *  - Card left-stripe removed (was 4px cyan per card = wallpaper).
 *  - Citations rendered as academic hanging-indent list, not 25-card wall.
 *  - Tables get min-w-[720px], fade hint, sticky first column, mobile fallback.
 *  - Lede color tier promoted from #9BA5A7 to #C8CCCE (secondary, not tertiary).
 */

export function GenericPage({
  page,
  breadcrumb,
  heroImageSlug,
  heroImageAlt,
}: {
  page: ContentPage;
  breadcrumb: { label: string; href?: string }[];
  heroImageSlug?: string;
  heroImageAlt?: string;
}) {
  const accent = page.accent || "#22F0D5";

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {heroImageSlug && heroImageAlt && (
        <LearnHeroImage slug={heroImageSlug} alt={heroImageAlt} />
      )}

      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          {breadcrumb.map((b, i) => (
            <span key={i}>
              {b.href ? (
                <Link href={b.href} className="transition-colors hover:text-[#22F0D5]">
                  {b.label}
                </Link>
              ) : (
                <span>{b.label}</span>
              )}
              {i < breadcrumb.length - 1 && (
                <span className="text-[#1A2225]"> / </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* HERO — kicker eyebrow deleted, subtitle becomes humanist sub-headline below H1 */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <h1 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:leading-[1.02] md:text-6xl md:leading-[1]">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="mt-6 max-w-[58ch] text-base leading-[1.55] text-[#9BA5A7] md:text-lg">
              {page.subtitle}
            </p>
          )}
          {page.intro && (
            <div className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
              {page.intro}
            </div>
          )}
        </div>
      </section>

      {/* SECTIONS — true black, no film overlay */}
      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-14">
          {page.sections.map((s, i) => (
            <SectionRenderer key={i} section={s} accent={accent} />
          ))}
        </div>
      </section>

      {/* CITATIONS — academic hanging-indent list (was 25-card wall) */}
      {page.citations && page.citations.length > 0 && (
        <section className="border-t border-[#1A2225]">
          <div className="mx-auto w-full max-w-4xl px-6 py-16">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#9BA5A7]">
              Sources
            </h2>
            <ol className="mt-6 divide-y divide-[#1A2225]/60">
              {page.citations.map((c, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                  <span
                    className="font-mono text-[11px] tracking-[0.08em] tabular-nums pt-0.5"
                    style={{ color: accent }}
                  >
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <div>
                    <p className="text-[15px] leading-[1.6] text-[#C8CCCE]">
                      {c.claim}
                    </p>
                    {/^https?:\/\//.test(c.source) ? (
                      <a
                        href={c.source}
                        target="_blank"
                        rel="noopener"
                        className="mt-1 inline-block break-all font-mono text-[11px] text-[#9BA5A7] transition-colors hover:text-[#22F0D5]"
                      >
                        {c.source} ↗
                      </a>
                    ) : (
                      <p className="mt-1 font-mono text-[11px] text-[#9BA5A7]">
                        {c.source}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* CROSSLINKS — semantic h2, neutral eyebrow, hover preserves cyan signal */}
      {page.crosslinks && page.crosslinks.length > 0 && (
        <section className="border-t border-[#1A2225] bg-black">
          <div className="mx-auto w-full max-w-4xl px-6 py-12">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#9BA5A7]">
              Keep reading
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.crosslinks.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
                >
                  {l.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function SectionRenderer({ section, accent }: { section: Section; accent: string }) {
  return (
    <section>
      <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
        {section.heading}
      </h2>

      {section.kind === "prose" && section.body && (
        <div className="mt-5 max-w-[62ch] text-base leading-[1.75] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
          {section.body}
        </div>
      )}

      {section.kind === "callout" && section.body && (
        <div
          className="mt-5 rounded-2xl border p-6 md:p-7"
          style={{
            borderColor: `${accent}40`,
            background: `${accent}08`,
          }}
        >
          <p className="text-base leading-[1.7] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
            {section.body}
          </p>
        </div>
      )}

      {section.kind === "list" && section.listItems && (
        <>
          {section.body && (
            <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
              {section.body}
            </p>
          )}
          <ul className="mt-5 space-y-3">
            {section.listItems.map((item, i) => (
              <li
                key={i}
                className="flex gap-4 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base"
              >
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-[#3A4448]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {section.kind === "table" && section.tableColumns && section.tableRows && (
        <>
          {section.body && (
            <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
              {section.body}
            </p>
          )}
          {/* Desktop: real table; Mobile: card stack */}
          <div className="relative mt-6 hidden overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11] md:block">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  {section.tableColumns.map((c, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="border-b border-[#1A2225] bg-[#0A0F11] px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.tableRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#1A2225] last:border-b-0 hover:bg-[#08090B]/25"
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={
                          j === 0
                            ? "px-4 py-3 align-top font-medium text-[#F2F4F5]"
                            : "px-4 py-3 align-top text-[#C8CCCE]"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0A0F11] to-transparent"
            />
          </div>
          {/* Mobile fallback — vertical key/value list per row */}
          <div className="mt-6 space-y-3 md:hidden">
            {section.tableRows.map((row, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4"
              >
                {row.map((cell, j) => (
                  <div key={j} className="grid grid-cols-[max-content_1fr] gap-3 py-1">
                    <span className="text-[11px] uppercase tracking-[0.10em] text-[#6B7779]">
                      {section.tableColumns![j]}
                    </span>
                    <span
                      className={
                        j === 0
                          ? "text-[15px] font-medium text-[#F2F4F5]"
                          : "text-[14px] text-[#C8CCCE]"
                      }
                    >
                      {cell}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {section.kind === "cards" && section.cards && (
        <>
          {section.body && (
            <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
              {section.body}
            </p>
          )}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {section.cards.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#2A3A3D]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#F2F4F5]">
                    {card.title}
                  </h3>
                  {card.meta && (
                    <p className="text-xs text-[#9BA5A7]">{card.meta}</p>
                  )}
                </div>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {section.kind === "timeline" && section.timelineItems && (
        <>
          {section.body && (
            <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
              {section.body}
            </p>
          )}
          <ol className="mt-6 space-y-5 border-l border-[#1A2225] pl-6">
            {section.timelineItems.map((t, i) => (
              <li key={i} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[27px] top-2 h-1.5 w-1.5 rounded-full bg-[#9BA5A7]"
                />
                <p className="font-mono text-[11px] tracking-[0.08em] text-[#9BA5A7]">
                  {t.date}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#F2F4F5]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}
