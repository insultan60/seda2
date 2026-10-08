import photoManifest from "../../_photo-manifest.json";

export type Listing = {
  slug: string;
  status: string;
  badgeCls: string;
  badge: string;
  /* Optional from here down. The 13 listings Alexandra sent in August 2026
     arrived as photography only — no price, specs, city or ZIP — and inventing
     any of it for a real address on a live listing page is not an option. The
     cards fall back to "Price Upon Request" and drop the specs row until the
     real figures land, so a listing is never shown with a made-up number. */
  price?: string;
  addr: string;
  city?: string;
  zip?: string;
  /** Neighborhood the address sits in — derived from the ZIP, shown on cards. */
  hood?: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  /* Map coordinates for /home-search. Optional because a listing is perfectly
     valid without them — it simply lists without a pin rather than being
     dropped, and guessing a lat/lng puts a real address on the wrong house. */
  lat?: number;
  lng?: number;
  img: string;
  /* Set when `img` is stock architectural photography rather than a photo of
     this property. The cards render it as a visible caption — an image of a
     different house on a listing at a real address and price has to say so.
     Delete this field the moment the real photos land. */
  imgNote?: string;
  gallery?: string[];
  overview?: string[];
  features?: { label: string; value: string }[];
  /** MLS number, set when the listing is matched to Alexandra's IDX feed. */
  mlsId?: string;
  /** A rental rather than a sale. Leases stay out of sales totals. */
  lease?: boolean;
};

const RAW_LISTINGS: Listing[] = [
  {
    slug: "2050-n-las-palmas",
    /* The open-house badge read "Open 7/18 · 1:00–4:00PM" well past that date,
       so the site was advertising an event that had already happened. Falls
       back to "Active" until there is a real upcoming date — restore
       badgeCls: "badge--open" with the new date when one is scheduled. */
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    price: "$1,695,000", addr: "2050 N Las Palmas Avenue", city: "Los Angeles, CA", zip: "90068", hood: "Hollywood Hills",
    beds: "3", baths: "4", sqft: "1,830",
    lat: 34.1046, lng: -118.3357,
    img: "/assets/listings/representative-hollywood-hills.jpg",
    imgNote: "Representative image — property photography coming soon",
  },
  {
    slug: "1352-miller-drive",
    /* A lease, not a sale. Shown as a bare "$28,000" it sat in a row of sale
       prices and read as the purchase price of a 5,187 sq ft Sunset Strip
       home. `price` is a display string throughout this file, so the period
       belongs in it. */
    /* status stays "Active" — it is the state machine the pages filter on
       (`status === "Active"` builds the featured grid on both the home page and
       /properties). Tenure belongs in the badge, not here; setting this to
       "For Lease" silently drops the listing off the site. */
    status: "Active", badgeCls: "badge--sale", badge: "For Lease",
    price: "$28,000/mo", addr: "1352 Miller Drive", city: "Los Angeles, CA", zip: "90069", hood: "Sunset Strip",
    beds: "4", baths: "5", sqft: "5,187",
    lat: 34.0954, lng: -118.3766,
    img: "/assets/listings/representative-sunset-strip.jpg",
    imgNote: "Representative image — property photography coming soon",
  },
  /* ---- Sent by Alexandra, August 2026: photography only. -----------------
     Address and photos are hers; price, specs, city and ZIP have not been
     supplied yet, so those fields are deliberately absent rather than guessed.
     `img` points at the placeholder so withPhotos() swaps in the real card
     image from the manifest; add the numbers here as they come in. */
  {
    slug: "1954-pinehurst",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "1954 Pinehurst",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "3820-buena-park",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "3820 Buena Park",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "8757-arlene-terrace",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "8757 Arlene Terrace",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "803-boccaccio",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "803 Boccaccio",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "2861-n-beachwood",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "2861 N Beachwood",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "558-rose-ave",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "558 Rose Ave",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "712-marine",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "712 Marine",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "1747-hollyvista",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "1747 Hollyvista",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "2032-sanborn",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "2032 Sanborn",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "726-nowita",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "726 Nowita",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "8573-franklin",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "8573 Franklin",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "2913-3rd-st",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "2913 3rd St",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "9757-arlene-terrace",
    status: "Active", badgeCls: "badge--sale", badge: "Active",
    addr: "9757 Arlene Terrace",
    img: "/assets/listings/photo-pending.svg",
  },
  {
    slug: "414-s-windsor-blvd",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$7,775,000", addr: "414 S Windsor Blvd", city: "Los Angeles, CA", zip: "90020", hood: "Windsor Square",
    beds: "4", baths: "4", sqft: "4,235",
    lat: 34.0648, lng: -118.32, img: "/assets/listings/s1-windsor414.jpg",
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
    beds: "8", baths: "6", sqft: "5,878",
    lat: 34.0672, lng: -118.3266, img: "/assets/listings/s2-rossmore.jpg",
  },
  {
    slug: "11845-pacific-ave",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$4,275,000", addr: "11845 Pacific Ave", city: "Los Angeles, CA", zip: "90066", hood: "Mar Vista",
    beds: "5", baths: "6", sqft: "4,648",
    lat: 33.989, lng: -118.466, img: "/assets/listings/s3-pacific.jpg",
  },
  {
    slug: "621-n-mccadden-pl",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$3,750,000", addr: "621 N McCadden Pl", city: "Los Angeles, CA", zip: "90004", hood: "Hancock Park",
    beds: "4", baths: "3", sqft: "2,678",
    lat: 34.0838, lng: -118.3369, img: "/assets/listings/s4-mccadden621.jpg",
  },
  {
    slug: "514-n-mccadden-pl",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$3,650,000", addr: "514 N McCadden Pl", city: "Los Angeles, CA", zip: "90004", hood: "Hancock Park",
    beds: "3", baths: "3", sqft: "2,483",
    lat: 34.0808, lng: -118.337, img: "/assets/listings/s5-mccadden514.jpg",
  },
  {
    slug: "206-n-windsor-blvd",
    status: "Sold", badgeCls: "badge--sold", badge: "Sold",
    price: "$3,639,161", addr: "206 N Windsor Blvd", city: "Los Angeles, CA", zip: "90004", hood: "Windsor Square",
    beds: "3", baths: "3", sqft: "2,813",
    lat: 34.0745, lng: -118.3208, img: "/assets/listings/s6-windsor206.jpg",
  },
];

