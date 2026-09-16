import Image from "next/image";

import { Reveal } from "@/components/base/Reveal";
import { SectionHeading } from "@/components/base/SectionHeading";

/**
 * One template for all 6 procedure pages — driven entirely by one
 * content/*\/services/{slug}.json file (title, summary, intro[], causes[],
 * benefits, image).
 * @param {{ content: { title: string, summary: string, introTitle: string, intro: string[], causesTitle: string, causes: string[], benefitsTitle: string, benefits: string|null, image: string } }} props
 */
export function ServiceDetailTemplate({ content }) {
  return (
    <article className="mx-auto max-w-3xl space-y-14 px-4 py-14 sm:px-6 lg:px-8">
      <Reveal as="header" className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{content.title}</h1>
        <p className="text-lg text-muted-foreground">{content.summary}</p>
      </Reveal>

      <Reveal className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={content.image}
          alt={content.title}
          fill
          sizes="(min-width: 1024px) 48rem, 100vw"
          className="object-cover"
        />
      </Reveal>

      <Reveal as="section" className="space-y-4">
        <SectionHeading title={content.introTitle} />
        {content.intro.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-foreground/90">
            {paragraph}
          </p>
        ))}
      </Reveal>

      <Reveal as="section" className="space-y-4">
        <SectionHeading title={content.causesTitle} />
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.causes.map((cause, index) => (
            <li
              key={cause}
              className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-shadow duration-300 hover:shadow-md"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed text-foreground/90">{cause}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {content.benefits ? (
        <Reveal as="section" className="space-y-4">
          <SectionHeading title={content.benefitsTitle} />
          <p className="text-base leading-relaxed text-foreground/90">{content.benefits}</p>
        </Reveal>
      ) : null}
    </article>
  );
}
