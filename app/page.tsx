import type { CSSProperties } from "react";
import Effects from "./components/Effects";

// helper for the CSS reveal-delay custom property
const d = (val: string) => ({ "--d": val }) as CSSProperties;

const Chevron = () => (
  <svg className="drawer__chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DRAWER_GROUPS = [
  { label: "About", sub: [{ t: "Meet Alexandra", href: "#about" }, { t: "Testimonials", href: "#", disabled: true }] },
  { label: "Home Search", sub: [{ t: "Search The MLS", href: "#home-search" }, { t: "My Search Portal", href: "#", disabled: true }] },
  { label: "Buyers", sub: [{ t: "Buyers Guide", href: "#", disabled: true }, { t: "Relocation", href: "#relocation" }] },
  { label: "Sellers", sub: [{ t: "Sellers Guide", href: "#", disabled: true }, { t: "Home Valuation", href: "#connect" }] },
];
const DRAWER_GROUPS_2 = [
  { label: "Compass Services", sub: [{ t: "Compass Concierge", href: "#", disabled: true }, { t: "Private Exclusives", href: "#", disabled: true }] },
];

const TESTIMONIALS = [
  { quote: "Sixteen offers in the first week. Alexandra secured an all‑cash buyer above list and closed escrow in ten days. We still can't quite believe how effortless she made it feel.", av: "AB", cite: "Alan B. & Joan C.", place: "Santa Monica" },
  { quote: "Professional photography — drone shots included — an all‑cash offer, and the smoothest escrow we've ever experienced. Alexandra treats your home like the cover story it is.", av: "CB", cite: "Cheryl B.", place: "Hollywood Hills" },
  { quote: "As first‑time buyers we were nervous — buying during COVID, no less. Alexandra found us our dream home and held our hands through every single step.", av: "AM", cite: "Amit & Mary S.", place: "Los Feliz" },
  { quote: "In one of the most competitive markets imaginable, she priced our home perfectly and sold it above asking. Sharp, calm, and relentless in the best way.", av: "BC", cite: "Bradley & Claudia R.", place: "Los Feliz" },
  { quote: "We were out of state the entire time. Alexandra managed the rental, then the sale — over ask, within a month. Total peace of mind from two time zones away.", av: "NS", cite: "Nancy & Stephen G.", place: "West Hollywood" },
];

const FEATURED = [
  { img: "/assets/listings/photo-pending.svg", alt: "2050 N Las Palmas Avenue, Los Angeles — photography coming soon", badgeCls: "badge--open", badge: "Open 7/18 · 1:00–4:00PM", price: "$1,695,000", addr: "2050 N Las Palmas Avenue", city: "Los Angeles, CA 90068", meta: ["3 Beds", "4 Baths", "1,830 Sq.Ft."], d: "" },
  { img: "/assets/listings/photo-pending.svg", alt: "1352 Miller Drive, Los Angeles — photography coming soon", badgeCls: "badge--sale", badge: "Active", price: "$28,000", addr: "1352 Miller Drive", city: "Los Angeles, CA 90069", meta: ["4 Beds", "5 Baths", "5,187 Sq.Ft."], d: ".08s" },
];

