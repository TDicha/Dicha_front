import { useEffect, useMemo, useState } from "react";

import { useAppStore } from "@/app/store";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import { SearchInput } from "@/components/common/SearchInput";
import { mockProducts } from "@/mock/products";
import type { Product, ProductBadge } from "@/shared/types/models";

const productPageSize = 4;

const sortOptions = [
  { key: "recommended", label: "추천순" },
  { key: "popular", label: "인기순" },
  { key: "price", label: "가격순" },
] as const;

type SortKey = (typeof sortOptions)[number]["key"];
type CategoryKey = Product["category"] | "all";

const badgePriority: Record<ProductBadge, number> = {
  BEST: 3,
  PICK: 2,
  NEW: 1,
};

function getRecommendationScore(product: Product) {
  const badgeScore = product.badges.reduce(
    (score, badge) => Math.max(score, badgePriority[badge] ?? 0),
    0,
  );

  return (
    badgeScore * 1000 + (product.rating ?? 0) * 100 + (product.reviewCount ?? 0)
  );
}

function getCategoryLabel(product: Product) {
  return product.categoryLabel ?? product.category;
}

export function ProductListPage() {
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedSort, setSelectedSort] = useState<SortKey>("recommended");
  const [visibleCount, setVisibleCount] = useState(productPageSize);

  const categories = useMemo(() => {
    const productCategories = new Map<Product["category"], string>();

    mockProducts.forEach((product) => {
      productCategories.set(product.category, getCategoryLabel(product));
    });

    return [
      { key: "all" as const, label: "전체" },
      ...Array.from(productCategories, ([key, label]) => ({ key, label })),
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const categoryFilteredProducts =
      selectedCategory === "all"
        ? mockProducts
        : mockProducts.filter(
            (product) => product.category === selectedCategory,
          );

    const searchFilteredProducts = normalizedQuery
      ? categoryFilteredProducts.filter((product) =>
          `${product.name} ${product.subtitle} ${product.originLabel ?? ""} ${product.notes.join(" ")}`
            .toLowerCase()
            .includes(normalizedQuery),
        )
      : categoryFilteredProducts;

    return [...searchFilteredProducts].sort((first, second) => {
      if (selectedSort === "popular") {
        return (
          (second.reviewCount ?? 0) - (first.reviewCount ?? 0) ||
          (second.rating ?? 0) - (first.rating ?? 0)
        );
      }

      if (selectedSort === "price") {
        return first.price - second.price;
      }

      return getRecommendationScore(second) - getRecommendationScore(first);
    });
  }, [query, selectedCategory, selectedSort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingProductCount = Math.max(
    filteredProducts.length - visibleProducts.length,
    0,
  );

  useEffect(() => {
    setVisibleCount(productPageSize);
  }, [query, selectedCategory, selectedSort]);

  return (
    <div className="page-content space-y-0 bg-white px-0 pt-0">
      <div className="px-4 py-3">
        <SearchInput
          onChange={setQuery}
          placeholder="원두, 드립백, 구독 상품 검색"
          value={query}
        />
      </div>

      <section className="overflow-x-auto border-b border-[var(--rgba-17-24-39-006)] px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2">
          {categories.map((category) => {
            const isSelected = category.key === selectedCategory;

            return (
              <button
                key={category.key}
                className={[
                  "rounded-full border px-3 py-2 text-sm font-medium transition",
                  isSelected
                    ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
                    : "border-[var(--rgba-17-24-39-008)] bg-white text-[var(--color-primary-green)]",
                ].join(" ")}
                onClick={() => setSelectedCategory(category.key)}
                type="button"
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex items-center gap-3 border-b border-[var(--rgba-17-24-39-006)] px-4 py-3 text-sm text-[var(--color-muted)]">
        {sortOptions.map((sort, index) => (
          <div key={sort.key} className="flex items-center gap-3">
            <button
              className={
                selectedSort === sort.key
                  ? "font-semibold text-[var(--color-primary-green)]"
                  : ""
              }
              onClick={() => setSelectedSort(sort.key)}
              type="button"
            >
              {sort.label}
              {selectedSort === sort.key ? " ✓" : ""}
            </button>
            {index < sortOptions.length - 1 ? (
              <span className="text-[var(--rgba-17-24-39-018)]">|</span>
            ) : null}
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 py-4">
        {visibleProducts.map((product) => (
          <ProductTileCard key={product.id} product={product} />
        ))}
      </div>

      {remainingProductCount > 0 ? (
        <div className="px-4 pb-6 pt-1">
          <button
            className="flex h-11 w-full items-center justify-center rounded-[1rem] border border-[var(--rgba-17-24-39-008)] bg-white text-sm font-medium text-[var(--color-primary-green)]"
            onClick={() =>
              setVisibleCount((current) => current + productPageSize)
            }
            type="button"
          >
            더 보기 ({remainingProductCount}개)
          </button>
        </div>
      ) : null}
    </div>
  );
}
