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
    blurb:
      "Storied estates below Griffith Park, where early Hollywood built and the architecture still shows it — Lloyd Wright, Neutra, and Spanish Colonial on the same winding street.",
    short: "Storied estates & icons of early Hollywood",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
    alt: "Los Feliz hillside homes",
    tall: true,
  },
  {
    name: "Hollywood Hills",
    zips: ["90068", "90046"],
    match: "Hollywood Hills",
    blurb:
      "Mid-century glass and canyon quiet, minutes above the city. Buyers here are paying for the view and the privacy — the finishes are the tiebreaker.",
    short: "Mid-century views above the city",
    img: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1600&auto=format&fit=crop",
    alt: "Hollywood Hills homes at golden hour",
  },
  {
    name: "Silver Lake",
    zips: ["90026", "90039"],
    blurb:
      "Craftsman bones and creative energy around the reservoir. Hillside lots reward anyone who knows how to read a slope and a permit history.",
    short: "Craftsman charm, creative energy",
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    alt: "Silver Lake craftsman homes",
  },
  {
    name: "Hancock Park",
    zips: ["90004", "90020"],
    match: "Hancock Park",
    blurb:
      "Wide streets, deep lots, and period homes held to a standard. One of the few parts of Los Angeles where the streetscape has been protected for a century.",
    img: "/assets/listings/s2-rossmore.jpg",
    alt: "A period home in Hancock Park",
    tall: true,
  },
  {
    name: "Windsor Square",
    zips: ["90004", "90020"],
    match: "Windsor Square",
    blurb:
      "Formal, tree-lined, and quietly grand. Turnover is slow here, which is exactly why the homes that do come up move on relationships as much as listings.",
    img: "/assets/listings/s1-windsor414.jpg",
    alt: "A Windsor Square residence",
  },
  {
    name: "Sunset Strip",
    zips: ["90069"],
    match: "Sunset Strip",
    blurb:
      "Cantilevered and city-facing, with the shortest walk to the west side of the night. A market of its own, priced on view corridor and access.",
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
  const { active } = countIn(hood, listings);
  const q = `/home-search?q=${encodeURIComponent(hood.match ?? hood.name)}`;
  if (active > 0) return { label: `${active} active listing${active === 1 ? "" : "s"}`, href: q };
  if (hood.zips?.length) return { label: "Homes for sale", href: mlsLink(hood) };
  return { label: "Search this area", href: q };
}

/** Every home for sale in the area, across the whole MLS. */
export function mlsLink(hood: Hood) {
  return idxResultsUrl({ zips: hood.zips });
}
