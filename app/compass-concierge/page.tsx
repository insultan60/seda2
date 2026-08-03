import type { Metadata } from "next";
import Link from "next/link";
import "./concierge.css";

export const metadata: Metadata = {
  title: "Compass Concierge — Alexandra Kerr | Sell Faster, For More",
  description:
    "Compass Concierge fronts the cost of home improvement services — staging, painting, flooring and more — with zero due until closing. Prepare your Los Angeles home for market with Alexandra Kerr.",
};

const WHY = [
  {
    icon: "smart",
    title: "Smart",
    text: "Alexandra advises on which improvements will actually return at this price point, in this neighborhood. Money spent on the wrong work is money that does not come back.",
  },
  {
    icon: "fast",
    title: "Fast",
    text: "The process is built to compress the work, not stretch it. The objective is a market-ready home in weeks, not a renovation that drifts past the season you meant to sell in.",
  },
  {
    icon: "eye",
    title: "Transparent",
    text: "No hidden fees and zero due until closing. You approve the budget before anything begins, and you always know where the number stands.",
  },
  {
    icon: "check",
    title: "Managed",
    text: "Contractors, scheduling, and invoicing run through one point of contact. You are not chasing three trades and a stager on a Tuesday morning.",
  },
];

const SERVICES = [
  {
    title: "Presentation",
    items: [
      "Staging",
      "Interior & exterior painting",
      "Deep cleaning",
      "Decluttering",
      "Carpet cleaning & replacement",
      "Landscaping & curb appeal",
      "Cosmetic renovations",
    ],
  },
  {
    title: "Systems & Structure",
    items: [
      "Roofing repair",
      "HVAC",
      "Electrical work",
      "Water heating & plumbing repair",
      "Pest control",
      "Fencing",
      "Moving & storage",
    ],
  },
  {
    title: "Major Improvements",
    items: [
      "Kitchen improvements",
      "Bathroom improvements",
      "Custom closet work",
      "Pool & tennis court services",
      "Sewer & lateral inspections",
      "Seller-side inspections & remediation",
      "100+ other home improvement services",
    ],
  },
];

const STEPS = [
  {
    title: "Walk the house together",
    text: "Alexandra goes room by room and separates the work that moves the number from the work that only feels productive. You leave that meeting with a shortlist, not a wish list.",
  },
  {
    title: "Set the budget",
    text: "The scope is priced and you authorize it before anything starts. Nothing proceeds on a handshake or an assumption.",
  },
  {
    title: "The work happens",
    text: "Contractors are engaged and scheduled around your life. Alexandra manages the sequence so the trades aren't tripping over each other.",
  },
  {
    title: "Go to market",
    text: "Photography, launch, and a home that shows the way it should have all along.",
  },
  {
    title: "Pay at close",
    text: "The cost of services is settled out of the sale proceeds at closing. There is zero due until then.",
  },
];

const FAQ = [
  {
    q: "What does it cost me upfront?",
    a: "Nothing. Compass fronts the cost of the approved services, and you repay it out of proceeds when the home sells. Terms and eligibility are confirmed in writing before any work is authorized.",
  },
  {
    q: "Which services qualify?",
    a: "A wide range — staging, painting, flooring, landscaping, cosmetic renovation, and a long list of repairs. Alexandra will confirm exactly which items qualify for your home and your market before you commit to a scope.",
  },
  {
    q: "What if the home doesn't sell?",
    a: "The seller remains responsible for repaying the cost of the services rendered regardless of outcome. This is a genuine consideration and worth talking through candidly before starting — it is the first thing Alexandra raises.",
  },
  {
    q: "Is there interest?",
    a: "Compass does not charge interest on the funds it fronts, provided the services are billed through Concierge and subject to the program's terms and conditions. Ask for those terms in writing — you should be reading them, not summarizing them.",
  },
  {
    q: "How do I start?",
    a: "One conversation. Alexandra will walk the property, give you a candid read on what is worth doing, and set out the timeline and the numbers before you decide anything.",
  },
];

