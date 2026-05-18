import Link from "next/link";
import { AtomMark } from "./AtomMark";

/**
 * Recursive proof banner — really large.
 * The site itself is the demo. Said in 9xl font.
 */
export function BuiltOnOrangebox() {
  return (
    <section className="relative overflow-hidden border-b border-[#204538] bg-[#04100d]">
      <div className="pointer-events-none absolute -right-20 -top-20 opacity-20 blur-[1px] md:-right-32 md:-top-32 md:opacity-25">
        <AtomMark size={420} speed={20} />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff4f5e] md:text-[11px]">
          ::recursive proof
        </p>
        <h2 className="mt-3 text-balance text-5xl font-black leading-[0.96] tracking-tight md:text-8xl lg:text-9xl">
          This site was{" "}
          <span className="text-[#ff7a18]">built in one day</span>{" "}
          on ORANGEBOX.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr] md:items-end">
          <p className="max-w-2xl text-pretty text-base text-[#a7b8ad] md:text-lg">
            Brand site, product page, Stripe live checkout, HMAC download
            tokens, edge OG image, X Ads pixel, sitemap, redirects, mobile
            nav, 5 unit tests — one operator, one cockpit, one day. The
            cockpit is what we sell.
          </p>
          <div className="flex justify-start md:justify-end">
            <Link
              href="/orangebox"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#ff7a18] bg-[#ff7a18] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
              style={{ color: "#000", WebkitTextFillColor: "#000" }}
            >
              Get the cockpit · $1 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
