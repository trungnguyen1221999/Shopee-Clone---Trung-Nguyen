import http from "./apis";

const deleteAtc = async ({ purchase_id }: { purchase_id: string[] }) => {
  const response = await http.delete("/purchases", {
    data: { purchase_id },
  });
  return response.data;
};
export default deleteAtc;
