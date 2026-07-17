"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PRODUCTS, RESEARCH_LINKS } from "../../_data/aether-canon";
import styles from "./AetherNav.module.css";

const navigation = [
  {
    label: "Radiance",
    href: "/research/papers/radiance-luminance-alpha-wolf-eyes",
    special: true,
  },
  {
    label: "Products",
    href: "/#products",
    items: PRODUCTS.map((item) => [item.title, item.href, item.descriptor] as const),
  },
  {
    label: "Show",
    href: "/atom-alive",
  },
  {
    label: "Research",
    href: "/research",
    items: RESEARCH_LINKS.map((item) => [item.title, item.href, item.descriptor] as const),
  },
  {
    label: "About",
    href: "/about",
    items: [
      ["About AtomEons", "/about", "The artist, the company, and the work"],
      ["Press", "/press", "Press notes and media kit"],
      ["Receipts", "/receipts", "Public proof surfaces"],
      ["Explore", "/explore", "The focused public index"],
    ],
  },
] as const;

export function AetherNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      } else if (!isTyping && event.key === "/") {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) requestAnimationFrame(() => searchRef.current?.focus());
  }, [searchOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="AtomEons home">
            <span className={styles.mark}>Æ</span>
            <span className={styles.wordmark}>ATOMEONS</span>
            <span className={styles.edition}>AETHER / 01</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navigation.map((item) => (
              <div
                className={styles.navGroup}
                data-dropdown={"items" in item}
                data-special={"special" in item}
                key={item.label}
              >
                <Link href={item.href} className={"special" in item ? styles.radianceLink : undefined}>
                  {item.label}
                </Link>
                {"items" in item ? (
                  <div className={styles.dropdown}>
                    <p>{item.label} / INDEX</p>
                    <ul>
                      {item.items.map(([label, href, description]) => (
                        <li key={href}>
                          <Link href={href}>
                            <span>{label}</span>
                            <small>{description}</small>
                            <b aria-hidden>↗</b>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className={styles.actions}>
            <button className={styles.searchButton} onClick={() => setSearchOpen(true)} aria-label="Search AtomEons">
              <span aria-hidden>⌕</span>
              <span>Search</span>
              <kbd>⌘K</kbd>
            </button>
            <Link href="/#products" className={styles.launchButton}>
              See the work <span aria-hidden>↗</span>
            </Link>
            <button
              className={styles.menuButton}
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="aether-mobile-menu"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              <span /><span />
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav id="aether-mobile-menu" className={styles.mobileMenu} aria-label="Mobile navigation">
            {navigation.map((item, itemIndex) => (
              <div key={item.label} data-special={"special" in item}>
                <p>0{itemIndex + 1} / {item.label}</p>
                {"items" in item ? item.items.map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}>{label}<span aria-hidden>↗</span></Link>
                )) : (
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>Enter {item.label}<span aria-hidden>↗</span></Link>
                )}
              </div>
            ))}
            <button onClick={() => { setMobileOpen(false); setSearchOpen(true); }}>Search the archive <span aria-hidden>⌕</span></button>
          </nav>
        ) : null}
      </header>

      {searchOpen ? (
        <div className={styles.searchOverlay} role="dialog" aria-modal="true" aria-label="Search AtomEons">
          <button className={styles.overlayClose} onClick={() => setSearchOpen(false)} aria-label="Close search">ESC / CLOSE</button>
          <form action="/search" className={styles.searchForm} onSubmit={() => setSearchOpen(false)}>
            <label htmlFor="aether-search">Search the AtomEons archive.</label>
            <div>
              <span aria-hidden>⌕</span>
              <input
                ref={searchRef}
                id="aether-search"
                type="search"
                name="q"
                placeholder="products, papers, tools, books…"
                autoComplete="off"
              />
              <button type="submit">SEARCH ↗</button>
            </div>
            <p>Try “CableBox”, “Bookmaker”, “AEyes”, “memory”, or “compression”.</p>
          </form>
        </div>
      ) : null}
    </>
  );
}
