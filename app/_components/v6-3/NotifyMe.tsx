"use client";

import { useState } from "react";

/**
 * NotifyMe — waitlist signup for ORANGEBOX v6.3 "Silent Canvas".
 *
 * Replaces the BuyButton everywhere while sales are paused
 * (NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED=true). POSTs to /api/waitlist,
 * which inserts into the orangebox_v63_waitlist Supabase table via
 * service-role.
 *
 * UX: single-row email input + submit. Inline success state. Error
 * surfaced as small mono text below. No 3rd-party SDK, no popup.
 *
 * variant="hero"   — large primary CTA (used in HeroPreview)
 * variant="compact" — slimmer form (used inside cards / sticky bars)
 */

type Variant = "hero" | "compact";

export function NotifyMe({
  variant = "hero",
  source = "unknown",
}: {
  variant?: Variant;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "ok" | "duplicate" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg(null);
    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), source }),
      });
      const data = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        duplicate?: boolean;
        error?: string;
      };
      if (data.duplicate) {
        setStatus("duplicate");
        return;
      }
      if (!r.ok || !data.ok) {
        setErrorMsg(data.error ?? `HTTP ${r.status}`);
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Network error");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        className={
          variant === "hero"
            ? "rounded-2xl border border-[#22F0D5]/40 bg-[#08151A]/60 px-6 py-5"
            : "rounded-xl border border-[#22F0D5]/40 bg-[#08151A]/60 px-4 py-3"
        }
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          ::on the list
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#F2F4F5]">
          When v6.3 ships, you&apos;ll know. No marketing. No drip. One email
          when the cockpit is ready.
        </p>
      </div>
    );
  }

  if (status === "duplicate") {
    return (
      <div
        className={
          variant === "hero"
            ? "rounded-2xl border border-[#FF7A1A]/40 bg-[#1A0F08]/60 px-6 py-5"
            : "rounded-xl border border-[#FF7A1A]/40 bg-[#1A0F08]/60 px-4 py-3"
        }
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
          ::already on the list
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#F2F4F5]">
          Same address. Same standing. You&apos;ll get the ship notification
          when v6.3 lands.
        </p>
      </div>
    );
  }

  const isCompact = variant === "compact";

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <div
        className={
          isCompact
            ? "flex flex-col gap-2 sm:flex-row"
            : "flex flex-col gap-3 sm:flex-row sm:items-stretch"
        }
      >
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@yourdomain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email for v6.3 notify-me list"
          className={
            isCompact
              ? "min-w-0 flex-1 rounded-md border border-[#1A2225] bg-black/60 px-3 py-2 text-sm text-[#F2F4F5] placeholder:text-[#6B7779] focus:border-[#22F0D5]/60 focus:outline-none"
              : "min-w-0 flex-1 rounded-lg border border-[#1A2225] bg-black/60 px-4 py-3 text-base text-[#F2F4F5] placeholder:text-[#6B7779] focus:border-[#22F0D5]/60 focus:outline-none"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            isCompact
              ? "inline-flex items-center justify-center gap-1.5 rounded-md border border-[#22F0D5] bg-[#22F0D5] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#5FF7E1] disabled:cursor-not-allowed disabled:opacity-70"
              : "inline-flex items-center justify-center gap-2 rounded-lg border border-[#22F0D5] bg-[#22F0D5] px-6 py-3 text-base font-medium text-black transition-colors hover:bg-[#5FF7E1] disabled:cursor-not-allowed disabled:opacity-70"
          }
        >
          {status === "loading" ? (
            "sending…"
          ) : (
            <>
              <span>notify me when v6.3 ships</span>
              <span aria-hidden>→</span>
            </>
          )}
        </button>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
        one email. when it ships. no drip, no marketing list.
      </p>
      {status === "error" && errorMsg ? (
        <p className="text-xs text-[#ff7a1a]">{errorMsg}</p>
      ) : null}
    </form>
  );
}
