import { useState } from "react";
import "../styles/auth.css";

function Login({ onChangePage }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="auth-container">
            <h2>LOGIN</h2>
            <p>환영합니다! 계정으로 로그인 후 이용하세요</p>

            <form className="auth-form">
                <div className="input-group">
                    <span className="input-icon">📧</span>
                    <input type="text" placeholder="아이디 (이메일)" />
                </div>
                
                <div className="input-group password-group">
                    <span className="input-icon">🔒</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
                <label className="auth-form-checkbox">
                    <input type="checkbox" />
                    <span>기억하기</span>
                </label>

                <button type="button">로그인</button>
            </form>

            <p className="auth-text">
                아직 회원이 아니신가요?{" "}
                <span onClick={() => onChangePage("signup")}>회원가입</span>
            </p>
        </div>
    );
}

export default Login;
