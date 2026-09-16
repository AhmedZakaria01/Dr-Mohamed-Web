import { setRequestLocale } from "next-intl/server";

import { ClinicSelector } from "@/components/base/ClinicSelector";
import { Reveal } from "@/components/base/Reveal";
import { WhatsAppIcon } from "@/components/base/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { Link } from "@/i18n/navigation";
import { getContactInfo, getPageContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const contact = getPageContent(locale, "contact");
  return buildMetadata({
    locale,
    pathname: "/contact",
    title: contact.title,
    description: contact.intro,
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const contact = getPageContent(locale, "contact");
  const info = getContactInfo();

  const clinics = info.clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.name[locale],
    address: clinic.address[locale],
    phone: clinic.phone,
    mapEmbedUrl: clinic.mapEmbedUrl,
  }));

  return (
    <>
      <Reveal as="section" className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{contact.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{contact.intro}</p>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-4xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-emerald-50 p-8 text-center sm:flex-row sm:justify-between sm:text-start">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{contact.quickContact.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{contact.quickContact.description}</p>
          </div>
          <a
            href={info.whatsapp.waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-emerald-600"
          >
            <WhatsAppIcon className="size-4" />
            {contact.quickContact.cta}
          </a>
        </div>
      </Reveal>

      <section className="mx-auto grid max-w-4xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
        <Reveal direction="left" className="rounded-2xl border border-border bg-white p-6">
          <p className="text-sm font-semibold text-brand-600">{contact.phoneLabel}</p>
          <a href={`tel:+${info.whatsapp.numberIntl}`} dir="ltr" className="mt-1 block text-lg font-semibold text-foreground">
            {info.primaryPhone}
          </a>
        </Reveal>
        <Reveal direction="right" className="rounded-2xl border border-border bg-white p-6">
          <p className="text-sm font-semibold text-brand-600">{contact.workingHoursLabel}</p>
          <p className="mt-1 text-sm text-foreground">{contact.saturdayToThursday}</p>
          <p className="text-sm text-foreground">{contact.friday}</p>
        </Reveal>
      </section>

      <Reveal as="section" className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <ClinicSelector clinics={clinics} callLabel={contact.callNow} whatsappLabel={contact.quickContact.cta} />
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
          <ContactForm whatsappNumberIntl={info.whatsapp.numberIntl} />
        </div>
      </Reveal>

      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {contact.needMoreHelp.title}
          </h2>
          <p className="max-w-lg text-brand-100">{contact.needMoreHelp.description}</p>
          <Button variant="accent" size="lg" render={<Link href="/" />}>
            {contact.needMoreHelp.homeCta}
          </Button>
        </div>
      </section>
    </>
  );
}
