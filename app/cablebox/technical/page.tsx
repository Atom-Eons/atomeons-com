import type { Metadata } from "next";
import Link from "next/link";
import styles from "./technical.module.css";

export const metadata: Metadata = {
  title: "CableBox 2 Technical Details",
  description:
    "The documented architecture, algorithms, measurements, test harnesses, and build case study behind CableBox 2.",
  alternates: { canonical: "https://atomeons.com/cablebox/technical" },
  openGraph: {
    title: "CableBox 2 Technical Details",
    description: "Five parts. Ten hidden systems. One measured television illusion.",
    url: "https://atomeons.com/cablebox/technical",
    siteName: "AtomEons",
    type: "article",
    images: [
      {
        url: "/cablebox-premiere/crt-tube.webp",
        width: 1600,
        height: 1000,
        alt: "CableBox CRT tube rendering inside a vintage television cabinet",
      },
    ],
  },
};

const downloadHref =
  "https://github.com/Atom-Eons/CableBox2/releases/download/v1.0.0/CableBox2-Windows-x64-1.0.0.zip";
const manualHref =
  "https://github.com/Atom-Eons/CableBox2/blob/main/docs/CBX2-INVENTIONS.md";

const arcs = [
  ["01", "Days 1–6", "Cabinet + tube geometry", "The theme PNG alpha channel became the only screen shape."],
  ["02", "Days 7–12", "Mask pipeline", "Screen apertures moved offline into permanent baked assets."],
  ["03", "Days 13–17", "CRT baseline", "The approved picture constants were measured, recorded, and locked."],
  ["04", "Days 18–23", "Playback recovery", "Fresh sessions, cache discipline, and watchdog recovery replaced dead screens."],
  ["05", "Days 24–30", "Ship discipline", "Engine shootout, stress proof, frozen baselines, and browser parity closed the build."],
] as const;

const breakthroughs = [
  {
    number: "01",
    title: "The mask became the truth.",
    body: "Instead of computing a screen shape while the app is running, CableBox bakes each aperture into the cabinet artwork. The alpha channel is permanent, reviewable, and deterministic.",
  },
  {
    number: "02",
    title: "The picture stayed rectangular.",
    body: "The video intentionally overshoots the aperture while the cabinet sits above it. That single layering doctrine eliminated black rims, bezel bleed, and competing geometry systems.",
  },
  {
    number: "03",
    title: "Opinion lost to measurement.",
    body: "Playback engines, boot paths, channel changes, mask quality, and stress behavior each received a harness. The shipping choices are attached to numbers, not folklore.",
  },
] as const;

