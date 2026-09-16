"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/base/Reveal";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
} from "@/components/ui/dialog";

const CERTIFICATES = [1, 2, 3, 4].map((n) => `/images/certificates/${n}.png`);
const TILT = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

/**
 * @param {{ title: string }} props
 */
export function CertificateGallery({ title }) {
  const [active, setActive] = useState(null);

  return (
    <section className="overflow-hidden py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal as="h2" className="mb-12 text-center text-3xl font-semibold text-foreground">
          {title}
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {CERTIFICATES.map((src, index) => (
            <Reveal key={src} delay={index * 90} className="flex justify-center">
              <button
                type="button"
                onClick={() => setActive(src)}
                className={`group relative aspect-[3/4] w-full max-w-[12rem] overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-border transition-transform duration-300 hover:z-10 hover:scale-105 hover:rotate-0 hover:shadow-xl focus-visible:z-10 focus-visible:rotate-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/50 ${TILT[index % TILT.length]}`}
              >
                <Image
                  src={src}
                  alt={`${title} ${index + 1}`}
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-neutral-950/0 transition-colors duration-300 group-hover:bg-neutral-950/10" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="relative aspect-[3/4] w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              {active ? (
                <Image src={active} alt={title} fill sizes="28rem" className="rounded-2xl object-contain" />
              ) : null}
            </div>
            <DialogClose
              aria-label="Close"
              className="absolute end-6 top-6 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-5" />
            </DialogClose>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
