import { endpoints } from "@/services/api/endpoints";
import {
  clearAccessToken,
  getAccessToken,
  hasRememberedAccessToken,
  setAccessToken,
} from "@/services/api/tokenStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8082";

interface ApiFetchOptions extends RequestInit {
  auth?: boolean;
  retryOnUnauthorized?: boolean;
}

interface TokenResponse {
  accessToken: string;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

let refreshRequest: Promise<string> | null = null;

function buildUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function parseResponse(response: Response) {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function getErrorMessage(status: number, payload: unknown) {
  if (payload && typeof payload === "object") {
    const body = payload as { message?: string; error?: string };
    if (body.message) return body.message;
  }

  if (status === 401) return "로그인이 필요합니다.";
  if (status === 403) return "관리자 권한이 필요합니다.";
  if (status === 404) return "데이터를 찾을 수 없습니다.";

  if (payload && typeof payload === "object") {
    const body = payload as { error?: string };
    if (body.error) return body.error;
  }

  return "요청 처리 중 문제가 발생했습니다.";
}

async function refreshAccessToken(remember: boolean) {
  const response = await fetch(buildUrl(endpoints.auth.refresh), {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    clearAccessToken();
    throw new ApiError(response.status, "관리자 세션이 만료되었습니다.");
  }

  const data = (await response.json()) as TokenResponse;
  setAccessToken(data.accessToken, remember);
  return data.accessToken;
}

export async function apiFetch<T>(
  path: string,
  {
    auth = true,
    retryOnUnauthorized = true,
    headers,
    body,
    ...options
  }: ApiFetchOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (body && !(body instanceof FormData) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const accessToken = getAccessToken();

  if (auth && accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    body,
    credentials: "include",
    headers: requestHeaders,
  });

  if (response.status === 401 && auth && retryOnUnauthorized) {
    refreshRequest ??= refreshAccessToken(hasRememberedAccessToken()).finally(() => {
      refreshRequest = null;
    });

    const refreshedToken = await refreshRequest;
    const retryHeaders = new Headers(requestHeaders);
    retryHeaders.set("Authorization", `Bearer ${refreshedToken}`);

    return apiFetch<T>(path, {
      ...options,
      auth,
      body,
      headers: retryHeaders,
      retryOnUnauthorized: false,
    });
  }

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(response.status, getErrorMessage(response.status, payload));
  }

  return payload as T;
}
