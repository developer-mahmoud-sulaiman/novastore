import axios from "axios";
import { useAuthStore } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request Timeout, Please Try Again"));
    }

    if (!error.response) {
      return Promise.reject(new Error("Network Erro. Check Your Connection"));
    }

    const message =
      error.response.data?.message ||
      `Request failed with status ${error.response.status}`;

    return Promise.reject(new Error(message));
  },
);

export default api;
