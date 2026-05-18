import { PARTY_LINE, SNAPSHOT_AT } from "../_data/party-line";

const STATUS_COLOR: Record<string, string> = {
  VERIFIED: "text-[#75ff92] border-[#75ff92]/40",
  REVIEWED: "text-[#59d9ff] border-[#59d9ff]/40",
  EARLY_WARNING: "text-[#ffc46b] border-[#ffc46b]/40",
  FAILED: "text-[#ff4f5e] border-[#ff4f5e]/40",
};

const FROM_COLOR: Record<string, string> = {
  AE0: "text-[#ff7a18]",
  AE3: "text-[#75ff92]",
  AE5: "text-[#ffc46b]",
  AE6: "text-[#59d9ff]",
  AE7: "text-[#75ff92]",
  AE8: "text-[#75ff92]",
  CHECKMATE: "text-[#ff4f5e]",
  ORANGE: "text-[#ff7a18]",
  MIRRORS: "text-[#59d9ff]",
  MISFITS: "text-[#ff4f5e]",
  LIPS: "text-[#ffc46b]",
  HACK_THE_PLANET: "text-[#75ff92]",
};

function relTime(iso: string, now = new Date(SNAPSHOT_AT)): string {
  const d = new Date(iso);
  const diffSec = Math.max(0, Math.floor((now.getTime() - d.getTime()) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}

export function BuildReceipts() {
  return (
    <section
      id="build-receipts"
      className="mt-16 rounded-2xl border border-[#204538] bg-[#04100d] p-6 md:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#204538] pb-4">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff7a18]">
            ::sample build receipts
            <span className="rounded-sm border border-[#ffc46b]/40 bg-[#1a1308] px-1.5 py-0.5 text-[9px] font-bold text-[#ffc46b]">
              SAMPLE DATA
            </span>
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            What every ORANGEBOX project leaves behind.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#a7b8ad]">
            Illustrative party-line entries showing the shape and voice
            of receipts an ORANGEBOX cockpit writes while coordinating
            a real project. Format spec is in the Opus system manual
            section 11 (Party Line) inside the product ZIP. These are
            samples — not customer telemetry.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
          {PARTY_LINE.length} samples · project:myproject
        </p>
      </div>

      <ol className="mt-6 space-y-3">
        {PARTY_LINE.map((entry, idx) => (
          <li
            key={entry.id}
            style={{ ["--i" as string]: idx } as React.CSSProperties}
            className={`receipt-row rounded-lg border bg-[#071915]/70 p-4 transition-colors hover:bg-[#071915] ${
              STATUS_COLOR[entry.status] ?? "border-[#204538]"
            }`}
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
              <span
                className={`shrink-0 rounded-sm bg-[#04100d] px-1.5 py-0.5 font-bold ${
                  FROM_COLOR[entry.from] ?? "text-[#a7b8ad]"
                }`}
              >
                {entry.from}
              </span>
              <span className="rounded-sm bg-[#04100d] px-1.5 py-0.5 text-[#a7b8ad]">
                {entry.kind}
              </span>
              <span
                className={`rounded-sm bg-[#04100d] px-1.5 py-0.5 font-bold ${
                  STATUS_COLOR[entry.status]?.split(" ")[0] ?? "text-[#a7b8ad]"
                }`}
              >
                {entry.status}
              </span>
              <span className="ml-auto flex items-center gap-2">
                <span className="rounded-sm border border-[#ffc46b]/30 px-1 py-0.5 text-[9px] font-bold text-[#ffc46b]/80">
                  SAMPLE
                </span>
                <span className="text-[#1b8b75]">
                  {relTime(entry.generatedAt)}
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm text-[#f7f0e4]">{entry.text}</p>
            <p className="mt-2 truncate font-mono text-[10px] text-[#1b8b75]">
              evidence: {entry.evidence}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-6 border-t border-[#204538] pt-4 text-xs text-[#a7b8ad]">
        Every meaningful action in your project gets one of these. No
        audit trail is a red flag. This one is default-on.
      </p>
    </section>
  );
}
