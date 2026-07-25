import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WindowsDownloadTrust } from "../_components/WindowsDownloadTrust";
import { CableboxPremiere } from "./CableboxPremiere";
import styles from "./cablebox.module.css";

export const metadata: Metadata = {
  title: "CableBox · Turn it on. Surf.",
  description:
    "CableBox is native Windows cable-surfing art: a living vintage television with a changing dial, local media, CRT simulation, and collectible cabinet worlds.",
  alternates: { canonical: "https://atomeons.com/cablebox" },
  openGraph: {
    title: "CableBox · Turn it on. Surf.",
    description: "A living vintage television for Windows. The channel dial is back.",
    url: "https://atomeons.com/cablebox",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/cablebox-premiere/hero-active.webp",
        width: 1920,
        height: 1080,
        alt: "CableBox running as a cinematic red-and-black vintage television",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CableBox - Turn it on. Surf.",
    description: "Native Windows cable-surfing art. A living vintage television with the dial back.",
    creator: "@AtomMccree",
    images: ["/cablebox-premiere/hero-active.webp"],
  },
};

const theatreCards = [
  {
    number: "01",
    label: "THE DIAL",
    title: "Choice ends. Discovery begins.",
    body: "A curated lineup changes daily: 19 rotating lottery channels, three fixed movie channels, three physical favorite slots, and two included local channels.",
    signal: "LEFT / RIGHT TO SURF",
  },
  {
    number: "02",
    label: "THE ACCIDENT",
    title: "R means anywhere.",
    body: "Random Surf does not recommend. It throws the dial to a genuinely random channel and gives serendipity its job back.",
    signal: "R / RANDOM SURF",
  },
  {
    number: "03",
    label: "THE GUIDE",
    title: "Now. Next. Stay awhile.",
    body: "A dedicated cable guide keeps current and upcoming programs inside the television. Its breaks come from a curated vintage commercial vault.",
    signal: "CURRENT + UPCOMING",
  },
  {
    number: "04",
    label: "THE STAR",
    title: "Favorites become physical.",
    body: "Press F. A gold star slaps onto the television with its own motion and sound. Three favorite positions persist as part of the object.",
    signal: "F / FAVORITE",
  },
] as const;

const themes = [
  { src: "/cablebox-premiere/theme-space.webp", name: "Deep Space", number: "03" },
  { src: "/cablebox-premiere/theme-underwater.webp", name: "Underwater", number: "06" },
  { src: "/cablebox-premiere/theme-patchouli.webp", name: "Patchouli", number: "07" },
  { src: "/cablebox-premiere/theme-cowboy.webp", name: "Cowboy", number: "08" },
  { src: "/cablebox-premiere/theme-gatsby.webp", name: "Gatsby", number: "09" },
] as const;

const engineering = [
  {
    index: "A",
    title: "Native or nothing.",
    body: "A self-contained C# Windows application with its own installer and desktop shortcut. No Electron. No browser shell. No web view.",
  },
  {
    index: "B",
    title: "The illusion never breaks.",
    body: "Cinematic boot, analog tuning transitions, in-world controls, and guarded frame changes keep old pictures from flashing over new channels.",
  },
  {
    index: "C",
    title: "The picture behaves like glass.",
    body: "Curved geometry, scanlines, phosphor texture, bloom, tracking, overscan, noise, and natural screen-filling crop live inside a custom CRT tube.",
  },
  {
    index: "D",
    title: "Reliability without the beige menu.",
    body: "English audio is selected automatically; commentary and audio-description tracks are avoided; subtitles stay off; failed signals recover forward.",
  },
  {
    index: "E",
    title: "Your television stays yours.",
    body: "Local programming works offline, existing personal-media libraries survive installation, and your own media joins the dial without a setup maze.",
  },
  {
    index: "F",
    title: "A room, not a window.",
    body: "Small, Medium, and true-takeover Big modes join three invisibility levels and an always-on-top lock. The television can dominate or haunt the desktop.",
  },
] as const;

const controls = [
  ["C", "Controls"],
  ["T", "Theme"],
  ["R", "Random Surf"],
  ["F", "Favorite"],
  ["L", "Lock"],
  ["1 2 3", "Invisibility"],
  ["S M B", "Size"],
  ["X", "Museum"],
  ["← →", "Channel"],
  ["Q", "Quit"],
] as const;

