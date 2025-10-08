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
const AddToCart = async (itemId: string, quantity: number) => {
  const response: AddToCartParams = await http.post("/purchases/add-to-cart", {
    itemId,
    quantity,
  });
  return response;
};
export default AddToCart;
