import Image from "next/image";

import { Reveal } from "@/components/base/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Home page hero — real doctor photo + real hero copy from content/*\/home.json.
 * @param {{ hero: { tagline: string, title: string, subtitle: string, description: string, cta: string, imageAlt: string } }} props
 */
export function Hero({ hero }) {
  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-700 to-neutral-950"
      />
      <div
        aria-hidden="true"
        className="absolute -end-24 -top-24 size-[28rem] rounded-full bg-accent-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -start-32 bottom-0 size-[24rem] rounded-full bg-brand-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-28">
        <div className="space-y-7 text-center lg:text-start">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-100 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-accent-400" />
              {hero.tagline}
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">{hero.title}</h1>
          </Reveal>
          <Reveal direction="up" delay={180}>
            <p className="text-xl font-medium text-accent-300">{hero.subtitle}</p>
          </Reveal>
          <Reveal direction="up" delay={260}>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-brand-100/90 lg:mx-0">
              {hero.description}
            </p>
          </Reveal>
          <Reveal direction="up" delay={340}>
            <div className="flex justify-center lg:justify-start">
              <Button variant="accent" size="lg" render={<Link href="/contact" />}>
                {hero.cta}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal direction="right" delay={200} className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-accent-400/30 to-brand-300/30 blur-2xl" />
          <div className="animate-float relative h-full">
            <div className="relative size-full overflow-hidden rounded-[2.5rem] ring-1 ring-white/15">
              <Image
                src="/images/doctor/dr_mohamed.png"
                alt={hero.imageAlt}
                fill
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
