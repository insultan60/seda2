import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import FaqSection from "../../components/Faq";
import { priceLabel } from "../../properties/data";
import { getListings } from "../../properties/listings";
import { TESTIMONIALS } from "../../testimonials/data";
import { IDX, SITE_URL } from "../../site";
import { AREA_PAGES, AREA_SLUGS } from "../areas";
import { FEATURED, listingsIn, mlsLink } from "../data";
import ListingCards from "../ListingCards";
import ListingTabs from "../ListingTabs";
import "../neighborhoods.css";
import "../area.css";

/**
 * Hancock Park, Silver Lake and the Hollywood Hills: one template, filled
 * from ./areas.ts. Los Feliz has its own folder, which Next matches before
 * this one. Only the slugs in AREA_PAGES exist; anything else is a 404.
 */
export const dynamicParams = false;
export const generateStaticParams = () => AREA_SLUGS.map((area) => ({ area }));

/* Listings come from the live MLS feed (cached for six hours). */
export const revalidate = 21600;

const d = (val: string) => ({ "--d": val }) as CSSProperties;

function load(area: string) {
  const copy = AREA_PAGES[area];
  const hood = copy && FEATURED.find((h) => h.name === copy.name);
  return copy && hood ? { copy, hood } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const page = load(area);
  if (!page) return {};
  return {
    title: page.copy.title,
    description: page.copy.description,
    alternates: { canonical: `/neighborhoods/${area}` },
  };
}

