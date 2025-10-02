import PATH_CONST from "../Constant/Path.Const";
import http from "./apis";

export const LogoutApi = async () => {
  const response = await http.post(PATH_CONST.LOGOUT);
  return response.data;
};