const SOLD = [
  { img: "/assets/listings/s1-windsor414.jpg", alt: "414 S Windsor Blvd, Los Angeles — exterior", price: "$7,775,000", addr: "414 S Windsor Blvd", city: "Los Angeles, CA 90020 · 4 Bd · 4 Ba · 4,235 Sq.Ft.", d: "" },
  { img: "/assets/listings/s2-rossmore.jpg", alt: "356 S Rossmore Ave, Los Angeles — exterior", price: "$6,300,000", addr: "356 S Rossmore Ave", city: "Los Angeles, CA 90020 · 8 Bd · 6 Ba · 5,878 Sq.Ft.", d: ".06s" },
  { img: "/assets/listings/s3-pacific.jpg", alt: "11845 Pacific Ave, Los Angeles — exterior", price: "$4,275,000", addr: "11845 Pacific Ave", city: "Los Angeles, CA 90066 · 5 Bd · 6 Ba · 4,648 Sq.Ft.", d: ".12s" },
  { img: "/assets/listings/s4-mccadden621.jpg", alt: "621 N McCadden Pl, Los Angeles — exterior", price: "$3,750,000", addr: "621 N McCadden Pl", city: "Los Angeles, CA 90004 · 4 Bd · 3 Ba · 2,678 Sq.Ft.", d: "" },
  { img: "/assets/listings/s5-mccadden514.jpg", alt: "514 N McCadden Pl, Los Angeles — exterior", price: "$3,650,000", addr: "514 N McCadden Pl", city: "Los Angeles, CA 90004 · 3 Bd · 3 Ba · 2,483 Sq.Ft.", d: ".06s" },
  { img: "/assets/listings/s6-windsor206.jpg", alt: "206 N Windsor Blvd, Los Angeles — exterior", price: "$3,639,161", addr: "206 N Windsor Blvd", city: "Los Angeles, CA 90004 · 3 Bd · 3 Ba · 2,813 Sq.Ft.", d: ".12s" },
];

