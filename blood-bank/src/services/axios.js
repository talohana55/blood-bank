import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  const tokenInStore = localStorage.getItem("token");
  if (tokenInStore) {
    config.headers.Authorization = `Bearer ${tokenInStore}`;
  }
  return config;
});

export default instance;
