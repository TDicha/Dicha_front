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
}

const publicAuthClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 10000,
});

function toUserProfile(member: MemberResponse): UserProfile {
  return {
    id: String(member.id),
    name: member.name,
    email: member.email,
    tier: "Member",
    favoriteFlavor: "아직 선택되지 않음",
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

export async function logout() {
  try {
    await apiClient.post(endpoints.auth.logout);
    return true;
  } finally {
    clearAccessToken();
  }
}
