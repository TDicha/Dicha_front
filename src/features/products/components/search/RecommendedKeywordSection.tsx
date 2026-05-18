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
    <AppCard>
      <div className="flex items-center gap-2">
        <TrendingUp className="size-4 text-[var(--brand-primary)]" />
        <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">추천 검색어</h2>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className="rounded-full border border-[var(--surface-brand-tint-8)] bg-[var(--surface-base)] px-3 py-2 text-sm font-medium text-[var(--brand-primary)]"
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
