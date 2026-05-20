import type { MyBlendRecipe, RoastPreference, UserProfile } from "@/shared/types/models";

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

export const mockMyBlendRecipes: MyBlendRecipe[] = [
  {
    id: "blend-signature-balance",
    name: "시그니처 밸런스 01",
    description: "초콜릿 계열의 단맛 위에 시트러스 여운을 남기는 데일리 블렌드입니다.",
    roastLevel: "중배전",
    ratioLabel: "브라질 50 · 과테말라 30 · 에티오피아 20",
    notes: ["Chocolate", "Citrus", "Caramel"],
    recommendedFor: "아침 라떼와 아이스 아메리카노",
    lastBrewedAt: "2026.04.14",
  },
  {
    id: "blend-soft-floral",
    name: "소프트 플로럴 02",
    description: "자스민 향과 밝은 산미를 살린 가벼운 무드의 커스텀 블렌드예요.",
    roastLevel: "중약배전",
    ratioLabel: "에티오피아 60 · 콜롬비아 25 · 케냐 15",
    notes: ["Jasmine", "Berry", "Bright"],
    recommendedFor: "브런치와 핸드드립",
    lastBrewedAt: "2026.04.09",
  },
];
