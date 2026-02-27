import { useState } from "react";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 정보:", form);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>=== 회원가입 ===</h2>
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

          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;