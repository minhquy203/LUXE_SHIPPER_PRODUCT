// axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

// Base URL từ env
const baseURL = process.env.API_URL || "http://localhost:3000/api";

// 📌 Axios Public - không có token
export const axiosPublic = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 📌 Axios Private - có token
export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token tự động vào request
axiosPrivate.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Nếu lỗi 401 hoặc 403, remove token
axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
