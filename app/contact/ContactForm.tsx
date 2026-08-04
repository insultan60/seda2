"use client";

import { useState, useTransition } from "react";
import { submitLead } from "../actions/lead";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  const [status, setStatus] = useState("");
  /* Tracked separately from the message so a failure can be styled and
     announced as a failure. Previously every outcome rendered identically —
     and every outcome was a success, because nothing was ever sent. */
  const [ok, setOk] = useState<boolean | null>(null);
  const [pending, startTransition] = useTransition();
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!form.name.trim() || !emailOk) {
      setOk(false);
      setStatus("Please add your name and a valid email address.");
      return;
    }

    setStatus("");
    setOk(null);
    startTransition(async () => {
      const res = await submitLead({ kind: "contact", ...form });
      setOk(res.ok);
      setStatus(res.message);
      // Only clear the form on a real send — otherwise the visitor loses what
      // they wrote and has nothing to retry with.
      if (res.ok) setForm({ name: "", email: "", phone: "", message: "", company: "" });
    });
  };

  return (
    <form className="ck-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="ck-name">Full Name</label>
        <input id="ck-name" type="text" autoComplete="name" placeholder="Jane Appleseed" value={form.name} onChange={(e) => set("name", e.target.value)} disabled={pending} />
      </div>
      <div className="ck-form__row">
        <div className="field">
          <label htmlFor="ck-email">Email</label>
          <input id="ck-email" type="email" autoComplete="email" placeholder="jane@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} disabled={pending} />
        </div>
        <div className="field">
          <label htmlFor="ck-phone">Phone</label>
          <input id="ck-phone" type="tel" autoComplete="tel" placeholder="(310) 000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} disabled={pending} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="ck-message">How can Alexandra help?</label>
        <textarea id="ck-message" rows={5} placeholder="I'd like to talk about buying, selling, or a valuation…" value={form.message} onChange={(e) => set("message", e.target.value)} disabled={pending} />
      </div>

      {/* Honeypot — off-screen and hidden from assistive tech. Bots fill it in,
          people never see it. Checked server-side in submitLead. */}
      <div className="ck-form__hp" aria-hidden="true">
        <label htmlFor="ck-company">Company</label>
        <input id="ck-company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set("company", e.target.value)} />
      </div>

      <button className="btn btn--solid-moss" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </button>
      <p className={`ck-form__status${ok === false ? " is-error" : ""}`} role="status" aria-live="polite">{status}</p>
    </form>
  );
}
