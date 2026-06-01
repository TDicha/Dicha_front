import { InProgressState } from "@/components/common/InProgressState";

export function MyBlendPage() {
  return (
    <div className="cafe-tile-bg min-h-full pb-10 pt-6">
      <InProgressState
        description="취향 기반 블렌드 저장과 관리는 아직 준비 중입니다."
        title="나의 블렌드는 구현 중입니다"
      />
    </div>
  );
}
