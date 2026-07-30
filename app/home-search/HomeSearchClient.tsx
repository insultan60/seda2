"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  LISTINGS,
  TOTAL_RESULTS,
  DEFAULT_STATE,
  applyState,
  activeFilterCount,
  money,
  abbr,
  PLACEHOLDER,
  type Listing,
  type SearchState,
} from "./listings";
import FiltersDrawer from "./FiltersDrawer";
import MapPanel from "./MapPanel";

/** Thumbnail that falls back to the branded placeholder — also catches images
 *  that already failed before React hydrated (MLS hotlink blocks). */
function Thumb({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? PLACEHOLDER : src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      ref={(node) => {
        if (node && !failed && node.complete && node.naturalWidth === 0) setFailed(true);
      }}
    />
  );
}

type PopKey = "status" | "price" | "type" | "beds" | "baths";
const STATUS_OPTS = [
  { val: "Active", label: "Active / For sale" },
  { val: "Coming Soon", label: "Coming soon" },
  { val: "Pending", label: "Pending" },
  { val: "Sold", label: "Sold" },
];
const TYPE_OPTS = [
  { val: "House", label: "House" },
  { val: "Condo", label: "Condo" },
  { val: "Townhouse", label: "Townhouse" },
  { val: "Multi-Family", label: "Multi-family" },
  { val: "Land", label: "Land / Lot" },
];
const SEG_VALS = [
  { val: 0, label: "Any" }, { val: 1, label: "1+" }, { val: 2, label: "2+" },
  { val: 3, label: "3+" }, { val: 4, label: "4+" }, { val: 5, label: "5+" },
];

