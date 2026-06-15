import { ReactNode } from "react";
import { cn } from "../lib/cn";

type SectionVariant = "dark" | "light" | "accent";
type SectionSize = "default" | "compact";

const variantClasses: Record<SectionVariant, string> = {
  dark: "bg-surface-dark text-white",
  light: "bg-surface-muted text-slate-900",
  accent: "bg-surface-light text-slate-900",
};

interface SectionProps {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  variant?: SectionVariant;
  size?: SectionSize;
  bordered?: boolean;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  id,
  label,
  title,
  description,
  variant = "light",
  size = "default",
  bordered = false,
  children,
  className,
  containerClassName,
}: SectionProps) {
  const eyebrowClass =
    variant === "dark" ? "eyebrow-on-dark" : "eyebrow-on-light";

  return (
    <section
      id={id}
      className={cn(
        variantClasses[variant],
        size === "compact" ? "section-y-compact" : "section-y",
        bordered && "border-t border-b border-surface-dark-muted",
        className
      )}
    >
      <div
        className={cn("max-w-6xl mx-auto px-6", containerClassName)}
      >
        {(label || title || description) && (
          <header
            className={cn(
              "mb-12 md:mb-16",
              title || description ? "text-center max-w-3xl mx-auto" : ""
            )}
          >
            {label && <p className={cn(eyebrowClass, "mb-3")}>{label}</p>}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-lg leading-relaxed",
                  variant === "dark" ? "text-slate-300" : "text-slate-600"
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
