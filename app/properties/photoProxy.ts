/* MLS listing photos, served from this site instead of hotlinked.

   The MLS photo CDN (Cotality, formerly CoreLogic, behind Incapsula) answers a
   browser's direct request with 403. Fetched server-side with the referrer IDX
   Broker's own hosted pages send, it returns the image — verified from Vercel.
   (From some networks, including local development abroad, even this is
   refused; the site's image fallback covers that.)

   The photo URL travels in the PATH, base64url-encoded, not in a query string:
   Next 16's image optimizer refuses local sources with a query string unless
   each one is whitelisted, and a clean path lets MLS photos get the same
   AVIF/WebP resizing as every other card image. */

const ALLOWED_HOSTS = ["api.cotality.com", "api-trestle.corelogic.com"];
const IDX_REFERRER = "https://seda2.idxbroker.com/";

export function photoPath(url: string): string {
  return `/api/photo/${Buffer.from(url).toString("base64url")}`;
}

export function decodePhotoId(id: string): string | null {
  try {
    const url = Buffer.from(id, "base64url").toString("utf8");
    const u = new URL(url);
    return u.protocol === "https:" && ALLOWED_HOSTS.includes(u.hostname) ? url : null;
  } catch {
    return null;
  }
}

export async function fetchPhoto(url: string) {
  const upstream = await fetch(url, {
    headers: {
      Referer: IDX_REFERRER,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    },
  });
  if (!upstream.ok) return { ok: false as const, status: upstream.status };
  return {
    ok: true as const,
    contentType: upstream.headers.get("content-type") || "image/jpeg",
    body: await upstream.arrayBuffer(),
  };
}
