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
  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <ClassReservationHeroSection />
      <ClassReservationInfoGrid />
      <ClassScheduleCard slots={slots} />
      <ClassGuideCard />
      <ClassActionListCard />
      <PrimaryButton className="w-full">클래스 예약 확정하기</PrimaryButton>
    </div>
  );
}
