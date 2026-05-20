import Link from "next/link";
import { AtomMark } from "./AtomMark";

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[#1A2225] bg-black">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <AtomMark size={32} speed={999} />
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                Software · Books · Apps · LLMs
              </p>
              <p className="text-sm font-semibold tracking-tight text-[#F2F4F5]">
                AtomEons
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-xs text-[#9BA5A7]">
            One operator. One cockpit. Ships when it&apos;s ready, not when
            the calendar says so.
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Æ Research
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><Link href="/research/about" className="hover:text-[#22F0D5]">About the lab</Link></li>
            <li><Link href="/research/papers" className="hover:text-[#22F0D5]">Research Papers</Link></li>
            <li><Link href="/intel/x-algorithm" className="hover:text-[#22F0D5]">X Algorithm Alpha · 2026-05-18</Link></li>
            <li><Link href="/founders-view" className="hover:text-[#22F0D5]">The Founder&apos;s View · 8pm ET</Link></li>
            <li><Link href="/now" className="hover:text-[#22F0D5]">/now · what we&apos;re doing</Link></li>
            <li><Link href="/press" className="hover:text-[#22F0D5]">Press kit</Link></li>
            <li><Link href="/about" className="hover:text-[#22F0D5]">About Atom</Link></li>
            <li><Link href="/mistakes" className="hover:text-[#22F0D5]">Mistakes ledger</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Products
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><Link href="/orangebox" className="hover:text-[#22F0D5]">ORANGEBOX</Link></li>
            <li><Link href="/skilski" className="hover:text-[#22F0D5]">skil.ski</Link></li>
            <li><Link href="/b00kmakor" className="hover:text-[#22F0D5]">B00KMakor</Link></li>
            <li><Link href="/account" className="hover:text-[#22F0D5]">Your account</Link></li>
            <li><Link href="/orangebox#buy" className="hover:text-[#22F0D5]">Get v6.0.0 · $1 →</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Legal
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><Link href="/legal/terms" className="hover:text-[#22F0D5]">Terms</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-[#22F0D5]">Privacy</Link></li>
            <li><Link href="/legal/refund" className="hover:text-[#22F0D5]">Refunds</Link></li>
            <li><Link href="/faq" className="hover:text-[#22F0D5]">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><a href="mailto:a.mccree@gmail.com" className="hover:text-[#22F0D5]">a.mccree@gmail.com</a></li>
            <li><a href="https://x.com/AtomMccree" target="_blank" rel="noopener" className="hover:text-[#22F0D5]">@AtomMccree</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#1A2225]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-2 px-6 py-5 text-xs text-[#6B7779] md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>© 2026 AtomEons Systems Laboratory · Atom McCree · Marco Island, FL</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              independent AI research · one operator · LAB ONLINE
            </p>
          </div>
          <p className="flex items-center gap-3">
            <span className="rounded-md border border-[#22F0D5]/40 bg-black px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#22F0D5]">
              v6
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
