import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import { endpoints } from "@/services/api/endpoints";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/services/auth/tokenStorage";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface TokenResponse {
  accessToken: string;
}

let refreshRequest: Promise<string> | null = null;

function toClientError(status?: number) {
  return {
    status,
    message:
      status === 401
        ? "인증이 필요합니다."
        : status === 403
          ? "요청이 허용되지 않았습니다."
          : "요청 처리 중 문제가 발생했습니다.",
  };
}

async function refreshAccessToken(client: AxiosInstance) {
  const { data } = await axios.post<TokenResponse>(
    endpoints.auth.refresh,
    undefined,
    {
      baseURL: client.defaults.baseURL,
      timeout: client.defaults.timeout,
      withCredentials: true,
    },
  );

  setAccessToken(data.accessToken);
  return data.accessToken;
}

export function applyInterceptors(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as RetryableRequestConfig | undefined;
      const shouldRefresh =
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        originalRequest.url !== endpoints.auth.refresh;

      if (!shouldRefresh) {
        return Promise.reject(toClientError(status));
      }

      originalRequest._retry = true;

      try {
        refreshRequest ??= refreshAccessToken(client).finally(() => {
          refreshRequest = null;
        });

        const accessToken = await refreshRequest;
        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
        return client.request(originalRequest);
      } catch {
        clearAccessToken();
        return Promise.reject(toClientError(401));
      }
    },
  );
}
