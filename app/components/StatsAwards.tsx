import type { CSSProperties } from "react";

const d = (val: string) => ({ "--d": val }) as CSSProperties;

/* Figures confirmed by Alexandra, August 2026. Exact counts, not rounded "+"
   claims — 179 and $184M are hers and are defensible. A "Client Reviews"
   figure used to sit here at 90+; it came off the placeholder set and the
   real count is 2 five-star reviews on Facebook, so it is out until the
   Google Business profile has enough behind it. Re-add it to this array
   when it does — the grid below reflows on its own.

   Shared by the home page and the Portfolio page so the two can never show
   different numbers for the same career totals. */
const FIGURES = [
  { t: "Homes Sold", count: "179", d: ".05s" },
  { t: "Total Sales", count: "184", prefix: "$", suffix: "M", d: ".1s" },
  { t: "Years in L.A. Real Estate", count: "13", d: ".15s" },
];

export default function StatsAwards() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        <div className="stats__lead reveal">
          <p className="eyebrow eyebrow--clay">A Record That Speaks Quietly</p>
          <h2 className="h2 h2--light">Trusted by Los Angeles homeowners for over a decade.</h2>
          <div className="stats__awards">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="stats__award-img"
              src="/assets/awards/realtrends-verified.png"
              alt="RealTrends Verified"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="stats__award-img stats__award-img--tall"
              src="/assets/awards/la-magazine-all-stars.png"
              alt="Los Angeles Magazine Real Estate All-Stars"
            />
          </div>
        </div>
        <dl className="stats__figures">
          {FIGURES.map((s) => (
            <div className="stat reveal" key={s.t} style={d(s.d)}>
              <dt>{s.t}</dt>
              <dd>
                {/* Server-render the real figure, not 0 — the count-up is an
                    enhancement, so the number must already be correct for
                    anyone who reads it before (or without) the bundle. */}
                <span className="stat__num" data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix}>
                  {`${s.prefix ?? ""}${Number(s.count).toLocaleString("en-US")}${s.suffix ?? ""}`}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
