// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Login.css";

// ✅ JWT payload 디코딩(라이브러리 없이)
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setErrorMsg("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/api/auth/login", form);

      const token =
        res.data?.token ||
        res.data?.data?.token ||
        res.data?.accessToken ||
        res.data?.data?.accessToken;

      if (!token) {
        console.log("LOGIN RES DATA:", res.data);
        setErrorMsg("로그인 토큰이 응답에 없습니다. 백엔드 응답(res.data)을 확인하세요.");
        return;
      }

      // ✅ 토큰 저장
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userEmail", form.email);

      // ✅ role 저장: (1) 백엔드가 role을 주면 그걸 쓰고
      // ✅           (2) 아니면 JWT에서 role 추출 시도
      const roleFromRes = res.data?.role || res.data?.data?.role;

      let roleToStore = roleFromRes;
      if (!roleToStore) {
        const payload = parseJwt(token);
        roleToStore = payload?.role || payload?.auth || payload?.authorities?.[0];
      }

      // role이 아예 없으면 USER로라도 저장(화면 제어용)
      localStorage.setItem("role", roleToStore || "USER");

      // ✅ 로그인 성공 후 이동
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "로그인 실패 (아이디/비밀번호 확인)";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>=== 로그인 ===</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">아이디</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/signup")}
            disabled={loading}
          >
            회원가입으로
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;