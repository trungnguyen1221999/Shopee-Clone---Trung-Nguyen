import http from "./apis";

interface UpdateAtcParams {
  product_id: string;
  buy_count: number;
}

const updateAtc = async ({ product_id, buy_count }: UpdateAtcParams) => {
  const response = await http.put("/purchases/update-purchase", {
    product_id,
    buy_count,
  });
  return response.data;
};
export default updateAtc;
