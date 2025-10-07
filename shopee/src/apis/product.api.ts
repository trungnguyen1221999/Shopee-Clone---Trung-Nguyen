import http from "./apis";

const getProduct = async (productId: string) => {
  const response = await http.get(`products/${productId}`);
  return response.data;
};
export default getProduct;
