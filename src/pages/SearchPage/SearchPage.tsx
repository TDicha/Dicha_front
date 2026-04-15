import { useMemo } from "react";

import { useAppStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import { SearchInput } from "@/components/common/SearchInput";
import { mockProducts } from "@/mock/products";

export function SearchPage() {
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const resetSearchQuery = useAppStore((state) => state.resetSearchQuery);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return mockProducts.slice(0, 4);

    return mockProducts.filter((product) =>
      `${product.name} ${product.subtitle} ${product.originLabel ?? ""} ${product.notes.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <section className="space-y-3">
        <SearchInput onChange={setQuery} value={query} />
        <AppCard className="text-sm text-[var(--color-muted)]" variant="muted">
          {query.trim() ? (
            <div className="flex items-center justify-between gap-3">
              <span>
                <strong className="font-semibold text-[var(--color-primary-green)]">
                  &quot;{query}&quot;
                </strong>
                에 대한 검색 결과 {filteredProducts.length}개
              </span>
              <button
                className="shrink-0 font-medium text-[var(--color-primary-green)]"
                onClick={resetSearchQuery}
                type="button"
              >
                초기화
              </button>
            </div>
          ) : (
            <span>인기 원두와 최근 많이 찾은 상품을 먼저 보여드리고 있어요.</span>
          )}
        </AppCard>
      </section>

      {filteredProducts.length ? (
        <section className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductTileCard
              key={product.id}
              compact
              product={product}
              showAddButton={false}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          description="원두 이름, 산지, 취향 키워드로 다시 검색해 보세요."
          title="일치하는 상품이 없어요"
        />
      )}
    </div>
  );
}
