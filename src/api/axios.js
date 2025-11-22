import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7080/api",  // your API https://determined-rejoicing-production.up.railway.app/
  
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
