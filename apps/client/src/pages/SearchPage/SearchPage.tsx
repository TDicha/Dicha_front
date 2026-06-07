import { useEffect } from "react";

import { useAppStore } from "@/app/store";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import {
  RecentKeywordSection,
  RecommendedKeywordSection,
  SearchHeader,
  SearchIntroCard,
  SearchResultGrid,
  useProducts,
  useRecentKeywords,
} from "@/features/products";

const recommendedKeywords: string[] = [];

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
  const { recentKeywords, addRecentKeyword } = useRecentKeywords();

  // Front-only 임시 처리: 사용자가 입력을 멈춘 뒤 검색 결과가 있으면
  // 해당 키워드를 최근 검색에 저장한다.
  useEffect(() => {
    if (!isSearching || isLoading || isError || filteredProducts.length === 0) {
      return;
    }

    const trimmed = query.trim();
    const timer = window.setTimeout(() => {
      addRecentKeyword(trimmed);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [
    query,
    isSearching,
    isLoading,
    isError,
    filteredProducts.length,
    addRecentKeyword,
  ]);

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
          <LoadingScreen
            className="min-h-[11rem] rounded-none bg-[var(--surface-menu-board)]"
            message="검색 결과를 불러오는 중"
          />
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
