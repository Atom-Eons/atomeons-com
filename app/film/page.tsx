import type { Metadata } from "next";
import Link from "next/link";
import { Film, Clapperboard, Layers, Mail, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Film · Cinema lab · /film · AtomEons",
  description:
    "AI Film at AtomEons is a cinema lab — research that happens to move at 24fps. Status-honest reel, no mock films, operator-supplied slugs only.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Film · Cinema lab · AtomEons",
    description:
      "Cinema lab. Research that happens to move at 24fps. AtomEons Systems Laboratory.",
    url: "https://atomeons.com/film",
    type: "website",
  },
};

type FilmStatus = "shipped" | "in-production";

type FilmCard = {
  slug: string | null;
  title: string;
  thesis: string;
  engine: "Veo" | "Sora" | "Imagen";
  duration: string;
  eta: string;
  status: FilmStatus;
};

const REEL: ReadonlyArray<FilmCard> = [
  {
    slug: null,
    title: "Variable-Weight Reveal",
    thesis:
      "A title sequence rendered as a typographic instrument — Inter Variable weight as the only camera move.",
    engine: "Veo",
    duration: "~90s",
    eta: "Q3 2026",
    status: "in-production",
  },
  {
    slug: null,
    title: "What Cyberwar Looks Like",
    thesis:
      "A short film about the texture of modern intrusion — packet captures, blue glow, and the operators who never sleep.",
    engine: "Sora",
    duration: "~4m",
    eta: "Q4 2026",
    status: "in-production",
  },
  {
    slug: null,
    title: "One Operator",
    thesis:
      "Solo-founder documentary at 24fps. Marco Island. Lab notes, terminal sessions, the long hours behind the surface.",
    engine: "Imagen",
    duration: "~6m",
    eta: "Q1 2027",
    status: "in-production",
  },
];

const PROCESS_STEPS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Idea",
    body: "A film starts as a one-line thesis on the lab whiteboard. If it cannot be defended as research, it does not progress.",
  },
  {
    title: "Storyboard",
    body: "We block the film in beats — frame, prompt, transition, sound. Storyboards are written in plain text before any frame is generated.",
  },
  {
    title: "Generation",
    body: "Shots are generated against the engine that best fits the beat — Veo for camera motion, Sora for narrative arcs, Imagen for stills. Every shot is auditioned against the storyboard, not the prompt.",
  },
  {
    title: "Publication",
    body: "A film ships when the thesis survives the cut. We do not pad to length. The reel reflects only what shipped, not what was attempted.",
  },
];

function StatusPip({ status }: { status: FilmStatus }) {
  if (status === "shipped") {
    return (
      <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#22F0D5]">
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5]"
        />
        Shipped
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#5A6068]">
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-[#5A6068]"
      />
      In production
    </span>
  );
}

function PosterPlaceholder() {
  return (
    <div
      aria-hidden
      className="relative aspect-video w-full overflow-hidden border-b border-[#1F242B]"
      style={{
        backgroundImage:
          "radial-gradient(120% 80% at 20% 10%, #14181D 0%, #0F1114 45%, #08090B 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-5xl text-[#9CA3AF]/40 select-none">
          Æ
        </span>
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent 0%, rgba(8,9,11,0.35) 100%)",
        }}
      />
    </div>
  );
}

