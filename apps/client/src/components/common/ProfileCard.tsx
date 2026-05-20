import type { UserProfile } from "@/shared/types/models";

import { AppCard } from "@/components/common/AppCard";

export function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <AppCard className="overflow-hidden rounded-[1.65rem] shadow-[0_16px_30px_var(--shadow-ink-alpha-7)]" padding="none">
      <div className="bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-primary-muted))] px-5 py-5 text-[var(--text-inverse)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--overlay-white-70)]">{user.tier}</p>
        <h2 className="mt-2 font-heading text-2xl font-semibold">{user.name}</h2>
        <p className="mt-1 text-sm text-[var(--overlay-white-80)]">{user.email}</p>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-accent)]">
          Favorite Flavor
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{user.favoriteFlavor}</p>
      </div>
    </AppCard>
  );
}
