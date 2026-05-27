import { useMemo, useState } from "react";

import { useAppStore } from "@/app/store";
import { EmptyState } from "@/components/common/EmptyState";
import {
  ProductCategoryFilter,
  ProductGrid,
  ProductListSearchBar,
  ProductLoadMoreButton,
  ProductShelfSection,
  ProductSortTabs,
  ProductTypeTabs,
  type ProductCategoryKey,
  type ProductSortKey,
  type ProductTypeKey,
  type ProductTypeOption,
} from "@/features/products";
import { useProducts } from "@/features/products";
import type { Product, ProductBadge } from "@/shared/types/models";

const productPageSize = 4;

const sortOptions = [
  { key: "recommended", label: "추천순" },
  { key: "popular", label: "인기순" },
  { key: "price", label: "가격순" },
] as const;

const productTypeOptions: readonly ProductTypeOption[] = [
  {
    key: "beans",
    label: "원두",
    description: "원산지와 로스팅 취향에 맞춰 원두를 골라보세요.",
  },
  {
    key: "drip-bag",
    label: "드립백",
    description: "간편하게 내리는 디차의 시그니처 한 잔을 만나보세요.",
  },
  {
    key: "gift-set",
    label: "선물세트",
    description: "향 좋은 마음을 전하는 디차의 선물 구성을 준비했습니다.",
  },
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

function sortProducts(products: Product[], selectedSort: ProductSortKey) {
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
}

function getShelfProducts(
  products: Product[],
  badge: ProductBadge,
  excludedIds: Set<string> = new Set(),
) {
  const availableProducts = products.filter(
    (product) => !excludedIds.has(product.id),
  );
  const taggedProducts = availableProducts.filter((product) =>
    product.badges.includes(badge),
  );

  return (taggedProducts.length ? taggedProducts : availableProducts).slice(
    0,
    3,
  );
}

export function ProductListPage() {
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const [selectedProductType, setSelectedProductType] =
    useState<ProductTypeKey>("beans");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryKey>("all");
  const [selectedSort, setSelectedSort] =
    useState<ProductSortKey>("recommended");
  const [visibleCount, setVisibleCount] = useState(productPageSize);
  const normalizedQuery = query.trim();
  const isSearching = Boolean(normalizedQuery);
  const productParams = isSearching ? { query: normalizedQuery } : undefined;
  const {
    data: products = [],
    isError,
    isLoading,
  } = useProducts(productParams);

  const typedProducts = useMemo(
    () =>
      products.filter((product) => product.productType === selectedProductType),
    [products, selectedProductType],
  );

  const categories = useMemo(() => {
    const productCategories = new Map<Product["category"], string>();

    typedProducts.forEach((product) => {
      productCategories.set(product.category, getCategoryLabel(product));
    });

    return [
      { key: "all" as const, label: "전체" },
      ...Array.from(productCategories, ([key, label]) => ({ key, label })),
    ];
  }, [typedProducts]);

  const filteredProducts = useMemo(() => {
    const scopedProducts = isSearching
      ? products
      : typedProducts.filter(
          (product) =>
            selectedCategory === "all" || product.category === selectedCategory,
        );

    return sortProducts(scopedProducts, selectedSort);
  }, [isSearching, products, selectedCategory, selectedSort, typedProducts]);

  const curatedProducts = useMemo(
    () => sortProducts(typedProducts, "recommended"),
    [typedProducts],
  );
  const bestProducts = useMemo(
    () => getShelfProducts(curatedProducts, "BEST"),
    [curatedProducts],
  );
  const bestProductIds = useMemo(
    () => new Set(bestProducts.map((product) => product.id)),
    [bestProducts],
  );
  const ownerPickProducts = useMemo(
    () => getShelfProducts(curatedProducts, "PICK", bestProductIds),
    [bestProductIds, curatedProducts],
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingProductCount = Math.max(
    filteredProducts.length - visibleProducts.length,
    0,
  );

  return (
    <div className="page-content cafe-tile-bg space-y-0 px-0 pt-0">
      <ProductListSearchBar
        onChange={(nextQuery) => {
          setQuery(nextQuery);
          setVisibleCount(productPageSize);
        }}
        query={query}
      />

      {!isSearching ? (
        <>
          <ProductTypeTabs
            onSelectType={(type) => {
              setSelectedProductType(type);
              setSelectedCategory("all");
              setVisibleCount(productPageSize);
            }}
            options={productTypeOptions}
            selectedType={selectedProductType}
          />

          {!isLoading && !isError ? (
            <div className="cafe-tile-bg space-y-5">
              <ProductShelfSection
                description="많은 분들이 가장 먼저 고른 디차의 인기 메뉴"
                eyebrow="Best Selection"
                products={bestProducts}
                title="베스트 상품 추천"
                tone="chalkboard"
              />
              <ProductShelfSection
                description="오늘 매장에서 권하고 싶은 풍미 좋은 메뉴"
                eyebrow="Owner's Pick"
                products={ownerPickProducts}
                title="사장님 추천"
                tone="wood"
              />
            </div>
          ) : null}
        </>
      ) : null}

      <section className="bg-[var(--surface-menu-board)] pb-2 pt-6">
        <div className="px-[var(--page-x)]">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Menu List
          </p>
          <h2 className="mt-1 font-heading text-[1.4rem] font-semibold text-[var(--text-cafe-ink)]">
            {isSearching ? "검색 결과" : "전체 상품"}
          </h2>
        </div>

        {!isSearching ? (
          <ProductCategoryFilter
            categories={categories}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setVisibleCount(productPageSize);
            }}
            selectedCategory={selectedCategory}
          />
        ) : null}

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
            onLoadMore={() =>
              setVisibleCount((current) => current + productPageSize)
            }
            remainingProductCount={remainingProductCount}
          />
        ) : null}
      </section>
    </div>
  );
}
