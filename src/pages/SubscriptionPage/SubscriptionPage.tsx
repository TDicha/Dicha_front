import { useState } from "react";

import {
  SubscriptionCycleSection,
  SubscriptionDangerActions,
  SubscriptionDeliveryHistorySection,
  SubscriptionEmptyState,
  SubscriptionManageSection,
  SubscriptionSummaryCard,
  getDeliveryDayLabel,
  useActiveSubscription,
} from "@/features/subscription";

export function SubscriptionPage() {
  const { activePlan, subscriptionDetail } = useActiveSubscription();
  const [selectedCycle, setSelectedCycle] = useState(
    subscriptionDetail?.selectedCycle ??
      subscriptionDetail?.cycleOptions[0] ??
      "",
  );

  if (
    !activePlan ||
    !subscriptionDetail ||
    subscriptionDetail.status === "empty"
  ) {
    return <SubscriptionEmptyState />;
  }

  return (
    <div className="bg-[var(--palette-f7f5f0)] pb-10">
      <SubscriptionSummaryCard
        activePlan={activePlan}
        deliveryDayLabel={getDeliveryDayLabel(activePlan.nextDeliveryLabel)}
        subscriptionDetail={subscriptionDetail}
      />
      <SubscriptionManageSection perks={activePlan.perks} />
      <SubscriptionCycleSection
        cycleOptions={subscriptionDetail.cycleOptions}
        onSelectCycle={setSelectedCycle}
        selectedCycle={selectedCycle}
      />
      <SubscriptionDangerActions />
      <SubscriptionDeliveryHistorySection
        deliveryHistory={subscriptionDetail.deliveryHistory}
      />
    </div>
  );
}
