import { cn } from "@/lib/utils";

/**
 * Eyebrow / title / description heading block reused at the top of every
 * page section.
 * @param {{ eyebrow?: string, title: string, description?: string, align?: "start"|"center", className?: string }} props
 */
export function SectionHeading({ eyebrow, title, description, align = "start", className }) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
