import PATH_CONST from "../Constant/Path.Const";
import type { AuthResponse } from "../types/auth.type";
import http from "./apis";

export const LoginApi = async (data: { email: string; password: string }) => {
  const respone: AuthResponse = await http.post(PATH_CONST.LOGIN, data);
  return respone.data;
};
