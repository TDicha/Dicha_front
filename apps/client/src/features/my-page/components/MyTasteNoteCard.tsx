import { Gift } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";
import type { UserProfile } from "@/shared/types/models";

interface MyTasteNoteCardProps {
  user: UserProfile;
}

export function MyTasteNoteCard({ user }: MyTasteNoteCardProps) {
  return (
    <AppCard
      className="mx-[var(--page-x)] rounded-[1.55rem]"
      variant="menu-board"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
            TASTE NOTE
          </p>
          <h2 className="mt-2 font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
            {user.favoriteFlavor}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            최근 주문과 취향 테스트를 바탕으로 오늘의 추천 원두를 계속
            업데이트하고 있어요.
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]">
          <Gift className="size-5" />
        </div>
      </div>
    </AppCard>
  );
}
