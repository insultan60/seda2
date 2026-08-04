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
