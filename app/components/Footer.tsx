import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <Link href="/about">About Alexandra</Link>
          <Link href="/properties">Portfolio</Link>
          <Link href="/neighborhoods">Neighborhoods</Link>
          <Link href="/journal">Journal</Link>
        </nav>
        <nav className="footer__col" aria-label="Resources">
          <h3>Resources</h3>
          <Link href="/home-search">Home Search</Link>
          <Link href="/my-search-portal">My Search Portal</Link>
          <Link href="/relocation">Relocation</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/home-valuation">Home Valuation</Link>
          <Link href="/compass-concierge">Compass Concierge</Link>
        </nav>
        <div className="footer__col footer__office">
          <h3>Office</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
  );
}
