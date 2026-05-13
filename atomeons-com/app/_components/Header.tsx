import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#204538] bg-[#04100d]/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="text-3xl font-black leading-none text-[#ff7a18] transition-transform group-hover:-translate-y-px">
            Æ
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
              ÆoNs Research Lab
            </p>
            <p className="text-sm font-semibold tracking-tight text-[#f7f0e4]">
              AtomEons
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 text-sm md:gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-[#a7b8ad] transition-colors hover:bg-[#071915] hover:text-[#f7f0e4]"
          >
            Home
          </Link>
          <Link
            href="/orangebox"
            className="rounded-md px-3 py-1.5 text-[#a7b8ad] transition-colors hover:bg-[#071915] hover:text-[#f7f0e4]"
          >
            ORANGEBOX
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-[#a7b8ad] transition-colors hover:bg-[#071915] hover:text-[#f7f0e4]"
          >
            About
          </Link>
          <Link
            href="/orangebox#buy"
            className="ml-2 rounded-md border border-[#ff7a18] bg-[#ff7a18] px-3 py-1.5 text-sm font-semibold text-[#06110e] transition-colors hover:bg-[#ffc46b]"
          >
            Buy
          </Link>
        </nav>
      </div>
    </header>
  );
}
