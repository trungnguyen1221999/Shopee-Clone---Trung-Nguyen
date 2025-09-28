import axios, { type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import type { ErrorResponse } from "../types/auth.type";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error: ErrorResponse) => {
        if (error.status !== 422) {
          const message: any | undefined =
            error.response?.data?.data?.message ||
            error.message ||
            "Something wrong, please try again";
          // Show toast notification
          console.log(error);
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
