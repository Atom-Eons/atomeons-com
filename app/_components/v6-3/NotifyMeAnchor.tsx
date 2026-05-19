import { NotifyMe } from "./NotifyMe";

/**
 * NotifyMeAnchor — dedicated mid-page CTA for the v6.3 waitlist.
 *
 * The hero has a notify-me form, but a long sell page needs a second
 * anchor for the visitor who's scrolled past the hero and decided. This
 * is that anchor. Big, plain, decisive.
 */
export function NotifyMeAnchor() {
  return (
    <section className="relative isolate overflow-hidden bg-black py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(34,240,213,0.12) 0%, transparent 60%), radial-gradient(40% 40% at 80% 30%, rgba(255,122,26,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::SHIP NOTIFICATION
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
          One email.
          <br />
          <span className="text-[#FF7A1A]">When v6.3 ships.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          No drip. No marketing list. No follow-up nurture sequence. One
          ship notification, on the day the build is ready, sent to the
          address below.
        </p>

        <div className="mx-auto mt-10 max-w-xl text-left">
          <NotifyMe source="orangebox-anchor" />
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          existing v6.0 buyers — already on the list via license §4A · no
          action required
        </p>
      </div>
    </section>
  );
}
