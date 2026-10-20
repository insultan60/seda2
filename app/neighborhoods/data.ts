import type { Listing } from "../properties/data";
import { idxResultsUrl } from "../site";

export type Hood = {
  name: string;
  /** Matched against Listing.hood to derive a live count. */
  match?: string;
  blurb: string;
  /** Short form for the home page's small tiles, where the full blurb would
   *  run past the label. Falls back to `blurb` when absent. */
  short?: string;
  img?: string;
  alt?: string;
  /** Renders taller in the woven grid. */
  tall?: boolean;
  /** The longer one-line description on the home page's neighborhood list. */
  homeBlurb?: string;
  /** The area's write-up on the Neighborhoods guide, one string per paragraph. */
  guide?: readonly string[];
  /** Button under that write-up. */
  cta?: string;
  /** The area's own page, once it has one. Tiles link here instead of to a
   *  listings search. */
  page?: string;
  /** ZIP codes that cover the area, for the full-MLS search on IDX. A ZIP is
   *  a close fit for a neighborhood, not an exact boundary (90026 is shared by
   *  Silver Lake and Echo Park, for example). */
  zips?: readonly string[];
};

/**
 * Neighborhood descriptions are general Los Angeles character notes — the kind
 * of thing any agent working these areas would say. Nothing here claims a
 * statistic, a median, or a market trend that hasn't been sourced.
 *
 * `img` values are the same stock placeholders the home page already uses,
 * pending Alexandra's own photography. Areas without art render as typographic
 * tiles rather than broken frames.
 */
