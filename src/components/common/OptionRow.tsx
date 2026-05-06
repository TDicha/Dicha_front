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
          ? "border-[var(--rgba-0-117-74-036)] bg-[var(--rgba-0-117-74-007)] shadow-[0_10px_18px_var(--rgba-0-117-74-008)]"
          : "border-[var(--rgba-29-62-43-009)] bg-white hover:border-[var(--rgba-29-62-43-018)]",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--color-primary-green)]">{label}</p>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{description}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {price ? (
          <span className="text-sm font-medium text-[var(--color-primary-green)]">{price}</span>
        ) : null}
        <span
          className={[
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected
              ? "border-[var(--rgb-0-117-74)] bg-[var(--rgb-0-117-74)] text-white"
              : "border-[var(--rgba-17-24-39-014)] bg-white text-transparent",
          ].join(" ")}
        >
          <span className="size-2 rounded-full bg-current" />
        </span>
      </div>
    </button>
  );
}
