import type { Metadata } from "next";
import {
  RouteFinal,
  RouteList,
  RoutePage,
  RouteSection,
} from "../../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Plain-language terms for the AtomEons public website.",
  alternates: { canonical: "https://atomeons.com/legal/terms" },
};

export default function TermsPage() {
  return (
    <RoutePage
      eyebrow="LEGAL / WEBSITE TERMS"
      title="Read freely."
      accentTitle="Use judgment."
      lede="Plain-language terms for this public site, last updated July 17, 2026."
      asideTitle="The short version."
      asideBody="Browse, link, quote with attribution, and inspect the public work. Do not misrepresent experimental material as established fact or use the site to harm people."
      accent="#101010"
    >
      <RouteSection index="TERMS / SIX POINTS" title="The agreement.">
        <RouteList
          cards={[
            { index: "01", title: "Informational work", body: "The site is creative, technical, and experimental material, not professional medical, legal, financial, or safety advice." },
            { index: "02", title: "Separate licenses", body: "Books, papers, code, downloads, and third-party materials may carry their own license. That specific license controls." },
            { index: "03", title: "No warranty", body: "The site and public artifacts are provided as-is. Verify anything consequential before relying on it." },
            { index: "04", title: "Respect attribution", body: "Do not remove authorship, provenance, model disclosure, or license notices from redistributed work." },
            { index: "05", title: "External links", body: "External services have their own terms and practices. AtomEons does not control them." },
            { index: "06", title: "Corrections and changes", body: "Pages and terms may evolve as products and hosting change. Material corrections will be made when discovered." },
          ]}
        />
      </RouteSection>
      <RouteFinal
        eyebrow="QUESTIONS / DIRECT"
        title="There is no legal department between us."
        actions={[
          { href: "mailto:a.mccree@gmail.com?subject=%5Blegal%40atomeons.com%5D%20AtomEons%20terms", label: "Email Atom" },
          { href: "/legal/privacy", label: "Privacy" },
        ]}
      />
    </RoutePage>
  );
}
