import { useCallback, useEffect, useState } from "react";

import type { AddressDraft, SavedAddress } from "@/features/address/types";

const ADDRESSES_KEY = "dicha.addresses";

function createId() {
  return `addr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function readAddresses(): SavedAddress[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(ADDRESSES_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is SavedAddress =>
        typeof item === "object" && item !== null && "id" in item,
    );
  } catch {
    return [];
  }
}

function writeAddresses(addresses: SavedAddress[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  } catch {
    // Storage may be unavailable in private or restricted browser contexts.
  }
}

/** 기본 배송지가 항상 맨 앞에 오도록 정렬한다. */
function sortByDefault(addresses: SavedAddress[]) {
  return [...addresses].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(readAddresses);

  useEffect(() => {
    writeAddresses(addresses);
  }, [addresses]);

  const addAddress = useCallback((draft: AddressDraft) => {
    const created: SavedAddress = {
      ...draft,
      id: createId(),
      isDefault: false,
    };

    setAddresses((previous) => {
      // 첫 배송지는 자동으로 기본 배송지로 지정한다.
      const next = previous.length === 0
        ? [{ ...created, isDefault: true }]
        : [...previous, created];
      return sortByDefault(next);
    });

    return created.id;
  }, []);

  const updateAddress = useCallback((id: string, draft: AddressDraft) => {
    setAddresses((previous) =>
      sortByDefault(
        previous.map((item) =>
          item.id === id ? { ...item, ...draft } : item,
        ),
      ),
    );
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((previous) => {
      const filtered = previous.filter((item) => item.id !== id);
      const removedDefault = previous.find((item) => item.id === id)?.isDefault;

      // 기본 배송지를 지웠다면 남은 첫 배송지를 기본으로 승격한다.
      if (removedDefault && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isDefault: true };
      }

      return sortByDefault(filtered);
    });
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((previous) =>
      sortByDefault(
        previous.map((item) => ({ ...item, isDefault: item.id === id })),
      ),
    );
  }, []);

  const defaultAddress =
    addresses.find((item) => item.isDefault) ?? addresses[0] ?? null;

  return {
    addresses,
    defaultAddress,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  };
}
