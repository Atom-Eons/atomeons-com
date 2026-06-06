import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/video-ai · domain hub.
 *
 * AI video generation · the Sora moment · Runway · Veo · Kling · Pika
 * · Luma · the deepfake problem · the cinematography intersection.
 *
 * — 2026-06-06
 */

export const metadata: Metadata = {
  title: "Video AI · Domain Hub",
  description:
    "AI video generation in 2026. OpenAI Sora 2 · Google Veo 3 · Runway Gen-4 · Kling 2.1 · Pika · Luma Ray2 · Topaz. Tools you can use today · the deepfake threat · cinematography intersection · what the lab thinks. Public-info primer.",
  alternates: { canonical: "https://atomeons.com/learn/video-ai" },
  openGraph: {
    title: "Video AI · A primer from AtomEons",
    description:
      "Sora · Veo · Runway · Kling · Pika · Luma · the deepfake threat · what to use · what to know.",
    url: "https://atomeons.com/learn/video-ai",
    type: "article",
  },
};

const PLAYERS = [
  {
    name: "OpenAI Sora · Sora 2",
    what:
      "The model that crossed the 1-minute, photoreal threshold in February 2024. Sora 2 (October 2025) added audio-video synchronization, character continuity across scenes, and a Sora.app social product. Industry benchmark.",
    where: "SF · embedded in ChatGPT Plus & Pro",
  },
  {
    name: "Google Veo · Veo 3",
    what:
      "Google DeepMind's video model. Veo 3 (May 2025) added native audio generation, 4K output, and the lowest published latency among frontier models. Bundled with Gemini and Vertex AI.",
    where: "London / Mountain View",
  },
  {
    name: "Runway · Gen-4 · Aleph",
    what:
      "First-mover commercial AI video product. Gen-4 (March 2025) added scene-to-scene character + object persistence. Aleph (2025) added in-context editing of existing footage. Pricing for working filmmakers.",
    where: "NY · indie-film + post-production lane",
  },
  {
    name: "Kuaishou Kling · Kling 2.1",
    what:
      "Chinese frontier video model. Kling 2.1 (April 2025) matched Sora on most public benchmarks at substantially lower cost. The dominant model in Asia and a serious competitor everywhere else.",
    where: "Beijing · short-video native (Kuaishou)",
  },
  {
    name: "Pika Labs",
    what:
      "Consumer-friendly UI · effect-driven prompts · viral 'Pikaffect' filters (Crush It, Inflate, Cake-ify). The lane for non-technical creators.",
    where: "SF · YC-funded",
  },
  {
    name: "Luma AI · Ray2 · Dream Machine",
    what:
      "Real-time generation focus. Ray2 (January 2025) is the fastest commercial model · sub-10-second 720p clips. Dream Machine app for mobile-first creation.",
    where: "SF",
  },
  {
    name: "Topaz Video AI · Magnific",
    what:
      "Not generation — restoration + upscaling. Topaz is the post-production workhorse. Magnific does AI-driven detail enhancement on stills + video.",
    where: "TX · post-production toolchain",
  },
  {
    name: "Black Forest Labs · ComfyUI",
    what:
      "Open-source lane. FLUX models (Black Forest, ex-Stability) + ComfyUI node-based workflow are the open lane. Most professional indie filmmakers use this rather than the closed APIs.",
    where: "Germany · open-source frontier",
  },
];

