import type { Metadata } from "next";
import Link from "next/link";
import FaqSection from "../components/Faq";
import { getListings } from "../properties/listings";
import { SITE_URL } from "../site";
import { ALSO_SERVING, FEATURED, hoodId, hoodLink, mlsLink, REGIONS } from "./data";
import "./neighborhoods.css";

/* Title, description and H1 from the October 2026 SEO copy, which targets
   "los angeles neighborhoods" with a local's-guide framing. */
export const metadata: Metadata = {
  alternates: { canonical: "/neighborhoods" },
  title: "Los Angeles Neighborhoods: A Local's Guide | Alexandra Kerr",
  description:
    "A guide to Los Angeles neighborhoods from a local agent: Los Feliz, Hollywood Hills, Silver Lake, Hancock Park, Windsor Square, and the Sunset Strip.",
};

/* Woven columns: tall/short, short/tall, tall/short so the middle column rides
   up. Same construction as the home page's hood grid, extended to six areas. */
const COLUMNS = [FEATURED.slice(0, 2), FEATURED.slice(2, 4), FEATURED.slice(4, 6)];

/* What buyers in each core area tend to pay for. Order follows FEATURED. */
const COMPARE = [
  { name: "Los Feliz", setting: "Hillside streets below Griffith Park", arch: "Lloyd Wright, Neutra, Spanish Colonial", pays: "Pedigree and privacy" },
  { name: "Hollywood Hills", setting: "Canyons above the city", arch: "Mid-century glass", pays: "View and quiet" },
  { name: "Silver Lake", setting: "Hills around the reservoir", arch: "Craftsman, mid-century", pays: "Character and walkability" },
  { name: "Hancock Park", setting: "Flat, wide, tree-lined streets", arch: "Period revival homes", pays: "Lot size and a protected streetscape" },
  { name: "Windsor Square", setting: "Formal, tree-lined blocks", arch: "Large traditional estates", pays: "Privacy and an established address" },
  { name: "Sunset Strip", setting: "Hillside above the Strip", arch: "Cantilevered contemporary", pays: "View corridor and access" },
];

const CHOOSE = [
  { q: "How do you commute?", a: "Traffic patterns change the feel of a neighborhood more than distance on a map. Drive the route at the hours you would actually travel." },
  { q: "Hillside or flat?", a: "Hillside homes offer views and privacy, but they bring slopes, retaining walls, and drainage to inspect. Flat lots in areas like Hancock Park are simpler to maintain and easier to expand." },
  { q: "What do you want the house to be?", a: "A mid-century glass home, a craftsman, and a period estate each need different care, and each limits what you can change." },
  { q: "Where do the school and city boundaries run?", a: "Los Angeles neighborhoods are not always separate cities. Beverly Hills and Santa Monica, for example, have their own city rules and school districts." },
];

const FAQS = [
  {
    q: "What is a Historic Preservation Overlay Zone?",
    a: "It is a city designation that protects the character of older neighborhoods. Exterior changes in these zones usually need review, so check the property’s status before you plan a remodel. You can confirm it on the City of Los Angeles planning website.",
  },
  {
    q: "Do hillside homes cost more to own?",
    a: "Often, yes. Retaining walls, drainage, and landslide or fire exposure can add maintenance and insurance costs. A home inspection plus a review of permits and past repairs gives a clearer picture.",
  },
  {
    q: "How do I search for homes in one specific neighborhood?",
    a: "Use the Los Angeles home search on this site and filter by area, price, beds, and baths. You can also set up new listing alerts for a single neighborhood, so you hear about homes as they come on the market.",
  },
  {
    q: "Do some homes sell before they reach the MLS?",
    a: "Yes, especially in areas with slow turnover. Private exclusives and off-market sales happen through agent relationships, so working with someone who knows the street matters.",
  },
  {
    q: "Can Alexandra help in a neighborhood that is not on this page?",
    a: "Yes. She works across the Eastside, the Westside, and the San Fernando Valley. If she does not know an area well, she will tell you plainly.",
  },
];