const Icon = ({ name }: { name: string }) => {
  const s = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "smart")
    return (
      <svg {...s}>
        <path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2z" />
        <path d="M9 21h6" />
      </svg>
    );
  if (name === "fast")
    return (
      <svg {...s}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  if (name === "eye")
    return (
      <svg {...s}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  return (
    <svg {...s} strokeWidth={2}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

const Tick = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* eslint-disable @next/next/no-img-element */
export default function ConciergePage() {
  return (
    <main id="main">
      {/* ---------- HERO ---------- */}
      <section className="cc-hero">
        <div className="container cc-hero__inner">
          <p className="eyebrow">Compass Services</p>
          <h1 className="cc-hero__title">Compass Concierge</h1>
          <p className="cc-hero__sub">
            The cost of preparing your home for market, fronted — with zero due until closing.
          </p>
          <div className="cc-hero__ctas">
            <Link className="btn btn--solid-moss" href="/contact">
              Talk to Alexandra
            </Link>
            <a className="btn btn--outline-moss" href="#how-it-works">
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ---------- SELL FASTER ---------- */}
      <section className="cc-sell">
        <div className="container cc-sell__grid">
          <div className="cc-sell__copy reveal">
            <p className="eyebrow">The Hassle-Free Way to Sell</p>
            <h2 className="h2">
              A house that shows well<br />sells for more.
            </h2>
            <p className="lede">
              Staging, paint, flooring and landscaping change what a buyer feels in the first thirty
              seconds — and that feeling is what they end up bidding on.
            </p>
            <p className="cc-sell__body">
              The problem has always been that the money has to go out before any comes in. Concierge
              removes that: Compass fronts the cost of the approved work, and it is repaid out of the
              proceeds when the home sells. No upfront outlay, and no interest on the funds fronted,
              subject to the program&rsquo;s terms.
            </p>
            <p className="cc-sell__body">
              What it does not remove is judgment. Alexandra&rsquo;s job here is to tell you which
              work is worth doing — and, just as often, which is not.
            </p>
          </div>
          <div className="cc-sell__media reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <img
              src="/properties/3820-buena-park/living-room.jpg"
              alt="A staged living room prepared for market"
              loading="lazy"
              data-fallback
            />
          </div>
        </div>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="cc-why">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow eyebrow--clay">Why Concierge</p>
            <h2 className="h2 h2--light">A smarter way to prepare a home for sale.</h2>
          </div>
          <div className="cc-why__grid">
            {WHY.map((w, i) => (
              <article
                className="cc-why__card reveal"
                key={w.title}
                style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
              >
                <span className="cc-why__ic">
                  <Icon name={w.icon} />
                </span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="cc-services">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">What&rsquo;s Covered</p>
            <h2 className="h2 h2--sub">From a coat of paint to a new kitchen.</h2>
            <p className="lede">
              Eligibility is confirmed for your specific home and market before anything is
              authorized.
            </p>
          </div>
          <div className="cc-services__grid">
            {SERVICES.map((col, i) => (
              <div
                className="cc-services__col reveal"
                key={col.title}
                style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
              >
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item) => (
                    <li key={item}>
                      <Tick />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="cc-steps" id="how-it-works">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Step by Step</p>
            <h2 className="h2">How it works.</h2>
          </div>
          <div className="cc-steps__grid">
            <div className="cc-steps__media reveal">
              <img
                src="/properties/1954-pinehurst/01-front.jpg"
                alt="A Los Angeles home prepared for market"
                loading="lazy"
                data-fallback
              />
            </div>
            <ol className="cc-steps__list">
              {STEPS.map((s, i) => (
                <li
                  className="cc-step reveal"
                  key={s.title}
                  style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
                >
                  <span className="cc-step__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="cc-faq">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 h2--sub">Your questions, answered.</h2>
          </div>
          <div className="cc-faq__list reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
            {FAQ.map((f, i) => (
              <details className="cc-faq__item" key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span className="cc-plus" aria-hidden="true" />
                </summary>
                <div className="cc-faq__body">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cc-cta">
        <div className="container cc-cta__inner reveal">
          <div>
            <p className="eyebrow eyebrow--clay">Get Started</p>
            <h2 className="h2 h2--light">
              Start with the walkthrough.<br />Decide after that.
            </h2>
            <p className="cc-cta__sub">
              No obligation and no scope until you have seen the numbers. Alexandra will tell you
              plainly whether Concierge is the right call for your home — including when it
              isn&rsquo;t.
            </p>
          </div>
          <div className="cc-cta__actions">
            <Link className="btn btn--solid-light" href="/contact">
              Book a Walkthrough
            </Link>
            <a className="btn btn--ghost-light" href="tel:+13107951440">
              Call (310) 795&#8209;1440
            </a>
          </div>
        </div>
      </section>

      {/* ---------- LEGAL ---------- */}
      <section className="cc-legal">
        <div className="container">
          <p>
            Compass Concierge fronts the cost of home improvement services with no interest charged
            on the funds Compass fronts, provided the services are billed through Compass Concierge
            and subject to the program&rsquo;s terms and conditions. The seller remains responsible
            for repaying the cost of all services rendered. Compass is a licensed real estate broker
            and abides by Equal Housing Opportunity laws. All material presented herein is intended
            for informational purposes only, is compiled from sources deemed reliable but has not
            been verified, and is subject to errors, omissions, changes in condition, prior sale,
            lease or financing, or withdrawal without notice. This is not intended to solicit
            property already listed. Alexandra Kerr is a real estate agent affiliated with Compass ·
            CA DRE# 01911486.
          </p>
        </div>
      </section>
    </main>
  );
}
