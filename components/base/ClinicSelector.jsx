"use client";

import { Phone } from "lucide-react";
import { useState } from "react";

import { WhatsAppIcon } from "@/components/base/WhatsAppIcon";
import { cn } from "@/lib/utils";

/**
 * Tabbed clinic picker — one map loads at a time instead of 4 stacked
 * iframes, with a crossfade between clinics.
 * @param {{ clinics: Array<{ id: string, name: string, address: string, phone: string, mapEmbedUrl: string }>, callLabel: string, whatsappLabel: string }} props
 */
export function ClinicSelector({ clinics, callLabel, whatsappLabel }) {
  const [activeId, setActiveId] = useState(clinics[0]?.id);
  const [mapLoaded, setMapLoaded] = useState(false);
  const active = clinics.find((c) => c.id === activeId) ?? clinics[0];

  function select(id) {
    if (id === activeId) return;
    setMapLoaded(false);
    setActiveId(id);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-border p-3">
        {clinics.map((clinic) => (
          <button
            key={clinic.id}
            type="button"
            onClick={() => select(clinic.id)}
            aria-pressed={clinic.id === activeId}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              clinic.id === activeId
                ? "bg-brand-600 text-white shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {clinic.name}
          </button>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div key={active.id} className="animate-in fade-in-0 slide-in-from-bottom-2 space-y-4 p-6 duration-300">
          <h3 className="text-lg font-semibold text-foreground">{active.name}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{active.address}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={`tel:+2${active.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100"
            >
              <Phone className="size-4" />
              {callLabel}
            </a>
            <a
              href={`https://wa.me/2${active.phone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
            >
              <WhatsAppIcon className="size-4" />
              {whatsappLabel}
            </a>
          </div>
        </div>

        <div className="relative aspect-video bg-neutral-100 lg:aspect-auto">
          {!mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="size-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600"
                aria-hidden="true"
              />
            </div>
          ) : null}
          <iframe
            key={active.id}
            src={active.mapEmbedUrl}
            title={active.name}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
            className={cn(
              "size-full min-h-64 border-0 transition-opacity duration-300",
              !mapLoaded && "opacity-0",
            )}
          />
        </div>
      </div>
    </div>
  );
}
