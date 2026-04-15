import { create } from "zustand";

import { mockUser } from "@/mock/user";
import { login, logout, signup } from "@/services/auth/authService";
import { env } from "@/shared/lib/env";
import type { UserProfile } from "@/shared/types/models";

type AuthStatus = "authenticated" | "anonymous";

interface AuthState {
  user: UserProfile | null;
  status: AuthStatus;
  isPending: boolean;
  error: string | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  signIn: (payload: { email: string; password: string }) => Promise<boolean>;
  signUp: (payload: { name: string; email: string; password: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: env.enableMock ? mockUser : null,
  status: env.enableMock ? "authenticated" : "anonymous",
  isPending: false,
  error: null,
  login: (user) => set({ user, status: "authenticated" }),
  logout: () => set({ user: null, status: "anonymous" }),
  clearError: () => set({ error: null }),
  signIn: async (payload) => {
    set({ isPending: true, error: null });

    try {
      const response = await login(payload);
      set({
        user: response.user,
        status: "authenticated",
        isPending: false,
      });
      return true;
    } catch {
      set({
        error: "로그인에 실패했습니다. 입력한 정보를 다시 확인해 주세요.",
        isPending: false,
      });
      return false;
    }
  },
  signUp: async (payload) => {
    set({ isPending: true, error: null });

    try {
      const response = await signup(payload);
      set({
        user: response.user,
        status: "authenticated",
        isPending: false,
      });
      return true;
    } catch {
      set({
        error: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        isPending: false,
      });
      return false;
    }
  },
  signOut: async () => {
    set({ isPending: true, error: null });

    try {
      await logout();
    } finally {
      set({
        user: null,
        status: "anonymous",
        isPending: false,
      });
    }
  },
}));
