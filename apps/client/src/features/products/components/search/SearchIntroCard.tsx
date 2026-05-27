import { Search as SearchIcon } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

export function SearchIntroCard() {
  return (
    <AppCard
      className="rounded-[0.4rem] px-5 py-5"
      padding="none"
      variant="chalkboard"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--text-chalk-muted)]">
            SEARCH MENU
          </p>
          <h1 className="mt-2 font-heading text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--text-chalk)]">
            원하는 메뉴를
            <br />
            빠르게 찾아보세요
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-chalk-muted)]">
            원두, 드립백, 선물세트까지 디차의 메뉴를 검색해 보세요.
          </p>
        </div>
        <div className="flex size-16 shrink-0 items-center justify-center border border-[var(--border-chalk-highlight)]">
          <SearchIcon className="size-7 text-[var(--text-chalk)]" />
        </div>
      </div>
    </AppCard>
  );
}
