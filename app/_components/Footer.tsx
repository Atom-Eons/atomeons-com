import Link from "next/link";
import { AtomMark } from "./AtomMark";

/**
 * Footer — premium-restraint rebuild · 2026-06-01 (wf_79e1e01d-513).
 *
 * What the prior footer was doing wrong (per the audit):
 *  - 6 columns, 35+ links — fire-hose, not navigation
 *  - Dual accents (cyan + orange) competing in the same surface
 *  - Animated pulse dot on "start here" — launch-week microsite tell
 *  - "Lab Status" column reading like a wartime sitrep with v6 badge
 *  - Mono caps with extreme tracking on every column header
 *  - Æ-prefix on Research column — advertises specialness
 *  - Surfaces routes Header explicitly hid (/where-am-i, /tools, /vs, etc.)
 *
 * This rebuild:
 *  - 4 columns mirroring Header dropdowns 1:1
 *  - One accent (cyan), hover-only
 *  - Humanist sans column headers, sentence-case
 *  - All micro-meta (legal links) collapsed into bottom bar
 *  - Zero badges, zero pulses, zero status sitrep
 */

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-[#1A2225] bg-black">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="AtomEons">
            <AtomMark size={28} speed={999} />
            <span className="text-[15px] font-semibold tracking-tight text-[#F2F4F5]">
              AtomEons
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-[1.65] text-[#9BA5A7]">
            Independent AI research. Software, books, apps, lessons.
            One operator. Marco Island, FL.
          </p>
        </div>

        {/* Learn — mirrors Header dropdown */}
        <div>
          <h2 className="text-[12px] font-medium text-[#9BA5A7]">Learn</h2>
          <ul className="mt-4 space-y-2.5 text-[14px] text-[#E7EBED]">
            <li><Link href="/learn" className="transition-colors hover:text-[#22F0D5]">The curriculum</Link></li>
            <li><Link href="/learn/playbooks" className="transition-colors hover:text-[#22F0D5]">Playbooks by job</Link></li>
            <li><Link href="/learn/synthesis" className="transition-colors hover:text-[#22F0D5]">Synthesis</Link></li>
            <li><Link href="/learn/deep" className="transition-colors hover:text-[#22F0D5]">Deep · doctorate track</Link></li>
            <li><Link href="/learn/cyber" className="transition-colors hover:text-[#22F0D5]">Cyber · ethical hacking</Link></li>
            <li><Link href="/start" className="transition-colors hover:text-[#22F0D5]">Start · 11-min intro</Link></li>
          </ul>
        </div>

        {/* Products — mirrors Header dropdown */}
        <div>
          <h2 className="text-[12px] font-medium text-[#9BA5A7]">Products</h2>
          <ul className="mt-4 space-y-2.5 text-[14px] text-[#E7EBED]">
            <li><Link href="/orangebox" className="transition-colors hover:text-[#22F0D5]">Orangebox</Link></li>
            <li><Link href="/b00kmakor" className="transition-colors hover:text-[#22F0D5]">B00KMAKR</Link></li>
            <li><Link href="/skilski" className="transition-colors hover:text-[#22F0D5]">skil.ski</Link></li>
            <li><Link href="/pricing" className="transition-colors hover:text-[#22F0D5]">Pricing</Link></li>
            <li><Link href="/account" className="transition-colors hover:text-[#22F0D5]">Account</Link></li>
            <li><Link href="/support" className="transition-colors hover:text-[#22F0D5]">Support</Link></li>
          </ul>
        </div>

        {/* Lab — research + about + status folded */}
        <div>
          <h2 className="text-[12px] font-medium text-[#9BA5A7]">Lab</h2>
          <ul className="mt-4 space-y-2.5 text-[14px] text-[#E7EBED]">
            <li><Link href="/research/papers" className="transition-colors hover:text-[#22F0D5]">Papers</Link></li>
            <li><Link href="/research/lessons-from-sci-fi" className="transition-colors hover:text-[#22F0D5]">Lessons from sci-fi</Link></li>
            <li><Link href="/founders-view" className="transition-colors hover:text-[#22F0D5]">Founder&apos;s View</Link></li>
            <li><Link href="/press" className="transition-colors hover:text-[#22F0D5]">Press</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-[#22F0D5]">About</Link></li>
            <li><Link href="/now" className="transition-colors hover:text-[#22F0D5]">/now · this week</Link></li>
            <li><Link href="/ask" className="transition-colors hover:text-[#22F0D5]">/ask · semantic Q&amp;A</Link></li>
            <li><Link href="/constellation" className="transition-colors hover:text-[#22F0D5]">/constellation · graph</Link></li>
            <li><Link href="/datasets" className="transition-colors hover:text-[#22F0D5]">/datasets · public data</Link></li>
            <li><Link href="/vendor-pack" className="transition-colors hover:text-[#22F0D5]">/vendor-pack · CISO bundle</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar — copyright + legal microlinks + verify */}
      <div className="border-t border-[#1A2225]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-3 px-6 py-6 text-[12px] text-[#6B7779] md:flex-row md:items-center md:justify-between">
          <p>© 2026 AtomEons Systems Laboratory · Atom McCree · Marco Island, FL</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/legal/terms" className="transition-colors hover:text-[#E7EBED]">Terms</Link>
            <Link href="/legal/privacy" className="transition-colors hover:text-[#E7EBED]">Privacy</Link>
            <Link href="/legal/refund" className="transition-colors hover:text-[#E7EBED]">Refunds</Link>
            <a
              href="https://x.com/AtomMccree"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-[#E7EBED]"
            >
              @AtomMccree
            </a>
            <a
              href="https://www.linkedin.com/developers/apps/verification/91a1ed08-379d-44d7-b347-b0b9977ca824"
              rel="me noopener"
              target="_blank"
              className="transition-colors hover:text-[#E7EBED]"
              aria-label="LinkedIn developer app verification"
            >
              LinkedIn verify
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