function ReelCard({ card }: { card: FilmCard }) {
  const isShipped = card.status === "shipped" && card.slug;

  const inner = (
    <article className="group flex h-full flex-col border border-[#1F242B] bg-[#0F1114] transition-colors duration-200 hover:border-[#2A3038]">
      <PosterPlaceholder />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <StatusPip status={card.status} />
          {isShipped ? (
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 text-[#9CA3AF] transition-colors group-hover:text-[#22F0D5]"
            />
          ) : (
            <Clapperboard
              aria-hidden
              className="h-4 w-4 text-[#5A6068]"
            />
          )}
        </div>
        <h3 className="font-serif text-xl leading-tight text-[#F4F4F2]">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#9CA3AF]">
          {card.thesis}
        </p>
        <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-[#1F242B] pt-3 text-[11px] font-mono uppercase tracking-[0.1em]">
          <div className="flex flex-col gap-0.5">
            <dt className="text-[#5A6068]">Engine</dt>
            <dd className="text-[#F4F4F2]">{card.engine}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-[#5A6068]">Length</dt>
            <dd className="text-[#F4F4F2]">{card.duration}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-[#5A6068]">ETA</dt>
            <dd className="text-[#F4F4F2]">{card.eta}</dd>
          </div>
        </dl>
      </div>
    </article>
  );

  if (isShipped && card.slug) {
    return (
      <Link
        href={`/film/${card.slug}`}
        aria-label={`${card.title} — open film`}
        className="block h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      aria-disabled="true"
      className="block h-full cursor-default opacity-95"
    >
      {inner}
    </div>
  );
}

export default function FilmPage() {
  const shippedCount = REEL.filter((f) => f.status === "shipped").length;
  const inProdCount = REEL.filter((f) => f.status === "in-production").length;

  return (
    <main className="min-h-screen bg-[#08090B] text-[#F4F4F2]">
      {/* HERO */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#22F0D5]">
              <Film aria-hidden className="h-3.5 w-3.5" />
              <span>AI Film · in production</span>
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#F4F4F2] md:text-7xl">
              Cinema lab.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#9CA3AF] md:text-xl">
              Research that happens to move at 24fps.
            </p>
            <div className="mt-2 flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.14em] text-[#5A6068]">
              <span>/film</span>
              <span aria-hidden>·</span>
              <span>AtomEons Systems Laboratory</span>
              <span aria-hidden>·</span>
              <span>Marco Island, FL</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — THESIS */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2
            className="font-serif text-3xl tracking-tight text-[#F4F4F2] md:text-4xl"
            style={{ fontVariationSettings: "'wght' 520" }}
          >
            What this is
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-1">
              <div
                aria-hidden
                className="hidden h-px w-full bg-[#22F0D5] md:mt-4 md:block"
              />
            </div>
            <div className="md:col-span-11">
              <p className="max-w-3xl text-lg leading-relaxed text-[#F4F4F2]/90">
                AI Film at AtomEons is a cinema lab. It is not a content studio,
                not a prompt-art account, not a reel optimized for the feed. Each
                film starts as a research thesis and is defended on those terms
                first — what does it isolate, what does it reveal, what would
                disprove it. Only then does it become frames. The engine is
                chosen by the beat, not by the brand. The cut is decided by the
                thesis, not by the runtime. Length is a side-effect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — REEL */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2
              className="font-serif text-3xl tracking-tight text-[#F4F4F2] md:text-4xl"
              style={{ fontVariationSettings: "'wght' 520" }}
            >
              Reel
            </h2>
            <div className="flex items-center gap-5 text-[11px] font-mono uppercase tracking-[0.14em]">
              <span className="inline-flex items-center gap-2 text-[#22F0D5]">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5]"
                />
                {shippedCount} shipped
              </span>
              <span className="inline-flex items-center gap-2 text-[#5A6068]">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#5A6068]"
                />
                {inProdCount} in production
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {REEL.map((card) => (
              <ReelCard key={card.title} card={card} />
            ))}
          </div>

          {shippedCount === 0 ? (
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#5A6068]">
              No films have shipped yet. The reel above reflects current
              production, not aspiration. Cards activate when the file lands.
            </p>
          ) : null}
        </div>
      </section>

      {/* SECTION 3 — PROCESS */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="flex items-center gap-3">
            <Layers aria-hidden className="h-4 w-4 text-[#22F0D5]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9CA3AF]">
              Process
            </span>
          </div>
          <h2
            className="mt-4 font-serif text-3xl tracking-tight text-[#F4F4F2] md:text-4xl"
            style={{ fontVariationSettings: "'wght' 520" }}
          >
            Idea to publication
          </h2>

          <ol className="mt-10 grid gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-2">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 bg-[#0F1114] p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5A6068]">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-[#1F242B]"
                  />
                </div>
                <h3 className="font-serif text-xl text-[#F4F4F2]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9CA3AF]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 4 — CONTACT */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <Mail aria-hidden className="h-4 w-4 text-[#22F0D5]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9CA3AF]">
                  Contact
                </span>
              </div>
              <h2
                className="mt-4 font-serif text-3xl tracking-tight text-[#F4F4F2] md:text-4xl"
                style={{ fontVariationSettings: "'wght' 520" }}
              >
                Press & storyboards
              </h2>
            </div>
            <div className="flex flex-col gap-6 md:col-span-7">
              <p className="text-lg leading-relaxed text-[#F4F4F2]/90">
                Operator-supplied film slugs. Concept storyboards available on
                request to the press contact below.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/press"
                  className="group inline-flex items-center gap-2 border border-[#22F0D5] bg-transparent px-5 py-3 text-sm font-mono uppercase tracking-[0.14em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5] hover:text-[#08090B] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
                >
                  Press inquiries
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  href="/press"
                  className="text-sm text-[#9CA3AF] underline-offset-4 hover:text-[#F4F4F2] hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
                >
                  /press
                </Link>
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#5A6068]">
                AtomEons Systems Laboratory · Marco Island, FL
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
