import { mockUser } from "@/mock/user";
import { endpoints } from "@/services/api/endpoints";
import { apiClient } from "@/services/api/client";
import { env } from "@/shared/lib/env";
import type { UserProfile } from "@/shared/types/models";

export async function fetchSession() {
  if (env.enableMock) {
    return Promise.resolve(mockUser);
  }

  const { data } = await apiClient.get<UserProfile>(endpoints.auth.session);
  return data;
}

export async function login(payload: { email: string; password: string }) {
  if (env.enableMock) {
    return Promise.resolve({ user: mockUser, ...payload });
  }

  const { data } = await apiClient.post(endpoints.auth.login, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
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

  const { data } = await apiClient.post(endpoints.auth.signup, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function logout() {
  if (env.enableMock) {
    return Promise.resolve(true);
  }

  await apiClient.post(endpoints.auth.logout);
}
