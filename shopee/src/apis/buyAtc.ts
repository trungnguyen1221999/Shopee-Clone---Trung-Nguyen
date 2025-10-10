import http from "./apis";

export interface BuyAtcParams {
  product_id: string;
  buy_count: number;
}

const buyAtc = async (item: BuyAtcParams[]) => {
  const response = await http.post("/purchases/buy-products", item);
  return response.data;
};

export default buyAtc;
