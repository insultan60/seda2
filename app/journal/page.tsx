import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "./data";
import "./journal.css";

export const metadata: Metadata = {
  title: "The Latest Real Estate News — Alexandra Kerr | Los Angeles",
  description:
    "Market notes, buying and selling guidance, and home information for Los Angeles — from Alexandra Kerr, Estates Director at Compass.",
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
  POSTS.map((post, index) => ({ post, index })).filter((_, i) => i % COLUMN_COUNT === c)
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

      {/* ---------- FEED ---------- */}
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
                      <span className="jr-card__media">
                        <img src={p.img} alt="" loading="lazy" data-fallback />
                      </span>
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
                        <Link href="/journal">{p.title}</Link>
                      </h3>
                      <p className="jr-card__excerpt">{p.excerpt}</p>
                      <Link className="jr-card__cta" href="/journal">
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
