import { useMemo } from "react";

import { useAppStore } from "@/app/store";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import { SearchInput } from "@/components/common/SearchInput";
import { mockProducts } from "@/mock/products";

export function ProductListPage() {
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const categories = ["전체", "싱글 오리진", "블렌드", "드립백", "굿즈"];
  const sorts = ["추천순", "인기순", "가격순"];

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return mockProducts;

    return mockProducts.filter((product) =>
      `${product.name} ${product.subtitle} ${product.originLabel ?? ""} ${product.notes.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="page-content space-y-0 bg-white px-0 pt-0">
      <div className="px-4 py-3">
        <SearchInput onChange={setQuery} placeholder="원두, 드립백, 구독 상품 검색" value={query} />
      </div>

      <section className="overflow-x-auto border-b border-[rgba(17,24,39,0.06)] px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={[
                "rounded-full border px-3 py-2 text-sm font-medium transition",
                index === 0
                  ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
                  : "border-[rgba(17,24,39,0.08)] bg-white text-[var(--color-primary-green)]",
              ].join(" ")}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="flex items-center gap-3 border-b border-[rgba(17,24,39,0.06)] px-4 py-3 text-sm text-[var(--color-muted)]">
        {sorts.map((sort, index) => (
          <div key={sort} className="flex items-center gap-3">
            <button
              className={index === 0 ? "font-semibold text-[var(--color-primary-green)]" : ""}
              type="button"
            >
              {sort}
              {index === 0 ? " ✓" : ""}
            </button>
            {index < sorts.length - 1 ? <span className="text-[rgba(17,24,39,0.18)]">|</span> : null}
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 py-4">
        {filteredProducts.map((product) => (
          <ProductTileCard key={product.id} product={product} />
        ))}
      </div>

      <div className="px-4 pb-6 pt-1">
        <button
          className="flex h-11 w-full items-center justify-center rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white text-sm font-medium text-[var(--color-primary-green)]"
          type="button"
        >
          더 보기 (26개)
        </button>
      </div>
    </div>
  );
}
