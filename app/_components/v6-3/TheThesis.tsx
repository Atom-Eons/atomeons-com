/**
 * TheThesis — paradigm-shift framing. Sits right after the hero, before
 * the principles. Tells the visitor what is actually changing in v6.3.
 *
 * Concept-first, mechanism-free. The operator class needs to understand
 * the WHY before the feature list. This section earns the rest of the page.
 *
 * IP-safe: explains the user-visible shift only. No Relevance Controller,
 * no projection mechanism, no schema architecture. The reader leaves
 * knowing what changes about their experience — not how it works under
 * the hood.
 */
export function TheThesis() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0A0F11] py-32 md:py-40">
      {/* ambient cyan wash — sets the tonal shift from product to thesis */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(34,240,213,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::THE THESIS · WHAT CHANGES
        </p>

        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl lg:text-7xl">
          Every tool you have used in the last decade had{" "}
          <span className="text-[#6B7779]">the same loop:</span>{" "}
          <span className="text-[#FF7A1A]">prompt, narrate, prompt, narrate.</span>
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
          <div className="space-y-6 text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            <p>
              The loop trains the operator to wait. To wait for the next
              token. To wait for the explanation. To wait for the model to
              re-tell what it just did. The work happens in the gaps between
              tokens, and the gaps belong to the model.
            </p>
            <p>
              v6.3 cuts the loop. You describe the goal once. The cockpit
              builds the plan. The plan validates. The canvas shows the
              progress. You see the build move in real time. The cockpit
              does not narrate the move — the move <em>is</em> the narration.
            </p>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            <p>
              The model does not own the project anymore. The project owns
              itself. The model is the worker, not the historian. The canvas
              is the historian. The receipts are the proof.
            </p>
            <p>
              This is not a UI refresh. It is a renegotiation of which layer
              of the stack carries the work. The cockpit gets quieter. The
              canvas gets louder. The operator gets the gap back.
            </p>
          </div>
        </div>

        <p className="mt-16 max-w-3xl font-mono text-base uppercase tracking-[0.18em] text-[#FF7A1A] md:text-lg">
          THE COCKPIT GETS QUIETER. THE WORK GETS LOUDER.
        </p>
      </div>
    </section>
  );
}
