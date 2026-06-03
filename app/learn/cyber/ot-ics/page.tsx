import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Operational Technology and Industrial Control Systems · /learn/cyber/ot-ics · AtomEons",
  description: "OT/ICS is the layer of computing that runs the physical world. Compromise here is not data loss. It is a cracked pipe, a tripped grid, a poisoned reservoir.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/ot-ics" },
  openGraph: {
    title: "Operational Technology and Industrial Control Systems",
    description: "Where bits meet turbines, valves, and centrifuges — and why the air-gap is a myth.",
    url: "https://atomeons.com/learn/cyber/ot-ics",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="platforms" alt="Where bits meet turbines, valves, and centrifuges — and why the air-gap is a myth." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Operational Technology and Industrial Control Systems
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Where bits meet turbines, valves, and centrifuges — and why the air-gap is a myth.
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Operational Technology and Industrial Control Systems
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            OT/ICS is the layer of computing that runs the physical world. Compromise here is not data loss. It is a cracked pipe, a tripped grid, a poisoned reservoir.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-14">
          <article key={0}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"01"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`## Why OT is its own discipline`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`IT security defends confidentiality first. OT security defends safety and availability first — in that order. A patch that reboots a Windows file server during business hours is an inconvenience. The same patch on a Siemens S7 PLC controlling a refinery flare can cause a process upset, a hazardous release, or a regulator-defined incident. The CIA triad inverts to AIC. Patch windows are measured in years, not weeks. Vendor-signed firmware on a turbine governor may date to 2008 and still be the latest available. CISA's published guidance for ICS owners (cisa.gov/topics/industrial-control-systems) treats this constraint as the design reality, not a failure to modernize.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"02"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The Purdue Reference Architecture`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The Purdue Enterprise Reference Architecture, originally from the Purdue University Consortium for CIM in the early 1990s and adopted into ISA-95 / IEC 62443, divides plant networks into levels 0-5: physical process at L0, sensors and actuators at L1, control systems (PLCs, RTUs) at L2, supervisory (HMI, historians) at L3, plant operations (MES) at L3.5, enterprise IT at L4-5. The model assumes that traffic across level boundaries is mediated by conduits — firewalls, data diodes, jump hosts. Real plants almost always violate the model: a vendor laptop bridging L2 to a 4G dongle, a historian replicated up to corporate, an engineering workstation dual-homed for convenience. The architecture is a target, not a description.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"03"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Stuxnet — the canonical case`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Discovered in June 2010 by VirusBlokAda and reverse-engineered publicly by Symantec (Falliere, Murchu, Chien — w32_stuxnet_dossier.pdf), Stuxnet was the first weaponized cyber-physical attack publicly attributed to nation-state operators. It used four zero-days, two stolen code-signing certificates (Realtek, JMicron), and a payload that specifically targeted Siemens Step7 software programming Vacon and Fararo Paya frequency converters running at the rotational frequencies of Natanz IR-1 centrifuges. It worked because the "air-gapped" enrichment plant was bridged by removable media. Kim Zetter's *Countdown to Zero Day* (Crown, 2014) remains the definitive narrative account. The lesson is not that air-gaps fail occasionally — it is that they fail by design, because humans need to move data across them.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"04"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Triton / Trisis — attacking the safety layer`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`In August 2017 a petrochemical plant in Saudi Arabia (later confirmed by FireEye/Mandiant as Petro Rabigh) experienced two unplanned shutdowns. Investigation by FireEye, Dragos, and Schneider Electric revealed malware later named TRITON (Dragos calls it TRISIS) targeting Schneider Triconex Safety Instrumented Systems — the equipment of last resort that trips a plant to safe-state when something is about to explode. The malware re-programmed the SIS to allow unsafe states while spoofing healthy readings upstream. Mandiant's October 2018 report attributed the operation to a Russian government research institute (the Central Scientific Research Institute of Chemistry and Mechanics — CNIIHM). DOJ indicted personnel in 2022 (justice.gov press release 2022-03-24). Triton crossed a line Stuxnet did not: it directly attacked the safety net intended to prevent loss of life.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"05"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`CrashOverride / Industroyer — taking down a grid`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`December 17, 2016. Pivnichna substation, Kyiv. Roughly a fifth of the city loses power for about an hour. ESET's Anton Cherepanov and Dragos's Robert M. Lee published independent analyses in June 2017 describing the malware framework — Industroyer (ESET) / CrashOverride (Dragos) — that caused it. Unlike the 2015 Ukrainian grid attack (which used BlackEnergy plus operators manually flipping breakers via hijacked HMIs), Industroyer spoke IEC 60870-5-101, IEC 60870-5-104, IEC 61850, and OPC DA natively. It did not need humans in the loop. Industroyer2 appeared in April 2022 during the full-scale invasion and was caught by ESET and CERT-UA before successful detonation. Read the Dragos CRASHOVERRIDE Analysis of the Threat to Electric Grid Operations white paper (dragos.com/wp-content/uploads/CrashOverride-01.pdf) for the primary source.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"06"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Colonial Pipeline — the IT/OT confusion`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`On May 7, 2021, Colonial Pipeline shut down 5,500 miles of fuel pipeline because their billing system — a corporate IT asset, not the pipeline control system — was hit by DarkSide ransomware. The OT was not compromised. They shut down anyway, because if you can't bill for fuel, you can't legally ship it, and because the operators could not be certain the ransomware would stay corporate-side. The CEO testified before Senate Homeland Security (June 8, 2021 hearing transcript). It is the cleanest public case study of how IT-OT segmentation failures produce OT consequences without OT compromise.`}
            </div>
          </article>

          <article key={6}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"07"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The vendor ecosystem`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`A handful of specialist firms own the OT detection category. Dragos (Robert M. Lee, founded 2016, Hanover MD) ships a passive monitoring platform plus threat-intel feed indexed against named adversary groups (ELECTRUM, XENOTIME, CHERNOVITE). Claroty (Tel Aviv / NY) emerged from Team8 and focuses on asset discovery and vulnerability management. Nozomi Networks (San Francisco / Mendrisio) competes on the same passive-network-monitoring axis with a heavier OEM-bundling strategy. Above them, CISA's ICS-CERT (now folded into CISA) publishes the canonical advisory feed at cisa.gov/news-events/cybersecurity-advisories — read it weekly if you work in this space.`}
            </div>
          </article>

          <article key={7}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"08"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Where to read more`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- Kim Zetter, *Countdown to Zero Day* (Crown, 2014) — Stuxnet, narrative.
- Andy Greenberg, *Sandworm* (Doubleday, 2019) — Ukrainian grid, NotPetya, Industroyer.
- Robert M. Lee + Dragos year-in-review reports — dragos.com/year-in-review.
- ISA/IEC 62443 series — the actual standard, not a summary of it.
- Joe Slowik (DomainTools, formerly Dragos) — public writeups on Industroyer and Triton; some of the sharpest primary technical analysis in the field.
- SANS ICS curriculum (ICS410, ICS515, ICS612) — sans.org/cyber-security-courses/?focus-area=industrial-control-systems-security — expensive, but the field's de-facto credentialing path.`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← cyber index
          </Link>
        </div>
      </section>
    </main>
  );
}
