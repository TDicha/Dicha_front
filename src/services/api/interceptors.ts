import type { AxiosError, AxiosInstance } from "axios";

const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

function sanitizeError(error: AxiosError) {
  const status = error.response?.status;

  return Promise.reject({
    status,
    message:
      status === 401
        ? "인증이 필요합니다."
        : status === 403
          ? "요청이 허용되지 않았습니다."
          : "요청 처리 중 문제가 발생했습니다.",
  });
}

export function applyInterceptors(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const method = config.method?.toLowerCase();

    if (method && unsafeMethods.has(method)) {
      // TODO: Spring Security CSRF policy 확정 후 endpoints.auth.csrf에서 받은 토큰을
      // X-CSRF-TOKEN 같은 짧은 수명 헤더로 붙인다. 장기 localStorage 저장은 피한다.
    }

    return config;
  });
  client.interceptors.response.use((response) => response, sanitizeError);
}
