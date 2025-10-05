import http from "./apis";

export interface ProductListParams {
  page: number | string;
  limit: number | string;
  order?: "desc" | "asc";
  sort_by?: "createdAt" | "view" | "sold" | "price";
  category?: string;
  exclude?: string;
  rating_filter?: number;
  price_max?: number;
  price_min?: number;
  name?: string;
}

export const getProductList = async (params: ProductListParams) => {
  const response = await http.get("/products", { params });
  return response.data;
};
