import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-brand/40 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white shadow-sm hover:bg-brand-700",
        accent: "bg-accent text-accent-foreground shadow-sm hover:bg-accent-600",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[0.8rem]",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

/**
 * @param {{ className?: string, variant?: "primary"|"accent"|"outline"|"ghost"|"link", size?: "default"|"sm"|"lg"|"icon", render?: React.ReactElement } & Record<string, any>} props
 */
export function Button({ className, variant, size, render, ...props }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={render}
      // A `render` target (e.g. our locale-aware `Link`) is usually an <a>,
      // not a real <button> — only assume native button semantics when
      // there's no polymorphic render target.
      nativeButton={render === undefined}
      {...props}
    />
  );
}