export const FEATURED: Hood[] = [
  {
    name: "Los Feliz",
    zips: ["90027"],
    match: "Los Feliz",
    page: "/neighborhoods/los-feliz",
    blurb:
      "Storied estates below Griffith Park, with Lloyd Wright, Neutra, and Spanish Colonial homes on one street.",
    short: "Storied estates & icons of early Hollywood",
    homeBlurb:
      "Storied estates below Griffith Park, with Lloyd Wright, Neutra, and Spanish Colonial homes on the same winding street.",
    guide: [
      "Los Feliz sits below Griffith Park, where early Hollywood built its homes and the architecture still shows it. Lloyd Wright, Neutra, and Spanish Colonial houses share the same winding streets.",
      "It is also one of the more walkable neighborhoods in Los Angeles, thanks to the village shops and cafes near the base of the hills. Buyers here weigh the pedigree of the house against the lot, since many of the best homes sit on steep, private parcels.",
    ],
    cta: "Homes for Sale in Los Feliz",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
    alt: "Los Feliz hillside homes",
    tall: true,
  },
  {
    name: "Hollywood Hills",
    zips: ["90068", "90046"],
    match: "Hollywood Hills",
    page: "/neighborhoods/hollywood-hills",
    blurb: "Mid-century glass, canyon quiet, and views above the city.",
    short: "Mid-century views above the city",
    homeBlurb:
      "Mid-century glass and canyon quiet above the city. Buyers of luxury homes in the Hollywood Hills pay for the view and the privacy.",
    guide: [
      "The Hollywood Hills offer mid-century glass houses and canyon quiet, just minutes above the city. Buyers of luxury homes in this part of Los Angeles are paying for the view and the privacy, so the finishes often decide between two similar houses.",
      "Mid-century modern homes are the signature here. Check the lot carefully, because access roads, retaining walls, and drainage matter as much as the view.",
    ],
    cta: "Homes for Sale in the Hollywood Hills",
    img: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1600&auto=format&fit=crop",
    alt: "Hollywood Hills homes at golden hour",
  },
  {
    name: "Silver Lake",
    zips: ["90026", "90039"],
    page: "/neighborhoods/silver-lake",
    blurb: "Craftsman charm and creative energy around the reservoir.",
    short: "Craftsman charm, creative energy",
    homeBlurb:
      "Craftsman homes and creative energy around the reservoir. Hillside lots reward buyers who can read a slope and a permit history.",
    guide: [
      "Silver Lake mixes craftsman bones with creative energy around the reservoir. The reservoir paths and nearby shops make it one of the most walkable neighborhoods in Los Angeles.",
      "Hillside lots reward buyers who know how to read a slope and a permit history. A charming house can hide an expensive foundation or drainage problem, so Alexandra reviews the records with buyers before an offer goes in.",
    ],
    cta: "Homes for Sale in Silver Lake",
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    alt: "Silver Lake craftsman homes",
  },
  {
    name: "Hancock Park",
    zips: ["90004", "90020"],
    match: "Hancock Park",
    page: "/neighborhoods/hancock-park",
    blurb: "Wide streets, deep lots, and period homes held to a standard.",
    homeBlurb:
      "Wide streets, deep lots, and period homes in one of the few areas where the streetscape has been protected for a century.",
    /* The McCadden Place figures are her own closings in app/properties/data.ts
       (514 and 621 N McCadden Pl, both tagged Hancock Park, ZIP 90004). The
       brief flagged the boundary to confirm; her listing records settle it. */
    guide: [
      "Hancock Park is one of the historic neighborhoods in Los Angeles where the streetscape has been protected for a century. Wide streets, deep lots, and period homes are held to a standard that few other areas match.",
      "The larger lots and tree-lined blocks appeal to families who want space close to the city. Before you plan any exterior work, ask whether the property falls inside a Historic Preservation Overlay Zone, since that can shape what you are allowed to change. Recent sales on McCadden Place closed between $3.65M and $3.75M.",
    ],
    cta: "Homes for Sale in Hancock Park",
    img: "/assets/listings/s2-rossmore.jpg",
    alt: "A period home in Hancock Park",
    tall: true,
  },
  {
    name: "Windsor Square",
    zips: ["90004", "90020"],
    match: "Windsor Square",
    page: "/neighborhoods/windsor-square",
    blurb: "Formal, tree-lined, and quietly grand, where homes often sell through relationships.",
    homeBlurb:
      "Formal and tree-lined, with slow turnover. Many homes sell through relationships before they reach the MLS.",
    /* $3.6M and $7.8M are 206 N Windsor ($3,639,161) and 414 S Windsor
       ($7,775,000) in app/properties/data.ts, rounded. */
    guide: [
      "Windsor Square is formal, tree-lined, and quietly grand. Turnover is slow, so many homes sell through relationships before they ever reach the MLS.",
      "That makes local connections valuable here. It is another of the historic neighborhoods in Los Angeles, with mature landscaping and large traditional houses. Alexandra’s recent sales on Windsor Boulevard closed at $3.6M and $7.8M.",
    ],
    cta: "Homes for Sale in Windsor Square",
    img: "/assets/listings/s1-windsor414.jpg",
    alt: "A Windsor Square residence",
  },
  {
    name: "Sunset Strip",
    zips: ["90069"],
    match: "Sunset Strip",
    page: "/neighborhoods/sunset-strip",
    blurb: "Cantilevered, city-facing homes with the shortest walk to the west side of the night.",
    homeBlurb:
      "Cantilevered, city-facing homes close to the west side’s nightlife. Prices follow view corridors and access.",
    guide: [
      "The Sunset Strip is a market of its own. Homes here are cantilevered and city-facing, and they sit a short walk from the west side’s nightlife.",
      "Prices follow the view corridor and the access, more than the square footage. Inventory is thin, so it pays to set up alerts and move quickly when a listing fits.",
    ],
    cta: "Homes for Sale on the Sunset Strip",
    img: "/assets/listings/representative-sunset-strip.jpg",
    alt: "A hillside home above the Sunset Strip",
  },
];

/** The wider service area — listed rather than illustrated.
 *
 *  Trimmed to Alexandra's own August 2026 shortlist. Pasadena, Glendale,
 *  Sherman Oaks & Studio City, West Hollywood, Pacific Palisades and Palm
 *  Springs came off it; Venice went on. Mar Vista stays because her sold
 *  portfolio is there and `countIn` reads a real number off it — an area with
 *  a closing behind it earns its place on the list. */
