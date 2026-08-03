import type { Metadata } from "next";
import Link from "next/link";
import ValuationSearch from "./ValuationSearch";
import "./valuation.css";

export const metadata: Metadata = {
  title: "Home Valuation — Alexandra Kerr | What's Your Home Worth?",
  description:
    "Get an estimate of your Los Angeles home's value, read by an agent who knows the street — not just an algorithm. Free and confidential.",
};

const FAQS = [
  {
    q: "What is a home valuation?",
    a: "A home valuation determines the current market value of a residential property. It matters for any transaction, and it protects against over-borrowing: when you take out a mortgage the home acts as collateral, so a thorough valuation confirms the property can cover the loan — for your sake as much as the lender's.",
  },
  {
    q: "How is the valuation of my home calculated?",
    a: "From a combination of factors: location, age, size, condition, any improvements or renovations, and recent sale prices of comparable homes nearby. It also reflects current market conditions — the number is dynamic and moves with inventory, interest rates, and buyer sentiment.",
  },
  {
    q: "How accurate is an online home valuation?",
    a: "An online estimate is a reasonable starting point, but it cannot see recent renovations, unique architectural features, historic pedigree, or how a street actually trades. In Los Angeles those things routinely move a number six figures. For an accurate assessment, ask for a Comparative Market Analysis or a formal appraisal.",
  },
];

const METHODS = [
  {
    tag: "Market analysis",
    title: "Comparative Market Analysis",
    body: "A CMA is the tool an agent uses to value a home. Recently sold homes as similar and as close to yours as possible are identified — usually three strong comparables — and the differences analysed. Each comp is then adjusted to reflect what it would have sold for if it were identical to your home in today's market.",
  },
  {
    tag: "Professional opinion",
    title: "Appraisals",
    body: "An appraisal is an unbiased valuation from a licensed professional, and it is what mortgage companies rely on for purchases and refinances. The appraiser inspects inside and out, weighs comparable sales and market trends, and compiles a detailed report with a building sketch, a comps map, and photographs.",
  },
];

const WHY = [
  {
    num: "01",
    title: "Refinancing",
    body: "Lenders base loans on your property's value and typically let you borrow up to 75–96.5% against it. Knowing the value lets them calculate your equity — and the more equity you hold, the better the terms available to you.",
  },
  {
    num: "02",
    title: "Home improvements",
    body: "Before renovating for resale, it's worth checking you aren't pricing yourself out of the neighborhood. A valuation shows how your home sits against others nearby and helps direct spend toward the work that actually returns.",
  },
  {
    num: "03",
    title: "Qualifying for credit",
    body: "A Home Equity Line of Credit needs a certain level of equity — most lenders want at least 20%. A valuation shows whether you qualify, and it is the figure the lender will use to decide.",
  },
  {
    num: "04",
    title: "Planning ahead",
    body: "Even with no immediate plans, knowing where your home stands is useful. It informs how you plan, and it means you can move quickly when something arrives unannounced — a relocation, an opportunity, or an emergency.",
  },
];

/* eslint-disable @next/next/no-img-element */
export default function HomeValuationPage() {
  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="hv-hero" id="valuation-form">
        <div className="container">
          <p className="eyebrow eyebrow--clay">Free &amp; Confidential</p>
          <h1 className="hv-hero-title">How Much is Your Home Worth?</h1>
          <p className="hv-hero-sub">
            Enter your address below for a <b>free, personalized valuation</b> from Alexandra Kerr —
            read by someone who knows the street, not just the spreadsheet.
          </p>
          <ValuationSearch />
        </div>
      </section>

      {/* ---------- WHAT'S YOUR PROPERTY WORTH ---------- */}
      <section className="hv-section">
        <div className="container hv-worth-grid">
          <div className="hv-worth-media reveal">
            <img
              src="/properties/3820-buena-park/living-room.jpg"
              alt="Living room of a Los Angeles home represented by Alexandra Kerr"
              loading="lazy"
              data-fallback
            />
          </div>
          <div className="hv-worth-copy reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <p className="eyebrow">Knowledge, not guesswork</p>
            <h2 className="h2">What&rsquo;s Your Property Worth?</h2>
            <p className="hv-lead">
              A valuation gives you something to plan against. It is good practice to know how much
              equity you hold — what you could borrow against, and what the house would realistically
              sell for.
            </p>
            <p className="hv-body">
              This produces a more considered assessment than the major portals will give you, which
              price a house they have never seen. For the most precise figure, ask about a customized
              Comparative Market Analysis or a formal appraisal.
            </p>
            <a href="#valuation-form" className="btn btn--outline-moss">
              Get My Valuation
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="hv-faq">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="h2">The Essentials, Explained</h2>
            <p className="lede">
              A short primer on how valuations work and what the number actually means.
            </p>
          </div>
          <div className="hv-faq-list reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            {FAQS.map((f, i) => (
              <details className="hv-faq-item" key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span className="hv-plus" aria-hidden="true" />
                </summary>
                <div className="hv-faq-body">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SEARCH BAND ---------- */}
      <section className="hv-band-wrap">
        <div className="container">
          <div className="hv-band reveal">
            <div>
              <p className="eyebrow eyebrow--clay">Start your property search</p>
              <h2>Curious what your next move looks like?</h2>
              <p>
                Browse active listings across Los Feliz, Hancock Park, the Hollywood Hills and
                beyond.
              </p>
            </div>
            <Link href="/home-search" className="btn btn--solid-light">
              Browse Homes
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- TWO ACCURATE WAYS ---------- */}
      <section className="hv-methods">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">How it&rsquo;s done</p>
            <h2 className="h2">Two Accurate Ways to Value a Home</h2>
          </div>
          <div className="hv-methods-grid">
            {METHODS.map((m, i) => (
              <article
                className="hv-method-card reveal"
                key={m.title}
                style={i ? ({ "--d": ".1s" } as React.CSSProperties) : undefined}
              >
                <span className="hv-method-tag">{m.tag}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY IT MATTERS ---------- */}
      <section className="hv-why">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">When you&rsquo;ll need one</p>
            <h2 className="h2">Why a Valuation Matters</h2>
            <p className="lede">Situations where knowing your home&rsquo;s value pays for itself.</p>
          </div>
          <div className="hv-why-grid">
            {WHY.map((w, i) => (
              <article
                className="hv-why-card reveal"
                key={w.num}
                style={{ "--d": `${(i % 2) * 0.08}s` } as React.CSSProperties}
              >
                <span className="hv-why-num">{w.num}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="hv-final">
        <div className="container hv-final-inner">
          <h2 className="reveal">Ready for your number?</h2>
          <p className="reveal" style={{ "--d": ".06s" } as React.CSSProperties}>
            A free, no-obligation valuation and an honest read on where your home sits in today&rsquo;s
            market.
          </p>
          <div className="hv-final-ctas reveal" style={{ "--d": ".12s" } as React.CSSProperties}>
            <a href="#valuation-form" className="btn btn--solid-moss">
              Unlock Your Free Valuation
            </a>
            <Link href="/contact" className="btn btn--outline-moss">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
