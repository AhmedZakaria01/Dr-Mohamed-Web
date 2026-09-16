import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { CertificateGallery } from "@/components/base/CertificateGallery";
import { Hero } from "@/components/base/Hero";
import { Reveal } from "@/components/base/Reveal";
import { SectionHeading } from "@/components/base/SectionHeading";
import { ServiceCard } from "@/components/base/ServiceCard";
import { StatsRow } from "@/components/base/StatsRow";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getPageContent, getServicesIndex } from "@/lib/content";
import { buildMetadata, serviceImage } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const home = getPageContent(locale, "home");
  return buildMetadata({
    locale,
    pathname: "",
    title: `${home.hero.title} — ${home.hero.subtitle}`,
    description: home.getExpert.description,
    suffixSiteName: false,
  });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const home = getPageContent(locale, "home");
  const about = getPageContent(locale, "about");
  const services = getServicesIndex(locale);

  return (
    <>
      <Hero hero={home.hero} />

      <Reveal as="section" className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {home.getExpert.eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
          {home.getExpert.highlight}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {home.getExpert.description}
        </p>
      </Reveal>

      <CertificateGallery title={home.certificates.sectionTitle} />

      <section className="mesh-bg bg-neutral-100/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsRow stats={about.stats} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal direction="left" className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100">
          <Image
            src="/images/doctor/photo.png"
            alt={home.aboutTeaser.drNameLabel}
            fill
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-cover object-top"
          />
        </Reveal>
        <Reveal direction="right" className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {home.aboutTeaser.sectionTitle}
          </p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {home.aboutTeaser.clinicTitle}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">{home.aboutTeaser.drNameLabel}</span>{" "}
            {home.aboutTeaser.clinicDescription}
          </p>
          <Button variant="outline" render={<Link href="/about" />}>
            {home.aboutTeaser.cta}
          </Button>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading title={home.servicesTeaser.sectionTitle} align="center" className="mx-auto" />
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
    </>
  );
}
