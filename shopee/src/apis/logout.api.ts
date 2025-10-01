import http from "./apis";

export const LogoutApi = async () => {
  const response = await http.post("/logout");
  return response.data;
};
