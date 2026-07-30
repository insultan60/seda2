/* ==========================================================================
   Home Search data — real active listings sourced from the Combined LA/Westside
   MLS IDX feed (as on andrewliberty.com). Photos are hotlinked from the MLS
   media services; a branded placeholder is used when a host blocks hotlinking.
   In production, wire this data + map to the live IDX API.
   ========================================================================== */

export type Listing = {
  id: number;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  lot: string | null;
  addr: string;
  city: string;
  zip: string;
  mls: string;
  type: string;
  img: string;
  status: "Active" | "Coming Soon";
  order: number;
  lat: number;
  lng: number;
};

// Approximate neighborhood centers — until the MLS/IDX feed supplies real
// geocoordinates, listings are placed near their city center with a small
// deterministic offset so pins don't stack.
const CITY_COORDS: Record<string, [number, number]> = {
  Burbank: [34.1808, -118.309],
  "Sherman Oaks": [34.1508, -118.4489],
  "Los Angeles": [34.101, -118.34],
  "West Hollywood": [34.09, -118.3617],
  "Studio City": [34.1397, -118.387],
  "Beverly Hills": [34.0901, -118.4065],
  "Toluca Lake": [34.1517, -118.352],
};

const T = (n: string) => `https://mediaservice.themls.com/large/${n}`;
const C = (u: string) => `https://media.crmls.org/medias/${u}.jpg`;

// [price, beds, baths, sqft, lot, addr, city, zip, mls, type, img]
type Raw = [number, number | null, number | null, number | null, string | null, string, string, string, string, string, string];

