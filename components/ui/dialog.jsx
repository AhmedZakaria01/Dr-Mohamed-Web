"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

/**
 * Trimmed, unpositioned dialog primitives (accessible focus trap + backdrop
 * from @base-ui/react). Deliberately has no baked-in centered-modal layout —
 * callers supply their own `className` on `DialogPopup` (e.g. a full-width
 * top sheet for a mobile nav drawer).
 */
export function Dialog(props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger(props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal(props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export function DialogClose(props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export function DialogBackdrop({ className, ...props }) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-40 bg-neutral-950/40 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

export function DialogPopup({ className, children, ...props }) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-popup"
      className={cn("z-50 outline-none", className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  );
}

export function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base font-semibold", className)}
      {...props}
    />
  );
}
