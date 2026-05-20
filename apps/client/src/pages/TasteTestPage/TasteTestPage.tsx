import { useState } from "react";

import { usePreferenceStore } from "@/app/store";
import {
  TasteQuestionView,
  TasteResultView,
  TasteTestIntroView,
  tasteQuestions,
  useSubmitTasteTest,
  useTasteRecommendedProducts,
} from "@/features/taste-test";
import { env } from "@/shared/lib/env";
import type { Product } from "@/shared/types/models";

export function TasteTestPage() {
  const step = usePreferenceStore((state) => state.step);
  const preference = usePreferenceStore((state) => state.preference);
  const currentQuestionIndex = usePreferenceStore(
    (state) => state.currentQuestionIndex,
  );
  const answers = usePreferenceStore((state) => state.answers);
  const startTest = usePreferenceStore((state) => state.startTest);
  const answerQuestion = usePreferenceStore((state) => state.answerQuestion);
  const goToPreviousQuestion = usePreferenceStore(
    (state) => state.goToPreviousQuestion,
  );
  const completeTest = usePreferenceStore((state) => state.completeTest);
  const resetTest = usePreferenceStore((state) => state.resetTest);
  const setPreference = usePreferenceStore((state) => state.setPreference);
  const submitTasteTestMutation = useSubmitTasteTest();
  const [apiRecommendedProducts, setApiRecommendedProducts] = useState<Product[] | null>(null);

  const recommendedProducts = useTasteRecommendedProducts(
    preference.roastLevel,
  );
  const displayedRecommendedProducts =
    apiRecommendedProducts?.length ? apiRecommendedProducts : recommendedProducts;

  const currentQuestion = tasteQuestions[currentQuestionIndex];
  const selectedValue = currentQuestion
    ? answers[currentQuestion.key]
    : undefined;

  function handleSelect(value: string) {
    if (!currentQuestion) return;

    if (currentQuestionIndex === tasteQuestions.length - 1) {
      const nextAnswers = {
        ...answers,
        [currentQuestion.key]: value,
      };

      answerQuestion(currentQuestion.key, value);
      completeTest();

      if (!env.enableMock) {
        submitTasteTestMutation.mutate(nextAnswers, {
          onSuccess: (result) => {
            setPreference(result.preference);
            setApiRecommendedProducts(result.recommendedProducts);
          },
        });
      }

      return;
    }

    answerQuestion(currentQuestion.key, value);
  }

  if (step === "intro") {
    return (
      <TasteTestIntroView
        onStart={startTest}
        questionCount={tasteQuestions.length}
      />
    );
  }

  if (step === "question" && currentQuestion) {
    return (
      <TasteQuestionView
        backLabel={currentQuestionIndex === 0 ? "처음으로" : "이전"}
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        onBack={currentQuestionIndex === 0 ? resetTest : goToPreviousQuestion}
        onSelect={handleSelect}
        questionCount={tasteQuestions.length}
        selectedValue={selectedValue}
      />
    );
  }

  return (
    <TasteResultView
      onReset={() => {
        setApiRecommendedProducts(null);
        resetTest();
      }}
      preference={preference}
      recommendedProducts={displayedRecommendedProducts}
    />
  );
}
