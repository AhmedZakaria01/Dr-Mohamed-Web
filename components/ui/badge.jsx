import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        brand: "bg-brand-100 text-brand-800",
        accent: "bg-accent-100 text-accent-800",
        neutral: "bg-neutral-100 text-neutral-700",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  },
);

/**
 * @param {{ className?: string, variant?: "brand"|"accent"|"neutral", dot?: boolean, children?: React.ReactNode }} props
 */
export function Badge({ className, variant, dot, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
