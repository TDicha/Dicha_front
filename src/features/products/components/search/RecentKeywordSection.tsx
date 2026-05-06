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
        <Clock3 className="size-4 text-[var(--color-primary-green)]" />
        <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">최근 검색</h2>
      </div>
      <div className="mt-4 space-y-3">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className="flex w-full items-center justify-between rounded-[1rem] bg-[var(--rgba-29-62-43-004)] px-4 py-3 text-left text-sm font-medium text-[var(--color-primary-green)]"
            onClick={() => onSelectKeyword(keyword)}
            type="button"
          >
            <span>{keyword}</span>
            <SearchIcon className="size-4 text-[var(--color-muted)]" />
          </button>
        ))}
      </div>
    </AppCard>
  );
}
