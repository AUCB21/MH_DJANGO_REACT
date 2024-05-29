// Create interceptor (adds correct headers to requests)
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Allows to import anything specified in .env file
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );
          const { access } = response.data;
          localStorage.setItem(ACCESS_TOKEN, access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (e) {
          console.error("Refresh token failed", e);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
