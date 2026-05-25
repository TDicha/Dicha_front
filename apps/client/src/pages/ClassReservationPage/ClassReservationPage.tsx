import { useState } from "react";

import { ImplementationNoticeModal } from "@/components/common/ImplementationNoticeModal";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import {
  ClassActionListCard,
  ClassGuideCard,
  ClassReservationHeroSection,
  ClassReservationInfoGrid,
  ClassScheduleCard,
} from "@/features/reservation";

const slots = ["10:00", "11:30", "13:00", "14:30", "16:00", "18:30"];

export function ClassReservationPage() {
  const [selectedSlot, setSelectedSlot] = useState(slots[2]);
  const [implementationFeature, setImplementationFeature] = useState<string | null>(null);

  return (
    <div className="page-content space-y-5 bg-[var(--surface-base)] pt-4">
      <ClassReservationHeroSection />
      <ClassReservationInfoGrid />
      <ClassScheduleCard
        onSelectSlot={setSelectedSlot}
        selectedSlot={selectedSlot}
        slots={slots}
      />
      <ClassGuideCard />
      <ClassActionListCard onAction={setImplementationFeature} />
      <PrimaryButton className="w-full" onClick={() => setImplementationFeature("클래스 예약 확정")}>
        클래스 예약 확정하기
      </PrimaryButton>
      <ImplementationNoticeModal
        featureLabel={implementationFeature}
        onClose={() => setImplementationFeature(null)}
      />
    </div>
  );
}
