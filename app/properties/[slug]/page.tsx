import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "./Gallery";
import SaveListing from "../../components/SaveListing";
import { ALL_SLUGS, getListing, hasSpecs, LISTINGS, locationLabel, priceLabel } from "../data";
import "../properties.css";

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (l) {
    const where = locationLabel(l);
    return {
      title: [l.addr, l.city].filter(Boolean).join(", ") + " — Alexandra Kerr",
      description: [
        hasSpecs(l) && `${l.beds} bd · ${l.baths} ba · ${l.sqft} sqft`,
        priceLabel(l),
        [l.addr, where].filter(Boolean).join(", "),
      ]
        .filter(Boolean)
        .join(" — "),
    };
  }
  return { title: "Listing — Alexandra Kerr" };
}

/* eslint-disable @next/next/no-img-element */
export default async function PropertyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getListing(slug);
  const similar = LISTINGS.filter((x) => x.slug !== slug && x.status === "Sold").slice(0, 3);

  if (!l || !l.gallery) {
    return (
      <main id="main" className="pd-wrap">
        <div className="container pd-soon">
          <div>
            <span className="pd-soon__badge">Listing Coming Soon</span>
            <h1>{l ? l.addr : "This listing is on the way."}</h1>
            <p>Full details, photography, and pricing for this property are being prepared. Reach out and Alexandra will send everything over the moment it&rsquo;s live.</p>
            <Link href="/properties" className="btn btn--solid-moss">Back to Portfolio</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="pd-wrap">
      <section className="pd-gallery">
        <div className="container">
          <Gallery images={l.gallery} addr={l.addr} />
        </div>
      </section>

      <div className="container">
        <div className="pd-head">
          <div>
            <span className="pd-status">{l.status}</span>
            <h1 className="pd-title">{l.addr}</h1>
            {locationLabel(l) && <p className="pd-addr">{locationLabel(l)}</p>}
          </div>
          <div className="pd-head__right">
            <div className="pd-price">{priceLabel(l)}</div>
            <SaveListing slug={l.slug} addr={l.addr} />
          </div>
        </div>

        {/* Dropped entirely rather than rendered with blanks when a listing is
            still awaiting its figures. */}
        {(hasSpecs(l) || l.features?.[1]) && (
          <div className="pd-stats">
            {hasSpecs(l) && (
              <>
                <div className="pd-stat"><b>{l.beds}</b><span>Beds</span></div>
                <div className="pd-stat"><b>{l.baths}</b><span>Baths</span></div>
                <div className="pd-stat"><b>{l.sqft}</b><span>Sq Ft</span></div>
              </>
            )}
            {l.features?.[1] && <div className="pd-stat"><b>{l.features[1].value}</b><span>Year Built</span></div>}
          </div>
        )}

        <div className="pd-layout">
          <div className="pd-main">
            <section>
              <h2 className="pd-section-title">Overview</h2>
              <div className="pd-overview">
                {l.overview?.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            {l.features && (
              <section className="pd-features">
                <h2 className="pd-section-title">Property Details</h2>
                <dl>
                  {l.features.map((f) => (
                    <div className="pd-feat-row" key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <aside>
            <div className="pd-cta">
              <div className="pd-cta__agent">
                <img src="/assets/alexandra-headshot.jpg" alt="Alexandra Kerr" data-fallback />
                <div>
                  <b>Alexandra Kerr</b>
                  <span>Estates Director · Compass</span>
                </div>
              </div>
              <h3>Interested in this home?</h3>
              <p>Request a private showing or ask Alexandra anything about {l.addr}.</p>
              <Link href="/contact" className="btn btn--solid-light">Request a Showing</Link>
              <a href="tel:+13107951440" className="btn btn--ghost-light">Call (310) 795‑1440</a>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="ck-portfolio">
          <div className="container">
            <div className="section-head section-head--split reveal">
              <div>
                <p className="eyebrow">More From the Portfolio</p>
                <h2 className="h2">Similar Homes</h2>
              </div>
              <Link className="text-link" href="/properties">View Portfolio<i className="arrow" aria-hidden="true"></i></Link>
            </div>
            <div className="ck-portfolio__grid">
              {similar.map((s) => (
                <Link className="listing reveal" href={`/properties/${s.slug}`} key={s.slug}>
                  <figure className="listing__media">
                    <img src={s.img} alt={`${s.addr}, ${s.city}`} data-fallback />
                    <span className={`badge ${s.badgeCls}`}>{s.badge}</span>
                  </figure>
                  <div className="listing__body">
                    <p className="listing__price">{s.price}</p>
                    <h3 className="listing__addr">{s.addr}</h3>
                    <p className="listing__city">{s.city} {s.zip} · {s.beds} Bd · {s.baths} Ba · {s.sqft} Sq.Ft.</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