const TOOLS = [
  {
    name: "Sora.app",
    url: "https://sora.com",
    detail:
      "Free during preview · ChatGPT Plus / Pro included. 10-second 720p public · 20-second 1080p Plus · 60-second 1080p Pro. The benchmark consumer-grade product.",
  },
  {
    name: "Runway",
    url: "https://runwayml.com",
    detail:
      "Starts at $15/month · Pro at $35/month. The serious filmmaker's tool · scene-to-scene continuity · in-context editing. Used on real productions including 'Everything Everywhere All At Once' post-VFX.",
  },
  {
    name: "Kling AI",
    url: "https://klingai.com",
    detail:
      "Free tier daily quota · paid plans from $7/month. Often beats Sora on prompt-adherence benchmarks at half the price. Sometimes unavailable to non-Chinese IPs.",
  },
  {
    name: "Veo via Gemini / Vertex",
    url: "https://gemini.google.com",
    detail:
      "Gemini Advanced subscribers get Veo 3 access. Vertex AI integration for enterprise / programmatic. 4K native · audio included.",
  },
  {
    name: "Pika · Luma Dream Machine",
    url: "https://pika.art",
    detail:
      "The friendly lane. Pika excels at meme-able effects · Luma at fast iteration. Both have free tiers and ~$10-20/month paid plans.",
  },
  {
    name: "ComfyUI + open models",
    url: "https://github.com/comfyanonymous/ComfyUI",
    detail:
      "Free · runs locally on a decent GPU (RTX 4090 ideal · 3090 works). FLUX, Wan 2.1, Hunyuan Video, CogVideoX all available. The professional indie lane.",
  },
];

const PAPERS = [
  {
    title: "Video generation models as world simulators",
    authors: "OpenAI · Sora technical report",
    journal: "OpenAI blog · February 2024",
    why: "The Sora paper that made everyone realize diffusion-transformers on video tokens could produce minute-long photoreal clips. Industry inflection point.",
  },
  {
    title: "Veo · Lumiere · Sora · the diffusion-transformer convergence",
    authors: "Google + OpenAI parallel announcements 2024",
    journal: "Various preprints",
    why: "Convergent architecture: video latents · 3D diffusion transformer · text + image conditioning. Every major model in 2025-2026 is a variation of this template.",
  },
  {
    title: "DeepFakes detection in the wild · NIST FRTE benchmarks",
    authors: "NIST + FBI + academic",
    journal: "NIST · 2024 ongoing",
    why: "The detection side. As generation improves · detection lags. NIST runs the canonical benchmark suite. Current state: ~92% precision against frontier generators · falling.",
  },
  {
    title: "The world's first AI-generated commercial · Toys R Us · 2024",
    authors: "Native Foreign + Toys R Us · using Sora",
    journal: "Cannes Lions submission 2024",
    why: "First major brand to publicly ship Sora-generated commercial work. Industry milestone for ad-creative pipeline disruption.",
  },
  {
    title: "EU AI Act · Article 50 · Deepfake disclosure requirements",
    authors: "European Union",
    journal: "Regulation (EU) 2024/1689",
    why: "First major jurisdiction requiring labeled AI-generated content. Sets the global compliance baseline for video AI products through 2027.",
  },
];

const PEOPLE = [
  "Tim Brooks · OpenAI Sora lead",
  "Bilawal Sidhu · ex-Google, AI cinematographer + YouTube voice",
  "Casey Neistat · accelerated AI-tooling adoption in real production",
  "Paul Trillo · the AI-music-video auteur (Washed Out · The Hardest Part)",
  "Cristóbal Valenzuela · Runway co-founder · ML-for-filmmakers position",
  "PJ Ace · prolific AI-video creator on X, demonstrates frontier capabilities live",
  "Aza Raskin / Tristan Harris · Center for Humane Technology · public-safety voice on deepfakes",
  "Hany Farid · UC Berkeley · forensic image / video analysis · go-to expert on detection",
];

const RISKS = [
  "Political deepfakes during the 2024 + 2026 election cycles. Confirmed cases of fake Biden robocalls (NH primary 2024) · fake Slovak election audio · the floor is rising every cycle.",
  "Non-consensual intimate imagery (NCII) generation · most jurisdictions still have weak laws. Take It Down (NCMEC) and StopNCII.org now offer victim-side tools.",
  "Voice + likeness theft of public figures · Tom Hanks, Scarlett Johansson cases against OpenAI 2024. Legal precedent still forming.",
  "Fraud at the bank · the Arup deepfake-CFO heist ($25M, 2024) was video-AI driven. Wire approval workflows haven't caught up.",
  "Loss of trust in legitimate video evidence · the 'liar's dividend' effect. Real footage can now be dismissed as fake. Cuts both ways for accountability.",
  "Training-data lawsuits · the New York Times v. OpenAI / Microsoft case (Dec 2023 onwards) tests whether training on copyrighted content is fair use. Outcome will reshape the industry.",
];

