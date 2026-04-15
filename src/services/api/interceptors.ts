import type { AxiosError, AxiosInstance } from "axios";

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
  client.interceptors.response.use((response) => response, sanitizeError);
}
