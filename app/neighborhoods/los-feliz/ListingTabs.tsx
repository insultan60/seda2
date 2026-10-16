"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Available / Sold, as one block with two tabs (the October 2026 brief).
 *
 * Both panels are rendered on the server and only hidden here, so the sold
 * listings are in the HTML for crawlers and for anyone without the bundle.
 * Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
 */
export default function ListingTabs({ available, sold }: { available: ReactNode; sold: ReactNode }) {
  const [tab, setTab] = useState<0 | 1>(0);
  const id = useId();
  const tabs = ["Available", "Sold"] as const;

  return (
    <div className="lf-tabs">
      <div className="lf-tabs__list" role="tablist" aria-label="Los Feliz listings">
        {tabs.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={tab === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={tab === i ? 0 : -1}
            className={`lf-tabs__tab${tab === i ? " is-active" : ""}`}
            onClick={() => setTab(i as 0 | 1)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const next = (tab === 0 ? 1 : 0) as 0 | 1;
              setTab(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel-0`} aria-labelledby={`${id}-tab-0`} hidden={tab !== 0}>
        {available}
      </div>
      <div role="tabpanel" id={`${id}-panel-1`} aria-labelledby={`${id}-tab-1`} hidden={tab !== 1}>
        {sold}
      </div>
    </div>
  );
}
