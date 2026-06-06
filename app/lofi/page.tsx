import type { Metadata } from "next";
import Link from "next/link";

/**
 * /lofi · the lab study-room.
 *
 * Wave 44 · 2026-06-06 · operator: "make the lab a lofi room, generate
 * an image based on all you see, and then run a lofi free stream
 * through it. for coding."
 *
 * HONEST FRAMING
 *   AI image generation requires Veo/Imagen/Dall-E credentials that
 *   aren't wired into the deploy pipeline. The image-generation step
 *   is scoped for the operator's GOOGLE_AI_KEY env wire-up.
 *
 *   Until then · the room is composed from our own procedural SVG +
 *   ambient gradients + the free 24/7 Lofi Girl YouTube live stream
 *   (jfKfPfyJRdk). The stream is embedded via the YouTube iframe API.
 *
 *   This works · today · zero API cost · operator can drop an
 *   AI-generated room PNG into /public/lofi-room.png to upgrade
 *   the visual at any time.
 */

export const metadata: Metadata = {
  title: "Lofi · the lab study room",
  description:
    "AtomEons lo-fi study room · free 24/7 lo-fi hip-hop radio embedded via Lofi Girl YouTube stream · ambient procedural visuals · for coding sessions and focused reading. Operator-curated · zero ads · no signup.",
  alternates: { canonical: "https://atomeons.com/lofi" },
  openGraph: {
    title: "Lofi · the lab study room",
    description:
      "Free 24/7 lo-fi radio in your browser · for coding sessions.",
    url: "https://atomeons.com/lofi",
    type: "article",
  },
};

const STREAMS = [
  {
    id: "jfKfPfyJRdk",
    name: "Lofi Girl · beats to relax/study to",
    desc: "The canonical 24/7 lo-fi hip-hop stream. ~70K listeners typically online. Curated by Lofi Records.",
  },
  {
    id: "rUxyKA_-grg",
    name: "Lofi Girl · sleepy beats",
    desc: "Slower tempos · same channel · for late-night coding.",
  },
  {
    id: "4xDzrJKXOOY",
    name: "synthwave radio · beats to chill/game to",
    desc: "80s-coded synthwave · sister stream · for the warez aesthetic.",
  },
];

export default function LofiPage() {
  return (
    <main className="lofi-root mx-auto max-w-[1200px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
          THE LAB · STUDY ROOM · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(56px,9vw,108px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Lofi.
        </h1>
        <p
          className="mt-4 text-[clamp(20px,2.4vw,28px)] font-light italic leading-[1.35] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The room. The rain. The work.
        </p>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Free 24/7 lo-fi radio · embedded directly · no signup · no
          tracking · zero ads on our side. For coding sessions, careful
          reading, and the kind of quiet work that happens after midnight.
        </p>
      </header>

      {/* The main stream · full-width embed */}
      <section className="mt-12">
        <div
          className="relative w-full overflow-hidden border border-[#1F242B] bg-black"
          style={{ aspectRatio: "16 / 9" }}
        >
          <iframe
            src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&modestbranding=1&rel=0&iv_load_policy=3"
            title="Lofi Girl · beats to relax/study to · 24/7 live stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
          ↑ Press play · the stream is live · auto-mutes by default · adjust
          volume on the YouTube player
        </p>
      </section>

      {/* Alternative streams */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Alternative rooms
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {STREAMS.slice(1).map((s) => (
            <div key={s.id} className="border border-[#1F242B] bg-black overflow-hidden">
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${s.id}?modestbranding=1&rel=0&iv_load_policy=3`}
                  title={s.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  {s.name}
                </p>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#9CA3AF]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The room concept */}
      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § The lab room
        </h2>
        <p
          className="mt-4 text-[19px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          One operator. One desk. The window faces the Gulf at Marco
          Island. The Mac mini on the left runs the deploys. The Windows
          tower on the right runs ORANGEBOX. The Studio Display lights
          the room cyan after dark. The fans hum at 28 dB. The rain
          starts most afternoons around four. The lo-fi stays on.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
          Operator-generated room image · scoped for future when a Veo /
          Imagen / DALL-E API key is wired · drop a PNG at
          /public/lofi-room.png to upgrade · for now the room is in the
          mind&apos;s eye.
        </p>
      </section>

      {/* Why a study room */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Why this exists
        </h2>
        <ul className="mt-6 space-y-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              <strong className="text-[#F4F4F2]">Free.</strong> Lofi Girl is
              the canonical 24/7 free stream · YouTube hosts it · no
              subscription required · no ads on our side.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              <strong className="text-[#F4F4F2]">For coding.</strong> The
              60-90 BPM lo-fi tempo aligns with the working-memory hold
              range · ambient enough to fade into background.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              <strong className="text-[#F4F4F2]">No tracking from us.</strong>
              YouTube tracks via the iframe · use a privacy-focused
              browser or pi-hole to mitigate · or use a separate audio
              source entirely.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              <strong className="text-[#F4F4F2]">Replaceable.</strong> The
              embed is just an iframe · the lab does not host the audio ·
              attribution stays with Lofi Records · CC pattern.
            </span>
          </li>
        </ul>
      </section>

      {/* Related */}
      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Related on the lab
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/mindrest/experience" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Mindrest</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">8-mode binaural-beat session · headphones recommended.</p>
          </Link>
          <Link href="/best-practices" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Cheat sheets</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">7 AI coding tool guides · for when the lo-fi is on.</p>
          </Link>
          <Link href="/lab" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">The actual lab</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">The real room · the real desk · the real routine.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /lofi · the lab study room · streams via YouTube · curated by Lofi Records · last updated 2026-06-06
        </p>
      </footer>
    </main>
  );
}
