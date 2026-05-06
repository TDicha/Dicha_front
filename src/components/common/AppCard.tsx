import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type AppCardVariant =
  | "default"
  | "muted"
  | "warm"
  | "danger"
  | "hero-green"
  | "hero-blue"
  | "hero-red";

const cardVariants: Record<AppCardVariant, string> = {
  default:
    "border border-[var(--rgba-17-24-39-006)] bg-white shadow-[0_12px_24px_var(--rgba-31-37-31-005)]",
  muted: "bg-[var(--rgba-29-62-43-004)]",
  warm: "bg-[linear-gradient(135deg,var(--palette-f8f2e4)_0%,var(--palette-ece1c9)_100%)]",
  danger: "border border-[var(--rgba-148-35-30-008)] bg-[var(--rgba-148-35-30-003)]",
  "hero-green":
    "overflow-hidden bg-[linear-gradient(140deg,var(--palette-1f4b37)_0%,var(--palette-143726)_100%)] text-white shadow-[0_20px_36px_var(--rgba-20-55-38-018)]",
  "hero-blue":
    "overflow-hidden bg-[linear-gradient(135deg,var(--palette-24406d)_0%,var(--palette-52699a)_100%)] text-white shadow-[0_18px_34px_var(--rgba-42-54-99-018)]",
  "hero-red":
    "overflow-hidden bg-[linear-gradient(135deg,var(--palette-8b2b1f)_0%,var(--palette-b24535)_100%)] text-white shadow-[0_20px_36px_var(--rgba-148-35-30-016)]",
};

export interface AppCardProps extends ComponentPropsWithoutRef<"section"> {
  variant?: AppCardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingVariants: Record<NonNullable<AppCardProps["padding"]>, string> = {
  none: "",
  sm: "px-4 py-3",
  md: "px-4 py-4",
  lg: "px-5 py-5",
};

export function AppCard({
  className,
  variant = "default",
  padding = "md",
  ...props
}: AppCardProps) {
  return (
    <section
      className={cn(
        "rounded-[1.45rem]",
        cardVariants[variant],
        paddingVariants[padding],
        className,
      )}
      {...props}
    />
  );
}
