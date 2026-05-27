import { Check } from "lucide-react";

interface CartSelectToolbarProps {
  isAllSelected: boolean;
  selectedCount: number;
  onRemoveSelected: () => void;
  onToggleAll: () => void;
}

export function CartSelectToolbar({
  isAllSelected,
  selectedCount,
  onRemoveSelected,
  onToggleAll,
}: CartSelectToolbarProps) {
  return (
    <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
      <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Shopping Cart
      </p>
      <button className="flex w-full items-center justify-between gap-3" onClick={onToggleAll} type="button">
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={[
              "flex size-9 items-center justify-center",
              isAllSelected
                ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                : "bg-[var(--surface-cafe-tile)] text-transparent",
            ].join(" ")}
          >
            <Check className="size-5" />
          </span>
          <span className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[var(--text-cafe-ink)]">
            전체선택
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-[1rem] text-[var(--text-action-subtle)] max-[360px]:hidden">{selectedCount}개 선택됨</span>
          <span
            className="bg-[var(--surface-cafe-tile)] px-3 py-1 text-[0.85rem] font-semibold text-[var(--text-cafe-ink)]"
            onClick={(event) => {
              event.stopPropagation();
              onRemoveSelected();
            }}
          >
            선택삭제
          </span>
        </span>
      </button>
    </section>
  );
}
