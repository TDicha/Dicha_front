import {
  ChevronRight,
  CreditCard,
  Settings2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

const sectionIcons = {
  payment: CreditCard,
  favorites: ChevronRight,
  notifications: Settings2,
  security: ShieldCheck,
  "app-settings": Settings2,
} as const satisfies Record<string, LucideIcon>;

interface AccountSectionHeroCardProps {
  section: {
    id: keyof typeof sectionIcons;
    title: string;
    description: string;
  };
}

export function AccountSectionHeroCard({
  section,
}: AccountSectionHeroCardProps) {
  const Icon = sectionIcons[section.id] ?? Settings2;

  return (
    <AppCard
      className="rounded-[1.7rem] px-5 py-5"
      padding="none"
      variant="hero-green"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-white/70">
            ACCOUNT
          </p>
          <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
            {section.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/82">
            {section.description}
          </p>
        </div>
        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/12">
          <Icon className="size-9 text-[var(--palette-f1d08b)]" />
        </div>
      </div>
    </AppCard>
  );
}
