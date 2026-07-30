import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { POSTS } from "./data";
import "./journal.css";

export const metadata: Metadata = {
  title: "The Latest Real Estate News — Alexandra Kerr | Journal",
  description:
    "Notes on Los Angeles architecture, neighborhoods, and the market from Alexandra Kerr — Estates Director at Compass.",
};

const d = (val: string) => ({ "--d": val }) as CSSProperties;

// stagger each row of three: 0s · .06s · .12s
const ROW_DELAYS = ["", ".06s", ".12s"];

/* eslint-disable @next/next/no-img-element */
export default function JournalPage() {
  return (
    <main id="main">
      <section className="ck-page-head">
        <div className="container">
          <p className="eyebrow">From the Journal</p>
          <h1>The Latest Real Estate News</h1>
          <p>Notes on architecture, neighborhoods, and the Los Angeles market — perspective to help you move with confidence.</p>
        </div>
      </section>

      <section className="ck-journal">
        <div className="container">
          <div className="journal__grid">
            {POSTS.map((p, i) => {
              const delay = ROW_DELAYS[i % ROW_DELAYS.length];
              return (
              <a className="post reveal" href="#" key={p.title} style={delay ? d(delay) : undefined}>
                <figure><img src={p.img} alt="" data-fallback /></figure>
                <p className="post__tag">{p.tag}</p>
                <h3>{p.title}</h3>
                <div className="post__foot">
                  <span className="post__date">{p.date}</span>
                  <span className="text-link post__read">Read<i className="arrow" aria-hidden="true"></i></span>
                </div>
              </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
