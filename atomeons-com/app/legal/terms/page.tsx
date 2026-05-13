export const metadata = { title: "Terms · AtomEons" };

export default function Terms() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Sale</h1>
      <p className="mt-2 text-xs text-[#a7b8ad]">
        Last updated: 2026-05-13
      </p>

      <section className="prose prose-invert mt-8 space-y-4 text-[#f7f0e4]">
        <p>
          AtomEons Systems Laboratory (&quot;AtomEons&quot;, &quot;we&quot;)
          sells the ORANGEBOX prototype as a one-time digital download.
        </p>

        <h2 className="mt-6 text-xl font-semibold">1. License</h2>
        <p>
          Your $49 purchase grants you a non-exclusive, non-transferable,
          single-operator license to install and use the included files for
          personal or single-business use. You may not resell, sublicense, or
          redistribute the files.
        </p>

        <h2 className="mt-6 text-xl font-semibold">2. No support</h2>
        <p>
          The product is sold as-is with no support, no warranty of fitness,
          and no service-level commitment. The Opus system manual inside the
          ZIP is the documentation. We do not answer setup questions.
        </p>

        <h2 className="mt-6 text-xl font-semibold">3. Refunds</h2>
        <p>
          Refunds are available within 14 days only if the download link
          fails to deliver the file. See{" "}
          <a href="/legal/refund">refund policy</a>.
        </p>

        <h2 className="mt-6 text-xl font-semibold">4. Operator responsibility</h2>
        <p>
          ORANGEBOX is a local-first cockpit you run on your own machine.
          You are responsible for: Node installation, your operating system,
          your network, your data, and any actions ORANGEBOX takes when you
          authorize them. You retain ownership of your project files.
        </p>

        <h2 className="mt-6 text-xl font-semibold">5. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, AtomEons&apos; total
          liability for any claim arising from this product is limited to
          the amount you paid for it.
        </p>

        <h2 className="mt-6 text-xl font-semibold">6. Governing law</h2>
        <p>State of Florida, United States.</p>

        <h2 className="mt-6 text-xl font-semibold">7. Contact</h2>
        <p>
          AtomEons Systems Laboratory · Marco Island, FL ·{" "}
          <a href="mailto:a.mccree@gmail.com">a.mccree@gmail.com</a>
        </p>
      </section>
    </main>
  );
}
