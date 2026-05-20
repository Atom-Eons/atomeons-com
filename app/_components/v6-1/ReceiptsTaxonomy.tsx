/**
 * ReceiptsTaxonomy — 20 receipt sources table.
 * Server component.
 * Source of truth: docs/RELEASE_NOTES_v6.1.0.md
 * agent-run and repo-index are NEW in v6.1.0.
 */

interface ReceiptSource {
  source: string;
  emitsWhen: string;
  isNew?: true;
}

const SOURCES: ReceiptSource[] = [
  {
    source: "agent-run",
    emitsWhen: "Every agent run finishes, fails, or is cancelled.",
    isNew: true,
  },
  {
    source: "repo-index",
    emitsWhen: "Every workspace index build completes.",
    isNew: true,
  },
  {
    source: "build",
    emitsWhen: "Binary compiled and binary size confirmed.",
  },
  {
    source: "ship",
    emitsWhen: "Portable zip created and SHA-256 written.",
  },
  {
    source: "smoke",
    emitsWhen: "Smoke test suite run completes (pass or fail).",
  },
  {
    source: "gate-check",
    emitsWhen: "Any HSMP gate evaluation fires.",
  },
  {
    source: "model-route",
    emitsWhen: "Smart router selects a model for a task.",
  },
  {
    source: "vault-write",
    emitsWhen: "A document is committed to the lattice vault.",
  },
  {
    source: "vault-read",
    emitsWhen: "A vault query is resolved and results returned.",
  },
  {
    source: "oauth-grant",
    emitsWhen: "A provider OAuth token is issued or renewed.",
  },
  {
    source: "oauth-revoke",
    emitsWhen: "A provider OAuth token is revoked.",
  },
  {
    source: "connector-call",
    emitsWhen: "An MCP connector tool is invoked.",
  },
  {
    source: "skill-load",
    emitsWhen: "A skill is loaded, signature-verified, and activated.",
  },
  {
    source: "voice-transcribe",
    emitsWhen: "Whisper finishes a local audio transcription.",
  },
  {
    source: "freeze-stop",
    emitsWhen: "Freeze guard blocks a write attempt.",
  },
  {
    source: "mutation-apply",
    emitsWhen: "A HSMP mutation is accepted and applied.",
  },
  {
    source: "mutation-reject",
    emitsWhen: "A HSMP mutation is rejected by a gate.",
  },
  {
    source: "benefit-compute",
    emitsWhen: "Dividend/benefit calculation runs for a session.",
  },
  {
    source: "billing-tick",
    emitsWhen: "Billing period tick fires and cost is logged.",
  },
  {
    source: "telemetry-toggle",
    emitsWhen: "Operator enables or disables telemetry.",
  },
];

export function ReceiptsTaxonomy() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F11] py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(34,240,213,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::receipts · 20 sources
        </p>
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
          Proof of work.
          <br />
          <span className="text-[#22F0D5]">As portfolio.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9BA5A7]">
          Twenty documented receipt sources as of v6.1.0. Every meaningful
          action writes a JSONL receipt to disk — source name, timestamp,
          job ID, token counts, evidence payload. The audit trail lives on
          your machine, not a vendor server.
        </p>

        {/* 2-column receipt table */}
        <div className="relative mt-12">
          {/* mobile horizontal scroll edge fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0A0F11] to-transparent sm:hidden"
          />

          <div className="overflow-x-auto rounded-2xl border border-[#1A2225]">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1A2225] bg-black">
                  <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    source
                  </th>
                  <th className="border-l border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    emits when
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2225] bg-[#0A0F11]">
                {SOURCES.map((s) => (
                  <tr
                    key={s.source}
                    className={`transition-colors hover:bg-[#101A1C] ${
                      s.isNew ? "bg-[#22F0D5]/[0.03]" : ""
                    }`}
                  >
                    <td className="whitespace-nowrap px-5 py-3">
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-sm text-[#F2F4F5]">
                          {s.source}
                        </span>
                        {s.isNew && (
                          <span className="rounded border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-[#22F0D5]">
                            NEW v6.1
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="border-l border-[#1A2225] px-5 py-3 text-[#9BA5A7]">
                      {s.emitsWhen}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#6B7779]">
          Receipts are JSONL — one line per event, append-only. Browse them in
          the Receipts lane (<span className="font-mono text-[#F2F4F5]">Ctrl+7</span>), search fuzzy, or
          export as a self-contained HTML artifact.
        </p>
      </div>
    </section>
  );
}
