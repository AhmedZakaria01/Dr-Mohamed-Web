"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * @param {{ items: Array<{ href: string, label: string }> }} props
 */
function NavLinks({ items, pathname, onNavigate, className }) {
  return (
    <ul className={cn("flex gap-1", className)}>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group/link relative block px-4 py-2 text-sm font-medium",
                active ? "text-white" : "text-white/80 hover:text-white",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-accent-400 transition-transform duration-300 group-hover/link:scale-x-100",
                  active && "scale-x-100",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-brand-700/95 shadow-md backdrop-blur-sm" : "bg-brand-700",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt=""
            width={40}
            height={40}
            className="size-10"
            priority
          />
          <span className="text-base font-semibold text-white">Dr Mohamed Sera</span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-2">
          <NavLinks items={items} pathname={pathname} />
        </nav>

        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className="flex size-10 items-center justify-center rounded-full text-white lg:hidden"
            aria-label={t("menuToggle")}
          >
            <Menu className="size-6" />
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup className="fixed inset-x-0 top-0 flex max-h-screen flex-col gap-6 rounded-b-3xl bg-brand-700 px-6 pb-8 pt-6 shadow-xl">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                  <Image src="/images/logo.png" alt="" width={36} height={36} className="size-9" />
                  <span className="text-base font-semibold text-white">Dr Mohamed Sera</span>
                </Link>
                <DialogClose
                  className="flex size-10 items-center justify-center rounded-full text-white"
                  aria-label={t("menuClose")}
                >
                  <X className="size-6" />
                </DialogClose>
              </div>
              <NavLinks
                items={items}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
                className="flex-col gap-1"
              />
              <LanguageSwitcher className="self-start" />
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </div>
    </header>
  );
}
