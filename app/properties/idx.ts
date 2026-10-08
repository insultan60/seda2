import { unstable_cache } from "next/cache";
import type { Listing } from "./data";
import { photoPath } from "./photoProxy";

/* Alexandra's live MLS listings from IDX Broker — server-side only.

   IDX_BROKER_ACCESS_KEY never reaches the browser: pages fetch here on the
   server and pass plain Listing objects down. The feed is her account's
   featured (active) listings plus its sold/pending history, cached for fifteen
   minutes — the same cadence as the pages that render it.

   Failure is soft. No key, IDX down, or a bad response returns null and the
   site falls back to the hand-entered listings in data.ts, so a feed outage
   can never take the portfolio down with it. */

type RawImage = { url?: string };
export type RawIdxListing = {
  listingID: string;
  address: string;
  cityName: string;
  zipcode: string;
  listingPrice: string;
  price?: number;
  soldPrice?: number | string;
  bedrooms?: number | string;
  totalBaths?: number | string;
  sqFt?: string;
  acres?: string;
  yearBuilt?: number | string;
  latitude: string | number;
  longitude: string | number;
  image?: Record<string, RawImage | number>;
  remarksConcat?: string;
  detailsUrlSlug: string;
  idxStatus?: string;
  propStatus?: string;
  propType?: string;
  propSubType?: string;
  dateModified?: string;
};

const IDX_BASE = "https://api.idxbroker.com";

async function idxGet(path: string): Promise<RawIdxListing[] | null> {
  const key = process.env.IDX_BROKER_ACCESS_KEY;
  if (!key) return null;
  const res = await fetch(`${IDX_BASE}/${path}`, {
    headers: { accesskey: key, outputtype: "json" },
    cache: "no-store", // unstable_cache below owns the caching
  });
  if (res.status === 204) return [];
  if (!res.ok) throw new Error(`IDX ${path}: ${res.status}`);
  const json = (await res.json()) as { data?: Record<string, RawIdxListing> };
  return Object.values(json.data ?? {});
}

export const fetchIdxListings = unstable_cache(
  async (): Promise<RawIdxListing[] | null> => {
    try {
      const [featured, soldpending] = await Promise.all([
        idxGet("clients/featured"),
        idxGet("clients/soldpending"),
      ]);
      if (featured === null && soldpending === null) return null;
      return [...(featured ?? []), ...(soldpending ?? [])];
    } catch (err) {
      console.error("[idx] feed unavailable, using hand-entered listings only:", err);
      return null;
    }
  },
  ["ak-idx-listings"],
  { revalidate: 900, tags: ["idx-listings"] },
);

/* ------------------------------------------------------------ mapping */

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const num = (v: unknown) => Number(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;

export const isLease = (r: RawIdxListing) => (r.propType ?? "").toLowerCase().includes("lease");

function stateOf(r: RawIdxListing): "Active" | "Pending" | "Sold" {
  const s = (r.idxStatus || r.propStatus || "").toLowerCase();
  if (s.includes("pend")) return "Pending";
  if (s.includes("sold") || s.includes("closed")) return "Sold";
  return "Active";
}

export function photosOf(r: RawIdxListing): string[] {
  return Object.values(r.image ?? {})
    .map((img) => (typeof img === "object" ? img.url : undefined))
    .filter((u): u is string => Boolean(u))
    .map(photoPath);
}

/** The MLS facts about a listing, in the site's Listing shape. Status, price,
 *  specs and location are the MLS's word; data.ts can't override them. */
export function mlsFacts(r: RawIdxListing): Omit<Listing, "slug" | "addr" | "img"> {
  const state = stateOf(r);
  const lease = isLease(r);
  const closed = state === "Sold";
  const amount = closed && num(r.soldPrice) ? num(r.soldPrice) : num(r.price) || num(r.listingPrice);

  const badge = closed
    ? lease ? "Leased" : "Sold"
    : state === "Pending"
      ? "Pending"
      : lease ? "For Lease" : "Active";
  const badgeCls = closed ? "badge--sold" : state === "Pending" ? "badge--pending" : "badge--sale";

  const lat = Number(r.latitude);
  const lng = Number(r.longitude);

  return {
    /* The pages work in two states, Active and Sold. A pending sale is still
       a home she currently represents, so it stays with the actives and says
       "Pending" on its badge. */
    status: closed ? "Sold" : "Active",
    badge,
    badgeCls,
    price: amount ? money(amount) + (lease ? "/mo" : "") : undefined,
    city: r.cityName ? `${r.cityName}, CA` : undefined,
    zip: r.zipcode || undefined,
    /* MLS "cities" like Studio City, Venice and Santa Monica are neighborhoods
       on this site. Plain "Los Angeles" says nothing about which one, and a
       guessed neighborhood would put a real sale on the wrong tile — so it is
       left blank. */
    hood: r.cityName && r.cityName !== "Los Angeles" ? r.cityName : undefined,
    beds: r.bedrooms != null && r.bedrooms !== "" ? String(r.bedrooms) : undefined,
    baths: r.totalBaths != null && r.totalBaths !== "" ? String(r.totalBaths) : undefined,
    sqft: r.sqFt || undefined,
    lat: Number.isFinite(lat) && lat !== 0 ? lat : undefined,
    lng: Number.isFinite(lng) && lng !== 0 ? lng : undefined,
    mlsId: r.listingID,
    lease,
  };
}

/** A listing that exists only in the feed — no hand-entered copy to merge with. */
export function fromIdx(r: RawIdxListing): Listing {
  const photos = photosOf(r);
  const features = [
    { label: "Type", value: r.propSubType || (isLease(r) ? "Residential Lease" : "Residential") },
    // The detail page reads features[1] as Year Built for its stats row.
    ...(r.yearBuilt ? [{ label: "Year Built", value: String(r.yearBuilt) }] : []),
    ...(num(r.acres) ? [{ label: "Lot Size", value: `${r.acres} acres` }] : []),
    { label: "MLS #", value: r.listingID },
  ];
  return {
    ...mlsFacts(r),
    slug: r.detailsUrlSlug.toLowerCase(),
    addr: r.address,
    img: photos[0] ?? "/assets/listings/photo-pending.svg",
    gallery: photos.length > 1 ? photos : undefined,
    overview: r.remarksConcat ? [r.remarksConcat] : undefined,
    features,
  };
}
