import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { accountSectionRoute } from "@/shared/constants/accountSections";

const accountMenuItems = [
  { icon: CreditCard, label: "결제 수단 관리", sectionId: "payment" },
  { icon: Heart, label: "관심 원두 / 즐겨찾기", sectionId: "favorites" },
  { icon: Bell, label: "알림 설정", sectionId: "notifications" },
  { icon: ShieldCheck, label: "보안 및 인증 설정", sectionId: "security" },
  { icon: Settings, label: "앱 설정", sectionId: "app-settings" },
] as const;

export function MyAccountMenuCard() {
  return (
    <AppCard className="py-2">
      <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
        계정 관리
      </h2>
      <div className="space-y-0">
        {accountMenuItems.map(({ icon: Icon, label, sectionId }) => (
          <Link
            key={label}
            className="flex w-full items-center justify-between border-b border-[var(--rgba-17-24-39-006)] py-4 text-left last:border-b-0"
            to={accountSectionRoute(sectionId)}
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
  );
}
