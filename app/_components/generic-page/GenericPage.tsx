import Link from "next/link";
import type { ContentPage, Section } from "./types";

/**
 * GenericPage · renders workflow-generated content packs.
 *
 * One renderer for the 38 nvidia-tier-50 content pages (trackers,
 * atlases, career, trust, decoders). All 38 use the same JSON shape
 * (see PAGE_SCHEMA in the workflow) so we get one component.
 *
 * Section kinds:
 *  - prose: paragraph body
 *  - table: header row + data rows
 *  - list: bullet items
 *  - cards: title + body + optional meta string per card
 *  - callout: highlighted prose, warning-or-emphasis treatment
 *  - timeline: date/title/body items in chronological order
 *
 * Lab-grade typography. Single accent injected via inline-style so
 * each page can carry its own palette flag without TW jit issues.
 */

export function GenericPage({
  page,
  breadcrumb,
}: {
  page: ContentPage;
  breadcrumb: { label: string; href?: string }[];
}) {
  const accent = page.accent || "#22F0D5";

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
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

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: accent }}
          >
            ::{page.subtitle}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            {page.title}
          </h1>
          <div className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
            {page.intro}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-14">
          {page.sections.map((s, i) => (
            <SectionRenderer key={i} section={s} accent={accent} />
          ))}
        </div>
      </section>

      {/* CITATIONS */}
      {page.citations && page.citations.length > 0 && (
        <section className="border-b border-[#1A2225]">
          <div className="mx-auto w-full max-w-4xl px-6 py-14">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: accent }}
            >
              ::sources cited
            </p>
            <ol className="mt-6 space-y-3">
              {page.citations.map((c, i) => (
                <li
                  key={i}
                  className="flex flex-col gap-1 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4 md:flex-row md:items-baseline md:gap-4"
                >
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em] tabular-nums md:w-8"
                    style={{ color: accent }}
                  >
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <div className="flex-1">
                    <p className="text-sm leading-[1.6] text-[#C8CCCE]">{c.claim}</p>
                    {/^https?:\/\//.test(c.source) ? (
                      <a
                        href={c.source}
                        target="_blank"
                        rel="noopener"
                        className="mt-1 inline-block break-all font-mono text-[11px] text-[#9BA5A7] hover:text-[#22F0D5]"
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

      {/* CROSSLINKS */}
      {page.crosslinks && page.crosslinks.length > 0 && (
        <section className="bg-black">
          <div className="mx-auto w-full max-w-4xl px-6 py-12">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: accent }}
            >
              ::keep going
            </p>
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
        <div className="mt-5 text-base leading-[1.8] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
          {section.body}
        </div>
      )}
      {section.kind === "callout" && section.body && (
        <div
          className="mt-5 rounded-2xl border p-6 md:p-7"
          style={{
            borderColor: `${accent}55`,
            background: `${accent}0c`,
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
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
              {section.body}
            </p>
          )}
          <ul className="mt-5 space-y-2.5">
            {section.listItems.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base"
              >
                <span style={{ color: accent }}>▲</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {section.kind === "table" && section.tableColumns && section.tableRows && (
        <>
          {section.body && (
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
              {section.body}
            </p>
          )}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {section.tableColumns.map((c, i) => (
                    <th
                      key={i}
                      className="border-b border-[#1A2225] px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: accent }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.tableRows.map((row, i) => (
                  <tr key={i} className="border-b border-[#1A2225] last:border-b-0">
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
          </div>
        </>
      )}
      {section.kind === "cards" && section.cards && (
        <>
          {section.body && (
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
              {section.body}
            </p>
          )}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {section.cards.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5"
                style={{ borderLeft: `4px solid ${accent}` }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#F2F4F5]">
                    {card.title}
                  </h3>
                  {card.meta && (
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: accent }}
                    >
                      {card.meta}
                    </p>
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
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
              {section.body}
            </p>
          )}
          <ol className="mt-6 space-y-5 border-l-2 pl-6" style={{ borderColor: `${accent}40` }}>
            {section.timelineItems.map((t, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 12px ${accent}80` }}
                />
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: accent }}
                >
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
