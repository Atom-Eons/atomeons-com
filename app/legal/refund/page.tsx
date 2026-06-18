import Link from "next/link";

export const metadata = {
  title: "Install Support Guarantee · AtomEons",
  description:
    "Orange³ and AI Bookmaker ship free always. There is nothing to refund. This guarantee covers install support and a 30-day replacement for download/install issues. a.mccree@gmail.com.",
  alternates: { canonical: "https://atomeons.com/legal/refund" },
};

export default function Refund() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24 text-[#F2F4F5]">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
        <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
        <span className="text-[#1A2225]">/</span>{" "}
        <Link href="/legal/terms" className="hover:text-[#22F0D5]">Legal</Link>{" "}
        <span className="text-[#1A2225]">/</span> Install Support Guarantee
      </p>

      <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
        Install Support Guarantee.
      </h1>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
        ::effective 2026-06-18 · supersedes the 2026-05-23 refund-policy
        version
      </p>

      <section className="mt-10 space-y-6 text-[15px] leading-[1.75] text-[#C8CCCE]">
        <p>
          <strong className="text-[#F2F4F5]">Orange³ and AI Bookmaker
          ship free always. There is nothing to refund.</strong> This
          guarantee covers install support and a 30-day Material Failure
          replacement for download/install issues. Two support paths
          apply. Both run for thirty days from the date of download.
        </p>

        <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::path 1 · material failure replacement (30-day)
          </p>
          <p className="mt-3">
            Full replacement bundle within thirty days of download if
            Orange³ or AI Bookmaker fails to install or fails to launch
            on a clean Windows 10 or Windows 11 (x64) machine running
            Node.js 20+. The failure must be reproducible. Email{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=Orange3%20install%20support%20claim"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              a.mccree@gmail.com
            </a>{" "}
            with your OS version, Node version, and a 5-line repro (what
            command, what error). The lab confirms within 48 hours and
            either resolves the issue or re-delivers a corrected bundle.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFB87A]/30 bg-[#0A0F11] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
            ::path 2 · general install support (30-day)
          </p>
          <p className="mt-3">
            The lab provides best-effort install support for thirty days
            from download for any configuration issue, dependency
            conflict, or setup question. No payment and no formal claim
            needed. Email{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=Orange3%20install%20help"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              a.mccree@gmail.com
            </a>{" "}
            with your OS version, Node version, and a description of where
            you are stuck.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-medium text-[#F2F4F5]">
          What is NOT covered.
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Anything outside the 30-day window. After day 30 the lab is
            no longer obligated to provide install support for that
            download, though questions are still welcome.
          </li>
          <li>
            A claim that the lab cannot reach you at the email address
            you downloaded with. Use a real email.
          </li>
          <li>
            Issues caused by hardware, OS configurations, or third-party
            software outside the stated requirements (Windows 10/11 x64,
            Node.js 20+).
          </li>
          <li>
            Issues with third-party AI providers (Anthropic, OpenAI,
            Google, Groq, Ollama, OpenRouter) — those are governed by
            their own terms. The lab is not an intermediary.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-medium text-[#F2F4F5]">
          What the §4A no-saas lock means for this guarantee.
        </h2>
        <p>
          License §4A binds AtomEons to never switch Orange³ or AI
          Bookmaker to a subscription model. If we ever attempt to, every
          existing user keeps their license free in perpetuity. That
          commitment does not interact with the 30-day support windows; it
          is a separate clause that runs forever.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-[#F2F4F5]">
          The legacy paid buyer cohort.
        </h2>
        <p>
          Buyers who paid $1 or $99 on the v6.0 / v6.1 / pre-2026-06-18
          ladder retain their original 30-day Material Failure Guarantee
          and Workflow-Fit Refund rights from their original purchase
          date. Those rights are not diminished by the move to free.
          The paid ladder is retired; the entitlements of paid buyers are
          preserved.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-[#F2F4F5]">
          Dispute resolution.
        </h2>
        <p>
          All disputes should be raised with the lab directly in good
          faith before any formal action. Email{" "}
          <a
            href="mailto:a.mccree@gmail.com"
            className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
          >
            a.mccree@gmail.com
          </a>{" "}
          with a clear description of the issue. The lab will respond
          within 48 hours. The parties agree to attempt good-faith
          resolution before escalating to any external forum.
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
