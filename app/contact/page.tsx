import type { Metadata } from "next";
import {
  RouteFacts,
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";
import { ContactBoard } from "./ContactBoard";

export const metadata: Metadata = {
  title: "Contact AtomEons",
  description: "Direct contact routes for Atom McCree and AtomEons: collaboration, product support, press, research, privacy, and legal.",
};

export default function ContactPage() {
  return (
    <RoutePage
      eyebrow="CONTACT / DIRECT SIGNAL"
      title="Send the signal."
      accentTitle="It reaches Atom."
      lede="No intake maze and no imaginary department. Choose the address that fits the work. Every route reaches Atom McCree directly in Naples, Florida."
      asideTitle="One operator. Eight public doors."
      asideBody="The addresses are different so the context arrives intact. The inbox is human. A useful subject line, a clear ask, and a real deadline make the fastest path."
      accent="#ff5a1f"
      actions={[
        { href: "mailto:hello@atomeons.com?subject=Hello%20AtomEons", label: "Email hello", accent: true },
        { href: "mailto:press@atomeons.com?subject=Press%20inquiry%20-%20AtomEons", label: "Press route" },
      ]}
    >
      <RouteSection
        index="CHANNELS / LIVE"
        title="Pick the right frequency."
        body="Every address below is active. If you choose the wrong one, the message still arrives."
      >
        <ContactBoard />
      </RouteSection>

      <RouteSection
        index="DELIVERY / HONEST"
        title="A contact system without theater."
        body="These are branded routes into one working inbox—not a claim that AtomEons has eight staffed departments."
      >
        <RouteFacts
          facts={[
            { label: "DESTINATION", value: "1 human inbox", body: "Atom McCree reads and routes the messages." },
            { label: "PUBLIC ROUTES", value: "8 addresses", body: "Clear context for work, support, press, research, privacy, and legal." },
            { label: "SAFETY NET", value: "Catch-all live", body: "Misspelled or future @atomeons.com addresses still reach the inbox." },
            { label: "TRACKING", value: "No web form", body: "The site does not collect your message in a database." },
          ]}
        />
        <RouteNote title="Response time is real life, not a service-level fiction.">
          AtomEons is an independent practice run by one person. If the message is
          time-sensitive, put the date in the subject line. If it concerns a
          correction or safety issue, include the exact public URL.
        </RouteNote>
      </RouteSection>

      <RouteFinal
        eyebrow="OPEN CHANNEL / NO GATEKEEPER"
        title="If the idea has voltage, send it."
        actions={[
          { href: "mailto:hello@atomeons.com?subject=Build%20something%20with%20AtomEons", label: "Start a conversation", accent: true },
          { href: "/about", label: "Know the practice" },
        ]}
      />
    </RoutePage>
  );
}
