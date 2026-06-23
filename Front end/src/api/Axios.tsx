import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  //   baseURL: "https://hiremind-production.up.railway.app/api",
});

export default API;
