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
        "flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition",
        selected
          ? "border-[var(--color-primary-green)] bg-[rgba(29,62,43,0.06)]"
          : "border-[var(--color-line)] bg-white/85",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <div>
        <p className="text-sm font-semibold text-[var(--color-primary-green)]">{label}</p>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{description}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        {price ? <span className="text-sm text-[var(--color-accent-gold)]">{price}</span> : null}
        <span
          className={[
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
            selected
              ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
              : "border-[rgba(17,24,39,0.12)] text-transparent",
          ].join(" ")}
        >
          ✓
        </span>
      </div>
    </button>
  );
}
