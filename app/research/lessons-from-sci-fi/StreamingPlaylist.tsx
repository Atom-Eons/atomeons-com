/**
 * StreamingPlaylist — where to watch each of the twelve key AI films
 * highlighted in the monograph.
 *
 * For each title, the lab shows the most-likely current streaming homes
 * (paid subscription + free + rental) plus a JustWatch search link for
 * live, current-as-of-today availability. Availability shifts often;
 * JustWatch is the canonical aggregator.
 *
 * FREE-FIRST signaling: any title with a free legitimate option
 * (Internet Archive, Tubi, Pluto, Kanopy with library card) gets a
 * FREE chip up front so the operator can find no-cost watches first.
 *
 * COPYRIGHT NOTE: streaming-service names + brand colors are used
 * nominatively to direct viewers to the service. No copyrighted logos
 * are reproduced — each chip is a colored text badge in the service's
 * brand color, which is referential use (allowed) rather than reproduction.
 */

import Link from "next/link";

type StreamKey =
  | "max"
  | "netflix"
  | "prime"
  | "disney"
  | "hulu"
  | "appletv"
  | "paramount"
  | "peacock"
  | "tubi"
  | "pluto"
  | "kanopy"
  | "criterion"
  | "archive"
  | "rental";

type Service = {
  label: string;
  /** Brand color used as the chip accent. */
  color: string;
  /** Whether this option is free at point-of-view (ad-supported or PD). */
  free?: boolean;
};

const SERVICES: Record<StreamKey, Service> = {
  max: { label: "Max", color: "#0046FE" },
  netflix: { label: "Netflix", color: "#E50914" },
  prime: { label: "Prime Video", color: "#00A8E1" },
  disney: { label: "Disney+", color: "#113CCF" },
  hulu: { label: "Hulu", color: "#1CE783" },
  appletv: { label: "Apple TV+", color: "#A6A6A6" },
  paramount: { label: "Paramount+", color: "#0064FF" },
  peacock: { label: "Peacock", color: "#FA6400" },
  tubi: { label: "Tubi", color: "#FA382F", free: true },
  pluto: { label: "Pluto TV", color: "#FFCB05", free: true },
  kanopy: { label: "Kanopy", color: "#11AEEF", free: true },
  criterion: { label: "Criterion Channel", color: "#E0C46F" },
  archive: { label: "Internet Archive", color: "#9CC3CC", free: true },
  rental: { label: "Rental ($3–5)", color: "#6B7779" },
};

type Watch = {
  film: string;
  year: number;
  /** Most-likely current homes — ordered best/most-stable first. */
  options: StreamKey[];
  /** Optional one-line note. */
  note?: string;
  publicDomain?: boolean;
};

const WATCHLIST: Watch[] = [
  {
    film: "Metropolis",
    year: 1927,
    options: ["archive", "kanopy", "tubi", "criterion"],
    note: "US public domain since 2023. Internet Archive carries the restored Kino edition free.",
    publicDomain: true,
  },
  {
    film: "The Day the Earth Stood Still",
    year: 1951,
    options: ["disney", "hulu", "prime", "rental"],
    note: "Fox library moved into Disney+. Often crosses to Hulu as part of the same bundle.",
  },
  {
    film: "Forbidden Planet",
    year: 1956,
    options: ["max", "prime", "rental"],
    note: "MGM title now under Warner Bros. Discovery streaming — primary home is Max.",
  },
  {
    film: "2001: A Space Odyssey",
    year: 1968,
    options: ["max", "prime", "rental"],
    note: "Warner Bros catalog. Anchor title for Max sci-fi. Frequently free on Max during retrospectives.",
  },
  {
    film: "Colossus: The Forbin Project",
    year: 1970,
    options: ["peacock", "tubi", "prime", "rental"],
    note: "Universal Pictures library. Drifts in and out of Peacock — Tubi is a free fallback.",
  },
  {
    film: "Westworld",
    year: 1973,
    options: ["max", "prime", "rental"],
    note: "Warner Bros / MGM era. Max carries the film and the 2016 TV series together.",
  },
  {
    film: "Blade Runner",
    year: 1982,
    options: ["max", "prime", "rental"],
    note: "The Final Cut. Warner Bros title — Max is primary; Prime often rents both versions.",
  },
  {
    film: "The Terminator",
    year: 1984,
    options: ["prime", "tubi", "pluto", "rental"],
    note: "MGM library now under Amazon — primary home is Prime Video. Free with ads on Tubi / Pluto.",
  },
  {
    film: "The Matrix",
    year: 1999,
    options: ["max", "prime", "rental"],
    note: "Warner Bros title. Max anchor. The 1999 original + trilogy + Resurrections all sit together.",
  },
  {
    film: "Her",
    year: 2013,
    options: ["max", "prime", "rental"],
    note: "Annapurna title. Streaming home rotates — JustWatch is the truth-teller for any given week.",
  },
  {
    film: "Ex Machina",
    year: 2014,
    options: ["netflix", "prime", "rental"],
    note: "A24 / Universal. Often on Netflix or Prime; sometimes both.",
  },
  {
    film: "Westworld (TV)",
    year: 2016,
    options: ["max", "rental"],
    note: "HBO original — anchor of the Max sci-fi catalog. All four seasons sit there.",
  },
];

