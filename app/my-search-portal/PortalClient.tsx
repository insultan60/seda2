"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { hasSpecs, locationLabel, priceLabel, type Listing } from "../properties/data";
import { useFavorites } from "./useFavorites";

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const SORTS = ["Recently saved", "Price: High to Low", "Price: Low to High"] as const;
type Sort = (typeof SORTS)[number];

const priceValue = (p?: string) => Number((p ?? "").replace(/[^0-9]/g, "")) || 0;

/* eslint-disable @next/next/no-img-element */
export default function PortalClient({ listings }: { listings: Listing[] }) {
  const { slugs, ready, remove, clear } = useFavorites();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("Recently saved");

  const saved = useMemo(() => {
    // Preserve save order, and silently drop any slug whose listing has since
    // come off the site rather than rendering a hole in the grid.
    const found = slugs
      .map((s) => listings.find((l) => l.slug === s))
      .filter((l): l is Listing => Boolean(l));

    const q = query.trim().toLowerCase();
    const filtered = q
      ? found.filter((l) =>
          [l.addr, l.city, l.zip, l.hood].some((f) => f?.toLowerCase().includes(q))
        )
      : found;

    const out = [...filtered];
    if (sort === "Price: High to Low") out.sort((a, b) => priceValue(b.price) - priceValue(a.price));
    if (sort === "Price: Low to High") out.sort((a, b) => priceValue(a.price) - priceValue(b.price));
    return out;
  }, [listings, slugs, query, sort]);

  const activeCount = saved.filter((l) => l.status === "Active").length;

  /* Hold the layout until localStorage has been read, so the empty state never
     flashes in front of someone who has homes saved. */
  if (!ready) {
    return (
      <div className="container mp-loading" aria-hidden="true">
        <span />
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (slugs.length === 0) {
    return (
      <div className="container">
        <div className="mp-empty">
          <span className="mp-empty__ic">
            <HeartIcon filled={false} />
          </span>
          <h2>Nothing saved yet.</h2>
          <p>
            Tap the heart on any listing and it will be waiting for you here. Your list is kept on
            this device — no account, no sign-up, and nothing shared until you choose to send it
            over.
          </p>
          <div className="mp-empty__ctas">
            <Link className="btn btn--solid-moss" href="/home-search">
              Browse Homes
            </Link>
            <Link className="btn btn--outline-moss" href="/properties">
              View the Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Saved list ---------- */
  return (
    <div className="container">
      <div className="mp-bar">
        <div className="mp-stats">
          <span className="mp-stat">
            <b>{slugs.length}</b> saved
          </span>
          <span className="mp-stat">
            <b>{activeCount}</b> currently active
          </span>
        </div>
        <div className="mp-tools">
          <label className="mp-search">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter saved homes…"
              aria-label="Filter saved homes"
            />
          </label>
          <label className="mp-select">
            <span className="sr-only">Sort saved homes</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {saved.length === 0 ? (
        <p className="mp-noresults">
          None of your saved homes match &ldquo;{query}&rdquo;.{" "}
          <button type="button" onClick={() => setQuery("")}>
            Clear the filter
          </button>
        </p>
      ) : (
        <div className="mp-grid">
          {saved.map((l) => (
            <article className="mp-card" key={l.slug}>
              <Link className="mp-card__media" href={`/properties/${l.slug}`} aria-label={l.addr}>
                <img src={l.img} alt={[l.addr, l.city].filter(Boolean).join(", ")} loading="lazy" data-fallback />
                <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
              </Link>
              <button
                className="mp-card__unsave"
                type="button"
                onClick={() => remove(l.slug)}
                aria-label={`Remove ${l.addr} from saved homes`}
                title="Remove from saved"
              >
                <HeartIcon filled />
              </button>
              <div className="mp-card__body">
                {l.hood && <p className="mp-card__hood">{l.hood}</p>}
                <p className="mp-card__price">{priceLabel(l)}</p>
                <h3 className="mp-card__addr">
                  <Link href={`/properties/${l.slug}`}>{l.addr}</Link>
                </h3>
                {locationLabel(l) && <p className="mp-card__city">{locationLabel(l)}</p>}
                {hasSpecs(l) && (
                  <ul className="mp-card__meta">
                    <li>{l.beds} Bd</li>
                    <li>{l.baths} Ba</li>
                    <li>{l.sqft} Sq.Ft.</li>
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mp-foot">
        <div>
          <h3>Ready to see any of these in person?</h3>
          <p>
            Send Alexandra your list and she will pull the disclosures, check what is realistically
            available, and set up the showings.
          </p>
        </div>
        <div className="mp-foot__actions">
          <Link className="btn btn--solid-moss" href="/contact">
            Send My List
          </Link>
          <button className="mp-clear" type="button" onClick={clear}>
            Clear all saved
          </button>
        </div>
      </div>
    </div>
  );
}
