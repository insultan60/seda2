import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import "./contact/contact.css";
import NewsletterForm from "./components/NewsletterForm";
import StatsAwards from "./components/StatsAwards";
import { LATEST_POSTS } from "./journal/data";
import { ALSO_SERVING, FEATURED as FEATURED_HOODS } from "./neighborhoods/data";
import { hasSpecs, LISTINGS, locationLabel, priceLabel } from "./properties/data";
import { TESTIMONIALS } from "./testimonials/data";

// helper for the CSS reveal-delay custom property
const d = (val: string) => ({ "--d": val }) as CSSProperties;

// Portfolio, single-sourced from app/properties/data.ts so the home page,
// the portfolio index, and the detail pages never drift apart.
/* The home page teases the portfolio, it doesn't reproduce it — "View Portfolio"
   goes to the full set. Capped at 4 because the active list jumped from 2 to 15
   in August 2026 and an unbounded 2-up grid put eight rows on the front page. */
const FEATURED = LISTINGS.filter((l) => l.status === "Active").slice(0, 4);
const SOLD = LISTINGS.filter((l) => l.status === "Sold");

/* Both card grids are 3-up on desktop, 2-up on tablet, 1-up on phones — this
   tells the browser that up front so it downloads a card-sized image instead of
   a full-width one. Keep it in step with .listings__grid / .sold__grid. */
const CARD_SIZES = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw";

// stagger delays: featured cards go in pairs, sold cards in rows of three
const FEATURED_DELAYS = ["", ".08s"];
const SOLD_DELAYS = ["", ".06s", ".12s"];
const JOURNAL_DELAYS = ["", ".08s", ".16s"];

/* Both lists come from app/neighborhoods/data.ts rather than a second copy
   here. They had already drifted apart once — the home page was still listing
   Pasadena, Glendale and Palm Springs after Alexandra cut them — and a client
   editing one list should never have to know there is a second. */
