import http from "./apis";

const deleteAtc = async (purchase_id: string[]) => {
  const response = await http.delete("/purchases", {
    data: purchase_id, // ✅ gửi array trong body
  });
  return response.data;
};

export default deleteAtc;
