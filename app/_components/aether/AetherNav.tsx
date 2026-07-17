"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./AetherNav.module.css";

const navigation = [
  {
    label: "Creations",
    href: "/#products",
    items: [
      ["CableBox", "/cablebox", "Native CRT cable-surfing"],
      ["AI Bookmaker", "/b00kmakor", "Publishing cockpit"],
      ["Orange5", "/orange5", "Sovereign operator OS"],
      ["Orange³", "/orangebox", "Agentic OS available now"],
      ["skil.ski", "/skilski", "Multi-agent skill registry"],
      ["I AM AI", "/i-am-ai", "Book + 28-track audiobook"],
    ],
  },
  {
    label: "Show",
    href: "/atom-alive",
  },
  {
    label: "Lab",
    href: "/launcher",
    items: [
      ["Launcher", "/launcher", "All nine silos"],
      ["Learn", "/learn", "Curriculum + atlas"],
      ["Research", "/research", "Manuscripts + decoded papers"],
      ["Cyber", "/learn/cyber", "Defensive security track"],
      ["Receipts", "/receipts", "Public proof surfaces"],
      ["For machines", "/api", "MCP + agent interfaces"],
      ["Founder's View", "/founders-view", "Operator field notes"],
    ],
  },
  { label: "About", href: "/about" },
  { label: "Press", href: "/press" },
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
              <div className={styles.navGroup} data-dropdown={"items" in item} key={item.label}>
                <Link href={item.href}>{item.label}</Link>
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
            <Link href="/launcher" className={styles.launchButton}>
              Launch the lab <span aria-hidden>↗</span>
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
              <div key={item.label}>
                <p>0{itemIndex + 1} / {item.label}</p>
                {"items" in item ? item.items.map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}>{label}<span aria-hidden>↗</span></Link>
                )) : (
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>Enter {item.label}<span aria-hidden>↗</span></Link>
                )}
              </div>
            ))}
            <button onClick={() => { setMobileOpen(false); setSearchOpen(true); }}>Search the laboratory <span aria-hidden>⌕</span></button>
          </nav>
        ) : null}
      </header>

      {searchOpen ? (
        <div className={styles.searchOverlay} role="dialog" aria-modal="true" aria-label="Search AtomEons">
          <button className={styles.overlayClose} onClick={() => setSearchOpen(false)} aria-label="Close search">ESC / CLOSE</button>
          <form action="/search" className={styles.searchForm} onSubmit={() => setSearchOpen(false)}>
            <label htmlFor="aether-search">Search 319 routes.</label>
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
            <p>Try “local AI”, “prompt injection”, “publishing”, “Claude memory”, or “sci-fi”.</p>
          </form>
        </div>
      ) : null}
    </>
  );
}
