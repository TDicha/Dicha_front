import { create } from "zustand";

import {
  loginAdmin,
  logoutAdmin,
  restoreAdminSession,
  type AdminSession,
} from "@/services/api/adminApi";
import {
  getAccessToken,
  hasRememberedAccessToken,
} from "@/services/api/tokenStorage";

const ADMIN_SESSION_KEY = "dicha-admin-session";

interface AdminAuthState {
  session: AdminSession | null;
  isHydrating: boolean;
  signIn: (payload: { email: string; password: string; remember: boolean }) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => Promise<void>;
}

function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!getAccessToken()) {
    clearStoredSession();
    return null;
  }

  const storedSession =
    window.localStorage.getItem(ADMIN_SESSION_KEY) ??
    window.sessionStorage.getItem(ADMIN_SESSION_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as AdminSession;
  } catch {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
}

function setStoredSession(session: AdminSession, remember: boolean) {
  if (remember) {
    window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    return;
  }

  window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}

function clearStoredSession() {
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  session: getStoredSession(),
  isHydrating: false,
  signIn: async ({ email, password, remember }) => {
    if (!email.trim() || !password.trim()) {
      throw new Error("이메일과 비밀번호를 입력해 주세요.");
    }

    const session = await loginAdmin({ email, password, remember });

    setStoredSession(session, remember);

    set({ session });
  },
  signOut: async () => {
    await logoutAdmin();
    clearStoredSession();
    set({ session: null });
  },
  hydrate: async () => {
    set({ isHydrating: true });
    const session = await restoreAdminSession();

    if (session) {
      setStoredSession(session, hasRememberedAccessToken());
    } else {
      clearStoredSession();
    }

    set({ isHydrating: false, session });
  },
}));
