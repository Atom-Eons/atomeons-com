import Link from "next/link";
import { AtomMark } from "./AtomMark";

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[#1A2225] bg-black">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]">
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
          <div className="mt-5">
            <Link
              href="/start"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]" />
              start here · 11 min
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Learn
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><Link href="/learn" className="hover:text-[#22F0D5]">/learn · 27-lesson curriculum</Link></li>
            <li><Link href="/learn/where-am-i" className="hover:text-[#22F0D5]">Where am I? · 2-min level diagnostic</Link></li>
            <li><Link href="/tools" className="hover:text-[#22F0D5]">Tools · what do you need to do right now?</Link></li>
            <li><Link href="/vs" className="hover:text-[#22F0D5]">Comparisons · honest AI head-to-heads</Link></li>
            <li><Link href="/prompt-kit" className="hover:text-[#22F0D5]">Prompt Kit · 27 copy-paste prompts</Link></li>
            <li><Link href="/glossary" className="hover:text-[#22F0D5]">Glossary · every AI word in plain English</Link></li>
            <li><Link href="/start" className="hover:text-[#22F0D5]">/start · 11-min novice on-ramp</Link></li>
            <li><Link href="/ai" className="hover:text-[#22F0D5]">AI Guide · the 44M reference</Link></li>
            <li><Link href="/faq" className="hover:text-[#22F0D5]">FAQ · AI 101 + product</Link></li>
            <li><Link href="/search" className="hover:text-[#22F0D5]">Lab directory · /search</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Æ Research
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><Link href="/research/about" className="hover:text-[#22F0D5]">About the lab</Link></li>
            <li><Link href="/research/papers" className="hover:text-[#22F0D5]">Research Papers · 12</Link></li>
            <li><Link href="/research/lessons-from-sci-fi" className="hover:text-[#22F0D5]">Lessons From Sci-Fi</Link></li>
            <li><Link href="/intel/x-algorithm" className="hover:text-[#22F0D5]">X Algorithm Alpha</Link></li>
            <li><Link href="/founders-view" className="hover:text-[#22F0D5]">Founder&apos;s View · 8pm ET</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
            Products + Buy
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><Link href="/orangebox" className="hover:text-[#FF7A1A]">ORANGEBOX bundle · FREE launch week · then $99</Link></li>
            <li><Link href="/pricing" className="hover:text-[#FF7A1A]">Pricing</Link></li>
            <li><Link href="/orangebox/legacy" className="hover:text-[#FF7A1A]">v6.1.0 legacy archive</Link></li>
            <li><Link href="/skilski" className="hover:text-[#FF7A1A]">skil.ski</Link></li>
            <li><Link href="/b00kmakor" className="hover:text-[#FF7A1A]">B00KMakor</Link></li>
            <li><Link href="/account" className="hover:text-[#FF7A1A]">Your account</Link></li>
            <li><Link href="/support" className="hover:text-[#FF7A1A]">Support</Link></li>
            <li><Link href="/press" className="hover:text-[#FF7A1A]">Press kit</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            About + Legal
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#F2F4F5]">
            <li><Link href="/about" className="hover:text-[#22F0D5]">About Atom</Link></li>
            <li><Link href="/manifesto" className="hover:text-[#22F0D5]">Manifesto · 14 clauses</Link></li>
            <li><Link href="/now" className="hover:text-[#22F0D5]">/now · this week</Link></li>
            <li><Link href="/changelog" className="hover:text-[#22F0D5]">Changelog</Link></li>
            <li><Link href="/legal/terms" className="hover:text-[#22F0D5]">Terms</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-[#22F0D5]">Privacy</Link></li>
            <li><Link href="/legal/refund" className="hover:text-[#22F0D5]">Refunds</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Lab Status
          </p>
          <ul className="mt-3 space-y-2">
            <li className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">PAPERS · 12 LIVE</li>
            <li className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">ORANGEBOX BUNDLE · 3 TOOLS</li>
            <li className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">FREE LAUNCH WEEK · THEN $99</li>
            <li className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">BROADCAST · 8pm ET</li>
            <li className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">LICENSE · CC-BY 4.0</li>
            <li className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">LICENSE §4A · NO-SAAS</li>
          </ul>
          <a
            href="https://x.com/AtomMccree"
            target="_blank"
            rel="noopener"
            className="mt-4 block text-sm text-[#F2F4F5] hover:text-[#22F0D5]"
          >
            @AtomMccree
          </a>
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
            <a
              href="https://www.linkedin.com/developers/apps/verification/91a1ed08-379d-44d7-b347-b0b9977ca824"
              rel="me noopener"
              target="_blank"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] transition-colors hover:text-[#22F0D5]"
              aria-label="LinkedIn developer app verification"
            >
              linkedin dev verify
            </a>
            <span className="rounded-md border border-[#22F0D5]/40 bg-black px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#22F0D5]">
              v6
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
