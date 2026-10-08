import { STATIC_LISTINGS, type Listing } from "./data";
import { fetchIdxListings, fromIdx, mlsFacts, photosOf, type RawIdxListing } from "./idx";

/* The one listing set every page renders: Alexandra's hand-entered listings
   (data.ts) merged with her live MLS feed (idx.ts).

   - A hand-entered listing that matches an MLS record takes the MLS's status,
     price, specs, ZIP and map position — those are facts, and the MLS is
     where they are kept current. Her photography, write-up, slug and
     neighborhood stay, since the feed has nothing better.
   - MLS records with no hand-entered twin are added in full, with the MLS's
     own photos and remarks.
   - Hand-entered listings the feed doesn't carry (older sales from before the
     feed's history, off-MLS deals) are shown exactly as entered.

   If the feed is unavailable this is just the hand-entered set. */

const PLACEHOLDER = "/assets/listings/photo-pending.svg";
const DIRECTIONS = new Set(["n", "s", "e", "w", "north", "south", "east", "west"]);

/** "1954 Pinehurst" and "1954 Pinehurst Road" are the same house: street
 *  number plus the first real word of the street name. Directions are skipped
 *  so "2050 N Las Palmas" keys on "las". */
function streetKey(addr: string): string {
  const words = addr.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  const name = words.slice(1).find((w) => !DIRECTIONS.has(w)) ?? "";
  return `${words[0] ?? ""} ${name}`;
}

const fullKey = (addr: string) => addr.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const rank = (r: RawIdxListing) => {
  const s = (r.idxStatus || r.propStatus || "").toLowerCase();
  return s.includes("sold") || s.includes("closed") ? 2 : s.includes("pend") ? 1 : 0;
};

/** One record per address. The feed repeats a house each time it trades — 1352
 *  Miller Drive is there as the current lease and two past ones — and a grid
 *  of the same house three times reads as padding. The live record wins, then
 *  the most recently updated. */
function dedupe(rows: RawIdxListing[]): RawIdxListing[] {
  const best = new Map<string, RawIdxListing>();
  for (const r of rows) {
    const k = fullKey(r.address);
    const cur = best.get(k);
    if (
      !cur ||
      rank(r) < rank(cur) ||
      (rank(r) === rank(cur) && (r.dateModified ?? "") > (cur.dateModified ?? ""))
    ) {
      best.set(k, r);
    }
  }
  return [...best.values()];
}

const defined = <T extends object>(o: T) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;

function merge(l: Listing, r: RawIdxListing): Listing {
  const facts = mlsFacts(r);
  const photos = photosOf(r);
  const needsPhoto = (l.img === PLACEHOLDER || Boolean(l.imgNote)) && photos.length > 0;
  return {
    ...l,
    ...defined(facts),
    hood: l.hood ?? facts.hood,
    img: needsPhoto ? photos[0] : l.img,
    imgNote: needsPhoto ? undefined : l.imgNote,
    gallery: l.gallery ?? (needsPhoto && photos.length > 1 ? photos : undefined),
    overview: l.overview ?? (r.remarksConcat ? [r.remarksConcat] : undefined),
    features: l.features ?? fromIdx(r).features,
  };
}

const priceOf = (l: Listing) => Number((l.price ?? "").replace(/[^0-9]/g, "")) || 0;

export async function getListings(): Promise<Listing[]> {
  const feed = await fetchIdxListings();
  if (!feed) return STATIC_LISTINGS;

  const rows = dedupe(feed);
  const used = new Set<RawIdxListing>();

  const merged = STATIC_LISTINGS.map((l) => {
    const r = rows.find((x) => !used.has(x) && streetKey(x.address) === streetKey(l.addr));
    if (!r) return l;
    used.add(r);
    return merge(l, r);
  });

  /* The same sale is sometimes filed under two addresses (a corner lot: 803
     Boccaccio and 2312 Pisani Place share coordinates, specs and price). One
     card per sale. */
  const saleKey = (r: RawIdxListing) => `${r.latitude},${r.longitude},${r.soldPrice ?? r.listingPrice}`;
  const seenSales = new Set([...used].map(saleKey));
  const extras: Listing[] = [];
  for (const r of rows) {
    if (used.has(r) || seenSales.has(saleKey(r))) continue;
    seenSales.add(saleKey(r));
    extras.push(fromIdx(r));
  }

  const all = [...merged, ...extras];
  const active = all.filter((l) => l.status !== "Sold");
  /* Sales by price, then leases — a $20,000/mo rental isn't a $20,000 sale and
     shouldn't sit in among the closings by that number. */
  const sold = all
    .filter((l) => l.status === "Sold")
    .sort((a, b) => Number(Boolean(a.lease)) - Number(Boolean(b.lease)) || priceOf(b) - priceOf(a));
  return [...active, ...sold];
}

export async function getListing(slug: string): Promise<Listing | undefined> {
  return (await getListings()).find((l) => l.slug === slug);
}
