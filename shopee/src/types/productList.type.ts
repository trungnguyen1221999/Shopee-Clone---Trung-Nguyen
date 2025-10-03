import type { productType } from "./product.type";

export interface productListType {
  message: string;
  data: {
    products: productType["data"][];
    pagination: {
      page: number;
      limit: number;
      page_size: number;
    };
  };
}
