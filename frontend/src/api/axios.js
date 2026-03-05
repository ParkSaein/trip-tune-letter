import axios from "axios";

const api = axios.create({
  baseURL: "/", // ✅ Vite proxy 사용
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 로그인 이후 보호 API 호출 시 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;