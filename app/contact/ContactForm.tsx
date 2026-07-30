"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!form.name.trim() || !emailOk) {
      setStatus("Please add your name and a valid email address.");
      return;
    }
    setStatus(`Thank you, ${form.name.trim().split(" ")[0]} — Alexandra will be in touch shortly.`);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form className="ck-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="ck-name">Full Name</label>
        <input id="ck-name" type="text" autoComplete="name" placeholder="Jane Appleseed" value={form.name} onChange={(e) => set("name", e.target.value)} />
      </div>
      <div className="ck-form__row">
        <div className="field">
          <label htmlFor="ck-email">Email</label>
          <input id="ck-email" type="email" autoComplete="email" placeholder="jane@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ck-phone">Phone</label>
          <input id="ck-phone" type="tel" autoComplete="tel" placeholder="(310) 000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="ck-message">How can Alexandra help?</label>
        <textarea id="ck-message" rows={5} placeholder="I'd like to talk about buying, selling, or a valuation…" value={form.message} onChange={(e) => set("message", e.target.value)} />
      </div>
      <button className="btn btn--solid-moss" type="submit">Send Message</button>
      <p className="ck-form__status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
