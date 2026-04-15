export type ProductBadge = "BEST" | "NEW" | "PICK";

export interface ProductOption {
  id: string;
  name: string;
  description?: string;
  extraPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  badges: ProductBadge[];
  category: "blend" | "single-origin" | "drip-bag" | "capsule";
  categoryLabel?: string;
  originLabel?: string;
  roastLabel?: string;
  roastLevel: "Light" | "Medium" | "Dark";
  rating?: number;
  reviewCount?: number;
  notes: string[];
  options: ProductOption[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  beansPerMonth: string;
  perks: string[];
  highlight?: string;
  statusLabel?: string;
  nextDeliveryLabel?: string;
  billingDayLabel?: string;
}

export interface Order {
  id: string;
  productName: string;
  status: "preparing" | "shipping" | "completed";
  orderedAt: string;
  amount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  tier: string;
  favoriteFlavor: string;
}

export interface RoastPreference {
  roastLevel: string;
  acidity: string;
  body: string;
  notes: string[];
}

export type QrResultTarget = "product-detail" | "my-blend";

export interface QrResultDraft {
  code: string;
  target: QrResultTarget;
  targetId?: string;
}
