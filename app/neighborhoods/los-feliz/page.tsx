import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import FaqSection from "../../components/Faq";
import { hasSpecs, locationLabel, priceLabel, type Listing } from "../../properties/data";
import { getListings } from "../../properties/listings";
import { TESTIMONIALS } from "../../testimonials/data";
import { IDX, SITE_URL } from "../../site";
import { FEATURED, hoodId, mlsLink } from "../data";
import ListingTabs from "./ListingTabs";
import "../neighborhoods.css";
import "./los-feliz.css";

/* Copy from the October 2026 Los Feliz brief, which targets "los feliz real
   estate". The root layout's title template adds nothing, so the brand is
   appended here, as the brief asks when the template does not. */
export const metadata: Metadata = {
  alternates: { canonical: "/neighborhoods/los-feliz" },
  title: "Los Feliz Real Estate Agent & Homes for Sale | Alexandra Kerr",
  description:
    "Alexandra Kerr is a Los Feliz real estate agent at Compass. Browse Los Feliz homes for sale, from Spanish Colonial to mid-century hillside homes.",
};

/* Listings and counts come from the live MLS feed (cached fifteen minutes). */
export const revalidate = 900;

const d = (val: string) => ({ "--d": val }) as CSSProperties;
const CARD_SIZES = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw";

const LOS_FELIZ = FEATURED.find((h) => h.name === "Los Feliz")!;
const SEARCH_URL = mlsLink(LOS_FELIZ);

/* Her listings in Los Feliz. The MLS reports these addresses as city "Los
   Angeles", so the feed never tags them Los Feliz on its own (see `hood` in
   app/properties/idx.ts); ZIP 90027 is how the feed's records are found.
   Hand-entered listings carry the neighborhood directly. */
const inLosFeliz = (l: Listing) => l.hood === "Los Feliz" || l.zip === "90027";

/* Only quotes from Los Feliz clients, labeled with the role and the area, as
   the brief asks. Nothing here is reused from another neighborhood. */
const STORIES = TESTIMONIALS.filter((t) => t.place === "Los Feliz");

const NEARBY = ["Silver Lake", "Hollywood Hills", "Hancock Park"].map(
  (name) => FEATURED.find((h) => h.name === name)!,
);

const FAQS = [
  {
    q: "Is Los Feliz part of Los Angeles?",
    a: "Yes. Los Feliz is a neighborhood within the City of Los Angeles, so listing sites may show its addresses as either Los Feliz or Los Angeles.",
  },
  {
    q: "Is Los Feliz a good place to live?",
    a: "It suits people who want a walkable village, Griffith Park, and architectural character close to the city. The trade-offs are narrow hillside streets, limited parking in places, and higher prices than much of the Eastside. A drive through at different times of day helps.",
  },
  {
    q: "What is the difference between Los Feliz and Silver Lake?",
    a: "Los Feliz tends to have older, grander homes and a direct link to Griffith Park. Silver Lake is centered on the reservoir, with more craftsman and mid-century homes on smaller lots. Alexandra can show you both in one afternoon.",
  },
  {
    q: "What should I know before buying a historic home in Los Feliz?",
    a: "Check the permit history, the foundation, and the wiring and plumbing. Ask whether the home has any historic designation, since that can limit exterior changes.",
  },
  {
    q: "How do I choose a real estate agent in Los Feliz?",
    a: "Look for sales on streets and in price ranges like yours. Ask how the agent prices homes, markets them, and negotiates, and read recent client reviews.",
  },
  {
    q: "Does Alexandra work outside Los Feliz?",
    a: "Yes. She also works in Silver Lake, the Hollywood Hills, Hancock Park, Windsor Square, the Sunset Strip, and across Los Angeles.",
  },
];

