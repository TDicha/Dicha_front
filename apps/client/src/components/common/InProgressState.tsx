import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

interface InProgressStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function InProgressState({
  title = "구현 중입니다",
  description = "준비가 완료되면 이용할 수 있어요.",
  className = "mx-[var(--page-x)] mt-8",
}: InProgressStateProps) {
  return (
    <EmptyState
      action={
        <PrimaryButton
          asChild
          className="h-12 rounded-none bg-[var(--surface-chalkboard)] shadow-none"
        >
          <Link to={ROUTES.home}>홈으로 이동</Link>
        </PrimaryButton>
      }
      className={className}
      description={description}
      eyebrow="Preparing"
      title={title}
      variant="menu-board"
    />
  );
}
