// Create interceptor (adds correct headers to requests)
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Allows to import anything specified in .env file
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    token
      ? (config.headers.Authorization = `Bearer ${token}`) // JWT Access Token
      : delete config.headers.Authorization;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
