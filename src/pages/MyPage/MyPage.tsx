import { Bell, ChevronRight, CreditCard, Gift, Heart, Settings, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { ProfileCard } from "@/components/common/ProfileCard";
import { StatCard } from "@/components/common/StatCard";
import { accountSectionRoute } from "@/shared/constants/accountSections";
import { ROUTES } from "@/shared/constants/routes";

const sections = [
  { icon: CreditCard, label: "결제 수단 관리" },
  { icon: Heart, label: "관심 원두 / 즐겨찾기" },
  { icon: Bell, label: "알림 설정" },
  { icon: ShieldCheck, label: "보안 및 인증 설정" },
  { icon: Settings, label: "앱 설정" },
];

const quickLinks = [
  { label: "주문 조회", to: ROUTES.orders },
  { label: "구독 관리", to: ROUTES.subscription },
  { label: "나의 블렌드", to: ROUTES.myBlend },
] as const;

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
    <div className="page-content space-y-5 bg-white pt-4">
      <ProfileCard user={user} />

      <section className="grid grid-cols-3 gap-3">
        <StatCard label="주문 횟수" value="12" />
        <StatCard label="저장 블렌드" value="4" />
        <StatCard label="멤버십" value="Gold" />
      </section>

      <AppCard variant="warm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-muted)]">
              TASTE NOTE
            </p>
            <h2 className="mt-2 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              {user.favoriteFlavor}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              최근 주문과 취향 테스트를 바탕으로 오늘의 추천 원두를 계속 업데이트하고 있어요.
            </p>
          </div>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/75 text-[var(--color-primary-green)]">
            <Gift className="size-5" />
          </div>
        </div>
      </AppCard>

      <AppCard className="py-2">
        <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
          계정 관리
        </h2>
        <div className="space-y-0">
          {sections.map(({ icon: Icon, label }) => (
            <Link
              key={label}
              className="flex w-full items-center justify-between border-b border-[rgba(17,24,39,0.06)] py-4 text-left last:border-b-0"
              to={accountSectionRoute(
                label === "결제 수단 관리"
                  ? "payment"
                  : label === "관심 원두 / 즐겨찾기"
                    ? "favorites"
                    : label === "알림 설정"
                      ? "notifications"
                      : label === "보안 및 인증 설정"
                        ? "security"
                        : "app-settings",
              )}
            >
              <span className="flex items-center gap-3 text-sm font-medium text-[var(--color-primary-green)]">
                <Icon className="size-4" />
                {label}
              </span>
              <ChevronRight className="size-4 text-[var(--color-muted)]" />
            </Link>
          ))}
        </div>
      </AppCard>

      <AppCard variant="muted">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              인증 화면 확인
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              현재는 mock 로그인 상태라서 필요할 때 직접 로그인/회원가입 화면으로 이동해 테스트할 수 있어요.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            className="rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3 text-center text-sm font-medium text-[var(--color-primary-green)]"
            to={ROUTES.login}
          >
            로그인 보기
          </Link>
          <Link
            className="rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3 text-center text-sm font-medium text-[var(--color-primary-green)]"
            to={ROUTES.signup}
          >
            회원가입 보기
          </Link>
        </div>
        <button
          className="mt-3 w-full rounded-[1rem] bg-[var(--color-primary-green)] px-4 py-3 text-sm font-semibold text-white"
          onClick={handleSignOut}
          type="button"
        >
          로그아웃 후 로그인 테스트하기
        </button>
      </AppCard>

      <AppCard className="py-2">
        <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
          활동 바로가기
        </h2>
        {quickLinks.map(({ label, to }, index) => (
          <Link
            key={label}
            className={[
              "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--color-primary-green)]",
              index < 2 ? "border-b border-[rgba(17,24,39,0.06)]" : "",
            ].join(" ")}
            to={to}
          >
            <span>{label}</span>
            <ChevronRight className="size-4 text-[var(--color-muted)]" />
          </Link>
        ))}
      </AppCard>
    </div>
  );
}
