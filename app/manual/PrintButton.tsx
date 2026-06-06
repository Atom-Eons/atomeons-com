"use client";

/**
 * PrintButton · client-only · save-as-PDF trigger.
 * Wave 39 · split out so /manual page can stay a Server Component
 * with metadata export. Server components can't carry onClick.
 */

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 border-2 border-[#22F0D5] bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition hover:bg-[#22F0D5]/20"
    >
      ⌘P · Save as PDF
    </button>
  );
}
