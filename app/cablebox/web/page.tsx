import type { Metadata } from "next";
import Link from "next/link";
import styles from "./web.module.css";

export const metadata: Metadata = {
  title: "CableBox Web | Play now",
  description: "Turn it on. Surf. CableBox is live in your browser.",
  alternates: { canonical: "https://atomeons.com/cablebox/web" },
};

export default function CableboxWebPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.utility} aria-label="CableBox Web utility navigation">
        <Link href="/cablebox">CABLEBOX / ABOUT</Link>
        <span>LIVE BROWSER EDITION</span>
        <a href="https://github.com/Atom-Eons/CableBox2/releases/download/v1.0.0/CableBox2-Windows-x64-1.0.0.zip">
          DOWNLOAD WINDOWS
        </a>
      </nav>
      <iframe
        className={styles.experience}
        src="/cablebox2-web/index.html"
        title="CableBox 2 live browser edition"
        allow="autoplay; fullscreen"
      />
      <p className={styles.hint}>CLICK THE TELEVISION / USE LEFT + RIGHT / R RANDOM / C CONTROLS</p>
    </main>
  );
}
