import { decodePhotoId, fetchPhoto } from "../../../properties/photoProxy";

/* /api/photo/<base64url of an MLS photo URL> — see app/properties/photoProxy.ts. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const url = decodePhotoId(id);
  if (!url) return new Response(null, { status: 400 });

  const photo = await fetchPhoto(url);
  if (!photo.ok) return new Response(null, { status: photo.status === 404 ? 404 : 502 });

  return new Response(photo.body, {
    headers: {
      "Content-Type": photo.contentType,
      // MLS photo URLs are stable per image, so this is safe to cache hard.
      "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
    },
  });
}
