import { Clock3, Search as SearchIcon } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

interface RecentKeywordSectionProps {
  keywords: string[];
  onSelectKeyword: (keyword: string) => void;
}

export function RecentKeywordSection({
  keywords,
  onSelectKeyword,
}: RecentKeywordSectionProps) {
  return (
    <AppCard className="rounded-[1.55rem]" variant="menu-board">
      <div className="flex items-center gap-2">
        <Clock3 className="size-4 text-[var(--text-cafe-ink)]" />
        <h2 className="font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
          최근 검색
        </h2>
      </div>
      <div className="mt-4 space-y-3">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className="flex w-full items-center justify-between border-b border-[var(--border-tile-grout)] px-1 py-3 text-left text-sm font-medium text-[var(--text-cafe-ink)] last:border-b-0"
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
