"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ak:favorites";
const EVENT = "ak:favorites-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    // Private-mode or corrupted value — degrade to "nothing saved" rather than throw.
    return [];
  }
}

function write(slugs: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* Storage unavailable; the in-memory state still works for this session. */
  }
  // Same-tab listeners: `storage` only fires in *other* tabs, so broadcast too.
  window.dispatchEvent(new CustomEvent(EVENT));
}

/**
 * Favorites are kept in localStorage. There is no account system on this site,
 * so rather than mock a signed-in dashboard with invented saved homes, the
 * portal remembers what this browser has actually starred. It is honest about
 * being device-local, and it works today without a backend.
 */
export function useFavorites() {
  const [slugs, setSlugs] = useState<string[]>([]);
  // Server render and first client render must match, so the real list is only
  // read after mount. `ready` lets the UI hold its shape until then.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlugs(read());
    setReady(true);
    const sync = () => setSlugs(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const next = read();
    const i = next.indexOf(slug);
    if (i === -1) next.unshift(slug);
    else next.splice(i, 1);
    write(next);
    setSlugs(next);
  }, []);

  const remove = useCallback((slug: string) => {
    const next = read().filter((s) => s !== slug);
    write(next);
    setSlugs(next);
  }, []);

  const clear = useCallback(() => {
    write([]);
    setSlugs([]);
  }, []);

  return { slugs, ready, toggle, remove, clear, has: (s: string) => slugs.includes(s) };
}
