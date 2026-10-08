/**
 * Single source of truth for the things every page's metadata needs.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED BEFORE LAUNCH: confirm the production domain.
 *
 * `SITE_URL` is what absolute URLs in the sitemap, the canonical tags and the
 * social link previews are built from. The fallback below is a guess. Set
 * NEXT_PUBLIC_SITE_URL in the hosting environment to the real domain — if this
 * is wrong, every link preview and every sitemap entry points at a domain that
 * isn't hers, and search engines will index it that way.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexandrakerr.com"
).replace(/\/$/, "");

export const AGENT = {
  name: "Alexandra Kerr",
  jobTitle: "REALTOR® · Estates Director · Senior Real Estate Specialist",
  license: "01911486",
  phone: "+1-310-795-1440",
  email: "alexandra.kerr@compass.com",
  brokerage: "Compass",
  instagram: "https://instagram.com/alexandrakerrlarealestate",
  office: {
    street: "6430 W Sunset Blvd, 6th Floor",
    city: "Los Angeles",
    region: "CA",
    postalCode: "90028",
    country: "US",
    phone: "+1-323-593-6999",
  },
  /** Areas served, for the structured data. Mirrors the neighborhoods page. */
  areas: [
    "Los Feliz",
    "Hollywood Hills",
    "Silver Lake",
    "Hancock Park",
    "Windsor Square",
    "Sunset Strip",
    "Echo Park",
    "Beverly Hills",
    "Brentwood",
    "Santa Monica",
    "Venice",
    "Mar Vista",
  ],
} as const;

export const SITE_NAME = `${AGENT.name} — Los Angeles Real Estate`;

/** Default share image. Absolute, because scrapers don't resolve relative paths. */
export const OG_IMAGE = `${SITE_URL}/opengraph-image`;

/* ---------------------------------------------------------------------------
 * IDX Broker — the full MLS search.
 *
 * Alexandra's own listings render on this site (app/properties). Searching the
 * whole MLS (California Regional MLS) happens on IDX Broker's hosted pages,
 * which wear this site's header and footer through the wrapper at
 * /idx-wrapper (see app/idx-wrapper/route.ts). Every link to those pages is
 * built here, so moving IDX to a custom subdomain later (e.g.
 * search.alexandrakerr.com) is a one-line change.
 * ------------------------------------------------------------------------- */
export const IDX_URL = "https://seda2.idxbroker.com";

export const IDX = {
  mapSearch: `${IDX_URL}/idx/map/mapsearch`,
  advancedSearch: `${IDX_URL}/idx/search/advanced`,
  addressSearch: `${IDX_URL}/idx/search/address`,
  listingIdSearch: `${IDX_URL}/idx/search/listingid`,
  results: `${IDX_URL}/idx/results/listings`,
  openHouses: `${IDX_URL}/idx/featuredopenhouse`,
  emailAlerts: `${IDX_URL}/idx/search/emailupdatesignup`,
  signup: `${IDX_URL}/idx/usersignup`,
  login: `${IDX_URL}/idx/userlogin`,
  account: `${IDX_URL}/idx/myaccount`,
  mortgage: `${IDX_URL}/idx/mortgage`,
  marketReports: `${IDX_URL}/idx/market-reports`,
  browseByCity: `${IDX_URL}/idx/searchbycity`,
} as const;

/** IDX property types for CRMLS (from the API: mls/propertytypes/e025). */
export const IDX_PROPERTY_TYPES = [
  { value: "sfr", label: "Homes & Condos for Sale" },
  { value: "lse", label: "For Lease" },
  { value: "ri", label: "Income Property" },
  { value: "ld", label: "Lots & Land" },
] as const;

/** A link to MLS search results on IDX. Every parameter here was checked
 *  against the live results page: zipcode[] (several allowed), pt, lp/hp
 *  (price range), bd (min beds), tb (min baths). */
export function idxResultsUrl(f: {
  zips?: readonly string[];
  pt?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
}): string {
  const p = new URLSearchParams();
  p.set("pt", f.pt || "sfr");
  if (f.zips?.length) {
    p.set("ccz", "zipcode");
    for (const z of f.zips) p.append("zipcode[]", z);
  }
  if (f.minPrice) p.set("lp", String(f.minPrice));
  if (f.maxPrice) p.set("hp", String(f.maxPrice));
  if (f.beds) p.set("bd", String(f.beds));
  if (f.baths) p.set("tb", String(f.baths));
  return `${IDX.results}?${p.toString()}`;
}
