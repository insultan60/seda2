"use client";

import { useEffect, useMemo, useState } from "react";
import { countFor, DEFAULT_STATE, type SearchState } from "./listings";

const Caret = () => (
  <svg className="acc-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const TYPE_CHIPS = [
  { val: "House", label: "Residential" },
  { val: "Townhouse", label: "Townhomes" },
  { val: "Co-op", label: "Co-op" },
  { val: "Multi-Family", label: "Multi-family" },
  { val: "Condo", label: "Condos" },
  { val: "Commercial", label: "Commercial" },
  { val: "Manufactured", label: "Manufactured" },
  { val: "Land", label: "Land" },
  { val: "Other", label: "Other" },
];
const STATUS_CHIPS = [
  { val: "Active", label: "Active" },
  { val: "Coming Soon", label: "Coming soon" },
  { val: "Pending", label: "Pending" },
  { val: "Active Under Contract", label: "Active under contract" },
  { val: "Sold", label: "Sold" },
];
const TOUR_CHIPS = [
  { val: "virtual", label: "Virtual tour" },
  { val: "3d", label: "3D tour" },
  { val: "openhouse", label: "Open house" },
];
const FEATURES = [
  "Appliances", "Architectural style", "Community features", "Cooling", "Fireplace features",
  "Flooring", "Foundation details", "Heating", "Interior features", "Laundry features", "MLS area",
  "Parking features", "Patio & porch features", "Pool features", "Roof", "Security features",
  "Sewer", "Subdivision", "Water source", "Waterfront features", "Window features",
];

