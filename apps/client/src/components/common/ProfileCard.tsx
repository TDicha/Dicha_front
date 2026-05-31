import type { UserProfile } from "@/shared/types/models";

import { AppCard } from "@/components/common/AppCard";

export function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <AppCard
      className="mx-[var(--page-x)] overflow-hidden rounded-none"
      padding="none"
      variant="chalkboard"
    >
      <div className="px-5 py-5">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-chalk-muted)]">
          {user.tier}
        </p>
        <h2 className="mt-2 font-heading text-2xl font-semibold text-[var(--text-chalk)]">
          {user.name}
        </h2>
        <p className="mt-1 text-sm text-[var(--text-chalk-muted)]">
          {user.email}
        </p>
      </div>
      <div className="border-t border-dashed border-[var(--border-chalk-highlight)] px-5 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-chalk-muted)]">
          Favorite Flavor
        </p>
        <p className="mt-2 text-sm font-medium text-[var(--text-chalk)]">
          {user.favoriteFlavor}
        </p>
      </div>
    </AppCard>
  );
}
