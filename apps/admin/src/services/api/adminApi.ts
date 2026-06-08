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

interface PageResponse<T> {
  content: T[];
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

export interface AdminDashboardSummary {
  newOrderCount: number;
  todaySales: number;
  newMemberCount: number;
  newReviewCount: number;
}

export interface AdminSalesChartData {
  labels: string[];
  sales: number[];
}

export interface AdminRecentOrder {
  orderNumber: string;
  orderDate?: string;
  status: string;
  totalPrice: number;
  customerName: string;
}

export interface AdminBestProduct {
  productId: number;
  productName: string;
  totalSalesCount: number;
}

export interface AdminRecentReview {
  productName: string;
  authorName: string;
  rating: number;
  content: string;
  createdAt?: string;
}

export interface AdminNotification {
  type: string;
  message: string;
  targetId?: number;
}

export interface AdminDashboardLists {
  recentOrders: AdminRecentOrder[];
  bestProducts: AdminBestProduct[];
  recentReviews: AdminRecentReview[];
  notifications: AdminNotification[];
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

function unwrapPageContent<T>(response: T[] | PageResponse<T>) {
  return Array.isArray(response) ? response : response.content;
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
  return apiFetch<AdminMember[] | PageResponse<AdminMember>>(
    endpoints.admin.members,
  ).then(unwrapPageContent);
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

export function fetchDashboardSummary() {
  return apiFetch<AdminDashboardSummary>(endpoints.admin.dashboardSummary);
}

export function fetchDashboardSalesChart() {
  return apiFetch<AdminSalesChartData>(endpoints.admin.dashboardSalesChart);
}

export function fetchDashboardLists() {
  return apiFetch<AdminDashboardLists>(endpoints.admin.dashboardRecentLists);
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

export function uploadProductImage(productId: number, file: File) {
  const body = new FormData();
  body.append("file", file);

  return apiFetch<AdminProduct>(endpoints.products.image(productId), {
    body,
    method: "POST",
  });
}

export function createProductOption(
  productId: number,
  payload: AdminProductOption,
) {
  return apiFetch<AdminProductOption>(endpoints.products.options(productId), {
    body: JSON.stringify(payload),
    method: "POST",
  });
}

export function updateProductOption(
  productId: number,
  optionId: number,
  payload: AdminProductOption,
) {
  return apiFetch<AdminProductOption>(
    endpoints.products.option(productId, optionId),
    {
      body: JSON.stringify(payload),
      method: "PUT",
    },
  );
}

export async function deleteProductOption(productId: number, optionId: number) {
  await apiFetch<void>(endpoints.products.option(productId, optionId), {
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

export type AdminOrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPING"
  | "DELIVERED"
  | "CANCELLED";

export interface AdminOrderItem {
  orderItemId?: number;
  productId?: number;
  productName: string;
  optionName?: string | null;
  unitPrice: number;
  quantity: number;
  subtotal?: number;
}

export interface AdminOrder {
  orderNumber: string;
  status: AdminOrderStatus;
  totalPrice: number;
  recipientName: string;
  phoneNumber: string;
  shippingAddress: string;
  memberEmail?: string | null;
  items: AdminOrderItem[];
  createdAt?: string;
}

export function fetchOrders() {
  return apiFetch<AdminOrder[]>(endpoints.admin.orders);
}

export function updateOrderStatus(
  orderNumber: string,
  status: AdminOrderStatus,
  reason?: string,
) {
  return apiFetch<AdminOrder>(endpoints.admin.orderStatus(orderNumber), {
    body: JSON.stringify({ status, reason }),
    method: "PATCH",
  });
}
