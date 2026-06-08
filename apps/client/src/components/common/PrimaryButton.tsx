import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrimaryButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "motion-clickable h-[var(--control-height)] rounded-[var(--radius-control)] bg-[var(--brand-primary)] px-5 text-sm font-semibold text-[var(--text-inverse)] shadow-[var(--shadow-button-brand)] hover:bg-[color:var(--surface-brand-solid-alpha)] disabled:shadow-none",
        className,
      )}
      {...props}
    />
  );
}