const RAW: Raw[] = [
  [899998, 3, 2, 1120, null, "1218 N Hollywood Way", "Burbank", "91505", "BB26148335MR", "House", C("78de2b55-c2a7-45d5-822d-fdb00a9ea8d2")],
  [1450000, 4, 2, 2227, null, "14830 Huston St", "Sherman Oaks", "91403", "26861057", "House", T("26861057/26861057_172170b2-5486-4a72-8845-64113d1331ce.jpg")],
  [1450000, 3, 2, 2030, null, "14325 Millbrook Dr", "Sherman Oaks", "91423", "SR26156468MR", "House", C("d3db98ec-648b-4bb6-95ac-cd1c82f73685")],
  [13800000, 5, 5.5, 8929, null, "2630 Algodon Ct", "Los Angeles", "90046", "26833061", "House", T("26833061/26833061_42772235-c852-4026-90a4-8a0beebb66d0.jpg")],
  [2995000, 4, 5, 2930, null, "9146 St Ives Dr", "West Hollywood", "90069", "26856159", "House", T("26856159/26856159_76380794-bedd-42e1-ac3b-36a6404198f3.jpg")],
  [2200000, 6, 3, 2960, null, "1260 Ozeta Ter", "West Hollywood", "90069", "26860427", "Multi-Family", T("26860427/26860427_fbd99247-9c43-42db-9100-42d88aec6534.jpg")],
  [475000, 1, 1, 904, null, "4501 Cedros Unit: 220", "Sherman Oaks", "91403", "WS26155420MR", "Condo", C("9d341063-4d0a-4d95-a8b0-8f1842ccecb1")],
  [199000, null, null, null, "0.15 Acres", "8229 W Gould Ave", "Los Angeles", "90046", "26861441", "Land", T("26861441/26861441_735917bc-1cc8-44e6-afc8-5de5c4e94e51.jpg")],
  [1975000, 3, 2, 2074, null, "2614 Rutherford Dr", "Los Angeles", "90068", "26861237", "House", T("26861237/26861237_3e3a443d-b74f-4a20-aa91-b6e8ecc52ff8.jpg")],
  [4190000, 4, 3.5, 3958, null, "1926 N Crescent Heights Blvd", "Los Angeles", "90069", "26861395", "House", T("26861395/26861395_a1178b8c-42e7-41cb-8aaf-1daef6ed72dd.jpg")],
  [1399000, 3, 2, 1472, null, "409 S Lamer St", "Burbank", "91506", "BB26147304MR", "House", C("72845d36-078c-48ff-883f-d343856ee6a5")],
  [1975000, 4, 3.5, 2147, null, "4100 Woodcliff Rd", "Sherman Oaks", "91403", "26860129", "House", T("26860129/26860129_b4837735-d7fb-42e0-bb29-b07d4893b47f.jpg")],
  [1495000, 2, 2, 1492, null, "3416 W Clark Ave", "Burbank", "91505", "26861277", "House", T("26861277/26861277_6a2959fe-c035-4fe9-a138-6077712a8592.jpg")],
  [76000000, null, null, null, "2 Acres", "8875 Thrasher", "West Hollywood", "90069", "SR26157223MR", "Land", C("bd56a507-c55e-44a8-83a6-b5cd32b7bb89")],
  [399000, 1, 1, 925, null, "4700 Natick Ave Unit: 104", "Sherman Oaks", "91403", "SB26156164MR", "Condo", C("e31c4ad5-a415-4d24-a417-0c0475ad3cd1")],
  [1440000, 2, 2, 1556, null, "6335 Grape Pl", "Los Angeles", "90068", "26856325", "House", T("26856325/26856325_c54e5757-bb26-4966-8058-cc4e0924ebd9.jpg")],
  [975000, 2, 1.5, 1154, null, "1546 N St Andrews Pl", "Los Angeles", "90028", "26860961", "House", T("26860961/26860961_cbf1a24b-55d2-4e8d-a50b-5fdfb3631fcd.jpg")],
  [3899000, 5, 5.5, 4583, null, "14755 Hesby St", "Sherman Oaks", "91403", "SR26151814MR", "House", C("ae79046b-59b0-4353-ba1f-e3870d36b60e")],
  [2782800, 5, 5, 3420, null, "14254 Mccormick St", "Sherman Oaks", "91401", "26861407", "House", T("26861407/26861407_7f62f49b-05e6-4bbb-b310-d65ade499ccb.jpg")],
  [1345000, 3, 3, 1261, null, "8876 Wonderland Ave", "Los Angeles", "90046", "26861635", "House", T("26861635/26861635_49bca47a-93fc-430b-bad9-809105132b3b.jpg")],
  [1692000, null, null, null, "0.14 Acres", "1215 Hilldale", "West Hollywood", "90069", "26841863", "Land", T("26841863/26841863_90e4a41a-b6c5-4eea-bfb6-6e78f4caa7ec.jpg")],
  [2499000, 5, 6, 3539, null, "15014 Valleyheart", "Sherman Oaks", "91403", "SR26156593MR", "House", C("00c35f42-bc18-4180-9448-15229bdd494d")],
  [899000, 3, 3, 1674, null, "15173 Magnolia Blvd Unit: F", "Sherman Oaks", "91403", "26861147", "Townhouse", T("26861147/26861147_d4068716-82e7-4286-9716-d68780aaa890.jpg")],
  [929000, 3, 2.25, 1750, null, "4173 Colfax Unit: L", "Studio City", "91604", "SR26139798MR", "Townhouse", C("85a3bcc1-1a7c-4b6e-8611-3f04e58a8e2e")],
  [49000, null, null, null, "0.12 Acres", "2311 N Beverly Glen Pl", "Los Angeles", "90077", "26860807", "Land", T("26860807/26860807_2773519e-2fb9-4f02-ab5d-804c040593c4.jpg")],
  [1449000, 3, 2, 1620, null, "13024 Magnolia Blvd", "Sherman Oaks", "91423", "26859763", "House", T("26859763/26859763_3e3d7ad6-f7e7-4852-be5d-ad97da1101c6.jpg")],
  [2395000, 3, 2.75, 2355, null, "8309 Yucca Trl", "Los Angeles", "90046", "26856437", "House", T("26856437/26856437_e97df1f8-c889-48e3-a216-df0b748b2d7c.jpg")],
  [1895000, 3, 2.5, 2106, null, "4531 Kraft Ave", "Studio City", "91602", "26860147", "House", T("26860147/26860147_d40bf250-d83e-44b9-873c-72d2cccbf383.jpg")],
  [2450000, 3, 3.5, 1894, null, "1337 N Orange Grove Ave", "West Hollywood", "90046", "26853881", "House", T("26853881/26853881_b755b40a-ec92-4115-945b-72e07b37d2ba.jpg")],
  [1695000, 3, 2.5, 1614, null, "3931 Woodcliff Rd", "Sherman Oaks", "91403", "26860331", "House", T("26860331/26860331_c32f2c9a-7964-4314-bbaa-3b9c519edea1.jpg")],
  [1868000, 3, 1, 1214, null, "9667 Yoakum Dr", "Beverly Hills", "90210", "26860231", "House", T("26860231/26860231_e9d1dde2-1407-49df-af1a-80cff19f4d64.jpg")],
  [849000, 3, 3, 1768, null, "4915 Tyrone Unit: 221", "Sherman Oaks", "91423", "SR26155516MR", "Condo", C("459b2ae1-94eb-4d85-8066-a6239079476a")],
  [3295000, 5, 4, 3047, null, "4210 Bellaire Ave", "Studio City", "91604", "26857611", "House", T("26857611/26857611_9c2b36af-92bb-4403-bdda-d6515b7e9f5e.jpg")],
  [10495000, 6, 7.5, 9800, null, "1814 Marcheeta Pl", "Los Angeles", "90069", "26859401", "House", T("26859401/26859401_4fc497ff-bf8e-4eab-94dc-adea6c4a62a3.jpg")],
  [44990000, 9, 14, 21000, null, "10066 Cielo Dr", "Beverly Hills", "90210", "26860267", "House", T("26860267/26860267_2432d9a9-a5e6-41f9-a859-e761c793787b.jpg")],
  [3699000, 4, 5.5, 3708, null, "3072 Hollyridge Dr", "Los Angeles", "90068", "26860655", "House", T("26860655/26860655_414f9847-e685-4c31-8ff2-86f80ab5fccc.jpg")],
  [1890000, 4, 4, 2646, null, "6477 Deep Dell Pl", "Los Angeles", "90068", "26860433", "House", T("26860433/26860433_0d756c0c-0899-4715-937d-0240493ad4fc.jpg")],
  [3899000, 5, 4, 3819, null, "3240 Longridge Ave", "Sherman Oaks", "91423", "SR26154440MR", "House", C("249acf74-8bb3-4ec1-a460-21549da3d50c")],
  [615000, 2, 2, 1046, null, "12801 Moorpark St Unit: 303", "Studio City", "91604", "SR26155971MR", "Condo", C("bd621ae0-c050-48d1-9062-de9bd36bf505")],
  [4995000, 4, 4.5, 3291, null, "1813 Marcheeta Pl", "Los Angeles", "90069", "26859379", "House", T("26859379/26859379_1134137c-a6f7-493a-816f-1ab1c6ef2f22.jpg")],
  [2399998, 4, 2.5, 2630, null, "3000 Dona Emilia Dr", "Studio City", "91604", "26860285", "House", T("26860285/26860285_de5f1ba4-bc37-4252-818f-894d1852cdcc.jpg")],
  [1795000, 4, 4, 2450, null, "4421 Strohm Ave", "Toluca Lake", "91602", "26834345", "House", T("26834345/26834345_146e899a-41be-4280-b1c4-84c1396e60d3.jpg")],
  [1700000, 4, 4.5, 3966, null, "3643 Potosi Ave", "Studio City", "91604", "OC26155150MR", "House", C("277ba020-15ec-4535-8a71-cd65e413cabb")],
  [599000, 1, 2, 1212, null, "14159 Dickens St Unit: 110", "Sherman Oaks", "91423", "SR26153634MR", "Condo", C("349f7c0a-caab-49e2-8b7c-a65c65a95eb4")],
  [1399000, 3, 2.25, 1964, null, "4112 Vanetta Pl", "Studio City", "91604", "26861019", "House", T("26861019/26861019_e748e9ec-c529-4937-9161-0e130ea2c920.jpg")],
  [5995000, 15, 17, 13131, null, "8468 Fountain Ave", "West Hollywood", "90069", "26860931", "Multi-Family", T("26860931/26860931_c6ca86e3-10a1-4874-b291-8fe137dfbace.jpg")],
  [2695000, 2, 3, 3058, null, "2023 Kendra Ct", "Los Angeles", "90068", "26842905", "House", T("26842905/26842905_3ecf234b-3a03-444b-8c41-aadf5b93ecf9.jpg")],
  [1198000, 2, 1, 864, null, "8522 Walnut Dr", "Los Angeles", "90046", "26856745", "House", T("26856745/26856745_5c7b9af3-e2b5-45d9-96d5-12c89b426c02.jpg")],
];

