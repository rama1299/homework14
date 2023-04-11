import axios from "axios";

// Set up Axios instance
const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const instance = axios.create({ baseURL });

// Add interceptor to automatically add authorization header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance };
