export const metadata = { title: "Refunds · AtomEons" };

export default function Refund() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24">
      <h1 className="text-3xl font-bold tracking-tight">Refund Policy</h1>
      <p className="mt-2 text-xs text-[#a7b8ad]">Last updated: 2026-05-13</p>

      <section className="prose prose-invert mt-8 space-y-4 text-[#f7f0e4]">
        <p>
          ORANGEBOX is a $1 one-time digital download sold as-is with no
          support. Refunds are available only in the following case:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Within 14 days of purchase, if your download link does not
            deliver the file (link expired, file missing, server error).
          </li>
        </ul>
        <p>
          Refunds are not available for: change of mind, inability to
          install Node, unmet hardware/OS requirements, dissatisfaction with
          the prototype, or any reason after a successful download.
        </p>
        <p>
          To request a refund, email{" "}
          <a href="mailto:a.mccree@gmail.com">a.mccree@gmail.com</a> within
          14 days of purchase with your Stripe order ID and a description of
          the download failure.
        </p>
      </section>
    </main>
  );
}
