import { create } from "zustand";

import {
  tasteProfiles,
  tasteQuestions,
  type TasteTestAnswerKey,
} from "@/features/taste-test/tasteTestConfig";
import { mockPreference } from "@/mock/user";
import type { RoastPreference } from "@/shared/types/models";

type TasteTestAnswers = Partial<Record<TasteTestAnswerKey, string>>;

interface PreferenceState {
  preference: RoastPreference;
  step: "intro" | "question" | "result";
  currentQuestionIndex: number;
  answers: TasteTestAnswers;
  setPreference: (preference: RoastPreference) => void;
  startTest: () => void;
  answerQuestion: (key: TasteTestAnswerKey, value: string) => void;
  goToPreviousQuestion: () => void;
  completeTest: () => void;
  resetTest: () => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  preference: mockPreference,
  step: "intro",
  currentQuestionIndex: 0,
  answers: {},
  setPreference: (preference) => set({ preference }),
  startTest: () =>
    set({
      step: "question",
      currentQuestionIndex: 0,
      answers: {},
    }),
  answerQuestion: (key, value) =>
    set((state) => {
      const nextAnswers = {
        ...state.answers,
        [key]: value,
      };

      const lastQuestionIndex = tasteQuestions.length - 1;
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
  completeTest: () =>
    set((state) => {
      const flavor = state.answers.flavor;
      const brew = state.answers.brew;

      let nextPreference = tasteProfiles.balanced;

      if (flavor === "floral" || brew === "pour-over") {
        nextPreference = tasteProfiles.bright;
      }

      if (flavor === "chocolate" || brew === "espresso") {
        nextPreference = tasteProfiles.deep;
      }

      return {
        preference: nextPreference,
        step: "result",
      };
    }),
  resetTest: () =>
    set({
      preference: mockPreference,
      step: "intro",
      currentQuestionIndex: 0,
      answers: {},
    }),
}));
