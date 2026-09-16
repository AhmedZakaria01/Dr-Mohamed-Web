# Components — Dr Mohamed Sera website

Living index of every reusable component. Check here before building
anything new — see `PROJECT_NOTES.md` rule #1 (reusability first).

## `components/ui` — low-level primitives

| Component | Purpose |
| --- | --- |
| `Button` | `@base-ui/react/button` wrapper, cva variants (`primary`/`accent`/`outline`/`ghost`/`link`), sizes. Polymorphic via `render` prop, e.g. `render={<Link href="/contact" />}`. |
| `Badge` | Small pill label, variants `brand`/`accent`/`neutral`, optional leading dot. |
| `Dialog` (+ `DialogTrigger`/`DialogPortal`/`DialogClose`/`DialogBackdrop`/`DialogPopup`/`DialogTitle`) | Trimmed, **unpositioned** `@base-ui/react/dialog` wrapper — callers supply their own popup layout via `className` (used for the mobile nav drawer as a full-width top sheet, not a centered modal). |

## `components/layout` — site chrome

| Component | Purpose |
| --- | --- |
| `Navbar` | Sticky top nav (replaces the old dashboard sidebar). Shrinks/darkens on scroll, desktop links + language switcher, mobile hamburger opening a `Dialog` drawer. |
| `Footer` | Clinic blurb, phone + WhatsApp line, social links, copyright — real data from `content/shared/contact-info.json`. |
| `LanguageSwitcher` | Two-state `ar`⇄`en` toggle, preserves the current path via `i18n/navigation`'s locale-aware router. |

## `components/base` — page-building blocks

| Component | Purpose |
| --- | --- |
| `SectionHeading` | Eyebrow/title/description block, used at the top of every page section. |
| `Hero` | Home page hero — real doctor photo + `content/*/home.json` hero copy. |
| `StatsRow` | The 3 real stats (patients / years / satisfaction) from `content/*/about.json`. |
| `ServiceCard` | Image + title + summary + link card — used on the home services teaser **and** the services index page (same shape). |
| `ServiceDetailTemplate` | **One template, six content sets** — intro/causes/benefits layout driven entirely by one `content/*/services/{slug}.json` file. |
| `CertificateGallery` | 4-image grid from `public/images/certificates/`. |
| `ClinicCard` | Clinic name/address + inline Call/WhatsApp CTAs + a lazy-loaded Google Maps iframe with a loading-spinner overlay. Used for the 4 real clinics on the Contact page. |
| `CtaBanner` | "Need More Help? → Contact Us" gradient banner, reused at the bottom of every service page. |
| `FloatingContactButtons` | Global fixed WhatsApp + Call buttons (bottom-start, mirrors in RTL), mounted once in `[locale]/layout.jsx`. |
| `WhatsAppIcon` | Inline SVG brand mark (lucide-react has no WhatsApp icon). |

## `components/features/contact`

| Component | Purpose |
| --- | --- |
| `ContactForm` | Client component, `react-hook-form` + `zod`. **WhatsApp-only** — no backend, no email: valid submit opens a pre-filled `wa.me` deep link. Honeypot field guards against bots. |

## Content vs. messages

- **`content/{ar,en}/*.json`** — real page-body copy (hero, about, services,
  contact text, clinic list). Read server-side via `lib/content.js`. This is
  the source of truth for anything a visitor reads as page content.
- **`messages/{ar,en}.json`** — UI-chrome strings only (nav labels, footer
  labels, contact-form field labels/errors, 404 copy), read via next-intl's
  `useTranslations`/`getTranslations`.

Never invent copy for either — see `PROJECT_NOTES.md` rule #3.
