import { AppCard } from "@/components/common/AppCard";

export function AccountSectionNoticeCard() {
  return (
    <AppCard>
      <p className="text-sm leading-6 text-[var(--text-muted)]">
        현재 화면은 스타벅스 앱처럼 섹션별 관리 진입 구조를 먼저 연결한 임시
        화면입니다. 상세 기능을 붙일 때는 실제 API와 상태 설계가 필요합니다.
      </p>
    </AppCard>
  );
}
