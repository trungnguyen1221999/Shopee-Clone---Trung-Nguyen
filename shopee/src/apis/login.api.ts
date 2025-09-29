import type { AuthResponse } from "../types/auth.type";
import http from "./apis";

export const LoginApi = async (data: { email: string; password: string }) => {
  const respone: AuthResponse = await http.post("/login", data);
  return respone.data;
};
