import { apiFetch } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/services/api/tokenStorage";

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
}

export interface AdminMember {
  id: number;
  email: string;
  name: string;
}

export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
  displayOrder: number;
}

export interface AdminProductOption {
  id?: number;
  name: string;
  description?: string | null;
  extraPrice: number;
}

export interface AdminProduct {
  id: number;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  origin?: string | null;
  roastLevel?: "LIGHT" | "MEDIUM" | "DARK";
  categoryId?: number;
  categoryName?: string;
  onSale?: boolean;
  stockQuantity?: number | null;
  rating?: number;
  reviewCount?: number;
  flavorNotes?: string[];
  badges?: string[];
  options?: AdminProductOption[];
}

export interface AdminProductPayload {
  name: string;
  subtitle?: string;
  description?: string;
  price: number;
  imageUrl?: string;
  origin?: string;
  roastLevel?: "LIGHT" | "MEDIUM" | "DARK";
  categoryId?: number;
  onSale: boolean;
  stockQuantity?: number | null;
  flavorNotes: string[];
  badges: string[];
  options: Array<{
    name: string;
    description?: string;
    extraPrice?: number;
  }>;
}

export interface AdminCategoryPayload {
  name: string;
  slug: string;
  displayOrder?: number;
}

interface LoginResponse {
  accessToken: string;
}

interface MemberResponse {
  id: number;
  email: string;
  name: string;
}

function toAdminSession(member: MemberResponse): AdminSession {
  return {
    id: String(member.id),
    email: member.email,
    name: member.name,
    role: "ADMIN",
  };
}

export async function loginAdmin(payload: {
  email: string;
  password: string;
  remember: boolean;
}) {
  try {
    const data = await apiFetch<LoginResponse>(endpoints.auth.login, {
      auth: false,
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
      method: "POST",
    });

    setAccessToken(data.accessToken, payload.remember);

    const member = await apiFetch<MemberResponse>(endpoints.auth.me);
    await apiFetch<AdminMember[]>(endpoints.admin.members);

    return toAdminSession(member);
  } catch (error) {
    clearAccessToken();
    throw error;
  }
}

export async function restoreAdminSession() {
  if (!getAccessToken()) {
    return null;
  }

  try {
    const member = await apiFetch<MemberResponse>(endpoints.auth.me);
    await apiFetch<AdminMember[]>(endpoints.admin.members);
    return toAdminSession(member);
  } catch {
    clearAccessToken();
    return null;
  }
}

export async function logoutAdmin() {
  try {
    await apiFetch<void>(endpoints.auth.logout, { method: "POST" });
  } finally {
    clearAccessToken();
  }
}

export function fetchMembers() {
  return apiFetch<AdminMember[]>(endpoints.admin.members);
}

export async function deleteMember(memberId: number) {
  await apiFetch<void>(endpoints.admin.member(memberId), { method: "DELETE" });
}

export function fetchCategories() {
  return apiFetch<AdminCategory[]>(endpoints.categories.list, { auth: false });
}

export function fetchProducts() {
  return apiFetch<AdminProduct[]>(endpoints.products.list, { auth: false });
}

export function createProduct(payload: AdminProductPayload) {
  return apiFetch<AdminProduct>(endpoints.products.create, {
    body: JSON.stringify(payload),
    method: "POST",
  });
}

export function updateProduct(productId: number, payload: AdminProductPayload) {
  return apiFetch<AdminProduct>(endpoints.products.update(productId), {
    body: JSON.stringify(payload),
    method: "PUT",
  });
}

export async function deleteProduct(productId: number) {
  await apiFetch<void>(endpoints.products.remove(productId), {
    method: "DELETE",
  });
}

export function createCategory(payload: AdminCategoryPayload) {
  return apiFetch<AdminCategory>(endpoints.categories.create, {
    body: JSON.stringify(payload),
    method: "POST",
  });
}

export async function deleteCategory(categoryId: number) {
  await apiFetch<void>(endpoints.categories.remove(categoryId), {
    method: "DELETE",
  });
}
