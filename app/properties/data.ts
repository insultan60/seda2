export type Listing = {
  slug: string;
  status: string;
  badgeCls: string;
  badge: string;
  price: string;
  addr: string;
  city: string;
  zip: string;
  /** Neighborhood the address sits in — derived from the ZIP, shown on cards. */
  hood: string;
  beds: string;
  baths: string;
  sqft: string;
  img: string;
  gallery?: string[];
  overview?: string[];
  features?: { label: string; value: string }[];
};

export const LISTINGS: Listing[] = [
  {
    slug: "2050-n-las-palmas",
    status: "Active", badgeCls: "badge--open", badge: "Open 7/18 · 1:00–4:00PM",
    price: "$1,695,000", addr: "2050 N Las Palmas Avenue", city: "Los Angeles, CA", zip: "90068", hood: "Hollywood Hills",
    beds: "3", baths: "4", sqft: "1,830", img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "1352-miller-drive",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    price: "$28,000", addr: "1352 Miller Drive", city: "Los Angeles, CA", zip: "90069", hood: "Sunset Strip",
    beds: "4", baths: "5", sqft: "5,187", img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "414-s-windsor-blvd",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$7,775,000", addr: "414 S Windsor Blvd", city: "Los Angeles, CA", zip: "90020", hood: "Windsor Square",
    beds: "4", baths: "4", sqft: "4,235", img: "/assets/listings/s1-windsor414.jpg",
    gallery: [
      "/assets/listings/s1-windsor414.jpg",
      "/assets/listings/c1-lincoln.jpg",
      "/assets/listings/c2-colony.jpg",
      "/assets/listings/c3-beverlyglen.jpg",
      "/assets/listings/s2-rossmore.jpg",
      "/assets/listings/s3-pacific.jpg",
      "/assets/listings/s4-mccadden621.jpg",
      "/assets/listings/s5-mccadden514.jpg",
    ],
    overview: [
      "A landmark Hancock Park estate reimagined for modern living while honoring its 1920s architectural pedigree. Behind a gated motor court, hand-troweled plaster, steel casement windows, and rift-sawn oak floors set a tone of quiet, enduring luxury throughout the principal rooms.",
      "The chef's kitchen opens to a sun-filled family room and out to manicured grounds with a pool, spa, and covered loggia — an entertainer's canvas moments from the Larchmont Village shops. Upstairs, a serene primary suite anchors four bedrooms, each with its own character and light.",
    ],
    features: [
      { label: "Type", value: "Single-Family Residence" },
      { label: "Year Built", value: "1926" },
      { label: "Lot Size", value: "0.31 acres" },
      { label: "Parking", value: "2-car garage + motor court" },
      { label: "Heating / Cooling", value: "Central" },
      { label: "Outdoor", value: "Pool · Spa · Loggia" },
    ],
  },
  {
    slug: "356-s-rossmore-ave",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$6,300,000", addr: "356 S Rossmore Ave", city: "Los Angeles, CA", zip: "90020", hood: "Hancock Park",
    beds: "8", baths: "6", sqft: "5,878", img: "/assets/listings/s2-rossmore.jpg",
  },
  {
    slug: "11845-pacific-ave",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$4,275,000", addr: "11845 Pacific Ave", city: "Los Angeles, CA", zip: "90066", hood: "Mar Vista",
    beds: "5", baths: "6", sqft: "4,648", img: "/assets/listings/s3-pacific.jpg",
  },
  {
    slug: "621-n-mccadden-pl",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$3,750,000", addr: "621 N McCadden Pl", city: "Los Angeles, CA", zip: "90004", hood: "Hancock Park",
    beds: "4", baths: "3", sqft: "2,678", img: "/assets/listings/s4-mccadden621.jpg",
  },
  {
    slug: "514-n-mccadden-pl",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$3,650,000", addr: "514 N McCadden Pl", city: "Los Angeles, CA", zip: "90004", hood: "Hancock Park",
    beds: "3", baths: "3", sqft: "2,483", img: "/assets/listings/s5-mccadden514.jpg",
  },
  {
    slug: "206-n-windsor-blvd",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$3,639,161", addr: "206 N Windsor Blvd", city: "Los Angeles, CA", zip: "90004", hood: "Windsor Square",
    beds: "3", baths: "3", sqft: "2,813", img: "/assets/listings/s6-windsor206.jpg",
  },
];

export const DEMO_SLUG = "414-s-windsor-blvd";
export const getListing = (slug: string) => LISTINGS.find((l) => l.slug === slug);
export const ALL_SLUGS = LISTINGS.map((l) => l.slug);
