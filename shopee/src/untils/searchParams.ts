import { useSearchParams } from "react-router-dom";
import type { QueryParams } from "../pages/ProductList/ProductList";
import { isUndefined, omitBy } from "lodash";

type paramsType = {
  [key in keyof QueryParams]: string;
};
export const searchParam = () => {
  const [searchParams] = useSearchParams();

  const params: paramsType = {
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "20",
    order: (["asc", "desc"].includes(searchParams.get("order") || "")
      ? (searchParams.get("order") as "asc" | "desc")
      : "desc") as "asc" | "desc" | undefined,
    sort_by:
      (searchParams.get("sort_by") as
        | "createdAt"
        | "view"
        | "sold"
        | "price") || "createdAt",
    category: searchParams.get("category") || undefined,
    exclude: searchParams.get("exclude") || undefined,
    rating_filter: searchParams.get("rating_filter") || undefined,
    price_max: searchParams.get("price_max") || undefined,
    price_min: searchParams.get("price_min") || undefined,
    name: searchParams.get("name") || undefined,
  };
  return omitBy(params, isUndefined);
};
