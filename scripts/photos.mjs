/* Rebuild _photo-manifest.json from whatever is in public/properties/.
 *
 *   1. put the photos in  public/properties/<listing-slug>/
 *   2. npm run photos
 *
 * The slug must match the listing's `slug` in app/properties/data.ts — that is
 * the only thing tying a folder to a listing, so the script reports mismatches
 * rather than letting a typo silently produce a listing with no photos.
 *
 * File order = display order, and the first file becomes the card image. Files
 * are sorted naturally (2 before 10), so prefix them 01-, 02-… to control it.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PHOTO_DIR = join(ROOT, "public", "properties");
const MANIFEST = join(ROOT, "_photo-manifest.json");
const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;

if (!existsSync(PHOTO_DIR)) {
  console.error(`No ${PHOTO_DIR}. Create it and add one folder per listing.`);
  process.exit(1);
}

/* Slugs the site actually knows about, read straight from the data file so the
   two can't drift. Each listing block is captured whole so we can also tell
   which ones are on the placeholder — a listing with hand-built photos in
   /assets/listings needs nothing from this script, and reporting it as
   "missing photos" would send someone hunting for a problem that isn't there. */
const dataSrc = readFileSync(join(ROOT, "app", "properties", "data.ts"), "utf8");
const slugs = [...dataSrc.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

/* Each listing block is matched up to the start of the next one, so the test
   sees only that listing's own fields. Two things mean "no photo of its own":
   the AK monogram placeholder, and an `imgNote` (stock imagery standing in). */
const onPlaceholder = new Set(
  [...dataSrc.matchAll(/slug: "([^"]+)"([\s\S]*?)(?=\n  \{|\n\];)/g)]
    .filter(([, , body]) => body.includes("photo-pending") || body.includes("imgNote:"))
    .map(([, slug]) => slug),
);

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
const manifest = {};
const unknown = [];

for (const folder of readdirSync(PHOTO_DIR, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;

  const files = readdirSync(join(PHOTO_DIR, folder.name))
    .filter((f) => IMAGE_RE.test(f))
    .sort(collator.compare);

  if (!files.length) {
    console.log(`  --  ${folder.name.padEnd(24)} folder is empty, skipped`);
    continue;
  }

  manifest[folder.name] = files;
  const known = slugs.includes(folder.name);
  if (!known) unknown.push(folder.name);
  console.log(
    `  ${known ? "OK" : "??"}  ${folder.name.padEnd(24)} ${String(files.length).padStart(2)} photos` +
      (known ? "" : "   <- no listing with this slug"),
  );
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 1)}\n`);

console.log(`\nWrote ${Object.keys(manifest).length} entries to _photo-manifest.json`);

const stillWaiting = [...onPlaceholder].filter((s) => !manifest[s]);
if (stillWaiting.length) {
  console.log(`\nStill showing "Photography coming soon" (${stillWaiting.length}):`);
  for (const s of stillWaiting) console.log(`  drop photos in  public/properties/${s}/`);
}
if (unknown.length) {
  console.log(
    `\nPhoto folders with no matching listing (${unknown.length}): ${unknown.join(", ")}` +
      `\n  Either the slug is misspelt, or these properties need adding to app/properties/data.ts.`,
  );
}