// Mark a couple as Coming Soon for realism (source query includes COMING_SOON)
const COMING = new Set([4, 27]);

export const LISTINGS: Listing[] = RAW.map((r, i) => {
  const base = CITY_COORDS[r[6]] ?? [34.101, -118.34];
  // deterministic jitter (~±0.012°) keyed off id so pins spread out
  const jLat = (((i * 37) % 25) - 12) / 1000;
  const jLng = (((i * 53) % 25) - 12) / 1000;
  return {
    id: i,
    price: r[0],
    beds: r[1],
    baths: r[2],
    sqft: r[3],
    lot: r[4],
    addr: r[5],
    city: r[6],
    zip: r[7],
    mls: r[8],
    type: r[9],
    img: r[10],
    status: COMING.has(i) ? "Coming Soon" : "Active",
    order: i,
    lat: base[0] + jLat,
    lng: base[1] + jLng,
  };
});

// Total results as reported by the source feed for this boundary
export const TOTAL_RESULTS = 1744;

export const money = (n: number) => "$" + n.toLocaleString("en-US");
export const abbr = (n: number) =>
  n >= 1e6 ? "$" + (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + "M" : "$" + Math.round(n / 1e3) + "K";

// Branded fallback for MLS photos that block cross-origin hotlinking (e.g. CRMLS).
export const PLACEHOLDER = "/assets/listings/photo-pending.svg";

export type SearchState = {
  status: string[];
  priceMin: number | null;
  priceMax: number | null;
  types: string[];
  beds: number;
  baths: number;
  sqft: number;
  q: string;
  sort: string;
};

export const DEFAULT_STATE: SearchState = {
  status: ["Active", "Coming Soon"],
  priceMin: null,
  priceMax: null,
  types: [],
  beds: 0,
  baths: 0,
  sqft: 0,
  q: "",
  sort: "newest",
};

/** Filter + sort the listings for a given state. */
export function applyState(state: SearchState): Listing[] {
  const out = LISTINGS.filter((l) => {
    if (!state.status.includes(l.status)) return false;
    if (state.priceMin != null && l.price < state.priceMin) return false;
    if (state.priceMax != null && l.price > state.priceMax) return false;
    if (state.types.length && !state.types.includes(l.type)) return false;
    if (state.beds && (l.beds || 0) < state.beds) return false;
    if (state.baths && (l.baths || 0) < state.baths) return false;
    if (state.sqft && (l.sqft || 0) < state.sqft) return false;
    if (state.q) {
      const hay = (l.addr + " " + l.city + " " + l.zip + " " + l.type).toLowerCase();
      if (!hay.includes(state.q.toLowerCase())) return false;
    }
    return true;
  });
  const s = state.sort;
  out.sort((a, b) =>
    s === "price-asc"
      ? a.price - b.price
      : s === "price-desc"
        ? b.price - a.price
        : s === "beds-desc"
          ? (b.beds || 0) - (a.beds || 0)
          : s === "sqft-desc"
            ? (b.sqft || 0) - (a.sqft || 0)
            : a.order - b.order
  );
  return out;
}

/** Count listings matching a provisional drawer state (superset of SearchState). */
export function countFor(st: {
  status: string[];
  types: string[];
  priceMin: number | null;
  priceMax: number | null;
  beds: number;
  baths: number;
  sqft: number;
  q: string;
}): number {
  return LISTINGS.filter((l) => {
    if (st.status.length && !st.status.includes(l.status)) return false;
    if (st.priceMin != null && l.price < st.priceMin) return false;
    if (st.priceMax != null && l.price > st.priceMax) return false;
    if (st.types.length && !st.types.includes(l.type)) return false;
    if (st.beds && (l.beds || 0) < st.beds) return false;
    if (st.baths && (l.baths || 0) < st.baths) return false;
    if (st.sqft && (l.sqft || 0) < st.sqft) return false;
    if (st.q) {
      const hay = (l.addr + " " + l.city + " " + l.zip + " " + l.type + " " + l.mls).toLowerCase();
      if (!hay.includes(st.q.toLowerCase())) return false;
    }
    return true;
  }).length;
}

export function activeFilterCount(state: SearchState): number {
  let n = 0;
  if (
    !(state.status.length === 2 && state.status.includes("Active") && state.status.includes("Coming Soon"))
  )
    n++;
  if (state.priceMin != null || state.priceMax != null) n++;
  if (state.types.length) n++;
  if (state.beds) n++;
  if (state.baths) n++;
  if (state.sqft) n++;
  return n;
}
