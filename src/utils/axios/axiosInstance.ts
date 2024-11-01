"use client";
import { logOut } from "@/libs/tokens";
import axios from "axios";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";

const authTokens: { accessToken: string; refreshToken: string } | null =
  typeof window !== "undefined" && localStorage.getItem("authTokens")
    ? JSON.parse(String(localStorage.getItem("authTokens")))
    : null;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${authTokens?.accessToken}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    const authTokens: { accessToken: string; refreshToken: string } | null =
      typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("authTokens")
        ? JSON.parse(String(localStorage.getItem("authTokens")))
        : null;
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
  }

  return req;
});

axiosInstance.interceptors.response.use(
  async (res) => {
    return res.data;
  },
  async (err) => {
    if (
      err.response.status === 401 &&
      err.response.statusText === "token expired"
    ) {
      err.config._retry = true;
      const baseUrl = err.config.baseURL;
      const tempApi = err.config.url;

      try {
        const response = await axios.post(`${baseUrl}/api/auth/refresh`, {
          refreshToken: authTokens?.refreshToken,
        });
        await axios.get(`${baseUrl}${tempApi}`, {
          headers: {
            Authorization: `Bearer ${response.data.data.accessToken}`,
          },
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data.data));
        window.location.reload();
      } catch (error) {
        logOut();
        window.location.href = "/login";
      }
    }
  }
);

export default axiosInstance;
