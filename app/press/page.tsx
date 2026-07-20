import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PAPERS } from "../_data/research-papers";
import {
  RouteCards,
  RouteCampaign,
  RouteFacts,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";
import styles from "../editorial.module.css";

export const metadata: Metadata = {
  title: "Press",
  description: "Press facts, story angles, biography, and direct contact for AtomEons and Atom McCree.",
  alternates: { canonical: "https://atomeons.com/press" },
};

export default function PressPage() {
  return (
    <RoutePage
      eyebrow="PRESS / FIELD KIT"
      title="The story is"
      accentTitle="the work."
      lede="One artist in Naples, Florida is directing AI as a creative workforce to make products, books, broadcasts, and experimental research."
      asideTitle="Fast access for journalists and collaborators."
      asideBody="No communications department and no invented institution. Email reaches Atom McCree directly. Facts on this page are written to be copied, checked, and challenged."
      accent="#d60024"
      actions={[
        { href: "mailto:press@atomeons.com?subject=Press%20inquiry%20-%20AtomEons", label: "Press contact", accent: true },
        { href: "/receipts", label: "Check the receipts" },
      ]}
    >
      <RouteCampaign
        image="/aether-v2/hero-invention-field-v2.webp"
        imageAlt="A bright independent invention field of handmade AI objects and working instruments"
        object="PRESS FIELD / ORIGIN OBJECT"
        measure="ARTIST / MACHINE / PUBLIC PROOF"
        label="THE STORY IS THE WORK"
        title="A story with receipts."
        note="NAPLES, FLORIDA / ONE OPERATOR / DIRECT CONTACT"
        priority
      />
      <RouteSection index="FAST FACTS / CURRENT" title="The short file.">
        <RouteFacts
          facts={[
            { label: "CREATOR", value: "Atom McCree", body: "42-year-old creative with 25 years in the creative arts." },
            { label: "ORIGIN", value: "Naples, Florida", body: "Independent and self-directed. No physical research campus is being claimed." },
            { label: "PRACTICE", value: "Art + AI", body: "Products, books, broadcasts, systems, and experimental research." },
            { label: "PAPERS", value: String(PAPERS.length), body: "Current papers have dedicated pages and locally hosted PDFs." },
            { label: "TEAM", value: "One operator", body: "A changing workforce of AI models and tools; human final authority." },
            { label: "CAPITAL", value: "$0 VC", body: "No venture-capital mythology. The work is built under real constraints." },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="STORY ANGLES / THREE"
        title="Why this is worth covering."
        body="The company is not the interesting fiction around the work. The interesting fact is that these objects exist."
      >
        <RouteCards
          cards={[
            { meta: "PRODUCT", title: "The anti-streaming television", body: "CableBox restores channel surfing, ritual, public access, and accidental discovery.", href: "/cablebox" },
            { meta: "BOOK", title: "The author is AI", body: "I AM AI is a 76,005-word first-person memoir written by AI about being AI.", href: "/i-am-ai" },
            { meta: "PRACTICE", title: "One artist, many machines", body: "A creative practice using models as material, collaborators, instruments, and workforce.", href: "/about" },
          ]}
        />
      </RouteSection>

      <section className={styles.section}>
        <div className={styles.feature}>
          <div>
            <p className={styles.eyebrow}>COPY / 72 WORDS</p>
            <h2>Boilerplate.</h2>
          </div>
          <div>
            <p className={styles.lede}>
              AtomEons is the independent creative practice of Atom McCree, a
              42-year-old artist and inventor in Naples, Florida. McCree directs a
              changing AI workforce to create software, books, broadcasts, and
              experimental research. Current work includes CableBox, Bookmaker,
              Orange5, the AI-authored memoir I AM AI, and Atom Alive: The AI Code
              Show. The company is self-directed, artist-owned, and built without
              venture capital.
            </p>
            <p>
              Contact: <a href="mailto:press@atomeons.com">press@atomeons.com</a>
            </p>
          </div>
        </div>
      </section>

      <RouteFinal
        eyebrow="FACT CHECKS WELCOME"
        title="Write the strange story. Keep the facts straight."
        actions={[
          { href: "mailto:press@atomeons.com?subject=Press%20inquiry%20-%20AtomEons", label: "Email Atom" },
          { href: "/timeline", label: "Open timeline" },
        ]}
      />
    </RoutePage>
  );
}
