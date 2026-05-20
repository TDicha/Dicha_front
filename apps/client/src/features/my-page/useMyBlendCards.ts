import { useMemo } from "react";

import { mockMyBlendCards, type MyBlendCard } from "@/mock/myBlends";
import { mockMyBlendRecipes } from "@/mock/user";
import type { MyBlendRecipe } from "@/shared/types/models";

export interface MyBlendCardWithRecipe extends MyBlendCard {
  recipe?: MyBlendRecipe;
}

export function useMyBlendCards() {
  return useMemo<MyBlendCardWithRecipe[]>(
    () =>
      mockMyBlendCards.map((blend) => ({
        ...blend,
        recipe: mockMyBlendRecipes.find((item) => item.id === blend.recipeId),
      })),
    [],
  );
}
