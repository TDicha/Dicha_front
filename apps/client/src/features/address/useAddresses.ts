import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/app/store/authStore";
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  setDefaultAddress as setDefaultAddressApi,
  updateAddress as updateAddressApi,
} from "@/features/address/addressApi";
import type { AddressDraft, SavedAddress } from "@/features/address/types";

const ADDRESSES_KEY = "dicha.addresses";

const addressQueryKeys = {
  all: ["addresses"] as const,
  list: () => [...addressQueryKeys.all, "list"] as const,
};

function createId() {
  return `addr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function readLocalAddresses(): SavedAddress[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(ADDRESSES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalAddresses(addresses: SavedAddress[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  } catch {
    // Storage may be unavailable in private browser contexts.
  }
}

function sortByDefault(addresses: SavedAddress[]) {
  return [...addresses].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );
}

export function useAddresses() {
  const isAuthenticated = useAuthStore((state) => state.status === "authenticated");
  const queryClient = useQueryClient();
  const [localAddresses, setLocalAddresses] =
    useState<SavedAddress[]>(readLocalAddresses);

  useEffect(() => {
    if (!isAuthenticated) {
      writeLocalAddresses(localAddresses);
    }
  }, [isAuthenticated, localAddresses]);

  const { data: apiAddresses = [], isError, isLoading } = useQuery({
    enabled: isAuthenticated,
    queryKey: addressQueryKeys.list(),
    queryFn: fetchAddresses,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: addressQueryKeys.all });

  const createMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: () => void invalidate(),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, draft }: { id: string; draft: AddressDraft }) =>
      updateAddressApi(id, draft),
    onSuccess: () => void invalidate(),
  });
  const removeMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => void invalidate(),
  });
  const defaultMutation = useMutation({
    mutationFn: setDefaultAddressApi,
    onSuccess: () => void invalidate(),
  });

  const addLocalAddress = useCallback(async (draft: AddressDraft) => {
    const created: SavedAddress = {
      ...draft,
      id: createId(),
      isDefault: false,
    };

    setLocalAddresses((previous) => {
      const next =
        previous.length === 0
          ? [{ ...created, isDefault: true }]
          : [...previous, created];
      return sortByDefault(next);
    });

    return localAddresses.length === 0
      ? { ...created, isDefault: true }
      : created;
  }, [localAddresses.length]);

  const updateLocalAddress = useCallback(
    async (id: string, draft: AddressDraft) => {
      let updated: SavedAddress | null = null;

      setLocalAddresses((previous) =>
        sortByDefault(
          previous.map((item) => {
            if (item.id !== id) return item;
            updated = { ...item, ...draft };
            return updated;
          }),
        ),
      );

      return updated;
    },
    [],
  );

  const removeLocalAddress = useCallback(async (id: string) => {
    setLocalAddresses((previous) => {
      const filtered = previous.filter((item) => item.id !== id);
      const removedDefault = previous.find((item) => item.id === id)?.isDefault;

      if (removedDefault && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isDefault: true };
      }

      return sortByDefault(filtered);
    });
  }, []);

  const setLocalDefaultAddress = useCallback(async (id: string) => {
    let updated: SavedAddress | null = null;

    setLocalAddresses((previous) =>
      sortByDefault(
        previous.map((item) => {
          const next = { ...item, isDefault: item.id === id };
          if (next.isDefault) updated = next;
          return next;
        }),
      ),
    );

    return updated;
  }, []);

  const addresses = isAuthenticated ? apiAddresses : localAddresses;
  const defaultAddress =
    addresses.find((item) => item.isDefault) ?? addresses[0] ?? null;

  return {
    addresses,
    defaultAddress,
    isError: isAuthenticated ? isError : false,
    isLoading: isAuthenticated ? isLoading : false,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      removeMutation.isPending ||
      defaultMutation.isPending,
    addAddress: (draft: AddressDraft) =>
      isAuthenticated ? createMutation.mutateAsync(draft) : addLocalAddress(draft),
    updateAddress: (id: string, draft: AddressDraft) =>
      isAuthenticated
        ? updateMutation.mutateAsync({ id, draft })
        : updateLocalAddress(id, draft),
    removeAddress: (id: string) =>
      isAuthenticated ? removeMutation.mutateAsync(id) : removeLocalAddress(id),
    setDefaultAddress: (id: string) =>
      isAuthenticated
        ? defaultMutation.mutateAsync(id)
        : setLocalDefaultAddress(id),
  };
}
