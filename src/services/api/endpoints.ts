export const endpoints = {
  auth: {
    session: "/api/auth/session",
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
  },
  products: {
    list: "/api/products",
    detail: (productId: string) => `/api/products/${productId}`,
  },
  orders: {
    list: "/api/orders",
  },
  subscriptions: {
    list: "/api/subscriptions",
  },
  qr: {
    resolve: "/api/qr/resolve",
  },
} as const;
