import type { productType } from "../types/product.type";
import http from "./apis";

interface AddToCartParams {
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: number;
  _id: string;
  user: string;
  product: productType;
}
const AddToCart = async (product_id: string, buy_count: number) => {
  const response: AddToCartParams = await http.post("/purchases/add-to-cart", {
    product_id,
    buy_count,
  });
  return response;
};
export default AddToCart;
