import { useAppStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import {
  RecentKeywordSection,
  RecommendedKeywordSection,
  SearchHeader,
  SearchIntroCard,
  SearchResultGrid,
  useProducts,
} from "@/features/products";

const recommendedKeywords = [
  "에티오피아",
  "디카페인",
  "드립백",
  "선물세트",
  "블렌드",
  "콜롬비아",
];
const recentKeywords = ["케냐", "브라질 세라도", "라이트 로스트"];

export function SearchPage() {
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const resetSearchQuery = useAppStore((state) => state.resetSearchQuery);
  const isSearching = query.trim().length > 0;
  const {
    data: filteredProducts = [],
    isError,
    isLoading,
  } = useProducts(isSearching ? { query: query.trim() } : undefined);

  return (
    <div className="page-content cafe-tile-bg space-y-0 px-0 pb-24 pt-0">
      <SearchHeader
        isSearching={isSearching}
        onChangeQuery={setQuery}
        onResetQuery={resetSearchQuery}
        query={query}
        resultCount={filteredProducts.length}
      />

      {!isSearching ? (
        <div className="grid gap-5 px-[var(--page-x)] pb-8 pt-5">
          <SearchIntroCard />
          <RecommendedKeywordSection
            keywords={recommendedKeywords}
            onSelectKeyword={setQuery}
          />
          <RecentKeywordSection
            keywords={recentKeywords}
            onSelectKeyword={setQuery}
          />
        </div>
      ) : isLoading ? (
        <div className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
          <AppCard
            className="text-center text-sm text-[var(--text-muted)]"
            variant="menu-board"
          >
            검색 결과를 불러오는 중입니다
          </AppCard>
        </div>
      ) : isError ? (
        <div className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
          <EmptyState
            description="잠시 후 다시 검색해 주세요."
            title="검색 결과를 불러오지 못했어요"
          />
        </div>
      ) : filteredProducts.length ? (
        <div className="bg-[var(--surface-menu-board)] px-[var(--page-x)] pb-8 pt-5">
          <SearchResultGrid products={filteredProducts} />
        </div>
      ) : (
        <div className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
          <EmptyState
            description="원두 이름, 드립백, 선물 키워드로 다시 검색해 보세요."
            title="일치하는 상품이 없어요"
          />
        </div>
      )}
    </div>
  );
}
