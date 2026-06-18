import Link from "next/link";

export const metadata = {
  title: "Download not started — no charge",
};

export default function Cancel() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-12 pb-24">
      <pre className="select-none overflow-hidden font-mono text-[11px] tracking-tight text-[#1b8b75]">
{`──────────────────────────────────────────────────────
[ STATUS ]    DOWNLOAD_NOT_STARTED
[ CHARGE ]    none
[ CARD ]      not touched
──────────────────────────────────────────────────────`}
      </pre>

      <div className="mt-8 rounded-xl border border-[#1F242B] bg-[#0F1114] p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::download not started
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          No charge made.
        </h1>
        <p className="mt-4 text-[#a7b8ad]">
          You left before the download started. No charge. Nothing was
          touched.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/orangebox#buy"
            className="rounded-md border border-[#22F0D5] bg-[#22F0D5] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            Free download →
          </Link>
          <Link
            href="/orangebox"
            className="rounded-md border border-[#1F242B] bg-[#0F1114] px-4 py-2 text-sm text-[#f7f0e4]"
          >
            See the full cockpit
          </Link>
          <Link
            href="/"
            className="rounded-md px-4 py-2 text-sm text-[#a7b8ad] hover:text-[#f7f0e4]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
