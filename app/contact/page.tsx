import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact — Alexandra Kerr | Los Angeles Real Estate",
  description:
    "Get in touch with Alexandra Kerr — call, email, or send a message about buying, selling, relocating, or a home valuation in Los Angeles. Compass · DRE# 01911486.",
};

const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>);
const MailIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>);
const ClockIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
const PinIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const IgIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>);
const LinkedinIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a5 5 0 0 1 2-2z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>);

export default function ContactPage() {
  return (
    <main id="main">
      <section className="ck-page-head">
        <div className="container">
          <p className="eyebrow">Let&rsquo;s Talk</p>
          <h1>Contact Alexandra</h1>
          <p>Buying, selling, relocating, or simply curious about the market — reach out and start a conversation with a specialist who listens.</p>
        </div>
      </section>

      <section className="ck-contact">
        <div className="container ck-contact__grid">
          <div className="ck-contact__details reveal">
            <p className="ck-contact__team">Alexandra Kerr Team</p>

            <div className="ck-contact__item">
              <span className="ck-contact__ic"><PhoneIcon /></span>
              <div>
                <p className="ck-contact__label">Phone</p>
                <p className="ck-contact__val"><a href="tel:+13107951440">(310) 795‑1440</a></p>
              </div>
            </div>

            <div className="ck-contact__item">
              <span className="ck-contact__ic"><MailIcon /></span>
              <div>
                <p className="ck-contact__label">Email</p>
                <p className="ck-contact__val"><a href="mailto:alexandra.kerr@compass.com">alexandra.kerr@compass.com</a></p>
              </div>
            </div>

            <div className="ck-contact__item">
              <span className="ck-contact__ic"><ClockIcon /></span>
              <div>
                <p className="ck-contact__label">Open Hours</p>
                <p className="ck-contact__val">Monday – Sunday<br />8:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className="ck-contact__item">
              <span className="ck-contact__ic"><PinIcon /></span>
              <div>
                <p className="ck-contact__label">Office</p>
                <p className="ck-contact__val">6430 W Sunset Blvd, 6th Floor<br />Los Angeles, CA 90028</p>
              </div>
            </div>

            <div className="ck-contact__social" aria-label="Social links">
              <a href="https://instagram.com/alexandrakerrlarealestate" rel="noopener" aria-label="Instagram"><IgIcon /></a>
              <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            </div>

            <p className="ck-contact__licensing">
              Alexandra Kerr · REALTOR® · Estates Director · CA DRE# 01911486
              <br />
              Compass · A licensed real estate broker · Equal Housing Opportunity
            </p>
          </div>

          <div className="ck-form-card reveal" style={{ ["--d" as string]: ".1s" }}>
            <h2>Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="ck-map">
        <div className="container">
          <div className="ck-map__head reveal">
            <p className="eyebrow">Find Us</p>
            <h2>Visit the Office</h2>
            <p>6430 W Sunset Blvd, 6th Floor, Los Angeles, CA 90028</p>
          </div>
          <iframe
            className="ck-map__frame"
            title="Alexandra Kerr office location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=6430%20W%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090028&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </section>
    </main>
  );
}
