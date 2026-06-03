"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

type ChildLink = {
  href: string;
  label: string;
  pip?: "live" | "soon";
};

type NavSection =
  | {
      kind: "link";
      href: string;
      label: string;
    }
  | {
      kind: "group";
      href: string;
      label: string;
      children: ChildLink[];
    };

const SECTIONS: NavSection[] = [
  { kind: "link", href: "/research", label: "Research" },
  { kind: "link", href: "/cyber", label: "Cyber" },
  {
    kind: "group",
    href: "/learn",
    label: "Learn",
    children: [
      { href: "/learn/atlas", label: "Atlas" },
      { href: "/learn/career", label: "Career" },
      { href: "/learn/trust", label: "Trust" },
      { href: "/learn/decode", label: "Decode" },
      { href: "/learn/calc", label: "Calc" },
      { href: "/learn/decoded-papers", label: "Decoded papers" },
    ],
  },
  {
    kind: "group",
    href: "/products",
    label: "Products",
    children: [
      { href: "/orangebox", label: "ORANGEBOX", pip: "live" },
      { href: "/b00kmakor", label: "B00KMAKR", pip: "live" },
      { href: "/i-am-ai", label: "I AM AI · the book", pip: "soon" },
    ],
  },
  { kind: "link", href: "/founders-view", label: "Founder's View" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function hasActiveChild(pathname: string, children: ChildLink[]): boolean {
  return children.some((c) => isActive(pathname, c.href));
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [reduceMotion, setReduceMotion] = useState(false);
  const pathname = usePathname() ?? "/";
  const drawerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-expand any group whose child is currently active
  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const s of SECTIONS) {
      if (s.kind === "group" && hasActiveChild(pathname, s.children)) {
        next[s.href] = true;
      }
    }
    setExpanded((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body scroll lock
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const prevOverflow = document.body.style.overflow;
      const prevPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPaddingRight;
      };
    }
  }, [open]);

  // ESC to close + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        openerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus close button when drawer opens
  useEffect(() => {
    if (open) {
      // Defer so the element is in the DOM
      const id = window.setTimeout(() => {
        closeRef.current?.focus();
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const toggleGroup = useCallback((href: string) => {
    setExpanded((prev) => ({ ...prev, [href]: !prev[href] }));
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    openerRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-none border border-[#1F242B] bg-[#0F1114] text-[#F4F4F2] hover:border-[#22F0D5] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-[#08090B]/85 backdrop-blur-md ${
              reduceMotion ? "" : "animate-[fadeIn_180ms_ease-out]"
            }`}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            id="mobile-nav-drawer"
            className={`absolute right-0 top-0 h-full w-[88%] max-w-[420px] bg-[#08090B] border-l border-[#1F242B] flex flex-col ${
              reduceMotion ? "" : "animate-[slideInRight_220ms_ease-out]"
            }`}
            style={{ willChange: reduceMotion ? "auto" : "transform" }}
          >
            {/* Header strip */}
            <div className="flex items-center justify-between h-14 px-5 border-b border-[#1F242B]">
              <Link
                href="/"
                onClick={closeDrawer}
                className="font-[family-name:var(--font-inter)] text-[#F4F4F2] text-sm tracking-[0.18em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
              >
                AtomEons
              </Link>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={closeDrawer}
                className="inline-flex h-11 w-11 items-center justify-center rounded-none border border-[#1F242B] bg-[#0F1114] text-[#F4F4F2] hover:border-[#22F0D5] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable body */}
            <nav
              aria-label="Primary"
              className="flex-1 overflow-y-auto overscroll-contain px-2 py-3"
            >
              <ul className="flex flex-col">
                {SECTIONS.map((section) => {
                  if (section.kind === "link") {
                    const active = isActive(pathname, section.href);
                    return (
                      <li key={section.href}>
                        <Link
                          href={section.href}
                          onClick={closeDrawer}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center min-h-12 px-4 text-[15px] font-[family-name:var(--font-inter)] tracking-[0.02em] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5] ${
                            active
                              ? "text-[#F4F4F2]"
                              : "text-[#F4F4F2] hover:text-[#22F0D5]"
                          }`}
                        >
                          <span
                            className={`relative ${
                              active
                                ? "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-[#22F0D5]"
                                : ""
                            }`}
                          >
                            {section.label}
                          </span>
                        </Link>
                      </li>
                    );
                  }

                  // group
                  const groupActive =
                    isActive(pathname, section.href) ||
                    hasActiveChild(pathname, section.children);
                  const isOpen = !!expanded[section.href];

                  return (
                    <li key={section.href}>
                      <div className="flex items-stretch">
                        <Link
                          href={section.href}
                          onClick={closeDrawer}
                          aria-current={
                            isActive(pathname, section.href) ? "page" : undefined
                          }
                          className={`flex-1 flex items-center min-h-12 pl-4 pr-2 text-[15px] font-[family-name:var(--font-inter)] tracking-[0.02em] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5] ${
                            groupActive
                              ? "text-[#F4F4F2]"
                              : "text-[#F4F4F2] hover:text-[#22F0D5]"
                          }`}
                        >
                          <span
                            className={`relative ${
                              isActive(pathname, section.href)
                                ? "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-[#22F0D5]"
                                : ""
                            }`}
                          >
                            {section.label}
                          </span>
                        </Link>
                        <button
                          type="button"
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${
                            section.label
                          } submenu`}
                          aria-expanded={isOpen}
                          aria-controls={`mobile-submenu-${section.label.toLowerCase()}`}
                          onClick={() => toggleGroup(section.href)}
                          className="inline-flex h-12 w-12 items-center justify-center text-[#9CA3AF] hover:text-[#22F0D5] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              reduceMotion ? "" : "duration-200"
                            } ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      {isOpen && (
                        <ul
                          id={`mobile-submenu-${section.label.toLowerCase()}`}
                          className="ml-6 border-l border-[#1F242B]"
                        >
                          {section.children.map((child) => {
                            const childActive = isActive(pathname, child.href);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={closeDrawer}
                                  aria-current={childActive ? "page" : undefined}
                                  className={`flex items-center gap-2 min-h-11 pl-4 pr-4 text-[13px] font-[family-name:var(--font-inter)] tracking-[0.02em] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5] ${
                                    childActive
                                      ? "text-[#F4F4F2]"
                                      : "text-[#9CA3AF] hover:text-[#22F0D5]"
                                  }`}
                                >
                                  {child.pip === "live" && (
                                    <span
                                      aria-hidden="true"
                                      className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5]"
                                    />
                                  )}
                                  {child.pip === "soon" && (
                                    <span
                                      aria-hidden="true"
                                      className="inline-block h-1.5 w-1.5 rounded-full border border-[#5A6068]"
                                    />
                                  )}
                                  <span
                                    className={`relative ${
                                      childActive
                                        ? "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-[#22F0D5]"
                                        : ""
                                    }`}
                                  >
                                    {child.label}
                                  </span>
                                  {child.pip === "soon" && (
                                    <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                                      soon
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Start CTA */}
              <div className="mt-4 px-4 pb-2">
                <Link
                  href="/start"
                  onClick={closeDrawer}
                  className="flex items-center justify-center h-12 w-full border border-[#22F0D5] text-[#22F0D5] text-sm font-[family-name:var(--font-inter)] tracking-[0.18em] uppercase hover:bg-[#22F0D5] hover:text-[#08090B] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5] transition-colors"
                >
                  Start
                </Link>
              </div>
            </nav>

            {/* Footer rule */}
            <div className="border-t border-[#1F242B] px-5 py-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#5A6068] font-[family-name:var(--font-jetbrains-mono)]">
                AtomEons Systems Laboratory
              </p>
            </div>
          </div>

          {/* Keyframes (scoped inline) */}
          <style jsx>{`
            @keyframes slideInRight {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
