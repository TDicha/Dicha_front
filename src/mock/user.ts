import type { RoastPreference, UserProfile } from "@/shared/types/models";

export const mockUser: UserProfile = {
  id: "user-1",
  name: "우석",
  email: "wooseok@dicha.coffee",
  tier: "Gold Member",
  favoriteFlavor: "초콜릿 · 시트러스 · 캐러멜",
};

export const mockPreference: RoastPreference = {
  roastLevel: "Medium",
  acidity: "중간",
  body: "부드럽고 균형감 있음",
  notes: ["Chocolate", "Citrus", "Caramel"],
};
