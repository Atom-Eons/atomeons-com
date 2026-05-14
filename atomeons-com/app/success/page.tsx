import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { mintDownloadToken } from "@/lib/token";
import { XAdsConversion } from "../_components/XAdsConversion";

export const dynamic = "force-dynamic";

import { TOKEN_TTL_SECONDS } from "@/lib/constants";

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
            value={49}
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
            Your purchase is confirmed. The download link below is signed
            and valid for 30 days. Save the ZIP now.
          </p>

          <a
            href={resolved.downloadUrl}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-[#ff7a18] bg-[#ff7a18] px-6 py-3 text-base font-bold text-black transition-colors hover:bg-[#ffc46b]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            ↓ Download orangebox-v1.zip
          </a>

          <div className="mt-6 rounded-lg border border-[#5a3210] bg-[#1a0f00] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffc46b]">
              ::important
            </p>
            <p className="mt-1 text-sm text-[#f7f0e4]">
              This page is the only place this link appears. Bookmark it
              before you close the tab. There is no email fallback.
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
            Buy ORANGEBOX · $49
          </Link>
        </div>
      ) : null}

      <p className="mt-8 text-xs text-[#a7b8ad]">
        No support is included with this purchase. The full Opus system manual
        is inside the ZIP.
      </p>
    </main>
  );
}
