import Link from "next/link";
import type { CSSProperties } from "react";

export type FaqItem = { q: string; a: string };

/**
 * A question-and-answer section, plus its FAQPage structured data.
 *
 * The JSON-LD is built from the same array the page renders, so the questions
 * Google reads are always the ones a visitor can see. That is a requirement,
 * not a nicety: FAQ markup for content that is not on the page is a structured
 * data violation. One FaqSection per page, since a page should carry one
 * FAQPage.
 *
 * Answers are plain text. Styling is .faq in globals.css, the same accordion
 * as the Compass Concierge and Home Valuation pages.
 */
export default function FaqSection({
  items,
  title,
  eyebrow = "FAQ",
  id = "faq",
  cta,
}: {
  items: readonly FaqItem[];
  title: string;
  eyebrow?: string;
  id?: string;
  /** Optional button under the questions, e.g. "Ask Alexandra a Question". */
  cta?: { label: string; href: string };
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="faq" id={id}>
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2 h2--sub">{title}</h2>
        </div>
        <div className="faq__list reveal" style={{ "--d": ".08s" } as CSSProperties}>
          {items.map((f, i) => (
            <details className="faq__item" key={f.q} open={i === 0}>
              <summary>
                {f.q}
                <span className="faq__plus" aria-hidden="true" />
              </summary>
              <div className="faq__body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
        {cta && (
          <div className="faq__cta reveal">
            <Link className="btn btn--outline-moss" href={cta.href}>{cta.label}</Link>
          </div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
