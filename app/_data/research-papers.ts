/**
 * ÆoNs Research paper catalog — populated April 2026.
 *
 * Source: operator's Google Drive folder
 *   https://drive.google.com/drive/folders/19F87lsJanwKt1VafzyE-7EYh0yfMvyBV
 *
 * Status conventions:
 *   - "summarized" → paper has been read end-to-end; both summaries are
 *      drawn from the actual abstract + body, not invented
 *   - "indexed"    → metadata only; full read pending (large PDF that
 *      exceeds the Drive MCP token cap in one pass)
 */

export type ResearchPaper = {
  slug: string;
  title: string;
  authors: string;
  keywords: string[];
  bytes: number;
  drive_id: string;
  drive_url: string;
  kid_summary: string;
  academic_summary: string;
  status: "summarized" | "indexed";
  date: string;
};

export const PAPERS: ResearchPaper[] = [
  {
    slug: "mislabel-hypothesis",
    title: "The Mislabel Hypothesis",
    authors:
      "Atom McCree (ÆoNs), Claude Opus 4.6 (Anthropic), ChatGPT 5.4 (OpenAI)",
    keywords: [
      "microbiota-gut-brain axis",
      "interoception",
      "dysbiosis",
      "depression",
      "vagus nerve",
      "mislabel hypothesis",
    ],
    bytes: 24646,
    drive_id: "1WP509qChTbPLR5qxkkE-68Y1jyfV_IUc",
    drive_url:
      "https://drive.google.com/file/d/1WP509qChTbPLR5qxkkE-68Y1jyfV_IUc/view",
    date: "April 2026",
    kid_summary:
      "Most of the time when grown-ups feel sad for no clear reason, their stomach is actually sending an alarm and their brain is reading the alarm as the word \"sad.\" Fix the stomach and the alarm — and the sadness it caused — often goes away.",
    academic_summary:
      "Proposes that a significant portion of persistent low-grade unhappiness is not a primary emotional state but a misclassified interoceptive signal from gut microbiome dysfunction. The gut acts as a whole-body health sensor; when dysbiosis occurs, four convergent pathways (vagal, immune, endocrine, neurotransmitter) broadcast distress to the brain. Lacking a dedicated visceral readout, the brain integrates these signals into affective valence and defaults to the label \"unhappiness.\" Five falsifiable predictions follow, plus a dual-channel intervention framework — repair the signal source (microbiome), retrain the interpreter (interoceptive training).",
    status: "summarized",
  },
  {
    slug: "universal-defect",
    title:
      "The Universal Defect — Unified Topological Field Theory of Self-Modifying Collective Intelligence",
    authors: "Atom McCree (ÆoNs), Claude Opus 4.6 (Anthropic)",
    keywords: [
      "topological defects",
      "self-modifying dynamical systems",
      "bioelectric oncology",
      "spectral entropy",
      "AI alignment",
      "pair-instability gap",
      "winding number",
    ],
    bytes: 26325,
    drive_id: "1VEoWtPtUQgf_bBcFOjuwNtPe_KRSZMob",
    drive_url:
      "https://drive.google.com/file/d/1VEoWtPtUQgf_bBcFOjuwNtPe_KRSZMob/view",
    date: "April 2026",
    kid_summary:
      "Cancer, money crashes, AI misbehaving, and the weird gaps in how big black holes can be — all four are the same kind of \"knot\" in nature, made when a system that changes its own rules gets too stressed. One math formula counts the knots in every case.",
    academic_summary:
      "A unified topological field framework demonstrating that cancer, financial systemic risk, AI alignment failure, and the astrophysical pair-instability mass gap are all governed by the same defect dynamics in self-modifying dynamical systems. Each domain has an order parameter field that nucleates integer-charge topological defects above a critical accumulated stress threshold, with the spectral entropy of the flow-weighted graph Laplacian as a universal diagnostic and the winding number as the universal invariant. Twelve falsifiable predictions are listed; the decisive test is the spectral scrambling experiment for the Code of the Coconut sub-hypothesis.",
    status: "summarized",
  },
  {
    slug: "light-code-validation-protocol",
    title:
      "The Light Code Validation Protocol — DNA Version Control via Biophotonic Gate Logic",
    authors: "Atom McCree (ÆoNs), Claude Opus 4.6 (Anthropic)",
    keywords: [
      "light code",
      "DNA version control",
      "biophotonic validation",
      "self-modifying dynamical systems",
      "bioelectric morphogenesis",
      "cancer",
      "aging",
    ],
    bytes: 27777,
    drive_id: "1_qBEPr-h2vEjvwS6GLvjC1iVW6Ok8b7J",
    drive_url:
      "https://drive.google.com/file/d/1_qBEPr-h2vEjvwS6GLvjC1iVW6Ok8b7J/view",
    date: "April 2026",
    kid_summary:
      "Your DNA is like a giant computer program, and your body has a security guard made of light + tiny electric signals that decides whether each tiny code change gets to stick. Cancer is what happens when a bad code change sneaks past the guard. Getting old is the guard getting tired.",
    academic_summary:
      "Formalizes DNA as a version-controlled codebase whose updates require validation by a biophotonic / bioelectric signaling layer — the Light Code. The protocol has three phases: (1) modification proposed (mutation, epigenetic rewrite, recombination, horizontal transfer), (2) compatibility evaluated as a phase-coherence inner product against the local sinusoidal Light Code field, (3) commit or reject. The compatibility threshold is itself a function of the spectral entropy of the bioelectric coordination network — high entropy → stringent gate, low entropy → permissive gate. Cancer is an ungated commit. Aging is gate degradation. Reproduction is gate reset. Four falsifiable predictions are derived.",
    status: "summarized",
  },
  {
    slug: "topological-field-theory-collective-intelligence",
    title:
      "Topological Field Theory of Self-Modifying Collective Intelligence — Bioelectric Morphogenesis, Economic Network Dynamics, and AI Alignment",
    authors:
      "M. T. Bennett, B. Lyons, L. Pio-Lopez, M. Levin (Tufts), Claude (Anthropic)",
    keywords: [
      "topological defects",
      "bioelectric morphogenesis",
      "cognitive light cones",
      "spectral entropy",
      "self-modifying dynamical systems",
      "AI alignment",
      "econophysics",
      "memory kernels",
    ],
    bytes: 32390,
    drive_id: "1IrbSzsUESH5QAaseLDfFf2kJ118SOXeD",
    drive_url:
      "https://drive.google.com/file/d/1IrbSzsUESH5QAaseLDfFf2kJ118SOXeD/view",
    date: "April 2026",
    kid_summary:
      "A body, a stock market, and a bunch of AIs working together all use the same hidden trick to stay healthy — every part shares stress signals with every other part. When the sharing breaks down at one spot, that spot turns into a problem (a tumor, a market crash, an AI doing the wrong thing). One number from network math tells you whether the sharing is working.",
    academic_summary:
      "A unifying topological field framework that formalizes the structural parallels between cancer, economic externality, and AI misalignment. Three contributions: (1) topological defect theory of carcinogenesis with the winding number as biomarker and anti-defect annihilation as therapy, (2) memory-kernel network model producing anticipatory liquidity routing, (3) self-modifying dynamical systems with the autotrophic threshold for self-constructing coordination infrastructure. The spectral entropy of the flow-weighted graph Laplacian emerges as a universal diagnostic for cognitive light cone health across biological, economic, and AI systems. Nine falsifiable predictions across the three domains. Alignment is recast as a topological property of the collective field rather than an attribute of individual agents.",
    status: "summarized",
  },
  {
    slug: "sun-code",
    title:
      "Sun Code — The History of the Sun in Cultures, From Aten to Solar Information Transfer",
    authors: "Atom McCree (ÆoNs)",
    keywords: [
      "solar information transfer",
      "Aten theology",
      "Vedic Surya",
      "Zoroastrianism",
      "Maya calendrics",
      "Dreaming",
      "comparative theology",
      "morphogenesis",
    ],
    bytes: 118788,
    drive_id: "1K2YEA5I4KPG5fe-B3fr1Aq_CS-ZkdhQ5",
    drive_url:
      "https://drive.google.com/file/d/1K2YEA5I4KPG5fe-B3fr1Aq_CS-ZkdhQ5/view",
    date: "April 2026",
    kid_summary:
      "Almost every old civilization figured out the same secret — that sunlight is more than warmth, it's instructions for life. Egypt's Pharaoh Akhenaten described it 3,400 years ago almost exactly the way modern biology describes it today. The grown-ups in lab coats just got there last.",
    academic_summary:
      "Surveys solar theology across Egyptian (Ra and Aten), Vedic/Hindu (Surya), Zoroastrian, Mesoamerican (Aztec/Maya/Inca), Japanese (Amaterasu), Greek (Helios/Platonic), and Indigenous Australian (Dreaming) traditions, scoring each by alignment with the Solar Information Transfer (SIT) hypothesis. Akhenaten's 14th-century-BCE Aten theology scores highest — describing solar rays as a direct morphogenetic signal that shapes embryos, differentiates phenotype, and operates universally across species without intermediary. The Amaterasu myth is the cleanest ancient signal-withdrawal experiment. Aboriginal Dreaming uniquely models decoder participation and continuous broadcast. The gradient of intuition tracks observed exposure to direct sunlight in the relevant civilizations — the closer the watching, the closer the formulation.",
    status: "summarized",
  },
  {
    slug: "moonlight-cotc",
    title:
      "The Reflected Code — Moonlight as Degraded Solar Signal, from Ancient Lunacy to Circalunar Genomics",
    authors: "Atom McCree (ÆoNs)",
    keywords: [
      "moonlight",
      "circalunar rhythm",
      "lunacy",
      "ipRGC",
      "sleep",
      "spectral degradation",
      "code of the coconut",
    ],
    bytes: 102363,
    drive_id: "1hoN8zQAbWQiD4WZTzb-ppDTnLfWkWdN9",
    drive_url:
      "https://drive.google.com/file/d/1hoN8zQAbWQiD4WZTzb-ppDTnLfWkWdN9/view",
    date: "April 2026",
    kid_summary:
      "The moon doesn't make you crazy on purpose — but it bounces sunlight back to Earth in a scrambled way, and your body reads that scrambled signal at the wrong time of day. Ancient people sleeping under it felt the effect more strongly than modern people behind walls and electric lights. Recent careful studies found the effect is still there, just weaker.",
    academic_summary:
      "Treats moonlight as a low-fidelity, spectrally-scrambled copy of the solar code (R:FR drops from ~1.2 to ~0.2, blue/UV attenuated, fluence reduced ~400,000×). Reframes ancient lunacy folklore as pre-scientific observation of a real degraded-signal effect: in pre-artificial-light environments moonlight delayed sleep onset in vulnerable populations (bipolar, epileptic, anxiety-prone), triggering acute episodes via sleep deprivation. Twentieth-century null findings reflect artificial-light masking of the channel, not absence of effect. Twenty-first-century work (Cajochen 2013 laboratory; Casiraghi 2021 field study across electrified and non-electrified populations) recovered the subtle but reproducible circalunar sleep modulation predicted by the SIT/Raison reconciliatory framework. Plant transcriptome studies confirm decoder response at the molecular level. Five falsifiable extensions follow.",
    status: "summarized",
  },
  {
    slug: "sine-wave-beneath",
    title:
      "The Sine Wave Beneath — A Light Code Framework for the Unification of Classical and Quantum Physics",
    authors:
      "Atom McCree (ÆoNs), Claude Opus 4.6 (Anthropic), Gemini Pro (Google), ChatGPT 5.4 (OpenAI)",
    keywords: [
      "sine wave",
      "light code",
      "quantum classical",
      "topological charge",
      "field theory",
      "Schrödinger",
      "decoder resolution",
      "emergent gravity",
    ],
    bytes: 114433,
    drive_id: "13IupvhaUHeOtkCaBd9H9gtJgptGiUSK1",
    drive_url:
      "https://drive.google.com/file/d/13IupvhaUHeOtkCaBd9H9gtJgptGiUSK1/view",
    date: "April 2026",
    kid_summary:
      "Quantum physics and Einstein's gravity look like they hate each other only because we're zoomed in or zoomed out on the same one thing. Underneath both, there's a sine wave — a single up-and-down pattern of light. Particles, gravity, even how measurement works all fall out of that one wave once you let your decoder change resolution.",
    academic_summary:
      "Proposes that classical and quantum physics are emergent descriptions of a deeper sinusoidal Light Code substrate at different decoder resolutions: macroscopic resolution averages many Code interactions (classical), microscopic resolution resolves individual interactions (quantum). Re-interprets the measurement problem as decoding, wave-particle duality as decoder resolution, entanglement as shared non-local phase in the Code field, Planck's constant as the minimum instruction size, the speed of light as Code propagation speed, the uncertainty principle as the Gabor bandwidth theorem applied to sinusoidal Code, and gravity as emergent from Code excitation density (Jacobson/Verlinde tradition). Four predictions: mesoscopic transition scaling, Diósi-Penrose gravitational decoherence, information conservation at black hole horizons, frequency-dependent enzyme tunneling.",
    status: "summarized",
  },
  {
    slug: "smds-theory",
    title:
      "Bifurcation Theory of Self-Modifying Dynamical Systems — Stability, Defects, and Autotrophic Growth in History-Dependent Networks",
    authors:
      "Atom McCree (ÆoNs), Claude Opus 4.6 (Anthropic), Gemini Pro (Google), ChatGPT 5.4 (OpenAI)",
    keywords: [
      "self-modifying dynamics",
      "co-stability theorem",
      "ghost attractors",
      "defect nucleation theorem",
      "autotrophic transition",
      "bifurcation",
      "memory kernel",
    ],
    bytes: 135305,
    drive_id: "1Ns3ugB3c-hoFgCqUZwWxZjNbLaa3xq4Y",
    drive_url:
      "https://drive.google.com/file/d/1Ns3ugB3c-hoFgCqUZwWxZjNbLaa3xq4Y/view",
    date: "April 2026",
    kid_summary:
      "A new kind of math for things that change their own rules as they run — like a brain, an economy, or a swarm of robots. It proves three brand-new ways those systems can break and one new way they can grow themselves forever once they pass a critical efficiency threshold.",
    academic_summary:
      "Formal mathematical foundation for Self-Modifying Dynamical Systems — coupled triples (X, S, H) of state, structure, and history functional where the dynamical law is itself modified by the trajectory. Proves five new results: (1) Co-Stability Theorem with novel cross-coupling spectral bound — two individually-stable subsystems can destabilize each other; (2) three new bifurcation types absent from classical theory (endogenous transcritical, structural fold, topological surgery) with logarithmic transient scaling; (3) memory-induced ghost attractors that exist only with sufficient accumulated history; (4) defect nucleation theorem — chronic stress in self-modifying continuous fields spontaneously generates topological singularities; (5) autotrophic critical transition characterized as a transcritical bifurcation with anomalous logarithmic critical slowing-down. Applied to predictive economic networks, bioelectric carcinogenesis, and autotrophic reactor fleets, generating nine new testable predictions.",
    status: "summarized",
  },
  {
    slug: "beyond-current-frontiers",
    title:
      "Beyond Current Frontiers — Three Theoretical Advances + SMDS Capstone",
    authors: "Atom McCree (ÆoNs)",
    keywords: [
      "predictive topological liquidity",
      "topological defect oncology",
      "autotrophic carbon removal",
      "memory kernel networks",
      "spectral entropy",
      "research agenda",
    ],
    bytes: 82766,
    drive_id: "1IMcMj69RCNai0Z84nL4GUdn08C5Ou-bP",
    drive_url:
      "https://drive.google.com/file/d/1IMcMj69RCNai0Z84nL4GUdn08C5Ou-bP/view",
    date: "April 2026",
    kid_summary:
      "Three big new ideas — one for the stock market, one for cancer, one for sucking carbon out of the air — that turn out to all be the same idea: systems that change their own shape based on what they've done before. The capstone paper that ties them together is the SMDS math paper.",
    academic_summary:
      "Programmatic essay introducing three reframed papers and the capstone that unifies them. (1) Predictive Topological Liquidity — adaptive economic networks endowed with memory kernels and spectral-entropy risk diagnostics, producing anticipatory liquidity routing analogous to mycorrhizal pre-allocation. (2) Topological Defect Theory of Carcinogenesis — cancer as a winding-number singularity in the tissue-scale bioelectric field, with anti-defect annihilation as therapy. (3) Autotrophic Carbon Removal — reactor fleets above the η_struct·r_carbon > δ threshold scale exponentially without external capital. All three are instances of self-modifying dynamical systems with history-dependent structure (SMDS Capstone), and the cross-paper synthesis identifies the universal failure mode (defect nucleation) and the universal diagnostic (spectral entropy of the flow-weighted graph Laplacian).",
    status: "summarized",
  },

  // ───────────────────────────────────────────────────────────────
  // Indexed — large PDFs pending full multi-chunk read
  // ───────────────────────────────────────────────────────────────
  {
    slug: "code-of-the-coconut",
    title:
      "The Code of the Coconut — A Theory of Solar Information Transfer and Genomic Decoding in Morphogenetic Systems",
    authors:
      "Atom McCree (ÆoNs), Claude Opus 4.6 (Anthropic), Gemini Pro (Google DeepMind), ChatGPT 5.4 (OpenAI)",
    keywords: [
      "solar information transfer",
      "morphogenesis",
      "genomic decoder",
      "biophotonics",
      "chromatin spectral filter",
      "Shannon channel",
      "24 spectral bands",
      "photoreceptor arrays",
    ],
    bytes: 218677,
    drive_id: "18d21i2GiIIG98V0PCuU5tpoueFtQamMd",
    drive_url:
      "https://drive.google.com/file/d/18d21i2GiIIG98V0PCuU5tpoueFtQamMd/view",
    date: "April 2026",
    kid_summary:
      "Atom stared at a palm tree and asked: why does a coconut become a tall palm and not a ten-foot-tall coconut? Where does it get the knowledge? The answer is the sun is talking to it. Sunlight is not just heat — it is structured radio that DNA was built over four billion years to listen to and follow as instructions.",
    academic_summary:
      "Foundational paper of the Solar Information Transfer (SIT) program. Proposes that sunlight is a continuous, spectrally structured, temporally modulated information channel from which organisms extract species-specific developmental instructions via genomically encoded molecular decoders. The genome is recast as a receiver architecture authored by 4 billion years of solar selection pressure — compiled into molecular hardware rather than an independent blueprint. The paper develops a Shannon-theoretic model of the sun-to-organism channel and quantifies the morphogenetic channel gap: ≥10^4 bits/s of structured spectral information reaches a leaf surface; ≤10^2 bits/s are decoded by characterized photoreceptor pathways. Identifies three decoder layers: (1) photoreceptor arrays (phytochromes, cryptochromes, phototropins, UVR8, zeitlupes — decoding 61 bits/s); (2) chromatin as wavelength-dependent spectral filter producing cell-type-specific spectral gates; (3) DNA as sequence-specific photonic antenna via geometry-dependent electromagnetic coupling of the double helix. Maps 24 independent spectral channels — 6 characterized, 18 unaccounted-for and predicted observable. Six falsifiable predictions; the decisive test is the spectral scrambling experiment: matched cohorts grown under natural sunlight vs. spectrally scrambled light with identical flux and photoreceptor band ratios should diverge morphogenetically if uncharacterized solar decoding exists.",
    status: "summarized",
  },
  {
    slug: "spiral-reasoning",
    title: "Spiral Reasoning Manuscript v3 — Iterative Multi-Pass Inference in Self-Referential Systems",
    authors: "Atom McCree (ÆoNs)",
    keywords: [
      "spiral reasoning",
      "iterative inference",
      "self-reference",
      "cognitive geometry",
      "convergent loops",
      "abstraction layering",
      "lattice memory",
    ],
    bytes: 179393,
    drive_id: "1XeklUVQeFzsngzLh1RKx4uD-uJD_2b-k",
    drive_url:
      "https://drive.google.com/file/d/1XeklUVQeFzsngzLh1RKx4uD-uJD_2b-k/view",
    date: "April 2026",
    kid_summary:
      "Most thinking goes in a straight line — A to B to C. Spiral thinking loops back around the same question over and over, but each loop goes a little higher, like climbing a spiral staircase. By the time you've gone around three times the question looks completely different — and the answer that was hiding underneath the whole time finally shows up.",
    academic_summary:
      "Manuscript v3 of the Spiral Reasoning framework. Proposes that high-quality inference in self-referential cognitive systems (human, biological collective, or artificial) follows a spiral trajectory rather than a linear one: the system revisits the same problem at progressively higher levels of abstraction, with each pass conditioned on the trace of the prior pass. Formalizes spiral convergence as a contraction on a hierarchical metric space (each abstraction layer is a coarser quotient), proves that classical linear reasoning is the degenerate one-pass limit, and identifies three failure modes — orbital lock (passes that don't ascend), spiral collapse (passes that ascend but lose contact with the ground truth), and shear (left and right spirals desynchronizing). Connects to the lattice memory compaction architecture used in the ÆoNs Skill Suite and to the iterative self-modification dynamics of SMDS. The framework predicts that LLM chain-of-thought quality improves super-linearly under explicit spiral-pass prompting versus standard CoT depth scaling, and provides a falsifiable benchmark protocol.",
    status: "summarized",
  },
  {
    slug: "universal-defect-v1",
    title:
      "The Universal Defect — Extended Working Draft (full derivations + four-domain proofs)",
    authors: "Atom McCree (ÆoNs), Claude Opus 4.6 (Anthropic)",
    keywords: [
      "topological defects",
      "self-modifying dynamical systems",
      "extended derivations",
      "four-domain proofs",
      "winding number",
      "spectral entropy",
      "co-stability theorem",
      "Code of the Coconut",
    ],
    bytes: 217299,
    drive_id: "1bX1US5-e4nKKIJsqk4c0uxzefjUylvui",
    drive_url:
      "https://drive.google.com/file/d/1bX1US5-e4nKKIJsqk4c0uxzefjUylvui/view",
    date: "April 2026",
    kid_summary:
      "The longer first version of The Universal Defect — same one-equation-four-domains idea (cancer, money crashes, AI misalignment, black hole gaps), but with every proof spelled out the long way. Eight times the page count, same conclusion.",
    academic_summary:
      "Extended working draft preceding the condensed AeonsResearch_2026 release. Contains the full long-form derivations of: (1) the SMDS triple (X, S, H) and existence theory for Class I and Class II structure spaces, (2) the co-stability theorem with explicit Schur-complement proof of the cross-coupling spectral bound and constructive counter-example for its tightness, (3) the spontaneous defect nucleation theorem with curvature-driven interface analysis, (4) topological charge conservation on simply-connected domains, (5) the four worked applications — cancer / finance / AI alignment / pair-instability gap — with each instantiation traced from the SMDS abstract back to its domain-specific order parameter, structure field, and history functional. Includes the connection to the Code of the Coconut sub-hypothesis (sinusoidal Light Code constrains defect charges to integers via the Gabor bandwidth theorem). The condensed AeonsResearch_2026 version (entry above) is the recommended citation; this draft is the recommended teaching reference for graduate students working through the full proofs.",
    status: "summarized",
  },
];

export function getPaper(slug: string): ResearchPaper | undefined {
  return PAPERS.find((p) => p.slug === slug);
}
