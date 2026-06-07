import type { AddressSnapshot } from "@/features/checkout/types";

/**
 * 프론트(localStorage)에 저장되는 배송지 한 건.
 * 백엔드에는 배송지 저장 기능이 없으므로 조회/등록/수정/삭제는 프론트에서 처리하고,
 * 주문 시점에만 AddressSnapshot 으로 변환해 백엔드로 전송한다.
 */
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
