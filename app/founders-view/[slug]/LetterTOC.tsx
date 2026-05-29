/**
 * LetterTOC — auto-derived table of contents from the body's h2 markers.
 *
 * Server component. Pure presentation. Only renders if the letter has
 * 3+ headings — short letters don't need a TOC. Each item is an
 * anchor link to #<slug>, where the slug matches what the
 * renderMarkdown function (in page.tsx) generates for each h2.
 */
export function LetterTOC({
  headings,
}: {
  headings: { text: string; slug: string }[];
}) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Letter contents"
      className="mt-10 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
        ::in this letter · {headings.length} sections
      </p>
      <ol className="mt-4 space-y-2">
        {headings.map((h, i) => (
          <li key={h.slug} className="flex items-start gap-3">
            <span
              className="mt-0.5 shrink-0 font-mono text-xs font-bold tabular-nums text-[#22F0D5]"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${h.slug}`}
              className="text-sm leading-[1.5] text-[#C8CCCE] underline-offset-4 transition-colors hover:text-[#22F0D5] hover:underline md:text-base"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
