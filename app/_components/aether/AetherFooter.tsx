import Link from "next/link";
import styles from "./AetherFooter.module.css";

export function AetherFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.callout}>
        <div>
          <p>LIVE OBJECT / 01</p>
          <h2>CableBox 2</h2>
          <span>Turn the internet back into television.</span>
        </div>
        <Link href="/cablebox/web">Try it now <b aria-hidden="true">↗</b></Link>
      </div>

      <div className={styles.body}>
        <div className={styles.brand}>
          <Link href="/"><i>AE</i><strong>ATOMEONS</strong></Link>
          <p>Independent products and experimental research by Atom McCree and an AI workforce in Naples, Florida.</p>
          <a href="https://github.com/Atom-Eons">github.com/Atom-Eons ↗</a>
        </div>
        <nav aria-label="Footer navigation">
          <div><p>Products</p><Link href="/cablebox">CableBox 2</Link><Link href="/orange5">Atomic Orange</Link></div>
          <div><p>Field</p><Link href="/research">Research</Link><Link href="/atom-alive">Atom Alive</Link><Link href="/explore">Archive</Link></div>
          <div><p>Human</p><Link href="/about">About</Link><Link href="/press">Press</Link><Link href="/contact">Contact</Link></div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 ATOMEONS / ATOM MCCREE + AI</p>
        <div><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/trust">Trust</Link></div>
      </div>
    </footer>
  );
}
