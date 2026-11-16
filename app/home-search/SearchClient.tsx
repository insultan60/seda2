"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  hasSpecs,
  locationLabel,
  priceLabel,
  type Listing,
} from "../properties/data";
import { ALSO_SERVING, FEATURED } from "../neighborhoods/data";
import { IDX_HOME_TYPES, IDX_LISTING_TYPES, idxResultsUrl } from "../site";
import { IDX_CITIES } from "./cities";

const HOODS = [...FEATURED, ...ALSO_SERVING].filter((h) => h.zips?.length);
const LA_CITY_ID = IDX_CITIES.find(([n]) => n === "Los Angeles")![1];

/** What to hand IDX for whatever is in the location box: any 5-digit ZIP(s)
 *  typed in, a neighborhood she serves (its ZIPs), or a CRMLS city (its IDX
 *  city ID). Empty or unrecognised falls back to the City of Los Angeles,
 *  never the whole statewide MLS. */
function resolveLocation(query: string): { zips?: string[]; cityIds?: string[]; known: boolean } {
  const q = query.trim().toLowerCase().replace(/,?\s*(ca|california)$/, "").trim();
  if (!q) return { cityIds: [LA_CITY_ID], known: true };
  const typed = q.match(/\b9\d{4}\b/g);
  if (typed) return { zips: typed, known: true };
  const hood =
    HOODS.find((h) => h.name.toLowerCase() === q) ??
    HOODS.find((h) => h.name.toLowerCase().includes(q) || q.includes(h.name.toLowerCase()));
  if (hood) return { zips: [...hood.zips!], known: true };
  const city =
    IDX_CITIES.find(([n]) => n.toLowerCase() === q) ??
    IDX_CITIES.find(([n]) => n.toLowerCase().startsWith(q));
  if (city) return { cityIds: [city[1]], known: true };
  return { cityIds: [LA_CITY_ID], known: false };
}

/* Ported from the static build (f/alexandra-kerr/home-search.html + js/search.js).
   The one deliberate departure: that page carried its own hardcoded PROPS array,
   eight entries of which duplicated listings already in app/properties/data.ts.
   This takes the same merged listing set the portfolio renders (hand-entered
   plus Alexandra's live MLS feed, app/properties/listings.ts), passed down from
   the server, so the map, the portfolio and the detail pages cannot drift apart. Listings without lat/lng simply list without a pin. */

const TILES = {
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attr: "&copy; OpenStreetMap contributors",
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr: "Imagery &copy; Esri",
  },
  hybrid: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr: "Imagery &copy; Esri",
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attr: "&copy; OpenTopoMap",
  },
} as const;
type LayerKey = keyof typeof TILES;