/* ------------------------------------------------------------ photography

   Photos are picked up from the filesystem, not pasted into the array above.
   Drop files into `public/properties/<slug>/`, run `npm run photos`, and that
   listing's card image and gallery fill themselves in — no edit here.

   A listing already carrying an explicit `gallery` keeps it, so the hand-built
   /assets/listings sets are untouched. This only ever fills gaps, which is what
   the two placeholder listings need.

   The order inside each manifest entry is the order shown, and the first file
   becomes the card image — so put the best exterior shot first. */
const PLACEHOLDER = "/assets/listings/photo-pending.svg";

/** True while a listing has no photograph of its own — either the AK monogram
 *  placeholder, or stock imagery standing in for it (`imgNote`). */
const awaitingPhotos = (l: Listing) => l.img === PLACEHOLDER || Boolean(l.imgNote);

function withPhotos(l: Listing): Listing {
  const files = (photoManifest as Record<string, string[]>)[l.slug];
  if (!files?.length) return l;

  const paths = files.map((f) => `/properties/${l.slug}/${f}`);
  return {
    ...l,
    // Real photography always wins over a placeholder or a stand-in, and takes
    // the "representative image" caption away with it.
    img: awaitingPhotos(l) ? paths[0] : l.img,
    imgNote: undefined,
    gallery: l.gallery ?? paths,
  };
}

/** The hand-entered listings. Pages read the merged set from listings.ts,
 *  where Alexandra's live MLS feed corrects and extends these. */
export const STATIC_LISTINGS: Listing[] = RAW_LISTINGS.map(withPhotos);

/** What to print where a price would go. "Price Upon Request" is a real
 *  luxury-listing convention, so a listing awaiting figures still reads as
 *  deliberate rather than broken. */
export const priceLabel = (l: Listing) => l.price ?? "Price Upon Request";

/** Location line, omitting the parts we don't have. Empty string when neither
 *  city nor ZIP is known, so callers can skip the element entirely. */
export const locationLabel = (l: Listing) => [l.city, l.zip].filter(Boolean).join(" ");

/** Specs are all-or-nothing: a card showing "3 Bd" with blank baths and sqft
 *  looks like a bug, so the row is dropped unless every figure is present. */
export const hasSpecs = (l: Listing) => Boolean(l.beds && l.baths && l.sqft);


/** Listings still waiting on photography — surfaced by `npm run photos`. */
export const AWAITING_PHOTOS = STATIC_LISTINGS.filter(awaitingPhotos).map((l) => l.slug);
