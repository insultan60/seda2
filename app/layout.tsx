import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Effects from "./components/Effects";
import RouteProgress from "./components/RouteProgress";

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

export const metadata: Metadata = {
  title: "Alexandra Kerr — Los Angeles Real Estate | Homes with Character",
  description:
    "Alexandra Kerr, REALTOR® & Estates Director. Specialist in Los Angeles homes with character, history, and distinctive architecture. Compass. DRE# 01911486.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-scroll-behavior` tells Next the smooth scrolling in globals.css is
    // intentional, so it suppresses it during route transitions instead of
    // animating the jump to the top of each new page.
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <RouteProgress />
        <Header />
        {children}
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
