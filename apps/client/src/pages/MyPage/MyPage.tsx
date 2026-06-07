import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { ProfileCard } from "@/components/common/ProfileCard";
import {
  MyQuickLinksCard,
  MyStatsSection,
} from "@/features/my-page";
import { ROUTES } from "@/shared/constants/routes";

export function MyPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  if (!user) return null;

  async function handleSignOut() {
    await signOut();
    navigate(ROUTES.login);
  }

  return (
    <div className="page-content cafe-tile-bg space-y-5 px-0 pb-24 pt-5">
      <ProfileCard user={user} />
      <AppCard className="mx-[var(--page-x)] overflow-hidden rounded-none">
        <div className="divide-y divide-[var(--border-tile-grout)]">
          <MyStatsSection />
          <MyQuickLinksCard />
        </div>
      </AppCard>
        <button
          className="w-full bg-[var(--surface-menu-board)] px-4 py-4 text-sm font-semibold text-[var(--text-cafe-ink)]"
          onClick={handleSignOut}
          type="button"
        >
          로그아웃
        </button>
    </div>
  );
}
