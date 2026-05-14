import Link from "next/link";
import { AtomMark } from "./AtomMark";
import { SystemLog } from "./SystemLog";
import { NavLink } from "./NavLink";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#204538] bg-[#04100d]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="glitch-hover">
            <AtomMark size={36} speed={9} />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
              ÆoNs Research Lab
            </p>
            <p className="text-sm font-semibold tracking-tight text-[#f7f0e4]">
              AtomEons
            </p>
          </div>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex md:gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/orangebox">ORANGEBOX</NavLink>
          <NavLink href="/about">About</NavLink>
          <Link
            href="/orangebox#buy"
            className="ml-2 rounded-md border border-[#ff7a18] bg-[#ff7a18] px-3 py-1.5 text-sm font-semibold text-[#06110e] transition-colors hover:bg-[#ffc46b]"
          >
            Buy
          </Link>
        </nav>
        {/* Mobile hamburger */}
        <MobileNav />
      </div>
      <SystemLog />
    </header>
  );
}
