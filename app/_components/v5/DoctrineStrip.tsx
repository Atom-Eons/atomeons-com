/**
 * Doctrine bottom-strip above the footer.
 * Two sibling products from AtomEons — they click together over MCP.
 * Hermes is a feature lane inside ORANGEBOX, not a standalone arm.
 * Per SITE_HANDOFF_v5.md.
 */

export function DoctrineStrip() {
  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="rounded-2xl border border-[#1A2225] bg-gradient-to-br from-[#0A0F11] via-[#0A0F11] to-[#101A1C] p-10 md:p-16">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::doctrine
          </p>
          <p className="mt-6 text-balance text-2xl font-medium leading-snug text-[#F2F4F5] md:text-3xl">
            ORANGEBOX is the <span className="text-[#22F0D5]">cockpit</span>.
            Skil.Ski is the <span className="text-[#22F0D5]">marketplace</span>.{" "}
            <span className="text-[#FFA45A]">Hermes</span> is the 𝕏 lane inside the cockpit.
          </p>

          <div className="mt-8 grid gap-6 border-t border-[#1A2225] pt-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                ::cockpit
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#9BA5A7]">
                <span className="font-medium text-[#F2F4F5]">ORANGEBOX.</span>{" "}
                The chair you sit in. 11 lanes. 15 departments. The OS you own.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                ::marketplace
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#9BA5A7]">
                <span className="font-medium text-[#F2F4F5]">Skil.Ski.</span>{" "}
                One MCP endpoint into a verified skill catalog. Default URL:{" "}
                <code className="font-mono text-xs text-[#22F0D5]">
                  https://skil.ski/api/mcp
                </code>
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFA45A]">
                ::hermes · inside the cockpit
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#9BA5A7]">
                <span className="font-medium text-[#F2F4F5]">Hermes</span>{" "}
                is the 𝕏 feed lane built into ORANGEBOX. MIT-licensed. Runs
                the live algorithm rail from inside the cockpit — not a separate
                product, not a separate install.
              </p>
            </div>
          </div>

          <p className="mt-10 max-w-3xl border-t border-[#1A2225] pt-6 text-sm leading-relaxed text-[#6B7779]">
            Two sibling products from AtomEons Systems Laboratory. They click
            together over MCP.{" "}
            <span className="text-[#22F0D5]">
              One operator. No team. No roadmap theater.
            </span>{" "}
            The cockpit was built through the cockpit.
          </p>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            disclosure · ATOM-OBX-V5-SITE-HANDOFF-2026-0517
          </p>
        </div>
      </div>
    </section>
  );
}
