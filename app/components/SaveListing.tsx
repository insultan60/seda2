"use client";

import Link from "next/link";
import { useFavorites } from "../my-search-portal/useFavorites";

const Heart = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

/**
 * Star a listing into the local Search Portal. Renders a stable, unsaved shell
 * until localStorage has been read so the server and first client render agree.
 */
export default function SaveListing({ slug, addr }: { slug: string; addr: string }) {
  const { has, toggle, ready } = useFavorites();
  const saved = ready && has(slug);

  return (
    <div className="save-row">
      <button
        className={`save-btn${saved ? " is-saved" : ""}`}
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${addr} from saved homes` : `Save ${addr} to my search portal`}
      >
        <Heart filled={saved} />
        {saved ? "Saved" : "Save this home"}
      </button>
      {saved && (
        <Link className="save-row__link" href="/my-search-portal">
          View my portal
        </Link>
      )}
    </div>
  );
}
