import { usePreferenceStore } from "@/app/store";
import {
  TasteQuestionView,
  TasteResultView,
  TasteTestIntroView,
  tasteQuestions,
  useTasteRecommendedProducts,
} from "@/features/taste-test";

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

  const recommendedProducts = useTasteRecommendedProducts(
    preference.roastLevel,
  );

  const currentQuestion = tasteQuestions[currentQuestionIndex];
  const selectedValue = currentQuestion
    ? answers[currentQuestion.key]
    : undefined;

  function handleSelect(value: string) {
    if (!currentQuestion) return;

    if (currentQuestionIndex === tasteQuestions.length - 1) {
      answerQuestion(currentQuestion.key, value);
      completeTest();
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
      onReset={resetTest}
      preference={preference}
      recommendedProducts={recommendedProducts}
    />
  );
}
