import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "./PrintButton";

/**
 * /manual · the comprehensive user manual.
 *
 * Wave 39 · 2026-06-06 · operator: "a pdf user manual about the
 * website features, tools, settings, and more · the whole feature
 * set, not a replica."
 *
 * Print-friendly · the print stylesheet from Wave 17 makes this
 * PDF-perfect when the visitor uses browser Print → Save as PDF.
 *
 * Mom's Law: this manual describes what's actually shipped. If a
 * feature is documented here, it works. If it doesn't ship, it
 * doesn't make this page.
 */

export const metadata: Metadata = {
  title: "User Manual · the whole feature set",
  description:
    "Comprehensive AtomEons Systems Laboratory user manual. Every feature, every tool, every keyboard shortcut, every setting. Print-friendly · save as PDF. Includes the 6 megas, app toolbar, notification bar, themes, GPU tiers, search palette, Mindrest, Welcome trainer, Learning Paths, Innovations, and more.",
  alternates: { canonical: "https://atomeons.com/manual" },
  openGraph: {
    title: "AtomEons · User Manual",
    description:
      "The whole feature set in one printable document. PDF-ready via browser print.",
    url: "https://atomeons.com/manual",
    type: "article",
  },
};

const SECTIONS = [
  {
    n: "1",
    title: "What this site is",
    body: [
      "AtomEons Systems Laboratory · atomeons.com · independent AI lab · one operator · Marco Island, FL. ~340 public routes shipped between 2024 and 2026. CC-BY 4.0 unless explicitly noted.",
      "The site is built as a Library of Alexandria for AI · curriculum, research, cheat sheets, products, tools, broadcasts, and an open-license corpus.",
      "Continuous-deploy · every commit ships to production · the public /audit-log proves the cadence.",
    ],
  },
  {
    n: "2",
    title: "Top navigation · 6 megas",
    body: [
      "ABOUT · the lab itself · workshop · trust + transparency · products · founder · firsts.",
      "LEARN · the curriculum · five levels · personas · deep dives · hands-on + career.",
      "CYSEC · the 40-page cyber catalog · frameworks · defense · AI security · breaches · careers.",
      "RESEARCH · ÆoNs papers (31) · decoded primary sources (35) · sci-fi monograph · intel.",
      "BOOKS · I AM AI memoir · reading lists · the shelf · Lessons from Sci-Fi.",
      "TOOLS · live tools · cheat sheets · calculators · Mindrest · the manual.",
      "Hover any to open its mega panel. Press Esc to close. ⌘K (Cmd+K) opens the search palette from anywhere.",
    ],
  },
  {
    n: "3",
    title: "Notification bar · operator-pushable",
    body: [
      "Thin strip above the nav · operator pushes content via public/notification.json. Maximum 2 sentences.",
      "Kinds: shipping · live · alert · broadcast. Each has its own accent color. Click follows to the linked route.",
      "Per-notification dismissal · stored in localStorage as atomeons.notif.dismissed.<id>. New ID = new appearance.",
    ],
  },
  {
    n: "4",
    title: "App Toolbar · functional buttons",
    body: [
      "Sticky below the MegaHeader · six controls.",
      "TOUR · opens /welcome · the 90-second six-scene introduction.",
      "THEME · cycles four visual themes: NOIR (default · dark cinematic · cyan accent) · WHITE (light mode) · WAREZ (green-on-black hacker terminal aesthetic) · THIN (low-bandwidth · text-only).",
      "FX · toggle supergraphics on/off (atom sphere, sigils, gradients). Use off when you want pure focus.",
      "♪ · toggle ambient music. Requires public/ambient.mp3 (operator can drop any audio file).",
      "MINDREST · jumps to the 8-mode audiovisual entrainment session.",
      "MANUAL · this page.",
      "All toolbar state persists in localStorage. Mobile collapses to a dropdown.",
    ],
  },
  {
    n: "5",
    title: "Themes in detail",
    body: [
      "NOIR · the default · #08090B base · #22F0D5 cyan signal · #FF4D4D live pulse · Newsreader serif headlines · Inter UI · JetBrains Mono receipts.",
      "WHITE · light-mode inversion · same cyan accent · paper background · suitable for reading on a bright room or printing.",
      "WAREZ · green-on-black terminal · #00FF7F primary color · monospace everywhere · text-shadow glow · the hacker-cinematic mode.",
      "THIN · pure text · no decorations · no SVGs · no animations · no gradients · Georgia serif · plain links · 1990s-web aesthetic · for the slowest connection or pure reading.",
    ],
  },
  {
    n: "6",
    title: "GPU tiers · automatic visual scaling",
    body: [
      "The site detects your hardware via 4 signals: navigator.hardwareConcurrency · navigator.deviceMemory · rAF frame-rate self-measurement · WebGL renderer string.",
      "Three tiers · LITE (no heavy visuals) · STANDARD (static SVG · no 3D) · FULL (CSS 3D sphere · all motion).",
      "Override via the TierToggle pill in the bottom-right corner · cycles AUTO → LITE → MID → FULL.",
      "prefers-reduced-motion is honored as a hard floor → forces lite.",
      "All state persists in localStorage as atomeons.tier and atomeons.tier.resolved.",
    ],
  },
  {
    n: "7",
    title: "Search palette · ⌘K and ⌘↵",
    body: [
      "Press ⌘K (Cmd+K) or Ctrl+K to open the search palette from any page.",
      "Fuzzy search across all 340+ routes by default · the score blends title + path + tag matches.",
      "Type a natural question and press ⌘↵ (Cmd+Enter) to switch to ASK mode · gemini-2.5-flash drafts a 2-5 sentence answer grounded only on lab content · sources cited inline.",
      "Same engine powers /api/ask and /api/palette · all CORS-open for agent consumption.",
      "Operator-installed full-width search bar lives under the MegaHeader · same palette · same scorer.",
    ],
  },
  {
    n: "8",
    title: "Copy-for-LLM button",
    body: [
      "Bottom-left floating button · monospaced [ copy for LLM · ⌥C ] label.",
      "Clicking copies the current page as XML-wrapped markdown to clipboard: <lab_page><source>...</source><fetched_at>...</fetched_at><license>CC-BY 4.0</license>...</lab_page>.",
      "Paste directly into Claude / ChatGPT / Gemini for grounded follow-up questions.",
      "Works on every page via the global /api/md markdown twin.",
    ],
  },
  {
    n: "9",
    title: "Mindrest · audiovisual entrainment",
    body: [
      "Live in-browser entrainment session at /mindrest/experience. Eight modes:",
      "ALPHA 10 Hz · soft tide · relaxed alert · 6-second swell · teal.",
      "THETA 6 Hz · deep current · meditative + imagery · 8-second swell · purple.",
      "BETA 15 Hz · clear surface · focused alert · 4-second swell · amber.",
      "DELTA 3 Hz · trench dark · deep rest · 12-second swell · midnight blue.",
      "MEDITATION · pure ocean swell + breath · no binaural · pacific blue · 7s.",
      "SCHUMANN · 7.83 Hz · Earth's electromagnetic resonance · sea-green.",
      "WIM HOF · brisk 4s breath rhythm · no binaural · sunrise orange.",
      "SLEEP · 3 Hz delta + 14s swell + 20-minute visual fade-to-black.",
      "Built with Web Audio API · two sine oscillators panned hard L/R for binaural · white noise + low-pass filter + LFO modulation for the ocean swell. Pure SVG mandala visual.",
      "Safety: photosensitive-epilepsy gate · headphones recommended · 20-minute auto-stop · text-only fallback.",
    ],
  },
  {
    n: "10",
    title: "Welcome Trailer · 90-second introduction",
    body: [
      "Scroll-driven 6-scene trainer at /welcome. CSS-only choreography · IntersectionObserver fades.",
      "Scenes: Where you are · What it makes · The promise · How to use the lab · What you'll find · Where to go.",
      "Honors web-psychology principles: Hick's Law · Miller's Law · Fitts's Law · F-pattern · negative space · progressive disclosure.",
      "Sets atomeons.trained=true on mount · FirstTimeChip stops appearing.",
      "If /public/welcome-clip.mp4 exists (operator-generated via Veo), it plays in the hero · otherwise the CSS choreography is the experience.",
    ],
  },
  {
    n: "11",
    title: "Learning paths · email-only enrollment",
    body: [
      "Two graduation tracks: /paths/ai-pilot and /paths/cyber-pro. Both free. Both email-only. No password.",
      "AI Pilot · 4 legs · 5 levels + 12 atlas + 7 cheat sheets + exam. Email tracks progress.",
      "Cyber Pro · 4 legs · 40-page catalog + 22 models + Mythos + AI security. Email tracks progress.",
      "On completion: lab adds you to the alumni list. The list identifies who actually did the work.",
      "Backend: POST /api/enroll · Loops.so if LOOPS_API_KEY env wired · console fallback if not.",
      "Privacy: email only · no tracking pixels · unsubscribe anytime.",
    ],
  },
  {
    n: "12",
    title: "Cheat sheets · 7 AI coding tools",
    body: [
      "All at /best-practices · last verified 2026-06-06 · sourced inline:",
      "Claude · Desktop + Claude Code · MCP · subagents · hooks · skills · CLAUDE.md.",
      "Codex · OpenAI CLI · approval modes · AGENTS.md · sandbox modes · gpt-5 tiers.",
      "Antigravity · Google agent IDE · plans · tasks · artifacts · Gemini 3.",
      "Cursor · AI IDE · .cursorrules · @-mentions · Composer · Background Agents.",
      "Copilot · GitHub · @workspace · Chat · Edits · Workspace · Spaces · gh copilot CLI.",
      "Aider · open-source · /undo · architect mode · voice · /web · git-native.",
      "MCP · cross-tool protocol · clients · servers · tools · resources · stdio/SSE/HTTP.",
    ],
  },
  {
    n: "13",
    title: "Domain hubs · 6 verticals",
    body: [
      "/learn/health-ai · medicine · AlphaFold · Med-PaLM · biotech · drug discovery.",
      "/learn/money-ai · finance · trading · fintech · fraud · deepfake-driven scams.",
      "/learn/video-ai · Sora · Veo · Runway · Kling · Pika · Luma · the deepfake threat.",
      "/learn/music-ai · Suno · Udio · ElevenLabs · MusicGen · the RIAA fight.",
      "/learn/policy-ai · EU AI Act · US EO 14110 · NIST RMF · safety institutes · summits.",
      "/learn/science-ai · AlphaFold lineage · GNoME · GraphCast · FunSearch · ESM-3.",
      "Robotics intentionally skipped per operator decree.",
    ],
  },
  {
    n: "14",
    title: "Founder's View · nightly broadcast",
    body: [
      "/founders-view · publishes nightly at 8pm ET. Sealed. Autonomous.",
      "Multi-voice: Thompson / Orwell / Beale / Fawkes editorial registers.",
      "Countdown clock on the page = honest delivery signal.",
      "RSS subscribe scaffold ready · activate via /founders-view/rss.xml when operator chooses.",
    ],
  },
  {
    n: "15",
    title: "Audit log · every commit",
    body: [
      "/audit-log · pre-built at deploy via .scripts/build-audit-log.mjs · git log → public/audit-log.json.",
      "Shows last 250 commits with SHA hyperlinks to github.com/Atom-Eons/atomeons-com/commit/<sha>.",
      "Vercel-aware · unshallow check + unshallow fetch before git log.",
      "Falls back to empty array if git unavailable (still ships a valid file).",
    ],
  },
  {
    n: "16",
    title: "Innovations · 44 firsts",
    body: [
      "/innovations · the curated brag page. Five categories: Runtime systems · Shipped products · Publications · Site innovations · Doctrines.",
      "Every entry sourced or qualified · Mom's Law applies · no 'world's first' without footnote.",
      "Disclosure IDs registered: ATOM-AESUITE-2026-0419 · ATOM-OMT-2026-0420 · ATOM-CLC-2026-0331 · ATOM-HRE-2026-0406 · ATOM-GS-2026-0406.",
      "Aliases: /inventions · /discoveries · /firsts · /brag all redirect here.",
    ],
  },
  {
    n: "17",
    title: "Saving this manual as PDF",
    body: [
      "1. Press ⌘P (Mac) or Ctrl+P (Windows/Linux) on this page.",
      "2. Destination: 'Save as PDF' in the browser print dialog.",
      "3. Layout: Portrait. Margins: Default. Scale: 100%.",
      "4. Optional: enable 'Background graphics' for full styling, disable for ink-economy printing.",
      "5. The print stylesheet at app/globals.css optimizes legibility automatically — only navigation chrome is hidden, content keeps its hierarchy.",
      "Future: operator-generated atomeons-manual.pdf published at /downloads/manual.pdf via Puppeteer · scaffolded but not run automatically.",
    ],
  },
];