/** "$7,775,000" → "$7.78M", "$28,000/mo" → "$28K" — the pin label. */
function pinLabel(l: Listing) {
  const n = Number((l.price ?? "").replace(/[^0-9]/g, ""));
  if (!n) return "POR";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${Math.round(n / 1000)}K`;
}
const priceValue = (l: Listing) => Number((l.price ?? "").replace(/[^0-9]/g, "")) || 0;
const sqftValue = (l: Listing) => Number((l.sqft ?? "").replace(/[^0-9]/g, "")) || 0;

const SORTS = ["Newest", "Price: High to Low", "Price: Low to High", "Sq.Ft."] as const;
type Sort = (typeof SORTS)[number];

const STATUSES = ["Active", "Sold"] as const;
type Status = (typeof STATUSES)[number];

export default function SearchClient({
  initialQuery = "",
  initialStatus = "Active",
  listings,
}: {
  initialQuery?: string;
  initialStatus?: Status;
  listings: Listing[];
}) {
  const [query, setQuery] = useState(initialQuery);
  /* Active / Sold tabs, the same two views as the portfolio. */
  const [status, setStatus] = useState<Status>(initialStatus);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  /* MLS-only filters: her own listings are few enough not to need them. */
  const [listingType, setListingType] = useState<string>("sfr");
  const [homeType, setHomeType] = useState<string>("");
  const [sort, setSort] = useState<Sort>("Newest");
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [view, setView] = useState<"map" | "list">("map");
  const [layer, setLayer] = useState<LayerKey>("street");
  const [layersOpen, setLayersOpen] = useState(false);
  const [hot, setHot] = useState<string | null>(null);

  /* Every filter except the tab, so each tab can show its own count. */
  const matching = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      if (q && ![l.addr, l.city, l.zip, l.hood].some((f) => f?.toLowerCase().includes(q)))
        return false;
      const p = priceValue(l);
      // A listing with no price yet is never filtered out by a price range —
      // dropping it would hide a real property behind a filter it can't answer.
      if (p && minPrice && p < minPrice) return false;
      if (p && maxPrice && p > maxPrice) return false;
      if (beds && Number(l.beds ?? 0) < beds) return false;
      if (baths && Number(l.baths ?? 0) < baths) return false;
      return true;
    });
  }, [listings, query, minPrice, maxPrice, beds, baths]);
  const counts = {
    Active: matching.filter((l) => l.status === "Active").length,
    Sold: matching.filter((l) => l.status === "Sold").length,
  };

  const results = useMemo(() => {
    const sorted = matching.filter((l) => l.status === status);
    if (sort === "Price: High to Low") sorted.sort((a, b) => priceValue(b) - priceValue(a));
    if (sort === "Price: Low to High") sorted.sort((a, b) => priceValue(a) - priceValue(b));
    if (sort === "Sq.Ft.") sorted.sort((a, b) => sqftValue(b) - sqftValue(a));
    return sorted;
  }, [matching, status, sort]);

  const pinned = results.filter((l) => l.lat != null && l.lng != null);

  /* The real search: the same filters run against the entire MLS on IDX,
     where visitors can also save the search and get email alerts. The map
     and cards below are only Alexandra's own listings. */
  const location = resolveLocation(query);
  const mlsUrl = idxResultsUrl({ ...location, pt: listingType, minPrice, maxPrice, beds, baths, homeType });

  /* The static build hardcoded `top: 56px` for the filter bar because its nav
     was a fixed 56px. This project's <Header> is fluid, so measure it instead
     of guessing — otherwise the bars overlap the nav or float below it. */
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!nav) return;
    const apply = () =>
      document.documentElement.style.setProperty("--ak-header", `${Math.round(nav.offsetHeight)}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(nav);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--ak-header");
    };
  }, []);

  /* ---------- Leaflet ---------- */
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const LRef = useRef<typeof L | null>(null);
  /* Leaflet is imported dynamically (it touches `window` at module scope), so
     the map does not exist on first render. Without this flag the pin-building
     effect runs once against a null map, bails, and — depending only on
     `results` — never runs again, leaving a map with no pins on it. */
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const leaflet = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      LRef.current = leaflet;
      /* The page scrolls past the map to the copy below it, so the wheel only
         zooms once the map has been clicked, and lets go when the pointer
         leaves. Otherwise scrolling down the page stalls on the map. */
      const map = leaflet.map(mapEl.current, { zoomControl: true, scrollWheelZoom: false })
        .setView([34.055, -118.36], 12);
      map.zoomControl.setPosition("topleft");
      map.on("click focus", () => map.scrollWheelZoom.enable());
      map.on("mouseout blur", () => map.scrollWheelZoom.disable());
      tileRef.current = leaflet.tileLayer(TILES.street.url, { attribution: TILES.street.attr }).addTo(map);
      mapRef.current = map;
      setMapReady(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const leaflet = LRef.current;
    if (!map || !leaflet) return;
    tileRef.current?.remove();
    tileRef.current = leaflet
      .tileLayer(TILES[layer].url, { attribution: TILES[layer].attr })
      .addTo(map);
  }, [layer, mapReady]);

  // Rebuild pins whenever the result set changes.
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = LRef.current;
    if (!map || !leaflet) return;

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    pinned.forEach((l) => {
      const icon = leaflet.divIcon({
        className: "",
        html: `<span class="price-pin">${pinLabel(l)}</span>`,
        iconSize: [1, 1],
      });
      const marker = leaflet.marker([l.lat!, l.lng!], { icon }).addTo(map);
      marker.bindPopup(
        `<div class="map-pop">
           <img src="${l.img}" alt="">
           <div class="map-pop__body">
             <div class="map-pop__price">${priceLabel(l)}</div>
             <div class="map-pop__addr">${l.addr}</div>
             <div class="map-pop__meta">${[locationLabel(l), hasSpecs(l) ? `${l.beds} bd · ${l.baths} ba · ${l.sqft} sf` : ""]
               .filter(Boolean)
               .join(" · ")}</div>
           </div>
         </div>`,
      );
      marker.on("mouseover", () => setHot(l.slug));
      marker.on("mouseout", () => setHot(null));
      markersRef.current[l.slug] = marker;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, mapReady]);

  // The map is laid out inside a hidden container in list view, so Leaflet has
  // to be told to re-measure when it comes back.
  useEffect(() => {
    if (view === "map") setTimeout(() => mapRef.current?.invalidateSize(), 0);
  }, [view]);

  const focusPin = useCallback((slug: string) => {
    const m = markersRef.current[slug];
    if (m) m.openPopup();
  }, []);


  const panel = (key: string, label: string, body: React.ReactNode, cls = "") => (
    <div className="sbar__filter">
      <button
        type="button"
        className="sbar__btn"
        aria-expanded={openPanel === key}
        aria-haspopup="true"
        onClick={() => setOpenPanel(openPanel === key ? null : key)}
      >
        {label}
        <svg width="9" height="5" viewBox="0 0 9 5" aria-hidden="true">
          <path d="M1 1l3.5 3L8 1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {openPanel === key && (
        <div className={`sbar__dropdown ${cls}`}>
          {body}
          <button type="button" className="sbar__apply" onClick={() => setOpenPanel(null)}>
            Apply
          </button>
        </div>
      )}
    </div>
  );

  const rent = listingType === "lse";
  const priceOptions = rent
    ? [0, 2_000, 3_000, 4_000, 5_000, 7_500, 10_000, 15_000, 25_000]
    : [0, 500_000, 750_000, 1_000_000, 1_500_000, 2_000_000, 3_000_000, 5_000_000, 8_000_000, 12_000_000];
  const money = (v: number) =>
    rent ? `$${v.toLocaleString("en-US")}/mo` : v >= 1_000_000 ? `$${+(v / 1_000_000).toFixed(2)}M` : `$${v / 1000}K`;
  const switchType = (t: string) => {
    if (t === listingType) return;
    // Sale and rent prices are different scales; carrying one over to the
    // other would silently return nothing.
    setListingType(t);
    setMinPrice(0);
    setMaxPrice(0);
  };

  return (
    /* One screen-high block: the copy above and below it scrolls with the
       page, the bars stay pinned only while the map is in view. */
    <div className="search-app">
      {/* ---------- FILTER BAR ---------- */}
      <form className="sbar" role="search" aria-label="Property search filters" onSubmit={(e) => { e.preventDefault(); window.location.assign(mlsUrl); }}>
        <div className="sbar__inner">
          <div className="sbar__location">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <label className="sr-only" htmlFor="q">Location</label>
            <input
              id="q"
              type="search"
              placeholder="City, neighborhood or ZIP"
              autoComplete="off"
              list="ak-locations"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <datalist id="ak-locations">
              {HOODS.map((h) => <option key={`h-${h.name}`} value={h.name} />)}
              {IDX_CITIES.map(([n]) => <option key={`c-${n}`} value={n} />)}
            </datalist>
          </div>

          <div className="sbar__tabs" role="radiogroup" aria-label="Buy or rent (full MLS search)">
            {IDX_LISTING_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                role="radio"
                aria-checked={listingType === t.value}
                className={listingType === t.value ? "is-active" : ""}
                onClick={() => switchType(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="sbar__tabs" role="tablist" aria-label="Listing status">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={status === s}
                className={status === s ? "is-active" : ""}
                onClick={() => setStatus(s)}
              >
                {s} <span className="sbar__tab-count">{counts[s]}</span>
              </button>
            ))}
          </div>

          {panel(
            "price",
            minPrice || maxPrice ? "Price ·" : "Any Price",
            <div className="sbar__range-row">
              <div className="sbar__range-field">
                <label htmlFor="pmin">Min</label>
                <select id="pmin" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))}>
                  {priceOptions.map((v) => (
                    <option key={v} value={v}>{v ? money(v) : "No min"}</option>
                  ))}
                </select>
              </div>
              <span className="sbar__range-sep">–</span>
              <div className="sbar__range-field">
                <label htmlFor="pmax">Max</label>
                <select id="pmax" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}>
                  {priceOptions.map((v) => (
                    <option key={v} value={v}>{v ? money(v) : "No max"}</option>
                  ))}
                </select>
              </div>
            </div>,
            "sbar__dropdown--range",
          )}

          {panel(
            "beds",
            beds || baths ? `${beds}+ bd, ${baths}+ ba` : "Any Beds, Any Baths",
            <>
              {([["Beds", beds, setBeds], ["Baths", baths, setBaths]] as const).map(([label, val, set]) => (
                <div className="sbar__seg-group" key={label}>
                  <span className="sbar__seg-label">{label}</span>
                  <div className="sbar__segments">
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        className={val === n ? "is-active" : ""}
                        onClick={() => set(n)}
                      >
                        {n === 0 ? "Any" : `${n}+`}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </>,
            "sbar__dropdown--beds",
          )}

          <div className="sbar__filter">
            <label className="sr-only" htmlFor="htype">Home type</label>
            <select id="htype" className="sbar__btn sbar__select" value={homeType} onChange={(e) => setHomeType(e.target.value)}>
              {IDX_HOME_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* Submits the form: opens the full-MLS results on IDX with every
              filter above applied. */}
          <button type="submit" className="sbar__save sbar__save--mls">
            Search Homes
          </button>
        </div>
      </form>

      {/* ---------- RESULTS BAR ---------- */}
      <div className="rbar">
        <div className="rbar__left">
          <button
            type="button"
            className={`rbar__view${view === "map" ? " is-active" : ""}`}
            aria-pressed={view === "map"}
            onClick={() => setView("map")}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 3.5v10l4.5-2 5 2 4.5-2v-10l-4.5 2-5-2-4.5 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M5.5 1.5v10M10.5 3.5v10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Map
          </button>
          <button
            type="button"
            className={`rbar__view${view === "list" ? " is-active" : ""}`}
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="6" height="5" rx=".8" stroke="currentColor" strokeWidth="1.2" />
              <rect x="9" y="2" width="6" height="5" rx=".8" stroke="currentColor" strokeWidth="1.2" />
              <rect x="1" y="9" width="6" height="5" rx=".8" stroke="currentColor" strokeWidth="1.2" />
              <rect x="9" y="9" width="6" height="5" rx=".8" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            List
          </button>
          <span className="rbar__count">
            <strong>{results.length}</strong> results{" "}
            <span className="rbar__note">
              <span className="rbar__long">
                · Alexandra&rsquo;s listings
                {!location.known && ` · “${query.trim()}” not recognised, so the MLS search covers Los Angeles`} ·{" "}
              </span>
              <a href={mlsUrl} className="rbar__mls">
                <span className="rbar__long">See every home for sale on the MLS</span>
                <span className="rbar__short">Search the MLS</span>&nbsp;&rarr;
              </a>
            </span>
          </span>
        </div>
        <div>
          <label className="sr-only" htmlFor="sort">Sort by</label>
          <select id="sort" className="rbar__sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            {SORTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* ---------- MAP + RESULTS ---------- */}
      <div className={`search-split${view === "list" ? " is-list" : ""}`}>
        <div className="map">
          <div id="map" ref={mapEl} aria-label="Interactive map of Los Angeles property results" />
          <div className="map__layers">
            <button
              type="button"
              className="map__layers-btn"
              aria-label="Map layers"
              aria-expanded={layersOpen}
              aria-haspopup="true"
              onClick={() => setLayersOpen((v) => !v)}
            >
              <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M2 10l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M2 13.5l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            </button>
            {layersOpen && (
              <div className="map__layers-panel">
                {(Object.keys(TILES) as LayerKey[]).map((k) => (
                  <button
                    type="button"
                    key={k}
                    className={`map__layer${layer === k ? " is-active" : ""}`}
                    onClick={() => { setLayer(k); setLayersOpen(false); }}
                  >
                    {k[0].toUpperCase() + k.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="map__note">
            {pinned.length} of {results.length} mapped — the rest are awaiting coordinates.
          </p>
        </div>

        <div className="results" id="results">
          <div className="results__grid">
            {results.map((l) => (
              <article
                className={`listing${hot === l.slug ? " is-hot" : ""}`}
                key={l.slug}
                onMouseEnter={() => { setHot(l.slug); focusPin(l.slug); }}
                onMouseLeave={() => setHot(null)}
              >
                <figure className="listing__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.img} alt={[l.addr, l.city].filter(Boolean).join(", ")} data-fallback />
                  <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
                  {l.imgNote && <figcaption className="listing__imgnote">{l.imgNote}</figcaption>}
                </figure>
                <div className="listing__body">
                  <p className="listing__price">{priceLabel(l)}</p>
                  <h3 className="listing__addr">{l.addr}</h3>
                  {locationLabel(l) && <p className="listing__city">{locationLabel(l)}</p>}
                  {hasSpecs(l) && (
                    <ul className="listing__meta">
                      <li>{l.beds} Beds</li>
                      <li>{l.baths} Baths</li>
                      <li>{l.sqft} Sq.Ft.</li>
                    </ul>
                  )}
                  <Link className="text-link listing__view" href={`/properties/${l.slug}`} aria-label={`View ${l.addr}`}>
                    View<i className="arrow" aria-hidden="true"></i>
                  </Link>
                </div>
              </article>
            ))}

            {!results.length && (
              <p className="results__empty">
                None of Alexandra&rsquo;s listings match those filters.{" "}
                <a href={mlsUrl} className="rbar__mls">Search the entire MLS with them&nbsp;&rarr;</a>
              </p>
            )}
          </div>

          <div className="results__cta">
            <p>Not seeing it here?</p>
            <span>Private exclusives and off-market listings are shared first with people she knows are looking.</span>
            <Link className="btn btn--solid-moss" href="/contact">Let&rsquo;s Connect</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
