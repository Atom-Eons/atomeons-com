import type { Metadata } from "next";
import {
  RouteCampaign,
  RouteCards,
  RouteFacts,
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Orange5",
  description:
    "Orange5 is the AtomEons sovereign AI operating-system path: memory, agents, model choice, workflow, receipts, and operator authority.",
  alternates: { canonical: "https://atomeons.com/orange5" },
  openGraph: {
    title: "Orange5 · Stop renting your second brain",
    description:
      "A staged AI operator system for people who direct AI work instead of renting a chatbot.",
    url: "https://atomeons.com/orange5",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v2/orange5-object-v2.webp",
        width: 1536,
        height: 1024,
        alt: "Orange5 sovereign AI operator object",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orange5 · Stop renting your second brain",
    description:
      "Memory, agents, model choice, workflow, receipts, and operator authority.",
    creator: "@AtomMccree",
    images: ["/aether-v2/orange5-object-v2.webp"],
  },
};

export default function Orange5Page() {
  return (
    <RoutePage
      eyebrow="PRODUCT / 03 / IN DEVELOPMENT"
      title="Stop renting"
      accentTitle="your second brain."
      lede="Orange5 is the AtomEons infrastructure path: a sovereign operating system for people who direct AI work with memory, agents, model choice, workflow, receipts, and human final authority."
      asideTitle="This is the control layer."
      asideBody="Orange5 is staged honestly as architecture and active development. The promise is not another chatbot skin. The promise is operator control over the work, the files, the memory, and the proof."
      accent="#f36b21"
      actions={[
        {
          href: "mailto:a.mccree@gmail.com?subject=%5Bhello%40atomeons.com%5D%20%5BOrange5%5D%20notify%20me%20on%20launch",
          label: "Notify me",
          accent: true,
        },
        { href: "/research/discoveries/aememory", label: "Open AEMemory" },
      ]}
    >
      <RouteCampaign
        image="/aether-v2/orange5-object-v2.webp"
        imageAlt="A white and safety-orange sovereign AI operator console with physical controls"
        object="ORANGE5 / OPERATOR OBJECT 03"
        measure="MEMORY / AGENTS / PROOF / CONTROL"
        label="LOCAL-FIRST / BUILD UNDERWAY"
        title="Your machine. Your mind."
        note="SOVEREIGN AI OPERATING SYSTEM PATH"
        priority
      />

      <RouteSection
        index="POSITION / CLEAR"
        title="AI should not become a stranger every time the window closes."
        body="Orange5 exists to turn scattered AI sessions into an operator-controlled work system. The long-term product is continuity: memory, agents, files, decisions, proof, and model choice organized around the person doing the work."
      >
        <RouteFacts
          facts={[
            {
              label: "STATE",
              value: "Build underway",
              body: "Presented as active architecture and implementation, not a finished commercial release.",
            },
            {
              label: "CENTER",
              value: "Operator authority",
              body: "The human sets direction, scope, permissions, and final judgment.",
            },
            {
              label: "THESIS",
              value: "Own the work",
              body: "Useful AI should preserve files, decisions, context, receipts, and memory instead of scattering them across rented windows.",
            },
            {
              label: "BOUNDARY",
              value: "No fake launch",
              body: "The site names the ambition without pretending every module is already finished.",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="SYSTEM / MODULES"
        title="Four things have to become one machine."
        body="Orange5 is strongest when it is presented as a system, not a feature pile. These are the core module promises the product has to keep earning."
      >
        <RouteCards
          cards={[
            {
              meta: "MEMORY",
              title: "AEMemory",
              body: "A durable memory architecture so the system can remember the work without drowning in the transcript.",
              href: "/research/discoveries/aememory",
            },
            {
              meta: "AGENTS",
              title: "Directed workforce",
              body: "Bounded agent work with visible scope, status, evidence, and human final authority.",
              href: "/receipts",
            },
            {
              meta: "MODELS",
              title: "Interchangeable intelligence",
              body: "The operator should be able to route work across models and tools without surrendering the whole operating system.",
              href: "/api",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="OPERATOR LOOP / DAILY USE"
        title="The product is the loop, not the dashboard."
        body="Orange5 becomes understandable when the visitor can imagine a day inside it: capture the work, route it to the right machine, execute with receipts, and carry the memory forward."
      >
        <RouteCards
          cards={[
            {
              meta: "CAPTURE",
              title: "Pull the real work into one cockpit.",
              body: "Files, conversations, plans, research, receipts, product states, and operator intent should enter one working surface instead of living in scattered tabs.",
            },
            {
              meta: "ROUTE",
              title: "Send the job to the right intelligence.",
              body: "Different models, agents, scripts, and tools should be chosen for the task instead of forcing every job through one generic chatbot window.",
            },
            {
              meta: "PROVE",
              title: "Leave a trail the operator can trust.",
              body: "Completed work should produce evidence: changed files, checks, receipts, links, version state, and visible limits.",
            },
            {
              meta: "REMEMBER",
              title: "Carry the truth into the next session.",
              body: "The system should not forget the project every morning. Durable memory turns prior work into operating context instead of transcript bloat.",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="WHY IT MATTERS"
        title="The product bet is sovereignty."
        body="Most AI products rent you a window. Orange5 points in the opposite direction: your models where possible, your files, your memory, your receipts, your operating history."
      >
        <RouteFacts
          facts={[
            { label: "FILES", value: "Stay yours", body: "The work starts with the operator's actual local context and artifacts." },
            { label: "MEMORY", value: "Carries forward", body: "Durable state should reduce the need to re-explain the same world every session." },
            { label: "PROOF", value: "Visible", body: "Receipts separate completed work from claims, plans, and guesses." },
            { label: "CONTROL", value: "Human", body: "AI multiplies capability without replacing final responsibility." },
          ]}
        />
        <RouteNote title="Current public status">
          Orange5 is not presented as downloadable final software on this site.
          It is the staged infrastructure path behind the broader AtomEons work.
        </RouteNote>
      </RouteSection>

      <RouteFinal
        eyebrow="INFRASTRUCTURE PATH / STILL BUILDING"
        title="The future should remember who is operating it."
        actions={[
          { href: "/products", label: "Back to products", accent: true },
          { href: "/research/discoveries/aememory", label: "Study AEMemory" },
          { href: "/contact", label: "Ask about Orange5" },
        ]}
      />
    </RoutePage>
  );
}
