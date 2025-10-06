import http from "./apis";

const getCategory = async () => {
  const response = await http.get("/categories");
  return response.data;
};

export default getCategory;
