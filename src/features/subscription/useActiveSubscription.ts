import { useMemo } from "react";

import { getSubscriptionDetail } from "@/mock/subscriptionDetails";
import { mockSubscriptions } from "@/mock/subscriptions";

export function useActiveSubscription() {
  return useMemo(() => {
    const activePlan = mockSubscriptions.find(
      (subscription) => subscription.statusLabel === "ACTIVE",
    );
    const subscriptionDetail = activePlan
      ? getSubscriptionDetail(activePlan.id)
      : undefined;

    return { activePlan, subscriptionDetail };
  }, []);
}
