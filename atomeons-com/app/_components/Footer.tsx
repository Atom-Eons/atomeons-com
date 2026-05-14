import Link from "next/link";
import { AtomMark } from "./AtomMark";

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[#204538] bg-[#04100d]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <AtomMark size={32} speed={11} />
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                ÆoNs Research Lab
              </p>
              <p className="text-sm font-semibold tracking-tight text-[#f7f0e4]">
                AtomEons
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-xs text-[#a7b8ad]">
            One organism, many lenses. Anti-sprawl, premium coherence, truth
            over theater. Built by one operator in Marco Island, FL.
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
            Lab
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#f7f0e4]">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/changelog">Changelog</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
            Ship
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#f7f0e4]">
            <li>
              <Link href="/orangebox">ORANGEBOX</Link>
            </li>
            <li>
              <Link href="/orangebox#buy">Buy · $49</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
            Legal
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#f7f0e4]">
            <li>
              <Link href="/legal/terms">Terms</Link>
            </li>
            <li>
              <Link href="/legal/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/legal/refund">Refunds</Link>
            </li>
            <li>
              <a href="mailto:a.mccree@gmail.com">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#204538]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-2 px-6 py-5 text-xs text-[#a7b8ad] md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 AtomEons Systems Laboratory · Atom McCree · Marco Island,
            FL
          </p>
          <p className="flex items-center gap-3">
            <Link
              href="/changelog"
              className="rounded border border-[#204538] bg-[#071915] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#75ff92] hover:border-[#ff7a18]/50"
            >
              v8
            </Link>
            <a href="mailto:a.mccree@gmail.com">a.mccree@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
