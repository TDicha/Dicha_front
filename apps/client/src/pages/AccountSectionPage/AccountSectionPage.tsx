import { Navigate, useParams } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import {
  AccountSectionHeroCard,
  AccountSectionItemsCard,
  AccountSectionNotFound,
  AccountSectionNoticeCard,
  AccountSectionStatusCard,
} from "@/features/my-page";
import { accountSections } from "@/shared/constants/accountSections";
import { ROUTES } from "@/shared/constants/routes";

export function AccountSectionPage() {
  const { sectionId } = useParams();
  const section = accountSections.find((item) => item.id === sectionId);

  if (!sectionId) {
    return <Navigate replace to={ROUTES.myPage} />;
  }

  if (!section) {
    return <AccountSectionNotFound />;
  }

  return (
    <div className="page-content space-y-5 bg-[var(--surface-base)] pt-4">
      <AccountSectionHeroCard section={section} />
      <AccountSectionStatusCard statusLabel={section.statusLabel} />
      <AccountSectionItemsCard items={section.items} />
      <AccountSectionNoticeCard />
      <PrimaryButton className="w-full">{section.ctaLabel}</PrimaryButton>
    </div>
  );
}
