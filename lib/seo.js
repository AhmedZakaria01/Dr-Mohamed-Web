import { SERVICE_SLUGS } from "@/lib/content";

export const SITE_NAME = "Dr Mohamed Sera";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drmohamedsera.com";
export const LOCALES = ["ar", "en"];

/** Static pathnames (without locale prefix) that exist for every locale. */
export const ROUTES = [
  "",
  "/about",
  "/services",
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  "/contact",
];

/**
 * Build a `generateMetadata` `alternates.languages` map (hreflang) for a
 * given pathname, plus `x-default` pointing at the default locale.
 * @param {string} pathname e.g. "/services/hemorrhoid-surgery"
 */
export function buildAlternates(pathname) {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${pathname}`]),
  );
  languages["x-default"] = `${SITE_URL}/ar${pathname}`;
  return languages;
}

export function canonicalFor(locale, pathname) {
  return `${SITE_URL}/${locale}${pathname}`;
}

/**
 * Build a Next.js `generateMetadata` return value with title/description,
 * canonical + hreflang alternates, and Open Graph basics.
 * @param {{ locale: string, pathname: string, title: string, description: string, suffixSiteName?: boolean }} args
 */
export function buildMetadata({ locale, pathname, title, description, suffixSiteName = true }) {
  const fullTitle = suffixSiteName ? `${title} | ${SITE_NAME}` : title;
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalFor(locale, pathname),
      languages: buildAlternates(pathname),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalFor(locale, pathname),
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** `/images/services/{slug}.png` — real, already-copied service photography. */
export function serviceImage(slug) {
  return `/images/services/${slug}.png`;
}
