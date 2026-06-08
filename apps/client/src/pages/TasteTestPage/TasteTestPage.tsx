import { useCallback, useEffect } from "react";

import { useAuthStore, usePreferenceStore } from "@/app/store";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import {
  TasteQuestionView,
  TasteResultView,
  TasteTestIntroView,
  getTasteQuestions,
  maxTasteQuestionCount,
  useSubmitTasteTest,
} from "@/features/taste-test";
import { fetchSession } from "@/services/auth/authService";

export function TasteTestPage() {
  const step = usePreferenceStore((state) => state.step);
  const currentQuestionIndex = usePreferenceStore(
    (state) => state.currentQuestionIndex,
  );
  const answers = usePreferenceStore((state) => state.answers);
  const result = usePreferenceStore((state) => state.result);
  const startTest = usePreferenceStore((state) => state.startTest);
  const answerQuestion = usePreferenceStore((state) => state.answerQuestion);
  const goToPreviousQuestion = usePreferenceStore(
    (state) => state.goToPreviousQuestion,
  );
  const completeTest = usePreferenceStore((state) => state.completeTest);
  const setResult = usePreferenceStore((state) => state.setResult);
  const resetTest = usePreferenceStore((state) => state.resetTest);
  const authStatus = useAuthStore((state) => state.status);
  const setUser = useAuthStore((state) => state.login);

  const { mutate, reset, isPending, isError } = useSubmitTasteTest();

  const tasteQuestions = getTasteQuestions(answers);
  const hasAllAnswers = tasteQuestions.every(
    (question) => answers[question.key],
  );

  const refreshAuthenticatedUser = useCallback(async () => {
    if (authStatus !== "authenticated") {
      return;
    }

    try {
      const refreshedUser = await fetchSession();
      if (refreshedUser) {
        setUser(refreshedUser);
      }
    } catch {
      // 취향 결과 화면은 이미 표시 가능하므로 세션 갱신 실패는 조용히 넘긴다.
    }
  }, [authStatus, setUser]);

  // 결과 단계 진입 시 한 번만 백엔드에 제출한다. (재방문/재렌더로 result 가 비어 있으면 재요청)
  useEffect(() => {
    if (step !== "result" || result || isPending || isError || !hasAllAnswers) {
      return;
    }

    mutate(answers, {
      onSuccess: (data) => {
        setResult(data);
        void refreshAuthenticatedUser();
      },
    });
  }, [
    step,
    result,
    isPending,
    isError,
    hasAllAnswers,
    answers,
    mutate,
    setResult,
    refreshAuthenticatedUser,
  ]);

  const currentQuestion = tasteQuestions[currentQuestionIndex];
  const selectedValue = currentQuestion
    ? answers[currentQuestion.key]
    : undefined;

  function handleSelect(value: string) {
    if (!currentQuestion) {
      return;
    }

    answerQuestion(currentQuestion.key, value);

    const nextAnswers =
      currentQuestion.key === "level"
        ? { level: value }
        : { ...answers, [currentQuestion.key]: value };
    const nextQuestions = getTasteQuestions(nextAnswers);

    if (currentQuestionIndex === nextQuestions.length - 1) {
      completeTest();
    }
  }

  function handleReset() {
    reset();
    resetTest();
  }

  function handleRetry() {
    reset();
    mutate(answers, {
      onSuccess: (data) => {
        setResult(data);
        void refreshAuthenticatedUser();
      },
    });
  }

  if (step === "intro") {
    return (
      <TasteTestIntroView
        onStart={startTest}
        questionCount={maxTasteQuestionCount}
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
        questionCount={maxTasteQuestionCount}
        selectedValue={selectedValue}
      />
    );
  }

  // step === "result"
  if (isError) {
    return (
      <div className="page-content bg-[var(--surface-base)] pt-4">
        <EmptyState
          action={
            <PrimaryButton onClick={handleRetry}>다시 시도</PrimaryButton>
          }
          description="잠시 후 다시 시도해 주세요."
          title="취향 분석에 실패했어요"
        />
      </div>
    );
  }

  if (isPending || !result) {
    return (
      <LoadingScreen
        className="min-h-full"
        message="취향을 분석하고 원두를 고르는 중"
      />
    );
  }

  return (
    <TasteResultView
      onReset={handleReset}
      profile={result.profile}
      recommendedProducts={result.recommendedProducts}
    />
  );
}
