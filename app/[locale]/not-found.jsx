import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{t("eyebrow")}</p>
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{t("title")}</h1>
      <p className="text-base leading-relaxed text-muted-foreground">{t("description")}</p>
      <Button render={<Link href="/" />}>{t("cta")}</Button>
    </section>
  );
}
