import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/base/CtaBanner";
import { ServiceDetailTemplate } from "@/components/base/ServiceDetailTemplate";
import { routing } from "@/i18n/routing";
import { SERVICE_SLUGS, getServiceContent } from "@/lib/content";
import { buildMetadata, canonicalFor } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!SERVICE_SLUGS.includes(slug)) return {};
  const content = getServiceContent(locale, slug);
  return buildMetadata({
    locale,
    pathname: `/services/${slug}`,
    title: content.title,
    description: content.summary,
  });
}

export default async function ServiceDetailPage({ params }) {
  const { locale, slug } = await params;
  if (!SERVICE_SLUGS.includes(slug)) notFound();
  setRequestLocale(locale);

  const content = getServiceContent(locale, slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: content.title,
    description: content.summary,
    inLanguage: locale,
    url: canonicalFor(locale, `/services/${slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailTemplate content={content} />
      <CtaBanner />
    </>
  );
}