export default function HomeSearchClient() {
  const [state, setState] = useState<SearchState>(DEFAULT_STATE);
  const [searchValue, setSearchValue] = useState("");
  const [openPop, setOpenPop] = useState<{ key: PopKey; left: number; top: number } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [hidden, setHidden] = useState<Set<number>>(new Set());
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [mapType, setMapType] = useState<"map" | "satellite">("map");
  const [drawActive, setDrawActive] = useState(false);
  const [share, setShare] = useState<Listing | null>(null);
  const [shareStatus, setShareStatus] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- Saved listings persisted to localStorage ---------- */
  useEffect(() => {
    try {
      setSaved(new Set(JSON.parse(localStorage.getItem("alt-saved") || "[]")));
    } catch {
      /* ignore */
    }
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2600);
  }, []);

  /* ---------- Derived results ---------- */
  const results = useMemo(() => applyState(state), [state]);
  const visibleResults = useMemo(() => results.filter((l) => !hidden.has(l.id)), [results, hidden]);
  const filterCount = activeFilterCount(state);
  const isFiltered = filterCount > 0 || !!state.q;

  const patch = (p: Partial<SearchState>) => setState((s) => ({ ...s, ...p }));

  /* ---------- Debounced free-text search ---------- */
  const onSearch = (v: string) => {
    setSearchValue(v);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => patch({ q: v.trim() }), 200);
  };

  /* ---------- Popovers ---------- */
  const togglePop = (key: PopKey, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (openPop?.key === key) {
      setOpenPop(null);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const w = 280;
    let left = r.left;
    if (left + w > window.innerWidth - 12) left = window.innerWidth - w - 12;
    setOpenPop({ key, left: Math.max(12, left), top: r.bottom + 8 });
  };

  useEffect(() => {
    if (!openPop && menuOpen == null) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (openPop && !t.closest(".popover") && !t.closest(".filter-pill")) setOpenPop(null);
      if (menuOpen != null && !t.closest(".lc-options")) setMenuOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openPop, menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenPop(null);
      setMenuOpen(null);
      setDrawerOpen(false);
      setShare(null);
    };
    const onResize = () => setOpenPop(null);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ---------- Mobile list/map view ---------- */
  useEffect(() => {
    document.body.classList.toggle("map-view", view === "map");
    return () => document.body.classList.remove("map-view");
  }, [view]);

  /* ---------- Save / share / hide ---------- */
  const toggleSave = (l: Listing) => {
    setSaved((prev) => {
      const next = new Set(prev);
      const on = !next.has(l.mls);
      if (on) next.add(l.mls);
      else next.delete(l.mls);
      try {
        localStorage.setItem("alt-saved", JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      toast(on ? "Saved to your favorites" : "Removed from favorites");
      return next;
    });
  };
  const openShare = (l: Listing) => {
    setMenuOpen(null);
    setShare(l);
    setShareStatus("");
  };
  const openDetails = (l: Listing) => {
    setMenuOpen(null);
    // Individual MLS detail pages come from the IDX feed in production; for now
    // every card opens the built demo detail page.
    void l;
    window.location.href = "/properties/414-s-windsor-blvd";
  };
  const menuAction = (act: string, l: Listing) => {
    setMenuOpen(null);
    switch (act) {
      case "details": openDetails(l); break;
      case "save2": toggleSave(l); break;
      case "share2": openShare(l); break;
      case "tour": toast("Tour request — connect to your CRM"); break;
      case "ask": toast("Message the agent — connect to your CRM"); break;
      case "mortgage": toast("Mortgage calculator — add your tool here"); break;
      case "directions":
        window.open(
          `https://maps.google.com/?q=${encodeURIComponent(l.addr + ", " + l.city + " CA " + l.zip)}`,
          "_blank",
          "noopener"
        );
        break;
      case "hide":
        setHidden((prev) => new Set(prev).add(l.id));
        toast("Home hidden from results");
        break;
    }
  };

  /* ---------- Share options ---------- */
  const doShare = (kind: string) => {
    const l = share;
    if (!l) return;
    const url = `${location.origin}${location.pathname}#${l.mls}`;
    const text = `${l.addr}, ${l.city} — ${money(l.price)} | Alexandra Kerr`;
    if (kind === "copy") {
      navigator.clipboard
        ?.writeText(url)
        .then(() => setShareStatus("Link copied to clipboard"))
        .catch(() => setShareStatus(url));
    } else {
      const map: Record<string, string> = {
        email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
        sms: `sms:?&body=${encodeURIComponent(text + " " + url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      };
      window.open(map[kind], "_blank", "noopener");
      setShareStatus("Opening " + kind + "…");
    }
  };

  /* ---------- Reset ---------- */
  const resetAll = () => {
    setState(DEFAULT_STATE);
    setSearchValue("");
    setOpenPop(null);
  };

  /* ---------- Labels ---------- */
  const statusLabel =
    state.status.length === 0 ? "Any status" : state.status.length >= 2 ? "For sale" : state.status[0];
  const priceLabel =
    state.priceMin != null || state.priceMax != null
      ? (state.priceMin != null ? abbr(state.priceMin) : "$0") +
        " – " +
        (state.priceMax != null ? abbr(state.priceMax) : "Any")
      : "Any price";
  const typeLabel = state.types.length
    ? state.types.length === 1
      ? state.types[0]
      : state.types.length + " types"
    : "All property types";
  const isSet = {
    status: state.status.length !== 2,
    price: state.priceMin != null || state.priceMax != null,
    type: state.types.length > 0,
    beds: state.beds > 0,
    baths: state.baths > 0,
  };

  const resultCountText = isFiltered
    ? visibleResults.length.toLocaleString()
    : TOTAL_RESULTS.toLocaleString();

  return (
    <div className="page-search">
      <div className="search-page">
        {/* ============ FILTER BAR ============ */}
        <div className="filter-bar">
          <div className="filter-search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="City, neighborhood, ZIP code…"
              aria-label="Search by city, neighborhood, or ZIP code"
              autoComplete="off"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="filter-pills" role="group" aria-label="Filters">
            <Pill label={statusLabel} set={isSet.status} open={openPop?.key === "status"} onClick={(e) => togglePop("status", e)} />
            <Pill label={priceLabel} set={isSet.price} open={openPop?.key === "price"} onClick={(e) => togglePop("price", e)} />
            <Pill label={typeLabel} set={isSet.type} open={openPop?.key === "type"} onClick={(e) => togglePop("type", e)} />
            <Pill label={state.beds ? state.beds + "+ beds" : "All beds"} set={isSet.beds} open={openPop?.key === "beds"} onClick={(e) => togglePop("beds", e)} />
            <Pill label={state.baths ? state.baths + "+ baths" : "All baths"} set={isSet.baths} open={openPop?.key === "baths"} onClick={(e) => togglePop("baths", e)} />
          </div>

          <div className="filter-right">
            <div className="view-toggle" role="tablist" aria-label="List or map view">
              <button className={`view-btn${view === "list" ? " is-active" : ""}`} role="tab" aria-selected={view === "list"} onClick={() => setView("list")}>List</button>
              <button className={`view-btn${view === "map" ? " is-active" : ""}`} role="tab" aria-selected={view === "map"} onClick={() => setView("map")}>Map</button>
            </div>
            <button className="btn btn-secondary btn-filters" onClick={() => setDrawerOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
              <span>All filters</span>
              {filterCount > 0 && <span className="filter-count">{filterCount}</span>}
            </button>
            <button className="btn btn-primary btn-magnetic" onClick={() => toast("Search saved — you'll get new matches by email")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
              <span>Save search</span>
            </button>
          </div>
        </div>

        {/* ============ BODY: LIST + MAP ============ */}
        <div className="search-body">
          <section className="results-col" id="results" aria-label="Property listings">
            <div className="results-head">
              <div>
                <h1 className="results-title">Real Estate &amp; Homes for Sale</h1>
                <p className="results-count">
                  <span>{resultCountText}</span> results
                </p>
              </div>
              <label className="sort-wrap">
                <span className="visually-hidden">Sort listings</span>
                <select className="sort-select" aria-label="Sort listings" value={state.sort} onChange={(e) => patch({ sort: e.target.value })}>
                  <option value="newest">Newest</option>
                  <option value="price-desc">Price (high to low)</option>
                  <option value="price-asc">Price (low to high)</option>
                  <option value="beds-desc">Most bedrooms</option>
                  <option value="sqft-desc">Largest (sq ft)</option>
                </select>
                <svg className="sort-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </label>
            </div>

            {visibleResults.length ? (
              <div className="listing-grid" aria-live="polite">
                {visibleResults.map((l) => (
                  <ListingCard
                    key={l.id}
                    l={l}
                    saved={saved.has(l.mls)}
                    menuOpen={menuOpen === l.id}
                    onCard={() => openDetails(l)}
                    onSave={() => toggleSave(l)}
                    onShare={() => openShare(l)}
                    onToggleMenu={() => setMenuOpen((m) => (m === l.id ? null : l.id))}
                    onMenuAction={(act) => menuAction(act, l)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state" style={{ padding: "48px 0" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 24, marginBottom: 8 }}>
                  No homes match those filters
                </h2>
                <p style={{ color: "var(--muted)", marginBottom: 18 }}>Try widening your price range or clearing a filter.</p>
                <button className="btn btn-secondary" onClick={resetAll}>Clear all filters</button>
              </div>
            )}

            <nav className="pagination" aria-label="Listing pages">
              <button className="page-btn is-active" aria-current="page">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-ellipsis">…</span>
              <button className="page-btn">37</button>
              <button className="page-btn page-next">
                Next
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </nav>

            <p className="idx-disclaimer">
              Based on information from The MLS™ / Combined LA/Westside Multiple Listing Service, Inc. Data last updated
              7/19/2026. IDX information is provided exclusively for consumers&rsquo; personal, non-commercial use, and may
              not be used for any purpose other than to identify prospective properties consumers may be interested in
              purchasing. All information is deemed reliable but not guaranteed and should be independently reviewed and
              verified. Property locations displayed on any map are best approximations only. All properties are subject to
              prior sale, change or withdrawal. Neither listing broker(s) nor Alexandra Kerr | Compass
              CA DRE# 01911486 shall be responsible for any typographical errors, misinformation, or misprints. ©2026
              Combined L.A./Westside MLS. All rights reserved.
            </p>
          </section>

          <aside className="map-col" aria-label="Map of listings">
            <div className="map-panel">
              <MapPanel items={visibleResults} mapType={mapType} onOpen={openDetails} />

              <div className="map-controls-tl">
                <button className={`map-chip${drawActive ? " is-active" : ""}`} onClick={() => { setDrawActive((v) => !v); toast(!drawActive ? "Draw mode — sketch an area on the live map" : "Draw mode off"); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
                  Draw
                </button>
              </div>
              <div className="map-controls-tr">
                <div className="map-toggle">
                  <button className={`map-toggle-btn${mapType === "map" ? " is-active" : ""}`} onClick={() => setMapType("map")}>Map</button>
                  <button className={`map-toggle-btn${mapType === "satellite" ? " is-active" : ""}`} onClick={() => setMapType("satellite")}>Satellite</button>
                </div>
              </div>
              <p className="map-note">
                Interactive map connects to your MLS/IDX map provider in production. Pins show list prices for the current
                results.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ============ POPOVERS ============ */}
      {openPop?.key === "status" && (
        <Popover left={openPop.left} top={openPop.top} title="Status" onApply={() => setOpenPop(null)} onClear={() => patch({ status: ["Active", "Coming Soon"] })} applyLabel="Done">
          <div className="opt-list">
            {STATUS_OPTS.map((o) => (
              <label className="opt-check" key={o.val}>
                <input
                  type="checkbox"
                  checked={state.status.includes(o.val)}
                  onChange={() =>
                    patch({
                      status: state.status.includes(o.val)
                        ? state.status.filter((s) => s !== o.val)
                        : [...state.status, o.val],
                    })
                  }
                />{" "}
                {o.label}
              </label>
            ))}
          </div>
        </Popover>
      )}

      {openPop?.key === "price" && (
        <Popover left={openPop.left} top={openPop.top} title="Price range" onApply={() => setOpenPop(null)} onClear={() => patch({ priceMin: null, priceMax: null })}>
          <div className="price-inputs">
            <label>
              Min
              <input type="number" placeholder="No min" min={0} step={50000} value={state.priceMin ?? ""} onChange={(e) => patch({ priceMin: e.target.value ? +e.target.value : null })} />
            </label>
            <span className="price-dash">–</span>
            <label>
              Max
              <input type="number" placeholder="No max" min={0} step={50000} value={state.priceMax ?? ""} onChange={(e) => patch({ priceMax: e.target.value ? +e.target.value : null })} />
            </label>
          </div>
          <div className="price-quick">
            <button onClick={() => patch({ priceMin: null, priceMax: 1000000 })}>Under $1M</button>
            <button onClick={() => patch({ priceMin: 1000000, priceMax: 2000000 })}>$1M–$2M</button>
            <button onClick={() => patch({ priceMin: 2000000, priceMax: 5000000 })}>$2M–$5M</button>
            <button onClick={() => patch({ priceMin: 5000000, priceMax: null })}>$5M+</button>
          </div>
        </Popover>
      )}

      {openPop?.key === "type" && (
        <Popover left={openPop.left} top={openPop.top} title="Property type" onApply={() => setOpenPop(null)} onClear={() => patch({ types: [] })}>
          <div className="opt-list">
            {TYPE_OPTS.map((o) => (
              <label className="opt-check" key={o.val}>
                <input
                  type="checkbox"
                  checked={state.types.includes(o.val)}
                  onChange={() =>
                    patch({
                      types: state.types.includes(o.val)
                        ? state.types.filter((s) => s !== o.val)
                        : [...state.types, o.val],
                    })
                  }
                />{" "}
                {o.label}
              </label>
            ))}
          </div>
        </Popover>
      )}

      {openPop?.key === "beds" && (
        <Popover left={openPop.left} top={openPop.top} title="Bedrooms" onApply={() => setOpenPop(null)} onClear={() => patch({ beds: 0 })}>
          <div className="seg">
            {SEG_VALS.map((o) => (
              <button key={o.val} className={`seg-btn${state.beds === o.val ? " is-active" : ""}`} onClick={() => patch({ beds: o.val })}>{o.label}</button>
            ))}
          </div>
        </Popover>
      )}

      {openPop?.key === "baths" && (
        <Popover left={openPop.left} top={openPop.top} title="Bathrooms" onApply={() => setOpenPop(null)} onClear={() => patch({ baths: 0 })}>
          <div className="seg">
            {SEG_VALS.map((o) => (
              <button key={o.val} className={`seg-btn${state.baths === o.val ? " is-active" : ""}`} onClick={() => patch({ baths: o.val })}>{o.label}</button>
            ))}
          </div>
        </Popover>
      )}

      {/* ============ ALL FILTERS DRAWER ============ */}
      <FiltersDrawer
        open={drawerOpen}
        state={state}
        onApply={(next) => { patch(next); if (next.q != null) setSearchValue(next.q); }}
        onReset={resetAll}
        onClose={() => setDrawerOpen(false)}
        onToast={toast}
      />

      {/* ============ SHARE SHEET ============ */}
      {share && <div className="sheet-scrim" onClick={() => setShare(null)} />}
      <div className={`share-sheet${share ? " is-open" : ""}`} role="dialog" aria-label="Share property" aria-hidden={!share}>
        <div className="share-head">
          <p className="share-title">Share this property</p>
          <button className="drawer-close" aria-label="Close share" onClick={() => setShare(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <p className="share-sub">{share ? `${share.addr}, ${share.city} — ${money(share.price)}` : "—"}</p>
        <div className="share-grid">
          <button className="share-opt" onClick={() => doShare("copy")}><span className="share-ic">🔗</span>Copy link</button>
          <button className="share-opt" onClick={() => doShare("email")}><span className="share-ic">✉️</span>Email</button>
          <button className="share-opt" onClick={() => doShare("sms")}><span className="share-ic">💬</span>Text</button>
          <button className="share-opt" onClick={() => doShare("facebook")}><span className="share-ic">f</span>Facebook</button>
          <button className="share-opt" onClick={() => doShare("x")}><span className="share-ic">𝕏</span>X</button>
          <button className="share-opt" onClick={() => doShare("whatsapp")}><span className="share-ic">✆</span>WhatsApp</button>
        </div>
        <p className="share-status" role="status" aria-live="polite">{shareStatus}</p>
      </div>

      {/* ============ TOAST ============ */}
      <div className={`toast${toastShow ? " is-show" : ""}`} role="status" aria-live="polite" hidden={!toastMsg}>
        {toastMsg}
      </div>
    </div>
  );
}

/* ---------- Filter pill ---------- */
function Pill({
  label,
  set,
  open,
  onClick,
}: {
  label: string;
  set: boolean;
  open: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className={`filter-pill${open ? " is-open" : ""}${set ? " is-set" : ""}`}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={onClick}
    >
      <span>{label}</span>
      <svg className="pill-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

/* ---------- Popover shell ---------- */
function Popover({
  left,
  top,
  title,
  children,
  onClear,
  onApply,
  applyLabel = "Apply",
}: {
  left: number;
  top: number;
  title: string;
  children: React.ReactNode;
  onClear: () => void;
  onApply: () => void;
  applyLabel?: string;
}) {
  return (
    <div className="popover" style={{ left, top }} onClick={(e) => e.stopPropagation()}>
      <p className="popover-title">{title}</p>
      {children}
      <div className="popover-actions">
        <button className="btn btn-tertiary btn-sm" onClick={onClear}>Reset</button>
        <button className="btn btn-primary btn-sm" onClick={onApply}>{applyLabel}</button>
      </div>
    </div>
  );
}

/* ---------- Listing card ---------- */
function ListingCard({
  l,
  saved,
  menuOpen,
  onCard,
  onSave,
  onShare,
  onToggleMenu,
  onMenuAction,
}: {
  l: Listing;
  saved: boolean;
  menuOpen: boolean;
  onCard: () => void;
  onSave: () => void;
  onShare: () => void;
  onToggleMenu: () => void;
  onMenuAction: (act: string) => void;
}) {
  const specs =
    l.type === "Land" ? (
      <span className="lc-specs">{l.lot} · Lot</span>
    ) : (
      <span className="lc-specs">
        <b>{l.beds}</b> bd · <b>{l.baths}</b> ba · <b>{l.sqft?.toLocaleString()}</b> sqft
      </span>
    );

  return (
    <article className="listing-card">
      <div className="lc-media" onClick={onCard}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Thumb src={l.img} alt={`${l.addr}, ${l.city}`} />
        <span className={`lc-status${l.status === "Coming Soon" ? " is-coming" : ""}`}>{l.status}</span>
        <div className="lc-quick">
          <button
            className={`lc-icon-btn lc-save${saved ? " is-saved" : ""}`}
            aria-label={`Save ${l.addr}`}
            aria-pressed={saved}
            onClick={(e) => { e.stopPropagation(); onSave(); }}
          >
            <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>
          <button className="lc-icon-btn" aria-label={`Share ${l.addr}`} onClick={(e) => { e.stopPropagation(); onShare(); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>
          </button>
        </div>
      </div>
      <div className="lc-body">
        <div className="lc-price-row">
          <span className="lc-price">{money(l.price)}</span>
          <div className={`lc-options${menuOpen ? " is-open" : ""}`}>
            <button className="lc-dots" aria-label="Property options" aria-haspopup="true" aria-expanded={menuOpen} onClick={(e) => { e.stopPropagation(); onToggleMenu(); }}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
            </button>
            <div className="lc-menu" role="menu">
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("details"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>View details</button>
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("save2"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" /></svg><span>{saved ? "Saved" : "Save property"}</span></button>
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("share2"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>Share property</button>
              <hr />
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("tour"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>Request a tour</button>
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("ask"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>Ask a question</button>
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("mortgage"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h8M8 14h4" /></svg>Mortgage calculator</button>
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("directions"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>Get directions</button>
              <hr />
              <button onClick={(e) => { e.stopPropagation(); onMenuAction("hide"); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c7 0 10 8 10 8a13.2 13.2 0 0 1-1.67 2.68M6.6 6.6A13.3 13.3 0 0 0 2 12s3 8 10 8a9 9 0 0 0 5.4-1.8M1 1l22 22" /></svg>Hide this home</button>
            </div>
          </div>
        </div>
        {specs}
        <p className="lc-addr">{l.addr}, {l.city} CA, {l.zip}</p>
        <p className="lc-mls">MLS®: {l.mls}</p>
      </div>
    </article>
  );
}