const systems = [
  {
    number: "01",
    title: "Theme aperture geometry",
    summary: "A 1536 × 1024 authored canvas, one source rectangle, and a 3% safety overshoot.",
    body: "Every cabinet carries its own aperture coordinates. CableBox finds the center, expands width and height by 3%, then scales the result with the cabinet. The video extends roughly 1.5% beyond every edge so resize, DPI, and sub-pixel movement cannot expose a black ring.",
    evidence: "Shared by native LayoutScreenHost and browser placeAperture().",
  },
  {
    number: "02",
    title: "Baked mask pipeline",
    summary: "Segmentation happens before release; runtime only draws approved transparent artwork.",
    body: "A box-prompted segmentation pass produces the aperture, a single feather pass softens the edge, and a fill-ratio audit rejects accidental rectangles. The shipped themes therefore carry their screen shapes inside the PNG rather than recomputing them on each machine.",
    evidence: "33 authored theme masks audited; rectangle-like results rejected above the quality gate.",
  },
  {
    number: "03",
    title: "Five-layer CRT renderer",
    summary: "Gamma, scanlines, phosphor, halation, and fitted glass form one picture system.",
    body: "The locked baseline lifts midtones, protects highlights with a soft shoulder, warms the white point, alternates display-space scanlines, overlays restrained RGB triads, and blooms only the bright tail. The browser edition collapses the same visual logic into a WebGL2 shader.",
    evidence: "Bloom 0.55 · Scan 0.65 · Saturation 1.3125 · Gamma 0.80.",
  },
  {
    number: "04",
    title: "Live-session assembly",
    summary: "Session, guide, and stream information are assembled into a playable signal.",
    body: "The app creates a temporary live session, loads the current guide, constructs the selected stream, and renews the session when it becomes stale. The browser and native editions follow the same three-stage shape without making the visitor manage credentials or configuration.",
    evidence: "Short-lived stream state is renewed instead of leaving a dead channel behind.",
  },
  {
    number: "05",
    title: "Curated daily dial",
    summary: "A constrained pool, fixed movie block, favorites, anchors, and a seeded lottery.",
    body: "The dial begins with a hand-curated eligible pool, removes duplicates and blocked categories, fixes three movie positions, promotes up to three favorites, seats cultural anchors, then fills the remaining slots with a daily seeded shuffle. The same day stays recognizable; tomorrow changes.",
    evidence: "A 60-day coverage simulation checks that channels neither dominate nor disappear.",
  },
  {
    number: "06",
    title: "Warm-boot cache",
    summary: "A ten-minute memory of the last healthy channel saves roughly two seconds.",
    body: "After a verified playing event, CableBox records the channel and current stream state. A fresh entry can start immediately while the guide refreshes in parallel. If a frame does not arrive inside the watchdog window, the cache is discarded and normal boot resumes.",
    evidence: "Measured cache-hit first frame: 2.1–2.8 s versus 4.1–4.9 s on the warm cold-path.",
  },
  {
    number: "07",
    title: "Recovery state machine",
    summary: "Terminal errors, silent freezes, and never-locked tunes produce different recovery actions.",
    body: "A one-second watchdog watches playback state, frame-time movement, and tune lock. CableBox can request a fresh session, replay the current channel, advance the dial, or bridge a prolonged failure with an in-world local break instead of exposing a blank software screen.",
    evidence: "Last stress run recorded zero uptime stalls and 1.9 s recovery latency.",
  },
  {
    number: "08",
    title: "Museum mode",
    summary: "The cabinet yields to a two-screen exhibit while mute remains a hard invariant.",
    body: "Museum mode suppresses the normal cabinet stack, reveals two separately authored exhibit apertures, and reasserts mute whenever playback changes state. It is not a modal dialog; it is another physical scene inside the object.",
    evidence: "The two exhibit tubes use the same baked-aperture doctrine as the cabinet collection.",
  },
  {
    number: "09",
    title: "Window composition",
    summary: "Two native windows move together, share lock state, and continually repair their z-order.",
    body: "The video owner and transparent cabinet overlay are independent top-level windows. Fullscreen or operator lock moves every participating window into the same topmost band, while activation reasserts the cabinet above its own video. Native DWM corners replace aliased hand-cut regions.",
    evidence: "One lock state controls the owner, overlay, and transient signal layer together.",
  },
  {
    number: "10",
    title: "Instrumentation + ship guardrails",
    summary: "Six investigation modes, frozen assets, idempotent packaging, and a receipt chain.",
    body: "Smoke, stress, engine, aperture, museum, and dial-coverage harnesses expose specific failure surfaces. Frozen release trees are hash-checked before packaging, packagers are re-runnable, and every meaningful ship event is recorded in an append-only operational ledger.",
    evidence: "The final self-verification lane closed 8 of 8 release gates.",
  },
] as const;

const sourceFiles = [
  ["MainForm.cs", "Dial state, boot, watchdog, input"],
  ["TvShellOverlayForm.cs", "Cabinet overlay + CRT paint"],
  ["DialChannelBuilder.cs", "Anchors, lottery, favorites"],
  ["PlutoGuideClient.cs", "Live session + guide client"],
  ["LastChannelCache.cs", "Ten-minute warm path"],
  ["webapp/src/main.js", "Browser orchestration + aperture"],
  ["webapp/src/dial.js", "Browser dial parity"],
  ["webapp/src/crt.js", "WebGL2 CRT shader"],
] as const;

const harnesses = [
  ["--smoke", "Guide and first-frame liveness"],
  ["--stress", "Uptime, rapid switching, recovery"],
  ["--engine-shootout", "Playback engine measurement"],
  ["--aperture-debug", "Every cabinet rendered offline"],
  ["--museum-preview", "Exhibit proof render"],
  ["--dial-coverage", "Sixty-day rotation simulation"],
] as const;

