import { useTranslations } from "next-intl";

import { Reveal } from "@/components/base/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/** "Need More Help?" gradient CTA banner — bottom of every service page and the Contact page. */
export function CtaBanner() {
  const t = useTranslations("ctaBanner");
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-brand-500">
      <div
        aria-hidden="true"
        className="absolute -end-16 -top-16 size-72 rounded-full bg-accent-400/20 blur-3xl"
      />
      <Reveal className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t("title")}</h2>
        <p className="max-w-lg text-brand-100">{t("description")}</p>
        <Button variant="accent" size="lg" render={<Link href="/contact" />}>
          {t("cta")}
        </Button>
      </Reveal>
    </section>
  );
}
