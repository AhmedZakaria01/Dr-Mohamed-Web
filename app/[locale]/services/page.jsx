import { setRequestLocale } from "next-intl/server";

import { Reveal } from "@/components/base/Reveal";
import { ServiceCard } from "@/components/base/ServiceCard";
import { getServicesIndex } from "@/lib/content";
import { buildMetadata, serviceImage } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const services = getServicesIndex(locale);
  return buildMetadata({
    locale,
    pathname: "/services",
    title: services.sectionTitle,
    description: services.items.map((item) => item.title).join(" · "),
  });
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = getServicesIndex(locale);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal as="h1" className="text-center text-3xl font-bold text-foreground sm:text-4xl">
        {services.sectionTitle}
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((item, index) => (
          <Reveal key={item.slug} delay={(index % 3) * 100}>
            <ServiceCard
              title={item.title}
              summary={item.summary}
              href={`/services/${item.slug}`}
              image={serviceImage(item.slug)}
              index={index}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
