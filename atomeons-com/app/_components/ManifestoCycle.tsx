"use client";

import { useEffect, useState } from "react";

const TENETS: { n: number; text: string }[] = [
  { n: 1, text: "We do not rebel for noise. We rebel against false structure." },
  {
    n: 2,
    text: "The misfit is not outside the system because they are broken; the misfit is outside because they can still see the system.",
  },
  {
    n: 4,
    text: "We reject simulated abundance: fake breadth, fake capability, fake motion, fake intelligence, fake care.",
  },
  {
    n: 8,
    text: "The misfit's job is to find the option nobody else can name yet.",
  },
  {
    n: 11,
    text: "No theater. No engagement farming. No dopamine trap. No false universe.",
  },
  {
    n: 13,
    text: "Protect the human operator from extraction, manipulation, dependency, and machine authority creep.",
  },
  {
    n: 15,
    text: "The misfit is not a market segment; the misfit is proof that the old interface failed.",
  },
  {
    n: 16,
    text: "Sovereignty first. Meaning second. Beauty third. Expansion last.",
  },
  { n: 17, text: "A real command loop beats a thousand imaginary features." },
];

export function ManifestoCycle({ intervalMs = 7000 }: { intervalMs?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => (p + 1) % TENETS.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  const tenet = TENETS[i];
  return (
    <figure className="border-l-2 border-[#ff7a18] py-3 pl-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
        [ MFT.tenet:{tenet.n.toString().padStart(2, "0")} ]
      </div>
      <blockquote
        key={tenet.n}
        className="mt-3 text-balance text-xl font-semibold leading-tight text-[#f7f0e4] md:text-2xl"
        style={{ animation: "fadeInUp 0.6s ease-out" }}
      >
        {tenet.text}
      </blockquote>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1b8b75]">
        atomeons / misfit manifesto · ::recovered
      </figcaption>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </figure>
  );
}
