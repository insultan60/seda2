/**
 * Scroll-reveal bootstrap, injected as a blocking inline <script> in <head>.
 *
 * Why this isn't in Effects.tsx with the rest of the interactions:
 * `.reveal` starts at opacity 0, so until something adds `is-in` the section is
 * invisible. When that "something" was a useEffect, every section below the
 * hero stayed blank until the client bundle had downloaded, parsed and
 * hydrated — imperceptible on localhost, a multi-second white page on a real
 * connection, and permanent if the bundle ever failed to load. Heroes have no
 * `.reveal`, which is why they appeared while everything under them did not.
 *
 * Running here instead, the reveal is wired up before the browser paints and
 * without waiting on React. Two consequences worth keeping in mind:
 *
 *   1. The hidden state is opt-in. This script adds `js-reveal` to <html> and
 *      globals.css only hides `.reveal` under that class, so if this code never
 *      runs — JS disabled, script blocked, an exception below — the page simply
 *      renders visible rather than blank. Never hide `.reveal` unconditionally.
 *   2. Elements are observed as the parser appends them, so sections reveal
 *      during page load, and client-side route changes are picked up too.
 */
export const REVEAL_BOOTSTRAP = `
(function () {
  var root = document.documentElement;
  try {
    /* Honor reduced motion and the ?static escape hatch by simply not hiding
       anything — no class, no observer, content visible from the first paint. */
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      /[?&]static(?:[=&]|$)/.test(location.search) ||
      !("IntersectionObserver" in window)
    ) return;

    /* -60px bottom inset matches the old "innerHeight - 60" scroll threshold,
       so elements still trip just before they reach the viewport edge. */
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-in");
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: "0px 0px -60px 0px" });

    var bound = new WeakSet();
    var scan = function () {
      var els = document.getElementsByClassName("reveal");
      for (var i = 0; i < els.length; i++) {
        if (!bound.has(els[i])) { bound.add(els[i]); io.observe(els[i]); }
      }
    };

    var queued = false;
    var schedule = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; scan(); });
    };

    /* Catches sections as the HTML parser appends them and, later, the DOM that
       client-side navigation swaps in. */
    new MutationObserver(schedule).observe(root, { childList: true, subtree: true });

    /* Hydration can re-render server markup and take the is-in classes with it.
       Effects.tsx fires this once React has settled so we can re-check. */
    window.addEventListener("reveal:rescan", function () {
      bound = new WeakSet();
      scan();
    });

    root.className += " js-reveal";
    schedule();
  } catch (err) {
    /* Something above is unsupported: drop the hidden state and show the page. */
    root.className = root.className.replace(/(^|\\s)js-reveal(?=\\s|$)/, "");
  }
})();
`;
