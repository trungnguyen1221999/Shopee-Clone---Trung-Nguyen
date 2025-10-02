import axios, { type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import type { AuthResponse } from "../types/auth.type";
import {
  getAccessTokenFromLocalStorage,
  clearLocalStorage,
  saveAccessTokenToLocalStorage,
  saveProfileToLocalStorage,
} from "../untils/auth.api";
import PATH_CONST from "../Constant/Path.Const";

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    // Lấy token từ localStorage khi init
    this.accessToken = getAccessTokenFromLocalStorage() || "";

    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor: dùng token trong RAM
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;

        // Login/Register: cập nhật token RAM + localStorage
        if (url === PATH_CONST.LOGIN || url === PATH_CONST.REGISTER) {
          this.accessToken =
            (response.data as AuthResponse).data?.access_token || "";
          saveAccessTokenToLocalStorage(this.accessToken);
          saveProfileToLocalStorage(response.data.data.user);
        }
        // Logout: xóa token RAM + localStorage
        else if (url === PATH_CONST.LOGOUT) {
          this.accessToken = "";
          clearLocalStorage();
          console.log("Logged out successfully");
        }

        return response.data;
      },
      (error: any) => {
        if (error.response?.status !== 422) {
          const message: string =
            error.response?.data?.data?.message ||
            error.message ||
            "Something went wrong, please try again";
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.instance;
  }
}

const http = new Http().getInstance();

export default http;
