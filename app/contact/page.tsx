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
  alternates: { canonical: "https://atomeons.com/contact" },
  openGraph: {
    title: "Contact AtomEons",
    description:
      "Direct Gmail fail-safe routes for collaboration, product support, press, research, privacy, and legal questions.",
    url: "https://atomeons.com/contact",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v2/hero-invention-field-v2.webp",
        width: 1536,
        height: 1024,
        alt: "AtomEons direct contact surface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact AtomEons",
    description: "Direct routes to Atom McCree for work, press, product support, and corrections.",
    creator: "@AtomMccree",
    images: ["/aether-v2/hero-invention-field-v2.webp"],
  },
};

export default function ContactPage() {
  return (
    <RoutePage
      eyebrow="CONTACT / DIRECT SIGNAL"
      title="Send the signal."
      accentTitle="It reaches Atom."
      lede="No intake maze and no imaginary department. Choose the route that fits the work. The public buttons use a direct Gmail fail-safe to reach Atom McCree in Naples, Florida."
      asideTitle="One operator. Eight public doors."
      asideBody="The branded routes keep the context clear. The inbox is human. A useful subject line, a clear ask, and a real deadline make the fastest path."
      accent="#ff5a1f"
      actions={[
        { href: "mailto:a.mccree@gmail.com?subject=%5Bhello%40atomeons.com%5D%20Hello%20AtomEons&body=AtomEons%20route%3A%20hello%40atomeons.com%0ADirect%20destination%3A%20a.mccree%40gmail.com%0A%0AMessage%3A%0A", label: "Email hello", accent: true },
        { href: "mailto:a.mccree@gmail.com?subject=%5Bpress%40atomeons.com%5D%20Press%20inquiry%20-%20AtomEons&body=AtomEons%20route%3A%20press%40atomeons.com%0ADirect%20destination%3A%20a.mccree%40gmail.com%0A%0AMessage%3A%0A", label: "Press route" },
      ]}
    >
      <RouteSection
        index="CHANNELS / LIVE"
        title="Pick the right frequency."
        body="Every route below opens a direct message to Atom with the branded channel preserved in the subject line. That keeps delivery simple while domain forwarding is treated as infrastructure, not the single point of failure."
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
            { label: "PUBLIC ROUTES", value: "8 contexts", body: "Each route names the subject context before it reaches the same destination." },
            { label: "DELIVERY", value: "Gmail fail-safe", body: "Public buttons open a direct message to a.mccree@gmail.com until branded forwarding is independently tested again." },
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
          { href: "mailto:a.mccree@gmail.com?subject=%5Bhello%40atomeons.com%5D%20Build%20something%20with%20AtomEons&body=AtomEons%20route%3A%20hello%40atomeons.com%0ADirect%20destination%3A%20a.mccree%40gmail.com%0A%0AMessage%3A%0A", label: "Start a conversation", accent: true },
          { href: "/about", label: "Know the practice" },
        ]}
      />
    </RoutePage>
  );
}
