"use client";

/**
 * PrintButton — triggers the browser print-to-PDF dialog.
 *
 * The /dynamic-world-pricing page has print-optimized CSS
 * (@media print rules in the page itself). When the user hits
 * this button, Chrome / Safari / Edge / Firefox open their print
 * dialog with "Save as PDF" as the default destination — the
 * page renders to a clean letter-sized PDF without server-side
 * PDF generation.
 *
 * The button is hidden in print output via .no-print on the
 * parent container.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_30px_rgba(34,240,213,0.35)] transition-all hover:bg-[#7DDBC8]"
    >
      print to pdf ↓
    </button>
  );
}
