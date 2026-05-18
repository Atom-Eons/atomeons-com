import Link from "next/link";

export const metadata = {
  title: "Checkout cancelled — no charge",
};

export default function Cancel() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-12 pb-24">
      <pre className="select-none overflow-hidden font-mono text-[11px] tracking-tight text-[#1b8b75]">
{`──────────────────────────────────────────────────────
[ STATUS ]    CHECKOUT_CANCELLED
[ CHARGE ]    none
[ CARD ]      not touched
──────────────────────────────────────────────────────`}
      </pre>

      <div className="mt-8 rounded-xl border border-[#204538] bg-[#071915] p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::checkout cancelled
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          No charge made.
        </h1>
        <p className="mt-4 text-[#a7b8ad]">
          You backed out of Stripe checkout. No charge. Nothing was
          touched.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/orangebox#buy"
            className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            Try again · $1 →
          </Link>
          <Link
            href="/orangebox"
            className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm text-[#f7f0e4]"
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
