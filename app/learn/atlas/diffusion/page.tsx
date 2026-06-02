import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/diffusion — image, video, and audio generation in 2026.
 *
 * Diffusion models explained. The DDPM → DDIM → latent diffusion arc,
 * the major systems (Stable Diffusion lineage, DALL-E, Imagen, Flux,
 * Nano Banana Pro), and what's actually different across them.
 */

export const metadata: Metadata = {
  title: "Diffusion models · image + video + audio generation · /learn/atlas/diffusion · AtomEons",
  description:
    "DDPM, DDIM, latent diffusion, Stable Diffusion XL/3, DALL-E 3, Imagen 4, Flux, Nano Banana Pro (Gemini 3 image), Sora, Veo. How diffusion models work, what's different across them, where the field is going.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/diffusion" },
  openGraph: {
    title: "Diffusion models · the atlas",
    description: "Image + video + audio generation explained. The DDPM → Flux → Nano Banana Pro arc.",
    url: "https://atomeons.com/learn/atlas/diffusion",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const MECHANICS = [
  {
    name: "Forward process",
    body: "Take a clean image. Add a tiny bit of Gaussian noise. Repeat 1,000+ times. After enough steps the image becomes indistinguishable from pure noise. This is the forward (corruption) process — it's deterministic and not learned; it just defines a path from data to noise.",
  },
  {
    name: "Reverse process (the learned part)",
    body: "Train a neural network to predict what noise was added at each step. At inference, you start with pure noise and iteratively call the model to subtract its predicted noise — taking you back through the forward path in reverse, from noise to image. This reverse network is the model.",
  },
  {
    name: "Conditioning",
    body: "Modern diffusion models are conditional — you don't just sample any image; you sample an image given a text prompt (or another image, or a depth map, or a sketch, etc.). The conditioning signal is passed into the reverse network at every step, biasing the noise prediction toward outputs matching the prompt.",
  },
  {
    name: "Latent diffusion (Rombach et al. 2021, the unlock)",
    body: "Don't diffuse in pixel space (megabytes per image). Diffuse in a small latent space encoded by a VAE. ~64× smaller per dimension. Makes high-resolution generation tractable on consumer GPUs. Stable Diffusion was the first widely-deployed latent diffusion model.",
  },
  {
    name: "Classifier-free guidance (Ho + Salimans 2021)",
    body: "At inference, run the model twice — once with the prompt and once unconditional. Steer the output toward the prompt by linearly amplifying the difference. The 'guidance scale' parameter every diffusion UI exposes is this. High guidance = more prompt-faithful but lower diversity.",
  },
  {
    name: "Flow matching (Lipman et al. 2022, the 2024 successor)",
    body: "Reformulate diffusion as learning a continuous velocity field that transports noise to data. Mathematically related to denoising-diffusion but with cleaner training objective + faster sampling. Stable Diffusion 3 + Flux are flow-matching-based. The new state of the art.",
  },
];

const SYSTEMS = [
  {
    name: "Stable Diffusion lineage (Stability AI + community)",
    body: "SD 1.5 (2022, latent diffusion), SDXL (2023, larger), SD 3 (2024, flow matching, MMDiT). Open-weights. The reason there's a vibrant local-image-generation community on consumer hardware. ComfyUI + Automatic1111 + Forge are the UI ecosystem.",
    available: "Open weights · Hugging Face · ComfyUI / Auto1111",
  },
  {
    name: "Flux (Black Forest Labs · 2024+)",
    body: "Successor team to Stable Diffusion's original authors. Flux.1-dev (dev license), Flux.1-schnell (Apache 2.0), Flux.1-pro (API only). Best open-weights image quality of 2024-2025. Heavy flow-matching architecture (MMDiT 12B params).",
    available: "Open weights for dev/schnell · API for pro",
  },
  {
    name: "DALL-E 3 (OpenAI · 2023)",
    body: "OpenAI's third-generation image model. API only. Strong prompt adherence + text rendering. Available through ChatGPT + API. Quietly capped by safety filters that can be more restrictive than open-weights options.",
    available: "API only · ChatGPT consumer",
  },
  {
    name: "Imagen 4 family (Google · 2024)",
    body: "Three variants: Imagen 4 (standard), Imagen 4 Fast (lower latency), Imagen 4 Ultra (highest quality). Google AI Studio + Vertex AI access. Strong on text-in-image rendering. Note: different model than Nano Banana Pro below.",
    available: "API only · Google AI Studio + Vertex",
  },
  {
    name: "Nano Banana Pro · Gemini 3 Pro Image (Google · 2024-2025)",
    body: "Google's multimodal Gemini-family image model — used as the image generation engine on atomeons.com. Different lineage from Imagen 4: Nano Banana Pro is the image branch of the Gemini transformer family, not a dedicated diffusion model. Strong on prompt adherence + brand-consistent style.",
    available: "API only · Google AI Studio · generativelanguage.googleapis.com",
  },
  {
    name: "Sora (OpenAI · video · 2024)",
    body: "OpenAI's video diffusion model. Multi-second video clips from text. Released as ChatGPT consumer feature December 2024. Quality leader for short-clip text-to-video at announcement. Heavy compute per generation.",
    available: "ChatGPT consumer · API limited",
  },
  {
    name: "Veo 2 / Veo 3 (Google · video · 2024+)",
    body: "Google DeepMind's video model. Multi-second clips from text. Strong on physical-world coherence. Available through Google Vertex AI. Often paired with Imagen 4 for stills + Veo for motion.",
    available: "API · Google Vertex AI",
  },
  {
    name: "MusicLM / MusicGen / Suno / Udio (audio · 2023+)",
    body: "Audio diffusion is a different model family. Suno + Udio are the consumer-facing music generators. Stability Audio (Stability AI) is the open-weights alternative. Less attention than image/video in 2025-2026 but actively shipping.",
    available: "Mostly API · some open-weights (Stable Audio, MusicGen)",
  },
];

const PRACTICAL = [
  {
    q: "Which diffusion model do I use for what?",
    a: "Brand-consistent product photography → Nano Banana Pro / Imagen 4. Creative illustration → Flux.1-pro or Midjourney. Open-weights local generation → Flux.1-schnell (Apache) or SDXL. Video clips → Sora or Veo 3. Music → Suno (consumer) / Udio (consumer) / Stable Audio (open).",
  },
  {
    q: "Why does the same prompt produce different images on different models?",
    a: "Different training data, different conditioning encoders (CLIP vs T5 vs Gemini), different architecture (U-Net vs MMDiT), different sampling schedulers, different guidance scales, different safety filters. Two models with the 'same' prompt can produce wildly different outputs.",
  },
  {
    q: "What's the cost difference?",
    a: "Open-weights local inference: ~$0.001-$0.01 per image on a consumer GPU (electricity cost only). API generation: $0.04-$0.40+ per image depending on model + resolution + provider. Video and music generation costs are 10-100× higher per second of output.",
  },
  {
    q: "What's the realistic quality floor in 2026?",
    a: "Flux.1-pro and Nano Banana Pro both produce images that pass casual inspection as photography for most subjects. Failure modes are still concentrated around hands, faces (uncanny-valley risk), readable text, and physical-world physics. Video generation has stronger physics issues than stills.",
  },
];

export default function AtlasDiffusionPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="atlas-multimodal" alt="A black sphere, a black cube, and a black cylinder on dark slate — three modalities, one form factor." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> Diffusion
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Diffusion · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            How image + video + audio{" "}
            <span style={{ color: ACCENT }}>actually get generated.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Every press-photo on atomeons.com was generated by a diffusion-lineage model (Nano Banana Pro). This page walks the underlying mechanics: forward noise process → learned reverse process → latent diffusion → classifier-free guidance → flow matching. Then the 2026 ecosystem of who-makes-what, and the cost+quality answers that matter for builders.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            How they actually work
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six mechanisms, one model family.
          </h2>
          <div className="mt-10 space-y-8">
            {MECHANICS.map((m) => (
              <article key={m.name}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{m.name}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The 2026 ecosystem
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Eight systems shipping right now.
          </h2>
          <div className="mt-10 space-y-8">
            {SYSTEMS.map((s) => (
              <article key={s.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{s.name}</h3>
                <p className="mt-3 text-sm text-[#FFB87A]">{s.available}</p>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Practical Q+A
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Four questions builders actually ask.
          </h2>
          <div className="mt-10 space-y-8">
            {PRACTICAL.map((p) => (
              <article key={p.q}>
                <h3 className="text-lg font-medium tracking-tight text-[#22F0D5]">{p.q}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{p.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/multimodal" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Multimodal LLMs →
            </Link>
            <Link href="/design-system" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              How we use Nano Banana Pro →
            </Link>
            <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← atlas index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
