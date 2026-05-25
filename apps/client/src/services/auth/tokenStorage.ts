const LEGACY_ACCESS_TOKEN_KEY = "dicha.accessToken";
let accessToken: string | null = null;

function removeLegacyAccessToken() {
  try {
    window.localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  } catch {
    // Storage may be unavailable in private or restricted browser contexts.
  }
}

if (typeof window !== "undefined") {
  removeLegacyAccessToken();
}

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;

  if (typeof window !== "undefined") {
    removeLegacyAccessToken();
  }
}