/* Breadcrumbs, plus the page as a WebPage about the place. The agent is the
   RealEstateAgent node the root layout emits, referenced by its @id. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Neighborhoods", item: `${SITE_URL}/neighborhoods` },
        { "@type": "ListItem", position: 3, name: "Los Feliz", item: `${SITE_URL}/neighborhoods/los-feliz` },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/neighborhoods/los-feliz`,
      url: `${SITE_URL}/neighborhoods/los-feliz`,
      name: "Los Feliz Real Estate Agent & Homes for Sale",
      about: {
        "@type": "Place",
        name: "Los Feliz",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          postalCode: "90027",
          addressCountry: "US",
        },
        containedInPlace: { "@type": "City", name: "Los Angeles" },
      },
      provider: { "@id": `${SITE_URL}/#agent` },
    },
  ],
};

function Cards({ items, sold }: { items: Listing[]; sold?: boolean }) {
  return (
    <div className={sold ? "sold__grid" : "listings__grid"}>
      {items.map((l) => (
        <article className={`listing${sold ? " listing--sold" : ""}`} key={l.slug}>
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
            <Link className="text-link listing__view" href={`/properties/${l.slug}`} aria-label={`View ${l.addr}`}>
              View<i className="arrow" aria-hidden="true"></i>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
export default async function LosFelizPage() {
  const listings = (await getListings()).filter(inLosFeliz);
  const active = listings.filter((l) => l.status === "Active");
  const sold = listings.filter((l) => l.status === "Sold" && !l.lease).slice(0, 6);

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ---------- HERO ---------- */}
      <section className="nb-hero lf-hero">
        <img className="nb-hero__img" src={LOS_FELIZ.img} alt="" aria-hidden="true" data-fallback />
        <div className="nb-hero__scrim" aria-hidden="true"></div>
        <div className="container nb-hero__inner">
          <p className="eyebrow eyebrow--clay">Los Feliz, Los Angeles</p>
          <h1 className="nb-hero__title">Los Feliz Real Estate Agent</h1>
          <p className="nb-hero__sub">
            Spanish Colonial estates, Lloyd Wright houses, and mid-century hillside homes, guided by
            a local expert.
          </p>
          <div className="lf-hero__ctas">
            <a className="btn btn--solid-light" href={SEARCH_URL}>Search Los Feliz Homes</a>
            <Link className="btn btn--ghost-light" href="/contact">Schedule a Consultation</Link>
          </div>
        </div>
      </section>

      {/* ---------- LOCAL EXPERT ---------- */}
      <section className="lf-intro">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow">Local Expert</p>
            <h2 className="h2">Your Los Feliz Realtor</h2>
            <ul className="lf-trust">
              <li>Over a decade in Los Angeles real estate</li>
              <li>179 homes sold and $184M in total sales</li>
              <li>Compass Estates Director and Senior Real Estate Specialist</li>
            </ul>
          </div>
          <div className="lf-prose reveal" style={d(".1s")}>
            <p>
              Alexandra Kerr is a Los Feliz real estate agent and Estates Director at Compass. She has
              helped buyers and sellers across Los Angeles for over a decade, with a focus on homes
              that have history and design pedigree.
            </p>
            <p>
              Los Feliz suits that focus. Early Hollywood built its houses here, and architects like
              Lloyd Wright and Richard Neutra left some of the city&rsquo;s best-known homes on these
              streets.
            </p>
            <p>
              Los Feliz real estate moves street by street. A house near the village and one high in
              the hills can differ in price, privacy, and what you are allowed to change. Alexandra
              explains those differences before you make a move.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- LISTINGS ---------- */}
      <section className="listings lf-listings" id="listings">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Listings</p>
            <h2 className="h2">Los Feliz Homes for Sale</h2>
            <p className="lede">
              Search current Los Feliz houses for sale, from hillside retreats to Spanish Colonial
              estates. Alexandra can arrange a private showing for any home you like.
            </p>
          </div>
          <div className="reveal">
            <ListingTabs
              available={
                <>
                  {active.length > 0 ? (
                    <Cards items={active} />
                  ) : (
                    <p className="lf-empty">
                      Alexandra has no Los Feliz listing of her own on the market this week. Every
                      Los Feliz home for sale on the MLS is one click away.
                    </p>
                  )}
                  <div className="lf-actions">
                    <a className="btn btn--solid-moss" href={SEARCH_URL}>View All Los Feliz Listings</a>
                  </div>
                </>
              }
              sold={
                <>
                  <h3 className="lf-h3">Recently Sold in Los Feliz</h3>
                  <p className="lf-tabs__lede">
                    Recent closed sales show what buyers actually paid, and how quickly homes moved,
                    on the streets you are considering.
                  </p>
                  {sold.length > 0 && <Cards items={sold} sold />}
                  <div className="lf-actions">
                    <Link className="btn btn--solid-moss" href="/properties">View Sold Los Feliz Homes</Link>
                    <a className="btn btn--outline-moss" href={IDX.signup}>Get New Los Feliz Listings</a>
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
            <h2 className="h2">Los Feliz Architecture and Homes</h2>
            <p className="lede">
              Los Feliz architecture is the reason many buyers choose this neighborhood. One hillside
              street can hold a Spanish Colonial house, a Neutra, and a Lloyd Wright.
            </p>
          </div>
          <div className="lf-cols">
            <article className="reveal">
              <h3 className="lf-h3">Spanish Colonial and historic homes</h3>
              <p>
                Red tile roofs, arched doorways, and stucco walls define much of the older housing.
                Many of these historic homes in Los Feliz date from the early decades of
                Hollywood&rsquo;s growth.
              </p>
              <p>
                When you tour one, look at the original details first: plaster, ironwork, tile, and
                windows. Then ask what has been updated underneath, such as wiring, plumbing, and the
                foundation.
              </p>
            </article>
            <article className="reveal" style={d(".06s")}>
              <h3 className="lf-h3">Lloyd Wright and Frank Lloyd Wright</h3>
              <p>
                Lloyd Wright, the son of Frank Lloyd Wright, designed the Sowden House on Franklin
                Avenue. His father&rsquo;s Ennis House also stands in the Los Feliz hills.
              </p>
              <p>
                Homes of this kind rarely come to market. When one does, the design record, the
                permit history, and any monument status matter as much as the price.
              </p>
            </article>
            <article className="reveal" style={d(".12s")}>
              <h3 className="lf-h3">Neutra and mid-century modern homes</h3>
              <p>
                Richard Neutra&rsquo;s Lovell Health House sits on Dundee Drive. Mid-century modern
                homes with glass walls and open plans fill the hillsides, and they suit buyers who
                want indoor-outdoor living and city views.
              </p>
            </article>
          </div>

          <div className="lf-areas reveal">
            <h3 className="lf-h3">Areas within Los Feliz</h3>
            <p>The neighborhood is not one market. These pockets trade differently:</p>
            <dl className="lf-areas__list">
              <div><dt>Los Feliz Village and the flats</dt><dd>Closer to shops and restaurants, with a more walkable feel.</dd></div>
              <div><dt>Laughlin Park</dt><dd>A gated enclave known for large, private estates.</dd></div>
              <div><dt>The hills near Griffith Park</dt><dd>Bigger lots and views, with the usual hillside checks.</dd></div>
              <div><dt>Franklin Hills</dt><dd>A hillside area on the Silver Lake side, with a mix of Spanish and mid-century homes.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- BUYING ---------- */}
      <section className="lf-buy">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Buying</p>
            <h2 className="h2">Buying a Home in Los Feliz</h2>
            <p className="lede">
              Los Feliz real estate ranges from condos near the village to luxury real estate in the
              hills. Alexandra helps you decide what fits your budget and your routine before you
              start touring.
            </p>
          </div>
          <div className="lf-cols">
            <article className="reveal">
              <h3 className="lf-h3">Houses for sale in Los Feliz</h3>
              <p>
                Most buyers look for single-family houses. Houses for sale in Los Feliz run from
                1920s bungalows to restored architectural homes.
              </p>
              <p>
                Alexandra compares each home with recent sales on the same street, so you know
                whether the price holds up.
              </p>
            </article>
            <article className="reveal" style={d(".06s")}>
              <h3 className="lf-h3">Hillside homes in Los Feliz</h3>
              <p>
                Hillside homes offer views and privacy. They also bring retaining walls, drainage,
                steep driveways, and insurance questions.
              </p>
              <p>Alexandra reviews permits and past repairs with you before you write an offer.</p>
            </article>
            <article className="reveal" style={d(".12s")}>
              <h3 className="lf-h3">Los Feliz condos for sale</h3>
              <p>
                Los Feliz condos for sale tend to cost less and need less upkeep than houses. Before
                you commit, Alexandra reads the HOA budget, the building rules, and recent sales in
                the complex.
              </p>
            </article>
          </div>

          <div className="lf-steps reveal">
            <h3 className="lf-h3">How Alexandra helps you buy</h3>
            <ol>
              <li><strong>Set your plan.</strong> Share your budget, timeline, and must-haves.</li>
              <li><strong>Compare streets, not just homes.</strong> Alexandra shows you options and explains how each block differs.</li>
              <li><strong>Make a strong offer.</strong> She writes the offer, negotiates the terms, and guides you through escrow.</li>
            </ol>
            <a className="btn btn--solid-moss" href={SEARCH_URL}>Start Your Los Feliz Home Search</a>
          </div>
        </div>
      </section>

      {/* ---------- SELLING ---------- */}
      <section className="lf-sell">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow eyebrow--clay">Selling</p>
            <h2 className="h2 h2--light">Sell Your House in Los Feliz</h2>
            <p className="lf-sell__lede">
              Selling a house in Los Feliz starts with the right price. In this neighborhood, design,
              lot, and condition often matter more than square footage.
            </p>
            <p className="lf-sell__lede">
              Alexandra studies recent Los Feliz sales, plans the marketing, and manages offers
              through closing.
            </p>
          </div>
          <div className="reveal" style={d(".1s")}>
            <h3 className="lf-sell__h3">What you get</h3>
            <ul className="lf-sell__list">
              <li>A price plan based on sales of similar homes on your street</li>
              <li>Photography and marketing that show off the home&rsquo;s design</li>
              <li>Offer review and negotiation</li>
              <li>Support through escrow</li>
            </ul>
            <p className="lf-sell__lede">
              Curious what your home is worth? Request a Los Feliz home valuation and see how Los
              Feliz home values compare on your block.
            </p>
            <Link className="btn btn--solid-light lf-sell__btn" href="/home-valuation">Get Your Los Feliz Home Value</Link>
          </div>
        </div>
      </section>

      {/* ---------- MARKET ---------- */}
      {/* The brief's snapshot table (median price, range, days on market, homes
          sold) is held back: it arrived as placeholders marked "do not publish",
          and figures without a source and an as-of date would be invented.
          Add it here once the numbers come from a sourced report. */}
      <section className="lf-market">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow">The Market</p>
            <h2 className="h2 h2--sub">Los Feliz Real Estate Market</h2>
          </div>
          <div className="lf-prose reveal" style={d(".1s")}>
            <p>
              The Los Feliz real estate market shifts street by street and month by month. Hillside
              homes and flat-lot homes can move at different speeds, and a famous architect&rsquo;s
              name can lift one house above its neighbors.
            </p>
            <Link className="btn btn--outline-moss" href="/contact">Request the Latest Los Feliz Market Report</Link>
          </div>
        </div>
      </section>

      {/* ---------- LIVING ---------- */}
      <section className="lf-living">
        <div className="container lf-split">
          <div className="reveal">
            <p className="eyebrow">Neighborhood Guide</p>
            <h2 className="h2 h2--sub">Living in Los Feliz, Los Angeles</h2>
          </div>
          <div className="lf-prose reveal" style={d(".1s")}>
            <p>
              Think of this as a short Los Feliz neighborhood guide for buyers. The neighborhood sits
              in the City of Los Angeles, east of Hollywood and just south of Griffith Park.
            </p>
            <p>
              Los Feliz Village, around Vermont and Hillhurst Avenues, has restaurants, cafes, and
              independent shops. It is one of the more walkable pockets in Los Angeles.
            </p>
            <p>
              Griffith Park and the Observatory give residents trails and city views close to home.
              Silver Lake and East Hollywood are a short drive away.
            </p>
            <h3 className="lf-h3">Los Feliz ZIP code</h3>
            <p>
              Most of Los Feliz uses ZIP code 90027. The edges of the neighborhood share ZIP codes
              with nearby areas, so confirm the ZIP for any address you are considering.
            </p>
            <p>
              Comparing areas? Read our <Link className="lf-inline" href="/neighborhoods">Los Angeles neighborhood guide</Link> for
              the other core neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CLIENT STORIES ---------- */}
      {STORIES.length > 0 && (
        <section className="lf-stories">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Client Stories</p>
              <h2 className="h2 h2--sub">What Los Feliz Clients Say</h2>
            </div>
            <div className="lf-stories__grid">
              {STORIES.map((t, i) => (
                <blockquote className="lf-story reveal" key={t.cite} style={d(`${i * 0.08}s`)}>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <cite>{t.cite}</cite>
                    <span>{t.type}, Los Feliz</span>
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
      <FaqSection items={FAQS} title="Los Feliz Real Estate FAQs" />

      {/* ---------- NEARBY ---------- */}
      <section className="nb-also lf-nearby">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Nearby</p>
            <h2 className="h2 h2--sub">Explore Nearby Neighborhoods</h2>
          </div>
          <ul className="nb-also__list">
            {NEARBY.map((h, i) => (
              <li className="reveal" key={h.name} style={d(`${i * 0.06}s`)}>
                <Link href={h.page ?? `/neighborhoods#${hoodId(h)}`}>
                  <span className="nb-also__name">{h.name}</span>
                  <span className="nb-also__blurb">{h.blurb}</span>
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
            <h2 className="h2">Thinking About a Move in Los Feliz?</h2>
            <p className="lede">
              Tell Alexandra what you want from a home, and she will tell you honestly which streets
              fit.
            </p>
          </div>
          <div className="nb-cta__actions">
            <Link className="btn btn--solid-moss" href="/contact">Schedule a Consultation</Link>
            <Link className="btn btn--outline-moss" href="/contact">Get in Touch</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
