import { endpoints } from "@/services/api/endpoints";
import { apiClient } from "@/services/api/client";
import axios from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/services/auth/tokenStorage";
import { env } from "@/shared/lib/env";
import type { UserProfile } from "@/shared/types/models";

interface LoginResponse {
  accessToken: string;
}

interface MemberResponse {
  id: number;
  email: string;
  name: string;
  grade?: string | null;
  totalSpent?: number | string | null;
  tasteAcidity?: number | string | null;
  tasteBody?: number | string | null;
  tasteSweetness?: number | string | null;
  tastePrimaryFlavorNote?: string | null;
}

interface FindEmailResponse {
  maskedEmail?: string;
}

const publicAuthClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 10000,
});

const flavorNoteLabels: Record<string, string> = {
  FRUITY: "과일",
  FLORAL: "꽃",
  NUTTY: "견과류",
  CHOCOLATY: "초콜릿",
  SPICY: "향신료",
  CARAMEL: "카라멜",
  CITRUS: "시트러스",
  BERRY: "베리",
  ROASTY: "로스티",
};

function toTasteScore(value: number | string | null | undefined) {
  if (value === null || value === undefined) {
    return undefined;
  }

  const score = Number(value);
  if (Number.isNaN(score)) {
    return undefined;
  }

  return Math.max(1, Math.min(5, Math.round(score)));
}

function toNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function toFlavorNote(note: string | null | undefined) {
  return note?.toUpperCase();
}

function toTier(grade: string | null | undefined) {
  const normalized = grade?.toUpperCase();
  if (normalized === "SILVER") return "Silver";
  if (normalized === "GOLD") return "Gold";
  if (normalized === "BLACK") return "Black";
  return "Member";
}

function toUserProfile(member: MemberResponse): UserProfile {
  const primaryFlavorNote = toFlavorNote(member.tastePrimaryFlavorNote);

  return {
    id: String(member.id),
    name: member.name,
    email: member.email,
    tier: toTier(member.grade),
    favoriteFlavor: primaryFlavorNote
      ? flavorNoteLabels[primaryFlavorNote] ?? primaryFlavorNote
      : "아직 선택되지 않음",
    totalSpent: toNumber(member.totalSpent),
    tasteAcidity: toTasteScore(member.tasteAcidity),
    tasteBody: toTasteScore(member.tasteBody),
    tasteSweetness: toTasteScore(member.tasteSweetness),
    tastePrimaryFlavorNote: primaryFlavorNote,
  };
}

export async function fetchSession() {
  if (!getAccessToken()) {
    return null;
  }

  try {
    const { data } = await apiClient.get<MemberResponse>(endpoints.auth.session);
    return toUserProfile(data);
  } catch (error) {
    clearAccessToken();
    throw error;
  }
}

export async function restoreSession() {
  clearAccessToken();

  try {
    const { data } = await publicAuthClient.post<LoginResponse>(endpoints.auth.refresh);
    setAccessToken(data.accessToken);
    return await fetchSession();
  } catch {
    clearAccessToken();
    return null;
  }
}

export async function login(payload: { email: string; password: string }) {
  const { data } = await publicAuthClient.post<LoginResponse>(endpoints.auth.login, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  setAccessToken(data.accessToken);

  const user = await fetchSession();

  if (!user) {
    throw new Error("로그인 사용자 정보를 불러오지 못했습니다.");
  }

  return { user };
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}) {
  await publicAuthClient.post(endpoints.auth.signup, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return login({
    email: payload.email,
    password: payload.password,
  });
}

export async function findEmail(payload: { name: string; phoneNumber: string }) {
  const { data } = await publicAuthClient.post<FindEmailResponse>(
    endpoints.auth.findEmail,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return data.maskedEmail ?? "";
}

export async function findPassword(payload: { email: string; name: string }) {
  const { data } = await publicAuthClient.post<string>(
    endpoints.auth.findPassword,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return typeof data === "string"
    ? data
    : "이메일로 임시 비밀번호가 발송되었습니다.";
}

export async function updateProfile(payload: {
  name?: string;
  password?: string;
}) {
  const { data } = await apiClient.put<MemberResponse>(
    endpoints.auth.session,
    payload,
  );

  return toUserProfile(data);
}

export async function logout() {
  try {
    await apiClient.post(endpoints.auth.logout);
    return true;
  } finally {
    clearAccessToken();
  }
}
