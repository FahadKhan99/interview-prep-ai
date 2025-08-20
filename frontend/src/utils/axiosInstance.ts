import axios from "axios";
import { BASE_URL } from "./apiPaths";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// request & response interceptor only needed if sending jwt token via json

export default api;