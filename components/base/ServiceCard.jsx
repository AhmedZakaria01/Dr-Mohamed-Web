import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Full-bleed editorial card: image fills the frame, title sits on a
 * gradient scrim, and the summary slides up from the bottom on hover/focus.
 * Reused on the home services teaser and the services index page.
 * @param {{ title: string, summary: string, href: string, image: string, index?: number, className?: string }} props
 */
export function ServiceCard({ title, summary, href, image, index, className }) {
  const t = useTranslations("serviceCard");
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-900 shadow-sm transition-all duration-500 hover:shadow-2xl focus-visible:ring-3 focus-visible:ring-brand-500/50",
        className,
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/10 transition-colors duration-500 group-hover:from-brand-950/95" />

      {typeof index === "number" ? (
        <span className="absolute start-5 top-5 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}

      <div className="relative mt-auto flex w-full flex-col gap-2 p-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p
          className={cn(
            "max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 ease-out",
            "group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:max-h-24 group-focus-visible:opacity-100",
          )}
        >
          {summary}
        </p>
        <ServiceCardCta label={t("readMore")} />
      </div>
    </Link>
  );
}

function ServiceCardCta({ label }) {
  return (
    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300">
      {label}
      <ArrowIcon />
    </span>
  );
}

function ArrowIcon() {
  const locale = useLocale();
  const Icon = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
  );
}
