import { toProduct, type ApiProduct } from "@/features/products/adapters/apiProductAdapter";
import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { Product, RoastPreference } from "@/shared/types/models";

type TasteAnswers = Record<string, string | undefined>;

interface ApiTasteProfile {
  acidity?: number | string;
  body?: number | string;
  sweetness?: number | string;
  primaryFlavorNote?: string;
  roastLevel?: string;
  notes?: string[];
}

interface ApiTasteTestResponse {
  tasteProfile?: ApiTasteProfile;
  profile?: ApiTasteProfile;
  recommendedProducts?: ApiProduct[];
  products?: ApiProduct[];
}

export interface TasteTestResult {
  preference: RoastPreference;
  recommendedProducts: Product[];
}

function toScoreLabel(value: number | string | undefined, labels: [string, string, string]) {
  if (typeof value === "string" && Number.isNaN(Number(value))) {
    return value;
  }

  const score = Number(value ?? 3);

  if (score >= 4) return labels[2];
  if (score <= 2) return labels[0];

  return labels[1];
}

function normalizeRoastLevel(profile: ApiTasteProfile): RoastPreference["roastLevel"] {
  const roastLevel = profile.roastLevel?.toUpperCase();

  if (roastLevel === "LIGHT" || Number(profile.acidity ?? 3) >= 4) {
    return "Light";
  }

  if (roastLevel === "DARK" || Number(profile.body ?? 3) >= 4) {
    return "Dark";
  }

  return "Medium";
}

function toPreference(profile: ApiTasteProfile = {}): RoastPreference {
  return {
    roastLevel: normalizeRoastLevel(profile),
    acidity: toScoreLabel(profile.acidity, ["낮음", "중간", "높음"]),
    body: toScoreLabel(profile.body, [
      "가볍고 선명함",
      "부드럽고 균형감 있음",
      "묵직하고 진함",
    ]),
    notes: profile.notes?.length ? profile.notes : [profile.primaryFlavorNote ?? "Balanced"],
  };
}

export async function submitTasteTest(answers: TasteAnswers): Promise<TasteTestResult> {
  const orderedAnswers = Object.values(answers).filter(
    (answer): answer is string => Boolean(answer),
  );
  const { data } = await apiClient.post<ApiTasteTestResponse>(
    endpoints.tasteTest.submit,
    { answers: orderedAnswers },
  );
  const profile = data.tasteProfile ?? data.profile ?? {};
  const recommendedProducts = data.recommendedProducts ?? data.products ?? [];

  return {
    preference: toPreference(profile),
    recommendedProducts: recommendedProducts.map(toProduct),
  };
}
