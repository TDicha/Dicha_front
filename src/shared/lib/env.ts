export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
  appName: import.meta.env.VITE_APP_NAME ?? "Dicha Coffee",
  enableMock: import.meta.env.VITE_ENABLE_MOCK !== "false",
};
