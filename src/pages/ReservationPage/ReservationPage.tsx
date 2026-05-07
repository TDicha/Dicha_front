import { useState } from "react";

import {
  ReservationClassCtaSection,
  ReservationHeroSection,
  ReservationPlanSelectionSection,
  type ReservationPlanId,
} from "@/features/reservation";

export function ReservationPage() {
  const [selectedPlanId, setSelectedPlanId] =
    useState<ReservationPlanId>("home");

  return (
    <div className="bg-[var(--background-color)] pb-8">
      <ReservationHeroSection />
      <ReservationPlanSelectionSection
        onSelectPlan={setSelectedPlanId}
        selectedPlanId={selectedPlanId}
      />
      <ReservationClassCtaSection />
    </div>
  );
}
