import type { UserProfile } from "@/shared/types/models";

import { AppCard } from "@/components/common/AppCard";

export function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <AppCard className="overflow-hidden rounded-[1.65rem] shadow-[0_16px_30px_rgba(31,37,31,0.07)]" padding="none">
      <div className="bg-[linear-gradient(135deg,var(--color-primary-green),#315a40)] px-5 py-5 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">{user.tier}</p>
        <h2 className="mt-2 font-heading text-2xl font-semibold">{user.name}</h2>
        <p className="mt-1 text-sm text-white/80">{user.email}</p>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">
          Favorite Flavor
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{user.favoriteFlavor}</p>
      </div>
    </AppCard>
  );
}
