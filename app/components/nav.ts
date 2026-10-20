import { IDX } from "../site";

/* The site's menus and footer links, in one place. Read by the Header and
   Footer components and by the IDX wrapper (app/idx-wrapper/route.ts), which
   draws the same header and footer around IDX Broker's MLS pages — so a link
   changed here changes on both. Kept out of Header.tsx because that is a
   client module, and its exports can't be read as plain data on the server. */

export type NavLink = { t: string; href: string; disabled?: boolean };
/** A drawer group with `href` and no `sub` is drawn as a plain link. */
export type DrawerGroup = { label: string; href?: string; sub: NavLink[] };

export const PRIMARY_LINKS: NavLink[] = [
  { t: "Portfolio", href: "/properties" },
  { t: "Home Search", href: "/home-search" },
  { t: "Neighborhoods", href: "/neighborhoods" },
  { t: "Relocation", href: "/relocation" },
];

/* MLS entries open IDX Broker's hosted pages, which wear this site's header
   and footer via /idx-wrapper. */
export const DRAWER_GROUPS: DrawerGroup[] = [
  { label: "About", sub: [{ t: "Meet Alexandra", href: "/about" }, { t: "Testimonials", href: "/testimonials" }] },
  /* One link, no sub-menu (client request). Search The MLS, New Listing
     Alerts, My Search Portal and Sign In stay in the footer; Advanced
     Search and My Saved Searches are reached from the MLS pages and the
     IDX account. */
  { label: "Home Search", href: "/home-search", sub: [] },
  {
    label: "Buyers",
    sub: [
      { t: "Neighborhoods", href: "/neighborhoods" },
      { t: "Relocation", href: "/relocation" },
      { t: "Market Reports", href: IDX.marketReports },
      { t: "Mortgage Calculator", href: IDX.mortgage },
    ],
  },
  {
    label: "Sellers",
    sub: [
      { t: "Home Valuation", href: "/home-valuation" },
      { t: "Compass Concierge", href: "/compass-concierge" },
    ],
  },
];

/** Plain drawer entries that sit between the two sets of groups. Each link
 *  appears once in the drawer: Home Valuation and Neighborhoods live in the
 *  Sellers and Buyers groups above, so they are not repeated here. */
export const DRAWER_ITEMS_MID: NavLink[] = [
  { t: "Portfolio", href: "/properties" },
];

/* Compass Services repeated Compass Concierge from Sellers, and Private
   Exclusives had no page behind it. Kept as an empty slot so the Header
   and the IDX wrapper render unchanged. */
export const DRAWER_GROUPS_2: DrawerGroup[] = [];

/* The journal is parked (journal/data.ts). */
export const DRAWER_ITEMS_END: NavLink[] = [
  { t: "Let’s Connect", href: "/contact" },
  { t: "Sign In / Create Account", href: IDX.login },
];

export const FOOTER_EXPLORE: NavLink[] = [
  { t: "About Alexandra", href: "/about" },
  { t: "Portfolio", href: "/properties" },
  { t: "Neighborhoods", href: "/neighborhoods" },
];

export const FOOTER_RESOURCES: NavLink[] = [
  { t: "Search The MLS", href: IDX.mapSearch },
  { t: "New Listing Alerts", href: IDX.emailAlerts },
  { t: "Market Reports", href: IDX.marketReports },
  { t: "Mortgage Calculator", href: IDX.mortgage },
  { t: "My Search Portal", href: "/my-search-portal" },
  { t: "Sign In / Create Account", href: IDX.login },
  { t: "Relocation", href: "/relocation" },
  { t: "Testimonials", href: "/testimonials" },
  { t: "Home Valuation", href: "/home-valuation" },
  { t: "Compass Concierge", href: "/compass-concierge" },
];

/** External (IDX) links are plain <a>; site paths can use next/link. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);
