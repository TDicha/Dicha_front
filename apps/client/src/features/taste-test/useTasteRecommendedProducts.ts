import { useMemo } from "react";

import { mockProducts } from "@/mock/products";

export function useTasteRecommendedProducts(roastLevel: string) {
  return useMemo(
    () =>
      mockProducts
        .filter((product) => product.roastLevel === roastLevel)
        .slice(0, 3),
    [roastLevel],
  );
}
