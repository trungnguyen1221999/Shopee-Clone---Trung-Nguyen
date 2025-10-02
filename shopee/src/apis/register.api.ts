import PATH_CONST from "../Constant/Path.Const";
import type { AuthResponse } from "../types/auth.type";
import http from "./apis";
import type { AxiosResponse } from "axios";

export const registerApi = async (body: {
  email: string;
  password: string;
}) => {
  const response: AxiosResponse<AuthResponse> = await http.post(
    PATH_CONST.REGISTER,
    body
  );
  return response.data;
};
