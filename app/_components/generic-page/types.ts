// Shared types for the GenericPage renderer that materializes
// workflow-generated content packs. Matches the PAGE_SCHEMA used in
// .scripts/materialize-nvidia-tier-50.mjs (workflow wf_c1eaafe8-714).

export type Citation = {
  source: string;
  claim: string;
};

export type CrossLink = {
  label: string;
  href: string;
};

export type Card = {
  title: string;
  body: string;
  meta?: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  body: string;
};

export type SectionKind =
  | "prose"
  | "table"
  | "list"
  | "cards"
  | "callout"
  | "timeline";

export type Section = {
  heading: string;
  kind: SectionKind;
  body?: string;
  tableColumns?: string[];
  tableRows?: string[][];
  listItems?: string[];
  cards?: Card[];
  timelineItems?: TimelineItem[];
};

export type ContentPage = {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: Section[];
  citations: Citation[];
  accent: string;
  crosslinks?: CrossLink[];
};

export type CalcInput = {
  name: string;
  label: string;
  type: "number" | "select";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  default: number | string;
  options?: { value: string; label: string }[];
  help?: string;
};

export type CalcFormula = {
  outputName: string;
  expression: string; // JS-safe arithmetic expression referencing input names
};

export type CalcOutput = {
  name: string;
  label: string;
  format:
    | "currency"
    | "percent"
    | "number"
    | "tokens"
    | "hours"
    | "watts-co2";
  decimals?: number;
};

export type CalcExample = {
  scenario: string;
  inputValues: Record<string, number | string>;
  explanation: string;
};

export type CalculatorSpec = {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  inputs: CalcInput[];
  computeDescription: string;
  computeFormula: CalcFormula[];
  outputs: CalcOutput[];
  examples: CalcExample[];
  assumptions: string[];
  accent: string;
};
