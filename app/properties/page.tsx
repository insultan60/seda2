import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { hasSpecs, locationLabel, priceLabel, type Listing } from "./data";
import { getListings } from "./listings";
import FaqSection, { type FaqItem } from "../components/Faq";
import "../components/copy.css";
import "./properties.css";

export const metadata: Metadata = {
  alternates: { canonical: "/properties" },
  title: "Los Angeles Luxury Home Sales & Portfolio | Alexandra Kerr",
  description:
    "See Alexandra Kerr’s Los Angeles luxury home portfolio: current listings and past sales from Hancock Park to the Westside, with $184M in total sales.",
};

/* Live MLS listings are cached for six hours; the page follows suit. */
export const revalidate = 21600;

/* Matches .pf-grid: 3-up on desktop, 2-up on tablet, 1-up on phones. */
const CARD_SIZES = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw";
/* .pf-featured__grid is 2-up. */
const FEATURE_SIZES = "(max-width: 639px) 100vw, 50vw";

/** "$7,775,000" → 7775000, so the volume figure can never drift from the listings. */
const toNumber = (price?: string) => Number((price ?? "").replace(/[^0-9]/g, "")) || 0;

/* Rounded from the sale prices already published on the neighborhood pages. */
const BY_HOOD = [
  ["Windsor Square", "/neighborhoods/windsor-square", "$3.6M and $7.8M on Windsor Boulevard."],
  ["Hancock Park", "/neighborhoods/hancock-park", "from $3.65M to $6.3M."],
  ["Hollywood Hills", "/neighborhoods/hollywood-hills", "from $1.7M to $3.1M."],
  ["Los Feliz", "/neighborhoods/los-feliz", "from $1.8M to $2.7M."],
];

const FAQ: FaqItem[] = [
  {
    q: "What does this portfolio show?",
    a: "The featured properties are homes Alexandra currently represents. Past Transactions shows recent sales and leases across Los Angeles, from Hancock Park to the Westside.",
  },
  {
    q: "Are the sold prices the final closing prices?",
    a: "Sold homes show the price at which the sale closed, as recorded in the MLS. Leases show the monthly rent.",
  },
  {
    q: "Can I see more detail on a sold home?",
    a: "Open any property for photos and key facts. For the full picture, including recent sales nearby, ask Alexandra.",
  },
  {
    q: "How do I find out what my home is worth?",
    a: "Start with a home valuation. Alexandra compares your home with recent sales on your street, then adjusts for lot, view, condition, and the quality of past work.",
  },
];

/* eslint-disable @next/next/no-img-element */
function PastCard({ l, delay }: { l: Listing; delay: string }) {
  return (
    <Link
      className="pf-card reveal"
      href={`/properties/${l.slug}`}
      style={delay ? ({ "--d": delay } as React.CSSProperties) : undefined}
    >
      <figure className="pf-card__media">
        <Image src={l.img} alt={[l.addr, l.city].filter(Boolean).join(", ")} fill sizes={CARD_SIZES} />
        <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
      </figure>
      <div className="pf-card__body">
        {l.hood && <p className="pf-card__hood">{l.hood}</p>}
        <p className="pf-card__price">{priceLabel(l)}</p>
        <h3 className="pf-card__addr">{l.addr}</h3>
        {locationLabel(l) && <p className="pf-card__city">{locationLabel(l)}</p>}
        {hasSpecs(l) && (
          <ul className="pf-card__meta">
            <li>{l.beds} Bd</li>
            <li>{l.baths} Ba</li>
            <li>{l.sqft} Sq.Ft.</li>
          </ul>
        )}
      </div>
    </Link>
  );
}

