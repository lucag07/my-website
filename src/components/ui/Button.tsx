import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "lg";

const baseClasses =
  "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand hover:bg-brand-hover text-brand-foreground shadow-brand hover:shadow-brand-hover hover:scale-105",
  secondary:
    "border-2 border-slate-800 text-slate-800 hover:bg-slate-50 bg-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  lg: "text-lg px-8 py-4",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

function getClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string
) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "lg",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getClasses(variant, size, className)}
      {...props}
    />
  );
}

export type CtaLinkProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function CtaLink({
  variant = "primary",
  size = "lg",
  className,
  ...props
}: CtaLinkProps) {
  return <a className={getClasses(variant, size, className)} {...props} />;
}