/* Breadcrumb trail for search results, alongside the FAQPage the FAQ section
   emits. The agent node itself lives in the root layout. */
const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Neighborhoods", item: `${SITE_URL}/neighborhoods` },
  ],
};

/* eslint-disable @next/next/no-img-element */
/* Tile counts come from the live MLS feed (cached fifteen minutes). */
export const revalidate = 900;

export default async function NeighborhoodsPage() {
  const listings = await getListings();
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS) }}
      />

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
          <h1 className="nb-hero__title nb-hero__title--long">Los Angeles Neighborhoods: A Local&rsquo;s Guide</h1>
          <p className="nb-hero__sub">
            Los Angeles is not one market. It is several dozen, and the line between two of them is
            often a single street.
          </p>
        </div>
      </section>

      {/* ---------- GUIDE INTRO ---------- */}
      <section className="nb-guide">
        <div className="container nb-guide__inner reveal">
          <h2 className="h2">Find the Right Neighborhood Before You Find the Right House</h2>
          <p className="lede">
            Choosing among the best neighborhoods in Los Angeles is harder than it looks. Two streets
            a block apart can differ in price, privacy, and the rules on what you can build.
          </p>
          <p className="lede">
            This Los Angeles neighborhood guide covers the six areas Alexandra Kerr knows best: Los
            Feliz, the Hollywood Hills, Silver Lake, Hancock Park, Windsor Square, and the Sunset
            Strip. If you are still deciding where to live in Los Angeles, start here.
          </p>
        </div>
      </section>

      {/* ---------- LOCAL KNOWLEDGE ---------- */}
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
              Alexandra has worked in these areas for over a decade. That is long enough to know
              which blocks go quiet after six, where the school boundary actually runs, which
              hillside lots carry a permit history worth reading before you write an offer, and
              which streets trade on relationships rather than listings.
            </p>
            <p>
              What follows is where she spends most of her time. If the area you are considering is
              not on the list, ask anyway. She will either know it well or tell you plainly that she
              does not.
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
              <h2 className="h2">Los Angeles Neighborhoods We Know Best</h2>
              <p className="lede">Each area below works like its own market.</p>
            </div>
            <Link className="text-link" href="/home-search">
              Search every listing<i className="arrow" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="nb-grid">
            {COLUMNS.map((col, c) => (
              <div className="nb-col" key={c}>
                {col.map((h, i) => {
                  const { label, href } = hoodLink(h, listings);
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

          {/* Each area's write-up. The ids are what the home page's list links
              to. The button opens the area's own page where it has one (Los
              Feliz), else every home for sale there on the MLS. */}
          <div className="nb-profiles">
            {FEATURED.map((h) => (
              <article className="nb-profile reveal" id={hoodId(h)} key={h.name}>
                <h3 className="nb-profile__name">{h.name}</h3>
                <div className="nb-profile__body">
                  {h.guide?.map((para) => <p key={para.slice(0, 32)}>{para}</p>)}
                  <a className="text-link" href={h.page ?? mlsLink(h)}>
                    {h.cta ?? `Homes for Sale in ${h.name}`}
                    <i className="arrow" aria-hidden="true"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COMPARISON ---------- */}
      <section className="nb-compare">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">At a Glance</p>
            <h2 className="h2 h2--sub">Los Angeles Neighborhoods Compared</h2>
            <p className="lede">
              Use this table to narrow the list before you visit. Each row reflects what buyers in
              that area tend to pay for.
            </p>
          </div>
          <div className="nb-compare__scroll reveal" tabIndex={0} role="region" aria-label="Neighborhood comparison table">
            <table className="nb-compare__table">
              <thead>
                <tr>
                  <th scope="col">Neighborhood</th>
                  <th scope="col">Setting</th>
                  <th scope="col">Typical architecture</th>
                  <th scope="col">What buyers pay for</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td>{r.setting}</td>
                    <td>{r.arch}</td>
                    <td>{r.pays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- LUXURY MARKET ---------- */}
      {/* "$3.6M to $7.8M" is her own closings in app/properties/data.ts:
          206 N Windsor ($3,639,161) up to 414 S Windsor ($7,775,000). */}
      <section className="nb-prose">
        <div className="container nb-prose__grid">
          <div className="reveal">
            <p className="eyebrow">The High End</p>
            <h2 className="h2 h2--sub">Luxury Neighborhoods in Los Angeles</h2>
          </div>
          <div className="nb-prose__body reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <p>
              Lists of the wealthiest neighborhoods in Los Angeles usually feature Beverly Hills,
              Bel Air, and Holmby Hills. Those are well-known estate markets, and Alexandra serves
              clients in Beverly Hills as well.
            </p>
            <p>
              The most expensive neighborhoods in Los Angeles are not the only luxury neighborhoods,
              though. Many buyers look for architecture, history, or a protected street instead of
              the largest lot. That is why areas like Los Feliz, Hancock Park, and Windsor Square
              draw serious buyers at the high end.
            </p>
            <p>
              Alexandra&rsquo;s recent sales show the range. Homes in her core areas have closed from
              about $3.6M to $7.8M, and each price reflected a different mix of view, lot,
              condition, and street.
            </p>
            <p>
              Price per square foot rarely tells the full story. Permit history, lot access, and the
              quality of the original design often matter more, which is why a local read on the
              block is worth having before you tour.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- HOW TO CHOOSE ---------- */}
      <section className="nb-choose">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Deciding</p>
            <h2 className="h2 h2--sub">How to Choose Where to Live in Los Angeles</h2>
            <p className="lede">Start with how you live, then narrow by street. Four questions usually settle most of the decision.</p>
          </div>
          <ol className="nb-choose__list">
            {CHOOSE.map((c, i) => (
              <li className="reveal" key={c.q} style={{ "--d": `${(i % 2) * 0.06}s` } as React.CSSProperties}>
                <h3>{c.q}</h3>
                <p>{c.a}</p>
              </li>
            ))}
          </ol>
          <p className="nb-choose__note reveal">
            Alexandra checks these details street by street, including the unflattering parts, so you
            know what you are buying before you write an offer.
          </p>
        </div>
      </section>

      {/* ---------- WIDER SERVICE AREA ---------- */}
      <section className="nb-also">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Also Serving</p>
            <h2 className="h2 h2--sub">Beyond the Core Six</h2>
            <p className="lede">
              Alexandra also represents clients regularly from the Eastside hills out to the coast.
            </p>
          </div>
          <ul className="nb-also__list">
            {ALSO_SERVING.map((h, i) => (
              <li
                className="reveal"
                key={h.name}
                style={{ "--d": `${(i % 3) * 0.06}s` } as React.CSSProperties}
              >
                <Link href={hoodLink(h, listings).href}>
                  <span className="nb-also__name">{h.name}</span>
                  <span className="nb-also__blurb">{h.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* The broad regions, as prose. See REGIONS in ./data.ts for why they
              are not tiles alongside the named neighborhoods. */}
          <p className="nb-also__regions reveal">
            She also works throughout {REGIONS.slice(0, -1).join(", ")}, and {REGIONS.at(-1)}. If
            your area is not named here, ask.
          </p>
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
                Every active and recently sold listing, mapped. Filter by price, beds, baths, and
                area.
              </p>
            </div>
            <Link href="/home-search" className="btn btn--solid-light">
              Browse Homes
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FAQ (also emits the page's FAQPage schema) ---------- */}
      <FaqSection items={FAQS} title="Los Angeles Neighborhood Questions" />

      {/* ---------- CLOSING CTA ---------- */}
      <section className="nb-cta">
        <div className="container nb-cta__inner reveal">
          <div>
            <p className="eyebrow">The Long View</p>
            <h2 className="h2">Beyond the transaction.</h2>
            <p className="lede">
              Buying into a neighborhood is a longer decision than buying a house. If you want an
              honest read on a specific street, including the unflattering part, that is the
              conversation worth having first.
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
