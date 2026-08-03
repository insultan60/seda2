"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "ak:favorites";
const EVENT = "ak:favorites-changed";

/* The snapshot must be referentially stable between reads or useSyncExternalStore
   loops forever, so the parsed array is cached and only replaced when the
   serialized value actually changes. */
let cachedRaw: string | null = null;
let cachedList: string[] = [];
const EMPTY: string[] = [];

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // Private mode or blocked storage — behave as "nothing saved".
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedList;
  let parsed: string[] = EMPTY;
  try {
    const v = raw ? JSON.parse(raw) : [];
    parsed = Array.isArray(v) ? v.filter((s): s is string => typeof s === "string") : EMPTY;
  } catch {
    parsed = EMPTY;
  }
  cachedRaw = raw;
  cachedList = parsed;
  return parsed;
}

function write(slugs: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* Storage unavailable — nothing to persist, but the event still fires so
       any mounted view re-reads and stays consistent within the session. */
  }
  // `storage` only fires in *other* tabs, so same-tab listeners need this.
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/* The server has no localStorage, so it renders the empty list. React swaps in
   the real client snapshot after hydration without a mismatch warning. */
const serverSnapshot = () => EMPTY;

/**
 * Favorites live in localStorage. There is no account system on this site, so
 * rather than mock a signed-in dashboard with invented saved homes, the portal
 * remembers what this browser has actually starred — honest about being
 * device-local, and working today without a backend.
 */
export function useFavorites() {
  const slugs = useSyncExternalStore(subscribe, read, serverSnapshot);

  const toggle = useCallback((slug: string) => {
    const next = [...read()];
    const i = next.indexOf(slug);
    if (i === -1) next.unshift(slug);
    else next.splice(i, 1);
    write(next);
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  /* `ready` is false during SSR and the first client render, when the snapshot
     is still the empty server list. Views use it to hold their shape instead of
     flashing an empty state at someone who has homes saved. */
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return { slugs, ready, toggle, remove, clear, has };
}
