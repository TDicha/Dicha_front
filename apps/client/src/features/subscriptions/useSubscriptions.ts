import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelSubscription,
  createSubscription,
  fetchSubscriptions,
  pauseSubscription,
  resumeSubscription,
  type CreateSubscriptionPayload,
} from "@/features/subscriptions/subscriptionApi";

export const subscriptionQueryKeys = {
  all: ["subscriptions"] as const,
  list: () => [...subscriptionQueryKeys.all, "list"] as const,
};

export function useSubscriptions() {
  return useQuery({
    queryKey: subscriptionQueryKeys.list(),
    queryFn: fetchSubscriptions,
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubscriptionPayload) =>
      createSubscription(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: subscriptionQueryKeys.all,
      });
      void queryClient.invalidateQueries({
        queryKey: ["analytics", "subscriptions"],
      });
    },
  });
}

export function usePauseSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pauseSubscription,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: subscriptionQueryKeys.all,
      });
    },
  });
}

export function useResumeSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeSubscription,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: subscriptionQueryKeys.all,
      });
    },
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: subscriptionQueryKeys.all,
      });
      void queryClient.invalidateQueries({
        queryKey: ["analytics", "subscriptions"],
      });
    },
  });
}
