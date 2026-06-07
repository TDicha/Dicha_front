import { toProduct, type ApiProduct } from "@/features/products/adapters/apiProductAdapter";
import { tasteQuestions } from "@/features/taste-test/tasteTestConfig";
import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { Product } from "@/shared/types/models";

type TasteAnswers = Record<string, string | undefined>;

interface ApiTasteAnswer {
  questionId: string;
  answerValue: string;
}

interface ApiTasteProfile {
  acidity?: number | string;
  body?: number | string;
  sweetness?: number | string;
  primaryFlavorNote?: string;
}

interface ApiTasteTestResponse {
  userTasteProfile?: ApiTasteProfile;
  recommendedProducts: ApiProduct[];
}

/** 백엔드가 돌려주는 취향 프로필 (각 점수는 1~5). */
export interface TasteProfile {
  acidity: number;
  body: number;
  sweetness: number;
  primaryFlavorNote: string;
}

export interface TasteTestResult {
  profile: TasteProfile;
  recommendedProducts: Product[];
}

/** 1~5 척도로 보정한다. 값이 비어있으면 중앙값(3)으로 둔다. */
function toScore(value: number | string | undefined) {
  const score = Number(value ?? 3);
  if (Number.isNaN(score)) {
    return 3;
  }
  return Math.max(1, Math.min(5, Math.round(score)));
}

function toProfile(profile: ApiTasteProfile = {}): TasteProfile {
  return {
    acidity: toScore(profile.acidity),
    body: toScore(profile.body),
    sweetness: toScore(profile.sweetness),
    primaryFlavorNote: profile.primaryFlavorNote?.toUpperCase() ?? "FRUITY",
  };
}

/**
 * 화면 답변(answers)을 백엔드 questionId 형식으로 변환한다.
 * 질문 옵션 값(value)이 이미 백엔드가 기대하는 값이라 1:1로 매핑된다.
 */
function toApiAnswers(answers: TasteAnswers): ApiTasteAnswer[] {
  return tasteQuestions
    .map((question) => ({
      questionId: question.questionId,
      answerValue: answers[question.key] ?? "",
    }))
    .filter((answer) => answer.answerValue.length > 0);
}

export async function submitTasteTest(
  answers: TasteAnswers,
): Promise<TasteTestResult> {
  const { data } = await apiClient.post<ApiTasteTestResponse>(
    endpoints.tasteTest.submit,
    { answers: toApiAnswers(answers) },
  );

  return {
    profile: toProfile(data.userTasteProfile),
    recommendedProducts: (data.recommendedProducts ?? []).map(toProduct),
  };
}