const HOOD_DELAYS = ["", ".08s", ".16s"];
const HOODS = FEATURED_HOODS.slice(0, 3);
const HOOD_INDEX = ALSO_SERVING.map((h) => h.name);

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <main id="main">
      {/* 1 · HERO */}
      <section className="hero">
        <video
          className="hero__img"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop"
          aria-label="Introduction video — Alexandra Kerr, Los Angeles real estate"
        >
          <source src="/assets/intro-video.mp4" type="video/mp4" />
        </video>
        <div className="hero__scrim" aria-hidden="true"></div>
        <div className="hero__content">
          {/* Headline and subhead supplied verbatim by the client (Seda, Aug 2026).
              The two lines are explicit spans rather than a natural wrap — the
              client asked for this exact break, so it must hold at every width
              instead of reflowing with the viewport. */}
          <h1 className="hero__title hero__title--stack">
            <span>Luxury Real Estate,</span>
            <span>Thoughtfully Guided</span>
          </h1>
          <p className="hero__sub">
            Helping clients buy, sell, and relocate with confidence throughout Greater Los Angeles.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--ghost-light" href="#listings">View Portfolio</a>
            <a className="btn btn--solid-light" href="/contact">Let&rsquo;s Connect</a>
          </div>
        </div>
        <div className="hero__footer">
          {/* Name, phone, email, licence — one column, so every way of reaching
              Alexandra sits together under her name rather than split across
              the hero. The right block is the brokerage: Compass and its office. */}
          <div className="hero__id">
            <p className="hero__id-name">Alexandra Kerr</p>
            <p>Ph. <a href="tel:+13107951440">310.795.1440</a></p>
            <p className="hero__id-email"><a href="mailto:alexandra.kerr@compass.com">alexandra.kerr@compass.com</a></p>
            <p>DRE# 01911486</p>
          </div>
          <div className="hero__contact">
            <img className="hero__compass" src="/assets/compass-white.png" alt="Compass" />
            <a className="hero__contact-link" href="/contact">Let&rsquo;s Connect</a>
            <p className="hero__contact-office">
              6430 W Sunset Blvd, 6th Floor<br />
              Los Angeles, CA 90028<br />
              <a href="tel:+13235936999">(323) 593‑6999</a>
            </p>
          </div>
        </div>
      </section>

      {/* 2 · TRIPLE CTA */}
      <section className="paths" id="paths">
        <div className="container">
          <div className="paths__grid">
            {[
              { n: "01", t: "Looking to Buy?", b: "From first showing to final walkthrough — find a home with a story worth telling, guided at every step.", href: "/properties", d: "" },
              { n: "02", t: "Looking to Sell?", b: "Meticulous preparation, editorial‑grade marketing, and fierce negotiation to earn your home its best result.", href: "/contact", d: ".08s" },
              { n: "03", t: "Let's Connect", b: "Buying, selling, or simply curious about the market — start a conversation with a specialist who listens.", href: "/contact", d: ".16s" },
            ].map((p) => (
              <a className="path-card reveal" href={p.href} key={p.n} style={p.d ? d(p.d) : undefined}>
                <span className="path-card__num" aria-hidden="true">{p.n}</span>
                <h2 className="path-card__title">{p.t}</h2>
                <p className="path-card__body">{p.b}</p>
                <span className="path-card__link">Explore<i className="arrow" aria-hidden="true"></i></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · ABOUT */}
      <section className="about" id="about">
        <div className="container about__grid">
          <figure className="about__media reveal">
            <img src="/assets/alexandra-headshot.jpg" alt="Alexandra Kerr, REALTOR® — professional headshot" data-fallback />
            <figcaption className="about__media-caption">Alexandra Kerr · Estates Director</figcaption>
          </figure>
          <div className="about__copy reveal" style={d(".1s")}>
            <p className="eyebrow">Meet Alexandra</p>
            <h2 className="h2">Dedication. Expertise.<br /><em>Results.</em></h2>
            <p className="lede">The three qualities that distinguish Alexandra as a real estate agent are her dedication, thorough knowledge of the L.A. marketplace, and her efficiency. Regardless of circumstances, she successfully gets the job done for her clients.</p>
            <ul className="about__creds">
              <li>REALTOR® · Estates Director · Senior Real Estate Specialist</li>
              <li>Compass · Los Angeles</li>
              <li>DRE# 01911486</li>
            </ul>
            <Link className="btn btn--solid-moss" href="/about">Learn More About Alexandra</Link>
          </div>
        </div>
      </section>

      {/* 4 · STATS BAR */}
      <StatsAwards />

      {/* 5 · TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Real Clients. Real Stories.</p>
            <h2 className="h2">Kind words from the neighborhoods<br />we call home.</h2>
          </div>
          <div className="carousel reveal" style={d(".1s")} aria-roledescription="carousel" aria-label="Client testimonials">
            <div className="carousel__viewport">
              {TESTIMONIALS.map((t, i) => (
                <blockquote className={`carousel__slide${i === 0 ? " is-active" : ""}`} key={t.cite}>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <span className="avatar" aria-hidden="true">{t.av}</span>
                    <cite>{t.cite}</cite>
                    <span className="carousel__place">{t.place}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="carousel__controls">
              <button className="carousel__btn" data-dir="-1" aria-label="Previous testimonial"><i className="arrow arrow--left" aria-hidden="true"></i></button>
              <div className="carousel__dots" role="tablist" aria-label="Choose testimonial"></div>
              <button className="carousel__btn" data-dir="1" aria-label="Next testimonial"><i className="arrow" aria-hidden="true"></i></button>
            </div>
          </div>
          <div className="section-foot reveal"><Link className="text-link" href="/testimonials">View All Testimonials<i className="arrow" aria-hidden="true"></i></Link></div>
        </div>
      </section>

      {/* 6 · FEATURED LISTINGS */}
      <section className="listings" id="listings">
        <div className="container">
          <div className="section-head section-head--split reveal">
            <div>
              <p className="eyebrow">Featured Listings</p>
              <h2 className="h2">Currently Represented</h2>
            </div>
            <Link className="text-link" href="/properties">View Portfolio<i className="arrow" aria-hidden="true"></i></Link>
          </div>
          <div className="listings__grid">
            {FEATURED.map((l, i) => {
              const delay = FEATURED_DELAYS[i % FEATURED_DELAYS.length];
              return (
                <article className="listing reveal" key={l.slug} style={delay ? d(delay) : undefined}>
                  <figure className="listing__media">
                    <Image
                      src={l.img}
                      alt={
                        l.imgNote
                          ? `Representative photography for ${l.addr}`
                          : [l.addr, l.city].filter(Boolean).join(", ")
                      }
                      fill
                      sizes={CARD_SIZES}
                      priority={i === 0}
                    />
                    <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
                    {l.imgNote && <figcaption className="listing__imgnote">{l.imgNote}</figcaption>}
                  </figure>
                  <div className="listing__body">
                    <p className="listing__price">{priceLabel(l)}</p>
                    <h3 className="listing__addr">{l.addr}</h3>
                    {locationLabel(l) && <p className="listing__city">{locationLabel(l)}</p>}
                    {hasSpecs(l) && (
                      <ul className="listing__meta">
                        <li>{l.beds} Beds</li>
                        <li>{l.baths} Baths</li>
                        <li>{l.sqft} Sq.Ft.</li>
                      </ul>
                    )}
                    <Link className="text-link listing__view" href={`/properties/${l.slug}`} aria-label={`View ${l.addr}`}>View<i className="arrow" aria-hidden="true"></i></Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="sold">
            <div className="section-head section-head--split section-head--sub reveal">
              <div>
                <p className="eyebrow">A Portfolio of Results</p>
                <h2 className="h2 h2--sub">Recently Sold</h2>
              </div>
              <Link className="text-link" href="/properties">View Sold Listings<i className="arrow" aria-hidden="true"></i></Link>
            </div>
            <div className="sold__grid">
              {SOLD.map((l, i) => {
                const delay = SOLD_DELAYS[i % SOLD_DELAYS.length];
                return (
                  <article className="listing listing--sold reveal" key={l.slug} style={delay ? d(delay) : undefined}>
                    <figure className="listing__media">
                      <Image src={l.img} alt={[l.addr, l.city].filter(Boolean).join(", ")} fill sizes={CARD_SIZES} />
                      <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
                    </figure>
                    <div className="listing__body">
                      <p className="listing__price">{priceLabel(l)}</p>
                      <h3 className="listing__addr">{l.addr}</h3>
                      <p className="listing__city">
                        {[locationLabel(l), hasSpecs(l) && `${l.beds} Bd · ${l.baths} Ba · ${l.sqft} Sq.Ft.`]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <Link className="text-link listing__view" href={`/properties/${l.slug}`} aria-label={`View ${l.addr}`}>View<i className="arrow" aria-hidden="true"></i></Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7 · MLS BAND */}
      <section className="mls" id="home-search">
        <div className="container mls__inner reveal">
          <div className="mls__copy">
            <p className="eyebrow">Newest MLS Listings</p>
            <h2 className="h2">The full Los Angeles market,<br />curated to your taste.</h2>
            <p className="lede">Search every active listing across the Greater Los Angeles MLS — or tell Alexandra what character means to you, and let the right home find you.</p>
          </div>
          <div className="mls__ctas">
            <a className="btn btn--solid-moss" href="/home-search">Search The MLS</a>
            <a className="btn btn--outline-moss" href="/contact">Request A Consultation</a>
          </div>
        </div>
      </section>

      {/* 7b · RELOCATION */}
      <section className="relo" id="relocation">
        <div className="container relo__inner">
          <div className="relo__copy reveal">
            <p className="eyebrow eyebrow--clay">Relocation Specialist</p>
            <h2 className="h2 h2--light">Moving to Los Angeles —<br /><em>or moving on?</em> Consider it handled.</h2>
            <p className="relo__sub">Alexandra has guided relocations in and out of Los Angeles for over a decade — executives on a deadline, families changing coasts, sellers managing everything from two time zones away. When your next chapter starts in another city, she&rsquo;s the first call to make.</p>
            <div className="relo__ctas">
              <Link className="btn btn--solid-light" href="/relocation">Plan Your Relocation</Link>
              <a className="btn btn--ghost-light" href="tel:+13107951440">Call (310) 795‑1440</a>
            </div>
          </div>
          <ul className="relo__points">
            {[
              { t: "Arriving", b: "Neighborhood shortlists matched to your commute, schools, and taste — with video tours and offer strategy handled before you ever board the plane.", d: ".05s" },
              { t: "Departing", b: "Your L.A. home prepared, marketed, and sold while you settle elsewhere — staging, photography, and escrow managed without a single return trip.", d: ".1s" },
              { t: "Every step between", b: "A trusted nationwide agent network, corporate relocation timelines, and one point of contact from the first box packed to the final signature.", d: ".15s" },
            ].map((p) => (
              <li className="reveal" key={p.t} style={d(p.d)}>
                <h3>{p.t}</h3>
                <p>{p.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 · NEIGHBORHOODS */}
      <section className="hoods" id="neighborhoods">
        <div className="container">
          <div className="section-head section-head--split reveal">
            <div>
              <p className="eyebrow">Featured Neighborhoods</p>
              <h2 className="h2">Where character lives.</h2>
            </div>
            <Link className="text-link" href="/neighborhoods">View All Neighborhoods<i className="arrow" aria-hidden="true"></i></Link>
          </div>
          {/* Both the tiles and the index point at /neighborhoods rather than a
              seeded search: most of these areas carry no active inventory this
              week, and a tile that opens an empty result set reads as broken. */}
          <div className="hoods__grid">
            {HOODS.map((h, i) => {
              const delay = HOOD_DELAYS[i];
              return (
                <Link className={`hood${h.tall ? " hood--tall" : ""} reveal`} href="/neighborhoods" key={h.name} style={delay ? d(delay) : undefined}>
                  {h.img && <img src={h.img} alt={h.alt ?? h.name} data-fallback />}
                  <div className="hood__label"><h3>{h.name}</h3><span>{h.short ?? h.blurb}</span></div>
                </Link>
              );
            })}
          </div>
          <ul className="hoods__index reveal">
            {HOOD_INDEX.map((n) => (
              <li key={n}><Link href="/neighborhoods">{n}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 · JOURNAL */}
      <section className="journal" id="journal">
        <div className="container">
          <div className="section-head section-head--split reveal">
            <div>
              <p className="eyebrow">From the Journal</p>
              <h2 className="h2">Notes on architecture & the market.</h2>
            </div>
            <Link className="text-link" href="/journal">Read The Journal<i className="arrow" aria-hidden="true"></i></Link>
          </div>
          <div className="journal__grid">
            {LATEST_POSTS.map((p, i) => {
              const delay = JOURNAL_DELAYS[i % JOURNAL_DELAYS.length];
              return (
                <Link className="post reveal" href={`/journal/${p.slug}`} key={p.title} style={delay ? d(delay) : undefined}>
                  <figure><img src={p.img} alt="" data-fallback /></figure>
                  <p className="post__tag">{p.tag}</p>
                  <h3>{p.title}</h3>
                  <div className="post__foot">
                    <span className="post__date">{p.date}</span>
                    <span className="text-link post__read">Read<i className="arrow" aria-hidden="true"></i></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9b · MAP */}
      <section className="ck-map" id="office-map">
        <div className="container">
          <div className="ck-map__head reveal">
            <p className="eyebrow">Find Us</p>
            <h2>Visit the Office</h2>
            <p>6430 W Sunset Blvd, 6th Floor, Los Angeles, CA 90028</p>
          </div>
          <iframe
            className="ck-map__frame"
            title="Alexandra Kerr office location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=6430%20W%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090028&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </section>

      {/* 10 · NEWSLETTER */}
      <section className="newsletter" id="connect">
        <div className="container newsletter__inner reveal">
          <div className="newsletter__copy">
            <p className="eyebrow eyebrow--clay">Stay Close to the Market</p>
            <h2 className="h2 h2--light">Sign up for the newsletter & exclusive off‑market listings.</h2>
            <p className="newsletter__sub">Quiet opportunities, neighborhood insight, and homes with character — before they hit the MLS.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
