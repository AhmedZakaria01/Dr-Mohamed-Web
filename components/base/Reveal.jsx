"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance animation. Fades/slides children in the first
 * time they cross into the viewport, once. Respects `prefers-reduced-motion`
 * via the global CSS override in app/globals.css (transitions collapse to
 * ~0 there, so this degrades to an instant, non-jarring appearance).
 * @param {{ children: React.ReactNode, className?: string, delay?: number, as?: keyof JSX.IntrinsicElements, direction?: "up"|"left"|"right"|"none" }} props
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div", direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = {
    up: "translate-y-8 opacity-0",
    left: "-translate-x-8 opacity-0 rtl:translate-x-8",
    right: "translate-x-8 opacity-0 rtl:-translate-x-8",
    none: "opacity-0",
  }[direction];

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "translate-x-0 translate-y-0 opacity-100" : hidden,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
