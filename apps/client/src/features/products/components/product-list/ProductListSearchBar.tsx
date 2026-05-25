import { SearchInput } from "@/components/common/SearchInput";

interface ProductListSearchBarProps {
  query: string;
  onChange: (query: string) => void;
}

export function ProductListSearchBar({ query, onChange }: ProductListSearchBarProps) {
  return (
    <div className="px-[var(--page-x)] py-3">
      <SearchInput onChange={onChange} placeholder="원두, 드립백, 구독 상품 검색" value={query} />
    </div>
  );
}
