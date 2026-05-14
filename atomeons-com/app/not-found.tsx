import Link from "next/link";

export const metadata = {
  title: "404 — route not found",
};

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
        Try a route that exists. Most likely you wanted{" "}
        <Link href="/orangebox" className="text-[#ff7a18] underline-offset-4 hover:underline">
          /orangebox
        </Link>
        .
      </p>

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
          See ORANGEBOX
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-[#204538] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#a7b8ad] hover:text-[#f7f0e4]"
        >
          About the lab
        </Link>
      </div>
    </main>
  );
}
