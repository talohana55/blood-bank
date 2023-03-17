import axios from "axios";
export const API_URL = `https://localhost:8080/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
$api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export interface Response {
  message?: string;
  errors?: any[];
}
