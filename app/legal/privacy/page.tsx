import Link from "next/link";

export const metadata = {
  title: "Privacy Policy · AtomEons",
  description:
    "AtomEons privacy policy. Zero telemetry from the Orange³ cockpit. Download registration data only. Loops / Resend for the download email. No selling of contact data. Local-first by construction.",
  alternates: { canonical: "https://atomeons.com/legal/privacy" },
};

export default function Privacy() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24 text-[#F2F4F5]">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
        <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
        <span className="text-[#1A2225]">/</span> Legal{" "}
        <span className="text-[#1A2225]">/</span> Privacy Policy
      </p>

      <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
        Privacy Policy.
      </h1>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
        ::effective 2026-05-23 · supersedes the 2026-05-13 version
      </p>

      <section className="mt-10 space-y-8 text-[15px] leading-[1.75] text-[#C8CCCE]">
        <p>
          The lab is a one-operator independent business in Marco
          Island, Florida. Privacy posture is local-first by construction
          and explicit by stance. This page tells you what we collect,
          what we do with it, what we don&apos;t do with it, and how to
          remove your record.
        </p>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            1. What the website collects
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-[#F2F4F5]">No analytics by default.</strong>{" "}
              Vercel Web Analytics is enabled at the platform level for
              aggregate page-view counts (no IP retention, no cookie
              dropped, no cross-site tracking). It can be disabled at
              any time.
            </li>
            <li>
              <strong className="text-[#F2F4F5]">No third-party trackers.</strong>{" "}
              We do not run Google Analytics, Facebook Pixel, Twitter
              Pixel beyond the explicit X Ads conversion pixel for the
              Orange³ download event, TikTok Pixel, or any
              cross-site advertising network.
            </li>
            <li>
              <strong className="text-[#F2F4F5]">Cookies.</strong> Only
              what Vercel and Stripe set for session continuity. No
              consent banner shown because we don&apos;t set marketing
              cookies.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            2. What checkout collects
          </h2>
          <p className="mt-3">
            The free download registration collects from every Orange³
            and AI Bookmaker user: email, machine OS (Win 10 / Win 11 /
            other), and a marketing opt-in (yes/no). No payment data is
            collected. We see only the email, the OS answer, and the
            opt-in flag.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            3. What the cockpit collects from the buyer
          </h2>
          <p className="mt-3">
            <strong className="text-[#F2F4F5]">Nothing.</strong> The
            Orange³ cockpit runs entirely on your machine. It does
            not phone home. It does not report telemetry. It does not
            transmit your prompts, your project state, your receipts,
            or your generated outputs to AtomEons. The lab cannot see
            your work even if it wanted to. The cockpit can be air-
            gapped via the local-Ollama route and continue functioning.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            4. What the cockpit transmits to third parties (you control)
          </h2>
          <p className="mt-3">
            When you supply API keys for Anthropic, OpenAI, Google,
            Groq, or OpenRouter and choose a routed model, the cockpit
            sends your prompts and project context directly to that
            provider over your network. Those transmissions are governed
            by the provider&apos;s privacy policy, not the lab&apos;s.
            The lab is never an intermediary. The lab takes no cut of
            token cost.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            5. Subprocessors
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-[#F2F4F5]">Stripe</strong> —
              payment processing, billing receipts, customer record for
              the /account portal.
            </li>
            <li>
              <strong className="text-[#F2F4F5]">Vercel</strong> —
              website hosting, edge serving, deployment, file delivery.
            </li>
            <li>
              <strong className="text-[#F2F4F5]">Supabase</strong> —
              storage of published Founder&apos;s View letters (no
              personal data of readers; the letters themselves are
              public).
            </li>
            <li>
              <strong className="text-[#F2F4F5]">Loops.so + Resend</strong>{" "}
              — transactional email (post-purchase download link,
              refund correspondence) and the explicit-opt-in Founder&apos;s
              View notification list. Resend acts as failure-soft
              fallback when Loops is unreachable.
            </li>
            <li>
              <strong className="text-[#F2F4F5]">X / Twitter API</strong>{" "}
              — tweet automation for the Founder&apos;s View broadcast.
              No reader data passes through.
            </li>
            <li>
              <strong className="text-[#F2F4F5]">GitHub</strong> — source
              hosting of the public atomeons-com repository. Public-source
              relationship; no personal data passes through.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            6. What we DO with your email
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Send the post-purchase download link with the time-bound
              signed URL.
            </li>
            <li>
              Send replacement download links inside the 30-day refund
              window if needed.
            </li>
            <li>
              If you opted in at checkout, send occasional product news
              (max ~4 emails per year).
            </li>
            <li>Reply when you email the lab directly.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            7. What we DO NOT DO
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Sell your email or contact info to anyone. Ever.</li>
            <li>
              Share your email with any party other than the
              subprocessors listed above as required for the service to
              function.
            </li>
            <li>
              Profile you. Score you. Segment you. Resell aggregated
              data about you to a third-party data broker.
            </li>
            <li>
              Email you if you opted out at checkout. Receipts only.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            8. Your rights (US + GDPR + CCPA)
          </h2>
          <p className="mt-3">
            You may request the lab&apos;s record of your email and
            order, request correction of any incorrect record, or
            request deletion of your record (subject only to tax-record
            retention obligations on the payment side, where Stripe is
            the controller). Send the request to{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=privacy%20data%20request"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              a.mccree@gmail.com
            </a>
            . The lab responds within 30 days. There is no automated
            portal; one operator handles every request manually.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            9. Children
          </h2>
          <p className="mt-3">
            Orange³ ships for use by adults. The lab does not
            knowingly collect personal information from anyone under 13.
            If you learn a minor has provided personal information,
            email the lab and the record will be deleted.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-[#F2F4F5]">
            10. Contact
          </h2>
          <p className="mt-3">
            AtomEons Systems Laboratory · Atom McCree · Marco Island, FL
            · {" "}
            <a
              href="mailto:a.mccree@gmail.com"
              className="text-[#22F0D5] hover:text-[#FFA45A]"
            >
              a.mccree@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
