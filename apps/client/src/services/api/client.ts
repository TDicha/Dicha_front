import axios from "axios";

import { env } from "@/shared/lib/env";
import { applyInterceptors } from "@/services/api/interceptors";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

applyInterceptors(apiClient);
