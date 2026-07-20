import axios from "axios";

const api = axios.create({
  baseURL: "https://ecovision-ai-production-8b54.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;