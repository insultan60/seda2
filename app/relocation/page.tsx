import type { Metadata } from "next";
import Link from "next/link";
import { TESTIMONIALS } from "../testimonials/data";
import { FEATURED } from "../neighborhoods/data";
import FaqSection, { type FaqItem } from "../components/Faq";
import "../components/copy.css";
import "./relocation.css";

export const metadata: Metadata = {
  alternates: { canonical: "/relocation" },
  title: "Los Angeles Relocation Real Estate Agent | Alexandra Kerr",
  description:
    "Relocating to Los Angeles? Alexandra Kerr guides remote buyers and sellers with video tours, neighborhood shortlists, and a sale managed from afar.",
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
    link: { t: "Explore Los Angeles Neighborhoods", href: "/neighborhoods" },
  },
  {
    t: "Departing",
    b: "Your L.A. home prepared, marketed, and sold while you settle elsewhere — staging, photography, and escrow managed without a single return trip.",
    img: "/properties/3820-buena-park/01-front-facade.jpg",
    alt: "Front facade of a Los Angeles property",
    link: { t: "Get Your Home Value", href: "/home-valuation" },
  },
  {
    t: "Every step between",
    b: "A trusted nationwide agent network, corporate relocation timelines, and one point of contact from the first box packed to the final signature.",
    img: "/properties/8757-arlene-terrace/01-patio.jpg",
    alt: "Terrace of a Los Angeles home",
    link: { t: "Start the Conversation", href: "/contact" },
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

/* "Choosing a Neighborhood From Afar": the six featured areas, written from
   the side of someone arriving. Photos and links come from the neighborhood
   data so they match the neighborhoods page. */
const NEWCOMER_COPY: Record<string, { fit: string; life: string; cta: string }> = {
  "Los Feliz": {
    fit: "Suits you if you want architecture and Griffith Park close to home.",
    life: "Daily life is residential and unhurried, with trails nearby and restaurants along Vermont and Hillhurst. Houses range from small bungalows to landmark architecture.",
    cta: "Moving to Los Feliz",
  },
  "Hollywood Hills": {
    fit: "Suits you if you value views and privacy over walkability.",
    life: "Streets wind through the canyons, and most errands need a car. In return you get quiet, distance from the city, and outlooks that are hard to find elsewhere.",
    cta: "Moving to the Hollywood Hills",
  },
  "Silver Lake": {
    fit: "Suits you if you want a creative, walkable feel around the reservoir.",
    life: "The reservoir path, local cafes, and small shops set the pace. Housing mixes Craftsman bungalows with modernist houses on steep hillside lots.",
    cta: "Moving to Silver Lake",
  },
  "Hancock Park": {
    fit: "Suits you if you want space, deep lots, and period architecture.",
    life: "Wide streets and large gardens give it a settled feel, with Larchmont Village close by for everyday errands. Many of the houses date from the early twentieth century.",
    cta: "Moving to Hancock Park",
  },
  "Windsor Square": {
    fit: "Suits you if you want a formal, established street.",
    life: "Blocks are quiet and the houses are grand and well kept. Homes change hands slowly, so patience and local relationships count for a lot.",
    cta: "Moving to Windsor Square",
  },
  "Sunset Strip": {
    fit: "Suits you if you want city views with the west side close by.",
    life: "Homes tend to be contemporary and built to face the city. Nightlife and restaurants are nearby, which suits some buyers more than others.",
    cta: "Moving to the Sunset Strip",
  },
};
const NEWCOMER = FEATURED.filter((h) => h.page && h.img && NEWCOMER_COPY[h.name]).map((h) => ({
  name: h.name,
  page: h.page as string,
  img: h.img as string,
  alt: h.alt ?? h.name,
  ...NEWCOMER_COPY[h.name],
}));

const FAQ: FaqItem[] = [
  {
    q: "Where do I start if I’m moving to Los Angeles?",
    a: "Start with a call about where you need to be, by when, and what matters most in a home. Alexandra turns that into a neighborhood shortlist and schedules video tours. If you are selling first, a home valuation sets the timeline.",
  },
  {
    q: "Can I buy a house in Los Angeles without visiting first?",
    a: "Many buyers do. Video tours, inspections, and disclosures give you a detailed picture, and Alexandra is direct about what a home does not show on camera. A short visit before you commit is still worth considering, and she will tell you if it matters for a specific house.",
  },
  {
    q: "How long does it take to buy a house in Los Angeles?",
    a: "Once an offer is accepted, escrow in California commonly runs about 30 days, and it can be shorter with an all-cash buyer. The search before that depends on how clear your criteria are and how many homes fit them.",
  },
  {
    q: "How does signing work if I’m out of state?",
    a: "Most documents can be signed electronically. Where a notary is required, a mobile notary or a local title office can handle it near you, so you do not need to fly in for closing.",
  },
  {
    q: "What should be on my moving to Los Angeles checklist?",
    a: "Set your timeline and neighborhood shortlist, arrange financing or a pre-approval, schedule tours, and line up closing with your move date. Then plan insurance, utilities, movers, and school enrollment. Confirm home insurance early, because availability and cost vary by area.",
  },
  {
    q: "How does selling a Los Angeles home work if I’ve already moved?",
    a: "The house is prepared, photographed, and listed while you are away. Alexandra reviews offers with you remotely, and escrow is completed with electronic signatures. A home valuation is the first step.",
  },
];

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
          <p className="rl-hero__support">
            Relocating to Los Angeles, or selling a home here and leaving? Alexandra handles the search, the tours,
            and the paperwork from a distance, so a Los Angeles relocation never depends on you being in town.
          </p>
          <div className="rl-hero__actions">
            <Link className="btn btn--solid-light" href="/contact">Plan Your Relocation</Link>
            <a className="btn btn--ghost-light" href="tel:+13107951440">Call (310) 795&#8209;1440</a>
          </div>
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

      {/* ---------- PROOF STRIP ----------
          The same career figures as the home page and portfolio. The brief
          allows a fourth (out-of-state clients) only once it is confirmed. */}
      <section className="rl-proof">
        <div className="container">
          <dl className="cp-stats reveal">
            <div><dt>Years in L.A. real estate</dt><dd>13</dd></div>
            <div><dt>Homes sold</dt><dd>179</dd></div>
            <div><dt>Total sales</dt><dd>$184M</dd></div>
          </dl>
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
                <Link className="text-link rl-stage__link" href={s.link.href}>
                  {s.link.t}<i className="arrow" aria-hidden="true"></i>
                </Link>
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

      {/* ---------- BUYING FROM OUT OF STATE ---------- */}
      <section className="cp cp--cream">
        <div className="container cp-split">
          <div className="cp-head reveal">
            <p className="eyebrow">Buying Remotely</p>
            <h2 className="cp-title">Buying a Home in Los Angeles From Out of State</h2>
          </div>
          <div className="cp-prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p>
              Buying a house in Los Angeles from out of state works when the groundwork is careful. Buyers often ask
              whether it is wise to buy remotely, or even sight unseen. The answer depends on how much you learn
              before you write an offer.
            </p>
            <p>
              A good video tour shows what photographs leave out: the slope of the street, the sound of traffic, the
              windows next door. Inspections, appraisals, and disclosures give you the rest in writing. Most
              documents can be signed electronically, and a mobile notary can handle the ones that cannot.
            </p>
            <p>
              Many buyers still make one visit before they commit, to stand on the street and see how the
              neighborhood feels. Alexandra will tell you honestly whether that trip is worth making for a
              particular home.
            </p>
            <p>
              When you are ready, start with the current <Link href="/home-search">homes for sale in Los Angeles</Link>.
            </p>
            <div className="cp-actions">
              <Link className="btn btn--solid-moss" href="/home-search">Search Los Angeles Homes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CHOOSING A NEIGHBORHOOD ---------- */}
      <section className="cp">
        <div className="container">
          <div className="cp-head reveal">
            <p className="eyebrow">For Newcomers</p>
            <h2 className="cp-title">Choosing a Neighborhood From Afar</h2>
            <p className="cp-sub">
              Choosing a Los Angeles neighborhood from another city is the hardest part of the move. Think of this
              as a short guide to Los Angeles neighborhoods for newcomers: the six areas where Alexandra works most,
              described from the side of someone arriving. Each card links to the full neighborhood page.
            </p>
          </div>
          <div className="cp-cards">
            {NEWCOMER.map((n, i) => (
              <Link
                className="cp-card reveal"
                href={n.page}
                key={n.name}
                style={{ "--d": `${(i % 3) * 0.07}s` } as React.CSSProperties}
              >
                <div className="cp-card__media">
                  <img src={n.img} alt={n.alt} loading="lazy" data-fallback />
                </div>
                <h3>{n.name}</h3>
                <p className="cp-card__fit">{n.fit}</p>
                <p>{n.life}</p>
                <span className="text-link">
                  {n.cta}<i className="arrow" aria-hidden="true"></i>
                </span>
              </Link>
            ))}
          </div>
          <div className="rl-fit reveal">
            <div>
              <h3>Not sure which one fits?</h3>
              <p>
                Tell Alexandra your commute, your must-haves, and the pace you want, and she will narrow the list to
                two or three.
              </p>
            </div>
            <div className="rl-fit__actions">
              <Link className="btn btn--solid-moss" href="/contact">Tell Alexandra Your Commute</Link>
              <Link className="text-link" href="/neighborhoods">
                Explore all Los Angeles neighborhoods<i className="arrow" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SELLING FROM OUT OF STATE ---------- */}
      <section className="cp cp--cream">
        <div className="container cp-media-split">
          <div className="cp-prose reveal">
            <p className="eyebrow">Selling Remotely</p>
            <h2 className="cp-title">Selling Your Los Angeles Home From Out of State</h2>
            <p style={{ marginTop: "1.2rem" }}>
              Selling a house in Los Angeles from out of state goes best when the work is done in the right order.
              It starts with a valuation, so you know what the home is worth before you decide when to list. From
              there, repairs and staging are arranged for you, then photography, pricing, and the first week of
              showings.
            </p>
            <p>
              You do not need to be in the room for offers. Alexandra reviews each one with you by phone or video,
              and inspections, appraisal, and signatures are coordinated around your schedule. If the cost of
              preparing the house is the obstacle, <Link href="/compass-concierge">Compass Concierge</Link> can cover
              those expenses until closing.
            </p>
            <p>Begin with a home valuation, and decide on timing once you see the number.</p>
            <div className="cp-actions">
              <Link className="btn btn--solid-moss" href="/home-valuation">Get Your Home Value</Link>
            </div>
          </div>
          <div className="cp-photo reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <img
              src="/properties/2861-n-beachwood/01-front.jpg"
              alt="A Los Angeles home prepared for sale"
              loading="lazy"
              data-fallback
            />
          </div>
        </div>
      </section>

      {/* ---------- CORPORATE ---------- */}
      <section className="cp cp--dark cp--tight">
        <div className="container cp-split">
          <div className="cp-head reveal">
            <p className="eyebrow eyebrow--clay">On a Deadline</p>
            <h2 className="cp-title">Corporate and Executive Relocation in Los Angeles</h2>
          </div>
          <div className="cp-prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            <p>
              Corporate relocation in Los Angeles often starts with a fixed date and little time to look. Alexandra
              works with executives and families who have a start date to meet, and with partners and assistants
              coordinating on their behalf. You get one point of contact, a clear schedule, and a short list of
              homes that fit your commute, your schools, and your timeline.
            </p>
            <p>
              If you are arranging an executive relocation to Los Angeles for yourself or for someone else, tell
              Alexandra the date you need to be settled by, and the plan follows from there.
            </p>
            <div className="cp-actions">
              <Link className="btn btn--solid-light" href="/contact">Schedule a Call</Link>
            </div>
          </div>
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

      <FaqSection
        items={FAQ}
        title="Relocation FAQ"
        cta={{ label: "Call (310) 795-1440", href: "tel:+13107951440" }}
      />

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
