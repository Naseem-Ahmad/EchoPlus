import axios from "axios";

const api = axios.create({
  baseURL: "https://magnificent-creation-production.up.railway.app/api",  // your API https://determined-rejoicing-production.up.railway.app/ https://localhost:7080/api
  
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
