import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://hospital-mangement-backend.onrender.com",
});
