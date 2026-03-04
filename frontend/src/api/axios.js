import axios from "axios";

const api = axios.create({
  baseURL: "", // ✅ 프록시-only: 절대 8080 직접 호출 안 함
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // JWT 응답 토큰 방식이면 보통 false
});

export default api;