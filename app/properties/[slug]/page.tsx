import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Gallery from "./Gallery";
import SaveListing from "../../components/SaveListing";
import { HELD_BACK_SLUGS, hasSpecs, locationLabel, priceLabel } from "../data";
import { getListing, getListings } from "../listings";
import "../properties.css";

/* Pre-rendered for every listing known at build time; a listing that joins
   the MLS feed later renders on first request and is cached from then on. */
export const revalidate = 900;

export async function generateStaticParams() {
  return (await getListings()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = await getListing(slug);
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
  const listings = await getListings();
  const l = listings.find((x) => x.slug === slug);
  // A listing held back because the MLS can't confirm it: send visitors to the
  // search rather than an empty page. A temporary redirect, since the listing
  // may come back (see heldBack in data.ts).
  if (!l && HELD_BACK_SLUGS.includes(slug)) redirect("/home-search");
  const similar = listings.filter((x) => x.slug !== slug && x.status === "Sold" && !x.lease).slice(0, 3);
  const yearBuilt = l?.features?.find((f) => f.label === "Year Built")?.value;

  /* Only a slug that matches nothing gets the holding page. A listing used to
     land here whenever it had no `gallery`, which sent five sold homes and two
     actives to "Coming Soon" while their cards advertised a real price and full
     specs — the visitor clicked a $6.3M closing and was told it wasn't ready.
     Every section below is now independently optional, so a listing renders
     whatever it actually has. */
  if (!l) {
    return (
      <main id="main" className="pd-wrap">
        <div className="container pd-soon">
          <div>
            <span className="pd-soon__badge">Listing Coming Soon</span>
            <h1>This listing is on the way.</h1>
            <p>Full details, photography, and pricing for this property are being prepared. Reach out and Alexandra will send everything over the moment it&rsquo;s live.</p>
            <Link href="/properties" className="btn btn--solid-moss">Back to Portfolio</Link>
          </div>
        </div>
      </main>
    );
  }

  /* The AK monogram placeholder is a card-grid device — full width at the top of
     a detail page it just reads as a broken image, so the media block is
     dropped entirely rather than filled with it. */
  const hasGallery = Boolean(l.gallery?.length);
  const heroImg = !hasGallery && !l.img.endsWith("photo-pending.svg") ? l.img : null;

  return (
    <main id="main" className="pd-wrap">
      {hasGallery && (
        <section className="pd-gallery">
          <div className="container">
            <Gallery images={l.gallery!} addr={l.addr} />
          </div>
        </section>
      )}

      {heroImg && (
        <section className="pd-gallery">
          <div className="container">
            <figure className="pd-solo">
              <img
                src={heroImg}
                alt={l.imgNote ? `Representative photography for ${l.addr}` : `${l.addr}${l.city ? `, ${l.city}` : ""}`}
                data-fallback
              />
              {l.imgNote && <figcaption className="pd-solo__note">{l.imgNote}</figcaption>}
            </figure>
          </div>
        </section>
      )}

      <div className="container">
        <div className="pd-head">
          <div>
            <span className="pd-status">{l.badge}</span>
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
        {(hasSpecs(l) || yearBuilt) && (
          <div className="pd-stats">
            {hasSpecs(l) && (
              <>
                <div className="pd-stat"><b>{l.beds}</b><span>Beds</span></div>
                <div className="pd-stat"><b>{l.baths}</b><span>Baths</span></div>
                <div className="pd-stat"><b>{l.sqft}</b><span>Sq Ft</span></div>
              </>
            )}
            {yearBuilt && <div className="pd-stat"><b>{yearBuilt}</b><span>Year Built</span></div>}
          </div>
        )}

        <div className="pd-layout">
          <div className="pd-main">
            {/* Guarded: the listings Alexandra sent as photography only have no
                overview copy, and an "Overview" heading above nothing reads as a
                page that failed to load. They get a short honest line instead. */}
            <section>
              <h2 className="pd-section-title">Overview</h2>
              <div className="pd-overview">
                {l.overview?.length ? (
                  l.overview.map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <p>
                    Full details for {l.addr} are being prepared. For pricing, specifications, or to
                    arrange a private showing, reach out to Alexandra directly — she can talk you
                    through the property today.
                  </p>
                )}
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
                    <img src={s.img} alt={[s.addr, s.city].filter(Boolean).join(", ")} data-fallback />
                    <span className={`badge ${s.badgeCls}`}>{s.badge}</span>
                  </figure>
                  <div className="listing__body">
                    <p className="listing__price">{priceLabel(s)}</p>
                    <h3 className="listing__addr">{s.addr}</h3>
                    <p className="listing__city">
                      {[locationLabel(s), hasSpecs(s) && `${s.beds} Bd · ${s.baths} Ba · ${s.sqft} Sq.Ft.`]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
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
