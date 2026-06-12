import type { Metadata } from "next";
import Link from "next/link";
import { RouteSigil } from "../_components/V3/RouteSigil";

export const metadata: Metadata = {
  title: "Studio · the atelier · AtomEons",
  description:
    "The atelier. The room where the work happens. Slower than /lab, more personal. The objects in the studio that have nothing to do with software and everything to do with how the operator stays grounded.",
  alternates: { canonical: "https://atomeons.com/studio" },
};

/**
 * /studio — the quieter, more personal cousin of /lab.
 *
 * /lab is the practical workspace: hardware, software, daily routine.
 * /studio is the OTHER stuff. Things in the room that don't appear in
 * any product spec but are part of the texture of working there. The
 * coffee setup. The view. The objects on the desk.
 *
 * Light on data, heavy on prose. A reading page, not a reference page.
 */

const OBJECTS = [
  { what: "An ÆoNs notebook · cream Leuchtturm1917 · 240 pages", note: "Receives the day's drawing-on-paper pass. Most of the lab's diagrams start here before they exist in code." },
  { what: "A small black mechanical pencil · Pentel GraphGear 1000", note: "Twenty-seven years old. Same pencil since high school. The point is reliable; the point is also memorial." },
  { what: "A V60 + scale + grinder", note: "The morning ritual. The lab does not run on espresso. Pour-over takes 240 seconds; the 240 seconds matter." },
  { what: "A small painting · oil on canvas · 8×10 inches", note: "Painted by the operator's grandfather. A pelican on the Gulf at sunset. Hangs to the left of the monitor." },
  { what: "A worn Daily Stoic by Ryan Holiday", note: "Open at whatever date it's open at. Not a daily ritual; a passing visit." },
  { what: "An astrolabe · brass · ~1930s reproduction", note: "Mostly decorative. Sometimes the operator tunes the rete and just looks at it for a while." },
  { what: "A glass orb · refraction toy", note: "Catches the western light at 4:30pm. Throws spectrum onto the wall. The eye needs places that aren't a screen." },
  { what: "A small sumi-e ink stone + brush", note: "For when the lab's diagrams need to be drawn by an analog hand to be understood. A few times a year." },
  { what: "An open window · most of the year", note: "Marco Island. The Gulf is a 4-minute walk. The window is the cheapest piece of equipment in the room." },
  { what: "Headphones · Beyerdynamic DT 770 Pro · 80Ω", note: "For the post-9pm shift. Open-back would be better acoustically; closed-back is better when the family is sleeping." },
];

const RITUALS = [
  { time: "06:30", what: "Wake. Walk to window. Open it. Pour water." },
  { time: "07:00", what: "Walk the seawall · 25 minutes · no phone in the pocket." },
  { time: "08:00", what: "Pour-over · 240 seconds · sit · read overnight intel for 30 min from the cream notebook page set aside for it." },
  { time: "21:00", what: "Headphones on if working past dark. Lights low. Most of the lab's deepest passes happen here." },
  { time: "23:00", what: "Phone off. Paper book on the side table. Sleep early enough to wake at 06:30." },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="flex items-baseline gap-4">
            <RouteSigil slug="/studio" size={28} accent="#22F0D5" />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ studio · the atelier</p>
          </div>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The room where the work happens.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Quieter than /lab. The objects on the desk that have
            nothing to do with software and everything to do with how
            the operator stays grounded. The texture of working here.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ objects in the room</p>
          <ol className="mt-10 space-y-7">
            {OBJECTS.map((o, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-serif text-[18px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{o.what}</p>
                <p className="mt-3 font-serif text-[15px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{o.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ daily rituals · the slower hours</p>
          <ol className="mt-10 space-y-4">
            {RITUALS.map((r, i) => (
              <li key={i} className="grid grid-cols-[80px_1fr] items-baseline gap-6 border-b border-[#1F242B] pb-3">
                <p className="font-mono text-[14px] tabular-nums tracking-[0.05em] text-[#22F0D5]">{r.time}</p>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#C9A55C] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ on why this page exists</p>
            <p className="mt-4 font-serif text-[17px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Most one-operator labs publish a manifesto and a stack and
              call it identity. The manifesto is the doctrine. The stack
              is the dependencies. Neither is the room the work happens
              in. The room is also identity. The pelican painting and
              the V60 and the open window matter to what gets shipped
              even though none of them appear in the changelog.
            </p>
            <p className="mt-5 font-serif text-[17px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              If you build software, you have a room too. What's in it
              matters. The lab's stack page tells you what software does
              the work. This page tells you what does the operator.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { href: "/lab", label: "Lab · workspace" },
              { href: "/library", label: "Library · books" },
              { href: "/listening", label: "Listening · music" },
              { href: "/signature", label: "Signature · the mark" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
