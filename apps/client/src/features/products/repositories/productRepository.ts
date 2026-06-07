import { apiProductAdapter } from "../adapters/apiProductAdapter";
import type { ProductRepository } from "../types";

export const productRepository: ProductRepository = apiProductAdapter;
