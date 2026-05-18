"use client";

import { useState } from "react";

/**
 * Email-only entry → POST /api/portal → Stripe billing portal redirect.
 * Kept deliberately minimal: zero passwords, zero accounts to manage on our
 * side. The buyer's identity is their checkout email; Stripe owns the rest.
 */
export function AccountPortalForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error ?? `HTTP ${res.status}`);
      if (!body?.url) throw new Error("Portal returned no URL.");
      window.location.href = body.url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not open portal";
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          ::email used at checkout
        </span>
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-[#1A2225] bg-black px-4 py-3 font-mono text-sm text-[#F2F4F5] outline-none focus:border-[#22F0D5] focus:ring-2 focus:ring-[#22F0D5]/30"
        />
      </label>

      <button
        type="submit"
        disabled={loading || !email}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#22F0D5] bg-[#22F0D5] px-6 py-3 text-base font-semibold text-black shadow-[0_0_30px_rgba(34,240,213,0.35)] transition-colors hover:bg-[#5FF7E1] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening portal…" : "Open billing portal →"}
      </button>

      {error ? (
        <p className="text-xs text-[#ff4f5e]">{error}</p>
      ) : null}

      <p className="text-xs text-[#6B7779]">
        Redirects to Stripe&apos;s secure customer portal. No password. No
        account to set up on our side.
      </p>
    </form>
  );
}
