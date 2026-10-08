# Client Requests — Alexandra Kerr

One file, one source of truth. A request is only tracked once it is written here.
If it lives only in a chat thread, it will get lost — that is what happened to the
earlier round.

**Status key**
| | |
|---|---|
| ✅ Done | Live in the code. Commit referenced. |
| ⏳ Needs answer | We are blocked on a decision from Alexandra. |
| 📦 Needs assets | Decision made, waiting on files (photos, copy, logins). |
| 🔨 In progress | Being built now. |

---

## Listings held back — Oct 9, 2026 🔁 Reversible

**Decision:** the site shows what the MLS provides. Hand-entered listings the MLS
can't confirm are held back rather than shown as "Active" with no details.

**How we checked:** each address was looked up two ways on Oct 9, 2026 —
Alexandra's own IDX feed (her featured and sold/pending listings) and a search of
the whole California Regional MLS by address. At that point her feed held **1**
active listing (1352 Miller Drive, a lease) and 25 sold/leased ones, while the
site's Active tab was showing 10.

**Held back (9)** — still in `app/properties/data.ts`, each with a `heldBack`
note; photos still in `public/properties/<slug>/`:

| Listing | What the site had | MLS check |
|---|---|---|
| 2050 N Las Palmas Avenue (90068) | $1,695,000 · 3 bd · 4 ba · 1,830 sqft, stock photo | Not in her feed; no MLS result |
| 2861 N Beachwood | 5 photos, no price or specs | Not in her feed; no MLS result |
| 558 Rose Ave | 3 photos, no price or specs | Not in her feed; no MLS result |
| 712 Marine | 3 photos, no price or specs | Not in her feed; no MLS result |
| 1747 Hollyvista | 2 photos, no price or specs | Not in her feed; no MLS result |
| 2032 Sanborn | 2 photos, no price or specs | Not in her feed; no MLS result |
| 8573 Franklin | 2 photos, no price or specs | Not in her feed; no MLS result |
| 2913 3rd St | 1 photo, no price or specs | Not in her feed. The MLS has units #304 and #306 at 2913 3rd Street, Santa Monica for sale, not listed through her account |
| 9757 Arlene Terrace | 1 photo, no price or specs | Not in her feed; no MLS result. Possibly a typo for **8757** Arlene Terrace, which the MLS shows as sold ($1,875,000) — confirm |

**Corrected by the MLS, not held back:** 1954 Pinehurst, 3820 Buena Park,
8757 Arlene Terrace, 803 Boccaccio and 726 Nowita were also marked Active by
hand; the MLS shows them sold, and the site now shows them sold with the MLS's
details. 1352 Miller Drive is the one listing the MLS confirms as active.

**What happens now**
- They don't appear on Portfolio, Home Search, the map, Similar Homes or the
  sitemap. Their old URLs (e.g. `/properties/2861-n-beachwood`) redirect to
  `/home-search` with a temporary (307) redirect.
- If any of these addresses shows up in Alexandra's IDX feed later, it comes
  back on its own, with the MLS's price, specs and description.

**To revert:** delete the `heldBack: "…"` line from a listing in
`app/properties/data.ts` and it is shown exactly as before. Delete all nine to
undo this change completely.

**Need from Alexandra:** what each of these is — a past sale (show as Sold),
an off-MLS deal such as a Compass Private Exclusive, or still for sale (then:
price, beds, baths, sqft and a short description).

---

## Round 2 — received Aug 4, 2026

### Q1 · Stats bar figures ✅ Done
Home page, "A Record That Speaks Quietly".

| Was | Now |
|---|---|
| 200+ Homes Sold | **179 Homes Sold** |
| $250M+ Total Sales | **$184M Total Sales** |
| 12+ Years | **13 Years** |
| 90+ Client Reviews | *removed — see below* |

Also removed the "Figures shown are placeholders pending client confirmation"
caption, since they are now confirmed.

**Reviews figure pulled.** The site claimed 90+; the real count is 2 five-star
reviews on Facebook. We are not publishing a number that isn't real. The slot is
ready to come back the moment the Google Business profile has reviews behind it —
one line in `app/page.tsx` and the layout reflows on its own.

### Q2 · Testimonials ⏳ Needs answer
Currently **5** in the carousel. Alexandra asked whether that's enough and offered
2 more including Todd's.

**Our recommendation: yes, add them — go to 7.** Five is on the thin side for a
carousel, and named, specific reviews are the strongest asset on a solo agent's
site. There's no layout cost; the carousel builds its own dots from the array.

**To action this we need:** the two quotes as text, plus for each — client name as
it should appear, their neighborhood, and whether they were a buyer or a seller.

### Q3 · Neighborhood list 🔨 Built — confirm the 12
Currently **17** (6 with photos + 11 in the service-area list). Alexandra proposed
cutting to 10.

**Our recommendation: cut, but not to that exact list.** Two problems with the
proposed 10:

1. **It drops the four areas where her actual listings are.** Hancock Park,
   Windsor Square, Mar Vista and Sunset Strip hold her real sold portfolio, and
   those tiles are wired to live listing counts. Dropping them removes the only
   neighborhoods on the site that can prove she works there.
2. **Three entries are regions, not neighborhoods.** "Los Angeles East Side",
   "San Fernando Valley" and "West Side" are much bigger than the others, so they
   read oddly side by side, and they can't carry a listing count.

