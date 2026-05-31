import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

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
    <section className="px-5 py-5">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Account Menu
      </p>
      <h2 className="pb-3 pt-1 font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
        계정 관리
      </h2>
      <div className="space-y-0">
        {accountMenuItems.map(({ icon: Icon, label, sectionId }) => (
          <Link
            key={label}
            className="flex w-full items-center justify-between border-b border-[var(--border-tile-grout)] py-4 text-left last:border-b-0"
            to={accountSectionRoute(sectionId)}
          >
            <span className="flex items-center gap-3 text-sm font-medium text-[var(--text-cafe-ink)]">
              <Icon className="size-4" />
              {label}
            </span>
            <ChevronRight className="size-4 text-[var(--text-muted)]" />
          </Link>
        ))}
      </div>
    </section>
  );
}
