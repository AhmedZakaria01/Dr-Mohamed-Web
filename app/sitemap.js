import { LOCALES, ROUTES, SITE_URL } from "@/lib/seo";

export default function sitemap() {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((pathname) => ({
      url: `${SITE_URL}/${locale}${pathname}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${pathname}`]),
        ),
      },
    })),
  );
}