**Proposed 12 — her list, with the portfolio areas kept:**

Hollywood Hills · Los Feliz · Silver Lake · Echo Park · Hancock Park ·
Windsor Square · Sunset Strip · Beverly Hills · Brentwood · Santa Monica ·
Venice · Mar Vista

Then handle "East Side / Valley / West Side" as a single line of plain text
underneath — "also serving the Eastside, the San Fernando Valley and the
Westside" — which covers the ground without pretending they're neighborhoods.

**Built as the 12 above** so it can be seen rather than imagined. The three
regions now render as one sentence under the list. If Alexandra wants a
different cut, it is a two-line edit in `app/neighborhoods/data.ts`.

The home page used to keep its own second copy of this list — it was still
showing Pasadena, Glendale and Palm Springs. Both pages now read from the one
file, so this cannot drift again.

### Q4 · Neighborhood photography 📦 Needs assets
Confirmed: stock, since she only has property photos.

Two things to flag:

- **The current neighborhood images are hotlinked from Unsplash's CDN** — 13 of
  them, loaded live from someone else's server. If those URLs change or the
  service throttles, the images break on the live site. They need to be properly
  licensed, downloaded into the project, and optimized regardless of which images
  we end up using.
- **She said she's picky — good.** We'd rather she picked. Cheapest path: we
  shortlist 3–4 candidates per neighborhood, she picks one from each. Slower but
  she gets what she wants. Alternative: we choose and she vetoes.

**Need from Alexandra:** which of those two, and confirmation of the final
neighborhood list (Q3) first — no point sourcing photos for areas we cut.

---

## Round 1 — received Aug 4, 2026 (same session)

### Hero contact block ✅ Done
Email address moved to the left column, directly under the phone number. Right
column is now brokerage only (Compass mark, connect link, office address).

### "Alexandra Kerr Team" ✅ Done
She is a solo agent. Removed from the contact page, replaced with her name and
credentials. It was the only literal "Team" in the codebase.

One line left deliberately untouched pending her call: the home page testimonials
heading reads *"Kind words from the neighborhoods **we** call home."* That "we"
reads as her-and-her-clients rather than a sales team. Say the word and it becomes
"she calls home."

---

## Outstanding — not client-raised, but bigger than anything above

These came out of a full review of the site. All four are now built; two need
credentials from your side before they do anything in production.

### 1. Lead forms ✅ Built · 📦 needs an API key
The contact and valuation forms used to tell the visitor "Alexandra will be in
touch shortly" and then discard what they typed. Nothing was emailed, stored or
forwarded — every enquiry was lost silently.

All three forms now go through one server action (`app/actions/lead.ts`) which
emails the lead, plus a spam honeypot and server-side validation. Two rules are
built into it:

- The visitor is **never** told the message sent unless it actually sent. A
  failure shows Alexandra's phone number instead of a false reassurance.
- A lead is **never** lost quietly. If mail is down or unconfigured, the full
  details are written to the server log so they can still be recovered.

**Needed to switch it on:** a Resend API key, the inbox leads should land in,
and a verified sending domain. See `.env.example` — three variables. Until they
are set the forms honestly report that they could not send.

### 2. Photography ✅ Done
| | Before | After |
|---|---|---|
| Photos on disk | 883 MB | **38 MB** |
| Largest single file | 59 MB | 0.8 MB |
| One listing gallery | 446 MB | 8 MB |
| A card image, as delivered | ~42 MB | **112 KB** |

`npm run optimize-photos` resizes to 2560px and moves the camera masters to
`_photo-originals/` — nothing is destroyed, and it is safe to re-run when new
photos arrive. On top of that the images now go through Next's optimizer, so a
listing card is served as a 112 KB AVIF instead of the full file.

**One thing for Alexandra:** the masters in `_photo-originals/` are hers and
should move to her own storage. They are excluded from the repo.

### 3. Listing dead ends ✅ Done
Five sold properties and two actives showed full price and specs on their card
and then landed on "Listing Coming Soon". Detail pages now render whatever a
listing actually has — a sold home with no gallery gets its photo, price, specs
and contact panel rather than a holding page.

### 4. Search visibility ✅ Built · 📦 needs the domain
Sitemap (56 URLs, generated from the live data), robots file, AK favicon, a
generated social share card, and `RealEstateAgent` structured data carrying her
licence, phone, office and service areas.

**Needed:** confirmation of the production domain. It is currently assumed to be
`alexandrakerr.com` — set `NEXT_PUBLIC_SITE_URL` to the real one. If this is
wrong, Google indexes the wrong domain.

### 5. Dead code ✅ Done
Removed 2,012 lines of an abandoned second search implementation that nothing
imported. Lint is clean.

---

## How to send the next round

1. **Put it here, or send it in one message that can be pasted here.** One list,
   one place.
2. **Number every item.** Makes "item 4 is done, item 5 is blocked" possible.
3. **Say which page and which words.** "Change the stat on the home page from 200
   to 179" beats "the numbers are wrong."
4. **Flag anything that needs a file** — photos, headshots, logos — separately, so
   we can chase those in parallel instead of discovering them mid-build.

For the other five agents: the site's content lives in structured data files, one
per section, separate from the layout. A new agent is a content swap, not a
rebuild — so this same list format will work for all of them, and the answers to
Q3 and Q4 here set the pattern the rest inherit.