export default function CableboxTechnicalPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroNav}>
          <Link href="/cablebox">← CABLEBOX 2</Link>
          <span>TECHNICAL RECORD / CABLEBOX 2</span>
          <a href={manualHref} target="_blank" rel="noreferrer">SOURCE NOTES ↗</a>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p>FIVE PARTS / THIRTY DAYS / ONE LOCKED BASELINE</p>
            <h1>The machinery<br />behind the magic.</h1>
          </div>
          <div className={styles.heroAside}>
            <p>
              CableBox looks like an old television because several modern systems
              agree to disappear. This is the documented architecture, the failed
              paths, the measurements, and the rules that keep the illusion intact.
            </p>
            <div className={styles.heroActions}>
              <Link href="/cablebox/web">TRY THE BROWSER EDITION</Link>
              <a href={downloadHref}>DOWNLOAD WINDOWS</a>
            </div>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div><strong>30</strong><span>DAYS OF ITERATION</span></div>
          <div><strong>2</strong><span>NATIVE + WEB RUNTIMES</span></div>
          <div><strong>10</strong><span>HIDDEN SYSTEMS</span></div>
          <div><strong>N=128</strong><span>SAMPLES PER ENGINE</span></div>
          <div><strong>8/8</strong><span>SHIP GATES</span></div>
        </div>
      </header>

      <nav className={styles.chapterNav} aria-label="Technical manual chapters">
        <a href="#case-study">01 / CASE STUDY</a>
        <a href="#architecture">02 / ARCHITECTURE</a>
        <a href="#systems">03 / SYSTEMS</a>
        <a href="#measurements">04 / MEASUREMENTS</a>
        <a href="#operations">05 / OPERATIONS</a>
      </nav>

      <section className={styles.caseStudy} id="case-study">
        <div className={styles.sectionIntro}>
          <p>PART I / CASE STUDY</p>
          <h2>Five arcs.<br />Five invariants.</h2>
          <span>
            Each phase ended by locking one rule the next phase was not allowed to
            casually reopen. That discipline is what turned a month of experiments
            into a coherent object.
          </span>
        </div>
        <div className={styles.arcList}>
          {arcs.map(([number, days, title, invariant]) => (
            <article key={number}>
              <span>{number}</span>
              <small>{days}</small>
              <h3>{title}</h3>
              <p>{invariant}</p>
            </article>
          ))}
        </div>
        <div className={styles.breakthroughGrid}>
          {breakthroughs.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.architecture} id="architecture">
        <div className={styles.sectionIntroDark}>
          <p>PART II / ARCHITECTURE</p>
          <h2>The image stays raw.<br />The cabinet owns the shape.</h2>
          <span>
            CableBox does not clip the video into a guessed television curve. It
            places an oversized live rectangle behind transparent cabinet artwork.
            One source of geometry. One believable object.
          </span>
        </div>
        <div className={styles.layerDiagram} aria-label="CableBox two-layer composition diagram">
          <div className={styles.layerTop}>
            <span>LAYER 02 / CABINET</span>
            <strong>Transparent PNG + authored alpha aperture</strong>
            <small>Always above · owns the visible screen shape</small>
          </div>
          <div className={styles.layerGap}><span>TRANSPARENT PIXELS REVEAL THE SIGNAL</span></div>
          <div className={styles.layerBottom}>
            <span>LAYER 01 / SIGNAL</span>
            <strong>Raw video rectangle, intentionally oversized</strong>
            <small>Never clipped · never trusted to define the bezel</small>
          </div>
        </div>
        <div className={styles.parityGrid}>
          <article>
            <p>NATIVE WINDOWS</p>
            <h3>Two cooperating windows</h3>
            <span>Video owner below. Per-pixel transparent cabinet overlay above. Activation repairs their order.</span>
          </article>
          <div className={styles.parityMark}>≍</div>
          <article>
            <p>BROWSER EDITION</p>
            <h3>One stacked cabinet</h3>
            <span>Video and CRT canvas below. Transparent cabinet image above. The same authored apertures survive the port.</span>
          </article>
        </div>
      </section>

      <section className={styles.systems} id="systems">
        <div className={styles.sectionIntro}>
          <p>PART III / HIDDEN OPERATIONS</p>
          <h2>Ten systems.<br />Open only what interests you.</h2>
          <span>
            The details are intentionally collapsed. The page stays calm; the depth
            is still here when an engineer, curator, or curious visitor asks for it.
          </span>
        </div>
        <div className={styles.systemList}>
          {systems.map((system) => (
            <details key={system.number}>
              <summary>
                <span>{system.number}</span>
                <div><strong>{system.title}</strong><small>{system.summary}</small></div>
                <b aria-hidden="true">+</b>
              </summary>
              <div className={styles.systemBody}>
                <p>{system.body}</p>
                <aside><span>MEASURED / LOCKED</span>{system.evidence}</aside>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.measurements} id="measurements">
        <div className={styles.sectionIntroDark}>
          <p>PART IV / MEASUREMENTS</p>
          <h2>Proof before preference.</h2>
          <span>The final engine, cache, and recovery decisions are tied to bounded runs on the target machine.</span>
        </div>
        <div className={styles.metricLead}>
          <div><span>MEDIAN FIRST FRAME</span><strong>241 ms</strong><small>SHIPPING ENGINE / N=128</small></div>
          <div><span>ALTERNATIVE ENGINE</span><strong>2,620 ms</strong><small>SAME CHANNEL SET / N=128</small></div>
          <div className={styles.metricRatio}><span>MEASURED ADVANTAGE</span><strong>10.9×</strong><small>MEDIAN / TARGET HARDWARE</small></div>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <caption>Engine shootout — eight channels, two rounds, order alternated</caption>
            <thead><tr><th>Engine</th><th>Mean</th><th>P50</th><th>P99</th><th>Stalls</th><th>Errors</th></tr></thead>
            <tbody>
              <tr><th>LibVLC</th><td>375 ms</td><td>241 ms</td><td>1,437 ms</td><td>0</td><td>0</td></tr>
              <tr><th>libmpv</th><td>2,695 ms</td><td>2,620 ms</td><td>3,927 ms</td><td>0</td><td>0</td></tr>
            </tbody>
          </table>
        </div>
        <div className={styles.measureGrid}>
          <article><span>WARM BOOT</span><strong>4.1–4.9 s</strong><p>Normal warm path to first live frame on the target N150 system.</p></article>
          <article><span>CACHE HIT</span><strong>2.1–2.8 s</strong><p>Last healthy channel begins while the current guide refreshes in parallel.</p></article>
          <article><span>RECOVERY</span><strong>1.9 s</strong><p>Measured recovery latency in the last bounded stress-harness run.</p></article>
          <article><span>UPTIME STALLS</span><strong>0</strong><p>Five channels across the recorded stress window.</p></article>
        </div>
      </section>

      <section className={styles.operations} id="operations">
        <div className={styles.sectionIntro}>
          <p>PART V / OPERATIONS</p>
          <h2>The release can<br />explain itself.</h2>
          <span>
            Every important visual or playback surface has a bounded way to inspect
            it. The public source manual carries the complete file map, variables,
            flags, key parity, and receipt sequence.
          </span>
        </div>
        <div className={styles.operationsGrid}>
          <div>
            <h3>Investigation harnesses</h3>
            <ul>{harnesses.map(([flag, purpose]) => <li key={flag}><code>{flag}</code><span>{purpose}</span></li>)}</ul>
          </div>
          <div>
            <h3>Key source surfaces</h3>
            <ul>{sourceFiles.map(([file, purpose]) => <li key={file}><code>{file}</code><span>{purpose}</span></li>)}</ul>
          </div>
        </div>
        <div className={styles.guardrails}>
          <article><span>01</span><h3>Frozen baseline</h3><p>Approved native and browser trees are hash-anchored before packaging.</p></article>
          <article><span>02</span><h3>Idempotent packagers</h3><p>The release scripts can rebuild the same package without a manual maze.</p></article>
          <article><span>03</span><h3>Receipt chain</h3><p>Meaningful ship events join an append-only operational ledger.</p></article>
        </div>
      </section>

      <footer className={styles.finalCta}>
        <p>THE MANUAL IS PUBLIC. THE TELEVISION IS ON.</p>
        <h2>Inspect it.<br />Then surf it.</h2>
        <div>
          <a href={manualHref} target="_blank" rel="noreferrer">READ ALL 802 LINES ↗</a>
          <Link href="/cablebox/web">TRY CABLEBOX</Link>
          <Link href="/cablebox">BACK TO THE PREMIERE</Link>
        </div>
      </footer>
    </main>
  );
}
