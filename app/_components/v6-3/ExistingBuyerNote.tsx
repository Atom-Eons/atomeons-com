import Link from "next/link";

/**
 * ExistingBuyerNote — explicit message to v6.0 buyers.
 *
 * Visible on the v6.3 preview page so existing buyers know they're not
 * being asked to buy again. License §4A locks the forward path: they
 * get v6.3 free.
 *
 * Includes /account link for download access management.
 */
export function ExistingBuyerNote() {
  return (
    <section className="relative bg-[#0A0F11] py-24 md:py-28">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="rounded-2xl border border-[#FF7A1A]/30 bg-[#1A0F08]/50 p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::for existing v6.0 buyers
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-[-0.015em] text-[#F2F4F5] md:text-4xl">
            You already have v6.3.{" "}
            <span className="text-[#22F0D5]">License §4A says so.</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            <p>
              Every v6.0 buyer is automatically on v6.3. No re-purchase. No
              upgrade fee. No tiered SKU. The forward-buyers lock is the lock.
            </p>
            <p>
              The day v6.3 ships, the email goes out to the address on the
              original Stripe receipt with a fresh signed download link. Your
              existing license key works.
            </p>
            <p>
              Need the v6.0 download you already paid for? It&apos;s at{" "}
              <Link
                href="/account"
                className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:text-[#F2F4F5]"
              >
                /account
              </Link>{" "}
              with your purchase email.
            </p>
          </div>
          <p className="mt-8 font-mono text-sm uppercase tracking-[0.14em] text-[#FF7A1A]">
            $1 ONCE. FORWARD BUYERS LOCK THEIR PRICE. FOREVER.
          </p>
        </div>
      </div>
    </section>
  );
}
