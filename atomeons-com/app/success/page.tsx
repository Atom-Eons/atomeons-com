import Link from "next/link";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-24 pb-24">
      <div className="rounded-xl border border-[#75ff92]/40 bg-[#0a211b] p-8">
        <p className="text-xs uppercase tracking-widest text-[#75ff92]">
          Order received
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Thanks. Check your email.
        </h1>
        <p className="mt-4 text-[#a7b8ad]">
          Your download link is being sent to the email you used at checkout.
          The link is valid for 30 days. Save the ZIP when it arrives.
        </p>
        {session_id ? (
          <p className="mt-4 text-xs text-[#a7b8ad]">
            Order:{" "}
            <span className="font-mono text-[#f7f0e4]">{session_id}</span>
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row">
          <Link
            href="/"
            className="rounded-md border border-[#204538] bg-[#04100d] px-4 py-2 text-[#f7f0e4]"
          >
            Back to home
          </Link>
          <a
            href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20download%20issue"
            className="rounded-md border border-[#204538] bg-[#04100d] px-4 py-2 text-[#a7b8ad]"
          >
            Email never arrived?
          </a>
        </div>
      </div>
      <p className="mt-6 text-xs text-[#a7b8ad]">
        No support is included with this purchase. The full Opus system manual
        is inside the ZIP.
      </p>
    </main>
  );
}
