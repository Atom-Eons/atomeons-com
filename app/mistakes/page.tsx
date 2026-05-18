import Link from "next/link";
import { AeMark } from "../_components/AeMark";

export const metadata = {
  title: "Mistakes Ledger — ÆoNs Research",
  description:
    "Every wrong call the lab makes goes here, dated and named. No quiet patches. No silent retractions. The receipts include the ones that hurt.",
  alternates: { canonical: "https://atomeons.com/mistakes" },
};

/**
 * Public mistakes ledger. Operator doctrine: truth over theater, receipts
 * on every claim — including the ones that didn't go well. Each entry
 * carries date, what happened, what we learned, what we changed.
 *
 * Add a new entry by appending to MISTAKES (newest first). Status:
 *   open       — still hurts; fix in flight
 *   acknowledged — known + named, fix scheduled
 *   resolved   — fixed; documented for next time
 */

type Mistake = {
  date: string;
  title: string;
  status: "open" | "acknowledged" | "resolved";
  what: string;
  learned: string;
  changed: string;
};

const MISTAKES: Mistake[] = [
  {
    date: "2026-05-17",
    title:
      "Shipped Chrome SmartScreen warning on first download (unsigned binaries)",
    status: "acknowledged",
    what:
      "Atomeons.com launched with unsigned NSIS / native binaries. Chrome warns on first download because new-domain reputation is zero and SmartScreen will not accept unsigned exes from low-reputation publishers. Buyers paying $1 see a yellow warning before the binary lands.",
    learned:
      "Code signing is not optional for indie Windows shipping in 2026, even at $1 price points. The friction the warning adds to first-time buyers is the same friction as a $20 paywall. Reputation cannot be bought instantly; it accrues through signed shipments over time. The right interim mitigation is honesty + verification rails, not silence.",
    changed:
      "EV code-signing cert scheduled for v6.1. Three-layer mitigation shipped today: (1) /success page renders a 'Chrome warned you? this is normal — here's why' explainer with the expected SHA-256 + the exact Get-FileHash command, (2) /faq has a dedicated Q9 on the warning with full verification steps, (3) /api/download adds X-OBX-Version + X-OBX-SHA256 response headers so buyers can verify in DevTools without leaving the browser. Warning still appears until v6.1 EV cert ships — but no buyer is left guessing what to do about it.",
  },
  {
    date: "2026-05-17",
    title: "PRODUCT_BLOB_URL points to v1.4.0 zip even though v6.0.0 is live",
    status: "open",
    what:
      "The site shipped v6.0.0 messaging end-to-end (hero, JSON-LD, download hashes, ladder pricing) before the actual v6 binary was uploaded to Vercel Blob storage. The download API streams whatever sits at PRODUCT_BLOB_URL — currently the old v1.4.0 AIO zip from initial setup. Root cause unresolved.",
    learned:
      "Version-bumping copy + JSON-LD does not bump the artifact. The blob URL is a separate ops step and needs to be checklisted into every release. Server-side integrity verification is a hard requirement for shipping the right file, not a nice-to-have.",
    changed:
      "/api/download now buffers the upstream blob, recomputes SHA-256 server-side, and refuses to serve any file whose hash does not match PRODUCT.FILE_SHA256. Mismatched serve returns HTTP 503 with operator-action JSON. Buyers paying $1 either get the verified v6 binary or a clear 503 with refund-guarantee context — never a silent wrong-file ship. New response headers X-OBX-Version + X-OBX-SHA256 let buyers DevTools-verify in-flight. Root issue (wrong file in blob) still requires operator to upload orangebox-v6.0.0-setup.exe + update PRODUCT_BLOB_URL env.",
  },
  {
    date: "2026-05-17",
    title: "Mobile sticky-bar rendered 310px tall on first ladder-price deploy",
    status: "resolved",
    what:
      "The bottom-pinned StickyBuyBar shipped using the full BuyButton component, which renders the BUY pill + FOMO badge + two sub-copy paragraphs stacked. On a 390px-wide phone the bar collapsed to ~310px tall — covering 37% of the screen.",
    learned:
      "Sticky surfaces need a compact button variant, not the marketing-page hero CTA. The presence of multi-line sub-copy in a UX-critical bar is a smell.",
    changed:
      "Built BuyButtonCompact (button + dynamic price only) and slimmed StickyBuyBar to 65px on mobile. Hero retains the full BuyButton with FOMO badge.",
  },
  {
    date: "2026-05-17",
    title: "Hero H1 collapsed to 7 lines / 319px tall on mobile",
    status: "resolved",
    what:
      "After bumping the H1 to lead with the native-binary claim, the new copy ('One file. Double-click. 2 seconds. The cockpit replaces Claude Code, Cursor, and Codex.') rendered at 48px on a 390px viewport — wrapping to 7 lines and burying the hero CTA.",
    learned:
      "Long H1s need an explicit mobile-first font scale. Defaulting to text-5xl on sm: with text-8xl on md: is not a mobile design — it's a desktop design with a fallback.",
    changed:
      "H1 scale rewritten: text-[2.25rem] mobile → text-5xl sm → text-7xl md → text-8xl lg. Body text scale matched. Hero now fits the fold on 390px.",
  },
  {
    date: "2026-05-17",
    title:
      "Stripe consent_collection.promotions rejected because TOS not accepted",
    status: "resolved",
    what:
      "First buyer-data-collection deploy used consent_collection.promotions = 'auto'. Stripe rejected the session creation with a 400 saying the Terms of Service had not been accepted in the dashboard. Every BUY click returned an opaque 502.",
    learned:
      "Stripe Checkout features with consent-style behavior are gated by dashboard ToS acceptance, not by API key alone. The error message routed back to the buyer was useless.",
    changed:
      "Swapped to a custom_fields dropdown ('Email me product news, updates, drops · Yes / No') that captures the same marketing-opt-in intent without needing the dashboard click. Operator can later re-enable native consent_collection by accepting the Stripe ToS. Both surfaces capture the same data.",
  },
  {
    date: "2026-05-17",
    title: "ReceiptsLive 6-column 410px grid overflowed 390px viewport",
    status: "resolved",
    what:
      "The streaming-receipts mock log used a fixed-pixel grid (80px + 60px + 80px + 80px + 60px + 50px + 3×gap = 446px) which overflowed any viewport narrower than ~420px. Animated numeric digits were reported by getBoundingClientRect as outside the viewport, causing a horizontal page scroll on mobile.",
    learned:
      "Fixed-pixel grids cannot live outside an overflow-x-auto wrapper unless the layout guarantees ≥ wrapper-width.",
    changed:
      "Wrapped the streaming log in overflow-x-auto + added min-w-[470px] to the inner grid rows. Page scroll is now horizontal-clean (body.scrollWidth === viewport.clientWidth).",
  },
];

