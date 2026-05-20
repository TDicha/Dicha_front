interface OptionRowProps {
  label: string;
  description?: string;
  price?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function OptionRow({ label, description, price, selected = false, onClick }: OptionRowProps) {
  return (
    <button
      className={[
        "flex w-full items-start justify-between gap-3 rounded-[1.1rem] border px-4 py-4 text-left transition-all duration-200",
        selected
          ? "border-[var(--border-check)] bg-[var(--surface-check-tint)] shadow-[0_10px_18px_var(--state-check-shadow)]"
          : "border-[var(--surface-brand-tint-9)] bg-[var(--surface-base)] hover:border-[var(--surface-brand-tint-18)]",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--brand-primary)]">{label}</p>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{description}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {price ? (
          <span className="text-sm font-medium text-[var(--brand-primary)]">{price}</span>
        ) : null}
        <span
          className={[
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected
              ? "border-[var(--state-check-solid)] bg-[var(--state-check-solid)] text-[var(--text-inverse)]"
              : "border-[var(--border-ink-14)] bg-[var(--surface-base)] text-[var(--text-transparent)]",
          ].join(" ")}
        >
          <span className="size-2 rounded-full bg-current" />
        </span>
      </div>
    </button>
  );
}
