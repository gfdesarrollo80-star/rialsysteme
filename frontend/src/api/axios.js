import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request: agregar token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // ⛔ NO interceptar errores del login
    if (url.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    if (status === 403) {
      alert("No tenés permisos para esta acción");
    }

    return Promise.reject(error);
  }
);

export default api;
