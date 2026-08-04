"use client";

import { useState, useTransition } from "react";
import { submitLead } from "../actions/lead";

/* A valuation request needs somewhere to send the answer, so this asks for an
   email alongside the address. It previously collected an address alone, said
   "a valuation is being prepared", and sent nothing anywhere — meaning even if
   it had sent, there was no way to reply. */
export default function ValuationSearch() {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [ok, setOk] = useState<boolean | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;

    if (!address.trim()) {
      setOk(false);
      setStatus("Please enter your property address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setOk(false);
      setStatus("Please add an email address so Alexandra can send the valuation.");
      return;
    }

    setStatus("");
    setOk(null);
    startTransition(async () => {
      const res = await submitLead({ kind: "valuation", address, email, company });
      setOk(res.ok);
      setStatus(res.message);
      if (res.ok) {
        setAddress("");
        setEmail("");
      }
    });
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
            disabled={pending}
          />
        </div>
        <div className="hv-search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          <input
            type="email"
            placeholder="Your email address…"
            aria-label="Your email address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
          />
        </div>

        {/* Honeypot — see ContactForm. */}
        <div className="ck-form__hp" aria-hidden="true">
          <label htmlFor="hv-company">Company</label>
          <input id="hv-company" type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>

        <button type="submit" className="btn btn--solid-light" disabled={pending}>
          {pending ? "Sending…" : "Get a Free Valuation"}
        </button>
      </form>
      <p className={`hv-search-status${ok === false ? " is-error" : ""}`} role="status" aria-live="polite">
        {status}
      </p>
    </>
  );
}
