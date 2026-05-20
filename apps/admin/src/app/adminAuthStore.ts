import { create } from "zustand";

const ADMIN_SESSION_KEY = "dicha-admin-session";

export interface AdminSession {
  name: string;
  email: string;
  role: "SUPER_ADMIN";
}

interface AdminAuthState {
  session: AdminSession | null;
  signIn: (payload: { email: string; password: string; remember: boolean }) => boolean;
  signOut: () => void;
  hydrate: () => void;
}

const mockSession: AdminSession = {
  name: "김관리",
  email: "admin@dicha.co.kr",
  role: "SUPER_ADMIN",
};

function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedSession = window.localStorage.getItem(ADMIN_SESSION_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as AdminSession;
  } catch {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  session: getStoredSession(),
  signIn: ({ email, password, remember }) => {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    if (remember) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(mockSession));
    } else {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    }

    set({ session: mockSession });
    return true;
  },
  signOut: () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    set({ session: null });
  },
  hydrate: () => {
    set({ session: getStoredSession() });
  },
}));
