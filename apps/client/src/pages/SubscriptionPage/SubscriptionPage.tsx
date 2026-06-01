import { InProgressState } from "@/components/common/InProgressState";

export function SubscriptionPage() {
  return (
    <div className="cafe-tile-bg min-h-full pb-10 pt-6">
      <InProgressState
        description="구독 신청과 배송 주기 관리는 아직 준비 중입니다."
        title="구독 기능은 구현 중입니다"
      />
    </div>
  );
}
