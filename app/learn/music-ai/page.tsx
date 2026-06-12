import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/music-ai · Music + audio AI domain hub.
 * One of the 7 planned domain verticals from JUNE ROCKET. Public info.
 * — 2026-06-06
 */

export const metadata: Metadata = {
  title: "Music + Audio AI · Domain Hub",
  description:
    "AI in music + audio in 2026. Suno · Udio · ElevenLabs · Stable Audio 2.0 · AIVA · Mubert · Endel · Boomy · Lemonaide · Riffusion. Tools you can use today · key papers · the copyright fight · what the lab thinks. Public-information primer.",
  alternates: { canonical: "https://atomeons.com/learn/music-ai" },
  openGraph: {
    title: "Music + Audio AI · A primer from AtomEons",
    description:
      "Generative music + voice synthesis + audio production in 2026 · who's building · what to use · the copyright fight.",
    url: "https://atomeons.com/learn/music-ai",
    type: "article",
  },
};

const PLAYERS = [
  {
    name: "Suno",
    what:
      "The dominant consumer-facing music generation product. v4.5 (April 2025) introduced 8-minute songs, lyric/style control, stem export. Now used by ~12M monthly creators · sued by RIAA (Universal · Sony · Warner) in 2024 for training data · suit ongoing.",
    where: "Cambridge MA · $125M Series B 2024",
  },
  {
    name: "Udio",
    what:
      "Suno's primary rival · launched April 2024 · perceived as having more 'realistic' production quality. Founded by ex-DeepMind researchers. Same RIAA lawsuit · same fight.",
    where: "NY · $10M seed · YC + a16z",
  },
  {
    name: "ElevenLabs",
    what:
      "Voice synthesis frontier. Multilingual voice cloning · cheapest 30s clone · 32 languages · used by audiobook publishers, game studios (Final Fantasy XVI dub), and a controversial AI Biden robocall before NH 2024 primary.",
    where: "London · ~$3B valuation 2024",
  },
  {
    name: "Stability AI · Stable Audio 2.0",
    what:
      "Open-weights audio generation · 3-minute clips · text-to-music + audio-to-audio. Released as a Pro API and (with weights) for research. The 'open lane' for music gen.",
    where: "London · stability.ai",
  },
  {
    name: "Google DeepMind · MusicLM · Lyria",
    what:
      "Lyria (the model powering YouTube Music AI), AudioLM (foundational), MusicFX (consumer-facing in Labs). Strong on conditional generation · paired with provenance watermarking via SynthID.",
    where: "London · embedded in YouTube",
  },
  {
    name: "Meta · MusicGen · AudioCraft",
    what:
      "Open-weights · MusicGen-Large is on Hugging Face. The serious research baseline · powers most academic + open-source audio work.",
    where: "Menlo Park · open-source-first",
  },
  {
    name: "AIVA · Boomy · Mubert · Endel",
    what:
      "Pre-LLM-era generative music · still relevant. AIVA composes orchestral · Boomy is 1-click pop · Mubert is functional/streaming · Endel is wellness/biometric-adaptive. Combined ~50M creators.",
    where: "Various · pre-Suno generation",
  },
  {
    name: "Riffusion · Lemonaide · Splice AI",
    what:
      "Producer-tool lane. Riffusion was the spectrogram-stable-diffusion experiment · Lemonaide does MIDI generation for working producers · Splice integrated AI loop-finding into their canonical sample library.",
    where: "LA / SF",
  },
];

const TOOLS = [
  {
    name: "Suno",
    url: "https://suno.com",
    detail:
      "Free tier (5 free songs/day · public). Pro $10/mo · 500 credits + commercial rights. Pro Premier $30/mo. The fastest path to a finished 'song' for non-musicians.",
  },
  {
    name: "Udio",
    url: "https://udio.com",
    detail:
      "Free tier with watermark · Standard $10/mo · Pro $30/mo for 1200 credits + commercial use. Producers tend to prefer Udio's mix quality.",
  },
  {
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    detail:
      "10K characters/mo free. Voice cloning starts $5/mo. Pro tiers up to $1320/mo for studio-grade. Best-in-class voice cloning for English; weakest on tonal languages.",
  },
  {
    name: "Stable Audio 2.0",
    url: "https://stableaudio.com",
    detail:
      "Free tier 20 generations/mo. Pro $11.99/mo. 3-min clips. Open-weights smaller version available for self-hosting / research.",
  },
  {
    name: "AIVA · Boomy",
    url: "https://www.aiva.ai",
    detail:
      "AIVA from €11/mo (orchestral / cinematic strength). Boomy free tier (1-click pop, distributes to streaming services for you).",
  },
  {
    name: "Open + self-host (Hugging Face)",
    url: "https://huggingface.co/facebook/musicgen-large",
    detail:
      "MusicGen-Large · AudioGen · Stable Audio Open. Free · runs on a RTX 3090+ class GPU. Slower · less polished · but no usage limits and full commercial rights.",
  },
];

