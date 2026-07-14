import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export default api;