export default async function PortfolioPage() {
  const listings = await getListings();
  const FEATURED = listings.filter((l) => l.status === "Active");
  const PAST = listings.filter((l) => l.status === "Sold");
  // Sales only: a monthly rent is not sale volume.
  const soldVolume = PAST.filter((l) => !l.lease).reduce((sum, l) => sum + toNumber(l.price), 0);
  const volumeLabel = `$${(soldVolume / 1_000_000).toFixed(1)}M`;

  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="pf-hero">
        <img
          className="pf-hero__img"
          src="/assets/listings/s1-windsor414.jpg"
          alt="A Hancock Park estate represented by Alexandra Kerr"
          data-fallback
        />
        <div className="pf-hero__scrim" aria-hidden="true"></div>
        <div className="container pf-hero__inner">
          <p className="eyebrow eyebrow--clay">Alexandra Kerr · Compass</p>
          <h1 className="pf-hero__title">Portfolio</h1>
          <p className="pf-hero__sub">
            Luxury homes in Los Angeles with character, history, and architecture worth preserving —
            currently represented, and a record of results across the city.
          </p>
        </div>

        {/* Same career totals as the home page — Alexandra's confirmed figures,
            not a page-local count of what's in data.ts, so this page never
            contradicts the story the home page already tells. */}
        <dl className="pf-hero__figures">
          <div className="reveal" style={{ "--d": "0s" } as React.CSSProperties}>
            <dt>Homes Sold</dt>
            <dd>
              {/* Server-rendered with the real figure, not 0 — the count-up
                  below is an enhancement, so the number is already correct
                  for anyone who reads it before (or without) the bundle. */}
              <span className="stat__num" data-count="179">179</span>
            </dd>
          </div>
          <div className="reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <dt>Total Sales</dt>
            <dd>
              <span className="stat__num" data-count="184" data-prefix="$" data-suffix="M">$184M</span>
            </dd>
          </div>
          <div className="reveal" style={{ "--d": ".16s" } as React.CSSProperties}>
            <dt>Years in L.A. Real Estate</dt>
            <dd>
              <span className="stat__num" data-count="13">13</span>
            </dd>
          </div>
        </dl>
      </section>

      {/* ---------- INTRO STATEMENT ---------- */}
      <section className="pf-intro">
        <div className="container pf-intro__grid">
          <div className="pf-intro__lead reveal">
            <p className="eyebrow">The Work</p>
            <p className="pf-intro__statement">
              A portfolio isn&rsquo;t a list of addresses. It&rsquo;s a record of decisions made
              under pressure.
            </p>
          </div>
          <div className="pf-intro__body reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <p>
              Los Angeles rewards homes with a point of view — a 1920s Spanish behind a hedge in
              Windsor Square, a canyon modern with the city laid out beneath it, a Hancock Park
              traditional that has held the same family for forty years. Houses like these don&rsquo;t
              sell themselves. They sell when the right buyer is shown the right thing at the right
              moment.
            </p>
            <p>
              Every property below was prepared before it was photographed, priced against real
              comparables rather than optimism, and negotiated by someone who had already decided
              what she would not accept. The results speak in numbers. The work happened long before
              the numbers did.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED PROPERTIES ---------- */}
      <section className="pf-section pf-section--featured" id="featured">
        <div className="container">
          <div className="pf-head reveal">
            <p className="eyebrow">Currently Represented</p>
            <h2 className="pf-head__title">Featured Properties</h2>
            <p className="pf-head__sub">
              Each home is prepared, photographed, and positioned with the same care — whether it
              lists at seven figures or leases for the season.
            </p>
          </div>

          <div className="pf-featured__grid">
            {FEATURED.map((l, i) => (
              <Link
                className="pf-feature reveal"
                href={`/properties/${l.slug}`}
                key={l.slug}
                style={i ? ({ "--d": ".1s" } as React.CSSProperties) : undefined}
              >
                <figure className="pf-feature__media">
                  <Image
                    src={l.img}
                    alt={
                      l.imgNote
                        ? `Representative photography for ${l.addr}`
                        : [l.addr, l.city].filter(Boolean).join(", ")
                    }
                    fill
                    sizes={FEATURE_SIZES}
                    priority={i === 0}
                  />
                  {l.imgNote && <figcaption className="listing__imgnote">{l.imgNote}</figcaption>}
                  <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
                </figure>
                <div className="pf-feature__body">
                  {l.hood && <p className="pf-feature__hood">{l.hood}</p>}
                  <p className="pf-feature__price">{priceLabel(l)}</p>
                  <h3 className="pf-feature__addr">{l.addr}</h3>
                  {locationLabel(l) && <p className="pf-feature__city">{locationLabel(l)}</p>}
                  {hasSpecs(l) && (
                    <ul className="pf-feature__meta">
                      <li>
                        <b>{l.beds}</b>
                        <span>Beds</span>
                      </li>
                      <li>
                        <b>{l.baths}</b>
                        <span>Baths</span>
                      </li>
                      <li>
                        <b>{l.sqft}</b>
                        <span>Sq.Ft.</span>
                      </li>
                    </ul>
                  )}
                  <span className="text-link pf-feature__view">
                    View Property<i className="arrow" aria-hidden="true"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- THE APPROACH ---------- */}
      <section className="pf-approach" id="approach">
        <div className="container">
          <div className="pf-head pf-head--light reveal">
            <p className="eyebrow eyebrow--clay">How a Home Reaches the Market</p>
            <h2 className="pf-head__title">The Approach</h2>
            <p className="pf-head__sub">
              The same three stages, whether the house lists at one million or eight.
            </p>
          </div>

          <ol className="pf-approach__grid">
            {[
              {
                n: "01",
                t: "Prepare",
                b: "Before a single photograph is taken: what stays, what goes, what gets repaired — and what is left alone because it is the reason the house is special. Staging, trades, and inspections coordinated so nothing stalls the launch.",
              },
              {
                n: "02",
                t: "Position",
                b: "Pricing set against genuine comparables and current absorption, not the number that feels good in a listing appointment. Editorial photography, a considered launch date, and placement in front of the agents who actually hold the buyer.",
              },
              {
                n: "03",
                t: "Negotiate",
                b: "Offers read in full — terms, contingencies, proof of funds, the buyer's agent's track record — not just the top line. Then escrow held together through inspection, appraisal, and the week it all nearly falls apart.",
              },
            ].map((s, i) => (
              <li
                className="pf-approach__step reveal"
                key={s.n}
                style={i ? ({ "--d": `${i * 0.08}s` } as React.CSSProperties) : undefined}
              >
                <span className="pf-approach__num" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- PAST TRANSACTIONS ---------- */}
      <section className="pf-section pf-section--past" id="past-transactions">
        <div className="container">
          <div className="pf-head reveal">
            <p className="eyebrow">A Portfolio of Results</p>
            <h2 className="pf-head__title">Past Transactions: Luxury Homes Sold Across Los Angeles</h2>
            {/* Says which figure is which: the grid total here, the career
                total in the hero. They used to read as a contradiction. */}
            <p className="pf-head__sub">
              The homes below are recent transactions, with {volumeLabel} in sales closed across Los Angeles, from
              Hancock Park to the Westside. Alexandra&rsquo;s career total is $184M across 179 homes sold.
            </p>
          </div>

          <div className="pf-past__grid">
            {PAST.map((l, i) => (
              <PastCard key={l.slug} l={l} delay={["", ".06s", ".12s"][i % 3]} />
            ))}
          </div>

          <div className="pf-sell reveal">
            <p>Thinking of selling? See what recent sales suggest for your home.</p>
            <Link className="btn btn--solid-moss" href="/home-valuation">Get Your Home Value</Link>
          </div>
        </div>
      </section>

      {/* ---------- SALES BY NEIGHBORHOOD ---------- */}
      <section className="cp cp--cream">
        <div className="container cp-split">
          <div className="cp-head reveal">
            <p className="eyebrow">Where the Work Is</p>
            <h2 className="cp-title">Sales by Neighborhood</h2>
            <p className="cp-sub">
              The same standard of work looks different on every street. Here is where Alexandra&rsquo;s recent
              sales have closed:
            </p>
          </div>
          <div className="cp-prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <ul className="cp-list">
              {BY_HOOD.map(([name, href, range]) => (
                <li key={name}>
                  <Link className="cp-list__lead" href={href}>{name}</Link>: {range}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1.2rem" }}>
              Looking at <Link href="/neighborhoods/silver-lake">Silver Lake</Link> or the{" "}
              <Link href="/neighborhoods/sunset-strip">Sunset Strip</Link>? Ask Alexandra for recent results in those
              areas.
            </p>
            <div className="cp-actions">
              <Link className="btn btn--outline-moss" href="/neighborhoods">Explore Los Angeles Neighborhoods</Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        items={FAQ}
        title="Portfolio FAQ"
        cta={{ label: "Schedule a Consultation", href: "/contact" }}
      />

      {/* ---------- CLOSING CTA ---------- */}
      <section className="pf-cta">
        <div className="container pf-cta__inner reveal">
          <div>
            <p className="eyebrow eyebrow--clay">Not Seeing It Here?</p>
            <h2 className="h2 h2--light">
              The right home is often the one<br />that never reaches the MLS.
            </h2>
            <p className="pf-cta__sub">
              Tell Alexandra what character means to you. Private exclusives and off-market opportunities
              are shared first with the people she knows best.
            </p>
          </div>
          <div className="pf-cta__actions">
            <Link className="btn btn--solid-light" href="/contact">
              Let&rsquo;s Connect
            </Link>
            <Link className="btn btn--ghost-light" href="/home-search">
              Search The MLS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
