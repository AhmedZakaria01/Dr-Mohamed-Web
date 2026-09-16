import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { WhatsAppIcon } from "@/components/base/WhatsAppIcon";
import { getContactInfo } from "@/lib/content";

/** Global fixed WhatsApp + Call buttons, stacked bottom-start (mirrors in RTL). */
export async function FloatingContactButtons() {
  const t = await getTranslations("floatingContact");
  const contact = getContactInfo();

  return (
    <div className="fixed bottom-5 start-5 z-30 flex flex-col gap-3">
      <a
        href={`tel:+${contact.whatsapp.numberIntl}`}
        aria-label={t("callLabel")}
        className="flex size-13 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-brand-700"
      >
        <Phone className="size-5" />
      </a>
      <a
        href={contact.whatsapp.waLink}
        target="_blank"
        rel="noreferrer"
        aria-label={t("whatsappLabel")}
        className="flex size-13 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105 hover:bg-emerald-600"
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
