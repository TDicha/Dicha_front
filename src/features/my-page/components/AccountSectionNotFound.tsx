import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function AccountSectionNotFound() {
  return (
    <div className="page-content space-y-5 bg-[var(--surface-base)] pt-4">
      <EmptyState
        action={
          <PrimaryButton asChild className="w-full">
            <Link to={ROUTES.myPage}>마이페이지로 돌아가기</Link>
          </PrimaryButton>
        }
        description="요청한 계정 관리 화면을 찾지 못했어요."
        title="존재하지 않는 관리 화면입니다"
      />
    </div>
  );
}
