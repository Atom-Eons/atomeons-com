"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

/**
 * Header nav link with active-route indicator.
 *
 * Orange is reserved for the boxed ORANGEBOX link + the v5 LIVE badge.
 * Every other NavLink uses cyan for the active underline and cyan-on-hover
 * for hovered inactive state. No orange anywhere on a normal NavLink.
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
          ? "border-b-2 border-[#22F0D5] pb-0.5 text-[#F2F4F5]"
          : "border-b-2 border-transparent pb-0.5 text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]"
      }`}
    >
      {children}
    </Link>
  );
}
