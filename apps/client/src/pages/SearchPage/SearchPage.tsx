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

const recommendedKeywords = ["에티오피아", "디카페인", "드립백", "구독", "예가체프", "콜롬비아"];
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
    <div className="page-content space-y-5 bg-[var(--surface-base)] pt-4">
      <SearchHeader
        isSearching={isSearching}
        onChangeQuery={setQuery}
        onResetQuery={resetSearchQuery}
        query={query}
        resultCount={filteredProducts.length}
      />

      {!isSearching ? (
        <div className="grid gap-5">
          <SearchIntroCard />
          <RecommendedKeywordSection keywords={recommendedKeywords} onSelectKeyword={setQuery} />
          <RecentKeywordSection keywords={recentKeywords} onSelectKeyword={setQuery} />
        </div>
      ) : isLoading ? (
        <AppCard className="text-center text-sm text-[var(--text-muted)]">
          검색 결과를 불러오는 중입니다
        </AppCard>
      ) : isError ? (
        <EmptyState
          description="잠시 후 다시 검색해 주세요."
          title="검색 결과를 불러오지 못했어요"
        />
      ) : filteredProducts.length ? (
        <SearchResultGrid products={filteredProducts} />
      ) : (
        <EmptyState
          description="원두 이름, 산지, 향미 키워드로 다시 검색해 보세요."
          title="일치하는 상품이 없어요"
        />
      )}
    </div>
  );
}
