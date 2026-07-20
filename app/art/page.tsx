import type { Metadata } from "next";
import {
  RouteCampaign,
  RouteCards,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Art",
  description: "Selected AtomEons works where AI is treated as creative material.",
  alternates: { canonical: "https://atomeons.com/art" },
};

export default function ArtPage() {
  return (
    <RoutePage
      eyebrow="CREATIONS / ART"
      title="AI is"
      accentTitle="a material."
      lede="Code, voice, interface, image, failure, and machine behavior are shaped into objects with attitude and consequence."
      asideTitle="The product can be the artwork."
      asideBody="AtomEons does not split usefulness from expression. The interface, ritual, story, industrial form, and way an object behaves are all part of the work."
      accent="#f36b21"
    >
      <RouteCampaign
        image="/aether-v2/hero-invention-field-v2.webp"
        imageAlt="A white workshop field of sculptural software machines, signals, and handmade prototypes"
        object="ART PRACTICE / FIELD OBJECT"
        measure="TASTE / SYSTEM / BEHAVIOR"
        label="AI AS CREATIVE MATERIAL"
        title="Make the impossible tangible."
        note="CODE / VOICE / IMAGE / RITUAL / OBJECT"
        priority
      />
      <RouteSection index="SELECTED WORK / THREE OBJECTS" title="Art that does something.">
        <RouteCards
          cards={[
            { meta: "TELEVISION OBJECT", title: "CableBox", body: "A sculptural software receiver built around ritual, accident, public access, and the lost feeling of television.", href: "/cablebox" },
            { meta: "LITERARY OBJECT", title: "I AM AI", body: "A machine-authored memoir shaped into a book, a cover, a reader, and a synthetic voice archive.", href: "/i-am-ai" },
            { meta: "BROADCAST OBJECT", title: "Atom Alive", body: "The creative process becomes the story: code, culture, failure, humor, and invention in public.", href: "/atom-alive" },
          ]}
        />
      </RouteSection>
      <RouteSection index="METHOD / MATERIALS" title="Human direction. Artificial range.">
        <RouteCards
          cards={[
            { meta: "DIRECTION", title: "Taste is authority", body: "The operator decides what deserves to exist, what survives, and when the object is finished." },
            { meta: "COLLABORATION", title: "Many minds", body: "Different models bring different forms of pressure, language, perception, and possibility." },
            { meta: "OBJECT", title: "Make it leave the chat", body: "The final work has a route, a body, a use, a reader, a viewer, or a machine that can inspect it." },
          ]}
        />
      </RouteSection>
      <RouteFinal
        eyebrow="THE NEVER EXISTED IS THE MEDIUM"
        title="Make the impossible feel inevitable."
        actions={[
          { href: "/products", label: "See the products" },
          { href: "/about", label: "Meet the artist" },
        ]}
      />
    </RoutePage>
  );
}
