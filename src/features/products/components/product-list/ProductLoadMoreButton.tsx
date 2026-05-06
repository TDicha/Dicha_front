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
    <div className="px-4 pb-6 pt-1">
      <button
        className="flex h-11 w-full items-center justify-center rounded-[1rem] border border-[var(--rgba-17-24-39-008)] bg-white text-sm font-medium text-[var(--color-primary-green)]"
        onClick={onLoadMore}
        type="button"
      >
        더 보기 ({remainingProductCount}개)
      </button>
    </div>
  );
}
