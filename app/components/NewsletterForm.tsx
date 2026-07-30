"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setEmailError(!isEmailValid);
    if (!isEmailValid) {
      return;
    }
    setSubmitted(true);
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
          disabled={submitted}
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
          disabled={submitted}
        />
        {emailError && (
          <p className="field__error">Please enter a valid email address so Alexandra can reach you.</p>
        )}
      </div>
      <button
        className="btn btn--solid-light newsletter__submit"
        type="submit"
        disabled={submitted}
      >
        {submitted ? "Signed Up ✓" : "Sign Up"}
      </button>
      <p className="newsletter__fine">
        {submitted 
          ? "Thank you for signing up!" 
          : "Design mockup — form is not yet connected. No spam, unsubscribe anytime."}
      </p>
    </form>
  );
}
