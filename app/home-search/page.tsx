import type { Metadata } from "next";
import Link from "next/link";
import SearchClient from "./SearchClient";
import FaqSection, { type FaqItem } from "../components/Faq";
import { getListings } from "../properties/listings";
import { IDX } from "../site";
import "../components/copy.css";
import "./search.css";

/* Copy from the October 2026 content brief ("Home Search Page Copy"). The
   page targets "luxury homes for sale Los Angeles", with "Los Angeles homes
   for sale" in the title and H1. */
export const metadata: Metadata = {
  alternates: { canonical: "/home-search" },
  title: "Los Angeles Homes for Sale | Luxury Homes | Alexandra Kerr",
  description:
    "Search Los Angeles homes for sale with Alexandra Kerr of Compass. Luxury, mid-century, and historic homes across Los Feliz, Hollywood Hills, and beyond.",
};

const TIERS = [
  ["$2 million to $4 million", "Well-kept character homes on good streets, often with original detail and room to update."],
  ["$4 million to $8 million", "Larger estates, rebuilt hillside houses, and period homes on deep lots."],
  ["$8 million and above", "Significant estates and architectural properties, many of which sell quietly before they are widely marketed."],
];

const HOODS = [
  ["Los Feliz homes for sale", "/neighborhoods/los-feliz", "Houses below Griffith Park, from small bungalows to landmark architecture."],
  ["Hollywood Hills homes for sale", "/neighborhoods/hollywood-hills", "View homes along canyon roads and winding streets."],
  ["Silver Lake homes for sale", "/neighborhoods/silver-lake", "Bungalows and modernist houses around the reservoir."],
  ["Hancock Park homes for sale", "/neighborhoods/hancock-park", "Large lots and period architecture near Larchmont."],
  ["Windsor Square homes for sale", "/neighborhoods/windsor-square", "Grand houses on quiet blocks just north of Wilshire."],
  ["Sunset Strip homes for sale", "/neighborhoods/sunset-strip", "Contemporary homes with city views above the boulevard."],
];

const STEPS = [
  ["Shortlist", "Save your search and narrow it to the few homes worth seeing."],
  ["Tour", "Visit in person or by video, and pay attention to the street, the light, and how the rooms connect."],
  ["Compare", "Alexandra pulls recent sales, disclosures, and property records for the homes you like."],
  ["Offer", "You write an offer shaped by those comparisons and the seller’s priorities, then follow it through escrow to closing."],
];

const FAQ: FaqItem[] = [
  {
    q: "Does this search show every home for sale in Los Angeles?",
    a: "This view shows Alexandra’s current listings and recent sales. To see every active listing on the Greater Los Angeles MLS, use the “See every home for sale on the MLS” link above the results.",
  },
  {
    q: "How often is the listing data updated?",
    a: "Listing data comes from the MLS and is refreshed regularly. A home can go pending or sell before an update reaches the site, so confirm availability with Alexandra before you plan a showing.",
  },
  {
    q: "What do Active, Pending, and Coming Soon mean?",
    a: "Active means the home is on the market and open to offers. Pending means the seller has accepted an offer and the sale is moving toward closing. Coming Soon means the home has been announced but is not yet open for showings. Exact terms can vary slightly by MLS.",
  },
  {
    q: "Can I see what a home sold for and its price history?",
    a: "Yes. The Sold tab shows recent closed sales. Alexandra can also pull the sales history of a specific home, along with comparable sales on the same street, which tells you more than a single sold price.",
  },
  {
    q: "Do I need pre-approval before touring a home?",
    a: "Not always for a first look, but it helps. Sellers of higher-priced homes often ask for a pre-approval letter or proof of funds before a private showing and expect one with an offer. Speaking with a lender early also shows you which price range is realistic.",
  },
];

/* `?q=` is read here rather than in the client component so the first render
   already carries the filter — no effect, no post-hydration flash, and the
   neighborhood tiles that deep-link in get a correct result set immediately. */
