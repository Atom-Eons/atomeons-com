import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Mobile Security · /learn/cyber/mobile-security · AtomEons",
  description: "The phone is the highest-value endpoint most organizations defend worst. Platform vendors do heavy lifting; users and admins still close the gap.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/mobile-security" },
  openGraph: {
    title: "Mobile Security",
    description: "Pocket computers carry corporate keys, banking sessions, and signal intelligence targets.",
    url: "https://atomeons.com/learn/cyber/mobile-security",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="labs" alt="Pocket computers carry corporate keys, banking sessions, and signal intelligence targets." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Mobile Security
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Pocket computers carry corporate keys, banking sessions, and signal intelligence targets.
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Mobile Security
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            The phone is the highest-value endpoint most organizations defend worst. Platform vendors do heavy lifting; users and admins still close the gap.
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
              {`## The hardware root of trust`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`iOS and modern Android stake everything on a hardware-isolated security processor. Apple's Secure Enclave is a separate coprocessor on the A-series and M-series SoC running its own kernel (sepOS), holding the device UID fused at manufacture, and gating Face ID, Touch ID, and key material. Apple's Platform Security Guide (https://support.apple.com/guide/security/welcome/web) is the canonical reference. On Android, the analogous component is the Titan M2 on Pixel and StrongBox-backed Keystore on most flagships, with Trusty TEE running on ARM TrustZone. The practical effect: even with full root on the application processor, an attacker cannot extract the device key or brute-force the user passcode without rate-limiting from a separate chip.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"02"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`iOS: sandbox, signing, and the closed loop`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Every iOS app runs inside a sandbox (App Sandbox / Seatbelt) with entitlements declared at signing time. Code signing is mandatory; the kernel refuses to execute unsigned pages, which is why iOS jailbreaks historically required a kernel exploit plus a code-signing bypass. App Store review and the notarization pipeline add a human and automated gate before binaries reach users. The 2021 introduction of BlastDoor (Samuel Gross, Project Zero, https://googleprojectzero.blogspot.com/2021/01/a-look-at-imessage-in-ios-14.html) re-architected iMessage parsing into a tightly sandboxed Swift service specifically to kill the zero-click attack class. Lockdown Mode, shipped in iOS 16, disables JIT, link previews, attachment types, and configuration profiles — accepting a worse UX for a smaller attack surface.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"03"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Android: verified boot, SELinux, and Play Protect`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Android Verified Boot (AVB) chains trust from the bootloader through every partition, rolling back compromised devices on boot. SELinux runs in enforcing mode, partitioning system, vendor, and app domains so that a compromised app cannot trivially escalate. Project Mainline (https://source.android.com/docs/core/ota/modular-system) ships security-critical modules — media codecs, conscrypt, DNS resolver — through Play Store rather than carrier OTAs, closing the historical "Stagefright patched in three months if you're lucky" gap. Play Protect scans 125 billion installed apps daily per Google's 2024 report (https://security.googleblog.com/2024/04/google-protects-your-accounts-even-when.html). The Android Security Bulletin (https://source.android.com/docs/security/bulletin) publishes monthly CVE-level disclosure; Pixel patches arrive day-of, OEM patches arrive whenever.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"04"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`MDM: managing fleets without owning them`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Microsoft Intune, Jamf Pro (Apple-only, the de facto standard for Mac and iOS fleets), and VMware Workspace ONE are the three platforms most enterprises run. They use Apple's MDM protocol or Android Enterprise APIs to push configuration profiles, enforce passcode policy, install managed apps, wipe lost devices, and segment work data via Work Profiles (Android) or User Enrollment (iOS). The hard problem is BYOD: an employee owns the device, so the MDM has to manage corporate data without surveilling personal apps. Apple's User Enrollment and Android's Work Profile both implement cryptographic separation — managed apps cannot read personal data, IT cannot read personal apps. The 2024 NIST SP 800-124 Rev 2 (https://csrc.nist.gov/pubs/sp/800/124/r2/final) is the current federal guidance.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"05"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`NSO Pegasus and the zero-click era`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Pegasus, sold by Israeli vendor NSO Group, became the canonical mobile mercenary spyware after Citizen Lab's 2016 disclosure of the Trident exploit chain against UAE dissident Ahmed Mansoor (https://citizenlab.ca/2016/08/million-dollar-dissident-iphone-zero-day-nso-group-uae/). The FORCEDENTRY chain analyzed by Project Zero in 2021 (https://googleprojectzero.blogspot.com/2021/12/a-deep-dive-into-nso-zero-click.html) — an integer overflow in CoreGraphics JBIG2 parsing inside iMessage, escalated via a virtual CPU built out of JBIG2 boolean operators — is one of the most technically impressive offensive engineering writeups ever published. The US Commerce Department added NSO to the Entity List in November 2021. Pegasus is the reason Lockdown Mode exists.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"06"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Operation Triangulation`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Kaspersky's June 2023 disclosure of Operation Triangulation (https://securelist.com/operation-triangulation/109842/), affecting Kaspersky's own employees' iPhones, revealed a four-vulnerability iMessage chain abusing an undocumented hardware feature — a debug interface in the Apple SoC that bypassed the page protection layer (CVE-2023-38606). Boris Larin's Chaos Communication Congress talk laid out the chain in full. The campaign had run for years undetected. The lesson for defenders: even fully patched, attended-by-experts iPhones get owned by nation-state chains, and the only mitigation in real time is the network telemetry that revealed Triangulation in the first place.`}
            </div>
          </article>

          <article key={6}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"07"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Android banking trojans`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Cerberus, leaked publicly in 2020 after its operators tried to auction the source for $100K, spawned the Alien, ERMAC, Hook, and Octo families that still dominate Android banking fraud. They abuse Accessibility Services to read screen contents, inject overlay attacks on banking apps, and intercept SMS 2FA. ThreatFabric's quarterly mobile threat reports (https://www.threatfabric.com/blog) track the lineage. The 2023 Anatsa campaign distributed through Google Play droppers infected 30,000+ devices before takedown. Defense is mostly platform-side: Play Protect heuristics, restricted Accessibility access for sideloaded apps in Android 13+, and Google's 2024 anti-fraud restrictions on sideload-installed apps in pilot markets.`}
            </div>
          </article>

          <article key={7}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"08"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`SIM swap and the carrier weak link`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The phone number, treated as an authenticator since SMS 2FA went mainstream, is owned by the carrier, not the user. SIM-swap fraud — convincing or bribing a carrier rep to port a number to an attacker-controlled SIM — drained $72M from US victims in 2023 per the FBI IC3 report (https://www.ic3.gov/Media/PDF/AnnualReport/2023_IC3Report.pdf). Joseph Cox's reporting in 404 Media (https://www.404media.co/) and his book *Dark Wire* document the criminal economy around T-Mobile insider access. Mitigation: move every account possible off SMS 2FA, use carrier port-out PINs, and treat SMS as a notification channel, not an authentication factor.`}
            </div>
          </article>

          <article key={8}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"09"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`BYOD and the expanding surface`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The 2020s phone holds Slack, Teams, Okta Verify, Authy, the corporate VPN client, customer PII in email, and the SSH key the engineer uses to push to production. Verizon's 2024 Mobile Security Index (https://www.verizon.com/business/resources/reports/mobile-security-index/) reports 53% of organizations suffered a mobile-related compromise in the prior year. The defensive playbook is unglamorous: enforce MDM enrollment for any device touching corporate data, require passcode and biometric, mandate OS version floors, scope BYOD access to managed apps only, and run a mobile threat defense (MTD) product — Lookout, Zimperium, Wandera — for jailbreak/root detection and network anomaly alerts.`}
            </div>
          </article>

          <article key={9}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"10"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Where to read more`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- Apple Platform Security Guide — https://support.apple.com/guide/security/welcome/web
- Android Source — Security — https://source.android.com/docs/security
- Citizen Lab Pegasus archive — https://citizenlab.ca/category/research/targeted-threats/
- Project Zero on FORCEDENTRY — https://googleprojectzero.blogspot.com/2021/12/a-deep-dive-into-nso-zero-click.html
- Kaspersky Operation Triangulation — https://securelist.com/operation-triangulation/109842/
- ThreatFabric mobile threat reports — https://www.threatfabric.com/blog
- NIST SP 800-124 Rev 2 — https://csrc.nist.gov/pubs/sp/800/124/r2/final`}
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
