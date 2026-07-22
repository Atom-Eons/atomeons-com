import type { Metadata } from "next";

import styles from "./ae-brawl.module.css";

const APP = "https://atomeons.github.io/ae-brawl/";
const JUDGE = `${APP}?judge=1`;
const PROOF = `${APP}?proof=1`;
const FEEDBACK = `${APP}feedback/`;
const SOURCE = "https://github.com/AtomEons/ae-brawl";
const CAMPAIGN = `${APP}campaign`;
const SESSION_ID = "019f71dd-0add-7fc2-bd06-67c95a5df77b";

export const metadata: Metadata = {
  title: "AE BRAWL — Tonight Has A Door | Atom Eons",
  description:
    "A cinematic, accountless PWA for finding legitimate supervised combat-sport sessions tonight, powered by Google Places and the seven-tool LeadMCP referral protocol.",
  keywords: [
    "Atom Eons",
    "AE BRAWL",
    "OpenAI Build Week",
    "Codex",
    "GPT-5.6",
    "MCP",
    "LeadMCP",
    "PWA",
    "Google Places",
    "agent commerce",
  ],
  alternates: { canonical: "https://atomeons.com/brawl" },
  openGraph: {
    title: "AE BRAWL — Tonight Has A Door",
    description: "No map. No membership. One supervised night.",
    url: "https://atomeons.com/brawl",
    siteName: "Atom Eons",
    type: "website",
    images: [
      {
        url: `${CAMPAIGN}/01-signal-leaves-home.png`,
        width: 1664,
        height: 936,
        alt: "An adult leaves home at night with a gym bag after receiving the AE BRAWL signal.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AE BRAWL — Tonight Has A Door",
    description: "No map. No membership. One supervised night.",
    creator: "@AtomMccree",
    images: [`${CAMPAIGN}/01-signal-leaves-home.png`],
  },
};

const campaignFrames = [
  ["01-signal-leaves-home.png", "Answer the Signal", "I saw the signal. I left the house.", "An anonymous adult in a burnt-orange rain shell steps out of a warm apartment into a rain-dark street, carrying a gym bag and checking a glowing phone."],
  ["02-no-map-signal-tuner.png", "Tune Tonight, Not a Map", "Signal, distance, intensity—without a profile.", "An unbranded phone on a rain-speckled table displays an abstract radio-style training signal tuner beside a plain gym bag and hand wraps, with no map or location pins."],
  ["03-rain-lit-gym-door.png", "The Rain-Lit Door", "The door was real. So was the nerve.", "An anonymous first-night visitor in a burnt-orange rain shell pauses outside a rain-lit glass gym door while a coach and supervised adult class are visible inside."],
  ["04-coach-clearance-checkpoint.png", "Coach Clearance", "The highest-risk transition stays human.", "A coach calmly checks an adult beginner's hand wraps at a clean gym counter while a nearby phone displays confirmation icons and a final approval check."],
  ["05-first-night-coach.png", "First Night", "Coach decides what comes next.", "An anonymous adult beginner speaks with a coach at the edge of a warm, supervised gym while a class prepares in the background."],
  ["06-leadmcp-seven-tool-flow.png", "The Signal Gauntlet", "Discover → Qualify → Verify → Consent → Route → Schedule → Measure", "Seven amber-and-cobalt LeadMCP tool modules route one signal into a glowing qualified-venue card."],
  ["07-fundamentals-before-the-night.png", "Fundamentals Before the Night", "Every night out should start with fundamentals.", "A professional coach demonstrates stance and guard to a diverse group of anonymous adults during a supervised fundamentals class."],
  ["08-camera-local-no-account.png", "Privacy at the Threshold", "Camera-local · No account · Image stays here", "An anonymous adult holds a phone outside a legitimate night venue while processing stays inside the device and a disconnected cloud shows that the image is not uploaded."],
  ["09-one-night-doorpass.png", "One Night, Earned", "Train tonight. Unlock one night.", "After supervised training, an anonymous adult receives a glowing DoorPass marked One Night while a coach tidies focus mitts."],
  ["10-single-use-hash-receipt.png", "Redeem Once, Prove Forever", "Redeemed 1/1 · Single use · Hash-chained receipt", "An anonymous adult presents a DoorPass to a reader marked Redeemed 1/1 as receipt blocks connect to a sealed hash-chained receipt."],
  ["11-walked-out-lighter.png", "Walked Out Lighter", "I walked out lighter.", "Outside a supervised boxing fitness gym, an anonymous adult participant and coach share a respectful fist bump in warm doorway light."],
  ["12-verified-referral.png", "Verified Referral", "Verified referral · Capacity filled", "A local gym owner views a tablet confirming a verified referral as an anonymous adult arrives for a supervised late-night fitness slot."],
  ["13-walk-home-beginning.png", "The Walk Home", "The walk home felt like a beginning.", "An anonymous adult walks home with a gym bag through cobalt city rain, posture calm and renewed."],
  ["14-city-gym-constellation.png", "The City Trains Together", "A living local network, without a map overlay.", "Independent supervised gyms glow like warm amber constellations across a rain-wet city at night."],
  ["15-tonight-had-a-door.png", "Tonight Had a Door", "Tonight had a door.", "At the edge of dawn, an anonymous adult stands quietly with a gym bag above a waking city and a distant amber doorway."],
] as const;

const leadMcp = [
  ["01", "Discover + Qualify", "Location, discipline, time, and intensity become an eligible same-night signal without a permanent fighter profile."],
  ["02", "Verify + Consent", "Venue legitimacy and coach-first safety remain human-visible. Scoped consent moves eligibility—not raw identity or an uploaded image."],
  ["03", "Route + Schedule", "The venue agent accepts an eligible opening. The competition build simulates provider-neutral referral payment without claiming live settlement."],
  ["04", "Measure + Close", "A single-use DoorPass rejects replay and closes with a hash-chained receipt that the user, venue, and judge can inspect."],
] as const;

const innovations = [
  "No-map discovery tunes a local signal by distance, discipline, and intensity instead of becoming another directory.",
  "An optional Google Places adapter activates with a restricted key while a deterministic keyless demo keeps judging reliable.",
  "Camera-local processing, no account, and scoped consent minimize the information that leaves the device.",
  "Coach-first clearance makes the highest-risk transition visible, human, and supervised.",
  "Simulated venue-agent payment, one-use redemption, replay rejection, and hash-chained receipts form working competition proof.",
] as const;

const judgeChecks = [
  ["Codex Session ID", SESSION_ID],
  ["Judge path", "Keyless deterministic demo; no account or API key required."],
  ["Build proof", "LeadMCP state, 13-test verification, replay rejection, and final redeemed state."],
  ["Privacy", "Camera-local scout; no uploaded image and no permanent fighter profile."],
  ["Safety", "Fictional demo venues, supervised training, coach-first clearance, no availability or medical promise."],
  ["Source", "Public repository, verification scripts, protocol implementation, and build receipts."],
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "AE BRAWL",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      url: APP,
      description:
        "A cinematic, accountless PWA for finding legitimate supervised combat-sport sessions tonight.",
      author: { "@type": "Organization", name: "Atom Eons", url: "https://atomeons.com" },
    },
    {
      "@type": "CreativeWork",
      name: "AE BRAWL — Tonight Has A Door",
      url: "https://atomeons.com/brawl",
      image: `${CAMPAIGN}/01-signal-leaves-home.png`,
      creator: { "@type": "Organization", name: "Atom Eons" },
    },
  ],
};

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function AeBrawlPage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section className={styles.hero} aria-labelledby="ae-brawl-title">
        <div className={styles.heroImage} aria-hidden>
          <img src={`${CAMPAIGN}/01-signal-leaves-home.png`} alt="" />
          <span className={styles.scan} />
          <span className={styles.glow} />
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>OPENAI BUILD WEEK 2026 · APPS FOR YOUR LIFE</p>
          <h1 id="ae-brawl-title">AE BRAWL<span>Tonight has a door.</span></h1>
          <p className={styles.deck}>
            AE BRAWL turns nearby supervised combat-sport trial sessions into a one-night cinematic
            experience—then uses LeadMCP to prove the private, single-use referral behind the ride.
          </p>
          <aside className={styles.sessionProof} aria-label="Codex build session">
            <span>CODEX SESSION ID / BUILD PROOF</span>
            <strong>{SESSION_ID}</strong>
            <External href={FEEDBACK}>Open public feedback record ↗</External>
          </aside>
          <div className={styles.heroActions}>
            <External href={APP}>Enter AE Brawl</External>
            <External href={PROOF}>See how LeadMCP works</External>
            <a href="/ae-brawl/docs/AE-BRAWL-TECHNICAL-MANUAL.pdf">Read technical manual</a>
            <External href={SOURCE}>View source</External>
          </div>
          <p className={styles.proofLine}>7 MCP TOOLS · 0 ACCOUNTS · 1 REDEMPTION</p>
        </div>
        <div className={styles.titlePlate} aria-hidden>
          <span>AE</span><strong>BRAWL</strong><small>NO MAP / NO MEMBERSHIP / ONE DOORPASS</small>
        </div>
      </section>

      <section className={styles.intent} aria-labelledby="intent-title">
        <p className={styles.kicker}>THE PRODUCT</p>
        <h2 id="intent-title">Maps show locations. AE BRAWL creates the courage to walk in.</h2>
        <div className={styles.intentGrid}>
          <article><span>01</span><h3>Tune tonight</h3><p>Choose a local signal by discipline, distance, and intensity—not a map or permanent profile.</p></article>
          <article><span>02</span><h3>Meet the coach</h3><p>Accept the coach-first boundary and enter a legitimate supervised session as a first-night beginner.</p></article>
          <article><span>03</span><h3>Close the proof</h3><p>Receive an expiring DoorPass, redeem once, reject replay, and inspect the final LeadMCP receipt.</p></article>
        </div>
      </section>

      <section id="campaign" className={styles.campaign} aria-labelledby="campaign-title">
        <div className={styles.sectionHead}>
          <div><p className={styles.kicker}>15 ORIGINAL CAMPAIGN FRAMES</p><h2 id="campaign-title">Signal. Threshold. Training. Proof. Return.</h2></div>
          <p>One supervised night told in order. Frames 06, 08, 10, and 12 place the technical proof inside the human story.</p>
        </div>
        <div className={styles.campaignGrid}>
          {campaignFrames.map(([file, title, line, alt], index) => (
            <figure key={file}>
              <img src={`${CAMPAIGN}/${file}`} alt={alt} loading={index === 0 ? "eager" : "lazy"} />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><small>{line}</small></div></figcaption>
            </figure>
          ))}
        </div>
        <External href={`${APP}campaign/`}>Open the full campaign sequence ↗</External>
      </section>

      <section id="lead-mcp" className={styles.slides} aria-labelledby="slides-title">
        <div className={styles.sectionHead}>
          <div><p className={styles.kicker}>SEVEN-TOOL REFERRAL PROTOCOL</p><h2 id="slides-title">LeadMCP keeps the machine underneath the experience.</h2></div>
          <p>Discover, qualify, verify, consent, route, schedule, and measure turn perishable local capacity into an inspectable agent-native transaction.</p>
        </div>
        <div className={styles.slideRail}>
          {leadMcp.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className={styles.manual} aria-labelledby="manual-title">
        <div><p className={styles.kicker}>WORKING INNOVATIONS</p><h2 id="manual-title">Claims written so a judge can test them.</h2></div>
        <ul>{innovations.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section id="packets" className={styles.packets} aria-labelledby="packet-title">
        <div className={styles.sectionHead}>
          <div><p className={styles.kicker}>PDF JUDGE PACKETS</p><h2 id="packet-title">Open cleanly in Chrome.</h2></div>
          <p>Final PDFs only. No Markdown handoff files in the judge path.</p>
        </div>
        <div className={styles.packetGrid}>
          <a href="/ae-brawl/docs/AE-BRAWL-TECHNICAL-MANUAL.pdf"><span>01 / 11 PAGES</span><strong>AE BRAWL Technical Manual</strong><small>Architecture, safety, privacy, protocol, and verification.</small></a>
          <a href="/ae-brawl/docs/LEADMCP-VISUAL-STORY.pdf"><span>02 / 7 PAGES</span><strong>LeadMCP Visual Story</strong><small>Seven tools, private referral, one-use proof.</small></a>
          <a href="/ae-brawl/docs/ABOUT-ATOM-EONS.pdf"><span>03 / 3 PAGES</span><strong>About Atom Eons</strong><small>Company, operator, creative thesis, and public context.</small></a>
        </div>
      </section>

      <section id="devpost" className={styles.checklist} aria-labelledby="checklist-title">
        <p className={styles.kicker}>JUDGE FAST PATH</p><h2 id="checklist-title">Everything inspectable in one pass.</h2>
        <div className={styles.checkRows}>{judgeChecks.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      </section>

      <section className={styles.videoScript} aria-labelledby="video-title">
        <p className={styles.kicker}>DEMO / UNDER THREE MINUTES</p><h2 id="video-title">Show the product, then expose the machine.</h2>
        <ol>
          <li><strong>0:00–0:20</strong> — The signal: people want movement, story, and local possibility—not another dead directory.</li>
          <li><strong>0:20–1:10</strong> — Judge mode: tune a signal, meet the safety boundary, issue a DoorPass, redeem once.</li>
          <li><strong>1:10–1:55</strong> — LeadMCP: seven tools, scoped consent, simulated payment, replay rejection, final receipt.</li>
          <li><strong>1:55–2:35</strong> — Codex/GPT-5.6: product, protocol, campaign, tests, documentation, and release proof.</li>
          <li><strong>2:35–2:55</strong> — Close: no map, no membership, one supervised night.</li>
        </ol>
      </section>

      <aside className={styles.disclaimer}>
        AE BRAWL is a provisional competition name and demonstration. Judge-mode venues are fictional;
        availability and referral payment are simulated. Real training requires venue confirmation, coach
        supervision, informed consent, and personal assessment of medical suitability. No affiliation with any
        gym, league, celebrity, entertainment property, or payment provider is implied.
      </aside>

      <section className={styles.finalCta}>
        <p className={styles.kicker}>THE PRODUCT IS READY TO JUDGE</p><h2>Open the door yourself.</h2>
        <p>If the live experience is unavailable, the build proof, public source, and PDF manual remain independent verification paths.</p>
        <div><External href={JUDGE}>Enter judge mode</External><External href={PROOF}>View build proof</External><External href={SOURCE}>View source</External></div>
      </section>
    </main>
  );
}
