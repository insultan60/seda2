import type { Metadata } from "next";
import Link from "next/link";
import { ALSO_SERVING, FEATURED, hoodLink } from "./data";
import "./neighborhoods.css";

export const metadata: Metadata = {
  title: "Neighborhoods — Alexandra Kerr | Los Angeles Real Estate",
  description:
    "The Los Angeles neighborhoods Alexandra Kerr knows best — Los Feliz, Hancock Park, Windsor Square, the Hollywood Hills, Silver Lake and the Sunset Strip.",
};

/* Woven columns: tall/short, short/tall, tall/short so the middle column rides
   up. Same construction as the home page's hood grid, extended to six areas. */
const COLUMNS = [FEATURED.slice(0, 2), FEATURED.slice(2, 4), FEATURED.slice(4, 6)];

/* eslint-disable @next/next/no-img-element */
export default function NeighborhoodsPage() {
  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="nb-hero">
        <img
          className="nb-hero__img"
          src="/assets/listings/c3-beverlyglen.jpg"
          alt=""
          aria-hidden="true"
          data-fallback
        />
        <div className="nb-hero__scrim" aria-hidden="true"></div>
        <div className="container nb-hero__inner">
          <p className="eyebrow eyebrow--clay">Where We Work</p>
          <h1 className="nb-hero__title">Neighborhoods</h1>
          <p className="nb-hero__sub">
            Los Angeles is not one market. It is several dozen, and the line between two of them is
            often a single street.
          </p>
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="nb-intro">
        <div className="container nb-intro__grid">
          <div className="nb-intro__lead reveal">
            <p className="eyebrow">Local Knowledge</p>
            <p className="nb-intro__statement">
              The listing tells you the square footage. It won&rsquo;t tell you which side of the
              street holds its value.
            </p>
          </div>
          <div className="nb-intro__body reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <p>
              Alexandra has worked these areas for over a decade — long enough to know which blocks
              go quiet after six, where the school boundary actually runs, which hillside lots carry
              a permit history worth reading before you write an offer, and which streets trade on
              relationships rather than listings.
            </p>
            <p>
              What follows is where she spends most of her time. If the area you&rsquo;re considering
              isn&rsquo;t on the list, ask anyway — she will either know it well or tell you plainly
              that she doesn&rsquo;t.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED AREAS ---------- */}
      <section className="nb-areas">
        <div className="container">
          <div className="section-head section-head--split reveal">
            <div>
              <p className="eyebrow">Areas of Expertise</p>
              <h2 className="h2">Where character lives.</h2>
            </div>
            <Link className="text-link" href="/home-search">
              Search every listing<i className="arrow" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="nb-grid">
            {COLUMNS.map((col, c) => (
              <div className="nb-col" key={c}>
                {col.map((h, i) => {
                  const { label, href } = hoodLink(h);
                  return (
                    <Link
                      key={h.name}
                      className={`nb-card${h.tall ? " nb-card--tall" : ""}${h.img ? "" : " nb-card--plain"} reveal`}
                      href={href}
                      style={{ "--d": `${(c * 2 + i) * 0.05}s` } as React.CSSProperties}
                    >
                      {h.img && <img src={h.img} alt={h.alt ?? h.name} loading="lazy" data-fallback />}
                      <div className="nb-card__label">
                        <h3>{h.name}</h3>
                        <p>{h.blurb}</p>
                        <span className="nb-card__count">
                          {label}
                          <i className="arrow" aria-hidden="true"></i>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WIDER SERVICE AREA ---------- */}
      <section className="nb-also">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Also Serving</p>
            <h2 className="h2 h2--sub">Beyond the core six.</h2>
            <p className="lede">
              Areas Alexandra represents clients in regularly, across the basin, the valley and out
              to the desert.
            </p>
          </div>
          <ul className="nb-also__list">
            {ALSO_SERVING.map((h, i) => (
              <li
                className="reveal"
                key={h.name}
                style={{ "--d": `${(i % 3) * 0.06}s` } as React.CSSProperties}
              >
                <Link href={hoodLink(h).href}>
                  <span className="nb-also__name">{h.name}</span>
                  <span className="nb-also__blurb">{h.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- SEARCH BAND ---------- */}
      <section className="nb-band-wrap">
        <div className="container">
          <div className="nb-band reveal">
            <div>
              <p className="eyebrow eyebrow--clay">Start your property search</p>
              <h2>Found the neighborhood? Now find the house.</h2>
              <p>
                Every active and recently sold listing, mapped — filter by price, beds, baths and
                area.
              </p>
            </div>
            <Link href="/home-search" className="btn btn--solid-light">
              Browse Homes
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="nb-cta">
        <div className="container nb-cta__inner reveal">
          <div>
            <p className="eyebrow">The Long View</p>
            <h2 className="h2">Beyond the transaction.</h2>
            <p className="lede">
              Buying into a neighborhood is a longer decision than buying a house. If you want an
              honest read on a specific street — including the unflattering part — that is exactly
              the conversation worth having first.
            </p>
          </div>
          <div className="nb-cta__actions">
            <Link className="btn btn--solid-moss" href="/contact">
              Let&rsquo;s Connect
            </Link>
            <Link className="btn btn--outline-moss" href="/relocation">
              Moving to L.A.?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