export const ALSO_SERVING: Hood[] = [
  { name: "Echo Park", zips: ["90026"], blurb: "Hillside bungalows and lake-adjacent walkability." },
  { name: "Beverly Hills", zips: ["90210", "90211", "90212"], blurb: "The flats and the hills behave like two separate markets." },
  { name: "Brentwood", zips: ["90049"], blurb: "Established, private, and consistently defensive in a soft market." },
  { name: "Santa Monica", zips: ["90401", "90402", "90403", "90404", "90405"], blurb: "Ocean proximity priced by the block, not the neighborhood." },
  { name: "Venice", zips: ["90291"], blurb: "Walk streets, canals, and a rebuild market that trades on light and lot width." },
  { name: "Mar Vista", zips: ["90066"], match: "Mar Vista", blurb: "Post-war stock steadily giving way to considered rebuilds." },
];

/** The three broad regions Alexandra covers beyond the named areas above.
 *
 *  Deliberately not `Hood[]`: the Eastside, the Valley and the Westside are an
 *  order of magnitude bigger than Silver Lake or Windsor Square, so listing
 *  them as peers reads wrong and they can carry no honest listing count. They
 *  render as a single sentence instead. */
export const REGIONS = ["the Eastside", "the San Fernando Valley", "the Westside"];

/**
 * Active and sold counts for an area, split deliberately.
 *
 * A combined count is misleading: /home-search opens filtered to Active, so a
 * card advertising "3 listings" for an area whose three homes have all sold
 * sends the visitor to an empty result set. The page uses `active` for the
 * label and routes sold-only areas to the portfolio instead. Zero of both is a
 * valid answer — an area Alexandra works is not a claim that she has inventory
 * in it this week.
 */
export function countIn(hood: Hood, listings: Listing[]) {
  const key = hood.match ?? hood.name;
  const inArea = listings.filter((l) => l.hood === key);
  return {
    active: inArea.filter((l) => l.status === "Active").length,
    sold: inArea.filter((l) => l.status === "Sold").length,
  };
}

/** Label + destination for a neighborhood tile, derived from what's actually there.
 *  Alexandra's own active listings come first; otherwise the tile opens every
 *  home for sale in the area on the MLS (IDX), rather than an empty search of
 *  her portfolio. */
export function hoodLink(hood: Hood, listings: Listing[]) {
  if (hood.page) return { label: `Explore ${hood.name}`, href: hood.page };
  const { active } = countIn(hood, listings);
  const q = `/home-search?q=${encodeURIComponent(hood.match ?? hood.name)}`;
  if (active > 0) return { label: `${active} active listing${active === 1 ? "" : "s"}`, href: q };
  if (hood.zips?.length) return { label: "Homes for sale", href: mlsLink(hood) };
  return { label: "Search this area", href: q };
}

/**
 * Her listings that belong on an area page.
 *
 * Hand-entered listings carry the neighborhood. MLS records for addresses the
 * MLS calls plain "Los Angeles" do not, so those are placed by ZIP, but only
 * by a ZIP no other named area uses: 90004 and 90020 are shared by Hancock
 * Park and Windsor Square, and placing by them would put a Windsor Square
 * sale on the Hancock Park page.
 */
export function listingsIn(hood: Hood, listings: Listing[]): Listing[] {
  const key = hood.match ?? hood.name;
  const others = [...FEATURED, ...ALSO_SERVING].filter((h) => h.name !== hood.name);
  const ownZip = (zip?: string) =>
    !!zip && !!hood.zips?.includes(zip) && !others.some((h) => h.zips?.includes(zip));
  return listings.filter((l) => l.hood === key || (!l.hood && ownZip(l.zip)));
}

/** Anchor id for an area's write-up on /neighborhoods ("Hancock Park" ->
 *  "hancock-park"), so other pages can link straight to it. */
export const hoodId = (hood: Pick<Hood, "name">) => hood.name.toLowerCase().replace(/\s+/g, "-");

/** Every home for sale in the area, across the whole MLS. */
export function mlsLink(hood: Hood) {
  return idxResultsUrl({ zips: hood.zips });
}