const PAPERS = [
  {
    title: "MusicLM · Generating Music From Text",
    authors: "Agostinelli et al · Google",
    journal: "Preprint · January 2023",
    why: "First serious frontier text-to-music model that produced 5-minute clips with musical coherence. Foundation paper for everything that followed.",
  },
  {
    title: "Simple and Controllable Music Generation · MusicGen",
    authors: "Copet et al · Meta",
    journal: "NeurIPS 2023",
    why: "Open-weights baseline · simpler than prior cascades · the model most academic + open-source work uses as backbone.",
  },
  {
    title: "Riffusion · Stable Diffusion for Spectrograms",
    authors: "Forsgren + Martiros",
    journal: "Project blog · December 2022",
    why: "The clever hack that proved you could repurpose image-diffusion for audio by treating spectrograms as images. Catalyzed wider research.",
  },
  {
    title: "Voicebox · Text-Guided Multilingual Universal Speech Generation",
    authors: "Le et al · Meta",
    journal: "Preprint · June 2023",
    why: "Foundation for multilingual voice cloning · the architecture that later ElevenLabs-class products are descended from.",
  },
  {
    title: "RIAA v. Suno, RIAA v. Udio",
    authors: "Universal · Sony · Warner",
    journal: "S.D.N.Y. filed June 24 2024",
    why: "The defining legal fight for AI music. Outcome will reshape what training data is permissible for generative audio. Settlement or precedent expected 2026-2027.",
  },
];

const PEOPLE = [
  "Mikey Shulman · Suno cofounder",
  "Andrew Sanchez · Udio cofounder, ex-DeepMind",
  "Mati Staniszewski · ElevenLabs cofounder",
  "Holly Herndon · artist + AI researcher · 'Holly+' voice instrument",
  "Brian Eno · the godfather of generative music · still active",
  "Suzanne Ciani · the 90-year-old electronic music pioneer · YouTube voice on AI music",
  "Edward Newton-Rex · ex-Stability AI head of audio, now Fairly Trained advocacy",
  "Damien Riehl · 'all melodies' attorney · the man who put every possible melody in public domain",
];

const RISKS = [
  "The RIAA lawsuit could force Suno + Udio to license training data · their economics depend on the legal answer.",
  "Voice cloning fraud · AI Biden robocall (Jan 2024 NH primary), AI scam calls impersonating relatives · the new social-engineering vector.",
  "Artist replacement on commercial libraries · production-music libraries (used by YouTube/podcast creators) are now ~30% AI-generated · real composers losing budget.",
  "Watermarking is fragile · SynthID and similar provenance signals fail under common audio processing (compression, EQ, pitch shift). Detection lags generation by 12-18 months.",
  "Training-data laundering · 'open' datasets that scraped Spotify/SoundCloud without consent · these power some of the cheaper providers.",
  "Authenticity erosion · the 'is this real?' question now applies to every clip, every interview, every voice memo. Newsroom verification workflows are catching up slowly.",
];

const SELF_USE = [
  "If you're a non-musician with an idea: Suno or Udio. $10/mo, 30 minutes of play, you'll have something usable.",
  "If you're a producer: AI is a starting point, not a finish. Generate stems, drop into Logic/Ableton, replace what you can play yourself.",
  "If you need narration for content: ElevenLabs at the $5/mo tier covers most podcast/audiobook use cases. Custom-clone your own voice for $5/mo · the cheapest legitimate voice-clone path.",
  "If you're worried about your voice being cloned: register at Cara/Glaze/Resemble Detect. None are perfect but they add forensic signal.",
  "If you're a working musician: read Edward Newton-Rex's 'Fairly Trained' criteria · pick tools that licensed their data (or self-host open-weights you trained yourself).",
  "If you want to learn how this works: download MusicGen from Hugging Face, run it on a GPU, read the paper. The mystique evaporates fast once you've trained even one small model.",
];

