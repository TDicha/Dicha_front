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
    <section className="border-b border-[var(--border-section-strong)] bg-[var(--surface-base)] px-[var(--page-x)] py-5">
      <button className="flex w-full items-center justify-between gap-3" onClick={onToggleAll} type="button">
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={[
              "flex size-9 items-center justify-center rounded-[0.8rem] border",
              isAllSelected
                ? "border-[var(--brand-secondary)] bg-[var(--brand-secondary)]"
                : "border-[var(--border-warm)] bg-[var(--surface-base)]",
            ].join(" ")}
          />
          <span className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[var(--text-heading)]">
            전체선택
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-[1rem] text-[var(--text-action-subtle)] max-[360px]:hidden">{selectedCount}개 선택됨</span>
          <span
            className="rounded-full bg-[var(--surface-control-muted)] px-3 py-1 text-[0.85rem] font-semibold text-[var(--text-action-subtle)]"
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
