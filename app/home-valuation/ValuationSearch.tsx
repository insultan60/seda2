"use client";

import { useState } from "react";

export default function ValuationSearch() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setStatus("Please enter your property address.");
      return;
    }
    setStatus(
      `Thank you — a valuation for ${address.trim()} is being prepared. Alexandra will be in touch shortly.`,
    );
    setAddress("");
  };

  return (
    <>
      <form className="hv-searchbar" onSubmit={submit} noValidate>
        <div className="hv-search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            placeholder="Enter your home address…"
            aria-label="Enter your home address"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--solid-light">
          Get a Free Valuation
        </button>
      </form>
      <p className="hv-search-status" role="status" aria-live="polite">
        {status}
      </p>
    </>
  );
}
