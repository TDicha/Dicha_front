import { Clock3, Search as SearchIcon, TrendingUp } from "lucide-react";
import { useMemo } from "react";

import { useAppStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import { SearchInput } from "@/components/common/SearchInput";
import { mockProducts } from "@/mock/products";

const recommendedKeywords = ["에티오피아", "디카페인", "드립백", "구독", "예가체프", "콜롬비아"];
const recentKeywords = ["케냐", "브라질 세라도", "라이트 로스트"];

export function SearchPage() {
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const resetSearchQuery = useAppStore((state) => state.resetSearchQuery);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];

    return mockProducts.filter((product) =>
      `${product.name} ${product.subtitle} ${product.originLabel ?? ""} ${product.notes.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <section className="space-y-3">
        <SearchInput onChange={setQuery} placeholder="원두, 블렌드, 드립백 검색" value={query} />
        {isSearching ? (
          <AppCard className="text-sm text-[var(--color-muted)]" variant="muted">
            <div className="flex items-center justify-between gap-3">
              <span>
                <strong className="font-semibold text-[var(--color-primary-green)]">&quot;{query}&quot;</strong>
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
          </AppCard>
        ) : null}
      </section>

      {!isSearching ? (
        <>
          <AppCard className="rounded-[1.5rem] px-5 py-5" padding="none" variant="hero-green">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-white/70">SEARCH</p>
                <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                  원하는 원두를
                  <br />
                  빠르게 찾아보세요
                </h1>
                <p className="mt-3 text-sm leading-6 text-white/82">
                  최근 많이 찾는 키워드와 추천 검색어를 먼저 보여드려요.
                </p>
              </div>
              <div className="flex size-20 items-center justify-center rounded-full bg-white/12">
                <SearchIcon className="size-9 text-[#f1d08b]" />
              </div>
            </div>
          </AppCard>

          <AppCard>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-[var(--color-primary-green)]" />
              <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
                추천 검색어
              </h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {recommendedKeywords.map((keyword) => (
                <button
                  key={keyword}
                  className="rounded-full border border-[rgba(29,62,43,0.08)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-primary-green)]"
                  onClick={() => setQuery(keyword)}
                  type="button"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </AppCard>

          <AppCard>
            <div className="flex items-center gap-2">
              <Clock3 className="size-4 text-[var(--color-primary-green)]" />
              <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
                최근 검색
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              {recentKeywords.map((keyword) => (
                <button
                  key={keyword}
                  className="flex w-full items-center justify-between rounded-[1rem] bg-[rgba(29,62,43,0.04)] px-4 py-3 text-left text-sm font-medium text-[var(--color-primary-green)]"
                  onClick={() => setQuery(keyword)}
                  type="button"
                >
                  <span>{keyword}</span>
                  <SearchIcon className="size-4 text-[var(--color-muted)]" />
                </button>
              ))}
            </div>
          </AppCard>
        </>
      ) : filteredProducts.length ? (
        <section className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductTileCard key={product.id} compact product={product} showAddButton={false} />
          ))}
        </section>
      ) : (
        <EmptyState
          description="원두 이름, 산지, 향미 키워드로 다시 검색해 보세요."
          title="일치하는 상품이 없어요"
        />
      )}
    </div>
  );
}
