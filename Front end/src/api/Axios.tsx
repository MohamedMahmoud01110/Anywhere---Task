import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "https://anywhere-task-production.up.railway.app/api",
});

export default API;
