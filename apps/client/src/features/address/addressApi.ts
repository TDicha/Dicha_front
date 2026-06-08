import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";

import type { AddressDraft, SavedAddress } from "@/features/address/types";

interface ApiAddress {
  id: number | string;
  label?: string | null;
  recipientName?: string;
  phone?: string;
  postalCode?: string | null;
  address?: string;
  detailAddress?: string | null;
  isDefault?: boolean;
}

function toSavedAddress(address: ApiAddress): SavedAddress {
  return {
    id: String(address.id),
    label: address.label ?? "배송지",
    recipientName: address.recipientName ?? "",
    phone: address.phone ?? "",
    postalCode: address.postalCode ?? "",
    address: address.address ?? "",
    detailAddress: address.detailAddress ?? "",
    isDefault: Boolean(address.isDefault),
  };
}

function toAddressPayload(draft: AddressDraft) {
  return {
    label: draft.label,
    recipientName: draft.recipientName,
    phone: draft.phone,
    postalCode: draft.postalCode,
    address: draft.address,
    detailAddress: draft.detailAddress,
  };
}

export async function fetchAddresses() {
  const { data } = await apiClient.get<ApiAddress[]>(endpoints.addresses.list);
  return data.map(toSavedAddress);
}

export async function createAddress(draft: AddressDraft) {
  const { data } = await apiClient.post<ApiAddress>(
    endpoints.addresses.create,
    toAddressPayload(draft),
  );
  return toSavedAddress(data);
}

export async function updateAddress(addressId: string, draft: AddressDraft) {
  const { data } = await apiClient.put<ApiAddress>(
    endpoints.addresses.update(addressId),
    toAddressPayload(draft),
  );
  return toSavedAddress(data);
}

export async function deleteAddress(addressId: string) {
  await apiClient.delete(endpoints.addresses.remove(addressId));
}

export async function setDefaultAddress(addressId: string) {
  const { data } = await apiClient.patch<ApiAddress>(
    endpoints.addresses.setDefault(addressId),
  );
  return toSavedAddress(data);
}
