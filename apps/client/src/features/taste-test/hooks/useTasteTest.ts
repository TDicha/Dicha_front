import { useMutation } from "@tanstack/react-query";

import { submitTasteTest } from "@/features/taste-test/tasteTestApi";

export function useSubmitTasteTest() {
  return useMutation({
    mutationFn: submitTasteTest,
  });
}
