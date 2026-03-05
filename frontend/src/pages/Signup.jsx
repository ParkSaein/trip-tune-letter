import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await api.post("/api/auth/signup", form);

      setSuccessMsg(res.data?.message || "회원가입 성공");

      // ✅ 회원가입 성공하면 로그인 페이지로 이동 (원하면 주석 해제)
      // navigate("/login");
    } catch (err) {
      // 백엔드에서 validation 에러 메시지 형태가 다를 수 있어서 안전하게 처리
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "회원가입 실패";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>=== 회원가입 ===</h2>

        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className="success">{successMsg}</p>}

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
              autoComplete="new-password"
            />
          </div>

          <div className="form-row">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "가입 중..." : "회원가입"}
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            로그인으로
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;