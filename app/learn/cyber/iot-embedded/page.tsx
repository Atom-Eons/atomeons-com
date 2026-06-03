import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "IoT and Embedded Device Security · /learn/cyber/iot-embedded · AtomEons",
  description: "Embedded devices outnumber traditional computers by an order of magnitude. Most ship with default credentials, no update channel, and a 10-year service life. The attack surface is the physical world.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/iot-embedded" },
  openGraph: {
    title: "IoT and Embedded Device Security",
    description: "From Mirai to pacemakers — when computers escape the data center, the threat model changes",
    url: "https://atomeons.com/learn/cyber/iot-embedded",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="modern" alt="From Mirai to pacemakers — when computers escape the data center, the threat model changes" />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> IoT and Embedded Device Security
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            From Mirai to pacemakers — when computers escape the data center, the threat model changes
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            IoT and Embedded Device Security
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            Embedded devices outnumber traditional computers by an order of magnitude. Most ship with default credentials, no update channel, and a 10-year service life. The attack surface is the physical world.
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
              {`## The Mirai wake-up call (2016)`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`On October 21, 2016, a botnet built almost entirely from compromised IP cameras, DVRs, and home routers took down Dyn, a major DNS provider, knocking Twitter, Reddit, Netflix, GitHub, and Spotify offline across the U.S. East Coast. The botnet was Mirai, and its propagation method was embarrassingly simple: scan the IPv4 space for telnet on port 23, try a list of 62 default credential pairs (root/root, admin/admin, root/xc3511), and recruit anything that answered. The authors — Paras Jha, Josiah White, and Dalton Norman — were college-age and originally built it to attack Minecraft DDoS-protection services. They pled guilty in December 2017 (DOJ press release: justice.gov/opa/pr/justice-department-announces-charges-and-guilty-pleas-three-computer-crime-cases). The source code was leaked on Hackforums in September 2016 and has since been forked into hundreds of variants. Mirai proved that low-quality embedded devices are a strategic threat, not a hobbyist annoyance.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"02"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Default credentials and the credential-stuffing pipeline`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The structural problem Mirai exploited still exists. Manufacturers ship devices with universal default credentials documented in user manuals that are also indexed by Google. California SB-327 (effective January 2020) banned this practice for connected devices sold in the state — every device must ship with either a unique per-device password or force a password change on first use (leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB327). The UK followed with the Product Security and Telecommunications Infrastructure Act 2022. But enforcement is weak, and Shodan (shodan.io) still indexes hundreds of thousands of devices answering on default credentials. Hardcoded credentials — the kind compiled into firmware that the user cannot change — are worse: CISA has issued dozens of advisories about hardcoded root passwords in industrial control systems, medical devices, and consumer routers. The fix is supply-chain discipline, not regulation alone.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"03"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Medical device security and Barnaby Jack`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Barnaby Jack, a New Zealand-born security researcher, made medical device insecurity unavoidable. At Black Hat USA 2010 he demonstrated "Jackpotting" — making two different ATMs spit cash on stage. In 2011 he showed wireless attacks against insulin pumps, sending unauthorized dosing commands from up to 300 feet away. In 2012 he demonstrated remote pacemaker attacks capable of delivering an 830-volt shock. He was scheduled to present pacemaker work at Black Hat 2013 but died one week before the talk. His work directly drove FDA action. The FDA's 2014 premarket cybersecurity guidance and the substantially expanded 2023 final guidance (fda.gov/regulatory-information/search-fda-guidance-documents/cybersecurity-medical-devices-quality-system-considerations-and-content-premarket-submissions) now require an SBOM, threat modeling, and a vulnerability disclosure process for any premarket submission. The PATCH Act, folded into the 2023 Consolidated Appropriations Act, gave FDA explicit statutory authority over device cybersecurity.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"04"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Automotive: Jeep, Tesla, and the CAN bus problem`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`In July 2015, Charlie Miller and Chris Valasek remotely took control of a Jeep Cherokee driven by Wired's Andy Greenberg on a St. Louis highway — disabling transmission, brakes, and steering — by chaining a vulnerability in the Sprint-connected Uconnect head unit through to the CAN bus (wired.com/2015/07/hackers-remotely-kill-jeep-highway). Chrysler recalled 1.4 million vehicles. The Jeep hack proved that infotainment and safety-critical systems sharing a bus is a defect, not a feature. Tesla key-fob relay attacks have been demonstrated repeatedly — KU Leuven researchers Lennert Wouters and team broke the Model S Passive Keyless Entry crypto in 2018 and the Model X in 2020 (esat.kuleuven.be/cosic/news/dismantling-tesla-passive-keyless-entry-and-start-system). The industry's response — ISO/SAE 21434 for road vehicle cybersecurity engineering, UN R155 type approval — is now mandatory for new vehicle types in UNECE-aligned markets.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"05"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Industrial IoT and the OT/IT collision`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Industrial IoT collapses the old air gap between operational technology and corporate IT. Stuxnet (2010) was the proof of concept — a U.S./Israeli operation that crossed an air gap via USB to destroy Iranian centrifuges at Natanz. Triton/Trisis (2017) targeted Schneider Electric Triconex safety instrumented systems at a Saudi petrochemical plant, attempting to disable safety shutdowns; FireEye/Mandiant attributed it to a Russian government research institute (TsNIIKhM), and Treasury sanctioned the institute in October 2020 (home.treasury.gov/news/press-releases/sm1162). Colonial Pipeline (May 2021) was not OT compromise — DarkSide hit billing systems — but Colonial shut OT preemptively because the OT/IT boundary was unclear. CISA's ICS advisories at cisa.gov/news-events/cybersecurity-advisories/ics-advisories are the canonical feed for tracked OT vulnerabilities. The IEC 62443 series is the working standard.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"06"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Firmware, SBOMs, and the update channel problem`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Most embedded devices ship without a working update channel. A camera built in 2015 running Linux 2.6 with a vulnerable BusyBox will run that exact stack until the device is unplugged — usually 8-15 years. The U.S. Executive Order 14028 (May 2021) mandated SBOMs for federal software procurement; NTIA's SBOM minimum elements (ntia.gov/files/ntia/publications/sbom_minimum_elements_report.pdf) defined what counts. Tools: binwalk for firmware extraction, EMBA (github.com/e-m-b-a/emba) for automated firmware security analysis, FACT (fkie-cad.github.io/FACT_core) for large-scale firmware inspection. UL 2900-1 and 2900-2 (medical) provide third-party testable criteria. The hard problem isn't measurement — it's making 10-year-old devices in service today actually patchable, which usually means replacing them.`}
            </div>
          </article>

          <article key={6}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"07"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Building hardware that won't get owned`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Defensive embedded engineering is well understood and rarely practiced. Secure boot with a hardware root of trust (ARM TrustZone, Intel Boot Guard, dedicated TPMs). Unique per-device credentials provisioned at manufacture. Signed firmware updates over an authenticated channel. Minimal attack surface — no telnet, no UPnP-by-default, no debug interfaces in production builds. Hardware fuses to lock JTAG after provisioning. A documented vulnerability disclosure process with security.txt. A real SBOM. A defined end-of-life date in the spec sheet so buyers can plan replacement. The NIST IR 8259 series (nvlpubs.nist.gov/nistpubs/ir/2020/NIST.IR.8259.pdf) is the baseline reference for IoT device manufacturers. ENISA's Good Practices for IoT Security covers the European framing.`}
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
              {`- Andy Greenberg, *Sandworm* (Doubleday, 2019) — Triton, NotPetya, and the GRU's industrial-attack program
- Kim Zetter, *Countdown to Zero Day* (Crown, 2014) — Stuxnet, told end to end
- Brian Krebs, "Who is Anna-Senpai, the Mirai Worm Author?" — krebsonsecurity.com/2017/01/who-is-anna-senpai-the-mirai-worm-author
- FDA Premarket Cybersecurity Guidance (2023) — fda.gov/regulatory-information/search-fda-guidance-documents/cybersecurity-medical-devices-quality-system-considerations-and-content-premarket-submissions
- CISA ICS Advisories — cisa.gov/news-events/cybersecurity-advisories/ics-advisories
- NIST IR 8259 (Foundational Cybersecurity Activities for IoT Device Manufacturers) — nvlpubs.nist.gov/nistpubs/ir/2020/NIST.IR.8259.pdf`}
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
