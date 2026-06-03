import Link from "next/link";

/**
 * LetterPrevNext — bottom-of-page navigation to neighbor letters.
 *
 * Server component. Pure presentation. Either side can be null
 * (first/last letter in the archive).
 */
export function LetterPrevNext({
  prev,
  next,
}: {
  prev: { slug: string; title: string; published_at: string } | null;
  next: { slug: string; title: string; published_at: string } | null;
}) {
  if (!prev && !next) return null;

  function dateChip(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <nav
      aria-label="Adjacent letters"
      className="mt-10 grid gap-3 md:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/founders-view/${prev.slug}`}
          className="group flex flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ← previous letter · {dateChip(prev.published_at)}
          </p>
          <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-lg">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div className="rounded-2xl border border-[#1A2225]/50 bg-[#0A0F11]/50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
            ::first letter in the archive
          </p>
        </div>
      )}
      {next ? (
        <Link
          href={`/founders-view/${next.slug}`}
          className="group flex flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 text-right transition-colors hover:border-[#22F0D5]/40"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            next letter → · {dateChip(next.published_at)}
          </p>
          <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-lg">
            {next.title}
          </p>
        </Link>
      ) : (
        <div className="rounded-2xl border border-[#1A2225]/50 bg-[#0A0F11]/50 p-5 text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
            ::most recent letter
          </p>
        </div>
      )}
    </nav>
  );
}
