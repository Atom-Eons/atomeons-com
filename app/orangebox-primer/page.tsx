import Link from "next/link";

export const metadata = {
  title: "Orangebox Primer — A Local-First Compression Layer for Claude",
  description:
    "A primer for security leads evaluating Orangebox: code-signed Windows installer, SHA-256 stamped binary, 10-80x context compression, tamper-evident receipts, BYO key, no SaaS. Built by one operator in Marco Island, FL.",
  openGraph: {
    title: "Orangebox Primer — Why a one-operator installer beats a SaaS dashboard",
    description:
      "For CISOs and red-team leads at federal contractors. Read before procurement.",
  },
};

export default function OrangeboxPrimerPage() {
  return (
    <main
      style={{ backgroundColor: "#08090B", color: "#F4F4F2" }}
      className="min-h-screen"
    >
      {/* ------------------------------------------------------------------ */}
      {/* NAV BAR */}
      {/* ------------------------------------------------------------------ */}
      <header
        style={{ borderBottom: "1px solid #1F242B", backgroundColor: "#08090B" }}
        className="sticky top-0 z-50 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            style={{ fontFamily: "Inter Variable, Inter, sans-serif", color: "#F4F4F2" }}
            className="text-sm font-medium tracking-tight"
          >
            AtomEons
          </Link>
          <nav className="flex items-center gap-6 text-xs" style={{ color: "#9CA3AF" }}>
            <Link href="/orangebox" className="hover:text-white">
              Product
            </Link>
            <Link href="/research" className="hover:text-white">
              Research
            </Link>
            <Link href="/cyber" className="hover:text-white">
              Cyber
            </Link>
            <Link
              href="/orangebox"
              style={{
                backgroundColor: "#22F0D5",
                color: "#08090B",
                fontFamily: "Inter Variable, Inter, sans-serif",
              }}
              className="rounded px-3 py-1.5 text-xs font-semibold"
            >
              Get the installer
            </Link>
          </nav>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-24">
        <div
          style={{ color: "#22F0D5", fontFamily: "ui-monospace, monospace" }}
          className="mb-6 text-xs uppercase tracking-widest"
        >
          PRIMER — REV 06.03.2026 — SHA-256 stamped
        </div>
        <h1
          style={{
            fontFamily: "Inter Variable, Inter, sans-serif",
            color: "#F4F4F2",
            lineHeight: 1.05,
          }}
          className="mb-8 text-5xl font-medium tracking-tight md:text-6xl"
        >
          A code-signed Windows installer that compresses Claude's context 10
          to 80 times. Built by one operator in Marco Island in 75 days.
        </h1>
        <p
          style={{
            fontFamily: "Newsreader, Georgia, serif",
            color: "#9CA3AF",
            lineHeight: 1.6,
          }}
          className="mb-12 max-w-3xl text-xl"
        >
          This page is the primer. It is written for a CISO or red-team lead at a
          federal contractor who has a procurement form open and a healthy
          suspicion of indie tooling. Read it like a vendor security review. Every
          claim below carries the receipt that falsifies it.
        </p>

        <div
          style={{ borderTop: "1px solid #1F242B", borderBottom: "1px solid #1F242B" }}
          className="grid grid-cols-2 gap-x-8 gap-y-4 py-6 md:grid-cols-4"
        >
          {[
            ["Operator", "1"],
            ["Build days", "75"],
            ["Guardrails audited", "27"],
            ["Papers shipped", "31"],
          ].map(([label, value]) => (
            <div key={label}>
              <div
                style={{ color: "#5A6068", fontFamily: "ui-monospace, monospace" }}
                className="mb-1 text-[10px] uppercase tracking-widest"
              >
                {label}
              </div>
              <div
                style={{
                  color: "#F4F4F2",
                  fontFamily: "Inter Variable, Inter, sans-serif",
                }}
                className="text-2xl font-medium"
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 — THE SKEPTICISM */}
      {/* ------------------------------------------------------------------ */}
      <Section number="01" title="The skepticism, stated plainly">
        <P>
          You are reading this because someone forwarded you an installer signed
          by a single operator in Florida and asked whether your contractor org
          can run it on a workstation that touches CUI. The honest reaction is
          no. The next reaction should be: prove it.
        </P>
        <P>
          The threat model for a one-person tool is not the same as the threat
          model for a SaaS dashboard, and it is not strictly worse. A SaaS
          dashboard is a remote agent inside your perimeter that updates without
          your consent, holds your prompts on infrastructure you cannot audit,
          and routes your API traffic through an envelope you did not sign.
          Orangebox is a local binary. It does what the installer says it does
          on the disk you control. The trust surface is finite and inspectable.
        </P>
        <P>
          The rest of this document is the inspection.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 — WHAT IT IS */}
      {/* ------------------------------------------------------------------ */}
      <Section number="02" title="What Orangebox actually is">
        <P>
          Orangebox is a Windows executable that runs locally on the operator
          workstation and acts as a context-compression and routing layer
          between the operator and the Anthropic Claude API. It does not host
          models. It does not proxy traffic through a third-party server. The
          operator's Anthropic key is read from a local environment variable
          and used directly against api.anthropic.com over the operator's own
          egress.
        </P>
        <P>
          The compression layer is called Crystal Lattice Compression. It
          encodes a conversation, document, or memory corpus as a lattice of
          entities, facts, decisions, and relationships plus a void map of
          rejections, boundaries, corrections, tone, and depth. Measured
          compression ratio on dense conversational source running roughly 300
          tokens per message reaches 282x on the high end of the corpus and
          settles at a 10-80x working range for mixed material. The disclosure
          ID is ATOM-CLC-2026-0331. The math is published.
        </P>
        <P>
          On top of the compression layer Orangebox runs a 14-department
          routing graph that takes an operator request, selects the
          departments it should pass through, and emits a tamper-evident
          receipt at every hop. Persistent memory across sessions is handled
          by a local lattice store; reusable skill primers live in a local
          skills directory the operator owns outright.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 — CODE-SIGNING CHAIN */}
      {/* ------------------------------------------------------------------ */}
      <Section number="03" title="Code-signing chain and tamper evidence">
        <P>
          The Windows installer ships with an Authenticode signature issued to
          AtomEons Systems Laboratory. The signature is verifiable through
          standard Windows trust paths: right-click the .exe, Properties,
          Digital Signatures, view certificate, walk the chain to the issuing
          CA. The signature embeds a timestamp from a public RFC 3161 timestamp
          authority so revocation of the leaf cert does not invalidate
          installers that were signed before the revocation date.
        </P>
        <P>
          The binary itself is SHA-256 stamped. The stamp is published next to
          the download. A red-team workstation can compute the SHA-256 of the
          downloaded file with PowerShell Get-FileHash and compare to the
          published value before the file is permitted to execute. If the
          hashes diverge, the file is rejected at the gate and no further
          steps are taken. This is the same posture you would apply to a
          driver from an OEM vendor.
        </P>
        <P>
          Every action the local Orangebox runtime takes emits a receipt
          containing the operator identity, the timestamp, the input hash, the
          output hash, the department chain, and the constitutional guardrails
          that fired. Receipts are written to a local append-only log. The log
          is not transmitted off-machine. If you want to ship the log to a
          SIEM you ship it explicitly; Orangebox does not phone home with it.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 — WHY LOCAL BEATS SAAS */}
      {/* ------------------------------------------------------------------ */}
      <Section number="04" title="Why a local installer beats a SaaS dashboard">
        <P>
          A SaaS vendor in this category typically holds: your prompts in
          transit, your prompts at rest, your output history, your account
          credentials, your billing identity, your team graph, and a JavaScript
          delivery surface that can mutate between your last review and your
          next session. Each of those is a separate exfiltration risk and a
          separate compliance question. The dashboard model concentrates risk
          on a server you do not run, on JavaScript you cannot pin, on
          telemetry you did not opt into, and on a release cadence you cannot
          stop.
        </P>
        <P>
          Orangebox concentrates risk on one .exe and one local config
          directory. The .exe is signed and hash-stamped. The config directory
          is read by your existing endpoint controls. The model API call goes
          from the operator workstation to api.anthropic.com over your egress,
          which means your existing DLP, your existing TLS inspection, your
          existing proxy rules already see it. Nothing new sits in the middle.
        </P>
        <P>
          The honest weakness of the local model is patching. A SaaS vendor
          can push a critical fix in an afternoon. Orangebox ships fixes as
          new signed installers that the operator must consciously install.
          That is a feature for a regulated environment and a bug for a
          consumer use case. This product is shipped for the regulated
          environment.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 — GUARDRAILS */}
      {/* ------------------------------------------------------------------ */}
      <Section number="05" title="The 27 constitutional guardrails">
        <P>
          The runtime ships with 27 named guardrails that are drift-audited on
          every release. The audit runs against the canonical node file at
          runtime/node.py and verifies the guardrails have not been removed,
          weakened, or routed around. The audit emits its own receipt that is
          attached to the release.
        </P>
        <P>
          Gate 0 is the Lattice Integrity gate, called LBCE. It runs first on
          every chain. If the input lattice fails integrity (corrupt frame,
          missing void map, hash mismatch) the chain halts before any
          downstream gate executes. This is structurally equivalent to a
          deny-by-default firewall rule sitting in front of the application
          stack.
        </P>
        <P>
          Human Final Stop authority is reachable from every autonomous
          execution path. The operator can interrupt any chain at any gate.
          There is no path in the runtime where a department can refuse to
          yield control to the human at the keyboard. This is verified by the
          drift audit.
        </P>
        <P>
          The identity secret is read from the ATOMEONS_IDENTITY_SECRET
          environment variable. It is never hardcoded in the binary. A
          contractor environment can rotate the secret by rotating the
          variable; no re-installation is required.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6 — THE OPERATOR QUESTION */}
      {/* ------------------------------------------------------------------ */}
      <Section number="06" title="The single-operator question">
        <P>
          The procurement question this answers is: what happens if the
          operator gets hit by a bus. The answer is in the license. Section 4A
          of the license is a no-SaaS, perpetual grant: one purchase, the
          right to run the installed binary forever, no subscription, no
          server-side dependency that can be revoked. If AtomEons Systems
          Laboratory ceases to exist tomorrow, every installed copy of
          Orangebox continues to function against the operator's own
          Anthropic key with no degradation. The product does not require a
          phone-home for license validation.
        </P>
        <P>
          Source escrow is available on request. The operator who built this
          binary has shipped 31 peer-readable papers under CC-BY 4.0,
          publishes the disclosure IDs for every major subsystem, and
          maintains the corpus and registry SHA-256 in the public CLAUDE.md.
          The trust model is not personality; it is artifact provenance.
        </P>
        <P>
          No team is not the same as no oversight. There is also no investor
          pressure to ship before the drift audit passes, no growth team
          tuning telemetry behind your back, and no roadmap whiplash from a
          Series B repositioning. The release law is published in the
          repository and it blocks ship on unclear rollback, missing
          evidence, or unacknowledged security risk.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 7 — RECEIPTS */}
      {/* ------------------------------------------------------------------ */}
      <Section number="07" title="What a receipt looks like">
        <div
          style={{
            backgroundColor: "#0F1114",
            border: "1px solid #1F242B",
            fontFamily: "ui-monospace, monospace",
            color: "#F4F4F2",
          }}
          className="mb-6 overflow-x-auto rounded p-6 text-xs leading-relaxed"
        >
          <div style={{ color: "#22F0D5" }}>
            RECEIPT <span style={{ color: "#5A6068" }}>// ATOM-OB-RX-06.03.2026-14:22:18Z</span>
          </div>
          <div style={{ color: "#9CA3AF" }} className="mt-2">
            operator     : a.mccree
          </div>
          <div style={{ color: "#9CA3AF" }}>
            chain        : B_build
          </div>
          <div style={{ color: "#9CA3AF" }}>
            input_sha256 : 7a3f...0e91
          </div>
          <div style={{ color: "#9CA3AF" }}>
            output_sha256: 9c44...d2b8
          </div>
          <div style={{ color: "#9CA3AF" }}>
            departments  : [prime, openmind, generator, security-audit, drift, ledger]
          </div>
          <div style={{ color: "#9CA3AF" }}>
            gates_passed : [LBCE, FOUNDER_SALARY, HUMAN_FINAL_STOP]
          </div>
          <div style={{ color: "#9CA3AF" }}>
            guardrails   : 27/27 enforced
          </div>
          <div style={{ color: "#FF4D4D" }} className="mt-2">
            tamper_check: PASS
          </div>
        </div>
        <P>
          The receipt is not a UI flourish. It is a row in an append-only log
          that the next chain reads. If a receipt is missing or its hash chain
          breaks, the runtime refuses the next action. This is the
          local-machine equivalent of a transaction log on a database that
          will not accept writes until the log is consistent.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 8 — DATA FLOW */}
      {/* ------------------------------------------------------------------ */}
      <Section number="08" title="Data flow on a regulated workstation">
        <div
          style={{
            backgroundColor: "#0F1114",
            border: "1px solid #1F242B",
            fontFamily: "ui-monospace, monospace",
            color: "#9CA3AF",
          }}
          className="mb-6 overflow-x-auto rounded p-6 text-xs leading-loose"
        >
          <div style={{ color: "#F4F4F2" }}>operator prompt</div>
          <div>   &darr;</div>
          <div style={{ color: "#F4F4F2" }}>orangebox runtime  (local .exe, signed)</div>
          <div>   &darr;  LBCE gate, then department routing</div>
          <div style={{ color: "#F4F4F2" }}>compressed payload  (CLC, 10-80x)</div>
          <div>   &darr;  TLS, operator egress, operator key</div>
          <div style={{ color: "#22F0D5" }}>api.anthropic.com</div>
          <div>   &darr;</div>
          <div style={{ color: "#F4F4F2" }}>response &rarr; lattice store &rarr; receipt log</div>
        </div>
        <P>
          No third-party server in the middle. No vendor-controlled relay. No
          background analytics call. The only outbound traffic from a working
          install is the call to api.anthropic.com that you have already
          approved for the Claude API.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 9 — LICENSE */}
      {/* ------------------------------------------------------------------ */}
      <Section number="09" title="License, pricing, and the no-SaaS clause">
        <P>
          Orangebox is free for the launch week and $99 perpetual after. The
          $99 is a one-time charge. There is no renewal, no per-seat creep,
          no metered surcharge on the operator's own API spend. The
          operator brings their own Anthropic key and pays Anthropic directly;
          AtomEons takes zero markup on API usage and has no view into the
          operator's call volume.
        </P>
        <P>
          Section 4A of the license is the no-SaaS clause. Plain reading: the
          purchased copy of the binary continues to operate against the
          operator's key in perpetuity, with no obligation on AtomEons to
          maintain a server, a license validator, an update channel, or any
          other ongoing service. The operator's working install does not
          break if the vendor disappears.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 10 — WHAT WE WILL NOT CLAIM */}
      {/* ------------------------------------------------------------------ */}
      <Section number="10" title="What this primer will not claim">
        <P>
          Orangebox has not been independently penetration-tested by a
          third-party firm. A pen test is on the roadmap; the absence is
          stated openly here because the receipt for a pen test is a report
          from a named firm, and that report does not exist yet. If your
          procurement process requires one, this primer should tell you the
          answer is wait or commission.
        </P>
        <P>
          Orangebox has not received a FedRAMP authorization. Orangebox is
          not, today, a FedRAMP candidate, because FedRAMP is a control set
          for cloud service offerings and Orangebox is a local binary. The
          equivalent question for a local binary is whether the workstation
          it runs on is authorized to run signed third-party software, and
          that question is yours, not the vendor's.
        </P>
        <P>
          Orangebox has not been formally verified. The drift audit is
          structural, not symbolic; it checks that guardrails exist, are
          named, are reachable, and have not been removed between releases.
          It does not prove the guardrails are sufficient in the
          mathematical sense. No vendor in this category proves that and the
          ones who say they do are selling marketing copy.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 11 — HOW TO EVALUATE */}
      {/* ------------------------------------------------------------------ */}
      <Section number="11" title="How to run an evaluation in your environment">
        <ol
          style={{ color: "#F4F4F2", fontFamily: "Newsreader, Georgia, serif" }}
          className="ml-6 list-decimal space-y-3 text-lg"
        >
          <li>
            Download the installer to an isolated workstation that does not
            touch CUI.
          </li>
          <li>
            Compute SHA-256 of the .exe and compare against the published
            stamp. Reject on mismatch.
          </li>
          <li>
            Verify the Authenticode signature chain and timestamp. Reject on
            chain failure.
          </li>
          <li>
            Install. Inspect the local config directory. Confirm no
            outbound telemetry endpoint is registered.
          </li>
          <li>
            Run a benign session. Capture network traffic. Confirm the only
            outbound destination is api.anthropic.com.
          </li>
          <li>
            Inspect the receipt log after the session. Confirm hash chain
            continuity.
          </li>
          <li>
            Pull the disclosure papers (CLC, HRE, GlyphSpeak) and verify
            the published math against the runtime behavior on your own
            corpus.
          </li>
          <li>
            Decide. If anything in steps 1-7 fails, the answer is no and
            the vendor is on record asking you to make that call.
          </li>
        </ol>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 12 — CONTACT */}
      {/* ------------------------------------------------------------------ */}
      <Section number="12" title="Contact and disclosure">
        <P>
          Source on request to qualified evaluators. Disclosure IDs are
          public. The operator publishes from Marco Island, Florida, under
          the lab name AtomEons Systems Laboratory. Papers, registry hashes,
          and the canonical CLAUDE.md are versioned and dated.
        </P>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/orangebox"
            style={{
              backgroundColor: "#22F0D5",
              color: "#08090B",
              fontFamily: "Inter Variable, Inter, sans-serif",
            }}
            className="rounded px-6 py-3 text-sm font-semibold"
          >
            Read the product page
          </Link>
          <Link
            href="/research"
            style={{
              border: "1px solid #1F242B",
              color: "#F4F4F2",
              fontFamily: "Inter Variable, Inter, sans-serif",
            }}
            className="rounded px-6 py-3 text-sm font-semibold hover:bg-[#0F1114]"
          >
            31 papers, CC-BY 4.0
          </Link>
          <Link
            href="/cyber"
            style={{
              border: "1px solid #1F242B",
              color: "#F4F4F2",
              fontFamily: "Inter Variable, Inter, sans-serif",
            }}
            className="rounded px-6 py-3 text-sm font-semibold hover:bg-[#0F1114]"
          >
            Cyber curriculum
          </Link>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------------ */}
      <footer
        style={{ borderTop: "1px solid #1F242B", backgroundColor: "#08090B" }}
        className="mt-24"
      >
        <div
          className="mx-auto max-w-6xl px-6 py-10 text-xs"
          style={{
            color: "#5A6068",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div style={{ color: "#F4F4F2" }} className="mb-2 text-sm">
                AtomEons Systems Laboratory
              </div>
              <div>Marco Island, FL</div>
              <div>One operator. No investors. No waitlist.</div>
            </div>
            <div className="text-right">
              <div>PRIMER REV 06.03.2026</div>
              <div>SHA-256 stamped</div>
              <div style={{ color: "#22F0D5" }} className="mt-2">
                Built in 75 days. With itself.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* PRIMITIVES                                                                  */
/* -------------------------------------------------------------------------- */

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{ borderTop: "1px solid #1F242B" }}
      className="mx-auto max-w-4xl px-6 py-20"
    >
      <div className="mb-10 flex items-baseline gap-6">
        <div
          style={{
            color: "#22F0D5",
            fontFamily: "ui-monospace, monospace",
          }}
          className="text-xs tracking-widest"
        >
          {number}
        </div>
        <h2
          style={{
            fontFamily: "Inter Variable, Inter, sans-serif",
            color: "#F4F4F2",
            lineHeight: 1.15,
          }}
          className="text-3xl font-medium tracking-tight md:text-4xl"
        >
          {title}
        </h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "Newsreader, Georgia, serif",
        color: "#F4F4F2",
        lineHeight: 1.7,
      }}
      className="text-lg"
    >
      {children}
    </p>
  );
}