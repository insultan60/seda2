"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide interactions ported from the original js/main.js: side drawer +
 * accordions, eased stat counters, testimonial carousel, and image fallback.
 *
 * Everything here is enhancement — nothing the page needs in order to be
 * readable may live in this file, because it cannot run until the client bundle
 * has hydrated. Scroll reveals used to be here and gated all below-hero content
 * on that; they now run from app/reveal-bootstrap.ts in the document head.
 *
 * Re-runs on every route change. This component sits in the root layout, so it
 * never unmounts during client-side navigation — with an empty dep array it
 * would query the DOM once and hold a stale element list, wiring the drawer and
 * carousel to elements that no longer exist. Keying on the pathname re-queries
 * and re-wires against the new DOM.
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(location.search).has("static");

    const cleanups: Array<() => void> = [];
    const add = (
      t: Window | Document | HTMLElement,
      type: string,
      h: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      t.addEventListener(type, h, opts);
      cleanups.push(() => t.removeEventListener(type, h, opts));
    };

    /* ---------- Image fallback: AK monogram on clay ---------- */
    const AK_FALLBACK =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
           <rect width="800" height="600" fill="#CBBBA0"/>
           <rect x="330" y="230" width="140" height="140" fill="none" stroke="#4F5847" stroke-width="2"/>
           <text x="400" y="325" font-family="Georgia, 'Times New Roman', serif" font-size="72"
                 fill="#4F5847" text-anchor="middle" dominant-baseline="middle">AK</text>
         </svg>`
      );
    const akFallback = (img: HTMLImageElement) => {
      img.onerror = null;
      img.src = AK_FALLBACK;
    };
    document.querySelectorAll<HTMLImageElement>("img[data-fallback]").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) akFallback(img);
      else img.addEventListener("error", () => akFallback(img), { once: true });
    });

    /* ---------- Hero video: honor reduced motion ---------- */
    const heroVideo = document.querySelector<HTMLVideoElement>(".hero video");
    if (heroVideo && prefersReduced) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
      heroVideo.load();
    }

    /* ---------- Side drawer ---------- */
    const burger = document.querySelector<HTMLButtonElement>(".nav__burger");
    const drawer = document.getElementById("sideMenu");
    const drawerClose = drawer?.querySelector<HTMLButtonElement>(".drawer__close");
    let lastFocus: HTMLElement | null = null;

    const openDrawer = () => {
      if (!drawer) return;
      lastFocus = document.activeElement as HTMLElement;
      drawer.hidden = false;
      void drawer.offsetHeight; // reflow so the slide-in transition runs
      drawer.classList.add("is-open");
      document.body.style.overflow = "hidden";
      burger?.setAttribute("aria-expanded", "true");
      drawerClose?.focus();
    };
    const closeDrawer = () => {
      if (!drawer) return;
      drawer.classList.remove("is-open");
      document.body.style.overflow = "";
      burger?.setAttribute("aria-expanded", "false");
      window.setTimeout(() => { drawer.hidden = true; }, prefersReduced ? 0 : 300);
      lastFocus?.focus();
    };

    if (burger) add(burger, "click", openDrawer);
    if (drawer)
      add(drawer, "click", (e) => {
        const target = e.target as HTMLElement;
        if (target.closest("[data-drawer-close]")) { closeDrawer(); return; }
        const link = target.closest("a");
        if (!link) return;
        if (link.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }
        closeDrawer();
      });
    add(document, "keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape" && drawer && !drawer.hidden) closeDrawer();
    });

    drawer?.querySelectorAll<HTMLButtonElement>(".drawer__toggle").forEach((btn) => {
      add(btn, "click", () => {
        const group = btn.closest(".drawer__group");
        const open = group?.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(!!open));
      });
    });

    /* ---------- Eased stat counters ---------- */
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
    const animateCount = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const format = (n: number) => prefix + n.toLocaleString("en-US") + suffix;
      if (prefersReduced) { el.textContent = format(target); return; }
      const duration = 1500;
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = format(Math.round(easeOutQuint(t) * target));
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    /* ---------- Stat counters ----------
       Scroll reveals are NOT handled here — they run from the inline head
       script (app/reveal-bootstrap.ts) so that content is never waiting on this
       bundle to hydrate. Only the count-up stays, because it is pure decoration:
       the final figure is server-rendered, so a visitor who never gets this far
       reads the correct number, just without it ticking up. */
    const stats = [...document.querySelectorAll<HTMLElement>(".stat__num")];
    if (prefersReduced || !("IntersectionObserver" in window)) {
      stats.forEach((el) => animateCount(el)); // writes the final value outright
    } else if (stats.length) {
      const statIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            animateCount(e.target as HTMLElement);
            statIO.unobserve(e.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      stats.forEach((el) => {
        /* Park at zero first. The stats sit inside a `.reveal` block that is
           still faded out at this point, so the swap is invisible — without it
           the server-rendered figure would snap back to 0 in front of the
           visitor the moment the bar scrolled into view. */
        el.textContent = (el.dataset.prefix || "") + "0" + (el.dataset.suffix || "");
        statIO.observe(el);
      });
      cleanups.push(() => statIO.disconnect());
    }

    /* Hydration can re-render the server markup and drop the `is-in` classes the
       bootstrap already applied. Now that React has settled, have it re-check. */
    window.dispatchEvent(new Event("reveal:rescan"));

    /* ---------- Testimonial carousel ---------- */
    const carousel = document.querySelector(".carousel");
    if (carousel) {
      const slides = [...carousel.querySelectorAll(".carousel__slide")];
      const dotsWrap = carousel.querySelector(".carousel__dots");
      let index = 0;
      let timer: ReturnType<typeof setInterval> | null = null;

      const goTo = (i: number) => {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, j) => s.classList.toggle("is-active", j === index));
        dots.forEach((d, j) => d.setAttribute("aria-selected", String(j === index)));
      };
      const restart = () => {
        if (prefersReduced) return;
        if (timer) clearInterval(timer);
        timer = setInterval(() => goTo(index + 1), 6000);
      };

      // dots are created imperatively, so clear any from a previous run
      if (dotsWrap) dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Testimonial ${i + 1} of ${slides.length}`);
        dot.setAttribute("aria-selected", String(i === 0));
        dot.addEventListener("click", () => { goTo(i); restart(); });
        dotsWrap?.appendChild(dot);
      });
      const dots = dotsWrap ? [...dotsWrap.children] : [];

      carousel.querySelectorAll<HTMLButtonElement>(".carousel__btn").forEach((btn) => {
        add(btn, "click", () => { goTo(index + Number(btn.dataset.dir)); restart(); });
      });
      add(carousel as HTMLElement, "pointerenter", () => { if (timer) clearInterval(timer); });
      add(carousel as HTMLElement, "pointerleave", restart);
      add(document, "visibilitychange", () => {
        if (document.hidden) { if (timer) clearInterval(timer); } else restart();
      });
      restart();
      cleanups.push(() => { if (timer) clearInterval(timer); });
    }

    /* Newsletter validation lives in <NewsletterForm />, which owns that markup. */

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
  }, [pathname]);

  return null;
}
