export const metadata = { title: "Privacy · AtomEons" };

export default function Privacy() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-xs text-[#a7b8ad]">Last updated: 2026-05-13</p>

      <section className="prose prose-invert mt-8 space-y-4 text-[#f7f0e4]">
        <h2 className="text-xl font-semibold">What we collect</h2>
        <p>
          When you buy ORANGEBOX, Stripe processes your card payment and
          shares with us your email address, country, and the order ID.
          We do not see your card number.
        </p>

        <h2 className="mt-6 text-xl font-semibold">What we do with it</h2>
        <p>
          We use your email address only to send you the download link and,
          if needed, to deliver a replacement link inside the 30-day window.
          We do not market to you. We do not sell your email.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Subprocessors</h2>
        <ul className="list-disc pl-6">
          <li>Stripe (payment processing, billing receipts)</li>
          <li>Vercel (website hosting and file delivery)</li>
          <li>Email delivery provider (Loops or Resend) for the download link</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Local-first product</h2>
        <p>
          The ORANGEBOX cockpit runs on your machine. Your project files,
          receipts, and party-line messages stay on your disk. We do not
          collect any telemetry from the product itself.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Your rights</h2>
        <p>
          To request deletion of your email address from our records, write
          to <a href="mailto:a.mccree@gmail.com">a.mccree@gmail.com</a>. We
          will delete it within 30 days, except where we must retain payment
          records for tax purposes.
        </p>
      </section>
    </main>
  );
}
