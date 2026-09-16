"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";

/**
 * Client-side, zod-validated mini contact form. No backend, no email, no
 * PII stored or transmitted anywhere — on valid submit it opens WhatsApp
 * with a pre-filled message built from the visitor's name + message.
 */
export function ContactForm({ whatsappNumberIntl }) {
  const t = useTranslations("contactForm");

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(1, t("nameRequired"))
      .max(80, t("nameTooLong")),
    message: z
      .string()
      .trim()
      .min(1, t("messageRequired"))
      .max(500, t("messageTooLong")),
    // Honeypot — real visitors never see or fill this field.
    company: z.string().max(0).optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", message: "", company: "" } });

  function onSubmit(values) {
    if (values.company) return; // honeypot tripped — silently no-op
    const text = `${values.name}:\n${values.message}`;
    const url = `https://wa.me/${whatsappNumberIntl}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(t("title"));
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20"
          {...register("name")}
        />
        {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          className="w-full resize-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20"
          {...register("message")}
        />
        {errors.message ? <p className="text-sm text-red-600">{errors.message.message}</p> : null}
      </div>

      {/* Honeypot — visually hidden, must stay empty. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {t("submit")}
      </Button>
    </form>
  );
}
