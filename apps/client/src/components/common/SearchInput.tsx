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
    <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--border-ink-8)] bg-[var(--surface-base)] px-4 py-3 shadow-[0_8px_18px_var(--shadow-ink-alpha-5)]">
      <Search className="size-4 text-[var(--text-muted)]" />
      <input
        className="w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted)]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}
