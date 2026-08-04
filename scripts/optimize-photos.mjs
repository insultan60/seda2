/* Resize the property photography down to something a browser can actually
 * load, and keep the camera originals.
 *
 *   npm run optimize-photos            # optimize anything oversized
 *   npm run optimize-photos -- --dry   # report only, change nothing
 *
 * ── Why ─────────────────────────────────────────────────────────────────────
 * The photos arrived as camera masters: 6336x9504, up to 59 MB each. They were
 * being served to browsers at that size through a plain <img>, so the portfolio
 * page alone pushed ~209 MB and a single listing gallery 446 MB. On a phone
 * that is not a slow page, it is a broken one.
 *
 * ── What it does ────────────────────────────────────────────────────────────
 * Every original is MOVED to _photo-originals/ (mirroring its path) before a
 * resized version is written in its place. Nothing is destroyed — if a
 * conversion ever looks wrong, the master is one `mv` away, and re-running is
 * safe because a file already backed up is not backed up over.
 *
 * _photo-originals/ sits outside public/, so it is never served. It is also
 * gitignored: the masters belong in Alexandra's own storage, not the repo.
 * Move them there and the working copy drops by most of a gigabyte.
 */
import { readdirSync, mkdirSync, existsSync, renameSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const BACKUP = join(ROOT, "_photo-originals");
const TARGETS = [join(ROOT, "public", "properties"), join(ROOT, "public", "assets")];
const IMAGE_RE = /\.(jpe?g|png)$/i;

/* 2560px on the long edge covers a full-bleed lightbox on a retina laptop.
   Beyond that the extra pixels are invisible and cost megabytes. */
const MAX_EDGE = 2560;
const QUALITY = 82;
/* Anything already under this is left alone — re-encoding a small file just
   loses quality for no saving. */
const SKIP_UNDER_BYTES = 400 * 1024;

const dry = process.argv.includes("--dry");
const mb = (n) => (n / 1048576).toFixed(1) + " MB";

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (IMAGE_RE.test(e.name)) yield p;
  }
}

let before = 0;
let after = 0;
let touched = 0;
let skipped = 0;

for (const target of TARGETS) {
  for (const file of walk(target)) {
    const size = statSync(file).size;
    const meta = await sharp(file).metadata().catch(() => null);
    if (!meta) {
      console.log(`  !!  ${relative(ROOT, file)} — unreadable, skipped`);
      continue;
    }

    const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
    if (size < SKIP_UNDER_BYTES && longEdge <= MAX_EDGE) {
      skipped++;
      continue;
    }

    before += size;

    if (dry) {
      console.log(`  ~   ${relative(ROOT, file).padEnd(58)} ${mb(size).padStart(9)}  ${meta.width}x${meta.height}`);
      touched++;
      continue;
    }

    /* Back the master up first. If this listing was already processed in an
       earlier run the backup exists, and the file in public/ is the resized
       one — re-resizing that would compound the quality loss, so skip it. */
    const backupPath = join(BACKUP, relative(ROOT, file));
    if (existsSync(backupPath)) {
      skipped++;
      after += size;
      continue;
    }
    mkdirSync(dirname(backupPath), { recursive: true });
    renameSync(file, backupPath);

    const pipeline = sharp(backupPath)
      .rotate() // honor EXIF orientation before we strip it
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });

    await (/\.png$/i.test(file)
      ? pipeline.png({ compressionLevel: 9 })
      : pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
    ).toFile(file);

    const newSize = statSync(file).size;
    after += newSize;
    touched++;
    console.log(
      `  OK  ${relative(ROOT, file).padEnd(58)} ${mb(size).padStart(9)} -> ${mb(newSize).padStart(9)}`
    );
  }
}

console.log(
  `\n${dry ? "Would optimize" : "Optimized"} ${touched} image${touched === 1 ? "" : "s"}` +
    ` (${skipped} already fine).`
);
if (!dry && touched) {
  console.log(`  ${mb(before)} -> ${mb(after)}  (${(100 - (after / before) * 100).toFixed(1)}% smaller)`);
  console.log(`\nOriginals moved to _photo-originals/ — not served, not committed.`);
  console.log(`Move them to Alexandra's own storage and the repo drops by ${mb(before)}.`);
}
