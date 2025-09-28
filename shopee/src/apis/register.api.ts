import type { AuthResponse } from "../types/auth.type";
import http from "./apis";
import type { AxiosResponse } from "axios";

export const registerApi = async (body: {
  email: string;
  password: string;
}) => {
  const response: AxiosResponse<AuthResponse> = await http.post(
    "/register",
    body
  );
  return response.data;
};
