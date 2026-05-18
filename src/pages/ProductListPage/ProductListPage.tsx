import { useMemo, useState } from "react";

import { useAppStore } from "@/app/store";
import { EmptyState } from "@/components/common/EmptyState";
import {
  ProductCategoryFilter,
  ProductGrid,
  ProductListSearchBar,
  ProductLoadMoreButton,
  ProductSortTabs,
  type ProductCategoryKey,
  type ProductSortKey,
} from "@/features/products";
import { useProducts } from "@/features/products";
import type { Product, ProductBadge } from "@/shared/types/models";

const productPageSize = 4;

const sortOptions = [
  { key: "recommended", label: "추천순" },
  { key: "popular", label: "인기순" },
  { key: "price", label: "가격순" },
] as const;

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
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryKey>("all");
  const [selectedSort, setSelectedSort] = useState<ProductSortKey>("recommended");
  const [visibleCount, setVisibleCount] = useState(productPageSize);
  const productParams = {
    ...(selectedCategory === "all" ? {} : { category: selectedCategory }),
    ...(query.trim() ? { query: query.trim() } : {}),
  };
  const { data: products = [], isError, isLoading } = useProducts(productParams);
  const { data: allProducts = [] } = useProducts();

  const categories = useMemo(() => {
    const productCategories = new Map<Product["category"], string>();

    allProducts.forEach((product) => {
      productCategories.set(product.category, getCategoryLabel(product));
    });

    return [
      { key: "all" as const, label: "전체" },
      ...Array.from(productCategories, ([key, label]) => ({ key, label })),
    ];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return [...products].sort((first, second) => {
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
  }, [products, selectedSort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingProductCount = Math.max(
    filteredProducts.length - visibleProducts.length,
    0,
  );

  return (
    <div className="page-content space-y-0 bg-[var(--surface-base)] px-0 pt-0">
      <ProductListSearchBar
        onChange={(nextQuery) => {
          setQuery(nextQuery);
          setVisibleCount(productPageSize);
        }}
        query={query}
      />
      <ProductCategoryFilter
        categories={categories}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setVisibleCount(productPageSize);
        }}
        selectedCategory={selectedCategory}
      />
      <ProductSortTabs
        onSelectSort={(sort) => {
          setSelectedSort(sort);
          setVisibleCount(productPageSize);
        }}
        options={sortOptions}
        selectedSort={selectedSort}
      />

      {isLoading ? (
        <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
          상품을 불러오는 중입니다
        </div>
      ) : isError ? (
        <div className="px-4 py-4">
          <EmptyState
            description="잠시 후 다시 시도해 주세요."
            title="상품을 불러오지 못했어요"
          />
        </div>
      ) : visibleProducts.length ? (
        <ProductGrid products={visibleProducts} />
      ) : (
        <div className="px-4 py-4">
          <EmptyState
            description="검색어나 카테고리를 바꿔 다시 찾아보세요."
            title="조건에 맞는 상품이 없어요"
          />
        </div>
      )}

      {!isLoading && !isError && remainingProductCount > 0 ? (
        <ProductLoadMoreButton
          onLoadMore={() => setVisibleCount((current) => current + productPageSize)}
          remainingProductCount={remainingProductCount}
        />
      ) : null}
    </div>
  );
}
