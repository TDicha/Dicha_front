import { mockUser } from "@/mock/user";
import { endpoints } from "@/services/api/endpoints";
import { apiClient } from "@/services/api/client";
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
  if (env.enableMock) {
    return Promise.resolve(mockUser);
  }

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

export async function login(payload: { email: string; password: string }) {
  if (env.enableMock) {
    return Promise.resolve({ user: mockUser, ...payload });
  }

  const { data } = await apiClient.post<LoginResponse>(endpoints.auth.login, payload, {
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
  if (env.enableMock) {
    return Promise.resolve({
      user: {
        ...mockUser,
        name: payload.name || mockUser.name,
        email: payload.email || mockUser.email,
      },
    });
  }

  await apiClient.post(endpoints.auth.signup, payload, {
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
  if (env.enableMock) {
    return Promise.resolve(true);
  }

  clearAccessToken();
  return Promise.resolve(true);
}
