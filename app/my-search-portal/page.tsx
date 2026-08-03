import type { Metadata } from "next";
import PortalClient from "./PortalClient";
import "./portal.css";

export const metadata: Metadata = {
  title: "My Search Portal — Alexandra Kerr | Saved Los Angeles Homes",
  description:
    "Your saved Los Angeles listings, kept on this device. Star any home on the site and it waits for you here — no account required.",
};

export default function SearchPortalPage() {
  return (
    <main id="main" className="mp-page">
      <section className="mp-head">
        <div className="container">
          <p className="eyebrow">Your Shortlist</p>
          <h1 className="mp-head__title">My Search Portal</h1>
          <p className="mp-head__sub">
            Every home you&rsquo;ve starred, in one place. Saved to this browser only — nothing is
            uploaded and no account is needed.
          </p>
        </div>
      </section>

      <section className="mp-body">
        <PortalClient />
      </section>
    </main>
  );
}
