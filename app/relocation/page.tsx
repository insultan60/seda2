import type { Metadata } from "next";
import Link from "next/link";
import { TESTIMONIALS } from "../testimonials/data";
import "./relocation.css";

export const metadata: Metadata = {
  title: "Relocation — Alexandra Kerr | Moving To or From Los Angeles",
  description:
    "Relocating to Los Angeles, or leaving it? Alexandra Kerr has guided moves in and out of L.A. for over a decade — neighborhood shortlists, video tours, and a sale managed from two time zones away.",
};

/* Copy carried over from the relocation section of the original site, expanded
   into a full page. Nothing here asserts a figure or a partner name that the
   client has not already published. */
const STAGES = [
  {
    t: "Arriving",
    b: "Neighborhood shortlists matched to your commute, your schools, and your taste — with video tours and offer strategy handled before you ever board the plane.",
    img: "/properties/1747-hollyvista/01-front.jpg",
    alt: "A Los Angeles home exterior",
  },
  {
    t: "Departing",
    b: "Your L.A. home prepared, marketed, and sold while you settle elsewhere — staging, photography, and escrow managed without a single return trip.",
    img: "/properties/3820-buena-park/01-front-facade.jpg",
    alt: "Front facade of a Los Angeles property",
  },
  {
    t: "Every step between",
    b: "A trusted nationwide agent network, corporate relocation timelines, and one point of contact from the first box packed to the final signature.",
    img: "/properties/8757-arlene-terrace/01-patio.jpg",
    alt: "Terrace of a Los Angeles home",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Before you fly",
    b: "A call about the things a listing site can't tell you — how the commute actually runs, which streets go quiet at night, where the light falls in the afternoon. The shortlist starts here, not with a search filter.",
  },
  {
    n: "02",
    t: "Touring remotely",
    b: "Walkthrough video shot properly, on your schedule, with the questions you'd have asked in person already answered. Enough to make a decision on, and honest about what the photographs flatter.",
  },
  {
    n: "03",
    t: "Offer and escrow",
    b: "Strategy set against what the property is really worth, then inspections, appraisal and signatures coordinated across time zones so nothing waits on you being awake.",
  },
  {
    n: "04",
    t: "Landing",
    b: "Keys, contractors, and the small logistics nobody warns you about. The relationship doesn't end at closing — that's usually when the useful questions start.",
  },
];

/* The out-of-state client, pulled from the shared testimonials list rather than
   re-typed, so it stays in step with the testimonials page. */
const RELO_QUOTE =
  TESTIMONIALS.find((t) => t.quote.includes("out of state")) ?? TESTIMONIALS[0];

/* eslint-disable @next/next/no-img-element */
export default function RelocationPage() {
  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="rl-hero">
        <img
          className="rl-hero__img"
          src="/properties/3820-buena-park/aerial-rear-facade.jpg"
          alt=""
          aria-hidden="true"
          data-fallback
        />
        <div className="rl-hero__scrim" aria-hidden="true"></div>
        <div className="container rl-hero__inner">
          <p className="eyebrow eyebrow--clay">Relocation Specialist</p>
          <h1 className="rl-hero__title">Moving to Los Angeles — or moving on?</h1>
          <p className="rl-hero__sub">
            Consider it handled. Executives on a deadline, families changing coasts, sellers managing
            everything from two time zones away.
          </p>
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="rl-intro">
        <div className="container rl-intro__grid">
          <div className="rl-intro__lead reveal">
            <p className="eyebrow">Why It&rsquo;s Different</p>
            <p className="rl-intro__statement">
              A relocation isn&rsquo;t a transaction with a longer drive. It&rsquo;s a decision made
              without standing in the room.
            </p>
          </div>
          <div className="rl-intro__body reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <p>
              Alexandra has guided relocations in and out of Los Angeles for over a decade. When you
              can&rsquo;t walk the street yourself, everything depends on whether the person
              describing it to you will tell you the unflattering part — that the view goes when the
              neighbor builds, that the school district line runs behind the house, that the quiet
              street is quiet because it&rsquo;s a mile from anything.
            </p>
            <p>
              More than one client has bought or sold a home with her without setting foot in the
              state. That only works when the reporting is honest and the logistics are somebody
              else&rsquo;s problem. When your next chapter starts in another city, she&rsquo;s the
              first call to make.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- STAGES ---------- */}
      <section className="rl-stages">
        <div className="container">
          <div className="rl-head reveal">
            <p className="eyebrow">Both Directions</p>
            <h2 className="rl-head__title">Arriving, Departing, and Everything Between</h2>
            <p className="rl-head__sub">
              The same standard of work whether Los Angeles is where you&rsquo;re headed or where
              you&rsquo;re leaving.
            </p>
          </div>
          <div className="rl-stages__grid">
            {STAGES.map((s, i) => (
              <article
                className="rl-stage reveal"
                key={s.t}
                style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
              >
                <div className="rl-stage__media">
                  <img src={s.img} alt={s.alt} loading="lazy" data-fallback />
                </div>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section className="rl-steps">
        <div className="container">
          <div className="rl-head reveal">
            <p className="eyebrow eyebrow--clay">How a Remote Move Runs</p>
            <h2 className="rl-head__title">From Four Hundred Miles Away</h2>
            <p className="rl-head__sub">Or three thousand. The sequence doesn&rsquo;t change.</p>
          </div>
          <ol className="rl-steps__grid">
            {STEPS.map((s, i) => (
              <li
                className="rl-step reveal"
                key={s.n}
                style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
              >
                <span className="rl-step__num" aria-hidden="true">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- PULL QUOTE ---------- */}
      <section className="rl-quote">
        <figure className="container rl-quote__inner reveal">
          <span className="rl-quote__mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="rl-quote__text">{RELO_QUOTE.quote}</blockquote>
          <figcaption className="rl-quote__by">
            <cite className="rl-quote__cite">{RELO_QUOTE.cite}</cite>
            <span className="rl-quote__place">{RELO_QUOTE.place}</span>
          </figcaption>
        </figure>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="rl-cta">
        <div className="container rl-cta__inner reveal">
          <div>
            <p className="eyebrow eyebrow--clay">Plan Your Relocation</p>
            <h2 className="h2 h2--light">
              Start the conversation<br />before you start packing.
            </h2>
            <p className="rl-cta__sub">
              Tell Alexandra where you&rsquo;re coming from, where you need to be, and by when. The
              shortlist and the timeline follow from there.
            </p>
          </div>
          <div className="rl-cta__actions">
            <Link className="btn btn--solid-light" href="/contact">Plan Your Relocation</Link>
            <a className="btn btn--ghost-light" href="tel:+13107951440">Call (310) 795‑1440</a>
          </div>
        </div>
      </section>
    </main>
  );
}
