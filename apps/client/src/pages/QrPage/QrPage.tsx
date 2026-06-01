import { InProgressState } from "@/components/common/InProgressState";

export function QrPage() {
  return (
    <div className="cafe-tile-bg min-h-full pb-10 pt-6">
      <InProgressState
        description="매장 QR 스캔과 코드 연결은 아직 준비 중입니다."
        title="QR 기능은 구현 중입니다"
      />
    </div>
  );
}
