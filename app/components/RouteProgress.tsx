"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A top-of-page progress bar for client-side navigation.
 *
 * Next's App Router streams pages in, so a click on a slow route can leave the
 * old page on screen with no feedback at all — it reads as an unresponsive
 * link. This listens for clicks on internal links and shows a bar until the
 * pathname actually changes.
 *
 * The bar is deliberately not shown for fast navigations: it waits ~140ms
 * before appearing, so instant routes never get a distracting flash. It creeps
 * asymptotically toward 90% rather than pretending to know real progress, then
 * snaps to 100% and fades when the new route commits.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);

  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const creepTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const target = useRef<string | null>(null);

  /* ---------- start on internal link clicks ---------- */
  useEffect(() => {
    const clearTimers = () => {
      if (showTimer.current) clearTimeout(showTimer.current);
      if (creepTimer.current) clearInterval(creepTimer.current);
    };

    function onClick(e: MouseEvent) {
      // Let the browser handle modified clicks and anything not a plain left-click.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || a.hasAttribute("download") || a.getAttribute("aria-disabled") === "true") return;
      if (a.target && a.target !== "_self") return;
      // External, mail, tel, and same-page anchors never trigger a route change.
      if (/^(https?:)?\/\//i.test(href) && !href.startsWith(window.location.origin)) return;
      if (/^(mailto:|tel:|#)/i.test(href)) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same path with only a hash change scrolls; it does not navigate.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      target.current = url.pathname;
      clearTimers();

      showTimer.current = setTimeout(() => {
        setVisible(true);
        setPct(12);
        creepTimer.current = setInterval(() => {
          // Ease toward 90 and stop — the last 10% belongs to the real commit.
          setPct((p) => (p >= 90 ? p : p + Math.max(0.4, (90 - p) * 0.06)));
        }, 90);
      }, 140);
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
  }, []);

  /* ---------- finish when the route commits ---------- */
  useEffect(() => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (creepTimer.current) clearInterval(creepTimer.current);
    if (doneTimer.current) clearTimeout(doneTimer.current);
    target.current = null;

    if (!visible) return;
    setPct(100);
    doneTimer.current = setTimeout(() => {
      setVisible(false);
      setPct(0);
    }, 320);
    // Intentionally keyed to pathname only: this is the "navigation committed"
    // signal. Re-running on `visible` would cancel the bar the moment it appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={`route-progress${visible ? " is-active" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={visible ? "Loading page" : undefined}
    >
      <span className="route-progress__bar" style={{ width: `${pct}%` }} />
      <span className="sr-only">{visible ? "Loading page…" : ""}</span>
    </div>
  );
}
