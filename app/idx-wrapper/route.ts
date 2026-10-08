import { AGENT } from "../site";
import {
  DRAWER_GROUPS,
  DRAWER_GROUPS_2,
  DRAWER_ITEMS_END,
  DRAWER_ITEMS_MID,
  PRIMARY_LINKS,
  FOOTER_EXPLORE,
  FOOTER_RESOURCES,
  type DrawerGroup,
  type NavLink,
} from "../components/nav";

/* /idx-wrapper — the page IDX Broker wraps its MLS pages in.

   IDX Broker serves the MLS search, results, listing details, saved searches
   and sign-up on its own domain (seda2.idxbroker.com). Its "dynamic wrapper"
   fetches this page, keeps everything outside the two marker divs below
   (#idxStart / #idxStop), and puts its own content between them — so every
   IDX page carries this site's header, side menu and footer.

   Set it in IDX Broker: Design → Website → Wrappers → Global wrapper →
   Dynamic Wrapper URL = https://<this site>/idx-wrapper

   Written as plain HTML rather than a React page on purpose:
   - Every URL is absolute. The HTML is served from IDX's domain, where a
     relative "/about" or "/assets/logo.png" would point at idxbroker.com.
   - No Next.js runtime. Its scripts load relative to this site and would try
     to hydrate a page they didn't render.
   - The styles are a scoped copy (public/idx/wrapper.css), so they don't
     restyle IDX's own markup.
   The links come from app/components/nav.ts, the same lists the site's own
   Header and Footer read, so the two can't drift apart.

   public/idx-wrapper.html is a saved copy of this page's output, made the
   same way Stefanie's site does it: a plain file, which IDX fetches more
   reliably than a function. IDX points at that file. After changing the menus
   or footer, run `npm run idx:wrapper` with the dev server up to refresh it.

   Kept out of search results with an X-Robots-Tag header — not a robots
   meta tag, which IDX would copy onto every MLS page it wraps. */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CHEVRON =
  '<svg class="drawer__chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none"><path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const tel = (n: string) => n.replace(/[^+\d]/g, "");
const pretty = (n: string) => n.replace(/^\+1-?/, "").replace(/^(\d{3})-(\d{3})-(\d{4})$/, "($1) $2-$3");