export default async function HomeSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; status?: string | string[] }>;
}) {
  const [{ q, status }, listings] = await Promise.all([searchParams, getListings()]);
  const initialQuery = (Array.isArray(q) ? q[0] : q) ?? "";
  // /home-search?status=sold opens on the Sold tab.
  const initialStatus = String(Array.isArray(status) ? status[0] : status ?? "").toLowerCase() === "sold" ? "Sold" : "Active";

  return (
    <main id="main" className="page-search">
      {/* ---------- INTRO ---------- */}
      <section className="cp cp--cream hs-intro">
        <div className="container hs-intro__inner">
          <div>
            <p className="eyebrow">Home Search · Los Angeles</p>
            <h1 className="cp-h1">Search Los Angeles Homes for Sale</h1>
          </div>
          <div>
            <p className="hs-intro__text">
              Browse Alexandra&rsquo;s current listings and recent sales on the map below, or open the full MLS
              search to see every home for sale in Los Angeles. This Los Angeles real estate search is built for
              buyers who care about architecture, setting, and history. Create a free account and new listings
              reach you first.
            </p>
            <div className="cp-actions">
              <a className="btn btn--solid-moss" href={IDX.signup}>Get New Listing Alerts</a>
            </div>
          </div>
        </div>
      </section>

      <SearchClient initialQuery={initialQuery} initialStatus={initialStatus} listings={listings} />

      {/* ---------- HOW TO USE ---------- */}
      <section className="cp">
        <div className="container cp-split">
          <div className="cp-head reveal">
            <p className="eyebrow">Using the Map</p>
            <h2 className="cp-title">How to Use This Search</h2>
          </div>
          <div className="cp-prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p>
              Start with a location, then set a price range and the number of bedrooms and baths. Switch between
              Map and List to see where each home sits or to compare photos side by side. The Sold tab shows recent
              closed sales, which helps you see what homes on a given street have actually brought. Save any search
              to your account and matching homes are sent to you as they come to market.
            </p>
            <div className="cp-actions">
              <a className="btn btn--outline-moss" href={IDX.login}>Create a Free Account</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHAT FILTERS DON'T SHOW ---------- */}
      <section className="cp cp--cream">
        <div className="container cp-split">
          <div className="cp-head reveal">
            <p className="eyebrow">Beyond the Filters</p>
            <h2 className="cp-title">What the Filters Don&rsquo;t Show You</h2>
            <p className="cp-sub">
              Filters sort by price, bedrooms, and square footage. They cannot tell you which house is worth the
              money.
            </p>
          </div>
          <div className="cp-prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p>
              Two homes at the same price can sit on very different streets. One may face a quiet cul-de-sac. The
              other may back onto a through road that fills with traffic at five o&rsquo;clock. Listing photos
              rarely say.
            </p>
            <p>
              Light matters as much as layout. A glass-walled house facing west can be spectacular at sunset and
              uncomfortable in August. Orientation, tree cover, and neighboring rooflines change how a home lives
              day to day.
            </p>
            <p>
              Square footage hides part of the story, too. In many Los Angeles neighborhoods, the land carries more
              of the value than the house. An older home on a strong lot can be a better purchase than a newer one
              on a weaker street.
            </p>
            <p>
              Finally, a fresh renovation can look the same in photos whether it was done well or quickly. Ask who
              did the work and what sits behind the finishes.
            </p>
            <p>
              <strong>
                Alexandra walks through these details with buyers before a showing, so the shortlist gets shorter
                for the right reasons.
              </strong>
            </p>
            <div className="cp-actions">
              <Link className="btn btn--solid-moss" href="/contact">Tell Alexandra What You&rsquo;re Looking For</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- LUXURY ---------- */}
      <section className="cp">
        <div className="container">
          <div className="cp-head reveal">
            <p className="eyebrow">By Price</p>
            <h2 className="cp-title">Luxury Homes for Sale in Los Angeles</h2>
            <p className="cp-sub">
              Luxury homes for sale in Los Angeles cover a wide range, because the word means something different on
              every street. A useful way to search is by what each price level tends to buy:
            </p>
          </div>
          <div className="cp-tiers">
            {TIERS.map(([range, body], i) => (
              <div className="cp-tier reveal" key={range} style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}>
                <p className="cp-tier__range">{range}</p>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="cp-prose reveal">
            <p style={{ marginTop: "1.6rem" }}>
              Set your range in the search above, then ask Alexandra how the numbers hold up on the specific streets
              you like.
            </p>
            <div className="cp-actions">
              <a className="btn btn--solid-moss" href={IDX.mapSearch}>Search Luxury Homes</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MID-CENTURY + HISTORIC ---------- */}
      <section className="cp cp--white">
        <div className="container cp-pair">
          <div className="cp-prose reveal">
            <p className="eyebrow">By Style</p>
            <h2 className="cp-title">Mid-Century Homes for Sale in Los Angeles</h2>
            <p style={{ marginTop: "1.2rem" }}>
              Mid-century homes for sale in Los Angeles tend to share a few traits: post-and-beam construction, walls
              of glass, low rooflines, and a close tie between house and garden. Many sit on hillsides, where the
              design is built around the view.
            </p>
            <p>
              What matters most is how much of the original survives. Look at the glazing, the roof, the original
              floors and cabinetry, and whether past additions respect the architect&rsquo;s intent. A well-kept
              house with its character intact is rare, so it helps to be ready when one appears.
            </p>
            <p>
              You will find the strongest concentration in{" "}
              <Link href="/neighborhoods/hollywood-hills">Hollywood Hills</Link>,{" "}
              <Link href="/neighborhoods/silver-lake">Silver Lake</Link>, and{" "}
              <Link href="/neighborhoods/los-feliz">Los Feliz</Link>.
            </p>
            <div className="cp-actions">
              <a className="btn btn--outline-moss" href={IDX.mapSearch}>Search Mid-Century Homes</a>
            </div>
          </div>
          <div className="cp-prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p className="eyebrow">By Era</p>
            <h2 className="cp-title">Historic Homes for Sale in Los Angeles</h2>
            <p style={{ marginTop: "1.2rem" }}>
              Historic homes for sale in Los Angeles include Spanish Colonial Revival houses, Craftsman bungalows,
              Tudor cottages, and period estates from the early twentieth century. Their appeal is plaster walls,
              tilework, mature gardens, and proportions that newer houses rarely match.
            </p>
            <p>
              Condition and restoration quality vary widely. Ask what has been updated, what is original, and
              whether the work respected the house. Some neighborhoods, including parts of Hancock Park and Windsor
              Square, also have preservation rules that can limit exterior changes, so check what applies to an
              address before you plan a project.
            </p>
            <p>
              <Link href="/neighborhoods/hancock-park">Hancock Park</Link>,{" "}
              <Link href="/neighborhoods/windsor-square">Windsor Square</Link>, and{" "}
              <Link href="/neighborhoods/los-feliz">Los Feliz</Link> are good places to start.
            </p>
            <div className="cp-actions">
              <a className="btn btn--outline-moss" href={IDX.mapSearch}>Search Historic Homes</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BY NEIGHBORHOOD ---------- */}
      <section className="cp cp--cream">
        <div className="container">
          <div className="cp-head reveal">
            <p className="eyebrow">By Neighborhood</p>
            <h2 className="cp-title">Search by Neighborhood</h2>
            <p className="cp-sub">
              Each area has its own pace, price range, and housing stock. Start with the one closest to how you want
              to live:
            </p>
          </div>
          <div className="cp-cards">
            {HOODS.map(([t, href, body], i) => (
              <Link className="cp-card reveal" href={href} key={href} style={{ "--d": `${(i % 3) * 0.07}s` } as React.CSSProperties}>
                <h3>{t}</h3>
                <p>{body}</p>
                <span className="text-link">
                  View the neighborhood<i className="arrow" aria-hidden="true"></i>
                </span>
              </Link>
            ))}
          </div>
          <div className="cp-actions">
            <Link className="btn btn--solid-moss" href="/neighborhoods">Explore All Neighborhoods</Link>
          </div>
        </div>
      </section>

      {/* ---------- OFF MARKET ---------- */}
      <section className="cp cp--dark">
        <div className="container cp-split">
          <div className="cp-head reveal">
            <p className="eyebrow eyebrow--clay">Off-Market</p>
            <h2 className="cp-title">Homes Before They Reach the MLS</h2>
          </div>
          <div className="cp-prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p>
              Not every home is listed publicly. Some owners prefer a private sale, a short pre-market period, or no
              open houses at all. Off-market homes in Los Angeles rarely announce themselves, so the buyers who see
              them are usually the ones an agent already knows.
            </p>
            <p>
              As a Compass agent, Alexandra can show private exclusives and hear about homes before they are widely
              marketed. Tell her what you are looking for, and join the newsletter to receive off-market listings
              and neighborhood notes. If you want to move quickly when the right home appears, have your financing
              in order first.
            </p>
            <div className="cp-actions">
              <Link className="btn btn--solid-light" href="/#connect">Join the Off-Market List</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SEARCH TO OFFER ---------- */}
      <section className="cp">
        <div className="container">
          <div className="cp-head reveal">
            <p className="eyebrow">The Process</p>
            <h2 className="cp-title">From Search to Offer</h2>
            <p className="cp-sub">
              A good search ends in a clear decision. Here is how Alexandra moves buyers from the map to the keys:
            </p>
          </div>
          <ol className="cp-steps">
            {STEPS.map(([t, body], i) => (
              <li className="cp-step reveal" key={t} style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}>
                <span className="cp-step__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <div className="cp-actions">
            <Link className="btn btn--solid-moss" href="/contact">Schedule a Consultation</Link>
          </div>
        </div>
      </section>

      <FaqSection
        items={FAQ}
        title="Home Search FAQ"
        cta={{ label: "Call (310) 795-1440", href: "tel:+13107951440" }}
      />

      {/* ---------- CLOSING ---------- */}
      <section className="cp cp--dark">
        <div className="container">
          <div className="cp-head cp-head--center reveal">
            <p className="eyebrow eyebrow--clay">Talk to Alexandra</p>
            <h2 className="cp-title">Talk to Alexandra About Your Search</h2>
            <p className="cp-sub">
              Not sure where to begin? Tell Alexandra the area, the style, and the price range you have in mind, and
              she will send you homes worth seeing. Call <a href="tel:+13107951440">(310) 795-1440</a> or send a
              message.
            </p>
            <div className="cp-actions cp-actions--center">
              <Link className="btn btn--solid-light" href="/contact">Schedule a Consultation</Link>
            </div>
            <div className="cp-links cp-actions--center">
              <Link href="/home-valuation">Thinking of selling? Get your home value</Link>
              <Link href="/relocation">Moving to or from Los Angeles? Plan your relocation</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
