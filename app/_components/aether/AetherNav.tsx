"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./AetherNav.module.css";

const navigation = [
  ["CableBox 2", "/cablebox"],
  ["Atomic Orange", "/orange5"],
  ["Books", "/books"],
  ["Research", "/research"],
  ["Show", "/atom-alive"],
  ["About", "/about"],
] as const;

export function AetherNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="AtomEons home">
          <span className={styles.mark}>AE</span>
          <span className={styles.wordmark}>ATOMEONS</span>
          <span className={styles.edition}>THINGS THAT DID NOT EXIST</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>

        <div className={styles.actions}>
          <Link href="/cablebox/web" className={styles.tryButton}>Try CableBox <span aria-hidden="true">↗</span></Link>
          <button
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">
          {navigation.map(([label, href], index) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              <small>0{index + 1}</small><span>{label}</span><b aria-hidden="true">↗</b>
            </Link>
          ))}
          <Link className={styles.mobileTry} href="/cablebox/web" onClick={() => setOpen(false)}>
            Turn on CableBox 2 <b aria-hidden="true">↗</b>
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
