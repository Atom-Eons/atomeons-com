import type { Metadata } from "next";
import {
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";
import { RandomClient } from "./RandomClient";

export const metadata: Metadata = {
  title: "Random signal",
  description: "A working random doorway into the current AtomEons site.",
  alternates: { canonical: "https://atomeons.com/random" },
};

export default function RandomPage() {
  return (
    <RoutePage
      eyebrow="RANDOM / CONTROLLED ACCIDENT"
      title="Stop choosing."
      accentTitle="Start finding."
      lede="The archive can still surprise you without burying you."
      asideTitle="A CableBox principle for the web."
      asideBody="Recommendation engines predict your next move. This little machine simply opens a door you did not choose."
      accent="#d8ff3e"
    >
      <RouteSection index="SIGNAL / LIVE" title="Your next door.">
        <RandomClient />
      </RouteSection>
      <RouteFinal
        eyebrow="ACCIDENT IS A FEATURE"
        title="The thing you did not search for may be the thing."
        actions={[
          { href: "/explore", label: "Open the full index" },
          { href: "/cablebox", label: "Meet CableBox" },
        ]}
      />
    </RoutePage>
  );
}
