import type { Metadata } from "next";
import {
  RouteCards,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Cinema",
  description: "AtomEons moving-image and broadcast work led by Atom Alive: The AI Code Show.",
};

export default function CinemaPage() {
  return (
    <RoutePage
      eyebrow="CREATIONS / MOVING IMAGE"
      title="Creation is"
      accentTitle="the plot."
      lede="Atom Alive is the moving-image front of AtomEons: an AI code show for people who care about culture, form, risk, and the object at the end."
      asideTitle="Not a tutorial factory."
      asideBody="The build is real, but technical instruction is only one layer. The deeper story is what happens when an artist directs machines into unfamiliar territory."
      accent="#d60024"
      actions={[
        { href: "https://www.youtube.com/@AICodeShow", label: "Watch on YouTube", accent: true },
        { href: "/atom-alive", label: "Enter Atom Alive" },
      ]}
    >
      <RouteSection index="PROGRAM / ATOM ALIVE" title="A signal with a point of view.">
        <RouteCards
          cards={[
            { meta: "ACT I", title: "Make", body: "Begin with a thing that should exist and make the audience want the outcome." },
            { meta: "ACT II", title: "Break", body: "Keep the model misses, wrong turns, constraints, and ugly middle in the story." },
            { meta: "ACT III", title: "Ship", body: "End with a working object, a receipt, or an honest statement of what still failed." },
          ]}
        />
      </RouteSection>
      <RouteFinal
        eyebrow="ATOM ALIVE / THE AI CODE SHOW"
        title="No keynote voice. No corporate future-speak."
        actions={[
          { href: "https://www.youtube.com/@AICodeShow", label: "Open the channel" },
          { href: "/#products", label: "See what gets built" },
        ]}
      />
    </RoutePage>
  );
}