function Seg({
  options,
  value,
  onChange,
}: {
  options: { val: number; label: string }[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="seg">
      {options.map((o, i) => (
        <button
          key={o.label + i}
          className={`seg-btn${value === o.val ? " is-active" : ""}`}
          onClick={() => onChange(o.val)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const BEDS = [
  { val: 0, label: "Any" }, { val: 0, label: "Studio" }, { val: 1, label: "1+" },
  { val: 2, label: "2+" }, { val: 3, label: "3+" }, { val: 4, label: "4+" }, { val: 5, label: "5+" },
];
const BATHS = [
  { val: 0, label: "Any" }, { val: 1, label: "1+" }, { val: 1.5, label: "1.5+" }, { val: 2, label: "2+" },
  { val: 3, label: "3+" }, { val: 4, label: "4+" }, { val: 5, label: "5+" },
];
const GARAGE = [{ val: 0, label: "Any" }, { val: 1, label: "1+" }, { val: 2, label: "2+" }, { val: 3, label: "3+" }];
const STORIES = [{ val: 0, label: "Any" }, { val: 1, label: "1" }, { val: 2, label: "2+" }];
const DOM = [
  { val: 0, label: "Any" }, { val: 1, label: "1 day" }, { val: 7, label: "7 days" },
  { val: 14, label: "14 days" }, { val: 30, label: "30 days" },
];

type Draft = {
  status: string[];
  types: string[];
  tours: string[];
  priceMin: string;
  priceMax: string;
  beds: number;
  baths: number;
  sqftMin: string;
  sqftMax: string;
  lotMin: string;
  lotMax: string;
  yearMin: string;
  yearMax: string;
  garage: number;
  stories: number;
  hoa: string;
  dom: number;
  reduced: boolean;
  keywords: string;
  mls: string;
  listingType: "sale" | "rent";
  features: string[];
};

function seed(state: SearchState): Draft {
  return {
    status: state.status,
    types: state.types,
    tours: [],
    priceMin: state.priceMin != null ? String(state.priceMin) : "",
    priceMax: state.priceMax != null ? String(state.priceMax) : "",
    beds: state.beds,
    baths: state.baths,
    sqftMin: state.sqft ? String(state.sqft) : "",
    sqftMax: "",
    lotMin: "", lotMax: "", yearMin: "", yearMax: "",
    garage: 0, stories: 0, hoa: "", dom: 0, reduced: false,
    keywords: state.q, mls: "",
    listingType: "sale",
    features: [],
  };
}

export default function FiltersDrawer({
  open,
  state,
  onApply,
  onReset,
  onClose,
  onToast,
}: {
  open: boolean;
  state: SearchState;
  onApply: (next: Partial<SearchState>) => void;
  onReset: () => void;
  onClose: () => void;
  onToast: (msg: string) => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => seed(state));
  const [filterQ, setFilterQ] = useState("");

  // Re-seed the draft from committed state each time the drawer opens.
  useEffect(() => {
    if (open) {
      setDraft(seed(state));
      setFilterQ("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = <K extends keyof Draft>(key: K, val: Draft[K]) => setDraft((d) => ({ ...d, [key]: val }));
  const toggleIn = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const count = useMemo(
    () =>
      countFor({
        status: draft.status,
        types: draft.types,
        priceMin: draft.priceMin ? +draft.priceMin : null,
        priceMax: draft.priceMax ? +draft.priceMax : null,
        beds: draft.beds,
        baths: draft.baths,
        sqft: draft.sqftMin ? +draft.sqftMin : 0,
        q: draft.keywords.trim() || draft.mls.trim(),
      }),
    [draft]
  );

  const apply = () => {
    onApply({
      status: draft.status,
      types: draft.types,
      priceMin: draft.priceMin ? +draft.priceMin : null,
      priceMax: draft.priceMax ? +draft.priceMax : null,
      beds: draft.beds,
      baths: draft.baths,
      sqft: draft.sqftMin ? +draft.sqftMin : 0,
      q: draft.keywords.trim() || draft.mls.trim(),
    });
    onClose();
  };

  const reset = () => {
    setDraft(seed(DEFAULT_STATE));
    onReset();
  };

  const priceQuick = (min: string, max: string) => {
    set("priceMin", min);
    setDraft((d) => ({ ...d, priceMin: min, priceMax: max }));
  };

  // Which accordions to show given the "search for a filter" query
  const accVisible = (sec: string, featureLabels: string[] = []) => {
    const q = filterQ.trim().toLowerCase();
    if (!q) return true;
    return sec.toLowerCase().includes(q) || featureLabels.some((f) => f.toLowerCase().includes(q));
  };

  return (
    <>
      {open && <div className="drawer-scrim" onClick={onClose} />}
      <aside
        className={`filters-drawer${open ? " is-open" : ""}`}
        aria-label="All filters"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <h2>Filters</h2>
          <button className="drawer-close" aria-label="Close filters" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          <div className="salerent-toggle">
            {(["sale", "rent"] as const).map((v) => (
              <button
                key={v}
                className={`sr-btn${draft.listingType === v ? " is-active" : ""}`}
                onClick={() => {
                  set("listingType", v);
                  if (v === "rent") onToast("Rentals connect to your IDX rental feed");
                }}
              >
                {v === "sale" ? "For sale" : "For rent"}
              </button>
            ))}
          </div>

          <div className="drawer-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Search for a filter…"
              aria-label="Search for a filter"
              value={filterQ}
              onChange={(e) => setFilterQ(e.target.value)}
            />
          </div>

          {accVisible("Price") && (
            <details className="acc" open>
              <summary>Price<Caret /></summary>
              <div className="acc-body">
                <div className="price-inputs">
                  <label>
                    Min
                    <input type="number" placeholder="No min" step={50000} value={draft.priceMin} onChange={(e) => set("priceMin", e.target.value)} />
                  </label>
                  <span className="price-dash">to</span>
                  <label>
                    Max
                    <input type="number" placeholder="No max" step={50000} value={draft.priceMax} onChange={(e) => set("priceMax", e.target.value)} />
                  </label>
                </div>
                <div className="price-quick">
                  <button onClick={() => priceQuick("", "1000000")}>Under $1M</button>
                  <button onClick={() => priceQuick("1000000", "2000000")}>$1M–$2M</button>
                  <button onClick={() => priceQuick("2000000", "5000000")}>$2M–$5M</button>
                  <button onClick={() => priceQuick("5000000", "")}>$5M+</button>
                </div>
              </div>
            </details>
          )}

          {accVisible("Bedrooms") && (
            <details className="acc" open>
              <summary>Bedrooms<Caret /></summary>
              <div className="acc-body">
                <Seg options={BEDS} value={draft.beds} onChange={(v) => set("beds", v)} />
              </div>
            </details>
          )}

          {accVisible("Bathrooms") && (
            <details className="acc" open>
              <summary>Bathrooms<Caret /></summary>
              <div className="acc-body">
                <Seg options={BATHS} value={draft.baths} onChange={(v) => set("baths", v)} />
              </div>
            </details>
          )}

          {accVisible("Property types") && (
            <details className="acc" open>
              <summary>Property types<Caret /></summary>
              <div className="acc-body">
                <div className="chip-row">
                  {TYPE_CHIPS.map((c) => (
                    <button
                      key={c.val}
                      className={`chip${draft.types.includes(c.val) ? " is-active" : ""}`}
                      onClick={() => set("types", toggleIn(draft.types, c.val))}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          )}

          {accVisible("Listing status") && (
            <details className="acc">
              <summary>Listing status<Caret /></summary>
              <div className="acc-body">
                <div className="chip-row">
                  {STATUS_CHIPS.map((c) => (
                    <button
                      key={c.val}
                      className={`chip${draft.status.includes(c.val) ? " is-active" : ""}`}
                      onClick={() => set("status", toggleIn(draft.status, c.val))}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          )}

          {accVisible("Tours") && (
            <details className="acc">
              <summary>Tours<Caret /></summary>
              <div className="acc-body">
                <div className="chip-row">
                  {TOUR_CHIPS.map((c) => (
                    <button
                      key={c.val}
                      className={`chip${draft.tours.includes(c.val) ? " is-active" : ""}`}
                      onClick={() => set("tours", toggleIn(draft.tours, c.val))}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          )}

          {accVisible("Property details") && (
            <details className="acc">
              <summary>Property details<Caret /></summary>
              <div className="acc-body">
                <p className="acc-label">Square feet</p>
                <div className="price-inputs">
                  <label>Min<input type="number" placeholder="No min" step={250} value={draft.sqftMin} onChange={(e) => set("sqftMin", e.target.value)} /></label>
                  <span className="price-dash">to</span>
                  <label>Max<input type="number" placeholder="No max" step={250} value={draft.sqftMax} onChange={(e) => set("sqftMax", e.target.value)} /></label>
                </div>
                <p className="acc-label">Lot size (sq ft)</p>
                <div className="price-inputs">
                  <label>Min<input type="number" placeholder="No min" step={500} value={draft.lotMin} onChange={(e) => set("lotMin", e.target.value)} /></label>
                  <span className="price-dash">to</span>
                  <label>Max<input type="number" placeholder="No max" step={500} value={draft.lotMax} onChange={(e) => set("lotMax", e.target.value)} /></label>
                </div>
                <p className="acc-label">Year built</p>
                <div className="price-inputs">
                  <label>From<input type="number" placeholder="Any" min={1900} max={2026} value={draft.yearMin} onChange={(e) => set("yearMin", e.target.value)} /></label>
                  <span className="price-dash">to</span>
                  <label>To<input type="number" placeholder="Any" min={1900} max={2026} value={draft.yearMax} onChange={(e) => set("yearMax", e.target.value)} /></label>
                </div>
                <p className="acc-label">Garage spaces</p>
                <Seg options={GARAGE} value={draft.garage} onChange={(v) => set("garage", v)} />
                <p className="acc-label">Stories</p>
                <Seg options={STORIES} value={draft.stories} onChange={(v) => set("stories", v)} />
              </div>
            </details>
          )}

          {accVisible("Property features", FEATURES) && (
            <details className="acc">
              <summary>Property features<Caret /></summary>
              <div className="acc-body">
                <div className="feature-list">
                  {FEATURES.map((f) => (
                    <button
                      key={f}
                      className={`feature-row${draft.features.includes(f) ? " is-on" : ""}`}
                      onClick={() => set("features", toggleIn(draft.features, f))}
                    >
                      {f}
                      <span>+</span>
                    </button>
                  ))}
                </div>
              </div>
            </details>
          )}

          {accVisible("Costs") && (
            <details className="acc">
              <summary>Costs<Caret /></summary>
              <div className="acc-body">
                <p className="acc-label">Max HOA (monthly)</p>
                <div className="price-inputs">
                  <label className="full">Any<input type="number" placeholder="No max HOA" step={50} value={draft.hoa} onChange={(e) => set("hoa", e.target.value)} /></label>
                </div>
                <p className="acc-label">Days on market</p>
                <Seg options={DOM} value={draft.dom} onChange={(v) => set("dom", v)} />
                <label className="opt-check acc-check">
                  <input type="checkbox" checked={draft.reduced} onChange={(e) => set("reduced", e.target.checked)} /> Price reduced
                </label>
              </div>
            </details>
          )}

          {accVisible("Advanced") && (
            <details className="acc">
              <summary>Advanced<Caret /></summary>
              <div className="acc-body">
                <p className="acc-label">Keywords</p>
                <input className="drawer-text" type="text" placeholder="City, neighborhood, ZIP, or keyword" value={draft.keywords} onChange={(e) => set("keywords", e.target.value)} />
                <p className="acc-label">MLS number</p>
                <input className="drawer-text" type="text" placeholder="e.g. 26861057" value={draft.mls} onChange={(e) => set("mls", e.target.value)} />
              </div>
            </details>
          )}
        </div>

        <div className="drawer-foot">
          <button className="btn btn-tertiary" onClick={reset}>Reset filters</button>
          <button className="btn btn-primary btn-magnetic" onClick={apply}>
            <span>See</span>&nbsp;<span>{count === 1 ? "1 home" : count.toLocaleString() + " homes"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
