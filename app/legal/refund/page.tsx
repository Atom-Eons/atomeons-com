import Link from "next/link";

export const metadata = {
  title: "Refund Policy · AtomEons",
  description:
    "ORANGEBOX Command refund policy. 30-day Material Failure Guarantee + 30-day Workflow-Fit Refund. Both paths are full-refund. Email a.mccree@gmail.com with the Stripe order ID.",
  alternates: { canonical: "https://atomeons.com/legal/refund" },
};

export default function Refund() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24 text-[#F2F4F5]">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
        <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
        <span className="text-[#1A2225]">/</span>{" "}
        <Link href="/legal/terms" className="hover:text-[#22F0D5]">Legal</Link>{" "}
        <span className="text-[#1A2225]">/</span> Refund Policy
      </p>

      <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
        Refund Policy.
      </h1>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
        ::effective 2026-05-23 · supersedes the 2026-05-13 download-only
        version
      </p>

      <section className="mt-10 space-y-6 text-[15px] leading-[1.75] text-[#C8CCCE]">
        <p>
          ORANGEBOX Command is a <strong className="text-[#F2F4F5]">$49 USD
          one-time</strong> digital purchase. Two refund paths apply. Both
          are full-refund. Both run for thirty days from the date of
          payment.
        </p>

        <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::path 1 · material failure guarantee (mfg)
          </p>
          <p className="mt-3">
            Full refund within thirty days of purchase if ORANGEBOX fails
            to install or fails to launch on a clean Windows 10 or
            Windows 11 (x64) machine running Node.js 20+. The failure
            must be reproducible. Email{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20MFG%20refund%20claim"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              a.mccree@gmail.com
            </a>{" "}
            with your Stripe order ID, the OS version, the Node version,
            and a 5-line repro (what command, what error). The lab
            confirms within 48 hours and Stripe processes the refund to
            the original payment method within 5 business days.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFB87A]/30 bg-[#0A0F11] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
            ::path 2 · workflow-fit refund
          </p>
          <p className="mt-3">
            Full refund within thirty days of purchase if ORANGEBOX
            doesn&apos;t fit your workflow, for any reason. No repro
            needed. No question asked. Email{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20Workflow-Fit%20refund"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              a.mccree@gmail.com
            </a>{" "}
            with your Stripe order ID. Stripe processes the refund to the
            original payment method within 5 business days.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-medium text-[#F2F4F5]">
          What is NOT refundable.
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Anything outside the 30-day window. After day 30 the sale
            is final.
          </li>
          <li>
            A claim that the lab cannot reach you at the email address
            on the Stripe order. Use a real email at checkout.
          </li>
          <li>
            Demands for refund based on someone else&apos;s opinion of
            the product (a YouTube review, a tweet). The license is to
            the buyer; only the buyer can claim a refund on their own
            order.
          </li>
          <li>
            Chargebacks filed without first emailing the lab. Stripe
            chargebacks initiated without contact are contested.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-medium text-[#F2F4F5]">
          What the §4A no-saas lock means for refunds.
        </h2>
        <p>
          License §4A binds AtomEons to never switch ORANGEBOX to a
          subscription model. If we ever attempt to, every existing
          buyer keeps their license free in perpetuity. That commitment
          does not interact with the 30-day refund windows; it is a
          separate clause that runs forever.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-[#F2F4F5]">
          The legacy $1 buyer cohort.
        </h2>
        <p>
          Buyers who paid $1 on the v6.0 / v6.1 ladder before
          2026-05-23 keep the original 30-day window from their original
          purchase date and the same two refund paths. The legacy ladder
          itself is retired; the refund posture is preserved.
        </p>

        <p className="mt-10 text-sm text-[#6B7779]">
          Contact:{" "}
          <a
            href="mailto:a.mccree@gmail.com"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            a.mccree@gmail.com
          </a>{" "}
          · AtomEons Systems Laboratory · Marco Island, FL.
        </p>
      </section>
    </main>
  );
}
