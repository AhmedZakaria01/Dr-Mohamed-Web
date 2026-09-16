"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Two-state toggle between "ar" and "en", landing on the same page in the
 * other locale (next-intl's locale-aware pathname/router keep the path).
 * @param {{ className?: string }} props
 */
export function LanguageSwitcher({ className }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className={cn(
        "rounded-full border border-white/25 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10",
        className,
      )}
      lang={nextLocale}
    >
      {t("switchTo")}
    </button>
  );
}
