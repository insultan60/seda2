import type { Metadata } from "next";
import Link from "next/link";
import { JOURNAL_LIVE, PUBLISHED } from "./data";
import "./journal.css";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
  title: "The Latest Real Estate News — Alexandra Kerr | Los Angeles",
  description:
    "Market notes, buying and selling guidance, and home information for Los Angeles — from Alexandra Kerr, Estates Director at Compass.",
  // A coming-soon panel is not a page worth indexing (see JOURNAL_LIVE).
  ...(JOURNAL_LIVE ? {} : { robots: { index: false, follow: true } }),
};

/**
 * Deal the posts round-robin across three columns so the feed reads
 * chronologically LEFT-TO-RIGHT across the top row. CSS `columns` would fill
 * column-major instead, putting July in column one and May in column three.
 * Each card keeps its global index as a CSS `order` value, so the collapsed
 * tablet/mobile grid (where the column wrappers become `display: contents`)
 * still lays the posts out newest-first.
 */
const COLUMN_COUNT = 3;
const COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, c) =>
  PUBLISHED.map((post, index) => ({ post, index })).filter((_, i) => i % COLUMN_COUNT === c)
);

/* eslint-disable @next/next/no-img-element */
export default function JournalPage() {
  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="jr-hero">
        <img
          className="jr-hero__img"
          src="/assets/listings/c2-colony.jpg"
          alt=""
          aria-hidden="true"
          data-fallback
        />
        <div className="jr-hero__scrim" aria-hidden="true"></div>
        <div className="container jr-hero__inner">
          <p className="eyebrow eyebrow--clay">From the Journal</p>
          <h1 className="jr-hero__title">
            The Latest Real Estate News
            <span>and Home Information</span>
          </h1>
        </div>
      </section>

      {/* ---------- COMING SOON (until the first article is published) ---------- */}
      {!JOURNAL_LIVE && (
        <section className="jr-feed">
          <div className="container jr-soon reveal">
            <p className="eyebrow">Coming Soon</p>
            <h2 className="h2">The journal is on its way.</h2>
            <p className="jr-soon__text">
              Market notes, neighborhood guides and plain-English reads on the Los Angeles market are being
              written now. In the meantime, Alexandra is happy to answer any question directly.
            </p>
            <div className="jr-soon__actions">
              <Link className="btn btn--solid-moss" href="/contact">Ask Alexandra</Link>
              <Link className="btn btn--outline-moss" href="/neighborhoods">Explore Neighborhoods</Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- FEED ---------- */}
      {JOURNAL_LIVE && (
      <section className="jr-feed">
        <div className="container">
          <div className="jr-masonry">
            {COLUMNS.map((column, c) => (
              <div className="jr-masonry__col" key={c}>
                {column.map(({ post: p, index }) => (
                  <article
                    className="jr-card reveal"
                    key={p.slug}
                    style={{ order: index, "--d": `${c * 0.06}s` } as React.CSSProperties}
                  >
                    {p.img && (
                      <Link className="jr-card__media" href={`/journal/${p.slug}`} aria-label={p.title}>
                        <img src={p.img} alt="" loading="lazy" data-fallback />
                      </Link>
                    )}
                    <div className="jr-card__body">
                      <p className="jr-meta">
                        <time dateTime={p.iso}>{p.date}</time>
                        <span className="jr-meta__dot" aria-hidden="true">
                          ·
                        </span>
                        <span className="jr-meta__tag">{p.tag}</span>
                      </p>
                      <h3 className="jr-card__title">
                        <Link href={`/journal/${p.slug}`}>{p.title}</Link>
                      </h3>
                      <p className="jr-card__excerpt">{p.excerpt}</p>
                      <Link className="jr-card__cta" href={`/journal/${p.slug}`}>
                        Read Post
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ---------- NEWSLETTER CTA ---------- */}
      <section className="jr-cta">
        <div className="container jr-cta__inner reveal">
          <div>
            <p className="eyebrow eyebrow--clay">Stay Close to the Market</p>
            <h2 className="h2 h2--light">
              The market moves quietly<br />before it moves loudly.
            </h2>
            <p className="jr-cta__sub">
              Neighborhood insight, off-market opportunities, and a plain-English read on what the
              headlines actually mean for Los Angeles — sent when there&rsquo;s something worth
              saying.
            </p>
          </div>
          <div className="jr-cta__actions">
            <Link className="btn btn--solid-light" href="/contact">
              Let&rsquo;s Connect
            </Link>
            <Link className="btn btn--ghost-light" href="/properties">
              View the Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
