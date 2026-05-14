"use client";

import { useState } from "react";

export function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }
      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Checkout failed";
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={buy}
        disabled={loading}
        className="pulse-ring inline-flex items-center justify-center gap-2 rounded-lg border border-[#ff7a18] bg-[#ff7a18] px-6 py-3 text-base font-semibold text-[#06110e] transition-colors hover:bg-[#ffc46b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening checkout…" : "Buy ORANGEBOX · $49"}
      </button>
      {error ? (
        <p className="max-w-xs text-xs text-[#ff4f5e]">{error}</p>
      ) : null}
    </div>
  );
}
