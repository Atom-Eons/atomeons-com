import { BuyButton } from "../BuyButton";

export function ClosingManifesto() {
  return (
    <section className="relative isolate overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(255,122,26,0.18) 0%, transparent 60%), radial-gradient(40% 40% at 80% 20%, rgba(34,240,213,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the manual is inside
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-7xl">
          Run a serious project.
          <br />
          <span className="text-[#FF7A1A]">Keep your hands on the wheel.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#9BA5A7]">
          ORANGEBOX does not manage you. It does not nudge you, notify you,
          or protect you from a bad decision. It routes work, writes
          receipts, and keeps state. The cockpit is an instrument, not a
          babysitter.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <BuyButton />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7779]">
            $1 once · forever · no subscription, ever
          </p>
        </div>
      </div>
    </section>
  );
}
