import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { CtaBanner } from "@/components/base/CtaBanner";
import { Reveal } from "@/components/base/Reveal";
import { StatsRow } from "@/components/base/StatsRow";
import { Badge } from "@/components/ui/badge";
import { getPageContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const about = getPageContent(locale, "about");
  return buildMetadata({
    locale,
    pathname: "/about",
    title: about.clinicTitle,
    description: about.clinicDescription,
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const about = getPageContent(locale, "about");

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal direction="left" className="space-y-5">
          <Badge variant="brand">{about.surgeonLabel}</Badge>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{about.drName}</h1>
          <p className="text-lg font-medium text-brand-600">{about.clinicTitle}</p>
          <p className="text-base leading-relaxed text-muted-foreground">{about.clinicDescription}</p>
        </Reveal>
        <Reveal direction="right" className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
          <Image
            src="/images/doctor/dr_mohamed.png"
            alt={about.drName}
            fill
            sizes="(min-width: 1024px) 36rem, 100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <section className="mesh-bg bg-neutral-100/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsRow stats={about.stats} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
