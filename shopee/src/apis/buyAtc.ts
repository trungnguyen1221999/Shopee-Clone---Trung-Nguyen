import http from "./apis";

interface BuyAtcParams {
  product_id: string;
  buy_count: number;
}

const buyAtc = async ([{ product_id, buy_count }]: BuyAtcParams[]) => {
  const response = await http.post("/purchases/buy-products", [
    {
      product_id,
      buy_count,
    },
  ]);
  return response.data;
};

export default buyAtc;
