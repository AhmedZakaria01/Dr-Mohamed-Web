import Image from "next/image";
import { useTranslations } from "next-intl";

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/base/SocialIcons";
import { WhatsAppIcon } from "@/components/base/WhatsAppIcon";
import { Link } from "@/i18n/navigation";
import { getContactInfo } from "@/lib/content";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

export function Footer() {
  const t = useTranslations("footer");
  const contact = getContactInfo();

  return (
    <footer className="bg-neutral-950 text-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="" width={36} height={36} className="size-9" />
            <span className="text-base font-semibold text-white">Dr Mohamed Sera</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400">{t("about")}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-brand-300">{t("contactTitle")}</h3>
          <a
            href={`tel:+${contact.whatsapp.numberIntl}`}
            dir="ltr"
            className="block text-sm text-neutral-300 hover:text-white"
          >
            {contact.primaryPhone}
          </a>
          <a
            href={contact.whatsapp.waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white"
          >
            <WhatsAppIcon className="size-4 text-brand-400" />
            {contact.whatsapp.number}
          </a>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-brand-300">{t("followUs")}</h3>
          <div className="flex gap-3">
            {Object.entries(contact.socialLinks).map(([key, href]) => {
              const Icon = SOCIAL_ICONS[key];
              if (!Icon) return null;
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={key}
                  className="flex size-10 items-center justify-center rounded-full bg-white/5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-neutral-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Dr Mohamed Sera — {t("rights")}
      </div>
    </footer>
  );
}
