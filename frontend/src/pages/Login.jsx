// src/pages/Login.jsx
import { useState } from "react";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 정보:", form);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>=== 로그인 ===</h2>

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
            />
          </div>

          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default Login;