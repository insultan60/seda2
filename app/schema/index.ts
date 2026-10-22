/* Structured data (JSON-LD) for each page, as supplied in the SEO schema
 * pack (October 2026). One file per page; edit the JSON to change what a page
 * tells search engines.
 *
 * home.json describes Alexandra (#agent, #alexandra), Compass and the website
 * (#website). Every other file points at those by @id, and an @id only
 * resolves against nodes on the same page, so those entities are published
 * site-wide from the root layout (SITE_ENTITIES) and the home page adds only
 * its own WebPage node (HOME_PAGE).
 *
 * FAQPage data is not in these files: the FAQ sections build it from the
 * questions they render (app/components/Faq.tsx). */
import home from "./home.json";
import homeSearch from "./home-search.json";
import neighborhoods from "./neighborhoods.json";
import losFeliz from "./los-feliz.json";
import hollywoodHills from "./hollywood-hills.json";
import silverLake from "./silver-lake.json";
import hancockPark from "./hancock-park.json";
import windsorSquare from "./windsor-square.json";
import sunsetStrip from "./sunset-strip.json";
import relocation from "./relocation.json";
import portfolio from "./portfolio.json";

type Graph = { "@context": string; "@graph": Record<string, unknown>[] };

const isWebPage = (n: Record<string, unknown>) => n["@type"] === "WebPage";

const agent = (home as Graph)["@graph"].find((n) => n["@type"] === "RealEstateAgent")!;
const { mainEntityOfPage, ...agentEverywhere } = agent;

/** Alexandra, Compass and the website: on every page, via the root layout.
 *  The agent's mainEntityOfPage points at the home page's WebPage, which only
 *  exists on the home page, so that one link is added there (HOME_PAGE). */
export const SITE_ENTITIES: Graph = {
  "@context": "https://schema.org",
  "@graph": (home as Graph)["@graph"]
    .filter((n) => !isWebPage(n))
    // Her headshot, so results that show the agent have a face to show.
    .map((n) => (n === agent ? { ...agentEverywhere, image: "https://aklahomes.com/assets/alexandra-headshot.jpg" } : n)),
};

/** The home page's own WebPage node, and the agent's link back to it. */
export const HOME_PAGE: Graph = {
  "@context": "https://schema.org",
  "@graph": [...(home as Graph)["@graph"].filter(isWebPage), { "@id": agent["@id"], mainEntityOfPage }],
};

export const HOME_SEARCH = homeSearch as Graph;
export const NEIGHBORHOODS = neighborhoods as Graph;
export const RELOCATION = relocation as Graph;
export const PORTFOLIO = portfolio as Graph;

/** Neighborhood guides, by URL slug. */
export const AREA_SCHEMA: Record<string, Graph> = {
  "los-feliz": losFeliz as Graph,
  "hollywood-hills": hollywoodHills as Graph,
  "silver-lake": silverLake as Graph,
  "hancock-park": hancockPark as Graph,
  "windsor-square": windsorSquare as Graph,
  "sunset-strip": sunsetStrip as Graph,
};
