# Content — migrated from Doctor_Mohamed_sera

This folder holds real, extracted copy and image references migrated from the
old Vite/React site at `D:\Personal\Dev\Doctor_Mohamed_sera`. It is a **content
migration only** — no design or code decisions were made, and no page in this
app has been wired up to read these files yet.

Everything is **plain JSON** on purpose, so it can be read by server code,
client code, a CMS import script, or anything else regardless of whether it's
TypeScript or JavaScript. No schema/library assumption is baked in.

## Layout

```
content/
  en/
    home.json              hero, "get expert" teaser, certificates section title,
                            about teaser, services teaser (6 items)
    about.json              clinic bio, stats (5000+ patients / 15+ years / 98%
                            satisfaction), gallery/contact section titles
    contact.json            contact page copy, quick-contact CTA, hours strings
    services/
      index.json            the 6-service summary list (title + summary each)
      anal-fissure-surgery.json
      hemorrhoid-surgery.json
      ingrown-toenail-surgery.json
      laparoscopic-surgeries.json
      minimally-invasive-surgeries.json
      colon-surgeries.json
  ar/
    (same file set, real Arabic copy pulled from src/locales/ar.json)
  shared/
    contact-info.json       real WhatsApp/phone numbers, social links, and the
                            4 clinic locations (name/address per language,
                            phone, Google Maps embed URL)
```

Every service detail file follows the same shape:
`{ title, summary, introTitle, intro: [p1, p2], causesTitle, causes: [...],
benefitsTitle, benefits, image }`.

Images referenced by `image` fields live under `public/images/services/` in
this project (see below) — paths are already `/images/...`-rooted so they
resolve directly if/when a page uses them.

## Images copied

Copied as real files (not regenerated) from `Doctor_Mohamed_sera/src/assets/`
into `public/images/` in this project:

| Destination | Source |
|---|---|
| `public/images/doctor/dr_mohamed.png` | `src/assets/dr_mohamed.png` |
| `public/images/doctor/mohamed-sera-home-image.png` | `src/assets/mohamed-sera-home-image.png` (15.6 MB — large, unoptimized; worth compressing before real use) |
| `public/images/doctor/photo.png` | `src/assets/photo.png` |
| `public/images/services/anal-fissure-surgery.png` | `src/assets/Anal fissure surgery.png` |
| `public/images/services/hemorrhoid-surgery.png` | `src/assets/Hemorrhoid surgery.png` |
| `public/images/services/ingrown-toenail-surgery.png` | `src/assets/ingrown toenail surgeries.png` |
| `public/images/services/laparoscopic-surgeries.png` | `src/assets/laparoscopic surgeries.png` |
| `public/images/services/minimally-invasive-surgeries.png` | `src/assets/Minimally invasive surgeries.png` |
| `public/images/services/colon-surgeries.png` | `src/assets/Colon surgeries.png` |
| `public/images/certificates/1.png` … `4.png` | `src/assets/certificates/1.png` … `4.png` |
| `public/images/logo.png` | `src/assets/logo.png` (real branded colon/intestine icon logo — kept) |

**Skipped, not copied** (judgment call — flagging for the user to confirm):
- `home_bg.png`, `home_bg small.png`, `home_bg small-1.png`, `circle_bg.png`,
  `home-background-bw.jpg` — generic hero/background decoration, not
  identifying content; can be pulled later if a redesign wants the exact same
  background art.
- `react.svg` — Vite/React scaffold artifact, not a site asset.
- `page_not_found.png` — a 404-page illustration, not core site content.

## Gaps — needs the user's real input before this ships

1. **No real email address anywhere in the source.** The locale JSON's
   `about.email` (`info@clinicname.com`) is a leftover template value — it was
   **not** migrated. `content/shared/contact-info.json` has `"email": null`.
   Get a real clinic email from the user.
2. **No real gallery/interior photos.** `AboutUs.jsx`'s photo-gallery array is
   14 Unsplash stock-photo URLs, not real clinic photos (and that whole
   gallery section is actually commented out / dead code in the source). Real
   interior/exterior clinic photos are needed if a gallery section ships.
3. **`about.phone` / `about.location` in the locale JSON are also placeholder
   template values** (`+20 123 456 7890`, "Cairo, Egypt - Tahrir Street") and
   were **not** migrated. The real numbers (WhatsApp `+20 105 050 5342`, plus
   per-clinic numbers for Helwan/Maadi/5th Settlement/October) are in
   `content/shared/contact-info.json` instead, sourced from `Footer.jsx`,
   `WhatsappButton.jsx`, and the clinic-list arrays in `AboutUs.jsx` /
   `ContactUs.jsx`.
4. **Working hours are unconfirmed.** `about.saturdayToThursday` /
   `about.friday` ("Saturday - Thursday 9:00 AM - 8:00 PM", "Friday 2:00 PM -
   6:00 PM") sit in the same locale `about` block as the confirmed-fake
   phone/email/location fields, so they may also be generic template text
   rather than the real schedule. They were migrated into `contact.json` as
   the best available text, but flagged — verify with the user.
5. **English translation missing for one field.** The English locale file has
   no `MinimallyBenefits` key (the Arabic file does). See
   `content/en/services/minimally-invasive-surgeries.json` — `benefits` is
   `null` there with a `_gap_note` explaining it. Do not invent an English
   translation; get the real copy from the user.
6. **`Services.jsx` (the Services index page) is an empty stub** in the
   source (`return <div></div>`) — it had no real content of its own beyond
   what's already captured in `services/index.json` from the locale files and
   `Home.jsx`'s services array.
7. Stats numbers (5000+ patients, 15+ years, 98% satisfaction) and per-clinic
   phone numbers are real hardcoded values pulled directly from JSX
   (`AboutUs.jsx`) — not fabricated, but also not present anywhere in the
   locale JSON, so if those files are ever the "source of truth" checked
   against, note these came from component code instead.
