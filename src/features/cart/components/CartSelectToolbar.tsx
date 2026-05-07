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
    <section className="border-b border-[var(--palette-e8e3da)] bg-white px-6 py-5">
      <button className="flex w-full items-center justify-between" onClick={onToggleAll} type="button">
        <span className="flex items-center gap-4">
          <span
            className={[
              "flex size-9 items-center justify-center rounded-[0.8rem] border",
              isAllSelected
                ? "border-[var(--second-color)] bg-[var(--second-color)]"
                : "border-[var(--palette-d7d0c5)] bg-white",
            ].join(" ")}
          />
          <span className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[var(--palette-171717)]">
            전체선택
          </span>
        </span>
        <span className="flex items-center gap-3">
          <span className="text-[1.05rem] text-[var(--palette-6f6b63)]">{selectedCount}개 선택됨</span>
          <span
            className="rounded-full bg-[var(--palette-f2efea)] px-3 py-1 text-[0.85rem] font-semibold text-[var(--palette-6f6b63)]"
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
