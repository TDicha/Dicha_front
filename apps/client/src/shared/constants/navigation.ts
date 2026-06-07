import { House, ShoppingBag, UserRound } from "lucide-react";

import { ROUTES } from "@/shared/constants/routes";

export const bottomTabItems = [
  { to: ROUTES.home, label: "홈", icon: House },
  { to: ROUTES.products, label: "쇼핑", icon: ShoppingBag },
  { to: ROUTES.myPage, label: "마이", icon: UserRound },
];
