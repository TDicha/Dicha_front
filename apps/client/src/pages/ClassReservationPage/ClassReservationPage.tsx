import { InProgressState } from "@/components/common/InProgressState";

export function ClassReservationPage() {
  return (
    <div className="cafe-tile-bg min-h-full pb-10 pt-6">
      <InProgressState
        description="클래스 일정 선택과 예약 확정은 아직 준비 중입니다."
        title="클래스 예약은 구현 중입니다"
      />
    </div>
  );
}
