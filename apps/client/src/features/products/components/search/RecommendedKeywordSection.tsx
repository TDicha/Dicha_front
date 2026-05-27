import { TrendingUp } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

interface RecommendedKeywordSectionProps {
  keywords: string[];
  onSelectKeyword: (keyword: string) => void;
}

export function RecommendedKeywordSection({
  keywords,
  onSelectKeyword,
}: RecommendedKeywordSectionProps) {
  return (
    <AppCard className="rounded-[0.4rem]" variant="wood">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-4 text-[var(--text-inverse)]" />
        <h2 className="font-heading text-lg font-semibold text-[var(--text-inverse)]">
          추천 검색어
        </h2>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className="border border-[var(--text-wood-muted)] bg-[var(--surface-menu-board)] px-3 py-2 text-sm font-medium text-[var(--text-cafe-ink)]"
            onClick={() => onSelectKeyword(keyword)}
            type="button"
          >
            {keyword}
          </button>
        ))}
      </div>
    </AppCard>
  );
}
