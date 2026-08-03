"use client";

import { useEffect, useState } from "react";

/**
 * Share targets are built from the live URL rather than hardcoded, and the copy
 * button uses the Clipboard API with a text-selection fallback for the
 * non-secure-origin case. The static design shipped these as `href="#"`; there
 * is no reason to ship a dead button when the real thing is a few lines.
 */
export default function ShareRow({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setUrl(window.location.href), []);

  const enc = encodeURIComponent;
  const share = [
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, icon: "facebook" },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, icon: "x" },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, icon: "whatsapp" },
    { label: "Share by email", href: `mailto:?subject=${enc(title)}&body=${enc(url)}`, icon: "mail" },
  ] as const;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
    } catch {
      const el = document.createElement("textarea");
      el.value = url || window.location.href;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="ar-share" aria-label="Share this article">
      {share.map((s) => (
        <a
          key={s.icon}
          className="ar-share__btn"
          href={s.href}
          aria-label={s.label}
          title={s.label}
          {...(s.icon === "mail" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          <Icon name={s.icon} />
        </a>
      ))}
      <button className="ar-share__btn" type="button" onClick={copy} aria-label="Copy link" title="Copy link">
        <Icon name={copied ? "check" : "link"} />
      </button>
      <span className="ar-share__toast" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": true as const };
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "facebook":
      return <svg {...p} fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" /></svg>;
    case "x":
      return <svg {...p} fill="currentColor"><path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z" /></svg>;
    case "whatsapp":
      return <svg {...p} fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5.2 5.2 0 0 0 3.2.6 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" /></svg>;
    case "mail":
      return <svg {...p} {...stroke}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case "check":
      return <svg {...p} {...stroke} strokeWidth={2}><path d="M20 6 9 17l-5-5" /></svg>;
    default:
      return <svg {...p} {...stroke}><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>;
  }
}
