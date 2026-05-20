import { Gift } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";
import type { UserProfile } from "@/shared/types/models";

interface MyTasteNoteCardProps {
  user: UserProfile;
}

export function MyTasteNoteCard({ user }: MyTasteNoteCardProps) {
  return (
    <AppCard variant="warm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--text-muted)]">
            TASTE NOTE
          </p>
          <h2 className="mt-2 font-heading text-lg font-semibold text-[var(--brand-primary)]">
            {user.favoriteFlavor}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            최근 주문과 취향 테스트를 바탕으로 오늘의 추천 원두를 계속
            업데이트하고 있어요.
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--overlay-white-75)] text-[var(--brand-primary)]">
          <Gift className="size-5" />
        </div>
      </div>
    </AppCard>
  );
}