const SELF_USE = [
  "If you're a filmmaker: Runway + Topaz + Magnific is the working stack. Generate base · upscale · enhance. Sora for novel concepts; Runway for production work.",
  "If you're a marketer: Sora / Veo / Pika for fast brand-storytelling beats; Kling for cost-optimized A/B tests. Disclose AI use per platform policy + EU AI Act if applicable.",
  "If you're a creator: pick one tool, ship for 30 days. Don't tool-hop. The constraint is your prompt craft, not the model.",
  "If you're worried about being deepfaked: register your face / voice with services that watermark and detect (Cara · Glaze · Nightshade for stills; Resemble AI's Detect for voice).",
  "If you operate a business: require out-of-band verification on any unusual financial request that arrived via video / audio. Set a family or company password.",
  "If you're a journalist or fact-checker: master Hany Farid's forensic toolkit and the NIST FRTE benchmark suite. Detection is now a specialized skill.",
];

export default function VideoAiPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
          DOMAIN HUB · VIDEO · AI · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          AI in video.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Sora · Veo · Runway · Kling · Pika · Luma · the deepfake threat ·
          the cinematography intersection. Who&apos;s building · what to use
          today · what to know · what the lab thinks. Public information ·
          no marketing.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF4D4D]">
          DISCLOSE AI USE · EU AI Act Article 50 requires labeling of AI-generated content · Most platforms now require this also
        </p>
      </header>

      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Key players
        </h2>
        <ul className="mt-8 space-y-6">
          {PLAYERS.map((p) => (
            <li key={p.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[20px] font-light text-[#F4F4F2]">{p.name}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.what}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
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
          {TOOLS.map((t) => (
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
          {PAPERS.map((p) => (
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
          {PEOPLE.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Risks the lab takes seriously
        </h2>
        <ul className="mt-6 space-y-3">
          {RISKS.map((r, i) => (
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
          {SELF_USE.map((s) => (
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
          AI video in 2026 is where AI image was in 2022 · 24 months from
          curiosity to industry. The frontier-model output is now
          indistinguishable from a low-budget commercial. The bottleneck
          shifts from generation to direction · the people who win this
          decade are the directors who used to be storyboard artists, the
          editors who can prompt continuity, the marketers who can ship
          fifteen ad variants in an afternoon. The deepfake problem is
          orthogonal · it is the law-enforcement, identity-defense, and
          family-password problem first. Treat them separately. The lab&apos;s
          bet: by 2027, ad creative is 70% AI-augmented · feature film
          background plates are 90% AI · and a verified-provenance video
          standard (C2PA) becomes table-stakes for news organizations.
        </p>
      </section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where to go deeper on AtomEons
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/research/lessons-from-sci-fi"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              AI in cinema
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Lessons from Sci-Fi · 30 essays on AI imagined on film.
            </p>
          </Link>
          <Link
            href="/learn/cyber/models"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Threat models
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              STRIDE, OWASP LLM Top 10 applied to generative media.
            </p>
          </Link>
          <Link
            href="/learn/money-ai"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Money AI
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Where deepfakes are stealing $25M at a time. Defend the wire.
            </p>
          </Link>
          <Link
            href="/learn/health-ai"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Health AI
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              AlphaFold, Med-PaLM, AMIE · the bedside revolution.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          Domain hub · /learn/video-ai · Public information only · Updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          Sources: model cards · vendor announcements · NIST FRTE · EU AI Act · public press
        </p>
      </footer>
    </main>
  );
}