function ServiceChip({ k }: { k: StreamKey }) {
  const s = SERVICES[k];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
      style={{
        borderColor: `${s.color}66`,
        color: s.color,
      }}
    >
      {s.free ? (
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full"
          style={{ background: s.color }}
        />
      ) : null}
      {s.label}
    </span>
  );
}

function justWatchUrl(film: string, year: number): string {
  const q = encodeURIComponent(`${film} ${year}`);
  return `https://www.justwatch.com/us/search?content_type=movie&q=${q}`;
}

export function StreamingPlaylist() {
  // count titles with a free option for the headline stat
  const freeCount = WATCHLIST.filter((w) =>
    w.options.some((opt) => SERVICES[opt].free),
  ).length;

  return (
    <section className="relative bg-[#0A0F11] py-32 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::THE PLAYLIST · WHERE TO WATCH
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Twelve films.{" "}
            <span className="text-[#22F0D5]">{freeCount} free, today.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            Current streaming homes for every AI moment in the monograph.
            Free-option titles are flagged so the no-cost watches surface
            first. The exact catalog shifts often — the JustWatch link on
            every row resolves to live, current-as-of-today availability.
          </p>

          {/* legend */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              legend ·
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              <span className="inline-block size-1.5 rounded-full bg-[#22F0D5]" />
              free at view
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              · paid sub
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              · rental ≈ $3–$5
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#1A2225]">
          <div className="hidden border-b border-[#1A2225] bg-black px-6 py-3 md:grid md:grid-cols-[1fr_2fr_140px] md:items-center md:gap-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              title
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              where to watch
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              live availability
            </p>
          </div>

          {WATCHLIST.map((w, i) => {
            const isFree = w.options.some((opt) => SERVICES[opt].free);
            return (
              <article
                key={`${w.film}-${w.year}`}
                className={`grid gap-4 px-6 py-6 md:grid-cols-[1fr_2fr_140px] md:items-center md:gap-6 ${
                  i % 2 === 0 ? "bg-[#0A0F11]" : "bg-black"
                }`}
              >
                {/* title col */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-medium leading-tight text-[#F2F4F5]">
                      {w.film}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
                      {w.year}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {isFree ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#22F0D5] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-black">
                        FREE
                      </span>
                    ) : null}
                    {w.publicDomain ? (
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]/70">
                        US public domain
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* services col */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {w.options.map((k) => (
                      <ServiceChip key={k} k={k} />
                    ))}
                  </div>
                  {w.note ? (
                    <p className="text-xs leading-relaxed text-[#9BA5A7]">
                      {w.note}
                    </p>
                  ) : null}
                </div>

                {/* justwatch col */}
                <div className="md:text-right">
                  <Link
                    href={justWatchUrl(w.film, w.year)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:text-[#F2F4F5]"
                  >
                    JustWatch →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* attribution doctrine — streaming services */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::why no studio stills
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
              Film stills remain under active studio copyright for{" "}
              <span className="text-[#F2F4F5]">95 years</span> after creation
              in the US. Wikipedia and Wikimedia host individual stills under
              documented fair-use rationale for encyclopedic use — that
              rationale does not transfer to a commercial site embedding the
              same image. The clean path for the lab is original visual
              interpretation plus an outbound link to the rights-cleared
              canonical archive. The frames above the playlist are the
              lab&apos;s own art.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
              ::why brand names are safe
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
              Streaming-service names and brand colors used here are
              referential — they name the service so the viewer can find
              it. This is{" "}
              <span className="text-[#F2F4F5]">nominative fair use</span>{" "}
              under US trademark law (a service can be named to identify it,
              without permission, when no logo reproduction is involved).
              The chips above are plain colored text — no copyrighted logos
              are reproduced.
            </p>
          </div>
        </div>

        {/* footer — JustWatch attribution */}
        <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          live availability via{" "}
          <Link
            href="https://www.justwatch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#22F0D5] hover:text-[#F2F4F5]"
          >
            JustWatch →
          </Link>{" "}
          · catalogs shift weekly · the lab does not affiliate-link any of
          these services
        </p>
      </div>
    </section>
  );
}
