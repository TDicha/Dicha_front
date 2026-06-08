import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { ProfileCard } from "@/components/common/ProfileCard";
import {
  MyQuickLinksCard,
  MyStatsSection,
  MyTasteProfileCard,
} from "@/features/my-page";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import { ROUTES } from "@/shared/constants/routes";
import { updateProfile } from "@/services/auth/authService";

interface ApiSubscription {
  id: number | string;
  status?: string;
}

function isCurrentOrderStatus(status: string) {
  return !["delivered", "canceled", "refunded"].includes(status);
}

async function fetchSubscriptions() {
  const { data } = await apiClient.get<ApiSubscription[]>(
    endpoints.subscriptions.list,
  );

  return data;
}

export function MyPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.login);
  const signOut = useAuthStore((state) => state.signOut);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const { data: orders = [], isLoading: isOrdersLoading } = useOrders();
  const {
    data: subscriptions = [],
    isLoading: isSubscriptionsLoading,
  } = useQuery({
    queryKey: ["subscriptions", "list"],
    queryFn: fetchSubscriptions,
  });

  useEffect(() => {
    if (!user || isEditingProfile) {
      return;
    }

    setName(user.name);
    setEmail(user.email);
  }, [isEditingProfile, user]);

  if (!user) return null;

  const currentOrderCount = orders.filter((order) =>
    isCurrentOrderStatus(order.status),
  ).length;
  const cancelClaimCount = orders.filter((order) =>
    ["canceled", "refunded"].includes(order.status),
  ).length;
  const hasActiveSubscription = subscriptions.some(
    (subscription) => subscription.status?.toUpperCase() !== "CANCELLED",
  );

  async function handleSignOut() {
    await signOut();
    navigate(ROUTES.login);
  }

  function handleStartEditProfile() {
    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setPassword("");
    setProfileMessage(null);
    setProfileError(null);
    setIsEditingProfile(true);
  }

  function handleCancelEditProfile() {
    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setPassword("");
    setProfileMessage(null);
    setProfileError(null);
    setIsEditingProfile(false);
  }

  async function handleUpdateProfile() {
    if (!name.trim()) {
      setProfileError("이름을 입력해 주세요.");
      return;
    }
    if (!email.trim()) {
      setProfileError("이메일을 입력해 주세요.");
      return;
    }

    setIsSavingProfile(true);
    setProfileError(null);
    setProfileMessage(null);

    try {
      const updated = await updateProfile({
        name: name.trim(),
        password: password.trim() || undefined,
      });

      setUser(updated);
      setPassword("");
      setIsEditingProfile(false);
      setProfileMessage("회원 정보가 수정되었습니다.");
    } catch {
      setProfileError("회원 정보 수정에 실패했습니다.");
    } finally {
      setIsSavingProfile(false);
    }
  }

  return (
    <div className="page-content cafe-tile-bg space-y-5 px-0 pb-24 pt-5">
      <ProfileCard user={user} />
      <MyTasteProfileCard user={user} />
      <AppCard className="mx-[var(--page-x)] overflow-hidden rounded-none">
        <div className="divide-y divide-[var(--border-tile-grout)]">
          <MyStatsSection
            cancelClaimCount={cancelClaimCount}
            currentOrderCount={currentOrderCount}
            isLoading={isOrdersLoading || isSubscriptionsLoading}
            subscriptionStatus={hasActiveSubscription ? "구독중" : "안함"}
          />
          <MyQuickLinksCard />
        </div>
      </AppCard>
      <AppCard className="mx-[var(--page-x)] rounded-none">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Profile
        </p>
        <h2 className="pb-3 pt-1 font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
          회원 정보 수정
        </h2>
        <div className="grid gap-3 text-sm">
          {isEditingProfile ? (
            <>
              <input
                className="h-11 rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-3 text-sm text-[var(--brand-primary)]"
                onChange={(event) => setName(event.target.value)}
                placeholder="이름"
                value={name}
              />
              <input
                className="h-11 rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-3 text-sm text-[var(--brand-primary)]"
                disabled
                placeholder="이메일"
                type="email"
                value={email}
              />
              <input
                className="h-11 rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-3 text-sm text-[var(--brand-primary)]"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="새 비밀번호 (변경 시 입력)"
                type="password"
                value={password}
              />
            </>
          ) : (
            <div className="divide-y divide-[var(--border-tile-grout)] border-y border-[var(--border-tile-grout)]">
              <div className="flex items-center justify-between gap-4 py-3">
                <span className="text-[var(--text-muted)]">이름</span>
                <span className="font-medium text-[var(--brand-primary)]">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <span className="text-[var(--text-muted)]">이메일</span>
                <span className="truncate font-medium text-[var(--brand-primary)]">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <span className="text-[var(--text-muted)]">비밀번호</span>
              </div>
            </div>
          )}
          {profileMessage ? (
            <p className="text-sm text-[var(--brand-primary)]">{profileMessage}</p>
          ) : null}
          {profileError ? (
            <p className="text-sm text-[var(--state-danger)]">{profileError}</p>
          ) : null}
          <div className="grid gap-2">
            <button
              className="h-11 bg-[var(--surface-chalkboard)] text-sm font-semibold text-[var(--text-chalk)]"
              disabled={isSavingProfile}
              onClick={
                isEditingProfile
                  ? () => void handleUpdateProfile()
                  : handleStartEditProfile
              }
              type="button"
            >
              {isSavingProfile ? "저장 중" : isEditingProfile ? "저장" : "수정"}
            </button>
            {isEditingProfile ? (
              <button
                className="h-11 border border-[var(--border-muted)] bg-[var(--surface-base)] text-sm font-semibold text-[var(--brand-primary)]"
                disabled={isSavingProfile}
                onClick={handleCancelEditProfile}
                type="button"
              >
                취소
              </button>
            ) : null}
          </div>
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
