export const endpoints = {
  auth: {
    session: "/api/members/me",
    login: "/api/members/login",
    signup: "/api/members/signup",
    logout: "/api/members/logout",
    refresh: "/api/members/refresh",
    findEmail: "/api/members/find-email",
    findPassword: "/api/members/find-password",
  },
  products: {
    list: "/api/products",
    detail: (productId: string) => `/api/products/${productId}`,
  },
  categories: {
    list: "/api/categories",
  },
  cart: {
    list: "/api/cart",
    addItem: "/api/cart/items",
    updateItem: (cartItemId: string) => `/api/cart/items/${cartItemId}`,
    removeItem: (cartItemId: string) => `/api/cart/items/${cartItemId}`,
    clear: "/api/cart",
  },
  tasteTest: {
    submit: "/api/taste-test",
  },
  orders: {
    list: "/api/orders",
    create: "/api/orders",
    detail: (orderId: string) => `/api/orders/${orderId}`,
    cancel: (orderId: string) => `/api/orders/${orderId}/cancel`,
    guestCreate: "/api/guest-orders",
    guestLookup: "/api/guest-orders/lookup",
    guestCancel: "/api/guest-orders/cancel",
  },
} as const;
