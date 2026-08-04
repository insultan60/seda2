"use client";

import { useState, useTransition } from "react";
import { submitLead } from "../actions/lead";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setEmailError(!isEmailValid);
    if (!isEmailValid) return;

    setStatus("");
    startTransition(async () => {
      const res = await submitLead({ kind: "newsletter", name, email, company });
      /* Only latch to the signed-up state on a real send. It used to latch
         unconditionally, so "Signed Up ✓" appeared for a signup that had gone
         nowhere. */
      setSubmitted(res.ok);
      setStatus(res.message);
    });
  };

  return (
    <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="nl-name">Full Name</label>
        <input
          id="nl-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Appleseed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={submitted || pending}
        />
      </div>
      <div className={`field${emailError ? " is-error" : ""}`}>
        <label htmlFor="nl-email">Email Address</label>
        <input
          id="nl-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(false);
          }}
          required
          disabled={submitted || pending}
        />
        {emailError && (
          <p className="field__error">Please enter a valid email address so Alexandra can reach you.</p>
        )}
      </div>

      {/* Honeypot — see ContactForm. */}
      <div className="ck-form__hp" aria-hidden="true">
        <label htmlFor="nl-company">Company</label>
        <input id="nl-company" type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      <button
        className="btn btn--solid-light newsletter__submit"
        type="submit"
        disabled={submitted || pending}
      >
        {submitted ? "Signed Up ✓" : pending ? "Signing Up…" : "Sign Up"}
      </button>
      <p className="newsletter__fine" role="status" aria-live="polite">
        {status || "No spam, unsubscribe anytime."}
      </p>
    </form>
  );
}
