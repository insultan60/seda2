import { LISTINGS } from "../properties/data";

export type Hood = {
  name: string;
  /** Matched against Listing.hood to derive a live count. */
  match?: string;
  blurb: string;
  img?: string;
  alt?: string;
  /** Renders taller in the woven grid. */
  tall?: boolean;
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
    match: "Los Feliz",
    blurb:
      "Storied estates below Griffith Park, where early Hollywood built and the architecture still shows it — Lloyd Wright, Neutra, and Spanish Colonial on the same winding street.",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
    alt: "Los Feliz hillside homes",
    tall: true,
  },
  {
    name: "Hollywood Hills",
    match: "Hollywood Hills",
    blurb:
      "Mid-century glass and canyon quiet, minutes above the city. Buyers here are paying for the view and the privacy — the finishes are the tiebreaker.",
    img: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1600&auto=format&fit=crop",
    alt: "Hollywood Hills homes at golden hour",
  },
  {
    name: "Silver Lake",
    blurb:
      "Craftsman bones and creative energy around the reservoir. Hillside lots reward anyone who knows how to read a slope and a permit history.",
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    alt: "Silver Lake craftsman homes",
  },
  {
    name: "Hancock Park",
    match: "Hancock Park",
    blurb:
      "Wide streets, deep lots, and period homes held to a standard. One of the few parts of Los Angeles where the streetscape has been protected for a century.",
    img: "/assets/listings/s2-rossmore.jpg",
    alt: "A period home in Hancock Park",
    tall: true,
  },
  {
    name: "Windsor Square",
    match: "Windsor Square",
    blurb:
      "Formal, tree-lined, and quietly grand. Turnover is slow here, which is exactly why the homes that do come up move on relationships as much as listings.",
    img: "/assets/listings/s1-windsor414.jpg",
    alt: "A Windsor Square residence",
  },
  {
    name: "Sunset Strip",
    match: "Sunset Strip",
    blurb:
      "Cantilevered and city-facing, with the shortest walk to the west side of the night. A market of its own, priced on view corridor and access.",
    img: "/assets/listings/representative-sunset-strip.jpg",
    alt: "A hillside home above the Sunset Strip",
  },
];

/** The wider service area — listed rather than illustrated. */
export const ALSO_SERVING: Hood[] = [
  { name: "Echo Park", blurb: "Hillside bungalows and lake-adjacent walkability." },
  { name: "Mar Vista", match: "Mar Vista", blurb: "Post-war stock steadily giving way to considered rebuilds." },
  { name: "Pasadena", blurb: "Craftsman pedigree and the deepest architectural bench in the county." },
  { name: "Glendale", blurb: "Value per foot with genuine proximity to the Eastside." },
  { name: "Sherman Oaks & Studio City", blurb: "Flat, family-scaled streets over the hill." },
  { name: "West Hollywood", blurb: "Density done well — walkable, and never quiet for long." },
  { name: "Beverly Hills", blurb: "The flats and the hills behave like two separate markets." },
  { name: "Brentwood", blurb: "Established, private, and consistently defensive in a soft market." },
  { name: "Santa Monica", blurb: "Ocean proximity priced by the block, not the neighborhood." },
  { name: "Pacific Palisades", blurb: "Canyon and bluff, with a village at the center of it." },
  { name: "Palm Springs", blurb: "Desert modernism, second homes, and a seasonal rhythm of its own." },
];

/**
 * How many listings currently sit in a given area. Zero is a valid answer and
 * the page labels it as one — an area Alexandra works is not the same claim as
 * an area she has inventory in this week.
 */
export const countIn = (hood: Hood) =>
  LISTINGS.filter((l) => l.hood === (hood.match ?? hood.name)).length;
