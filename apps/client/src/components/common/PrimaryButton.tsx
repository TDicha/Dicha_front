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
        "h-12 rounded-[1rem] bg-[var(--brand-primary)] px-5 text-sm font-semibold text-[var(--text-inverse)] shadow-[var(--shadow-button-brand)] hover:bg-[color:var(--surface-brand-solid-alpha)]",
        className,
      )}
      {...props}
    />
  );
}
