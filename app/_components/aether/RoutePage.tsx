import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../editorial.module.css";

export type RouteAction = {
  href: string;
  label: string;
  accent?: boolean;
  download?: boolean;
};

export type RouteCard = {
  index?: string;
  meta?: string;
  title: string;
  body: string;
  href?: string;
};

function Action({ action }: { action: RouteAction }) {
  const className = `${styles.button} ${action.accent ? styles.buttonAccent : styles.buttonGhost}`;
  const external =
    action.href.startsWith("http") ||
    action.href.startsWith("mailto:") ||
    action.download;

  if (external) {
    return (
      <a
        href={action.href}
        className={className}
        download={action.download || undefined}
        target={action.href.startsWith("http") ? "_blank" : undefined}
        rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {action.label} <span aria-hidden>&rarr;</span>
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label} <span aria-hidden>&rarr;</span>
    </Link>
  );
}

export function RoutePage({
  eyebrow,
  title,
  accentTitle,
  lede,
  asideTitle,
  asideBody,
  accent = "#f36b21",
  actions = [],
  children,
}: {
  eyebrow: string;
  title: string;
  accentTitle: string;
  lede: string;
  asideTitle: string;
  asideBody: string;
  accent?: string;
  actions?: RouteAction[];
  children: ReactNode;
}) {
  const routeCode = eyebrow.split("/")[0].trim().slice(0, 4).toUpperCase();

  return (
    <main className={styles.page} style={{ "--accent": accent } as CSSProperties}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>
              {title}
              <br />
              <span>{accentTitle}</span>
            </h1>
            <p className={styles.lede}>{lede}</p>
            {actions.length ? (
              <div className={styles.actions}>
                {actions.map((action) => (
                  <Action action={action} key={`${action.href}-${action.label}`} />
                ))}
              </div>
            ) : null}
          </div>
          <aside className={`${styles.heroAside} ${styles.routeHeroAside}`}>
            <div className={styles.routeAsideCopy}>
              <strong>{asideTitle}</strong>
              <p>{asideBody}</p>
            </div>
            <div className={styles.routeInstrument} aria-hidden>
              <div className={styles.routeInstrumentTop}>
                <span>AE / PUBLIC OBJECT</span>
                <span>AETHER 01</span>
              </div>
              <svg viewBox="0 0 400 260" role="presentation">
                <path d="M20 130H380M200 18V242" />
                <circle cx="200" cy="130" r="92" />
                <circle cx="200" cy="130" r="54" />
                <path className={styles.routeInstrumentAccent} d="M52 196L146 76L218 166L346 46" />
                <path className={styles.routeInstrumentAccent} d="M310 205h54v-54" />
                <circle className={styles.routeInstrumentDot} cx="346" cy="46" r="8" />
              </svg>
              <b>{routeCode}</b>
              <div className={styles.routeInstrumentBottom}>
                <span>SIGNAL / PUBLIC</span>
                <i />
                <span>ROUTE / VERIFIED</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <div className={styles.routeRail} aria-label="Edition status">
        <span>{routeCode} / ATOMEONS</span>
        <span>ARTIST DIRECTED / MACHINE AMPLIFIED</span>
        <span>NAPLES / FLORIDA</span>
        <span><i /> STATIC SIGNAL / LIVE</span>
      </div>
      {children}
    </main>
  );
}

export function RouteCampaign({
  image,
  imageAlt,
  object,
  measure,
  label,
  title,
  note,
  priority = false,
}: {
  image: string;
  imageAlt: string;
  object: string;
  measure: string;
  label: string;
  title: string;
  note: string;
  priority?: boolean;
}) {
  return (
    <section className={styles.campaignSection}>
      <div className={styles.campaignField}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          unoptimized
          sizes="100vw"
          className={styles.campaignFieldImage}
        />
        <div className={styles.campaignFieldTop}>
          <span>{object}</span>
          <span>{measure}</span>
        </div>
        <div className={styles.campaignFieldPlate}>
          <span>{label}</span>
          <strong>{title}</strong>
          <small>{note}</small>
        </div>
        <div className={styles.campaignFieldAxis}>
          <span>INPUT</span>
          <i />
          <span>OBJECT</span>
        </div>
      </div>
    </section>
  );
}

export function RouteSection({
  index,
  title,
  body,
  children,
}: {
  index: string;
  title: string;
  body?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.index}>{index}</p>
        <div>
          <h2>{title}</h2>
          {body ? <p>{body}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function RouteCards({ cards }: { cards: RouteCard[] }) {
  return (
    <div className={styles.grid}>
      {cards.map((card, cardIndex) => {
        const content = (
          <>
            <div className={styles.cardTop}>
              <span className={styles.index}>
                {card.index ?? String(cardIndex + 1).padStart(2, "0")}
              </span>
              {card.meta ? <span className={styles.status}>{card.meta}</span> : null}
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            {card.href ? <span className={styles.cardArrow}>&rarr;</span> : null}
          </>
        );

        return card.href ? (
          card.href.startsWith("http") || card.href.startsWith("mailto:") ? (
            <a
              href={card.href}
              className={styles.card}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              key={`${card.href}-${card.title}`}
            >
              {content}
            </a>
          ) : (
            <Link href={card.href} className={styles.card} key={`${card.href}-${card.title}`}>
              {content}
            </Link>
          )
        ) : (
          <article className={styles.card} key={card.title}>
            {content}
          </article>
        );
      })}
    </div>
  );
}

export function RouteFacts({
  facts,
}: {
  facts: Array<{ label: string; value: string; body?: string }>;
}) {
  return (
    <div className={styles.factGrid}>
      {facts.map((fact) => (
        <article className={styles.fact} key={`${fact.label}-${fact.value}`}>
          <span className={styles.index}>{fact.label}</span>
          <strong>{fact.value}</strong>
          {fact.body ? <p>{fact.body}</p> : null}
        </article>
      ))}
    </div>
  );
}

export function RouteList({ cards }: { cards: RouteCard[] }) {
  return (
    <div className={styles.list}>
      {cards.map((card, cardIndex) => {
        const content = (
          <>
            <span className={styles.index}>
              {card.index ?? String(cardIndex + 1).padStart(2, "0")}
            </span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <span aria-hidden>{card.href ? "\u2192" : ""}</span>
          </>
        );

        return card.href ? (
          card.href.startsWith("http") ? (
            <a
              href={card.href}
              className={styles.listItem}
              target="_blank"
              rel="noopener noreferrer"
              key={`${card.href}-${card.title}`}
            >
              {content}
            </a>
          ) : (
            <Link href={card.href} className={styles.listItem} key={`${card.href}-${card.title}`}>
              {content}
            </Link>
          )
        ) : (
          <div className={styles.listItem} key={card.title}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

export function RouteNote({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.note}>
      <strong>{title}</strong> {children}
    </div>
  );
}

export function RouteFinal({
  eyebrow,
  title,
  actions,
}: {
  eyebrow: string;
  title: string;
  actions: RouteAction[];
}) {
  return (
    <section className={styles.footerCta}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <div className={styles.actions}>
        {actions.map((action) => (
          <Action action={action} key={`${action.href}-${action.label}`} />
        ))}
      </div>
    </section>
  );
}