export default function CableboxPage() {
  return (
    <main className={styles.page}>
      <CableboxPremiere />

      <section className={styles.liveStage} aria-labelledby="cablebox-live-title">
        <div className={styles.liveStageHead}>
          <div>
            <p>LIVE NOW / BROWSER EDITION</p>
            <h2 id="cablebox-live-title">The television is on.</h2>
          </div>
          <div className={styles.liveStageActions}>
            <Link href="/cablebox/web">TRY CABLEBOX FULL SCREEN</Link>
            <a href="https://github.com/AtomEons/CableBox/releases/download/CBX-FINAL-V1/CBX-FINAL-V1.zip">
              DOWNLOAD FOR WINDOWS
            </a>
          </div>
        </div>
        <div className={styles.liveFrame}>
          <iframe
            src="/cablebox-web/index.html"
            title="CableBox live browser edition"
            allow="autoplay; fullscreen"
            loading="eager"
          />
        </div>
        <div className={styles.liveStageFoot}>
          <span>CLICK THE TELEVISION TO BEGIN</span>
          <span>LEFT / RIGHT / R RANDOM / C CONTROLS</span>
          <span>NO INSTALL REQUIRED</span>
        </div>
      </section>

      <section className={styles.whiteIntro} id="experience">
        <div className={styles.sectionStamp}>
          <span>THE ANTI-STREAMING PREMIERE</span>
          <span>OBJECT 01 / CABLEBOX</span>
        </div>
        <div className={styles.introGrid}>
          <h2>
            Television was never
            <br />
            supposed to feel like
            <br />
            <em>office work.</em>
          </h2>
          <div>
            <p className={styles.introLede}>
              CableBox is cable-surfing art: a living vintage television that folds
              curated programming, local media, CRT simulation, and collectible
              cabinet worlds into one uninterrupted ritual.
            </p>
            <p>
              No rows of thumbnails. No setup maze. No decision fatigue. Turn it on,
              catch what is already happening, and stay inside the television.
            </p>
          </div>
        </div>
        <div className={styles.marquee}>
          <span>NATIVE WINDOWS</span>
          <span>19 RANDOM CHANNELS</span>
          <span>24+ CABINET WORLDS</span>
          <span>LOCAL + OFFLINE</span>
          <span>UNDER 1 GB TARGET</span>
        </div>
      </section>

      <section className={styles.theatre}>
        <div className={styles.darkSectionHead}>
          <p>ACT I / THE RIDE</p>
          <h2>Surfing is the interface.</h2>
          <span>THE REMOTE HAS FOUR MOVES. THE DIAL HAS NO END.</span>
        </div>
        <div className={styles.theatreGrid}>
          {theatreCards.map((card) => (
            <article className={styles.theatreCard} key={card.number}>
              <div className={styles.cardNumber}>{card.number}</div>
              <p>{card.label}</p>
              <h3>{card.title}</h3>
              <span>{card.body}</span>
              <footer>{card.signal}</footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gallery} id="themes">
        <div className={styles.galleryHead}>
          <div>
            <p>ACT II / COLLECTIBLE ENVIRONMENTS</p>
            <h2>Change the room.<br />Keep the ritual.</h2>
          </div>
          <p>
            Press T and the television changes physical character. Each cabinet has
            individually fitted screen geometry and favorite placement. These are
            real CableBox production themes—not website mockups.
          </p>
        </div>
        <div className={styles.themeGrid}>
          {themes.map((theme, index) => (
            <figure className={`${styles.themeCard} ${index === 0 || index === 5 ? styles.themeWide : ""}`} key={theme.name}>
              <Image
                src={theme.src}
                alt={`CableBox ${theme.name} collectible television environment`}
                fill
                unoptimized
                sizes={index === 0 || index === 5 ? "(max-width: 760px) 100vw, 66vw" : "(max-width: 760px) 100vw, 33vw"}
              />
              <figcaption>
                <span>CABINET {theme.number}</span>
                <strong>{theme.name}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.crtSection} id="crt">
        <div className={styles.darkSectionHead}>
          <p>ACT III / THE TUBE</p>
          <h2>The picture has a body.</h2>
          <span>NOT A FILTER. A FITTED TELEVISION SCREEN.</span>
        </div>
        <div className={styles.crtCompare}>
          <figure>
            <div className={styles.crtImage}>
              <Image
                src="/cablebox-premiere/crt-source.webp"
                alt="Raw source frame before CableBox CRT rendering"
                fill
                unoptimized
                sizes="50vw"
              />
            </div>
            <figcaption><span>BEFORE</span><strong>Flat source</strong></figcaption>
          </figure>
          <figure>
            <div className={styles.crtImage}>
              <Image
                src="/cablebox-premiere/crt-tube.webp"
                alt="The same frame after CableBox curved-glass CRT rendering"
                fill
                unoptimized
                sizes="50vw"
              />
            </div>
            <figcaption><span>AFTER</span><strong>CableBox tube</strong></figcaption>
          </figure>
        </div>
        <div className={styles.crtWords} aria-label="CableBox CRT effects">
          <span>CURVED GLASS</span>
          <span>SCANLINES</span>
          <span>PHOSPHOR</span>
          <span>BLOOM</span>
          <span>TRACKING</span>
          <span>OVERSCAN</span>
          <span>ANALOG NOISE</span>
          <span>RETRO PRESETS</span>
        </div>
      </section>

      <section className={styles.engineeringSection}>
        <div className={styles.sectionStamp}>
          <span>THE CRAFT</span>
          <span>MODERN RELIABILITY / OLD-SIGNAL SOUL</span>
        </div>
        <div className={styles.engineeringGrid}>
          {engineering.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.museumSection} id="museum">
        <Image
          src="/cablebox-premiere/museum-exhibit.webp"
          alt="CableBox Museum exhibition with two televisions, archival walls, and illuminated placards"
          fill
          unoptimized
          loading="eager"
          sizes="100vw"
          className={styles.museumImage}
        />
        <div className={styles.museumShade} />
        <div className={styles.museumCopy}>
          <p>ACT IV / PRESS X</p>
          <h2>The television<br />becomes the exhibit.</h2>
          <span>
            Museum mode turns CableBox into a narrated presentation while a silent
            live television keeps moving beside it. The object explains the culture
            it is trying to save.
          </span>
          <strong>X / CABLEBOX MUSEUM</strong>
        </div>
      </section>

      <section className={styles.controlsSection} id="controls">
        <div className={styles.controlsCopy}>
          <p>THE ENTIRE REMOTE</p>
          <h2>Ten moves.<br />No chrome.</h2>
          <span>
            Every control appears inside CableBox, in the same material language as
            the television. Learn it once. Stop thinking about the software.
          </span>
          <div className={styles.controlGrid}>
            {controls.map(([key, action]) => (
              <div key={key}>
                <kbd>{key}</kbd>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
        <figure className={styles.controlsArt}>
          <Image
            src="/cablebox-premiere/controls-card.webp"
            alt="The real in-world CableBox controls card"
            fill
            unoptimized
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </figure>
      </section>

      <section className={styles.releaseSection} id="download">
        <div className={styles.releaseSignal}>
          <span className={styles.onAirDot} />
          PUBLIC RELEASE / LIVE NOW
        </div>
        <div className={styles.releaseGrid}>
          <div>
            <p>FREE WINDOWS RELEASE / OPEN SOURCE</p>
            <h2>Turn it on.<br />Surf.</h2>
            <span className={styles.releaseLede}>
              The native, self-contained Windows edition is public now. Download one
              ZIP, extract it, and run CableBox.exe. No account. No separate runtime.
            </span>
          </div>
          <div className={styles.releaseChecklist}>
            <div className={styles.complete}>
              <span>01</span>
              <strong>Self-contained Windows x64 build</strong>
              <em>PUBLIC</em>
            </div>
            <div className={styles.complete}>
              <span>02</span>
              <strong>Exact ZIP + SHA-256 checksum</strong>
              <em>VERIFIED</em>
            </div>
            <div className={styles.complete}>
              <span>03</span>
              <strong>Public GPL-3.0 source</strong>
              <em>OPEN</em>
            </div>
          </div>
        </div>
        <WindowsDownloadTrust
          productName="CableBox"
          releaseState="PUBLIC RELEASE / FREE / OPEN SOURCE"
          sourceHref="https://github.com/AtomEons/CableBox"
          downloadHref="https://github.com/AtomEons/CableBox/releases/download/CBX-FINAL-V1/CBX-FINAL-V1.zip"
          filename="CBX-FINAL-V1.zip"
          version="CBX-FINAL-V1"
          sha256="BD072061367C05DC0CB62535890B5A7158DD2D23A64EE5027E07B4B6BCB00044"
          buildDate="2026-07-25T02:20:45Z"
          attestationHref="https://github.com/AtomEons/CableBox/releases/tag/CBX-FINAL-V1"
        />
        <div className={styles.releaseFooter}>
          <div>
            <span>242.7 MB</span>
            <small>EXACT WINDOWS ZIP</small>
          </div>
          <div>
            <span>FREE</span>
            <small>NO ACCOUNT / NO PAYWALL</small>
          </div>
          <div>
            <span>GPL-3.0</span>
            <small>PUBLIC SOURCE</small>
          </div>
          <a
            className={styles.downloadButton}
            href="https://github.com/AtomEons/CableBox/releases/download/CBX-FINAL-V1/CBX-FINAL-V1.zip"
          >
            DOWNLOAD CABLEBOX NOW
          </a>
        </div>
      </section>

      <section className={styles.endCredits}>
        <p>AN ATOM EONS TELEVISION OBJECT</p>
        <h2>CABLEBOX</h2>
        <span>FUN · CABLE · ART · THE ACCIDENTS PUT BACK IN</span>
        <div>
          <Link href="/products">All products</Link>
          <Link href="/press">Press room</Link>
          <a href="mailto:a.mccree@gmail.com?subject=%5Bhello%40atomeons.com%5D%20%5BCableBox%5D%20release%20signal&body=AtomEons%20route%3A%20hello%40atomeons.com%0ADirect%20destination%3A%20a.mccree%40gmail.com%0AProduct%3A%20CableBox%0A%0AMessage%3A%0A">Release signal</a>
        </div>
      </section>
    </main>
  );
}
