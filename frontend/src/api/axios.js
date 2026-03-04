import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 예: "http://localhost:8080/api"
  withCredentials: true,
});

// JWT 토큰 자동 추가
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // 로그인 시 토큰 저장
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;