export default function ManualPage() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
          USER MANUAL · ATOMEONS · 2026-06-06
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          The whole feature set.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Every feature · every tool · every keyboard shortcut · every
          setting. Save this page as PDF (⌘P · Save as PDF) for offline
          reference. Updated continuously · last verified 2026-06-06.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrintButton />
          <Link
            href="/welcome"
            className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:border-[#9CA3AF] hover:text-[#F4F4F2]"
          >
            Or take the 90-second tour →
          </Link>
        </div>
      </header>

      {SECTIONS.map((s) => (
        <section key={s.n} className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § {s.n}
          </p>
          <h2
            className="mt-2 text-[28px] font-light leading-tight text-[#F4F4F2] md:text-[36px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            {s.title}
          </h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-[1.7] text-[#9CA3AF]">
            {s.body.map((line, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § Mom&apos;s Law on this manual
        </h2>
        <p
          className="mt-4 text-[18px] leading-[1.6] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Every feature documented here actually ships on the site. If
          you read about it here, it works. Found something missing or
          wrong?{" "}
          <Link href="/founders-view" className="underline decoration-[#1F242B] hover:decoration-[#22F0D5]">
            Tell the operator
          </Link>{" "}
          · the manual is patched within a day and the correction is
          logged in the audit log.
        </p>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /manual · curated by Atom McCree · CC-BY 4.0 · last updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          Print: ⌘P · Save as PDF · Background graphics on for full styling
        </p>
      </footer>
    </main>
  );
}
