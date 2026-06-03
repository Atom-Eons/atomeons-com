import Link from "next/link";

export const metadata = {
  title: "Terms of Sale · AtomEons",
  description:
    "ORANGEBOX Command terms of sale. $99 once, forever. License §4A bans subscription. 30-day Material Failure Guarantee + 30-day Workflow-Fit Refund. Source included for buyer transparency.",
  alternates: { canonical: "https://atomeons.com/legal/terms" },
};

export default function Terms() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24 text-[#F2F4F5]">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
        <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
        <span className="text-[#1A2225]">/</span> Legal{" "}
        <span className="text-[#1A2225]">/</span> Terms of Sale
      </p>

      <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
        Terms of Sale.
      </h1>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
        ::effective 2026-05-23 · supersedes the 2026-05-13 ladder-pricing
        version
      </p>

      <section className="mt-10 space-y-7 text-[15px] leading-[1.75] text-[#C8CCCE]">
        <p>
          AtomEons Systems Laboratory (&quot;AtomEons,&quot;
          &quot;we,&quot; &quot;the lab&quot;) sells ORANGEBOX Command
          as a one-time digital purchase. These terms apply to every
          ORANGEBOX sale processed through Stripe Checkout on
          atomeons.com.
        </p>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            1. License grant
          </h2>
          <p className="mt-3">
            Your <strong className="text-[#F2F4F5]">$99 USD</strong>{" "}
            purchase grants you a non-exclusive, non-transferable,
            single-operator license to install and use ORANGEBOX Command
            for personal or single-business use. You may install on
            machines you personally operate. You may inspect and modify
            the source for internal use. You may not resell, sublicense,
            redistribute, or publicly mirror the source or binaries.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            2. §4A — no-SaaS commitment
          </h2>
          <p className="mt-3">
            AtomEons commits, by binding clause in the LICENSE shipped
            with the product, never to switch ORANGEBOX to a
            subscription-billing model. If we ever attempt to, every
            existing buyer keeps their license free in perpetuity at the
            then-current and all future versions. §4A overrides any
            later attempt by the lab to charge recurring fees.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            3. Material Failure Guarantee + Workflow-Fit Refund
          </h2>
          <p className="mt-3">
            Two refund paths run in parallel, both for 30 days from the
            date of payment, both full-refund.{" "}
            <strong className="text-[#F2F4F5]">Material Failure
            Guarantee</strong>: refund if ORANGEBOX fails to install or
            launch on a clean Windows 10/11 + Node 20+ machine.{" "}
            <strong className="text-[#F2F4F5]">Workflow-Fit Refund</strong>
            : refund if the product doesn&apos;t fit your workflow, no
            questions asked. Full details:{" "}
            <Link
              href="/legal/refund"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /legal/refund
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            4. What ships
          </h2>
          <p className="mt-3">
            The product is delivered as a downloadable bundle containing
            the ORANGEBOX Command binary (Windows installer + portable
            ZIP), full source tree, operator manual, quickstart, demo
            project, and the LICENSE.txt + EULA.txt + THIRD-PARTY.md
            legal pack. SHA-256 hashes for each artifact are published
            inside the bundle&apos;s receipts ledger.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            5. What is NOT promised
          </h2>
          <p className="mt-3">
            The lab does not warrant the product&apos;s fitness beyond
            the MFG window. The product is sold as-is. The cockpit is
            local-first and depends on third-party AI providers (Claude,
            OpenAI, Google, Groq, Ollama, OpenRouter) that you supply
            keys for. The lab does not guarantee continued availability
            of any third-party model, API, or service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            6. Operator responsibility
          </h2>
          <p className="mt-3">
            You are responsible for installing your runtime
            (Node.js 20+), for operating your machine, for backing up
            your project data, and for any action ORANGEBOX takes when
            you authorize it. You retain ownership of your project
            files, your receipts, your prompts, and your outputs.
            ORANGEBOX is a tool; you are the operator.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            7. Privacy + telemetry
          </h2>
          <p className="mt-3">
            The product is local-first by construction. It does not
            transmit your data to AtomEons. The lab cannot see your
            project state, your prompts, or your outputs. Full privacy
            posture:{" "}
            <Link
              href="/legal/privacy"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /legal/privacy
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            8. Limitation of liability
          </h2>
          <p className="mt-3">
            To the maximum extent permitted by law, AtomEons&apos; total
            cumulative liability for any claim arising from this product
            is limited to the amount you paid for it. The lab is not
            liable for indirect, incidental, consequential, special,
            exemplary, or punitive damages, including lost data, lost
            profits, or business interruption.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            9. Governing law + venue
          </h2>
          <p className="mt-3">
            These terms are governed by the laws of the State of
            Florida, United States, without regard to conflict-of-law
            principles. Venue for any dispute is Collier County, Florida.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            10. Contact
          </h2>
          <p className="mt-3">
            AtomEons Systems Laboratory · Atom McCree, founder · Marco
            Island, FL ·{" "}
            <a
              href="mailto:a.mccree@gmail.com"
              className="text-[#22F0D5] hover:text-[#FFA45A]"
            >
              a.mccree@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            11. Legacy ladder-pricing buyers
          </h2>
          <p className="mt-3">
            Buyers who paid $1 on the v6.0 / v6.1 ladder before
            2026-05-23 are grandfathered at $1, retain all license
            entitlements, and are protected by §4A in perpetuity. The
            ladder mechanism is retired; the licenses themselves
            continue.
          </p>
        </div>
      </section>
    </main>
  );
}
