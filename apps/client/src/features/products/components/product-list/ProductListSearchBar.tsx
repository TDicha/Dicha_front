import { SearchInput } from "@/components/common/SearchInput";

interface ProductListSearchBarProps {
  query: string;
  onChange: (query: string) => void;
}

export function ProductListSearchBar({
  query,
  onChange,
}: ProductListSearchBarProps) {
  return (
    <div className="cafe-tile-bg border-b-[5px] border-[var(--border-cafe-stripe)] px-[var(--page-x)] pb-4 pt-3">
      <SearchInput
        onChange={onChange}
        placeholder="원두, 드립백, 선물세트 검색"
        value={query}
      />
    </div>
  );
}
