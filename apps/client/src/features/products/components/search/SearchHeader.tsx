import { SearchInput } from "@/components/common/SearchInput";
import { SearchResultSummary } from "@/features/products/components/search/SearchResultSummary";

interface SearchHeaderProps {
  query: string;
  resultCount: number;
  isSearching: boolean;
  onChangeQuery: (query: string) => void;
  onResetQuery: () => void;
}

export function SearchHeader({
  query,
  resultCount,
  isSearching,
  onChangeQuery,
  onResetQuery,
}: SearchHeaderProps) {
  return (
    <section className="space-y-3">
      <SearchInput onChange={onChangeQuery} placeholder="원두, 블렌드, 드립백 검색" value={query} />
      {isSearching ? (
        <SearchResultSummary onReset={onResetQuery} query={query} resultCount={resultCount} />
      ) : null}
    </section>
  );
}
