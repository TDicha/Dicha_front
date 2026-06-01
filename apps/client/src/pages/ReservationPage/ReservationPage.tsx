import { InProgressState } from "@/components/common/InProgressState";

export function ReservationPage() {
  return (
    <div className="cafe-tile-bg min-h-full pb-10 pt-6">
      <InProgressState
        description="픽업 예약과 클래스 신청은 아직 준비 중입니다."
        title="예약 기능은 구현 중입니다"
      />
    </div>
  );
}