/* eslint-disable @next/next/no-img-element */
export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const page = load(area);
  if (!page) notFound();
  const { copy, hood } = page;
  const name = copy.name;
  const url = `${SITE_URL}/neighborhoods/${area}`;
  const searchUrl = mlsLink(hood);

  const listings = listingsIn(hood, await getListings());
  const active = listings.filter((l) => l.status === "Active");
  const sold = listings.filter((l) => l.status === "Sold" && !l.lease);
  /* Only real quotes from clients in this area; the section is left out
     when there are none, as the brief asks. */
  const stories = TESTIMONIALS.filter((t) => t.place === name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Neighborhoods", item: `${SITE_URL}/neighborhoods` },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: copy.h1,
        description: copy.description,
        about: {
          "@type": "Place",
          name,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Los Angeles",
            addressRegion: "CA",
            ...(hood.zips?.[0] ? { postalCode: hood.zips[0] } : {}),
            addressCountry: "US",
          },
          containedInPlace: { "@type": "City", name: "Los Angeles" },
        },
        provider: { "@id": `${SITE_URL}/#agent` },
      },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- HERO ---------- */}
      <section className="nb-hero lf-hero">
        {hood.img && <img className="nb-hero__img" src={hood.img} alt="" aria-hidden="true" data-fallback />}
        <div className="nb-hero__scrim" aria-hidden="true"></div>
        <div className="container nb-hero__inner">
          <Link className="lf-back" href="/neighborhoods">
            <i className="arrow arrow--left" aria-hidden="true"></i>Back to Los Angeles neighborhoods
          </Link>
          <p className="eyebrow eyebrow--clay">{name}, Los Angeles</p>
          <h1 className="nb-hero__title">{copy.h1}</h1>
          <p className="nb-hero__sub">{copy.heroLine}</p>
          <div className="lf-hero__ctas">
            <a className="btn btn--solid-light" href={searchUrl}>Search {name} Homes</a>
            <Link className="btn btn--ghost-light" href="/contact">Schedule a Consultation</Link>
          </div>
        </div>
      </section>

      {/* ---------- LOCAL EXPERT ---------- */}
      <section className="lf-intro">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow">Local Expert</p>
            <h2 className="h2">{copy.intro.h2}</h2>
            <p className="lf-trust__label">Why clients work with her</p>
            <ul className="lf-trust">
              {copy.intro.trust.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="lf-prose reveal" style={d(".1s")}>
            {copy.intro.paras.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ---------- LISTINGS ---------- */}
      <section className="listings lf-listings" id="listings">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Listings</p>
            <h2 className="h2">{name} Homes for Sale</h2>
            <p className="lede">{copy.listings.lead}</p>
          </div>
          <div className="reveal">
            <ListingTabs
              label={`${name} listings`}
              available={
                <>
                  {active.length > 0 ? (
                    <ListingCards items={active} />
                  ) : (
                    <p className="lf-empty">{copy.listings.empty}</p>
                  )}
                  <div className="lf-actions">
                    <a className="btn btn--solid-moss" href={searchUrl}>View All {name} Listings</a>
                    {active.length === 0 && (
                      <a className="btn btn--outline-moss" href={IDX.signup}>Sign Up for Alerts</a>
                    )}
                  </div>
                </>
              }
              sold={
                <>
                  {sold.length > 0 ? (
                    <ListingCards items={sold.slice(0, 6)} sold />
                  ) : (
                    <p className="lf-empty">Alexandra&rsquo;s {name} sales will appear here as they close.</p>
                  )}
                  <div className="lf-actions">
                    <Link className="btn btn--solid-moss" href="/properties">View Sold {name} Homes</Link>
                  </div>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ---------- ARCHITECTURE ---------- */}
      <section className="lf-arch">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Homes &amp; Architecture</p>
            <h2 className="h2">{copy.architecture.h2}</h2>
            {copy.architecture.paras.map((p) => <p className="lede" key={p.slice(0, 40)}>{p}</p>)}
          </div>
          <div className="lf-cols">
            {copy.architecture.sections.map((s, i) => (
              <article className="reveal" key={s.title} style={d(`${i * 0.06}s`)}>
                <h3 className="lf-h3">{s.title}</h3>
                {s.paras.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BUYING ---------- */}
      <section className="lf-buy">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Buying</p>
            <h2 className="h2">{copy.buying.h2}</h2>
            {copy.buying.paras.map((p) => <p className="lede" key={p.slice(0, 40)}>{p}</p>)}
          </div>
          <div className="lf-checks">
            {copy.buying.checklists.map((c, i) => (
              <div className="reveal" key={c.title} style={d(`${i * 0.06}s`)}>
                <h3 className="lf-h3">{c.title}</h3>
                <ul className="lf-check">
                  {c.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="lf-steps reveal">
            <p className="lf-after">{copy.buying.after}</p>
            <a className="btn btn--solid-moss" href={searchUrl}>Start Your {name} Home Search</a>
          </div>
        </div>
      </section>

      {/* ---------- SELLING ---------- */}
      <section className="lf-sell">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow eyebrow--clay">Selling</p>
            <h2 className="h2 h2--light">{copy.selling.h2}</h2>
          </div>
          <div className="reveal" style={d(".1s")}>
            {copy.selling.paras.map((p) => <p className="lf-sell__lede" key={p.slice(0, 40)}>{p}</p>)}
            <Link className="btn btn--solid-light lf-sell__btn" href="/home-valuation">Get Your {name} Home Value</Link>
          </div>
        </div>
      </section>

      {/* ---------- MARKET ---------- */}
      {/* The brief's figures table arrived as placeholders. Its fallback, used
          here: Alexandra's own recent sales in the area, from her listings. */}
      <section className="lf-market">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow">The Market</p>
            <h2 className="h2 h2--sub">{copy.market.h2}</h2>
          </div>
          <div className="lf-prose reveal" style={d(".1s")}>
            {copy.market.paras.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            {sold.length > 0 && (
              <>
                <h3 className="lf-h3">Alexandra&rsquo;s recent {name} sales</h3>
                <ul className="lf-sales">
                  {sold.slice(0, 5).map((l) => (
                    <li key={l.slug}>
                      <Link href={`/properties/${l.slug}`}>{l.addr}</Link>
                      <span>{priceLabel(l)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <a className="btn btn--outline-moss" href={IDX.signup}>Get New {name} Listings</a>
          </div>
        </div>
      </section>

      {/* ---------- LIVING ---------- */}
      <section className="lf-living">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow">Neighborhood Guide</p>
            <h2 className="h2 h2--sub">{copy.living.h2}</h2>
          </div>
          <div className="lf-prose reveal" style={d(".1s")}>
            {copy.living.paras.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            <p>
              For a wider view of the area, read our{" "}
              <Link className="lf-inline" href="/neighborhoods">Los Angeles neighborhood guide</Link>.
            </p>
            <h3 className="lf-h3">{name} ZIP codes</h3>
            <p>{copy.living.zip}</p>
          </div>
        </div>
      </section>

      {/* ---------- CLIENT STORIES (only real ones from this area) ---------- */}
      {stories.length > 0 && (
        <section className="lf-stories">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Client Stories</p>
              <h2 className="h2 h2--sub">What {name} Clients Say</h2>
            </div>
            <div className="lf-stories__grid">
              {stories.map((t, i) => (
                <blockquote className="lf-story reveal" key={t.cite} style={d(`${i * 0.08}s`)}>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <cite>{t.cite}</cite>
                    <span>{t.type}, {name}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="section-foot reveal">
              <Link className="text-link" href="/testimonials">Read More Client Stories<i className="arrow" aria-hidden="true"></i></Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- FAQ (also emits the page's FAQPage schema) ---------- */}
      <FaqSection
        items={copy.faqs}
        title={copy.faqTitle}
        cta={{ label: "Ask Alexandra a Question", href: "/contact" }}
      />

      {/* ---------- NEARBY ---------- */}
      <section className="nb-also lf-nearby">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Nearby</p>
            <h2 className="h2 h2--sub">Nearby Neighborhoods</h2>
          </div>
          <ul className="nb-also__list">
            {copy.nearby.map((n, i) => (
              <li className="reveal" key={n.name} style={d(`${i * 0.06}s`)}>
                <Link href={n.href}>
                  <span className="nb-also__name">{n.name}</span>
                  <span className="nb-also__blurb">{n.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="lf-actions reveal">
            <Link className="btn btn--outline-moss" href="/neighborhoods">All Los Angeles Neighborhoods</Link>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="nb-cta lf-cta">
        <div className="container nb-cta__inner reveal">
          <div>
            <p className="eyebrow">Let&rsquo;s Talk</p>
            <h2 className="h2">{copy.closing.h2}</h2>
            <p className="lede">{copy.closing.text}</p>
          </div>
          <div className="nb-cta__actions">
            <Link className="btn btn--solid-moss" href="/contact">Schedule a Consultation</Link>
            <a className="btn btn--outline-moss" href="tel:+13107951440">Call (310) 795-1440</a>
          </div>
        </div>
      </section>
    </main>
  );
}
