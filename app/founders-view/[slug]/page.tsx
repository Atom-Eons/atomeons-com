import Link from "next/link";
import { notFound } from "next/navigation";
import { AeMark } from "../../_components/AeMark";
import { ShareLetter } from "../../_components/ShareLetter";
import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";

export const revalidate = 300;

async function loadPost(slug: string): Promise<FoundersViewPost | null> {
  try {
    const sb = publicSupabase();
    const { data, error } = await sb
      .from("founders_view_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data as FoundersViewPost;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post)
    return {
      title: "Letter not found — The Founder's View",
    };
  const canonical = `https://atomeons.com/founders-view/${post.slug}`;
  const ogImageUrl = `${canonical}/opengraph-image`;
  const desc = post.dek ?? `Letter from the lab · ${post.published_at}`;
  return {
    title: `${post.title} — The Founder's View`,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: desc,
      url: canonical,
      siteName: "AtomEons · The Founder's View",
      type: "article",
      publishedTime: post.published_at,
      authors: ["Atom McCree"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} — The Founder's View`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: desc,
      images: [ogImageUrl],
      creator: "@AtomMccree",
      site: "@AtomMccree",
    },
  };
}

/**
 * Render a tiny markdown subset inline (without a heavy dep). Sonnet is
 * instructed to use h2, paragraphs, **bold**, _italic_, and lists. We
 * handle those here. For anything richer, we fall through to <pre>.
 */
function renderMarkdown(md: string) {
  const lines = md.split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let listBuf: string[] = [];
  let paraBuf: string[] = [];

  function flushList() {
    if (listBuf.length) {
      out.push(
        <ul
          key={`ul-${out.length}`}
          className="my-6 list-disc space-y-2 pl-6 text-[#F2F4F5]"
        >
          {listBuf.map((item, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{ __html: inlineFormat(item) }}
            />
          ))}
        </ul>,
      );
      listBuf = [];
    }
  }
  function flushPara() {
    if (paraBuf.length) {
      const text = paraBuf.join(" ").trim();
      if (text)
        out.push(
          <p
            key={`p-${out.length}`}
            className="my-6 text-lg leading-[1.65] text-[#F2F4F5]"
            dangerouslySetInnerHTML={{ __html: inlineFormat(text) }}
          />,
        );
      paraBuf = [];
    }
  }
  function inlineFormat(s: string) {
    // Escape HTML, then re-introduce links + bold + italic + inline-code.
    // Link pass runs BEFORE bold so that bold can still wrap an <a> tag
    // (the `**` markers are outside the inserted href).
    const esc = s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const linkClass = "text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5] transition-colors";

    const wrapLink = (href: string, text: string) => {
      const isExternal = /^https?:\/\//i.test(href) && !/^https?:\/\/atomeons\.com/i.test(href);
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}" class="${linkClass}"${target}>${text}</a>`;
    };

    // 1) explicit markdown [text](url)
    let out = esc.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, url) =>
      wrapLink(url, text),
    );

    // 2) bare absolute URLs — http(s)://...
    //    stop at whitespace, closing bracket, or end-of-sentence punctuation
    out = out.replace(
      /(^|[\s(])(https?:\/\/[^\s<)\]]+?)(?=[.,;:!?)\]]?(?:\s|$))/g,
      (_m, lead, url) => `${lead}${wrapLink(url, url)}`,
    );

    // 3) bare atomeons.com/<path> (any case)
    out = out.replace(
      /(^|[\s(])(atomeons\.com\/[A-Za-z0-9/_\-#?=&]+)(?=[.,;:!?)\]]?(?:\s|$))/gi,
      (_m, lead, domainPath) => {
        const href = `https://${domainPath.toLowerCase()}`;
        return `${lead}${wrapLink(href, domainPath)}`;
      },
    );

    // 4) bare internal paths to known surfaces — only after a word boundary,
    //    only the lab's own routes, so prose like "9/10" or "1/2" never linkifies
    const INTERNAL = "start|research|press|founders-view|orangebox|intel|now|faq|about|legal|account|skilski|b00kmakor|api/admin";
    const internalRe = new RegExp(
      `(^|[\\s(])(\\/(?:${INTERNAL})(?:\\/[A-Za-z0-9/_\\-]*)?)(?=[.,;:!?)\\]]?(?:\\s|$))`,
      "g",
    );
    out = out.replace(internalRe, (_m, lead, path) => `${lead}${wrapLink(path, path)}`);

    // 5) bold / italic / code — runs after links so it can wrap the <a> safely
    return out
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-[#FF7A1A]">$1</strong>',
      )
      .replace(/_(.+?)_/g, '<em class="text-[#22F0D5]">$1</em>')
      .replace(
        /`([^`]+)`/g,
        '<code class="rounded bg-[#0A0F11] px-1 py-0.5 font-mono text-sm text-[#22F0D5]">$1</code>',
      );
  }

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^##\s+/.test(line)) {
      flushPara();
      flushList();
      const heading = line.replace(/^##\s+/, "");
      out.push(
        <h2
          key={`h2-${out.length}`}
          className="mt-12 text-2xl font-medium tracking-tight text-[#22F0D5] md:text-3xl"
          dangerouslySetInnerHTML={{ __html: inlineFormat(heading) }}
        />,
      );
    } else if (/^- /.test(line)) {
      flushPara();
      listBuf.push(line.replace(/^- /, ""));
    } else if (line === "") {
      flushList();
      flushPara();
    } else {
      flushList();
      paraBuf.push(line);
    }
  }
  flushList();
  flushPara();
  return out;
}

export default async function FoundersViewPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const date = new Date(post.published_at);
  const human = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-3xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/founders-view" className="hover:text-[#22F0D5]">
            The Founder&apos;s View
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> {post.slug}
        </p>
      </div>

      <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
          <AeMark size={20} glow />
          ::letter from the lab · {human}
        </p>
        <h1 className="mt-5 text-balance text-3xl font-medium leading-tight tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          {post.title}
        </h1>
        {post.dek ? (
          <p className="mt-5 text-xl leading-relaxed text-[#9BA5A7] md:text-2xl">
            {post.dek}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          {post.theme ? (
            <span className="rounded border border-[#22F0D5]/40 bg-black px-2 py-0.5 text-[#22F0D5]">
              {post.theme}
            </span>
          ) : null}
          {post.word_count ? (
            <span className="rounded border border-[#1A2225] bg-black px-2 py-0.5 text-[#6B7779]">
              {post.word_count} words
            </span>
          ) : null}
        </div>

        <hr className="my-12 border-[#1A2225]" />

        <div className="prose-letter">{renderMarkdown(post.body_md)}</div>

        <hr className="my-16 border-[#1A2225]" />

        <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::pass it on
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#9BA5A7]">
            Operator decree: no email list, no algorithm. If a letter lands,
            you share it. If it doesn&apos;t, you don&apos;t. That&apos;s the
            distribution model.
          </p>
          <div className="mt-5">
            <ShareLetter
              url={`https://atomeons.com/founders-view/${post.slug}`}
              title={post.title}
              dek={post.dek}
            />
          </div>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
          sealed and slipped under your door at 8pm ET
        </p>
        <p className="mt-3 text-xs text-[#6B7779]">
          <Link
            href="/founders-view"
            className="text-[#FF7A1A] hover:text-[#FFA45A]"
          >
            ← back to the archive
          </Link>
          {"  "}·{"  "}
          <a
            href="/founders-view/rss.xml"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            subscribe by RSS
          </a>
        </p>
      </article>
    </main>
  );
}
