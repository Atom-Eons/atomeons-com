import Link from "next/link";
import { AeMark } from "./_components/AeMark";

export const metadata = {
  title: "404 — route not found",
};

/**
 * Custom 404. The cockpit returns FAILED honestly instead of fake-green.
 * Updated wave-14: surface every major section so a 404 becomes a discovery
 * moment rather than a dead end — Æ Research, Founder's View, /now, /mistakes,
 * the cockpit itself, and a soft note about why we even bother with this page.
 */
export default function NotFound() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24">
      <pre className="select-none overflow-hidden font-mono text-[11px] tracking-tight text-[#1b8b75]">
{`──────────────────────────────────────────────────────
[ STATUS ]    404 NOT_FOUND
[ ROUTE ]     unknown
[ COCKPIT ]   refused to fake green
──────────────────────────────────────────────────────`}
      </pre>

      <h1 className="mt-8 text-balance text-5xl font-black leading-[1.04] tracking-tight md:text-7xl">
        That route is{" "}
        <span className="text-[#ff4f5e]">not on the DAG</span>.
      </h1>

      <p className="mt-6 max-w-xl text-pretty text-[#a7b8ad]">
        The cockpit returned <span className="font-mono text-[#ff7a18]">FAILED</span>{" "}
        instead of fake green. That is the point.
      </p>

      <p className="mt-6 max-w-xl text-pretty text-[#a7b8ad]">
        If a real link broke us getting you here, that becomes a row on{" "}
        <Link
          href="/mistakes"
          className="text-[#22F0D5] underline-offset-4 hover:underline"
        >
          the Mistakes Ledger
        </Link>
        . Email{" "}
        <a
          href="mailto:a.mccree@gmail.com?subject=404%20on%20atomeons.com"
          className="text-[#22F0D5] underline-offset-4 hover:underline"
        >
          a.mccree@gmail.com
        </a>{" "}
        with the URL — we file it within an hour.
      </p>

      {/* Discovery rail — every major section, one card each */}
      <div className="mt-12">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={18} glow />
          ::routes that exist · pick one
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/orangebox"
            className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#FF7A1A]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              ::cockpit · $1 ladder · v6.0
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F4F5] group-hover:text-[#FF7A1A]">
              Æ ORANGEBOX →
            </p>
          </Link>
          <Link
            href="/founders-view"
            className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#FF7A1A]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              ::nightly broadcast · 8pm ET
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F4F5] group-hover:text-[#FF7A1A]">
              The Founder&apos;s View →
            </p>
          </Link>
          <Link
            href="/research/papers"
            className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::Æ research · 12 manuscripts
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              Research Papers →
            </p>
          </Link>
          <Link
            href="/now"
            className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::lab now · live counters
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              /now → what we&apos;re doing
            </p>
          </Link>
          <Link
            href="/skilski"
            className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::skill marketplace · MCP
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              Æ skil.ski →
            </p>
          </Link>
          <Link
            href="/b00kmakor"
            className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::AI publishing house · coming
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              Æ B00KMakor →
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
          style={{ color: "#000", WebkitTextFillColor: "#000" }}
        >
          Back to home
        </Link>
        <Link
          href="/orangebox"
          className="rounded-md border border-[#204538] bg-[#071915] px-5 py-2.5 text-sm font-semibold text-[#f7f0e4]"
        >
          Buy ORANGEBOX · $1
        </Link>
        <Link
          href="/research/about"
          className="rounded-md border border-[#204538] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#a7b8ad] hover:text-[#f7f0e4]"
        >
          About the lab
        </Link>
      </div>
    </main>
  );
}
