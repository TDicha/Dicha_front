import { AppCard } from "@/components/common/AppCard";

interface SearchResultSummaryProps {
  query: string;
  resultCount: number;
  onReset: () => void;
}

export function SearchResultSummary({ query, resultCount, onReset }: SearchResultSummaryProps) {
  return (
    <AppCard className="text-sm text-[var(--color-muted)]" variant="muted">
      <div className="flex items-center justify-between gap-3">
        <span>
          <strong className="font-semibold text-[var(--color-primary-green)]">&quot;{query}&quot;</strong>
          에 대한 검색 결과 {resultCount}개
        </span>
        <button
          className="shrink-0 font-medium text-[var(--color-primary-green)]"
          onClick={onReset}
          type="button"
        >
          초기화
        </button>
      </div>
    </AppCard>
  );
}
