import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface AuthFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  icon?: ReactNode;
}

export function AuthField({ label, icon, className, ...props }: AuthFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      <div className="flex items-center gap-3 rounded-[1rem] border border-[var(--border-ink-8)] bg-[var(--surface-base)] px-4 py-3">
        {icon}
        <input
          className={[
            "w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted)]",
            className,
          ].join(" ")}
          {...props}
        />
      </div>
    </label>
  );
}
