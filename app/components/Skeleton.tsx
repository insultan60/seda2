/**
 * Shared loading skeletons for `loading.tsx` route boundaries.
 *
 * These render instantly while a route's server component streams in, so a
 * slow page shows its own shape rather than leaving the previous page on
 * screen. Styles live in globals.css under "Route-change feedback".
 */

function Head({ lede = true }: { lede?: boolean }) {
  return (
    <div className="sk__head">
      <div className="container">
        <span className="sk-line sk-line--short" />
        <span className="sk-line sk-line--title" />
        {lede && <span className="sk-line sk-line--lede" />}
      </div>
    </div>
  );
}

function Cards({ n = 6, withMedia = true }: { n?: number; withMedia?: boolean }) {
  return (
    <div className="sk-grid">
      {Array.from({ length: n }, (_, i) => (
        <div className="sk-card" key={i}>
          {withMedia && (
            <div className="sk-card__media">
              <span className="sk-block" />
            </div>
          )}
          <div className="sk-card__body">
            <span className="sk-line sk-line--short" />
            <span className="sk-line sk-line--mid" />
            <span className="sk-line" />
            <span className="sk-line sk-line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** A card-grid page: portfolio, journal, neighborhoods, portal. */
export function GridSkeleton({ cards = 6, media = true }: { cards?: number; media?: boolean }) {
  return (
    <main id="main" className="sk" aria-busy="true" aria-label="Loading page">
      <Head />
      <div className="sk__body">
        <div className="container">
          <Cards n={cards} withMedia={media} />
        </div>
      </div>
    </main>
  );
}

/** A long-form reading page: article, concierge, valuation. */
export function ArticleSkeleton() {
  return (
    <main id="main" className="sk" aria-busy="true" aria-label="Loading page">
      <Head />
      <div className="sk__body">
        <div className="container" style={{ maxWidth: "44rem" }}>
          {Array.from({ length: 9 }, (_, i) => (
            <span
              className={`sk-line${i % 4 === 3 ? " sk-line--mid" : ""}`}
              key={i}
              style={{ marginBottom: i % 4 === 3 ? "2rem" : undefined }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

/** The map search, which also has to wait on Leaflet. */
export function SearchSkeleton() {
  return (
    <main id="main" className="sk" aria-busy="true" aria-label="Loading search">
      <div className="sk__head" style={{ paddingBottom: "1rem" }}>
        <div className="container">
          <span className="sk-line sk-line--short" />
          <span className="sk-line sk-line--mid" />
        </div>
      </div>
      <div className="sk__body">
        <div className="container">
          <div style={{ aspectRatio: "16 / 9", overflow: "hidden", marginBottom: "2rem" }}>
            <span className="sk-block" />
          </div>
          <Cards n={3} />
        </div>
      </div>
    </main>
  );
}
