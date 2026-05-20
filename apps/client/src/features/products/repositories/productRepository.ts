import { env } from "@/shared/lib/env";

import { apiProductAdapter } from "../adapters/apiProductAdapter";
import { mockProductAdapter } from "../adapters/mockProductAdapter";
import type { ProductRepository } from "../types";

export const productRepository: ProductRepository = env.enableMock
  ? mockProductAdapter
  : apiProductAdapter;
