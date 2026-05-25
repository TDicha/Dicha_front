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
    <div className="page-content space-y-5 bg-[var(--surface-base)] pt-4">
      <ProfileCard user={user} />
      <MyStatsSection />
      <MyTasteNoteCard user={user} />
      <MyAccountMenuCard />
      <MyQuickLinksCard />
      <button
          className="mt-3 w-full rounded-[1rem] bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-[var(--text-inverse)]"
          onClick={handleSignOut}
          type="button"
        >
          로그아웃
      </button>
    </div>
  );
}
