import type { AddressSnapshot } from "@/features/checkout/types";

export interface SavedAddress {
  id: string;
  /** 배송지 별칭 (예: 집, 회사) */
  label: string;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
}

export type AddressDraft = Omit<SavedAddress, "id" | "isDefault">;

export function toAddressSnapshot(address: SavedAddress): AddressSnapshot {
  return {
    recipientName: address.recipientName,
    phone: address.phone,
    address: address.address,
    detailAddress: address.detailAddress || undefined,
    postalCode: address.postalCode || undefined,
  };
}
