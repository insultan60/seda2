"use server";

import { AGENT } from "../site";

/* ============================================================================
   Lead capture.

   Every form on this site funnels through here. Before this existed the contact
   and valuation forms told the visitor "Alexandra will be in touch shortly" and
   then dropped what they typed on the floor — no email, no storage, nothing.
   Every enquiry from launch day onward was lost silently.

   Two rules this file exists to enforce:

     1. The visitor is never told they succeeded unless a send actually
        succeeded. `ok` comes from the provider's response, not from optimism.
     2. A lead is never lost quietly. If the mail provider is unreachable or
        unconfigured, the details are written to the server log at error level
        so they can be recovered from the hosting logs, and the visitor is given
        Alexandra's phone number and email rather than a false reassurance.

   ── SETUP ──────────────────────────────────────────────────────────────────
   Set these in the hosting environment (see .env.example):

     RESEND_API_KEY   API key from resend.com
     LEAD_TO_EMAIL    Inbox the leads land in (defaults to Alexandra's Compass
                      address)
     LEAD_FROM_EMAIL  A sender on a domain verified with the provider. This
                      cannot be a Gmail/Compass address — providers reject
                      unverified senders.

   Resend is the default because it is the least friction to set up on Vercel.
   Swapping to SendGrid/Postmark/SES is a change to `deliver()` alone.
   ========================================================================== */

export type LeadKind = "contact" | "valuation" | "newsletter";

export type LeadInput = {
  kind: LeadKind;
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  /** Address the visitor asked to have valued. Valuation form only. */
  address?: string;
  /** Honeypot. Real people never fill this in; bots do. */
  company?: string;
};

export type LeadResult = {
  ok: boolean;
  /** Shown to the visitor verbatim. Never claims a send that didn't happen. */
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim, cap length, and strip the header-injection characters. */
const clean = (v: string | undefined, max = 2000) =>
  (v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const FALLBACK = `Something went wrong sending your message. Please call ${AGENT.phone.replace(
  /^\+1-/,
  ""
)} or email ${AGENT.email} directly — apologies for the trouble.`;

const SUBJECTS: Record<LeadKind, string> = {
  contact: "New enquiry from alexandrakerr.com",
  valuation: "New home valuation request",
  newsletter: "New newsletter signup",
};

function composeBody(lead: LeadInput): string {
  const rows: [string, string][] = [
    ["Type", lead.kind],
    ["Name", clean(lead.name, 200)],
    ["Email", clean(lead.email, 200)],
    ["Phone", clean(lead.phone, 60)],
    ["Address", clean(lead.address, 300)],
    ["Message", clean(lead.message, 5000)],
    ["Received", new Date().toISOString()],
  ];
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

async function deliver(lead: LeadInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL ?? AGENT.email;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!key || !from) {
    // Not a crash — an unconfigured deploy is a normal state before launch.
    // Loud, and carrying the whole lead, so nothing is actually lost.
    console.error(
      "[lead] Mail is not configured (RESEND_API_KEY / LEAD_FROM_EMAIL missing). " +
        "Lead was NOT emailed. Details follow:\n" +
        composeBody(lead)
    );
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: clean(lead.email, 200),
        subject: SUBJECTS[lead.kind],
        text: composeBody(lead),
      }),
    });

    if (!res.ok) {
      console.error(
        `[lead] Provider rejected the send (${res.status} ${res.statusText}). ` +
          `Lead details follow:\n${composeBody(lead)}`
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[lead] Send threw: ${String(err)}\nLead details follow:\n${composeBody(lead)}`);
    return false;
  }
}

/* ── IDX Broker ──────────────────────────────────────────────────────────────
   Every lead is also created in Alexandra's IDX Broker account (Leads tab), so
   it lands in her CRM even when email isn't configured. A returning visitor's
   email already exists in IDX (409); we look that lead up instead. The form
   details go on the lead as a note. Uses IDX_BROKER_ACCESS_KEY. */
const IDX = "https://api.idxbroker.com";

async function idx(path: string, init?: RequestInit) {
  const key = process.env.IDX_BROKER_ACCESS_KEY;
  if (!key) return null;
  return fetch(`${IDX}/${path}`, {
    ...init,
    headers: { accesskey: key, outputtype: "json", "Content-Type": "application/x-www-form-urlencoded", ...(init?.headers ?? {}) },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
}

async function sendToIdx(lead: LeadInput): Promise<boolean> {
  try {
    const [firstName, ...rest] = clean(lead.name, 200).split(" ");
    const form = new URLSearchParams({
      firstName: firstName || "Website",
      lastName: rest.join(" ") || "Lead",
      email: clean(lead.email, 200),
    });
    if (clean(lead.phone, 60)) form.set("phone", clean(lead.phone, 60));
    if (clean(lead.address, 300)) form.set("address", clean(lead.address, 300));

    let id: string | null = null;
    const res = await idx("leads/lead", { method: "PUT", body: form.toString() });
    if (!res) return false;
    if (res.ok) {
      const j = (await res.json().catch(() => null)) as { newID?: number | string } | null;
      id = j?.newID != null ? String(j.newID) : null;
    }
    if (!id) {
      const look = await idx(`leads/lead?email=${encodeURIComponent(clean(lead.email, 200))}`);
      if (look?.ok && look.status !== 204) {
        const j = (await look.json().catch(() => null)) as { data?: { id: string; email: string }[] } | null;
        id = j?.data?.find((l) => l.email.toLowerCase() === clean(lead.email, 200).toLowerCase())?.id ?? null;
      }
    }
    if (!id) {
      console.error(`[lead] IDX did not accept the lead (${res.status}).`);
      return false;
    }
    // The note is a bonus: the lead already exists, so don't fail on it.
    await idx(`leads/note/${id}`, {
      method: "PUT",
      body: new URLSearchParams({ note: `${SUBJECTS[lead.kind]}
${composeBody(lead)}` }).toString(),
    }).catch(() => null);
    return true;
  } catch (err) {
    console.error(`[lead] IDX threw: ${String(err)}`);
    return false;
  }
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  // Silently accept-and-drop bot submissions: a bot told it failed just retries.
  if (clean(input.company, 100)) return { ok: true, message: "Thank you." };

  // Re-validated here regardless of what the client checked. The client-side
  // check is a courtesy; this one is the actual gate.
  const email = clean(input.email, 200);
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Please enter a valid email address so Alexandra can reach you." };
  }

  if (input.kind === "contact" && !clean(input.name, 200)) {
    return { ok: false, message: "Please add your name and a valid email address." };
  }
  if (input.kind === "valuation" && !clean(input.address, 300)) {
    return { ok: false, message: "Please enter your property address." };
  }

  // Email and IDX run side by side; either one landing means the lead is safe.
  const [mailed, inIdx] = await Promise.all([deliver({ ...input, email }), sendToIdx({ ...input, email })]);
  if (!mailed && !inIdx) return { ok: false, message: FALLBACK };

  const first = clean(input.name, 200).split(" ")[0];
  switch (input.kind) {
    case "valuation":
      return {
        ok: true,
        message: `Thank you — your request for ${clean(
          input.address,
          300
        )} is on its way to Alexandra. She'll be in touch shortly.`,
      };
    case "newsletter":
      return { ok: true, message: "You're on the list. Thank you for signing up." };
    default:
      return {
        ok: true,
        message: first
          ? `Thank you, ${first} — your message is with Alexandra. She'll be in touch shortly.`
          : "Thank you — your message is with Alexandra. She'll be in touch shortly.",
      };
  }
}
