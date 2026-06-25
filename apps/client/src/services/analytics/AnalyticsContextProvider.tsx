import { useEffect, type PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/app/store";
import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import {
  resetAnalyticsContext,
  setAnalyticsContext,
  trackUserContext,
} from "@/services/analytics/analytics";

interface ApiSubscription {
  id: number | string;
  status?: string;
}

function hasActiveSubscription(subscriptions: ApiSubscription[]) {
  return subscriptions.some(
    (subscription) => subscription.status?.toUpperCase() !== "CANCELLED",
  );
}

async function fetchSubscriptions() {
  const { data } = await apiClient.get<ApiSubscription[]>(
    endpoints.subscriptions.list,
  );

  return data;
}

export function AnalyticsContextProvider({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const authStatus = useAuthStore((state) => state.status);
  const isAuthenticated = authStatus === "authenticated";
  const subscriptionsQuery = useQuery({
    enabled: isAuthenticated,
    queryKey: ["analytics", "subscriptions"],
    queryFn: fetchSubscriptions,
    retry: 0,
  });

  useEffect(() => {
    if (authStatus === "checking") {
      return;
    }

    if (!user || !isAuthenticated) {
      resetAnalyticsContext();
      trackUserContext();
      return;
    }

    const isSubscriptionActive = hasActiveSubscription(
      subscriptionsQuery.data ?? [],
    );

    setAnalyticsContext({
      user_id: user.id,
      login_status: "member",
      user_tier: user.tier,
      is_subscription_active: isSubscriptionActive,
    });
    trackUserContext();
  }, [authStatus, isAuthenticated, subscriptionsQuery.data, user]);

  return <>{children}</>;
}
