import { IDX } from "../site";

/* The site's menus and footer links, in one place. Read by the Header and
   Footer components and by the IDX wrapper (app/idx-wrapper/route.ts), which
   draws the same header and footer around IDX Broker's MLS pages — so a link
   changed here changes on both. Kept out of Header.tsx because that is a
   client module, and its exports can't be read as plain data on the server. */

export type NavLink = { t: string; href: string; disabled?: boolean };
export type DrawerGroup = { label: string; sub: NavLink[] };

export const PRIMARY_LINKS: NavLink[] = [
  { t: "Portfolio", href: "/properties" },
  { t: "Home Search", href: "/home-search" },
  { t: "Relocation", href: "/relocation" },
  { t: "The Latest Real Estate News", href: "/journal" },
];

/* MLS entries open IDX Broker's hosted pages, which wear this site's header
   and footer via /idx-wrapper. */
export const DRAWER_GROUPS: DrawerGroup[] = [
  { label: "About", sub: [{ t: "Meet Alexandra", href: "/about" }, { t: "Testimonials", href: "/testimonials" }] },
  {
    label: "Home Search",
    sub: [
      { t: "Alexandra's Listings", href: "/home-search" },
      { t: "Search The MLS", href: IDX.mapSearch },
      { t: "Advanced Search", href: IDX.advancedSearch },
      { t: "New Listing Alerts", href: IDX.emailAlerts },
      { t: "My Saved Searches", href: IDX.account },
      { t: "My Search Portal", href: "/my-search-portal" },
    ],
  },
  {
    label: "Buyers",
    sub: [
      { t: "Neighborhoods", href: "/neighborhoods" },
      { t: "Relocation", href: "/relocation" },
      { t: "Market Reports", href: IDX.marketReports },
      { t: "Mortgage Calculator", href: IDX.mortgage },
    ],
  },
  { label: "Sellers", sub: [{ t: "Home Valuation", href: "/home-valuation" }, { t: "Compass Concierge", href: "/compass-concierge" }] },
];

/** Plain drawer entries that sit between the two sets of groups. */
export const DRAWER_ITEMS_MID: NavLink[] = [
  { t: "Portfolio", href: "/properties" },
  { t: "Home Valuation", href: "/home-valuation" },
  { t: "Neighborhoods", href: "/neighborhoods" },
];

export const DRAWER_GROUPS_2: DrawerGroup[] = [
  { label: "Compass Services", sub: [{ t: "Compass Concierge", href: "/compass-concierge" }, { t: "Private Exclusives", href: "#", disabled: true }] },
];

export const DRAWER_ITEMS_END: NavLink[] = [
  { t: "The Latest Real Estate News", href: "/journal" },
  { t: "Let’s Connect", href: "/contact" },
  { t: "My Search Portal", href: "/my-search-portal" },
  { t: "Sign In / Create Account", href: IDX.login },
];

export const FOOTER_EXPLORE: NavLink[] = [
  { t: "About Alexandra", href: "/about" },
  { t: "Portfolio", href: "/properties" },
  { t: "Neighborhoods", href: "/neighborhoods" },
  { t: "Journal", href: "/journal" },
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
