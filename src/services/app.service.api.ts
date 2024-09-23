import axios from "axios";
import { refreshAccessTokenFn } from "./auth.service.api";

const API_URL = "https://kevych-49a723d13d60.herokuapp.com/api";

export const appApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

appApi.defaults.headers.common["Content-Type"] = "application/json";

appApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const errMessage = error.response.data.message as string;
    const statusCode = error.response.status;

    if (statusCode === 401 && errMessage === "Unauthorized") {
      try {
        originalRequest._retry = true;
        await refreshAccessTokenFn();
        console.log("Access token refreshed");

        return appApi(originalRequest);
      } catch (error) {
        console.log("Failed to refresh access token");

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
