import Link from "next/link";

export default function Cancel() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-24 pb-24">
      <div className="rounded-xl border border-[#204538] bg-[#071915] p-8">
        <p className="text-xs uppercase tracking-widest text-[#a7b8ad]">
          Checkout cancelled
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          No charge made.
        </h1>
        <p className="mt-4 text-[#a7b8ad]">
          You backed out of Stripe checkout. No card was charged. You can come
          back any time.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-semibold text-[#06110e]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