export async function GET(request: Request) {
  // Whatever domain IDX fetched this from — the site's real domain once it
  // has one (aklahomes.com).
  const origin = new URL(request.url).origin;
  const abs = (href: string) => (/^(https?:|mailto:|tel:|#)/.test(href) ? href : `${origin}${href}`);
  const a = (l: NavLink, cls = "") =>
    `<a${cls ? ` class="${cls}"` : ""} href="${esc(abs(l.href))}"${l.disabled ? ' aria-disabled="true"' : ""}>${esc(l.t)}</a>`;
  const group = (g: DrawerGroup) => `
        <div class="drawer__group">
          <button class="drawer__item drawer__toggle" type="button" aria-expanded="false">${esc(g.label)}${CHEVRON}</button>
          <div class="drawer__sub">${g.sub.map((s) => a(s)).join("")}</div>
        </div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(AGENT.name)} — Los Angeles Real Estate | Search the MLS</title>
<link rel="icon" href="${origin}/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${origin}/idx/wrapper.css?v=1">
</head>
<body class="ak-idx">
<header class="ak-shell nav" id="top">
  <div class="nav__inner">
    <a class="nav__logo" href="${origin}/" aria-label="${esc(AGENT.name)} — Home"><img class="nav__logo-img" src="${origin}/assets/logo-white.png" alt="${esc(AGENT.name)} — AK monogram"></a>
    <nav class="nav__links" aria-label="Primary">${PRIMARY_LINKS.map((l) => a(l)).join("")}</nav>
    <a class="btn btn--outline-light nav__cta" href="${origin}/contact">Let&rsquo;s Connect</a>
    <button class="nav__burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="akSideMenu"><span></span><span></span><span></span></button>
  </div>
</header>

<div class="ak-shell drawer" id="akSideMenu" hidden>
  <div class="drawer__backdrop" data-drawer-close aria-hidden="true"></div>
  <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Site menu">
    <button class="drawer__close" type="button" data-drawer-close aria-label="Close menu"><svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none"><path d="M3 3l16 16M19 3L3 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
    <nav class="drawer__nav" aria-label="Full menu">
      <a class="drawer__item" href="${origin}/">Home</a>${DRAWER_GROUPS.map(group).join("")}
      ${DRAWER_ITEMS_MID.map((l) => a(l, "drawer__item")).join("\n      ")}${DRAWER_GROUPS_2.map(group).join("")}
      ${DRAWER_ITEMS_END.map((l) => a(l, "drawer__item")).join("\n      ")}
    </nav>
  </aside>
</div>

<main class="ak-idx-main" id="main">
  <div class="ak-idx-content">
    <div id="idxStart"></div>
    <div id="idxStop"></div>
  </div>
</main>

<footer class="ak-shell footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <img class="footer__logo" src="${origin}/assets/logo-white.png" alt="${esc(AGENT.name)} — AK monogram logo">
      <p class="footer__name">${esc(AGENT.name)}</p>
      <p class="footer__title">${esc(AGENT.jobTitle)}</p>
      <address class="footer__contact">
        <a href="tel:${tel(AGENT.phone)}">${pretty(AGENT.phone)}</a>
        <span class="footer__dre">DRE# ${AGENT.license}</span>
        <a href="mailto:${AGENT.email}">${AGENT.email}</a>
        <a href="${AGENT.instagram}" rel="noopener">@alexandrakerrlarealestate</a>
      </address>
    </div>
    <nav class="footer__col" aria-label="Explore"><h3>Explore</h3>${FOOTER_EXPLORE.map((l) => a(l)).join("")}</nav>
    <nav class="footer__col" aria-label="Resources"><h3>Resources</h3>${FOOTER_RESOURCES.map((l) => a(l)).join("")}</nav>
    <div class="footer__col footer__office">
      <h3>Office</h3>
      <img class="footer__compass" src="${origin}/assets/compass-white.png" alt="Compass">
      <address class="footer__office-addr">
        ${esc(AGENT.office.street)}<br>
        ${esc(AGENT.office.city)}, ${AGENT.office.region} ${AGENT.office.postalCode}<br>
        <a href="tel:${tel(AGENT.office.phone)}">${pretty(AGENT.office.phone)}</a>
      </address>
      <div class="footer__badges" aria-label="Affiliations"><span>REALTOR®</span><span>EQUAL HOUSING</span><span>DRE# ${AGENT.license}</span></div>
    </div>
  </div>
  <div class="container footer__legal">
    <p>© ${new Date().getFullYear()} ${esc(AGENT.name)} · DRE# ${AGENT.license}. ${esc(AGENT.name)} is a real estate agent affiliated with Compass, a licensed real estate broker, and abides by Equal Housing Opportunity laws. All material presented herein is intended for informational purposes only and is compiled from sources deemed reliable but has not been verified.</p>
    <p class="footer__credit">Site by EM Creative Studio</p>
  </div>
</footer>

<script>
(function () {
  var burger = document.querySelector(".ak-shell .nav__burger");
  var drawer = document.getElementById("akSideMenu");
  if (!burger || !drawer) return;
  function open() {
    drawer.hidden = false;
    void drawer.offsetHeight;
    drawer.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function close() {
    drawer.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(function () { drawer.hidden = true; }, 300);
  }
  burger.addEventListener("click", open);
  drawer.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-drawer-close]")) return close();
    var toggle = t.closest(".drawer__toggle");
    if (toggle) {
      var g = toggle.parentElement;
      var on = !g.classList.contains("is-open");
      g.classList.toggle("is-open", on);
      toggle.setAttribute("aria-expanded", on ? "true" : "false");
    }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !drawer.hidden) close(); });
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, follow",
      // IDX re-fetches the wrapper on its own schedule; a short cache keeps
      // menu changes reaching the MLS pages quickly.
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
}
