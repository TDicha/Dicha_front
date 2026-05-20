import { Search as SearchIcon } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

export function SearchIntroCard() {
  return (
    <AppCard className="rounded-[1.5rem] px-5 py-5" padding="none" variant="hero-green">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--overlay-white-70)]">SEARCH</p>
          <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em] text-[var(--text-inverse)]">
            원하는 원두를
            <br />
            빠르게 찾아보세요
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--overlay-white-82)]">
            최근 많이 찾는 키워드와 추천 검색어를 먼저 보여드려요.
          </p>
        </div>
        <div className="flex size-20 items-center justify-center rounded-full bg-[var(--overlay-white-12)]">
          <SearchIcon className="size-9 text-[var(--icon-accent)]" />
        </div>
      </div>
    </AppCard>
  );
}
