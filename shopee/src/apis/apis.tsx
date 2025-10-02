import axios, { type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import type { AuthResponse, ErrorResponse } from "../types/auth.type";
import {
  getAccessTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
} from "../untils/auth.api";

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
          config.headers.Authorization = `Bearer ${this.accessToken}`;
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
        if (url === "/login" || url === "/register") {
          this.accessToken =
            (response.data as AuthResponse).data?.access_token || "";
          saveAccessTokenToLocalStorage(this.accessToken);
        }
        // Logout: xóa token RAM + localStorage
        else if (url === "/logout") {
          this.accessToken = "";
          removeAccessTokenFromLocalStorage();
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
