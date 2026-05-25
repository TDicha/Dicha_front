import { toProduct, type ApiProduct } from "@/features/products/adapters/apiProductAdapter";
import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { Product, RoastPreference } from "@/shared/types/models";

type TasteAnswers = Record<string, string | undefined>;

interface ApiTasteAnswer {
  questionId: "q1_acidity" | "q2_body" | "q3_sweetness" | "q4_flavor";
  answerValue: string;
}

interface ApiTasteProfile {
  acidity?: number | string;
  body?: number | string;
  sweetness?: number | string;
  primaryFlavorNote?: string;
  roastLevel?: string;
  notes?: string[];
}

interface ApiTasteTestResponse {
  userTasteProfile?: ApiTasteProfile;
  recommendedProducts: ApiProduct[];
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

function toApiAnswers(answers: TasteAnswers): ApiTasteAnswer[] {
  const acidity =
    answers.brew === "pour-over"
      ? "높은 산미"
      : answers.brew === "espresso"
        ? "낮은 산미"
        : "적당한 산미";
  const body =
    answers.mood === "deep" || answers.brew === "espresso"
      ? "묵직한 바디감"
      : answers.mood === "bright"
        ? "가벼운 바디감"
        : "부드러운 바디감";
  const sweetness =
    answers.flavor === "chocolate"
      ? "강한 단맛"
      : answers.mood === "bright"
        ? "단맛 없는"
        : "은은한 단맛";
  const flavor =
    answers.flavor === "floral"
      ? "FLORAL"
      : answers.flavor === "chocolate"
        ? "CHOCOLATY"
        : "CARAMEL";

  return [
    { questionId: "q1_acidity", answerValue: acidity },
    { questionId: "q2_body", answerValue: body },
    { questionId: "q3_sweetness", answerValue: sweetness },
    { questionId: "q4_flavor", answerValue: flavor },
  ];
}

export async function submitTasteTest(answers: TasteAnswers): Promise<TasteTestResult> {
  const { data } = await apiClient.post<ApiTasteTestResponse>(
    endpoints.tasteTest.submit,
    { answers: toApiAnswers(answers) },
  );

  return {
    preference: toPreference(data.userTasteProfile),
    recommendedProducts: data.recommendedProducts.map(toProduct),
  };
}
