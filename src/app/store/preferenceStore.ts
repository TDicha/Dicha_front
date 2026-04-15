import { create } from "zustand";

import { mockPreference } from "@/mock/user";
import type { RoastPreference } from "@/shared/types/models";

type TasteTestAnswerKey = "brew" | "flavor" | "mood";

interface TasteTestAnswers {
  brew?: string;
  flavor?: string;
  mood?: string;
}

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

const tasteProfiles: Record<string, RoastPreference> = {
  bright: {
    roastLevel: "Light",
    acidity: "높음",
    body: "가볍고 선명함",
    notes: ["Floral", "Berry", "Citrus"],
  },
  balanced: {
    roastLevel: "Medium",
    acidity: "중간",
    body: "부드럽고 균형감 있음",
    notes: ["Chocolate", "Citrus", "Caramel"],
  },
  deep: {
    roastLevel: "Dark",
    acidity: "낮음",
    body: "묵직하고 진함",
    notes: ["Cacao", "Nutty", "Molasses"],
  },
};

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

      const nextQuestionIndex =
        state.currentQuestionIndex < 2 ? state.currentQuestionIndex + 1 : state.currentQuestionIndex;

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
