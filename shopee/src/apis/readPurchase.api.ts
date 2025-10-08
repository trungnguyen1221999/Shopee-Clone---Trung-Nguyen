import http from "./apis";

const readPurchase = async (status: number) => {
  const response = await http.get("/purchases", { params: { status } });
  return response.data;
};
export default readPurchase;
