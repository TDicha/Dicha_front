import { Clock3, Search as SearchIcon } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

interface RecentKeywordSectionProps {
  keywords: string[];
  onSelectKeyword: (keyword: string) => void;
}

export function RecentKeywordSection({ keywords, onSelectKeyword }: RecentKeywordSectionProps) {
  return (
    <AppCard>
      <div className="flex items-center gap-2">
        <Clock3 className="size-4 text-[var(--brand-primary)]" />
        <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">최근 검색</h2>
      </div>
      <div className="mt-4 space-y-3">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className="flex w-full items-center justify-between rounded-[1rem] bg-[var(--surface-brand-tint-4)] px-4 py-3 text-left text-sm font-medium text-[var(--brand-primary)]"
            onClick={() => onSelectKeyword(keyword)}
            type="button"
          >
            <span>{keyword}</span>
            <SearchIcon className="size-4 text-[var(--text-muted)]" />
          </button>
        ))}
      </div>
    </AppCard>
  );
}