const HOODS = [
  { img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop", alt: "Los Feliz hillside homes", name: "Los Feliz", sub: "Storied estates & icons of early Hollywood", tall: true, d: "" },
  { img: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1600&auto=format&fit=crop", alt: "Hollywood Hills homes at golden hour", name: "Hollywood Hills", sub: "Mid‑century views above the city", tall: false, d: ".08s" },
  { img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop", alt: "Silver Lake craftsman homes", name: "Silver Lake", sub: "Craftsman charm, creative energy", tall: false, d: ".16s" },
];
const HOOD_INDEX = ["Echo Park", "Pasadena", "Glendale", "Sherman Oaks & Studio City", "West Hollywood", "Beverly Hills", "Brentwood", "Santa Monica", "Pacific Palisades", "Palm Springs"];

const JOURNAL = [
  { img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop", tag: "Architecture · Placeholder", title: "Reading a Spanish Colonial: what handcrafted tile tells you about a home", date: "July 2026", d: "" },
  { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop", tag: "Market Notes · Placeholder", title: "Mid‑year check‑in: how L.A.'s east side neighborhoods are moving", date: "June 2026", d: ".08s" },
  { img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop", tag: "Selling · Placeholder", title: "Before the photographer arrives: a room‑by‑room staging primer", date: "May 2026", d: ".16s" },
];

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {/* NAV */}
      <header className="nav" id="top">
        <div className="nav__inner">
          <a className="nav__logo" href="#top" aria-label="Alexandra Kerr — Home">
            <img className="nav__logo-img" src="/assets/logo-white.png" alt="Alexandra Kerr — AK monogram" />
          </a>
          <nav className="nav__links" aria-label="Primary">
            <a href="#listings">Portfolio</a>
            <a href="#home-search">Home Search</a>
            <a href="#journal">The Latest Real Estate News</a>
          </nav>
          <a className="btn btn--outline-light nav__cta" href="#connect">Let&rsquo;s Connect</a>
          <button className="nav__burger" aria-label="Open menu" aria-expanded="false" aria-controls="sideMenu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* SIDE MENU (drawer) */}
      <div className="drawer" id="sideMenu" hidden>
        <div className="drawer__backdrop" data-drawer-close aria-hidden="true"></div>
        <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <button className="drawer__close" data-drawer-close aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none">
              <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <nav className="drawer__nav" aria-label="Full menu">
            <a className="drawer__item" href="#top">Home</a>
            {DRAWER_GROUPS.map((g) => (
              <div className="drawer__group" key={g.label}>
                <button className="drawer__item drawer__toggle" type="button" aria-expanded="false">
                  {g.label}
                  <Chevron />
                </button>
                <div className="drawer__sub">
                  {g.sub.map((s) => (
                    <a key={s.t} href={s.href} aria-disabled={s.disabled ? "true" : undefined}>{s.t}</a>
                  ))}
                </div>
              </div>
            ))}
            <a className="drawer__item" href="#listings">Portfolio</a>
            <a className="drawer__item" href="#connect">Home Valuation</a>
            <a className="drawer__item" href="#neighborhoods">Neighborhoods</a>
            {DRAWER_GROUPS_2.map((g) => (
              <div className="drawer__group" key={g.label}>
                <button className="drawer__item drawer__toggle" type="button" aria-expanded="false">
                  {g.label}
                  <Chevron />
                </button>
                <div className="drawer__sub">
                  {g.sub.map((s) => (
                    <a key={s.t} href={s.href} aria-disabled={s.disabled ? "true" : undefined}>{s.t}</a>
                  ))}
                </div>
              </div>
            ))}
            <a className="drawer__item" href="#journal">The Latest Real Estate News</a>
            <a className="drawer__item" href="#connect">Let&rsquo;s Connect</a>
            <a className="drawer__item" href="#" aria-disabled="true">My Search Portal</a>
          </nav>
        </aside>
      </div>

      <main id="main">
        {/* 1 · HERO */}
        <section className="hero">
          <video
            className="hero__img"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop"
            aria-label="Introduction video — Alexandra Kerr, Los Angeles real estate"
          >
            <source src="/assets/intro-video.mp4" type="video/mp4" />
          </video>
          <div className="hero__scrim" aria-hidden="true"></div>
          <div className="hero__content">
            <h1 className="hero__title">Los Angeles Luxury Real Estate, Elevated</h1>
            <div className="hero__ctas">
              <a className="btn btn--ghost-light" href="#listings">View Portfolio</a>
              <a className="btn btn--solid-light" href="#connect">Let&rsquo;s Connect</a>
            </div>
          </div>
          <div className="hero__footer">
            <div className="hero__id">
              <p className="hero__id-name">Alexandra Kerr</p>
              <p>Ph. <a href="tel:+13107951440">310.795.1440</a></p>
              <p>DRE# 01911486</p>
            </div>
            <div className="hero__contact">
              <img className="hero__compass" src="/assets/compass-white.png" alt="Compass" />
              <a className="hero__contact-email" href="mailto:alexandra@compass.com">alexandra@compass.com</a>
              <a className="hero__contact-link" href="#connect">Let&rsquo;s Connect</a>
            </div>
          </div>
        </section>

        {/* 2 · TRIPLE CTA */}
        <section className="paths" id="paths">
          <div className="container">
            <div className="paths__grid">
              {[
                { n: "01", t: "Looking to Buy?", b: "From first showing to final walkthrough — find a home with a story worth telling, guided at every step.", href: "#listings", d: "" },
                { n: "02", t: "Looking to Sell?", b: "Meticulous preparation, editorial‑grade marketing, and fierce negotiation to earn your home its best result.", href: "#connect", d: ".08s" },
                { n: "03", t: "Let's Connect", b: "Buying, selling, or simply curious about the market — start a conversation with a specialist who listens.", href: "#connect", d: ".16s" },
              ].map((p) => (
                <a className="path-card reveal" href={p.href} key={p.n} style={p.d ? d(p.d) : undefined}>
                  <span className="path-card__num" aria-hidden="true">{p.n}</span>
                  <h2 className="path-card__title">{p.t}</h2>
                  <p className="path-card__body">{p.b}</p>
                  <span className="path-card__link">Explore<i className="arrow" aria-hidden="true"></i></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · ABOUT */}
        <section className="about" id="about">
          <div className="container about__grid">
            <figure className="about__media reveal">
              <img src="/assets/alexandra-headshot.jpg" alt="Alexandra Kerr, REALTOR® — professional headshot" data-fallback />
              <figcaption className="about__media-caption">Alexandra Kerr · Estates Director</figcaption>
            </figure>
            <div className="about__copy reveal" style={d(".1s")}>
              <p className="eyebrow">Meet Alexandra</p>
              <h2 className="h2">Dedication. Expertise.<br /><em>Results.</em></h2>
              <p className="lede">The three qualities that distinguish Alexandra as a real estate agent are her dedication, thorough knowledge of the L.A. marketplace, and her efficiency. Regardless of circumstances, she successfully gets the job done for her clients.</p>
              <ul className="about__creds">
                <li>REALTOR® · Estates Director · Senior Real Estate Specialist</li>
                <li>Compass · Los Angeles</li>
                <li>DRE# 01911486</li>
              </ul>
              <a className="btn btn--solid-moss" href="#">Learn More About Alexandra</a>
            </div>
          </div>
        </section>

        {/* 4 · STATS BAR */}
        <section className="stats">
          <div className="container stats__grid">
            <div className="stats__lead reveal">
              <p className="eyebrow eyebrow--clay">A Record That Speaks Quietly</p>
              <h2 className="h2 h2--light">Trusted by Los Angeles homeowners for over a decade.</h2>
              <p className="stats__note">Figures shown are placeholders pending client confirmation.</p>
            </div>
            <dl className="stats__figures">
              {[
                { t: "Homes Sold", count: "200", suffix: "+", d: ".05s" },
                { t: "Total Sales", count: "250", prefix: "$", suffix: "M+", d: ".1s" },
                { t: "Client Reviews", count: "90", suffix: "+", d: ".15s" },
                { t: "Years in L.A. Real Estate", count: "12", suffix: "+", d: ".2s" },
              ].map((s) => (
                <div className="stat reveal" key={s.t} style={d(s.d)}>
                  <dt>{s.t}</dt>
                  <dd>
                    <span className="stat__num" data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix}>0</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 5 · TESTIMONIALS */}
        <section className="testimonials">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Real Clients. Real Stories.</p>
              <h2 className="h2">Kind words from the neighborhoods<br />we call home.</h2>
            </div>
            <div className="carousel reveal" style={d(".1s")} aria-roledescription="carousel" aria-label="Client testimonials">
              <div className="carousel__viewport">
                {TESTIMONIALS.map((t, i) => (
                  <blockquote className={`carousel__slide${i === 0 ? " is-active" : ""}`} key={t.cite}>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                    <footer>
                      <span className="avatar" aria-hidden="true">{t.av}</span>
                      <cite>{t.cite}</cite>
                      <span className="carousel__place">{t.place}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
              <div className="carousel__controls">
                <button className="carousel__btn" data-dir="-1" aria-label="Previous testimonial"><i className="arrow arrow--left" aria-hidden="true"></i></button>
                <div className="carousel__dots" role="tablist" aria-label="Choose testimonial"></div>
                <button className="carousel__btn" data-dir="1" aria-label="Next testimonial"><i className="arrow" aria-hidden="true"></i></button>
              </div>
            </div>
            <div className="section-foot reveal"><a className="text-link" href="#">View All Testimonials<i className="arrow" aria-hidden="true"></i></a></div>
          </div>
        </section>

        {/* 6 · FEATURED LISTINGS */}
        <section className="listings" id="listings">
          <div className="container">
            <div className="section-head section-head--split reveal">
              <div>
                <p className="eyebrow">Featured Listings</p>
                <h2 className="h2">Currently Represented</h2>
              </div>
              <a className="text-link" href="#">View Portfolio<i className="arrow" aria-hidden="true"></i></a>
            </div>
            <div className="listings__grid">
              {FEATURED.map((l) => (
                <article className="listing reveal" key={l.addr} style={l.d ? d(l.d) : undefined}>
                  <figure className="listing__media">
                    <img src={l.img} alt={l.alt} data-fallback />
                    <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
                  </figure>
                  <div className="listing__body">
                    <p className="listing__price">{l.price}</p>
                    <h3 className="listing__addr">{l.addr}</h3>
                    <p className="listing__city">{l.city}</p>
                    <ul className="listing__meta">{l.meta.map((m) => <li key={m}>{m}</li>)}</ul>
                    <a className="text-link listing__view" href="#" aria-label={`View ${l.addr}`}>View<i className="arrow" aria-hidden="true"></i></a>
                  </div>
                </article>
              ))}
            </div>

            <div className="sold">
              <div className="section-head section-head--split section-head--sub reveal">
                <div>
                  <p className="eyebrow">A Portfolio of Results</p>
                  <h2 className="h2 h2--sub">Recently Sold</h2>
                </div>
                <a className="text-link" href="#">View Sold Listings<i className="arrow" aria-hidden="true"></i></a>
              </div>
              <div className="sold__grid">
                {SOLD.map((l) => (
                  <article className="listing listing--sold reveal" key={l.addr} style={l.d ? d(l.d) : undefined}>
                    <figure className="listing__media">
                      <img src={l.img} alt={l.alt} data-fallback />
                      <span className="badge badge--sold">Sold</span>
                    </figure>
                    <div className="listing__body">
                      <p className="listing__price">{l.price}</p>
                      <h3 className="listing__addr">{l.addr}</h3>
                      <p className="listing__city">{l.city}</p>
                      <a className="text-link listing__view" href="#" aria-label={`View ${l.addr}`}>View<i className="arrow" aria-hidden="true"></i></a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7 · MLS BAND */}
        <section className="mls" id="home-search">
          <div className="container mls__inner reveal">
            <div className="mls__copy">
              <p className="eyebrow">Newest MLS Listings</p>
              <h2 className="h2">The full Los Angeles market,<br />curated to your taste.</h2>
              <p className="lede">Search every active listing across the Greater Los Angeles MLS — or tell Alexandra what character means to you, and let the right home find you.</p>
            </div>
            <div className="mls__ctas">
              <a className="btn btn--solid-moss" href="#">Search The MLS</a>
              <a className="btn btn--outline-moss" href="#connect">Request A Consultation</a>
            </div>
          </div>
        </section>

        {/* 7b · RELOCATION */}
        <section className="relo" id="relocation">
          <div className="container relo__inner">
            <div className="relo__copy reveal">
              <p className="eyebrow eyebrow--clay">Relocation Specialist</p>
              <h2 className="h2 h2--light">Moving to Los Angeles —<br /><em>or moving on?</em> Consider it handled.</h2>
              <p className="relo__sub">Alexandra has guided relocations in and out of Los Angeles for over a decade — executives on a deadline, families changing coasts, sellers managing everything from two time zones away. When your next chapter starts in another city, she&rsquo;s the first call to make.</p>
              <div className="relo__ctas">
                <a className="btn btn--solid-light" href="#connect">Plan Your Relocation</a>
                <a className="btn btn--ghost-light" href="tel:+13107951440">Call (310) 795‑1440</a>
              </div>
            </div>
            <ul className="relo__points">
              {[
                { t: "Arriving", b: "Neighborhood shortlists matched to your commute, schools, and taste — with video tours and offer strategy handled before you ever board the plane.", d: ".05s" },
                { t: "Departing", b: "Your L.A. home prepared, marketed, and sold while you settle elsewhere — staging, photography, and escrow managed without a single return trip.", d: ".1s" },
                { t: "Every step between", b: "A trusted nationwide agent network, corporate relocation timelines, and one point of contact from the first box packed to the final signature.", d: ".15s" },
              ].map((p) => (
                <li className="reveal" key={p.t} style={d(p.d)}>
                  <h3>{p.t}</h3>
                  <p>{p.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8 · NEIGHBORHOODS */}
        <section className="hoods" id="neighborhoods">
          <div className="container">
            <div className="section-head section-head--split reveal">
              <div>
                <p className="eyebrow">Featured Neighborhoods</p>
                <h2 className="h2">Where character lives.</h2>
              </div>
              <a className="text-link" href="#">View All Neighborhoods<i className="arrow" aria-hidden="true"></i></a>
            </div>
            <div className="hoods__grid">
              {HOODS.map((h) => (
                <a className={`hood${h.tall ? " hood--tall" : ""} reveal`} href="#" key={h.name} style={h.d ? d(h.d) : undefined}>
                  <img src={h.img} alt={h.alt} data-fallback />
                  <div className="hood__label"><h3>{h.name}</h3><span>{h.sub}</span></div>
                </a>
              ))}
            </div>
            <ul className="hoods__index reveal">
              {HOOD_INDEX.map((n) => <li key={n}><a href="#">{n}</a></li>)}
            </ul>
          </div>
        </section>

        {/* 9 · JOURNAL */}
        <section className="journal" id="journal">
          <div className="container">
            <div className="section-head section-head--split reveal">
              <div>
                <p className="eyebrow">From the Journal</p>
                <h2 className="h2">Notes on architecture & the market.</h2>
              </div>
              <a className="text-link" href="#">Read The Journal<i className="arrow" aria-hidden="true"></i></a>
            </div>
            <div className="journal__grid">
              {JOURNAL.map((p) => (
                <a className="post reveal" href="#" key={p.title} style={p.d ? d(p.d) : undefined}>
                  <figure><img src={p.img} alt="" data-fallback /></figure>
                  <p className="post__tag">{p.tag}</p>
                  <h3>{p.title}</h3>
                  <div className="post__foot">
                    <span className="post__date">{p.date}</span>
                    <span className="text-link post__read">Read<i className="arrow" aria-hidden="true"></i></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 10 · NEWSLETTER */}
        <section className="newsletter" id="connect">
          <div className="container newsletter__inner reveal">
            <div className="newsletter__copy">
              <p className="eyebrow eyebrow--clay">Stay Close to the Market</p>
              <h2 className="h2 h2--light">Sign up for the newsletter & exclusive off‑market listings.</h2>
              <p className="newsletter__sub">Quiet opportunities, neighborhood insight, and homes with character — before they hit the MLS.</p>
            </div>
            <form className="newsletter__form" noValidate>
              <div className="field">
                <label htmlFor="nl-name">Full Name</label>
                <input id="nl-name" name="name" type="text" autoComplete="name" placeholder="Jane Appleseed" required />
              </div>
              <div className="field">
                <label htmlFor="nl-email">Email Address</label>
                <input id="nl-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />
                <p className="field__error" hidden>Please enter a valid email address so Alexandra can reach you.</p>
              </div>
              <button className="btn btn--solid-light newsletter__submit" type="submit">Sign Up</button>
              <p className="newsletter__fine">Design mockup — form is not yet connected. No spam, unsubscribe anytime.</p>
            </form>
          </div>
        </section>
      </main>

      {/* 11 · FOOTER */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <img className="footer__logo" src="/assets/logo-white.png" alt="Alexandra Kerr — AK monogram logo" />
            <p className="footer__name">Alexandra Kerr</p>
            <p className="footer__title">REALTOR® · Estates Director · Senior Real Estate Specialist</p>
            <address className="footer__contact">
              <a href="tel:+13107951440">(310) 795‑1440</a>
              <a href="mailto:alexandra.kerr@compass.com">alexandra.kerr@compass.com</a>
              <a href="https://instagram.com/alexandrakerrlarealestate" rel="noopener">@alexandrakerrlarealestate</a>
            </address>
          </div>
          <nav className="footer__col" aria-label="Explore">
            <h3>Explore</h3>
            <a href="#about">About Alexandra</a>
            <a href="#listings">Portfolio</a>
            <a href="#neighborhoods">Neighborhoods</a>
            <a href="#journal">Journal</a>
          </nav>
          <nav className="footer__col" aria-label="Resources">
            <h3>Resources</h3>
            <a href="#">Buyers Guide</a>
            <a href="#">Sellers Guide</a>
            <a href="#relocation">Relocation</a>
            <a href="#">Testimonials</a>
            <a href="#">Home Valuation</a>
          </nav>
          <div className="footer__col footer__office">
            <h3>Office</h3>
            <img className="footer__compass" src="/assets/compass-white.png" alt="Compass" />
            <p>6430 W Sunset Blvd, 6th Floor<br />Los Angeles, CA 90028</p>
            <div className="footer__badges" aria-label="Affiliations">
              <span>REALTOR®</span><span>EQUAL HOUSING</span><span>DRE# 01911486</span>
            </div>
          </div>
        </div>
        <div className="container footer__legal">
          <p>© 2026 Alexandra Kerr · DRE# 01911486. Alexandra Kerr is a real estate agent affiliated with Compass, a licensed real estate broker, and abides by Equal Housing Opportunity laws. All material presented herein is intended for informational purposes only and is compiled from sources deemed reliable but has not been verified.</p>
        </div>
      </footer>

      <Effects />
    </>
  );
}
