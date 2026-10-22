import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import "./contact/contact.css";
import HeroVideo from "./components/HeroVideo";
import NewsletterForm from "./components/NewsletterForm";
import StatsAwards from "./components/StatsAwards";
import { JOURNAL_LIVE, LATEST_POSTS } from "./journal/data";
import { ALSO_SERVING, FEATURED as FEATURED_HOODS, hoodId, type Hood } from "./neighborhoods/data";
import { hasSpecs, locationLabel, priceLabel } from "./properties/data";
import { getListings } from "./properties/listings";
import { TESTIMONIALS } from "./testimonials/data";
import FaqSection from "./components/Faq";
import { IDX, SITE_NAME } from "./site";
import JsonLd from "./components/JsonLd";
import { HOME_PAGE } from "./schema";
import type { Metadata } from "next";

/* Title and description from the October 2026 SEO copy (55 and 150
   characters). The layout's own title and description still stand as the
   fallback for any page that sets none. openGraph is restated in full because
   a page's openGraph replaces the layout's rather than merging with it. */
const TITLE = "Los Angeles Real Estate Agent | Alexandra Kerr, Compass";
const DESCRIPTION =
  "Alexandra Kerr is a Los Angeles real estate agent at Compass, specializing in luxury homes with character. Buy, sell, or relocate with a local expert.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    q: "How do I choose a luxury real estate agent in Los Angeles?",
    a: "Look for a sales record in your specific neighborhood and price range. Ask how the agent markets homes and who handles photography and negotiation. You can also confirm any agent’s license on the California Department of Real Estate website.",
  },
  {
    q: "What should I check before buying a hillside home?",
    a: "Review the permit history, retaining walls, drainage, and the slope and access of the lot. Check insurance availability early, since coverage in hillside areas can be hard to find. Alexandra reads these records with buyers before an offer is written.",
  },
  {
    q: "Can I buy or sell a Los Angeles home if I live out of state?",
    a: "Yes. Alexandra works with clients across the country using video tours, digital signing, and a trusted network of local vendors. Sellers can list, prepare, and close without returning to the city.",
  },
  {
    q: "What is a Compass Concierge?",
    a: "It is a Compass program that helps sellers cover home preparation costs, such as repairs, staging, or cleaning, and pay them at closing. Terms and availability vary, so ask Alexandra for current details.",
  },
  {
    q: "How does Alexandra price a luxury home?",
    a: "She starts with recent comparable sales on the same street and in the same micro-market. Then she adjusts for view, lot, condition, and permit history. She shares the reasoning, so you can see how the number was reached.",
  },
];

// helper for the CSS reveal-delay custom property
const d = (val: string) => ({ "--d": val }) as CSSProperties;

// Portfolio, single-sourced from app/properties/data.ts so the home page,
// the portfolio index, and the detail pages never drift apart.
/* The home page teases the portfolio, it doesn't reproduce it — "View Portfolio"
   goes to the full set. Capped at 4 because the active list jumped from 2 to 15
   in August 2026 and an unbounded 2-up grid put eight rows on the front page. */
/* Recently Sold is capped too: with her MLS history connected there are
   dozens of closings, and the front page shows the six strongest sales
   (leases excluded) — the portfolio has the rest. */
export const revalidate = 21600;

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
/** An area's own page if it has one, else its write-up on /neighborhoods. */
const hoodHref = (h: Hood) => h.page ?? `/neighborhoods#${hoodId(h)}`;

