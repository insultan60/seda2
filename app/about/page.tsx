import type { Metadata } from "next";
import Link from "next/link";
import "./about.css";

export const metadata: Metadata = {
  title: "Meet Alexandra — Alexandra Kerr | Los Angeles Real Estate",
  description:
    "Alexandra Kerr, REALTOR® and Estates Director at Compass — a specialist in Los Angeles homes with character, history, and distinctive architecture. DRE# 01911486.",
};

const SPECIALTIES = ["Historic & Character Homes", "Estates", "Relocation", "Senior Transitions"];

const Icon = {
  Call: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" />
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" />
    </svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/* eslint-disable @next/next/no-img-element */
export default function AboutPage() {
  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="ab-hero">
        <div className="ab-hero-photo">
          <img src="/assets/alexandra-headshot.jpg" alt="Alexandra Kerr, REALTOR® and Estates Director" data-fallback />
        </div>
        <div className="container ab-hero-inner">
          <div className="ab-hero-copy">
            <h1 className="ab-hero-name">Alexandra Kerr</h1>
            <p className="ab-hero-role">REALTOR® · Estates Director · Senior Real Estate Specialist</p>
            <p className="ab-hero-bio">
              The three qualities that distinguish Alexandra as a real estate agent are her
              dedication, her thorough knowledge of the L.A. marketplace, and her efficiency.
              Regardless of circumstances, she successfully gets the job done for her clients.
            </p>
            <div className="ab-hero-ctas">
              <a href="tel:+13107951440" className="btn btn--solid-light">Schedule a Call</a>
              <Link href="/contact" className="btn btn--ghost-light">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- GET IN TOUCH ---------- */}
      <section className="ab-touch">
        <div className="container">
          <div className="ab-touch-head">
            <p className="eyebrow">Get In Touch</p>
            <h2 className="ab-touch-name">Alexandra Kerr</h2>
            <p className="ab-touch-sub">Estates Director — DRE# 01911486 · Compass</p>
            <div className="ab-touch-actions">
              <a href="tel:+13107951440" className="ab-pill ab-pill-solid">
                <Icon.Call />
                <span>(310) 795‑1440</span>
              </a>
              <a href="mailto:alexandra@compass.com" className="ab-pill ab-pill-ghost">
                <Icon.Mail />
                <span>alexandra@compass.com</span>
              </a>
            </div>
          </div>

          <div className="ab-cards">
            <article className="ab-card">
              <span className="ab-card-ic"><Icon.Location /></span>
              <p className="ab-card-label">Office</p>
              <p className="ab-card-text">Compass · 6430 W Sunset Blvd, 6th Floor, Los Angeles, CA 90028</p>
            </article>

            <article className="ab-card">
              <span className="ab-card-ic"><Icon.Shield /></span>
              <p className="ab-card-label">License</p>
              <p className="ab-card-text">DRE# 01911486</p>
            </article>

            <article className="ab-card">
              <span className="ab-card-ic"><Icon.Star /></span>
              <p className="ab-card-label">Specialties</p>
              <div className="ab-tags">
                {SPECIALTIES.map((s) => <span className="ab-tag" key={s}>{s}</span>)}
              </div>
            </article>

            <article className="ab-card">
              <span className="ab-card-ic"><Icon.Share /></span>
              <p className="ab-card-label">Connect</p>
              {/* Only Instagram is on file — the source design shows five social
                  tiles, but four dead "#" links is worse than one that works. */}
              <div className="ab-socials">
                <a
                  className="ab-social"
                  href="https://instagram.com/alexandrakerrlarealestate"
                  rel="noopener"
                  aria-label="Instagram — @alexandrakerrlarealestate"
                >
                  <Icon.Instagram />
                  <span>Instagram</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="ab-story">
        <div className="container">
          <div className="ab-story-head">
            <p className="eyebrow">The Story Behind the Agent</p>
            <h2 className="ab-story-title">Get to Know Alexandra</h2>
          </div>

          <div className="ab-story-cols">
            <div>
              <p>
                Alexandra Kerr is a Los Angeles REALTOR® and Estates Director at Compass, working
                almost entirely with homes that have something to say — a 1920s Spanish behind a
                hedge in Windsor Square, a canyon modern with the city laid out beneath it, a
                Hancock Park traditional that has held the same family for forty years.
              </p>
              <p>
                Her clients tend to describe the same three things: she is dedicated, she knows the
                L.A. marketplace street by street, and she is efficient. Sixteen offers in the first
                week. An all‑cash buyer above list. Escrow closed in ten days. The results are the
                visible part; the preparation that produced them happened weeks earlier.
              </p>
            </div>
            <div>
              <p>
                She has also spent more than a decade guiding relocations in and out of Los Angeles
                — executives on a deadline, families changing coasts, sellers managing everything
                from two time zones away. More than one client has bought or sold a home with
                Alexandra without setting foot in the state.
              </p>
              <p>
                As a Senior Real Estate Specialist she works frequently with homeowners making a
                later‑life move, where the house is rarely just an asset and the timeline is rarely
                just a date. That work asks for patience as much as strategy.
              </p>
            </div>
          </div>

          <figure className="ab-quote">
            <span className="ab-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="ab-quote-text">
              &ldquo;A portfolio isn&rsquo;t a list of addresses. It&rsquo;s a record of decisions
              made under pressure.&rdquo;
            </blockquote>
            <figcaption className="ab-quote-by">
              <img src="/assets/alexandra-headshot.jpg" alt="" aria-hidden="true" data-fallback />
              <span>
                <span className="ab-quote-name">Alexandra Kerr</span>
                <br />
                <span className="ab-quote-role">Estates Director · Compass</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="ab-cta">
        <div className="container ab-cta__inner reveal">
          <div>
            <p className="eyebrow eyebrow--clay">Beyond the Transaction</p>
            <h2 className="h2 h2--light">
              Start with a conversation,<br />not a listing appointment.
            </h2>
            <p className="ab-cta__sub">
              Buying, selling, or simply curious what your home is worth in today&rsquo;s market —
              the first call costs nothing and usually answers more than you expected.
            </p>
          </div>
          <div className="ab-cta__actions">
            <Link className="btn btn--solid-light" href="/contact">Let&rsquo;s Connect</Link>
            <Link className="btn btn--ghost-light" href="/testimonials">Read the Reviews</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
