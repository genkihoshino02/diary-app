import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: process.env.VUE_APP_API_BASE,
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
