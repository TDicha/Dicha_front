import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { ProfileCard } from "@/components/common/ProfileCard";
import {
  MyAccountMenuCard,
  MyQuickLinksCard,
  MyStatsSection,
  MyTasteNoteCard,
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
      <MyStatsSection />
      <MyQuickLinksCard />
      <MyAccountMenuCard />
      <div className="px-[var(--page-x)] pb-4 pt-1">
        <button
          className="w-full rounded-[1.55rem] border-[3px] border-[var(--border-menu-board)] bg-[var(--surface-menu-board)] px-4 py-4 text-sm font-semibold text-[var(--text-cafe-ink)] shadow-[var(--shadow-card-subtle)]"
          onClick={handleSignOut}
          type="button"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
