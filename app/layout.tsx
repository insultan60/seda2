import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Effects from "./components/Effects";
import Cursor from "./components/Cursor";
import RouteProgress from "./components/RouteProgress";
import { REVEAL_BOOTSTRAP } from "./reveal-bootstrap";
import { AGENT, SITE_NAME, SITE_URL } from "./site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dmsans",
  display: "swap",
});

const DESCRIPTION =
  "Alexandra Kerr, REALTOR® & Estates Director. Specialist in Los Angeles homes with character, history, and distinctive architecture. Compass. DRE# 01911486.";

export const metadata: Metadata = {
  /* Everything relative in the metadata below — canonicals, the OG card — is
     resolved against this. Without it Next emits relative URLs that scrapers
     cannot follow, which is why no link preview worked before. The domain
     itself comes from NEXT_PUBLIC_SITE_URL; see app/site.ts. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alexandra Kerr — Los Angeles Real Estate | Homes with Character",
    /* Page titles already end in "— Alexandra Kerr", so no template suffix
       here would double it up. */
    template: "%s",
  },
  description: DESCRIPTION,
  /* No canonical or og:url here. Layout metadata is inherited by every page
     that does not set its own, so the "/" that used to sit here told Google
     every inner page was a copy of the home page. Each page declares its own
     canonical; app/page.tsx carries "/". */
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Alexandra Kerr — Los Angeles Real Estate | Homes with Character",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandra Kerr — Los Angeles Real Estate",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  /* Search Console ownership: renders as
     <meta name="google-site-verification" content="..."> on every page. */
  verification: { google: "yA1BPStqlZDl7HARpvmrtmsTa355-Xv6WgS1pS6X-Y4" },
};

/* Structured data — this is what puts an agent in the local/knowledge results
   rather than leaving Google to infer everything from the page copy. Kept in
   sync with app/site.ts so the phone number and licence exist in exactly one
   place. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#agent`,
  name: AGENT.name,
  jobTitle: AGENT.jobTitle,
  url: SITE_URL,
  image: `${SITE_URL}/assets/alexandra-headshot.jpg`,
  telephone: AGENT.phone,
  email: `mailto:${AGENT.email}`,
  sameAs: [AGENT.instagram],
  parentOrganization: { "@type": "Organization", name: AGENT.brokerage },
  address: {
    "@type": "PostalAddress",
    streetAddress: AGENT.office.street,
    addressLocality: AGENT.office.city,
    addressRegion: AGENT.office.region,
    postalCode: AGENT.office.postalCode,
    addressCountry: AGENT.office.country,
  },
  areaServed: AGENT.areas.map((name) => ({ "@type": "Place", name })),
  /* The licence, in the field Google actually reads for it. */
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Real Estate License",
    identifier: `DRE# ${AGENT.license}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-scroll-behavior` tells Next the smooth scrolling in globals.css is
    // intentional, so it suppresses it during route transitions instead of
    // animating the jump to the top of each new page.
    // suppressHydrationWarning: the reveal bootstrap below adds .js-reveal to
    // <html> during parse, before React hydrates, so React saw a class it never
    // rendered and reported a mismatch on every page load. The flag covers this
    // element's own attributes only; anything below it is still checked.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Must stay a blocking inline script in <head>: it arms the scroll
            reveals before the first paint, so sections are never gated on the
            client bundle hydrating. See app/reveal-bootstrap.ts. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <RouteProgress />
        <Header />
        {children}
        <Footer />
        <Effects />
        <Cursor />
      </body>
    </html>
  );
}
