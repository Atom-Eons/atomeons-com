import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WindowsDownloadTrust } from "../_components/WindowsDownloadTrust";
import styles from "./cablebox2.module.css";

const download = "https://github.com/Atom-Eons/CableBox2/releases/download/v1.0.0/CableBox2-Windows-x64-1.0.0.zip";
const source = "https://github.com/Atom-Eons/CableBox2";
const webEdition = "/cablebox2-web/index.html";

export const metadata: Metadata = {
  title: "CableBox 2 | Turn it on. Surf.",
  description:
    "CableBox 2 is free, open-source cable-surfing art for Windows and the web. Turn a knob, change the room, and find something you did not plan to watch.",
  alternates: { canonical: "https://atomeons.com/cablebox" },
  openGraph: {
    title: "CableBox 2 | Turn it on. Surf.",
    description: "Television without the homework. Free for Windows and the web.",
    url: "https://atomeons.com/cablebox",
    siteName: "AtomEons",
    type: "website",
    images: [{ url: "/cablebox-premiere/hero-active.webp", width: 1920, height: 1080, alt: "CableBox 2 running as a living vintage television" }],
  },
};

const worlds = [
  ["/cablebox-premiere/theme-space.webp", "Deep Space"],
  ["/cablebox-premiere/theme-underwater.webp", "Underwater"],
  ["/cablebox-premiere/theme-cowboy.webp", "Cowboy"],
  ["/cablebox-premiere/theme-gatsby.webp", "Gatsby"],
] as const;

export default function CableBoxPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="cablebox-title">
        <div className={styles.heroCopy}>
          <p><i /> PUBLIC RELEASE / 2.0</p>
          <h1 id="cablebox-title">Television<br />without the<br /><em>homework.</em></h1>
          <span>
            CableBox 2 is a living vintage television. Turn a knob. Change the room.
            Open the guide. Find something you never would have searched for.
          </span>
          <div className={styles.actions}>
            <Link href="/cablebox/web">Try it now <b aria-hidden="true">↗</b></Link>
            <a href={download}>Download Windows <b aria-hidden="true">↓</b></a>
          </div>
          <small>FREE / OPEN SOURCE / NO ACCOUNT / TOUCH READY</small>
        </div>
        <Link className={styles.heroScreen} href="/cablebox/web" aria-label="Try the live CableBox 2 web edition">
          <Image src="/cablebox-premiere/hero-active.webp" alt="CableBox 2 running inside a vintage television" fill priority unoptimized sizes="(max-width: 900px) 100vw, 55vw" />
          <span><i /> CLICK TO TURN ON</span>
        </Link>
      </section>

      <div className={styles.factRail} aria-label="CableBox 2 at a glance">
        <span><b>33</b> television worlds</span>
        <span><b>1</b> changing daily dial</span>
        <span><b>2</b> physical touch knobs</span>
        <span><b>0</b> setup maze</span>
      </div>

      <section className={styles.live} aria-labelledby="live-title">
        <header>
          <div><p>THE FASTEST WAY IN</p><h2 id="live-title">It is already on.</h2></div>
          <div><span>Tap the television. Use the knobs on a phone or the arrow keys on a computer.</span><Link href="/cablebox/web">Open full screen ↗</Link></div>
        </header>
        <div className={styles.frame}>
          <iframe src={webEdition} title="CableBox 2 live web edition" allow="autoplay; fullscreen" loading="eager" />
        </div>
        <footer><span>WEB EDITION / TOUCH + KEYBOARD</span><span>THEME KNOB / CHANNEL KNOB / GUIDE</span></footer>
      </section>

      <section className={styles.reason} aria-labelledby="reason-title">
        <div><p>WHY IT EXISTS</p><h2 id="reason-title">Streaming made television feel like office work.</h2></div>
        <div className={styles.reasonCards}>
          <article><span>01 / SURF</span><h3>Choice ends. Discovery begins.</h3><p>The daily dial is curated, shuffled, and ready before you can overthink it.</p></article>
          <article><span>02 / STAY</span><h3>The show keeps moving.</h3><p>A smarter director moves past failed signals and avoids leaving you with a dead screen.</p></article>
          <article><span>03 / TOUCH</span><h3>The television is the interface.</h3><p>Turn the physical knobs on a phone. Use arrows on a keyboard. No modern app chrome.</p></article>
        </div>
      </section>

      <section className={styles.worlds} aria-labelledby="worlds-title">
        <header><p>CHANGE THE ROOM</p><h2 id="worlds-title">One dial.<br />Thirty-three worlds.</h2><span>The television changes character without interrupting the ritual. Every cabinet is a real CableBox production world.</span></header>
        <div>
          {worlds.map(([src, name], index) => (
            <figure key={name}>
              <div><Image src={src} alt={`CableBox 2 ${name} television world`} fill unoptimized sizes="(max-width: 720px) 100vw, 50vw" /></div>
              <figcaption><span>0{index + 1}</span><strong>{name}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.download} id="download" aria-labelledby="download-title">
        <div className={styles.downloadLead}>
          <p>THE FULL WINDOWS OBJECT</p>
          <h2 id="download-title">Take the television home.</h2>
          <span>One ZIP. Extract it. Open CableBox2.exe. No installer maze and no separate .NET setup.</span>
          <a href={download}>Download CableBox 2 <b>422.5 MiB ↓</b></a>
          <small>WINDOWS X64 / VERSION 1.0.0 / GPL-3.0</small>
        </div>
        <WindowsDownloadTrust
          productName="CableBox 2"
          releaseState="PUBLIC RELEASE / FREE / OPEN SOURCE"
          sourceHref={source}
          downloadHref={download}
          filename="CableBox2-Windows-x64-1.0.0.zip"
          version="1.0.0"
          sha256="145FC8796C4E63F956A1588B39A581FAA2E3F443227FE40B6D3F3AD12B5FA384"
          buildDate="2026-08-25"
          attestationHref="https://github.com/Atom-Eons/CableBox2/releases/tag/v1.0.0"
        />
      </section>

      <section className={styles.open}>
        <div><p>OPEN SOURCE / PUBLIC PROOF</p><h2>Look under the cabinet.</h2></div>
        <div>
          <p>The source, release notes, exact checksum, contribution guide, and issue tracker are public in one organization-owned repository.</p>
          <a href={source}>Open CableBox 2 on GitHub ↗</a>
          <Link href="/cablebox/technical">Read the optional technical details ↗</Link>
        </div>
      </section>

      <section className={styles.lastCall}>
        <p>TURN IT ON. SURF.</p>
        <div><Link href="/cablebox/web">Try the web edition ↗</Link><a href={download}>Download Windows ↓</a></div>
      </section>
    </main>
  );
}