/* eslint-disable @next/next/no-img-element */
export default async function Home() {
  const listings = await getListings();
  const FEATURED = listings.filter((l) => l.status === "Active").slice(0, 4);
  const SOLD = listings.filter((l) => l.status === "Sold" && !l.lease).slice(0, 6);

  return (
    <main id="main">
      <JsonLd data={HOME_PAGE} />
      {/* 1 · HERO */}
      <section className="hero">
        <HeroVideo />
        <div className="hero__scrim" aria-hidden="true"></div>
        <div className="hero__content">
          {/* Headline and subhead from the October 2026 SEO copy, which keeps
              the client's two-line shape (Aug 2026) and puts the search term
              in the first line. The two lines are explicit spans rather than a
              natural wrap, so the break holds at every width. */}
          <h1 className="hero__title hero__title--stack">
            <span>Los Angeles Real Estate Agent,</span>
            <span>Thoughtfully Guided</span>
          </h1>
          <p className="hero__sub">
            Luxury homes with character across Greater Los Angeles. Buy, sell, and relocate with confidence.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--solid-light" href="/contact">Schedule a Consultation</a>
            <a className="btn btn--ghost-light" href="#listings">View Portfolio</a>
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

      {/* 1b · INTRO */}
      <section className="intro" id="intro">
        <div className="container intro__grid">
          <div className="reveal">
            <p className="eyebrow">Alexandra Kerr · Compass</p>
            <h2 className="h2">Luxury Real Estate in Los Angeles</h2>
          </div>
          <div className="intro__body reveal" style={d(".1s")}>
            <p>
              Alexandra Kerr is a Los Angeles real estate agent and Estates Director at Compass. She
              works with buyers and sellers in Los Feliz, Hancock Park, the Hollywood Hills, and
              beyond. Her focus is homes with history, character, and distinctive architecture.
            </p>
            <p>
              The market changes block by block, and a single street can shift a home&rsquo;s value.
              After more than a decade in Los Angeles luxury real estate, Alexandra knows which
              streets hold their value and which permit histories deserve a close read before you
              make an offer.
            </p>
          </div>
        </div>
      </section>

      {/* 2 · TRIPLE CTA */}
      <section className="paths" id="paths">
        <div className="container">
          <div className="paths__grid">
            {[
              { n: "01", t: "Looking to Buy?", b: "Find luxury homes for sale in Los Angeles with a story worth telling. Alexandra guides you from the first showing to the final walkthrough.", cta: "Browse Luxury Homes", href: "/properties", d: "" },
              { n: "02", t: "Looking to Sell?", b: "Selling your house in Los Angeles takes careful preparation, strong marketing, and firm negotiation. Start with a home valuation.", cta: "Get Your Home Value", href: "/home-valuation", d: ".08s" },
              { n: "03", t: "Let's Connect", b: "Buying, selling, or just watching the market? Start a conversation with an agent who listens first.", cta: "Start a Conversation", href: "/contact", d: ".16s" },
            ].map((p) => (
              <a className="path-card reveal" href={p.href} key={p.n} style={p.d ? d(p.d) : undefined}>
                <span className="path-card__num" aria-hidden="true">{p.n}</span>
                <h2 className="path-card__title">{p.t}</h2>
                <p className="path-card__body">{p.b}</p>
                <span className="path-card__link">{p.cta}<i className="arrow" aria-hidden="true"></i></span>
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
            <h2 className="h2">Your Los Angeles Realtor at Compass</h2>
            <p className="lede">Alexandra has worked in Los Angeles real estate for over a decade. Clients describe her as dedicated, efficient, and calm under pressure.</p>
            <p className="lede">As a Compass agent, she brings the brokerage&rsquo;s marketing tools and private exclusives to every listing. Her work has been recognized by RealTrends and Los Angeles Magazine.</p>
            <p className="lede">She is a REALTOR®, Estates Director, and Senior Real Estate Specialist, licensed under DRE# 01911486.</p>
            {/* The credentials list that sat here said the same as the
                paragraph above, which the October 2026 copy added. */}
            <Link className="btn btn--solid-moss about__btn" href="/about">Learn More About Alexandra</Link>
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
              <p className="lede">From Hancock Park estates to Westside rebuilds, these are Alexandra&rsquo;s current listings and recent results.</p>
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
            <h2 className="h2">Search Los Angeles Homes for Sale</h2>
            <p className="lede">Browse every active listing on the Greater Los Angeles MLS. Filter by price, bedrooms, and area, or tell Alexandra what character means to you and let the right home find you.</p>
          </div>
          <div className="mls__ctas">
            {/* The whole MLS lives on IDX; /home-search is Alexandra's own
                listings on a map. Both are one click from here. */}
            <a className="btn btn--solid-moss" href={IDX.mapSearch}>Search the MLS</a>
            <a className="btn btn--outline-moss" href={IDX.signup}>Get New Listing Alerts</a>
            <a className="btn btn--outline-moss" href="/contact">Request a Consultation</a>
          </div>
        </div>
      </section>

      {/* 8 · NEIGHBORHOODS (before relocation, in the October 2026 copy's order) */}
      <section className="hoods" id="neighborhoods">
        <div className="container">
          <div className="section-head section-head--split reveal">
            <div>
              <p className="eyebrow">Featured Neighborhoods</p>
              <h2 className="h2">Los Angeles Neighborhoods We Know Best</h2>
              <p className="lede">Each area works like its own market. Here is where Alexandra spends most of her time.</p>
            </div>
          </div>
          {/* Tiles and list open the area's own page where there is one (Los
              Feliz), and otherwise its write-up on /neighborhoods rather than a
              seeded search: most of these areas carry no active inventory this
              week, and a tile that opens an empty result set reads as broken. */}
          <div className="hoods__grid">
            {HOODS.map((h, i) => {
              const delay = HOOD_DELAYS[i];
              return (
                <Link className={`hood${h.tall ? " hood--tall" : ""} reveal`} href={hoodHref(h)} key={h.name} style={delay ? d(delay) : undefined}>
                  {h.img && <img src={h.img} alt={h.alt ?? h.name} data-fallback />}
                  <div className="hood__label"><h3>{h.name}</h3><span>{h.short ?? h.blurb}</span></div>
                </Link>
              );
            })}
          </div>
          <ul className="hoods__list">
            {FEATURED_HOODS.map((h, i) => (
              <li className="reveal" key={h.name} style={d(`${(i % 3) * 0.06}s`)}>
                <Link href={hoodHref(h)}>
                  <h3>{h.name}</h3>
                  <p>{h.homeBlurb ?? h.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hoods__foot reveal">
            <p className="hoods__also">Also serving: {HOOD_INDEX.slice(0, -1).join(", ")}, and {HOOD_INDEX.at(-1)}.</p>
            <Link className="btn btn--outline-moss" href="/neighborhoods">Explore All Neighborhoods</Link>
          </div>
        </div>
      </section>

      {/* 8b · RELOCATION */}
      <section className="relo" id="relocation">
        <div className="container relo__inner">
          <div className="relo__copy reveal">
            <p className="eyebrow eyebrow--clay">Relocation Specialist</p>
            <h2 className="h2 h2--light">Moving to or from Los Angeles</h2>
            <p className="relo__sub">Alexandra has guided relocations in both directions for over a decade. Her clients include executives on tight deadlines and families changing coasts.</p>
            <div className="relo__ctas">
              <Link className="btn btn--solid-light" href="/relocation">Plan Your Relocation</Link>
              <a className="btn btn--ghost-light" href="tel:+13107951440">Call (310) 795‑1440</a>
            </div>
          </div>
          <ul className="relo__points">
            {[
              { t: "Arriving", b: "Neighborhood shortlists matched to your commute, schools, and taste. Video tours and offer strategy are handled before you board the plane.", d: ".05s" },
              { t: "Departing", b: "Your Los Angeles home is prepared, marketed, and sold while you settle elsewhere. Staging, photography, and escrow run without a return trip.", d: ".1s" },
              { t: "Every step between", b: "A trusted nationwide agent network and one point of contact, from the first packed box to the final signature.", d: ".15s" },
            ].map((p) => (
              <li className="reveal" key={p.t} style={d(p.d)}>
                <h3>{p.t}</h3>
                <p>{p.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8c · FAQ (also emits the page's FAQPage schema) */}
      <FaqSection items={FAQS} title="Los Angeles Real Estate Questions" />

      {/* 8d · CLOSING CALL */}
      <section className="closing" id="talk">
        <div className="container reveal">
          <p className="eyebrow">Let&rsquo;s Talk</p>
          <h2 className="h2">Talk to a Los Angeles Real Estate Agent</h2>
          <p className="lede">Whether you are buying a hillside home, selling a family estate, or moving across the country, a short conversation is the best first step. Call (310) 795-1440 or send a message.</p>
          <div className="closing__ctas">
            <a className="btn btn--solid-moss" href="tel:+13107951440">Call (310) 795‑1440</a>
            <Link className="btn btn--outline-moss" href="/contact">Send a Message</Link>
          </div>
        </div>
      </section>

      {/* 9 · JOURNAL: shown once three illustrated articles are published, so the
          grid never runs with empty slots (see journal/data.ts) */}
      {JOURNAL_LIVE && LATEST_POSTS.length >= 3 && (
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
      )}

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
