"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DRAWER_GROUPS,
  DRAWER_GROUPS_2,
  DRAWER_ITEMS_END,
  DRAWER_ITEMS_MID,
  PRIMARY_LINKS,
  isExternal,
} from "./nav";

const Chevron = () => (
  <svg className="drawer__chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Routes that open on a full-bleed image hero — the nav rides transparent over
// them until the user scrolls. Everywhere else it stays solid from the start.
const HERO_ROUTES = ["/", "/properties", "/journal"];

export default function Header() {
  const pathname = usePathname();
  // Listing pages open on a full-bleed photo gallery too.
  const overHero = HERO_ROUTES.includes(pathname) || pathname.startsWith("/properties/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overHero || scrolled;

  return (
    <>
      <header className={`nav${solid ? " is-solid" : ""}`} id="top">
        <div className="nav__inner">
          <Link className="nav__logo" href="/" aria-label="Alexandra Kerr — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="nav__logo-img" src="/assets/logo-white.png" alt="Alexandra Kerr — AK monogram" />
          </Link>
          <nav className="nav__links" aria-label="Primary">
            {PRIMARY_LINKS.map((l) =>
              isExternal(l.href) ? (
                <a key={l.t} href={l.href}>{l.t}</a>
              ) : (
                <Link key={l.t} href={l.href}>{l.t}</Link>
              ),
            )}
          </nav>
          <Link className="btn btn--outline-light nav__cta" href="/contact">Let&rsquo;s Connect</Link>
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
            <Link className="drawer__item" href="/">Home</Link>
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
            {DRAWER_ITEMS_MID.map((l) => (
              <Link key={l.t} className="drawer__item" href={l.href}>{l.t}</Link>
            ))}
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
            {DRAWER_ITEMS_END.map((l) =>
              isExternal(l.href) ? (
                <a key={l.t} className="drawer__item" href={l.href}>{l.t}</a>
              ) : (
                <Link key={l.t} className="drawer__item" href={l.href}>{l.t}</Link>
              ),
            )}
          </nav>
        </aside>
      </div>
    </>
  );
}
