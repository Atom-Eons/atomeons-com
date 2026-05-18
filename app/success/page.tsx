import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { mintDownloadToken } from "@/lib/token";
import { XAdsConversion } from "../_components/XAdsConversion";

export const dynamic = "force-dynamic";

import { TOKEN_TTL_SECONDS, PRODUCT } from "@/lib/constants";

type Resolved = {
  state: "ok" | "pending" | "error" | "no-session";
  downloadUrl?: string;
  email?: string;
  message?: string;
};

async function resolveSession(sessionId: string | undefined): Promise<Resolved> {
  if (!sessionId) return { state: "no-session" };
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return {
        state: "pending",
        message:
          "Stripe hasn't confirmed your payment yet. Refresh in a few seconds.",
      };
    }
    const email =
      session.customer_details?.email ?? session.customer_email ?? null;
    if (!email) {
      return {
        state: "error",
        message:
          "Payment confirmed but no email was attached to the session. Email a.mccree@gmail.com with this order ID and we'll re-send your link.",
      };
    }
    const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
    const token = mintDownloadToken({ email, sessionId: session.id, exp });
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";
    return {
      state: "ok",
      email,
      downloadUrl: `${origin}/api/download?t=${encodeURIComponent(token)}`,
    };
  } catch (e) {
    return {
      state: "error",
      message: e instanceof Error ? e.message : "Failed to verify session.",
    };
  }
}

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const resolved = await resolveSession(session_id);

  return (
    <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-16 pb-24">
      {resolved.state === "ok" ? (
        <>
          <XAdsConversion
            sessionId={session_id ?? ""}
            value={1}
            currency="USD"
            email={resolved.email}
          />
        <div className="rounded-xl border border-[#75ff92]/50 bg-[#0a211b] p-8">
          <p className="text-xs uppercase tracking-widest text-[#75ff92]">
            Payment verified · download ready
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Welcome to ORANGEBOX.
          </h1>
          <p className="mt-4 text-[#a7b8ad]">
            Your purchase is confirmed. The download link below is signed and
            valid for 30 days. Save the installer now — this page is the only
            place the link appears.
          </p>

          <a
            href={resolved.downloadUrl}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-[#ff7a18] bg-[#ff7a18] px-6 py-3 text-base font-bold text-black transition-colors hover:bg-[#ffc46b]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            ↓ Download {PRODUCT.FILENAME}
          </a>

          <p className="mt-4 text-base font-semibold text-[#ffc46b]">
            There is no email fallback.
          </p>

          <div className="mt-4 rounded-lg border border-[#5a3210] bg-[#1a0f00] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffc46b]">
              ::important · save this link
            </p>
            <p className="mt-1 text-sm text-[#f7f0e4]">
              This page is the only place this link appears. Bookmark it
              before you close the tab.
            </p>
          </div>

          {/* Chrome / SmartScreen warning explainer — turns the panic moment into a credibility moment */}
          <div className="mt-4 rounded-lg border border-[#22F0D5]/40 bg-[#04100d] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::chrome warned you? this is normal — here&apos;s why
            </p>
            <p className="mt-2 text-sm text-[#f7f0e4]">
              atomeons.com is a brand-new domain with no reputation history.
              Chrome and Windows SmartScreen warn on every first download from
              new domains. The binary is unsigned in v6.0.0 — EV cert lands in
              v6.1. <span className="font-semibold">It is safe.</span> Verify
              with the SHA-256 below.
            </p>
            <div className="mt-3 rounded border border-[#1A2225] bg-black/60 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                expected sha-256
              </p>
              <p className="mt-1 break-all font-mono text-xs text-[#22F0D5]">
                {PRODUCT.FILE_SHA256 ?? PRODUCT.ZIP_SHA256}
              </p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#a7b8ad]">
              <span className="font-mono text-[#22F0D5]">PowerShell:</span>{" "}
              <code className="font-mono text-[#f7f0e4]">
                Get-FileHash .\{PRODUCT.FILENAME} -Algorithm SHA256
              </code>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#a7b8ad]">
              If the hash matches, the file is exactly what we built. On the
              SmartScreen prompt click{" "}
              <span className="text-[#f7f0e4]">More info → Run anyway</span>.
            </p>
          </div>

          <p className="mt-5 text-xs text-[#a7b8ad]">
            Confirmed for:{" "}
            <span className="font-mono text-[#f7f0e4]">{resolved.email}</span>
          </p>
          {session_id ? (
            <p className="mt-1 text-xs text-[#a7b8ad]">
              Order:{" "}
              <span className="font-mono text-[#f7f0e4]">{session_id}</span>
            </p>
          ) : null}

          <div className="mt-6 rounded-lg border border-[#22F0D5]/40 bg-[#04100d] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::next time you buy
            </p>
            <p className="mt-1 text-sm text-[#f7f0e4]">
              Need to change your name, address, phone, or marketing
              preference? Manage your profile any time at{" "}
              <Link
                href="/account"
                className="text-[#22F0D5] underline hover:text-[#75ff92]"
              >
                atomeons.com/account
              </Link>{" "}
              — secure Stripe billing portal, no password.
            </p>
          </div>
        </div>
        </>
      ) : null}

      {resolved.state === "pending" ? (
        <div className="rounded-xl border border-[#ffc46b]/40 bg-[#1a1308] p-8">
          <p className="text-xs uppercase tracking-widest text-[#ffc46b]">
            Confirming payment
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            One moment.
          </h1>
          <p className="mt-4 text-[#a7b8ad]">{resolved.message}</p>
          <a
            href={`/success?session_id=${encodeURIComponent(session_id ?? "")}`}
            className="mt-6 inline-flex rounded-md border border-[#204538] bg-[#04100d] px-4 py-2 text-sm text-[#f7f0e4]"
          >
            Refresh
          </a>
        </div>
      ) : null}

      {resolved.state === "error" ? (
        <div className="rounded-xl border border-[#ff4f5e]/40 bg-[#1a0a0c] p-8">
          <p className="text-xs uppercase tracking-widest text-[#ff4f5e]">
            Could not verify
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Something is off.
          </h1>
          <p className="mt-4 text-[#a7b8ad]">{resolved.message}</p>
          {session_id ? (
            <p className="mt-3 text-xs text-[#a7b8ad]">
              Order:{" "}
              <span className="font-mono text-[#f7f0e4]">{session_id}</span>
            </p>
          ) : null}
          <a
            href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20order%20issue"
            className="mt-6 inline-flex rounded-md border border-[#204538] bg-[#04100d] px-4 py-2 text-sm text-[#f7f0e4]"
          >
            Email a.mccree@gmail.com
          </a>
        </div>
      ) : null}

      {resolved.state === "no-session" ? (
        <div className="rounded-xl border border-[#204538] bg-[#071915] p-8">
          <p className="text-xs uppercase tracking-widest text-[#a7b8ad]">
            No session
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            This page needs an order ID.
          </h1>
          <p className="mt-4 text-[#a7b8ad]">
            You probably hit this URL directly. Start at the home page or
            buy ORANGEBOX from the product page.
          </p>
          <Link
            href="/orangebox"
            className="mt-6 inline-flex rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-semibold text-[#06110e]"
          >
            Buy ORANGEBOX · $1
          </Link>
        </div>
      ) : null}

      <p className="mt-8 text-xs text-[#a7b8ad]">
        No support desk. The operator manual ships in the installer. Read it.
        Email{" "}
        <a
          href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20order%20issue"
          className="text-[#22F0D5] hover:underline"
        >
          a.mccree@gmail.com
        </a>{" "}
        for genuine order issues only.
      </p>
    </main>
  );
}
