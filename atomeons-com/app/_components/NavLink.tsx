"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

/**
 * Header nav link with active-route indicator. Active state shows
 * a thin orange underline + brighter foreground; inactive stays muted.
 */
export function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-b-2 border-[#ff7a18] pb-0.5 text-[#f7f0e4]"
          : "border-b-2 border-transparent pb-0.5 text-[#a7b8ad] hover:bg-[#071915] hover:text-[#f7f0e4]"
      }`}
    >
      {children}
    </Link>
  );
}