const STATUS_STYLE: Record<Mistake["status"], string> = {
  open: "border-[#ff4f5e]/40 bg-[#1a0a0c] text-[#ff4f5e]",
  acknowledged: "border-[#FF7A1A]/40 bg-[#1C0F08]/40 text-[#FF7A1A]",
  resolved: "border-[#22F0D5]/40 bg-[#04100d] text-[#22F0D5]",
};

export default function MistakesPage() {
  const counts = {
    open: MISTAKES.filter((m) => m.status === "open").length,
    acknowledged: MISTAKES.filter((m) => m.status === "acknowledged").length,
    resolved: MISTAKES.filter((m) => m.status === "resolved").length,
  };

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> mistakes ledger
        </p>
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::truth over theater · receipts on every claim · including these
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          The Mistakes Ledger.
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          Every wrong call the lab makes goes here, dated and named. No quiet
          patches. No silent retractions. If the bug bit you, it gets a row.
          If we shipped the wrong file, it gets a row. If we made a claim we
          had to walk back, it gets a row. The receipts include the ones
          that hurt.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-3 md:max-w-md">
          <div className="rounded-xl border border-[#ff4f5e]/30 bg-[#1a0a0c] p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#ff4f5e]">
              open
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">
              {counts.open}
            </p>
          </div>
          <div className="rounded-xl border border-[#FF7A1A]/30 bg-[#1C0F08]/40 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF7A1A]">
              ack
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">
              {counts.acknowledged}
            </p>
          </div>
          <div className="rounded-xl border border-[#22F0D5]/30 bg-[#04100d] p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              resolved
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">
              {counts.resolved}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-32">
        <ol className="space-y-5">
          {MISTAKES.map((m, i) => (
            <li
              key={i}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-8"
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                  {m.date}
                </span>
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${STATUS_STYLE[m.status]}`}
                >
                  {m.status}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-medium leading-tight text-[#F2F4F5] md:text-2xl">
                {m.title}
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#9BA5A7] md:text-base">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
                    ::what happened
                  </p>
                  <p className="mt-1">{m.what}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    ::what we learned
                  </p>
                  <p className="mt-1">{m.learned}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    ::what we changed
                  </p>
                  <p className="mt-1">{m.changed}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-3xl text-sm text-[#6B7779]">
          Caught a mistake we missed? Email{" "}
          <a
            href="mailto:a.mccree@gmail.com?subject=Mistakes%20ledger%20%E2%80%94%20one%20more"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            a.mccree@gmail.com
          </a>{" "}
          and it goes on the page. The ledger is part of the product.
        </p>
      </section>
    </main>
  );
}
