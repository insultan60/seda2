"use client";

import { useEffect } from "react";

/**
 * Homepage interactions ported from the original js/main.js:
 * nav-solid-on-scroll, side drawer + accordions, eased stat counters,
 * scroll reveals, testimonial carousel, image fallback, and newsletter validation.
 * Runs once on mount and wires listeners onto the server-rendered DOM.
 */
export default function Effects() {
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

    /* ---------- Nav: solid on scroll ---------- */
    const nav = document.querySelector(".nav");
    const syncNav = () => nav?.classList.toggle("is-solid", window.scrollY > 40);
    add(window, "scroll", syncNav, { passive: true });
    syncNav();

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

    /* ---------- Scroll reveals + counters ---------- */
    let pendingReveals = [...document.querySelectorAll<HTMLElement>(".reveal")];
    let pendingStats = [...document.querySelectorAll<HTMLElement>(".stat__num")];
    const checkInView = () => {
      const limit = window.innerHeight - 60;
      pendingReveals = pendingReveals.filter((el) => {
        if (el.getBoundingClientRect().top < limit) { el.classList.add("is-in"); return false; }
        return true;
      });
      pendingStats = pendingStats.filter((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) { animateCount(el); return false; }
        return true;
      });
    };
    if (prefersReduced) {
      pendingReveals.forEach((el) => el.classList.add("is-in"));
      pendingStats.forEach((el) => animateCount(el));
      pendingReveals = [];
      pendingStats = [];
    } else {
      let ticking = false;
      const onScroll = () => {
        if (ticking || (!pendingReveals.length && !pendingStats.length)) return;
        ticking = true;
        requestAnimationFrame(() => { checkInView(); ticking = false; });
      };
      add(window, "scroll", onScroll, { passive: true });
      add(window, "resize", onScroll, { passive: true });
      checkInView();
    }

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

    /* ---------- Newsletter form (frontend-only mockup) ---------- */
    const form = document.querySelector<HTMLFormElement>(".newsletter__form");
    if (form) {
      add(form, "submit", (e) => {
        e.preventDefault();
        const emailField = form.querySelector<HTMLInputElement>("#nl-email");
        if (!emailField) return;
        const fieldWrap = emailField.closest(".field");
        const error = fieldWrap?.querySelector<HTMLElement>(".field__error");
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
        fieldWrap?.classList.toggle("is-error", !valid);
        if (error) error.hidden = valid;
        if (!valid) { emailField.focus(); return; }
        const btn = form.querySelector<HTMLButtonElement>(".newsletter__submit");
        if (btn) { btn.textContent = "Signed Up ✓"; btn.disabled = true; }
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
