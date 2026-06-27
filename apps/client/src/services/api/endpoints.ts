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
    search: "/api/products/search",
    detail: (productId: string) => `/api/products/${productId}`,
    options: (productId: string) => `/api/products/${productId}/options`,
    reviews: (productId: string) => `/api/products/${productId}/reviews`,
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
  addresses: {
    list: "/api/addresses",
    create: "/api/addresses",
    update: (addressId: string) => `/api/addresses/${addressId}`,
    remove: (addressId: string) => `/api/addresses/${addressId}`,
    setDefault: (addressId: string) => `/api/addresses/${addressId}/default`,
  },
  subscriptions: {
    list: "/api/subscriptions",
    detail: (subscriptionId: string) => `/api/subscriptions/${subscriptionId}`,
    create: "/api/subscriptions",
    pause: (subscriptionId: string) =>
      `/api/subscriptions/${subscriptionId}/pause`,
    resume: (subscriptionId: string) =>
      `/api/subscriptions/${subscriptionId}/resume`,
    cancel: (subscriptionId: string) => `/api/subscriptions/${subscriptionId}`,
  },
} as const;
