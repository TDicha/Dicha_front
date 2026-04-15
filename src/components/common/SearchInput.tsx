import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "원두, 드립백, 구독 상품 검색",
}: SearchInputProps) {
  return (
    <label className="flex items-center gap-3 rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(31,37,31,0.05)]">
      <Search className="size-4 text-[var(--color-muted)]" />
      <input
        className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--color-muted)]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}