export default function MusicAiPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
          DOMAIN HUB · MUSIC + AUDIO · AI · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          AI in music.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Suno · Udio · ElevenLabs · Stable Audio · MusicGen · the RIAA fight
          · the voice-clone fraud vector. The companies and tools actually
          shifting production · the papers that mattered · the people worth
          following · the legal storm.
        </p>
      </header>
      <DomainSections
        players={PLAYERS}
        tools={TOOLS}
        papers={PAPERS}
        people={PEOPLE}
        risks={RISKS}
        selfUse={SELF_USE}
        thinks={`AI music in 2026 is in the same compression-and-courts moment that AI image was 2022-2024. Suno + Udio are the consumer-grade Stable Diffusion. ElevenLabs is the voice analog of DALL-E. The legal answer to RIAA v. Suno is the single largest unknown for the entire field. The lab's bet: by 2028, every commercial production music library is half-AI, every voice-over budget at the top end is half of what it was in 2023, and a verified-provenance standard (SynthID + C2PA over audio) becomes default for newsrooms and broadcasters. The musicians who survive are the ones who treat AI as a tool · the ones who refused to engage lose budget first.`}
      />
      <CrossLinks current="music-ai" />
      <Footer route="/learn/music-ai" />
    </main>
  );
}

// =============================================================================
// Shared rendering helpers · used by all 3 domain hubs in this wave so the
// pages stay light + the look is identical
// =============================================================================

interface DomainSectionsProps {
  players: { name: string; what: string; where: string }[];
  tools: { name: string; url: string; detail: string }[];
  papers: { title: string; authors: string; journal: string; why: string }[];
  people: string[];
  risks: string[];
  selfUse: string[];
  thinks: string;
}

export function DomainSections(props: DomainSectionsProps) {
  return (
    <>
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Key players
        </h2>
        <ul className="mt-8 space-y-6">
          {props.players.map((p) => (
            <li key={p.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[20px] font-light text-[#F4F4F2]">{p.name}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.what}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                {p.where}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Tools you can use today
        </h2>
        <ul className="mt-8 space-y-6">
          {props.tools.map((t) => (
            <li key={t.name} className="border-l-2 border-[#C9A55C]/40 pl-6">
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[20px] font-light text-[#F4F4F2] hover:text-[#22F0D5]"
              >
                {t.name} ↗
              </a>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {t.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Papers + cases that mattered
        </h2>
        <ul className="mt-8 space-y-6">
          {props.papers.map((p) => (
            <li key={p.title} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[18px] font-light leading-tight text-[#F4F4F2]">
                {p.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
                {p.authors} · {p.journal}
              </p>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.why}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § People to follow
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-[15px] leading-[1.65] text-[#9CA3AF]">
          {props.people.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Risks the lab takes seriously
        </h2>
        <ul className="mt-6 space-y-3">
          {props.risks.map((r, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § How to use this for yourself
        </h2>
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-[15px] leading-[1.65] text-[#9CA3AF]">
          {props.selfUse.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the lab thinks
        </h2>
        <p
          className="mt-4 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {props.thinks}
        </p>
      </section>
    </>
  );
}

export function CrossLinks({ current }: { current: string }) {
  const all = [
    { slug: "health-ai", label: "Health AI" },
    { slug: "money-ai", label: "Money AI" },
    { slug: "video-ai", label: "Video AI" },
    { slug: "music-ai", label: "Music AI" },
    { slug: "policy-ai", label: "Policy AI" },
    { slug: "science-ai", label: "Science AI" },
  ].filter((x) => x.slug !== current);
  return (
    <section className="mt-20 border-t border-[#1F242B] pt-12">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
        § Other domain hubs
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {all.map((x) => (
          <Link
            key={x.slug}
            href={`/learn/${x.slug}`}
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              {x.label}
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              The {x.label.toLowerCase()} hub.
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Footer({ route }: { route: string }) {
  return (
    <footer className="mt-20 border-t border-[#1F242B] pt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
        Domain hub · {route} · Public information only · Updated 2026-06-06
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
        Sources: papers cited above · vendor announcements · public press · court filings where applicable
      </p>
    </footer>
  );
}
