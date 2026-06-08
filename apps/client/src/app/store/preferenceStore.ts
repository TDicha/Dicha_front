import { create } from "zustand";

import {
  getTasteQuestions,
  type TasteTestAnswerKey,
  type TasteTestAnswers,
} from "@/features/taste-test/tasteTestConfig";
import type { TasteTestResult } from "@/features/taste-test/tasteTestApi";

interface PreferenceState {
  step: "intro" | "question" | "result";
  currentQuestionIndex: number;
  answers: TasteTestAnswers;
  /** 백엔드가 돌려준 취향 분석 결과 (세션 내 재렌더 대비 보관) */
  result: TasteTestResult | null;
  startTest: () => void;
  answerQuestion: (key: TasteTestAnswerKey, value: string) => void;
  goToPreviousQuestion: () => void;
  completeTest: () => void;
  setResult: (result: TasteTestResult) => void;
  resetTest: () => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  step: "intro",
  currentQuestionIndex: 0,
  answers: {},
  result: null,
  startTest: () =>
    set({
      step: "question",
      currentQuestionIndex: 0,
      answers: {},
      result: null,
    }),
  answerQuestion: (key, value) =>
    set((state) => {
      const nextAnswers =
        key === "level"
          ? { level: value }
          : {
              ...state.answers,
              [key]: value,
            };

      const lastQuestionIndex = getTasteQuestions(nextAnswers).length - 1;
      const nextQuestionIndex =
        state.currentQuestionIndex < lastQuestionIndex
          ? state.currentQuestionIndex + 1
          : state.currentQuestionIndex;

      return {
        answers: nextAnswers,
        currentQuestionIndex: nextQuestionIndex,
      };
    }),
  goToPreviousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
    })),
  completeTest: () => set({ step: "result" }),
  setResult: (result) => set({ result }),
  resetTest: () =>
    set({
      step: "intro",
      currentQuestionIndex: 0,
      answers: {},
      result: null,
    }),
}));
