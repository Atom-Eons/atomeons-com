import type { CSSProperties, ReactNode } from "react";
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
          <aside className={styles.heroAside}>
            <strong>{asideTitle}</strong>
            <p>{asideBody}</p>
          </aside>
        </div>
      </section>
      {children}
    </main>
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
