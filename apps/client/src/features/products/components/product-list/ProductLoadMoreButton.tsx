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
        className="flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-[var(--border-ink-8)] bg-[var(--surface-base)] text-sm font-medium text-[var(--brand-primary)]"
        onClick={onLoadMore}
        type="button"
      >
        더 보기 ({remainingProductCount}개)
      </button>
    </div>
  );
}
