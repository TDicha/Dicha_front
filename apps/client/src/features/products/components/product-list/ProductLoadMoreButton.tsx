interface ProductLoadMoreButtonProps {
  remainingProductCount: number;
  onLoadMore: () => void;
}

export function ProductLoadMoreButton({
  remainingProductCount,
  onLoadMore,
}: ProductLoadMoreButtonProps) {
  if (remainingProductCount <= 0) {
    return null;
  }

  return (
    <div className="px-[var(--page-x)] pb-6 pt-1">
      <button
        className="flex h-11 w-full items-center justify-center border border-[var(--border-menu-board)] bg-[var(--surface-menu-board)] text-sm font-medium text-[var(--text-cafe-ink)]"
        onClick={onLoadMore}
        type="button"
      >
        더 보기 ({remainingProductCount}개)
      </button>
    </div>
  );
}
