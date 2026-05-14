"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/orangebox", label: "ORANGEBOX" },
  { href: "/about", label: "About" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-[#204538] bg-[#04100d] text-[#f7f0e4] hover:bg-[#071915] md:hidden"
      >
        <span className="font-mono text-lg leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {open ? (
        <div
          className="fixed inset-x-0 top-[64px] z-40 border-b border-[#204538] bg-[#04100d]/98 backdrop-blur-md md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
            {ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-3 text-base ${
                    active
                      ? "border-l-2 border-[#ff7a18] bg-[#071915] text-[#f7f0e4]"
                      : "text-[#a7b8ad] hover:bg-[#071915] hover:text-[#f7f0e4]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/orangebox#buy"
              className="mt-3 inline-flex items-center justify-center rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-3 text-base font-semibold text-[#06110e] hover:bg-[#ffc46b]"
            >
              Buy ORANGEBOX · $49
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
