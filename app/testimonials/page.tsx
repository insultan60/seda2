import type { Metadata } from "next";
import Link from "next/link";
import { TESTIMONIALS } from "./data";
import "./testimonials.css";

export const metadata: Metadata = {
  title: "Testimonials — Alexandra Kerr | Client Reviews",
  description:
    "Reviews from Los Angeles clients who have bought and sold homes with Alexandra Kerr, Estates Director at Compass.",
};

/* Two columns, dealt alternately so the shorter quotes don't all stack in one
   side. Column-major would put every long quote in column one. */
const COL1 = TESTIMONIALS.filter((_, i) => i % 2 === 0);
const COL2 = TESTIMONIALS.filter((_, i) => i % 2 === 1);

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="tm-card reveal">
      <h3 className="tm-card-type">{t.type}</h3>
      <span className="tm-card-mark" aria-hidden="true">&ldquo;</span>
      <p className="tm-card-text">{t.quote}</p>
      <p className="tm-card-by">
        <cite className="tm-card-cite">{t.cite}</cite>
        <span className="tm-card-place">{t.place}</span>
      </p>
    </article>
  );
}

/* eslint-disable @next/next/no-img-element */
export default function TestimonialsPage() {
  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="tm-hero">
        <div className="container">
          <p className="eyebrow eyebrow--clay">Real Clients. Real Stories.</p>
          <h1 className="tm-hero-title">Testimonials</h1>
          <p className="tm-hero-sub">
            Kind words from the neighborhoods we call home — sellers, buyers, and a few who were
            three thousand miles away the whole time.
          </p>
          <div className="tm-hero-gallery">
            <div className="tm-tile tm-tile-h">
              <img src="/assets/listings/s1-windsor414.jpg" alt="" aria-hidden="true" data-fallback />
            </div>
            <div className="tm-tile tm-tile-v">
              <img src="/assets/listings/c2-colony.jpg" alt="" aria-hidden="true" data-fallback />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MASONRY ---------- */}
      <section className="tm-section">
        <div className="container">
          <div className="tm-grid">
            <div className="tm-col">{COL1.map((t) => <Card key={t.cite} t={t} />)}</div>
            <div className="tm-col">{COL2.map((t) => <Card key={t.cite} t={t} />)}</div>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="tm-cta">
        <div className="container tm-cta__inner reveal">
          <div>
            <p className="eyebrow eyebrow--clay">Beyond the Transaction</p>
            <h2 className="h2 h2--light">
              The next one of these<br />could be yours.
            </h2>
            <p className="tm-cta__sub">
              Whether you&rsquo;re selling a home you&rsquo;ve loved for forty years or buying your
              first, the work is the same: prepare it properly, price it honestly, and negotiate
              like it matters.
            </p>
          </div>
          <div className="tm-cta__actions">
            <Link className="btn btn--solid-light" href="/contact">Let&rsquo;s Connect</Link>
            <Link className="btn btn--ghost-light" href="/properties">View the Portfolio</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
