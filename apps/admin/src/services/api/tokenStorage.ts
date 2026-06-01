const ACCESS_TOKEN_KEY = "dicha-admin-access-token";
const SESSION_TOKEN_KEY = "dicha-admin-session-token";

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    window.localStorage.getItem(ACCESS_TOKEN_KEY) ??
    window.sessionStorage.getItem(SESSION_TOKEN_KEY)
  );
}

export function setAccessToken(token: string, remember: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (remember) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
    return;
  }

  window.sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function hasRememberedAccessToken() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.localStorage.getItem(ACCESS_TOKEN_KEY));
}

export function clearAccessToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
}
