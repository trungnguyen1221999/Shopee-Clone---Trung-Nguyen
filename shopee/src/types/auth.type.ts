import type { ResponseApi } from "./utils.type";
import { User } from "./user.type";

export type AuthResponse = ResponseApi<{
  access_token: string;
  expires: string;
  refresh_token: string;
  expires_refresh_token: string;
  user: User;
}>;
