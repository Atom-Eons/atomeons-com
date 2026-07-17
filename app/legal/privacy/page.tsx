import type { Metadata } from "next";
import {
  RouteFinal,
  RouteList,
  RoutePage,
  RouteSection,
} from "../../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy statement for the static AtomEons public website.",
};

export default function PrivacyPage() {
  return (
    <RoutePage
      eyebrow="LEGAL / PRIVACY"
      title="Collect less."
      accentTitle="Explain the rest."
      lede="Privacy statement for this public static site, last updated July 17, 2026."
      asideTitle="No account required."
      asideBody="The current Aether site has no sign-in, public database, checkout, comment system, or first-party advertising tracker. You can read the work without identifying yourself to AtomEons."
      accent="#101010"
    >
      <RouteSection index="DATA / CURRENT BEHAVIOR" title="What happens when you visit.">
        <RouteList
          cards={[
            { index: "01", title: "Hosting logs", body: "The hosting and network provider may process standard request data such as IP address, user agent, requested path, timing, and security signals." },
            { index: "02", title: "Search", body: "Site search runs in your browser against a local route index. The query is not sent to an AtomEons search database." },
            { index: "03", title: "Email", body: "If you email AtomEons, the message and address are handled by the email provider and retained as needed to respond." },
            { index: "04", title: "External services", body: "YouTube, GitHub, X, Discord, and other outbound links apply their own privacy policies after you leave this site." },
            { index: "05", title: "Downloads", body: "Public PDFs, books, and files can be downloaded without an AtomEons account." },
            { index: "06", title: "Questions", body: "Privacy questions or deletion requests for direct correspondence can be sent to a.mccree@gmail.com." },
          ]}
        />
      </RouteSection>
      <RouteFinal
        eyebrow="STATIC BY DESIGN"
        title="The easiest data to protect is data never collected."
        actions={[
          { href: "mailto:a.mccree@gmail.com?subject=AtomEons%20privacy", label: "Privacy question" },
          { href: "/trust", label: "Trust contract" },
        ]}
      />
    </RoutePage>
  );
}
