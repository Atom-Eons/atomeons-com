import Link from "next/link";

/**
 * Top-of-page attribution + product proof: this site was built through
 * the ORANGEBOX cockpit. The badge is the recursive demo.
 */
export function MadeWithOrangebox() {
  return (
    <Link
      href="/orangebox"
      className="group block border-b border-[#5a3210] bg-gradient-to-r from-[#1a0f00] via-[#241400] to-[#1a0f00]"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 px-6 py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#a7b8ad] md:text-[11px]">
        <span className="hidden sm:inline">::</span>
        <span>built through</span>
        <span className="font-bold text-[#ff7a18] transition-colors group-hover:text-[#ffc46b]">
          ORANGEBOX
        </span>
        <span className="text-[#1b8b75]">·</span>
        <span className="hidden sm:inline">solo operator</span>
        <span className="hidden text-[#1b8b75] sm:inline">·</span>
        <span className="text-[#75ff92]">see what it ships</span>
        <span className="text-[#1b8b75]">·</span>
        <span className="text-[#ff7a18] underline-offset-4 group-hover:underline">
          $1 →
        </span>
      </div>
    </Link>
  );
}
